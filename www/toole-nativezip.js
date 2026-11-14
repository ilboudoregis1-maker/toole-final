(function(){
var old=window.tooleZip;
function P(){return window.Capacitor&&window.Capacitor.Plugins}
function b64(blob){return new Promise(function(ok,ko){var r=new FileReader();r.onload=function(){ok(String(r.result).split(",")[1])};r.onerror=ko;r.readAsDataURL(blob)})}
async function run(f){
var pl=P(),FS=pl.Filesystem,VE=pl.VideoEditor;
if(!FS||!VE)throw new Error("plugin absent");
var name="tz_"+Date.now()+".mp4",CH=3*1048576,first=true;
for(var o=0;o<f.size;o+=CH){
var d=await b64(f.slice(o,o+CH));
if(first){await FS.writeFile({path:name,directory:"CACHE",data:d});first=false}
else await FS.appendFile({path:name,directory:"CACHE",data:d})}
var u=await FS.getUri({path:name,directory:"CACHE"});
var res=await VE.edit({path:u.uri,transcode:{width:480,height:480,keepAspectRatio:true,fps:24}});
var p=res&&res.file&&res.file.path;if(!p)throw new Error("pas de sortie");
var url=window.Capacitor.convertFileSrc(p.indexOf("file://")===0?p:"file://"+p);
var r=await fetch(url);if(!r.ok)throw new Error("lecture sortie");
var b=await r.blob();
try{await FS.deleteFile({path:name,directory:"CACHE"})}catch(e){}
return b}
window.tooleZip=function(f,w,h,dur){
try{toast("Compression en cours…")}catch(e){}
return run(f).then(function(b){
if(b.size>19*1048576){try{toast("Vidéo encore trop lourde ("+Math.round(b.size/1048576)+" Mo)")}catch(e){}return null}
try{toast("Vidéo prête ("+Math.round(b.size/1048576)+" Mo)")}catch(e){}
return new File([b],"video.mp4",{type:"video/mp4"})
}).catch(function(e){
try{toast("Compression native impossible : "+(e&&e.message||e))}catch(x){}
return old?old(f,w,h,dur):null})};
})();
