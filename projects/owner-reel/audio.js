// Owner reel: score + sound effects, each tied to a moment in the voiceover (seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { BUSY_END: 17.3, Q_START: 17.6, PROB: 26.4, SOL: 35.09, CLAPS: 39.04, PEAK: 42.18, RESOLVE: 53.86 };
const SFX = [
  ['whip', 0.1], ['swoosh', 2.2],                                    // badge drops, flips to EMPLOYEE
  ['shutter', 3.64],                                                 // shop shutter rolls up
  ['pop', 5.3], ['pop', 5.55], ['pop', 5.8],                         // customer messages
  ['scribble', 6.9], ['scribble', 7.32], ['scribble', 7.74],         // orders written
  ...Array.from({ length: 9 }, (_, k) => ['type', 8.5 + k * 0.1]), ['send', 9.54],   // reminder typed + sent
  ['swoosh', 10.8], ['snap', 11.7],                                  // search the files, pull one out
  ['boom', 18.62],                                                   // the big "?"
  ['tick', 22.7], ['tap', 24.96], ['chime', 25.0],                   // hover manual, pick "grow"
  ['chime', 28.62],                                                  // "koi problem nahi"
  ...[30.2, 31.1, 32.0, 32.9, 33.7].map(t => ['creak', t]), ['thunk', 34.1],   // manual crank, then jam
  ['swoosh', 35.68], ['swoosh', 36.52], ['swoosh', 39.04],           // system tiles arrive
  ['whip', 40.08], ['snap', 41.24], ['snap', 41.4],                  // chips fly in, snap into rows
  ...Array.from({ length: 6 }, (_, k) => ['pop', 42.3 + k * 0.14]),  // automated ticks
  ['swoosh', 46.0], ['rise', 46.98],                                 // time shifts to growth
  ['thunk', 51.95],                                                  // balance tips to systems
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(59.5, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
