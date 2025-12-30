# Video Placeholders

Replace these placeholder markers with actual video files:

## Required Videos

- `intro.mp4` - 30-60s introduction/overview (autoplay in hero section)
- `demo-emg-motion.mp4` - Real-time EMG control demonstration (~45s)
- `demo-grasping-bottle.mp4` - Grasping water bottle (~30s)
- `demo-grasping-umbrella.mp4` - Gripping umbrella (~25s)
- `demo-grasping-bag.mp4` - Lifting shopping bag (~35s)
- `latency-demo.mp4` - Latency measurement demo (~20s)
- `calibration-demo.mp4` - Calibration procedure (~1:10)

## Video Encoding

Use MP4 (H.264) for browser compatibility:

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4
```

Target file sizes: <25 MB per video
