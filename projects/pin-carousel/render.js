const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, process.env.SRC||'carousel.html'), 'utf8')
  .replace(/STOREB64/g, fs.readFileSync(path.join(__dirname, 'logo_big.b64'), 'utf8').trim())
  .replace(/HELIOSB64/g, fs.readFileSync(path.join(__dirname, 'helios.b64'), 'utf8').trim());
fs.writeFileSync(path.join(__dirname, 'page.html'), html);
const out = path.join(__dirname, '..', '..', 'output', process.env.OUT||'storefront-pinned-carousel'); fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +(process.env.W||1080), height: +(process.env.H||1350) }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + path.join(__dirname, 'page.html')); await p.waitForLoadState('networkidle');
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  const n = await p.$$eval('.slide', s => s.length);
  for (let i = 1; i <= n; i++) await (await p.$('#s' + i)).screenshot({ path: path.join(out, `slide-${i}@2x.png`) });
  if (process.env.PDF) await p.pdf({ path: path.join(out, process.env.PDF), width: '210mm', height: '297mm', printBackground: true, pageRanges: '1', scale: 793.7/1240 });
  await b.close();
})();
