(function () {
  var DIAG = false;
  var st = { load: 0, api: "-", rows: "-", render: 0, err: "-" };
  var lastSig = "", box = null, pending = null, pendingPeer = "";

  function curPeer() { try { return (typeof peer !== "undefined" && peer) ? peer : null; } catch (e) { return null; } }
  function dbg() {
    try {
      if (!DIAG) return;
      if (!box) {
        box = document.createElement("div");
        box.style.cssText = "position:fixed;left:6px;top:calc(env(safe-area-inset-top,0px) + 58px);z-index:99999;background:rgba(0,0,0,.78);color:#fff;font:11px/1.35 monospace;padding:5px 8px;border-radius:8px;pointer-events:none;max-width:92vw;white-space:pre-wrap";
        document.body.appendChild(box);
      }
      var sc = document.getElementById("scrChat");
      box.style.display = (sc && !sc.classList.contains("hide")) ? "block" : "none";
      box.textContent = "peer:" + (curPeer() ? "ok" : "VIDE") + " charg:" + st.load + " req:" + st.api + "\nlignes:" + st.rows + " rendu:" + st.render + " err:" + st.err;
    } catch (e) { }
  }
  function has(c) { return !!(c && c.querySelector(".m")); }
  function showErr(m) { try { if (typeof err === "function") err("msgC", m); } catch (e) { } }

  async function run(pr) {
    var id = me(), pid = pr.id, key = "chat:" + id + ":" + pid, c = document.getElementById("chat");
    if (c && c.dataset.peer !== String(pid)) { c.innerHTML = ""; c.dataset.peer = String(pid); lastSig = ""; }
    var cached = null, local = [];
    try { cached = JSON.parse(localStorage.getItem(key) || "null"); } catch (e) { }
    try { if (typeof lsGet === "function") local = lsGet("chatstore:" + id + ":" + pid) || []; } catch (e) { }
    if (!has(c)) {
      var first = local.length ? local : cached;
      if (first) { try { window.renderMsgRows(first); } catch (e) { } }
    }
    if (navigator.onLine === false) {
      try { showOffline(true); } catch (e) { }
      if (!has(c)) showErr("Aucun message enregistré sur ce téléphone");
      return;
    }
    try { showOffline(false); } catch (e) { }
    var rows;
    try {
      rows = await window.api("/rest/v1/messages?select=*&or=(and(sender.eq." + id + ",receiver.eq." + pid + "),and(sender.eq." + pid + ",receiver.eq." + id + "))&order=created_at.asc");
    } catch (e) { if (!has(c)) showErr(e.message); return; }
    var now = curPeer();
    if (!now || now.id !== pid || !Array.isArray(rows)) return;
    var sig = JSON.stringify(rows);
    if (sig !== lastSig || !has(c)) {
      try { window.renderMsgRows(rows); lastSig = sig; } catch (e) { st.err = "rendu: " + String(e.message).slice(0, 60); }
    }
    try { localStorage.setItem(key, JSON.stringify(rows.slice(-300))); } catch (e) { }
    try { if (typeof showDirectPins === "function") showDirectPins(); } catch (e) { }
    try {
      if (localStorage.getItem("toole_readconf") !== "0" && rows.some(function (m) { return m.receiver === id && !m.read_at; })) {
        window.api("/rest/v1/messages?receiver=eq." + id + "&sender=eq." + pid + "&read_at=is.null", {
          method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ read_at: new Date().toISOString() })
        }).catch(function () { });
      }
    } catch (e) { }
  }

  function init() {
    if (window.__tchat) return; window.__tchat = 1;

    var _api = window.api;
    if (typeof _api === "function") window.api = function (path, opt) {
      var p = _api.apply(this, arguments), lab = null;
      try { if (String(path).indexOf("/rest/v1/messages") === 0) lab = (opt && opt.method) || "GET"; } catch (e) { }
      if (lab) {
        st.api = lab + " en cours";
        Promise.resolve(p).then(function (r) { st.api = lab + " ok"; if (lab === "GET" && Array.isArray(r)) st.rows = r.length; },
          function (e) { st.api = lab + " ERREUR"; st.err = String((e && e.message) || e).slice(0, 70); });
      }
      return p;
    };

    var _rr = window.renderMsgRows;
    if (typeof _rr === "function") window.renderMsgRows = function () {
      st.render++;
      try { return _rr.apply(this, arguments); }
      catch (e) { st.err = "rendu: " + String((e && e.message) || e).slice(0, 60); throw e; }
    };

    window.loadMsgs = function () {
      st.load++;
      var pr = curPeer();
      if (!pr) return Promise.resolve();
      if (pending && pendingPeer === pr.id) return pending;
      pendingPeer = pr.id;
      var mine = pending = run(pr).then(function () { if (pending === mine) pending = null; },
        function (e) { st.err = String((e && e.message) || e).slice(0, 70); if (pending === mine) pending = null; });
      return mine;
    };

    window.addEventListener("unhandledrejection", function (e) {
      var r = e && e.reason; st.err = "rejet: " + String((r && r.message) || r).slice(0, 60);
    });
    if (DIAG) setInterval(dbg, 500);
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
