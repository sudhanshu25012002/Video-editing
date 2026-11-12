// Behind Every Click Ep1: minimal tech score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { TITLE: 5.5, LAB: 10.3, RECAP: 30.2, FOLLOW: 33.1, END: 40.1 };
const CUTS = [5.5, 10.3, 30.2, 33.1, 36.9, 40.1];
const SFX = [
  ...CUTS.map(t => ['glitch', t - 0.18, 0]),                                        // glitch cut
  ['whoosh', 0.1, 0], ['tap', 1.2, 0.3], ['tap', 3.9, 0.3], ['whoosh', 4.0, 0.5], ['hmm', 4.9, 0],   // browsing pages, "?"
  ['tap', 7.26, 0.3], ['pop', 7.9, 0], ['bell', 9.2, 0],                           // click ripple, episode 1, HeliosLabs
  ...Array.from({ length: 10 }, (_, k) => ['key', 10.35 + k * 0.08, 0.1]), ['tap', 11.16, 0],   // typing login
  ['zap', 11.2, -0.3], ['beep', 12.14, 0.3], ['success', 13.74, 0.3],               // request → session created
  ['zap', 14.84, 0.3], ['crunch', 15.7, 0.4], ...Array.from({ length: 8 }, (_, k) => ['tick', 15.9 + k * 0.12, 0.4]),   // Set-Cookie arrives, ID typed
  ['pop', 16.0, -0.2], ['tap', 18.72, -0.2], ['whoosh', 18.8, 0.5],                 // link, new page
  ['zap', 20.76, -0.3], ['beep', 23.7, 0.3], ['beep', 24.1, 0.3], ['success', 24.96, 0.3],   // cookie sent, lookup, found
  ['zap', 25.3, 0.3], ['success', 26.3, -0.2], ['error', 28.9, 0.4],                // response, welcome back, no password again
  ...[30.6, 31.0, 31.4].map(t => ['whoosh', t, 0.5]),                               // recap cards
  ['tap', 33.24, 0], ['success', 33.35, 0], ['pop', 34.84, -0.3], ['pop', 34.99, 0], ['pop', 35.14, 0.3],   // follow, episodes
  ['rise', 37.4, 0], ['shimmer', 38.22, 0],                                          // x-ray lens
  ['bell', 40.3, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(42.1, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
