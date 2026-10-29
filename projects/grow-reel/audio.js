const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const CUTS = [6.5, 10, 17.5, 21.5, 28, 31.25, 32.5];
const POPS = [0.5, 1.0, 1.5, 2.0, 3.0, 3.5, 4.5, 7.0, 8.0, 8.5, 9.0, 10.5, 11.0, 11.5, 11.75, 12.5, 13.25, 13.5, 14.0, 14.75, 16.0,
  18.0, 18.5, 19.0, 19.5, 20.0, 22.0, 22.5, 23.0, 23.5, 24.0, 24.6, 25.4, 26.0, 26.5, 26.75, 27.0, 27.25, 27.5, 28.5, 29.0, 29.5, 30.0, 30.5, 33.0, 34.0, 34.5];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([c, po]) => window.renderTrack(38, c, po, [28.75, 31.25]), [CUTS, POPS]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
