const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('https://store.helioslabs.in/', { waitUntil: 'networkidle', timeout: 90000 }); await d.waitForTimeout(3000);
  const H = await d.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 700) { await d.evaluate(y => scrollTo(0, y), y); await d.waitForTimeout(300); } await d.evaluate(() => scrollTo(0, 0)); await d.waitForTimeout(1500);
  console.log('TITLE', await d.title(), 'H', H);
  await d.screenshot({ path: 'shots/desk_top.png' }); await d.screenshot({ path: 'shots/desk_full.png', fullPage: true });
  console.log(JSON.stringify([...new Set(await d.$$eval('a', as => as.map(a => a.href)))].slice(0, 40)));
  console.log((await d.innerText('body')).slice(0, 5000));
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await m.goto('https://store.helioslabs.in/', { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(2500);
  const MH = await m.evaluate(() => document.body.scrollHeight); for (let y = 0; y < MH; y += 600) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(250); }
  let i = 0; for (let y = 0; y < MH - 300 && i < 16; y += 800) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(700); await m.screenshot({ path: `shots/m_${String(i).padStart(2, '0')}.png` }); i++; }
  await b.close(); })();
