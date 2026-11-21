const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'panorama.html'), 'utf8').replace(/SFLOGO/g, fs.readFileSync(path.join(__dirname, 'sflogo.b64'), 'utf8').trim());
fs.writeFileSync(path.join(__dirname, 'page.html'), html);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 7560, height: 1350 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'page.html'), { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await (await p.$('#pano')).screenshot({ path: path.join(__dirname, 'panorama@2x.png') }); await b.close(); })();
