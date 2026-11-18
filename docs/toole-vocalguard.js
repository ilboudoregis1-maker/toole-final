/* TÕÕLé - bouton vocal plus fiable (discussion + groupe)
   - un 2e appui pendant le démarrage / l'arrêt est ignoré (avant : erreur ou vocal perdu)
   - un vocal de moins de 0,8 s est annulé proprement
   - un double appui sur « envoyer » n'envoie plus le vocal deux fois
   - si on quitte la discussion pendant l'enregistrement, il est annulé (micro libéré) */
(function () {
  "use strict";
  if (window.__tvg) return; window.__tvg = 1;

  function T(s) { try { toast(s); } catch (e) { } }
  function fin(p, f) {
    return Promise.resolve(p).then(function (v) { f(); return v; }, function (e) { f(); throw e; });
  }

  var rec = false;                      /* démarrage ou arrêt en cours */
  function guardRec(name, pre) {
    var o = window[name];
    if (typeof o !== "function" || o.__g) return;
    var w = function () {
      if (rec) return;
      if (pre) { try { pre(); } catch (e) { } }
      rec = true;
      var r;
      try { r = o.apply(this, arguments); } catch (e) { rec = false; throw e; }
      return fin(r, function () { rec = false; });
    };
    w.__g = 1; window[name] = w;
  }

  function guardSend(name) {
    var o = window[name], busy = false;
    if (typeof o !== "function" || o.__g) return;
    var w = function () {
      if (busy) return;
      busy = true;
      var r;
      try { r = o.apply(this, arguments); } catch (e) { busy = false; throw e; }
      return fin(r, function () { setTimeout(function () { busy = false; }, 500); });
    };
    w.__g = 1; window[name] = w;
  }

  function wrap() {
    guardRec("vStart");
    guardRec("vStop", function () {
      if (window.vS === "rec" && Date.now() - (window.vT0 || 0) < 800) {
        window.vDiscard = true;
        T("Vocal trop court : appuie, parle, puis arrête");
      }
    });
    guardSend("vSendPrev");
    guardSend("vSendGroupAudio");
  }
  wrap(); setInterval(wrap, 800);

  /* quitter la discussion pendant l'enregistrement : on annule */
  function vis(id) { var e = document.getElementById(id); return !!(e && !e.classList.contains("hide")); }
  setInterval(function () {
    try {
      if (window.vS !== "rec" || rec) return;
      if (!vis("scrChat") && !vis("scrGroup")) {
        if (typeof window.vCancel === "function") window.vCancel();
        T("Vocal annulé");
      }
    } catch (e) { }
  }, 1000);
})();
