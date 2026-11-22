/* TÕÕLé : compte Influenceur v2 (design refait, icônes vectorielles) */
(function(){if(window.__tinf)return;window.__tinf=1;window.__INF=window.__INF||{};
var BOX=null,busy=false;
/* ---------- icônes SVG (trait, currentColor) ---------- */
var P={
star:'<path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9z" fill="currentColor" stroke="none"/>',
video:'<rect x="3" y="5" width="18" height="14" rx="3.5"/><path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor"/>',
users:'<circle cx="9" cy="8.5" r="3.4"/><path d="M2.8 20c.4-3.6 3-5.6 6.2-5.6s5.8 2 6.2 5.6"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6.2M18.6 14.8c1.7.7 2.8 2.3 3 4.7"/>',
gift:'<rect x="3.5" y="9" width="17" height="4" rx="1.2"/><path d="M5 13v7.5h14V13M12 9v11.5M12 9c-1.2-4.2-5.5-4.6-5.5-1.8 0 1.5 1.8 1.8 5.5 1.8zM12 9c1.2-4.2 5.5-4.6 5.5-1.8 0 1.5-1.8 1.8-5.5 1.8z"/>',
card:'<rect x="2.8" y="5" width="18.4" height="14" rx="3"/><path d="M2.8 10h18.4M6.5 15h4"/>',
check:'<circle cx="12" cy="12" r="9.2"/><path d="M7.8 12.4l3 3 5.6-6.2"/>',
clock:'<circle cx="12" cy="12" r="9.2"/><path d="M12 7v5.2l3.4 2"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
heart:'<path d="M12 20.6S3.6 15.6 3.6 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.4 2.5c0 6.2-8.4 11.2-8.4 11.2z"/>',
shield:'<path d="M12 3l7.5 2.8v5.6c0 4.6-3.1 8.2-7.5 9.6-4.4-1.4-7.5-5-7.5-9.6V5.8z"/><path d="M8.6 12l2.5 2.5 4.4-4.8"/>',
alert:'<circle cx="12" cy="12" r="9.2"/><path d="M12 7.5v5.5M12 16.4h.01"/>',
pen:'<path d="M4 20l1-4.2L16.4 4.4a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.2 19z"/><path d="M14.5 6.3l3.2 3.2"/>'
};
function ic(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||22)+'" height="'+(s||22)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[n]+'</svg>'}
/* cadeaux dessinés en vectoriel */
var ART={
cal:"<svg viewBox='0 0 64 48' width='62' height='46'><defs><linearGradient id='tgc' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#d98b3f'/><stop offset='1' stop-color='#8f4f1c'/></linearGradient></defs><path d='M4 17h56a28 28 0 0 1-56 0z' fill='url(#tgc)'/><ellipse cx='32' cy='17' rx='28' ry='6.4' fill='#6e3b12'/><ellipse cx='32' cy='17' rx='24' ry='4.2' fill='#f5d9a8'/><path d='M12 30q20 11 40 0' stroke='#f5d9a8' stroke-width='2.4' fill='none' stroke-linecap='round'/><path d='M16 36q16 7 32 0' stroke='#f0c27f' stroke-width='1.8' fill='none' stroke-linecap='round'/></svg>",
flag:"<svg viewBox='0 0 72 48' width='66' height='44' style='border-radius:7px;box-shadow:0 4px 10px rgba(10,30,70,.25)'><rect width='72' height='24' fill='#ef2b2d'/><rect y='24' width='72' height='24' fill='#009e49'/><path d='M36 11.5l3.2 9.8h10.3l-8.3 6 3.2 9.8L36 31.1l-8.4 6 3.2-9.8-8.3-6h10.3z' fill='#fcd116'/></svg>",
horse:"<svg viewBox='0 0 64 64' width='54' height='54'><defs><linearGradient id='tgh' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#c47a35'/><stop offset='1' stop-color='#7a4015'/></linearGradient></defs><path d='M22 4l4.4 8.4C35 14.6 45 24 52.6 35.6c3.4 5.2 3.6 9.6-.6 12.2-4.2 2.4-8.4.4-11.4-2.4-2.6-2.4-5.2-2.8-6.8-.6-1.6 2.4-2 8.6-.6 15.2H11c-1.2-14 .6-27.6 5.4-38.4C18.6 14.4 20.4 8.6 22 4z' fill='url(#tgh)'/><path d='M22 4c-3.8 5.6-6.4 12-8.6 20.4C10.6 35 9.4 47 10.4 60H19c-1.2-14.2.4-25.8 4.2-35.4C25 20 25.2 11.4 22 4z' fill='#2b1a0e'/><path d='M26.4 12.4L24 4.8l5.6 6z' fill='#2b1a0e'/><circle cx='38.6' cy='25.4' r='2.5' fill='#1c1008'/><circle cx='39.4' cy='24.6' r='.9' fill='#fff'/><ellipse cx='50.4' cy='42' rx='1.2' ry='1.9' transform='rotate(-35 50.4 42)' fill='#3f200c'/></svg>"
};
var CSS="#tinfOv{position:fixed;inset:0;z-index:100050;background:rgba(8,20,50,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:flex-end;animation:tiF .2s ease}"
+"@keyframes tiF{from{opacity:0}}@keyframes tiU{from{transform:translateY(40px);opacity:0}}"
+"#tinfOv .tsh{position:relative;width:100%;max-height:92%;display:flex;flex-direction:column;box-sizing:border-box;background:#f3f8ff;color:#0b1d3a;border-radius:30px 30px 0 0;font-family:sans-serif;animation:tiU .28s cubic-bezier(.2,.8,.2,1)}"
+"#tinfOv .tgr{flex:none;width:44px;height:5px;border-radius:3px;background:#cdd9ee;margin:10px auto 6px}"
+"#tinfOv .tcl{position:absolute;top:14px;right:14px;z-index:3;width:38px;height:38px;border:0;border-radius:13px;display:grid;place-items:center;background:rgba(255,255,255,.28);color:#fff;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}"
+"#tinfOv .tbd{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:6px 16px calc(env(safe-area-inset-bottom,0px) + 24px)}"
+".tin{display:block}.tin *{box-sizing:border-box}"
+".tin .hero{position:relative;overflow:hidden;border-radius:26px;padding:20px 18px 18px;color:#fff;background:linear-gradient(135deg,#ff9a1f 0%,#ef3b5c 60%,#b8269a 100%);box-shadow:0 16px 34px rgba(239,59,92,.34)}"
+".tin .hero::before{content:'';position:absolute;right:-40px;top:-50px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.16)}"
+".tin .hero::after{content:'';position:absolute;left:-30px;bottom:-60px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.1)}"
+".tin .hero>*{position:relative;z-index:1}"
+".tin .bdg{width:58px;height:58px;border-radius:20px;display:grid;place-items:center;background:rgba(255,255,255,.24);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}"
+".tin .h1{font-size:22px;font-weight:900;letter-spacing:-.4px;margin-top:14px}"
+".tin .h2{font-size:14px;line-height:1.45;opacity:.95;margin-top:5px}"
+".tin .chip{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 11px 0 9px;margin-top:12px;border-radius:14px;background:rgba(255,255,255,.26);font-size:12.5px;font-weight:800}"
+".tin .card{background:#fff;border-radius:22px;padding:14px;margin-top:12px;box-shadow:0 8px 22px rgba(30,80,160,.09),0 0 0 1px rgba(47,111,224,.08)}"
+".tin .st{font-size:15px;font-weight:900;color:#0a2a66;margin-bottom:10px;display:flex;align-items:center;gap:8px}"
+".tin .row{display:flex;align-items:center;gap:12px;padding:8px 0}.tin .row+.row{border-top:1px solid #edf2fb}"
+".tin .tile{flex:none;width:42px;height:42px;border-radius:15px;display:grid;place-items:center;color:#fff}"
+".tin .t1{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}.tin .t2{background:linear-gradient(135deg,#ffb020,#ff6a3d)}.tin .t3{background:linear-gradient(135deg,#ff7a8e,#ef2b5a)}.tin .t4{background:linear-gradient(135deg,#2bd47d,#009e49)}"
+".tin .rt{font-weight:800;font-size:14.5px;color:#0a2a66}.tin .rs{font-size:12.5px;color:#5b7099;line-height:1.4;margin-top:1px}"
+".tin .price{display:flex;align-items:center;gap:12px}.tin .pp{margin-left:auto;flex:none;padding:7px 12px;border-radius:14px;background:linear-gradient(135deg,#ffb020,#ff6a3d);color:#4a2200;font-weight:900;font-size:14px}"
+".tin .note{margin-top:10px;padding:10px 12px;border-radius:14px;background:#fff6e5;color:#7a4a00;font-size:12.5px;line-height:1.45}"
+".tin .gs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}"
+".tin .g{text-align:center;padding:10px 4px 11px;border-radius:18px;background:linear-gradient(#f6f9ff,#eaf2ff);box-shadow:inset 0 0 0 1px rgba(47,111,224,.1)}"
+".tin .ga{height:56px;display:flex;align-items:center;justify-content:center}"
+".tin .gn{font-weight:800;font-size:12.5px;color:#0a2a66;margin-top:6px}"
+".tin .gp{display:inline-block;margin-top:5px;padding:3px 9px;border-radius:10px;background:#fff;color:#e5484d;font-weight:900;font-size:11.5px;box-shadow:0 2px 6px rgba(10,30,70,.1)}"
+".tin .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}"
+".tin .sx{text-align:center;padding:14px 4px 12px;border-radius:20px;background:#fff;box-shadow:0 8px 20px rgba(30,80,160,.09),0 0 0 1px rgba(47,111,224,.08)}"
+".tin .sx .tile{margin:0 auto 8px;width:38px;height:38px;border-radius:13px}.tin .sx b{display:block;font-size:22px;font-weight:900;color:#0a2a66}.tin .sx small{font-size:12px;color:#5b7099;font-weight:700}"
+".tin .cta{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;height:54px;margin-top:14px;border:0;border-radius:20px;font-size:16px;font-weight:900;color:#fff;background:linear-gradient(135deg,#ff9a1f,#ef3b5c);box-shadow:0 12px 26px rgba(239,59,92,.38);transition:transform .15s}"
+".tin .cta:active{transform:scale(.97)}.tin .cta:disabled{opacity:.6}"
+".tin label{display:block;font-size:12.5px;font-weight:800;color:#35507d;margin:12px 0 6px}"
+".tin .inp{display:block;width:100%;padding:13px 14px;border-radius:16px;border:1.5px solid #d3deef;background:#f7faff;color:#0b1d3a;font-size:15px;font-family:inherit;outline:none}.tin .inp:focus{border-color:#2f6fe0;background:#fff}"
+".tin textarea.inp{min-height:92px;resize:none}.tin .cnt{text-align:right;font-size:11.5px;color:#7d8fb1;margin-top:4px}"
+".tin .err{font-size:13px;font-weight:700;color:#e5484d;margin-top:8px}"
+".tin .stp{display:flex;gap:12px}.tin .stp+.stp{margin-top:2px}.tin .dot{flex:none;display:flex;flex-direction:column;align-items:center}"
+".tin .dot i{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#e7eefb;color:#8aa0c6}.tin .dot i.ok{background:linear-gradient(135deg,#2bd47d,#009e49);color:#fff}.tin .dot i.now{background:linear-gradient(135deg,#ffb020,#ff6a3d);color:#fff;box-shadow:0 0 0 5px rgba(255,154,31,.2)}"
+".tin .dot u{flex:1;width:2px;min-height:16px;background:#dbe5f6;margin:3px 0}"
+".tin .stp .rt{padding-top:3px}.tin .stp .rs{padding-bottom:12px}";
var cs=document.createElement("style");cs.textContent=CSS;document.head.appendChild(cs);
function E(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return null}}
async function A(p,o){var r=await api(p,o||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
async function loadInf(){window.__tinfAt=Date.now();try{var r=await T("/rest/v1/influencer_accounts?select=user_id&limit=500");if(Array.isArray(r))r.forEach(function(x){window.__INF[x.user_id]=1})}catch(e){}}
async function T(p){try{return await Promise.race([A(p),new Promise(function(_,j){setTimeout(function(){j(new Error("timeout"))},6000)})])}catch(e){return null}}
async function state(){var u=ME();
var pq=T("/rest/v1/influencer_requests?select=statut,nom&user_id=eq."+u+"&order=created_at.desc&limit=1");var a=await T("/rest/v1/influencer_accounts?select=nom&user_id=eq."+u);if(a&&a.length)return{k:"actif",n:a[0].nom};
var q=await pq;if(q&&q.length)return{k:q[0].statut,n:q[0].nom};
return{k:"aucun"}}
async function stats(u){var v=await A("/rest/v1/videos?select=id&author=eq."+u+"&limit=200");v=Array.isArray(v)?v:[];
var f=await A("/rest/v1/follows?select=follower&followed=eq."+u+"&limit=5000");
var l=v.length?await A("/rest/v1/video_likes?select=video_id&video_id=in.("+v.map(function(x){return x.id}).join(",")+")&limit=5000"):[];
return{v:v.length,f:Array.isArray(f)?f.length:0,l:Array.isArray(l)?l.length:0}}
function hero(t,sub,chip,ci){return '<div class="hero"><div class="bdg">'+ic("star",32)+'</div><div class="h1">'+t+'</div><div class="h2">'+sub+'</div>'+(chip?'<div class="chip">'+ic(ci||"check",16)+chip+'</div>':'')+'</div>'}
function form(){
var f=E("div","card");
f.innerHTML='<div class="st">'+ic("pen",20)+'Ta demande</div><label for="tinN">Nom d\'influenceur</label><input class="inp" id="tinN" maxlength="60" placeholder="Ex : Aminata Fashion">'
+'<label for="tinD">Ton contenu</label><textarea class="inp" id="tinD" maxlength="500" placeholder="Humour, musique, sport, cuisine…"></textarea><div class="cnt" id="tinC">0/500</div>'
+'<button class="cta" type="button" id="tinG" style="margin-top:12px">Envoyer la demande</button><div class="err" id="tinE"></div>';
BOX.appendChild(f);
var n=f.querySelector("#tinN"),d=f.querySelector("#tinD"),go=f.querySelector("#tinG"),er=f.querySelector("#tinE"),c=f.querySelector("#tinC");
d.oninput=function(){c.textContent=d.value.length+"/500"};
try{f.scrollIntoView({behavior:"smooth",block:"center"})}catch(e){}
go.onclick=async function(){var nm=n.value.trim();if(nm.length<2){er.textContent="Nom trop court (2 lettres minimum).";return}
go.disabled=true;er.textContent="";
try{var r=await A("/rest/v1/influencer_requests",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({user_id:ME(),nom:nm,description:d.value.trim()||null})});
if(r&&!Array.isArray(r)&&(r.code||r.message))throw new Error(r.code||r.message);draw({k:"en_attente",n:nm})}
catch(e){go.disabled=false;er.textContent=/duplicate|23505/i.test(String(e&&e.message))?"Tu as déjà une demande en attente.":/relation|schema cache|PGRST20|42P01|404/i.test(String(e&&e.message))?"Le compte influenceur n'est pas encore activé sur le serveur.":"Envoi impossible. Vérifie ta connexion et réessaie."}}}
async function draw(s){BOX.innerHTML="";
if(s.k==="actif"){window.__INF[ME()]=1;
BOX.innerHTML=hero("Compte Influenceur","Bienvenue <b>"+esc(s.n)+"</b>. Ton badge est visible sur toutes tes vidéos.","Compte actif","check");
try{var st=await stats(ME());var g=E("div","stats");
[[st.v,"Vidéos","video","t1"],[st.f,"Abonnés","users","t2"],[st.l,"J'aime","heart","t3"]].forEach(function(a){g.appendChild(E("div","sx",'<div class="tile '+a[3]+'">'+ic(a[2],20)+'</div><b>'+a[0]+'</b><small>'+a[1]+'</small>'))});BOX.appendChild(g)}catch(e){}
BOX.appendChild(E("div","card",'<div class="st">'+ic("gift",20)+'Cadeaux reçus</div><div class="rs">Les utilisateurs peuvent t\'envoyer une calebasse, un drapeau du Faso ou un cheval pendant tes vidéos.</div>'));return}
if(s.k==="en_attente"){
BOX.innerHTML=hero("Demande envoyée","Pour « <b>"+esc(s.n)+"</b> ». L'équipe TÕÕLé l'examine.","En attente","clock");
BOX.appendChild(E("div","card",'<div class="st">Suivi de ta demande</div>'
+'<div class="stp"><div class="dot"><i class="ok">'+ic("check",16)+'</i><u></u></div><div><div class="rt">Demande envoyée</div><div class="rs">Ton dossier est bien reçu.</div></div></div>'
+'<div class="stp"><div class="dot"><i class="now">'+ic("clock",16)+'</i><u></u></div><div><div class="rt">Examen par l\'équipe</div><div class="rs">C\'est traité prochainement, merci de patienter.</div></div></div>'
+'<div class="stp"><div class="dot"><i>'+ic("star",15)+'</i></div><div><div class="rt">Compte activé</div><div class="rs">Tu reçois le badge Influenceur.</div></div></div>'));return}
BOX.innerHTML=hero("Compte Influenceur",s.k==="refusee"?"Ta dernière demande a été refusée. Tu peux en faire une nouvelle.":"Publie des vidéos, gagne des abonnés et reçois le badge Influenceur.",s.k==="refusee"?"Demande refusée":"",s.k==="refusee"?"alert":"");
BOX.appendChild(E("div","card",'<div class="st">Ce que tu obtiens</div>'
+'<div class="row"><div class="tile t2">'+ic("star",22)+'</div><div><div class="rt">Badge Influenceur</div><div class="rs">Visible à côté de ton nom sur chaque vidéo.</div></div></div>'
+'<div class="row"><div class="tile t1">'+ic("users",22)+'</div><div><div class="rt">Plus d\'abonnés</div><div class="rs">Ton profil est mis en avant dans le fil.</div></div></div>'
+'<div class="row"><div class="tile t3">'+ic("gift",22)+'</div><div><div class="rt">Cadeaux</div><div class="rs">Les utilisateurs t\'envoient des cadeaux.</div></div></div>'));
BOX.appendChild(E("div","card",'<div class="price"><div class="tile t4">'+ic("card",22)+'</div><div><div class="rt">Compte payant</div><div class="rs">Frais de création, une seule fois</div></div><div class="pp">500 FCFA</div></div>'
+'<div class="note">La création d\'un compte influenceur est payante. Ta demande est d\'abord examinée par l\'équipe TÕÕLé.</div>'));
BOX.appendChild(E("div","card",'<!--tg--><div class="st">'+ic("gift",20)+'Cadeaux à recevoir</div><div class="gs">'
+'<div class="g"><div class="ga">'+ART.cal+'</div><div class="gn">Calebasse</div><span class="gp">500 FCFA</span></div>'
+'<div class="g"><div class="ga">'+ART.flag+'</div><div class="gn">Faso flag</div><span class="gp">750 FCFA</span></div>'
+'<div class="g"><div class="ga">'+ART.horse+'</div><div class="gn">Cheval</div><span class="gp">1000 FCFA</span></div></div><!--/tg-->'));
var b=E("button","cta",'Devenir influenceur'+ic("arrow",20));b.type="button";BOX.appendChild(b);b.onclick=function(){b.remove();form()}}
async function render(){var body=(window.__tinfHost&&window.__tinfHost.isConnected?window.__tinfHost:null);if(!body||busy||(BOX&&BOX.isConnected))return;busy=true;var mine=null;
try{mine=E("div","tin");BOX=mine;body.insertBefore(mine,body.firstChild);mine.innerHTML=hero("Compte Influenceur","Chargement…");
var s;try{s=await state()}catch(e){s={k:"aucun"}}if(!mine.isConnected)return;
try{await draw(s)}catch(e){mine.innerHTML=hero("Compte Influenceur","Impossible d'afficher la page. Ferme et rouvre.","","")}}catch(e){}finally{busy=false}}
function badges(){try{var fd=document.getElementById("tvFeed");if(!fd)return;if(Date.now()-(window.__tinfAt||0)>20000)loadInf();
[].forEach.call(fd.querySelectorAll("#tvScr .tvi"),function(it){var a=(it.__p||"").split("/")[0];if(!a||!window.__INF[a]||it.querySelector(".tvinf"))return;
var s=document.createElement("span");s.className="tvinf";s.textContent="Influenceur";var h=it.querySelector(".tv3n"),n=it.querySelector(".tvn");
if(h&&h.parentNode)h.parentNode.insertBefore(s,h.nextSibling);else if(n)n.appendChild(s)})}catch(e){}}
window.__tinfLoad=loadInf;loadInf();setInterval(loadInf,60000);setInterval(render,1500);setInterval(badges,1200);
window.__tinfOpen=function(){var o=document.getElementById("tinfOv");if(o)o.remove();
o=E("div");o.id="tinfOv";
var sh=E("div","tsh"),gr=E("div","tgr"),x=E("button","tcl",ic("close",20));x.type="button";x.setAttribute("aria-label","Fermer");x.onclick=function(){o.remove()};
var h=E("div","tbd");sh.appendChild(gr);sh.appendChild(x);sh.appendChild(h);o.appendChild(sh);o.onclick=function(e){if(e.target===o)o.remove()};document.body.appendChild(o);window.__tinfHost=h;BOX=null;render()};
})();
