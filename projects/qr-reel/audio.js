// QR ordering reel: amapiano score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { PROB: 3.3, SOL: 18.34, CTA: 51.4, END: 60.5 };
const CUTS = [3.3, 7.2, 11.8, 15.5, 21.5, 30.0, 34.6, 38.8, 45.2, 51.4, 58.0, 60.5];
const SFX = [
  ...CUTS.map(t => ['scanwipe', t - 0.5, 0]),                                            // laser scan wipes
  ...Array.from({ length: 9 }, (_, k) => ['tick', 1.0 + k * 0.1, (k % 3 - 1) * 0.4]), ['error', 2.0, 0],   // tables fill, FULL
  ...Array.from({ length: 9 }, (_, k) => ['msg', 4.2 + k * 0.12, (k % 3 - 1) * 0.5]), ['whoosh', 5.5, 0.3],  // orders from every table, staff rush
  ['clash', 8.5, 0], ['hmm', 8.95, 0], ...[9.9, 10.2, 10.5, 10.8, 11.1].map(t => ['tick', t, 0.4]), ['error', 10.5, 0.2],   // mix-up, kitchen late
  ['whoosh', 12.72, -0.5], ['error', 13.1, -0.3], ['whoosh', 14.1, 0.5], ['hmm', 14.45, 0.3],   // unhappy customer, stressed staff
  ['bell', 18.4, 0], ['sparkle', 18.5, 0], ...Array.from({ length: 10 }, (_, k) => ['tick', 19.34 + k * 0.09, 0]),   // HeliosLabs, QR assembles
  ['pop', 21.6, -0.4], ['pop', 21.72, 0], ['pop', 21.84, 0.4], ['beep', 25.4, 0], ['success', 25.9, 0], ['whoosh', 26.4, 0],   // QR on tables, scan, menu
  ['tap', 28.25, 0.3], ['tap', 28.58, 0.3], ['tap', 28.94, 0], ['success', 29.2, 0],      // add, add, place order
  ['whoosh', 31.6, 0], ['notif', 32.52, 0.2], ['pop', 33.64, -0.3],                       // order lands with table number
  ['strike', 35.7, -0.2], ['stamp', 35.97, 0], ['strike', 37.9, 0.2], ['stamp', 38.17, 0],   // no writing, no confusion
  ['rise', 40.44, 0], ['success', 44.44, 0],                                               // service, smoother
  ['pop', 47.0, -0.4], ['pop', 47.12, 0.4], ['pop', 47.24, -0.4], ['pop', 47.36, 0.4], ['whoosh', 49.46, 0], ['success', 50.3, 0],   // problems solved
  ['pop', 52.4, 0], ['pop', 55.0, 0], ['key', 56.62, 0.1], ['key', 56.8, 0.1], ['tap', 57.1, 0.3], ['success', 57.2, 0.3],   // comment QR
  ['bell', 59.0, 0], ['bell', 60.8, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(62.5, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
