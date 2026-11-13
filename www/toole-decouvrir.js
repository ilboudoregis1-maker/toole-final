/* TÕÕLé — Explorer v2 : fil high-tech, tendances, suggestions, partage (remplace toole-decouvrir.js) */
(function(){"use strict";if(window.__tdec)return;window.__tdec=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
var tab="posts",Q="",sec,box,MY=null,NAMES={};
function $(i){return document.getElementById(i)}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function uid(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function api(p,o){o=o||{};var s=sess();o.headers=Object.assign({apikey:K,Authorization:"Bearer "+(s&&s.access_token),"Content-Type":"application/json"},o.headers||{});return fetch(U+"/rest/v1/"+p,o).then(function(r){return r.text().then(function(t){try{return t?JSON.parse(t):[]}catch(e){return[]}})}).catch(function(){return[]})}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ini(n){return(n||"?").trim().charAt(0).toUpperCase()}
function ago(d){var s=(Date.now()-new Date(d).getTime())/1000;if(s<60)return"à l'instant";if(s<3600)return"il y a "+Math.floor(s/60)+" min";if(s<86400)return"il y a "+Math.floor(s/3600)+" h";if(s<604800)return"il y a "+Math.floor(s/86400)+" j";return new Date(d).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}
function toast(m){var t=el("div","dc-toast",m);sec.appendChild(t);setTimeout(function(){t.remove()},1800)}

/* ---------- Palette unique : 2 couleurs de marque + neutres + 1 couleur d'alerte ---------- */
var css=el("style");css.textContent=
"#scrDecouvrir{--c1:#00c2e0;--c2:#2f6fe0;--g:linear-gradient(135deg,var(--c1),var(--c2));--ink:#0a2a66;--mut:#6b7c9b;--bg:#f4fbfe;--card:#fff;--line:#d6ebf4;--soft:#e8f6fb;--tint:#dbe8ff;--red:#e5484d;--sh:0 6px 20px rgba(20,50,110,.08);background:var(--bg);color:var(--ink);flex-direction:column}"
+"@media(prefers-color-scheme:dark){#scrDecouvrir{--ink:#e9edef;--mut:#8696a0;--bg:#0f1419;--card:#151c24;--line:#222d34;--soft:#1f2933;--tint:#16304f;--sh:0 6px 20px rgba(0,0,0,.35)}}"
+"#scrDecouvrir:not(.hide){display:flex}"
+"#scrDecouvrir *{box-sizing:border-box}"
+".dc-hd{display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 12px) 12px 14px;background:var(--g);color:#fff;box-shadow:0 4px 18px rgba(47,111,224,.28)}"
+".dc-hd h1{flex:1;margin:0;font-family:Orbitron,Exo 2,sans-serif;font-size:20px;font-weight:800;letter-spacing:1px;color:#fff}"
+".dc-ib{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;padding:0}"
+".dc-ib svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.dc-ib:active{transform:scale(.92)}"
+".dc-bar{padding:10px 12px 6px;background:var(--card);box-shadow:0 1px 0 var(--line)}"
+".dc-srch{width:100%;border:1px solid var(--line);background:var(--soft);border-radius:22px;padding:11px 16px;font-size:15px;color:var(--ink);outline:none}.dc-srch:focus{border-color:var(--c1);box-shadow:0 0 0 3px rgba(0,194,224,.18)}"
+".dc-seg{display:flex;gap:6px;padding:8px 0 6px}"
+".dc-seg button{flex:1;padding:9px 4px;border:0;border-radius:20px;background:var(--soft);font-weight:700;font-size:14px;color:var(--mut);transition:.2s}"
+".dc-seg button.on{background:var(--g);color:#fff;box-shadow:0 4px 12px rgba(47,111,224,.35)}"
+".dc-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 0 calc(env(safe-area-inset-bottom,0px) + 90px)}"
+".dc-h{display:flex;align-items:center;justify-content:space-between;margin:6px 16px 8px;font-size:13px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:var(--mut)}"
+".dc-h b{width:28px;height:3px;border-radius:3px;background:var(--g);display:inline-block}"
+".dc-stories{display:flex;gap:12px;overflow-x:auto;padding:4px 14px 12px;scrollbar-width:none}.dc-stories::-webkit-scrollbar{display:none}"
+".dc-st{flex:none;width:68px;text-align:center;font-size:12px;color:var(--ink);font-weight:600}"
+".dc-st .rg{width:62px;height:62px;border-radius:50%;padding:3px;background:conic-gradient(var(--c1),var(--c2),var(--c1));margin:0 auto 5px}"
+".dc-st .rg div{width:100%;height:100%;border-radius:50%;border:3px solid var(--bg);background:var(--g);color:#fff;display:grid;place-items:center;font-weight:800;font-size:20px}"
+".dc-st span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".dc-card{background:var(--card);border-radius:20px;margin:0 12px 12px;padding:14px;box-shadow:var(--sh);border:1px solid var(--line);animation:dcUp .45s both}"
+"@keyframes dcUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}"
+".dc-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}"
+".dc-av{flex:none;width:44px;height:44px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center;font-weight:800;font-size:18px;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--c1)}"
+".dc-n{font-weight:800;font-size:15.5px;color:var(--ink)}.dc-d{font-size:12.5px;color:var(--mut)}"
+".dc-t{font-size:16px;line-height:1.45;color:var(--ink);white-space:pre-wrap;word-break:break-word;margin:2px 0 10px}"
+".dc-more{border:0;background:none;color:var(--c2);font-weight:700;padding:0;margin-left:4px}"
+".dc-imgw{position:relative;margin:4px 0 10px}"
+".dc-img{width:100%;max-height:440px;object-fit:cover;border-radius:16px;display:block;background:var(--soft)}"
+".dc-pop{position:absolute;inset:0;display:grid;place-items:center;font-size:84px;pointer-events:none;opacity:0}.dc-pop.go{animation:dcPop .7s}"
+"@keyframes dcPop{0%{opacity:0;transform:scale(.4)}30%{opacity:1;transform:scale(1.15)}100%{opacity:0;transform:scale(1)}}"
+".dc-x{margin-left:auto;border:0;background:rgba(229,72,77,.12);color:var(--red);border-radius:14px;padding:6px 12px;font-size:12.5px;font-weight:700}"
+".dc-sum{display:flex;justify-content:space-between;font-size:13px;color:var(--mut);padding:2px 2px 8px;min-height:18px}"
+".dc-r{display:flex;gap:6px;border-top:1px solid var(--line);padding-top:8px}"
+".dc-r button{flex:1;border:0;background:var(--soft);border-radius:14px;padding:9px 0;font-size:16px;color:var(--mut);transition:.15s}"
+".dc-r button small{font-size:12px;font-weight:700;margin-left:3px}"
+".dc-r button.me{background:var(--tint);color:var(--c2);box-shadow:inset 0 0 0 1.5px var(--c2)}"
+".dc-r button.sh{flex:none;width:46px}.dc-r button:active{transform:scale(.9)}"
+".dc-comp{display:block}.dc-ct{display:flex;gap:10px;align-items:center}"
+".dc-fake{flex:1;text-align:left;border:1px solid var(--line);background:var(--soft);border-radius:24px;padding:12px 16px;color:var(--mut);font-size:15px}"
+".dc-in{width:100%;border:1px solid var(--line);background:var(--soft);border-radius:16px;padding:12px 14px;font-size:16px;color:var(--ink);outline:none;resize:none}"
+".dc-row{display:flex;gap:10px;margin-top:10px;align-items:center}.dc-cnt{font-size:12px;color:var(--mut)}"
+".dc-ph{border:0;background:var(--soft);color:var(--c2);border-radius:20px;padding:10px 16px;font-weight:700}"
+".dc-go{margin-left:auto;border:0;background:var(--g);color:#fff;border-radius:20px;padding:10px 24px;font-weight:800;box-shadow:0 4px 12px rgba(47,111,224,.35)}.dc-go:disabled{opacity:.5}"
+".dc-sk{height:150px;background:linear-gradient(90deg,var(--card) 25%,var(--soft) 50%,var(--card) 75%);background-size:200% 100%;animation:dcSk 1.2s infinite}"
+"@keyframes dcSk{to{background-position:-200% 0}}"
+".dc-empty{text-align:center;color:var(--mut);padding:30px 20px;font-size:15px;white-space:pre-line}"
+".dc-sug{display:flex;gap:10px;overflow-x:auto;padding:0 12px 14px;scrollbar-width:none}.dc-sug::-webkit-scrollbar{display:none}"
+".dc-pc{flex:none;width:132px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:14px 10px;text-align:center;box-shadow:var(--sh)}"
+".dc-pc .dc-av{margin:0 auto 8px;width:52px;height:52px;font-size:21px}.dc-pc .dc-n{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".dc-pc button{margin-top:10px;width:100%;border:0;border-radius:14px;padding:8px 0;background:var(--g);color:#fff;font-weight:700;font-size:13px}"
+".dc-list .dc-card{display:flex;align-items:center;gap:12px;padding:12px 14px;margin-bottom:8px}.dc-list .dc-top{margin:0;flex:1}"
+".dc-go2{border:0;background:var(--tint);color:var(--c2);font-weight:800;font-size:13px;border-radius:14px;padding:8px 14px}"
+".dc-view{position:fixed;inset:0;z-index:99999;background:rgba(5,12,25,.94);display:grid;place-items:center}.dc-view img{max-width:100%;max-height:100%;object-fit:contain}"
+".dc-toast{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 100px);transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:20px;font-size:14px;font-weight:700;z-index:50}"
+"body.dc-on #v4nav{display:none!important}";
document.head.appendChild(css);

/* ---------- Utilitaires média ---------- */
function upload(bl){var p=uid()+"/dc_"+Date.now()+".jpg";if(!window.tgUpload)return Promise.reject(1);return window.tgUpload(bl,p).then(function(){return "tg:"+p})}
function setImg(im,v){if(!v)return;if(v.indexOf("tg:")!==0){im.src=v;return}var p=v.slice(3);fetch(window.tgUrl(p,"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){im.src=window.URL.createObjectURL(b)}).catch(function(){im.alt="Photo indisponible"})}
function shrink(f){return new Promise(function(ok,ko){var rd=new FileReader();rd.onerror=ko;rd.onload=function(){var i=new Image();i.onerror=ko;i.onload=function(){var s=Math.min(1,1080/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext("2d").drawImage(i,0,0,c.width,c.height);c.toBlob(function(b){b?ok(b):ko()},"image/jpeg",.72)};i.src=rd.result};rd.readAsDataURL(f)})}
function viewer(src){var v=el("div","dc-view"),i=el("img");i.src=src;v.appendChild(i);v.onclick=function(){v.remove()};document.body.appendChild(v)}
function chat(p){if(window.openChat){close();window.openChat(p.id,p.pseudo||"")}else alert("Chat indisponible")}
function skel(L){L.innerHTML="";for(var i=0;i<3;i++)L.appendChild(el("div","dc-card dc-sk"))}
function head(t,r){var h=el("div","dc-h");h.appendChild(el("span","",t));if(r)h.appendChild(el("span","",r));else h.appendChild(el("b"));return h}

/* ---------- Personnes ---------- */
function pcard(p){var c=el("div","dc-pc");c.appendChild(el("div","dc-av",ini(p.pseudo)));c.appendChild(el("div","dc-n",p.pseudo||"Sans nom"));var b=el("button","","Écrire");b.onclick=function(){chat(p)};c.appendChild(b);return c}
function suggestions(P){var s=el("div","dc-sug");P.forEach(function(p){s.appendChild(pcard(p))});return s}
function person(p){var c=el("div","dc-card"),t=el("div","dc-top");t.appendChild(el("div","dc-av",ini(p.pseudo)));t.appendChild(el("div","dc-n",p.pseudo||"Sans nom"));c.appendChild(t);if(p.id!==uid()){var b=el("button","dc-go2","Écrire ›");b.onclick=function(){chat(p)};c.appendChild(b)}return c}
function people(){var L=el("div","dc-list");box.appendChild(head("Annuaire"));box.appendChild(L);skel(L);
api("profiles?select=id,pseudo&order=pseudo.asc&limit=60"+(Q?"&pseudo=ilike."+encodeURIComponent("*"+Q+"*"):"")).then(function(r){L.innerHTML="";if(!r.length)L.appendChild(el("div","dc-empty","Personne trouvée."));r.forEach(function(p){L.appendChild(person(p))})})}
function stories(){var s=el("div","dc-stories");api("profiles?select=id,pseudo&order=pseudo.asc&limit=20").then(function(r){r.filter(function(p){return p.id!==uid()}).forEach(function(p){var d=el("div","dc-st"),g=el("div","rg");g.appendChild(el("div","",ini(p.pseudo)));d.appendChild(g);d.appendChild(el("span","",p.pseudo||"?"));d.onclick=function(){chat(p)};s.appendChild(d)});if(!s.children.length)s.style.display="none"});return s}

/* ---------- Publier ---------- */
function composer(L){var c=el("div","dc-card dc-comp"),top=el("div","dc-ct");top.appendChild(el("div","dc-av",ini(MY)));var fk=el("button","dc-fake","Quoi de neuf"+(MY?", "+MY:"")+" ?");top.appendChild(fk);c.appendChild(top);
var ex=el("div");ex.style.display="none";var ta=el("textarea","dc-in");ta.rows=3;ta.maxLength=2000;ta.placeholder="Partage quelque chose de chouette…";ta.style.marginTop="10px";
var fi=el("input");fi.type="file";fi.accept="image/*";fi.style.display="none";var pv=el("img","dc-img");pv.style.display="none";var ph=el("button","dc-ph","📷 Photo"),cn=el("span","dc-cnt","0/2000"),b=el("button","dc-go","Publier"),row=el("div","dc-row"),blob=null;
ta.oninput=function(){cn.textContent=ta.value.length+"/2000"};
fk.onclick=function(){fk.style.display="none";ex.style.display="block";ta.focus()};
ph.onclick=function(){fi.click()};
fi.onchange=function(){var f=fi.files[0];if(!f)return;shrink(f).then(function(x){blob=x;var r=new FileReader();r.onload=function(){pv.src=r.result;pv.style.display="block"};r.readAsDataURL(x)}).catch(function(){alert("Photo illisible")})};
row.appendChild(ph);row.appendChild(cn);row.appendChild(b);ex.appendChild(ta);ex.appendChild(pv);ex.appendChild(row);ex.appendChild(fi);c.appendChild(ex);
b.onclick=function(){var v=ta.value.trim();if(!v&&!blob)return;b.disabled=true;var up=blob?upload(blob):Promise.resolve(null);
up.then(function(url){return api("posts",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({author:uid(),body:v,image_url:url})})}).then(function(){ta.value="";cn.textContent="0/2000";blob=null;pv.style.display="none";fi.value="";b.disabled=false;ex.style.display="none";fk.style.display="block";toast("Publié ✨");load(L)}).catch(function(){b.disabled=false;alert("Publication impossible")})};
return c}

/* ---------- Réactions ---------- */
var EM=["👍","❤️","😂","😮","🔥"];
function bar(p,R,me,sum,cnt){var r=el("div","dc-r");
function mine(){return R.filter(function(z){return z.post_id===p.id&&z.user_id===me})[0]}
function paint(){r.innerHTML="";var tot=R.filter(function(z){return z.post_id===p.id}).length;cnt.textContent=tot?tot+(tot>1?" réactions":" réaction"):"Sois le premier à réagir";
EM.forEach(function(e){var n=R.filter(function(z){return z.post_id===p.id&&z.emoji===e}).length,m=mine();var bt=el("button",m&&m.emoji===e?"me":"");bt.appendChild(document.createTextNode(e));if(n)bt.appendChild(el("small","",String(n)));bt.onclick=function(){react(e)};r.appendChild(bt)});
var sh=el("button","sh","↗");sh.setAttribute("aria-label","Partager");sh.onclick=function(){share(p)};r.appendChild(sh)}
function react(e){var had=mine(),q;
if(had&&had.emoji===e){R.splice(R.indexOf(had),1);q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"DELETE"})}
else if(had){had.emoji=e;q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"PATCH",body:JSON.stringify({emoji:e})})}
else{R.push({post_id:p.id,user_id:me,emoji:e});q=api("post_reactions",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:p.id,user_id:me,emoji:e})})}
paint()}
r.like=function(){var m=mine();if(!m||m.emoji!=="❤️")react("❤️")};
paint();return r}
function share(p){var t=(p.body||"Une photo sur TÕÕLé").slice(0,140)+" — TÕÕLé";if(navigator.share){navigator.share({text:t}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){toast("Copié")})}else toast("Partage indisponible")}

/* ---------- Fil ---------- */
function score(p,R){var n=R.filter(function(z){return z.post_id===p.id}).length,h=(Date.now()-new Date(p.created_at).getTime())/36e5;return(n*2+(p.image_url?1:0)+.5)/Math.pow(h+2,.8)}
function post(p,R,me,L,k){var c=el("div","dc-card"),t=el("div","dc-top"),nm=NAMES[p.author]||"Inconnu";c.style.animationDelay=Math.min(k,8)*.05+"s";
t.appendChild(el("div","dc-av",ini(nm)));var w=el("div");w.appendChild(el("div","dc-n",nm));w.appendChild(el("div","dc-d",ago(p.created_at)));t.appendChild(w);
if(p.author===me){var x=el("button","dc-x","Supprimer");x.onclick=function(){if(confirm("Supprimer cette publication ?"))api("posts?id=eq."+p.id,{method:"DELETE"}).then(function(){load(L)})};t.appendChild(x)}
c.appendChild(t);
if(p.body){var tx=el("div","dc-t"),long=p.body.length>220;tx.textContent=long?p.body.slice(0,220)+"…":p.body;if(long){var mb=el("button","dc-more","Voir plus");mb.onclick=function(){tx.textContent=p.body};tx.appendChild(mb)}c.appendChild(tx)}
var sum=el("div","dc-sum"),cnt=el("span"),rb=bar(p,R,me,sum,cnt);
if(p.image_url){var wr=el("div","dc-imgw"),im=el("img","dc-img"),pop=el("div","dc-pop","❤️"),last=0;im.loading="lazy";setImg(im,p.image_url);
im.onclick=function(){var n=Date.now();if(n-last<320){rb.like();pop.classList.remove("go");void pop.offsetWidth;pop.classList.add("go")}else setTimeout(function(){if(Date.now()-last>=320&&im.src)viewer(im.src)},330);last=n};
wr.appendChild(im);wr.appendChild(pop);c.appendChild(wr)}
sum.appendChild(cnt);c.appendChild(sum);c.appendChild(rb);return c}
function load(L){var me=uid();skel(L);
Promise.all([api("posts?select=id,author,body,image_url,created_at&order=created_at.desc&limit=60"),api("blocks?select=blocked&blocker=eq."+me)]).then(function(a){
var bl=(a[1]||[]).map(function(x){return x.blocked});var P=(a[0]||[]).filter(function(p){return bl.indexOf(p.author)<0});
if(!P.length){L.innerHTML="";L.appendChild(el("div","dc-empty","Aucune publication pour l'instant.\nSois le premier à publier ! ✨"));return}
var ids=P.map(function(p){return p.id}).join(","),au=P.map(function(p){return p.author}).filter(function(v,i,s){return s.indexOf(v)===i}).join(",");
Promise.all([api("profiles?select=id,pseudo&id=in.("+au+")"),api("post_reactions?select=post_id,user_id,emoji&post_id=in.("+ids+")"),api("profiles?select=id,pseudo&order=pseudo.asc&limit=12")]).then(function(b){
b[0].forEach(function(p){NAMES[p.id]=p.pseudo});var R=b[1]||[],S=(b[2]||[]).filter(function(p){return p.id!==me});
var q=Q.toLowerCase();if(q)P=P.filter(function(p){return(p.body||"").toLowerCase().indexOf(q)>=0||(NAMES[p.author]||"").toLowerCase().indexOf(q)>=0});
if(tab==="trend")P.sort(function(x,y){return score(y,R)-score(x,R)});
L.innerHTML="";if(!P.length){L.appendChild(el("div","dc-empty","Aucun résultat."));return}
P.forEach(function(p,k){L.appendChild(post(p,R,me,L,k));if(k===2&&S.length&&!q&&tab==="posts"){L.appendChild(head("Personnes à découvrir"));L.appendChild(suggestions(S.slice(0,8)))}})})})}
function feed(){if(tab==="posts")box.appendChild(stories());var L=el("div");if(tab==="posts")box.appendChild(composer(L));else box.appendChild(head("🔥 Les plus populaires"));box.appendChild(L);load(L)}
function render(){box.innerHTML="";[].forEach.call(sec.querySelectorAll(".dc-seg button"),function(b){b.classList.toggle("on",b.dataset.k===tab)});tab==="people"?people():feed()}

/* ---------- Navigation ---------- */
function nav(){document.body.classList.add("dc-on")}
function open(){[].forEach.call(document.querySelectorAll(".scr"),function(s){s.classList.add("hide")});sec.classList.remove("hide");nav();
if(!MY){api("profiles?select=pseudo&id=eq."+uid()).then(function(r){MY=r[0]&&r[0].pseudo||"";if(!sec.classList.contains("hide")&&tab==="posts")render()})}
render()}
function close(){if(sec)sec.classList.add("hide");document.body.classList.remove("dc-on")}
function back(){close();if(typeof goList==="function"){try{goList()}catch(e){}}else{var b=document.querySelector('#v4nav .t[data-n="chats"]');if(b)b.click()}
if(typeof window.__v4sync==="function")window.__v4sync()}
window.openDecouvrir=open;window.closeDecouvrir=close;
var IC={back:'<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',ref:'<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>'};
function wireNav(){var n=$("v4nav");if(!n||n.__dc)return;n.__dc=1;n.addEventListener("click",function(){close()},true)}
function init(){var ref=$("scrList");if(!ref)return setTimeout(init,300);
sec=el("section","scr hide");sec.id="scrDecouvrir";
var h=el("div","dc-hd"),bk=el("button","dc-ib"),t=el("h1","","EXPLORER"),rf=el("button","dc-ib");bk.innerHTML=IC.back;bk.setAttribute("aria-label","Retour");rf.innerHTML=IC.ref;rf.setAttribute("aria-label","Actualiser");bk.onclick=back;rf.onclick=render;h.appendChild(bk);h.appendChild(t);h.appendChild(rf);
var bar_=el("div","dc-bar"),si=el("input","dc-srch");si.type="search";si.placeholder="🔎  Rechercher une publication ou une personne";var tm;si.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){Q=si.value.trim();render()},300)};
var sg=el("div","dc-seg");[["posts","✨ Pour toi"],["trend","🔥 Tendances"],["people","👥 Gens"]].forEach(function(k){var b=el("button","",k[1]);b.dataset.k=k[0];b.onclick=function(){tab=k[0];render()};sg.appendChild(b)});
bar_.appendChild(si);bar_.appendChild(sg);
box=el("div","dc-body");sec.appendChild(h);sec.appendChild(bar_);sec.appendChild(box);ref.parentNode.appendChild(sec);
wireNav();setInterval(wireNav,1500);
document.addEventListener("backbutton",function(){if(!sec.classList.contains("hide"))back()},false)}
init()})();
