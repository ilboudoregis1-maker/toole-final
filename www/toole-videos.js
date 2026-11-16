/* TÕÕLé — Explorer : fil de vidéos plein écran façon TikTok */
(function(){"use strict";if(window.__tvid)return;window.__tvid=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function api(p){var s=sess();return fetch(U+"/rest/v1/"+p,{headers:{apikey:K,Authorization:"Bearer "+((s&&s.access_token)||K)}}).then(function(r){return r.json()}).catch(function(){return[]})}
function toast(m){var d=document.createElement("div");d.textContent=m;d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100010;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
function src(path){return fetch(window.tgUrl(path,"video")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(bl){return URL.createObjectURL(new Blob([bl],{type:/webm$/.test(path)?"video/webm":"video/mp4"}))}).catch(function(){return "https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+path})}
var st=document.createElement("style");st.textContent="#tvFeed{position:fixed;inset:0;z-index:100000;background:#000;color:#fff;font-family:sans-serif}#tvFeed .tvh{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,0px) + 8px) 12px 8px;background:linear-gradient(#000a,transparent)}#tvFeed .tvh b{font-size:16px;letter-spacing:1px}#tvFeed .tvh button{width:40px;height:40px;border-radius:50%;border:0;background:rgba(255,255,255,.18);color:#fff;font-size:22px;line-height:1}#tvFeed .tvh .tvp{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}#tvScr{height:100%;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch}#tvScr .tvi{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;display:grid;place-items:center;background:#000}#tvScr video{width:100%;height:100%;object-fit:contain}#tvScr .tvc{position:absolute;left:14px;right:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);font-size:14px;line-height:1.4;text-shadow:0 1px 6px #000;max-height:30%;overflow:hidden}#tvScr .tvl{position:absolute;color:#9ec5ff;font-size:13px}#tvFeed .tve{height:100%;display:grid;place-items:center;text-align:center;padding:30px;color:#9ec5ff}#scrDecouvrir .dc-seg .tv-b{white-space:nowrap}";document.head.appendChild(st);
function stopAll(){try{document.querySelectorAll("video").forEach(function(x){x.pause()})}catch(e){}}
function close(){var o=document.getElementById("tvFeed");if(o){o.querySelectorAll("video").forEach(function(v){v.pause();v.removeAttribute("src");v.load()});o.remove()}}
function open(){close();stopAll();
var ov=document.createElement("div");ov.id="tvFeed";
var h=document.createElement("div");h.className="tvh";
var bk=document.createElement("button");bk.textContent="‹";bk.onclick=close;
var t=document.createElement("b");t.textContent="VIDÉOS";
var pl=document.createElement("button");pl.className="tvp";pl.textContent="+";pl.onclick=function(){close();var sg=document.querySelector("#scrDecouvrir .dc-seg button[data-k=posts]");if(sg)sg.click();setTimeout(function(){var c=document.querySelector("#scrDecouvrir .dc-comp");if(c)c.scrollIntoView({behavior:"smooth",block:"center"})},350);toast("Appuie sur 🎬 Vidéo pour envoyer la tienne")};
h.appendChild(bk);h.appendChild(t);h.appendChild(pl);
var sc=document.createElement("div");sc.id="tvScr";
ov.appendChild(h);ov.appendChild(sc);document.body.appendChild(ov);
var lo=document.createElement("div");lo.className="tve";lo.textContent="Chargement…";sc.appendChild(lo);
function load(it){if(it.__ld)return;it.__ld=1;src(it.__p).then(function(u){it.__v.src=u;it.__l.remove();if(it.__act)play(it.__v)}).catch(function(){it.__l.textContent="Vidéo indisponible"})}
function play(v){var p=v.play();if(p&&p.catch)p.catch(function(){v.muted=true;v.play().catch(function(){})})}
var ioP=new IntersectionObserver(function(es){es.forEach(function(e){var it=e.target;if(e.isIntersecting&&e.intersectionRatio>.6){it.__act=1;load(it);if(it.__v.src)play(it.__v)}else{it.__act=0;it.__v.pause()}})},{root:sc,threshold:[0,.6]});
var ioL=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)load(e.target)})},{root:sc,rootMargin:"100% 0px"});
api("posts?select=id,author,body,image_url,created_at&image_url=like.tgv:*&order=created_at.desc&limit=30").then(function(r){
sc.innerHTML="";
if(!Array.isArray(r)||!r.length){var e=document.createElement("div");e.className="tve";e.textContent="Aucune vidéo pour l'instant. Sois le premier : appuie sur + pour en envoyer une !";sc.appendChild(e);return}
r.forEach(function(p){var it=document.createElement("div");it.className="tvi";
var v=document.createElement("video");v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");v.loop=true;v.preload="auto";
var l=document.createElement("div");l.className="tvl";l.textContent="Chargement…";
var c=document.createElement("div");c.className="tvc";c.textContent=p.body||"";
it.appendChild(v);it.appendChild(l);it.appendChild(c);
it.__v=v;it.__l=l;it.__p=p.image_url.slice(4);
it.onclick=function(){if(v.muted&&!v.paused){v.muted=false;return}if(v.paused)play(v);else v.pause()};
sc.appendChild(it);ioP.observe(it);ioL.observe(it)})})}
function ensure(){var sg=document.querySelector("#scrDecouvrir .dc-seg");if(sg&&!sg.querySelector(".tv-b")){var b=document.createElement("button");b.type="button";b.className="tv-b";b.textContent="🎬 Vidéos";b.onclick=open;sg.appendChild(b)}}
setInterval(ensure,800);ensure();
})();
