/* TÕÕLé — liens légaux identiques en FR/EN + champs de connexion traduits et non tronqués */
(function () {
  "use strict";
  if (window.__tlnk) return; window.__tlnk = 1;
  var T = /terms of use|conditions d/i, P = /privacy policy|politique de confidentialit/i;
  function lang() { try { return localStorage.getItem("toole_lang") === "en" ? "en" : "fr"; } catch (e) { return "fr"; } }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a");
    if (!a || a.id === "polLink") return;
    var t = (a.textContent || "").trim(), k = T.test(t) ? "terms" : P.test(t) ? "privacy" : null;
    if (!k) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (typeof window.tooleLegal === "function") window.tooleLegal(k);
  }, true);
  var PW_FR = "Mot de passe (6 caractères min)", PW_FR2 = "Mot de passe (6 car. min)", PW_EN = "Password (6 characters min)";
  function ph() {
    var en = lang() === "en", num = en ? "Phone number" : "Numéro";
    var em = document.getElementById("em"), iem = document.getElementById("iem"), pw = document.getElementById("pw");
    if (em && em.placeholder !== num) em.placeholder = num;
    if (iem && iem.placeholder !== num) iem.placeholder = num;
    if (pw) {
      if (!en && pw.placeholder === PW_FR) pw.placeholder = PW_FR2;
      else if (en && pw.placeholder === PW_FR2) pw.placeholder = PW_EN;
    }
  }
  ph(); setInterval(ph, 700);
  var css = document.createElement("style");
  css.textContent = "html[data-theme=dark] .sh p{color:#e8eef7!important}";
  document.head.appendChild(css);
})();
