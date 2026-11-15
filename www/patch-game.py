import re,sys
f="toole-game.js"
s=open(f,encoding="utf-8").read()
if "tgHub" in s:
    print("deja applique"); sys.exit()
R=[
('HOR=H*.3;BASE=H*.82;LW=Math.min(W*.3,H*.2);UH=LW*.5;','HOR=H*.34;BASE=H*.88;LW=Math.min(W*.32,H*.2);UH=LW*.85;'),
('K=.085','K=.07'),
('gap:15','gap:10'),
('g.gap=15+Math.min(8,g.level)','g.gap=10+Math.min(6,g.level)'),
('o=g.obs[i];o.z-=mv;','o=g.obs[i];o.z-=mv;if(o.t==="moto")o.z-=dt*7;'),
('var x=xs(o.l,s),y=ys(s),U=UH*s,i;','var x=xs(o.l,s)+(o.t==="moto"?Math.sin(G.t*9+o.z)*.07*UH*s:0),y=ys(s),U=UH*s,i;'),
('X.fillStyle="#111";X.beginPath();X.ellipse(x,y-.32*U,.09*U,.32*U,0,0,TAU);X.fill();',
 'X.fillStyle="#111";X.beginPath();X.ellipse(x,y-.32*U,.09*U,.32*U,0,0,TAU);X.fill();X.fillStyle="#9a9a9a";for(i=0;i<4;i++){X.fillRect(x-.06*U,y-.64*U+((G.t*4+i/4)%1)*.6*U,.12*U,.06*U)}circ(x+.14*U,y-.1*U,.12*U*(1+(G.t*3%1)),"rgba(170,170,170,.35)");'),
('"kiosque"]','"kiosque","immeuble","lampadaire","immeuble"]'),
('if(d.t==="baobab"){',
 'if(d.t==="immeuble"){var bw=1.5*U,bh=(2.8+(Math.floor(d.z*7)%3)*.5)*U;X.fillStyle=["#e8d3a3","#d9a77a","#cfd8c4"][Math.floor(d.z*7)%3];X.fillRect(x-bw/2,y-bh,bw,bh);X.fillStyle="#6b4a2a";X.fillRect(x-bw/2,y-bh,bw,.12*U);for(var r=0;r<4;r++)for(var c=0;c<3;c++){X.fillStyle=(r+c+Math.floor(d.z))%3?"#3b5d7a":"#FCD116";X.fillRect(x-bw/2+.18*U+c*.45*U,y-bh+.3*U+r*.6*U,.28*U,.36*U)}X.fillStyle="#3b2412";X.fillRect(x-.18*U,y-.6*U,.36*U,.6*U)}else if(d.t==="lampadaire"){X.fillStyle="#333";X.fillRect(x-.04*U,y-2.2*U,.08*U,2.2*U);circ(x,y-2.3*U,.3*U,"rgba(255,230,120,.35)");circ(x,y-2.3*U,.14*U,"#FFE08A")}else if(d.t==="baobab"){'),
('<h2>Chasse au pollueur</h2><p class="tgs">Ouaga Run</p>','<h2>Faso Rush</h2><p class="tgs">Chasse au pollueur · Ouaga</p>'),
('b.innerHTML="<span>🎮</span>Jouer";b.onclick=open;','b.innerHTML="<span>🎮</span>Jeux";b.onclick=hub;'),
('st.textContent=CSS;','st.textContent=CSS+HUBCSS;'),
('\nfunction build(){',
 '\nvar HUBCSS="#tgHub{display:none;position:fixed;inset:0;z-index:2147482500;align-items:flex-end;background:rgba(0,0,0,.55)}#tgHub .hc{position:relative;width:100%;background:#fff6e2;color:#2b1409;border-radius:22px 22px 0 0;padding:18px 16px calc(26px + env(safe-area-inset-bottom,0px));font-family:"+FONT+"}#tgHub h3{margin:0;font-size:24px;font-weight:900}#tgHub p{margin:2px 0 14px;color:#a8472b;font-weight:800}#tgHub .hx{position:absolute;right:12px;top:12px;width:36px;height:36px;border:0;border-radius:50%;background:#e8d9b8;font-size:17px}#tgHub .hg{display:grid;grid-template-columns:1fr 1fr;gap:12px}#tgHub .hi{border:0;border-radius:16px;padding:16px 8px;background:linear-gradient(135deg,#EF2B2D,#009E49);color:#fff;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:inherit}#tgHub .hi b{font-size:34px}#tgHub .hi span{font-size:17px;font-weight:900}#tgHub .hi small{opacity:.9;font-weight:700}";\nfunction hub(){var h=document.getElementById("tgHub");if(!h){h=document.createElement("div");h.id="tgHub";h.innerHTML=\'<div class="hc"><button class="hx" id="tgHx">✕</button><h3>🎮 Jeux</h3><p>Choisis ton jeu</p><div class="hg"><button class="hi" id="tgHr"><b>🏃🏍️</b><span>Faso Rush</span><small>Course · Ouaga</small></button></div></div>\';document.body.appendChild(h);h.onclick=function(e){if(e.target===h)h.style.display="none"};document.getElementById("tgHx").onclick=function(){h.style.display="none"};document.getElementById("tgHr").onclick=function(){h.style.display="none";open()}}h.style.display="flex"}\nfunction build(){'),
]
for a,b in R:
    n=s.count(a)
    if n<1: print("INTROUVABLE:",a[:50]); sys.exit(1)
    s=s.replace(a,b)
open(f,"w",encoding="utf-8").write(s)
print("OK")
