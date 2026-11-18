/* TÕÕLé - fluidité : bulle affichée tout de suite, plus d'animation qui rejoue, texte plus fin, toucher plus vif */
(function () {
  "use strict";
  if (window.__tfl) return; window.__tfl = 1;
  var C = "html:root:root body ";
  var css = [
    C + "*{-webkit-tap-highlight-color:transparent}",
    C + "button,a,input,textarea,label,.row,.m,[onclick],[role=button]{touch-action:manipulation}",
    C + "button:active,[role=button]:active,.row:active{opacity:.78;transition:opacity .05s}",
    /* les bulles ne rejouent plus leur animation à chaque rafraîchissement */
    C + "#scrChat .m,html:root:root body #scrGroup .m{animation:none!important;font-size:14.5px!important;line-height:1.35!important;padding:6px 11px 5px!important}",
    C + "#scrChat .m .t,html:root:root body #scrGroup .m .t{font-size:10.5px!important}",
    C + "#scrChat #txt,html:root:root body #scrGroup #gTxt,html:root:root body #scrChat .bar .tsta{font-size:15px!important}",
    C + "#scrChat .chead .cn{font-size:16px!important}",
    C + "#chat,#gMsgs{overscroll-behavior:contain;-webkit-overflow-scrolling:touch}",
    /* le flou en arrière-plan ralentit les téléphones : retiré dans les discussions */
    C + "#scrChat *,html:root:root body #scrGroup *{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}"
  ].join("\n");
  function addCss() {
    var o = document.getElementById("tflCss"); if (o) o.remove();
    var st = document.createElement("style"); st.id = "tflCss"; st.textContent = css; document.head.appendChild(st);
  }
  addCss(); setTimeout(addCss, 1500); setTimeout(addCss, 5000);

  function $(i) { return document.getElementById(i); }
  /* bulle « envoi… » affichée à l'instant, sans attendre le réseau */
  function quick(it) {
    if (!it || it.audio_path || !it.body) return;
    var box, ok = false;
    try {
      if (it.kind === "u") { box = $("chat"); ok = typeof peer !== "undefined" && peer && peer.id === it.to; }
      else { box = $("gMsgs"); ok = typeof gCur !== "undefined" && gCur && gCur.id === it.to; }
    } catch (e) { }
    if (!ok || !box) return;
    var d = document.createElement("div"); d.className = "m me pend"; d.dataset.mid = it.id;
    d.appendChild(document.createTextNode(it.body));
    var t = document.createElement("div"); t.className = "t";
    t.textContent = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) + " · envoi…";
    d.appendChild(t); box.appendChild(d);
    try { box.scrollTop = box.scrollHeight; } catch (e) { }
  }
  function hook() {
    var oa = window.outboxAdd;
    if (typeof oa === "function" && !oa.__tfl) {
      var w = function (it) { var r = oa.apply(this, arguments); try { quick(it); } catch (e) { } return r; };
      w.__tfl = 1; window.outboxAdd = w;
    }
    var pb = window.pendBubbles;
    if (typeof pb === "function" && !pb.__tfl) {
      var w2 = function (kind, to, box) {
        try { if (box) [].forEach.call(box.querySelectorAll(".m.pend"), function (n) { n.remove(); }); } catch (e) { }
        return pb.apply(this, arguments);
      };
      w2.__tfl = 1; window.pendBubbles = w2;
    }
  }
  hook(); setInterval(hook, 1500);
})();
