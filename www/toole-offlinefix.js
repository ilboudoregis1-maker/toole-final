/* TÕÕLé - statuts visibles hors connexion
   - la liste des statuts (et les pseudos) est gardée sur le téléphone
   - la photo / vidéo / musique d'un statut est enregistrée dès qu'on l'a ouvert une fois
   - les « vues » faites hors connexion sont envoyées au retour d'Internet
   Les statuts de plus de 24 h ne sont plus affichés (même règle que le serveur). */
(function () {
  "use strict";
  if (window.__tsoff) return; window.__tsoff = 1;

  var M = "\u2063TSX1:", DAY = 864e5, KEEP = 7 * DAY, MAXM = 40, MAXB = 40 * 1048576;
  var LK = "tso:list:", PK = "tso:prof", QK = "tso:vq";

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
    } catch (e) { }
  }
  function jget(k, d) { try { return JSON.parse(ls(k) || "null") || d; } catch (e) { return d; } }
  function online() { return navigator.onLine !== false; }
  function T(s) { try { toast(s); } catch (e) { } }

  /* ---------- 1. liste des statuts + pseudos ---------- */
  function norm(s) { return s.replace(/&created_at=gt\.[^&]*/, ""); }
  function fresh(rows) {
    var lim = Date.now() - DAY;
    return rows.filter(function (r) { return r && Date.parse(r.created_at) > lim; })
      .map(function (r) { return Object.assign({}, r); });
  }
  function idsOf(s) {
    var m = /[?&]id=in\.\(([^)]*)\)/.exec(s);
    return m ? m[1].split(",") : [];
  }
  function isSt(s) { return /^\/rest\/v1\/statuts\?/.test(s); }
  function isPr(s) { return /^\/rest\/v1\/profiles\?select=id,pseudo&id=in\.\(/.test(s); }

  function fromCache(s) {
    if (isSt(s)) {
      var c = jget(LK + norm(s), null);
      return c && Array.isArray(c.r) ? fresh(c.r) : null;
    }
    if (isPr(s)) {
      var map = jget(PK, {}), out = [], ids = idsOf(s);
      ids.forEach(function (id) { if (map[id]) out.push({ id: id, pseudo: map[id] }); });
      return out;
    }
    return null;
  }
  function store(s, rows) {
    try {
      if (isSt(s)) {
        ls(LK + norm(s), JSON.stringify({ t: Date.now(), r: rows.slice(0, 200) }));
      } else if (isPr(s)) {
        var map = jget(PK, {});
        rows.forEach(function (r) { if (r && r.id) map[r.id] = r.pseudo || "?"; });
        ls(PK, JSON.stringify(map));
      }
    } catch (e) { }
  }

  /* ---------- 2. vues faites hors connexion : file d'attente ---------- */
  function queueView(opt) {
    var q = jget(QK, []);
    try {
      var b = JSON.parse(opt.body);
      if (!b || !b.statut_id) return;
      if (!q.some(function (x) { return x.statut_id === b.statut_id && x.viewer === b.viewer; })) q.push(b);
      ls(QK, JSON.stringify(q.slice(-100)));
    } catch (e) { }
  }
  var flushing = false;
  async function flush(a) {
    if (flushing || !online()) return;
    var q = jget(QK, []); if (!q.length) return;
    flushing = true;
    try {
      var left = [];
      for (var i = 0; i < q.length; i++) {
        try {
          await a("/rest/v1/statut_vues", {
            method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
            body: JSON.stringify(q[i])
          });
        } catch (e) { left.push(q[i]); }
      }
      ls(QK, left.length ? JSON.stringify(left) : null);
    } finally { flushing = false; }
  }

  /* ---------- 3. enveloppe de api() ---------- */
  var wrapped = null;
  function wrapApi() {
    var a = window.api;
    if (typeof a !== "function" || a.__so) return;
    var w = async function (path, opt) {
      var s = String(path), get = !opt || !opt.method || opt.method === "GET";
      if (get && (isSt(s) || isPr(s))) {
        if (!online()) { var c0 = fromCache(s); if (c0) return c0; }
        try {
          var r = await a.apply(this, arguments);
          if (Array.isArray(r)) store(s, r);
          return r;
        } catch (e) {
          var c = fromCache(s); if (c) return c;
          throw e;
        }
      }
      if (opt && opt.method === "POST" && s === "/rest/v1/statut_vues") {
        if (!online()) { queueView(opt); return {}; }
        try { return await a.apply(this, arguments); }
        catch (e) { if (e instanceof TypeError) { queueView(opt); return {}; } throw e; }
      }
      return a.apply(this, arguments);
    };
    w.__so = 1; wrapped = w; window.api = w;
  }
  wrapApi(); setInterval(wrapApi, 700);
  window.addEventListener("online", function () { setTimeout(function () { flush(window.api); }, 1500); });
  setTimeout(function () { flush(window.api); }, 4000);

  /* ---------- 4. médias de statut gardés sur le téléphone (IndexedDB) ---------- */
  function dbo() {
    return new Promise(function (ok, ko) {
      var r = indexedDB.open("toole_stmedia", 1);
      r.onupgradeneeded = function () { r.result.createObjectStore("m"); };
      r.onsuccess = function () { ok(r.result); };
      r.onerror = function () { ko(r.error); };
    });
  }
  function mget(k) {
    return dbo().then(function (db) {
      return new Promise(function (ok) {
        var q = db.transaction("m").objectStore("m").get(k);
        q.onsuccess = function () { ok(q.result || null); };
        q.onerror = function () { ok(null); };
      });
    }).catch(function () { return null; });
  }
  function mput(k, b) {
    return dbo().then(function (db) {
      return new Promise(function (ok) {
        var tx = db.transaction("m", "readwrite");
        tx.objectStore("m").put({ b: b, t: Date.now() }, k);
        tx.oncomplete = function () { ok(); };
        tx.onerror = function () { ok(); };
      });
    }).catch(function () { });
  }
  function mtrim() {
    dbo().then(function (db) {
      var tx = db.transaction("m", "readwrite"), st = tx.objectStore("m"), all = [];
      st.openCursor().onsuccess = function (e) {
        var c = e.target.result;
        if (c) { all.push({ k: c.key, t: (c.value && c.value.t) || 0 }); c.continue(); return; }
        all.sort(function (x, y) { return y.t - x.t; });
        all.forEach(function (x, i) { if (i >= MAXM || Date.now() - x.t > KEEP) st.delete(x.k); });
      };
    }).catch(function () { });
  }
  async function download(u) {
    var ac = new AbortController(), tm = setTimeout(function () { ac.abort(); }, 60000);
    try {
      var r = await fetch(u, { signal: ac.signal });
      if (!r.ok) return null;
      var b = await r.blob();
      return b && b.size && b.size <= MAXB ? b : null;
    } catch (e) { return null; } finally { clearTimeout(tm); }
  }
  function cacheLater(u) {
    download(u).then(function (b) { if (b) { mput(u, b).then(mtrim); } });
  }

  /* réécrit les liens du statut vers la copie locale quand elle existe */
  async function prep(st) {
    var body = (st && st.body) || "", i = body.indexOf(M);
    if (i < 0) return st;
    var d; try { d = JSON.parse(body.slice(i + M.length)); } catch (e) { return st; }
    var keys = ["p", "v", "m"], on = online(), changed = false, missing = false;
    for (var k = 0; k < keys.length; k++) {
      var u = d[keys[k]];
      if (!u || typeof u !== "string" || u.indexOf("http") !== 0) continue;
      var rec = await mget(u);
      if (rec && rec.b) { d[keys[k]] = window.URL.createObjectURL(rec.b); changed = true; mput(u, rec.b); }
      else if (on) cacheLater(u);          /* 1re ouverture : lecture normale + enregistrement en arrière-plan */
      else if (keys[k] !== "m") missing = true;
    }
    if (missing) return null;
    if (!changed) return st;
    return Object.assign({}, st, { body: body.slice(0, i) + M + JSON.stringify(d) });
  }

  function hook() {
    var ov = window.openViewer;
    if (typeof ov !== "function" || ov.__so) return;
    var w = async function (st, mine, name) {
      var s2 = st;
      try { s2 = await prep(st); } catch (e) { s2 = st; }
      if (s2 === null) { T("Statut pas encore enregistré : ouvre-le une fois avec Internet"); return; }
      return ov.call(this, s2, mine, name);
    };
    w.__so = 1; window.openViewer = w;
  }
  hook(); setInterval(hook, 600);
})();
