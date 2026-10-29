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
const VO_MAP = [[0, 0], [2.8, 2.6], [5.2, 4.8], [7.73, 6.4], [14.32, 11.2], [16.27, 12.8], [20.24, 15.6], [23.17, 18.0], [26.39, 20.6],
  [30.6, 24.4], [34.12, 27.8], [37.49, 31.0], [42.6, 35.4], [45.56, 37.8], [49.0, 40.4], [55.53, 44.6], [60.5, 49.0]];
const VO = process.argv[2] === 'vo';
const toAudio = t => { for (let i = 1; i < VO_MAP.length; i++) { const [a0, t0] = VO_MAP[i - 1], [a1, t1] = VO_MAP[i]; if (t <= t1) return a0 + (a1 - a0) * (t - t0) / (t1 - t0); } return 60.5; };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const sfx = VO ? SFX.map(([k, t]) => [k, k === 'type' ? toAudio(24.9) + (t - 24.9) : toAudio(t)]) : SFX;
  const b64 = VO ? await p.evaluate(s => window.renderScore(60.5, s, { BAN: 5.2, WEB: 23.17, END: 59.17 }), sfx)
                 : await p.evaluate(s => window.renderScore(49, s), sfx);
  const out = path.join(__dirname, VO ? 'build-v-vo' : 'build-v'); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
