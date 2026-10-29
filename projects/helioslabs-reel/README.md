# HeliosLabs reel

A 44-second, 1920x1080 promo reel at 120 BPM, built entirely in code.

## Files
| File | Purpose |
|---|---|
| `reel.html` | The whole animation. `window.seek(t)` sets every style as a pure function of time (no CSS animations or timers). |
| `render.js` | `node render.js beats` renders one frame per beat for review; `node render.js full` renders 60fps x 3 subframes. |
| `audio.html`, `audio.js` | The soundtrack, written with the Web Audio API (OfflineAudioContext) and exported to `build/music.wav`. |
| `logo.b64` | The logo, embedded at render time. |

## Through-line object
The three slanted bars from the logo mark. In order they become an ellipsis, a curtain over the product grid, the Message button,
the chat typing dots, a browser address bar, the Order button, the feature-panel strips, the checkout progress,
the underlines of ₹999, and finally the logo's own bars.

## Build
```bash
node render.js full 4
node audio.js
ffmpeg -framerate 180 -i build/frames/%05d.jpg -i build/mix.wav \
  -vf "tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest helioslabs-reel.mp4
```
`build/mix.wav` is the music mixed with the voiceover (see below), ducked under the voice.

## Voiceover
The guide voiceover uses the free Piper voice `hi_IN-priyamvada-medium`, run offline. Its training data is
CC BY-NC-SA 4.0 (non-commercial), so record a human voiceover, or use a voice licensed for commercial use, before running this as an ad.
