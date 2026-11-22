(function(){if(window.__tvf)return;window.__tvf=1;
var st=document.createElement("style");
st.textContent=".tvfb{position:absolute;right:20px;z-index:6;width:40px;height:40px;border:0;border-radius:12px;color:#00e5ff;background:rgba(5,11,24,.62);box-shadow:inset 0 0 0 1px rgba(0,229,255,.5),0 0 12px rgba(0,229,255,.3);font:800 17px sans-serif;backdrop-filter:blur(6px)}";
document.head.appendChild(st);
function P(v,k,x){v.style.setProperty(k,x,"important")}
function geo(v){if(v.__g)return;
P(v,"top","auto");P(v,"height","1px");
var b=parseFloat(getComputedStyle(v).bottom)||0;
v.style.removeProperty("top");v.style.removeProperty("height");
var t=parseFloat(getComputedStyle(v).top)||0;
v.__g={t:t,b:b}}
function fit(v){var p=v.parentElement;if(!p||!p.clientHeight)return;
geo(v);var g=v.__g,h=p.clientHeight-g.t-g.b;
if(h>120)P(v,"height",h+"px");
var land=v.videoWidth>v.videoHeight*1.05;
var m=v.__m||(land?"contain":"cover");
P(v,"object-fit",m);P(v,"background","#000");
P(v,"transform",m==="contain"?"none":"scale(1.045)");
if(v.__bt){v.__bt.style.top=(g.t+10)+"px";v.__bt.textContent=m==="contain"?"⤢":"⤡"}}
function btn(v){var it=v.closest(".tvi");if(!it||v.__bt)return;
var b=document.createElement("button");b.type="button";b.className="tvfb";b.setAttribute("aria-label","Ajuster la vidéo");
b.onclick=function(e){e.stopPropagation();e.preventDefault();
var cur=v.style.getPropertyValue("object-fit");v.__m=cur==="contain"?"cover":"contain";fit(v)};
it.appendChild(b);v.__bt=b}
function scan(){document.querySelectorAll(".tvi video").forEach(function(v){
if(!v.__f){v.__f=1;v.addEventListener("loadedmetadata",function(){fit(v)});v.addEventListener("loadeddata",function(){fit(v)})}
btn(v);fit(v)})}
window.addEventListener("resize",function(){document.querySelectorAll(".tvi video").forEach(function(v){v.__g=null;fit(v)})});
setInterval(scan,700);
})();
