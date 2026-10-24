/* TÕÕLé — statuts : accueil en cercles + visionneuse propre (chargé en dernier) */
(function () {
  "use strict";
  if (window.__tsp) return; window.__tsp = 1;
  var css = document.createElement("style");
  css.textContent = [
    /* ===== ACCUEIL : cercles parfaits ===== */
    "html body #scrList #v4st{display:flex!important;align-items:flex-start;gap:14px;padding:6px 14px 10px!important;overflow-x:auto}",
    "html body #scrList #v4st .v4s{flex:0 0 auto!important;width:72px!important;display:flex!important;flex-direction:column;align-items:center;text-align:center;font-size:12.5px;font-weight:600;line-height:1.2}",
    "html body #scrList #v4st .v4s>span,html body #scrList #v4st .v4s .v7-n{display:block;max-width:72px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
    "html body #scrList #v4st .v4s .rg{width:64px!important;height:64px!important;min-width:64px;aspect-ratio:1/1;border-radius:50%!important;padding:3px!important;box-sizing:border-box!important;display:flex!important;align-items:center;justify-content:center;position:relative;overflow:visible!important;margin:0 auto 5px!important}",
    "html body #scrList #v4st .v4s .rg i{width:100%!important;height:100%!important;border-radius:50%!important;overflow:hidden!important;display:flex!important;align-items:center;justify-content:center;background-size:cover!important;background-position:center!important;font-style:normal;font-weight:700;box-sizing:border-box}",
    "html body #scrList #v4st .v4s .rg i svg{width:26px;height:26px}",
    "html body #scrList #v4st .v4s .rg .plus{position:absolute;right:-3px;bottom:-3px;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:1;font-size:16px;border:2px solid #fff;box-sizing:border-box}",
    /* écran « Statuts » */
    ".v6-row{gap:14px;padding:8px 14px 14px}",
    ".v6-b{display:flex;flex-direction:column;align-items:center;gap:6px;flex:0 0 auto;width:72px;background:none;border:0;padding:0;font-size:12.5px;font-weight:600}",
    ".v6-c,.sx-av{border-radius:50%!important;aspect-ratio:1/1;overflow:hidden;object-fit:cover}",
    /* ===== VISIONNEUSE ===== */
    "html body #stv{background:#000!important;display:flex!important;align-items:center;justify-content:center;overflow:hidden}",
    "html body #stv>div.sv-stage{height:100%!important;aspect-ratio:9/16;max-width:100vw;position:relative;overflow:hidden}",
    "html body #stv .sv-prog{position:absolute!important;top:calc(env(safe-area-inset-top,0px) + 8px)!important;left:12px!important;right:12px!important;height:3px!important;border-radius:3px;background:rgba(255,255,255,.3)!important;z-index:9!important}",
    "html body #stv .sv-top{position:absolute!important;top:0!important;left:0!important;right:0!important;display:flex!important;align-items:center!important;gap:10px!important;padding:calc(env(safe-area-inset-top,0px) + 18px) 12px 26px!important;background:linear-gradient(rgba(0,0,0,.6),transparent)!important;z-index:8!important;color:#fff!important;box-sizing:border-box}",
    "html body #stv .sv-top .sv-av{flex:0 0 38px;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#00e5ff,#0a7cff);color:#fff;display:flex;align-items:center;justify-content:center;font:700 16px system-ui,sans-serif}",
    "html body #stv .sv-top span{flex:1 1 auto!important;min-width:0!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:600 15px 'Exo 2',system-ui,sans-serif!important;color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.7)}",
    "html body #stv .sv-top button{flex:0 0 auto!important;width:auto!important;min-width:38px;height:38px!important;margin:0!important;padding:0 14px!important;border-radius:19px!important;background:rgba(255,255,255,.2)!important;color:#fff!important;border:0!important;backdrop-filter:blur(6px);font:600 13px system-ui,sans-serif!important;display:flex;align-items:center;justify-content:center;gap:6px}",
    "html body #stv .sv-top button.sv-x{width:38px!important;padding:0!important;font-size:18px!important}",
    "html body #stv .sv-cap{left:16px!important;right:16px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 96px)!important;border-radius:14px!important;background:rgba(0,0,0,.45)!important;text-align:center}",
    "html body #stv .sv-bot{position:absolute!important;left:0!important;right:0!important;bottom:0!important;z-index:7!important;padding:28px 12px calc(env(safe-area-inset-bottom,0px) + 12px)!important;background:linear-gradient(transparent,rgba(0,0,0,.72) 45%)!important;box-sizing:border-box!important;border-radius:0!important;box-shadow:none!important}",
    "html body #stv .sv-bot input{background:rgba(255,255,255,.16)!important;color:#fff!important;border:1px solid rgba(255,255,255,.35)!important}",
    "html body #stv .sv-bot input::placeholder{color:rgba(255,255,255,.75)}",
    /* bouton Télécharger : rond, en haut à côté de ✕ (plus de chevauchement) */
    "html body #stv .v9-dl,html body #stv .v9-dl.v9-bot{position:absolute!important;top:calc(env(safe-area-inset-top,0px) + 18px)!important;bottom:auto!important;right:60px!important;left:auto!important;width:38px!important;height:38px!important;padding:0!important;border-radius:50%!important;justify-content:center!important;gap:0!important;z-index:10!important;background:rgba(255,255,255,.2)!important;border:0!important;box-shadow:none!important;backdrop-filter:blur(6px)}",
    "html body #stv .v9-dl span{display:none!important}"
  ].join("\n");
  document.head.appendChild(css);

  function tag() {
    var w = document.getElementById("stv");
    if (!w || w._svd) return;
    var stage = w.firstElementChild;
    if (!stage) return;
    stage.classList.add("sv-stage");
    var kids = [].slice.call(stage.children), top = null;
    kids.forEach(function (c) {
      var z = c.style.zIndex;
      if (z === "3") c.classList.add("sv-prog");
      else if (z === "2" && c.querySelector("button")) { c.classList.add("sv-top"); top = c; }
      else if (c.style.bottom === "70px") c.classList.add("sv-cap");
    });
    if (!top) return;
    w._svd = 1;
    [].forEach.call(top.querySelectorAll("button"), function (b) {
      if (b.textContent.indexOf("✕") > -1) b.classList.add("sv-x");
    });
    var sp = top.querySelector("span");
    if (sp && !top.querySelector(".sv-av")) {
      var nm = (sp.textContent || "").split("·")[0].trim() || "?";
      var av = document.createElement("div"); av.className = "sv-av"; av.textContent = nm.charAt(0).toUpperCase();
      top.insertBefore(av, top.firstChild);
    }
  }
  function tagBars() {
    var w = document.getElementById("stv");
    if (!w) return;
    [].forEach.call(w.children, function (c) {
      if (c.classList.contains("sv-stage") || c.classList.contains("v9-dl") || c.classList.contains("sv-bot")) return;
      if (c.style.position === "absolute" && (c.querySelector("input") || /Réag|Réaction/i.test(c.textContent)) && c.style.bottom !== "") c.classList.add("sv-bot");
    });
  }
  setInterval(function () { tag(); tagBars(); }, 250);
})();
