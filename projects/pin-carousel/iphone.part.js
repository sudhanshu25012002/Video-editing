// iPhone 17/18 Pro screen (402x874pt) — screen UI only, no hardware frame
const IOS = { st_m_home: ['st_i_home', '#f8d486', 0, 'store.helioslabs.in'], st_m_best: ['st_i_best', '#fdf8ee', 0, 'store.helioslabs.in'], sh_m_home: ['sh_i_home', '#09090b', 1, 'shop.helioslabs.in'] };
const phone = (x, y, key, r = 0, s = 1) => {
  const [img, bg, dark, url] = IOS[key]; const W = 300, k = W / 402, H = Math.round(874 * k), p = v => (v * k).toFixed(2) + 'px';
  const fg = dark ? '#fff' : '#000';
  const sig = `<svg width="${p(19)}" height="${p(12)}" viewBox="0 0 19 12"><rect x="0" y="8" width="3.2" height="4" rx="1" fill="${fg}"/><rect x="5" y="5.5" width="3.2" height="6.5" rx="1" fill="${fg}"/><rect x="10" y="3" width="3.2" height="9" rx="1" fill="${fg}"/><rect x="15" y="0" width="3.2" height="12" rx="1" fill="${fg}"/></svg>`;
  const wifi = `<svg width="${p(17)}" height="${p(12)}" viewBox="0 0 17 12"><path d="M8.5 2.3c2.6 0 4.9 1 6.6 2.6l1.2-1.2C14.3 1.7 11.5.5 8.5.5S2.7 1.7.7 3.7l1.2 1.2C3.6 3.3 5.9 2.3 8.5 2.3z" fill="${fg}"/><path d="M8.5 5.9c1.6 0 3.1.6 4.1 1.6l1.2-1.2C12.4 4.9 10.5 4.1 8.5 4.1S4.6 4.9 3.2 6.3l1.2 1.2c1.1-1 2.5-1.6 4.1-1.6z" fill="${fg}"/><path d="M8.5 9.4c.6 0 1.2.2 1.6.6l-1.6 1.7-1.6-1.7c.4-.4 1-.6 1.6-.6z" fill="${fg}"/></svg>`;
  const bat = `<svg width="${p(27)}" height="${p(13)}" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="${fg}" stroke-opacity=".38"/><rect x="2" y="2" width="20" height="9" rx="2.5" fill="${fg}"/><path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" fill="${fg}" fill-opacity=".45"/></svg>`;
  return `<div class="a" style="left:${x}px;top:${y}px;width:${W}px;height:${H}px;transform:rotate(${r}deg) scale(${s});border-radius:${p(62)};overflow:hidden;background:${bg};
    box-shadow:0 40px 70px -28px rgba(30,10,60,.55),0 0 0 1px rgba(0,0,0,.08)">
   <div style="position:absolute;left:0;right:0;top:${p(62)};bottom:0;background:url(shots/${img}.png) top center/100% auto no-repeat"></div>
   <div style="position:absolute;left:0;right:0;top:0;height:${p(62)};background:${bg}"></div>
   <div style="position:absolute;left:${p(51)};top:${p(19)};font:600 ${p(17)}/${p(22)} 'Inter',sans-serif;letter-spacing:-.01em;color:${fg}">9:41</div>
   <div style="position:absolute;left:50%;top:${p(11)};width:${p(125)};height:${p(37)};margin-left:${p(-62.5)};border-radius:${p(20)};background:#000"></div>
   <div style="position:absolute;right:${p(30)};top:${p(23)};display:flex;align-items:center;gap:${p(6)}">${sig}${wifi}${bat}</div>
   <div style="position:absolute;left:${p(14)};right:${p(14)};bottom:${p(30)};height:${p(50)};display:flex;align-items:center;gap:${p(8)}">
     <div style="width:${p(50)};height:${p(50)};border-radius:50%;background:rgba(250,250,252,.82);backdrop-filter:blur(14px);box-shadow:0 4px 18px rgba(0,0,0,.18);display:grid;place-items:center;font:500 ${p(26)} 'Inter';color:#111;flex:none">‹</div>
     <div style="flex:1;height:${p(50)};border-radius:${p(25)};background:rgba(250,250,252,.82);backdrop-filter:blur(14px);box-shadow:0 4px 18px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;gap:${p(6)};font:500 ${p(15)} 'Inter';color:#111">
       <svg width="${p(10)}" height="${p(13)}" viewBox="0 0 10 13"><rect x="0" y="5.5" width="10" height="7.5" rx="1.6" fill="#111"/><path d="M2.3 5.6V3.9a2.7 2.7 0 0 1 5.4 0v1.7" fill="none" stroke="#111" stroke-width="1.4"/></svg>${url}</div>
     <div style="width:${p(50)};height:${p(50)};border-radius:50%;background:rgba(250,250,252,.82);backdrop-filter:blur(14px);box-shadow:0 4px 18px rgba(0,0,0,.18);display:grid;place-items:center;font:700 ${p(18)} 'Inter';color:#111;flex:none;letter-spacing:.05em">···</div>
   </div>
   <div style="position:absolute;left:50%;bottom:${p(8)};width:${p(139)};height:${p(5)};margin-left:${p(-69.5)};border-radius:3px;background:${dark ? '#fff' : '#000'}"></div>
  </div>`;
};
