/* TÕÕLé — À la une : fil façon Facebook, en plus chic */
(function(){"use strict";if(window.__tdec)return;window.__tdec=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
var tab="posts",sec,box,MY=null;
function $(i){return document.getElementById(i)}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function uid(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function api(p,o){o=o||{};var s=sess();o.headers=Object.assign({apikey:K,Authorization:"Bearer "+(s&&s.access_token),"Content-Type":"application/json"},o.headers||{});return fetch(U+"/rest/v1/"+p,o).then(function(r){return r.text().then(function(t){try{return t?JSON.parse(t):[]}catch(e){return[]}})})}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ini(n){return(n||"?").trim().charAt(0).toUpperCase()}
function ago(d){var s=(Date.now()-new Date(d).getTime())/1000;if(s<60)return"à l'instant";if(s<3600)return"il y a "+Math.floor(s/60)+" min";if(s<86400)return"il y a "+Math.floor(s/3600)+" h";if(s<604800)return"il y a "+Math.floor(s/86400)+" j";return new Date(d).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}
var css=el("style");css.textContent=
"#scrDecouvrir{background:#eef2f9;flex-direction:column}"
+"#scrDecouvrir:not(.hide){display:flex}"
+"#scrDecouvrir .dc-hd{display:flex;align-items:center;gap:6px;padding:calc(env(safe-area-inset-top,0px) + 12px) 12px 12px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;box-shadow:0 4px 18px rgba(47,111,224,.28)}"
+"#scrDecouvrir .dc-hd h1{flex:1;margin:0;font-size:22px;font-weight:800;letter-spacing:.2px;color:#fff}"
+"#scrDecouvrir .dc-ib{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.2);color:#fff;display:grid;place-items:center;padding:0}"
+"#scrDecouvrir .dc-ib svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}"
+"#scrDecouvrir .dc-ib:active{transform:scale(.92)}"
+".dc-seg{display:flex;gap:8px;padding:10px 14px;background:#fff;box-shadow:0 1px 0 #e3e9f4}"
+".dc-seg button{flex:1;padding:10px;border:0;border-radius:22px;background:#eef2f8;font-weight:700;font-size:15px;color:#3d5a8a;transition:.2s}"
+".dc-seg button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;box-shadow:0 4px 12px rgba(47,111,224,.35)}"
+".dc-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 0 calc(env(safe-area-inset-bottom,0px) + 30px)}"
+".dc-stories{display:flex;gap:12px;overflow-x:auto;padding:4px 14px 12px;scrollbar-width:none}.dc-stories::-webkit-scrollbar{display:none}"
+".dc-st{flex:none;width:68px;text-align:center;font-size:12px;color:#33496f;font-weight:600;cursor:pointer}"
+".dc-st .rg{width:62px;height:62px;border-radius:50%;padding:3px;background:conic-gradient(#00e5ff,#2f6fe0,#a855f7,#00e5ff);margin:0 auto 5px}"
+".dc-st .rg div{width:100%;height:100%;border-radius:50%;border:3px solid #eef2f9;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;display:grid;place-items:center;font-weight:800;font-size:20px}"
+".dc-st span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".dc-card{background:#fff;border-radius:20px;margin:0 12px 12px;padding:14px;box-shadow:0 6px 20px rgba(20,50,110,.08);animation:dcUp .45s both}"
+"@keyframes dcUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}"
+".dc-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}"
+".dc-av{flex:none;width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#00e5ff,#2f6fe0);color:#fff;display:grid;place-items:center;font-weight:800;font-size:18px;box-shadow:0 0 0 2px #fff,0 0 0 4px #bfe6f5}"
+".dc-n{font-weight:800;color:#0a2a66;font-size:15.5px}.dc-d{font-size:12.5px;color:#7a8aa8}"
+".dc-t{font-size:16px;line-height:1.45;color:#16294d;white-space:pre-wrap;word-break:break-word;margin:2px 0 10px}"
+".dc-img{width:100%;max-height:420px;object-fit:cover;border-radius:16px;display:block;margin:4px 0 10px;background:#e3e9f4}"
+".dc-x{margin-left:auto;border:0;background:#fdecec;color:#d23b3b;border-radius:14px;padding:6px 12px;font-size:12.5px;font-weight:700}"
+".dc-sum{font-size:13px;color:#6b7c9b;padding:2px 2px 8px;min-height:18px}"
+".dc-r{display:flex;gap:6px;border-top:1px solid #edf1f8;padding-top:8px}"
+".dc-r button{flex:1;border:0;background:#f3f6fc;border-radius:14px;padding:9px 0;font-size:17px;color:#3d5a8a;transition:.15s}"
+".dc-r button small{font-size:12px;font-weight:700;margin-left:3px}"
+".dc-r button.me{background:linear-gradient(135deg,#d9f6fd,#dbe8ff);color:#0a5fd0;box-shadow:inset 0 0 0 1.5px #2f9ff0}"
+".dc-r button:active{transform:scale(.9)}"
+".dc-comp{display:block}.dc-ct{display:flex;gap:10px;align-items:center}"
+".dc-fake{flex:1;text-align:left;border:0;background:#eef2f9;border-radius:24px;padding:12px 16px;color:#7a8aa8;font-size:15px}"
+".dc-in{width:100%;border:0;background:#eef2f9;border-radius:16px;padding:12px 14px;font-size:16px;color:#16294d;outline:none;box-sizing:border-box;resize:none}"
+".dc-row{display:flex;gap:10px;margin-top:10px;align-items:center}"
+".dc-ph{border:0;background:#e6f7fb;color:#0a7fa0;border-radius:20px;padding:10px 16px;font-weight:700}"
+".dc-go{margin-left:auto;border:0;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;border-radius:20px;padding:10px 24px;font-weight:800;box-shadow:0 4px 12px rgba(47,111,224,.35)}"
+".dc-go:disabled{opacity:.5}"
+".dc-sk{height:150px;background:linear-gradient(90deg,#fff 25%,#f0f4fb 50%,#fff 75%);background-size:200% 100%;animation:dcSk 1.2s infinite}"
+"@keyframes dcSk{to{background-position:-200% 0}}"
+".dc-empty{text-align:center;color:#7a8aa8;padding:30px 20px;font-size:15px}"
+".dc-list .dc-card{display:flex;align-items:center;gap:12px;padding:12px 14px;margin-bottom:8px;cursor:pointer}"
+".dc-list .dc-card .dc-top{margin:0;flex:1}.dc-go2{color:#2f6fe0;font-weight:800;font-size:13px}"
+"body.dc-on #v4nav{display:none!important}";
document.head.appendChild(css);
function upload(bl){var p=uid()+"/dc_"+Date.now()+".jpg";if(!window.tgUpload)return Promise.reject(1);return window.tgUpload(bl,p).then(function(){return "tg:"+p})}
function setImg(im,v){if(!v)return;if(v.indexOf("tg:")!==0){im.src=v;return}var p=v.slice(3);fetch(window.tgUrl(p,"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){im.src=window.URL.createObjectURL(b)}).catch(function(){im.alt="Photo indisponible"})}
function shrink(f){return new Promise(function(ok,ko){var rd=new FileReader();rd.onerror=ko;rd.onload=function(){var i=new Image();i.onerror=ko;i.onload=function(){var s=Math.min(1,1080/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext("2d").drawImage(i,0,0,c.width,c.height);c.toBlob(function(b){b?ok(b):ko()},"image/jpeg",.72)};i.src=rd.result};rd.readAsDataURL(f)})}
function chat(p){if(window.openChat){close();window.openChat(p.id,p.pseudo||"")}else alert("Chat indisponible")}
function skel(L){L.innerHTML="";for(var i=0;i<3;i++){var c=el("div","dc-card dc-sk");L.appendChild(c)}}
function person(p){var c=el("div","dc-card"),t=el("div","dc-top");t.appendChild(el("div","dc-av",ini(p.pseudo)));t.appendChild(el("div","dc-n",p.pseudo||"Sans nom"));c.appendChild(t);if(p.id!==uid()){c.appendChild(el("div","dc-go2","Écrire ›"));c.onclick=function(){chat(p)}}return c}
function people(){box.innerHTML="";var i=el("input","dc-in");i.placeholder="🔎  Chercher quelqu'un par son nom";i.style.cssText="margin:4px 12px 10px;width:calc(100% - 24px);box-shadow:0 4px 14px rgba(20,50,110,.08);background:#fff";var L=el("div","dc-list");box.appendChild(i);box.appendChild(L);
function run(){var q=i.value.trim();api("profiles?select=id,pseudo&order=pseudo.asc&limit=40"+(q?"&pseudo=ilike."+encodeURIComponent("*"+q+"*"):"")).then(function(r){L.innerHTML="";if(!r.length)L.appendChild(el("div","dc-empty","Personne trouvée."));r.forEach(function(p){L.appendChild(person(p))})})}
var tm;i.oninput=function(){clearTimeout(tm);tm=setTimeout(run,300)};run()}
function stories(){var s=el("div","dc-stories");api("profiles?select=id,pseudo&order=pseudo.asc&limit=20").then(function(r){r.filter(function(p){return p.id!==uid()}).forEach(function(p){var d=el("div","dc-st"),g=el("div","rg");g.appendChild(el("div","",ini(p.pseudo)));d.appendChild(g);d.appendChild(el("span","",p.pseudo||"?"));d.onclick=function(){chat(p)};s.appendChild(d)});if(!s.children.length)s.style.display="none"});return s}
function composer(L){var c=el("div","dc-card dc-comp"),top=el("div","dc-ct");top.appendChild(el("div","dc-av",ini(MY)));var fk=el("button","dc-fake","Quoi de neuf"+(MY?", "+MY:"")+" ?");top.appendChild(fk);c.appendChild(top);
var ex=el("div");ex.style.display="none";var ta=el("textarea","dc-in");ta.rows=3;ta.maxLength=2000;ta.placeholder="Partage quelque chose de chouette…";ta.style.marginTop="10px";
var fi=el("input");fi.type="file";fi.accept="image/*";fi.style.display="none";var pv=el("img","dc-img");pv.style.display="none";var ph=el("button","dc-ph","📷 Photo"),b=el("button","dc-go","Publier"),row=el("div","dc-row"),blob=null;
fk.onclick=function(){fk.style.display="none";ex.style.display="block";ta.focus()};
ph.onclick=function(){fi.click()};
fi.onchange=function(){var f=fi.files[0];if(!f)return;shrink(f).then(function(x){blob=x;var r=new FileReader();r.onload=function(){pv.src=r.result;pv.style.display="block"};r.readAsDataURL(x)}).catch(function(){alert("Photo illisible")})};
row.appendChild(ph);row.appendChild(b);ex.appendChild(ta);ex.appendChild(pv);ex.appendChild(row);ex.appendChild(fi);c.appendChild(ex);
b.onclick=function(){var v=ta.value.trim();if(!v&&!blob)return;b.disabled=true;var up=blob?upload(blob):Promise.resolve(null);
up.then(function(url){return api("posts",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({author:uid(),body:v,image_url:url})})}).then(function(){ta.value="";blob=null;pv.style.display="none";fi.value="";b.disabled=false;ex.style.display="none";fk.style.display="block";load(L)}).catch(function(){b.disabled=false;alert("Publication impossible")})};
return c}
function feed(){box.innerHTML="";box.appendChild(stories());var L=el("div");var cp=composer(L);box.appendChild(cp);box.appendChild(L);load(L)}
var EM=["👍","❤️","😂","😮"];
function bar(p,R,me,sum){var r=el("div","dc-r");
function paint(){r.innerHTML="";var tot=R.filter(function(z){return z.post_id===p.id}).length;sum.textContent=tot?tot+(tot>1?" réactions":" réaction"):"";
EM.forEach(function(e){var n=R.filter(function(z){return z.post_id===p.id&&z.emoji===e}).length,mine=R.filter(function(z){return z.post_id===p.id&&z.user_id===me})[0];var bt=el("button",mine&&mine.emoji===e?"me":"");bt.appendChild(document.createTextNode(e));if(n){var sm=el("small","",String(n));bt.appendChild(sm)}
bt.onclick=function(){var had=R.filter(function(z){return z.post_id===p.id&&z.user_id===me})[0],q;
if(had&&had.emoji===e){R.splice(R.indexOf(had),1);q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"DELETE"})}
else if(had){had.emoji=e;q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"PATCH",body:JSON.stringify({emoji:e})})}
else{R.push({post_id:p.id,user_id:me,emoji:e});q=api("post_reactions",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:p.id,user_id:me,emoji:e})})}
paint()};r.appendChild(bt)})}
paint();return r}
function load(L){var me=uid();skel(L);Promise.all([api("posts?select=id,author,body,image_url,created_at&order=created_at.desc&limit=40"),api("blocks?select=blocked&blocker=eq."+me)]).then(function(a){var bl=(a[1]||[]).map(function(x){return x.blocked});var P=(a[0]||[]).filter(function(p){return bl.indexOf(p.author)<0});L.innerHTML="";if(!P.length){L.appendChild(el("div","dc-empty","Aucune publication pour l'instant.\nSois le premier à publier ! ✨"));return}
var ids=P.map(function(p){return p.id}).join(",");var au=P.map(function(p){return p.author}).filter(function(v,i,s){return s.indexOf(v)===i}).join(",");
Promise.all([api("profiles?select=id,pseudo&id=in.("+au+")"),api("post_reactions?select=post_id,user_id,emoji&post_id=in.("+ids+")")]).then(function(b){var N={};b[0].forEach(function(p){N[p.id]=p.pseudo});var R=b[1]||[];
P.forEach(function(p,k){var c=el("div","dc-card"),t=el("div","dc-top"),nm=N[p.author]||"Inconnu";c.style.animationDelay=Math.min(k,8)*.05+"s";t.appendChild(el("div","dc-av",ini(nm)));var w=el("div");w.appendChild(el("div","dc-n",nm));w.appendChild(el("div","dc-d",ago(p.created_at)));t.appendChild(w);
if(p.author===me){var x=el("button","dc-x","Supprimer");x.onclick=function(){if(confirm("Supprimer cette publication ?"))api("posts?id=eq."+p.id,{method:"DELETE"}).then(function(){load(L)})};t.appendChild(x)}
c.appendChild(t);if(p.body)c.appendChild(el("div","dc-t",p.body));if(p.image_url){var im=el("img","dc-img");im.loading="lazy";setImg(im,p.image_url);c.appendChild(im)}
var sum=el("div","dc-sum");c.appendChild(sum);c.appendChild(bar(p,R,me,sum));L.appendChild(c)})})})}
function render(){[].forEach.call(sec.querySelectorAll(".dc-seg button"),function(b){b.classList.toggle("on",b.dataset.k===tab)});tab==="posts"?feed():people()}
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
var h=el("div","dc-hd"),bk=el("button","dc-ib"),t=el("h1","","À la une"),rf=el("button","dc-ib");bk.innerHTML=IC.back;bk.setAttribute("aria-label","Retour");rf.innerHTML=IC.ref;rf.setAttribute("aria-label","Actualiser");bk.onclick=back;rf.onclick=render;h.appendChild(bk);h.appendChild(t);h.appendChild(rf);
var sg=el("div","dc-seg");[["posts","✨ Pour toi"],["people","👥 Gens"]].forEach(function(k){var b=el("button","",k[1]);b.dataset.k=k[0];b.onclick=function(){tab=k[0];render()};sg.appendChild(b)});
box=el("div","dc-body");sec.appendChild(h);sec.appendChild(sg);sec.appendChild(box);ref.parentNode.appendChild(sec);
wireNav();setInterval(wireNav,1500);
/* bouton Retour Android : ferme Découvrir */
document.addEventListener("backbutton",function(){if(!sec.classList.contains("hide"))back()},false)}
init()})();
