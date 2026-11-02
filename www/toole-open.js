(function(){
"use strict";
if(window.__topen)return;window.__topen=1;
var pinUntil=0,moved=false,mo=null,watched=null,revealT=0,wraps=0;
function $(i){return document.getElementById(i)}
function down(){var c=$("chat");if(c)c.scrollTop=c.scrollHeight}
function pinned(){return Date.now()<pinUntil&&!moved}
function reveal(){clearTimeout(revealT);var c=$("chat");if(c)c.style.opacity=""}
function settle(){
  var c=$("chat");if(!c||!pinned())return;
  down();
  if(c.querySelector(".m"))requestAnimationFrame(function(){if(pinned())down();reveal()});
}
function pin(ms){
  var c=$("chat");pinUntil=Date.now()+(ms||2500);moved=false;
  if(c){c.style.opacity="0";clearTimeout(revealT);revealT=setTimeout(reveal,450)}
  [0,40,100,200,400,800,1400,2200].forEach(function(t){setTimeout(function(){if(pinned())down()},t)});
}
function watch(){
  var c=$("chat");if(!c||watched===c)return;watched=c;
  if(mo)mo.disconnect();
  mo=new MutationObserver(settle);
  mo.observe(c,{childList:true,subtree:true});
  c.addEventListener("load",function(){if(pinned())down()},true);
  ["touchstart","wheel","mousedown"].forEach(function(e){
    c.addEventListener(e,function(){moved=true;reveal()},{passive:true});
  });
}
function wrapAll(){
  if(wraps>=3)return;
  var r=window.renderMsgRows,o=window.openChat,did=false;
  if(typeof r==="function"&&!r.__to){
    var w=function(){var x=r.apply(this,arguments);settle();return x};
    w.__to=1;window.renderMsgRows=w;did=true;
  }
  if(typeof o==="function"&&!o.__to){
    var w2=function(){pin(2500);return o.apply(this,arguments)};
    w2.__to=1;window.openChat=w2;did=true;
  }
  if(did)wraps++;
  watch();
}
function start(){setTimeout(wrapAll,1500);setTimeout(wrapAll,4000);setTimeout(wrapAll,8000)}
if(document.readyState==="complete")start();else window.addEventListener("load",start);
})();
