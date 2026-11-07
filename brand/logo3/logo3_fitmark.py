# Fit the official HeliosLabs mark (braces + 3 bars) to the mark in icon no. 3: affine (scale x/y, shear, translate) maximising overlap.
# usage: python3 -I logo3_fitmark.py <src image>
import sys, json, re
import numpy as np
from PIL import Image, ImageDraw
from scipy.optimize import minimize

BRACE = 'M710,398 L965,398 L956,450 L930,451 Q860,456 846,525 L712,1290 L698,1375 Q700,1440 760,1447 L781,1448 L773,1498 L520,1498 Q458,1490 461,1420 L528,1040 Q532,960 496,936 Q545,925 565,840 L628,475 Q645,410 710,398 Z'
BARS = ['M808,833 L918,833 L890,993 L780,993 Z', 'M944,833 L1054,833 L1026,993 L916,993 Z', 'M1078,833 L1188,833 L1161,993 L1051,993 Z']

def flatten(d):
    pts, cur = [], None
    for cmd, args in re.findall(r'([MLQZ])([^MLQZ]*)', d):
        n = [float(v) for v in re.findall(r'-?[\d.]+', args)]
        if cmd in 'ML': cur = (n[0], n[1]); pts.append(cur)
        elif cmd == 'Q':
            (cx, cy, x, y) = n
            for t in np.linspace(0, 1, 12)[1:]: pts.append(((1 - t) ** 2 * cur[0] + 2 * (1 - t) * t * cx + t * t * x, (1 - t) ** 2 * cur[1] + 2 * (1 - t) * t * cy + t * t * y))
            cur = (x, y)
    return np.array(pts)
brace = flatten(BRACE)
rot = np.array([2 * 967, 2 * 948]) - brace                      # rotate 180° about (967, 948)
polys = [brace, rot] + [flatten(b) for b in BARS]

U = 4
img = Image.open(sys.argv[1]).convert('RGB').crop((635, 145, 911, 441))      # icon coordinates
G = np.asarray(img.resize((276 * U, 296 * U), Image.BICUBIC)).astype(float)[..., 1]
yy = np.arange(296 * U)[:, None] / U
target = (G > 110) & (yy > 140) & (yy < 246)
ty_, tx_ = np.nonzero(target)
print('target bbox', tx_.min() / U, tx_.max() / U, ty_.min() / U, ty_.max() / U)

def xform(p, prm, k=0):
    sx, sy, sh, tx, ty = prm[:5]; ex = prm[5:] if len(prm) > 5 else [0, 0, 0, 0]
    dx = ex[0] if k == 0 else ex[1] if k == 1 else ex[2]; dy = ex[3] if k >= 2 else 0
    x = (p[:, 0] - 967) * sx + (p[:, 1] - 948) * sh + tx + dx; y = (p[:, 1] - 948) * sy + ty + dy
    return np.stack([x, y], 1)

def raster(prm):
    im = Image.new('1', (276 * U, 296 * U), 0); d = ImageDraw.Draw(im)
    for k, p in enumerate(polys): d.polygon([tuple(v) for v in xform(p, prm, k) * U], fill=1)
    return np.asarray(im)

def loss(prm):
    m = raster(prm); inter = (m & target).sum(); uni = (m | target).sum()
    return 1 - inter / uni

# initial guess from bounding boxes (official mark: x 461..1473, y 398..1498)
bx0, bx1, by0, by1 = tx_.min() / U, tx_.max() / U, ty_.min() / U, ty_.max() / U
x0 = [(bx1 - bx0) / 1012, (by1 - by0) / 1100, 0.0, (bx0 + bx1) / 2, (by0 + by1) / 2]
best = None
for sh0 in (-0.02, -0.01, 0.0, 0.01):
    r = minimize(loss, x0[:2] + [sh0] + x0[3:] + [0, 0, 0, 0], method='Nelder-Mead', options=dict(xatol=1e-6, fatol=1e-6, maxiter=3000))
    r = minimize(loss, r.x, method='Nelder-Mead', options=dict(xatol=1e-7, fatol=1e-7, maxiter=3000))
    print('start shear', sh0, 'IoU', round(1 - r.fun, 4))
    if best is None or r.fun < best.fun: best = r
print('IoU', round(1 - best.fun, 4), 'params', [round(v, 5) for v in best.x])
json.dump(dict(params=list(best.x), iou=1 - best.fun), open(sys.argv[1].rsplit('/', 1)[0] + '/markfit.json', 'w'))
