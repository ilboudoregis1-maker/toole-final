/* TÕÕLé — coordination contacts inconnus : noms/photos lisibles + répondre = accepter */
(function () {
  "use strict";
  if (window.__tcoord) return; window.__tcoord = 1;
  var A = window.api; if (typeof A !== "function") return;
  var off = 0, acc = {};
  function me0() { try { return me(); } catch (e) { return null; } }
  function idsOf(p) {
    var m = p.match(/[?&]id=in\.\(([^)]*)\)/);
    if (m) return m[1].split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    m = p.match(/[?&]id=eq\.([0-9a-fA-F-]{36})/);
    return m ? [m[1]] : [];
  }
  function sel(p) { var m = p.match(/[?&]select=([^&]*)/); return m ? decodeURIComponent(m[1]).split(",") : []; }

  window.api = async function (path, opt) {
    var isGet = !opt || !opt.method || String(opt.method).toUpperCase() === "GET";
    if (!isGet && typeof path === "string" && path.indexOf("/rest/v1/messages") === 0 && String(opt.method).toUpperCase() === "POST") {
      try {
        var b = JSON.parse(opt.body), rc = Array.isArray(b) ? b[0] && b[0].receiver : b.receiver, my = me0();
        if (rc && my && !acc[rc]) { acc[rc] = 1;
          A("/rest/v1/chat_accepts", { method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=minimal" }, body: JSON.stringify({ owner: my, peer: rc }) }).catch(function () { });
        }
      } catch (e) { }
    }
    var r = await A.apply(this, arguments);
    try {
      if (isGet && Date.now() > off && typeof path === "string" && path.indexOf("/rest/v1/profiles?") === 0 && Array.isArray(r)) {
        var want = idsOf(path), hasId = sel(path).indexOf("id") > -1 || !sel(path).length, miss;
        if (want.length) {
          if (hasId) { var have = {}; r.forEach(function (x) { if (x && x.id) have[x.id] = 1; }); miss = want.filter(function (i) { return !have[i]; }); }
          else miss = (want.length === 1 && !r.length) ? want : [];
          if (miss.length) {
            try {
              var ex = await A("/rest/v1/rpc/peer_profiles", { method: "POST", body: JSON.stringify({ ids: miss }) });
              if (Array.isArray(ex)) ex.forEach(function (x) { r.push(x); });
            } catch (e) { off = Date.now() + 60000; }
          }
        }
      }
    } catch (e) { }
    return r;
  };

  var oc = window.openChat;
  if (typeof oc === "function") window.openChat = function (id, pseudo) {
    var r = oc.apply(this, arguments);
    if (!pseudo || pseudo === "Inconnu" || pseudo === "Nouveau contact" || pseudo === "?") {
      window.api("/rest/v1/profiles?select=id,pseudo,avatar_v&id=eq." + id).then(function (p) {
        var n = p && p[0] && p[0].pseudo; if (!n) return;
        try { if (peer && peer.id === id) peer.pseudo = n; } catch (e) { }
        var h = document.getElementById("peerName"); if (h) h.textContent = n;
        var a = document.getElementById("peerAv"); if (a && !a.classList.contains("has-photo")) a.textContent = n.slice(0, 2).toUpperCase();
      }).catch(function () { });
    }
    return r;
  };
})();
