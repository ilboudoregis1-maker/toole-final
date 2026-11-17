/* TÕÕLé : ouvrir une vidéo partagée depuis le chat */
(function(){"use strict";if(window.__tvo)return;window.__tvo=1;
var st=document.createElement("style");st.textContent=
"#tvFeed{z-index:100040!important}"
+".tv3lk{display:block!important;margin-top:8px!important;padding:9px 16px!important;border:0!important;border-radius:16px!important;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;font-weight:800!important;font-size:14px!important}"
+".tv3ts{position:fixed;left:16px;right:16px;bottom:100px;z-index:100060;padding:12px 16px;border-radius:14px;background:#0a2a66;color:#fff;text-align:center;font:14px sans-serif}";
document.head.appendChild(st);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","tv3ts",m);document.body.appendChild(d);setTimeout(function(){d.remove()},2500)}
function play(p){if(!document.getElementById("tvFeed")){var b=document.querySelector(".tv-b");if(!b){toast("Vidéos indisponibles");return}b.click()}
var n=0,t=setInterval(function(){n++;var hit=null;document.querySelectorAll("#tvScr .tvi").forEach(function(it){if(it.__p===p)hit=it});
if(hit){clearInterval(t);hit.scrollIntoView({block:"start"});return}
if(n>16){clearInterval(t);toast("Vidéo introuvable dans le fil")}},400)}
var RE=/toole:\/\/video\/(\S+)/;
function links(){if(document.hidden)return;var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),a=[],n;
while(n=w.nextNode()){if(n.nodeValue.indexOf("toole://video/")>=0&&n.parentElement&&!n.parentElement.closest("#tv3sh,input,textarea,script,style"))a.push(n)}
a.forEach(function(n){var m=n.nodeValue.match(RE);if(!m)return;var p=m[1],par=n.parentNode;
var b=E("button","tv3lk","▶ Ouvrir la vidéo");b.onclick=function(e){e.preventDefault();e.stopPropagation();play(p)};
par.insertBefore(document.createTextNode(n.nodeValue.slice(0,m.index)),n);par.insertBefore(b,n);par.removeChild(n)})}
setInterval(links,1000);
})();
