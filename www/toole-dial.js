/* TÕÕLé — indicatif pays à la connexion / inscription (Burkina +226 par défaut) */
(function () {
  "use strict";
  if (window.__tdial) return; window.__tdial = 1;
  var KEYD = "toole_dial", DEF = "226", PH_INS = "Numéro (+226 70 12 34 56)";
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function dial() { var d = ls(KEYD); return d && /^\d{1,4}$/.test(d) ? d : DEF; }
  function flag(c) { try { return String.fromCodePoint(127397 + c.charCodeAt(0), 127397 + c.charCodeAt(1)); } catch (e) { return "🌍"; } }
  function pays() {
    var L = (window.VF_PAYS || []).slice();
    if (!L.length) L = [{ c: "BF", n: "Burkina Faso", d: "226" }, { c: "CI", n: "Côte d'Ivoire", d: "225" }, { c: "ML", n: "Mali", d: "223" },
      { c: "SN", n: "Sénégal", d: "221" }, { c: "FR", n: "France", d: "33" }, { c: "US", n: "États-Unis", d: "1" }];
    return L.sort(function (a, b) { return a.c === "BF" ? -1 : b.c === "BF" ? 1 : a.n.localeCompare(b.n, "fr"); });
  }
  function cur() {
    var d = dial(), L = pays(), x = L.filter(function (p) { return p.d === d && p.c === "BF"; })[0] || L.filter(function (p) { return p.d === d; })[0];
    return { c: x ? x.c : "", d: d };
  }
  function label() { var x = cur(); return (x.c ? flag(x.c) + " " : "") + "+" + x.d + " ▾"; }
  function refresh() {
    [].forEach.call(document.querySelectorAll(".tdl-b"), function (b) { b.textContent = label(); });
    var i = document.getElementById("iem"); if (i) i.placeholder = dial() === DEF ? PH_INS : "Numéro (sans l\u2019indicatif)";
  }

  /* ---------- règle de conversion numéro -> identifiant ---------- */
  window.ph2e = function (v) {
    var raw = String(v || "").trim(), intl = /^(\+|00)/.test(raw), d = raw.replace(/[^0-9]/g, "");
    if (/^00/.test(raw)) d = d.replace(/^00/, "");
    if (!intl) {
      var dl = dial();
      if (dl === DEF) { if (d.length === 8) d = DEF + d; }
      else if (!(d.indexOf(dl) === 0 && d.length >= dl.length + 8)) d = dl + d.replace(/^0+/, "");
    }
    if (d.length < 8) throw new Error("Numéro invalide");
    return d + "@phone.tooole.app";
  };

  /* ---------- sélecteur ---------- */
  function open() {
    var ov = document.createElement("div"); ov.id = "tdlOv";
    var box = document.createElement("div"); box.className = "tdl-box";
    var h = document.createElement("div"); h.className = "tdl-h"; h.textContent = "Choisir le pays";
    var q = document.createElement("input"); q.type = "search"; q.placeholder = "Rechercher un pays ou un indicatif"; q.className = "tdl-q";
    var l = document.createElement("div"); l.className = "tdl-l";
    var x = document.createElement("button"); x.type = "button"; x.className = "tdl-x"; x.textContent = "Fermer";
    function close() { ov.remove(); }
    function fill() {
      var t = q.value.trim().toLowerCase().replace(/^\+/, ""); l.innerHTML = "";
      pays().filter(function (p) { return !t || p.n.toLowerCase().indexOf(t) > -1 || p.d.indexOf(t) === 0; }).forEach(function (p) {
        var r = document.createElement("button"); r.type = "button"; r.className = "tdl-r" + (p.d === dial() && (p.c === "BF" || p.d !== DEF) ? " on" : "");
        r.textContent = flag(p.c) + "  " + p.n + "  +" + p.d;
        r.onclick = function () { try { localStorage.setItem(KEYD, p.d); } catch (e) { } refresh(); close(); };
        l.appendChild(r);
      });
    }
    q.oninput = fill; x.onclick = close; ov.onclick = function (e) { if (e.target === ov) close(); };
    box.appendChild(h); box.appendChild(q); box.appendChild(l); box.appendChild(x); ov.appendChild(box);
    document.body.appendChild(ov); fill();
  }
  function wrap(id) {
    var i = document.getElementById(id); if (!i || i.parentNode.classList.contains("tdl-row")) return;
    var row = document.createElement("div"); row.className = "tdl-row";
    var b = document.createElement("button"); b.type = "button"; b.className = "tdl-b"; b.onclick = open;
    i.parentNode.insertBefore(row, i); row.appendChild(b); row.appendChild(i);
  }
  function init() { wrap("em"); wrap("iem"); refresh(); }
  init();
  new MutationObserver(function () { if (!document.querySelector(".tdl-b") || document.querySelectorAll(".tdl-row").length < 2) init(); })
    .observe(document.body, { childList: true, subtree: true });

  var css = document.createElement("style");
  css.textContent = [
    ".tdl-row{display:flex;gap:8px;align-items:center;width:100%}",
    ".tdl-row input{flex:1 1 auto;min-width:0;width:auto!important}",
    ".tdl-b{flex:0 0 auto;height:54px;padding:0 12px;border-radius:16px;border:1.5px solid #e3eaf2;background:#f7f9fc;color:inherit;font-size:15px;font-weight:600;margin:6px 0;white-space:nowrap}",
    "html[data-theme=dark] .tdl-b{background:#1c2a3d;border-color:#2a3b52;color:#e8eef7}",
    "#tdlOv{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}",
    ".tdl-box{width:100%;max-height:80vh;display:flex;flex-direction:column;background:#fff;color:#12202f;border-radius:22px 22px 0 0;padding:16px;box-sizing:border-box}",
    "html[data-theme=dark] .tdl-box{background:#121c2b;color:#e8eef7}",
    ".tdl-h{font-weight:700;font-size:17px;margin-bottom:10px}",
    ".tdl-q{width:100%;height:46px;padding:0 14px;border-radius:14px;border:1.5px solid #e3eaf2;background:#f7f9fc;font-size:16px;box-sizing:border-box;margin-bottom:8px;color:inherit}",
    "html[data-theme=dark] .tdl-q{background:#1c2a3d;border-color:#2a3b52}",
    ".tdl-l{overflow:auto;flex:1}",
    ".tdl-r{display:block;width:100%;text-align:left;padding:13px 10px;border:0;border-bottom:1px solid rgba(128,128,128,.18);background:transparent;color:inherit;font-size:16px}",
    ".tdl-r.on{font-weight:700;color:#0a7cff}",
    ".tdl-x{margin-top:10px;padding:13px;border:0;border-radius:14px;background:rgba(128,128,128,.15);color:inherit;font-size:16px;font-weight:600}"
  ].join("\n");
  document.head.appendChild(css);
})();
