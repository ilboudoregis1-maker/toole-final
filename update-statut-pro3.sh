#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Statuts v3 : champ de réponse AU-DESSUS des emojis, bouton « Réactions » centré
# Usage : bash update-statut-pro3.sh
set -e
cd ~/toole-final || { echo "Dossier ~/toole-final introuvable"; exit 1; }
cat > www/toole-statut-pro.js <<'EOFJS'
/* TÕÕLé — statuts : accueil en cercles + visionneuse propre (chargé en dernier) */
(function () {
  "use strict";
  if (window.__tsp) return; window.__tsp = 1;
  var css = document.createElement("style");
  css.textContent = [
    /* ===== ACCUEIL : cercles parfaits ===== */
    "html body #scrList #v4st #v4stAll,html body #v4stAll{display:none!important}",
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
    "html body #stv .sv-prog{position:absolute!important;top:8px!important;left:12px!important;right:12px!important;height:3px!important;border-radius:3px;background:rgba(255,255,255,.3)!important;z-index:9!important}",
    "html body #stv .sv-top{position:absolute!important;top:0!important;left:0!important;right:0!important;display:flex!important;align-items:center!important;gap:10px!important;padding:14px 12px 26px!important;background:linear-gradient(rgba(0,0,0,.6),transparent)!important;z-index:8!important;color:#fff!important;box-sizing:border-box}",
    "html body #stv .sv-top .sv-av{flex:0 0 38px;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#00e5ff,#0a7cff);color:#fff;display:flex;align-items:center;justify-content:center;font:700 16px system-ui,sans-serif}",
    "html body #stv .sv-top span{flex:1 1 auto!important;min-width:0!important;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left!important;font:600 15px 'Exo 2',system-ui,sans-serif!important;color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.7)}",
    "html body #stv .sv-top button{flex:0 0 auto!important;width:auto!important;min-width:38px;height:38px!important;margin:0!important;padding:0 14px!important;border-radius:19px!important;background:rgba(255,255,255,.2)!important;color:#fff!important;border:0!important;backdrop-filter:blur(6px);font:600 13px system-ui,sans-serif!important;display:flex;align-items:center;justify-content:center;gap:6px}",
    "html body #stv .sv-top button.sv-x{width:38px!important;padding:0!important;font-size:18px!important}",
    "html body #stv .sv-cap{left:16px!important;right:16px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 96px)!important;border-radius:14px!important;background:rgba(0,0,0,.45)!important;text-align:center}",
    "html body #stv .sv-bot{position:absolute!important;left:0!important;right:0!important;bottom:0!important;z-index:7!important;padding:28px 12px calc(env(safe-area-inset-bottom,0px) + 12px)!important;background:linear-gradient(transparent,rgba(0,0,0,.72) 45%)!important;box-sizing:border-box!important;border-radius:0!important;box-shadow:none!important}",
    "html body #stv .sv-bot{display:flex!important;flex-direction:column!important}",
    "html body #stv .sv-barwrap{display:flex;flex-direction:column;gap:12px;width:100%}",
    "html body #stv .sv-line{display:flex;align-items:center;gap:8px;width:100%}",
    "html body #stv .sv-line input{flex:1 1 auto!important;min-width:0!important;width:auto!important;height:44px!important;border-radius:22px!important;padding:0 16px!important;font-size:15px!important}",
    "html body #stv .sv-line button{flex:0 0 44px!important;width:44px!important;height:44px!important}",
    "html body #stv .sv-emos{display:flex;align-items:center;justify-content:space-between;gap:6px;width:100%}",
    "html body #stv .sv-emos button{flex:0 0 auto!important}",
    "html body #stv .sv-bot input{background:rgba(255,255,255,.16)!important;color:#fff!important;border:1px solid rgba(255,255,255,.35)!important}",
    "html body #stv .sv-bot input::placeholder{color:rgba(255,255,255,.75)}",
    /* bouton Télécharger : rond, dans l'en-tête */
    "html body #stv .sv-top .v9-dl,html body #stv .sv-top .v9-dl.v9-bot,html body #stv .sv-top .v9-dl.v9-x{position:static!important;flex:0 0 38px!important;width:38px!important;height:38px!important;min-width:38px;margin:0!important;padding:0!important;border-radius:50%!important;display:flex!important;align-items:center;justify-content:center;gap:0!important;background:rgba(255,255,255,.2)!important;border:0!important;box-shadow:none!important;backdrop-filter:blur(6px)}",
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
  function moveDl() {
    var w = document.getElementById("stv"); if (!w) return;
    var top = w.querySelector(".sv-top"), dl = w.querySelector(".v9-dl");
    if (!top || !dl || dl.parentNode === top) return;
    var x = top.querySelector(".sv-x");
    top.insertBefore(dl, x || null);
  }
  function rebuildBar() {
    var w = document.getElementById("stv"); if (!w || w._rb) return;
    var inp = w.querySelector("input"); if (!inp) return;
    var bar = inp;
    while (bar.parentElement && bar.parentElement !== w && !bar.parentElement.classList.contains("sv-stage")) bar = bar.parentElement;
    if (bar === inp) return;
    var btns = [].slice.call(bar.querySelectorAll("button"));
    if (btns.length < 2) return;
    var pre = [], post = [];
    btns.forEach(function (b) { (inp.compareDocumentPosition(b) & 2 ? pre : post).push(b); });
    var send = post.length ? post.pop() : pre.pop();
    var emos = pre.concat(post);
    w._rb = 1;
    var wrap = document.createElement("div"); wrap.className = "sv-barwrap";
    var line = document.createElement("div"); line.className = "sv-line";
    var row = document.createElement("div"); row.className = "sv-emos";
    line.appendChild(inp); line.appendChild(send);
    emos.forEach(function (b) { row.appendChild(b); });
    wrap.appendChild(line); wrap.appendChild(row);
    [].forEach.call(bar.children, function (c) { c.style.setProperty("display", "none", "important"); });
    bar.appendChild(wrap);
    bar.classList.add("sv-bot");
  }
  function fixReactBtn() {
    var w = document.getElementById("stv"); if (!w) return;
    [].forEach.call(w.querySelectorAll("button"), function (b) {
      if (b._sr || (b.textContent || "").indexOf("R\u00e9actions") < 0 || b.closest(".sv-top")) return;
      b._sr = 1;
      var st = { position: "absolute", left: "50%", right: "auto", width: "auto", "max-width": "90%", transform: "translateX(-50%)", bottom: "24px", "white-space": "nowrap", "z-index": "20", margin: "0" };
      Object.keys(st).forEach(function (k) { b.style.setProperty(k, st[k], "important"); });
    });
  }
  setInterval(function () { tag(); moveDl(); rebuildBar(); fixReactBtn(); }, 250);
})();
EOFJS
grep -q "toole-statut-pro.js" www/index.html || sed -i 's#</body>#<script src="toole-statut-pro.js"></script>\n</body>#' www/index.html
git add -A
git commit -m "Statuts v3 : réponse au-dessus des emojis, bouton Réactions centré"
git push
gh workflow run build.yml && sleep 5 && gh run watch
echo "Quand c'est vert : gh run download -D ~/storage/downloads/tooole-apk"
