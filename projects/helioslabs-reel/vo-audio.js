// Score + story-tied sound effects for the voiceover version (times in voiceover seconds)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const VO_MAP = [[0, 0], [6.1, 5.74], [7.9, 6.94], [13.0, 11.58], [14.5, 14.84], [17.6, 17.4], [19.0, 18.1], [22.1, 19.4], [22.5, 19.98],
  [25.0, 23.12], [27.0, 24.5], [30.1, 26.6], [30.5, 27.04], [32.0, 29.95], [33.0, 30.7], [36.4, 31.89], [38.0, 32.6], [40.5, 35.58], [44.0, 40.0]];
const toAudio = t => { for (let i = 1; i < VO_MAP.length; i++) { const [t0, a0] = VO_MAP[i - 1], [t1, a1] = VO_MAP[i]; if (t <= t1) return a0 + (a1 - a0) * (t - t0) / (t1 - t0); } return 40; };
const SFX = [
  ['notify', toAudio(6.1)],                                // customer's DM bubble
  ...[4.0, 5.5, 17.6, 25.0, 28.5].map(t => ['key', toAudio(t)]),   // cursor clicks
  ['notify', toAudio(25.5)],                               // WhatsApp order message arrives
  ['order', toAudio(29.0)],                                // order confirmed
  ['whip', toAudio(30.0) - 0.15],                          // ₹999 slams in
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'score.html'));
  const b64 = await p.evaluate(s => window.renderScore(40.0, s, { BAN: 6.94, WEB: 11.58, END: 37.98 }), SFX);
  const out = path.join(__dirname, 'build-v-vo'); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written', SFX.map(([k, t]) => k + '@' + t.toFixed(2)).join(' '));
})();
