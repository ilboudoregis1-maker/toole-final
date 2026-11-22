(function(){"use strict";if(window.__tcache)return;window.__tcache=1;
var D=document;
function $(i){return D.getElementById(i)}
function fmt(b){var u=["o","Ko","Mo","Go"],i=0;b=b||0;
while(b>=1024&&i<3){b/=1024;i++}
return (i>=2?b.toFixed(1):Math.round(b))+" "+u[i]}
function sz(v,d){d=d||0;if(v==null)return 0;
if(typeof v==="string")return v.length*2;
if(typeof Blob!=="undefined"&&v instanceof Blob)return v.size;
if(v.byteLength!=null)return v.byteLength;
if(typeof v==="object"&&d<3){var n=0;for(var k in v)n+=sz(v[k],d+1);return n}
return 8}
function hasDb(n){
if(!indexedDB.databases)return Promise.resolve(true);
return indexedDB.databases().then(function(a){
return a.some(function(x){return x.name===n})}).catch(function(){return true})}
function openDb(n){return new Promise(function(ok,ko){
var r=indexedDB.open(n);r.onsuccess=function(){ok(r.result)};
r.onerror=function(){ko(r.error)}})}
function stores(db,only){
return [].slice.call(db.objectStoreNames).filter(function(x){
return !only||only.indexOf(x)>-1})}
function idbInfo(n,only){return hasDb(n).then(function(h){
if(!h)return{s:0,c:0};
return openDb(n).then(function(db){var nm=stores(db,only);
if(!nm.length){db.close();return{s:0,c:0}}
return new Promise(function(ok){var s=0,c=0,t=db.transaction(nm);
nm.forEach(function(x){var q=t.objectStore(x).openCursor();
q.onsuccess=function(){var cu=q.result;if(cu){c++;s+=sz(cu.value);cu.continue()}}});
t.oncomplete=function(){db.close();ok({s:s,c:c})};
t.onerror=t.onabort=function(){db.close();ok({s:s,c:c})}})
}).catch(function(){return{s:0,c:0}})})}
function idbClear(n,only){return hasDb(n).then(function(h){
if(!h)return;
return openDb(n).then(function(db){var nm=stores(db,only);
if(!nm.length){db.close();return}
return new Promise(function(ok){var t=db.transaction(nm,"readwrite");
nm.forEach(function(x){t.objectStore(x).clear()});
t.oncomplete=t.onerror=t.onabort=function(){db.close();ok()}})})}).catch(function(){})}
function cInfo(names){
if(typeof caches==="undefined")return Promise.resolve({s:0,c:0});
var s=0,c=0;
return names.reduce(function(p,n){return p.then(function(){
return caches.has(n).then(function(h){if(!h)return;
return caches.open(n).then(function(ch){return ch.keys().then(function(ks){
c+=ks.length;
return ks.reduce(function(q,k){return q.then(function(){
return ch.match(k).then(function(r){return r?r.blob():null})
.then(function(b){if(b)s+=b.size}).catch(function(){})})},Promise.resolve())})})})})},
Promise.resolve()).then(function(){return{s:s,c:c}})}
function cClear(names){
if(typeof caches==="undefined")return Promise.resolve();
return Promise.all(names.map(function(n){return caches.delete(n).catch(function(){})}))}
function lsKeys(pfx){var a=[];
for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);
if(k&&pfx.some(function(p){return k.indexOf(p)===0})&&k!=="tso:vq")a.push(k)}
return a}
function lsInfo(pfx){var s=0,c=0;
lsKeys(pfx).forEach(function(k){c++;s+=(k.length+(localStorage.getItem(k)||"").length)*2});
return{s:s,c:c}}
function lsClear(pfx){lsKeys(pfx).forEach(function(k){localStorage.removeItem(k)})}
function idxDrop(flag){try{
var a=JSON.parse(localStorage.getItem("tvc:idx")||"[]")||[];
localStorage.setItem("tvc:idx",JSON.stringify(a.filter(function(x){return !!x.v!==(flag==="v")})))}catch(e){}}
var SEC=[
{id:"disc",ic:"💬",t:"Discussions",d:"Historique des messages gardé sur le téléphone",
idb:[["toole_hist"]],rl:1,
w:"Les messages seront rechargés depuis le serveur. Ceux qui n’y sont plus (éphémères, supprimés) seront perdus."},
{id:"med",ic:"📎",t:"Médias des discussions",d:"Photos, vidéos et fichiers déjà ouverts",
idb:[["toole_media",["f","i"]]],rl:1},
{id:"st",ic:"⭕",t:"Statuts",d:"Statuts déjà vus, lisibles hors connexion",
cache:["tvu-media-1"],idb:[["toole_stmedia"]],ls:["tvu1:","tso:list:","tso:prof"],rl:1},
{id:"vid",ic:"🎬",t:"Divertissement",d:"Vidéos préchargées pour un démarrage instantané",
cache:["toole-vid-v1"],idx:"v"},
{id:"img",ic:"🖼️",t:"Images",d:"Images des publications et de Découvrir",
cache:["toole-pimg-v1","toole-img-v1"],idx:"i"},
{id:"lst",ic:"📋",t:"Listes et fils",d:"Publications, vidéos et profils déjà chargés",
cache:["toole-feed-v1","toole-api-v1"]},
{id:"ph",ic:"👤",t:"Photos et avatars",d:"Photos de profil gardées sur le téléphone",
idb:[["toole_photos"]],rl:1}];
function info(S){var jobs=[];
(S.cache?[cInfo(S.cache)]:[]).forEach(function(p){jobs.push(p)});
(S.idb||[]).forEach(function(x){jobs.push(idbInfo(x[0],x[1]))});
if(S.ls)jobs.push(Promise.resolve(lsInfo(S.ls)));
return Promise.all(jobs).then(function(r){var s=0,c=0;
r.forEach(function(x){s+=x.s;c+=x.c});return{s:s,c:c}})}
function clear(S){var jobs=[];
if(S.cache)jobs.push(cClear(S.cache));
(S.idb||[]).forEach(function(x){jobs.push(idbClear(x[0],x[1]))});
if(S.ls)lsClear(S.ls);if(S.idx)idxDrop(S.idx);
return Promise.all(jobs)}
var st=D.createElement("style");
st.textContent="#tcOv{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147481500;overflow-y:auto;"
+"background:radial-gradient(520px 260px at 100% 0,rgba(0,194,224,.16),transparent),"
+"radial-gradient(480px 260px at 0 0,rgba(47,111,224,.12),transparent),#f4f8ff;color:#0b1d3a;"
+"font-family:system-ui,sans-serif;padding:calc(10px + env(safe-area-inset-top,0px)) 14px "
+"calc(28px + env(safe-area-inset-bottom,0px))}"
+"#tcOv .tch{display:flex;align-items:center;gap:8px;margin-bottom:12px}"
+"#tcOv .tch b{font-size:20px;font-weight:800;letter-spacing:-.3px}"
+"#tcOv .tcb{width:38px;height:38px;border-radius:19px;border:1px solid rgba(47,111,224,.2);"
+"background:#fff;font-size:22px;color:#0a2a66;box-shadow:0 2px 10px rgba(30,80,160,.12)}"
+"#tcOv .tcs,#tcOv .tcc{background:#fff;border:1px solid rgba(47,111,224,.14);border-radius:20px;"
+"padding:14px;margin-top:12px;box-shadow:0 8px 24px rgba(30,80,160,.09)}"
+"#tcOv .tct{font-size:13px;color:#5a6f92}#tcOv .tcn{font-size:30px;font-weight:800;color:#0a2a66}"
+"#tcOv .tcn small{font-size:14px;font-weight:600;color:#5a6f92}"
+"#tcOv .tcr{height:7px;border-radius:4px;background:#e6eefb;margin-top:10px;overflow:hidden}"
+"#tcOv .tcr i{display:block;height:100%;width:0;border-radius:4px;"
+"background:linear-gradient(90deg,#00c2e0,#2f6fe0);transition:width .5s}"
+"#tcOv .tcc{display:flex;gap:12px;align-items:center}"
+"#tcOv .tci{flex:none;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;"
+"font-size:22px;background:linear-gradient(135deg,#e6f9fd,#e8efff)}"
+"#tcOv .tcm{flex:1;min-width:0}#tcOv .tcm b{display:block;font-size:15px}"
+"#tcOv .tcm span{display:block;font-size:12px;color:#5a6f92;margin-top:2px;line-height:1.35}"
+"#tcOv .tcz{font-size:12px;font-weight:700;color:#2f6fe0;margin-top:4px}"
+"#tcOv .tcv{flex:none;border:0;border-radius:14px;padding:9px 14px;font-size:13px;font-weight:800;"
+"background:#fff1f1;color:#d13a3a}#tcOv .tcv:disabled{opacity:.45}"
+"#tcOv .tca{display:block;width:100%;margin-top:16px;border:0;border-radius:16px;padding:14px;"
+"font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);"
+"box-shadow:0 8px 22px rgba(47,111,224,.3)}"
+"#tcOv .tcf{font-size:12px;color:#5a6f92;text-align:center;margin-top:12px;line-height:1.45}"
+"#tcToast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:2147483000;"
+"background:#0a2a66;color:#fff;padding:10px 16px;border-radius:20px;font-size:14px;font-weight:600}";
D.head.appendChild(st);
function toast(m){var x=D.createElement("div");x.id="tcToast";x.textContent=m;
D.body.appendChild(x);setTimeout(function(){x.remove()},2600)}
function total(){
if(!navigator.storage||!navigator.storage.estimate)return Promise.resolve(null);
return navigator.storage.estimate().catch(function(){return null})}
function open(){
if($("tcOv"))return;
var o=D.createElement("div");o.id="tcOv";
o.innerHTML='<div class="tch"><button class="tcb" type="button" id="tcBk">‹</button><b>Caches</b></div>'
+'<div class="tcs"><div class="tct">Stockage utilisé par TÕÕLé</div>'
+'<div class="tcn" id="tcTotal">…</div><div class="tcr"><i id="tcBar"></i></div></div>'
+'<div id="tcList"></div><button class="tca" type="button" id="tcAll">Tout vider</button>'
+'<div class="tcf">Tes clés de chiffrement, ta session et tes réglages ne sont jamais supprimés.</div>';
D.body.appendChild(o);
$("tcBk").onclick=function(){o.remove()};
var L=$("tcList"),rows={};
function paint(){total().then(function(e){if(!e||!$("tcTotal"))return;
$("tcTotal").innerHTML=fmt(e.usage)+" <small>sur "+fmt(e.quota)+"</small>";
$("tcBar").style.width=Math.max(2,Math.min(100,e.usage/e.quota*100))+"%"})}
function refresh(S){var r=rows[S.id];return info(S).then(function(x){
r.z.textContent=x.c?fmt(x.s)+" · "+x.c+" élément"+(x.c>1?"s":""):"Vide";r.b.disabled=!x.c})}
function later(){setTimeout(function(){location.reload()},900)}
SEC.forEach(function(S){var c=D.createElement("div");c.className="tcc";
c.innerHTML='<div class="tci">'+S.ic+'</div><div class="tcm"><b>'+S.t+'</b><span>'+S.d
+'</span><div class="tcz">Calcul…</div></div>';
var b=D.createElement("button");b.className="tcv";b.type="button";b.textContent="Vider";b.disabled=true;
c.appendChild(b);L.appendChild(c);rows[S.id]={z:c.querySelector(".tcz"),b:b};
b.onclick=function(){
if(!confirm("Vider « "+S.t+" » ?"+(S.w?"\n\n"+S.w:"")))return;
b.disabled=true;
clear(S).then(function(){toast(S.t+" vidé ✓");if(S.rl)later();return refresh(S)}).then(paint)}});
$("tcAll").onclick=function(){
if(!confirm("Vider tous les caches ?\n\n"+SEC[0].w))return;
var rl=false;
SEC.reduce(function(p,S){return p.then(function(){if(S.rl)rl=true;return clear(S)})},Promise.resolve())
.then(function(){toast("Caches vidés ✓");if(rl)later();
return Promise.all(SEC.map(refresh))}).then(paint)};
paint();
SEC.reduce(function(p,S){return p.then(function(){return refresh(S)})},Promise.resolve())}
function sum(){total().then(function(e){var s=$("tcSum");if(s&&e)s.textContent=fmt(e.usage)})}
function entry(){
var b=D.querySelector("#scrParam .body");if(!b||$("tcGrp"))return;
var g=D.createElement("div");g.className="grp";g.id="tcGrp";
g.innerHTML='<div class="gt">Stockage</div><div class="card"><button class="row" id="tcOpen" type="button">'
+'<span>Caches</span><span style="display:flex;align-items:center;gap:6px"><b id="tcSum">—</b>'
+'<span class="chev">›</span></span></button></div>';
var gs=b.querySelectorAll(".grp");b.insertBefore(g,gs.length>1?gs[gs.length-1]:null);
$("tcOpen").onclick=open;sum()}
function boot(){entry();var s=$("scrParam");
if(s)new MutationObserver(function(){if(!s.classList.contains("hide")){entry();sum()}})
.observe(s,{attributes:true,attributeFilter:["class"]});
setInterval(entry,2000)}
window.__tcOpen=open;
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",boot);else boot();
})();
