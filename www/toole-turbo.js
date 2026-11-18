(function(){"use strict";if(window.__tturbo)return;window.__tturbo=1;
function toast(m){var d=document.createElement("div");d.textContent=m;d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:2147483000;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
function b64(bl){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(String(r.result).split(",")[1])};r.onerror=rej;r.readAsDataURL(bl)})}
function getBlob(src){
  return fetch(src).then(function(r){if(!r.ok)throw 0;return r.blob()}).catch(function(){
    var p=null;try{p=new URL(src,location.href).searchParams.get("p")}catch(e){}
    if(!p)throw 0;
    return fetch("https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+p).then(function(r){if(!r.ok)throw 0;return r.blob()})})}
function save(bl,name){
  var N=window.TooleNative,S=window.TooleSaver,P=window.Capacitor&&window.Capacitor.Plugins;
  if(S&&S.saveBase64)return b64(bl).then(function(d){S.saveBase64(d,name,bl.type||"video/mp4")});
  if(N&&N.saveVideoBase64)return b64(bl).then(function(d){N.saveVideoBase64(d,name)});
  if(P&&P.Filesystem)return b64(bl).then(function(d){return P.Filesystem.writeFile({path:"Download/"+name,data:d,directory:"EXTERNAL_STORAGE",recursive:true})});
  var a=document.createElement("a");a.href=window.URL.createObjectURL(bl);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},1000);return Promise.resolve()}
function download(v){
  var src=v&&(v.currentSrc||v.src);if(!src)return toast("Vidéo pas encore chargée");
  toast("Téléchargement…");
  getBlob(src).then(function(bl){var n="TOOLE_"+Date.now()+(/webm/.test(bl.type)?".webm":".mp4");return save(bl,n).then(function(){toast("Vidéo enregistrée dans Téléchargements")})})
  .catch(function(){toast("Téléchargement impossible pour cette vidéo")})}
var st=document.createElement("style");
st.textContent=".dc-vid{position:relative}.tt-dl{position:absolute;top:8px;right:8px;z-index:4;width:38px;height:38px;border-radius:50%;border:0;padding:0;margin:0;background:rgba(0,0,0,.5);color:#fff;font-size:18px;line-height:38px;text-align:center}.tt-dl:active{background:rgba(0,0,0,.8)}"
+"#tvScr .tvr .tt-dl{position:static;width:50px;height:auto;background:none;line-height:1.1;font-size:12px;font-weight:700;text-shadow:0 1px 5px #000;display:flex;flex-direction:column;align-items:center;gap:2px}#tvScr .tvr .tt-dl i{font-style:normal;font-size:28px;filter:drop-shadow(0 1px 4px #000)}";
st.textContent+="html body #tvScr .tvr .tt-dl{order:10!important}html body #tvScr .tvr .tv3s{order:20!important}html body #tvScr .tvr .tkdisc{order:30!important}";document.head.appendChild(st);
function addDc(){document.querySelectorAll(".dc-vid").forEach(function(w){
  var v=w.querySelector("video");if(!v||w.querySelector(".tt-dl"))return;
  var b=document.createElement("button");b.type="button";b.className="tt-dl";b.textContent="⬇";b.setAttribute("aria-label","Télécharger");
  b.onclick=function(e){e.stopPropagation();e.preventDefault();download(w.querySelector("video"))};w.appendChild(b)})}
function addTv(){document.querySelectorAll("#tvScr .tvi").forEach(function(it){
  var r=it.querySelector(".tvr");if(!r||r.querySelector(".tk-dw,.tt-dl"))return;
  if(/Officiel/.test(it.textContent||"")&&false)return;
  var b=document.createElement("button");b.type="button";b.className="tt-dl";b.innerHTML='<i><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg></i>';b.setAttribute("aria-label","Télécharger");
  b.onclick=function(e){e.stopPropagation();e.preventDefault();download(it.querySelector("video"))};var sh=[].filter.call(r.children,function(x){return /Partager/i.test(x.textContent)})[0];if(sh)r.insertBefore(b,sh);else r.appendChild(b)})}
setInterval(addDc,1800);setInterval(addTv,1500);
})();
