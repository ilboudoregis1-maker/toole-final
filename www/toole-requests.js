/* TÕÕLé — demandes de discussion, blocage, signalement */
(function(){"use strict";
function $(i){return document.getElementById(i)}
function P(){try{return peer}catch(e){return null}}
function ME(){try{return me()}catch(e){return null}}
function say(t){try{toast(t)}catch(e){}}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function get(p){return api(p).then(function(r){return Array.isArray(r)?r:[]}).catch(function(){return[]})}
var S={id:null},strangers={},lastNet=0;
var st=document.createElement("style");
st.textContent="#rqBn{margin:10px 12px 0;padding:12px 14px;border-radius:14px;background:#eef6ff;border:1px solid #cfe3ff;color:#0a2a5c;font:14px/1.35 system-ui}#rqBn.hide{display:none}#rqBn b{display:block;margin-bottom:4px;font-size:15px}#rqBn .rq-b{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}#rqBn button{flex:1 1 40%;margin:0;padding:10px 8px;border-radius:10px;border:0;font:600 14px system-ui;background:#0a84ff;color:#fff;width:auto}#rqBn button.g{background:#fff;color:#0a3d91;border:1px solid #cfe3ff}#rqBn button.r{background:#fff;color:#c62828;border:1px solid #f3c6c6}#rqMore{width:auto;margin:0 0 0 4px;background:none;border:0;padding:4px 6px;line-height:0}#scrChat.unk .m.avl::before,#scrChat.unk .m.avr::before{content:'?'!important;background-image:none!important}";
document.head.appendChild(st);
async function refresh(){var p=P(),my=ME();if(!p||!p.id||!my)return;var id=p.id;
var r=await Promise.all([get("/rest/v1/saved_contacts?select=contact&owner=eq."+my+"&contact=eq."+id+"&limit=1"),get("/rest/v1/blocks?select=blocked&blocker=eq."+my+"&blocked=eq."+id+"&limit=1"),get("/rest/v1/chat_accepts?select=peer&owner=eq."+my+"&peer=eq."+id+"&limit=1"),get("/rest/v1/messages?select=id&sender=eq."+my+"&receiver=eq."+id+"&limit=1"),get("/rest/v1/messages?select=id&sender=eq."+id+"&receiver=eq."+my+"&limit=1")]);
var q=P();if(!q||q.id!==id)return;
S={id:id,saved:!!r[0].length,blocked:!!r[1].length,accepted:!!r[2].length,iWrote:!!r[3].length,theyWrote:!!r[4].length};
S.mask=S.theyWrote&&!S.iWrote&&!S.saved;applyHeader();renderBanner()}
function applyHeader(){var n=$("peerName"),a=$("peerAv"),p=P(),sc=$("scrChat");if(!n||!a||!p)return;
if(sc)sc.classList.toggle("unk",!!S.mask);
var cs=document.querySelector("#scrChat .cs"),star=$("starBtn");if(star)star.textContent=S.saved?"★":"☆";
if(S.mask){if(n.textContent!=="Inconnu")n.textContent="Inconnu";if(a.textContent!=="?")a.textContent="?";a.classList.remove("has-photo");a.style.removeProperty("--avimg");if(cs&&cs.textContent!=="Non enregistré")cs.textContent="Non enregistré"}
else{var w=p.pseudo||"?";if(n.textContent==="Inconnu"&&w!=="Inconnu")n.textContent=w;if(a.textContent==="?"&&!a.classList.contains("has-photo"))a.textContent=w.slice(0,2).toUpperCase();if(cs&&cs.textContent==="Non enregistré")cs.textContent="Discussion"}}
function banner(){var b=$("rqBn");if(b)return b;var h=document.querySelector("#scrChat .chead");if(!h)return null;b=document.createElement("div");b.id="rqBn";b.className="hide";h.insertAdjacentElement("afterend",b);return b}
function renderBanner(){var b=banner();if(!b)return;
if(S.blocked){b.className="";b.innerHTML='<b>Contact bloqué</b>Tu ne reçois plus ses messages.<div class="rq-b"><button class="g" data-a="unblock">Débloquer</button><button class="r" data-a="report">Signaler</button></div>'}
else if(S.mask){var pend=!S.accepted;b.className="";b.innerHTML='<b>Personne inconnue</b>'+(pend?"Cette personne n’est pas dans tes contacts. Elle ne pourra pas t’envoyer d’autre message tant que tu n’as pas accepté la conversation.":"Cette personne n’est pas enregistrée. Enregistre-la pour voir son nom et sa photo.")+'<div class="rq-b">'+(pend?'<button data-a="accept">Accepter</button>':'')+'<button data-a="save"'+(pend?' class="g"':'')+'>Enregistrer</button><button class="r" data-a="block">Bloquer</button><button class="r" data-a="report">Signaler</button></div>'}
else{b.className="hide";b.innerHTML="";return}
b.querySelectorAll("button[data-a]").forEach(function(x){x.onclick=function(){act(x.dataset.a)}})}
async function act(a){var p=P(),my=ME();if(!p||!my)return;
try{if(a==="accept"){await api("/rest/v1/chat_accepts",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({owner:my,peer:p.id})});say("Conversation acceptée")}
else if(a==="save"){await window.saveContact(p)}
else if(a==="block"){confirmBlock();return}
else if(a==="unblock"){await api("/rest/v1/blocks?blocker=eq."+my+"&blocked=eq."+p.id,{method:"DELETE",headers:{Prefer:"return=minimal"}});say("Contact débloqué")}
else if(a==="report"){reportContact();return}}catch(e){say(e.message)}
refresh()}
function confirmBlock(){var p=P();if(!p)return;var nm=S.mask?"cette personne":(p.pseudo||"ce contact");
var sh=sheetEl('<div class="sht">Bloquer '+esc(nm)+' ?</div><div class="sx-s" style="padding:6px 8px">Elle ne pourra plus t’envoyer de messages. Tu pourras la débloquer à tout moment.</div><button class="sa dz" id="rqBY">Bloquer</button><button class="sa cc" onclick="closeSheet()">Annuler</button>');
sh.querySelector("#rqBY").onclick=async function(){closeSheet();try{await api("/rest/v1/blocks",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({blocker:ME(),blocked:p.id})});say("Contact bloqué")}catch(e){say(e.message)}refresh()}}
function reportContact(){var p=P();if(!p)return;
var R=(typeof REASONS!=="undefined"&&REASONS.length)?REASONS:["Spam","Harcèlement","Contenu inapproprié","Arnaque","Autre"];
var sh=sheetEl('<div class="sht">Signaler ce contact</div>'+R.map(function(r){return '<button class="sa" data-r="'+esc(r)+'">'+esc(r)+'</button>'}).join("")+'<button class="sa cc" onclick="closeSheet()">Annuler</button>');
sh.querySelectorAll("button[data-r]").forEach(function(b){b.onclick=function(){sendReport({id:"",sender:p.id,body:"(contact signalé)"},"u",p.id,b.dataset.r)}})}
function menu(){var p=P();if(!p)return;
var h='<div class="sht">'+esc(S.mask?"Inconnu":(p.pseudo||"Contact"))+'</div>'+(S.saved?"":'<button class="sa" data-a="save">Enregistrer le contact</button>')+(S.blocked?'<button class="sa" data-a="unblock">Débloquer</button>':'<button class="sa dz" data-a="block">Bloquer</button>')+'<button class="sa dz" data-a="report">Signaler ce contact</button><button class="sa cc" onclick="closeSheet()">Fermer</button>';
var sh=sheetEl(h);sh.querySelectorAll("button[data-a]").forEach(function(x){x.onclick=function(){closeSheet();act(x.dataset.a)}})}
function addMore(){var h=document.querySelector("#scrChat .chead");if(!h||$("rqMore"))return;var b=document.createElement("button");b.id="rqMore";b.type="button";b.setAttribute("aria-label","Options");
b.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="#fff"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>';b.onclick=menu;h.appendChild(b)}
var _oc=window.openChat;
if(typeof _oc==="function"){window.openChat=function(){S={id:null};var n=$("peerName"),a=$("peerAv"),sc=$("scrChat"),b=$("rqBn");
if(sc)sc.classList.remove("unk");if(b){b.className="hide";b.innerHTML=""}
if(n)n.style.visibility="hidden";if(a)a.style.visibility="hidden";
var r=_oc.apply(this,arguments);addMore();
var show=function(){if(n)n.style.visibility="";if(a)a.style.visibility=""};
refresh().then(show,show);return r}}
var _sc=window.saveContact;
if(typeof _sc==="function"){window.saveContact=async function(){var r=await _sc.apply(this,arguments);setTimeout(function(){refresh();listRefresh(true)},300);return r}}
var _api=window.api;
if(typeof _api==="function"){window.api=async function(path,opt){try{return await _api.apply(this,arguments)}catch(e){
if(typeof path==="string"&&path.indexOf("/rest/v1/messages")===0&&opt&&opt.method==="POST"&&/accepter/i.test(e.message||"")){var b=banner();if(b){b.className="";b.innerHTML="<b>En attente</b>Cette personne doit accepter ta conversation avant que tu puisses envoyer d’autres messages."}}
throw e}}}
var hd=document.querySelector("#scrChat .chead");
if(hd)new MutationObserver(function(){if(S.mask)applyHeader()}).observe(hd,{childList:true,subtree:true,attributes:true,characterData:true});
function maskRows(){var rc=$("recent");if(!rc)return;rc.querySelectorAll(".row").forEach(function(row){var rn=row.querySelector(".rn");if(!rn||!strangers[rn.textContent])return;rn.textContent="Inconnu";var av=row.querySelector(".av");if(av){av.classList.remove("has-photo");av.style.removeProperty("--avimg");av.textContent="?"}})}
async function listRefresh(force){var my=ME();if(!my)return;if(!force&&Date.now()-lastNet<8000)return;lastNet=Date.now();
var rows=await get("/rest/v1/messages?select=sender,receiver&or=(sender.eq."+my+",receiver.eq."+my+")&order=created_at.desc&limit=400");
var saved=await get("/rest/v1/saved_contacts?select=contact&owner=eq."+my);
var sv={},wrote={},they={};saved.forEach(function(x){sv[x.contact]=1});
rows.forEach(function(m){if(m.sender===my)wrote[m.receiver]=1;else they[m.sender]=1});
var ids=Object.keys(they).filter(function(i){return !wrote[i]&&!sv[i]});
if(ids.length){var w=await get("/rest/v1/messages?select=receiver&sender=eq."+my+"&receiver=in.("+ids.join(",")+")&limit=1000");w.forEach(function(x){wrote[x.receiver]=1});ids=ids.filter(function(i){return !wrote[i]})}
strangers={};
if(ids.length){var pr=await get("/rest/v1/profiles?select=id,pseudo&id=in.("+ids.join(",")+")");pr.forEach(function(p){if(p.pseudo)strangers[p.pseudo]=1})}
maskRows()}
var rc=$("recent"),tm=0;
if(rc)new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(function(){maskRows();listRefresh(false)},120)}).observe(rc,{childList:true,subtree:true});
setTimeout(function(){listRefresh(true)},1500);addMore();
})();
