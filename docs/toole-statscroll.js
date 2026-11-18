/* TÕÕLé — rangée des statuts de l'accueil : défile seule, de côté */
(function(){"use strict";if(window.__tss)return;window.__tss=1;
var st=document.createElement("style");
st.textContent="#v4st::-webkit-scrollbar{display:none}#v4st>*{flex:none!important}";
document.head.appendChild(st);
function P(e,k,v){e.style.setProperty(k,v,"important")}
function fix(){var r=document.getElementById("v4st");if(!r||r.__tss)return;r.__tss=1;
P(r,"overflow-x","auto");P(r,"overflow-y","hidden");P(r,"flex-wrap","nowrap");P(r,"max-width","100%");P(r,"box-sizing","border-box");
P(r,"touch-action","pan-x");P(r,"overscroll-behavior-x","contain");P(r,"scrollbar-width","none");P(r,"-webkit-overflow-scrolling","touch")}
setInterval(fix,600);fix();
})();
