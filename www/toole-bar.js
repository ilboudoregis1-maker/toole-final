(function(){
var RX=/photo|vid|fich|file|image|doc|galer|attach/i,NO=/voc|mic|audio|send|envoy/i;
var s=document.createElement("style");
s.textContent=".tsh{display:none!important}"
+"#scrChat .bar{display:flex!important;align-items:center;gap:8px}"
+"#scrChat .bar input{flex:1;min-width:0}"
+".tsplus{flex:0 0 auto;width:42px;height:42px;border-radius:50%;border:0;background:var(--main,#00bcd4);color:#fff;font-size:26px;line-height:1;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,188,212,.35)}"
+".tsov{position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}"
+".tssh{width:100%;background:var(--pro-surface,#fff);color:var(--pro-ink,#0b2a30);border-top:4px solid var(--main,#00bcd4);border-radius:22px 22px 0 0;padding:18px 16px 26px;animation:tsup .2s ease-out}"
+"@keyframes tsup{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}"
+".tsg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}"
+".tsi{display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:0;color:inherit;font-size:13px}"
+".tsi i{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,var(--main,#00bcd4),#0097a7);display:flex;align-items:center;justify-content:center;color:#fff}"
+".tsi i svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:2}"
+".sh{background:var(--pro-surface,#fff)!important;color:var(--pro-ink,#0b2a30)!important;border-top:4px solid var(--main,#00bcd4)!important}"
+".sh .sht{color:var(--main,#00bcd4)!important}"
+".toast,#toast{background:var(--main,#00bcd4)!important;color:#fff!important;border-radius:14px!important}";
document.head.appendChild(s);
function lab(b){return(b.getAttribute("aria-label")||b.title||"").trim()}
function fix(){
var bar=document.querySelector("#scrChat .bar");if(!bar)return;
[].forEach.call(bar.querySelectorAll(".tsplus"),function(b){b.remove()});
[].forEach.call(bar.querySelectorAll("button.tsh"),function(b){b.classList.remove("tsh")})}
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
fix();
})();

/* Barre du bas : réduit automatiquement la police (la même pour tous les libellés) si un libellé ne tient pas dans son onglet */
(function(){
var q=0,BASE=10.5,MIN=7.5;
function fit(){q=0;
var n=document.getElementById("v4nav");if(!n||!n.classList.contains("on"))return;
var sp=[].slice.call(n.querySelectorAll("button.t span")),fs=BASE;
function set(v){sp.forEach(function(e){e.style.setProperty("font-size",v+"px","important")})}
function over(){return sp.some(function(e){return e.scrollWidth>e.clientWidth+0.5})}
set(fs);while(over()&&fs>MIN){fs-=0.5;set(fs)}}
function later(){if(q)return;q=1;requestAnimationFrame(fit)}
new MutationObserver(later).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
window.addEventListener("resize",later);window.addEventListener("orientationchange",later);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(later);
later();
})();
