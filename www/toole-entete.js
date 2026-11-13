/* TÕÕLé — En-tête de l'accueil : sans crayon, recherche claire, écrire à un numéro en 2 touches */
(function(){"use strict";if(window.__ten)return;window.__ten=1;
function $(i){return document.getElementById(i)}
function EN(){try{return localStorage.getItem("toole_lang")==="en"}catch(e){return false}}
function L(f,e){return EN()?e:f}
var LIEN="https://github.com/ilboudoregis1-maker/toole-final/releases/latest";

/* ---------- Style (mêmes bleus que l'accueil) ---------- */
var H="html:root:root:root body #scrList .hdr";
var css=document.createElement("style");css.textContent=[
H+" #newIc{display:none!important}",
H+"{display:flex!important;align-items:center!important;flex-wrap:nowrap!important;gap:10px!important;position:relative;padding:calc(env(safe-area-inset-top,0px) + 12px) 14px 12px!important}",
H+"::after{content:'';position:absolute;left:14px;right:14px;bottom:0;height:1px;background:linear-gradient(90deg,transparent,rgba(10,124,255,.35),transparent)}",
H+">.ic:first-child{order:1;width:46px!important;height:46px!important;border-radius:15px!important;box-shadow:0 6px 16px rgba(10,124,255,.35)}",
H+" .ttl{order:2;flex:1 1 auto!important;min-width:0!important;overflow:hidden;font-size:30px!important}",
H+" .ttl::after{font-size:12.5px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;max-width:100%!important;padding-bottom:6px!important}",
H+" .zd-ic{order:3;display:grid!important;place-items:center;flex:none;width:44px!important;height:44px!important;border-radius:50%!important;background:linear-gradient(135deg,#2f9bff,#0a7cff)!important;border:0!important;box-shadow:0 6px 16px rgba(10,124,255,.38),0 0 0 3px rgba(10,124,255,.12)!important}",
H+" .zd-ic svg circle{stroke:#fff!important;fill:none!important}",
H+" .zd-ic svg path{stroke:#fff!important;fill:#fff!important}",
H+" .zd-ic svg{width:24px!important;height:24px!important}",
H+">.ic:not(:first-child):not(.zd-ic):not(#newIc){order:4;width:44px!important;height:44px!important;box-shadow:0 0 0 1px rgba(10,124,255,.2),0 4px 12px rgba(10,124,255,.12)}",
"#enFound{display:none;align-items:center;gap:12px;margin:0 16px 8px;padding:12px 14px;border-radius:18px;background:linear-gradient(135deg,rgba(47,155,255,.14),rgba(10,124,255,.1));border:1px solid rgba(10,124,255,.28);cursor:pointer;animation:enUp .25s both}",
"#enFound.on{display:flex}",
"@keyframes enUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
"#enFound .i{flex:none;width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#2f9bff,#0a7cff);display:grid;place-items:center}",
"#enFound .i svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}",
"#enFound b{display:block;font-size:16px;color:var(--s-hd,#0b1b3a)}",
"#enFound span{font-size:13px;color:var(--s-mut,#667781)}",
"#enFound .go{margin-left:auto;font-size:26px;line-height:1;color:var(--s-ac,#0a7cff)}",
"#enHint{display:none;margin:-2px 22px 8px;font-size:13px;color:var(--s-mut,#667781)}#enHint.on{display:block}",
".en-s{font-size:13.5px;line-height:1.4;color:var(--s-mut,#667781);padding:2px 4px 10px}",
".en-chk{display:flex;align-items:center;gap:10px;margin:12px 4px 4px;font-size:14.5px}.en-chk input{width:20px;height:20px;margin:0;flex:none}",
"#pseudoSearch{display:none!important}"
].join("\n");document.head.appendChild(css);

/* ---------- Numéros ---------- */
function norm(q){return String(q||"").replace(/^\s*00/,"")}
function isNum(q){q=norm(q);return /^[+\d\s().-]{6,}$/.test(q)&&!!(window.tooleNum&&window.tooleNum(q))}
function pretty(q){var d=window.tooleNum(norm(q));return d.length===11&&d.indexOf("226")===0?"+226 "+d.slice(3).replace(/(\d\d)(?=\d)/g,"$1 "):"+"+d}
function notFound(d){
var sh=sheetEl('<div class="sht">'+L("Pas encore sur TÕÕLé","Not on TÕÕLé yet")+'</div><div class="en-s"><b>'+pretty(d)+'</b><br>'+L("Ce numéro n'a pas encore de compte. Invite-le, c'est rapide.","This number has no account yet. Invite them, it's quick.")+'</div><button id="enInv">'+L("Inviter par SMS","Invite by SMS")+'</button><button class="sa cc" onclick="closeSheet()">'+L("Fermer","Close")+'</button>');
sh.querySelector("#enInv").onclick=function(){var m=L("Salut ! Je t'invite sur TÕÕLé. Télécharge l'appli ici : ","Hi! I'm inviting you to TÕÕLé. Get the app here: ")+LIEN;window.location.href="sms:+"+d+"?body="+encodeURIComponent(m)}}
async function openByNumber(v,save){
var raw=norm(String(v||"").trim());if(!raw)return;
if(/[A-Za-z\u00C0-\u00FF]/.test(raw)){
 try{var id=await api("/rest/v1/rpc/id_by_pseudo",{method:"POST",body:JSON.stringify({p:raw})});if(!id){toast(L("Personne introuvable","Nobody found"));return}
  if(save){try{await window.saveContact({id:id})}catch(e){}}closeSheet();openChat(id,raw)}catch(e){toast(String(e&&e.message||"Erreur"))}return}
var d=window.tooleNum(raw);if(!d){toast(L("Écris un numéro valide","Enter a valid number"));return}
try{var uid=await window.tooleIdByPhone(raw);if(!uid){notFound(d);return}
 try{if(typeof me==="function"&&uid===me()){toast(L("C'est ton propre numéro","That's your own number"));return}}catch(e){}
 var nm="Contact";try{var pr=await api("/rest/v1/profiles?select=pseudo&id=eq."+uid);if(pr&&pr[0]&&pr[0].pseudo)nm=pr[0].pseudo}catch(e){}
 if(save){try{await window.saveContact({id:uid})}catch(e){}}
 closeSheet();openChat(uid,nm)}catch(e){toast(window.tooleErr?window.tooleErr(e):"Erreur")}}
function numSheet(pre){
var sh=sheetEl('<div class="sht">'+L("Nouvelle discussion","New chat")+'</div><div class="en-s">'+L("Entre le numéro de la personne. Les 8 chiffres suffisent, le +226 est ajouté tout seul.","Enter the person's number. 8 digits are enough, +226 is added for you.")+'</div><input id="enNum" type="tel" inputmode="tel" autocomplete="off" placeholder="+226 70 12 34 56"><label class="en-chk"><input type="checkbox" id="enSave" checked><span>'+L("Enregistrer dans mes contacts","Save to my contacts")+'</span></label><button id="enGo" style="margin-top:12px">'+L("Ouvrir la discussion","Open chat")+'</button><button class="sa cc" onclick="closeSheet()">'+L("Annuler","Cancel")+'</button>');
var ip=sh.querySelector("#enNum");if(pre)ip.value=pre;
function go(){openByNumber(ip.value,sh.querySelector("#enSave").checked)}
sh.querySelector("#enGo").onclick=go;ip.onkeydown=function(e){if(e.key==="Enter")go()};
setTimeout(function(){try{ip.focus()}catch(e){}},250)}
window.tooleNewByNumber=numSheet;

/* Le + du bas : « Nouvelle discussion » ouvre maintenant la saisie du numéro */
new MutationObserver(function(){var b=$("v4n1");if(b&&!b.__en){b.__en=1;b.onclick=function(){closeSheet();numSheet()}}}).observe(document.body,{childList:true});

/* ---------- En-tête + recherche ---------- */
function tick(){
var hdr=document.querySelector("#scrList .hdr");if(!hdr)return;
var ics=[].slice.call(hdr.querySelectorAll(".ic")).filter(function(x){return x.id!=="newIc"&&!x.classList.contains("zd-ic")});
if(ics[0])ics[0].title=L("Mon profil","My profile");
var lo=ics[1];if(lo){lo.setAttribute("aria-label",L("Rechercher dans mes conversations","Search my chats"));lo.title=L("Rechercher dans mes conversations","Search my chats")}
var ex=hdr.querySelector(".zd-ic");if(ex){ex.title=L("Explorer","Explore");ex.setAttribute("aria-label",L("Explorer","Explore"))}
var s=$("srch");if(!s)return;
var ph=L("Rechercher dans mes conversations","Search my chats");if(s.placeholder!==ph)s.placeholder=ph;
if(s.__en)return;s.__en=1;
var card=document.createElement("div");card.id="enFound";
card.innerHTML='<div class="i"><svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/></svg></div><div><b></b><span></span></div><div class="go">\u203A</div>';
var hint=document.createElement("div");hint.id="enHint";
s.parentNode.insertBefore(hint,s.nextSibling);s.parentNode.insertBefore(card,s.nextSibling);
function upd(){var q=s.value.trim(),on=isNum(q);card.classList.toggle("on",on);
 if(on){card.querySelector("b").textContent=L("Écrire au ","Message ")+pretty(q);card.querySelector("span").textContent=L("Ouvrir une discussion avec ce numéro","Start a chat with this number")}
 hint.textContent=L("Astuce : tape un numéro pour écrire à une nouvelle personne","Tip: type a number to message someone new");
 hint.classList.toggle("on",document.activeElement===s&&!q)}
s.addEventListener("input",upd);s.addEventListener("focus",upd);s.addEventListener("blur",function(){setTimeout(upd,150)});
card.onclick=function(){openByNumber(s.value,true)}}
tick();setInterval(tick,700);
})();
