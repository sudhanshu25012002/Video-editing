# Rebuild the uploaded reel frame by frame: retime to the voiceover and replace abrupt transitions with smooth ones.
# usage: python3 -I refine.py <frames_dir> <out_dir>
import sys, os, math
import numpy as np
from PIL import Image

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
FPS = 30
N_SRC = len([f for f in os.listdir(SRC) if f.endswith('.png')])
DUR = 25.62
N_OUT = int(round(DUR * FPS))
W, H = 1080, 1920
cache = {}

def frame(i):
    i = max(0, min(N_SRC - 1, i))
    if i not in cache:
        if len(cache) > 60: cache.clear()
        cache[i] = np.asarray(Image.open(os.path.join(SRC, '%04d.png' % (i + 1))).convert('RGB'), dtype=np.float32)
    return cache[i]

def at(t):
    """original frame at time t, linearly blended between neighbours (smooth slow motion)"""
    x = t * FPS; i = int(math.floor(x)); f = x - i
    if f < 0.02: return frame(i)
    if f > 0.98: return frame(i + 1)
    return frame(i) * (1 - f) + frame(i + 1) * f

def ease(p): return p * p * (3 - 2 * p)

def scaled(img, s):
    """scale about the centre, keeping 1080x1920 (crop or pad with the edge colour)"""
    if abs(s - 1) < 1e-3: return img
    im = Image.fromarray(img.astype(np.uint8)); w, h = int(round(W * s)), int(round(H * s))
    im = im.resize((w, h), Image.BICUBIC)
    if s > 1:
        l, t = (w - W) // 2, (h - H) // 2; return np.asarray(im.crop((l, t, l + W, t + H)), dtype=np.float32)
    bg = Image.new('RGB', (W, H), tuple(int(c) for c in img[5, 5])); bg.paste(im, ((W - w) // 2, (H - h) // 2)); return np.asarray(bg, dtype=np.float32)

def shift(img, dy, bg):
    dy = int(round(dy)); out = np.empty_like(img); out[:] = bg
    if dy >= 0: out[dy:] = img[:H - dy]
    else: out[:H + dy] = img[-dy:]
    return out

# time map: (out_t, orig_t) anchors, piecewise linear; transitions handled separately
MAP = [(0.0, 0.0), (5.20, 5.20), (5.75, 5.75), (9.20, 9.20), (9.60, 9.60), (13.30, 13.30), (13.70, 13.82),
       (14.20, 14.80),   # ₹ digits roll in quicker so "WEBSITE" lands on the word "website"
       (15.16, 15.20),   # "+ HOSTING" on "hosting"
       (15.88, 15.70),   # "+ MAINTENANCE" on "maintenance"
       (17.22, 15.72),   # hold a clean frame while "sab include" is spoken
       (17.40, 15.90),   # subtitle switches at normal speed, right on "Plans sirf ₹999"
       (20.55, 21.55),   # "Plans sirf ₹999 mahine se shuru" section, tightened to the voice
       (21.05, 21.85),   # circle opens onto the purple CTA as "Apna business online…" begins
       (24.82, 25.62)]
def orig(t):
    for (a0, b0), (a1, b1) in zip(MAP, MAP[1:]):
        if t <= a1: return b0 + (b1 - b0) * (t - a0) / max(1e-6, a1 - a0)
    return MAP[-1][1]

# smooth dissolves (with a slight push-in) replacing the overlapping / ghosting frames
XF = [(5.20, 5.75), (9.20, 9.60), (13.30, 13.70)]
XB = {13.30: 13.82}   # entry frame of the next scene, where it differs from the window end
CIRCLE = (20.55, 21.05)
yy, xx = np.mgrid[0:H, 0:W]; dist = np.sqrt((xx - 540.0) ** 2 + (yy - 960.0) ** 2)

for n in range(N_OUT):
    t = n / FPS
    img = None
    for a, b in XF:
        if a <= t < b:
            # dip: outgoing drifts up and fades to the background, then the next scene rises in (no double image)
            p = (t - a) / (b - a); pa = ease(min(1, p / 0.55)); pb = ease(max(0, (p - 0.45) / 0.55))
            FA, FB = at(a), at(XB.get(a, b)); bg = FA[1880:1915, 20:60].reshape(-1, 3).mean(0)
            A = shift(scaled(FA, 1 + 0.02 * pa), -70 * pa, bg); B = shift(scaled(FB, 0.98 + 0.02 * pb), 70 * (1 - pb), bg)
            img = bg * (1 - (1 - pa) - pb) + A * (1 - pa) + B * pb
            img[:170, :170] = FA[:170, :170] if p < 0.5 else FB[:170, :170]   # corner logo stays put
    if img is None and CIRCLE[0] <= t < CIRCLE[1]:
        p = ease((t - CIRCLE[0]) / (CIRCLE[1] - CIRCLE[0]))
        A = scaled(at(orig(CIRCLE[0])), 1 + 0.05 * p); B = at(21.85)
        r = 1110 * p; m = np.clip((r - dist) / 3.0, 0, 1)[..., None]   # soft 3px edge
        img = A * (1 - m) + B * m
    if img is None:
        img = at(min(orig(t), (N_SRC - 1) / FPS))
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(os.path.join(OUT, '%04d.png' % (n + 1)), compress_level=1)
print('frames', N_OUT)
