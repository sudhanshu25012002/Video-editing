// usage: node render.js preview t1,t2,... | full [workers]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const mode = process.argv[2], B = path.join(__dirname, 'build');
fs.writeFileSync(path.join(B, 'page.html'), fs.readFileSync(path.join(__dirname, 'reel.html'), 'utf8').replace(/LOGO/g, fs.readFileSync(path.join(__dirname, 'logo.b64'), 'utf8').trim()));
(async () => { const b = await chromium.launch(); const N = mode === 'full' ? +(process.argv[3] || 4) : 1;
  const pages = []; for (let i = 0; i < N; i++) { const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); const errs = []; p.on('pageerror', e => console.log('ERR', e.message)); await p.goto('file://' + path.join(B, 'page.html')); pages.push(p); }
  const D = await pages[0].evaluate(() => window.DURATION);
  const times = mode === 'full' ? Array.from({ length: Math.round(D * 60) }, (_, i) => i / 60) : process.argv[3].split(',').map(Number);
  const out = path.join(B, mode === 'full' ? 'frames' : 'prev'); fs.mkdirSync(out, { recursive: true });
  let next = 0; await Promise.all(pages.map(async p => { while (next < times.length) { const i = next++; await p.evaluate(t => window.seek(t), times[i]);
    await p.screenshot({ path: path.join(out, (mode === 'full' ? String(i).padStart(5, '0') : String(times[i]).padStart(6, '0')) + '.jpg'), type: 'jpeg', quality: 90 }); } }));
  await b.close(); console.log('done', times.length); })();
