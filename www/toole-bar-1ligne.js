/* TÕÕLé : barre du bas sur une seule ligne (v3, sans toucher à display de la barre) */
(function(){if(window.__tb1)return;window.__tb1=1;
function P(e,o){for(var k in o)e.style.setProperty(k,o[k],"important")}
function fix(){var n=document.getElementById("v4nav");if(!n||!n.classList.contains("on"))return;
P(n,{"flex-direction":"row","flex-wrap":"nowrap","align-items":"center","justify-content":"space-between",gap:"0","max-height":"76px",overflow:"hidden"});
[].slice.call(n.querySelectorAll("button")).forEach(function(b){
 var mid=b.classList.contains("mid")||b.getAttribute("data-n")==="new";
 var w=b.parentNode;if(w!==n)P(w,{display:"contents"});
 P(b,{margin:mid?"0 2px":"0",flex:mid?"0 0 54px":"1 1 0","min-width":"0",width:mid?"54px":"auto"});
 if(!mid){P(b,{padding:"6px 1px",gap:"2px"});
  b.querySelectorAll("span").forEach(function(s){P(s,{"white-space":"nowrap",overflow:"hidden","font-size":"9px","letter-spacing":"-.2px","max-width":"100%"})})}
})}
fix();setInterval(fix,700);
})();
