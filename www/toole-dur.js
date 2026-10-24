(function(){
var M="\u2063TSX1:";window.__tsHours=0;
function exp(r){try{var b=r&&r.body,i=b?b.indexOf(M):-1;if(i<0)return false;
var d=JSON.parse(b.slice(i+M.length));
return !!d.h&&Date.now()>Date.parse(r.created_at)+d.h*3600000}catch(e){return false}}
function stamp(o){try{var j=JSON.parse(o.body),i=j.body.indexOf(M);if(i<0)return o;
var d=JSON.parse(j.body.slice(i+M.length));d.h=window.__tsHours;
j.body=j.body.slice(0,i+M.length)+JSON.stringify(d);
return Object.assign({},o,{body:JSON.stringify(j)})}catch(e){return o}}
var n=0;
function wrap(){var a=window.api;if(n>=3||typeof a!=="function"||a.__tdur)return;n++;
var w=function(p,o){var s=String(p),post=o&&o.method==="POST"&&
s.indexOf("/rest/v1/statuts")===0&&window.__tsHours;
if(post)o=stamp(o);var r=a.call(this,p,o);
if(post)return Promise.resolve(r).then(function(x){window.__tsHours=0;return x});
if((!o||!o.method||o.method==="GET")&&s.indexOf("/rest/v1/statuts?")===0)
return Promise.resolve(r).then(function(x){
return Array.isArray(x)?x.filter(function(z){return !exp(z)}):x});
return r};
w.__tdur=1;window.api=w}
wrap();setTimeout(wrap,1500);setTimeout(wrap,4000);
function add(){var t=document.getElementById("tsT");
if(!t||document.getElementById("tsDur"))return;
var c=document.createElement("div");c.id="tsDur";
c.style.cssText="display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:0 0 8px;font-size:13px;color:#007a8c";
c.appendChild(document.createTextNode("Durée :"));
function paint(){Array.prototype.forEach.call(c.querySelectorAll("button"),function(b){
var on=+b.dataset.h===window.__tsHours;b.style.background=on?"#00bcd4":"#e6faff";
b.style.color=on?"#fff":"#007a8c"})}
[[3,"3 h"],[5,"5 h"],[12,"12 h"],[0,"Standard"]].forEach(function(x){
var b=document.createElement("button");b.type="button";b.textContent=x[1];b.dataset.h=x[0];
b.style.cssText="padding:6px 10px;border-radius:14px;border:1px solid rgba(0,168,200,.5);font-size:13px";
b.onclick=function(){window.__tsHours=x[0];paint()};c.appendChild(b)});
t.parentNode.insertBefore(c,t);window.__tsHours=0;paint()}
new MutationObserver(add).observe(document.body,{childList:true,subtree:true});
})();
