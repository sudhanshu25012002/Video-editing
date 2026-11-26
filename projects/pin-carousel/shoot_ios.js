const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  // iPhone 17/18 Pro: 402x874pt; status bar 62pt is drawn by us, so web viewport = 812pt
  const m = await b.newPage({ viewport: { width: 402, height: 812 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1' });
  const go = async (u) => { await m.goto(u, { waitUntil: 'networkidle', timeout: 90000 }); await m.waitForTimeout(1200); const H = await m.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 600) { await m.evaluate(y => scrollTo(0, y), y); await m.waitForTimeout(120); } await m.evaluate(() => scrollTo(0, 0)); await m.waitForTimeout(900); };
  const at = async (s, name, off) => { await m.evaluate(([s, o]) => { const e = [...document.querySelectorAll('h1,h2,h3,p,span,div')].find(x => x.children.length < 3 && x.textContent.trim() === s); if (e) scrollTo(0, e.getBoundingClientRect().top + scrollY - o); }, [s, off]); await m.waitForTimeout(800); await m.screenshot({ path: 'shots/' + name + '.png' }); };
  await go('https://store.helioslabs.in/'); await m.screenshot({ path: 'shots/st_i_home.png' }); await at('Best Sellers', 'st_i_best', 16);
  await go('https://shop.helioslabs.in/'); await m.screenshot({ path: 'shots/sh_i_home.png' });
  await b.close(); })();
