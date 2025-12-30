# Control Architecture

The control system consists of three microcontrollers:

**Arduino Nano**: Samples EMG signal at 1 kHz, performs baseline calibration, and detects threshold crossings. Transmits binary activation commands via UART (115200 baud).

**Raspberry Pi Zero**: Central controller running Python 3. Receives EMG triggers from Arduino, executes main control loop (PID or proportional mapping), and sends target servo angles via I²C to the Pico.

**Raspberry Pi Pico**: Dedicated servo controller. Receives angle commands over I²C (address 0x42) and generates precise PWM signals (50 Hz, 1-2 ms pulse width) to drive the MG996R servo.

This distributed architecture isolates high-speed EMG sampling, control logic, and real-time PWM generation, achieving <30 ms end-to-end latency.
