// Hotel reel: bossa-nova lobby score + SFX tied to moments in the voiceover. [type, time, stereo pan]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { ASK: 19.4, BUILT: 25.36, CTA: 50.8, END: 54.2 };
const FLOORS = [5.55, 12.15, 19.4, 25.25, 28.55, 34.9, 39.85, 45.2, 50.8, 54.2];
const SFX = [
  ...FLOORS.flatMap(t => [['door', t - 0.42, -0.2], ['door', t + 0.05, 0.2], ['ding', t - 0.02, 0]]),   // elevator: doors shut, ding, doors open
  ['whoosh', 0.15, 0], ['pop', 4.62, 0.2],                                         // hotel rises, "kaunse available?"
  ['ring', 7.02, -0.4], ...[7.94, 8.22, 8.5, 8.78].map((t, k) => ['step', t, 0.2 + k * 0.1]),   // phone call, walk-in footsteps
  ['book', 10.1, 0], ['pen', 11.0, -0.3], ['pen', 11.35, -0.2], ['pen', 11.7, -0.1],   // register lands, entries written
  ['clash', 12.95, 0],                                                            // double booking
  ['error', 15.3, 0.3],                                                           // checkout record missing
  ...[16.6, 17.05, 17.5, 17.95].map(t => ['beep', t, -0.3]),                      // calculator
  ...[18.4, 18.65, 18.9].map(t => ['tick', t, 0.4]),                              // clock
  ['pop', 21.3, 0],                                                               // the ask
  ['rise', 25.5], ['bell', 26.42, 0], ['whoosh', 27.2, 0.3],                      // HMS reveal, key card arrives
  ['whoosh', 29.3, 0],                                                            // dashboard
  ['keycard', 31.56, -0.3], ['click', 32.34, 0.3],                                // check-in, check-out
  ...[33.34, 33.46, 33.58, 33.7].map(t => ['tick', t, 0.2]),                      // bookings list
  ['coin', 36.7, -0.3], ['success', 37.7, 0.3], ['bell', 38.52, 0],               // revenue, reports, "ek hi jagah"
  ['whoosh', 40.2, 0], ['click', 42.5, -0.2], ['click', 43.74, 0], ['success', 44.1, 0.2],   // website, room, request, sent
  ['whoosh', 46.98, -0.6], ['paper', 47.0, -0.5], ['whoosh', 48.42, 0.6], ['bell', 48.6, 0.3],   // register out, system in
  ['pop', 52.6, 0], ...Array.from({ length: 6 }, (_, k) => ['key', 53.0 + k * 0.083, 0.1]), ['click', 53.6, 0.3],   // comment SYSTEM
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(56.2, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
