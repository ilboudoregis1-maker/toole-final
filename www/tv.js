/* TÕÕLé — Section Vidéos (icônes vectorielles, à part des publications) */
(function(){"use strict";if(window.__tvid)return;window.__tvid=1;
var U="https://TON-PROJET.supabase.co",K="TA_CLE_ANON",NAMES={},FOK=true,mode="all",ios=[],FC={},FM={},FB={},FO="Orbitron,'Exo 2',sans-serif";
var IC={heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',chat:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.7-.8L3 21l1.9-5.1A8.4 8.4 0 0 1 3.5 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/>',back:'<path d="M15 5l-7 7 7 7"/>',plus:'<path d="M12 5v14M5 12h14"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',film:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'};
function svg(n,sz,fill){return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" fill="'+(fill?"currentColor":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
window.tvIco=svg;
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function uid(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function api(p,o){o=o||{};var s=sess();o.headers=Object.assign({apikey:K,Authorization:"Bearer "+((s&&s.access_token)||K),"Content-Type":"application/json"},o.headers||{});return fetch(U+"/rest/v1/"+p,o).then(function(r){return r.text().then(function(t){try{return t?JSON.parse(t):[]}catch(e){return[]}})}).catch(function(){return[]})}
function arr(r){return Array.isArray(r)?r:[]}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100060;padding:12px;border-radius:14px;background:rgba(8,22,50,.95);border:1px solid rgba(0,229,255,.5);color:#e6f6ff;font:600 13px sans-serif;text-align:center;box-shadow:0 0 18px rgba(0,229,255,.3)";document.body.appendChild(d);setTimeout(function(){d.remove()},3800)}
function nm(id){return NAMES[id]||"Utilisateur"}
function names(ids){var m=ids.filter(function(i,k){return i&&!NAMES[i]&&ids.indexOf(i)===k});if(!m.length)return Promise.resolve();return api("profiles?select=id,pseudo&id=in.("+m.join(",")+")").then(function(r){arr(r).forEach(function(p){NAMES[p.id]=p.pseudo})})}
function play(v){var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play().catch(function(){})})}
var st=document.createElement("style");st.textContent="#tvFeed{position:fixed;inset:0;z-index:100000;background:#02060f;color:#e6f6ff;font-family:sans-serif}"
+"#tvFeed .tvh{position:absolute;top:0;left:0;right:0;z-index:4;display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 8px) 10px 12px;background:linear-gradient(rgba(2,6,15,.9),transparent)}"
+"#tvFeed .gl{border:1px solid rgba(0,229,255,.38);background:rgba(8,22,50,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#e6f6ff;box-shadow:0 0 12px rgba(0,229,255,.18)}"
+"#tvFeed .tvh .sq{width:38px;height:38px;border-radius:50%;padding:0;display:grid;place-items:center;flex:none}"
+"#tvFeed .tvh .tvp{border:0;background:linear-gradient(135deg,#00e5ff,#2f6fe0);box-shadow:0 0 16px rgba(0,229,255,.55);color:#fff}"
+"#tvFeed .tvt{flex:1;min-width:0;display:flex;padding:3px;border-radius:22px;gap:2px}"
+"#tvFeed .tvt button{flex:1;border:0;background:transparent;color:#9ec5ff;height:32px;border-radius:18px;font:700 10.5px "+FO+";letter-spacing:.4px;text-transform:uppercase;white-space:nowrap;padding:0 4px}"
+"#tvFeed .tvt button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;box-shadow:0 0 12px rgba(0,229,255,.5)}"
+"#tvScr{height:100%;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch}#tvScr::-webkit-scrollbar{display:none}"
+"#tvScr .tvi{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;display:grid;place-items:center;background:#02060f;overflow:hidden}"
+"#tvScr video{width:100%;height:100%;object-fit:cover;background:#02060f}"
+"#tvScr .tvi::after{content:'';position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,229,255,.035) 0 1px,transparent 1px 4px)}"
+"#tvScr .tvg{position:absolute;left:0;right:0;bottom:0;height:46%;pointer-events:none;background:linear-gradient(transparent,rgba(2,6,15,.88))}"
+"#tvScr .tvl{position:absolute;z-index:2;display:flex;flex-direction:column;align-items:center;gap:12px;color:#7fdcff;font:600 11px "+FO+";letter-spacing:1px;text-align:center;padding:0 30px}"
+"#tvFeed .sp{width:40px;height:40px;border-radius:50%;border:3px solid rgba(0,229,255,.18);border-top-color:#00e5ff;animation:tvsp .8s linear infinite;box-shadow:0 0 14px rgba(0,229,255,.4)}@keyframes tvsp{to{transform:rotate(360deg)}}"
+"#tvScr .tvc{position:absolute;left:14px;right:84px;bottom:calc(env(safe-area-inset-bottom,0px) + 20px);z-index:2;font-size:14px;line-height:1.4;text-shadow:0 1px 6px #000}"
+"#tvScr .tvn{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px}#tvScr .tvn b{font:800 14px "+FO+";letter-spacing:.5px;color:#fff}"
+"#tvScr .tvfc{font:600 10px "+FO+";color:#7fdcff;letter-spacing:.5px}"
+"#tvScr .tvf{border:1px solid #00e5ff;background:rgba(0,229,255,.1);color:#00e5ff;border-radius:12px;padding:3px 10px;font:700 10px "+FO+";letter-spacing:.5px;text-transform:uppercase}#tvScr .tvf.on{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.3);color:#e6f6ff}"
+"#tvScr .tvx{max-height:44px;overflow:hidden;color:#dff4ff}"
+"#tvScr .tvr{position:absolute;right:10px;bottom:calc(env(safe-area-inset-bottom,0px) + 70px);z-index:3;display:flex;flex-direction:column;align-items:center;gap:14px}"
+"#tvScr .rb{width:50px;border:0;background:none;color:#e6f6ff;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0}"
+"#tvScr .rb .ic{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:#e6f6ff;border:1px solid rgba(0,229,255,.4);background:rgba(8,22,50,.55);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);box-shadow:0 0 12px rgba(0,229,255,.2);transition:transform .15s}"
+"#tvScr .rb:active .ic{transform:scale(.88)}#tvScr .rb.on .ic{color:#ff3d6e;background:rgba(255,61,110,.2);border-color:#ff3d6e;box-shadow:0 0 16px rgba(255,61,110,.6)}"
+"#tvScr .rb span{font:700 10.5px "+FO+";text-shadow:0 1px 4px #000}"
+"#tvScr .tvb{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.12);z-index:3}#tvScr .tvb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#00e5ff,#2f6fe0);box-shadow:0 0 8px #00e5ff}"
+"#tvFeed .tve{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:30px;color:#7fdcff;font:600 12px "+FO+";letter-spacing:.8px;line-height:1.7}#tvFeed .tve span{white-space:pre-line}#tvFeed .tve .bi{color:#00e5ff;filter:drop-shadow(0 0 12px rgba(0,229,255,.6))}"
+"#tvSh{position:absolute;left:0;right:0;bottom:0;height:68%;z-index:6;background:rgba(5,12,28,.97);color:#e6f6ff;border-radius:22px 22px 0 0;border-top:1px solid rgba(0,229,255,.5);box-shadow:0 -8px 30px rgba(0,229,255,.18);display:flex;flex-direction:column}"
+"#tvSh .shh{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(0,229,255,.18)}#tvSh .shh b{font:800 12px "+FO+";letter-spacing:1.5px;color:#00e5ff;text-transform:uppercase}#tvSh .shh button{border:1px solid rgba(0,229,255,.4);background:rgba(8,22,50,.7);color:#e6f6ff;border-radius:50%;width:32px;height:32px;padding:0;display:grid;place-items:center}"
+"#tvSh .shl{flex:1;overflow-y:auto;padding:8px 16px}#tvSh .shn{text-align:center;color:#6c8bb3;padding:30px 0;font-size:13px}"
+"#tvSh .shc{padding:9px 0;font-size:14px;line-height:1.4;border-bottom:1px solid rgba(255,255,255,.05)}#tvSh .shc b{display:block;font:700 11px "+FO+";color:#00e5ff;margin-bottom:2px}#tvSh .shc button{border:0;background:none;color:#ff6b8a;font-size:12px;padding:2px 0}"
+"#tvSh .shi{display:flex;gap:8px;padding:10px 12px calc(env(safe-area-inset-bottom,0px) + 10px);border-top:1px solid rgba(0,229,255,.18)}#tvSh .shi input{flex:1;border:1px solid rgba(0,229,255,.3);background:rgba(8,22,50,.7);color:#e6f6ff;border-radius:20px;padding:10px 14px;font-size:15px;outline:none}"
+"#tvSh .shi button{border:0;border-radius:20px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;font:700 12px "+FO+";padding:0 16px;box-shadow:0 0 12px rgba(0,229,255,.4)}"
+"#tvCap{position:fixed;inset:0;z-index:100050;background:rgba(2,6,15,.94);display:flex;align-items:center;justify-content:center;padding:18px;color:#e6f6ff;font-family:sans-serif}"
+"#tvCap .bx{width:100%;max-width:400px;border-radius:22px;padding:16px;background:rgba(8,22,50,.8);border:1px solid rgba(0,229,255,.4);box-shadow:0 0 30px rgba(0,229,255,.2)}"
+"#tvCap .ct{font:800 13px "+FO+";letter-spacing:2px;color:#00e5ff;margin-bottom:10px}"
+"#tvCap .cp{display:block;height:34vh;max-width:100%;margin:0 auto 6px;border-radius:14px;border:1px solid rgba(0,229,255,.4);background:#000;box-shadow:0 0 16px rgba(0,229,255,.25)}"
+"#tvCap .ci{text-align:center;font:600 11px "+FO+";color:#7fdcff;margin-bottom:8px}"
+"#tvCap textarea{width:100%;box-sizing:border-box;height:70px;border:1px solid rgba(0,229,255,.3);background:rgba(2,6,15,.7);color:#e6f6ff;border-radius:12px;padding:10px;font-size:15px;resize:none;outline:none}"
+"#tvCap .cs{min-height:18px;margin:8px 0 4px;font-size:13px;line-height:1.4;color:#7fdcff}#tvCap .cs.er{color:#ff8aa3}"
+"#tvCap .cb{height:4px;border-radius:3px;background:rgba(255,255,255,.1);overflow:hidden;visibility:hidden;margin-bottom:8px}#tvCap .cb.on{visibility:visible}#tvCap .cb i{display:block;height:100%;width:40%;background:linear-gradient(90deg,#00e5ff,#2f6fe0);box-shadow:0 0 8px #00e5ff;animation:tvbar 1.1s ease-in-out infinite alternate}@keyframes tvbar{from{margin-left:0}to{margin-left:60%}}"
+"#tvCap .ac{display:flex;gap:8px}#tvCap .ac button{flex:1;border:0;border-radius:12px;padding:12px;font:800 12px "+FO+";letter-spacing:.8px;background:rgba(255,255,255,.1);color:#e6f6ff;text-transform:uppercase}#tvCap .ac .go{background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 0 14px rgba(0,229,255,.45)}#tvCap .ac button:disabled{opacity:.5}"
+"#tmEd{background:#02060f!important}#tmEd .h b{font-family:"+FO+";color:#00e5ff;letter-spacing:3px}#tmEd .p{background:rgba(8,20,45,.95)!important;border-top:1px solid rgba(0,229,255,.35)}#tmEd .lb{font-family:"+FO+";font-size:11px!important;letter-spacing:.5px}#tmEd .fl button{font-family:"+FO+";font-size:11px!important;border:1px solid rgba(0,229,255,.25)}#tmEd .fl button.on{box-shadow:0 0 12px rgba(0,229,255,.5)}"
+"#scrDecouvrir .dc-seg .tv-b{white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:5px}";document.head.appendChild(st);
function stopAll(){try{document.querySelectorAll("video").forEach(function(x){x.pause()})}catch(e){}}
function killVids(root){root.querySelectorAll("video").forEach(function(v){v.pause();v.removeAttribute("src");v.load()})}
function close(){ios.forEach(function(o){o.disconnect()});ios=[];var o=document.getElementById("tvFeed");if(o){killVids(o);o.remove()}}
function msg(sc,ic,t,spin){sc.innerHTML="";var e=E("div","tve");if(spin)e.appendChild(E("div","sp"));else if(ic){var b=E("div","bi");b.innerHTML=svg(ic,48);e.appendChild(b)}e.appendChild(E("span","",t));sc.appendChild(e)}
function fbRefresh(a){var n=FC[a]||0;(FB[a]||[]).forEach(function(o){o.b.textContent=FM[a]?"Abonné ✓":"+ S'abonner";o.b.className="tvf"+(FM[a]?" on":"");o.c.textContent=n+" abonné"+(n>1?"s":"")})}
function follow(a){var me=uid();if(!me||a===me)return;if(FM[a]){delete FM[a];FC[a]=Math.max(0,(FC[a]||1)-1);api("follows?follower=eq."+me+"&followed=eq."+a,{method:"DELETE"})}else{FM[a]=1;FC[a]=(FC[a]||0)+1;api("follows",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({follower:me,followed:a})}).then(function(r){if(r&&!Array.isArray(r)&&(r.code||r.message)){delete FM[a];FC[a]=Math.max(0,(FC[a]||1)-1);fbRefresh(a);toast("Abonnements pas encore activés")}})}fbRefresh(a)}
function sheet(p,cb){var ov=document.getElementById("tvFeed"),old=document.getElementById("tvSh");if(old)old.remove();
var sh=E("div");sh.id="tvSh";var hd=E("div","shh"),tt=E("b","","Commentaires"),x=E("button");x.innerHTML=svg("x",16);x.onclick=function(){sh.remove()};hd.appendChild(tt);hd.appendChild(x);
var ls=E("div","shl"),rw=E("div","shi"),ip=E("input");ip.placeholder="Ajouter un commentaire…";ip.maxLength=500;var sd=E("button","","Envoyer");rw.appendChild(ip);rw.appendChild(sd);
sh.appendChild(hd);sh.appendChild(ls);sh.appendChild(rw);ov.appendChild(sh);
var me=uid(),CL=[];
function paint(){ls.innerHTML="";tt.textContent=CL.length+" commentaire"+(CL.length>1?"s":"");if(!CL.length)ls.appendChild(E("div","shn","Aucun commentaire. Sois le premier !"));CL.forEach(function(c){var r=E("div","shc");r.appendChild(E("b","","@"+nm(c.author)));r.appendChild(E("span","",c.body));if(c.author===me){var d=E("button","","Supprimer");d.onclick=function(){api("video_comments?id=eq."+c.id,{method:"DELETE"});CL.splice(CL.indexOf(c),1);p.cc=CL.length;cb();paint()};r.appendChild(d)}ls.appendChild(r)})}
api("video_comments?select=id,author,body,created_at&video_id=eq."+p.id+"&order=created_at.asc&limit=100").then(function(r){CL=arr(r);return names(CL.map(function(c){return c.author}).concat([me]))}).then(function(){p.cc=CL.length;cb();paint()});
sd.onclick=function(){var v=ip.value.trim();if(!v||!me)return;sd.disabled=true;api("video_comments",{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({video_id:p.id,author:me,body:v})}).then(function(r){sd.disabled=false;if(Array.isArray(r)&&r[0]){CL.push(r[0]);p.cc=CL.length;ip.value="";cb();paint();ls.scrollTop=ls.scrollHeight}else toast("Envoi impossible")})}}
function mk(n){var b=E("button","rb"),i=E("div","ic"),s=E("span");i.innerHTML=svg(n,24);b.appendChild(i);b.appendChild(s);return{b:b,i:i,s:s}}
function render(list,sc){var me=uid(),by={},au=[],ids=list.map(function(p){by[p.id]=p;if(au.indexOf(p.author)<0)au.push(p.author);return p.id}).join(",");
Promise.all([names(au),api("video_likes?select=video_id,user_id&video_id=in.("+ids+")"),api("video_comments?select=video_id&video_id=in.("+ids+")"),api("follows?select=follower,followed&followed=in.("+au.join(",")+")")]).then(function(b){
list.forEach(function(p){p.lk=0;p.me=false;p.cc=0});
arr(b[1]).forEach(function(x){var p=by[x.video_id];if(p){p.lk++;if(x.user_id===me)p.me=true}});
arr(b[2]).forEach(function(x){var p=by[x.video_id];if(p)p.cc++});
FOK=Array.isArray(b[3]);FC={};FM={};FB={};if(FOK)b[3].forEach(function(x){FC[x.followed]=(FC[x.followed]||0)+1;if(x.follower===me)FM[x.followed]=1});
sc.innerHTML="";
function load(it){if(it.__ld)return;it.__ld=1;var v=it.__v,path=it.__p,tried=0,tm;
function ok(){clearTimeout(tm);if(it.__l.parentNode)it.__l.remove();if(it.__act)play(v)}
function bad(m){clearTimeout(tm);it.__sp.style.display="none";it.__lt.textContent="VIDÉO INDISPONIBLE"+(m?" ("+m+")":"");if(!it.__l.parentNode)it.appendChild(it.__l)}
function blobWay(){if(tried++)return;clearTimeout(tm);it.__sp.style.display="";it.__lt.textContent="CHARGEMENT…";var ty=/webm$/.test(path)?"video/webm":"video/mp4";
Promise.resolve().then(function(){return fetch(window.tgUrl(path,"video"))}).then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.blob()}).then(function(bl){v.onerror=function(){bad("lecture "+(v.error?v.error.code:"?"))};v.onloadeddata=ok;v.src=URL.createObjectURL(new Blob([bl],{type:ty}))}).catch(function(e){v.onerror=function(){bad(e&&e.message?e.message:"")};v.onloadeddata=ok;v.src="https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+path})}
v.onloadeddata=ok;v.onerror=blobWay;
try{v.src=window.tgUrl(path,"video")}catch(e){return blobWay()}
tm=setTimeout(function(){if(v.readyState<1)blobWay()},15000)}
var ioP=new IntersectionObserver(function(es){es.forEach(function(e){var it=e.target;if(e.isIntersecting&&e.intersectionRatio>.6){it.__act=1;load(it);if(it.__v.src&&it.__v.readyState>=2)play(it.__v)}else{it.__act=0;it.__v.pause()}})},{root:sc,threshold:[0,.6]});
var ioL=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)load(e.target)})},{root:sc,rootMargin:"100% 0px"});
ios.push(ioP,ioL);
list.forEach(function(p){var it=E("div","tvi"),v=E("video"),l=E("div","tvl"),sp=E("div","sp"),lt=E("span","","CHARGEMENT…");l.appendChild(sp);l.appendChild(lt);
v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");v.loop=true;v.preload="auto";v.poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
v.onloadedmetadata=function(){v.style.objectFit=v.videoHeight>=v.videoWidth?"cover":"contain"};
var pb=E("div","tvb"),pi=E("i");pb.appendChild(pi);v.ontimeupdate=function(){if(v.duration&&isFinite(v.duration))pi.style.width=(v.currentTime/v.duration*100)+"%"};
var rail=E("div","tvr"),lk=mk("heart"),cm=mk("chat");
function upd(){lk.b.className="rb"+(p.me?" on":"");lk.i.innerHTML=svg("heart",24,p.me);lk.s.textContent=p.lk;cm.s.textContent=p.cc}
function doLike(){if(!me)return toast("Connecte-toi");if(p.me){p.me=false;p.lk=Math.max(0,p.lk-1);api("video_likes?video_id=eq."+p.id+"&user_id=eq."+me,{method:"DELETE"})}else{p.me=true;p.lk++;api("video_likes",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({video_id:p.id,user_id:me})})}upd()}
lk.b.onclick=function(e){e.stopPropagation();doLike()};cm.b.onclick=function(e){e.stopPropagation();sheet(p,upd)};
rail.appendChild(lk.b);rail.appendChild(cm.b);
if(p.author===me){var dl=mk("trash");dl.b.onclick=function(e){e.stopPropagation();if(confirm("Supprimer cette vidéo ?")){api("videos?id=eq."+p.id,{method:"DELETE"});v.pause();it.remove()}};rail.appendChild(dl.b)}
upd();
var c=E("div","tvc"),n=E("div","tvn");n.appendChild(E("b","","@"+nm(p.author)));
if(FOK){var fc=E("span","tvfc"),fb=E("button","tvf");(FB[p.author]=FB[p.author]||[]).push({b:fb,c:fc});if(p.author!==me){fb.onclick=function(e){e.stopPropagation();follow(p.author)};n.appendChild(fb)}n.appendChild(fc);fbRefresh(p.author)}
c.appendChild(n);c.appendChild(E("div","tvx",p.caption||""));
it.appendChild(v);it.appendChild(E("div","tvg"));it.appendChild(l);it.appendChild(rail);it.appendChild(c);it.appendChild(pb);
it.__v=v;it.__l=l;it.__lt=lt;it.__sp=sp;it.__p=p.path;
var lt2=0,tm;it.onclick=function(){var t=Date.now();if(t-lt2<320){clearTimeout(tm);lt2=0;if(!p.me)doLike();return}lt2=t;tm=setTimeout(function(){if(v.muted&&!v.paused){v.muted=false;return}if(v.paused)play(v);else v.pause()},320)};
sc.appendChild(it);ioP.observe(it);ioL.observe(it)})})}
