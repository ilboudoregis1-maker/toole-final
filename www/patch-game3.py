import sys
f="toole-game.js"
s=open(f,encoding="utf-8").read()
if "tgHub" not in s:
    print("Applique d'abord l'etape 1"); sys.exit(1)
if "tgIc" in s:
    print("deja applique"); sys.exit()
def rep(a,b):
    global s
    if s.count(a)<1:
        print("INTROUVABLE:",a[:60]); sys.exit(1)
    s=s.replace(a,b)
rep('body.dc-on #tgBtn{display:flex}','')
i=s.index('var HUBCSS="'); j=s.index('function build(){')
NEW=r'''var PAD='<svg viewBox="0 0 24 24"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>';
var SCENE='<svg class="sc" viewBox="0 0 360 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8702a"/><stop offset=".65" stop-color="#ffb347"/><stop offset="1" stop-color="#ffe3a0"/></linearGradient><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4683a"/><stop offset="1" stop-color="#8f3a1f"/></linearGradient><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1b3d" stop-opacity="0"/><stop offset="1" stop-color="#0d1b3d"/></linearGradient></defs><rect width="360" height="210" fill="url(#gs)"/><circle cx="268" cy="92" r="46" fill="#FCD116" opacity=".28"/><circle cx="268" cy="92" r="30" fill="#FCD116"/><path d="M0 120V96h26V74h20v18h16v-30h24v40h18V90h22v30z" fill="#7a3d4e" opacity=".6"/><path d="M262 120V84h18V70h22v24h20v-14h24v40z" fill="#7a3d4e" opacity=".6"/><g fill="#5a3320"><path d="M34 126Q42 100 40 80H58Q56 100 66 126Z"/><ellipse cx="49" cy="76" rx="27" ry="13"/><path d="M296 126Q304 100 302 82H320Q318 100 328 126Z"/><ellipse cx="311" cy="78" rx="27" ry="13"/></g><rect y="118" width="360" height="92" fill="url(#gg)"/><polygon points="150,118 210,118 332,210 28,210" fill="#34323a"/><polygon points="149,118 154,118 42,210 20,210" fill="#EF2B2D"/><polygon points="206,118 211,118 340,210 318,210" fill="#009E49"/><path d="M171 118L140 210M189 118L220 210" stroke="#f4efe0" stroke-width="3" stroke-dasharray="10 9" fill="none"/><g transform="translate(180 146) scale(.42)"><ellipse rx="22" ry="5" fill="#000" opacity=".3"/><path d="M-7 -34L-12 -4M7 -34L12 -4" stroke="#2b1b12" stroke-width="7" stroke-linecap="round"/><path d="M-16 -80H16L22 -34H-22Z" fill="#ff7a1a"/><circle cx="26" cy="-46" r="13" fill="#e9e4d8"/><circle cy="-90" r="10" fill="#5b3522"/><path d="M-10 -92A10 10 0 0 1 10 -92Z" fill="#1f1f1f"/></g><g transform="translate(138 170) scale(.62)"><ellipse rx="22" ry="5" fill="#000" opacity=".3"/><ellipse cy="-14" rx="5" ry="15" fill="#111"/><rect x="-9" y="-38" width="18" height="20" rx="3" fill="#c42d2d"/><rect x="-14" y="-50" width="28" height="12" rx="3" fill="#d9b26a"/><rect x="-10" y="-74" width="20" height="26" rx="4" fill="#2a5db0"/><circle cy="-80" r="7" fill="#5b3522"/><path d="M-7 -82A7 7 0 0 1 7 -82Z" fill="#FCD116"/></g><g transform="translate(184 208)"><ellipse rx="26" ry="5" fill="#000" opacity=".3"/><path d="M-9 -44L-15 -5M9 -44L15 -5" stroke="#2b1b12" stroke-width="9" stroke-linecap="round"/><path d="M-20 -104H20L28 -44H-28Z" fill="#009E49"/><rect x="-24" y="-76" width="48" height="8" fill="#FCD116"/><path d="M-20 -98L-30 -64M20 -98L30 -64" stroke="#5b3522" stroke-width="8" stroke-linecap="round"/><circle cy="-116" r="13" fill="#5b3522"/><path d="M-13 -119A13 13 0 0 1 13 -119Z" fill="#EF2B2D"/></g><rect y="140" width="360" height="70" fill="url(#gf)"/></svg>';
var HUBCSS=["#tgHub{display:none;position:fixed;inset:0;z-index:2147482500;flex-direction:column;background:#eef6ff;font-family:"+FONT+";animation:tgIn .25s ease-out}",
"@keyframes tgIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes tgP{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}@keyframes tgG{0%,100%{box-shadow:0 8px 22px rgba(47,111,224,.45)}50%{box-shadow:0 8px 30px rgba(0,194,224,.8)}}",
"#tgHub .hh{position:relative;overflow:hidden;display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 12px) 14px 16px;background:linear-gradient(135deg,#00c2e0 0%,#2f6fe0 60%,#4a56e2 100%);color:#fff;box-shadow:0 8px 26px rgba(47,111,224,.35)}",
"#tgHub .hh::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.28) 1px,transparent 1.6px);background-size:14px 14px;pointer-events:none}#tgHub .hh>*{position:relative}",
"#tgHub .hb{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;padding:0}#tgHub .hb:active{transform:scale(.92)}",
"#tgHub .hb svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}",
"#tgHub h3{flex:1;margin:0;font-family:Orbitron,sans-serif;font-size:18px;font-weight:800;letter-spacing:4px;color:#fff;text-shadow:0 0 14px rgba(255,255,255,.45)}",
"#tgHub .hs{flex:1;overflow:auto;padding:18px 16px calc(24px + env(safe-area-inset-bottom,0px))}#tgHub .hk{margin:0 4px 12px;color:#2f6fe0;font-weight:800;font-size:14px;letter-spacing:.5px}",
"#tgHub .hc{border-radius:26px;overflow:hidden;background:#0d1b3d;color:#fff;box-shadow:0 18px 42px rgba(20,50,120,.4),0 0 0 1px rgba(255,255,255,.08) inset}#tgHub .sc{display:block;width:100%;height:auto}",
"#tgHub .hi2{padding:0 18px 18px;margin-top:-14px;position:relative}#tgHub .ht{display:flex;gap:8px;margin-bottom:10px}",
"#tgHub .t1,#tgHub .t2{font-size:11px;font-weight:900;letter-spacing:1px;padding:4px 10px;border-radius:999px}#tgHub .t1{background:#FCD116;color:#2b1409}#tgHub .t2{background:rgba(255,255,255,.14);color:#cfe3ff}",
"#tgHub .hn{font-size:30px;font-weight:900;line-height:1.05}#tgHub .hd{margin-top:2px;color:#9fc0ff;font-weight:700;font-size:14px}",
"#tgHub .hr{display:flex;gap:10px;margin:14px 0}#tgHub .hr div{flex:1;background:rgba(255,255,255,.08);border-radius:14px;padding:9px 6px;text-align:center}#tgHub .hr b{display:block;font-size:19px;font-weight:900}#tgHub .hr small{color:#9fc0ff;font-weight:700;font-size:11px}",
"#tgHub .hp{width:100%;height:54px;border:0;border-radius:16px;background:linear-gradient(135deg,#00c2e0,#2f6fe0 60%,#4a56e2);color:#fff;font:900 18px "+FONT+";letter-spacing:2px;display:flex;align-items:center;justify-content:center;gap:10px;animation:tgG 2s infinite}#tgHub .hp:active{transform:scale(.97)}#tgHub .hp svg{width:22px;height:22px}",
"#tgHub .hf{text-align:center;margin:18px 0 0;color:#7d93b8;font-weight:700;font-size:13px}",
"#tgIc{position:relative}#tgIc::after{content:'';position:absolute;top:5px;right:5px;width:9px;height:9px;border-radius:50%;background:#FCD116;animation:tgP 1.6s infinite}#scrDecouvrir .dc-hd h1{letter-spacing:1.5px}",
"#tgSkip{position:absolute;right:10px;top:calc(8px + env(safe-area-inset-top,0px));height:40px;padding:0 16px;border:0;border-radius:20px;background:rgba(0,0,0,.5);color:#fff;font:800 15px "+FONT+"}"].join("");
function hub(){
 var o=document.getElementById("tgHub");if(o)o.remove();
 var h=document.createElement("div");h.id="tgHub";
 h.innerHTML='<div class="hh"><button class="hb" id="tgHx" aria-label="Retour"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button><h3>JEUX</h3><span class="hb">'+PAD+'</span></div>'
 +'<div class="hs"><p class="hk">Choisis ton jeu</p><div class="hc">'+SCENE+'<div class="hi2"><div class="ht"><span class="t1">NOUVEAU</span><span class="t2">COURSE</span><span class="t2">SOLO</span></div><div class="hn">Faso Rush</div><div class="hd">Chasse au pollueur · Ouagadougou</div>'
 +'<div class="hr"><div><b>'+fmt(best)+'</b><small>RECORD</small></div><div><b>3</b><small>ZONES</small></div><div><b>∞</b><small>COURSE</small></div></div>'
 +'<button class="hp" id="tgHp"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="#fff"/></svg>JOUER</button></div></div><p class="hf">D’autres jeux arrivent bientôt</p></div>';
 document.body.appendChild(h);
 document.getElementById("tgHx").onclick=function(){h.style.display="none"};
 document.getElementById("tgHp").onclick=function(){h.style.display="none";open()};
 h.style.display="flex";
}
function inject(){var hd=document.querySelector("#scrDecouvrir .dc-hd");if(!hd||hd.querySelector("#tgIc"))return;
 var b=document.createElement("button");b.id="tgIc";b.className="dc-ib";b.setAttribute("aria-label","Jeux");b.innerHTML=PAD;b.onclick=hub;hd.insertBefore(b,hd.lastElementChild)}
'''
s=s[:i]+NEW+s[j:]
rep('var b=document.createElement("button");b.id="tgBtn";','var b=document.createElement("button");b.id="tgBtn";setInterval(inject,600);inject();')
open(f,"w",encoding="utf-8").write(s)
print("OK")
