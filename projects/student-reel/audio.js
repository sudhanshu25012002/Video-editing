const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const CUTS = [33, 38.5];
const POPS = [3.5, 8.0, 19.5, 22.3, 24.5, 26.0, 27.5, 32.5, 37.5, 39.0];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'audio.html'));
  const b64 = await p.evaluate(([c, po]) => window.renderTrack(44, c, po, [30.5, 33.0]), [CUTS, POPS]);
  fs.mkdirSync(path.join(__dirname, 'build-v'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'build-v', 'music.wav'), Buffer.from(b64, 'base64'));
  await b.close(); console.log('music.wav written');
})();
