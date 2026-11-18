(function () {
  "use strict";
  if (window.__tvfix) return; window.__tvfix = 1;
  var B = "html body .m .vbub";
  var css = document.createElement("style");
  css.textContent = [
    B + "{background:transparent!important;box-shadow:none!important;border-radius:0!important}",
    B + " button{background:rgba(255,255,255,.28)!important;color:#fff!important;box-shadow:none!important}",
    "html body .m:not(.me) .vbub button{background:#0a7bd6!important;color:#fff!important}"
  ].join("");
  document.head.appendChild(css);
})();
