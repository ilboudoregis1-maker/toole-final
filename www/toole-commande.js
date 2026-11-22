(function(){
if(window.TooleCmd)return;
var CN="44383201",RATE=0.05;
var BTN="display:block;width:100%;margin-top:10px;border:0;border-radius:12px;padding:12px;"+
"font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)";

var BTN2="display:block;width:100%;margin-top:10px;border:1px solid rgba(128,128,128,.45);"+
"border-radius:12px;padding:12px;font-size:14px;font-weight:700;color:inherit;background:transparent";

var INP="display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:11px;border-radius:10px;"+
"border:1px solid rgba(128,128,128,.4);font-size:15px;background:transparent;color:inherit";

var CARD="padding:12px;margin-top:10px;border-radius:14px;border:1px solid rgba(128,128,128,.3);"+
"background:rgba(128,128,128,.07)";
var ST={commande:"En attente de paiement",paye:"Payé · à livrer",commission_declaree:"Commission "+
"déclarée",termine:"Terminé",annule:"Annulé"};
var RANK={paye:0,commande:1,commission_declaree:2,termine:3,annule:4};
function E(t,c,h){var e=document.createElement(t);if(c)e.style.cssText=c;if(h!=null)e.innerHTML=h;
return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{
"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return sess().user.id}catch(e){
return null}}
async function A(path,opt){var r=await api(path,opt||{});if(r&&typeof r.json==="function"){
try{r=await r.json()}catch(e){r=null}}return r}
function fmt(n){try{return new Intl.NumberFormat("fr-FR").format(n)+" FCFA"}catch(e){
return n+" FCFA"}}
function toast(m){var x=E("div","position:fixed;left:50%;bottom:90px;transform:translateX(-50%);"+
"background:#111;color:#fff;padding:10px 16px;border-radius:20px;font-size:14px;z-index:2147483600;"+
"max-width:80%;text-align:center",esc(m));document.body.appendChild(x);setTimeout(function(){
x.remove()},3200)}
function com(p){return Math.round(p*RATE)}
function dial(code){window.location.href="tel:"+code.replace(/#/g,"%23")}
function skin(){var c=getComputedStyle(document.body),bg=c.backgroundColor;if(!bg||bg==="transparent"||bg==="rgba(0, "+
"0, 0, 0)"){bg=getComputedStyle(document.documentElement).backgroundColor;if(!bg||bg==="transparent"||bg==="rgba(0, "+
"0, 0, 0)")bg="#fff"}return{bg:bg,fg:c.color||"#111"}}
function ovl(title){var k=skin(),o=E("div","position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147481000;"+
"overflow-y:auto;background:"+k.bg+";color:"+k.fg+";font-family:system-ui,sans-serif;padding:calc(12px "+
"+ env(safe-area-inset-top,0px)) 14px calc(16px + env(safe-area-inset-bottom,0px))");

var h=E("div","display:flex;align-items:center;gap:8px;margin-bottom:12px"),b=E("button",
"border:0;background:transparent;font-size:24px;padding:2px 8px;color:inherit","←");
b.type="button";b.onclick=function(){o.remove()};h.appendChild(b);h.appendChild(E("div",
"font-weight:800;font-size:17px",esc(title)));o.appendChild(h);document.body.appendChild(o);
return o}
function shrink(f){return new Promise(function(res,rej){var u=window.URL.createObjectURL(f),
im=new Image();
im.onload=function(){var M=1100,w=im.naturalWidth,h=im.naturalHeight,k=Math.min(1,
M/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);
c.getContext("2d").drawImage(im,0,0,c.width,c.height);window.URL.revokeObjectURL(u);
c.toBlob(function(b){b?res(b):rej()},"image/jpeg",0.8)};
im.onerror=rej;im.src=u})}
function pick(done){var f=E("input");f.type="file";f.accept="image/*";f.onchange=function(){
var x=f.files&&f.files[0];if(!x)return;shrink(x).then(done).catch(function(){toast("Photo "+
"illisible")})};f.click()}
function show(box,ref){if(!ref||!window.tgUrl)return;var im=E("img","display:block;width:100%;"+
"max-height:300px;object-fit:contain;border-radius:10px;margin-top:8px");box.appendChild(im);

fetch(window.tgUrl(ref,"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){
im.src=window.URL.createObjectURL(b)}).catch(function(){im.remove()})}
async function pname(uid){try{var r=await A("/rest/v1/profiles?select=*&id=eq."+uid);
if(r&&r[0]){var p=r[0],n=((p.prenom||"")+" "+(p.nom||"")).trim();return n||p.pseudo||"Client"}}catch(e){
}return "Client"}
async function momoOf(uid){try{var r=await A("/rest/v1/business_accounts?select=momo&user_id=eq."+
uid);if(r&&r[0]&&r[0].momo)return String(r[0].momo)}catch(e){}return null}
function ussd(kind,num,amt){return kind==="b"?"*144*2*1*"+num+"*"+amt+"#":"*144*10*"+
num+"*"+amt+"#"}
var POL=[
["1. Objet","Cette politique encadre l’ouverture et l’usage des boutiques sur TÕÕLé. Elle "+
"s’applique aux marchands et aux acheteurs dès qu’ils utilisent la section Boutiques. La lire "+
"jusqu’au bout est obligatoire avant toute demande d’ouverture."],
["2. Ouverture d’une boutique","L’ouverture est payante (1000 FCFA, à régler une fois la demande "+
"traitée). Elle exige : le nom de la boutique, un numéro de réception Orange Money valide, "+
"et la photo d’une pièce d’identité officielle lisible (CNIB, passeport ou permis). Toute "+
"information fausse, pièce d’un tiers ou pièce falsifiée entraîne le refus ou la fermeture "+
"immédiate."],
["3. Pièce d’identité","La pièce d’identité sert uniquement à vérifier l’identité du marchand "+
"et à prévenir la fraude. Elle n’est jamais visible des autres utilisateurs. Elle n’est consultée "+
"que par l’équipe TÕÕLé habilitée et peut être transmise aux autorités compétentes en cas "+
"d’infraction."],
["4. Produits et services interdits","Sont interdits : armes, drogues, médicaments non autorisés, "+
"produits contrefaits ou volés, contenus sexuels, produits dangereux, et tout article dont "+
"la vente est interdite par la loi du Burkina Faso."],
["5. Commandes et paiements","Quand l’acheteur confirme une commande, il atteste avoir commandé "+
"le produit au prix affiché. Le paiement se fait directement de l’acheteur vers le marchand "+
"par Orange Money. TÕÕLé n’est pas partie à la vente, ne détient pas l’argent des acheteurs "+
"et ne garantit pas la livraison. L’acheteur doit envoyer la capture de la transaction avec "+
"« J’ai payé »."],
["6. Commission TÕÕLé","Pour chaque vente payée, le marchand doit à TÕÕLé une commission de "+
"5 % du prix affiché. Elle doit être réglée dans les 48 heures qui suivent la déclaration "+
"de paiement de l’acheteur, via le bouton « Payer la commission ». Aucune vente ne peut être "+
"conclue en dehors de TÕÕLé pour éviter la commission."],
["7. Obligations du marchand","Livrer le produit conforme à sa description et à son prix, "+
"répondre aux clients, ne jamais demander un paiement supplémentaire hors du prix affiché, "+
"ne pas modifier le prix après commande, et déclarer honnêtement chaque vente."],

["8. Obligations de l’acheteur","Ne confirmer une commande que s’il veut réellement acheter, "+
"ne jamais envoyer une fausse capture ou une capture modifiée, et signaler tout problème au "+
"marchand puis à TÕÕLé."],
["9. Sanctions","Selon la gravité et la répétition des faits : 1) avertissement ; 2) suspension "+
"de la boutique de 7 jours ; 3) suspension jusqu’au paiement de la commission due ; 4) fermeture "+
"définitive de la boutique sans remboursement des frais d’ouverture ; 5) blocage du compte "+
"TÕÕLé ; 6) signalement aux autorités et poursuites possibles."],
["10. Cas précis","Commission non payée après 48 h : suspension automatique de la boutique "+
"jusqu’au règlement. Non payée après 7 jours : fermeture définitive. Fausse capture, fausse "+
"pièce d’identité, arnaque ou vente de produit interdit : fermeture immédiate, blocage du "+
"compte et signalement."],
["11. Litiges","Les litiges se règlent d’abord à l’amiable entre acheteur et marchand. TÕÕLé "+
"peut examiner les messages et les captures pour décider d’une sanction, mais ne rembourse "+
"pas les achats."],
["12. Modification et acceptation","TÕÕLé peut modifier cette politique ; la version en vigueur "+
"est celle affichée dans l’appli. Cliquer sur « J’ai lu et j’accepte » vaut acceptation complète. "+
"Droit applicable : lois du Burkina Faso."]
];
function policy(cb){
var o=ovl("Politique des boutiques");
o.appendChild(E("div","font-size:13px;opacity:.8;margin-bottom:8px","À lire jusqu’en bas avant "+
"de continuer."));
POL.forEach(function(s){o.appendChild(E("div","margin-top:14px","<div style='font-weight:800;"+
"font-size:15px'>"+esc(s[0])+"</div><div style='font-size:14px;line-height:1.5;margin-top:4px;"+
"opacity:.92'>"+esc(s[1])+"</div>"))});
var ok=E("button",BTN,cb?"J’ai lu et j’accepte":"Fermer");ok.type="button";
if(cb){ok.disabled=true;ok.style.opacity=".45";
var chk=function(){if(o.scrollTop+o.clientHeight>=o.scrollHeight-30){ok.disabled=false;
ok.style.opacity="1"}};
o.addEventListener("scroll",chk);setTimeout(chk,300)}
ok.onclick=function(){o.remove();if(cb)cb()};o.appendChild(ok)}
function demande(BOX,draw){
var acc=false,idBlob=null;
BOX.appendChild(E("div","font-size:13px;opacity:.85;margin-top:8px;line-height:1.45",
"Pour ouvrir une boutique, le traitement exige la photo d’une pièce d’identité."));

var n=E("input",INP);n.maxLength=60;n.placeholder="Nom de ta boutique";
var d=E("textarea",INP+";min-height:80px");d.maxLength=500;d.placeholder="Description : produits, "+
"services…";
var m=E("input",INP);m.type="tel";m.inputMode="numeric";m.placeholder="Numéro Orange Money "+
"de réception";
var pv=E("img","display:none;width:100%;max-height:200px;object-fit:cover;border-radius:12px;"+
"margin-top:10px");
var pb=E("button",BTN2,"📷 Photo de ma pièce d’identité");pb.type="button";
pb.onclick=function(){pick(function(b){idBlob=b;pv.src=window.URL.createObjectURL(b);
pv.style.display="block";pb.textContent="📷 Changer la photo"})};
var rb=E("button",BTN2,"📜 Lire la politique (obligatoire)");rb.type="button";
rb.onclick=function(){policy(function(){acc=true;rb.textContent="✅ Politique lue et acceptée"})};

var go=E("button",BTN,"Envoyer la demande");go.type="button";
var er=E("div","font-size:13px;color:#e5484d;margin-top:8px");
[n,d,m,pb,pv,rb,go,er].forEach(function(x){BOX.appendChild(x)});
go.onclick=async function(){
var nm=n.value.trim(),num=m.value.replace(/\D/g,"");
if(num.length>8&&num.indexOf("226")===0)num=num.slice(3);
if(nm.length<2){er.textContent="Donne un nom à ta boutique.";return}
if(num.length!==8){er.textContent="Numéro Orange Money invalide (8 chiffres).";return}
if(!idBlob){er.textContent="La photo de la pièce d’identité est obligatoire.";return}
if(!acc){er.textContent="Lis et accepte la politique avant de continuer.";return}
go.disabled=true;er.textContent="Envoi…";var ref=ME()+"/id-"+Date.now()+".jpg";
window.__e2ePlain=window.__e2ePlain||{};window.__e2ePlain[ref]=1;try{await window.tgUpload(idBlob,ref)}catch(e){go.disabled=false;er.textContent="Photo non "+
"envoyée. Réessaie.";return}
try{await A("/rest/v1/business_requests",{method:"POST",headers:{Prefer:"return=minimal"},
body:JSON.stringify({user_id:ME(),shop_name:nm,description:d.value.trim()||null,momo:num,
id_ref:ref,policy_at:new Date().toISOString()})});draw({k:"en_attente",n:nm})}
catch(e){go.disabled=false;er.textContent=/duplicate|23505|une_ouverte/i.test(String(e&&e.message))?"Tu "+
"as déjà une demande en attente.":"Envoi impossible. Réessaie."}}}
function payScreen(r,mo){
var o=ovl("Paiement");
o.appendChild(E("div",CARD,"<b>"+esc(r.product_name)+"</b><br>Boutique : "+esc(r.shop_name)+
"<br>Montant à envoyer : <b>"+fmt(r.price)+"</b>"));
var a=E("button",BTN,"📲 Payer avec Orange Money");a.type="button";a.onclick=function(){
dial(ussd("a",mo,r.price))};o.appendChild(a);
var b=E("button",BTN2,"Autre code (*144*2*1*…)");b.type="button";b.onclick=function(){
dial(ussd("b",mo,r.price))};o.appendChild(b);
o.appendChild(E("div","font-size:12px;opacity:.75;margin-top:8px;line-height:1.4",
"Le composeur s’ouvre avec le code prêt : appuie sur Appeler pour valider, puis reviens ici."));

var pd=E("button",BTN,"✅ J’ai payé (joindre la capture)");pd.type="button";
pd.onclick=function(){pick(async function(blob){
pd.disabled=true;var ref=ME()+"/pay-"+Date.now()+".jpg";
window.__e2ePlain=window.__e2ePlain||{};window.__e2ePlain[ref]=1;try{await window.tgUpload(blob,ref)}catch(e){pd.disabled=false;toast("Capture non envoyée, "+
"réessaie.");return}
try{await A("/rest/v1/business_orders?id=eq."+r.id,{method:"PATCH",headers:{Prefer:"return=minimal"},
body:JSON.stringify({statut:"paye",proof_ref:ref,paid_at:new Date().toISOString()})})}
catch(e){pd.disabled=false;toast("Envoi impossible, réessaie.");return}
try{await A("/rest/v1/messages",{method:"POST",headers:{Prefer:"return=minimal"},
body:JSON.stringify({sender:ME(),receiver:r.seller_id,body:"✅ "+(r.buyer_name||"Un client")+
" a payé « "+r.product_name+" » ("+fmt(r.price)+").\nLa capture est dans Commandes reçues."})})}catch(e){
}
o.remove();toast("Paiement signalé au marchand")})};
o.appendChild(pd)}
async function order(s,p){
var o=ovl("Confirmer la commande"),nm=await pname(s.user_id),mo=await momoOf(s.user_id);

o.appendChild(E("div",CARD,"Vous attestez avoir commandé <b>"+esc(p.name)+"</b> à <b>"+
esc(nm)+"</b> (boutique "+esc(s.shop_name)+") au coût de <b>"+fmt(p.price)+"</b>."));

var go=E("button",BTN,"Je confirme et je paie "+fmt(p.price));go.type="button";
if(!mo){go.disabled=true;go.style.opacity=".45";o.appendChild(E("div","font-size:13px;color:#e5484d;"+
"margin-top:8px","Ce vendeur n’a pas encore renseigné son numéro de réception. Contacte-le "+
"par message."))}
go.onclick=async function(){
go.disabled=true;var by=await pname(ME()),row=null;
try{var r=await A("/rest/v1/business_orders",{method:"POST",headers:{Prefer:"return=representation"},
body:JSON.stringify({product_id:p.id,product_name:p.name,price:p.price,commission:com(p.price),
shop_name:s.shop_name,seller_id:s.user_id,buyer_id:ME(),buyer_name:by})});row=Array.isArray(r)?r[0]:r}catch(e){
}
if(!row||!row.id){go.disabled=false;toast("Commande impossible, réessaie.");return}
try{await A("/rest/v1/business_interest",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},
body:JSON.stringify({product_id:p.id,user_id:ME()})})}catch(e){}
try{await A("/rest/v1/messages",{method:"POST",headers:{Prefer:"return=minimal"},
body:JSON.stringify({sender:ME(),receiver:s.user_id,body:"🛍️ Commande · "+p.name+
" · "+fmt(p.price)+"\nBoutique : "+s.shop_name+"\nDe : "+by+"\nEn attente de paiement."})})}catch(e){
}
o.remove();payScreen(row,mo)};
o.appendChild(go);
var lk=E("button",BTN2,"📜 Politique des boutiques");lk.type="button";lk.onclick=function(){
policy()};o.appendChild(lk)}
function badge(s){var c=s==="paye"?"#10b981":s==="commande"?"#f5a524":s==="annule"?"#e5484d":"#2f6fe0";
return "<span style='font-size:11px;font-weight:800;color:#fff;background:"+c+";border-radius:10px;"+
"padding:2px 8px'>"+esc(ST[s]||s)+"</span>"}
async function achats(){
var o=ovl("Mes achats"),L=E("div","","Chargement…");o.appendChild(L);var R=null;
try{R=await A("/rest/v1/business_orders?select=*&buyer_id=eq."+ME()+"&order=created_at.desc&limit=50")}catch(e){
}
if(!Array.isArray(R)){L.textContent="Impossible de charger.";return}
if(!R.length){L.textContent="Aucun achat pour le moment.";return}
L.innerHTML="";
R.forEach(function(r){var c=E("div",CARD,"<div style='display:flex;justify-content:space-between;"+
"gap:8px'><b>"+esc(r.product_name)+"</b>"+badge(r.statut)+"</div><div style='font-size:13px;"+
"opacity:.85;margin-top:4px'>"+esc(r.shop_name)+" · "+fmt(r.price)+"</div>");
if(r.statut==="commande"){var b=E("button",BTN2,"Payer / envoyer la capture");b.type="button";
b.onclick=async function(){var mo=await momoOf(r.seller_id);if(!mo){toast("Numéro du vendeur "+
"indisponible");return}o.remove();payScreen(r,mo)};c.appendChild(b)}
L.appendChild(c)})}
async function recues(){
var o=ovl("Commandes reçues"),L=E("div","","Chargement…"),mo=await momoOf(ME()),R=null;

if(!mo){var x=E("div",CARD,"<b>Ton numéro de réception Orange Money</b><br><span style='font-size:13px;"+
"opacity:.85'>Les acheteurs paieront sur ce numéro.</span>");
var mi=E("input",INP);mi.type="tel";mi.inputMode="numeric";mi.placeholder="Numéro (8 chiffres)";

var sv=E("button",BTN,"Enregistrer");sv.type="button";
sv.onclick=async function(){var n=mi.value.replace(/\D/g,"");if(n.length>8&&n.indexOf("226")===0)n=n.slice(3);
if(n.length!==8){toast("Numéro invalide");return}
try{await A("/rest/v1/rpc/set_momo",{method:"POST",body:JSON.stringify({m:n})});o.remove();
recues()}catch(e){toast("Enregistrement impossible")}};
x.appendChild(mi);x.appendChild(sv);o.appendChild(x)}
o.appendChild(L);
try{R=await A("/rest/v1/business_orders?select=*&seller_id=eq."+ME()+"&order=created_at.desc&limit=100")}catch(e){
}
if(!Array.isArray(R)){L.textContent="Impossible de charger.";return}
if(!R.length){L.textContent="Aucune commande pour le moment.";return}
R.sort(function(a,b){return (RANK[a.statut]||0)-(RANK[b.statut]||0)});
L.innerHTML="";
R.forEach(function(r){var c=E("div",CARD,"<div style='display:flex;justify-content:space-between;"+
"gap:8px'><b>"+esc(r.buyer_name||"Client")+"</b>"+badge(r.statut)+"</div><div style='font-size:13px;"+
"margin-top:4px'>"+esc(r.product_name)+" · "+fmt(r.price)+"</div>");
if(r.proof_ref)show(c,r.proof_ref);
if(r.statut==="commande")c.appendChild(E("div","font-size:12px;opacity:.75;margin-top:6px",
"En attente du paiement de l’acheteur."));
if(r.statut==="paye"){
c.appendChild(E("div","margin-top:10px;padding:10px;border-radius:12px;background:rgba(245,165,36,.14);"+
"border:1px solid rgba(245,165,36,.5);font-size:13px;line-height:1.5","Vous devez <b>"+
fmt(r.commission)+"</b> à TÕÕLé (commission 5 %). À régler sous 48 h."));
var p=E("button",BTN,"💳 Payer la commission");p.type="button";p.onclick=function(){
dial(ussd("a",CN,r.commission))};c.appendChild(p);
var k=E("button",BTN2,"J’ai payé la commission");k.type="button";
k.onclick=async function(){k.disabled=true;try{await A("/rest/v1/business_orders?id=eq."+
r.id,{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({statut:"commission_declaree"})});
o.remove();recues()}catch(e){k.disabled=false;toast("Échec, réessaie.")}};c.appendChild(k)}
L.appendChild(c)})}
window.TooleCmd={order:order,demande:demande,achats:achats,recues:recues,policy:policy};

})();
