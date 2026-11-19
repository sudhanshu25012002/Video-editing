// Storefront reel 6: reggaeton/dembow score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { SOL: 29.4, PRICE: 38.7, CTA: 45.6, END: 48.2 };
const CUTS = [7.2, 17.0, 20.5, 29.2, 34.6, 38.7, 42.8, 45.6, 48.2];
const SFX = [
  ...CUTS.map(t => ['whoosh', t - 0.75, 0.5]), ...CUTS.map(t => ['shimmer', t - 0.25, 0]),            // lens glides in, expands
  ['pop', 0.6, 0], ...Array.from({ length: 10 }, (_, k) => ['key', 1.6 + k * 0.12, 0.1]), ['tap', 2.9, 0], ...[3.2, 3.45, 3.7].map(t => ['tick', t, 0.3]),   // search typed, results
  ['error', 5.5, 0], ['strike', 5.85, 0],                                                              // not found
  ['bell', 7.44, 0], ['pop', 8.5, 0], ...Array.from({ length: 12 }, (_, k) => ['key', 9.6 + k * 0.115, 0.1]), ['tap', 11.3, 0], ...[11.9, 12.2, 12.5].map(t => ['pop', t, 0.3]),   // women's kurti online
  ['whoosh', 15.2, 0], ...[15.42, 15.54, 15.66, 15.78].map((t, k) => ['pop', t, (k - 1.5) * 0.3]),     // collections
  ['hmm', 17.1, 0], ['pop', 18.3, 0], ['glitch', 19.1, 0.2], ['error', 19.5, 0.3],                     // lekin aap? instagram only
  ['pop', 20.8, 0], ...[21.2, 21.35, 21.5, 21.8].map(t => ['pop', t, 0]), ...Array.from({ length: 18 }, (_, k) => ['tick', 22.5 + k * 0.32, (k % 3 - 1) * 0.5]),   // traffic flowing
  ['slam', 25.1, 0], ['error', 25.15, 0],                                                              // opportunity missed
  ['bell', 29.46, 0], ['sparkle', 29.55, 0], ['pop', 32.0, 0], ['whoosh', 32.85, 0], ['success', 33.0, 0], ['stamp', 33.6, 0.3],   // logo, your site #1
  ['whoosh', 34.7, 0], ['swish', 35.0, 0], ['pop', 35.32, -0.4], ['pop', 35.96, 0], ['pop', 36.94, 0.4], ['success', 37.9, 0],   // showcase
  ['whoosh', 39.3, 0], ['click', 39.45, 0], ['cash', 40.8, 0], ['sparkle', 40.85, 0], ['pop', 41.98, 0],   // price tag swings
  ['pop', 42.9, 0], ['crunch', 44.62, 0], ['whoosh', 44.7, 0], ...[44.8, 44.9, 45.0, 45.1, 45.2].map((t, k) => ['pop', t, (k - 2) * 0.3]),   // break out of instagram
  ...[46.25, 46.37, 46.49, 46.61, 46.73].map(t => ['key', t, 0.1]), ['tap', 47.45, 0], ['success', 47.55, 0],   // STORE keys, demo
  ['bell', 48.3, 0], ['sparkle', 48.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(50.6, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
