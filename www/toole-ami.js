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
  var p=D.getElementById("scrProfil");
  if(!p||D.getElementById("tsAmi"))return;
  var f=en(),b=D.createElement("div"),bs="flex:1;border:0;border-radius:12px;padding:12px 8px;font-size:15px;font-weight:800;color:#fff;";
  b.id="tsAmi";
  b.style.cssText="margin:10px 16px;padding:14px;border-radius:14px;background:rgba(0,188,212,.08);border:1px solid rgba(0,168,200,.35)";
  b.innerHTML='<div style="font-weight:800;font-size:16px">'+(f?"Invite a friend":"Inviter un ami")+'</div>'+
    '<div style="font-size:13px;opacity:.75;margin:4px 0 10px">'+(f?"Send the link to join TÕÕLé":"Envoie le lien pour rejoindre TÕÕLé")+'</div>'+
    '<div style="display:flex;gap:10px">'+
    '<button id="tamS" style="'+bs+'background:linear-gradient(135deg,#0a7cff,#2f9bff)">'+(f?"Messages":"Messagerie")+'</button>'+
    '<button id="tamW" style="'+bs+'background:#25a244">WhatsApp</button></div>';
  p.appendChild(b);
  b.querySelector("#tamS").onclick=sms;
  b.querySelector("#tamW").onclick=wa;
}
var q=0;
new MutationObserver(function(){if(q)return;q=1;requestAnimationFrame(function(){q=0;row()})}).observe(D.body,{childList:true,subtree:true});
row();
})();
