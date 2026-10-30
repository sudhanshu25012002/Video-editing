// Busy reel: score + sound effects, each tied to a moment in the voiceover (seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const P = { DROP: 13.2, REBUILD: 17.58, STOP: 28.72, START: 31.16, RESOLVE: 32.86 };
const SFX = [
  ...[2.9, 3.0, 3.1, 3.2, 3.3, 3.4].map(t => ['pop', t]),           // task bubbles appear around the person
  ['boom', 3.74],                                                    // "akele?"
  ['whip', 4.6], ['whip', 10.45], ['whip', 14.0], ['whip', 19.0], ['whip', 24.55], ['whip', 28.3],   // zoom-through transitions
  ['thunk', 5.26], ['scribble', 6.1],                                // orders row + pen line
  ['thunk', 7.18], ['snap', 7.38], ['snap', 7.5], ['snap', 7.62],    // payments row + coins
  ['thunk', 8.73], ['pop', 9.0], ['pop', 9.25], ['pop', 9.5],        // replies row + messages
  ['sad', 13.22],                                                    // growth flatlines
  ['swoosh', 17.0], ['snap', 17.95], ['chime', 17.98],               // strike "mehnat", lock opens
  ['pop', 19.45], ['pop', 20.3], ['pop', 21.66],                     // pipeline nodes
  ...[22.9, 23.22, 23.54, 23.86, 24.18, 24.5].map(t => ['tick', t]), // tasks come out done
  ['chime', 23.52],                                                  // "easy."
  ['swoosh', 26.4], ['rise', 27.0],                                  // busy blocks flip, growth line rises
  ['thunk', 28.72],                                                  // STOP stamp
  ['swoosh', 31.16],                                                 // flip to START
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([P, S]) => window.renderScore(35.5, P, S), [P, SFX]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
