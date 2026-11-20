const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const go = async (u) => { await m.goto(u, { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(1500); const H = await m.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 600) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(150); } await m.evaluate(() => scrollTo(0, 0)); await m.waitForTimeout(800); };
  await go('https://shop.helioslabs.in/'); await m.screenshot({ path: 'shots/m_home.png' }); await m.evaluate(() => scrollTo(0, 1500)); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/m_home2.png' });
  await go('https://shop.helioslabs.in/shop'); await m.evaluate(() => { const a = document.querySelector('a[href*="/shop/the-florence"]'); scrollTo(0, a.getBoundingClientRect().top + scrollY - 120); }); await m.waitForTimeout(900); await m.screenshot({ path: 'shots/m_shop.png' });
  await go('https://shop.helioslabs.in/shop/the-florence-cashmere-long-coat'); await m.screenshot({ path: 'shots/m_pdp.png' }); await m.evaluate(() => scrollTo(0, 820)); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/m_pdp2.png' });
  try { await m.evaluate(() => scrollTo(0, 0)); const add = m.getByText(/add to bag/i).first(); await add.scrollIntoViewIfNeeded(); await add.click(); await m.waitForTimeout(1800); await m.screenshot({ path: 'shots/m_cart.png' }); } catch (e) { console.log('add', e.message); }
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
  for (const [n, u] of [['d_home', '/'], ['d_shop', '/shop'], ['d_pdp', '/shop/the-florence-cashmere-long-coat']]) { await d.goto('https://shop.helioslabs.in' + u, { waitUntil: 'networkidle' }); await d.waitForTimeout(1800); await d.screenshot({ path: `shots/${n}.png` }); }
  await b.close(); })();
