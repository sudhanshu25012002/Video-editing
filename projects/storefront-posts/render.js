const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const B = require('./brands.js');
const html = fs.readFileSync(path.join(__dirname, 'post.html'), 'utf8')
  .replace('BRANDS_JSON', JSON.stringify(B))
  .replace('STOREB64', fs.readFileSync(path.join(__dirname, 'logo.b64'), 'utf8').trim());
fs.writeFileSync(path.join(__dirname, 'page.html'), html);
const out = path.join(__dirname, '..', '..', 'output', 'storefront-ui-posts'); fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  for (const k of (process.argv[2] ? process.argv[2].split(',') : Object.keys(B))) {
    await p.goto('file://' + path.join(__dirname, 'page.html') + '?b=' + k); await p.waitForLoadState('networkidle');
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(out, k + '@2x.png') });
  }
  await b.close();
})();
