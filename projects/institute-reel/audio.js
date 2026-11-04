// Institute reel: lo-fi score + realistic SFX, each tied to a moment in the voiceover. [type, time, stereo pan]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { ASK: 28.55, BUILT: 34.88, FILL: 62.52, CTA: 67.7, END: 74.1 };
const TURNS = [5.0, 13.0, 21.6, 28.55, 34.75, 38.2, 43.85, 50.45, 57.8, 62.95, 67.7, 74.0];
const SFX = [
  ...TURNS.map(t => ['pageturn', t - 0.35]),                                   // every page turn
  ['pop', 0.35], ['marimba', 3.92, 0.2],                                       // cap, "interesting problem"
  ...Array.from({ length: 8 }, (_, k) => ['pop', 6.34 + k * 0.13, (k % 4 - 1.5) * 0.3]),   // students appear
  ['book', 9.95, -0.4], ['whoosh', 10.82, 0.5],                                // registers thump down, Excel unrolls
  ['click', 14.32, -0.2], ['click', 15.7, 0.1], ['click', 17.84, 0.3],          // pending / attendance / syllabus flagged
  ...Array.from({ length: 6 }, (_, k) => ['pencil', 19.95 + k * 0.25, -0.5]),  // pencil ticks rows
  ['marimba', 22.7, -0.3], ['marimba', 23.86, -0.3], ['marimba', 24.72, -0.3], // parents' messages
  ...Array.from({ length: 5 }, (_, k) => ['flip', 25.7 + k * 0.28, 0.4]), ['sand', 27.0, 0.4],   // register pages flip, hourglass
  ['whoosh', 33.4, 0], ['pop', 33.8],                                          // everything into one place
  ['rise', 35.2], ['chime', 35.92],                                            // system reveal
  ['whoosh', 36.6, -0.5], ['whoosh', 36.9, 0.5],                               // laptop + phone arrive
  ['success', 41.0, 0.2], ['pop', 41.26, 0.2], ['pop', 41.96, 0.2],            // attendance ring, fees paid, updates
  ...[46.1, 46.8, 47.98, 48.78].map(t => ['click', t, -0.5]),                  // dashboard tabs
  ['marimba', 51.0, -0.3], ['key', 52.9], ['key', 53.0], ['success', 53.3, 0.3], // reminder sent, UPI pay, received
  ['whoosh', 54.3, 0.3], ['whoosh', 56.34, -0.3],                              // report grows, manual work drops
  ['stamp', 62.52],                                                            // NOT NEEDED
  ['rise', 63.8], ['chime', 66.6],                                             // students and system grow
  ...Array.from({ length: 9 }, (_, k) => ['key', 71.2 + k * 0.078, 0.1]), ['click', 71.95, 0.3], ['success', 72.58],   // typing EDUCATION, post, let's discuss
  ['chime', 74.2],                                                             // logo
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(75.7, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
