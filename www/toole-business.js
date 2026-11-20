(function(){
if(window.__tbiz)return;window.__tbiz=1;
var BOX=null,busy=false;
var BTN="display:block;width:100%;margin-top:10px;border:0;border-radius:12px;padding:12px;font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)";
var INP="display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:11px;border-radius:10px;border:1px solid rgba(128,128,128,.4);font-size:15px;background:transparent;color:inherit";
function ic(n,s,m){return window.TIco?window.TIco(n,s,m):""}function E(t,c,h){var e=document.createElement(t);if(c)e.style.cssText=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return sess().user.id}catch(e){return null}}
async function A(path,opt){var r=await api(path,opt||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
async function state(){
var u=ME();
var acc=await A("/rest/v1/business_accounts?select=shop_name&user_id=eq."+u);
if(acc&&acc.length)return{k:"actif",n:acc[0].shop_name};
var rq=await A("/rest/v1/business_requests?select=statut,shop_name&user_id=eq."+u+"&order=created_at.desc&limit=1");
if(rq&&rq.length)return{k:rq[0].statut,n:rq[0].shop_name};
return{k:"aucun"}}
function form(){
var n=E("input",INP);n.maxLength=60;n.placeholder="Nom de ta boutique";
var d=E("textarea",INP+";min-height:80px");d.maxLength=500;d.placeholder="Description : produits, services…";
var go=E("button",BTN,"Envoyer la demande");go.type="button";
var er=E("div","font-size:13px;color:#e5484d;margin-top:8px");
BOX.appendChild(n);BOX.appendChild(d);BOX.appendChild(go);BOX.appendChild(er);
go.onclick=async function(){
var nm=n.value.trim();if(nm.length<2){er.textContent="Donne un nom à ta boutique (2 lettres minimum).";return}
go.disabled=true;er.textContent="";
try{await A("/rest/v1/business_requests",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({user_id:ME(),shop_name:nm,description:d.value.trim()||null})});draw({k:"en_attente",n:nm})}
catch(e){go.disabled=false;er.textContent=/duplicate|23505|une_ouverte/i.test(String(e&&e.message))?"Tu as déjà une demande en attente.":"Envoi impossible. Réessaie."}}}
function draw(s){
BOX.innerHTML="";
BOX.appendChild(E("div","font-weight:800;font-size:16px;margin-bottom:6px",ic("store",18)+"Compte business"));
var m=E("div","font-size:14px;opacity:.85;line-height:1.4");BOX.appendChild(m);
if(s.k==="actif"){m.innerHTML=ic("check",16)+"Compte business actif : <b>"+esc(s.n)+"</b>";return}
if(s.k==="en_attente"){m.innerHTML=ic("clock",16)+"Demande envoyée pour « <b>"+esc(s.n)+"</b> ». Elle sera traitée prochainement.";return}
m.textContent=s.k==="refusee"?"Ta dernière demande a été refusée. Tu peux en faire une nouvelle.":"Ouvre ta boutique sur TÕÕLé : présente tes produits et reçois des commandes.";
var b=E("button",BTN,s.k==="refusee"?"Faire une nouvelle demande":"Créer un compte business");b.type="button";BOX.appendChild(b);
b.onclick=function(){b.remove();form()}}
async function render(){
var body=document.querySelector("#scrParam .body");if(!body||busy)return;busy=true;
try{var s=await state();
if(!BOX||!BOX.isConnected){BOX=E("div","margin:14px 0;padding:14px;border-radius:16px;border:1px solid rgba(47,111,224,.35);background:rgba(47,111,224,.07)");body.insertBefore(BOX,body.firstChild)}
draw(s)}catch(e){}
busy=false}
function hook(){var o=window.openSettings;if(typeof o!=="function"||o.__tb)return;var f=function(){var r=o.apply(this,arguments);setTimeout(render,80);return r};f.__tb=1;window.openSettings=f}
hook();setInterval(hook,1500);
})();
