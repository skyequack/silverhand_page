# Control Algorithm Deep Dive

## Overview

The control system translates processed EMG signals into servo position commands using a calibrated threshold-based approach. This page details the calibration routine, control loop architecture, and performance optimization strategies.

## Calibration Routine

Before each use session, the system performs a three-phase calibration:

### Phase 1: Baseline Noise Floor (10 seconds)
**Objective**: Measure resting EMG amplitude to establish detection threshold

**Procedure**:
1. User remains completely relaxed (no muscle contraction)
2. Arduino samples EMG signal at 1 kHz for 10 seconds (10,000 samples)
3. Compute mean (µ) and standard deviation (σ) of signal
4. **Baseline threshold** = µ + 3σ (99.7% confidence interval, rejects noise spikes)

**Typical values**:
- µ = 50 mV (DC-coupled ADC reading)
- σ = 8 mV
- Threshold = 74 mV

### Phase 2: Maximum Voluntary Contraction (5 seconds)
**Objective**: Normalize EMG amplitude to user's max strength

**Procedure**:
1. User performs maximum grip (clenched fist)
2. Arduino records peak EMG amplitude over 5 seconds
3. **MVC level** = max(EMG) during contraction

**Typical values**:
- MVC = 850 mV (varies widely: 400-1500 mV depending on muscle size, electrode placement, fatigue)

### Phase 3: Activation Threshold (User-Adjusted)
**Objective**: Set comfortable trigger level for grasp activation

**Procedure**:
1. Default threshold = 30% MVC (e.g., 0.3 × 850 = 255 mV)
2. User tests grasp trigger, adjusts up/down via buttons
3. Final threshold stored in EEPROM (persists across power cycles)

**Rationale**: 30% MVC balances sensitivity (easy to activate) vs. false positives (resists involuntary twitches)

## Control Loop Architecture

### Main Loop (Raspberry Pi Zero, 100 Hz)
```
while True:
    # 1. Read EMG trigger from Arduino (UART, 8 bytes/frame)
    emg_active = read_arduino_trigger()
    
    # 2. Determine target servo angle
    if emg_active:
        target_angle = CLOSED_POSITION  # 120° (fully flexed)
    else:
        target_angle = OPEN_POSITION    # 0° (fully extended)
    
    # 3. Smooth transition (prevent jerky motion)
    current_angle += (target_angle - current_angle) * 0.3  # Low-pass filter (tau ~ 30ms)
    
    # 4. Send command to Pico (I²C, 3 bytes: addr, angle_high, angle_low)
    send_servo_command(current_angle)
    
    # 5. Log data (optional: timestamp, EMG, angle)
    log_to_csv(timestamp, emg_active, current_angle)
    
    time.sleep(0.01)  # 10ms period = 100 Hz
```

### Servo Controller (Raspberry Pi Pico, 50 Hz PWM)
```python
# MicroPython on Pico
from machine import Pin, PWM, I2C

servo = PWM(Pin(0), freq=50)  # 20ms period (standard servo PWM)

def angle_to_duty(angle):
    # Map 0-120° to 1000-2000 µs pulse width
    pulse_us = 1000 + (angle / 120.0) * 1000
    duty = int(pulse_us / 20000.0 * 65535)  # Convert to 16-bit duty cycle
    return duty

# I²C slave at address 0x42
i2c = I2C(0, scl=Pin(1), sda=Pin(0))
i2c.init(I2C.SLAVE, addr=0x42)

while True:
    if i2c.any():
        data = i2c.read(2)
        angle = (data[0] << 8) | data[1]  # Reconstruct 16-bit angle
        servo.duty_u16(angle_to_duty(angle))
```

## Latency Breakdown

End-to-end latency (EMG contraction → servo motion):

| Stage | Duration | Accumulation |
|-------|----------|--------------|
| Muscle activation → electrode | 5 ms | 5 ms |
| Analog filtering (bandpass + rectifier) | 8 ms | 13 ms |
| Arduino ADC sampling (1 kHz) | 1 ms | 14 ms |
| Arduino threshold detection + UART TX | 2 ms | 16 ms |
| Pi Zero processing (Python) | 6 ms | 22 ms |
| I²C transmission to Pico | 1 ms | 23 ms |
| Pico PWM update | 2 ms | 25 ms |
| Servo mechanical response | 5 ms | **30 ms** |

**Total latency**: 30 ms (subjectively imperceptible; human reaction time ~200 ms)

## Performance Metrics

### Activation Accuracy
Tested with 100 intentional grasps:
- **True positives**: 94 (correct grasp triggers)
- **False negatives**: 6 (failed to trigger despite contraction)
- **False positives**: 2 (accidental triggers during rest)
- **Sensitivity**: 94%
- **Specificity**: 98%

### Repeatability
Standard deviation of grasp force across 50 trials:
- **Bottle grasp**: 2.8 kg ± 0.3 kg (11% CV)
- **Umbrella grasp**: 1.2 kg ± 0.2 kg (17% CV)

Higher CV for lighter objects due to threshold variability near activation edge.

### Servo Position Accuracy
Commanded vs. actual angle (measured with IMU):
- **Mean error**: 2.3° (within servo resolution)
- **Max error**: 5.1° (at extremes of travel)

## Proportional Control (Future)

Current system is **binary** (open/closed). Future versions will implement **proportional control**:

```python
# Map EMG amplitude to servo angle
normalized_emg = (current_emg - baseline) / (MVC - baseline)  # 0.0 to 1.0
target_angle = normalized_emg * 120  # 0° (open) to 120° (closed)
```

**Challenges**:
- EMG signal variability (±20% amplitude fluctuations during sustained contraction)
- User fatigue (MVC decreases over time)

**Solutions**:
- Adaptive thresholding (re-calibrate MVC every 5 minutes)
- Kalman filtering (predict true muscle activation from noisy EMG)

## Advanced Control Strategies

### 1. PID Control
Closed-loop feedback using IMU on finger:
```python
error = target_angle - measured_angle
integral += error * dt
derivative = (error - prev_error) / dt
output = Kp * error + Ki * integral + Kd * derivative
```

**Benefit**: Compensates for external forces (e.g., gripping heavy object)

### 2. Impedance Control
Adjust servo stiffness based on grasp phase:
- **Reaching**: Low stiffness (compliant, absorbs impacts)
- **Grasping**: High stiffness (maintains grip force)
- **Holding**: Medium stiffness (balances stability vs. energy)

### 3. Machine Learning (Future)
Train SVM or LDA classifier on multichannel EMG:
- **Input**: 4-8 EMG channels from forearm
- **Output**: Grasp type (power, precision, key, etc.)
- **Training**: Collect 50 examples × 5 gestures = 250 samples
- **Accuracy**: ~85% (literature benchmark)

## Code Repository

Full firmware source code:
- Arduino: `/public/files/silverhand_emg.ino`
- Pico: `/public/files/pico_servo_controller.py`
- Pi Zero: `/public/files/silverhand_control.py`

---

**Last Updated**: January 2025  
**Version**: 0.1.0
