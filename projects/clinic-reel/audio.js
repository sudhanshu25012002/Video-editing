// Clinic reel: score + sound effects, each tied to a moment in the (sped-up) voiceover
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { MANUAL: 9.45, ASK: 15.92, PROPOSE: 20.42, SOL: 22.95, PEAK: 46.82, REFLECT: 47.56, CTA: 52.98, RESOLVE: 57.65 };
const WIPES = [3.15, 9.45, 15.92, 20.45, 22.95, 28.92, 36.62, 42.62, 47.56, 52.98, 57.55];
const SFX = [
  ...WIPES.map(t => ['whip', t - 0.2]),                               // diagonal slice wipes
  ['pop', 0.82], ['thunk', 2.72],                                     // tooth, "problem"
  ...[4.52, 5.0, 6.82, 7.3, 7.82].map(t => ['pop', t]), ['ring', 7.94],   // enquiries, WhatsApp, phone call
  ['swoosh', 10.1], ['swoosh', 12.36], ['swoosh', 14.24], ['counter', 15.02],   // manual work, time-consuming clock
  ['swoosh', 16.62], ['rise', 19.0], ['pop', 19.6],                   // the ask, everything into one place
  ['stamp', 20.6], ['pop', 21.9], ['pop', 22.08], ['pop', 22.26],    // the solution + 3 slots
  ['tick', 25.98], ['tick', 26.16], ['tick', 26.34], ['tick', 26.52], ['tap', 27.6], ['tap', 28.2], ['order', 28.3],   // website booking
  ...[32.3, 32.5, 32.7, 32.9].map(t => ['pop', t]), ['tick', 33.6], ['tick', 34.3], ['tick', 35.06], ['tap', 35.8], ['chime', 36.0],   // doctor's app
  ['stamp', 38.32], ['send', 39.3], ['notify', 40.1], ['send', 40.9], ['notify', 41.4], ['order', 41.9],   // chatbot
  ['pop', 43.04], ['pop', 43.86], ['pop', 44.76], ['boom', 46.82], ['chime', 46.9],   // one system
  ['swoosh', 48.78], ['pop', 50.26], ['pop', 51.86],                 // websites struck, problems -> technology
  ...Array.from({ length: 6 }, (_, k) => ['type', 54.95 + k * 0.085]), ['send', 55.55], ['chime', 56.8],   // comment SYSTEM, consultation
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(59.3, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
