/* TÕÕLé – limites des comptes certifiés : tout vient du serveur (profiles.certified).
   Certifié : vidéo 60 s / 50 Mo, légende 1000, statut texte 1000.  Normal : 30 s / 18 Mo, 300, 280. */
(function () {
  "use strict";
  if (window.__tcl) return; window.__tcl = 1;
  var D = document;
  function sess() { try { return JSON.parse(localStorage.getItem("toole_session")); } catch (e) { return null; } }
  function uid() { var s = sess(); return (s && s.user && s.user.id) || ""; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { } }
  function A() { return window.api || (typeof api === "function" ? api : null); }

  var MINE = ls("toole_cm_" + uid()) === "1";   /* dernier état connu : évite de retomber à 30 s / 18 Mo si le réseau échoue */

  function refresh() {
    var u = uid(), f = A(); if (!u || !f) return;
    var p; try { p = f("/rest/v1/profiles?select=certified&id=eq." + u); } catch (e) { return; }
    if (!p || !p.then) return;
    p.then(function (r) {
      /* on ne change l'état que si le serveur répond clairement (jamais sur une erreur) */
      if (Array.isArray(r) && r[0] && typeof r[0].certified === "boolean") {
        MINE = r[0].certified; ls("toole_cm_" + u, MINE ? "1" : "0");
      }
    }).catch(function () { });
  }

  /* remplace les limites de toole-vid-design.js (même noms, utilisés par toole-videos.js) */
  window.__tvIsCert = function () { return MINE; };
  window.__tvMax = function () { return MINE ? 50 : 18; };   /* Mo */
  window.__tvDur = function () { return MINE ? 60 : 30; };   /* secondes */

  /* statut texte : 1000 caractères pour les certifiés (le champ #tsW est en dur à 280) */
  function tick() {
    var c = D.getElementById("tsT");   /* légende d'un statut vidéo/photo : 200 en dur */
    if (c && MINE && c.maxLength !== 1000) c.maxLength = 1000;
    var w = D.getElementById("tsW"); if (!w) return;
    var max = MINE ? 1000 : 280, p = D.getElementById("tsP");
    if (w.maxLength !== max) w.maxLength = max;
    function upd() { if (p) p.textContent = w.value.length + "/" + (MINE ? 1000 : 280); }
    if (!w.__tcl) { w.__tcl = 1; w.addEventListener("input", upd); }
    upd();
  }
  setInterval(tick, 500);

  setTimeout(refresh, 800);
  setInterval(refresh, 60000);
  D.addEventListener("visibilitychange", function () { if (!D.hidden) refresh(); });
  window.addEventListener("online", refresh);
})();
