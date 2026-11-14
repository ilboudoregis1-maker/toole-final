/* TÕÕLé — guide « Comment ça marche » (FR/EN) + icône Explorer colorée */
(function(){"use strict";if(window.__tguide)return;window.__tguide=1;
var I={
chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4"/>',
compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
status:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
invite:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>',
help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
back:'<path d="M15 18l-6-6 6-6"/>',
next:'<path d="M9 18l6-6-6-6"/>'};
function sv(k,s,c){return '<svg viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="none" stroke="'+(c||"#fff")+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+I[k]+'</svg>'}
var st=document.createElement("style");
st.textContent=
"#scrList .hdr button.zd-ic{background:linear-gradient(135deg,#06b6d4,#2563eb)!important;color:#fff!important;opacity:1!important;border:0!important;border-radius:50%!important;width:40px!important;height:40px!important;box-shadow:0 6px 16px rgba(37,99,235,.5)!important}"+
"#tg-row{display:flex;align-items:center;gap:12px;margin:10px 12px;padding:14px;border-radius:18px;background:linear-gradient(135deg,#e0f2fe,#dbeafe);border:1px solid #bfdbfe;cursor:pointer;color:#0f172a}"+
"#tg-row .tg-i{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;flex:none}"+
"#tg-row b{display:block;font-size:15px}#tg-row small{display:block;font-size:12px;opacity:.7;margin-top:2px}#tg-row .tg-c{margin-left:auto;display:flex;opacity:.5}"+
"#tg-ov{position:fixed;inset:0;z-index:100000;background:#f1f5f9;color:#0f172a;display:flex;flex-direction:column;font-family:inherit}"+
"#tg-ov .tg-h{display:flex;align-items:center;gap:12px;padding:16px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:#fff;font-size:19px;font-weight:700;box-shadow:0 6px 20px rgba(37,99,235,.3)}"+
"#tg-ov .tg-h button{background:rgba(255,255,255,.22);border:0;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center}"+
"#tg-ov .tg-b{flex:1;overflow-y:auto;padding:16px;-webkit-overflow-scrolling:touch}"+
"#tg-ov .tg-t{margin:2px 4px 16px;font-size:14px;line-height:1.45;color:#475569}"+
"#tg-ov .tg-s{display:flex;gap:14px;background:#fff;border-radius:20px;padding:16px;margin-bottom:12px;box-shadow:0 6px 18px rgba(15,23,42,.07)}"+
"#tg-ov .tg-n{width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 6px 14px rgba(37,99,235,.28)}"+
"#tg-ov h4{margin:0 0 5px;font-size:16px;letter-spacing:-.01em}#tg-ov p{margin:0;font-size:13.5px;line-height:1.5;color:#475569}";
document.head.appendChild(st);
function isEn(){var t=document.querySelector("#scrParam .ttl");return !!t&&/^\s*Settings\s*$/i.test(t.textContent)}
var G=["#06b6d4,#2563eb","#3b82f6,#6366f1","#0ea5e9,#0284c7","#14b8a6,#0891b2","#6366f1,#2563eb","#22c55e,#0d9488","#f59e0b,#ef4444"];
var S=[
["chat","Discussions","Retrouve toutes tes conversations. Filtre avec Tous, Non lus ou Favoris, ou cherche un contact ou un groupe.","Chats","Find all your conversations. Filter by All, Unread or Favorites, or search for a contact or a group."],
["mic","Messages et vocaux","Envoie du texte, des photos et des vocaux de 5 minutes maximum. Écoute à ta vitesse (×1,25, ×1,5 ou ×2). Touche ✦ pour trouver des idées de conversation.","Messages and voice notes","Send text, photos and voice notes up to 5 minutes. Listen at your own speed (×1.25, ×1.5 or ×2). Tap ✦ for conversation ideas."],
["compass","Explorer","Touche la boussole en haut de l'accueil pour découvrir des personnes et des groupes, voir leurs photos et les inviter.","Explore","Tap the compass at the top of the home screen to discover people and groups, see their photos and invite them."],
["status","Statuts","Partage un moment avec « Mon statut » et regarde ceux de tes contacts.","Status","Share a moment with “My status” and watch your contacts' updates."],
["users","Communautés et groupes","Crée un groupe avec sa photo, puis invite tes amis à le rejoindre.","Communities and groups","Create a group with its photo, then invite your friends to join."],
["phone","Appels","Appelle tes contacts depuis l'onglet Appels et retrouve ton historique.","Calls","Call your contacts from the Calls tab and see your history."],
["invite","Inviter un ami","Partage le lien de TÕÕLé par SMS ou WhatsApp en un clic.","Invite a friend","Share the TÕÕLé link by SMS or WhatsApp in one tap."]];
function openG(){if(document.getElementById("tg-ov"))return;var en=isEn();
var o=document.createElement("div");o.id="tg-ov";
var h='<div class="tg-h"><button id="tg-x" type="button" aria-label="Back">'+sv("back",22)+'</button><span>'+(en?"How it works":"Comment ça marche")+'</span></div><div class="tg-b"><div class="tg-t">'+(en?"Everything you need to enjoy TÕÕLé.":"Tout ce qu'il faut pour profiter de TÕÕLé.")+'</div>';
S.forEach(function(s,i){h+='<div class="tg-s"><div class="tg-n" style="background:linear-gradient(135deg,'+G[i]+')">'+sv(s[0],24)+'</div><div><h4>'+(en?s[3]:s[1])+'</h4><p>'+(en?s[4]:s[2])+'</p></div></div>'});
o.innerHTML=h+'</div>';document.body.appendChild(o);
document.getElementById("tg-x").onclick=function(){o.remove()}}
function row(){var b=document.querySelector("#scrParam .body");if(!b)return;
var en=isEn(),r=document.getElementById("tg-row");
if(!r){r=document.createElement("div");r.id="tg-row";r.onclick=openG;b.insertBefore(r,b.firstChild)}
var l=en?"en":"fr";
if(r.getAttribute("data-l")!==l){r.setAttribute("data-l",l);
r.innerHTML='<div class="tg-i">'+sv("help",22)+'</div><div><b>'+(en?"How it works":"Comment ça marche")+'</b><small>'+(en?"A quick guide to TÕÕLé":"Un guide rapide de TÕÕLé")+'</small></div><span class="tg-c">'+sv("next",20,"#0f172a")+'</span>'}}
function P(e,k,v){e.style.setProperty(k,v,"important")}
function colorize(){var b=document.querySelector("#scrList .hdr .zd-ic");if(!b)return;
P(b,"background","linear-gradient(135deg,#06b6d4,#2563eb)");P(b,"color","#fff");P(b,"opacity","1");P(b,"filter","none");
var s=b.querySelector("svg");if(!s)return;
P(s,"width","22px");P(s,"height","22px");P(s,"color","#fff");P(s,"opacity","1");
[].forEach.call(s.querySelectorAll("*"),function(n){P(n,"opacity","1");P(n,"stroke","#fff");P(n,"fill",n.tagName==="path"?"#fff":"none")})}
setInterval(function(){row();colorize()},500);row();colorize();
})();
