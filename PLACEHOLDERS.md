# Placeholder Assets Guide

This document lists all placeholder files used in the SilverHand website. Replace each placeholder with actual content before deploying to production.

## 📸 Images

### Hero & Marketing

| File Path | Description | Recommended Size | Notes |
|-----------|-------------|------------------|-------|
| `/public/img/hero-render-1.png` | Primary hero image - exoskeleton render | 1920×1080px | High-quality CAD render or photo |
| `/public/img/hero-render-2.png` | Secondary hero image | 1920×1080px | Alternative angle/view |
| `/public/img/og-image.png` | Social media preview image | 1200×630px | Used for OpenGraph tags |
| `/public/img/team-placeholder.png` | Team photo or author photo | 800×600px | Optional |

### Technical Diagrams

| File Path | Description | Recommended Format | Notes |
|-----------|-------------|-------------------|-------|
| `/public/img/diagram-mechanism.svg` | Biomechanics/mechanism diagram | SVG preferred | Four-bar linkage schematic |
| `/public/img/diagram-emg-chain.svg` | EMG signal processing chain | SVG preferred | Block diagram |
| `/public/img/diagram-control-arch.svg` | Control architecture diagram | SVG preferred | System block diagram |
| `/public/img/control-flowchart.png` | Control loop flowchart | PNG/SVG | State machine diagram |
| `/public/img/power-distribution.png` | Power distribution diagram | PNG/SVG | Battery → regulators → loads |
| `/public/img/emg-front-end-schematic.png` | EMG analog schematic | PNG (high-res) | Export from CAD tool |
| `/public/img/wiring-diagram.png` | Assembly wiring diagram | PNG (high-res) | Color-coded connections |

### CAD & Assembly

| File Path | Description | Recommended Format | Notes |
|-----------|-------------|-------------------|-------|
| `/public/img/cad-snapshot-1.png` | CAD model isometric view | PNG 1920×1080 | Rendered in CAD software |
| `/public/img/servo-linkage.png` | Servo linkage illustration | PNG/SVG | Kinematic diagram |

### Project Portfolio

| File Path | Description | Recommended Size | Notes |
|-----------|-------------|------------------|-------|
| `/public/img/project-placeholder-1.png` | Portfolio project #1 thumbnail | 800×600px | Replace or remove |
| `/public/img/project-placeholder-2.png` | Portfolio project #2 thumbnail | 800×600px | Replace or remove |
| `/public/img/project-placeholder-3.png` | Portfolio project #3 thumbnail | 800×600px | Replace or remove |
| `/public/img/video-placeholder.png` | Video poster frame | 1920×1080px | Optional |

---

## 🎥 Videos

All videos should be encoded in MP4 (H.264) for broad browser compatibility.

| File Path | Description | Duration | Max Size | Notes |
|-----------|-------------|----------|----------|-------|
| `/public/video/intro.mp4` | 30–60s intro/overview video | 0:30–1:00 | 20 MB | Hero section autoplay |
| `/public/videos/demo-emg-motion.mp4` | Real-time EMG → servo demo | ~0:45 | 20 MB | Close-up of hand + oscilloscope |
| `/public/videos/demo-grasping-bottle.mp4` | User grasping water bottle | ~0:30 | 15 MB | Functional demonstration |
| `/public/videos/demo-grasping-umbrella.mp4` | User gripping umbrella | ~0:25 | 15 MB | Alternative object |
| `/public/videos/demo-grasping-bag.mp4` | User lifting shopping bag | ~0:35 | 15 MB | Load bearing demo |
| `/public/videos/latency-demo.mp4` | High-speed latency measurement | ~0:20 | 10 MB | Split-screen EMG + servo |
| `/public/videos/calibration-demo.mp4` | Calibration procedure walkthrough | ~1:10 | 25 MB | Screen recording + voiceover |

**Encoding Recommendations:**
```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

---

## 📦 3D Print Files

| File Path | Description | Format | Notes |
|-----------|-------------|--------|-------|
| `/public/files/3d/silverhand-stl-pack.zip` | Complete STL pack (all parts) | ZIP | ~8 MB total |
| `/public/files/3d/part-finger-1.stl` | Example individual finger linkage | STL | ~400 KB |
| `/public/files/cad/silverhand-cad.zip` | CAD source files (STEP/Fusion360) | ZIP | ~12 MB |

**STL Pack Contents:**
- `chassis-main.stl`
- `finger-linkage-index.stl`
- `finger-linkage-middle.stl`
- `finger-linkage-ring.stl`
- `finger-linkage-pinky.stl`
- `mounting-bracket.stl`
- `servo-holder.stl`

---

## ⚡ Electronics Files

| File Path | Description | Format | Notes |
|-----------|-------------|--------|-------|
| `/public/files/schematics/emg-schematic.pdf` | EMG analog front-end schematic | PDF | Exported from KiCad/Eagle |
| `/public/files/pcb/silverhand-pcb-gerbers.zip` | PCB Gerber files for manufacturing | ZIP | ~3 MB |

---

## 💻 Firmware & Software

| File Path | Description | Format | Notes |
|-----------|-------------|--------|-------|
| `/public/files/firmware/silverhand-firmware-v0.1.zip` | Complete firmware package | ZIP | ~150 KB |
| `/public/files/firmware/silverhand_emg.ino` | Arduino sketch | .ino | ~12 KB |
| `/public/files/firmware/pico_servo_controller.py` | Pico MicroPython code | .py | ~8 KB |
| `/public/files/firmware/silverhand_control.py` | Pi Zero control script | .py | ~18 KB |

---

## 📄 Documentation Files

| File Path | Description | Format | Notes |
|-----------|-------------|--------|-------|
| `/public/files/bom.csv` | Bill of Materials | CSV | Spreadsheet with part numbers |
| `/public/files/docs/assembly-manual.pdf` | Detailed assembly guide | PDF | ~4 MB with images |
| `/public/files/cv.pdf` | CV/Resume | PDF | Personal CV |
| `/public/files/silverhand-complete-v0.1.zip` | Complete project archive (all files) | ZIP | ~80 MB |

---

## 📝 Content Files (Markdown)

These files contain long-form written content. Edit directly in a text editor.

| File Path | Description | Notes |
|-----------|-------------|-------|
| `/content/comprehensive-summary.md` | Full technical project summary | Verbatim from user input |
| `/content/motivation.md` | Personal motivation and problem statement | Verbatim from user input |
| `/content/how-it-works/biomechanics.md` | Biomechanics explanation (≤150 words) | Technical |
| `/content/how-it-works/emg-sensing.md` | EMG sensing explanation (≤150 words) | Technical |
| `/content/how-it-works/control.md` | Control architecture explanation (≤150 words) | Technical |
| `/content/deep-dive/mechanical.md` | Mechanical design details (200–400 words) | From summary |
| `/content/deep-dive/electronics.md` | Electronics details (200–400 words) | From summary |
| `/content/deep-dive/power.md` | Power system details (200–400 words) | From summary |
| `/content/deep-dive/control.md` | Control model details (200–400 words) | From summary |
| `/content/deep-dive/software.md` | Software/firmware details (200–400 words) | From summary |

---

## 🔄 Replacement Workflow

### For Images:
1. Create/capture the actual content (photos, renders, diagrams)
2. Resize to recommended dimensions
3. Optimize with tools like TinyPNG or ImageOptim
4. Replace the placeholder file at the exact path listed above
5. Verify the image appears correctly on the site

### For Videos:
1. Record or edit the video content
2. Encode to MP4 (H.264 codec) using ffmpeg or video editor
3. Compress to target file size (use CRF 23–28 for quality/size balance)
4. Replace the placeholder file
5. Test playback in multiple browsers

### For Files (STLs, firmware, etc.):
1. Export/generate the actual files
2. Create ZIP archives where indicated
3. Verify file integrity (test unzip, check STL in slicer)
4. Replace the placeholder
5. Test download links on the website

---

## ✅ Verification Checklist

After replacing placeholders, verify:

- [ ] All images load without 404 errors
- [ ] Videos play in Chrome, Firefox, Safari
- [ ] Download links work and files are not corrupted
- [ ] Image alt text is descriptive and accurate
- [ ] File sizes are reasonable (images <500 KB, videos <25 MB)
- [ ] No broken links in navigation or content
- [ ] SEO meta tags reference correct image paths
- [ ] Lighthouse accessibility score >95

---

## 📞 Support

If you encounter issues replacing placeholders or need clarification:

- **GitHub Issues**: https://github.com/yourusername/silverhand/issues
- **Email**: contact@silverhand.dev

---

**Last Updated**: December 2025
