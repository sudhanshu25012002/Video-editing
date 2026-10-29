#!/bin/bash
# usage: text_reel.sh out.mp4 "Line 1" "Line 2" ...  -> 1080x1920 reel, 2.5s per line, fade-in text
set -e
OUT=$1; shift; F=$(fc-match -f '%{file}' 'DejaVu Sans:bold'); n=0; FILT=""
for L in "$@"; do s=$(echo "$n*2.5"|bc); e=$(echo "$s+2.5"|bc)
  T=${L//\'/}; T=${T//:/\\:}
  FILT+="drawtext=fontfile=$F:text='$T':fontsize=84:fontcolor=white:x=(w-tw)/2:y=(h-th)/2:alpha='if(lt(t-$s,0.4),(t-$s)/0.4,1)':enable='between(t,$s,$e)',"
  n=$((n+1)); done
D=$(echo "$n*2.5"|bc)
ffmpeg -v error -y -f lavfi -i "gradients=s=1080x1920:d=$D:c0=0xff6b9d:c1=0x6a3cff:speed=0.02" -vf "${FILT%,}" -c:v libx264 -pix_fmt yuv420p -r 30 "$OUT"
echo "$OUT ($D s)"
