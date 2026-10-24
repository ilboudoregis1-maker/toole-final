(function(){
function uid(){try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return "x"}}
function J(k,d){try{return JSON.parse(localStorage.getItem(k)||d)}catch(e){return JSON.parse(d)}}
function kc(){return "tdc_"+uid()}
var NM={},LAST={};
function wrapApi(){var a=window.api;if(typeof a!=="function"||a.__hf)return;
var w=function(p){var r=a.apply(this,arguments);
if(String(p).indexOf("/rest/v1/messages?select=sender,receiver,body,created_at")===0)
Promise.resolve(r).then(function(rows){try{var me=uid();if(Array.isArray(rows))rows.forEach(function(m){var o=m.sender===me?m.receiver:m.sender;if(!LAST[o]||m.created_at>LAST[o])LAST[o]=m.created_at})}catch(e){}}).catch(function(){});
return r};w.__hf=1;window.api=w}
window.__tdelChat=function(name,row){var id=(row&&row.dataset&&row.dataset.pid)||NM[name];if(!id)return;
var o=J(kc(),"{}");o[id]=LAST[id]||new Date().toISOString();localStorage.setItem(kc(),JSON.stringify(o))};
function hiddenChat(id){var o=J(kc(),"{}");if(!(id in o))return false;var t=LAST[id];
if(t&&t>o[id]){delete o[id];localStorage.setItem(kc(),JSON.stringify(o));return false}return true}
function other(){var m=window.__v4mode,c=-1;
document.querySelectorAll("#scrList .chip").forEach(function(x,i){if(x.classList.contains("on"))c=i});
return c===1}
function wrapHome(){var f=window.homeRender;if(typeof f!=="function"||f.__hf)return;
var w=function(l){if(other())return;
try{if(Array.isArray(l)){l.forEach(function(x){if(x&&x.id&&x.name)NM[x.name]=x.id});
l=l.filter(function(x){return !(x&&x.id&&hiddenChat(x.id))})}}catch(e){}
var a=[].slice.call(arguments);a[0]=l;return f.apply(this,a)};w.__hf=1;window.homeRender=w}
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest("#scrList .chip"))window.__v4mode="chip"},true);
wrapApi();wrapHome();setInterval(function(){wrapApi();wrapHome()},50);
/* anti-flash : purge du cache d'accueil + masquage immediat des discussions supprimees */
function tn(){return "tdn_"+uid()}
function purge(){try{var o=J(kc(),"{}"),ids=Object.keys(o);if(!ids.length)return;var k="home:"+uid(),c=J(k,"[]");if(!Array.isArray(c))return;
var m=J(tn(),"{}"),n=c.filter(function(x){if(x&&ids.indexOf(x.id)>-1){if(x.name)m[x.id]=x.name;return false}return true});
localStorage.setItem(tn(),JSON.stringify(m));if(n.length!==c.length)localStorage.setItem(k,JSON.stringify(n))}catch(e){}}
purge();
var od=window.__tdelChat;window.__tdelChat=function(name,row){if(od)od.apply(this,arguments);try{var id=(row&&row.dataset&&row.dataset.pid)||NM[name];if(id&&name){var m=J(tn(),"{}");m[id]=name;localStorage.setItem(tn(),JSON.stringify(m))}}catch(e){}purge()};
var sw=0;
function sweep(){sw=0;try{var o=J(kc(),"{}"),m=J(tn(),"{}"),N={},any=0;Object.keys(m).forEach(function(i){if(i in o){N[m[i]]=1;any=1}});if(!any)return;
document.querySelectorAll("#recent .row").forEach(function(r){var t=((r.querySelector(".rn")||{}).textContent||"");if(N[t])r.style.display="none"})}catch(e){}}
try{new MutationObserver(function(){if(!sw){sw=1;requestAnimationFrame(sweep)}}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
})();
