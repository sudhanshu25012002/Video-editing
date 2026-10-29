# Video-editing

A free toolkit for analyzing and making short videos (Reels, Shorts, TikTok) with Claude.

## Setup
```bash
./setup.sh
```
Installs FFmpeg, yt-dlp, instaloader, gallery-dl, faster-whisper, edge-tts and Manim, and creates a blank Remotion project.

## Tools
| Command | What it does |
|---|---|
| `tools/reel.sh <url-or-file>` | Downloads a reel (or takes a local file), then saves its format info, one frame per second, scene-cut times and a speech transcript to `output/reel_<timestamp>/` |
| `tools/text_reel.sh out.mp4 "Line 1" "Line 2" ...` | Renders a 1080x1920 reel with fading text on an animated gradient, 2.5 s per line |
| `python3 -m edge_tts --text "..." --write-media voice.mp3` | Free AI voiceover |

## Recommended free Claude plugins
Remotion, IT Reelsmaker and Social Media Skills (from the Anthropic plugin directory).

## Known limits
- YouTube blocks downloads from cloud servers (403). Use a local machine, or upload the file instead.
- Edge TTS can't reach Microsoft's server from Claude cloud sessions; it works on a local machine.
- None of these tools generate realistic AI footage; that needs paid services such as Kling, Runway or Veo.
