# Build icon no. 3 as a clean geometric SVG (all dimensions measured from the source), plus the white version.
# usage: python3 -I logo3_build.py <dir with bgstops.json + markfit.json> <out dir>
import sys, json, os
d, out = sys.argv[1], sys.argv[2]
stops = json.load(open(os.path.join(d, 'bgstops.json')))
mf = json.load(open(os.path.join(d, 'markfit.json')))['params']
sx, sy, sh, tx, ty = mf[:5]
# official mark → icon space: x' = sx(x-967) + sh(y-948) + tx ; y' = sy(y-948) + ty
A, Cc, E = sx, sh, tx - sx * 967 - sh * 948
D, F = sy, ty - sy * 948
BRACE = 'M710,398 L965,398 L956,450 L930,451 Q860,456 846,525 L712,1290 L698,1375 Q700,1440 760,1447 L781,1448 L773,1498 L520,1498 Q458,1490 461,1420 L528,1040 Q532,960 496,936 Q545,925 565,840 L628,475 Q645,410 710,398 Z'
BARS = ['M808,833 L918,833 L890,993 L780,993 Z', 'M944,833 L1054,833 L1026,993 L916,993 Z', 'M1078,833 L1188,833 L1161,993 L1051,993 Z']
hexc = lambda v: '#%02X%02X%02X' % tuple(int(round(t)) for t in v)

W, H, RX = 276, 296, 56
CX = 137.6                                    # awning symmetry axis
TOP, BAND, R, CY = 55.5, 103.0, 20.45, 111.1  # stripe top, white→lavender line, scallop radius, scallop centre y
def stripe(xt0, xt1, xb0, xb1):
    cx = (xb0 + xb1) / 2; r = (xb1 - xb0) / 2
    return (f'M{xt0 + 1.6:.2f} {TOP}H{xt1 - 1.6:.2f}Q{xt1:.2f} {TOP} {xt1 - 0.7:.2f} {TOP + 1.4:.2f}L{xb1:.2f} {BAND}V{CY}'
            f'A{r:.2f} {r:.2f} 0 0 1 {xb0:.2f} {CY}V{BAND}L{xt0 + 0.7:.2f} {TOP + 1.4:.2f}Q{xt0:.2f} {TOP} {xt0 + 1.6:.2f} {TOP}Z')
mirror = lambda x: 2 * CX - x
left = (67.9, 95.85, 34.45, 75.15); mid = (123.9, 151.3, 117.0, 158.2)
right = tuple(mirror(v) for v in (left[1], left[0], left[3], left[2]))
stripes = ''.join(stripe(*s) for s in (left, mid, right))
gaps = [((left[3] + mid[2]) / 2, (mid[2] - left[3]) / 2), ((mid[3] + right[2]) / 2, (right[2] - mid[3]) / 2)]
dark_scallops = ''.join(f'M{cx - r:.2f} {BAND}H{cx + r:.2f}V{CY}A{r:.2f} {r:.2f} 0 0 1 {cx - r:.2f} {CY}Z' for cx, r in gaps)
awning_back = f'M{left[0]} {TOP}H{right[1]}L{right[3]} {BAND}H{left[2]}Z'
# the three bars of the mark, measured in the icon: slanted parallelograms, 9.6 wide, 3.4 gaps
BY0, BY1 = 183.6, 198.4
bars = ''.join(f'M{127.15 + 13.0 * k:.2f} {BY0}h9.6L{123.55 + 13.0 * k + 9.6:.2f} {BY1}h-9.6Z' for k in range(3))

def svg(white=False):
    if white:
        PUR = (0x5A, 0x17, 0xE6)
        mix = lambda w: hexc([255 * (1 - w) + p * w for p in PUR])
        bg = '<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF"/>'
        aw = [mix(1), mix(0.98), mix(0.62), mix(0.40)]; mk = [mix(1), mix(0.96)]; ul = [mix(0.49), mix(0.67)]
        extras = ''
    else:
        bg = ''.join(f'<stop offset="{y / H:.4f}" stop-color="{hexc(c)}"/>' for y, c in stops)
        aw = ['#FCFEFE', '#FBF3FE', '#D8A6FA', '#BB74FD']; mk = ['#FCFBFE', '#F4E8FB']; ul = ['#C482FE', '#DAB0FA']
        extras = f'''
    <path d="{awning_back}" fill="#FFFFFF" fill-opacity="0.05"/>
    <rect x="52" y="129" width="176" height="84" fill="url(#shade)" mask="url(#shadeMask)" filter="url(#soft)"/>
    <path d="{dark_scallops}" fill="#000000" fill-opacity="0.12"/>'''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="{H}" gradientUnits="userSpaceOnUse">{bg}</linearGradient>
    <linearGradient id="aw" x1="0" y1="{TOP}" x2="0" y2="131.5" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="{aw[0]}"/><stop offset="{(BAND - 0.3 - TOP) / (131.5 - TOP):.4f}" stop-color="{aw[1]}"/>
      <stop offset="{(BAND + 0.3 - TOP) / (131.5 - TOP):.4f}" stop-color="{aw[2]}"/><stop offset="1" stop-color="{aw[3]}"/></linearGradient>
    <linearGradient id="mk" x1="0" y1="398" x2="0" y2="1498" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{mk[0]}"/><stop offset="1" stop-color="{mk[1]}"/></linearGradient>
    <linearGradient id="mkb" x1="0" y1="147" x2="0" y2="238" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{mk[0]}"/><stop offset="1" stop-color="{mk[1]}"/></linearGradient>
    <linearGradient id="ul" x1="61" y1="0" x2="214" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{ul[0]}"/><stop offset="0.6" stop-color="{ul[1]}"/><stop offset="1" stop-color="{ul[0]}"/></linearGradient>
    <linearGradient id="shade" x1="0" y1="129" x2="0" y2="213" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#000" stop-opacity="0.25"/><stop offset="0.2" stop-color="#000" stop-opacity="0.2"/><stop offset="0.45" stop-color="#000" stop-opacity="0.09"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="shadeH" x1="52" y1="0" x2="228" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0.6"/></linearGradient>
    <mask id="shadeMask"><rect x="0" y="0" width="{W}" height="{H}" fill="url(#shadeH)"/></mask>
    <filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="1.2"/></filter>
    <clipPath id="sq"><rect x="0" y="0" width="{W}" height="{H}" rx="{RX}" ry="{RX}"/></clipPath>
  </defs>
  <g clip-path="url(#sq)">
    <rect x="0" y="0" width="{W}" height="{H}" fill="url(#bg)"/>{extras}
  </g>
  <path d="{stripes}" fill="url(#aw)"/>
  <g transform="matrix({A:.6f} 0 {Cc:.6f} {D:.6f} {E:.4f} {F:.4f})" fill="url(#mk)">
    <path d="{BRACE}"/><path d="{BRACE}" transform="rotate(180 967 948)"/>
  </g>
  <path d="{bars}" fill="url(#mkb)"/>
  <rect x="61" y="250.4" width="152.9" height="9.2" rx="4.6" fill="url(#ul)"/>
</svg>
'''
open(os.path.join(out, 'helioslabs-store-logo.svg'), 'w').write(svg(False))
open(os.path.join(out, 'helioslabs-store-logo-white.svg'), 'w').write(svg(True))
print('written')
