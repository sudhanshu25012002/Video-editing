# School fee system reel (HeliosLabs)

A 42-second, 1080x1920 reel at 120 BPM: music only, with the script as subtitles.

**Concept: the register line becomes the system.** One purple ruled line keeps reshaping, scene by scene:
register rows → register page → a pile of registers → clock → app icon → 3D layer stack → dashboard → checkmark →
full purple fill → the HeliosLabs logo → back to the opening line, so the reel loops.

| Time (s) | Technique |
|---|---|
| 0–8 | Hook + kinetic type |
| 8–17 | Shape morphing |
| 17–24.5 | 2D to 3D |
| 24.5–31.5 | Data / UI |
| 31.5–37.5 | Strongest moment (strike-through, checkmark, fill) |
| 37.5–42 | End title, then the loop |

## Build
```bash
node render.js beats 4 v     # one frame per beat, for review
node render.js full 4 v      # 60fps x 3 subframes
node audio.js                # soundtrack -> build-v/music.wav
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav \
  -vf "tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -af "volume=0.9,alimiter=limit=0.9" -c:a aac -t 42 school-fee-reel-9x16.mp4
```

The dashboard shows sample rows (Roll 01–05) as illustration only, not real school data.

## Voiceover version
`vo/voiceover.wav` is the voiceover (converted from the WhatsApp audio). `VO_MAP` in `reel.html` remaps animation time to the spoken
words, and `VO_SUBS` makes the subtitles follow the voice. The score (`score.html`) is calm at first, tense from "aasaan nahi tha", and lifts on
"Is problem ko solve karne ke liye". Sound effects (`vo-audio.js`): pen clicks for the entries, a whoosh as the pages pile up, clock ticks,
clicks as the layers split, a whoosh as the rows sort, a "paid" bell, a strike-through swipe and a fill whoosh.
```bash
node vo-audio.js && node render-vo.js full 4 v vo   # then mix as in projects/website-reel/README.md
```
