/* TÕÕLé HI-TECH — appui long = supprimer (discussions + appels) */
(function(){"use strict";
var $=function(i){return document.getElementById(i)};
var EN=localStorage.getItem("toole_lang")==="en";
var T=EN?{c:"Delete chat",k:"Delete this call",a:"Clear all history",n:"Cancel",dc:"Chat deleted",dk:"Call deleted",da:"History cleared"}:{c:"Supprimer la discussion",k:"Supprimer cet appel",a:"Effacer tout l’historique",n:"Annuler",dc:"Discussion supprimée",dk:"Appel supprimé",da:"Historique effacé"};
var TR='<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>';
function uid(){try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return"x"}}
function K(n){return"ht_"+n+"_"+uid()}
function rd(n){try{return JSON.parse(localStorage.getItem(K(n))||"{}")}catch(e){return{}}}
function wr(n,o){try{localStorage.setItem(K(n),JSON.stringify(o))}catch(e){}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function isContactRow(r){var s=r.querySelector(".sub");return !!s&&/^(Appui|Tap)/.test(s.textContent)}
var tries=0;
function wrap(){var a=window.api;if(tries>8||typeof a!=="function"||a.__ht)return;tries++;
 var w=function(p){var r=a.apply(this,arguments);
  if(String(p).indexOf("/rest/v1/calls?select=id,caller,callee")===0)
   return Promise.resolve(r).then(function(x){if(!Array.isArray(x))return x;var h=rd("hk");x=x.filter(function(c){return!h[c.id]});window.__htc=x;return x});
  return r};
 w.__ht=1;window.api=w}
wrap();setInterval(wrap,800);
function sweep(){return;var h=rd("hc"),box=$("recent");if(!box||!Object.keys(h).length)return;
 box.querySelectorAll(".row").forEach(function(r){if(isContactRow(r))return;var n=r.querySelector(".rn"),s=r.querySelector(".sub");if(!n)return;var k=n.textContent;
  if(!Object.prototype.hasOwnProperty.call(h,k))return;
  r.remove()})}
function watch(){var b=$("recent");if(!b){setTimeout(watch,500);return}new MutationObserver(sweep).observe(b,{childList:true});sweep()}
watch();
var timer=0,sx=0,sy=0,held=false;
function target(e){var r=e.target&&e.target.closest?e.target.closest("#recent .row,#v4calls .row"):null;return r&&!isContactRow(r)?r:null}
function clr(){clearTimeout(timer);timer=0;document.querySelectorAll(".ht-hold").forEach(function(x){x.classList.remove("ht-hold")})}
document.addEventListener("pointerdown",function(e){held=false;var r=target(e);if(!r)return;sx=e.clientX;sy=e.clientY;clearTimeout(timer);
 timer=setTimeout(function(){held=true;r.classList.add("ht-hold");if(navigator.vibrate)navigator.vibrate(18);act(r)},520)},true);
document.addEventListener("pointermove",function(e){if(timer&&(Math.abs(e.clientX-sx)>10||Math.abs(e.clientY-sy)>10))clr()},true);
["pointerup","pointercancel"].forEach(function(v){document.addEventListener(v,clr,true)});
document.addEventListener("click",function(e){if(held&&target(e)){e.stopPropagation();e.preventDefault()}held=false},true);
document.addEventListener("contextmenu",function(e){if(target(e))e.preventDefault()},true);
function act(r){if(typeof sheetEl!=="function")return;
 var calls=!!r.closest("#v4calls"),nm=(r.querySelector(".rn")||{}).textContent||"?";
 var sh=sheetEl('<div class="sht">'+esc(nm)+'</div><button class="sa dz" id="htD"><span class="si">'+TR+'</span>'+(calls?T.k:T.c)+'</button>'+(calls?'<button class="sa dz" id="htA"><span class="si">'+TR+'</span>'+T.a+'</button>':'')+'<button class="sa cc" onclick="closeSheet()">'+T.n+'</button>');
 sh.querySelector("#htD").onclick=function(){
  if(calls){var i=Array.prototype.indexOf.call(r.parentNode.children,r),c=(window.__htc||[])[i];if(c){var h=rd("hk");h[c.id]=1;wr("hk",h)}}
  else{var h2=rd("hc"),s=r.querySelector(".sub");h2[nm]=s?s.textContent:"";wr("hc",h2);try{window.__tdelChat&&window.__tdelChat(nm,r)}catch(e){}}
  r.remove();closeSheet();if(typeof toast==="function")toast(calls?T.dk:T.dc)};
 var A=sh.querySelector("#htA");
 if(A)A.onclick=function(){var h=rd("hk");(window.__htc||[]).forEach(function(c){h[c.id]=1});wr("hk",h);var b=$("v4calls");if(b)b.innerHTML="";closeSheet();if(typeof toast==="function")toast(T.da)}}
})();
(function(){try{if(!localStorage.getItem("toole_themeMode")){localStorage.setItem("toole_themeMode","light");document.documentElement.setAttribute("data-theme","light")}}catch(e){}})();
