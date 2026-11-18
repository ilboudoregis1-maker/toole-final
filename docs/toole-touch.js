/* TÕÕLé - toucher : son "bulle" façon Messenger (de plus en plus aigu quand on enchaîne) et suppression du grand cercle bleu. */
(function () {
  "use strict";
  if (window.__ttouch) return; window.__ttouch = 1;

  /* 1) plus de grand cercle qui déborde au toucher */
  var st = document.createElement("style");
  st.textContent = ".rp{display:none!important}";
  (document.head || document.documentElement).appendChild(st);

  /* 2) nouveau son */
  var ctx = null, combo = 0, last = 0;
  function on() { try { return localStorage.getItem("toole_ui_sound") !== "0"; } catch (e) { return true; } }
  function pop() {
    if (!on()) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      var now = Date.now(); combo = (now - last < 700) ? Math.min(combo + 1, 5) : 0; last = now;
      var k = Math.pow(2, (combo * 2) / 12) * (0.97 + Math.random() * 0.06);   /* +2 demi-tons par touche enchaînée */
      var t = ctx.currentTime, out = ctx.createGain();
      out.gain.value = 0.9; out.connect(ctx.destination);
      /* corps : petite bulle qui monte vite */
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(420 * k, t); o.frequency.exponentialRampToValueAtTime(980 * k, t + 0.07);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g); g.connect(out); o.start(t); o.stop(t + 0.18);
      /* éclat : petite note brillante juste après (le "waouh") */
      var o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = "triangle"; o2.frequency.setValueAtTime(1760 * k, t + 0.03);
      g2.gain.setValueAtTime(0.0001, t + 0.03); g2.gain.exponentialRampToValueAtTime(0.06, t + 0.04); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o2.connect(g2); g2.connect(out); o2.start(t + 0.03); o2.stop(t + 0.14);
    } catch (e) { }
    try { if (navigator.vibrate && localStorage.getItem("toole_ui_haptic") !== "0") navigator.vibrate(6); } catch (e) { }
  }
  /* remplace l'ancien son une fois la page chargée (l'ancien écouteur appelle uiClick() à chaque touche) */
  function hook() { window.uiClick = pop; }
  if (document.readyState === "complete") hook(); else window.addEventListener("load", hook);
})();
