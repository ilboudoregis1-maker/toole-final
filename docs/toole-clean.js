/* TÕÕLé — finitions avant publication : messages propres, envoi différé fiable, appels « bientôt » */
(function () {
  "use strict";
  if (window.__tclean) return; window.__tclean = 1;
  function lang() { try { var v = localStorage.getItem("toole_lang"); if (v === "en" || v === "fr") return v; } catch (e) { } return /^en/i.test(navigator.language || "") ? "en" : "fr"; }

  /* 1. Messages techniques : jamais affichés à l'utilisateur */
  var QUIET = /^(Présence indisponible|Presence unavailable|Serveur média|Media server|\[TÕÕLé\])/i;
  var RAW = /^(Échec|Erreur|Failed|Error) ?:/i, last = {};
  function wrapToast() {
    var t = window.toast; if (typeof t !== "function" || t.__tc) return;
    var w = function (m) {
      var s = String(m == null ? "" : m);
      if (QUIET.test(s)) { try { console.warn("[TÕÕLé]", s); } catch (e) { } return; }
      if (RAW.test(s)) s = lang() === "en" ? "Something went wrong. Please try again." : "Une erreur est survenue. Réessaie dans un instant.";
      var now = Date.now(); if (last[s] && now - last[s] < 3500) return; last[s] = now;
      return t.apply(this, [s].concat([].slice.call(arguments, 1)));
    };
    w.__tc = 1; window.toast = w;
  }
  wrapToast(); setInterval(wrapToast, 2000);
  window.onerror = function (m, s, l) { try { console.error("[TÕÕLé]", m, s, l); } catch (e) { } return true; };

  /* 2. Hors connexion : les messages en attente partent tout seuls au retour du réseau */
  var flushing = false;
  async function flush() {
    if (flushing || navigator.onLine === false) return;
    if (typeof outboxLoad !== "function" || typeof pushItem !== "function" || typeof outboxRemove !== "function") return;
    flushing = true;
    try {
      var a = outboxLoad().filter(function (x) { var ts = parseInt(String(x.id).slice(1), 10); return !ts || Date.now() - ts > 20000; }), sent = 0;
      for (var i = 0; i < a.length; i++) { try { await pushItem(a[i]); outboxRemove(a[i].id); sent++; } catch (e) { break; } }
      if (sent) {
        try { if (typeof loadMsgs === "function" && typeof peer !== "undefined" && peer) loadMsgs(); } catch (e) { }
        try { if (typeof loadGroupMsgs === "function" && typeof gCur !== "undefined" && gCur) loadGroupMsgs(); } catch (e) { }
      }
    } finally { flushing = false; }
  }
  window.addEventListener("online", function () { setTimeout(flush, 1500); });
  setInterval(flush, 15000); setTimeout(flush, 5000);

  /* 3. Appels : fonction en cours de développement */
  var TX = {
    fr: { t: "Appels bientôt disponibles", b: "Les appels sont en cours de développement. Pour l'instant, ils ne peuvent pas encore être effectués. Tu pourras très bientôt appeler tes contacts.", ok: "Compris" },
    en: { t: "Calls coming soon", b: "Calls are still under development and cannot be made yet. You will soon be able to call your contacts.", ok: "Got it" }
  };
  var css = document.createElement("style");
  css.textContent = [
    "#callBtn,.v4call-go{opacity:.55}",
    "#tcBanner{margin:12px 14px 4px;padding:12px 14px;border-radius:14px;background:rgba(10,124,255,.10);display:flex;flex-direction:column;gap:4px;font-size:14px;line-height:1.35}",
    "#tcBanner b{font-size:15px}",
    "#tcSoon{position:fixed;left:0;right:0;top:0;bottom:0;z-index:100000;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}",
    "#tcSoon div{width:100%;box-sizing:border-box;background:#fff;color:#0b1b3a;border-radius:22px 22px 0 0;padding:24px 22px calc(22px + env(safe-area-inset-bottom,0px));text-align:center}",
    "#tcSoon h3{margin:0 0 8px;font-size:19px}#tcSoon p{margin:0 0 18px;font-size:15px;line-height:1.4;color:#44506b}",
    "#tcSoon button{border:0;border-radius:14px;background:#0a7cff;color:#fff;font-size:16px;font-weight:600;padding:13px 34px}"
  ].join("\n");
  document.head.appendChild(css);
  function sheet() {
    if (document.getElementById("tcSoon")) return;
    var X = TX[lang()], o = document.createElement("div"); o.id = "tcSoon";
    var c = document.createElement("div"), h = document.createElement("h3"), p = document.createElement("p"), b = document.createElement("button");
    h.textContent = "🚧 " + X.t; p.textContent = X.b; b.textContent = X.ok;
    function close() { o.remove(); } b.onclick = close; o.onclick = function (e) { if (e.target === o) close(); };
    c.appendChild(h); c.appendChild(p); c.appendChild(b); o.appendChild(c); document.body.appendChild(o);
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest("#callBtn,.v4call-go");
    if (t) { e.stopImmediatePropagation(); e.preventDefault(); sheet(); }
  }, true);
  function banner() {
    var body = document.querySelector("#scrCalls .body"), v = document.getElementById("v4calls"), old = document.getElementById("tcBanner"), X = TX[lang()];
    if (!body || !v) return;
    if (old) { if (old.dataset.l !== lang()) old.remove(); else return; }
    var d = document.createElement("div"); d.id = "tcBanner"; d.dataset.l = lang();
    var b = document.createElement("b"), s = document.createElement("span");
    b.textContent = "🚧 " + X.t; s.textContent = X.b; d.appendChild(b); d.appendChild(s);
    body.insertBefore(d, v);
  }
  setInterval(banner, 800);
})();
