const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('https://shop.helioslabs.in/shop', { waitUntil: 'networkidle', timeout: 60000 }); await d.waitForTimeout(2000);
  await d.screenshot({ path: 'shots/shop_top.png' }); await d.screenshot({ path: 'shots/shop_full.png', fullPage: true });
  const prods = ['https://shop.helioslabs.in/shop/the-florence-cashmere-long-coat']; console.log(prods.slice(0, 8));
  if (prods[0]) { await d.goto(prods[0], { waitUntil: 'networkidle' }); await d.waitForTimeout(2000); await d.screenshot({ path: 'shots/prod_top.png' }); await d.screenshot({ path: 'shots/prod_full.png', fullPage: true }); }
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  if (prods[0]) { await m.goto(prods[0], { waitUntil: 'networkidle' }); await m.waitForTimeout(2000); await m.screenshot({ path: 'shots/mob_prod.png' }); }
  await m.goto('https://shop.helioslabs.in/shop', { waitUntil: 'networkidle' }); await m.waitForTimeout(2000); await m.screenshot({ path: 'shots/mob_shop.png' });
  await b.close(); })();
