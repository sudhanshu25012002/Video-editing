// ---------- kurti illustration ----------
let PID = 0;
function kurti(w, c, acc, pat) { const id = 'p' + (PID++); const h = w * 1.3;
  const pats = { dots: `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${c}"/><circle cx="5" cy="5" r="1.6" fill="${acc}" opacity=".7"/></pattern>`,
    stripe: `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${c}"/><rect width="3" height="8" fill="${acc}" opacity=".35"/></pattern>`,
    block: `<pattern id="${id}" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="${c}"/><path d="M8 2 L14 8 L8 14 L2 8 Z" fill="none" stroke="${acc}" stroke-width="1.4" opacity=".75"/><circle cx="8" cy="8" r="1.4" fill="${acc}"/></pattern>`,
    plain: `<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${c}"/></pattern>`,
    chikan: `<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c}"/><path d="M7 3 Q10 7 7 11 Q4 7 7 3Z" fill="${acc}" opacity=".55"/></pattern>` };
  return `<svg width="${w}" height="${h}" viewBox="0 0 100 130"><defs>${pats[pat]}</defs>
    <path d="M37 8 Q50 22 63 8 L79 14 L94 42 L81 48 L74 34 L75 60 Q80 92 90 124 L10 124 Q20 92 25 60 L26 34 L19 48 L6 42 L21 14 Z" fill="url(#${id})" stroke="rgba(0,0,0,.12)" stroke-width="1"/>
    <path d="M37 8 Q50 22 63 8" fill="none" stroke="${acc}" stroke-width="2.4"/><path d="M50 15 L50 40" stroke="${acc}" stroke-width="1.6"/>
    <path d="M10 124 Q50 118 90 124" fill="none" stroke="${acc}" stroke-width="3"/><path d="M75 60 Q50 66 25 60" fill="none" stroke="${acc}" stroke-width="1.6" opacity=".7"/></svg>`; }
const PRODUCTS = [
  { n: 'Mustard Anarkali', p: '₹1,299', c: '#e3a72f', a: '#8a2b1a', pat: 'block', bg: '#f7e7c4' },
  { n: 'Indigo Block Print', p: '₹999', c: '#2b3f7d', a: '#e8e2d0', pat: 'dots', bg: '#dde3f2' },
  { n: 'Rose Chikankari', p: '₹1,499', c: '#e8a1ad', a: '#fff5f5', pat: 'chikan', bg: '#f8e1e4' },
  { n: 'Sage Cotton Set', p: '₹1,199', c: '#8fae8b', a: '#f4f1e4', pat: 'stripe', bg: '#e4eee0' },
  { n: 'Maroon Festive', p: '₹1,799', c: '#7e1f2e', a: '#e7b851', pat: 'block', bg: '#f1dcd7' },
  { n: 'Ivory Straight Kurti', p: '₹899', c: '#efe6d2', a: '#b88a4a', pat: 'chikan', bg: '#f3eee4' },
];
function prodCard(parent, k, w, css = {}) { const P = PRODUCTS[k]; const ih = w * 1.1;
  const e = E(parent, Object.assign({ width: w + 'px', borderRadius: '18px', background: '#fff', overflow: 'hidden', boxShadow: '0 6px 18px rgba(80,50,20,0.12)' }, css));
  e.innerHTML = `<div style="height:${ih}px;background:${P.bg};display:flex;align-items:center;justify-content:center">${kurti(w * 0.66, P.c, P.a, P.pat)}</div>
    <div style="padding:${w * 0.05}px ${w * 0.07}px ${w * 0.07}px;font-family:Inter;color:#2a2018"><div style="font-size:${w * 0.085}px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${P.n}</div>
    <div class="pr" style="display:inline-block;margin-top:${w * 0.02}px;font-size:${w * 0.1}px;font-weight:800;color:${ORG};border-radius:8px;padding:0 4px;margin-left:-4px">${P.p}</div>
    <div style="font-size:${w * 0.065}px;color:#2f9b57;font-weight:600;margin-top:2px">● In stock</div></div>`;
  return e; }

// ---------- scenes ----------
