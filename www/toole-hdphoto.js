/* TÕÕLé — photo de profil agrandie : charge la version HD au lieu de la miniature */
(function(){"use strict";if(window.__thd)return;window.__thd=1;
var RE=/(avatars\/[^\/"')]+\/)thumb(\.jpg[^"')]*)/;
function fix(el){
if(el.nodeType!==1||el.__hd)return;
var r=el.getBoundingClientRect();if(r.width<200)return;
var u,bg;
if(el.tagName==="IMG"){u=el.currentSrc||el.src;if(!RE.test(u))return;el.__hd=1;
var a=u.replace(RE,"$1avatar$2"),im=new Image();im.onload=function(){el.src=a};im.src=a;return}
bg=getComputedStyle(el).backgroundImage;
if(!bg||!RE.test(bg))return;
var m=/url\(["']?([^"')]+)["']?\)/.exec(bg);if(!m)return;
el.__hd=1;var b=m[1].replace(RE,"$1avatar$2"),i2=new Image();
i2.onload=function(){el.style.setProperty("background-image",'url("'+b+'")',"important")};i2.src=b}
function scan(n){if(n.nodeType!==1)return;fix(n);[].forEach.call(n.querySelectorAll("*"),fix)}
new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){
scan(n);setTimeout(function(){scan(n)},250);setTimeout(function(){scan(n)},900)})})}).observe(document.body,{childList:true,subtree:true});
})();
