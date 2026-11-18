// Storefront reel 4: synthwave score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { BRAND: 5.0, IMAG: 10.0, NOTEAM: 18.75, LOGO: 23.6, PRICE: 29.7, CTA: 33.45, END: 36.2 };
const CUTS = [4.95, 10.0, 18.75, 23.45, 29.7, 33.45, 36.2];
const SFX = [
  ...CUTS.map(t => ['whoosh', t - 0.3, 0]), ...CUTS.map(t => ['zap', t, 0]),                // zoom-through
  ['pop', 0.15, 0], ['swish', 0.9, 0.2], ['strike', 1.96, 0], ['notif', 2.6, 0.4], ['tick', 2.9, -0.3], ['msg', 3.15, 0.3], ['msg', 3.4, -0.3], ['hmm', 3.35, 0],   // bio, DM to order, DMs flood, kab tak
  ...Array.from({ length: 10 }, (_, k) => ['tick', 5.4 + k * 0.16, 0.2]), ['rise', 5.8, 0], ['success', 6.7, 0],   // followers climb
  ['tap', 8.6, 0], ['rise', 8.65, 0], ['success', 9.4, 0],                               // upgrade
  ['shimmer', 10.3, 0], ['sparkle', 10.4, 0],                                            // imagine
  ['whoosh', 11.85, 0], ['swish', 13.0, 0.4], ['pop', 13.26, -0.4], ['swish', 14.3, 0.4], ['pop', 14.56, 0.4], ['swish', 16.1, 0.4], ['pop', 16.36, -0.4], ['swish', 17.15, 0.4], ['pop', 17.4, 0.4],   // pages + chips
  ['tap', 17.84, 0], ['success', 18.0, 0],                                               // order placed
  ...[19.4, 19.7, 20.0, 20.3].map((t, k) => ['pop', t, k % 2 ? 0.4 : -0.4]), ['error', 22.45, 0], ['stamp', 22.55, 0], ['whoosh', 22.95, 0],   // team → not needed
  ['bell', 23.6, 0], ['sparkle', 23.7, 0], ['success', 26.05, 0], ['success', 27.25, 0], ['success', 27.93, 0], ['pop', 28.9, 0],   // logo, ticks, plan
  ['whoosh', 30.25, 0], ['counter', 30.5, 0, 16, 1.0], ['cash', 31.4, 0], ['swish', 31.45, 0.3], ['pop', 32.14, 0],   // ₹999 / month
  ...Array.from({ length: 5 }, (_, k) => ['key', 33.7 + k * 0.1, 0.1]), ['tap', 34.3, 0.3], ['msg', 34.4, 0], ['pop', 34.75, 0.3], ['notif', 35.14, -0.2],   // comment STORE
  ['bell', 36.3, 0], ['sparkle', 36.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(38.6, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
