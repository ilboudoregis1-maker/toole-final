/* TÕÕLé - phase de test : message clair quand la limite d'utilisateurs est atteinte (la vraie limite est côté serveur). */
(function () {
  "use strict";
  function hook() {
    var o = window.api; if (typeof o !== "function" || o.__tlimit) return;
    var f = async function (p) {
      try { return await o.apply(this, arguments); }
      catch (e) {
        if (typeof p === "string" && p.indexOf("/auth/v1/signup") > -1 && /Database error saving new user|LIMITE_UTILISATEURS/i.test(String((e && e.message) || e)))
          throw new Error("Phase de test complète : 50 utilisateurs maximum pour le moment. Réessaie plus tard.");
        throw e;
      }
    };
    f.__tlimit = 1; window.api = f;
  }
  if (document.readyState === "complete") hook(); else window.addEventListener("load", hook);
})();
