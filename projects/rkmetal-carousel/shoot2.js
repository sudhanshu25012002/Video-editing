const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  for (const [n, u] of [['products', 'https://rkmetal.in/products'], ['process', 'https://rkmetal.in/process'], ['about', 'https://rkmetal.in/about']]) {
    await d.goto(u, { waitUntil: 'networkidle', timeout: 90000 }); await d.waitForTimeout(1500);
    const H = await d.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 700) { await d.evaluate(y => scrollTo(0, y), y); await d.waitForTimeout(200); } await d.evaluate(() => scrollTo(0, 0)); await d.waitForTimeout(1000);
    await d.screenshot({ path: `shots/${n}_top.png` }); await d.screenshot({ path: `shots/${n}_full.png`, fullPage: true }); }
  await b.close(); })();
