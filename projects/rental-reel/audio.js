// Rental reel: nu-disco / funk driving groove + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { PROB: 6.6, BUILT: 24.9, CTA: 49.0, END: 52.6 };
const CUTS = [2.34, 6.6, 11.7, 18.3, 24.9, 28.8, 36.3, 43.3, 49.0, 52.6];
const SFX = [
  ...CUTS.map((t, k) => ['carpass', t - 0.33, k % 2 === 0 ? 1 : -1]),          // the car that wipes each scene in (direction alternates)
  ['counter', 0.72, 0, 12, 0.8],                                                  // 20 cars count up
  ...Array.from({ length: 18 }, (_, k) => ['key', 2.92 + k * 0.06, 0.1]), ['pop', 5.62, 0],   // typing the search, "?" marks
  ['ring', 8.66, -0.4], ['ring', 8.95, 0.4], ['msg', 9.68, -0.3], ['msg', 9.98, 0.3], ['ring', 10.34, -0.3], ['msg', 10.6, 0.2], ['msg', 10.9, -0.2],   // calls + chats pile up
  ['tick', 12.82, 0], ['pen', 14.9, -0.2], ['pen', 15.3, -0.2], ['beep', 16.72, 0.2], ['beep', 16.95, 0.2],   // manual work
  ['clash', 19.9, 0], ['msg', 21.25, 0.3], ['error', 22.2, 0], ...[23.1, 23.4, 23.7, 24.0].map((t, k) => ['step', t, 0.2 + k * 0.1]),   // double booking, no reply, customer leaves
  ['rise', 25.6, 0], ['bell', 26.9, 0], ['pop', 27.4, -0.3], ['pop', 27.6, 0.3],                // the solution
  ['whoosh', 29.1, 0], ['tap', 31.08, 0], ['whoosh', 31.2, 0], ['tap', 32.3, 0], ['whoosh', 32.55, 0], ['tap', 34.9, 0], ['success', 35.0, 0],   // website: explore, details, request
  ['whoosh', 36.7, 0], ...[39.1, 40.02, 40.98, 41.76].map(t => ['click', t, 0.2]), ['cash', 41.9, 0],   // dashboard sections
  ['rev', 45.5, 0], ['horn', 46.6, 0.3], ['rise', 47.6, 0], ['success', 48.02, 0],   // fleet rolls in, upgrade
  ['pop', 49.2, 0], ...Array.from({ length: 6 }, (_, k) => ['key', 49.42 + k * 0.08, 0.1]), ['tap', 50.0, 0.3], ['horn', 51.9, -0.2],   // comment RENTAL, car arrives
  ['bell', 52.8, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(54.6, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
