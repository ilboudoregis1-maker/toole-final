/* TÕÕLé — barre de recherche de l'accueil : texte fixe (plus de clignotement) */
(function(){"use strict";if(window.__tfs)return;window.__tfs=1;
var st=document.createElement("style");
st.textContent=".tg-sb{border-radius:14px!important;background:#f1f5f9!important;border:1px solid #dbeafe!important;box-shadow:0 2px 8px rgba(37,99,235,.08)!important}.tg-sb:focus{border-color:#2563eb!important;box-shadow:0 0 0 3px rgba(37,99,235,.18)!important;outline:0}";
document.head.appendChild(st);
var D=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"placeholder");
var SA=Element.prototype.setAttribute;
function isEn(){var t=document.querySelector("#scrParam .ttl");
if(t)return /^\s*Settings\s*$/i.test(t.textContent);
return (document.documentElement.lang||"").toLowerCase().indexOf("en")===0}
function txt(){return isEn()?"Search":"Rechercher"}
function freeze(i){
if(i.__tfs)return;i.__tfs=1;i.classList.add("tg-sb");
i.setAttribute=function(n,v){if(String(n).toLowerCase()==="placeholder")return;return SA.call(i,n,v)};
Object.defineProperty(i,"placeholder",{get:function(){return D.get.call(i)},set:function(){},configurable:true})}
function tick(){
var l=document.getElementById("scrList");if(!l)return;
[].forEach.call(l.querySelectorAll("input"),function(i){
if(!i.__tfs&&!/recherch|search/i.test(D.get.call(i)||""))return;
freeze(i);
var t=txt();if(D.get.call(i)!==t)D.set.call(i,t)})}
tick();setInterval(tick,500);
})();
