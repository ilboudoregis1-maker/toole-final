/* TÕÕLé — guide « Comment ça marche » détaillé (FR/EN) + icône Explorer colorée */
(function(){"use strict";if(window.__tguide)return;window.__tguide=1;
var I={
chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
mic:'<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4"/>',
spark:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
compass:'<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
status:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
invite:'<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/>',
sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
bulb:'<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
down:'<path d="M6 9l6 6 6-6"/>',
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
"#tg-ov .tg-b{flex:1;overflow-y:auto;padding:16px 16px 40px;-webkit-overflow-scrolling:touch}"+
"#tg-ov .tg-t{margin:2px 4px 16px;font-size:14.5px;line-height:1.55;color:#475569}"+
"#tg-ov .tg-k{margin:18px 4px 8px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b}"+
"#tg-ov details{background:#fff;border-radius:20px;margin-bottom:12px;box-shadow:0 6px 18px rgba(15,23,42,.07);overflow:hidden}"+
"#tg-ov summary{display:flex;align-items:center;gap:14px;padding:14px 16px;cursor:pointer;list-style:none}"+
"#tg-ov summary::-webkit-details-marker{display:none}"+
"#tg-ov .tg-n{width:46px;height:46px;border-radius:15px;display:flex;align-items:center;justify-content:center;flex:none;box-shadow:0 6px 14px rgba(37,99,235,.28)}"+
"#tg-ov .tg-x{flex:1;min-width:0}#tg-ov .tg-x b{display:block;font-size:16px;letter-spacing:-.01em}#tg-ov .tg-x small{display:block;font-size:13px;color:#64748b;margin-top:2px}"+
"#tg-ov .tg-ch{display:flex;transition:transform .3s ease}#tg-ov details[open] .tg-ch{transform:rotate(180deg)}"+
"#tg-ov .tg-bd{padding:2px 16px 16px}#tg-ov details[open] .tg-bd{animation:tgIn .3s ease}"+
"@keyframes tgIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}"+
"#tg-ov ol,#tg-ov ul{list-style:none;margin:0;padding:0;counter-reset:s}"+
"#tg-ov li{position:relative;padding-left:36px;margin:0 0 11px;font-size:14px;line-height:1.55;color:#334155}"+
"#tg-ov ol li{counter-increment:s}"+
"#tg-ov ol li::before{content:counter(s);position:absolute;left:0;top:0;width:25px;height:25px;border-radius:50%;background:#dbeafe;color:#1d4ed8;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center}"+
"#tg-ov ul li::before{content:'';position:absolute;left:8px;top:8px;width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#2563eb)}"+
"#tg-ov .tg-tip{display:flex;gap:10px;align-items:flex-start;margin-top:6px;padding:12px;border-radius:14px;background:#eff6ff;border:1px solid #bfdbfe;font-size:13px;line-height:1.5;color:#1e3a8a}"+
"#tg-ov .tg-tip svg{flex:none;margin-top:1px}";
document.head.appendChild(st);
function isEn(){var t=document.querySelector("#scrParam .ttl");return !!t&&/^\s*Settings\s*$/i.test(t.textContent)}
var G=["#06b6d4,#2563eb","#3b82f6,#6366f1","#0ea5e9,#0284c7","#8b5cf6,#6366f1","#14b8a6,#0891b2","#6366f1,#2563eb","#0ea5e9,#2563eb","#22c55e,#0d9488","#3b82f6,#06b6d4","#f59e0b,#ef4444","#64748b,#334155"];
var S=[
{i:"chat",
f:{t:"Discussions",s:"Tes conversations avec tes contacts.",st:["Ouvre l'onglet Discussions (en bas à gauche) : tu vois toutes tes conversations.","Touche une conversation pour l'ouvrir et lire les messages.","Un point bleu ou un chiffre veut dire que tu as des messages non lus.","Utilise les filtres en haut : Tous, Non lus ou Favoris (les conversations marquées d'une étoile).","Pour retrouver quelqu'un, écris son nom dans la barre de recherche."],tip:"Touche l'étoile à droite d'une conversation pour la mettre en favori."},
e:{t:"Chats",s:"Your conversations with your contacts.",st:["Open the Chats tab (bottom left): you see all your conversations.","Tap a conversation to open it and read the messages.","A blue dot or a number means you have unread messages.","Use the filters at the top: All, Unread or Favorites (chats marked with a star).","To find someone, type their name in the search bar."],tip:"Tap the star on the right of a chat to make it a favorite."}},
{i:"send",
f:{t:"Écrire un message",s:"Envoyer un message, une photo ou un fichier.",st:["Touche le grand bouton + au centre, en bas de l'écran.","Choisis un contact dans la liste.","Écris ton message dans la zone de texte, puis touche le bouton d'envoi.","Pour joindre une photo ou un fichier, touche le trombone à gauche.","Pour ajouter un emoji, touche le visage souriant."],tip:"Une coche veut dire : message envoyé. Deux coches : message arrivé chez la personne."},
e:{t:"Write a message",s:"Send a message, a photo or a file.",st:["Tap the big + button at the bottom center.","Pick a contact from the list.","Type your message in the text box, then tap the send button.","To attach a photo or a file, tap the paperclip on the left.","To add an emoji, tap the smiley face."],tip:"One tick means: message sent. Two ticks: message delivered to the person."}},
{i:"mic",
f:{t:"Messages vocaux",s:"Parler au lieu d'écrire.",st:["Utilise le micro, à droite de la zone de texte, pour enregistrer ta voix.","Un vocal dure 5 minutes au maximum.","Envoie-le quand tu as fini.","Pour écouter un vocal, touche le bouton de lecture. Tu peux accélérer (×1,25, ×1,5 ou ×2)."],tip:"Pratique quand tu n'as pas le temps d'écrire."},
e:{t:"Voice messages",s:"Talk instead of typing.",st:["Use the microphone, on the right of the text box, to record your voice.","A voice message lasts 5 minutes at most.","Send it when you are done.","To listen, tap the play button. You can speed it up (×1.25, ×1.5 or ×2)."],tip:"Handy when you don't have time to type."}},
{i:"spark",
f:{t:"Idées de conversation",s:"Quand tu ne sais pas quoi dire.",st:["Ouvre une discussion.","Touche l'étoile ✦ près de la zone de texte.","Parcours les idées de sujets proposées et choisis celle qui te plaît."],tip:"Idéal pour lancer la conversation avec un nouveau contact."},
e:{t:"Conversation ideas",s:"When you don't know what to say.",st:["Open a chat.","Tap the ✦ star near the text box.","Browse the suggested topics and pick the one you like."],tip:"Great to start a chat with a new contact."}},
{i:"compass",
f:{t:"Explorer",s:"Découvre de nouvelles personnes et de nouveaux groupes.",st:["Sur l'accueil, touche la boussole colorée en haut à droite.","Parcours les personnes et les groupes proposés.","Touche une personne pour voir son profil et sa photo."],tip:"Explorer sert à faire de nouvelles rencontres."},
e:{t:"Explore",s:"Discover new people and new groups.",st:["On the home screen, tap the colored compass at the top right.","Browse the suggested people and groups.","Tap a person to see their profile and photo."],tip:"Explore is made for meeting new people."}},
{i:"status",
f:{t:"Statuts",s:"Partage un moment avec tes contacts.",st:["En haut de l'accueil, touche « Mon statut » (le cercle avec un +).","Ajoute ce que tu veux partager.","Tes contacts le voient en haut de leur accueil.","Pour voir le statut d'un contact, touche son cercle."],tip:"Un anneau bleu autour d'une photo veut dire qu'il y a un statut à voir. Le petit chiffre indique combien."},
e:{t:"Status",s:"Share a moment with your contacts.",st:["At the top of the home screen, tap “My status” (the circle with a +).","Add what you want to share.","Your contacts see it at the top of their home screen.","To watch a contact's status, tap their circle."],tip:"A blue ring around a photo means there is a status to watch. The small number tells you how many."}},
{i:"users",
f:{t:"Groupes et communautés",s:"Parler à plusieurs.",st:["Ouvre l'onglet Communautés (en bas).","Retrouve tes groupes ou crées-en un nouveau.","Donne un nom et une photo au groupe.","Invite tes amis pour qu'ils le rejoignent."],tip:"Un groupe est pratique pour la famille, les amis ou le travail."},
e:{t:"Groups and communities",s:"Talk with several people.",st:["Open the Communities tab (at the bottom).","Find your groups or create a new one.","Give the group a name and a photo.","Invite your friends to join it."],tip:"A group is handy for family, friends or work."}},
{i:"phone",
f:{t:"Appels",s:"Appeler tes contacts.",st:["Ouvre l'onglet Appels (en bas à droite) pour voir tes appels passés, reçus ou manqués.","Pour appeler, utilise l'onglet Appels ou l'icône d'appel dans la discussion."],tip:"Un appel manqué reste affiché dans l'historique."},
e:{t:"Calls",s:"Call your contacts.",st:["Open the Calls tab (bottom right) to see your past, received or missed calls.","To call, use the Calls tab or the call icon inside a chat."],tip:"A missed call stays in your history."}},
{i:"user",
f:{t:"Profil et contacts",s:"Voir une photo, retrouver et gérer tes contacts.",st:["Dans une discussion, touche la photo de ton contact pour l'agrandir.","Ouvre l'onglet Contacts pour voir toutes les personnes enregistrées.","Dans le profil d'un contact, tu peux le bloquer ou le débloquer.","Ta propre photo de profil se change depuis ton profil."],tip:"Bloquer quelqu'un l'empêche de t'écrire. Tu peux le débloquer quand tu veux."},
e:{t:"Profile and contacts",s:"View a photo, find and manage your contacts.",st:["In a chat, tap your contact's photo to enlarge it.","Open the Contacts tab to see everyone you saved.","In a contact's profile, you can block or unblock them.","Your own profile photo is changed from your profile."],tip:"Blocking someone stops them from writing to you. You can unblock them anytime."}},
{i:"invite",
f:{t:"Inviter un ami",s:"Faire venir tes amis sur TÕÕLé.",st:["Ouvre l'option « Inviter un ami ».","Choisis comment l'envoyer : SMS ou WhatsApp.","Le message avec le lien de l'application est déjà prêt : il te reste à l'envoyer."],tip:"Plus tes amis sont nombreux sur TÕÕLé, plus c'est agréable."},
e:{t:"Invite a friend",s:"Bring your friends to TÕÕLé.",st:["Open the “Invite a friend” option.","Choose how to send it: SMS or WhatsApp.","The message with the app link is already written: just send it."],tip:"The more friends on TÕÕLé, the better it gets."}},
{i:"sliders",
f:{t:"Paramètres",s:"Langue et confort de lecture.",st:["Ouvre les Paramètres.","Choisis la langue : Français ou English.","Règle la taille du texte si tu lis difficilement."],tip:"Tout l'écran change tout de suite quand tu changes de langue."},
e:{t:"Settings",s:"Language and reading comfort.",st:["Open Settings.","Choose the language: Français or English.","Adjust the text size if it is hard to read."],tip:"The whole screen changes right away when you change language."}}];
var X=[
{i:"book",u:1,
f:{t:"Les mots à connaître",s:"Le vocabulaire de l'application.",st:["<b>Discussion</b> : une conversation avec une personne.","<b>Contact</b> : une personne enregistrée dans ton application.","<b>Groupe</b> : une conversation à plusieurs.","<b>Statut</b> : un message ou une photo que tes contacts peuvent voir.","<b>Vocal</b> : un message enregistré avec ta voix.","<b>Favori</b> : une conversation marquée d'une étoile, pour la retrouver vite."]},
e:{t:"Words to know",s:"The app vocabulary.",st:["<b>Chat</b>: a conversation with one person.","<b>Contact</b>: a person saved in your app.","<b>Group</b>: a conversation with several people.","<b>Status</b>: a message or photo your contacts can see.","<b>Voice message</b>: a message recorded with your voice.","<b>Favorite</b>: a chat marked with a star, to find it quickly."]}},
{i:"help",u:1,
f:{t:"Un souci ?",s:"Les petits problèmes courants.",st:["<b>Mon message ne part pas.</b> Vérifie ta connexion internet puis réessaie.","<b>Je ne vois pas les nouveaux messages.</b> Attends quelques secondes, ou ferme puis rouvre l'application.","<b>Je ne trouve pas quelqu'un.</b> Écris son nom dans la barre de recherche de l'accueil, ou regarde dans Contacts."]},
e:{t:"Having trouble?",s:"Common little problems.",st:["<b>My message won't send.</b> Check your internet connection, then try again.","<b>I can't see new messages.</b> Wait a few seconds, or close and reopen the app.","<b>I can't find someone.</b> Type their name in the home search bar, or look in Contacts."]}}];
function sec(x,l,g,o){var d=x[l];
return '<details'+(o?' open':'')+'><summary><span class="tg-n" style="background:linear-gradient(135deg,'+g+')">'+sv(x.i,22)+'</span><span class="tg-x"><b>'+d.t+'</b><small>'+d.s+'</small></span><span class="tg-ch">'+sv("down",18,"#64748b")+'</span></summary><div class="tg-bd"><'+(x.u?"ul":"ol")+'>'+d.st.map(function(t){return "<li>"+t+"</li>"}).join("")+'</'+(x.u?"ul":"ol")+'>'+(d.tip?'<div class="tg-tip">'+sv("bulb",16,"#2563eb")+'<span>'+d.tip+'</span></div>':"")+'</div></details>'}
function openG(){if(document.getElementById("tg-ov"))return;var en=isEn(),l=en?"e":"f";
var o=document.createElement("div");o.id="tg-ov";
var h='<div class="tg-h"><button id="tg-x" type="button" aria-label="Back">'+sv("back",22)+'</button><span>'+(en?"How it works":"Comment ça marche")+'</span></div><div class="tg-b">'+
'<div class="tg-t">'+(en?"Welcome to TÕÕLé! Tap a topic below to see, step by step, how it works. No experience needed.":"Bienvenue sur TÕÕLé ! Touche une rubrique ci-dessous pour voir, étape par étape, comment ça marche. Aucune expérience n'est nécessaire.")+'</div>'+
'<div class="tg-k">'+(en?"Using the app":"Utiliser l'application")+'</div>';
S.forEach(function(s,i){h+=sec(s,l,G[i],i===0)});
h+='<div class="tg-k">'+(en?"Good to know":"Bon à savoir")+'</div>';
X.forEach(function(s,i){h+=sec(s,l,G[9+i],false)});
o.innerHTML=h+'</div>';document.body.appendChild(o);
document.getElementById("tg-x").onclick=function(){o.remove()}}
function row(){var b=document.querySelector("#scrParam .body");if(!b)return;
var en=isEn(),r=document.getElementById("tg-row");
if(!r){r=document.createElement("div");r.id="tg-row";r.onclick=openG;b.insertBefore(r,b.firstChild)}
var l=en?"en":"fr";
if(r.getAttribute("data-l")!==l){r.setAttribute("data-l",l);
r.innerHTML='<div class="tg-i">'+sv("help",22)+'</div><div><b>'+(en?"How it works":"Comment ça marche")+'</b><small>'+(en?"A simple step-by-step guide":"Un guide simple, étape par étape")+'</small></div><span class="tg-c">'+sv("next",20,"#0f172a")+'</span>'}}
function P(e,k,v){e.style.setProperty(k,v,"important")}
function colorize(){var b=document.querySelector("#scrList .hdr .zd-ic");if(!b)return;
P(b,"background","linear-gradient(135deg,#06b6d4,#2563eb)");P(b,"color","#fff");P(b,"opacity","1");P(b,"filter","none");
var s=b.querySelector("svg");if(!s)return;
P(s,"width","22px");P(s,"height","22px");P(s,"color","#fff");P(s,"opacity","1");
[].forEach.call(s.querySelectorAll("*"),function(n){P(n,"opacity","1");P(n,"stroke","#fff");P(n,"fill",n.tagName==="path"?"#fff":"none")})}
setInterval(function(){row();colorize()},500);row();colorize();
})();
