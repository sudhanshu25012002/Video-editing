// Storefront reel 2: acoustic-pop score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { PROB: 4.66, SOL: 20.48, PRICE: 56.0, END: 63.2 };
const MORPHS = [4.5, 8.4, 14.1, 19.6, 23.4, 27.3, 33.0, 36.6, 42.3, 47.2, 54.0, 56.0, 59.2, 63.2];
const SFX = [
  ...MORPHS.map((t, k) => ['swish', t - 0.55, k % 2 ? 0.4 : -0.4]),               // the shared card morphs
  ['pop', 0.1, 0], ['tap', 0.9, 0.2], ['pop', 0.95, 0], ['sparkle', 1.0, 0],     // post appears, double-tap like
  ...[2.68, 3.0, 3.3, 3.6].map((t, k) => ['msg', t, k % 2 ? 0.4 : -0.4]),        // comments pop
  ['hmm', 5.1, 0], ...[6.54, 6.64, 6.74, 6.84, 6.94].map((t, k) => ['pop', t, (k - 2) * 0.3]),   // orders? problems orbit
  ['notif', 8.96, 0.3], ['notif', 10.5, -0.3], ['notif', 12.36, 0.3], ['msg', 12.9, -0.2], ['msg', 13.3, 0.2],   // DMs flood in
  ...Array.from({ length: 12 }, (_, k) => ['tick', 15.0 + k * 0.3, 0.3]), ['whoosh', 16.26, 0.5], ['whoosh', 17.12, 0.5], ['error', 18.7, 0],   // clock races, time drains
  ['rise', 19.6, 0], ['bell', 20.48, 0], ['sparkle', 20.5, 0],                    // card becomes the logo
  ...Array.from({ length: 12 }, (_, k) => ['key', 23.8 + k * 0.066, 0.1]), ['success', 25.7, 0],   // URL typed, store fills in
  ['pop', 28.74, -0.3], ['tick', 29.56, 0], ['tick', 29.66, 0.2], ['click', 30.34, 0], ['click', 30.6, 0], ['tap', 31.76, 0], ['whoosh', 31.85, 0], ['pop', 31.4, 0],   // products, prices, collections, scroll
  ['tap', 33.76, 0.3], ['pop', 33.9, 0.4], ['tap', 35.18, 0], ['success', 35.45, 0],   // add to cart, place order, success
  ['whoosh', 38.66, 0.5], ['whoosh', 39.46, 0.5], ['error', 40.7, 0], ['success', 41.45, 0],   // hosting, maintenance, tension → relief
  ['toggle', 42.9, 0.4], ['toggle', 43.6, 0.4], ['toggle', 44.3, 0.4], ['pop', 45.8, 0],   // switches on
  ...[49.14, 49.34, 49.54].map(t => ['tick', t, -0.4]), ['whoosh', 51.8, 0.6], ...[52.4, 52.6, 52.8].map(t => ['tick', t, 0.4]),   // win-win
  ['sparkle', 54.1, 0], ['counter', 56.6, 0, 12, 1.0], ['cash', 57.15, 0],        // name again, ₹999
  ['whoosh', 59.5, -0.5], ['whoosh', 61.14, 0.5], ['sparkle', 62.2, 0],            // final line, hearts
  ['bell', 63.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(65.2, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
