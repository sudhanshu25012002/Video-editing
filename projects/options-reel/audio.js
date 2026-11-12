// Options reel: future-bass pop score + SFX tied to the voiceover. [type, time, stereo pan, ...extra]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { OPT: 4.0, DROP: 27.12, SPLIT: 36.5, PRICE: 42.52, END: 47.9 };
const SFX = [
  ['pop', 0.05, 0], ['whoosh', 0.5, 0], ...[0.9, 1.08, 1.26, 1.44].map(t => ['tick', t, 0.2]),   // browser builds
  ['bell', 2.58, 0], ['whoosh', 3.5, 0],                                           // "3" and the cards rise
  ['whoosh', 3.95, -0.6],                                                          // carousel to option 1
  ...Array.from({ length: 16 }, (_, k) => ['key', 5.08 + k * 0.1, -0.1]),          // code typing
  ['success', 7.28, 0],                                                            // customisation ✓
  ['coin', 9.44, -0.2], ['coin', 11.16, 0], ['coin', 11.92, 0.2], ['coin', 12.74, 0.3], ['error', 13.5, 0],   // costs pile up
  ['whoosh', 14.95, 0.6],                                                          // carousel to option 2
  ['click', 16.3, 0], ['click', 17.2, 0], ['click', 18.1, 0],                     // drag & drop blocks
  ['pop', 19.72, -0.2], ['pop', 20.72, 0], ['pop', 21.56, 0.2], ['hmm', 23.5, 0], // tasks pile on you
  ['whoosh', 25.75, 0.6],                                                          // carousel to option 3
  ['sparkle', 27.2, 0], ['bell', 27.5, 0],                                         // HeliosLabs Storefront reveal (+ musical drop)
  ['whoosh', 29.6, 0], ['success', 29.85, -0.3], ['success', 32.92, 0], ['success', 33.24, 0.3], ['pop', 35.18, 0],   // build, hosting, maintenance, plan
  ['whoosh', 36.25, 0.7], ['pop', 37.62, -0.4], ['pop', 38.72, 0.4],              // streak wipe, business vs tech
  ['whoosh', 40.65, 0.7], ...Array.from({ length: 14 }, (_, k) => ['tick', 41.5 + k * 0.075, 0]), ['cash', 42.6, 0],   // slot machine ₹999
  ['whoosh', 44.45, 0.7], ...Array.from({ length: 5 }, (_, k) => ['key', 46.44 + k * 0.12, 0.1]), ['tap', 47.2, 0.2], ['msg', 47.3, 0.3], ['msg', 47.75, -0.3],   // DM STORE
  ['whoosh', 47.65, 0.7], ['sparkle', 48.15, 0],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(50.0, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
