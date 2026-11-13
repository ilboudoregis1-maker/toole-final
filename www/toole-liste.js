/* TÕÕLé — liste des discussions complète
   Avant : la liste ne regardait que les 200 derniers messages, donc les vieilles discussions disparaissaient.
   Maintenant : toutes les personnes avec qui tu as déjà parlé restent dans la liste. */
(function () {
  "use strict";
  if (window.__tliste) return; window.__tliste = 1;
  var PFX = "/rest/v1/messages?select=sender,receiver,body,created_at";
  var COLS = "sender,receiver,body,created_at,read_at,audio_path";
  var BOOT = 3 * 24 * 3600 * 1000;
  function J(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function S(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }

  function homeUid(p) {
    if (typeof p !== "string" || p.indexOf(PFX) !== 0) return null;
    if (p.indexOf("order=created_at.desc") < 0 || p.indexOf("limit=200") < 0) return null;
    var m = /or=\(sender\.eq\.([^,)]+),receiver\.eq\.([^,)]+)\)/.exec(p);
    return m && m[1] === m[2] ? m[1] : null;
  }

  function extend(a, uid, rows) {
    var seen = {}, kk = "tlp_" + uid, xk = "tlx_" + uid;
    rows.forEach(function (m) { seen[m.sender === uid ? m.receiver : m.sender] = 1; });
    var K = J(kk, { ids: [], boot: 0 }), X = J(xk, {}), set = {};
    (K.ids || []).forEach(function (i) { set[i] = 1; });
    Object.keys(seen).forEach(function (i) { set[i] = 1; if (X[i]) delete X[i]; });
    var step = Promise.resolve();
    if (Date.now() - (K.boot || 0) > BOOT) {
      step = Promise.resolve(a("/rest/v1/messages?select=sender,receiver&or=(sender.eq." + uid + ",receiver.eq." + uid + ")&order=created_at.desc&offset=200&limit=3000")).then(function (r) {
        if (!Array.isArray(r)) return;
        r.forEach(function (m) { var o = m.sender === uid ? m.receiver : m.sender; if (o && o !== uid) set[o] = 1; });
        K.boot = Date.now();
      }).catch(function () { });
    }
    return step.then(function () {
      K.ids = Object.keys(set); S(kk, K);
      var need = K.ids.filter(function (i) { return i !== uid && !seen[i] && !(i in X); }).slice(0, 30);
      return Promise.all(need.map(function (i) {
        return Promise.resolve(a("/rest/v1/messages?select=" + COLS + "&or=(and(sender.eq." + uid + ",receiver.eq." + i + "),and(sender.eq." + i + ",receiver.eq." + uid + "))&order=created_at.desc&limit=1")).then(function (r) {
          X[i] = (Array.isArray(r) && r[0]) ? r[0] : 0;
        }).catch(function () { });
      }));
    }).then(function () {
      S(xk, X);
      var extra = [];
      Object.keys(X).forEach(function (i) { if (X[i] && !seen[i]) extra.push(X[i]); });
      extra.sort(function (p, q) { return p.created_at < q.created_at ? 1 : -1; });
      var out = rows.concat(extra); out.__tl = 1;
      return out;
    });
  }

  function withTimeout(a, uid, rows) {
    if (!Array.isArray(rows) || rows.__tl) return rows;
    return new Promise(function (res) {
      var done = false;
      var t = setTimeout(function () { if (!done) { done = true; res(rows); } }, 5000);
      extend(a, uid, rows).then(function (r) { if (!done) { done = true; clearTimeout(t); res(r); } },
        function () { if (!done) { done = true; clearTimeout(t); res(rows); } });
    });
  }

  function install() {
    var a = window.api;
    if (typeof a !== "function" || a.__tl) return;
    var w = function (p) {
      window.__tlhit = 1;
      var r = a.apply(this, arguments), uid = homeUid(p);
      if (!uid) return r;
      return Promise.resolve(r).then(function (rows) { return withTimeout(a, uid, rows); });
    };
    w.__tl = 1; window.api = w;
  }
  install();
  setTimeout(function () { if (!window.__tlhit) install(); }, 4000);
  setTimeout(function () { if (!window.__tlhit) install(); }, 10000);
})();
