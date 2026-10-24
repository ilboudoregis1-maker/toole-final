(function(){
var D=window.__dbg=window.__dbg||function(m){
var d=document.getElementById("__dbg");
if(!d){d=document.createElement("div");d.id="__dbg";
d.style.cssText="position:fixed;top:0;left:0;right:0;z-index:2147483647;"+
"background:rgba(0,0,0,.85);color:#0f0;font:12px monospace;padding:4px;"+
"pointer-events:none;white-space:pre-wrap";0}
d.textContent+=m+"\n"};
function toFile(f){
return fetch(Capacitor.convertFileSrc(f.path)).then(function(r){return r.blob()})
.then(function(b){return new File([b],f.name||"media",{type:f.mimeType||b.type||""})})}
window.__tpick=function(acc,cb){
var FP=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.FilePicker;
if(!FP){D("plugin absent");return false}
var a=String(acc),vid=a.indexOf("video")>=0&&a.indexOf("image")<0;
var T=a.split(","),img=a.indexOf("image")>=0;
var call=vid?FP.pickVideos({limit:1}):img?FP.pickImages({limit:1}):FP.pickFiles({types:T,limit:1});
call.then(function(r){
var f=r&&r.files&&r.files[0];if(!f)return;
D("plugin: "+(f.name||"?")+" "+f.size);
return toFile(f).then(function(file){D("blob ok "+file.size);cb(file)})
}).catch(function(e){var m=(e&&e.message)||String(e);
if(/cancel/i.test(m))return;D("erreur: "+m)});
return true};
})();
