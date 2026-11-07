# Car rental reel (9:16, 54.6 s)

A purple car speeds across the screen and wipes in each scene (direction alternates). Rigged characters
(customer searching on a phone, an overwhelmed staff member, the owner). Score: nu-disco / funk driving groove,
low-passed during the problems and opened up for the solution.

```bash
node audio.js && node render.js full 4 v
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav -i vo/voiceover.wav -filter_complex \
 "[0:v]tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB[v];[2:a]aresample=44100,volume=1.4,pan=stereo|c0=c0|c1=c0,apad,asplit=2[vo][key];\
  [1:a]volume=0.28,equalizer=f=2000:t=o:w=1.5:g=-6[m];[m][key]sidechaincompress=threshold=0.015:ratio=6:attack=12:release=300[md];[md][vo]amix=inputs=2:normalize=0,alimiter=limit=0.92[a]" \
 -map "[v]" -map "[a]" -r 60 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -t 54.6 rental-reel-9x16.mp4
```
The guitar chops and stabs sit in the speech band, so the music gets a 2 kHz dip and a lower level than other reels.
