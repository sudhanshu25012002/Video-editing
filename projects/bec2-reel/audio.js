// Behind Every Click Ep2: minimal tech score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { TITLE: 4.6, LAB: 9.2, RECAP: 30.6, FOLLOW: 36.1, END: 43.3 };
const CUTS = [4.6, 9.2, 30.6, 36.1, 39.9, 43.3];
const SFX = [
  ...CUTS.map(t => ['glitch', t - 0.18, 0]),
  ['whoosh', 0.1, 0], ['tick', 2.42, 0.3], ['tap', 3.18, 0.3], ['hmm', 3.7, 0],                 // hover, click Add to Cart, "?"
  ['tap', 6.42, 0.3], ['pop', 6.75, 0], ['bell', 8.2, 0],                                         // title click, episode 2, HeliosLabs
  ['tap', 10.18, 0.2], ...[11.4, 11.5, 11.6, 11.7, 11.8].map(t => ['tick', t, 0.4]),             // the click, chain links
  ['zap', 13.4, -0.3],                                                                             // request → backend
  ['beep', 16.5, 0.2], ['beep', 18.22, 0.2], ['beep', 19.48, 0.2], ['success', 19.7, 0.2],       // identify, check, update
  ['zap', 20.0, 0.3], ['success', 21.56, 0.4],                                                     // response, saved to database
  ['tap', 23.14, -0.2], ['whoosh', 23.2, 0.5],                                                     // keep shopping
  ['pop', 27.96, 0.4], ['coin', 28.82, 0.4],                                                       // 0 → 1
  ['tap', 31.1, 0], ...[31.8, 31.9, 32.0, 32.1, 32.2].map((t, k) => ['pop', t, (k - 2) * 0.35]), ['rise', 33.4, 0],   // one click → many processes
  ['tap', 36.32, 0], ['success', 36.45, 0], ['pop', 37.96, -0.3], ['pop', 38.11, 0], ['pop', 38.26, 0.3],         // follow, episodes
  ['rise', 40.6, 0], ['shimmer', 41.44, 0],                                                         // x-ray lens
  ['bell', 43.5, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(45.3, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
