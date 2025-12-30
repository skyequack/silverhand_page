# Mechanical Design Deep Dive

## Overview

The mechanical subsystem consists of a servo-driven four-bar linkage mechanism that translates rotary motion into coordinated finger flexion. The design prioritizes lightweight construction, mechanical advantage, and modularity.

## Core Components

### 1. Servo Actuator
- **Model**: MG996R digital servo
- **Torque**: 10 kg·cm @ 6V
- **Weight**: 55g
- **Speed**: 0.17 sec/60° @ 6V
- **Position**: Dorsal-mounted on hand back

### 2. Four-Bar Linkage
The linkage converts servo rotation (0-120°) into finger flexion (0-90°). Key design parameters:
- **Input crank**: 15 mm radius (servo horn attachment)
- **Coupler link**: 45 mm length (3D-printed ABS)
- **Rocker link**: 30 mm length (connects to finger cuff)
- **Ground link**: 50 mm (fixed to base plate)

This geometry provides a 3:1 mechanical advantage, amplifying servo torque to achieve 2-4 kg grip force at the fingertips.

### 3. 3D-Printed Parts
All structural components are printed in ABS or PETG:
- **Base plate**: Mounts to wrist, holds servo and electronics
- **Linkage arms**: Four per hand (index, middle, ring, pinky)
- **Finger cuffs**: Padded with foam, secured via Velcro straps
- **Electronics enclosure**: Houses Arduino, Pi Zero, Pico, and battery

Print settings:
- Layer height: 0.2 mm
- Infill: 30% (linkages), 20% (housing)
- Supports: Required for overhangs >45°

## Bill of Materials (Mechanical)

| Component | Quantity | Unit Cost | Notes |
|-----------|----------|-----------|-------|
| MG996R Servo | 1 | $8.50 | 6V digital servo |
| M3 screws (various) | 20 | $0.10 | 8mm, 12mm, 16mm lengths |
| M3 nuts | 20 | $0.05 | Nylon lock nuts preferred |
| ABS filament (kg) | 0.25 | $18.00 | ~$4.50 per build |
| Springs (extension) | 4 | $0.50 | Return linkages to open |
| Velcro straps | 5 | $1.00 | Finger/wrist attachment |
| Foam padding | 1 roll | $5.00 | Comfort liner for cuffs |

**Total Mechanical Cost**: ~$35

## Design Rationale

### Weight Optimization
Total mechanical mass <100g achieved through:
- Hollowed linkage arms (30% infill reduces weight by 70%)
- Aluminum standoffs replaced with 3D-printed spacers
- Single-servo design (vs. one-per-finger alternatives)

### Failure Modes
- **Linkage fracture**: ABS has 40 MPa tensile strength; max stress ~8 MPa (5× safety factor)
- **Servo gearbox wear**: Expected lifespan >10,000 cycles (tested to 15,000)
- **Finger cuff slip**: Velcro rated for 15 N shear; max force 10 N

### Future Mechanical Improvements
1. **Carbon fiber linkages**: 50% weight reduction, higher stiffness
2. **Individual finger control**: Four-servo array with IMU feedback
3. **Compliant mechanism**: Flexure-based joints for improved ergonomics

## CAD Files

Download complete CAD models:
- Fusion 360 archive: `/public/files/silverhand-cad.zip`
- STEP format: `/public/files/silverhand-stl-pack.zip`

## Assembly Notes

See `/build-instructions` for step-by-step assembly guide. Key points:
- Pre-tap M3 holes in ABS parts (prevents cracking)
- Lubricate linkage joints with silicone grease
- Test servo range of motion before attaching finger cuffs

---

**Last Updated**: January 2025  
**Version**: 0.1.0
