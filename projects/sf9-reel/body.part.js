
// text for this reel: letters decode from scrambled glyphs into the real word
const GLY = '#%&@$*+=?!<>/';
function decode(e, t, a, b = 1e9, dur = 0.5) { if (!e.src) { e.src = e.innerHTML; e.plain = e.textContent; } const q = clamp((t - b) / 0.25); e.style.visibility = t < a || q >= 1 ? 'hidden' : 'visible'; e.style.opacity = 1 - q;
  const p = clamp((t - a) / dur); if (p >= 1) { if (e.innerHTML !== e.src) e.innerHTML = e.src; return; }
  // keep the markup, scramble the not-yet-revealed letters
  let idx = 0; const total = e.plain.length; const out = e.src.split(/(<[^>]+>)/).map(s => s.startsWith('<') ? s : [...s].map(ch => { const i = idx++; if (ch === ' ' || i / total < p) return ch; return GLY[(i * 7 + Math.floor(t * 30)) % GLY.length]; }).join('')).join('');
  e.innerHTML = out; e.style.transform = `translateY(${(1 - ramp(t, a, 0.3)) * 20}px)`; }
const BGS = ['#F7E7C4', '#DDE3F2', '#F8E1E4', '#E4EEE0', '#F1DCD7', '#F3EEE4'];
const KIND = [['#e3a72f', '#8a2b1a', 'block'], ['#2b3f7d', '#e8e2d0', 'dots'], ['#e8a1ad', '#fff5f5', 'chikan'], ['#8fae8b', '#f4f1e4', 'stripe'], ['#7e1f2e', '#e7b851', 'block'], ['#efe6d2', '#b88a4a', 'chikan']];
const thumb = (i, s) => { const [c, a, p] = KIND[i % 6]; return kurti(s * 0.66, c, a, p); };

// ---------- page-turn transition ----------
const CUTS = [4.9, 9.8, 18.4, 24.9, 30.3, 36.6, 40.8, 44.2, 48.0];
const scenes = [];
function S(a, b) { const e = E(stage, {}, '', 'scene'); e.a = a; e.b = b; scenes.push(e); const sh = E(e, { inset: 0, zIndex: 50, pointerEvents: 'none', opacity: 0 }); e.sh = sh; return e; }
const TAPS = [];
const touch = E(document.body, { width: '70px', height: '70px', margin: '-35px 0 0 -35px', borderRadius: '35px', background: 'rgba(28,23,38,0.30)', boxShadow: '0 0 0 5px rgba(255,253,248,0.95), 0 8px 20px rgba(28,23,38,0.25)', zIndex: 650 });
const ripple = E(document.body, { width: '70px', height: '70px', margin: '-35px 0 0 -35px', borderRadius: '50%', border: '5px solid #5A17E6', zIndex: 649 });
const bigCard = (p, x, y, w, h) => E(p, { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }, '', 'card');

// S0 the Instagram ad
const S0 = S(0, 4.9);
const s0a = HD(S0, 200, 76, 'Customer ne aapka');
const s0b = HD(S0, 300, 96, '<span class="pur">Instagram ad</span> dekha');
const ad = E(S0, { left: '190px', top: '480px', width: '700px', height: '1180px', borderRadius: '70px', background: '#16110f', boxShadow: '0 40px 90px rgba(28,23,38,0.3)' });
const adS = E(ad, { left: '16px', top: '16px', width: '668px', height: '1148px', borderRadius: '56px', background: '#fff', overflow: 'hidden' });
adS.innerHTML = `<div style="position:absolute;left:30px;top:66px;display:flex;align-items:center;gap:16px"><div style="width:64px;height:64px;border-radius:32px;background:conic-gradient(#f9a825,#e91e63,#7b1fa2,#f9a825)"></div><div><div style="font-size:26px;font-weight:800">yourbrand</div><div style="font-size:20px;color:${MUT}">Sponsored</div></div></div>
  <div style="position:absolute;left:0;top:160px;width:668px;height:668px;background:${BGS[0]};display:flex;align-items:center;justify-content:center">${thumb(0, 560)}</div>
  <div style="position:absolute;left:0;top:828px;width:668px;height:80px;background:#3e4ad8;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 30px;box-sizing:border-box;font-size:26px;font-weight:800">Shop now <span>›</span></div>
  <div style="position:absolute;left:30px;top:940px;font-size:44px">♡ &nbsp;💬 &nbsp;➤</div><div style="position:absolute;left:30px;top:1020px;font-size:24px;font-weight:700">Festive Anarkali · ₹1,299 ✨</div>`;
const heart = E(S0, { left: '420px', top: '880px', fontSize: '240px', zIndex: 4 }, '❤️');

// S1 wants to know more about the brand first
const S1 = S(4.9, 9.8);
const s1a = HD(S1, 200, 72, 'Order se pehle…');
const s1b = HD(S1, 300, 72, 'brand ke baare mein <span class="pur">jaanna</span> hai');
const cust = E(S1, { left: '390px', top: '880px', width: '300px', height: '300px', borderRadius: '150px', background: '#E7DFF6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '170px' }, '🧐');
const qtags = [['Kaun hai ye brand?', 120, 560], ['Real hai?', 640, 640], ['Reviews?', 140, 1320], ['Website hai?', 600, 1380]].map(([n, x, y]) => E(S1, { left: x + 'px', top: y + 'px', padding: '22px 30px', borderRadius: '30px', background: '#FFFDF8', boxShadow: '0 16px 40px rgba(28,23,38,0.14), 0 0 0 2px #E2D8C6', fontSize: '40px', fontWeight: 800, whiteSpace: 'nowrap' }, n));

// S2 four questions
const S2 = S(9.8, 18.4);
const s2a = HD(S2, 190, 64, 'Customer ke sawaal…', '#8A8172');
const Q = [['🛡', 'Brand genuine hai ya nahi?', 10.08], ['🗂', 'Proper collection kahan hai?', 12.74], ['💳', 'Payment kaise karna hai?', 15.12], ['🚚', 'Order kaise track hoga?', 16.7]];
const qc = Q.map(([ic, n, t], k) => { const e = E(S2, { left: '70px', top: 330 + k * 330 + 'px', width: '940px', height: '290px' }, `<div style="position:absolute;left:40px;top:55px;width:180px;height:180px;border-radius:46px;background:#E7DFF6;font-size:100px;display:flex;align-items:center;justify-content:center">${ic}</div><div class="qt" style="position:absolute;left:260px;top:90px;font-size:50px;font-weight:900;letter-spacing:-0.03em;width:640px;line-height:1.1">${n}</div><div class="qm" style="position:absolute;right:30px;top:24px;width:76px;height:76px;border-radius:38px;background:#E5354F;color:#fff;font-size:52px;font-weight:900;display:flex;align-items:center;justify-content:center">?</div>`, 'card'); e.t = t; return e; });

// S3 DM for every detail → hesitation
const S3 = S(18.4, 24.9);
const s3a = HD(S3, 200, 72, 'Har info ke liye <span class="pur">DM</span>?');
const s3b = HD(S3, 300, 72, 'Customer <span class="red">hesitate</span> karega');
const dms = ['Price?', 'COD hai?', 'Size chart?', 'Return policy?', 'Delivery kab?', 'Real hai?', 'Payment link?', 'Track kaise?'].map((m, k) => E(S3, { left: (k % 2 ? 560 : 90) + 'px', top: 470 + Math.floor(k / 2) * 130 + 'px', padding: '20px 28px', borderRadius: '26px 26px 26px 8px', background: '#FFFDF8', boxShadow: '0 12px 30px rgba(28,23,38,0.14)', fontSize: '36px', fontWeight: 700, whiteSpace: 'nowrap' }, m));
const meter = E(S3, { left: '190px', top: '1080px', width: '700px', height: '420px' }, `<svg width="700" height="420" viewBox="0 0 700 420"><path d="M70 370 A280 280 0 0 1 630 370" fill="none" stroke="#E4EEE0" stroke-width="60"/><path d="M70 370 A280 280 0 0 1 350 90" fill="none" stroke="#9fd8b3" stroke-width="60"/><path d="M350 90 A280 280 0 0 1 630 370" fill="none" stroke="#F4B7C0" stroke-width="60"/>
  <text x="80" y="410" font-size="30" font-weight="800" fill="#1f9d55">Buy</text><text x="520" y="410" font-size="30" font-weight="800" fill="#E5354F">Hesitate</text><g id="needle"><line x1="350" y1="370" x2="350" y2="140" stroke="#1C1726" stroke-width="14" stroke-linecap="round"/><circle cx="350" cy="370" r="26" fill="#1C1726"/></g></svg>`);
const cartGone = E(S3, { left: '330px', top: '1560px', padding: '18px 30px', borderRadius: '30px', background: RED, color: '#fff', fontWeight: 900, fontSize: '36px' }, '🛒 Cart abandoned');

// S4 professional online presence
const S4 = S(24.9, 30.3);
const s4a = HD(S4, 200, 70, 'Isiliye zaroori hai ek');
const s4b = HD(S4, 300, 88, '<span class="pur">professional</span> presence');
const badge = E(S4, { left: '290px', top: '520px', width: '500px', height: '500px' }, `<svg width="500" height="500" viewBox="0 0 100 100"><path d="M50 4 L58 12 L69 10 L73 21 L84 25 L82 36 L90 44 L84 54 L88 65 L78 70 L76 82 L64 82 L56 91 L46 86 L35 90 L29 80 L17 78 L17 66 L8 58 L14 48 L10 37 L21 31 L23 19 L35 18 L42 8 Z" fill="#5A17E6"/><path d="M33 51 L45 62 L68 38" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
const trust = [['🔒', 'Secure checkout'], ['⭐', 'Real reviews'], ['🌐', 'Own domain'], ['📦', 'Order tracking']].map(([ic, n], k) => E(S4, { left: (k % 2 ? 570 : 90) + 'px', top: 1110 + Math.floor(k / 2) * 150 + 'px', display: 'flex', alignItems: 'center', gap: '16px', padding: '22px 30px', borderRadius: '26px', background: '#FFFDF8', boxShadow: '0 16px 40px rgba(28,23,38,0.13), 0 0 0 2px #E2D8C6', fontWeight: 900, fontSize: '36px', whiteSpace: 'nowrap' }, `<span style="font-size:44px">${ic}</span>${n}`));

// S5 a website where everything is clear
const S5 = S(30.3, 36.6);
const s5a = HD(S5, 200, 72, 'Ek aisi <span class="pur">website</span>…');
const site = E(S5, { left: '70px', top: '400px', width: '940px', height: '1220px', overflow: 'hidden' }, '', 'card');
site.innerHTML = `<div style="height:62px;background:#EFE7DA;display:flex;align-items:center;gap:10px;padding-left:24px"><i style="width:16px;height:16px;border-radius:8px;background:#ff5f57;display:block"></i><i style="width:16px;height:16px;border-radius:8px;background:#febc2e;display:block"></i><i style="width:16px;height:16px;border-radius:8px;background:#28c840;display:block"></i><div style="margin-left:20px;height:38px;border-radius:19px;background:#fff;padding:0 20px;display:flex;align-items:center;font-size:22px;font-weight:700;color:#1f9d55">🔒 yourbrand.in</div></div>`;
const sec = [['Products', 32.16], ['Pricing', 33.0], ['Ordering process', 33.9]].map(([n, t], k) => { const e = E(site, { left: '30px', top: 92 + k * 370 + 'px', width: '880px', height: '340px', borderRadius: '22px', background: '#fbf7f1', boxShadow: '0 0 0 3px transparent' }); e.t = t;
  E(e, { left: '26px', top: '20px', fontSize: '34px', fontWeight: 900 }, n); return e; });
sec[0].innerHTML += [0, 1, 2, 3].map(k => `<div style="position:absolute;left:${26 + k * 210}px;top:80px;width:196px;height:236px;border-radius:16px;background:${BGS[k]};display:flex;align-items:center;justify-content:center">${thumb(k, 196)}</div>`).join('');
sec[1].innerHTML += [['Anarkali', '₹1,299'], ['Block print', '₹999'], ['Chikankari', '₹1,499']].map(([n, p], k) => `<div style="position:absolute;left:26px;top:${86 + k * 80}px;width:828px;height:66px;border-radius:14px;background:#fff;display:flex;justify-content:space-between;align-items:center;padding:0 24px;box-sizing:border-box;font-size:28px;font-weight:700">${n}<b style="color:${PUR}">${p}</b></div>`).join('');
sec[2].innerHTML += [['🛒', 'Add to cart'], ['💳', 'Pay UPI / Card'], ['🚚', 'Track order']].map(([ic, n], k) => `<div style="position:absolute;left:${26 + k * 290}px;top:100px;width:250px;height:200px;border-radius:20px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-size:26px;font-weight:800"><div style="font-size:70px">${ic}</div>${n}</div>${k < 2 ? `<div style="position:absolute;left:${280 + k * 290}px;top:180px;font-size:40px;color:${PUR}">→</div>` : ''}`).join('');
const clear = E(S5, { left: '310px', top: '1660px', padding: '18px 34px', borderRadius: '34px', background: GRN, color: '#fff', fontWeight: 900, fontSize: '38px' }, '✓ Sab clearly available');

// S6 HeliosLabs Storefront
const S6 = S(36.6, 40.8);
const s6g = E(S6, { left: '140px', top: '260px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,23,230,0.22), rgba(90,23,230,0) 65%)' });
const s6l = E(S6, { left: '360px', top: '450px', width: '360px', height: '360px' }, LG(360));
const s6n = HD(S6, 900, 88, 'HeliosLabs Storefront');
const s6s = HD(S6, 1020, 64, 'ke saath apna <span class="pur">online store</span>');
const s6t = SM(S6, 1120, 46, 'banwayein');

// S7 price
const S7 = S(40.8, 44.2);
const s7a = SM(S7, 520, 58, 'Plans starting at');
const s7p = E(S7, { left: 0, top: '620px', width: '1080px', textAlign: 'center', fontSize: '320px', fontWeight: 900, letterSpacing: '-0.06em', color: PUR, lineHeight: 1 }, '₹999');
const s7m = HD(S7, 980, 110, '/month');

// S8 comment STORE → professional identity card
const S8 = S(44.2, 48.0);
const s8a = HD(S8, 220, 96, 'Comment <span class="pur">“STORE”</span>');
const s8b = HD(S8, 345, 54, 'give your brand a <span class="pur">professional identity</span>');
const idc = E(S8, { left: '170px', top: '560px', width: '740px', height: '900px', borderRadius: '44px', background: '#FFFDF8', boxShadow: '0 40px 90px rgba(28,23,38,0.18), 0 0 0 2px #E2D8C6', overflow: 'hidden' });
idc.innerHTML = `<div style="height:240px;background:linear-gradient(120deg,#5A17E6,#8B5CF6)"></div><div style="position:absolute;left:270px;top:140px;width:200px;height:200px;border-radius:100px;background:#f7e7c4;border:10px solid #FFFDF8;display:flex;align-items:center;justify-content:center">${thumb(0, 170)}</div>
  <div style="position:absolute;left:0;top:370px;width:740px;text-align:center;font-size:56px;font-weight:900">yourbrand <span style="color:#5A17E6">✔</span></div><div style="position:absolute;left:0;top:450px;width:740px;text-align:center;font-size:28px;font-weight:700;color:${MUT}">🔒 yourbrand.in</div>
  <div style="position:absolute;left:60px;top:540px;width:620px;display:grid;grid-template-columns:1fr 1fr;gap:18px">${['Collections', 'Clear pricing', 'Secure payments', 'Order tracking'].map(n => `<div style="padding:18px;border-radius:20px;background:#F3ECDF;font-size:26px;font-weight:800;text-align:center">✓ ${n}</div>`).join('')}</div>`;
const stamp8 = E(S8, { left: '640px', top: '1320px', padding: '20px 34px', borderRadius: '20px', border: '8px solid #5A17E6', color: PUR, fontSize: '50px', fontWeight: 900, background: 'rgba(243,236,223,0.9)', zIndex: 3 }, 'PRO ✓');

// S9 end
const S9 = S(48.0, 50.4);
E(S9, { left: '140px', top: '300px', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(90,23,230,0.2), rgba(90,23,230,0) 65%)' });
const e1 = E(S9, { left: '350px', top: '470px', width: '380px', height: '380px' }, LG(380));
const e2 = HD(S9, 920, 84, 'HeliosLabs Storefront');
const e3 = E(S9, { left: '210px', top: '1060px', width: '660px', height: '120px', borderRadius: '60px', background: PUR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '46px', boxShadow: '0 20px 50px rgba(90,23,230,0.35)' }, '💬 Comment “STORE”');
const e4 = SM(S9, 1230, 40, 'Plans starting at ₹999/month');

window.seek = function (t) {
  // page turn: outgoing page swings away around its left edge, revealing the next page underneath
  scenes.forEach((s, k) => { const ci = k ? CUTS[k - 1] : null, co = CUTS[k]; const on = t >= (ci !== null ? ci - 0.6 : 0) && t < (co !== undefined ? co + 0.05 : 1e9); s.style.display = on ? 'block' : 'none'; if (!on) return;
    s.style.zIndex = 100 - k; let ang = 0, sh = 0;
    if (co !== undefined && t > co - 0.6) { const p = inout(clamp((t - (co - 0.6)) / 0.62)); ang = -p * 100; sh = p; }
    s.style.transformOrigin = '0% 50%'; s.style.transform = ang ? `perspective(2400px) rotateY(${ang}deg)` : 'none';
    s.sh.style.opacity = sh * 0.6; s.sh.style.background = 'linear-gradient(90deg, rgba(28,23,38,0) 30%, rgba(28,23,38,0.5))'; s.style.boxShadow = sh ? `${-30 * sh}px 0 60px rgba(28,23,38,${0.3 * sh})` : 'none'; });
  document.getElementById('logoTL').style.opacity = clamp((t - 0.2) / 0.4) * (1 - clamp((t - 47.8) / 0.3));
  let tp = null; TAPS.forEach(x => { if (t > x[0] - 0.45 && t < x[0] + 0.35) tp = x; });
  if (tp) { const [tc, x, y] = tp; touch.style.display = 'block'; touch.style.left = x + 'px'; touch.style.top = y + 'px'; touch.style.opacity = clamp((t - (tc - 0.45)) / 0.2) * clamp((tc + 0.35 - t) / 0.15); touch.style.transform = `scale(${t > tc - 0.06 && t < tc + 0.1 ? 0.8 : 1})`;
    const rr = clamp((t - tc) / 0.45); ripple.style.display = rr > 0 && rr < 1 ? 'block' : 'none'; ripple.style.left = x + 'px'; ripple.style.top = y + 'px'; ripple.style.transform = `scale(${1 + rr * 1.8})`; ripple.style.opacity = 1 - rr; }
  else { touch.style.display = 'none'; ripple.style.display = 'none'; }

  // S0
  decode(s0a, t, 0.1); decode(s0b, t, 1.0); fadeUp(ad, t, 0.2, 1e9, 300);
  { const p = clamp(springS(t - 3.92, 3, 0.4), 0, 1.3), q = ramp(t, 4.4, 0.3); heart.style.transform = `scale(${p * (1 - q)})`; heart.style.visibility = t < 3.92 ? 'hidden' : 'visible'; }
  TAPS.length;
  // S1
  decode(s1a, t, 5.28); decode(s1b, t, 7.1); pop(cust, t, 5.4);
  qtags.forEach((e, k) => pop(e, t, 7.4 + k * 0.35, 1e9, `rotate(${Math.sin(t * 2 + k) * 3}deg) translateY(${Math.sin(t * 2.4 + k) * 8}px)`));
  // S2
  decode(s2a, t, 10.0);
  qc.forEach(e => { const p = clamp(sp(t, e.t), 0, 1.15); e.style.transform = `translateX(${(1 - clamp(p)) * -1100}px) rotate(${(1 - clamp(p)) * -4}deg)`; e.style.visibility = t < e.t ? 'hidden' : 'visible'; decode(e.querySelector('.qt'), t, e.t + 0.1, 1e9, 0.6); const m = e.querySelector('.qm'); m.style.transform = `scale(${clamp(springS(t - e.t - 0.5, 3, 0.4), 0, 1.3)}) rotate(${Math.sin(t * 5) * 8}deg)`; });
  // S3
  decode(s3a, t, 18.62); decode(s3b, t, 22.52);
  dms.forEach((d, k) => { const a = 19.0 + k * 0.32; pop(d, t, a, 1e9, `rotate(${(k % 2 - 0.5) * 6}deg)`); d.style.opacity = 1 - ramp(t, 22.3, 0.4) * 0.6; });
  { fadeUp(meter, t, 22.4, 1e9, 80); const a = lerp(-60, 62, ramp(t, 23.0, 1.0)) + (t > 24.0 ? Math.sin(t * 14) * 3 : 0); meter.querySelector('#needle').setAttribute('transform', `rotate(${a} 350 370)`); pop(cartGone, t, 24.2); }
  // S4
  decode(s4a, t, 25.0); decode(s4b, t, 27.18);
  { const p = clamp(springS(t - 27.44, 2.4, 0.45), 0, 1.3); badge.style.transform = `scale(${p}) rotate(${(1 - clamp(p)) * -90}deg)`; badge.style.visibility = t < 27.44 ? 'hidden' : 'visible'; }
  trust.forEach((e, k) => pop(e, t, 28.0 + k * 0.3));
  // S5
  decode(s5a, t, 30.52); fadeUp(site, t, 30.6, 1e9, 200);
  sec.forEach(e => { const on = t >= e.t; e.style.boxShadow = on ? `0 0 0 ${5 + 2 * Math.sin(t * 8)}px #5A17E6` : '0 0 0 3px transparent'; e.style.opacity = t < e.t - 0.6 ? 0.35 : 1; e.style.transform = `scale(${on ? 1 + 0.02 * Math.max(0, 1 - (t - e.t) / 0.3) : 0.98})`; });
  pop(clear, t, 35.96);
  // S6
  { const p = sp(t, 37.0); s6l.style.transform = `scale(${clamp(p, 0, 1.25)}) rotate(${(1 - clamp(p)) * -30}deg)`; s6l.style.visibility = t < 37.0 ? 'hidden' : 'visible'; s6l.style.filter = 'drop-shadow(0 30px 60px rgba(90,23,230,0.45))'; s6g.style.transform = `scale(${0.6 + clamp(p) * 0.4})`; }
  decode(s6n, t, 37.16, 1e9, 0.6); decode(s6s, t, 38.68); tin(s6t, t, 39.9);
  // S7
  tin(s7a, t, 40.96); { const p = clamp(springS(t - 42.2, 2.6, 0.4), 0, 1.3); s7p.style.transform = `scale(${p})`; s7p.style.visibility = t < 42.2 ? 'hidden' : 'visible'; } decode(s7m, t, 43.42);
  // S8
  decode(s8a, t, 44.36); decode(s8b, t, 45.64, 1e9, 0.7);
  { const p = sp(t, 44.6); idc.style.transform = `translateY(${(1 - clamp(p, 0, 1.1)) * 1200}px) rotate(${(1 - clamp(p)) * 8}deg)`; idc.style.visibility = t < 44.6 ? 'hidden' : 'visible'; }
  pop(stamp8, t, 46.72, 1e9, 'rotate(-10deg)');
  // S9
  { const p = sp(t, 48.1); e1.style.transform = `scale(${clamp(p, 0, 1.2)})`; e1.style.visibility = t < 48.1 ? 'hidden' : 'visible'; e1.style.filter = 'drop-shadow(0 30px 60px rgba(90,23,230,0.4))'; }
  decode(e2, t, 48.35, 1e9, 0.6); pop(e3, t, 48.75); tin(e4, t, 49.05);
};
window.seek(0);
</script></body></html>
