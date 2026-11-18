(function(){
var s=document.createElement("style");
s.textContent="#stv{background:#000!important;animation:tsfade .25s ease-out}"+
"@keyframes tsfade{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:none}}"+
".shbg{z-index:100001!important}";
document.head.appendChild(s);
function kid(g,f){return [].slice.call(g.children).filter(f)[0]}
function fix(){var w=document.getElementById("stv");
if(!w||w.dataset.f||!w.firstElementChild)return;w.dataset.f=1;
var g=w.firstElementChild;
var h=kid(g,function(c){return c.style.zIndex==="2"});
if(h){var sp=h.querySelector("span");
if(sp)sp.style.cssText+=";min-width:0;white-space:nowrap;overflow:hidden;"+
"text-overflow:ellipsis;font-weight:600;font-size:15px";
[].forEach.call(h.querySelectorAll("button"),function(b){
b.style.whiteSpace="nowrap";b.style.flex="0 0 auto"});
var b0=h.querySelector("button");
if(b0&&b0.textContent.indexOf("Vues")>-1){b0.style.fontSize="13px";b0.style.padding="5px 10px"}}
var p=kid(g,function(c){return c.style.zIndex==="3"});
if(p){p.style.height="4px";p.style.background="rgba(255,255,255,.28)";
if(p.firstElementChild)p.firstElementChild.style.transition="width .25s linear"}
var c=kid(g,function(c){return c.style.bottom==="70px"});
if(c)c.style.cssText+=";left:14px;right:14px;border-radius:16px;"+
"background:rgba(0,0,0,.45);backdrop-filter:blur(6px);padding:10px 14px"}
new MutationObserver(fix).observe(document.body,{childList:true});
var ov=window.openViewers;
if(typeof ov==="function")window.openViewers=function(){
var v=document.querySelector("#stv video");if(v)v.pause();window.__tsHold=true;
var r=ov.apply(this,arguments),seen=false,mo=new MutationObserver(function(){
if(document.getElementById("shBg")){seen=true;return}
if(seen)rel()});
function rel(){mo.disconnect();window.__tsHold=false;
var q=document.querySelector("#stv video");if(q)q.play().catch(function(){});
var w=document.getElementById("stv");if(w&&w._au)w._au.play().catch(function(){})}
mo.observe(document.body,{childList:true});setTimeout(function(){if(!seen)rel()},6000);
return r};
})();
