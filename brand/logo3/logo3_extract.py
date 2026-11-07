# Cut icon no. 3 out of the sheet exactly (transparent outside its rounded square), and make a white version.
# usage: python3 -I logo3_extract.py <src image> <out dir>
import sys, os
import numpy as np
from PIL import Image
from collections import deque

src, out = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
X0, Y0, X1, Y1 = 630, 140, 916, 446          # icon spans x 635–910, y 145–440; 5 px margin for the soft edge
c = a[Y0:Y1, X0:X1].copy(); h, w, _ = c.shape
L = c.max(axis=2)

# inside = connected region of the icon (flood fill from its centre, threshold between background ~35 and icon edge ~140+)
inside = np.zeros((h, w), bool); q = deque([(h // 2, w // 2)]); inside[h // 2, w // 2] = True
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        yy, xx = y + dy, x + dx
        if 0 <= yy < h and 0 <= xx < w and not inside[yy, xx] and L[yy, xx] > 90:
            inside[yy, xx] = True; q.append((yy, xx))

# anti-aliased alpha on the boundary ring, colour taken from the nearest inside pixel (no dark fringe)
alpha = inside.astype(np.float32); rgb = c.copy()
for y in range(h):
    for x in range(w):
        if inside[y, x]: continue
        ys, xs = slice(max(0, y - 2), y + 3), slice(max(0, x - 2), x + 3)
        nb = inside[ys, xs]
        if not nb.any(): continue
        cand = np.argwhere(nb); d = ((cand[:, 0] + ys.start - y) ** 2 + (cand[:, 1] + xs.start - x) ** 2)
        ny, nx = cand[d.argmin()] + [ys.start, xs.start]
        ref = L[ny, nx]; alpha[y, x] = np.clip((L[y, x] - 40) / max(1, ref - 40), 0, 1)
        rgb[y, x] = c[ny, nx]
A = (alpha * 255).round().astype(np.uint8)

def save(rgbarr, name):
    im = Image.fromarray(np.dstack([np.clip(rgbarr, 0, 255).round().astype(np.uint8), A]), 'RGBA')
    im.save(os.path.join(out, name + '.png'))
    big = im.resize((int(round(w * 1024 / h)), 1024), Image.LANCZOS); big.save(os.path.join(out, name + '-1024.png'))
    return im

save(rgb, 'logo3-original')

# white version: white becomes the base colour; the white artwork becomes brand purple, keeping its shading
PUR = np.array([0x5A, 0x17, 0xE6], np.float32); WHT = np.array([255, 255, 255], np.float32)
wness = np.clip((rgb[..., 1] - 30) / (246 - 30), 0, 1)[..., None]   # below ~30 is the purple background (incl. compression noise) -> pure white      # green channel: ~0 on the purples, ~1 on white, ~0.55 on lavender
white = WHT * (1 - wness) + PUR * wness
save(white, 'logo3-white')
print('size', w, h)
