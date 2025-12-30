# SilverHand: EMG-Controlled Hand Exoskeleton

## Executive Summary

SilverHand is an open-source, EMG-controlled hand exoskeleton designed to restore grasp function for individuals with finger-specific motor impairments. The system uses surface electromyography (sEMG) to detect residual muscle activity in the forearm, translating these biosignals into real-time servo-driven finger actuation with <50ms latency.

## Problem Statement

Over 58 million Americans live with arthritis, and millions more suffer from stroke, traumatic brain injury, or neurodegenerative conditions that impair hand function. Existing assistive devices are often heavy (>500g), expensive ($5,000-$30,000), or lack intuitive control interfaces.

## Solution: SilverHand Approach

SilverHand addresses these limitations through:

1. **Lightweight Design**: <200g total mass using 3D-printed polymer linkages
2. **EMG Control**: Intuitive bioelectric interface requiring minimal training
3. **Powered Actuation**: 6V servo-driven mechanism with 2-4kg fingertip grip force
4. **Open Source**: Complete design files, schematics, and firmware publicly available
5. **Low Cost**: <$200 BOM targeting DIY accessibility

## Technical Architecture

### Hardware
- **Mechanical**: Four-bar linkage mechanism actuated by MG996R servos
- **Electronics**: INA128 instrumentation amplifier + TL074 active filter for EMG acquisition
- **Power**: 7.4V LiPo (1500mAh) with dual buck converters (6V servo rail, 5V logic)
- **Controllers**: Arduino Nano (EMG ADC) → Raspberry Pi Zero (control) → Pi Pico (servo PWM)

### Software
- **Firmware**: Arduino C++ (EMG sampling), MicroPython (Pico servo control), Python 3 (Pi Zero main loop)
- **Communication**: UART (115200 baud) + I²C (0x42 address)
- **Control Algorithm**: Threshold-based activation with MVC normalization

### Performance Metrics
- **Latency**: 30ms end-to-end (EMG → servo response)
- **Battery Life**: ~1.8 hours continuous grasping, 4-6 hours intermittent use
- **Grip Force**: 2.8 kg (bottle), 1.2 kg (umbrella handle)
- **Success Rate**: 94% grasp initiation accuracy in lab testing

## Current Status

**Version**: 0.1.0 (Prototype Phase)
- ✅ Proof-of-concept hardware functional
- ✅ EMG signal chain validated
- ✅ Control algorithm demonstrating <50ms latency
- ⏳ Ergonomic optimization ongoing
- ⏳ User studies planned (n=10 pilot cohort)

## Future Directions

1. **Multichannel EMG**: 4-8 channel array for individual finger control
2. **Machine Learning**: LDA/SVM classifiers for gesture recognition
3. **Product Enclosure**: Injection-molded housing with IP54 rating
4. **Clinical Validation**: IRB-approved efficacy trials

## Open Source Commitment

All design artifacts released under MIT License:
- 3D CAD models (Fusion 360 + STEP)
- PCB schematics and Gerber files
- Firmware source code
- Build instructions and assembly manual

## Contact

**Omer M.** (MIT '26)  
Research interests: Biomechatronics, Wearable Robotics, BioInstrumentation  
GitHub: [your-github-username]  
Email: [your-email]

---

**Last Updated**: January 2025  
**Version**: 0.1.0  
**License**: MIT
