const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  for (const p of ['menu', 'about', 'locations']) { await m.goto('https://shebakes.in/' + p, { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(2000);
    const H = await m.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 600) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(200); }
    for (const [k, y] of [[0, 0], [1, 760], [2, 1520]]) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(800); await m.screenshot({ path: `shots/${p}_${k}.png` }); } }
  // product detail / cart: click first ADD on home
  await m.goto('https://shebakes.in/', { waitUntil: 'networkidle' }); await m.waitForTimeout(1500);
  try { const btn = m.getByText('ADD', { exact: true }).first(); await btn.scrollIntoViewIfNeeded(); await btn.click(); await m.waitForTimeout(1500); await m.screenshot({ path: 'shots/after_add.png' }); } catch (e) { console.log('add fail', e.message); }
  await b.close(); })();
