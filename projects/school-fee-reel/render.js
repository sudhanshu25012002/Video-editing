// usage: node render.js beats|full [workers]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const mode = process.argv[2] || 'beats', N = +(process.argv[3] || 4), VERT = process.argv[4] === 'v';
const VW = VERT ? 1080 : 1920, VH = VERT ? 1920 : 1080, HASH = VERT ? '#v' : '';
const html = fs.readFileSync(path.join(__dirname, 'reel.html'), 'utf8').replace('LOGO_B64', fs.readFileSync(path.join(__dirname, 'logo.b64'), 'utf8').trim());
const tmp = path.join(__dirname, VERT ? 'build-v' : 'build'); fs.mkdirSync(tmp, { recursive: true });
fs.writeFileSync(path.join(tmp, 'page.html'), html);
(async () => {
  const browser = await chromium.launch();
  const page0 = await browser.newPage({ viewport: { width: VW, height: VH } });
  await page0.goto('file://' + path.join(tmp, 'page.html') + HASH);
  const D = await page0.evaluate(() => window.DURATION);
  let times;
  const outDir = path.join(tmp, mode === 'beats' ? 'beats' : 'frames'); fs.mkdirSync(outDir, { recursive: true });
  if (mode === 'beats') times = Array.from({ length: D * 2 }, (_, i) => i * 0.5 + 0.4); // just after each beat
  else times = Array.from({ length: D * 180 }, (_, i) => i / 180); // 60fps x 3 subframes
  const pages = [page0];
  for (let i = 1; i < N; i++) { const p = await browser.newPage({ viewport: { width: VW, height: VH } }); await p.goto('file://' + path.join(tmp, 'page.html') + HASH); pages.push(p); }
  let next = 0, done = 0;
  await Promise.all(pages.map(async p => {
    while (next < times.length) {
      const i = next++;
      await p.evaluate(t => window.seek(t), times[i]);
      await p.screenshot({ path: path.join(outDir, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
      if (++done % 500 === 0) console.log(done, '/', times.length);
    }
  }));
  await browser.close();
  console.log('done', times.length);
})();
