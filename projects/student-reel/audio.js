const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const CUTS = [3.5, 10, 17, 21.5, 30, 33, 38.5];
const POPS = [0.5, 1.5, 2.0, 2.25, 2.5, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.25, 6.5, 6.75, 7.0, 7.25, 7.5, 8.0, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.5, 15.0, 17.5, 18.0, 18.5, 19.0, 19.5, 22.3, 24.5, 24.75, 25.0, 25.25, 26.0, 26.1, 26.3, 26.5, 26.7, 27.5, 27.7, 27.95, 28.2, 28.45, 31.0, 31.5, 32.0, 32.5, 33.5, 34.0, 36.5, 37.5, 39.0, 40.0, 40.5, 40.8];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([c, po]) => window.renderTrack(44, c, po, [30.5, 33.0]), [CUTS, POPS]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
