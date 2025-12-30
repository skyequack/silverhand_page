# Power System Deep Dive

## Overview

The power subsystem delivers regulated voltage rails to the servo (6V, up to 2A peaks) and logic components (5V, ~300 mA average). The design prioritizes efficiency, runtime, and thermal management within a wearable form factor.

## Primary Battery

**Type**: Lithium Polymer (LiPo)  
**Configuration**: 2S (7.4V nominal, 8.4V max, 6.0V cutoff)  
**Capacity**: 1500 mAh  
**C-rating**: 25C (37.5A max discharge)  
**Form factor**: 60 mm × 35 mm × 15 mm, 70g  
**Supplier**: Turnigy, Tattu, or equivalent

### Justification
- **Voltage compatibility**: 7.4V nominal enables efficient buck conversion to 6V/5V
- **Energy density**: 200 Wh/kg vs. 100 Wh/kg for NiMH
- **Weight**: 70g vs. 150g for equivalent NiMH capacity
- **C-rating**: Handles 2A servo peaks without voltage sag

### Safety
- **Protection circuit**: Built-in PCM (overcharge, over-discharge, short circuit)
- **Charging**: XT30 connector + IMAX B6 balance charger (1C charge rate = 1.5A)
- **Storage voltage**: 7.6V (3.8V per cell) for long-term storage

## Voltage Regulation

### Servo Rail: LM2596 Buck Converter
**Input**: 7.4V (LiPo)  
**Output**: 6.0V, 3A max  
**Efficiency**: 92% @ 1.5A load  
**Switching frequency**: 150 kHz  
**Inductor**: 33 µH, 3A saturation current  
**Output capacitor**: 220 µF low-ESR electrolytic

**Load profile**:
- **Idle**: 50 mA (servo quiescent)
- **Moving**: 800-1200 mA (proportional to load)
- **Stall**: 1800 mA (100 ms max, protected by servo current limiter)

### Logic Rail: MP1584 Buck Converter
**Input**: 7.4V (LiPo)  
**Output**: 5.0V, 1A max  
**Efficiency**: 93% @ 300 mA load  
**Switching frequency**: 1.5 MHz (smaller inductor)  
**Inductor**: 10 µH, 1.5A saturation  
**Output capacitor**: 100 µF ceramic

**Load profile**:
- Arduino Nano: 40 mA
- Raspberry Pi Zero W: 120 mA (idle), 180 mA (WiFi active)
- Raspberry Pi Pico: 30 mA
- INA128 + TL074 + LM358: 15 mA
- **Total**: ~250 mA average, 350 mA peak

## Runtime Analysis

### Continuous Grasping Scenario
Assumes 50% duty cycle (grasp for 2s, hold for 2s, release for 2s):

| Component | Avg Current (mA) | Power (mW) |
|-----------|------------------|------------|
| Servo (50% duty) | 600 | 3600 |
| Pi Zero W | 150 | 750 |
| Arduino Nano | 40 | 200 |
| Pi Pico | 30 | 150 |
| Analog front-end | 15 | 75 |
| **Total** | **835 mA** | **6180 mW** |

**Runtime**: 1500 mAh ÷ 835 mA = **1.8 hours**

### Intermittent Use Scenario
Assumes 10% duty cycle (6 grasps per minute, 5s each):

| Component | Avg Current (mA) | Power (mW) |
|-----------|------------------|------------|
| Servo (10% duty) | 150 | 900 |
| Pi Zero W (WiFi off) | 120 | 600 |
| Arduino Nano | 40 | 200 |
| Pi Pico | 30 | 150 |
| Analog front-end | 15 | 75 |
| **Total** | **355 mA** | **2630 mW** |

**Runtime**: 1500 mAh ÷ 355 mA = **4.2 hours**

### Deep Sleep Mode (Future)
With Pi Zero in suspend mode and Arduino in power-down:
- **Standby current**: <10 mA
- **Runtime**: >150 hours (wake on EMG trigger via interrupt)

## Thermal Management

### LM2596 Heat Dissipation
At 1.5A load:
- **Input power**: 7.4V × 1.5A = 11.1W
- **Output power**: 6.0V × 1.5A = 9.0W
- **Loss**: 2.1W (19% inefficiency)
- **Thermal resistance**: θJA = 45°C/W (TO-220 with heatsink)
- **Temperature rise**: 2.1W × 45°C/W = 95°C → **Junction temp = 115°C** (within 125°C max)

**Heatsink**: Small TO-220 aluminum clip (10 mm × 10 mm) reduces θJA to 30°C/W → 63°C rise → **83°C junction** (safe)

### MP1584 Heat Dissipation
At 300 mA load:
- **Loss**: ~300 mW
- **Package**: SOP-8 (θJA = 150°C/W)
- **Temperature rise**: 0.3W × 150°C/W = 45°C → **Junction temp = 70°C** (no heatsink needed)

## Bill of Materials (Power)

| Component | Quantity | Unit Cost |
|-----------|----------|-----------|
| LiPo 2S 1500mAh | 1 | $12.00 |
| LM2596 module | 1 | $1.50 |
| MP1584 module | 1 | $1.20 |
| XT30 connector | 1 | $0.50 |
| Power switch (SPST) | 1 | $0.75 |
| TO-220 heatsink | 1 | $0.30 |

**Total Power Cost**: ~$16

## Safety Features

1. **Reverse polarity protection**: Schottky diode (1N5822) in series with battery
2. **Overcurrent protection**: Built-in to LM2596/MP1584 (foldback current limiting)
3. **Under-voltage lockout**: LiPo PCM cuts off at 6.0V (3.0V per cell)
4. **Thermal shutdown**: Both regulators have 150°C junction shutdown

## Future Power Improvements

1. **Larger battery**: 2200 mAh LiPo (30% runtime increase, +20g)
2. **Power profiling**: Dynamic voltage scaling on Pi Zero (reduces idle consumption by 40%)
3. **Supercapacitor**: 10F supercap buffers servo current spikes (reduces battery stress)
4. **Wireless charging**: Qi receiver coil embedded in wrist mount

---

**Last Updated**: January 2025  
**Version**: 0.1.0
