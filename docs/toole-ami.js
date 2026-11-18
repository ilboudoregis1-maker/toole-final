(function(){
"use strict";
if(window.__tami)return;window.__tami=1;
var D=document,SITE="https://ilboudoregis1-maker.github.io/CNS.corp/tooole.html";
function en(){try{return localStorage.getItem("toole_lang")==="en"}catch(e){return false}}
function msg(){
  return en()
    ?"Hi! I invite you to join TÕÕLé, the messaging app made for Burkina Faso. Download it here: "+SITE
    :"Salut ! Je t'invite à rejoindre TÕÕLé, la messagerie pensée pour le Burkina Faso. Télécharge l'appli ici : "+SITE;
}
function go(u){try{window.location.href=u}catch(e){}}
function sms(){go("sms:?body="+encodeURIComponent(msg()))}
function wa(){go("https://wa.me/?text="+encodeURIComponent(msg()))}
function row(){
  var p=D.getElementById("scrProfil"),body=p&&p.querySelector(".body");
  if(!body||D.getElementById("tsAmi"))return;
  var f=en(),b=D.createElement("div");
  b.id="tsAmi";
  b.innerHTML='<div class="tp-at"><b>'+(f?"Invite a friend":"Inviter un ami")+'</b><span>'+(f?"Share TÕÕLé":"Partage TÕÕLé")+'</span></div>'+
    '<button id="tamS" type="button">'+(f?"Messages":"Messagerie")+'</button>'+
    '<button id="tamW" type="button">WhatsApp</button>';
  body.appendChild(b);
  b.querySelector("#tamS").onclick=sms;
  b.querySelector("#tamW").onclick=wa;
}
var q=0;
new MutationObserver(function(){if(q)return;q=1;requestAnimationFrame(function(){q=0;row()})}).observe(D.body,{childList:true,subtree:true});
row();
})();
