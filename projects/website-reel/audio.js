const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
// sound effects, each tied to a story moment
const SFX = [
  ['notify', 2.4],            // customer DM arrives
  ['lock', 4.8],              // Instagram ID blocked
  ['fall', 6.6],              // followers / products / contact fall away
  ['order', 22.7],            // "Order placed"
  ...Array.from({ length: 13 }, (_, k) => ['type', 24.9 + k * 0.085]),   // typing "cakes near me"
  ['whip', 24.35], ['whip', 27.75], ['whip', 35.35], ['whip', 40.35],    // camera swipes
  ['key', 38.6],              // key turns in the door
  ['swing', 41.5],            // price tag swings in
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(s => window.renderScore(49, s), SFX);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
