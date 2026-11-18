/* TÕÕLé — bouton Explorer distinct de la loupe + ouverture fiable de Découvrir */
(function(){"use strict";if(window.__tdnav)return;window.__tdnav=1;
function $(i){return document.getElementById(i)}
function openDec(e){
if(e){e.preventDefault();e.stopPropagation()}
var tab=document.querySelector('#tabs button[data-t="decouvrir"]');
if(tab){tab.click()}
var s=$("scrDecouvrir");
if(s&&s.classList.contains("hide")){
[].forEach.call(document.querySelectorAll(".scr"),function(x){x.classList.add("hide")});
s.classList.remove("hide")}
var n=$("v4nav");if(n)n.classList.add("on")}
function ensureBtn(){
var hdr=document.querySelector("#scrList .hdr");if(!hdr)return;
var old=hdr.querySelector(".zd-ic");if(old&&old.__ok)return;
if(old)old.remove();
var b=document.createElement("button");
b.className="ic zd-ic";b.type="button";b.__ok=1;
b.setAttribute("aria-label","Explorer");b.title="Explorer";
b.style.cssText="background:none;border:0;padding:0;display:inline-flex;align-items:center;justify-content:center;pointer-events:auto;position:relative;z-index:5";
b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z" fill="currentColor"/></svg>';
b.addEventListener("click",openDec,true);
var nw=$("newIc");
if(nw)hdr.insertBefore(b,nw);else hdr.appendChild(b)}
function wireNav(){var n=$("v4nav");if(!n||n.__zd)return;n.__zd=1;
n.addEventListener("click",function(){var s=$("scrDecouvrir");if(s)s.classList.add("hide")},true);
new MutationObserver(function(){var s=$("scrDecouvrir");if(s&&!s.classList.contains("hide")&&!n.classList.contains("on"))n.classList.add("on")}).observe(n,{attributes:true,attributeFilter:["class"]})}
function tick(){ensureBtn();wireNav()}
tick();setInterval(tick,800);
})();
