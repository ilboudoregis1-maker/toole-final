/* TÕÕLé — vidéos et publications : démarrage rapide + lecture hors connexion */
(function () {
  "use strict";
  if (window.__tvc) return; window.__tvc = 1;
  var prev = window.fetch.bind(window);
  var CV = "toole-vid-v1", CI = "toole-pimg-v1", CA = "toole-feed-v1";
  var MAXV = 30, MAXI = 250, MAXB = 250 * 1048576;
  function sess() { try { return JSON.parse(localStorage.getItem("toole_session")); } catch (e) { return null; } }
  function uid() { var s = sess(); return (s && s.user && s.user.id) || ""; }
  function C(n) { try { return typeof caches !== "undefined" ? caches.open(n) : Promise.resolve(null); } catch (e) { return Promise.resolve(null); } }
  function parse(u) {
    var i = u.indexOf("/functions/v1/tg?"); if (i < 0) return null;
    var p = null, t = "image";
    u.slice(i + 17).split("&").forEach(function (x) {
      var k = x.split("="); if (k[0] === "p") { try { p = decodeURIComponent(k[1] || ""); } catch (e) { } } if (k[0] === "t") t = k[1];
    });
    return p ? { p: p, t: t } : null;
  }
  function wanted(m) { return !!m && (m.t === "video" || (m.t === "image" && m.p.indexOf("/dc_") > -1)); }
  function ckey(m) { return "https://tvc.local/" + m.t + "/" + encodeURIComponent(m.p); }
  function hasRange(h) {
    try { if (!h) return false; if (typeof h.has === "function") return h.has("range") || h.has("Range"); return !!(h.Range || h.range); } catch (e) { return false; }
  }
  function idx() { try { return JSON.parse(localStorage.getItem("tvc:idx") || "[]") || []; } catch (e) { return []; } }
  function saveIdx(a) { try { localStorage.setItem("tvc:idx", JSON.stringify(a)); } catch (e) { } }
  function touch(k, s, v) {
    var a = idx().filter(function (x) { return x.k !== k; }); a.push({ k: k, s: s, v: v });
    saveIdx(a);
  }
  async function trim() {
    var a = idx();
    function vids() { return a.filter(function (x) { return x.v; }); }
    function imgs() { return a.filter(function (x) { return !x.v; }); }
    function bytes() { return a.reduce(function (n, x) { return n + (x.s || 0); }, 0); }
    async function drop(x) {
      a = a.filter(function (y) { return y !== x; });
      var c = await C(x.v ? CV : CI); if (c) await c.delete(x.k);
    }
    while (vids().length > MAXV || (bytes() > MAXB && vids().length > 1)) await drop(vids()[0]);
    while (imgs().length > MAXI) await drop(imgs()[0]);
    saveIdx(a);
  }
  var act = 0, qu = [];
  function pump() {
    while (act < 2 && qu.length) {
      var j = qu.pop(); act++;
      (function (j) {
        function fin() { act--; pump(); }
        j.run().then(function (b) { j.ok(b); fin(); }, function (e) { j.ko(e); fin(); });
      })(j);
    }
  }
  function queued(fn) { return new Promise(function (ok, ko) { qu.push({ run: fn, ok: ok, ko: ko }); pump(); }); }
  function dl(url) {
    return prev(url).then(function (r) { if (!r.ok) throw new Error("tg " + r.status); return r.blob(); });
  }
  var inflight = {};
  function tgBlob(url, m) {
    var k = ckey(m), isV = m.t === "video";
    if (isV) { try { localStorage.setItem("tvc:used", "1"); } catch (e) { } }
    if (inflight[k]) return inflight[k];
    var pr = (async function () {
      var c = await C(isV ? CV : CI), b = null;
      if (c) { try { var h = await c.match(k); if (h) { b = await h.blob(); touch(k, b.size, isV); } } catch (e) { } }
      if (!b) {
        if (navigator.onLine === false) throw new Error("hors ligne");
        b = await (isV ? queued(function () { return dl(url); }) : dl(url));
        if (c) {
          try {
            await c.put(k, new Response(b, { headers: { "content-type": b.type || "application/octet-stream" } }));
            touch(k, b.size, isV); trim();
          } catch (e) { }
        }
      }
      if (isV && !/^video\//.test(b.type || "")) b = b.slice(0, b.size, /webm$/.test(m.p) ? "video/webm" : "video/mp4");
      return b;
    })();
    inflight[k] = pr;
    pr.then(function () { delete inflight[k]; }, function () { delete inflight[k]; });
    return pr;
  }
  var FEED = /\/rest\/v1\/(videos|posts|profiles|video_likes|video_comments|post_reactions|post_comments|follows)\?/;
  function isFeed(u) { return FEED.test(u) && u.indexOf("created_at=gt.") < 0; }
  async function feedFetch(input, init, u) {
    var key = "https://tvc.local/f/" + encodeURIComponent(uid() + "|" + u.replace(/^https?:\/\/[^\/]+/, ""));
    var c = await C(CA), hit = null;
    if (c) { try { hit = await c.match(key); } catch (e) { } }
    if (navigator.onLine === false) return hit ? hit.clone() : prev(input, init);
    var net = prev(input, init).then(function (r) {
      if (r.ok && c) {
        r.clone().text().then(function (t) {
          if (t.length > 600000) return;
          return c.put(key, new Response(t, { headers: { "content-type": "application/json" } })).then(function () {
            return c.keys().then(function (k) { while (k.length > 150) c.delete(k.shift()); });
          });
        }).catch(function () { });
      }
      return r;
    });
    if (!hit) return net;
    var tm = new Promise(function (ok) { setTimeout(function () { ok(hit.clone()); }, 800); });
    return Promise.race([net.catch(function () { return hit.clone(); }), tm]);
  }
  window.fetch = function (input, init) {
    var u = typeof input === "string" ? input : (input && input.url) || "";
    var method = String((init && init.method) || (input && input.method) || "GET").toUpperCase();
    if (method === "GET" && u) {
      var m = parse(u);
      if (wanted(m) && !hasRange(init && init.headers)) {
        return tgBlob(u, m).then(function (b) { return new Response(b, { status: 200, headers: { "Content-Type": b.type || "application/octet-stream" } }); });
      }
      if (isFeed(u)) return feedFetch(input, init, u);
    }
    return prev(input, init);
  };
  var D = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, "src");
  if (D && D.set) {
    Object.defineProperty(HTMLMediaElement.prototype, "src", {
      configurable: true, enumerable: D.enumerable,
      get: function () { var o = this.__tvc; return o && this.hasAttribute("src") ? o : D.get.call(this); },
      set: function (v) {
        var el = this, m = typeof v === "string" ? parse(v) : null;
        if (!m || m.t !== "video") { el.__tvc = null; return D.set.call(el, v); }
        el.__tvc = v;
        tgBlob(v, m).then(function (b) {
          if (el.__tvc !== v) return;
          var u = URL.createObjectURL(b), old = el.__tvu; el.__tvu = u;
          D.set.call(el, u);
          if (old) setTimeout(function () { URL.revokeObjectURL(old); }, 3000);
        }, function () { if (el.__tvc === v) D.set.call(el, v); });
      }
    });
  }
  function warm() {
    try {
      if (navigator.onLine === false || !uid() || localStorage.getItem("tvc:used") !== "1" || typeof window.api !== "function") return;
      var wifi = navigator.connection && navigator.connection.type === "wifi";
      window.api("/rest/v1/videos?select=id,author,caption,path,created_at&order=created_at.desc&limit=30").then(function (r) {
        if (!Array.isArray(r) || typeof window.tgUrl !== "function") return;
        r.slice(0, wifi ? 3 : 1).forEach(function (v) {
          if (!v || !v.path) return; var u = window.tgUrl(v.path, "video"), m = parse(u);
          if (m) tgBlob(u, m).catch(function () { });
        });
      }).catch(function () { });
    } catch (e) { }
  }
  setTimeout(warm, 7000);
})();
