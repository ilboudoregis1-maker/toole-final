/* TÕÕLé — fenêtre des stickers organisée en catégories (chargé après toole-stk5.js) */
(function(){"use strict";if(window.__tstkorg)return;window.__tstkorg=1;
var NAMES=["Salutations","Réponses","Émotions","Amour & amitié","Nourriture","Boissons","Sport","Fêtes","Météo & nature","Animaux","Travail & études","Transports & lieux","Messages & appels","Santé & repos","Argent & commerce","Vœux & foi","Musique & danse","Famille & foyer","Faso & fierté","Temps & moments","Bravo & courage","Objets & divers"];
var ICONS=["👋","✅","😊","❤️","🍽️","🥤","⚽","🎉","☀️","🐾","💼","🚗","📱","🩺","💰","🙏","🎵","👨‍👩‍👧","🇧🇫","⏰","👏","📦"];
function nz2(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s]/g," ")}
var R=[[0,/\b(salut|coucou|bonjour|bonsoir|bonne nuit|bonne journee|bon week|bonne semaine|bon reveil|au revoir|a demain|a bientot|a tout|bon retour|bonne route|bienvenue|salam|yako|ca va|belle soiree|bonne annee|joyeuses)\b/],
[20,/\b(merci|barka|bravo|respect|chapeau|felicitations|bien joue|tu geres|tu dechires|talent|impressionnant|magnifique|excellent|top|genial|parfait|nickel|champion|boss|bon boulot|trop fort|super|roi|reine|force|courage|chef|bonne chance|reste fort|incroyable|mission accomplie|valide)\b/],
[1,/\b(oui|non|peut etre|sais pas|ok|d accord|bien recu|compris|attends|vite|doucement|patience|bien sur|evidemment|exactement|confirm|confirme|pas de souci|aucun probleme|ca roule|je gere|ca marche|jamais|laisse tomber|tant pis|pas question|on y va|c est parti|tout de suite|c est fait|ca ira|tout va bien|bof)\b/],
[13,/\b(pharmacie|pansement|pilule|seringue|malade|dodo|sieste|fatigue|creve|repos|dors|infirmier|hopital|medecin|docteur|soin|soin de toi)\b/],
[8,/\b(pluie|pleut|chaud|chaleur|chauffe|froid|orage|parapluie|soleil|neige|mer|vent|nuage|arc en ciel|brouillard|harmattan|il fait beau)\b/],
[16,/\b(musique|danse|danser|chante|guitare|sax|saxophone|micro|djembe|tam tam|ambiance|casque)\b/],
[6,/\b(foot|but|match|victoire|perdu|nul|gagne|ballon|trophee|medaille|sifflet|volley|carton)\b/],
[18,/\b(faso|etalons|drapeau|fier|on est ensemble)\b/],
[7,/\b(anniv|cadeau|fete|gateau|vacances|plage|voyage|soiree|surprise|bougies|mariage|bapteme|feux d artifice|on sort)\b/],
[3,/\b(love|amour|coeur|bisou|bisous|cherie|cheri|manques|pense a toi|mignon|adorable|amoureux|rose|fleurs|ami|amis|je t aime|calin|pardon|desole)\b/],
[17,/\b(maman|papa|bebe|famille|frere|soeur|maison|bande|les gars|les filles)\b/],
[2,/\b(mdr|mdrrr|lol|haha|rire|drole|wow|choc|peur|oups|gene|triste|cool|ouf|bizarre|vertige|boum|sourire|joie|content|swag|style|classe|beau gosse|belle gosse|halluc|fou|dommage|sans voix|doute|reflechis|secret|chut|regarde|ecoute|grrr|craque|enerve|pleure|stresse|fache|calme toi|serieux|hein|ca fait mal)\b/],
[4,/\b(poisson|pain|banane|melon|ananas|mais|oeuf|citron|orange|tomate|piment|carotte|noix|mangue|assiette|cuisinier|appetit|faim|dejeuner|miam|delicieux|gourmand|burger|pizza|glace|bonbon|plat|to)\b/],
[5,/\b(the|eau|jus|biere|cafe|pause cafe|boisson)\b/],
[10,/\b(travail|bosse|bureau|reunion|projet|equipe|cours|examen|revisions|devoirs|resultats|reussi|diplome|etudie|stylo|livre|boulot|job|ordinateur|idee|dossier|urgent|rendez vous|disponible|occupe)\b/],
[14,/\b(argent|paiement|riche|franc|salaire|prix|acheter|vendre|banque|caisse)\b/],
[12,/\b(message|appel|appelle|rappelle|reponds|ecris moi|photo|selfie|telephone|lettre|vocal)\b/],
[11,/\b(voiture|bus|moto|velo|route|avion|gare|ville|ecole|eglise|marche|chariot|minibus|tricycle)\b/],
[15,/\b(dieu|priere|beni|benediction|foi|amen)\b/],
[19,/\b(midi|matin|soir|demain|bientot|heure|min|moment|hier|j arrive|je rentre|je pars)\b/],
[9,/\b(lion|zebre|mouton|lapin|tortue|hibou|hippopotame|scorpion|abeille|chat|chien|cheval|tigre|oiseau|poule)\b/]];
function cls(l){var k=nz2(l);for(var i=0;i<R.length;i++)if(R[i][1].test(k))return R[i][0];return 21}
var counts={},nTag=0;
function tag(){var L=window.__tsvg_lab||[],E=window.__tstk_en=window.__tstk_en||{};if(nTag===L.length)return;nTag=L.length;counts={};
L.forEach(function(l){var e=E[l]||"",m=/zc(\d+)z/.exec(e),idx;if(m)idx=+m[1];else{var pos=1e9;idx=-1;for(var i=0;i<20;i++){var p=e.indexOf(NAMES[i]);if(p>-1&&p<pos){pos=p;idx=i}}if(idx<0)idx=cls(l);E[l]=e+" zc"+idx+"z"}counts[idx]=(counts[idx]||0)+1})}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var css=el("style");css.textContent=".zo-home{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-content:start;grid-auto-rows:max-content;padding:2px 0 24px}.zo-b{border:0;border-radius:20px;padding:14px 6px 10px;display:flex;flex-direction:column;align-items:center;gap:4px;color:#fff;font-family:inherit;box-shadow:0 4px 12px rgba(0,100,140,.2)}.zo-b:active{transform:scale(.95)}.zo-b i{font-style:normal;font-size:30px;line-height:1.1}.zo-b b{font-size:12.5px;font-weight:800;text-align:center;line-height:1.15}.zo-b span{font-size:11px;opacity:.9}.zo-bar{display:none;align-items:center;gap:10px;flex:0 0 auto;margin-bottom:8px}.zo-bar button{border:0;border-radius:14px;padding:8px 14px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00d4ff,#0a7cff);font-family:inherit}.zo-bar b{font-size:15px;color:#0b2a3a;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";document.head.appendChild(css);
function deco(ov){var q=ov.querySelector("input[type=search]"),grid=ov.querySelector("div[style*='repeat(4']"),t0=ov.querySelector(".tsstab");if(!q||!grid||!t0||ov.querySelector(".zo-home"))return;
tag();var old=ov.querySelector(".tk4c");if(old)old.remove();
var sh=grid.parentNode,tabs=t0.parentNode,bAll=tabs.children[0],bFav=tabs.children[1],SENT="zzq9z",busy=false;
var home=el("div","zo-home"),bar=el("div","zo-bar"),back=el("button","","‹ Catégories"),ttl=el("b","","");bar.appendChild(back);bar.appendChild(ttl);sh.insertBefore(bar,grid);sh.insertBefore(home,grid);
function fire(v){busy=true;q.value=v;q.dispatchEvent(new Event("input",{bubbles:true}));busy=false}
function showHome(){fire(SENT);grid.style.setProperty("display","none","important");bar.style.display="none";home.style.display="grid";home.scrollTop=0}
function showList(title,query){home.style.display="none";bar.style.display="flex";ttl.textContent=title;fire(query)}
function block(ic,name,n,h,f){var b=el("button","zo-b");b.type="button";b.style.background="linear-gradient(135deg,hsl("+h+",85%,58%),hsl("+(h+28)+",80%,46%))";b.appendChild(el("i","",ic));b.appendChild(el("b","",name));if(n!=null)b.appendChild(el("span","",n+" stickers"));b.onclick=f;home.appendChild(b)}
var fv=0;try{fv=(window.__tfav&&window.__tfav.get().length)||0}catch(e){}
block("⭐","Favoris",fv,45,function(){bFav.click();setTimeout(function(){home.style.display="none";bar.style.display="flex";ttl.textContent="⭐ Favoris"},0)});
var my=0;try{my=JSON.parse(localStorage.getItem("tsstk_mine")||"[]").length}catch(e){}
if(my)block("🖼️","Mes stickers",my,200,function(){showList("🖼️ Mes stickers","mes stickers")});
if(window.__tmasc_n)block("🦁","Mascottes",window.__tmasc_n,20,function(){showList("🦁 Mascottes","mascotte")});
NAMES.forEach(function(nm,i){var n=counts[i]||0;if(!n)return;block(ICONS[i],nm,n,(i*47+190)%360,function(){showList(ICONS[i]+" "+nm+" ("+n+")","zc"+i+"z")})});
back.onclick=showHome;
bAll.addEventListener("click",function(){setTimeout(showHome,0)});
q.addEventListener("input",function(){if(busy)return;var v=q.value.trim();if(!v){showHome();return}home.style.display="none";bar.style.display="flex";ttl.textContent="🔍 Résultats"});
if(bFav.className.indexOf("on")>-1){home.style.display="none";bar.style.display="flex";ttl.textContent="⭐ Favoris"}else showHome()}
tag();
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){if(n.id==="tstk3")setTimeout(function(){deco(n)},80)})})}).observe(document.body,{childList:true});
})();
