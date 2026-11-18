/* TÕÕLé — rapide et utilisable même avec peu de connexion
   - une requête qui reste bloquée est coupée au bout de 12 s (25 s si le réseau est lent) puis réessayée
   - les mêmes demandes faites en même temps ne sont envoyées qu'une fois ; pas plus de 6 (3 si lent) à la fois
   - sans connexion ou si le serveur ne répond pas : on affiche les dernières données gardées sur le téléphone
   - les 4 premières discussions sont préparées à l'avance, pour s'ouvrir tout de suite
   - au retour d'Internet (ou de l'app), l'écran se met à jour tout seul */
(function () {
  "use strict";
  if (window.__trn) return; window.__trn = 1;
  var BASE = ""; try { BASE = (typeof URL === "string") ? URL : ""; } catch (e) { }
  var OF = window.fetch;
  if (!BASE || typeof OF !== "function") return;

  function J(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function uid() { try { return JSON.parse(localStorage.getItem("toole_session")).user.id; } catch (e) { return ""; } }
  function slow() {
    var c = navigator.connection; if (!c) return false;
    return !!c.saveData || /^(slow-2g|2g|3g)$/.test(c.effectiveType || "");
  }
  function visible(id) { var e = document.getElementById(id); return !!e && !e.classList.contains("hide"); }

  /* connexion au serveur préparée dès le départ */
  try { var pl = document.createElement("link"); pl.rel = "preconnect"; pl.href = BASE; pl.crossOrigin = ""; document.head.appendChild(pl); } catch (e) { }

  /* ---------- données gardées pour les coupures ---------- */
  var CK = "trn:", IDX = "trn:idx";
  function hash(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); }
  function cget(k) { try { var o = JSON.parse(localStorage.getItem(CK + hash(k)) || "null"); return o && o.k === k ? o : null; } catch (e) { return null; } }
  function cput(k, t) {
    if (t.length > 40000) return;
    setTimeout(function () {
      try {
        var h = CK + hash(k);
        localStorage.setItem(h, JSON.stringify({ k: k, t: Date.now(), b: t }));
        var ix = J(IDX, []).filter(function (x) { return x !== h; }); ix.push(h);
        while (ix.length > 30) localStorage.removeItem(ix.shift());
        localStorage.setItem(IDX, JSON.stringify(ix));
      } catch (e) { }
    }, 0);
  }

  /* ---------- file d'attente : pas trop de demandes en même temps ---------- */
  var ACT = 0, WAIT = [];
  function slot() { return new Promise(function (res) { if (ACT < (slow() ? 3 : 6)) { ACT++; res(); } else WAIT.push(res); }); }
  function free() { ACT--; var n = WAIT.shift(); if (n) { ACT++; n(); } }

  function rawGet(self, input, init) {
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var i2 = Object.assign({}, init || {});
    if (ctrl) i2.signal = ctrl.signal;
    var timer = ctrl ? setTimeout(function () { try { ctrl.abort(); } catch (e) { } }, slow() ? 25000 : 12000) : null;
    return OF.call(self, input, i2).then(function (r) { clearTimeout(timer); return r; },
      function (e) { clearTimeout(timer); throw new TypeError("Failed to fetch"); });
  }

  function attempt(self, input, init, ck, useCache) {
    var max = slow() ? 2 : 1, n = 0;
    function fallback(err, resp) {
      if (useCache) {
        var c = cget(ck);
        if (c) return new Response(c.b, { status: 200, headers: { "Content-Type": "application/json", "x-toole-stale": "1" } });
      }
      if (resp) return resp;
      throw err;
    }
    function go() {
      if (navigator.onLine === false) return Promise.resolve(fallback(new TypeError("Failed to fetch")));
      return rawGet(self, input, init).then(function (r) {
        if ((r.status >= 500 || r.status === 429) && n < max) { n++; return new Promise(function (ok) { setTimeout(ok, 700 * n); }).then(go); }
        if (r.status >= 500) return fallback(null, r);
        if (r.ok && useCache) { r.clone().text().then(function (t) { cput(ck, t); }).catch(function () { }); }
        return r;
      }, function (e) {
        if (n < max && navigator.onLine !== false) { n++; return new Promise(function (ok) { setTimeout(ok, 700 * n); }).then(go); }
        return fallback(e);
      });
    }
    return go();
  }

  var INF = {};
  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var method = String((init && init.method) || (typeof input !== "string" && input && input.method) || "GET").toUpperCase();
    if (method !== "GET" || url.indexOf(BASE + "/rest/v1/") !== 0 || url.indexOf("/rpc/") > -1 || (init && init.signal)) return OF.apply(this, arguments);
    var self = this, ck = uid() + "|" + url;
    var useCache = url.indexOf("/messages?") < 0 && url.indexOf("/group_messages?") < 0;
    if (INF[ck]) return INF[ck].then(function (r) { return r.clone(); });
    var p = slot().then(function () {
      return attempt(self, input, init, ck, useCache).then(function (r) { free(); return r; }, function (e) { free(); throw e; });
    });
    INF[ck] = p;
    var clear = function () { if (INF[ck] === p) delete INF[ck]; };
    p.then(clear, clear);
    return p.then(function (r) { return r.clone(); });
  };

  /* ---------- retour d'Internet / retour dans l'app ---------- */
  function refresh() {
    try {
      if (visible("scrChat")) { if (typeof peer !== "undefined" && peer && typeof loadMsgs === "function") loadMsgs(); }
      else if (visible("scrList") && typeof goList === "function") goList();
    } catch (e) { }
  }
  window.addEventListener("online", function () { setTimeout(refresh, 700); });
  var hid = 0;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) hid = Date.now();
    else if (hid && Date.now() - hid > 20000) { hid = 0; setTimeout(refresh, 300); }
  });

  /* ---------- discussions du haut préparées à l'avance ---------- */
  var PF = { sig: "", t: 0 };
  function prefetch() {
    var c = navigator.connection;
    if (document.hidden || navigator.onLine === false || (c && c.saveData) || !visible("scrList") || typeof window.api !== "function") return;
    var u = uid(); if (!u) return;
    var L = J("home:" + u, []);
    if (!Array.isArray(L) || !L.length) return;
    var ids = L.slice(0, 4).map(function (x) { return x && x.id; }).filter(Boolean);
    var sig = ids.join(",");
    if (sig === PF.sig && Date.now() - PF.t < 600000) return;
    PF.sig = sig; PF.t = Date.now();
    var i = 0;
    (function next() {
      if (i >= ids.length || document.hidden || navigator.onLine === false) return;
      var p = ids[i++];
      var ch = J("tmc:" + u + ":" + p, null), ok = !!(ch && Array.isArray(ch.r) && ch.r.length), age = ok && ch.t ? Date.now() - ch.t : Infinity;
      if (ok && age < 15000) return next();
      if (ok && slow() && age > 300000) return next();
      var q = "/rest/v1/messages?select=*&or=(and(sender.eq." + u + ",receiver.eq." + p + "),and(sender.eq." + p + ",receiver.eq." + u + "))&order=created_at.asc";
      Promise.resolve(window.api(q)).catch(function () { }).then(function () { setTimeout(next, 1200); });
    })();
  }
  setInterval(prefetch, 5000);
})();
