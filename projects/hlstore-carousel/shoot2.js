const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const go = async (u) => { await m.goto(u, { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(1800); };
  await go('https://store.helioslabs.in/shop'); await m.screenshot({ path: 'shots/mshop_0.png' }); await m.evaluate(() => scrollTo(0, 700)); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/mshop_1.png' });
  await go('https://store.helioslabs.in/shop/royal-ghee-gulab-jamun'); await m.screenshot({ path: 'shots/mpdp_0.png' }); await m.evaluate(() => scrollTo(0, 700)); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/mpdp_1.png' });
  try { await m.evaluate(() => scrollTo(0, 0)); const add = m.getByText(/Add to Cart/i).first(); await add.scrollIntoViewIfNeeded(); await add.click(); await m.waitForTimeout(1800); await m.screenshot({ path: 'shots/madd.png' }); } catch (e) { console.log('add', e.message); }
  await go('https://store.helioslabs.in/checkout'); await m.screenshot({ path: 'shots/mcheckout_0.png' }); await m.evaluate(() => scrollTo(0, 800)); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/mcheckout_1.png' });
  console.log((await m.innerText('body')).slice(0, 1200));
  await go('https://store.helioslabs.in/about'); await m.screenshot({ path: 'shots/mabout.png' });
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('https://store.helioslabs.in/shop', { waitUntil: 'networkidle' }); await d.waitForTimeout(1800); await d.screenshot({ path: 'shots/dshop.png' });
  await d.goto('https://store.helioslabs.in/shop/royal-ghee-gulab-jamun', { waitUntil: 'networkidle' }); await d.waitForTimeout(1800); await d.screenshot({ path: 'shots/dpdp.png' });
  await b.close(); })();
