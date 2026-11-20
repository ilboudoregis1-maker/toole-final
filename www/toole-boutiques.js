(function(){
if(window.__tbz)return;window.__tbz=1;
var OV=null,CB=null,BOX=null,busy=false,imgC={};
var BTN="display:block;width:100%;margin-top:10px;border:0;border-radius:12px;padding:12px;font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)";
function ic(n,s,m){return window.TIco?window.TIco(n,s,m):""}function E(t,c,h){var e=document.createElement(t);if(c)e.style.cssText=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return sess().user.id}catch(e){return null}}
async function A(path,opt){var r=await api(path,opt||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
function dark(){try{var n=[document.body,document.documentElement];for(var i=0;i<2;i++){var c=getComputedStyle(n[i]).backgroundColor.match(/[\d.]+/g);if(c&&(c.length<4||+c[3]>0))return(c[0]*299+c[1]*587+c[2]*114)/1000<128}}catch(e){}return false}
function th(){var d=dark();return{bg:d?"#0d1117":"#f5f7fb",card:d?"#161b22":"#fff",tx:d?"#e8eef7":"#111827",sub:d?"#9aa7b8":"#667085",bd:d?"rgba(255,255,255,.14)":"rgba(0,0,0,.09)"}}
function INP(t){return"display:block;width:100%;box-sizing:border-box;margin-top:10px;padding:12px;border-radius:12px;border:1px solid "+t.bd+";background:"+t.card+";color:"+t.tx+";font-size:15px"}
function fmt(n){try{return new Intl.NumberFormat("fr-FR").format(n)+" FCFA"}catch(e){return n+" FCFA"}}
function toast(m){var x=E("div","position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 16px;border-radius:20px;font-size:14px;z-index:2147483600;max-width:80%;text-align:center",esc(m));document.body.appendChild(x);setTimeout(function(){x.remove()},2600)}
function ovOpen(){if(OV)return;OV=E("div","position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147480000;display:flex;flex-direction:column;font-family:system-ui,sans-serif;padding-top:env(safe-area-inset-top,0px)");document.body.appendChild(OV)}
function ovClose(){if(OV){OV.remove();OV=null;CB=null}}
function shell(title,onBack){var t=th();ovOpen();OV.innerHTML="";OV.style.background=t.bg;OV.style.color=t.tx;CB=onBack;
var h=E("div","display:flex;align-items:center;gap:8px;padding:10px 12px;background:"+t.card+";border-bottom:1px solid "+t.bd);
var b=E("button","border:0;background:transparent;font-size:24px;color:"+t.tx+";padding:2px 8px","←");b.type="button";b.onclick=onBack;h.appendChild(b);
h.appendChild(E("div","font-weight:800;font-size:17px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap",esc(title)));OV.appendChild(h);
var c=E("div","flex:1;overflow-y:auto;padding:14px;padding-bottom:calc(14px + env(safe-area-inset-bottom,0px))");OV.appendChild(c);return c}
function photo(box,ref){if(!ref||!window.tgUrl)return;
var im=E("img","position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;display:none");box.appendChild(im);
if(imgC[ref]){im.src=imgC[ref];im.style.display="block";return}
fetch(window.tgUrl(ref,"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){var u=window.URL.createObjectURL(b);imgC[ref]=u;im.src=u;im.style.display="block"}).catch(function(){})}
function shrink(f){return new Promise(function(res,rej){var u=window.URL.createObjectURL(f),im=new Image();
im.onload=function(){var M=900,w=im.naturalWidth,h=im.naturalHeight,k=Math.min(1,M/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);window.URL.revokeObjectURL(u);c.toBlob(function(b){b?res(b):rej()},"image/jpeg",0.8)};
im.onerror=rej;im.src=u})}
async function listView(){
var t=th(),b=shell("Boutiques",ovClose);
var q=E("input",INP(t)+";margin-top:0;margin-bottom:12px");q.placeholder="Rechercher une boutique";
var L=E("div","","<p style='opacity:.7'>Chargement…</p>");b.appendChild(q);b.appendChild(L);
var rows=[];try{rows=await A("/rest/v1/business_accounts?select=user_id,shop_name,description&order=created_at.desc&limit=100")||[]}catch(e){L.innerHTML="<p>Impossible de charger les boutiques.</p>";return}
function draw(){var f=q.value.trim().toLowerCase();var a=rows.filter(function(r){return!f||(r.shop_name||"").toLowerCase().indexOf(f)>-1});
L.innerHTML="";if(!a.length){L.innerHTML="<p style='opacity:.7;text-align:center;margin-top:30px'>Aucune boutique pour le moment.</p>";return}
a.forEach(function(r){var c=E("div","padding:14px;margin-bottom:10px;border-radius:14px;background:"+t.card+";border:1px solid "+t.bd,"<div style='font-weight:800;font-size:16px'>"+ic("store",18)+esc(r.shop_name)+(r.user_id===ME()?" <span style='font-size:12px;color:#2f6fe0'>· Ma boutique</span>":"")+"</div><div style='font-size:13px;color:"+t.sub+";margin-top:4px'>"+esc(r.description||"")+"</div>");
var v=E("button",BTN,"Voir les produits");v.type="button";v.onclick=function(){shopView(r,false)};c.appendChild(v);L.appendChild(c)})}
q.oninput=draw;draw()}
async function shopView(s,own){
var t=th(),mine=s.user_id===ME(),b=shell(s.shop_name,function(){own?ovClose():listView()});
b.appendChild(E("div","font-size:14px;color:"+t.sub,esc(s.description||"")));
if(mine){var ad=E("button",BTN,ic("plus",18)+"Ajouter un produit");ad.type="button";ad.onclick=function(){addView(s,own)};b.appendChild(ad)}
var L=E("div","margin-top:14px","<p style='opacity:.7'>Chargement…</p>");b.appendChild(L);
var P=[];try{P=await A("/rest/v1/business_products?select=*&owner_id=eq."+s.user_id+"&active=eq.true&order=created_at.desc&limit=100")||[]}catch(e){L.innerHTML="<p>Impossible de charger les produits.</p>";return}
var cnt={};if(mine&&P.length){try{var I=await A("/rest/v1/business_interest?select=product_id&product_id=in.("+P.map(function(p){return p.id}).join(",")+")")||[];I.forEach(function(x){cnt[x.product_id]=(cnt[x.product_id]||0)+1})}catch(e){}}
L.innerHTML="";if(!P.length){L.innerHTML="<p style='opacity:.7;text-align:center;margin-top:20px'>Aucun produit pour le moment.</p>";return}
P.forEach(function(p){var c=E("div","margin-bottom:14px;border-radius:16px;overflow:hidden;background:"+t.card+";border:1px solid "+t.bd);
var ph=E("div","position:relative;width:100%;aspect-ratio:1/1;background:"+t.bd+";display:flex;align-items:center;justify-content:center;color:#8a94a6","");ph.innerHTML=ic("image",42,0);photo(ph,p.photo_ref);c.appendChild(ph);
var inf=E("div","padding:12px","<div style='font-weight:800;font-size:16px'>"+esc(p.name)+"</div><div style='color:#2f6fe0;font-weight:800;margin-top:2px'>"+fmt(p.price)+"</div><div style='font-size:13px;color:"+t.sub+";margin-top:4px'>"+esc(p.description||"")+"</div>");
if(mine){inf.appendChild(E("div","margin-top:8px;font-size:14px",ic("users",18)+(cnt[p.id]||0)+" personne(s) intéressée(s)"));
var rm=E("button","display:block;width:100%;margin-top:8px;border:1px solid #e5484d;border-radius:10px;padding:9px;background:transparent;color:#e5484d;font-weight:700","Retirer ce produit");rm.type="button";
rm.onclick=async function(){if(!confirm("Retirer ce produit ?"))return;try{await A("/rest/v1/business_products?id=eq."+p.id,{method:"DELETE",headers:{Prefer:"return=minimal"}});shopView(s,own)}catch(e){toast("Impossible de retirer le produit")}};inf.appendChild(rm)}
else{var cm=E("button",BTN,ic("bag",18)+"Commander");cm.type="button";cm.onclick=function(){order(s,p,cm)};inf.appendChild(cm)}
c.appendChild(inf);L.appendChild(c)})}
async function order(s,p,btn){btn.disabled=true;
try{await A("/rest/v1/business_interest",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({product_id:p.id,user_id:ME()})})}catch(e){}
try{await A("/rest/v1/messages",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({sender:ME(),receiver:s.user_id,body:"🛍️ Commande · "+p.name+" · "+fmt(p.price)+"\nBoutique : "+s.shop_name+"\nBonjour, je suis intéressé(e) par ce produit."})});toast("Commande envoyée au vendeur")}catch(e){toast("Envoi impossible, réessaie.")}
btn.disabled=false}
function addView(s,own){
var t=th(),b=shell("Nouveau produit",function(){shopView(s,own)}),blob=null;
var n=E("input",INP(t));n.placeholder="Nom du produit";n.maxLength=80;
var pr=E("input",INP(t));pr.type="number";pr.inputMode="numeric";pr.placeholder="Prix en FCFA";
var d=E("textarea",INP(t)+";min-height:80px");d.placeholder="Description (facultatif)";d.maxLength=500;
var pf=E("input");pf.type="file";pf.accept="image/*";pf.style.display="none";
var pb=E("button",BTN,ic("camera",18)+"Choisir une photo");pb.type="button";pb.onclick=function(){pf.click()};
var pv=E("img","display:none;width:100%;max-height:260px;object-fit:cover;border-radius:12px;margin-top:10px");
pf.onchange=function(){var f=pf.files&&pf.files[0];if(!f)return;shrink(f).then(function(x){blob=x;pv.src=window.URL.createObjectURL(x);pv.style.display="block"}).catch(function(){toast("Photo illisible")})};
var ok=E("button",BTN,"Publier le produit");ok.type="button";var er=E("div","font-size:13px;color:#e5484d;margin-top:8px");
ok.onclick=async function(){var nm=n.value.trim(),price=parseInt(pr.value,10);
if(nm.length<2){er.textContent="Donne un nom au produit.";return}
if(!(price>=0)){er.textContent="Indique le prix.";return}
ok.disabled=true;er.textContent="";var ref=null;
if(blob){ref=ME()+"/biz-"+Date.now()+".jpg";try{await window.tgUpload(blob,ref)}catch(e){ok.disabled=false;er.textContent="Photo non envoyée. Vérifie ta connexion et réessaie.";return}}
try{await A("/rest/v1/business_products",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({owner_id:ME(),name:nm,price:price,description:d.value.trim()||null,photo_ref:ref})});shopView(s,own)}
catch(e){ok.disabled=false;er.textContent="Publication impossible. Réessaie."}};
[n,pr,d,pb,pf,pv,ok,er].forEach(function(x){b.appendChild(x)})}
async function mount(){
var sc=document.getElementById("scrParam");
if(!sc||sc.classList.contains("hide")){if(BOX){BOX.remove();BOX=null}return}
var body=sc.querySelector(".body");if(!body||(BOX&&BOX.isConnected)||busy)return;busy=true;
try{var m=await A("/rest/v1/business_accounts?select=user_id,shop_name,description&user_id=eq."+ME());
BOX=E("div","margin:14px 0");
var b1=E("button",BTN,ic("store",18)+"Boutiques");b1.type="button";b1.onclick=listView;BOX.appendChild(b1);
if(m&&m.length){var b2=E("button",BTN,ic("bag",18)+"Mes produits");b2.type="button";b2.onclick=function(){shopView(m[0],true)};BOX.appendChild(b2)}
body.insertBefore(BOX,body.firstChild)}catch(e){}
busy=false}
window.TooleBiz={list:listView,shop:function(x){shopView(x,true)}};setInterval(mount,900);
try{var Ap=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;if(Ap&&Ap.addListener)Ap.addListener("backButton",function(){if(OV&&CB)CB()})}catch(e){}
})();
