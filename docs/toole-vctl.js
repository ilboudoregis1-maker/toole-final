(function(){
function mk(t){var b=document.createElement("button");b.type="button";
b.textContent=t;b.style.cssText="width:34px;height:34px;border-radius:50%;"+
"border:0;background:rgba(0,0,0,.55);color:#fff;font-size:16px;padding:0";
return b}
function add(){var s=document.getElementById("tsS"),v=document.getElementById("tsV");
if(!s||!v||document.getElementById("tsCtl"))return;
var c=document.createElement("div"),p=mk("⏯"),m=mk("🔊");c.id="tsCtl";
c.style.cssText="position:absolute;right:6px;bottom:6px;display:none;gap:6px;z-index:5";
v.style.objectFit="contain";v.style.background="#000";
m.textContent=v.muted?"🔇":"🔊";
p.onclick=function(e){e.stopPropagation();if(v.paused)v.play();else v.pause()};
m.onclick=function(e){e.stopPropagation();v.muted=!v.muted};
["pointerdown","touchstart","touchend"].forEach(function(n){
c.addEventListener(n,function(e){e.stopPropagation()})});
v.addEventListener("volumechange",function(){m.textContent=v.muted?"🔇":"🔊"});
v.addEventListener("loadeddata",function(){c.style.display="flex";
if(!v.__u){v.__u=1;v.muted=false}});
c.appendChild(p);c.appendChild(m);s.appendChild(c)}
new MutationObserver(add).observe(document.body,{childList:true,subtree:true});
})();
