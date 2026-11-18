(function(){
var Q=null,stop=0,CNT={},NAMES={},nw=0;
function ME(){try{return me()}catch(e){return null}}
function SINCE(){return new Date(Date.now()-864e5).toISOString()}
function SEEN(){try{return JSON.parse(localStorage.getItem("v9seen")||"{}")||{}}catch(e){return{}}}
function list(a){return Promise.resolve(api("/rest/v1/statuts?select=id,body,created_at,author&author=eq."+a+"&created_at=gt."+SINCE()+"&order=created_at.asc")).then(function(r){return Array.isArray(r)?r:[]})}
var css=document.createElement("style");
css.textContent=".tm-n{position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:9px;background:#00a8c8;color:#fff;font:700 11px/18px sans-serif;text-align:center;z-index:3}#tmN{position:fixed;left:0;right:0;top:calc(env(safe-area-inset-top,0px) + 62px);text-align:center;z-index:100000;pointer-events:none;color:#fff;font:700 12px sans-serif;text-shadow:0 1px 3px #000}";
document.head.appendChild(css);
function count(){var e=document.getElementById("tmN");if(e)e.remove();if(!Q)return;var d=document.createElement("div");d.id="tmN";d.textContent=(Q.i+1)+" / "+Q.list.length;document.body.appendChild(d)}
function end(){Q=null;var e=document.getElementById("tmN");if(e)e.remove()}
function play(){if(!Q)return;var q=Q,s=q.list[q.i];q.on=1;count();try{q.f.call(q.ctx,s,q.mine,q.name)}catch(e){end();return}setTimeout(function(){if(Q===q&&!document.getElementById("stv"))end()},2500)}
function wrap(){var f=window.openViewer;if(nw>=3||typeof f!=="function"||f.__tm)return;nw++;
var w=function(st,mine,name){var self=this,args=arguments;
if(Q&&Q.on)return f.apply(self,args);
var a=mine?ME():(st&&st.author);
if(!a||!st)return f.apply(self,args);
return list(a).then(function(L){
if(L.length<2)return f.apply(self,args);
var i=0;if(!mine){var sn=SEEN();for(var k=0;k<L.length;k++){if(!sn[L[k].id]){i=k;break}}}
stop=0;window.__tmStop=0;Q={list:L,i:i,mine:mine,name:name,f:f,ctx:self};play()
},function(){return f.apply(self,args)})};
w.__tm=1;window.openViewer=w}
new MutationObserver(function(ms){if(!Q)return;var g=0;ms.forEach(function(m){[].forEach.call(m.removedNodes,function(x){if(x.id==="stv")g=1})});if(!g)return;
setTimeout(function(){if(!Q||document.getElementById("stv"))return;if(stop||window.__tmStop||Q.i+1>=Q.list.length){end();return}Q.i++;play()},80)}).observe(document.body,{childList:true});
document.addEventListener("click",function(e){var t=e.target;if(Q&&t&&t.closest&&t.closest("#stv")&&(t.textContent||"").trim()==="✕")stop=1},true);
wrap();setTimeout(wrap,1500);setTimeout(wrap,4000);
function refresh(){var id=ME();if(!id||typeof api!=="function"||!navigator.onLine)return;
Promise.resolve(api("/rest/v1/statuts?select=id,body,created_at,author&created_at=gt."+SINCE()+"&limit=300")).then(function(rows){
var c={};(rows||[]).forEach(function(r){c[r.author]=(c[r.author]||0)+1});CNT=c;
var miss=Object.keys(c).filter(function(a){return a!==id&&!NAMES[a]});if(!miss.length)return;
return Promise.resolve(api("/rest/v1/profiles?select=id,pseudo&id=in.("+miss.join(",")+")")).then(function(p){(p||[]).forEach(function(x){NAMES[x.id]=x.pseudo||"?"})})}).catch(function(){})}
function cnt(name){var id=ME();if(name==="Mon statut")return CNT[id]||0;for(var a in NAMES){if(NAMES[a]===name)return CNT[a]||0}return 0}
function tag(box,name){if(!box)return;var n=cnt(name),b=box.querySelector(".tm-n");if(n<2){if(b)b.remove();return}
if(!b){var h=box.querySelector(".rg")||box;if(getComputedStyle(h).position==="static")h.style.position="relative";b=document.createElement("b");b.className="tm-n";h.appendChild(b)}
b.textContent=n}
function paint(){try{tag(document.getElementById("v4stMe"),"Mon statut");
[].forEach.call(document.querySelectorAll("#v4st .v7-c"),function(d){tag(d,d.lastChild?d.lastChild.textContent:"")});
[].forEach.call(document.querySelectorAll("#sxBox .sx-row"),function(r){var e=r.querySelector(".sx-n");if(!e)return;var nm=e.dataset.tm||e.textContent;e.dataset.tm=nm;var n=cnt(nm),x=r.querySelector(".tm-c");
if(n<2){if(x)x.remove();return}if(!x){x=document.createElement("span");x.className="tm-c";x.style.cssText="font-weight:400;opacity:.7";e.appendChild(x)}x.textContent=" · "+n+" statuts"})}catch(e){}}
refresh();setInterval(refresh,20000);setInterval(paint,1500);
document.addEventListener("visibilitychange",refresh);
})();
