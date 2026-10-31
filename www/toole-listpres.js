/* TÕÕLé — point vert « en ligne » et « écrit… » dans la liste des discussions */
(function () {
  "use strict";
  if (window.__tlp) return; window.__tlp = 1;
  var lon = {}, joined = {}, typ = {}, MAX = 25;
  function T() { return window.__trt || null; }
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function myId() { var t = T(); return t ? t.mid() : null; }
  function listShown() { var s = document.getElementById("scrList"); return !!s && !s.classList.contains("hide"); }
  function rows() { var rc = document.getElementById("recent"); return rc ? [].slice.call(rc.querySelectorAll(".row")).filter(function (r) { return r.dataset && r.dataset.pid; }) : []; }
  function unknown(r) { var n = r.querySelector(".rn"); return !!n && n.textContent === "Inconnu"; }
  function sock() { var t = T(), w = t && t.ws(); return w && w.readyState === 1 ? t : null; }
  function token() { try { var s = sess(); return (s && s.access_token) || KEY; } catch (e) { return KEY; } }

  function join(k) {
    var t = sock(); if (!t) return;
    var r = t.nr(); joined[k] = 1; lon[k] = {};
    t.tx({ topic: "realtime:online-" + k, event: "phx_join", ref: r, join_ref: r,
      payload: { config: { broadcast: { ack: false, self: false }, presence: { key: "", enabled: true }, postgres_changes: [] }, access_token: token() } });
  }
  function leave(k) {
    var t = sock(); if (t) t.tx({ topic: "realtime:online-" + k, event: "phx_leave", ref: t.nr(), payload: {} });
    delete joined[k]; delete lon[k];
  }

  var oldH = window.__trh;
  window.__trh = function (m) {
    try {
      var t = String(m.topic || ""), p = m.payload || {}, id = myId();
      if (t.indexOf("realtime:online-") === 0) {
        var k = t.slice(16);
        if (m.event === "presence_state") {
          var o = {}; Object.keys(p).forEach(function (x) { o[x] = ((p[x] || {}).metas || []).length; }); lon[k] = o;
        } else if (m.event === "presence_diff") {
          var q = lon[k] || (lon[k] = {});
          ["joins", "leaves"].forEach(function (w, i) {
            var x = p[w] || {};
            Object.keys(x).forEach(function (y) {
              q[y] = (q[y] || 0) + (((x[y] || {}).metas || []).length) * (i ? -1 : 1);
              if (q[y] <= 0) delete q[y];
            });
          });
        } else if (m.event === "phx_close" && k !== id) { delete joined[k]; delete lon[k]; }
      } else if (id && m.event === "broadcast" && p.event === "typing" && t === "realtime:typing-" + id) {
        var d = p.payload || {};
        if (d.s === 1) typ[String(d.from || "")] = Date.now() + 4000; else delete typ[String(d.from || "")];
      }
    } catch (e) { }
    return oldH ? oldH(m) : false;
  };
  var oldR = window.__tro;
  window.__tro = function () { joined = {}; lon = {}; typ = {}; if (oldR) oldR.apply(this, arguments); };

  function paint() {
    var me0 = myId(), now = Date.now(), showOn = ls("toole_online") !== "0", showTyp = ls("toole_typing") !== "0";
    rows().forEach(function (r) {
      var k = r.dataset.pid, known = !unknown(r);
      var online = !!(known && showOn && k && Object.keys(lon[k] || {}).filter(function (x) { return x !== me0; }).length);
      var typing = !!(known && showTyp && typ[k] > now);
      r.classList.toggle("tl-on", online);
      r.classList.toggle("tl-typ", typing);
      var s = r.querySelector(".sub");
      if (s) {
        if (typing) { if (s.textContent !== "écrit…") { r.dataset.tlo = s.textContent; s.textContent = "écrit…"; } }
        else if (s.textContent === "écrit…") s.textContent = r.dataset.tlo || "";
      }
    });
  }

  function tick() {
    try {
      var t = T(); if (!t) return;
      if (!sock()) { joined = {}; lon = {}; paint(); return; }
      var want = {}, cur = t.cur(), me0 = myId();
      if (listShown() && ls("toole_online") !== "0") {
        rows().slice(0, MAX).forEach(function (r) { var k = r.dataset.pid; if (k && k !== me0 && !unknown(r)) want[k] = 1; });
      }
      Object.keys(joined).forEach(function (k) { if (!want[k]) { if (k !== cur) leave(k); else delete joined[k]; } });
      Object.keys(want).forEach(function (k) { if (!joined[k]) join(k); });
      paint();
    } catch (e) { }
  }
  setInterval(tick, 900);

  var css = document.createElement("style");
  css.textContent = [
    "html body #recent .row.tl-on .av{position:relative!important;overflow:visible!important}",
    "html body #recent .row.tl-on .av::after{content:'';position:absolute;right:-1px;bottom:-1px;width:13px;height:13px;border-radius:50%;background:#22c55e;border:2px solid #fff;box-sizing:border-box}",
    "html body #recent .row.tl-typ .sub{color:#0a7cff!important;-webkit-text-fill-color:#0a7cff!important;font-weight:600}"
  ].join("\n");
  document.head.appendChild(css);
})();
