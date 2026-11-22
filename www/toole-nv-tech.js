(function(){if(window.__nvt2)return;window.__nvt2=1;
var l=document.createElement("link");l.rel="stylesheet";l.href="toole-nv-tech.css";document.head.appendChild(l);
var q="";
function back(){var s=document.getElementById("scrDecouvrir");if(s)s.classList.add("hide");
var n=document.getElementById("v4nav");if(n)n.classList.remove("on");
var b=document.querySelector('#tabs button[data-t="chats"]');if(b)b.click()}
function filt(){var r=document.getElementById("nvx");if(!r)return;var k=q.toLowerCase().trim(),any=false;
r.querySelectorAll(".card,.une,.app,.inf").forEach(function(e){var ok=!k||e.textContent.toLowerCase().indexOf(k)>-1;e.style.display=ok?"":"none";if(ok)any=true});
r.querySelectorAll(".sec").forEach(function(s){var vis=false,n=s.nextElementSibling;
if(n&&n.classList.contains("hs")){vis=[].some.call(n.children,function(c){return c.style.display!=="none"});n.style.display=(!k||vis)?"":"none"}
else{while(n&&!n.classList.contains("sec")){if(n.classList.contains("card")&&n.style.display!=="none")vis=true;n=n.nextElementSibling}}
s.style.display=(!k||vis)?"":"none"});
var no=document.querySelector("#nvhd .no");if(no){no.style.display=(k&&!any)?"block":"none";no.textContent="Aucun résultat pour « "+q.trim()+" »"}}
function head(){var sc=document.getElementById("scrDecouvrir");if(!sc||sc.querySelector("#nvhd"))return;
var h=document.createElement("div");h.id="nvhd";h.className="nvh";
h.innerHTML='<div class="r1"><button type="button" class="bk" aria-label="Retour"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button><h1>Nouveautés</h1><button type="button" class="pb">+ Publier</button></div><div class="r2"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input type="search" placeholder="Rechercher une info, une app…"><button type="button" class="cl">✕</button></div><div class="no"></div>';
sc.insertBefore(h,sc.firstChild);
var i=h.querySelector("input"),c=h.querySelector(".cl");
h.querySelector(".bk").onclick=back;
h.querySelector(".pb").onclick=function(){var b=document.querySelector("#nvx .req");if(b)b.click()};
i.oninput=function(){q=i.value;c.style.display=q?"block":"none";filt()};
c.onclick=function(){i.value="";q="";c.style.display="none";filt()}}
setInterval(function(){try{head();filt()}catch(e){}},500);
})();
