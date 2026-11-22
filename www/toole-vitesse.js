(function(){"use strict";if(window.__tvit)return;window.__tvit=1;
var seen={};
function cn(){return navigator.connection||{}}
function ahead(){var c=cn(),t=c.type,e=c.effectiveType;
if(c.saveData)return 1;
if(t==="wifi"||t==="ethernet")return 4;
if(e==="2g"||e==="slow-2g")return 1;
return 2}
function pre(path){
if(!path||typeof window.tgUrl!=="function")return;
var n=Date.now();if(seen[path]&&n-seen[path]<600000)return;seen[path]=n;
try{window.fetch(window.tgUrl(path,"video")).then(function(r){return r.blob()})
.catch(function(){delete seen[path]})}catch(e){delete seen[path]}}
function many(L){for(var i=L.length-1;i>=0;i--)pre(L[i])}
document.addEventListener("playing",function(e){
var v=e.target;if(!v||v.tagName!=="VIDEO"||!v.closest)return;
var it=v.closest(".tvi");if(!it)return;
var n=ahead(),L=[],x=it.nextElementSibling;
while(x&&L.length<n){if(x.__p)L.push(x.__p);x=x.nextElementSibling}
many(L)},true);
document.addEventListener("loadedmetadata",function(e){
var v=e.target;if(v&&v.tagName==="VIDEO"&&v.closest&&v.closest("#tvFeed"))v.preload="auto"},true);
function warm(n){
try{if(navigator.onLine===false||typeof window.api!=="function")return;
window.api("/rest/v1/videos?select=id,path&order=created_at.desc&limit="+n).then(function(r){
if(Array.isArray(r))many(r.map(function(x){return x&&x.path}))}).catch(function(){})}catch(e){}}
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest?e.target.closest('#tabs button[data-t="decouvrir"]'):null;
if(b)warm(Math.min(2,ahead()))},true);
setTimeout(function(){var t=cn().type;
if((t==="wifi"||t==="ethernet")&&localStorage.getItem("tvc:used")==="1")warm(4)},4000);
})();
