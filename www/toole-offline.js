/* TÕÕLé - correctifs hors connexion + aperçu photo dans la liste */
(function () {
  "use strict";
  if (window.__toff) return; window.__toff = 1;
  var PH = "\uD83D\uDCF7", KEY_ST = "toole_stats";

  /* 1. Bannière « hors connexion » : en bas (au-dessus des onglets), elle ne cache plus le titre */
  var css = document.createElement("style");
  css.textContent = "#offBar{top:auto!important;bottom:calc(env(safe-area-inset-bottom,0px) + 92px)!important;font-size:11px!important;padding:5px 12px!important;max-width:68vw;text-align:center;pointer-events:none;opacity:.92}";
  document.head.appendChild(css);

  /* 2. Liste des discussions : « 📷img:xxxx » devient « 📷 Photo » */
  var RX = /\uD83D\uDCF7img:\S*/g, tm = null;
  function fixList() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n, l = [];
    while ((n = w.nextNode())) { if (n.nodeValue.indexOf(PH + "img:") > -1) l.push(n); }
    l.forEach(function (t) {
      var p = t.parentNode;
      if (!p || (p.closest && p.closest("#chat,#gMsgs"))) return; /* les bulles sont gérées par toole-photo.js */
      t.nodeValue = t.nodeValue.replace(RX, PH + " Photo");
    });
  }
  function later() { clearTimeout(tm); tm = setTimeout(fixList, 120); }

  /* 3. Profil : nombre de groupes + chiffres gardés en mémoire quand il n'y a pas d'Internet */
  var IDS = ["stMsg", "stGrp", "stFr"], lastGrp = 0;
  function el(id) { return document.getElementById(id); }
  function getC() { try { return JSON.parse(localStorage.getItem(KEY_ST) || "{}"); } catch (e) { return {}; } }
  function profilVisible() { var s = el("scrProfil"); return !!(s && !s.classList.contains("hide")); }
  function tick() {
    if (!profilVisible()) return;
    var on = navigator.onLine !== false, c = getC(), ch = false;
    if (on && Date.now() - lastGrp > 15000 && typeof api === "function" && typeof me === "function") {
      lastGrp = Date.now();
      api("/rest/v1/group_members?select=group_id&user_id=eq." + me()).then(function (r) {
        if (Array.isArray(r) && el("stGrp")) el("stGrp").textContent = String(r.length);
      }).catch(function () { });
    }
    IDS.forEach(function (id) {
      var e = el(id); if (!e) return;
      var v = parseInt(e.textContent, 10) || 0;
      if (on) { if (v > 0 && c[id] !== v) { c[id] = v; ch = true; } }
      else if (v === 0 && c[id] > 0) e.textContent = String(c[id]);
    });
    if (ch) { try { localStorage.setItem(KEY_ST, JSON.stringify(c)); } catch (e) { } }
  }

  function init() {
    fixList();
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
    setInterval(tick, 1500);
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
