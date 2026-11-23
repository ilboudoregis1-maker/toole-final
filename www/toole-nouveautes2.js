/* TÕÕLé : Nouveautés v2 (rubriques façon Play Store, infos façon Facebook) */
(function(){"use strict";
if(window.__tnv2)return;window.__tnv2=1;
var ROOT=null,CFG={},RUB=[],POSTS=[],INF=[],FOL={},LC={},LM={},CC={},PS={},sel="tout",busy=false,lastLoad=0;
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function arr(x){return Array.isArray(x)?x:[]}
function ME(){try{if(typeof me==="function"){var v=me();if(v)return v}}catch(e){}try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return null}}
async function A(p,o){var r=await api(p,o||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
function ago(d){var s=(Date.now()-new Date(d).getTime())/1000;if(s<60)return"à l’instant";if(s<3600)return"il y a "+Math.floor(s/60)+" min";if(s<86400)return"il y a "+Math.floor(s/3600)+" h";if(s<604800)return"il y a "+Math.floor(s/86400)+" j";return new Date(d).toLocaleDateString("fr-FR")}
var P={play:'<path d="M8 5v14l11-7z"/>',pause:'<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>',note:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="16" r="2.5"/>',plus:'<path d="M12 5v14M5 12h14"/>',heart:'<path d="M12 20.6S3.6 15.6 3.6 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.4 2.5c0 6.2-8.4 11.2-8.4 11.2z"/>',msg:'<path d="M4 5h16v11H9l-5 4z"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.4l3 3 5-5.6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.4 2"/>',send:'<path d="M4 12l16-8-6 16-3-7z"/>',dl:'<path d="M12 4v11M7 11l5 5 5-5M5 20h14"/>',img:'<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4 4 3 3-2 4 3"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>'};
function ic(n,s,f){return'<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="'+(f?"currentColor":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+P[n]+'</svg>'}
var CSS="#scrDecouvrir>*:not(#nvx){display:none!important}#scrDecouvrir:not(.hide){display:flex;flex-direction:column}"
+"#nvx{flex:1;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#f3f8ff;color:#0b1d3a;font-family:sans-serif;padding-bottom:110px;box-sizing:border-box}#nvx *{box-sizing:border-box}"
+"#nvx .top{display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 14px) 14px 8px}#nvx .top h1{flex:1;margin:0;font-size:26px;font-weight:900;letter-spacing:-.6px;color:#0a2a66}"
+"#nvx .req{display:flex;align-items:center;gap:6px;border:0;border-radius:18px;padding:0 14px;height:40px;font-weight:800;font-size:13.5px;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 8px 18px rgba(47,111,224,.3)}"
+"#nvx .nvch{display:flex;gap:8px;overflow-x:auto;padding:6px 14px 10px;scrollbar-width:none}#nvx .nvch::-webkit-scrollbar{display:none}"
+"#nvx .nvc{flex:none;border:0;border-radius:18px;padding:9px 15px;font-weight:800;font-size:13.5px;color:#35507d;background:#fff;box-shadow:inset 0 0 0 1px #d9e5f6}#nvx .nvc.on{color:#fff;background:#0a2a66;box-shadow:none}"
+"#nvx .sec{display:flex;align-items:center;padding:14px 14px 8px;font-size:17px;font-weight:900;color:#0a2a66}"
+"#nvx .hs{display:flex;gap:12px;overflow-x:auto;padding:0 14px 4px;scrollbar-width:none}#nvx .hs::-webkit-scrollbar{display:none}"
+"#nvx .inf{flex:none;width:92px;text-align:center}#nvx .inf .av{width:62px;height:62px;border-radius:50%;margin:0 auto 6px;display:grid;place-items:center;font-weight:900;font-size:22px;color:#fff;background:linear-gradient(135deg,#ffb020,#ef3b5c)}#nvx .inf b{display:block;font-size:12.5px;color:#0a2a66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+"#nvx .fb{margin-top:6px;border:0;border-radius:14px;padding:6px 12px;font-weight:800;font-size:12px;color:#fff;background:#2f6fe0}#nvx .fb.on{color:#2f6fe0;background:#e3edff}"
+"#nvx .une{flex:none;width:280px;border-radius:22px;overflow:hidden;background:#0a2a66;color:#fff;position:relative;min-height:170px}#nvx .une img{width:100%;height:170px;object-fit:cover;display:block;opacity:.85}#nvx .une div{position:absolute;left:0;right:0;bottom:0;padding:34px 14px 12px;background:linear-gradient(transparent,rgba(5,15,40,.9));font-weight:900;font-size:15px;line-height:1.25}"
+"#nvx .app{flex:none;width:96px;text-align:center}#nvx .app .ai{width:84px;height:84px;border-radius:22px;margin:0 auto 6px;object-fit:cover;background:linear-gradient(135deg,#00c2e0,#2f6fe0);display:block}#nvx .app b{display:block;font-size:12.5px;color:#0a2a66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#nvx .app small{display:block;color:#6a7fa5;font-size:11px;margin-bottom:5px}"
+"#nvx .card{background:#fff;margin:12px 12px 0;border-radius:22px;overflow:hidden;box-shadow:0 8px 22px rgba(30,80,160,.09),0 0 0 1px rgba(47,111,224,.07)}"
+"#nvx .ch{display:flex;align-items:center;gap:10px;padding:12px 14px 8px}#nvx .ch .lg{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-weight:900;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}#nvx .ch b{display:block;font-size:14.5px;color:#0a2a66}#nvx .ch small{color:#6a7fa5;font-size:12px}"
+"#nvx .ch .rb{margin-left:auto;font-size:11.5px;font-weight:800;color:#2f6fe0;background:#e8f0ff;border-radius:10px;padding:4px 9px}"
+"#nvx .ct{padding:0 14px 10px}#nvx .ct h3{margin:0 0 4px;font-size:16.5px;color:#0a2a66}#nvx .ct p{margin:0;font-size:14.5px;line-height:1.45;color:#35507d;white-space:pre-wrap}#nvx .pi{width:100%;max-height:360px;object-fit:cover;display:block;background:#e7eefb}"
+"#nvx .ac{display:flex;border-top:1px solid #edf2fb}#nvx .ac button{flex:1;border:0;background:none;height:46px;display:flex;align-items:center;justify-content:center;gap:7px;font-weight:800;font-size:13.5px;color:#5b7099}#nvx .ac button.on{color:#e5484d}"
+"#nvx .vide{padding:30px 20px;text-align:center;color:#6a7fa5;font-size:14px}"
+"#nvSh{position:fixed;inset:0;z-index:100100;background:rgba(8,20,50,.55);display:flex;align-items:flex-end}#nvSh .s{width:100%;max-height:92%;display:flex;flex-direction:column;background:#f3f8ff;color:#0b1d3a;border-radius:28px 28px 0 0;font-family:sans-serif;box-sizing:border-box}#nvSh .s *{box-sizing:border-box}"
+"#nvSh .sh{display:flex;align-items:center;padding:16px 16px 8px}#nvSh .sh b{flex:1;font-size:18px;color:#0a2a66}#nvSh .x{border:0;background:#e3edff;color:#0a2a66;width:36px;height:36px;border-radius:12px;display:grid;place-items:center}"
+"#nvSh .sb{overflow-y:auto;padding:4px 16px calc(env(safe-area-inset-bottom,0px) + 20px)}"
+"#nvSh label{display:block;font-size:12.5px;font-weight:800;color:#35507d;margin:12px 0 6px}#nvSh .in{display:block;width:100%;padding:12px 14px;border-radius:14px;border:1.5px solid #d3deef;background:#fff;color:#0b1d3a;font-size:15px;font-family:inherit;outline:none}#nvSh textarea.in{min-height:90px;resize:none}"
+"#nvSh .seg{display:flex;gap:8px}#nvSh .seg button{flex:1;border:0;border-radius:14px;padding:11px 4px;font-weight:800;font-size:13px;color:#35507d;background:#fff;box-shadow:inset 0 0 0 1px #d3deef}#nvSh .seg button.on{color:#fff;background:#2f6fe0;box-shadow:none}"
+"#nvSh .pay{margin-top:12px;padding:12px;border-radius:16px;background:#fff6e5;color:#7a4a00;font-size:13px;line-height:1.5}#nvSh .go{display:block;width:100%;height:52px;margin-top:14px;border:0;border-radius:18px;font-weight:900;font-size:16px;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}#nvSh .go:disabled{opacity:.6}#nvSh .er{color:#e5484d;font-weight:700;font-size:13px;margin-top:8px}"
+"#nvSh .cm{padding:9px 0;border-bottom:1px solid #e6eefb;font-size:14px}#nvSh .cm b{color:#0a2a66}#nvSh .cm small{color:#7d8fb1}#nvSh .row{display:flex;gap:8px;margin-top:10px}#nvSh .row .in{flex:1}#nvSh .row button{border:0;border-radius:14px;width:48px;color:#fff;background:#2f6fe0;display:grid;place-items:center}"
+"#nvSh .rq{display:flex;align-items:center;gap:10px;padding:10px 12px;margin-top:8px;border-radius:14px;background:#fff;font-size:13.5px}#nvSh .rq i{margin-left:auto;font-style:normal;font-weight:800;font-size:12px;border-radius:10px;padding:4px 9px}#nvSh .st-en_attente{color:#a86500;background:#fff1d6}#nvSh .st-acceptee{color:#0b7a43;background:#dcf7e8}#nvSh .st-refusee{color:#b3262b;background:#fde4e4}"
+"#nvx .sg{display:flex;align-items:center;gap:12px;margin:10px 12px 0;padding:10px 12px;border-radius:20px;background:#fff;box-shadow:0 6px 18px rgba(30,80,160,.08),0 0 0 1px rgba(47,111,224,.07)}#nvx .sg.on{box-shadow:0 0 0 2px #2f6fe0}"
+"#nvx .sg .cv{flex:none;width:56px;height:56px;border-radius:14px;object-fit:cover;display:block;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#nvx .sg .tx{flex:1;min-width:0}#nvx .sg .tx b{display:block;font-size:15px;color:#0a2a66;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#nvx .sg .tx small{display:block;color:#6a7fa5;font-size:12.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+"#nvx .sg .sp{height:3px;border-radius:2px;background:#e3edff;margin-top:7px;overflow:hidden}#nvx .sg .sp i{display:block;height:100%;width:0;background:#2f6fe0}"
+"#nvx .sg .pb{flex:none;width:46px;height:46px;border:0;border-radius:50%;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#nvSh #nvK button{font-size:12px;padding:11px 2px}";
var cs=document.createElement("style");cs.textContent=CSS;document.head.appendChild(cs);
function imgTag(v,cls){return'<img class="'+cls+'" data-s="'+esc(v||"")+'" alt="">'}
function loadImgs(root){[].forEach.call(root.querySelectorAll("img[data-s]"),function(im){var v=im.getAttribute("data-s");im.removeAttribute("data-s");if(!v){im.style.display="none";return}
if(v.indexOf("tg:")!==0){im.src=v;return}
try{fetch(window.tgUrl(v.slice(3),"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){im.src=window.URL.createObjectURL(b)}).catch(function(){im.style.display="none"})}catch(e){im.style.display="none"}})}
async function load(force){if(busy)return;if(!force&&Date.now()-lastLoad<30000)return;busy=true;lastLoad=Date.now();var u=ME();
try{
var r=await Promise.all([A("/rest/v1/nv_rubriques?select=nom&order=ordre.asc"),A("/rest/v1/nv_posts?select=*&order=created_at.desc&limit=80"),A("/rest/v1/nv_likes?select=post_id,user_id&limit=5000"),A("/rest/v1/nv_comments?select=post_id&limit=5000"),A("/rest/v1/influencer_accounts?select=user_id,nom&limit=30"),A("/rest/v1/follows?select=followed&follower=eq."+u+"&limit=2000"),A("/rest/v1/nv_config?select=cle,valeur")]);
RUB=arr(r[0]).map(function(x){return x.nom});POSTS=arr(r[1]);LC={};LM={};arr(r[2]).forEach(function(l){LC[l.post_id]=(LC[l.post_id]||0)+1;if(l.user_id===u)LM[l.post_id]=1});
CC={};arr(r[3]).forEach(function(c){CC[c.post_id]=(CC[c.post_id]||0)+1});INF=arr(r[4]).filter(function(x){return x.user_id!==u});FOL={};arr(r[5]).forEach(function(f){FOL[f.followed]=1});
CFG={};arr(r[6]).forEach(function(c){CFG[c.cle]=c.valeur})}catch(e){}
busy=false;draw()}
var AUD=null,NOW=null;
function playIt(a){var q=a.play();if(q&&q.catch)q.catch(function(){})}
function aud(){if(AUD)return AUD;AUD=new Audio();AUD.preload="none";
AUD.addEventListener("play",mark);AUD.addEventListener("pause",mark);
AUD.addEventListener("ended",function(){NOW=null;mark()});
AUD.addEventListener("error",function(){NOW=null;mark();try{toast("Lecture impossible")}catch(e){}});
AUD.addEventListener("timeupdate",function(){if(!ROOT||!AUD.duration)return;var r=ROOT.querySelector(".sg.on .sp i");if(r)r.style.width=(AUD.currentTime/AUD.duration*100)+"%"});return AUD}
function mark(){if(!ROOT)return;[].forEach.call(ROOT.querySelectorAll(".sg"),function(r){var on=r.getAttribute("data-id")===NOW,pl=on&&AUD&&!AUD.paused;r.classList.toggle("on",on);r.querySelector(".pb").innerHTML=ic(pl?"pause":"play",22,true);if(!on){var b=r.querySelector(".sp i");if(b)b.style.width="0"}})}
function song(id){var p=POSTS.filter(function(x){return x.id===id})[0];if(!p||!p.lien)return;var a=aud();
if(NOW===id){if(a.paused)playIt(a);else a.pause();return}
try{[].forEach.call(document.querySelectorAll("video"),function(v){try{v.pause()}catch(e){}})}catch(e){}
NOW=id;a.src=p.lien;playIt(a);mark()}
function songRow(p){return'<div class="sg" data-a="song" data-id="'+p.id+'">'+(p.image?imgTag(p.image,"cv"):'<div class="cv"></div>')+'<div class="tx"><b>'+esc(p.titre)+'</b><small>'+esc(p.auteur_nom||"TÕÕLé")+' · '+ago(p.created_at)+'</small><div class="sp"><i></i></div></div><button class="pb" type="button" data-a="song" data-id="'+p.id+'">'+ic("play",22,true)+'</button></div>'}
function postCard(p){var l=LC[p.id]||0,c=CC[p.id]||0;
return'<div class="card" data-id="'+p.id+'"><div class="ch"><div class="lg">T</div><div><b>'+esc(p.auteur_nom||"TÕÕLé")+'</b><small>'+ago(p.created_at)+'</small></div>'+(p.rubrique?'<span class="rb">'+esc(p.rubrique)+'</span>':'')+'</div>'
+'<div class="ct"><h3>'+esc(p.titre)+'</h3>'+(p.texte?'<p>'+esc(p.texte)+'</p>':'')+'</div>'+(p.image?imgTag(p.image,"pi"):'')
+'<div class="ac"><button data-a="like" class="'+(LM[p.id]?"on":"")+'">'+ic("heart",20,LM[p.id])+'<span>'+l+'</span></button><button data-a="cm">'+ic("msg",20)+'<span>'+c+'</span></button></div></div>'}
function draw(){if(!ROOT||!ROOT.isConnected)return;var keep=ROOT.scrollTop,h='';
h+='<div class="top"><h1>Nouveautés</h1><button class="req" data-a="req">'+ic("plus",18)+'Publier</button></div>';
h+='<div class="nvch">'+[["tout","Tout"],["apps","Apps & Jeux"],["musique","Musique"]].concat(RUB.map(function(n){return[n,n]})).map(function(c){return'<button class="nvc'+(sel===c[0]?" on":"")+'" data-a="chip" data-v="'+esc(c[0])+'">'+esc(c[1])+'</button>'}).join("")+'</div>';
var infos=POSTS.filter(function(p){return p.kind==="info"}),apps=POSTS.filter(function(p){return p.kind!=="info"&&p.kind!=="chanson"}),songs=POSTS.filter(function(p){return p.kind==="chanson"&&p.lien});
if(sel==="tout"&&INF.length){h+='<div class="sec">Influenceurs à suivre</div><div class="hs">'+INF.map(function(x){var n=x.nom||"?";return'<div class="inf"><div class="av">'+esc(n.charAt(0).toUpperCase())+'</div><b>'+esc(n)+'</b><button class="fb'+(FOL[x.user_id]?" on":"")+'" data-a="fol" data-u="'+x.user_id+'">'+(FOL[x.user_id]?"Suivi":"Suivre")+'</button></div>'}).join("")+'</div>'}
var une=infos.filter(function(p){return p.a_la_une});
if(sel==="tout"&&une.length)h+='<div class="sec">À la une</div><div class="hs">'+une.map(function(p){return'<div class="une" data-a="open" data-id="'+p.id+'">'+imgTag(p.image,"")+'<div>'+esc(p.titre)+'</div></div>'}).join("")+'</div>';
if((sel==="tout"||sel==="apps")&&apps.length)h+='<div class="sec">Apps &amp; Jeux</div><div class="hs">'+apps.map(function(p){return'<div class="app" data-a="get" data-id="'+p.id+'">'+imgTag(p.image,"ai")+'<b>'+esc(p.titre)+'</b><small>'+(p.kind==="jeu"?"Jeu":"Application")+'</small><button class="fb" data-a="get" data-id="'+p.id+'">Obtenir</button></div>'}).join("")+'</div>';
if((sel==="tout"||sel==="musique")&&songs.length)h+='<div class="sec">Musique</div>'+songs.slice(0,sel==="tout"?5:80).map(songRow).join("");else if(sel==="musique")h+='<div class="vide">Aucune chanson pour le moment.</div>';
if(sel!=="apps"&&sel!=="musique"){var f=sel==="tout"?infos:infos.filter(function(p){return p.rubrique===sel});
h+='<div class="sec">'+(sel==="tout"?"Dernières informations":esc(sel))+'</div>'+(f.length?f.map(postCard).join(""):'<div class="vide">Rien à lire ici pour le moment.</div>')}
ROOT.innerHTML=h;ROOT.scrollTop=keep;loadImgs(ROOT);mark()}
function sheet(t,body){var o=$("nvSh");if(o)o.remove();o=document.createElement("div");o.id="nvSh";o.innerHTML='<div class="s"><div class="sh"><b>'+t+'</b><button class="x" type="button">'+ic("close",18)+'</button></div><div class="sb">'+body+'</div></div>';
o.onclick=function(e){if(e.target===o)o.remove()};o.querySelector(".x").onclick=function(){o.remove()};document.body.appendChild(o);return o}
async function pseudo(){var u=ME();if(PS[u])return PS[u];try{var r=await A("/rest/v1/profiles?select=pseudo&id=eq."+u);PS[u]=(r&&r[0]&&r[0].pseudo)||"Utilisateur"}catch(e){PS[u]="Utilisateur"}return PS[u]}
async function comments(id){var o=sheet("Commentaires",'<div id="nvCl">Chargement…</div><div class="row"><input class="in" id="nvCi" maxlength="300" placeholder="Écrire un commentaire…"><button type="button" id="nvCs">'+ic("send",20)+'</button></div>');
async function show(){var r=arr(await A("/rest/v1/nv_comments?select=auteur,texte,created_at&post_id=eq."+id+"&order=created_at.asc&limit=200"));$("nvCl").innerHTML=r.length?r.map(function(c){return'<div class="cm"><b>'+esc(c.auteur||"Utilisateur")+'</b> <small>'+ago(c.created_at)+'</small><div>'+esc(c.texte)+'</div></div>'}).join(""):'<div class="vide">Aucun commentaire. Sois le premier.</div>'}
try{await show()}catch(e){$("nvCl").textContent="Impossible de charger."}
o.querySelector("#nvCs").onclick=async function(){var i=$("nvCi"),t=i.value.trim();if(!t)return;i.value="";try{await A("/rest/v1/nv_comments",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:id,user_id:ME(),auteur:await pseudo(),texte:t})});CC[id]=(CC[id]||0)+1;await show();draw()}catch(e){$("nvCl").insertAdjacentHTML("beforeend",'<div class="er">Envoi impossible.</div>')}}}
async function like(id){var u=ME(),on=!!LM[id];if(on){delete LM[id];LC[id]=Math.max(0,(LC[id]||1)-1)}else{LM[id]=1;LC[id]=(LC[id]||0)+1}draw();
try{if(on)await A("/rest/v1/nv_likes?post_id=eq."+id+"&user_id=eq."+u,{method:"DELETE"});else await A("/rest/v1/nv_likes",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:id,user_id:u})})}catch(e){}}
async function follow(uid){var u=ME(),on=!!FOL[uid];if(on)delete FOL[uid];else FOL[uid]=1;draw();
try{if(on)await A("/rest/v1/follows?follower=eq."+u+"&followed=eq."+uid,{method:"DELETE"});else await A("/rest/v1/follows",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({follower:u,followed:uid})})}catch(e){}}
function shrink(f){return new Promise(function(ok,ko){var rd=new FileReader();rd.onerror=ko;rd.onload=function(){var i=new Image();i.onerror=ko;i.onload=function(){var k=Math.min(1,1080/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);c.getContext("2d").drawImage(i,0,0,c.width,c.height);c.toBlob(function(b){b?ok(b):ko()},"image/jpeg",.82)};i.src=rd.result};rd.readAsDataURL(f)})}
function upload(b,tag){var f=new FormData();f.append("file",b);f.append("upload_preset","TÕÕLé-app");f.append("public_id","toole/nv/"+ME()+"_"+tag+"_"+Date.now());
return fetch("https://api.cloudinary.com/v1_1/mydh3xtz/image/upload",{method:"POST",body:f}).then(function(r){return r.json().then(function(j){if(!r.ok||!j.secure_url)throw new Error((j.error&&j.error.message)||"upload");return j.secure_url})})}
function prix(k){return parseInt(CFG["prix_"+k],10)||(k==="chanson"?parseInt(CFG.prix_app,10)||0:0)}
function uploadAudio(f){var fd=new FormData();fd.append("file",f);fd.append("upload_preset","TÕÕLé-app");fd.append("public_id","toole/nv/"+ME()+"_audio_"+Date.now());
return fetch("https://api.cloudinary.com/v1_1/mydh3xtz/video/upload",{method:"POST",body:fd}).then(function(r){return r.json().then(function(j){if(!r.ok||!j.secure_url)throw new Error((j.error&&j.error.message)||"upload audio");return j.secure_url})})}
async function request(){var kind="photos",files=[];
var o=sheet("Demander une publication",'<div class="seg" id="nvK"><button type="button" data-k="photos" class="on">Photos</button><button type="button" data-k="app">Application</button><button type="button" data-k="jeu">Jeu</button><button type="button" data-k="chanson">Chanson</button></div>'
+'<label>Titre</label><input class="in" id="nvT" maxlength="80"><label>Description</label><textarea class="in" id="nvD" maxlength="600"></textarea>'
+'<div id="nvL" style="display:none"><label>Lien de téléchargement</label><input class="in" id="nvU" placeholder="https://…"></div>'
+'<div id="nvAu" style="display:none"><label>Fichier audio (MP3, 15 Mo maximum)</label><input class="in" id="nvA" type="file" accept="audio/*"></div><label id="nvFl">Photos (4 maximum)</label><input class="in" id="nvF" type="file" accept="image/*" multiple>'
+'<div class="pay" id="nvP"></div>'
+'<label>Opérateur utilisé</label><div class="seg" id="nvO"><button type="button" data-o="orange" class="on">Orange Money</button><button type="button" data-o="wave">Wave</button></div>'
+'<label>Ton numéro qui a payé</label><input class="in" id="nvN" inputmode="tel" placeholder="Ex : 70 00 00 00"><label>Référence de la transaction</label><input class="in" id="nvR" placeholder="Reçue par SMS">'
+'<button class="go" type="button" id="nvG">Envoyer la demande</button><div class="er" id="nvE"></div><div id="nvM"></div>');
var op="orange";
function pay(){var m=prix(kind),el=$("nvP");
if(op==="orange"){var code="*144*10*"+(CFG.num_orange||"44383201")+"*"+m+"#";
el.innerHTML="Frais de publication : <b>"+m+" FCFA</b>.<br>Compose ce code Orange Money :<br><b style=\"font-size:15px;user-select:all\">"+esc(code)+"</b><a class=\"go\" style=\"display:flex;align-items:center;justify-content:center;text-decoration:none;height:46px;margin-top:10px\" href=\"tel:"+encodeURIComponent(code)+"\">Payer "+m+" FCFA avec Orange Money</a><div style=\"margin-top:8px\">Ensuite, copie la référence reçue par SMS dans le champ ci-dessous.</div>"}
else{var n=CFG.num_wave;el.innerHTML="Frais de publication : <b>"+m+" FCFA</b>.<br>Ouvre Wave et envoie <b>"+m+" FCFA</b> au <b>"+esc(n||"numéro communiqué par l’équipe")+"</b>. Ensuite, copie la référence de la transaction dans le champ ci-dessous."}}
pay();
o.querySelector("#nvK").onclick=function(e){var b=e.target.closest("button");if(!b)return;kind=b.getAttribute("data-k");[].forEach.call(this.children,function(x){x.className=x===b?"on":""});$("nvL").style.display=(kind==="app"||kind==="jeu")?"block":"none";$("nvAu").style.display=kind==="chanson"?"block":"none";$("nvFl").textContent=kind==="photos"?"Photos (4 maximum)":kind==="chanson"?"Pochette de la chanson (1 image)":"Icône / capture de l’"+(kind==="jeu"?"jeu":"application")+" (4 maximum)";pay()};
o.querySelector("#nvO").onclick=function(e){var b=e.target.closest("button");if(!b)return;op=b.getAttribute("data-o");[].forEach.call(this.children,function(x){x.className=x===b?"on":""});pay()};
o.querySelector("#nvF").onchange=function(){files=[].slice.call(this.files,0,kind==="chanson"?1:4)};
o.querySelector("#nvG").onclick=async function(){var er=$("nvE"),g=this;er.textContent="";var t=$("nvT").value.trim(),n=$("nvN").value.trim(),r=$("nvR").value.trim(),u=$("nvU").value.trim();
if(t.length<3){er.textContent="Donne un titre.";return}if(kind==="photos"&&!files.length){er.textContent="Ajoute au moins une photo.";return}if((kind==="app"||kind==="jeu")&&!u){er.textContent="Ajoute le lien de téléchargement.";return}if(kind==="chanson"){var af=$("nvA").files[0];if(!af){er.textContent="Choisis le fichier audio.";return}if(af.size>15*1048576){er.textContent="Fichier trop lourd (15 Mo maximum).";return}}if(n.length<8||r.length<4){er.textContent="Indique ton numéro et la référence du paiement.";return}
g.disabled=true;g.textContent="Envoi…";
try{var imgs=[];for(var i=0;i<files.length;i++)imgs.push(await upload(await shrink(files[i]),i));
if(kind==="chanson"){g.textContent="Envoi de l’audio…";u=await uploadAudio($("nvA").files[0])}
await A("/rest/v1/nv_requests",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({user_id:ME(),kind:kind,titre:t,texte:$("nvD").value.trim()||null,images:imgs,lien:u||null,operateur:op,numero:n,ref_paiement:r,montant:prix(kind)})});
g.textContent="Demande envoyée";mine()}
catch(e){g.disabled=false;g.textContent="Envoyer la demande";er.textContent=/relation|schema|42P01|404/i.test(String(e&&e.message))?"Le service n’est pas encore activé sur le serveur.":(kind==="chanson"&&e&&e.message&&!/Failed to fetch|NetworkError|Load failed/i.test(e.message)?"Envoi impossible : "+e.message:"Envoi impossible. Vérifie ta connexion.")}};
mine()}
async function mine(){var m=$("nvM");if(!m)return;try{var r=arr(await A("/rest/v1/nv_requests?select=kind,titre,statut,paye,note_admin&user_id=eq."+ME()+"&order=created_at.desc&limit=20"));
if(!r.length){m.innerHTML="";return}var L={en_attente:"En attente",acceptee:"Acceptée",refusee:"Refusée"};
m.innerHTML='<div class="sec" style="padding-left:0">Mes demandes</div>'+r.map(function(q){return'<div class="rq"><span>'+esc(q.titre)+'</span><i class="st-'+q.statut+'">'+L[q.statut]+'</i></div>'+(q.statut==="refusee"&&q.note_admin?'<div class="rs" style="font-size:12.5px;color:#b3262b;padding:4px 4px 0">'+esc(q.note_admin)+'</div>':'')}).join("")}catch(e){}}
function openPost(id){var p=POSTS.filter(function(x){return x.id===id})[0];if(!p)return;var o=sheet(esc(p.titre),(p.image?imgTag(p.image,"pi"):"")+'<p style="font-size:15px;line-height:1.5;color:#35507d;white-space:pre-wrap">'+esc(p.texte||"")+'</p>');loadImgs(o)}
function getApp(id){var p=POSTS.filter(function(x){return x.id===id})[0];if(!p)return;var o=sheet(esc(p.titre),(p.image?imgTag(p.image,"app ai"):"")+'<p style="font-size:15px;line-height:1.5;color:#35507d;white-space:pre-wrap">'+esc(p.texte||"")+'</p>'+(p.lien?'<a class="go" style="display:flex;align-items:center;justify-content:center;gap:8px;text-decoration:none" href="'+esc(p.lien)+'" target="_blank" rel="noopener">'+ic("dl",20)+'Obtenir</a>':''));loadImgs(o)}
function mount(){var sc=$("scrDecouvrir");if(!sc||sc.classList.contains("hide")){if(AUD&&!AUD.paused)AUD.pause();return}
if(!ROOT||!ROOT.isConnected){ROOT=document.createElement("div");ROOT.id="nvx";sc.appendChild(ROOT);
ROOT.onclick=function(e){var b=e.target.closest("[data-a]");if(!b)return;var a=b.getAttribute("data-a"),id=b.getAttribute("data-id")||(b.closest("[data-id]")||{getAttribute:function(){return null}}).getAttribute("data-id");
if(a==="chip"){sel=b.getAttribute("data-v");draw()}else if(a==="req")request();else if(a==="like")like(id);else if(a==="cm")comments(id);else if(a==="fol")follow(b.getAttribute("data-u"));else if(a==="open")openPost(id);else if(a==="song")song(id);else if(a==="get"){e.stopPropagation();getApp(id)}};
ROOT.innerHTML='<div class="top"><h1>Nouveautés</h1></div><div class="vide">Chargement…</div>';lastLoad=0}
load(false)}
setInterval(function(){try{mount()}catch(e){}},900);
})();
