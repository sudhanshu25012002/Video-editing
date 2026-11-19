const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'carousel.html'), 'utf8').replace(/HELIOSB64/g, fs.readFileSync(path.join(__dirname, 'helios.b64'), 'utf8').trim()).replace('//KURTI', fs.readFileSync(path.join(__dirname, 'kurti.part.js'), 'utf8')).replace(/LOGO/g, fs.readFileSync(path.join(__dirname, 'logo.b64'), 'utf8').trim());
fs.writeFileSync(path.join(__dirname, 'page.html'), html);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'page.html')); await p.waitForLoadState('networkidle'); await p.waitForTimeout(500);
  const out = path.join(__dirname, '..', '..', 'output', 'figma-storefront-carousel'); fs.mkdirSync(out, { recursive: true });
  for (let i = 1; i <= 7; i++) await (await p.$('#s' + i)).screenshot({ path: path.join(out, `slide-${i}@2x.png`) });
  await b.close(); })();
