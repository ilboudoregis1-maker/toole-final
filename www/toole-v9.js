(function(){
function T(m){try{(window.toast||alert)(m)}catch(e){}}
var IC='<svg viewBox="0 0 24 24"><path d="M12 4v11M7 11l5 5 5-5M4 20h16"/></svg>';
var CK='<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>';
var css=document.createElement("style");
css.textContent="html body .v9-dl{position:fixed!important;left:auto!important;bottom:auto!important;width:auto!important;height:44px!important;border-radius:22px!important;padding:0 16px 0 12px!important;display:flex!important;align-items:center;gap:8px;top:calc(env(safe-area-inset-top,0px) + 12px)!important;right:14px!important;font:700 14px 'Exo 2',system-ui,sans-serif;color:#fff;border:1px solid rgba(0,229,255,.85)!important;background:rgba(0,0,0,.62)!important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:2147483000}"
+"html body .v9-dl.v9-x{right:68px!important}"
+"html body .v9-dl.v9-bot{top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 14px)!important}"
+".v9-dl svg{width:20px;height:20px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}"
+"html body .v9-dl.ok{background:#16a34a!important;border-color:#86efac!important}.v9-dl.busy{opacity:.7}"
+"#tonceV .v9-dl,#tonceV~.v9-dl{display:none!important}"
+"#v9P{position:fixed;inset:0;z-index:2147483200;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center}"
+"#v9P .c{width:100%;max-width:520px;box-sizing:border-box;padding:18px 16px calc(env(safe-area-inset-bottom,0px) + 18px);border-radius:22px 22px 0 0;background:linear-gradient(180deg,#10265a,#0b1b3a);border-top:1px solid rgba(0,229,255,.7);color:#fff;font-family:'Exo 2',system-ui,sans-serif}"
+"#v9P .h{display:flex;align-items:center;gap:12px}#v9P .th{flex:none;width:64px;height:64px;border-radius:12px;background:#223 center/cover no-repeat;display:flex;align-items:center;justify-content:center;font-size:26px}"
+"#v9P .t{font-weight:800;font-size:18px}#v9P .n{font-size:13px;opacity:.85;word-break:break-all}#v9P .m{font-size:12.5px;opacity:.75;margin-top:10px;line-height:1.4}#v9P .ok{color:#86efac;font-weight:700}"
+"#v9P .r{display:flex;gap:10px;margin-top:14px}#v9P button{flex:1;padding:13px;border:0;border-radius:12px;font-weight:700;font-size:15px;color:#fff;background:rgba(255,255,255,.16)}#v9P button.p{background:linear-gradient(135deg,#00e5ff,#7c3aed)}";
document.head.appendChild(css);
function b64(b){return new Promise(function(ok,ko){var r=new FileReader();r.onload=function(){ok(String(r.result).split(",")[1])};r.onerror=ko;r.readAsDataURL(b)})}
function kb(n){return n<1048576?Math.max(1,Math.round(n/1024))+" Ko":(n/1048576).toFixed(1)+" Mo"}
function two(n){return String(n).padStart(2,"0")}
function stamp(){var d=new Date();return d.getFullYear()+two(d.getMonth()+1)+two(d.getDate())+"_"+two(d.getHours())+two(d.getMinutes())+two(d.getSeconds())}
function logDl(r){try{var a=JSON.parse(localStorage.getItem("toole_dl")||"[]");a.unshift({n:r.name,s:r.size,t:Date.now(),p:r.path||"",v:r.verified?1:0});localStorage.setItem("toole_dl",JSON.stringify(a.slice(0,30)))}catch(e){}}
function label(b,t){var s=b.querySelector("span");if(s)s.textContent=t}
function proof(r){
var old=document.getElementById("v9P");if(old)old.remove();
var o=document.createElement("div");o.id="v9P";
var c=document.createElement("div");c.className="c";
var h=document.createElement("div");h.className="h";
var th=document.createElement("div");th.className="th";var tu=null;
if(/^image\//.test(r.type||"")){tu=URL.createObjectURL(r.blob);th.style.backgroundImage='url("'+tu+'")'}else th.textContent="\uD83C\uDFAC";
var w=document.createElement("div");
var t=document.createElement("div");t.className="t";
var n=document.createElement("div");n.className="n";n.textContent=r.name+" \u00B7 "+kb(r.size);
var m=document.createElement("div");m.className="m";
if(r.mode==="saved"&&r.verified){t.textContent="\u2713 T\u00E9l\u00E9charg\u00E9";m.innerHTML="";var k=document.createElement("span");k.className="ok";k.textContent="V\u00E9rifi\u00E9 : ";m.appendChild(k);m.appendChild(document.createTextNode("le fichier est bien sur ton t\u00E9l\u00E9phone (taille identique : "+r.size+" octets).\nDossier : "+r.path+"\nHeure : "+new Date().toLocaleString("fr-FR")))}
else if(r.mode==="saved"){t.textContent="\u2713 Enregistr\u00E9";m.textContent="Fichier \u00E9crit dans "+r.path+", mais la v\u00E9rification a \u00E9chou\u00E9. Heure : "+new Date().toLocaleString("fr-FR")}
else if(r.mode==="shared"){t.textContent="Envoy\u00E9 vers le partage";m.textContent="Choisis \u00AB Enregistrer \u00BB dans la fen\u00EAtre Android. L'app ne peut pas v\u00E9rifier cette copie."}
else{t.textContent="T\u00E9l\u00E9chargement lanc\u00E9";m.textContent="Non v\u00E9rifiable depuis l'app (v\u00E9rifie dans Fichiers > T\u00E9l\u00E9chargements)."}
m.style.whiteSpace="pre-line";
w.appendChild(t);w.appendChild(n);h.appendChild(th);h.appendChild(w);c.appendChild(h);c.appendChild(m);
var row=document.createElement("div");row.className="r";
function close(){if(tu){try{URL.revokeObjectURL(tu)}catch(e){}}o.remove()}
var P=window.Capacitor&&window.Capacitor.Plugins,SH=P&&P.Share;
if(SH&&r.uri){var sb=document.createElement("button");sb.type="button";sb.textContent="Partager";sb.onclick=function(){SH.share({title:r.name,url:r.uri}).catch(function(){T("Partage impossible")})};row.appendChild(sb)}
var ok=document.createElement("button");ok.type="button";ok.className="p";ok.textContent="OK";ok.onclick=close;row.appendChild(ok);
c.appendChild(row);o.appendChild(c);o.onclick=function(e){if(e.target===o)close()};document.body.appendChild(o)}
async function save(src,btn){
if(btn.classList.contains("busy"))return;
btn.classList.add("busy");label(btn,"T\u00E9l\u00E9chargement\u2026");
try{
var b=await (await fetch(src)).blob();
if(!b||!b.size)throw new Error("vide");
var ext=((b.type||"").split("/")[1]||"bin").split(";")[0].replace("jpeg","jpg").replace("quicktime","mov");
var name="TOOLE_"+stamp()+"."+ext;
var P=window.Capacitor&&window.Capacitor.Plugins,FS=P&&P.Filesystem,SH=P&&P.Share;
var r={name:name,size:b.size,type:b.type,blob:b,mode:"",path:"Documents/TOOLE/"+name,verified:false,uri:""};
if(FS){
var d=await b64(b);
try{
await FS.writeFile({path:"TOOLE/"+name,data:d,directory:"DOCUMENTS",recursive:true});
r.mode="saved";
try{var s=await FS.stat({path:"TOOLE/"+name,directory:"DOCUMENTS"});r.verified=Number(s.size)===b.size;r.uri=s.uri||""}catch(e){}
}catch(e){
if(!SH)throw e;
var w=await FS.writeFile({path:name,data:d,directory:"CACHE"});
await SH.share({title:name,url:w.uri});r.mode="shared";r.path=""}
}else{
var a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;
document.body.appendChild(a);a.click();a.remove();r.mode="browser";r.path=""}
logDl(r);proof(r);
btn.classList.remove("busy");btn.classList.add("ok");btn.innerHTML=CK+"<span>T\u00E9l\u00E9charg\u00E9</span>";
setTimeout(function(){btn.classList.remove("ok");btn.innerHTML=IC+"<span>T\u00E9l\u00E9charger</span>"},4000)
}catch(e){
btn.classList.remove("busy");label(btn,"T\u00E9l\u00E9charger");
T(/cancel/i.test(String(e&&e.message))?"Partage annul\u00E9":"T\u00E9l\u00E9chargement impossible")}}
function media(n){
var v=n.querySelector("video"),i=n.querySelector("img");
var el=(v&&(v.currentSrc||v.src))?v:i;
return(el&&(el.currentSrc||el.src))?el:null}
function add(n){
if(!n||n.nodeType!==1||n._v9||n.parentNode!==document.body)return;
if(n.id==="tonceV"||(n.dataset&&n.dataset.noshare)||(n.querySelector&&n.querySelector("#tonceV")))return;
if(getComputedStyle(n).position!=="fixed"||!media(n))return;
n._v9=1;
var cls=n.id==="stv"?" v9-bot":((n.textContent||"").indexOf("\u2715")>-1?" v9-x":"");
var b=document.createElement("button");b.type="button";b.className="v9-dl"+cls;
b.setAttribute("aria-label","T\u00E9l\u00E9charger");b.innerHTML=IC+"<span>T\u00E9l\u00E9charger</span>";
b.onclick=function(e){e.stopPropagation();var m=media(n);if(m)save(m.currentSrc||m.src,b)};
n.appendChild(b)}
new MutationObserver(function(ml){ml.forEach(function(r){
[].forEach.call(r.addedNodes,function(n){setTimeout(function(){add(n)},150)})})}).observe(document.body,{childList:true});
})();
(function(){
function rm(){["gPinBtn","gmP","gPin"].forEach(function(i){
var e=document.getElementById(i);if(e)e.remove()})}
new MutationObserver(rm).observe(document.body,{childList:true,subtree:true});
rm();
})();
