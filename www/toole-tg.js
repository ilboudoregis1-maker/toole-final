(function(){
var CUT=1792274400000,MAXB=19*1048576,down=0;
var raw=window.fetch.bind(window);
function fn(){return (typeof URL==="string"?URL:"")+"/functions/v1/tg"}
function hdr(){var s=null;try{s=sess()}catch(e){}var h={};if(typeof KEY==="string")h.apikey=KEY;if(s&&s.access_token)h.Authorization="Bearer "+s.access_token;return h}
async function up(blob,path){
if(Date.now()<down||!blob||!blob.size||blob.size>MAXB||navigator.onLine===false)throw new Error("tg-skip");
var ac=new AbortController(),t=setTimeout(function(){ac.abort()},30000+Math.round(blob.size/50));
try{var h=hdr();h["x-path"]=encodeURIComponent(path);h["Content-Type"]=blob.type||"application/octet-stream";
var r=await raw(fn(),{method:"POST",headers:h,body:blob,signal:ac.signal});
if(r.status===401){try{await api("/auth/v1/user")}catch(e){}h=hdr();h["x-path"]=encodeURIComponent(path);h["Content-Type"]=blob.type||"application/octet-stream";r=await raw(fn(),{method:"POST",headers:h,body:blob,signal:ac.signal})}
if(!r.ok)throw new Error("tg "+r.status)}catch(e){down=Date.now()+8000;throw e}finally{clearTimeout(t)}}
function url(path,rtype){return fn()+"?p="+encodeURIComponent(path)+"&t="+(rtype||"image")}
window.tgUpload=up;window.tgUrl=url;window.tgReady=function(s){return Date.now()>=down&&navigator.onLine!==false&&s<=MAXB};
var MARK="/storage/v1/object/voice/";
window.fetch=async function(input,init){
var u=typeof input==="string"?input:(input&&input.url)||"",i=u.indexOf(MARK);
if(i>-1&&init&&init.method==="POST"&&init.body&&init.body.size){try{await up(init.body,u.slice(i+MARK.length));return new Response("{}",{status:200})}catch(e){}}
return raw(input,init)};
var oldV=window.vUrl;
if(typeof oldV==="function")window.vUrl=async function(path){var m=/\/(\d{13})-/.exec(path);if(m&&Number(m[1])>=CUT)return url(path,"video");return oldV(path)};
})();
