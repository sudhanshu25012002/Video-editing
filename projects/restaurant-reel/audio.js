// Restaurant reel: café musette waltz + app / restaurant sound design. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { MAP1: 22.95, RECEPT: 25.4, SMART: 60.8, HELIOS: 64.0, CTA: 72.1, END: 76.35 };
const SFX = [
  ['step', 1.2, -0.5], ['step', 1.55, -0.4], ['step', 1.9, -0.3], ['step', 2.25, -0.2],   // customer walks in
  ['pop', 1.62, 0.4], ['bell', 3.48, 0], ['pop', 5.88, 0.2],                             // welcome, table, QR stand
  ['move', 6.9, 0.3],                                                                      // camera dives into the QR
  ['shutter', 8.64, 0], ['scan', 9.38, 0], ['whoosh', 10.3, 0], ['success', 13.24, 0],     // scan, open menu
  ['tap', 15.36, 0], ['tap', 16.76, 0.2], ['tap', 17.4, 0.2], ['tap', 18.94, 0.25], ['tap', 19.5, 0.2],   // browse, add, +, add
  ['tap', 20.5, 0], ...Array.from({ length: 6 }, (_, k) => ['key', 20.9 + k * 0.11, 0.1]), ['tap', 21.72, 0], ['success', 21.95, 0],   // cart, note, place order
  ['move', 22.95, 0], ['move', 25.7, 0.4], ['notif', 27.4, 0.3],                          // zoom out to the map; order flies to reception
  ['tick', 33.0, 0.2], ['tick', 34.18, 0.2], ['tick', 35.38, 0.2], ['tick', 36.32, 0.2], ['bell', 37.38, 0],   // details highlighted
  ['tap', 42.22, 0], ['move', 42.4, 0.4], ['printer', 43.35, 0.3], ['sizzle', 44.0, -0.4, 5.5],   // forward → kitchen ticket prints, kitchen sizzle
  ['tick', 47.44, 0.2], ['tick', 48.94, 0.1], ['tick', 49.24, 0.1], ['tick', 49.54, 0.1], ['servicebell', 50.5, 0.3],   // table 7, items ready, bell
  ['move', 50.85, -0.3], ...[51.7, 52.0, 52.3, 52.6, 52.9].map((t, k) => ['step', t, 0.4 - k * 0.1]), ['plate', 53.38, 0], ['plate', 53.5, -0.1],   // serve
  ['move', 54.5, -0.4], ['stamp', 55.55, 0], ['stamp', 56.85, 0], ['stamp', 58.75, 0],   // no, no, no
  ['move', 60.8, 0], ['bell', 61.6, 0],                                                    // the whole system
  ['whoosh', 64.0, 0], ['rise', 70.0, 0], ['success', 71.04, 0],                         // HeliosLabs sheet, operations become simple
  ['whoosh', 72.1, 0], ['pop', 74.2, 0], ...Array.from({ length: 10 }, (_, k) => ['key', 75.05 + k * 0.075, 0.1]), ['tap', 75.95, 0.3],   // comment RESTAURANT
  ['whoosh', 76.35, 0], ['bell', 76.6, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(78.4, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
