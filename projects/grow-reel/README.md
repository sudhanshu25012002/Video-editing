# "Technology that grows" reel (HeliosLabs)

A 38-second, 1080x1920 reel at 120 BPM: music with pops only, with the script as subtitles.

**Concept: one bar grows. Does the system grow with it?** A purple growth bar (the business) does the following, in order:
- outgrows the ink "system" bar
- becomes the header of a manual checklist
- gets buried by stacking rows that jam
- turns into a 3D tower that adds one layer per beat
- unfolds into three product cards (Websites, E-commerce platforms, Custom software)
- shoots up into a full-screen fill
- becomes the HeliosLabs logo, then shrinks back to the opening bar so the reel loops

| Time (s) | Technique |
|---|---|
| 0–6.5 | Hook + kinetic type (bar chart) |
| 6.5–10 | Shape morph (checklist) |
| 10–17.5 | Data overload (rows stack and jam) |
| 17.5–21.5 | 2D to 3D tower |
| 21.5–28 | UI cards |
| 28–32.5 | Strongest moment (repetitive loop struck out, bar takes the frame) |
| 32.5–38 | End title, then the loop |

## Build
```bash
node render.js beats 4 v && node render.js full 4 v && node audio.js
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav \
  -vf "tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -af "volume=0.9,alimiter=limit=0.9" -c:a aac -t 38 grow-reel-9x16.mp4
```
