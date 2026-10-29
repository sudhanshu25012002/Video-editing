// Score + story-tied sound effects for the voiceover version (times in voiceover seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const VO_MAP = [[0, 0], [1.0, 0.82], [3.0, 2.6], [4.5, 5.2], [6.5, 5.66], [7.0, 7.6], [9.0, 8.9], [10.0, 9.14], [10.5, 10.6], [11.5, 12.1],
  [13.5, 13.5], [16.0, 16.05], [17.5, 17.36], [18.0, 18.6], [18.5, 19.4], [20.0, 21.0], [21.0, 22.0], [21.5, 23.8], [21.7, 24.4], [24.8, 25.6],
  [25.6, 27.0], [28.0, 28.94], [28.5, 29.7], [30.0, 30.9], [30.5, 31.7], [30.75, 32.3], [31.25, 33.3], [32.5, 34.36], [34.0, 34.9], [34.5, 35.62],
  [34.8, 36.6], [37.2, 39.4], [38.0, 40.4]];
const A = t => { for (let i = 1; i < VO_MAP.length; i++) { const [t0, a0] = VO_MAP[i - 1], [t1, a1] = VO_MAP[i]; if (t <= t1) return a0 + (a1 - a0) * (t - t0) / (t1 - t0); } return 40.4; };
const SFX = [
  ...[8.0, 8.5, 9.0].map(t => ['type', A(t)]),            // checkbox ticks
  ['lock', A(16.0)],                                        // "Problem." thud
  ...[18.0, 18.5, 19.0, 19.5, 20.0].map(t => ['key', A(t)]),   // tower layers stack
  ['notify', A(26.0)],                                      // cart badge pops
  ['whip', A(30.0) - 0.1],                                  // "Repetitive kaam" struck out
  ['swing', A(30.9)],                                       // bar takes over the frame
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'score.html'));
  const b64 = await p.evaluate(s => window.renderScore(40.4, s, { BAN: 9.14, WEB: 17.36, END: 38.96 }), SFX);
  const out = path.join(__dirname, 'build-v-vo'); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written', SFX.map(([k, t]) => k + '@' + t.toFixed(2)).join(' '));
})();
