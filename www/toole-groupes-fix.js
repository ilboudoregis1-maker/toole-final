/* TÕÕLé — groupes : une modification refusée par le serveur n'est plus affichée comme réussie */
(function () {
  "use strict";
  if (window.__gfx2) return; window.__gfx2 = 1;
  var base = window.api; if (typeof base !== "function") return;
  var RE_G = /^\/rest\/v1\/groups\?id=eq\.[^&]+$/, RE_M = /^\/rest\/v1\/group_members\?group_id=eq\.[^&]+&user_id=eq\.[^&]+$/;
  window.api = function (path, opt) {
    var p = String(path), o = opt || {}, m = String(o.method || "GET").toUpperCase();
    if (m === "PATCH" && (RE_G.test(p) || RE_M.test(p))) {
      var h = Object.assign({}, o.headers || {}, { Prefer: "return=representation" });
      return base.call(this, p, Object.assign({}, o, { headers: h })).then(function (rows) {
        if (Array.isArray(rows) && !rows.length) throw new Error("Modification refusée par le serveur (droits). Lance groupes-admin.sql dans Supabase.");
        return rows;
      });
    }
    return base.apply(this, arguments);
  };
})();
