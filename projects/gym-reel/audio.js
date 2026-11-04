// Gym reel: workout trap score + SFX tied to moments in the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { BUILT: 34.15, CTA: 63.6, END: 69.0 };
const DROPS = [1.95, 6.99, 13.7, 19.0, 27.35, 34.15, 38.35, 45.95, 50.0, 57.05, 63.6, 69.0];
const SFX = [
  ...DROPS.flatMap(t => [['fall', t - 0.32, 0], ['slam', t, 0]]),              // each scene falls and slams down
  ['counter', 0.15, 0, 16, 0.9],                                                  // 0 → 200 members
  ['pop', 4.44, 0],                                                               // ?? / 200
  ['pop', 8.06, -0.3], ['stamp', 10.2, 0.3], ['coin', 12.58, -0.3],              // pending, expired, advance paid
  ['book', 15.95, -0.4], ['whoosh', 16.9, 0.5],                                  // register, Excel
  ['error', 20.4, 0], ['error', 22.32, 0.2], ...[24.0, 25.26, 25.52, 26.06].map(t => ['msg', t, 0.3]),   // forgot, missed, reminded again and again
  ...[30.7, 30.98, 31.26, 31.54].map(t => ['beep', t, 0.4]), ['pop', 32.7, 0],    // month-end calculation, ₹ ???
  ['rise', 35.4, 0], ['bell', 36.9, 0],                                           // system reveal
  ...[39.46, 40.66, 41.9, 43.02].map(t => ['tick', t, 0.3]), ['click', 44.46, 0], // dashboard rows
  ['whoosh', 46.3, 0], ['notif', 48.38, 0.2], ['notif', 48.78, 0.2], ['notif', 49.18, 0.2],   // auto reminders
  ['click', 50.76, 0], ['counter', 52.9, -0.3, 10, 0.8], ['counter', 54.54, 0.3, 8, 0.6], ['cash', 56.2, 0],   // live, collected, pending, revenue
  ...[61.1, 61.42, 61.74, 62.06, 62.38].map(t => ['book', t + 0.22, 0]),         // receipts stack up
  ['pop', 66.4, 0], ...[66.97, 67.07, 67.17].map(t => ['key', t, 0.1]), ['click', 67.4, 0.3], ['success', 67.7, 0],   // comment GYM
  ['bell', 69.2, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(71.0, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
