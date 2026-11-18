(function(){
var LK="tsrx_local";
function lget(){try{return JSON.parse(localStorage.getItem(LK)||"{}")}catch(e){return{}}}
function lset(o){try{var k=Object.keys(o);if(k.length>3000)k.slice(0,500).forEach(function(x){delete o[x]});localStorage.setItem(LK,JSON.stringify(o))}catch(e){}}
function lput(k,u,e){var L=lget();if(e)L[k+"|"+u]=e;else delete L[k+"|"+u];lset(L)}
function sync(srv,els){var L=lget(),u=String(me()),vis={},byK={};els.forEach(function(e){var k=key(e);vis[k]=1;byK[k]=e});
srv.forEach(function(x){L[x.message_id+"|"+x.user_id]=x.emoji});lset(L);
rows=[];Object.keys(L).forEach(function(c){var i=c.lastIndexOf("|"),m=c.slice(0,i);if(vis[m])rows.push({message_id:m,user_id:c.slice(i+1),emoji:L[c]})});
render();
srv.filter(function(x){var el=byK[x.message_id];return String(x.user_id)!==u&&el&&el.classList.contains("me")}).slice(0,20).forEach(function(x){api("/rest/v1/message_reactions?message_id=eq."+encodeURIComponent(x.message_id)+"&user_id=eq."+encodeURIComponent(x.user_id),{method:"DELETE",headers:{Prefer:"return=minimal"}}).catch(function(){})})}
var EMJ=["👍","❤️","😂","😮","😢","🙏"],last=null,rows=[],busy=0,tm=null;
function key(el){var s=el.closest("section");return(s&&s.id==="scrGroup"?"g:":"m:")+el.dataset.mid}
var st=document.createElement("style");
st.textContent=".rxrow{display:flex;justify-content:space-around;gap:6px;padding:8px 4px 12px}.rxrow button{width:46px;height:46px;border-radius:50%;border:1px solid rgba(0,168,200,.4);background:#f1fcff;font-size:24px;padding:0}.rxrow button.on{background:#00e5ff;box-shadow:0 0 10px rgba(0,229,255,.7)}.rx{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}.rx span{background:rgba(255,255,255,.92);color:#0b2a3a;border:1px solid rgba(0,168,200,.45);border-radius:12px;padding:1px 7px;font-size:13px;line-height:1.5}.rx span.on{background:#c9f7ff;border-color:#00a8c8}";
document.head.appendChild(st);
document.addEventListener("pointerdown",function(e){var m=e.target.closest&&e.target.closest(".m[data-mid]");if(m)last=m},true);
function mine(k){var u=String(me()),r=rows.filter(function(x){return x.message_id===k&&String(x.user_id)===u})[0];return r&&r.emoji}
function render(){var u=String(me());[].forEach.call(document.querySelectorAll(".m[data-mid]"),function(el){var k=key(el),old=el.querySelector(".rx");if(old)old.remove();var c={};rows.forEach(function(r){if(r.message_id===k){var o=c[r.emoji]||(c[r.emoji]={n:0,me:0});o.n++;if(String(r.user_id)===u)o.me=1}});var ks=Object.keys(c);if(!ks.length)return;var d=document.createElement("div");d.className="rx";ks.forEach(function(e){var s=document.createElement("span");s.textContent=e+(c[e].n>1?" "+c[e].n:"");if(c[e].me)s.className="on";d.appendChild(s)});el.appendChild(d)})}
function load(){if(busy||document.hidden)return;var els=[].filter.call(document.querySelectorAll(".m[data-mid]"),function(e){return e.offsetParent!==null}).slice(-60);if(!els.length)return;busy=1;
var ks=els.map(key).map(function(k){return"%22"+encodeURIComponent(k)+"%22"}).join(",");
api("/rest/v1/message_reactions?select=message_id,user_id,emoji&message_id=in.("+ks+")").then(function(r){sync(Array.isArray(r)?r:[],els)}).catch(function(){}).then(function(){busy=0})}
function react(k,e){var u=String(me()),was=mine(k);rows=rows.filter(function(r){return!(r.message_id===k&&String(r.user_id)===u)});
if(was===e){lput(k,u,null);render();api("/rest/v1/message_reactions?message_id=eq."+encodeURIComponent(k)+"&user_id=eq."+encodeURIComponent(u),{method:"DELETE",headers:{Prefer:"return=minimal"}}).catch(function(){});return}
rows.push({message_id:k,user_id:u,emoji:e});lput(k,u,e);render();
api("/rest/v1/message_reactions?on_conflict=message_id,user_id",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({message_id:k,user_id:u,emoji:e,created_at:new Date().toISOString()})}).catch(function(){toast("Réaction non envoyée")})}
function addRow(t){if(!last)return;if(t.nextElementSibling&&t.nextElementSibling.classList.contains("rxrow"))return;var k=key(last),cur=mine(k),row=document.createElement("div");row.className="rxrow";
EMJ.forEach(function(e){var b=document.createElement("button");b.textContent=e;if(cur===e)b.className="on";b.onclick=function(){closeSheet();react(k,e)};row.appendChild(b)});t.insertAdjacentElement("afterend",row)}
new MutationObserver(function(ms){var nw=0;ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType!==1||n.classList.contains("rx"))return;
if(n.classList.contains("sht")&&n.textContent.trim()==="Message")addRow(n);
[].forEach.call(n.querySelectorAll(".sht"),function(t){if(t.textContent.trim()==="Message")addRow(t)});
if(n.classList.contains("m")||n.querySelector(".m[data-mid]"))nw=1})});
if(nw){clearTimeout(tm);tm=setTimeout(load,400)}}).observe(document.body,{childList:true,subtree:true});
setInterval(load,6000);
})();
