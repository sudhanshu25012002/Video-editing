// Storefront reel 9: afrobeats score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { DOUBT: 5.28, SOL: 24.98, CTA: 44.2, END: 48.0 };
const CUTS = [4.9, 9.8, 18.4, 24.9, 30.3, 36.6, 40.8, 44.2, 48.0];
const SFX = [
  ...CUTS.map(t => ['paper', t - 0.55, -0.3]), ...CUTS.map(t => ['whoosh', t - 0.35, 0.3]),     // page turns
  ['glitch', 0.1, 0], ['whoosh', 0.25, 0], ['glitch', 1.0, 0], ['tap', 3.85, 0], ['sparkle', 3.95, 0],   // ad, double-tap heart
  ['glitch', 5.28, 0], ['pop', 5.4, 0], ['glitch', 7.1, 0], ...[7.4, 7.75, 8.1, 8.45].map((t, k) => ['pop', t, (k % 2 - 0.5) * 0.6]), ['hmm', 7.6, 0],   // questions
  ...[10.08, 12.74, 15.12, 16.7].map(t => ['whoosh', t, -0.4]), ...[10.08, 12.74, 15.12, 16.7].map(t => ['glitch', t + 0.1, 0]), ...[10.58, 13.24, 15.62, 17.2].map(t => ['error', t, 0.3]),   // four question cards
  ...Array.from({ length: 8 }, (_, k) => ['msg', 19.0 + k * 0.32, (k % 2 - 0.5) * 0.6]), ['rise', 23.0, 0], ['error', 24.0, 0], ['slam', 24.2, 0],   // DMs, meter → hesitate, cart abandoned
  ['glitch', 25.0, 0], ['glitch', 27.18, 0], ['bell', 27.44, 0], ['sparkle', 27.5, 0], ...[28.0, 28.3, 28.6, 28.9].map(t => ['pop', t, 0]),   // professional badge + trust chips
  ['whoosh', 30.6, 0], ['click', 32.16, 0.2], ['click', 33.0, 0.2], ['click', 33.9, 0.2], ['success', 35.96, 0],   // website sections
  ['bell', 37.0, 0], ['sparkle', 37.1, 0], ['glitch', 37.16, 0], ['glitch', 38.68, 0],        // logo
  ['whoosh', 41.9, 0], ['cash', 42.25, 0], ['glitch', 43.42, 0],                               // ₹999
  ['glitch', 44.36, 0], ['whoosh', 44.6, 0], ['glitch', 45.64, 0], ['stamp', 46.72, 0.3], ['success', 46.85, 0],   // ID card + PRO stamp
  ['bell', 48.1, 0], ['sparkle', 48.2, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(50.4, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
