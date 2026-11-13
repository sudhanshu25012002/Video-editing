// Storefront reel 3: UK-garage score + SFX tied to the voiceover (VO starts at 5.0). [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { PROB: 5.0, IMAG: 12.9, LOGO: 24.0, DARK: 43.8, BACK: 46.6, CTA: 55.3, END: 58.2 };
const CUTS = [5.0, 7.1, 11.2, 12.85, 22.55, 26.6, 30.75, 36.4, 43.35, 50.35, 55.25, 58.2];
const SFX = [
  ...CUTS.map((t, k) => ['swish', t - 0.1, k % 2 ? 0.4 : -0.4]),                       // blur cuts
  ['notif', 0.5, -0.2], ['notif', 1.9, 0.2], ['notif', 3.2, -0.2], ['msg', 3.95, 0.3], ['msg', 4.2, -0.3], ['msg', 4.45, 0.3], ['msg', 4.7, -0.3],   // DMs pile up
  ['counter', 5.4, 0, 18, 1.5], ['pop', 6.0, 0],                                       // ×50, same question
  ['tick', 7.4, -0.4], ...[7.6, 8.2, 8.75, 9.25, 9.7, 10.1, 10.45, 10.8].map(t => ['msg', t, 0.4]),   // clock runs, replies sent
  ['rise', 11.5, 0], ['sparkle', 12.9, 0],                                              // imagine
  ['whoosh', 13.0, 0], ...[13.4, 13.52, 13.64, 13.76].map(t => ['pop', t, 0]), ['whoosh', 15.6, 0.3],   // phone, products, scroll
  ['tick', 17.88, -0.2], ['tick', 17.98, 0.2], ['tap', 18.3, 0], ['whoosh', 18.45, 0.5], ['tap', 19.55, 0], ['click', 19.95, 0], ['tap', 21.18, 0], ['success', 21.32, 0],   // price, details, size, colour, order
  ['rise', 22.8, 0], ['bell', 23.97, 0], ['sparkle', 24.05, 0],                         // HeliosLabs Storefront
  ...Array.from({ length: 12 }, (_, k) => ['key', 27.3 + k * 0.075, 0.1]), ...[27.4, 27.62, 27.84, 28.06, 28.28, 28.5].map(t => ['tick', t, 0]), ['sparkle', 29.5, 0], ['success', 30.16, 0],   // URL, wireframe, build
  ...[31.6, 31.68, 31.76, 31.84, 31.92, 32.0].map((t, k) => ['pop', t, (k % 3 - 1) * 0.4]), ...[32.72, 32.82, 32.92, 33.02].map(t => ['click', t, 0.2]), ['coin', 33.6, 0], ['whoosh', 34.18, 0], ['success', 34.9, 0], ['pop', 35.2, 0],   // organise
  ['success', 37.6, -0.2], ['success', 38.98, 0], ['success', 39.78, 0.2], ['stamp', 40.54, 0], ['pop', 41.9, 0],   // dev, hosting, maintenance, managed
  ['tick', 43.9, -0.4], ...[44.1, 44.55, 45.0, 45.45, 45.9].map(t => ['msg', t, 0.4]), ['whoosh', 46.5, 0],   // all-day typing, panel rises
  ['notif', 47.1, 0], ['notif', 47.6, 0.2], ['notif', 48.1, -0.2], ['rise', 48.2, 0], ['success', 49.15, 0],   // orders arrive, growth
  ['pop', 50.5, 0], ['counter', 52.6, 0, 16, 1.0], ['cash', 53.6, 0], ['pop', 54.74, 0],   // ₹999 / month
  ['whoosh', 55.5, 0], ...Array.from({ length: 5 }, (_, k) => ['key', 56.3 + k * 0.1, 0.1]), ['tap', 56.98, 0.3], ['swish', 57.05, 0.3], ['msg', 57.6, -0.3],   // DM STORE
  ['bell', 58.3, 0], ['sparkle', 58.4, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(61.0, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
