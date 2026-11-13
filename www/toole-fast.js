/* TÕÕLé — ouverture rapide des discussions
   - on n'affiche d'abord que les 60 derniers messages (au lieu de toute la conversation) :
     le dernier message apparaît tout de suite, même après un clic sur une notification
   - en remontant en haut de la discussion, 60 messages plus anciens s'ajoutent, sans sauter */
(function () {
  "use strict";
  if (window.__tfast) return; window.__tfast = 1;
  var LIM = 60, STEP = 60, cur = LIM, key = "", ALL = null, busy = false;
  function $(i) { return document.getElementById(i); }

  function wrap() {
    var f = window.renderMsgRows;
    if (typeof f !== "function" || f.__tf) return !!(f && f.__tf);
    var w = function (rows) {
      var c = $("chat"), args = Array.prototype.slice.call(arguments);
      try {
        if (c && Array.isArray(rows) && typeof peer !== "undefined" && peer) {
          if (!c.dataset.init || key !== String(peer.id)) { key = String(peer.id); cur = LIM; }
          ALL = rows;
          c.dataset.tfmore = rows.length > cur ? "1" : "";
          if (rows.length > cur) args[0] = rows.slice(-cur);
        }
      } catch (e) { }
      return f.apply(this, args);
    };
    w.__tf = 1; window.renderMsgRows = w;
    return true;
  }

  function more() {
    var c = $("chat");
    if (busy || !c || c.dataset.tfmore !== "1" || !ALL || c.scrollTop > 80) return;
    busy = true;
    var h = c.scrollHeight, t = c.scrollTop;
    cur += STEP;
    try {
      c.dataset.tsig = "";
      window.renderMsgRows(ALL);
      c.scrollTop = c.scrollHeight - h + t;
    } catch (e) { }
    setTimeout(function () { busy = false; }, 250);
  }

  function bind() {
    var c = $("chat");
    if (!c || c.__tfb) return !!(c && c.__tfb);
    c.__tfb = 1;
    c.addEventListener("scroll", more, { passive: true });
    return true;
  }

  var n = 0;
  (function go() {
    var a = wrap(), b = bind();
    if ((!a || !b) && ++n < 40) setTimeout(go, 500);
  })();
})();
