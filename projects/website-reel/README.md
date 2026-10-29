# "Beyond social media" website reel (HeliosLabs)

A 49-second, 1080x1920 reel told as a story. It has a composed score and sound effects only at story moments, with the script as subtitles.

## Story and camera
The reel is laid out on one large canvas, and the camera travels between scenes. It follows things falling, then uses whip-pans with directional motion blur.

| Time (s) | Scene |
|---|---|
| 0–4.8 | Shop's Instagram profile: followers climb, posts fill in, a DM arrives |
| 4.8–12.8 | ID blocked: the world goes dark, a lock appears, and followers, products and the DM fall away |
| 12.8–18 | "Audience ≠ Control": the platform slab tilts and the shop slides |
| 18–24.4 | Beige floods back and a website builds block by block: add to cart, "Order placed" |
| 24.4–27.8 | Search "cakes near me": your.shop rises to the top result |
| 27.8–35.4 | Instagram sends customers into the website; the phone leaves and the website stays |
| 35.4–40.4 | Instagram = Promotion (megaphone); Website = digital property (key turns, door opens) |
| 40.4–44.6 | ₹999/month price tag swings in |
| 44.6–49 | Logo and "Build your business beyond social media." |

## Sound
- Score (100 BPM):
  - a happy pluck tune at the start
  - the music cuts dead on the block, then a dark drone with a heartbeat pulse and a riser
  - an uplifting C–G–Am–F section from the website reveal, ending on a final C chord
- Sound effects: a DM notification, a lock clunk, a falling whoosh, an order ding, typing clicks, soft whooshes on the camera swipes, a key turn and a tag swing.

The shop, follower counts and search results are an illustrative demo, and no platform logos are used.

## Build
```bash
node render.js beats 4 v && node render.js full 4 v && node audio.js
ffmpeg -framerate 180 -i build-v/frames/%05d.jpg -i build-v/music.wav \
  -vf "tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB" -r 60 \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -af "alimiter=limit=0.9" -c:a aac -t 49 website-reel-9x16.mp4
```

## Voiceover version
`vo/voiceover.mp3` is the ElevenLabs voiceover. Each line's start was measured with Whisper (word timestamps)
and silence detection, then stored as `VO_MAP` (voiceover time → original animation time). Every scene and
subtitle starts exactly on its spoken line. The score is re-arranged to the same cues: the music cuts at 5.2s
("band ho gayi"), the lift lands at 23.17s ("Isiliye…") and the final chord at 59.17s. It ducks under the voice.
```bash
node audio.js vo && node render.js full 4 v vo
ffmpeg -framerate 180 -i build-v-vo/frames/%05d.jpg -i build-v-vo/music.wav -i vo/voiceover.mp3 -filter_complex \
 "[0:v]tmix=frames=3,select='eq(mod(n\,3)\,2)',setpts=N/60/TB[v];[2:a]aresample=44100,pan=stereo|c0=c0|c1=c0,apad,asplit=2[vo][key];\
  [1:a]volume=0.55[m];[m][key]sidechaincompress=threshold=0.03:ratio=6:attack=15:release=400[md];[md][vo]amix=inputs=2:normalize=0,alimiter=limit=0.92[a]" \
 -map "[v]" -map "[a]" -r 60 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -t 60.5 website-reel-voiceover-9x16.mp4
```
