// Storefront reel 8: liquid drum & bass score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { HALF: 9.2, SOL: 21.64, CTA: 39.5, END: 43.2 };
const CUTS = [4.9, 9.2, 13.6, 21.4, 25.2, 32.0, 36.4, 39.5, 43.2];
const SFX = [
  ...CUTS.map(t => ['flap', t - 0.45, -0.3]), ...CUTS.map(t => ['flap', t + 0.05, 0.3]),        // tiles flip in / out
  ['pop', 0.08, 0], ['hmm', 0.6, 0],                                                             // thought bubble
  ...[2.0, 2.6, 3.2, 3.8].map(t => ['slam', t + 0.25, 0]),                                        // brand blocks stack
  ...[5.1, 5.27, 5.44, 5.61, 5.78, 5.95].map((t, k) => ['pop', t, (k % 3 - 1) * 0.5]), ['whoosh', 6.6, 0], ['counter', 7.0, 0.2, 16, 1.6], ['success', 8.7, 0],   // new products, followers
  ['whoosh', 9.3, 0], ['tick', 10.5, -0.3], ['tick', 11.5, 0.3], ['error', 12.64, 0], ['hmm', 12.9, 0],   // balancing on one pillar
  ['swish', 14.84, 0.5], ['error', 14.95, 0], ['swish', 16.28, 0.5], ['error', 16.4, 0], ['swish', 18.14, 0.5], ['error', 18.26, 0], ['slam', 20.66, 0],   // three hits, Toh?
  ['rise', 23.6, 0], ['success', 24.5, 0],                                                       // second pillar, stable
  ['whoosh', 25.5, 0], ...Array.from({ length: 12 }, (_, k) => ['key', 25.86 + k * 0.058, 0.1]), ['whoosh', 26.9, 0.4], ['pop', 28.9, -0.3], ['pop', 30.3, -0.3], ['swish', 30.0, 0.4], ['tap', 31.02, 0.4], ['success', 31.2, 0.4], ['pop', 31.05, -0.3],   // site, phone, 24×7, browse, order
  ['bell', 32.26, 0], ['sparkle', 32.35, 0], ['stamp', 34.46, 0], ['pop', 35.6, 0],             // logo, independent
  ['whoosh', 37.5, 0], ['cash', 37.75, 0], ['pop', 38.94, 0],                                   // ₹999
  ...Array.from({ length: 5 }, (_, k) => ['key', 39.8 + k * 0.1, 0.1]), ['tap', 40.5, 0.3], ['success', 40.6, 0.3], ['pop', 40.8, 0], ['rise', 41.5, 0.3], ['whoosh', 41.7, 0.4],   // comment, rocket beyond IG
  ['bell', 43.3, 0], ['sparkle', 43.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(45.6, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
