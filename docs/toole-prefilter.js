/* TÕÕLé — discussions supprimées : retirées de la liste mémorisée AVANT le premier affichage (plus de clignotement). */
(function () {
  "use strict";
  if (window.__tpre) return; window.__tpre = 1;
  function J(k, d) { try { return JSON.parse(localStorage.getItem(k) || d); } catch (e) { return JSON.parse(d); } }
  function uid() { try { return JSON.parse(localStorage.getItem("toole_session")).user.id; } catch (e) { return null; } }
  function dead(u) { var o = J("tdc_" + u, "{}"); return o && typeof o === "object" ? Object.keys(o) : []; }
  function clean(list, ids) {
    if (!Array.isArray(list) || !ids.length) return list;
    return list.filter(function (x) { return !(x && x.id != null && ids.indexOf(String(x.id)) > -1); });
  }

  var raw = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    try {
      if (this === localStorage && typeof k === "string" && k.indexOf("home:") === 0) {
        var u = uid();
        if (u && k === "home:" + u) {
          var ids = dead(u);
          if (ids.length) { var l = JSON.parse(v); var c = clean(l, ids); if (c !== l && c.length !== l.length) v = JSON.stringify(c); }
        }
      }
    } catch (e) { }
    return raw.call(this, k, v);
  };

  /* nettoyage immédiat de la liste déjà mémorisée */
  try {
    var u0 = uid();
    if (u0) {
      var ids0 = dead(u0), key = "home:" + u0, l0 = J(key, "[]");
      if (ids0.length && Array.isArray(l0)) { var c0 = clean(l0, ids0); if (c0.length !== l0.length) localStorage.setItem(key, JSON.stringify(c0)); }
    }
  } catch (e) { }
})();
