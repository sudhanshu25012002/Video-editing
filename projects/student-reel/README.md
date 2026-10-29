# Student Management System reel (HeliosLabs)

A 44-second, 1080x1920 reel at 120 BPM. It has background music with bubble-burst sounds (no voiceover), and the script as subtitles.

**Concept: one student card becomes the whole system.** A purple card opens into a book, then becomes a student profile.
It multiplies into many cards, collapses into a messy spreadsheet, and folds into one 3D system. That opens into the Student Management
dashboard (Profile, Attendance, Records and Progress tabs), then a "Smarter" progress ring. Purple then floods the screen for the
call to action and becomes the logo, before shrinking back to the opening card so the reel loops.

All student data shown (Roll 12, Class 7-B, subjects and attendance) is illustrative, not real records.

## Build
```bash
node render.js beats 4 v && node render.js full 4 v && node audio.js
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav \
  -vf "tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -af "volume=0.9,alimiter=limit=0.9" -c:a aac -t 44 student-reel-9x16.mp4
```
