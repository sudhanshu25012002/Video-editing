// Talking-head reel: chill R&B bed + SFX on every graphic. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { B2: 12.6, C3: 25.85, END: 32.5 };
const STEPS = [4.9, 6.36, 8.2, 9.76, 11.3, 12.6, 13.2, 13.85, 14.9, 16.7, 17.45, 22.9, 24.1];
const CAPS = [1.3, 2.6, 4.05, 6.25, 7.7, 9.6, 10.9, 13.7, 14.75, 16.5, 18.65, 21.7, 22.4, 23.9, 28.05, 29.4, 30.85];
const SFX = [
  ['pop', 0.1, 0], ['swish', 0.2, -0.3],                                                 // first caption, brand pill
  ...CAPS.map((t, k) => ['tick', t, k % 2 ? 0.3 : -0.3]),                                // caption changes
  ...STEPS.map((t, k) => ['whoosh', t - 0.12, k % 2 ? 0.4 : -0.4]), ...STEPS.map(t => ['pop', t + 0.05, 0]), ...STEPS.map(t => ['click', t + 0.15, 0.5]),   // step card + tracker dot
  ['error', 2.8, 0], ['strike', 3.55, 0.2],                                              // coding first? ✕
  ['success', 20.45, 0],                                                                 // all tests passed
  ['zap', 12.6, 0], ['whoosh', 12.45, 0], ['zap', 25.85, 0], ['whoosh', 25.7, 0],        // clip cuts
  ['swish', 26.0, 0], ['rise', 27.0, 0], ['success', 28.85, 0], ['sparkle', 29.6, 0],   // journey card fills
  ['bell', 31.8, 0], ['shimmer', 32.4, 0], ['whoosh', 32.35, 0], ['sparkle', 32.7, 0], ['pop', 33.15, 0], ['pop', 33.4, 0],   // HeliosLabs + end card
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(35.0, P, S), [P, SFX]);
  fs.writeFileSync(path.join(__dirname, 'build', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
