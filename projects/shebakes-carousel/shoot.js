const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await m.goto('https://shebakes.in/', { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(3000);
  console.log('TITLE', await m.title());
  const H = await m.evaluate(() => document.body.scrollHeight); console.log('H', H);
  for (let y = 0; y < H; y += 600) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(300); }
  await m.evaluate(() => scrollTo(0, 0)); await m.waitForTimeout(1500);
  let i = 0; for (let y = 0; y < H - 200 && i < 14; y += 760) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(900); await m.screenshot({ path: `shots/m_${String(i).padStart(2, '0')}.png` }); i++; }
  await m.evaluate(() => scrollTo(0, 0)); await m.screenshot({ path: 'shots/m_full.png', fullPage: true });
  console.log(JSON.stringify([...new Set(await m.$$eval('a', as => as.map(a => a.href)))].filter(h => h.includes('shebakes')).slice(0, 40)));
  console.log((await m.innerText('body')).slice(0, 2500));
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('https://shebakes.in/', { waitUntil: 'networkidle', timeout: 90000 }); await d.waitForTimeout(2500); await d.screenshot({ path: 'shots/desk_top.png' });
  await b.close(); })();
