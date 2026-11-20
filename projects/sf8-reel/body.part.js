
// headline reveal for this reel: each line wipes in left→right with a purple marker swipe behind it
function wipe(e, t, a, b = 1e9) { const q = clamp((t - b) / 0.25); const p = ramp(t, a, 0.45); e.style.visibility = t < a || q >= 1 ? 'hidden' : 'visible'; e.style.opacity = 1 - q;
  e.style.clipPath = `inset(-20% ${(1 - p) * 100}% -20% 0)`; e.style.transform = `translateX(${(1 - p) * -30}px)`; }
const thumbs = (i, s) => thumb(i, s);
const BGS = ['#F7E7C4', '#DDE3F2', '#F8E1E4', '#E4EEE0', '#F1DCD7', '#F3EEE4', '#E3EFEA', '#EEE8F4'];
const KIND = [['k', '#e3a72f', '#8a2b1a', 'block'], ['k', '#2b3f7d', '#e8e2d0', 'dots'], ['k', '#e8a1ad', '#fff5f5', 'chikan'], ['k', '#8fae8b', '#f4f1e4', 'stripe'], ['k', '#7e1f2e', '#e7b851', 'block'], ['k', '#efe6d2', '#b88a4a', 'chikan']];
function thumb(i, s) { const [k, c, a, p] = KIND[i % KIND.length]; return kurti(s * 0.66, c, a, p); }

// ---------- tile-flip transition ----------
const CUTS = [4.9, 9.2, 13.6, 21.4, 25.2, 32.0, 36.4, 39.5, 43.2];
const COLS = 6, ROWS = 10, TW = 180, TH = 192;
const tiles = []; for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) tiles.push(E(document.body, { left: c * TW + 'px', top: r * TH + 'px', width: TW + 1 + 'px', height: TH + 1 + 'px', zIndex: 800, background: ['#5A17E6', '#6C2BF0', '#4A10C8'][(r + c) % 3], transformOrigin: '50% 50%', display: 'none' }));
const scenes = [];
function S(a, b) { const e = E(stage, {}, '', 'scene'); e.a = a; e.b = b; scenes.push(e); return e; }
const TAPS = [];
const touch = E(document.body, { width: '70px', height: '70px', margin: '-35px 0 0 -35px', borderRadius: '35px', background: 'rgba(28,23,38,0.30)', boxShadow: '0 0 0 5px rgba(255,253,248,0.95), 0 8px 20px rgba(28,23,38,0.25)', zIndex: 650 });
const ripple = E(document.body, { width: '70px', height: '70px', margin: '-35px 0 0 -35px', borderRadius: '50%', border: '5px solid #5A17E6', zIndex: 649 });

// S0 think + building the brand
const S0 = S(0, 4.9);
const think = E(S0, { left: '240px', top: '560px', width: '600px', height: '360px', borderRadius: '180px', background: '#FFFDF8', boxShadow: '0 30px 70px rgba(28,23,38,0.14), 0 0 0 2px #E2D8C6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '84px', fontWeight: 900, letterSpacing: '-0.04em' }, 'Ek baat<br>sochi hai? 🤔');
think.style.textAlign = 'center'; think.style.lineHeight = '1.05';
const dots0 = [0, 1, 2].map(k => E(S0, { left: 300 - k * 60 + 'px', top: 950 + k * 60 + 'px', width: 60 - k * 16 + 'px', height: 60 - k * 16 + 'px', borderRadius: '50%', background: '#FFFDF8', boxShadow: '0 0 0 2px #E2D8C6' }));
const s0a = HD(S0, 220, 76, 'Itni <span class="pur">mehnat</span> se…');
const s0b = HD(S0, 320, 76, 'apna clothing brand');
const BLK = [['🧵', 'Designs'], ['📸', 'Photoshoots'], ['📦', 'Packaging'], ['💜', 'Your brand']];
const blocks = BLK.map(([ic, n], k) => E(S0, { left: '240px', top: 1460 - k * 190 + 'px', width: '600px', height: '170px', borderRadius: '28px', background: k === 3 ? PUR : '#FFFDF8', color: k === 3 ? '#fff' : INK, boxShadow: '0 20px 50px rgba(28,23,38,0.14), 0 0 0 2px #E2D8C6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', fontSize: '48px', fontWeight: 900 }, `<span>${ic}</span>${n}`));

// S1 new products + followers
const S1 = S(4.9, 9.2);
const s1a = HD(S1, 200, 76, 'Naye <span class="pur">products</span>…');
const s1b = HD(S1, 300, 76, 'Instagram par <span class="pur">followers</span>…');
const prods = [0, 1, 2, 3, 4, 5].map(k => E(S1, { left: 80 + (k % 3) * 320 + 'px', top: 470 + Math.floor(k / 3) * 360 + 'px', width: '280px', height: '330px', background: BGS[k], borderRadius: '24px', boxShadow: '0 14px 34px rgba(28,23,38,0.12)' }, thumb(k, 280) + `<div style="position:absolute;left:12px;top:12px;padding:6px 12px;border-radius:12px;background:${GRN};color:#fff;font-size:20px;font-weight:900">NEW</div>`, 'tile'));
const fol = E(S1, { left: '140px', top: '1260px', width: '800px', height: '300px' }, '', 'card');
fol.innerHTML = `<div style="position:absolute;left:40px;top:40px;width:120px;height:120px;border-radius:60px;background:conic-gradient(#f9a825,#e91e63,#7b1fa2,#f9a825);padding:6px;box-sizing:border-box"><div style="width:100%;height:100%;border-radius:50%;background:#f7e7c4"></div></div>
  <div style="position:absolute;left:200px;top:46px;font-size:30px;font-weight:800">yourbrand</div><div id="fnum" style="position:absolute;left:200px;top:90px;font-size:80px;font-weight:900;letter-spacing:-0.04em">1.2K</div><div style="position:absolute;left:200px;top:186px;font-size:26px;font-weight:700;color:${MUT}">followers</div>
  <div id="fup" style="position:absolute;right:40px;top:60px;padding:10px 20px;border-radius:22px;background:#E3F5EA;color:${GRN};font-size:28px;font-weight:900">▲ growing</div>`;

// S2 everything balanced on one pillar
const S2 = S(9.2, 13.6);
const s2a = HD(S2, 200, 72, 'Lekin poora business');
const s2b = HD(S2, 295, 72, 'ek platform par <span class="red">dependent</span>');
const rig = E(S2, { left: '0', top: '0', width: '1080px', height: '1920px' });
const slab = E(rig, { left: '140px', top: '760px', width: '800px', height: '70px', borderRadius: '16px', background: INK, transformOrigin: '540px 70px' });
const onTop = [['🛍', 'Products', 160], ['👥', 'Followers', 420], ['💰', 'Sales', 680]].map(([ic, n, x]) => E(slab, { left: x - 140 + 'px', top: '-200px', width: '240px', height: '190px', borderRadius: '24px', background: '#FFFDF8', boxShadow: '0 14px 34px rgba(28,23,38,0.14), 0 0 0 2px #E2D8C6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '34px', fontWeight: 900 }, `<div style="font-size:64px">${ic}</div>${n}`));
const pillar = E(rig, { left: '440px', top: '830px', width: '200px', height: '760px', background: 'linear-gradient(45deg,#f9a825,#e91e63 55%,#7b1fa2)', borderRadius: '10px 10px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '60px', boxSizing: 'border-box', color: '#fff', fontWeight: 900, fontSize: '30px', writingMode: 'vertical-rl', letterSpacing: '0.12em' }, 'INSTAGRAM');
E(rig, { left: '200px', top: '1590px', width: '680px', height: '30px', borderRadius: '15px', background: '#D9CDBB' });
const crack = E(rig, { left: '440px', top: '1000px', width: '200px', height: '400px', zIndex: 3 }, `<svg width="200" height="400" viewBox="0 0 200 400"><path d="M100 0 L80 70 L120 120 L70 200 L130 260 L90 330 L110 400" fill="none" stroke="#1C1726" stroke-width="7" stroke-linejoin="round"/></svg>`);

// S3 what if… three hits
const S3 = S(13.6, 21.4);
const s3a = HD(S3, 200, 72, 'Kal agar…');
const hits = [['📉', 'Reach kam ho gayi', '−72% reach', 14.84], ['🚫', 'Account restricted', 'Action blocked', 16.28], ['📭', 'Posts customers tak nahi', '0 impressions', 18.14]].map(([ic, n, d, t], k) => { const e = E(S3, { left: '90px', top: 420 + k * 300 + 'px', width: '900px', height: '260px', zIndex: 2 }, `<div style="position:absolute;left:36px;top:50px;width:150px;height:150px;border-radius:40px;background:#FBE3E6;font-size:84px;display:flex;align-items:center;justify-content:center">${ic}</div><div style="position:absolute;left:220px;top:64px;font-size:46px;font-weight:900;letter-spacing:-0.03em">${n}</div><div style="position:absolute;left:220px;top:136px;font-size:32px;font-weight:800;color:${RED}">${d}</div>`, 'card'); e.t = t; return e; });
const reachG = E(hits[0], { right: '36px', top: '60px', width: '180px', height: '140px' }, `<svg width="180" height="140" viewBox="0 0 180 140"><path id="rg" d="M6 20 L50 30 L90 26 L120 70 L150 110 L174 128" fill="none" stroke="${RED}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
const toh = E(S3, { left: '0', top: '1360px', width: '1080px', textAlign: 'center', fontSize: '230px', fontWeight: 900, letterSpacing: '-0.05em', color: RED, zIndex: 4 }, 'Toh?');

// S4 a second channel
const S4 = S(21.4, 25.2);
const s4a = HD(S4, 200, 72, 'Customers tak pahunchne ka');
const s4b = HD(S4, 295, 90, 'ek aur <span class="pur">channel</span>');
const rig4 = E(S4, { left: '0', top: '0', width: '1080px', height: '1920px' });
const slab4 = E(rig4, { left: '140px', top: '760px', width: '800px', height: '70px', borderRadius: '16px', background: INK });
[['🛍', 'Products', 160], ['👥', 'Followers', 420], ['💰', 'Sales', 680]].forEach(([ic, n, x]) => E(slab4, { left: x - 140 + 'px', top: '-200px', width: '240px', height: '190px', borderRadius: '24px', background: '#FFFDF8', boxShadow: '0 14px 34px rgba(28,23,38,0.14), 0 0 0 2px #E2D8C6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '34px', fontWeight: 900 }, `<div style="font-size:64px">${ic}</div>${n}`));
const p4a = E(rig4, { left: '230px', top: '830px', width: '180px', height: '760px', background: 'linear-gradient(45deg,#f9a825,#e91e63 55%,#7b1fa2)', borderRadius: '10px 10px 0 0', color: '#fff', fontWeight: 900, fontSize: '28px', writingMode: 'vertical-rl', letterSpacing: '0.12em', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '60px', boxSizing: 'border-box' }, 'INSTAGRAM');
const p4b = E(rig4, { left: '670px', top: '830px', width: '180px', height: '760px', background: PUR, borderRadius: '10px 10px 0 0', color: '#fff', fontWeight: 900, fontSize: '28px', writingMode: 'vertical-rl', letterSpacing: '0.12em', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '60px', boxSizing: 'border-box', transformOrigin: '50% 100%' }, 'YOUR WEBSITE');
E(rig4, { left: '160px', top: '1590px', width: '760px', height: '30px', borderRadius: '15px', background: '#D9CDBB' });
const stable = E(S4, { left: '330px', top: '1660px', padding: '16px 30px', borderRadius: '30px', background: GRN, color: '#fff', fontWeight: 900, fontSize: '34px' }, '✓ Stable');

// S5 your website / online store
const S5 = S(25.2, 32.0);
const s5a = HD(S5, 200, 76, 'Apni <span class="pur">website</span>,');
const s5b = HD(S5, 300, 76, 'apna <span class="pur">online store</span>');
const br = E(S5, { left: '60px', top: '480px', width: '780px', height: '560px', overflow: 'hidden' }, '', 'card');
br.innerHTML = `<div style="height:56px;background:#EFE7DA;display:flex;align-items:center;gap:10px;padding-left:22px"><i style="width:16px;height:16px;border-radius:8px;background:#ff5f57;display:block"></i><i style="width:16px;height:16px;border-radius:8px;background:#febc2e;display:block"></i><i style="width:16px;height:16px;border-radius:8px;background:#28c840;display:block"></i><div id="url5" style="margin-left:20px;height:36px;border-radius:18px;background:#fff;padding:0 18px;display:flex;align-items:center;font-size:22px;font-weight:700;color:#6a5a4a;width:420px"></div></div>
  <div style="position:absolute;left:30px;top:80px;font-size:34px;font-weight:900;color:#6b1d2a">yourbrand</div>
  <div style="position:absolute;left:30px;top:140px;width:720px;height:170px;border-radius:18px;background:linear-gradient(110deg,#6b1d2a,#a8432f 60%,#e3a72f);overflow:hidden"><div style="position:absolute;left:30px;top:40px;font-size:44px;font-weight:900;color:#fff">New Collection</div><div style="position:absolute;left:30px;top:106px;padding:8px 20px;border-radius:20px;background:#fff;color:#6b1d2a;font-weight:800;font-size:20px">Shop now →</div><div style="position:absolute;right:20px;top:-30px">${kurti(170, '#e3a72f', '#8a2b1a', 'block')}</div></div>
  ${[0, 1, 2, 3].map(k => `<div style="position:absolute;left:${30 + k * 182}px;top:330px;width:168px;height:210px;border-radius:16px;background:${BGS[k]};display:flex;align-items:center;justify-content:center">${thumb(k, 168)}</div>`).join('')}`;
const ph5 = E(S5, { left: '700px', top: '820px', width: '330px', height: '680px', borderRadius: '50px', background: '#16110f', boxShadow: '0 30px 70px rgba(28,23,38,0.3)', zIndex: 3 });
const sc5 = E(ph5, { left: '11px', top: '11px', width: '308px', height: '658px', borderRadius: '40px', background: '#fbf7f1', overflow: 'hidden' });
const g5 = E(sc5, { left: '14px', top: '60px', width: '280px' }, Array.from({ length: 8 }, (_, i) => `<div style="position:absolute;left:${(i % 2) * 144}px;top:${Math.floor(i / 2) * 190}px;width:136px;height:180px;border-radius:14px;background:${BGS[i % 8]};display:flex;align-items:center;justify-content:center">${thumb(i, 136)}</div>`).join(''));
const okT = E(sc5, { left: '24px', top: '230px', width: '260px', height: '170px', borderRadius: '24px', background: '#fff', boxShadow: '0 16px 40px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 4 }, `<div style="width:64px;height:64px;border-radius:32px;background:#2fb463;color:#fff;font-size:36px;display:flex;align-items:center;justify-content:center">✓</div><div style="font-weight:900;font-size:26px">Order placed!</div>`);
const c247 = E(S5, { left: '80px', top: '1110px', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 28px', borderRadius: '24px', background: '#FFFDF8', boxShadow: '0 16px 40px rgba(28,23,38,0.13), 0 0 0 2px #E2D8C6', fontWeight: 900, fontSize: '36px' }, '🕒 Kabhi bhi · 24×7');
const cBr = E(S5, { left: '80px', top: '1230px', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 28px', borderRadius: '24px', background: '#FFFDF8', boxShadow: '0 16px 40px rgba(28,23,38,0.13), 0 0 0 2px #E2D8C6', fontWeight: 900, fontSize: '36px' }, '<span class="ck">✓</span>Browse');
const cOr = E(S5, { left: '80px', top: '1350px', display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 28px', borderRadius: '24px', background: '#FFFDF8', boxShadow: '0 16px 40px rgba(28,23,38,0.13), 0 0 0 2px #E2D8C6', fontWeight: 900, fontSize: '36px' }, '<span class="ck">✓</span>Order');
TAPS.push([31.02, 865, 1340]);

// S6 HeliosLabs Storefront, independent store
const S6 = S(32.0, 36.4);
const s6g = E(S6, { left: '140px', top: '240px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,23,230,0.22), rgba(90,23,230,0) 65%)' });
const s6l = E(S6, { left: '370px', top: '420px', width: '340px', height: '340px' }, LG(340));
const s6n = HD(S6, 830, 88, 'HeliosLabs Storefront');
const s6s = HD(S6, 950, 62, 'ke saath apna');
const s6i = E(S6, { left: '190px', top: '1060px', width: '700px', height: '150px', borderRadius: '75px', background: INK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', fontSize: '54px', fontWeight: 900 }, '🗽 Independent store');
const s6t = SM(S6, 1270, 44, 'banwayein — your brand, your rules');

// S7 price
const S7 = S(36.4, 39.5);
const s7a = SM(S7, 520, 58, 'Plans starting at');
const s7p = E(S7, { left: 0, top: '620px', width: '1080px', textAlign: 'center', fontSize: '320px', fontWeight: 900, letterSpacing: '-0.06em', color: PUR, lineHeight: 1 }, '₹999');
const s7m = HD(S7, 980, 110, '/month');

// S8 comment STORE, beyond Instagram
const S8 = S(39.5, 43.2);
const s8a = HD(S8, 240, 96, 'Comment <span class="pur">“STORE”</span>');
const s8b = HD(S8, 370, 66, 'build your brand <span class="pur">beyond Instagram</span>');
const igBox = E(S8, { left: '390px', top: '1000px', width: '300px', height: '300px', borderRadius: '80px', background: 'linear-gradient(45deg,#f9a825,#e91e63 55%,#7b1fa2)', opacity: 0.9 }, `<svg width="300" height="300" viewBox="0 0 100 100"><rect x="22" y="22" width="56" height="56" rx="18" fill="none" stroke="#fff" stroke-width="6"/><circle cx="50" cy="50" r="13" fill="none" stroke="#fff" stroke-width="6"/><circle cx="66" cy="34" r="4" fill="#fff"/></svg>`);
const rocket = E(S8, { left: '470px', top: '1300px', width: '140px', height: '140px', fontSize: '120px', zIndex: 3, lineHeight: 1 }, '🚀');
const trail = E(S8, { left: '520px', top: '1300px', width: '40px', height: '10px', borderRadius: '20px', background: 'linear-gradient(#5A17E6, rgba(90,23,230,0))', zIndex: 2 });
const cb8 = E(S8, { left: '90px', top: '560px', width: '900px', height: '120px', borderRadius: '60px', background: '#FFFDF8', boxShadow: '0 20px 50px rgba(28,23,38,0.12), 0 0 0 2px #E2D8C6', display: 'flex', alignItems: 'center', padding: '0 16px 0 40px', boxSizing: 'border-box' });
const cT = E(cb8, { position: 'relative', flex: 1, fontSize: '44px', fontWeight: 800 }, '', 'x');
E(cb8, { position: 'relative', padding: '18px 34px', borderRadius: '40px', background: PUR, color: '#fff', fontSize: '32px', fontWeight: 800 }, 'Post', 'x');
TAPS.push([40.5, 90 + 900 - 16 - 80, 620]);

// S9 end
const S9 = S(43.2, 45.6);
E(S9, { left: '140px', top: '300px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,23,230,0.2), rgba(90,23,230,0) 65%)' });
const e1 = E(S9, { left: '350px', top: '470px', width: '380px', height: '380px' }, LG(380));
const e2 = HD(S9, 920, 84, 'HeliosLabs Storefront');
const e3 = E(S9, { left: '210px', top: '1060px', width: '660px', height: '120px', borderRadius: '60px', background: PUR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '46px', boxShadow: '0 20px 50px rgba(90,23,230,0.35)' }, '💬 Comment “STORE”');
const e4 = SM(S9, 1230, 40, 'Plans starting at ₹999/month');

window.seek = function (t) {
  // tile flip: tiles flip in diagonally before the cut, flip out after
  scenes.forEach(s => s.style.display = t >= s.a && t < s.b ? 'block' : 'none');
  let cov = null; CUTS.forEach(c => { if (t > c - 0.5 && t < c + 0.5) cov = c; });
  tiles.forEach((e, i) => { if (cov === null) { e.style.display = 'none'; return; } const r = Math.floor(i / COLS), c = i % COLS, d = (r + c) / (ROWS + COLS - 2) * 0.22;
    const pin = clamp((t - (cov - 0.5 + d)) / 0.2), pout = clamp((t - (cov + 0.02 + d)) / 0.2); const sx = pin * (1 - pout); e.style.display = sx > 0.005 ? 'block' : 'none'; e.style.transform = `scale(${sx}, ${lerp(0.6, 1, sx)}) rotate(${(1 - sx) * 45}deg)`; e.style.borderRadius = (1 - sx) * 40 + 'px'; });
  document.getElementById('logoTL').style.opacity = clamp((t - 0.2) / 0.4) * (1 - clamp((t - 43.0) / 0.3));
  let tp = null; TAPS.forEach(x => { if (t > x[0] - 0.45 && t < x[0] + 0.35) tp = x; });
  if (tp) { const [tc, x, y] = tp; touch.style.display = 'block'; touch.style.left = x + 'px'; touch.style.top = y + 'px'; touch.style.opacity = clamp((t - (tc - 0.45)) / 0.2) * clamp((tc + 0.35 - t) / 0.15); touch.style.transform = `scale(${t > tc - 0.06 && t < tc + 0.1 ? 0.8 : 1})`;
    const rr = clamp((t - tc) / 0.45); ripple.style.display = rr > 0 && rr < 1 ? 'block' : 'none'; ripple.style.left = x + 'px'; ripple.style.top = y + 'px'; ripple.style.transform = `scale(${1 + rr * 1.8})`; ripple.style.opacity = 1 - rr; }
  else { touch.style.display = 'none'; ripple.style.display = 'none'; }

  // S0
  { const p = clamp(sp(t, 0.05), 0, 1.15), q = ramp(t, 1.35, 0.3); think.style.transform = `scale(${p * (1 - q)})`; think.style.visibility = q >= 1 ? 'hidden' : 'visible'; dots0.forEach((d, k) => { d.style.transform = `scale(${clamp(sp(t, 0.15 + k * 0.08)) * (1 - q)})`; }); }
  wipe(s0a, t, 1.54); wipe(s0b, t, 2.86);
  blocks.forEach((b, k) => { const a = 2.0 + k * 0.6; const p = clamp(springS(t - a, 2.4, 0.5), 0, 1.2); b.style.transform = `translateY(${(1 - p) * -900}px) rotate(${(1 - clamp(p)) * (k % 2 ? 8 : -8)}deg)`; b.style.visibility = t < a ? 'hidden' : 'visible'; });
  // S1
  wipe(s1a, t, 5.02); wipe(s1b, t, 6.78);
  prods.forEach((e, k) => pop(e, t, 5.1 + k * 0.17, 1e9, `rotate(${(k % 2 - 0.5) * 4}deg)`)); fadeUp(fol, t, 6.6, 1e9, 120);
  { const p = ramp(t, 7.0, 1.7); fol.querySelector('#fnum').textContent = (1.2 + p * 17.2).toFixed(1) + 'K'; fol.querySelector('#fup').style.opacity = clamp((t - 7.5) / 0.3); }
  // S2
  wipe(s2a, t, 9.36); wipe(s2b, t, 11.54);
  { const wob = Math.sin(t * 3.2) * (2 + 4 * ramp(t, 12.6, 0.5)); slab.style.transform = `rotate(${wob}deg)`; fadeUp(rig, t, 9.3, 1e9, 200); pillar.style.boxShadow = t > 12.64 ? `0 0 0 ${8 + 4 * Math.sin(t * 10)}px rgba(229,53,79,0.45)` : 'none'; crack.style.opacity = 0; }
  // S3
  wipe(s3a, t, 13.84); hits.forEach(h => { const p = clamp(sp(t, h.t), 0, 1.15); h.style.transform = `translateX(${(1 - clamp(p)) * 1100}px) rotate(${t > h.t + 0.15 && t < h.t + 0.45 ? Math.sin(t * 70) * 1.5 : 0}deg)`; h.style.visibility = t < h.t ? 'hidden' : 'visible'; });
  { const rg = reachG.querySelector('#rg'); rg.style.strokeDasharray = 260; rg.style.strokeDashoffset = 260 * (1 - ramp(t, 14.9, 0.7)); }
  { const p = clamp(springS(t - 20.66, 2.6, 0.4), 0, 1.3); toh.style.transform = `scale(${p}) rotate(${(1 - clamp(p)) * -15}deg)`; toh.style.visibility = t < 20.66 ? 'hidden' : 'visible'; }
  // S4
  wipe(s4a, t, 21.64); wipe(s4b, t, 23.42); fadeUp(rig4, t, 21.45, 1e9, 160);
  { const p = clamp(springS(t - 23.9, 2.2, 0.55), 0, 1.15); p4b.style.transform = `scaleY(${p})`; p4b.style.visibility = t < 23.9 ? 'hidden' : 'visible'; slab4.style.transform = `rotate(${t < 23.9 ? Math.sin(t * 3.2) * 4 : Math.sin(t * 3.2) * 4 * Math.exp(-(t - 23.9) * 3)}deg)`; pop(stable, t, 24.5); }
  // S5
  wipe(s5a, t, 25.44); wipe(s5b, t, 26.7); fadeUp(br, t, 25.5, 1e9, 140);
  { const u = 'yourbrand.in', n = Math.floor(clamp((t - 25.86) / 0.7) * u.length); br.querySelector('#url5').textContent = '🔒 ' + u.slice(0, n); }
  { const p = sp(t, 26.9); ph5.style.transform = `translateY(${(1 - clamp(p, 0, 1.1)) * 1100}px) rotate(4deg)`; ph5.style.visibility = t < 26.9 ? 'hidden' : 'visible'; g5.style.top = 60 - ramp(t, 30.0, 1.0) * 380 + 'px'; pop(okT, t, 31.2); }
  pop(c247, t, 28.9, 1e9, 'rotate(-2deg)'); pop(cBr, t, 30.3); pop(cOr, t, 31.02);
  // S6
  { const p = sp(t, 32.26); s6l.style.transform = `scale(${clamp(p, 0, 1.25)}) rotate(${(1 - clamp(p)) * -30}deg)`; s6l.style.visibility = t < 32.26 ? 'hidden' : 'visible'; s6l.style.filter = 'drop-shadow(0 30px 60px rgba(90,23,230,0.45))'; s6g.style.transform = `scale(${0.6 + clamp(p) * 0.4})`; }
  wipe(s6n, t, 32.4); wipe(s6s, t, 33.6); pop(s6i, t, 34.46); tin(s6t, t, 35.6);
  // S7
  tin(s7a, t, 36.6); { const p = clamp(springS(t - 37.7, 2.6, 0.4), 0, 1.3); s7p.style.transform = `scale(${p})`; s7p.style.visibility = t < 37.7 ? 'hidden' : 'visible'; } wipe(s7m, t, 38.94);
  // S8
  wipe(s8a, t, 39.6); wipe(s8b, t, 41.1); fadeUp(cb8, t, 39.55, 1e9, 100);
  { const w = 'STORE', n = Math.floor(clamp((t - 39.8) / 0.5) * w.length); cT.innerHTML = t < 40.5 ? (n ? w.slice(0, n) : `<span style="color:#b5ab9d;font-weight:500">Add a comment…</span>`) + (Math.floor(t * 3) % 2 ? '|' : '') : `<span style="color:#5A17E6">STORE ✓</span>`; }
  { pop(igBox, t, 40.8); const f = ramp(t, 41.6, 1.4); rocket.style.top = lerp(1300, 760, f) + 'px'; rocket.style.left = lerp(470, 760, f) + 'px'; rocket.style.transform = `rotate(${-10 + f * 10}deg) scale(${lerp(0.9, 1.2, f)})`; rocket.style.visibility = t < 41.3 ? 'hidden' : 'visible';
    trail.style.visibility = rocket.style.visibility; trail.style.left = lerp(470, 760, f) + 30 + 'px'; trail.style.top = lerp(1300, 760, f) + 120 + 'px'; trail.style.height = f * 500 + 'px'; trail.style.transform = `rotate(${28 * f}deg)`; trail.style.transformOrigin = '50% 0'; }
  // S9
  { const p = sp(t, 43.3); e1.style.transform = `scale(${clamp(p, 0, 1.2)})`; e1.style.visibility = t < 43.3 ? 'hidden' : 'visible'; e1.style.filter = 'drop-shadow(0 30px 60px rgba(90,23,230,0.4))'; }
  wipe(e2, t, 43.55); pop(e3, t, 43.95); tin(e4, t, 44.25);
};
window.seek(0);
</script></body></html>
