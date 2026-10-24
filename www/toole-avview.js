(function(){
function url(el){var m=/url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(el).backgroundImage||"");return m?m[1]:null}
function show(u,n){var o=document.createElement("div");
o.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px";
var c=document.createElement("div"),s="min(78vw,78vh,420px)";
c.style.cssText="width:"+s+";height:"+s+";border-radius:50%;background:center/cover no-repeat;box-shadow:0 0 0 4px rgba(255,255,255,.9),0 18px 50px rgba(0,0,0,.6)";
c.style.backgroundImage='url("'+u+'")';
var t=document.createElement("div");t.textContent=n;t.style.cssText="color:#fff;font:600 18px system-ui";
o.appendChild(c);o.appendChild(t);o.onclick=function(){o.remove()};document.body.appendChild(o)}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("#scrChat .chead .cav,#peerAv");if(!a)return;
var u=url(a);if(!u)return;e.stopPropagation();e.preventDefault();
show(u,(document.getElementById("peerName")||{}).textContent||"")},true);
})();
