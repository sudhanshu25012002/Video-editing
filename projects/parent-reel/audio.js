// Parent reel: piano + strings score, opening into a hopeful groove; SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { CHAOS: 13.6, BUILT: 29.2, OUTRO: 49.95, CTA: 56.8, END: 60.3 };
const CUTS = [4.05, 13.6, 24.3, 29.2, 33.3, 39.6, 46.1, 49.95, 56.8, 60.3];
const SFX = [
  ...CUTS.flatMap(t => [['flap', t - 0.38, 0], ['flap', t + 0.03, 0]]),         // split-flap blinds close and open
  ...Array.from({ length: 6 }, (_, k) => ['flip', 1.02 + k * 0.23, 0.4]),         // calendar months flip
  ['tap', 3.1, 0.3], ['coin', 3.2, 0.3],                                          // fees paid
  ['pop', 8.12, -0.3], ['hmm', 8.3, -0.3], ['pop', 10.2, 0.3], ['hmm', 10.35, -0.3], ['pop', 12.28, -0.3], ['hmm', 12.45, 0.2],   // questions, father puzzled
  ['ring', 14.0, 0.4], ['book', 16.3, 0], ['whoosh', 18.08, 0.4],                 // institute phone, registers spread, Excel
  ['stamp', 20.0, -0.5], ['stamp', 21.42, 0], ['stamp', 22.9, 0.5], ['error', 23.6, 0],   // attendance / fees / tests — all separate
  ['ring', 24.6, 0.5], ['ring', 26.5, 0.4], ['ring', 27.02, 0.6], ['ring', 27.7, 0.5],    // calls again and again
  ['rise', 30.5, 0], ['bell', 31.76, 0], ['whoosh', 32.3, 0],                     // system reveal
  ['whoosh', 33.6, 0], ...[35.34, 36.26, 37.06, 37.72].map(t => ['click', t, 0.2]),   // dashboard tiles
  ['whoosh', 39.8, 0], ['success', 41.8, 0.2], ['tick', 42.9, 0.2], ['tick', 43.02, 0.2], ['tick', 43.14, 0.2], ['notif', 44.2, 0.2],   // portal: attendance, results, announcements
  ['notif', 47.8, 0.3], ['tap', 48.82, 0.3], ['success', 48.9, 0.3],              // reminder, pay
  ['rise', 54.6, 0], ['clapfx', 55.85, 0], ['sparkle', 55.9, 0],                 // progress, high-five
  ['pop', 58.4, 0], ...Array.from({ length: 9 }, (_, k) => ['key', 59.06 + k * 0.072, 0.1]), ['tap', 59.9, 0.3],   // comment INSTITUTE
  ['bell', 60.5, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(62.3, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
