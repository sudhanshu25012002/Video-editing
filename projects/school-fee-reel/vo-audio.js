// Score + story-tied sound effects for the voiceover version (times in voiceover seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const VO_MAP = [[0, 0], [0.5, 1.1], [1.0, 1.86], [1.5, 3.4], [2.0, 4.94], [2.5, 6.0], [3.0, 7.18], [3.5, 8.2], [4.0, 10.6], [4.5, 11.2], [8.0, 13.8], [8.5, 14.6], [10.5, 16.0], [11.5, 16.7], [12.5, 17.0], [13.5, 17.5], [14.5, 19.5], [15.5, 21.41], [16.6, 22.5], [17.5, 23.26], [18.5, 24.6], [19.5, 27.0], [20.0, 28.26], [20.5, 28.8], [23.5, 29.6], [24.3, 29.94], [25.5, 30.6], [28.0, 34.2], [29.0, 35.12], [30.0, 36.5], [31.5, 37.88], [32.0, 39.9], [32.5, 41.0], [33.0, 41.3], [33.5, 42.1], [34.0, 42.9], [35.0, 43.4], [35.5, 43.7], [36.5, 44.1], [37.5, 44.5], [38.5, 44.9], [39.0, 45.2], [39.5, 46.07], [41.4, 49.0], [42.0, 50.0]];
const A = t => { for (let i = 1; i < VO_MAP.length; i++) { const [t0, a0] = VO_MAP[i - 1], [t1, a1] = VO_MAP[i]; if (t <= t1) return a0 + (a1 - a0) * (t - t0) / (t1 - t0); } return 50; };
const SFX = [
  ...[8.5, 9.0, 9.5, 10.0, 10.5].map(t => ['type', A(t)]),   // register entries written
  ['whip', A(11.0)],                                         // more registers pile up
  ...[13.5, 14.0, 14.5, 15.0].map(t => ['key', A(t)]),       // clock hand jumps
  ...[17.5, 18.0, 18.5].map(t => ['type', A(t)]),            // 3D layers split
  ['whip', A(28.0)],                                         // pending rows sort to the top
  ['order', A(30.0)],                                        // chip flips to Paid
  ['whip', A(33.0) - 0.1],                                   // "Sirf software" struck out
  ['swing', A(36.4)],                                        // purple fill from the checkmark
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'score.html'));
  const b64 = await p.evaluate(s => window.renderScore(50.0, s, { BAN: 10.05, WEB: 21.41, END: 47.81 }), SFX);
  const out = path.join(__dirname, 'build-v-vo'); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written', SFX.map(([k, t]) => k + '@' + t.toFixed(2)).join(' '));
})();
