// Storefront reel 5: trailer tension → electro-house score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { DROP: 20.34, HOST: 27.65, PRICE: 32.65, CTA: 36.3, END: 40.8 };
const CUTS = [5.6, 11.9, 16.8, 20.25, 27.65, 32.65, 36.3, 40.8];
const SFX = [
  ...CUTS.map((t, k) => ['swish', t - 0.3, k % 2 ? 0.5 : -0.5]), ...CUTS.map(t => ['whoosh', t - 0.15, 0]),   // shutter bands
  ['slam', 0.05, 0], ['pop', 0.25, -0.3], ['pop', 0.55, 0.3], ['pop', 0.75, 0], ['hmm', 1.3, -0.3],   // headline, cards, customer, eye
  ['error', 2.85, 0.2], ...[3.08, 3.3, 3.52, 3.74, 3.96, 4.18, 4.4].map(t => ['coin', t, 0.4]), ['stamp', 4.66, 0.3], ['slam', 2.8, 0],   // coins to competitor, SOLD
  ['slam', 5.78, 0], ['msg', 5.9, -0.3], ['msg', 6.5, -0.3], ['msg', 7.2, -0.3], ['tick', 7.42, 0.3], ['slam', 8.08, 0], ['counter', 7.6, 0.2, 14, 1.9],   // no reply, timer
  ['error', 9.86, 0], ['notif', 10.0, 0], ['slam', 10.54, 0],                            // left chat, competitor order
  ['slam', 12.1, 0], ['notif', 12.2, 0.2], ['slam', 14.0, 0], ['shimmer', 15.24, 0.3], ['fall', 15.3, 0.3], ['slam', 15.24, 0], ['error', 15.9, 0],   // sale disintegrates
  ['slam', 16.88, 0], ['pop', 16.9, 0], ['slam', 18.68, 0], ['crunch', 18.78, 0], ['strike', 18.8, 0],   // DMs, chain snaps
  ['bell', 20.34, 0], ['sparkle', 20.4, 0], ['whoosh', 21.9, 0], ['swish', 22.0, 0], ...[22.4, 22.5, 22.6, 22.7, 22.8, 22.9].map((t, k) => ['pop', t, (k % 2 - 0.5) * 0.6]),   // logo, phone, products
  ['whoosh', 24.4, 0.3], ['pop', 24.45, -0.4], ['pop', 26.4, 0.4], ['tap', 26.76, 0], ['success', 26.9, 0], ['clapfx', 26.95, 0],   // explore, order placed, confetti
  ['slam', 27.9, 0], ['pop', 27.95, -0.3], ['pop', 28.5, 0.3], ['click', 28.9, 0.3], ['click', 29.2, 0.3], ['click', 29.5, 0.3], ['slam', 29.3, 0], ['success', 29.6, 0], ['pop', 31.24, 0],   // hosting, maintenance, managed
  ['whoosh', 32.86, 0], ['slam', 34.2, 0], ['cash', 34.3, 0], ['sparkle', 34.4, 0], ['slam', 34.84, 0],   // ₹999 / month
  ['slam', 36.34, 0], ['pop', 36.55, 0], ['msg', 36.9, -0.3], ['slam', 37.76, 0], ['slam', 38.52, 0], ...Array.from({ length: 5 }, (_, k) => ['key', 38.6 + k * 0.12, 0.1]), ['tap', 39.3, 0.3], ['msg', 39.35, 0], ['notif', 39.8, 0],   // comment STORE, demo
  ['bell', 40.9, 0], ['sparkle', 41.0, 0], ['pop', 41.5, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(43.2, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
