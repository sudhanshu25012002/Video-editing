// Storefront reel: tropical-house score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { PROB: 4.75, IMAG: 30.6, DROP: 36.84, END: 48.3 };
const CUTS = [4.75, 14.6, 19.8, 22.9, 30.6, 36.5, 39.4, 44.5, 48.3];
const SFX = [
  ...CUTS.map(t => ['whoosh', t - 0.45, 0.5]),                                   // story cube turns
  ['pop', 0.56, 0], ['sparkle', 0.6, 0], ['error', 2.6, 0.2],                     // liked ❤️ … order ✕
  ['hmm', 4.1, 0],                                                                 // "know why?"
  ['msg', 6.88, 0.3], ['msg', 8.58, 0.3], ['msg', 10.98, 0.3], ['msg', 14.0, 0.3], // the four DMs
  ...[16.0, 16.5, 17.0, 17.5].map(t => ['tick', t, -0.3]),                         // waiting…
  ['notif', 18.1, 0.4], ['tap', 19.14, 0.4], ['coin', 19.25, 0.4],                // another brand, order placed there
  ...Array.from({ length: 9 }, (_, k) => ['tick', 21.4 + k * 0.08, (k % 3 - 1) * 0.4]),   // instagram grid fills
  ['pop', 25.36, -0.2], ['pop', 27.62, 0], ['pop', 29.08, 0.2], ['hmm', 29.9, 0],          // checklist with "?"
  ['pop', 32.02, -0.4], ['pop', 32.94, 0.4], ['pop', 33.84, -0.4], ['pop', 34.66, 0.4], ['whoosh', 35.64, 0], ['success', 35.95, 0],   // items fly into one place
  ['sparkle', 38.5, 0], ['clapfx', 38.55, 0],                                      // online store!
  ['bell', 39.7, 0], ['success', 41.56, -0.2], ['success', 42.16, 0.2],           // HeliosLabs Storefront, build, manage
  ['whoosh', 46.7, 0.6], ['rise', 46.9, 0],                                        // page → store
  ['bell', 48.5, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(50.3, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
