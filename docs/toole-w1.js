/* TÕÕLé v5 : petits ajouts (avatars commentaires, aperçu filtres, pause montage) */
(function(){"use strict";if(window.__tw1)return;window.__tw1=1;
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function tick(){try{
document.querySelectorAll("#tvSh .shc").forEach(function(r){if(r.__a)return;r.__a=1;var b=r.querySelector("b");r.insertBefore(E("div","cav",(b?b.textContent:"?").charAt(0).toUpperCase()),r.firstChild)});
var ed=document.getElementById("tmEd");if(ed&&!ed.__v5){var v=ed.querySelector("video"),vw=ed.querySelector(".vw"),fl=ed.querySelector(".fl");
if(v&&vw&&fl&&fl.children.length){ed.__v5=1;
var pp=E("div","pp");vw.appendChild(pp);
vw.onclick=function(){if(v.paused)v.play().catch(function(){});else v.pause()};
v.addEventListener("pause",function(){vw.classList.add("pz")});v.addEventListener("play",function(){vw.classList.remove("pz")});
var fb=[].slice.call(fl.querySelectorAll("button")),cs=[];
fb.forEach(function(b){var c=document.createElement("canvas");c.width=124;c.height=164;b.insertBefore(c,b.firstChild);cs.push(c)});
var t=document.createElement("video");t.muted=true;t.setAttribute("playsinline","");t.preload="auto";t.src=v.src;
t.onloadeddata=function(){try{t.currentTime=Math.min(1,(t.duration||2)/2)}catch(e){}};
t.onseeked=function(){var ft=["","grayscale(1) contrast(1.1)","sepia(.3) saturate(1.5) hue-rotate(-12deg) brightness(1.05)","hue-rotate(18deg) saturate(1.2) brightness(1.05)","sepia(.55) contrast(1.1) brightness(.95) saturate(1.2)","contrast(1.4) saturate(1.3)","saturate(1.9) contrast(1.08)","brightness(1.1) contrast(.9) saturate(1.1)"];
cs.forEach(function(c,i){var x=c.getContext("2d"),w=t.videoWidth,h=t.videoHeight;if(!w)return;var s=Math.max(c.width/w,c.height/h),dw=w*s,dh=h*s;x.filter=ft[i]||"none";x.drawImage(t,(c.width-dw)/2,(c.height-dh)/2,dw,dh)});t.removeAttribute("src");t.load()}}}
}catch(e){}}
setInterval(tick,400)})();
