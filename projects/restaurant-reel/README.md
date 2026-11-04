# Restaurant reel (9:16, 78.4 s)

QR-code ordering story told as a "follow the order" camera over a restaurant map
(table → phone → reception → kitchen → serve), with an interactive app demo (touch dot,
ripples, add / quantity steppers, typed note, button presses). Score: café musette waltz.

```bash
node audio.js && node render.js full 4 v
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav -i vo/voiceover.wav -filter_complex \
 "[0:v]tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB[v];[2:a]aresample=44100,volume=1.6,pan=stereo|c0=c0|c1=c0,apad,asplit=2[vo][key];\
  [1:a]volume=0.22[m];[m][key]sidechaincompress=threshold=0.02:ratio=6:attack=15:release=350[md];[md][vo]amix=inputs=2:normalize=0,alimiter=limit=0.92[a]" \
 -map "[v]" -map "[a]" -r 60 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -t 78.4 restaurant-reel-9x16.mp4
```
The ElevenLabs voice is ~5 dB quieter than the Cartesia ones and the accordion sits in the speech band,
so the voice is lifted (+4 dB) and the music mixed lower (0.22) than in the other reels.
