(function(){if(window.__nvt)return;window.__nvt=1;
var l=document.createElement("link");l.rel="stylesheet";l.href="toole-nv-tech.css";document.head.appendChild(l);
function back(){var s=document.getElementById("scrDecouvrir");if(s)s.classList.add("hide");
var n=document.getElementById("v4nav");if(n)n.classList.remove("on");
var b=document.querySelector('#tabs button[data-t="chats"]');if(b)b.click()}
setInterval(function(){var t=document.querySelector("#nvx .top");
if(!t||t.querySelector(".nvback"))return;
var b=document.createElement("button");b.type="button";b.className="nvback";b.setAttribute("aria-label","Retour");
b.innerHTML='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
b.onclick=back;t.insertBefore(b,t.firstChild)},500);
})();
