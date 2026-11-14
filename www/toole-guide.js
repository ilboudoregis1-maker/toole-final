/* TÕÕLé — icône Explorer colorée + guide « Comment ça marche » (FR/EN) */
(function(){"use strict";if(window.__tguide)return;window.__tguide=1;
var st=document.createElement("style");
st.textContent=
".zd-ic{background:linear-gradient(135deg,#06b6d4,#2563eb)!important;color:#fff!important;border-radius:50%!important;width:34px!important;height:34px!important;box-shadow:0 4px 12px rgba(37,99,235,.45)!important;transition:transform .2s}"+
".zd-ic:active{transform:scale(.9)}.zd-ic svg{width:20px!important;height:20px!important;stroke:#fff!important}"+
"#tg-row{display:flex;align-items:center;gap:12px;margin:10px 12px;padding:14px;border-radius:16px;background:linear-gradient(135deg,#e0f2fe,#dbeafe);border:1px solid #bfdbfe;cursor:pointer;color:#0f172a}"+
"#tg-row .tg-i{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#2563eb);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;flex:none}"+
"#tg-row b{display:block;font-size:15px}#tg-row small{display:block;font-size:12px;opacity:.7;margin-top:2px}#tg-row .tg-c{margin-left:auto;font-size:20px;opacity:.5}"+
"#tg-ov{position:fixed;inset:0;z-index:100000;background:#f8fafc;color:#0f172a;display:flex;flex-direction:column}"+
"#tg-ov .tg-h{display:flex;align-items:center;gap:10px;padding:14px 16px;background:linear-gradient(135deg,#06b6d4,#2563eb);color:#fff;font-size:18px;font-weight:700}"+
"#tg-ov .tg-h button{background:rgba(255,255,255,.2);border:0;color:#fff;width:36px;height:36px;border-radius:50%;font-size:20px}"+
"#tg-ov .tg-b{flex:1;overflow-y:auto;padding:14px;-webkit-overflow-scrolling:touch}"+
"#tg-ov .tg-s{display:flex;gap:12px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:14px;margin-bottom:10px;box-shadow:0 2px 8px rgba(15,23,42,.05)}"+
"#tg-ov .tg-n{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#06b6d4,#2563eb);display:flex;align-items:center;justify-content:center;font-size:20px;flex:none}"+
"#tg-ov h4{margin:0 0 4px;font-size:15px}#tg-ov p{margin:0;font-size:13.5px;line-height:1.45;color:#475569}";
document.head.appendChild(st);
function isEn(){var t=document.querySelector("#scrParam .ttl");return !!t&&/^\s*Settings\s*$/i.test(t.textContent)}
var S=[
["👤","Créer ton compte","Ouvre TÕÕLé, touche « Créer un compte », remplis tes informations puis connecte-toi.","Create your account","Open TÕÕLé, tap “Create account”, fill in your details, then log in."],
["💬","Envoyer un message","Dans l'onglet Chats, touche le bouton de nouveau message, choisis un contact et écris. Tu peux aussi envoyer photos et vocaux (5 minutes max).","Send a message","In the Chats tab, tap the new message button, pick a contact and write. You can also send photos and voice messages (5 minutes max)."],
["🧭","Explorer","Touche l'icône colorée en haut de l'accueil pour découvrir des personnes et des groupes.","Explore","Tap the colored icon at the top of the home screen to discover people and groups."],
["👥","Groupes","Dans l'onglet Groupes, crée un groupe avec une photo, puis invite tes amis.","Groups","In the Groups tab, create a group with a photo, then invite your friends."],
["🟢","Statuts","Dans l'onglet Statuts, partage un moment avec tes contacts et regarde le leur.","Status","In the Status tab, share a moment with your contacts and watch theirs."],
["🔎","Retrouver une discussion","Utilise la barre de recherche, ou les filtres Tous, Non lus et Favoris.","Find a chat","Use the search bar, or the All, Unread and Favorites filters."],
["🌍","Changer la langue","Dans les Paramètres, choisis Français ou English. Tout l'écran change.","Change language","In Settings, choose Français or English. The whole screen changes."],
["🎁","Inviter un ami","Invite tes amis à rejoindre TÕÕLé avec le lien de l'application.","Invite a friend","Invite your friends to join TÕÕLé with the app link."],
["🔒","Rester en sécurité","Ne partage jamais ton mot de passe. Si tu as un souci, utilise le support.","Stay safe","Never share your password. If you have a problem, contact support."]];
function openG(){var en=isEn();if(document.getElementById("tg-ov"))return;
var o=document.createElement("div");o.id="tg-ov";
var h='<div class="tg-h"><button id="tg-x" type="button">←</button><span>'+(en?"How it works":"Comment ça marche")+'</span></div><div class="tg-b">';
S.forEach(function(s,i){h+='<div class="tg-s"><div class="tg-n">'+s[0]+'</div><div><h4>'+(i+1)+'. '+(en?s[3]:s[1])+'</h4><p>'+(en?s[4]:s[2])+'</p></div></div>'});
o.innerHTML=h+'</div>';document.body.appendChild(o);
document.getElementById("tg-x").onclick=function(){o.remove()}}
function row(){var b=document.querySelector("#scrParam .body");if(!b)return;
var en=isEn(),r=document.getElementById("tg-row");
if(!r){r=document.createElement("div");r.id="tg-row";r.onclick=openG;b.insertBefore(r,b.firstChild)}
if(r.getAttribute("data-l")!==(en?"en":"fr")){r.setAttribute("data-l",en?"en":"fr");
r.innerHTML='<div class="tg-i">?</div><div><b>'+(en?"How it works":"Comment ça marche")+'</b><small>'+(en?"A quick guide to use TÕÕLé":"Un guide rapide pour utiliser TÕÕLé")+'</small></div><span class="tg-c">›</span>'}}
setInterval(row,800);row();
})();
