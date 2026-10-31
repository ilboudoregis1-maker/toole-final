/* TÕÕLé — statuts déjà vus : relisibles sans connexion jusqu'à leur expiration (24 h max). */
(function () {
  "use strict";
  if (window.__tvu) return; window.__tvu = 1;
  var KEY = "tvu1:", MEDIA = "tvu-media-1", DAY = 864e5, MAXMB = 120, MK = "\u2063TSX1:";

  function uid() { try { return typeof me === "function" ? me() : null; } catch (e) { return null; } }
  function rd() { var u = uid(); if (!u) return null; try { var o = JSON.parse(localStorage.getItem(KEY + u) || "{}"); o.seen = o.seen || {}; o.mine = o.mine || {}; o.media = o.media || {}; return o; } catch (e) { return { seen: {}, mine: {}, media: {} }; } }
  function wr(o) { try { localStorage.setItem(KEY + uid(), JSON.stringify(o)); } catch (e) { } }
  function parts(body) { var i = (body || "").indexOf(MK), d = {}; if (i >= 0) { try { d = JSON.parse(body.slice(i + MK.length)); } catch (e) { } } return { i: i, cap: i >= 0 ? body.slice(0, i) : body, d: d }; }
  function expAt(st) {
    var p = parts(st.body), h = Number(p.d && p.d.h) || 0, t = Date.parse(st.created_at) || 0;
    return t + (h > 0 ? Math.min(h * 36e5, DAY) : DAY);
  }
  function alive(st) { return expAt(st) > Date.now(); }
  function urls(st) { var d = parts(st.body).d || {}; return [d.p, d.v, d.m].filter(function (u) { return typeof u === "string" && /^https?:/.test(u); }); }
  function isNet(e) { return navigator.onLine === false || e instanceof TypeError || /fetch|network|failed|load failed|timeout|internet|connexion/i.test(String(e && e.message)); }
  function offlineNow() { return navigator.onLine === false || (window.__tvuOff && Date.now() - window.__tvuOff < 120000); }

  /* nettoyage : statuts expirés + médias associés */
  function prune(o) {
    var keepU = {};
    ["seen", "mine"].forEach(function (k) { Object.keys(o[k]).forEach(function (id) { if (!alive(o[k][id].st)) delete o[k][id]; else urls(o[k][id].st).forEach(function (u) { keepU[u] = 1; }); }); });
    Object.keys(o.media).forEach(function (u) { if (!keepU[u]) { delete o.media[u]; try { caches.open(MEDIA).then(function (c) { c.delete(u); }); } catch (e) { } } });
    return o;
  }

  /* mémoriser un statut qu'on vient d'ouvrir + ses médias */
  function remember(st, name) {
    var o = rd(); if (!o || !st || st.id == null || !alive(st)) return;
    o.seen[st.id] = { st: { id: st.id, body: st.body, created_at: st.created_at, author: st.author }, name: name || "?", t: Date.now() };
    wr(prune(o)); cacheMedia(st);
  }
  async function cacheMedia(st) {
    try {
      if (!window.caches) return;
      var c = await caches.open(MEDIA), exp = expAt(st);
      for (var u of urls(st)) {
        var o = rd(); if (!o || o.media[u]) continue;
        var r = await fetch(u, { cache: "force-cache" }); if (!r || !r.ok) continue;
        var b = await r.clone().blob(); await c.put(u, r);
        o = rd(); o.media[u] = { s: b.size, exp: exp };
        var tot = 0, ks = Object.keys(o.media).sort(function (a, z) { return o.media[a].exp - o.media[z].exp; });
        ks.forEach(function (k) { tot += o.media[k].s; });
        while (tot > MAXMB * 1048576 && ks.length > 1) { var k = ks.shift(); tot -= o.media[k].s; delete o.media[k]; try { await c.delete(k); } catch (e) { } }
        wr(o);
      }
    } catch (e) { }
  }
  /* hors connexion : remplacer les liens distants par les copies locales */
  async function localise(st) {
    try {
      var us = urls(st); if (!us.length || !window.caches) return st;
      var c = await caches.open(MEDIA), p = parts(st.body), d = Object.assign({}, p.d), n = 0;
      for (var k of ["p", "v", "m"]) {
        if (typeof d[k] !== "string") continue;
        var r = await c.match(d[k]); if (!r) continue;
        d[k] = URL.createObjectURL(await r.blob()); n++;
      }
      if (!n) return st;
      return Object.assign({}, st, { body: p.cap + MK + JSON.stringify(d) });
    } catch (e) { return st; }
  }

  /* api : sans réseau, la liste des statuts vient de la mémoire */
  function wrapApi() {
    var a = window.api; if (typeof a !== "function" || a.__tvu) return false;
    var w = async function (p, opt) {
      var s = String(p), get = !opt || !opt.method || opt.method === "GET";
      var isSt = get && s.indexOf("/rest/v1/statuts?") === 0, isPr = get && s.indexOf("/rest/v1/profiles?select=id,pseudo&id=in.(") === 0;
      if (!isSt && !isPr) return a.apply(this, arguments);
      try {
        var rows = await a.apply(this, arguments);
        if (isSt && Array.isArray(rows)) {
          var o = rd();
          if (o) {
            var m = s.indexOf("author=eq.") > -1;
            if (m) { o.mine = {}; rows.forEach(function (r) { if (alive(r)) o.mine[r.id] = { st: { id: r.id, body: r.body, created_at: r.created_at } }; }); }
            else { var ids = {}; rows.forEach(function (r) { ids[r.id] = r; });
              Object.keys(o.seen).forEach(function (id) { if (ids[id]) o.seen[id].st = { id: ids[id].id, body: ids[id].body, created_at: ids[id].created_at, author: ids[id].author }; else delete o.seen[id]; }); }
            wr(prune(o));
          }
        }
        return rows;
      } catch (e) {
        if (!isNet(e)) throw e;
        var o2 = rd(); if (!o2) throw e;
        var me0 = uid();
        if (isSt) {
          var mineQ = s.indexOf("author=eq.") > -1, src = mineQ ? o2.mine : o2.seen;
          var out = Object.keys(src).map(function (id) { return src[id]; }).filter(function (x) { return alive(x.st) && (mineQ || x.st.author !== me0); })
            .map(function (x) { return x.st; }).sort(function (x, y) { return x.created_at < y.created_at ? 1 : -1; });
          window.__tvuOff = Date.now(); return out;
        }
        var want = (s.match(/in\.\(([^)]*)\)/) || [, ""])[1].split(","), names = [];
        want.forEach(function (id) { Object.keys(o2.seen).forEach(function (k) { var x = o2.seen[k]; if (String(x.st.author) === id && !names.some(function (z) { return z.id === id; })) names.push({ id: id, pseudo: x.name }); }); });
        if (names.length) return names; throw e;
      }
    };
    w.__tvu = 1; window.api = w; return true;
  }

  /* ouverture d'un statut */
  function wrapViewer() {
    var ov = window.openViewer; if (typeof ov !== "function" || ov.__tvu) return false;
    var w = function (st, mine, name) {
      var self = this, args = arguments;
      try { if (!mine) remember(st, name); } catch (e) { }
      if (st && urls(st).length && offlineNow()) {
        return localise(st).then(function (st2) { return ov.call(self, st2, mine, name); });
      }
      return ov.apply(self, args);
    };
    w.__tvu = 1; window.openViewer = w; return true;
  }

  var n = 0;
  (function go() { var a = wrapApi(), b = wrapViewer(); if ((!a || !b) && ++n < 20) setTimeout(go, 500); })();
  setTimeout(function () { var o = rd(); if (o) wr(prune(o)); }, 3000);
})();
