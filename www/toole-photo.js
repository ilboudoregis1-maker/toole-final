(function(){
if(window.__tph)return;window.__tph=1;
var B="photos",PFX="\uD83D\uDCF7img:",MAXB=100*1024,MAXT=3*1048576;
function pub(p){return URL+"/storage/v1/object/public/"+B+"/"+p}
function blobOf(c,q){return new Promise(function(r){c.toBlob(r,"image/jpeg",q)})}
function load(f){return new Promise(function(ok,ko){var im=new Image();var u=window.URL.createObjectURL(f);im.onload=function(){window.URL.revokeObjectURL(u);ok(im)};im.onerror=ko;im.src=u})}
async function compress(f,lim){lim=lim||MAXB;var im=await load(f),k=Math.min(1,(lim>MAXB?1600:1080)/im.width),c=document.createElement("canvas"),b;
for(var t=0;t<4;t++){c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);
for(var q=(lim>MAXB?0.85:0.7);q>=0.4;q-=0.1){b=await blobOf(c,q);if(b&&b.size<=lim)return b}k*=0.8}
return b}
function today(){var d=new Date();return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()}
function count(){try{var o=JSON.parse(localStorage.getItem("toole_ph")||"{}");return o.d===today()?o.n:0}catch(e){return 0}}
function bump(){localStorage.setItem("toole_ph",JSON.stringify({d:today(),n:count()+1}))}
function inGroup(){var g=document.getElementById("scrGroup");return !!(g&&!g.classList.contains("hide"))}
async function sendPhoto(f){
if(!f)return;if(navigator.onLine===false){toast("Pas de connexion : photo non envoyée");return}

try{var tgOK=!!(window.tgUpload&&window.tgReady&&window.tgReady(1));toast("Compression…");var b=await compress(f,window.tgUpload?MAXT:MAXB);
var path=me()+"/"+Date.now()+".jpg",s=sess(),viaTg=false;pput(path,b);if(window.tgUpload){try{await window.tgUpload(b,path);viaTg=true}catch(e){}}if(!viaTg){if(count()>=3)throw new Error("Limite : 3 photos par jour");if(b.size>MAXB)b=await compress(f,MAXB)}
if(!viaTg){var r=await fetch(URL+"/storage/v1/object/"+B+"/"+path,{method:"POST",headers:{apikey:KEY,Authorization:"Bearer "+s.access_token,"Content-Type":"image/jpeg"},body:b});
if(!r.ok)throw new Error(r.status==403||r.status==400?"Limite de 3 photos atteinte":"Envoi impossible ("+r.status+")");}
var g=inGroup();
await api(g?"/rest/v1/group_messages":"/rest/v1/messages",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify(g?{group_id:gCur.id,sender:me(),body:PFX+path}:{sender:me(),receiver:peer.id,body:PFX+path})});
if(!viaTg)bump();toast("Photo envoyée ("+Math.round(b.size/1024)+" Ko)");
if(g&&typeof loadGroupMsgs==="function")loadGroupMsgs();else if(typeof loadMsgs==="function")loadMsgs();
}catch(e){toast(e.message||"Erreur photo")}}
function dbo(){return new Promise(function(ok,ko){var r=indexedDB.open("toole_photos",1);r.onupgradeneeded=function(){r.result.createObjectStore("p")};r.onsuccess=function(){ok(r.result)};r.onerror=function(){ko(r.error)}})}
function pget(k){return dbo().then(function(db){return new Promise(function(ok){var q=db.transaction("p").objectStore("p").get(k);q.onsuccess=function(){ok(q.result||null)};q.onerror=function(){ok(null)}})}).catch(function(){return null})}
function pput(k,b){return dbo().then(function(db){return new Promise(function(ok){var tx=db.transaction("p","readwrite");tx.objectStore("p").put(b,k);tx.oncomplete=function(){ok()};tx.onerror=function(){ok()}})}).catch(function(){})}
async function srcOf(p){var b=await pget(p);if(!b){var m=/\/(\d{13})\./.exec(p),nw=m&&Number(m[1])>=1792274400000,L=[];if(window.tgUrl)L.push(window.tgUrl(p,"image"));L.push(pub(p));if(!nw)L.reverse();for(var i=0;i<L.length&&!b;i++){try{var r=await fetch(L[i]);if(r.ok){var x=await r.blob();if(x&&x.size)b=x}}catch(e){}}if(!b)return null;pput(p,b)}return window.URL.createObjectURL(b)}
var MU={},DEAD={};
function bubOf(n){return (n.closest&&n.closest(".m"))||n}
function fix(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,l=[];while((n=w.nextNode())){if(n.nodeValue.indexOf(PFX)===0)l.push(n)}
l.forEach(function(t){var p=t.nodeValue.slice(PFX.length).trim(),par=t.parentNode;if(!par)return;
if(DEAD[p]){bubOf(par).remove();return}
var im=new Image();im.style.cssText="max-width:220px;width:100%;min-height:60px;border-radius:10px;display:block";
im.onclick=function(){show(im.src)};
if(MU[p])im.src=MU[p];else srcOf(p).then(function(u){if(u){MU[p]=u;im.src=u}else{DEAD[p]=1;bubOf(im).remove()}});
par.replaceChild(im,t)})}
var CAM='<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/></svg>';
function addBtn(id){var m=document.getElementById(id);if(!m||m.dataset.ph)return;m.dataset.ph="1";
var b=document.createElement("button");b.type="button";b.className=(m.className||"").replace(/\brec\b/g,"").trim();b.setAttribute("aria-label","Photo");b.innerHTML=CAM;
var inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.style.display="none";
inp.onchange=function(){var f=inp.files&&inp.files[0];inp.value="";sendPhoto(f)};
b.onclick=function(e){e.preventDefault();inp.click()};
m.parentNode.insertBefore(b,m);m.parentNode.insertBefore(inp,m)}
function show(u){if(!u)return;var o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center";
var i=new Image();i.src=u;i.style.cssText="max-width:100%;max-height:100%;object-fit:contain";o.appendChild(i);o.onclick=function(){o.remove()};document.body.appendChild(o)}
function init(){window.__tsendPhoto=sendPhoto;addBtn("vmic");addBtn("gMic");["chat","gMsgs"].forEach(function(id){var e=document.getElementById(id);if(!e)return;new MutationObserver(function(){fix(e)}).observe(e,{childList:true,subtree:true});fix(e)})}
if(document.readyState==="complete")init();else window.addEventListener("load",init);
})();
