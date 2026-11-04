// Payment reel: tabla + santoor groove + SFX tied to moments in the voiceover. [type, time, stereo pan]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { BUILT: 25.0, CTA: 50.3, END: 54.0 };
const IRIS = [5.62, 11.2, 17.95, 25.0, 28.9, 34.95, 38.3, 44.6, 50.3, 54.0];
const SFX = [
  ...IRIS.map(t => ['coinspin', t - 0.6, 0]),                                     // coin spins in and opens each scene
  ...[1.3, 1.46, 1.62, 1.78].map((t, k) => ['tick', t + 0.55, k % 2 ? 0.5 : -0.5]),   // coins land with customers
  ['pop', 4.32, 0],                                                               // "kisne kitna?"
  ['rise', 8.26, 0.2], ['error', 10.38, 0],                                       // business growing, but a problem
  ['tick', 12.48, 0.2], ['tick', 12.8, 0.2], ['tick', 13.1, 0.2], ['error', 13.06, 0],   // clock, payment stuck
  ['counter', 14.66, -0.2], ['counter', 16.8, 0.2],                               // ₹5,000 / ₹50,000 pending
  ['pop', 18.72, -0.3], ['stamp', 20.12, 0.3],                                    // DUE, OVERDUE
  ['whoosh', 21.68, -0.5], ['whoosh', 22.86, 0.5], ...[23.1, 23.4, 23.7, 24.0].map((t, k) => ['msg', t, k % 2 ? 0.5 : 0.3]),   // Excel, WhatsApp chaos
  ['bell', 26.5, 0], ['cash', 27.9, 0],                                           // system reveal
  ['whoosh', 29.74, 0], ['click', 31.34, -0.1], ['click', 32.54, 0.1], ['click', 33.76, 0.3],   // dashboard columns
  ['toggle', 36.3, 0.2], ['msg', 36.7, -0.2], ['msg', 37.5, -0.2], ['success', 37.9, 0.2],      // auto reminders sent
  ...[40.88, 41.03, 41.18].map(t => ['tick', t, 0.3]), ['counter', 42.6, 0, 14, 1.0], ['cash', 43.6, 0],   // overdue list, total outstanding
  ...[47.92, 48.14, 48.36, 48.58].map(t => ['strike', t, -0.2]), ['whoosh', 49.3, -0.6], ['success', 49.6, 0],   // follow-ups struck off, auto ON
  ['pop', 52.5, 0], ...Array.from({ length: 7 }, (_, k) => ['key', 53.0 + k * 0.078, 0.1]), ['click', 53.7, 0.3],   // comment PAYMENT
  ['bell', 54.2, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(56.0, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
