# Online-store reel: refine pass (25.6 s)

Source: an existing ₹999 online-store reel (WhatsApp export, 1080×1920, 30 fps). Nothing is added. The original
audio (voice + music) is stream-copied untouched, and every output frame is rebuilt from the original frames:

- **Glitchy morphs at 5.2 s, 9.2 s and 13.3 s** (doubled headlines, ghost phone copies) are replaced with a clean
  dip transition: the outgoing scene drifts up and fades, then the next rises in. The corner logo holds steady.
- **₹999 scene retimed to the voice:** "WEBSITE / + HOSTING / + MAINTENANCE" land on the spoken words, and the
  burned-in subtitle switches to "Plans sirf ₹999…" when that line starts (it was 1.5 s early).
- **₹999 → purple CTA** was a two-frame jump; it is now a smooth circle-open (what the original burst intended),
  and the CTA starts with "Apna business online le jaane ko taiyaar?" instead of 1.5 s after it.

```bash
mkdir fr && ffmpeg -i input.mp4 -vsync 0 fr/%04d.png
python3 -I refine.py fr out
ffmpeg -framerate 30 -i out/%04d.png -i input.mp4 -map 0:v -map 1:a -c:v libx264 -crf 17 -pix_fmt yuv420p -c:a copy -t 25.62 online-store-reel-refined-9x16.mp4
```
