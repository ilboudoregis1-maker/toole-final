(function(){
"use strict";
if(window.__tpx)return;window.__tpx=1;
var D=document;
function en(){try{return localStorage.getItem("toole_lang")==="en"}catch(e){return false}}
function title(b,id,fr,eng){
  if(D.getElementById(id))return;
  var t=D.createElement("div");t.id=id;t.textContent=en()?eng:fr;b.appendChild(t);
}
function run(){
  var p=D.getElementById("scrProfil"),b=p&&p.querySelector(".body");
  if(!b)return;
  title(b,"tpT1","Confidentialité","Privacy");
  title(b,"tpT2","Application","App");
}
var q=0;
new MutationObserver(function(){if(q)return;q=1;requestAnimationFrame(function(){q=0;run()})}).observe(D.body,{childList:true,subtree:true});
run();
})();
