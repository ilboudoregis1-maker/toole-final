/* TÕÕLé : barre du bas, une seule ligne, sans le bouton + (v4) */
(function(){if(window.__tb1)return;window.__tb1=1;
function P(e,o){for(var k in o)e.style.setProperty(k,o[k],"important")}
function fix(){var n=document.getElementById("v4nav");if(!n||!n.classList.contains("on"))return;
P(n,{"flex-direction":"row","flex-wrap":"nowrap","align-items":"center","justify-content":"space-between",gap:"0",height:"auto","min-height":"0","max-height":"none",overflow:"visible"});
[].slice.call(n.querySelectorAll("button")).forEach(function(b){
 var mid=b.classList.contains("mid")||b.getAttribute("data-n")==="new";
 if(mid){P(b,{display:"none"});return}
 var w=b.parentNode;if(w!==n)P(w,{display:"contents"});
 P(b,{display:"flex","flex-direction":"column","align-items":"center","justify-content":"center",flex:"1 1 0","min-width":"0",width:"auto",height:"auto","min-height":"0",margin:"0",padding:"6px 1px 8px",gap:"2px",position:"static",transform:"none"});
 b.querySelectorAll("span").forEach(function(s){P(s,{display:"block","white-space":"nowrap","line-height":"1.2","max-width":"100%"})})
})}
fix();setInterval(fix,500);
})();
