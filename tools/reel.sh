#!/bin/bash
# usage: reel.sh <url-or-file> ; downloads/copies the video, extracts frames, scene cuts and a transcript into output/reel_<ts>/
set -e
S="${OUT_DIR:-$(dirname "$0")/../output}"; mkdir -p "$S"
O=$S/reel_$(date +%s); mkdir -p $O/frames
if [ -f "$1" ]; then cp "$1" $O/video.mp4; else
  yt-dlp --js-runtimes node -q -f "bv*+ba/b" --merge-output-format mp4 -o "$O/video.%(ext)s" --write-info-json "$1"; fi
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height,r_frame_rate -of compact $O/video.mp4 > $O/info.txt
ffmpeg -v error -i $O/video.mp4 -vf "fps=1,scale=480:-1" $O/frames/%03d.jpg
ffmpeg -v error -i $O/video.mp4 -vf "select='gt(scene,0.3)',showinfo" -vsync vfr -f null - 2>&1 | grep -o 'pts_time:[0-9.]*' > $O/cuts.txt || true
python3 -c "
from faster_whisper import WhisperModel
m=WhisperModel('small',device='cpu',compute_type='int8')
s,i=m.transcribe('$O/video.mp4')
print('lang',i.language)
[print(f'[{x.start:.1f}-{x.end:.1f}] {x.text}') for x in s]" > $O/transcript.txt 2>/dev/null || echo "no speech/audio" > $O/transcript.txt
echo $O; cat $O/info.txt; echo "cuts: $(wc -l < $O/cuts.txt)  frames: $(ls $O/frames|wc -l)"; cat $O/transcript.txt
