# Electronics Design Deep Dive

## Overview

The electronics subsystem acquires surface EMG signals, filters/amplifies them, and interfaces with the control microcontrollers. The design emphasizes low-noise analog front-end performance, common-mode rejection, and compact PCB layout.

## EMG Analog Front-End

### 1. Signal Acquisition
- **Electrodes**: Disposable Ag/AgCl gel electrodes (e.g., 3M Red Dot 2560)
- **Placement**: Forearm flexor carpi radialis muscle belly + reference on bony prominence (ulnar styloid)
- **Expected Signal**: 100-5000 µV RMS, 20-450 Hz bandwidth

### 2. Instrumentation Amplifier (INA128)
The INA128 provides high common-mode rejection (CMRR >100 dB) essential for rejecting motion artifacts and mains interference.

**Configuration**:
- Gain: 500 (set by Rg = 110Ω)
- Supply: ±5V (from dual-rail buck converters)
- Input impedance: >10 GΩ (minimizes loading on skin-electrode interface)
- Output: Single-ended, 0-5V (biased at mid-rail via 10kΩ divider)

### 3. Active Bandpass Filter (TL074)
Cascaded Sallen-Key topology:
- **High-pass**: fc = 20 Hz (removes DC drift, motion artifacts)
- **Low-pass**: fc = 450 Hz (anti-aliasing, 60 Hz rejection)
- **Passband gain**: Unity (prevents saturation)

**Component values**:
- HPF: R1 = 33kΩ, C1 = 220nF (fc = 21.9 Hz)
- LPF: R2 = 10kΩ, C2 = 33nF (fc = 482 Hz)

### 4. Precision Rectifier + Smoothing
Full-wave rectifier using LM358 op-amp, followed by RC low-pass (τ = 50 ms):
- **Rectifier**: Converts bipolar EMG to unipolar envelope
- **Smoothing**: R = 100kΩ, C = 470nF (fc = 3.4 Hz)
- **Output**: 0-3.3V DC proportional to muscle activation

### 5. ADC Interface (Arduino Nano)
- **Resolution**: 10-bit (1024 levels, ~3.2 mV/step)
- **Sampling rate**: 1 kHz (overkill for smoothed signal, but allows future spectral analysis)
- **Reference voltage**: Internal 5V (±50 mV tolerance)

## Schematic

See `/public/files/emg-schematic.pdf` for complete annotated schematic.

Key design notes:
- Bypass capacitors (100 nF ceramic + 10 µF electrolytic) on all IC power pins
- Star grounding topology (single-point ground at Arduino)
- Shielded cable for electrode leads (reduces 60 Hz pickup)

## PCB Layout

**Dimensions**: 50 mm × 30 mm (fits inside 3D-printed enclosure)

**Layer stack**:
- Top: Signal traces, INA128, TL074, passives
- Bottom: Ground pour (maximizes common-mode rejection)

**Gerber files**: `/public/files/silverhand-pcb-gerbers.zip`

**Manufacturing**: Compatible with standard 2-layer fab houses (JLCPCB, OSH Park, PCBWay)

## Bill of Materials (Electronics)

| Component | Quantity | Unit Cost | Supplier |
|-----------|----------|-----------|----------|
| INA128P (DIP-8) | 1 | $6.50 | Digi-Key |
| TL074CN (DIP-14) | 1 | $0.85 | Mouser |
| LM358N (DIP-8) | 1 | $0.45 | Digi-Key |
| Arduino Nano (clone) | 1 | $3.50 | AliExpress |
| Raspberry Pi Zero W | 1 | $15.00 | Adafruit |
| Raspberry Pi Pico | 1 | $4.00 | Adafruit |
| Resistors (assorted) | 20 | $0.05 | Tayda Electronics |
| Capacitors (ceramic/elect) | 15 | $0.10 | Tayda Electronics |
| Ag/AgCl electrodes (10-pack) | 1 | $8.00 | Amazon |
| 3.5mm jack (electrode leads) | 2 | $0.75 | Digi-Key |
| PCB (fabrication) | 5 | $2.00 | JLCPCB |

**Total Electronics Cost**: ~$55

## Testing & Validation

### Noise Floor
Measured with inputs shorted:
- **RMS noise**: 8 µV (input-referred)
- **SNR**: ~55 dB (for 500 µV EMG signal)

### Frequency Response
Verified with function generator sweep:
- **-3dB points**: 18.5 Hz, 465 Hz (within 10% of design)
- **Passband ripple**: <0.5 dB

### Common-Mode Rejection
60 Hz interference test (100 mV common-mode input):
- **CMRR**: 98 dB @ 60 Hz
- **Output interference**: <100 µV

## Electrode Placement Guide

1. **Active electrode (red)**: Flexor carpi radialis muscle belly (palpate while making fist)
2. **Active electrode (black)**: 2-3 cm distal, same muscle
3. **Reference (green)**: Ulnar styloid (bony prominence on pinky side of wrist)
4. **Skin prep**: Clean with alcohol wipe, abrade gently with prep pad (reduces impedance to <10 kΩ)

## Noise Mitigation Strategies

1. **Shielded cables**: Use coaxial or twisted-pair for electrode leads
2. **Star grounding**: Connect all grounds to single point (Arduino GND)
3. **Power supply decoupling**: 100 nF + 10 µF on each IC
4. **Right-leg drive** (future): Active common-mode cancellation for >120 dB CMRR

## Future Electronics Improvements

1. **Multichannel EMG**: 4-8 channel array (individual finger control)
2. **Wireless transmission**: BLE module for untethered operation
3. **On-board ADC**: Replace Arduino with dedicated 16-bit ADC (ADS1115)
4. **EMI filtering**: Additional LC filter stages for industrial environments

---

**Last Updated**: January 2025  
**Version**: 0.1.0
