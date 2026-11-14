/* TÕÕLé — rangée des statuts : défile uniquement de côté, sans entraîner l'écran */
(function(){"use strict";if(window.__tss)return;window.__tss=1;
function P(e,k,v){e.style.setProperty(k,v,"important")}
function fix(){var m=document.getElementById("v4stMe");if(!m)return;
var e=m.parentElement,r=null,n=0;
while(e&&e!==document.body&&n++<7){var o=getComputedStyle(e).overflowX;if(o==="auto"||o==="scroll"){r=e;break}e=e.parentElement}
if(!r)r=m.parentElement;if(!r||r.__tss)return;r.__tss=1;
P(r,"touch-action","pan-x");P(r,"overscroll-behavior","contain");P(r,"overflow-x","auto");P(r,"overflow-y","hidden");P(r,"-webkit-overflow-scrolling","touch");
var x0=0,y0=0,h=null;
r.addEventListener("touchstart",function(t){x0=t.touches[0].clientX;y0=t.touches[0].clientY;h=null},{passive:true});
r.addEventListener("touchmove",function(t){var dx=Math.abs(t.touches[0].clientX-x0),dy=Math.abs(t.touches[0].clientY-y0);
if(h===null&&(dx>6||dy>6))h=dx>=dy;if(h)t.stopPropagation()},{passive:true})}
setInterval(fix,600);fix();
})();
