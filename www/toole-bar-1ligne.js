/* TÕÕLé : barre du bas sur une seule ligne (v2, styles forcés en ligne) */
(function(){if(window.__tb1)return;window.__tb1=1;
function P(e,o){for(var k in o)e.style.setProperty(k,o[k],"important")}
function fix(){var n=document.getElementById("v4nav");if(!n)return;
P(n,{display:"flex","flex-direction":"row","flex-wrap":"nowrap","align-items":"center","justify-content":"space-between",gap:"0",height:"auto","max-height":"76px",overflow:"hidden","grid-template-columns":"none"});
var bs=[].slice.call(n.querySelectorAll("button"));
bs.forEach(function(b){
 var mid=b.classList.contains("mid")||b.getAttribute("data-n")==="new";
 var w=b.parentNode;
 if(w!==n){P(w,{display:"contents"})}
 P(b,{position:"static",transform:"none",float:"none",margin:mid?"0 2px":"0",flex:mid?"0 0 54px":"1 1 0","min-width":"0",width:mid?"54px":"auto","max-width":"none"});
 if(!mid){P(b,{display:"flex","flex-direction":"column","align-items":"center","justify-content":"center",padding:"6px 1px",gap:"2px"});
  var sv=b.querySelector("svg");if(sv)P(sv,{width:"22px",height:"22px"});
  b.querySelectorAll("span").forEach(function(s){P(s,{display:"block","white-space":"nowrap",overflow:"hidden","text-overflow":"clip","font-size":"9px","letter-spacing":"-.2px","line-height":"1.1","max-width":"100%"})})}
});
[].slice.call(n.children).forEach(function(c){if(c.tagName!=="BUTTON"&&!c.querySelector("button")&&!c.textContent.trim())P(c,{display:"none"})});
}
fix();setInterval(fix,500);
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
})();
