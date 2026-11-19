const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await d.goto('https://rkmetal.in/', { waitUntil: 'networkidle', timeout: 90000 }); await d.waitForTimeout(3000);
  // trigger lazy content
  const H = await d.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 700) { await d.evaluate(y => scrollTo(0, y), y); await d.waitForTimeout(250); } await d.evaluate(() => scrollTo(0, 0)); await d.waitForTimeout(1500);
  await d.screenshot({ path: 'shots/desk_top.png' }); await d.screenshot({ path: 'shots/desk_full.png', fullPage: true });
  console.log('TITLE', await d.title());
  console.log(JSON.stringify([...new Set(await d.$$eval('a', as => as.map(a => a.href)))].filter(h => h.includes('rkmetal')).slice(0, 40)));
  console.log((await d.innerText('body')).slice(0, 3000));
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await m.goto('https://rkmetal.in/', { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(3000);
  await m.screenshot({ path: 'shots/mob_top.png' }); for (const [i, y] of [[1, 900], [2, 1900], [3, 3000]]) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(1200); await m.screenshot({ path: `shots/mob_${i}.png` }); }
  await b.close(); })();
