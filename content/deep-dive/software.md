# Software Architecture Deep Dive

## Overview

The SilverHand firmware consists of three distributed programs running on separate microcontrollers. This architecture decouples high-speed signal acquisition (Arduino), control logic (Pi Zero), and real-time PWM generation (Pico).

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Raspberry Pi Zero W                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │   Main Control Loop (Python 3.9)                  │   │
│  │   - Receives EMG triggers from Arduino (UART)     │   │
│  │   - Executes control algorithm (threshold/PID)    │   │
│  │   - Sends servo commands to Pico (I²C)            │   │
│  │   - Logs data to CSV (optional)                   │   │
│  │   - Hosts web interface (Flask, future)           │   │
│  └──────────────────────────────────────────────────┘   │
└───────────────┬─────────────────────┬───────────────────┘
                │ UART (115200)       │ I²C (100 kHz)
                │                     │
       ┌────────▼─────────┐  ┌────────▼────────┐
       │  Arduino Nano    │  │  Raspberry Pico │
       │  ┌────────────┐  │  │  ┌───────────┐  │
       │  │ EMG Sampler│  │  │  │ Servo PWM │  │
       │  │ - 1 kHz ADC│  │  │  │ - 50 Hz   │  │
       │  │ - Threshold│  │  │  │ - I²C RX  │  │
       │  │ - UART TX  │  │  │  │           │  │
       │  └────────────┘  │  │  └───────────┘  │
       └──────────────────┘  └─────────────────┘
```

## Arduino Nano Firmware (C++)

### Purpose
High-speed EMG signal acquisition and threshold detection.

### Key Functions

```cpp
// silverhand_emg.ino
#define EMG_PIN A0
#define SAMPLE_RATE 1000  // Hz
#define BASELINE_SAMPLES 10000
#define MVC_DURATION 5000

float baseline_threshold = 0;
float mvc_level = 0;
float activation_threshold = 0;

void setup() {
  Serial.begin(115200);
  pinMode(EMG_PIN, INPUT);
  
  // Calibration routine
  calibrate_baseline();
  calibrate_mvc();
  set_activation_threshold();
}

void loop() {
  static unsigned long last_sample = 0;
  
  if (micros() - last_sample >= 1000) {  // 1 kHz sampling
    int raw = analogRead(EMG_PIN);
    float emg_mv = raw * (5000.0 / 1023.0);  // Convert to millivolts
    
    // Threshold detection
    bool active = (emg_mv > activation_threshold);
    
    // Send trigger state via UART (1 byte: 0x00 or 0x01)
    Serial.write(active ? 0x01 : 0x00);
    
    last_sample = micros();
  }
}

void calibrate_baseline() {
  long sum = 0;
  long sum_sq = 0;
  
  for (int i = 0; i < BASELINE_SAMPLES; i++) {
    int raw = analogRead(EMG_PIN);
    sum += raw;
    sum_sq += raw * raw;
    delayMicroseconds(1000);  // 1 kHz
  }
  
  float mean = sum / (float)BASELINE_SAMPLES;
  float variance = (sum_sq / (float)BASELINE_SAMPLES) - (mean * mean);
  float std_dev = sqrt(variance);
  
  baseline_threshold = (mean + 3 * std_dev) * (5000.0 / 1023.0);  // mV
}

void calibrate_mvc() {
  float max_emg = 0;
  unsigned long start = millis();
  
  while (millis() - start < MVC_DURATION) {
    int raw = analogRead(EMG_PIN);
    float emg_mv = raw * (5000.0 / 1023.0);
    if (emg_mv > max_emg) max_emg = emg_mv;
    delayMicroseconds(1000);
  }
  
  mvc_level = max_emg;
}

void set_activation_threshold() {
  activation_threshold = baseline_threshold + 0.3 * (mvc_level - baseline_threshold);
}
```

### Dependencies
- Arduino core libraries (built-in)

### Installation
```bash
# Install Arduino IDE
# Open silverhand_emg.ino
# Select Board: "Arduino Nano"
# Select Processor: "ATmega328P (Old Bootloader)"
# Upload
```

## Raspberry Pi Pico Firmware (MicroPython)

### Purpose
Dedicated servo PWM controller with I²C slave interface.

### Key Functions

```python
# pico_servo_controller.py
from machine import Pin, PWM, I2C
import struct

# Servo on GPIO 0
servo = PWM(Pin(0))
servo.freq(50)  # 50 Hz = 20ms period

def angle_to_duty(angle):
    """Map angle (0-120°) to PWM duty cycle (1000-2000 µs)"""
    pulse_us = 1000 + (angle / 120.0) * 1000
    duty_16bit = int((pulse_us / 20000.0) * 65535)
    return duty_16bit

# I²C slave at address 0x42
i2c = I2C(0, scl=Pin(1), sda=Pin(0), freq=100000)

# Main loop
while True:
    try:
        # Wait for I²C data (blocking)
        data = i2c.read(2)  # Read 2 bytes (16-bit angle)
        
        if len(data) == 2:
            # Reconstruct angle from bytes
            angle = struct.unpack('>H', data)[0]  # Big-endian unsigned short
            
            # Clamp to valid range
            angle = max(0, min(120, angle))
            
            # Update servo
            servo.duty_u16(angle_to_duty(angle))
            
    except Exception as e:
        pass  # Ignore I²C errors (no data available)
```

### Dependencies
- MicroPython v1.20+ (pre-installed on Pico)

### Installation
```bash
# Install Thonny IDE
# Connect Pico via USB (hold BOOTSEL button)
# Upload pico_servo_controller.py
# Disconnect USB, power via 5V rail
```

## Raspberry Pi Zero Firmware (Python 3)

### Purpose
Central control loop integrating EMG input and servo output.

### Key Functions

```python
# silverhand_control.py
import serial
import smbus2
import time
import csv

# Configuration
ARDUINO_PORT = '/dev/ttyUSB0'  # Adjust for your system
PICO_I2C_ADDR = 0x42
I2C_BUS = 1  # Pi Zero uses I2C bus 1

OPEN_ANGLE = 0
CLOSED_ANGLE = 120
SMOOTH_FACTOR = 0.3  # Low-pass filter coefficient

# Initialize UART (Arduino)
arduino = serial.Serial(ARDUINO_PORT, 115200, timeout=0.1)

# Initialize I²C (Pico)
i2c = smbus2.SMBus(I2C_BUS)

# State variables
current_angle = OPEN_ANGLE
target_angle = OPEN_ANGLE

# Data logging
log_file = open('silverhand_log.csv', 'w', newline='')
logger = csv.writer(log_file)
logger.writerow(['timestamp', 'emg_active', 'target_angle', 'current_angle'])

def send_servo_command(angle):
    """Send angle to Pico via I²C (2 bytes, big-endian)"""
    try:
        angle_int = int(angle)
        high_byte = (angle_int >> 8) & 0xFF
        low_byte = angle_int & 0xFF
        i2c.write_i2c_block_data(PICO_I2C_ADDR, 0, [high_byte, low_byte])
    except Exception as e:
        print(f"I²C error: {e}")

def main_loop():
    global current_angle, target_angle
    
    while True:
        start_time = time.time()
        
        # Read EMG trigger from Arduino (1 byte: 0x00 or 0x01)
        if arduino.in_waiting > 0:
            emg_byte = arduino.read(1)
            emg_active = (emg_byte[0] == 0x01)
        else:
            emg_active = False
        
        # Determine target angle
        target_angle = CLOSED_ANGLE if emg_active else OPEN_ANGLE
        
        # Smooth transition (exponential moving average)
        current_angle += (target_angle - current_angle) * SMOOTH_FACTOR
        
        # Send command to Pico
        send_servo_command(current_angle)
        
        # Log data
        logger.writerow([time.time(), emg_active, target_angle, current_angle])
        
        # Maintain 100 Hz loop rate
        elapsed = time.time() - start_time
        time.sleep(max(0, 0.01 - elapsed))

if __name__ == '__main__':
    try:
        main_loop()
    except KeyboardInterrupt:
        print("\nShutting down...")
        send_servo_command(OPEN_ANGLE)  # Return to open position
        log_file.close()
        arduino.close()
```

### Dependencies
```bash
pip3 install pyserial smbus2
```

### Installation
```bash
# On Raspberry Pi Zero
git clone https://github.com/yourusername/silverhand.git
cd silverhand/firmware
python3 silverhand_control.py
```

### Auto-Start on Boot
Add to `/etc/rc.local`:
```bash
python3 /home/pi/silverhand/firmware/silverhand_control.py &
```

## Communication Protocols

### UART (Arduino → Pi Zero)
- **Baud rate**: 115200
- **Data format**: 8N1 (8 data bits, no parity, 1 stop bit)
- **Protocol**: Single byte per transmission
  - `0x00`: EMG inactive (muscle relaxed)
  - `0x01`: EMG active (muscle contracted above threshold)

### I²C (Pi Zero → Pico)
- **Clock speed**: 100 kHz (standard mode)
- **Slave address**: 0x42
- **Protocol**: 2-byte write
  - Byte 0: Angle high byte (bits 15-8)
  - Byte 1: Angle low byte (bits 7-0)
  - Example: Angle 90° → `0x00 0x5A` (90 decimal = 0x005A hex)

## Future Software Enhancements

1. **Web Interface**: Flask server on Pi Zero for wireless calibration/monitoring
2. **Machine Learning**: TensorFlow Lite for on-device gesture classification
3. **Data Visualization**: Real-time EMG plotting via WebSocket
4. **Cloud Sync**: Upload usage logs to AWS S3 for longitudinal analysis
5. **Over-the-Air Updates**: Remote firmware updates via SSH

## Code Repository

Download complete firmware package:
- `/public/files/silverhand-firmware-v0.1.zip`

Individual files:
- `/public/files/silverhand_emg.ino`
- `/public/files/pico_servo_controller.py`
- `/public/files/silverhand_control.py`

---

**Last Updated**: January 2025  
**Version**: 0.1.0
