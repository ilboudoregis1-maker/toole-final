(function () {
  "use strict";
  if (window.__tsfix) return; window.__tsfix = 1;
  var E = "html body #tsEd";
  var css = document.createElement("style");
  css.textContent = [
    E + "{background:linear-gradient(180deg,#fff,#e6faff)!important;overscroll-behavior:contain;padding-bottom:env(safe-area-inset-bottom,0px)}",
    E + ">div:not(.tsp){background:none!important;box-shadow:none!important;border-radius:0!important}",
    E + ">div.tsp{background:#f1fcff!important;border:1px solid rgba(0,168,200,.3)!important;border-radius:16px!important;box-shadow:none!important}",
    E + ">div:first-child:not(.tsp){position:sticky;top:0;z-index:5;background:rgba(255,255,255,.94)!important;backdrop-filter:blur(8px);box-shadow:0 2px 14px rgba(0,168,200,.15)!important}",
    E + ">#tsS{height:min(58vh,calc((100vw - 28px)*16/9))!important;margin:10px auto!important;border-radius:22px!important;background:linear-gradient(160deg,#00e5ff,#e6faff)!important;border:1px solid rgba(0,229,255,.6)!important;box-shadow:0 8px 28px rgba(0,168,200,.3)!important}",
    E + " #tsH{flex-direction:column;gap:8px;margin:12px;border:2px dashed rgba(0,151,167,.55);border-radius:16px;font-size:15px!important;font-weight:700;color:#007a8c!important}",
    E + " #tsH::before{content:'+';font-size:46px;line-height:1;font-weight:300;color:#00a8c8}",
    E + " #tsDur{display:flex!important;flex-wrap:wrap!important;gap:8px!important;font-size:0!important;margin:4px 0 10px!important}",
    E + " #tsDur::before{content:'Durée du statut';flex:0 0 100%;font:700 13px 'Exo 2',sans-serif;color:#007a8c}",
    E + " #tsDur button:first-of-type{margin-left:-8px!important}",
    E + " #tsDur button{flex:1 1 0!important;width:auto!important;min-width:0!important;padding:9px 4px!important;border-radius:999px!important;font-size:13px!important;font-weight:700}",
    E + " #tsC{background:var(--tsbg,linear-gradient(160deg,#00e5ff,#00a8c8))!important;border-radius:24px!important;box-shadow:0 10px 30px rgba(0,168,200,.35)!important;margin:8px 14px!important}",
    E + " #tsW{color:var(--tstc,#fff)!important;line-height:1.25;caret-color:currentColor}",
    E + " #tsD{padding:14px 12px 8px!important}",
    E + " #tsP{padding-top:0!important}"
  ].join("");
  document.head.appendChild(css);
  function tick() {
    var ed = document.getElementById("tsEd"); if (!ed) return;
    var c = ed.querySelector("#tsC"), w = ed.querySelector("#tsW");
    if (c && w) {
      var bg = c.style.background; if (bg) c.style.setProperty("--tsbg", bg);
      var tc = w.style.color; if (tc) w.style.setProperty("--tstc", tc);
      var n = w.value.length, fs = n < 60 ? 28 : n < 140 ? 22 : 18;
      if (w.__fs !== fs) { w.__fs = fs; w.style.setProperty("font-size", fs + "px", "important"); }
    }
    var s = ed.querySelector("#tsS");
    if (s && !s.__t) {
      s.__t = 1;
      s.addEventListener("click", function () {
        var h = document.getElementById("tsH"), b = document.getElementById("tsBv");
        if (h && b && h.style.display !== "none") b.click();
      });
    }
  }
  setInterval(tick, 250);
})();
