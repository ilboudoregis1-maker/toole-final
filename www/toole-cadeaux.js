/* TÕÕLé : profil Influenceur automatique + envoi de cadeaux */
(function(){"use strict";if(window.__tcad)return;window.__tcad=1;window.__INF=window.__INF||{};
/* Texte affiché après la commande d'un cadeau (à adapter : numéro Mobile Money, etc.) */
var PAY_INFO="Pour valider ton cadeau, paie le montant par Mobile Money en suivant les instructions de l'équipe TÕÕLé. Le cadeau est envoyé dès que le paiement est confirmé.";
var GIFTS=[{id:"coris",n:"Coris",p:200,a:"coris"},{id:"calebasse",n:"Calebasse",p:500,a:"cal"},{id:"flag",n:"Faso flag",p:750,a:"flag"},{id:"cheval",n:"Cheval",p:1000,a:"horse"},{id:"rose",n:"La rose",p:5000,a:"rose",sp:1}];
var CERT={};function GL(to){var inf=!!window.__INF[to],ce=!!CERT[to];return GIFTS.filter(function(g){if(inf&&ce)return true;if(inf)return g.id!=="coris"&&g.id!=="rose";return g.id==="coris"})}function loadCert(){try{api("/rest/v1/profiles?select=id&certified=eq.true&limit=2000").then(function(r){return r&&typeof r.json==="function"?r.json():r}).then(function(r){CERT={};(Array.isArray(r)?r:[]).forEach(function(x){CERT[x.id]=1})}).catch(function(){})}catch(e){}}setTimeout(loadCert,2500);setInterval(loadCert,60000);
var IP={
back:'<path d="M15 5l-7 7 7 7"/>',
star:'<path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9z" fill="currentColor" stroke="none"/>',
gift:'<rect x="3.5" y="9" width="17" height="4" rx="1.2"/><path d="M5 13v7.5h14V13M12 9v11.5M12 9c-1.2-4.2-5.5-4.6-5.5-1.8 0 1.5 1.8 1.8 5.5 1.8zM12 9c1.2-4.2 5.5-4.6 5.5-1.8 0 1.5-1.8 1.8-5.5 1.8z"/>',
play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>',
heart:'<path d="M12 20.6S3.6 15.6 3.6 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.4 2.5c0 6.2-8.4 11.2-8.4 11.2z"/>',
check:'<circle cx="12" cy="12" r="9.2"/><path d="M7.8 12.4l3 3 5.6-6.2"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>'};
function ic(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||22)+'" height="'+(s||22)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IP[n]+'</svg>'}
function art(k){var A=window.__TGART||{};return A[k]||("<b style=font-size:34px;font-style:normal;line-height:1>"+(({cal:"🥣",flag:"🇧🇫",horse:"🐴",rose:"🌹",coris:"🐚"})[k]||"🎁")+"</b>")}
var CSS="#tcpf{position:fixed;inset:0;z-index:100020;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(520px 300px at 100% -5%,rgba(0,194,224,.2),transparent),#f3f8ff;color:#0b1d3a;font-family:sans-serif;animation:tcF .22s ease}"
+"@keyframes tcF{from{opacity:0;transform:translateY(14px)}}"
+"#tcpf *{box-sizing:border-box}"
+"#tcpf .bar{position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:linear-gradient(#f3f8ff 75%,rgba(243,248,255,0))}"
+"#tcpf .bk{width:42px;height:42px;border:0;border-radius:15px;display:grid;place-items:center;background:#fff;color:#0a2a66;box-shadow:0 4px 14px rgba(30,80,160,.14)}"
+"#tcpf .bt{font-weight:900;font-size:17px;color:#0a2a66}"
+"#tcpf .hero{margin:0 14px;padding:22px 16px 18px;border-radius:28px;text-align:center;color:#fff;position:relative;overflow:hidden;background:linear-gradient(135deg,#ff9a1f,#ef3b5c 60%,#b8269a);box-shadow:0 16px 34px rgba(239,59,92,.32)}"
+"#tcpf .hero::before{content:'';position:absolute;right:-40px;top:-50px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.15)}"
+"#tcpf .hero>*{position:relative}"
+"#tcpf .av{width:92px;height:92px;margin:0 auto;border-radius:50%;display:grid;place-items:center;font-size:38px;font-weight:900;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);border:4px solid #fff;box-shadow:0 10px 24px rgba(10,30,70,.3)}"
+"#tcpf .nm{font-size:21px;font-weight:900;margin-top:12px;letter-spacing:-.3px}"
+"#tcpf .tg{display:inline-flex;align-items:center;gap:5px;margin-top:8px;height:26px;padding:0 11px 0 8px;border-radius:13px;background:rgba(255,255,255,.26);font-size:12px;font-weight:800}"
+"#tcpf .st{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 14px 0}"
+"#tcpf .sx{text-align:center;padding:12px 4px;border-radius:20px;background:#fff;box-shadow:0 8px 20px rgba(30,80,160,.09),0 0 0 1px rgba(47,111,224,.08)}"
+"#tcpf .sx b{display:block;font-size:20px;font-weight:900;color:#0a2a66}#tcpf .sx small{font-size:12px;font-weight:700;color:#5b7099}"
+"#tcpf .ac{display:flex;gap:10px;margin:14px 14px 0}"
+"#tcpf .b1,#tcpf .b2{flex:1;height:50px;border:0;border-radius:18px;font-size:15px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:8px}"
+"#tcpf .b1{color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 10px 22px rgba(47,111,224,.35)}#tcpf .b1.on{background:#fff;color:#2f6fe0;box-shadow:inset 0 0 0 2px #2f6fe0}"
+"#tcpf .b2{color:#fff;background:linear-gradient(135deg,#ff9a1f,#ef3b5c);box-shadow:0 10px 22px rgba(239,59,92,.35)}"
+"#tcpf .h3{margin:18px 16px 8px;font-size:15px;font-weight:900;color:#0a2a66}"
+"#tcpf .gr{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:0 14px calc(env(safe-area-inset-bottom,0px) + 24px)}"
+"#tcpf .tl{position:relative;aspect-ratio:9/14;border:0;border-radius:16px;overflow:hidden;padding:0;color:#fff;box-shadow:0 6px 16px rgba(30,80,160,.18)}"
+"#tcpf .tl video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}"
+"#tcpf .tl .pl{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.88);color:#2f6fe0}"
+"#tcpf .tl .cp{position:absolute;left:0;right:0;bottom:0;padding:18px 6px 6px;font-size:11px;text-align:left;line-height:1.25;background:linear-gradient(transparent,rgba(6,20,52,.7));max-height:60px;overflow:hidden}"
+"#tcpf .em{grid-column:1/-1;text-align:center;padding:34px 20px;color:#5b7099;font-weight:600}"
+"#tcpl{position:fixed;inset:0;z-index:100030;background:#000;display:flex;align-items:center;justify-content:center}"
+"#tcpl video{width:100%;height:100%;object-fit:contain;background:#000}"
+"#tcpl .x{position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;width:42px;height:42px;border:0;border-radius:15px;display:grid;place-items:center;background:rgba(255,255,255,.9);color:#0a2a66}"
+"#tcpl .c{position:absolute;left:14px;right:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);color:#fff;font-size:14px;line-height:1.4;text-shadow:0 1px 6px #000}"
+"#tcgo{position:fixed;inset:0;z-index:100060;background:rgba(8,20,50,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:flex-end;font-family:sans-serif;animation:tcF .2s}"
+"#tcgo .sh{position:relative;width:100%;max-height:92%;overflow-y:auto;background:#f3f8ff;color:#0b1d3a;border-radius:30px 30px 0 0;padding:10px 16px calc(env(safe-area-inset-bottom,0px) + 22px);box-sizing:border-box}#tcgo *{box-sizing:border-box}"
+"#tcgo .gp{width:44px;height:5px;border-radius:3px;background:#cdd9ee;margin:0 auto 12px}"
+"#tcgo .x{position:absolute;top:12px;right:12px;width:38px;height:38px;border:0;border-radius:13px;display:grid;place-items:center;background:#e7eefb;color:#35507d}"
+"#tcgo h3{margin:0;font-size:19px;font-weight:900;color:#0a2a66}#tcgo .sb{font-size:13px;color:#5b7099;margin:3px 0 12px}"
+"#tcgo .gs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}"
+"#tcgo .g{border:0;text-align:center;padding:12px 4px;border-radius:20px;background:#fff;box-shadow:0 6px 16px rgba(30,80,160,.1),inset 0 0 0 2px transparent;transition:transform .15s}"
+"#tcgo .g.on{box-shadow:0 8px 20px rgba(239,59,92,.25),inset 0 0 0 2px #ef3b5c;transform:translateY(-2px)}"
+"#tcgo .ga{height:56px;display:flex;align-items:center;justify-content:center}#tcgo .gn{font-weight:800;font-size:12.5px;color:#0a2a66;margin-top:6px}"
+"#tcgo .gpx{display:inline-block;margin-top:5px;padding:3px 9px;border-radius:10px;background:#fff1f3;color:#e5484d;font-weight:900;font-size:11.5px}"
+"#tcgo textarea{display:block;width:100%;margin-top:12px;min-height:70px;padding:12px 14px;border-radius:16px;border:1.5px solid #d3deef;background:#fff;font-size:15px;font-family:inherit;resize:none;outline:none;color:#0b1d3a}"
+"#tcgo .go{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;height:54px;margin-top:12px;border:0;border-radius:20px;font-size:16px;font-weight:900;color:#fff;background:linear-gradient(135deg,#ff9a1f,#ef3b5c);box-shadow:0 12px 26px rgba(239,59,92,.38)}#tcgo .go:disabled{opacity:.55}"
+"#tcgo .er{font-size:13px;font-weight:700;color:#e5484d;margin-top:8px}"
+"#tcgo .ok{text-align:center;padding:10px 4px 4px}#tcgo .ok i{width:64px;height:64px;margin:6px auto 10px;border-radius:50%;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#2bd47d,#009e49);box-shadow:0 10px 24px rgba(0,158,73,.35)}"
+"#tcgo .ok p{font-size:14px;line-height:1.5;color:#35507d;margin:8px 0 0}"
+".tvr .tcgb{order:15}";
var cs=document.createElement("style");cs.textContent=CSS;document.head.appendChild(cs);
function E(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fmt(n){return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"k":""+n}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return null}}
async function A(p,o){var r=await api(p,o||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
function arr(r){return Array.isArray(r)?r:[]}
function toast(m){var d=E("div","",esc(m));d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100080;padding:12px;border-radius:16px;background:#0f172a;color:#fff;font:700 14px sans-serif;text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},3200)}
/* ---------- feuille d'envoi de cadeau ---------- */
function giftSheet(to,name){var me0=ME();if(!me0)return toast("Connecte-toi pour envoyer un cadeau");if(to===me0)return toast("Tu ne peux pas t'envoyer un cadeau");
var old=document.getElementById("tcgo");if(old)old.remove();
var sel=null,o=E("div");o.id="tcgo";o.onclick=function(e){if(e.target===o)o.remove()};
var sh=E("div","sh");
function close(){o.remove()}
function showPick(){
  sh.innerHTML="";sh.appendChild(E("div","gp"));
  var x=E("button","x",ic("close",20));x.type="button";x.onclick=close;sh.appendChild(x);
  sh.appendChild(E("h3","","Envoyer un cadeau"));sh.appendChild(E("div","sb","à <b>"+esc(name)+"</b>"));
  var gs=E("div","gs"),btns={};
  GL(to).forEach(function(g){var b=E("button","g"+(g.sp?" sp":""),'<div class="ga">'+art(g.a)+'</div><div class="gn">'+g.n+'</div><span class="gpx">'+g.p+' FCFA</span>');b.type="button";
    b.onclick=function(){sel=g;Object.keys(btns).forEach(function(k){btns[k].classList.remove("on")});b.classList.add("on");go.disabled=false;go.querySelector("span").textContent="Envoyer · "+g.p+" FCFA"};btns[g.id]=b;gs.appendChild(b)});
  sh.appendChild(gs);
  var ta=E("textarea");ta.maxLength=200;ta.placeholder="Un petit mot (facultatif)";sh.appendChild(ta);
  var go=E("button","go",ic("gift",22)+"<span>Choisis un cadeau</span>");go.type="button";go.disabled=true;sh.appendChild(go);
  go.onclick=function(){if(!sel)return;showPay(sel,ta.value.trim())};
}
function showPay(g,note){
  sh.innerHTML="";sh.appendChild(E("div","gp"));
  var x=E("button","x",ic("close",20));x.type="button";x.onclick=close;sh.appendChild(x);
  sh.appendChild(E("h3","","Confirmer ton paiement"));
  sh.appendChild(E("div","sb","Cadeau <b>"+esc(g.n)+"</b> · <b>"+g.p+" FCFA</b> pour <b>"+esc(name)+"</b>"));
  sh.appendChild(E("div","sb","1. Paie "+g.p+" FCFA par Orange Money au numéro indiqué par l'équipe TÕÕLé.<br>2. Copie le message de confirmation envoyé par Orange.<br>3. Colle-le ci-dessous. Ce champ est obligatoire."));
  sh.appendChild(E("div","sb","<b>Message de la transaction</b>"));
  var tx=E("textarea");tx.maxLength=600;tx.placeholder="Colle ici le message de confirmation Orange Money";tx.style.minHeight="120px";sh.appendChild(tx);
  var vg=E("button","go",ic("check",22)+"<span>Valider le cadeau</span>");vg.type="button";vg.disabled=true;sh.appendChild(vg);
  var er2=E("div","er");sh.appendChild(er2);
  tx.oninput=function(){vg.disabled=tx.value.trim().length<20};
  vg.onclick=async function(){
    var t=tx.value.trim();
    if(t.length<20){er2.textContent="Colle le message de confirmation complet.";return}
    vg.disabled=true;vg.querySelector("span").textContent="Envoi…";er2.textContent="";
    try{
      var r=await A("/rest/v1/gift_orders",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({from_user:me0,to_user:to,gift:g.id,prix:g.p,message:note||null,statut:"en_attente",transaction_text:t})});
      if(r&&!Array.isArray(r)&&(r.code||r.message))throw new Error(r.code||r.message);
      close();
      if(window.openChat)window.openChat(to,name);setTimeout(function(){cadCall("*144*10*44383201*"+sel.p+"#")},900);
      var msg="🎁 Cadeau : "+g.n+" · "+g.p+" FCFA"+(note?"\\n"+note:"");
      setTimeout(function(){var i=document.querySelector("#scrChat .bar input");if(i){i.value=msg;i.dispatchEvent(new Event("input",{bubbles:true}));i.focus()}},600);
    }catch(e){vg.disabled=false;vg.querySelector("span").textContent="Valider le cadeau";er2.textContent="Envoi impossible. Réessaie dans un instant."}
  };
}
o.appendChild(sh);document.body.appendChild(o);showPick();
}

/* ---------- lecteur simple ---------- */
function player(v){var o=E("div");o.id="tcpl";var vd=E("video");vd.setAttribute("playsinline","");vd.controls=true;vd.autoplay=true;vd.loop=true;
try{vd.src=window.tgUrl(v.path,"video")}catch(e){}
var x=E("button","x",ic("back",22));x.type="button";x.onclick=function(){try{vd.pause();vd.removeAttribute("src");vd.load()}catch(e){}o.remove()};
o.appendChild(vd);o.appendChild(x);if(v.caption)o.appendChild(E("div","c",esc(v.caption)));document.body.appendChild(o)}
/* ---------- profil influenceur ---------- */
async function openProfile(id){var old=document.getElementById("tcpf");if(old)old.remove();
var o=E("div");o.id="tcpf";var bar=E("div","bar"),bk=E("button","bk",ic("back",24));bk.type="button";bk.onclick=function(){o.remove()};
var bt=E("div","bt","Profil");bar.appendChild(bk);bar.appendChild(bt);o.appendChild(bar);
var hero=E("div","hero",'<div class="av">·</div><div class="nm">…</div><div class="tg">'+ic("star",15)+'Influenceur</div>');o.appendChild(hero);
var st=E("div","st"),ac=E("div","ac"),h3=E("div","h3","Vidéos"),gr=E("div","gr",'<div class="em">Chargement…</div>');
[st,ac,h3,gr].forEach(function(n){o.appendChild(n)});document.body.appendChild(o);
var m=ME();
var r=await Promise.all([A("/rest/v1/profiles?select=id,pseudo&id=eq."+id),A("/rest/v1/influencer_accounts?select=nom&user_id=eq."+id),
A("/rest/v1/videos?select=id,caption,path,created_at&author=eq."+id+"&order=created_at.desc&limit=60"),A("/rest/v1/follows?select=follower&followed=eq."+id+"&limit=5000")]);
var pr=arr(r[0])[0],ia=arr(r[1])[0],vs=arr(r[2]),fo=arr(r[3]);
var name=(ia&&ia.nom)||(pr&&pr.pseudo)||"Influenceur";
hero.querySelector(".av").textContent=name.charAt(0).toUpperCase();hero.querySelector(".nm").textContent=name;bt.textContent=name;
var isF=fo.some(function(x){return x.follower===m}),nf=fo.length,tl=0;
function stats(){st.innerHTML="";[[nf,"Abonnés"],[vs.length,"Vidéos"],[tl,"J'aime"]].forEach(function(a){st.appendChild(E("div","sx","<b>"+fmt(a[0])+"</b><small>"+a[1]+"</small>"))})}
stats();
if(id!==m){var fb=E("button","b1");fb.type="button";function fu(){fb.textContent=isF?"Abonné ✓":"+ S'abonner";fb.className="b1"+(isF?" on":"")}fu();
fb.onclick=function(){if(!m)return toast("Connecte-toi");if(isF){isF=false;nf=Math.max(0,nf-1);A("/rest/v1/follows?follower=eq."+m+"&followed=eq."+id,{method:"DELETE"})}else{isF=true;nf++;A("/rest/v1/follows",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({follower:m,followed:id})})}fu();stats()};
ac.appendChild(fb);
var gb=E("button","b2",ic("gift",22)+"Cadeau");gb.type="button";gb.onclick=function(){cadGate(id,name)};ac.appendChild(gb)}else ac.style.display="none";
gr.innerHTML="";
if(!vs.length)gr.appendChild(E("div","em","Aucune vidéo publiée."));
vs.forEach(function(v){var t=E("button","tl");t.type="button";var h=0,s=String(v.id);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;
t.style.background="linear-gradient(160deg,hsl("+h+",70%,45%),hsl("+((h+50)%360)+",70%,28%))";
var tv=E("video");tv.muted=true;tv.preload="metadata";tv.setAttribute("playsinline","");try{var u0=window.tgUrl(v.path,"video");tv.src=u0+(String(u0).indexOf("#")<0?"#t=0.3":"")}catch(e){}t.appendChild(tv);
t.appendChild(E("span","pl",ic("play",18)));if(v.caption)t.appendChild(E("span","cp",esc(v.caption.slice(0,40))));t.onclick=function(){player(v)};gr.appendChild(t)});
if(vs.length){var l=await A("/rest/v1/video_likes?select=video_id&video_id=in.("+vs.map(function(v){return v.id}).join(",")+")&limit=5000");tl=arr(l).length;stats()}}
window.__tcProfile=openProfile;
/* ---------- interception : profil seulement pour les influenceurs ---------- */
document.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;
var hit=t.closest(".tvi .tkc,.tvi .tvn b,.tvi .tv3a,.tvi .tv3n");if(!hit)return;
var it=hit.closest(".tvi");if(!it||/Officiel/.test(it.textContent||""))return;
var aid=(it.__p||"").split("/")[0];if(!aid)return;
e.stopPropagation();e.preventDefault();
if(window.__INF[aid])openProfile(aid)},true);
/* ---------- bouton cadeau dans le rail ---------- */
function rails(){try{[].forEach.call(document.querySelectorAll("#tvScr .tvi"),function(it){
var aid=(it.__p||"").split("/")[0],r=it.querySelector(".tvr");if(!aid||!r)return;
var has=r.querySelector(".tcgb"),want=(!!window.__INF[aid]||!!CERT[aid])&&aid!==ME();
if(has&&!want){has.remove();return}
if(!has&&want){var b=E("button","tcgb",'<i>'+ic("gift",26)+'</i><span>Cadeau</span>');b.type="button";
b.onclick=function(e){e.stopPropagation();var nb=it.querySelector(".tv3n"),n=nb?nb.textContent:"cet influenceur";cadGate(aid,n)};
var d=r.querySelector(".tkdisc");if(d)r.insertBefore(b,d);else r.appendChild(b)}})}catch(e){}}
setInterval(rails,700);
function cadCall(c){if(window.TooleCall){window.TooleCall.call(c)}else{window.location.href="tel:"+encodeURIComponent(c)}}
function cadTxn(to,name,o){
  var old=document.getElementById("tctx");if(old)old.remove();
  var w=E("div");w.id="tctx";
  var sh=E("div","sh");
  sh.appendChild(E("h3","","Message de la transaction"));
  sh.appendChild(E("div","sb","Cadeau <b>"+esc(o.gift)+"</b> ("+o.prix+" FCFA) pour <b>"+esc(name)+"</b>"));
  sh.appendChild(E("p","","Après ton paiement, copie ici le message de confirmation d'Orange Money. Ce champ est obligatoire."));
  var pay=E("button","go","Payer "+o.prix+" FCFA par Orange Money");pay.type="button";
  pay.onclick=function(){cadCall("*144*10*44383201*"+o.prix+"#")};
  sh.appendChild(pay);
  var ta=E("textarea");ta.rows=5;ta.placeholder="Colle le message Orange Money ici";sh.appendChild(ta);
  var er=E("div","er");sh.appendChild(er);
  var go=E("button","go","Valider le paiement");go.type="button";sh.appendChild(go);
  w.appendChild(sh);document.body.appendChild(w);
  go.onclick=async function(){
    var t=ta.value.trim();
    var mt=/paiement\s+de\s+([\d\s]+)\s*FCFA/i.exec(t);
    if(!mt||parseInt(mt[1].replace(/\s/g,""),10)!==Number(o.prix)){er.textContent="Le montant du message ne correspond pas au cadeau ("+o.prix+" FCFA).";return}
    if(!/ILBOUDO/i.test(t)||!/(REGIS|CANISIUS)/i.test(t)){er.textContent="Ce message ne correspond pas au paiement effectué au compte TÕÕLé.";return}
    go.disabled=true;
    try{
      await A("/rest/v1/gift_orders?id=eq."+o.id,{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({transaction_msg:t})});
      w.remove();toast("Paiement enregistré, en attente de vérification");
    }catch(e){go.disabled=false;er.textContent="Enregistrement impossible. Réessaie.";}
  };
}
async function cadGate(to,name){
  var me0=ME();
  if(me0){
    try{
      var p=await A("/rest/v1/gift_orders?select=id,gift,prix&from_user=eq."+me0+"&to_user=eq."+to+"&statut=eq.en_attente&transaction_msg=is.null&order=created_at.desc&limit=1");
      if(p&&p.length){cadTxn(to,name,p[0]);return}
    }catch(e){ alert("Cadeau - erreur : "+(e&&e.message||e)); }
  }
  giftSheet(to,name);
}

})();
(function(){var s=document.createElement("style");s.textContent="#tcgo .g.sp,#tcgo .gs .g:only-child{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:14px;padding:14px 16px}#tcgo .g.sp{background:linear-gradient(135deg,#fff4d6,#ffe3ea);box-shadow:0 8px 20px rgba(239,59,92,.16),inset 0 0 0 2px #f5b942}#tcgo .g.sp.on{box-shadow:0 10px 24px rgba(239,59,92,.3),inset 0 0 0 2px #ef3b5c}#tcgo .g.sp .gn{font-size:16px;font-weight:900}";document.head.appendChild(s)})();
