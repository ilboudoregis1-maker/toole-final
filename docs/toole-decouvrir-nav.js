/* TÕÕLé — accès à Découvrir depuis l'en-tête + barre du bas (v4nav) */
(function(){"use strict";if(window.__tdnav)return;window.__tdnav=1;
function $(i){return document.getElementById(i)}
function openDec(){var b=document.querySelector('#tabs button[data-t="decouvrir"]');if(b)b.click();var n=$("v4nav");if(n)n.classList.add("on")}
function ensureBtn(){var hdr=document.querySelector("#scrList .hdr");if(!hdr||hdr.querySelector(".zd-ic"))return;
var ics=hdr.querySelectorAll(".ic"),b=document.createElement("button");b.className="ic zd-ic";b.type="button";b.setAttribute("aria-label","Découvrir");
b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>';
b.onclick=openDec;if(ics.length>1)hdr.insertBefore(b,ics[1]);else hdr.appendChild(b)}
function wireNav(){var n=$("v4nav");if(!n||n.__zd)return;n.__zd=1;
n.addEventListener("click",function(){var s=$("scrDecouvrir");if(s)s.classList.add("hide")},true);
new MutationObserver(function(){var s=$("scrDecouvrir");if(s&&!s.classList.contains("hide")&&!n.classList.contains("on"))n.classList.add("on")}).observe(n,{attributes:true,attributeFilter:["class"]})}
function tick(){ensureBtn();wireNav()}
tick();setInterval(tick,1500);
})();
