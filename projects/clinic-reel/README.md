# clinic-reel

Dental clinic case-study reel (under 1 min). The original Cartesia voiceover (`vo/original.wav`, 71.8s) is tightened to 57.6s (`vo/voiceover.wav`). Pauses are shortened to 0.18s, then the voice is sped up 1.21× with rubberband (pitch and formants preserved), so every word is kept. Scenes change with diagonal slice wipes. Score and SFX are in `audio.html` / `audio.js`, and the end card uses the full logo.

```bash
node render.js beats 4 v && node render.js full 4 v && node audio.js   # then mix with vo/voiceover.wav, ducked
```
