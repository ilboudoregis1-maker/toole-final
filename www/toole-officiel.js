(function(){"use strict";if(window.__toff)return;window.__toff=1;
var st=document.createElement("style");
st.textContent=
/* compte Officiel : rien de cliquable, pas d'abonnement */
"#tvScr .tvi.tvoff2 .tka,#tvScr .tvi.tvoff2 .tkc,#tvScr .tvi.tvoff2 .tv3h,#tvScr .tvi.tvoff2 .tv3a,#tvScr .tvi.tvoff2 .tv3n,#tvScr .tvi.tvoff2 .tvn,#tvScr .tvi.tvoff2 .tkdisc{pointer-events:none!important;cursor:default!important}"
+"#tvScr .tvi.tvoff2 .tkpl,#tvScr .tvi.tvoff2 .tv3f,#tvScr .tvi.tvoff2 .tvf,#tvScr .tvi.tvoff2 .tvfc{display:none!important}"
/* défilement fluide */
+"#tvFeed #tvScr{scroll-snap-type:y mandatory!important;overscroll-behavior-y:contain!important;-webkit-overflow-scrolling:touch!important;scroll-behavior:auto!important;will-change:scroll-position}"
+"#tvFeed #tvScr{overflow-anchor:none!important}#tvFeed #tvScr .tvi video{pointer-events:none!important}"
+"#tvFeed *{-webkit-tap-highlight-color:transparent;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}"
/* libellés de la colonne de droite non coupés */
+"#tvFeed #tvScr .tvr{right:4px!important}#tvFeed #tvScr .tvr button{width:68px!important}#tvFeed #tvScr .tvr button span{font-size:11px!important;white-space:nowrap}";
document.head.appendChild(st);
function isOff(it){return /Officiel/.test(it.textContent||"")||/^t[õo][õo]l[ée]([_ ]officiel)?$/i.test(it.__n||"")}
setInterval(function(){document.querySelectorAll("#tvScr .tvi:not(.tvoff2)").forEach(function(it){if(isOff(it))it.classList.add("tvoff2")})},600);
document.addEventListener("click",function(e){var t=e.target,i=t.closest&&t.closest("#tvScr .tvi.tvoff2");if(!i)return;
if(t.closest(".tka,.tkc,.tkpl,.tv3h,.tv3a,.tv3n,.tv3f,.tvn,.tvf,.tkdisc,[class*=avatar]")){e.stopPropagation();e.preventDefault()}},true);
})();
