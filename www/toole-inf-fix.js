/* TÕÕLé : correctif bouton Influenceur */
(function(){
if(window.__tinfx)return;window.__tinfx=1;
function toast(m){var d=document.createElement("div");d.textContent=m;d.style.cssText="position:fixed;left:16px;right:16px;bottom:100px;z-index:100300;padding:12px 16px;border-radius:14px;background:#0a2a66;color:#fff;text-align:center;font:14px sans-serif";document.body.appendChild(d);setTimeout(function(){d.remove()},4000)}
document.addEventListener("click",function(e){
var b=e.target&&e.target.closest&&e.target.closest(".tvinfb");if(!b)return;
e.stopPropagation();e.preventDefault();
if(typeof window.__tinfOpen!=="function"){toast("Influenceur : script non chargé");return}
try{window.__tinfOpen();var o=document.getElementById("tinfOv");if(o){o.style.zIndex=100200}else{toast("Influenceur : panneau non créé")}}
catch(x){toast("Influenceur : "+(x&&x.message))}
},true);
})();
