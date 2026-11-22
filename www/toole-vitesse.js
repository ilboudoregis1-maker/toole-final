(function(){"use strict";if(window.__tvit2)return;window.__tvit2=1;
var seen={};
var FEEDQ="/rest/v1/videos?select=id,author,caption,path,created_at&order=created_at.desc&limit=30";
function cn(){return navigator.connection||{}}
function wifi(){var t=cn().type;return t==="wifi"||t==="ethernet"}
function ahead(){var c=cn(),e=c.effectiveType;
if(c.saveData)return 1;
if(wifi())return 4;
if(e==="2g"||e==="slow-2g")return 1;
return 2}
function first(){if(cn().saveData)return 0;return wifi()?3:1}
function pre(path){
if(!path||typeof window.tgUrl!=="function")return;
var n=Date.now();if(seen[path]&&n-seen[path]<600000)return;seen[path]=n;
try{window.fetch(window.tgUrl(path,"video")).then(function(r){return r.blob()})
.catch(function(){delete seen[path]})}catch(e){delete seen[path]}}
function many(L){for(var i=L.length-1;i>=0;i--)pre(L[i])}
var st=document.createElement("style");
st.textContent="#tvScr .tvl{opacity:0;animation:tvlin .2s 1.6s forwards}@keyframes tvlin{to{opacity:1}}";
document.head.appendChild(st);
document.addEventListener("playing",function(e){
var v=e.target;if(!v||v.tagName!=="VIDEO"||!v.closest)return;
var it=v.closest(".tvi");if(!it)return;
var n=ahead(),L=[],x=it.nextElementSibling;
while(x&&L.length<n){if(x.__p)L.push(x.__p);x=x.nextElementSibling}
many(L)},true);
document.addEventListener("loadedmetadata",function(e){
var v=e.target;if(v&&v.tagName==="VIDEO"&&v.closest&&v.closest("#tvFeed"))v.preload="auto"},true);
function warm(){
try{if(navigator.onLine===false||typeof window.api!=="function")return;
window.api(FEEDQ).then(function(r){
if(Array.isArray(r))many(r.slice(0,first()).map(function(x){return x&&x.path}))}).catch(function(){})}catch(e){}}
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest?e.target.closest('#tabs button[data-t="decouvrir"]'):null;
if(b)warm()},true);
document.addEventListener("visibilitychange",function(){if(!document.hidden)setTimeout(warm,800)});
setTimeout(warm,2500);
})();
