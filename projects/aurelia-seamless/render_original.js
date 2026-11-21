// Renders the supplied designs unchanged (1440×900 screens at 1.5×) → each screen = 2 seamless 1080×1350 slides.
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
  const shots = [['e1eaef95', 0, '1-home'], ['e1eaef95', 900, '2-collections'], ['e1eaef95', 1620, '3-bestsellers'], ['1e6c3d6d', 0, '4-bag'], ['1185fbb4', 0, '5-checkout']];
  for (const [f, y, n] of shots) { const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    await p.goto('file://' + __dirname + '/src/' + f + '.fixed.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
    await p.screenshot({ path: __dirname + '/orig_' + n + '.png', clip: { x: 0, y, width: 1440, height: 900 }, fullPage: true }); await p.close(); }
  await b.close(); })();
