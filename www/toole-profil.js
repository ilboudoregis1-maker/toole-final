(function(){var q=0;
function fix(){var p=document.getElementById("scrProfil");if(!p)return;var b=p.querySelector(".body");if(!b)return;
["tsTyp","tsOnl","supportBtn","cnsLink"].forEach(function(i){var e=document.getElementById(i);if(e&&e.parentNode!==b)b.appendChild(e)});
var s=document.getElementById("supportBtn");if(s){s.style.width="100%";s.style.margin="12px 0"}
["tsTyp","tsOnl"].forEach(function(i){var e=document.getElementById(i);if(e)e.style.margin="10px 0"});
var t=document.getElementById("supportStatic");if(t&&s&&t.offsetParent!==null)s.style.display="none"}
function later(){if(q)return;q=1;requestAnimationFrame(function(){q=0;fix()})}
function init(){fix();new MutationObserver(later).observe(document.body,{childList:true,subtree:true});setInterval(fix,1000)}
if(document.readyState=="complete")init();else addEventListener("load",init);
})();
document.addEventListener("focusin",function(e){var t=e.target;if(t&&t.matches&&t.matches("input[type=checkbox],input[type=radio],input[type=range],input[type=button],input[type=submit],input[type=file],select"))document.body.classList.remove("kbd-open")},true);
