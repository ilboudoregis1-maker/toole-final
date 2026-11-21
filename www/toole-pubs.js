(function(){
if(window.__tpub)return;window.__tpub=1;
var ADS=null,T0=0,EVERY=6,tm=null,IO=null,IOR=null;
function A(path){try{if(typeof api!=="function")return Promise.resolve(null);return Promise.resolve(api(path,{})).then(function(r){if(r&&typeof r.json==="function")return r.json().catch(function(){return null});return r}).catch(function(){return null})}catch(e){return Promise.resolve(null)}}
function q(cols){return A("/rest/v1/pubs_entreprise?select="+cols+"&order=created_at.desc&limit=10")}
function loadAds(){
if(ADS&&Date.now()-T0<60000)return Promise.resolve(ADS);
return q("id,titre,texte,image_ref,video_path,lien").then(function(r){return Array.isArray(r)?r:q("id,titre,texte,image_ref,lien")}).then(function(r){ADS=Array.isArray(r)?r.filter(function(a){return a&&a.titre}):[];T0=Date.now();return ADS})}
var st=document.createElement("style");
st.textContent="#tvScr .tvad{position:relative;height:100%;scroll-snap-align:start;scroll-snap-stop:always;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;box-sizing:border-box;text-align:center;color:#fff;background:linear-gradient(160deg,#101826,#1b2a4a)}"
+"#tvScr .tvad .ab{position:absolute;top:16px;left:16px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.18);font-size:12px;font-weight:700}"
+"#tvScr .tvad img{max-width:100%;max-height:45%;border-radius:14px;object-fit:contain}"
+"#tvScr .tvad video{max-width:100%;max-height:55%;border-radius:14px;background:#000}"
+"#tvScr .tvad .mu{position:absolute;top:12px;right:16px;border:0;border-radius:999px;padding:6px 12px;background:rgba(255,255,255,.18);color:#fff;font-size:16px}"
+"#tvScr .tvad h3{margin:0;font-size:22px}#tvScr .tvad p{margin:0;font-size:15px;opacity:.85;max-width:90%}"
+"#tvScr .tvad a{display:inline-block;margin-top:6px;padding:12px 22px;border-radius:12px;color:#fff;font-weight:800;text-decoration:none;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}";
document.head.appendChild(st);
function okV(p){return typeof p==="string"&&/^[A-Za-z0-9_\/-]+\.(mp4|webm)$/.test(p)}
function mk(a){
var d=document.createElement("div");d.className="tvad";d.setAttribute("data-pub",a.id);
var b=document.createElement("span");b.className="ab";b.textContent="Publicité";d.appendChild(b);
if(okV(a.video_path)&&typeof window.tgUrl==="function"){
var v=document.createElement("video");v.muted=true;v.defaultMuted=true;v.loop=true;v.preload="none";
v.setAttribute("playsinline","");v.setAttribute("webkit-playsinline","");v.setAttribute("data-p",a.video_path);
var mu=document.createElement("button");mu.className="mu";mu.textContent="🔇";
mu.onclick=function(){v.muted=!v.muted;mu.textContent=v.muted?"🔇":"🔊"};
v.onerror=function(){v.remove();if(mu.parentNode)mu.remove()};
d.appendChild(v);d.appendChild(mu)}
else if(typeof a.image_ref==="string"&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/.test(a.image_ref)){var im=document.createElement("img");im.alt="";im.src=a.image_ref;d.appendChild(im)}
var h=document.createElement("h3");h.textContent=a.titre;d.appendChild(h);
if(a.texte){var p=document.createElement("p");p.textContent=a.texte;d.appendChild(p)}
if(typeof a.lien==="string"&&/^https:\/\//.test(a.lien)){var l=document.createElement("a");l.href=a.lien;l.target="_blank";l.rel="noopener noreferrer";l.textContent="En savoir plus";d.appendChild(l)}
return d}
function watch(d,sc){
if(!d.querySelector("video"))return;
if(!IO||IOR!==sc){if(IO)IO.disconnect();IOR=sc;IO=new IntersectionObserver(function(es){es.forEach(function(e){var x=e.target.querySelector("video");if(!x)return;
if(e.isIntersecting&&e.intersectionRatio>.6){if(!x.src){try{x.src=window.tgUrl(x.getAttribute("data-p"),"video")}catch(err){if(x.onerror)x.onerror();return}}var pr=x.play();if(pr&&pr.catch)pr.catch(function(){})}
else{try{x.pause()}catch(err){}}})},{root:sc,threshold:[0,.6]})}
IO.observe(d)}
function place(){
var sc=document.getElementById("tvScr");if(!sc)return;
loadAds().then(function(ads){
if(!sc.isConnected)return;
var vids=sc.querySelectorAll(".tvi"),n=vids.length;
var want=ads.length?Math.floor((n-1)/EVERY):0;if(want<0)want=0;
var cur=sc.querySelectorAll(".tvad");
if(cur.length===want)return;
cur.forEach(function(x){if(IO)IO.unobserve(x);x.remove()});
for(var k=1;k<=want;k++){var ref=vids[k*EVERY-1];if(ref&&ref.parentNode){var ad=mk(ads[(k-1)%ads.length]);ref.parentNode.insertBefore(ad,ref.nextSibling);watch(ad,sc)}}})}
new MutationObserver(function(){if(!document.getElementById("tvScr"))return;clearTimeout(tm);tm=setTimeout(place,200)}).observe(document.body,{childList:true,subtree:true});
})();
