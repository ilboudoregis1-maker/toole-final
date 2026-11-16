/* TÕÕLé — Explorer : fil vidéos façon TikTok (auteurs, abonnés, likes, commentaires) */
(function(){"use strict";if(window.__tvid)return;window.__tvid=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR",NAMES={},FOK=true,mode="all",ios=[],FC={},FM={},FB={};
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function uid(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function api(p,o){o=o||{};var s=sess();o.headers=Object.assign({apikey:K,Authorization:"Bearer "+((s&&s.access_token)||K),"Content-Type":"application/json"},o.headers||{});return fetch(U+"/rest/v1/"+p,o).then(function(r){return r.text().then(function(t){try{return t?JSON.parse(t):[]}catch(e){return[]}})}).catch(function(){return[]})}
function arr(r){return Array.isArray(r)?r:[]}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100010;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
function nm(id){return NAMES[id]||"Utilisateur"}
function names(ids){var m=ids.filter(function(i,k){return i&&!NAMES[i]&&ids.indexOf(i)===k});if(!m.length)return Promise.resolve();return api("profiles?select=id,pseudo&id=in.("+m.join(",")+")").then(function(r){arr(r).forEach(function(p){NAMES[p.id]=p.pseudo})})}
function src(path){return fetch(window.tgUrl(path,"video")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(bl){return URL.createObjectURL(new Blob([bl],{type:/webm$/.test(path)?"video/webm":"video/mp4"}))}).catch(function(){return "https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+path})}
function play(v){var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play().catch(function(){})})}
var st=document.createElement("style");st.textContent="#tvFeed{position:fixed;inset:0;z-index:100000;background:#000;color:#fff;font-family:sans-serif}"
+"#tvFeed .tvh{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;gap:6px;padding:calc(env(safe-area-inset-top,0px) + 8px) 10px 8px;background:linear-gradient(#000b,transparent)}"
+"#tvFeed .tvh button{border:0;color:#fff;background:rgba(255,255,255,.16);height:36px;border-radius:18px;font-size:13px;font-weight:700;padding:0 12px}"
+"#tvFeed .tvt{flex:1;display:flex;gap:4px;justify-content:center}#tvFeed .tvt button.on{background:#fff;color:#0a2a66}"
+"#tvFeed .tvh .sq{width:36px;padding:0;font-size:20px}#tvFeed .tvh .tvp{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#tvScr{height:100%;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch}"
+"#tvScr .tvi{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;display:grid;place-items:center;background:#000}"
+"#tvScr video{width:100%;height:100%;object-fit:contain}#tvScr .tvl{position:absolute;color:#9ec5ff;font-size:13px}"
+"#tvScr .tvc{position:absolute;left:14px;right:78px;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);font-size:14px;line-height:1.4;text-shadow:0 1px 6px #000}"
+"#tvScr .tvn{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;font-size:15px}#tvScr .tvfc{font-size:12px;opacity:.85}"
+"#tvScr .tvf{border:1.5px solid #fff;background:transparent;color:#fff;border-radius:14px;padding:3px 10px;font-size:12px;font-weight:700}#tvScr .tvf.on{background:rgba(255,255,255,.25);border-color:transparent}"
+"#tvScr .tvx{max-height:70px;overflow:hidden}"
+"#tvScr .tvr{position:absolute;right:8px;bottom:calc(env(safe-area-inset-bottom,0px) + 90px);display:flex;flex-direction:column;align-items:center;gap:16px}"
+"#tvScr .tvr button{width:50px;border:0;background:none;color:#fff;font-size:12px;font-weight:700;text-shadow:0 1px 5px #000;display:flex;flex-direction:column;align-items:center;gap:2px}"
+"#tvScr .tvr button i{font-style:normal;font-size:31px;line-height:1.1;filter:drop-shadow(0 1px 4px #000)}"
+"#tvFeed .tve{height:100%;display:grid;place-items:center;text-align:center;padding:30px;color:#9ec5ff}"
+"#tvSh{position:absolute;left:0;right:0;bottom:0;height:68%;z-index:5;background:#fff;color:#0f172a;border-radius:20px 20px 0 0;display:flex;flex-direction:column}"
+"#tvSh .shh{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #e5e7eb}#tvSh .shh button{border:0;background:#eef2f7;border-radius:50%;width:32px;height:32px;font-size:15px}"
+"#tvSh .shl{flex:1;overflow-y:auto;padding:8px 16px}#tvSh .shn{text-align:center;color:#64748b;padding:30px 0}"
+"#tvSh .shc{padding:8px 0;font-size:14px;line-height:1.4}#tvSh .shc b{display:block;font-size:13px;color:#2f6fe0}#tvSh .shc button{border:0;background:none;color:#ef4444;font-size:12px;padding:2px 0}"
+"#tvSh .shi{display:flex;gap:8px;padding:10px 12px calc(env(safe-area-inset-bottom,0px) + 10px);border-top:1px solid #e5e7eb}#tvSh .shi input{flex:1;border:1px solid #d5dde8;border-radius:20px;padding:10px 14px;font-size:15px;outline:none}"
+"#tvSh .shi button{border:0;border-radius:20px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;font-weight:700;padding:0 16px}"
+"#scrDecouvrir .dc-seg .tv-b{white-space:nowrap}";document.head.appendChild(st);
function stopAll(){try{document.querySelectorAll("video").forEach(function(x){x.pause()})}catch(e){}}
function killVids(root){root.querySelectorAll("video").forEach(function(v){v.pause();v.removeAttribute("src");v.load()})}
function close(){ios.forEach(function(o){o.disconnect()});ios=[];var o=document.getElementById("tvFeed");if(o){killVids(o);o.remove()}}
function fbRefresh(a){var n=FC[a]||0;(FB[a]||[]).forEach(function(o){o.b.textContent=FM[a]?"Abonné ✓":"+ S'abonner";o.b.className="tvf"+(FM[a]?" on":"");o.c.textContent=n+" abonné"+(n>1?"s":"")})}
function follow(a){var me=uid();if(!me||a===me)return;if(FM[a]){delete FM[a];FC[a]=Math.max(0,(FC[a]||1)-1);api("follows?follower=eq."+me+"&followed=eq."+a,{method:"DELETE"})}else{FM[a]=1;FC[a]=(FC[a]||0)+1;api("follows",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({follower:me,followed:a})}).then(function(r){if(r&&!Array.isArray(r)&&(r.code||r.message)){delete FM[a];FC[a]=Math.max(0,(FC[a]||1)-1);fbRefresh(a);toast("Abonnements pas encore activés")}})}fbRefresh(a)}
function sheet(p,cb){var ov=document.getElementById("tvFeed"),old=document.getElementById("tvSh");if(old)old.remove();
var sh=E("div");sh.id="tvSh";var hd=E("div","shh"),tt=E("b","","Commentaires"),x=E("button","","✕");x.onclick=function(){sh.remove()};hd.appendChild(tt);hd.appendChild(x);
var ls=E("div","shl"),rw=E("div","shi"),ip=E("input");ip.placeholder="Ajouter un commentaire…";ip.maxLength=500;var sd=E("button","","Envoyer");rw.appendChild(ip);rw.appendChild(sd);
sh.appendChild(hd);sh.appendChild(ls);sh.appendChild(rw);ov.appendChild(sh);
var me=uid(),CL=[];
function paint(){ls.innerHTML="";tt.textContent=CL.length+" commentaire"+(CL.length>1?"s":"");if(!CL.length)ls.appendChild(E("div","shn","Aucun commentaire. Sois le premier !"));CL.forEach(function(c){var r=E("div","shc");r.appendChild(E("b","",nm(c.author)));r.appendChild(E("span","",c.body));if(c.author===me){var d=E("button","","Supprimer");d.onclick=function(){api("post_comments?id=eq."+c.id,{method:"DELETE"});CL.splice(CL.indexOf(c),1);p.cc=CL.length;cb();paint()};r.appendChild(d)}ls.appendChild(r)})}
api("post_comments?select=id,author,body,created_at&post_id=eq."+p.id+"&order=created_at.asc&limit=100").then(function(r){CL=arr(r);return names(CL.map(function(c){return c.author}).concat([me]))}).then(function(){p.cc=CL.length;cb();paint()});
sd.onclick=function(){var v=ip.value.trim();if(!v||!me)return;sd.disabled=true;api("post_comments",{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({post_id:p.id,author:me,body:v})}).then(function(r){sd.disabled=false;if(Array.isArray(r)&&r[0]){CL.push(r[0]);p.cc=CL.length;ip.value="";cb();paint();ls.scrollTop=ls.scrollHeight}else toast("Envoi impossible")})}}
function render(list,sc){var me=uid(),by={},au=[],ids=list.map(function(p){by[p.id]=p;if(au.indexOf(p.author)<0)au.push(p.author);return p.id}).join(",");
Promise.all([names(au),api("post_reactions?select=post_id,user_id&post_id=in.("+ids+")"),api("post_comments?select=post_id&post_id=in.("+ids+")"),api("follows?select=follower,followed&followed=in.("+au.join(",")+")")]).then(function(b){
list.forEach(function(p){p.lk=0;p.me=false;p.cc=0});
arr(b[1]).forEach(function(x){var p=by[x.post_id];if(p){p.lk++;if(x.user_id===me)p.me=true}});
arr(b[2]).forEach(function(x){var p=by[x.post_id];if(p)p.cc++});
FOK=Array.isArray(b[3]);FC={};FM={};FB={};if(FOK)b[3].forEach(function(x){FC[x.followed]=(FC[x.followed]||0)+1;if(x.follower===me)FM[x.followed]=1});
sc.innerHTML="";
var ioP=new IntersectionObserver(function(es){es.forEach(function(e){var it=e.target;if(e.isIntersecting&&e.intersectionRatio>.6){it.__act=1;load(it);if(it.__v.src)play(it.__v)}else{it.__act=0;it.__v.pause()}})},{root:sc,threshold:[0,.6]});
var ioL=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)load(e.target)})},{root:sc,rootMargin:"100% 0px"});
ios.push(ioP,ioL);
list.forEach(function(p){var it=E("div","tvi"),v=E("video"),l=E("div","tvl","Chargement…");v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");v.loop=true;v.preload="auto";
var rail=E("div","tvr"),lk=E("button"),cm=E("button");lk.innerHTML="<i></i><span></span>";cm.innerHTML="<i>💬</i><span></span>";
function upd(){lk.className=p.me?"on":"";lk.firstChild.textContent=p.me?"❤️":"🤍";lk.lastChild.textContent=p.lk;cm.lastChild.textContent=p.cc}
function doLike(){if(!me)return toast("Connecte-toi");if(p.me){p.me=false;p.lk=Math.max(0,p.lk-1);api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"DELETE"})}else{p.me=true;p.lk++;api("post_reactions",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:p.id,user_id:me,emoji:"❤️"})})}upd()}
lk.onclick=function(e){e.stopPropagation();doLike()};cm.onclick=function(e){e.stopPropagation();sheet(p,upd)};
rail.appendChild(lk);rail.appendChild(cm);upd();
var c=E("div","tvc"),n=E("div","tvn");n.appendChild(E("b","","@"+nm(p.author)));
if(FOK){var fc=E("span","tvfc"),fb=E("button","tvf");(FB[p.author]=FB[p.author]||[]).push({b:fb,c:fc});if(p.author!==me){fb.onclick=function(e){e.stopPropagation();follow(p.author)};n.appendChild(fb)}n.appendChild(fc);fbRefresh(p.author)}
c.appendChild(n);c.appendChild(E("div","tvx",p.body||""));
it.appendChild(v);it.appendChild(l);it.appendChild(rail);it.appendChild(c);
it.__v=v;it.__l=l;it.__p=p.image_url.slice(4);
var lt=0,tm;it.onclick=function(){var t=Date.now();if(t-lt<320){clearTimeout(tm);lt=0;if(!p.me)doLike();return}lt=t;tm=setTimeout(function(){if(v.muted&&!v.paused){v.muted=false;return}if(v.paused)play(v);else v.pause()},320)};
sc.appendChild(it);ioP.observe(it);ioL.observe(it)})})}
function feed(){var sc=document.getElementById("tvScr");if(!sc)return;ios.forEach(function(o){o.disconnect()});ios=[];killVids(sc);sc.innerHTML="";sc.appendChild(E("div","tve","Chargement…"));
var me=uid(),base="posts?select=id,author,body,image_url,created_at&image_url=like.tgv:*&order=created_at.desc&limit=30",q;
function none(t){sc.innerHTML="";sc.appendChild(E("div","tve",t))}
if(mode==="follow")q=api("follows?select=followed&follower=eq."+me).then(function(r){if(!Array.isArray(r))return null;var a=r.map(function(x){return x.followed});return a.length?api(base+"&author=in.("+a.join(",")+")"):[]});
else if(mode==="liked")q=api("post_reactions?select=post_id&user_id=eq."+me+"&limit=100").then(function(r){var a=arr(r).map(function(x){return x.post_id});return a.length?api(base+"&id=in.("+a.join(",")+")"):[]});
else q=api(base);
q.then(function(r){if(r===null)return none("Les abonnements ne sont pas encore activés.");if(!Array.isArray(r)||!r.length)return none(mode==="follow"?"Abonne-toi à des personnes pour voir leurs vidéos ici.":mode==="liked"?"Tu n'as encore aimé aucune vidéo.":"Aucune vidéo pour l'instant. Appuie sur + pour envoyer la première !");render(r,sc)})}
function open(){close();stopAll();var ov=E("div");ov.id="tvFeed";var h=E("div","tvh"),bk=E("button","sq","‹");bk.onclick=close;
var tb=E("div","tvt");[["all","Pour toi"],["follow","Abonnements"],["liked","J'aime"]].forEach(function(k){var b=E("button",mode===k[0]?"on":"",k[1]);b.onclick=function(){mode=k[0];tb.querySelectorAll("button").forEach(function(x){x.className=""});b.className="on";feed()};tb.appendChild(b)});
var pl=E("button","sq tvp","+");pl.onclick=function(){close();var s=document.querySelector("#scrDecouvrir .dc-seg button[data-k=posts]");if(s)s.click();setTimeout(function(){var c=document.querySelector("#scrDecouvrir .dc-comp");if(c)c.scrollIntoView({behavior:"smooth",block:"center"})},350);toast("Appuie sur 🎬 Vidéo pour envoyer la tienne")};
h.appendChild(bk);h.appendChild(tb);h.appendChild(pl);var sc=E("div");sc.id="tvScr";ov.appendChild(h);ov.appendChild(sc);document.body.appendChild(ov);feed()}
function ensure(){var sg=document.querySelector("#scrDecouvrir .dc-seg");if(sg&&!sg.querySelector(".tv-b")){var b=E("button","tv-b","🎬 Vidéos");b.type="button";b.onclick=open;sg.appendChild(b)}}
setInterval(ensure,800);ensure();
})();
