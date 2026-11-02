/* TÕÕLé - une discussion ne s'ouvre jamais avec un identifiant vide ("null")
   (cause de l'erreur « invalid input syntax for type uuid: "null" ») */
(function () {
  "use strict";
  if (window.__tpf) return; window.__tpf = 1;
  function bad(x) { return x === null || x === undefined || x === "" || x === "null" || x === "undefined"; }
  function wrap() {
    var oc = window.openChat;
    if (typeof oc === "function" && !oc.__pf) {
      var w = function (id) {
        if (bad(id)) {
          try { toast("Discussion introuvable"); } catch (e) { }
          try { if (typeof goList === "function") goList(); } catch (e) { }
          return Promise.resolve();
        }
        return oc.apply(this, arguments);
      };
      w.__pf = 1; window.openChat = w;
    }
    var lm = window.loadMsgs;
    if (typeof lm === "function" && !lm.__pf) {
      var w2 = function () {
        try {
          if (typeof peer !== "undefined" && peer && bad(peer.id)) {
            var e = document.getElementById("msgC"); if (e) e.textContent = "";
            return Promise.resolve();
          }
        } catch (x) { }
        return lm.apply(this, arguments);
      };
      w2.__pf = 1; window.loadMsgs = w2;
    }
  }
  wrap(); setInterval(wrap, 700);
})();
