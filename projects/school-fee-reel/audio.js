const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const CUTS = [8, 17, 24.5, 31.5, 35.5, 37.5];
const POPS = [0.5, 1.0, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 13.5, 14.0, 14.5, 15.0,
  15.5, 17.5, 18.0, 18.5, 19.5, 20.0, 25.5, 25.75, 26.0, 26.25, 26.5, 28.0, 29.0, 30.0, 32.0, 32.5, 33.0, 33.5, 34.0, 38.5, 39.0, 39.5];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([c, po]) => window.renderTrack(42, c, po, [32.0, 35.5]), [CUTS, POPS]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
