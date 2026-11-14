/* TÕÕLé — messages non lus bien visibles dans la liste des discussions */
(function(){"use strict";if(window.__tnl)return;window.__tnl=1;
var CNT={},busy=0,pend=0;
function $(i){return document.getElementById(i)}
function myId(){try{return typeof me==="function"?me():null}catch(e){return null}}
function shown(){var s=$("scrList");return !!s&&!s.classList.contains("hide")&&!document.hidden}
var css=document.createElement("style");css.textContent=
"html body #recent .row.tnl{background:linear-gradient(90deg,rgba(0,194,224,.14),rgba(47,111,224,.04))!important;box-shadow:inset 4px 0 0 #00c2e0}"+
"html body #recent .row.tnl .rn{font-weight:800!important;color:#0a2a66!important}"+
"html body #recent .row.tnl .sub{font-weight:700!important;color:#1d3a6e!important}"+
"html[data-theme=dark] body #recent .row.tnl{background:linear-gradient(90deg,rgba(0,194,224,.22),rgba(47,111,224,.08))!important}"+
"html[data-theme=dark] body #recent .row.tnl .rn{color:#fff!important}"+
"html[data-theme=dark] body #recent .row.tnl .sub{color:#dbe8ff!important}"+
"#recent .row>.tnl-b{flex:none;min-width:24px;height:24px;padding:0 7px;margin-left:8px;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;font:800 13px/1 system-ui,sans-serif;box-shadow:0 3px 10px rgba(47,111,224,.45);animation:tnlPop .35s both}"+
"@keyframes tnlPop{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}";
document.head.appendChild(css);
function paint(){var rc=$("recent");if(!rc)return;
[].forEach.call(rc.querySelectorAll(".row"),function(r){var id=r.dataset&&r.dataset.pid;if(!id)return;var n=CNT[id]||0,b=null;
for(var i=0;i<r.children.length;i++){if(r.children[i].classList.contains("tnl-b")){b=r.children[i];break}}
if(!n){if(b)b.remove();r.classList.remove("tnl");return}
if(!b){var foreign=[].some.call(r.children,function(c){return c.tagName==="SPAN"&&/^\d+$/.test((c.textContent||"").trim())});if(foreign)return;
b=document.createElement("span");b.className="tnl-b";var st=null;for(var j=0;j<r.children.length;j++){var c=r.children[j];if(c.classList.contains("v5star")||c.classList.contains("v4star")){st=c;break}}r.insertBefore(b,st)}
var t=n>99?"99+":String(n);if(b.textContent!==t)b.textContent=t;
if(!r.classList.contains("tnl"))r.classList.add("tnl")})}
function later(){if(pend)return;pend=1;requestAnimationFrame(function(){pend=0;try{paint()}catch(e){}})}
function refresh(){var m=myId();if(busy||!m||typeof window.api!=="function")return;try{if(localStorage.getItem("toole_readconf")==="0")return}catch(e){}
busy=1;window.api("/rest/v1/messages?select=sender&receiver=eq."+m+"&read_at=is.null&limit=1000").then(function(rows){var c={};(Array.isArray(rows)?rows:[]).forEach(function(r){c[r.sender]=(c[r.sender]||0)+1});CNT=c;paint()}).catch(function(){}).then(function(){busy=0})}
var wired=null;
function wire(){var rc=$("recent");if(!rc||wired===rc)return;wired=rc;new MutationObserver(later).observe(rc,{childList:true,subtree:true});
rc.addEventListener("click",function(e){var r=e.target&&e.target.closest&&e.target.closest(".row");if(r&&r.dataset&&r.dataset.pid){CNT[r.dataset.pid]=0}},true);later()}
var sl=null;function wireList(){var s=$("scrList");if(!s||sl===s)return;sl=s;new MutationObserver(function(){if(shown())refresh()}).observe(s,{attributes:true,attributeFilter:["class"]})}
setInterval(function(){wire();wireList();if(shown())refresh()},4000);
document.addEventListener("visibilitychange",function(){if(!document.hidden)refresh()});
setTimeout(function(){wire();wireList();refresh()},1200);
})();
