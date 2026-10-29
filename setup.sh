#!/bin/bash
# Installs the free video toolkit: FFmpeg, yt-dlp, Whisper, Edge TTS, Manim, Remotion, HyperFrames.
set -e
command -v ffmpeg >/dev/null || { sudo apt-get update && sudo apt-get install -y ffmpeg; }
pip install -q -U yt-dlp instaloader gallery-dl faster-whisper edge-tts
pip install -q manim || echo "manim skipped (needs cairo/pango system libs)"
python3 -c "from faster_whisper import WhisperModel; WhisperModel('small', device='cpu', compute_type='int8')"
[ -d remotion ] || npx -y create-video@latest remotion --blank --no-tailwind || echo "remotion: run 'npx create-video@latest' manually"
echo "Done. Analyze a reel: tools/reel.sh <url-or-file>"
