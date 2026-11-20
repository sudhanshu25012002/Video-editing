// Storefront reel 7: bhangra-pop score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { SOL: 24.36, LOGO: 35.68, CTA: 43.0, END: 46.2 };
const CUTS = [4.9, 9.6, 17.2, 24.1, 26.7, 35.6, 39.6, 43.0, 46.2];
const SFX = [
  ...CUTS.map(t => ['swish', t - 0.3, 0]), ...CUTS.map(t => ['pop', t + 0.05, 0]),              // swipe-up
  ['whoosh', 0.2, 0], ...Array.from({ length: 9 }, (_, k) => ['tick', 1.0 + k * 0.07, (k % 3 - 1) * 0.4]),   // phone + first tiles
  ['pop', 1.66, 0], ['pop', 2.58, 0], ['pop', 3.38, 0], ['counter', 2.6, 0.2, 10, 0.6], ['counter', 3.4, -0.2, 14, 0.6],   // 50 / 100 / 200
  ['whoosh', 5.3, 0.3], ['whoosh', 6.6, -0.3], ['whoosh', 7.6, 0.3], ['hmm', 8.25, 0], ['error', 8.35, 0.2],   // lens searching, "?"
  ['pop', 10.54, -0.3], ['msg', 11.64, -0.3], ['msg', 13.2, -0.3], ['msg', 14.84, -0.3], ['hmm', 16.1, 0.3],   // old post, price, same design
  ...[17.9, 18.4, 18.9, 19.4, 20.4, 20.9, 21.4, 21.9, 22.4, 22.9, 23.4].map((t, k) => ['click', t, (k % 2 - 0.5) * 0.6]), ['fall', 20.4, 0.3], ['error', 22.8, 0],   // uploads push bestseller down
  ['rise', 24.4, 0], ['bell', 25.88, 0], ['sparkle', 25.95, 0],                                // solution: store
  ...[26.75, 26.8, 26.85, 26.9].map((t, k) => ['pop', t + k * 0.12, (k - 1.5) * 0.3]), ...Array.from({ length: 8 }, (_, k) => ['tick', 28.6 + k * 0.1, (k % 2 - 0.5) * 0.6]), ['success', 29.6, 0], ['pop', 30.45, 0],   // shelves, tiles snap in
  ['whoosh', 31.8, 0], ['tap', 33.0, 0.2], ['swish', 33.4, 0], ['tap', 34.62, 0],              // phone, tab, browse
  ['bell', 35.68, 0], ['sparkle', 35.8, 0], ...Array.from({ length: 8 }, (_, k) => ['pop', 36.0 + k * 0.05, (k % 3 - 1) * 0.5]), ['whoosh', 38.0, 0],   // logo + orbit
  ['whoosh', 40.9, 0], ['cash', 41.15, 0], ['pop', 41.98, 0], ...[42.2, 42.32, 42.44].map(t => ['success', t, 0]),   // ₹999 / month
  ...Array.from({ length: 5 }, (_, k) => ['key', 43.4 + k * 0.1, 0.1]), ['tap', 44.1, 0.3], ['success', 44.2, 0.3], ['rise', 44.5, 0], ...Array.from({ length: 6 }, (_, k) => ['pop', 44.7 + k * 0.06, (k % 2 - 0.5) * 0.6]),   // comment, globe
  ['bell', 46.3, 0], ['sparkle', 46.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(48.6, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
