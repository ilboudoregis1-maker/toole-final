/* TÕÕLé — anti-rechargement : ne reconstruit une conversation que si son contenu a vraiment changé. */
(function () {
  "use strict";
  if (window.__tstab) return; window.__tstab = 1;

  function pend(kind, to) {
    try {
      if (typeof window.pendBubbles !== "function") return "";
      var t = document.createElement("div"); window.pendBubbles(kind, to, t); return t.innerHTML;
    } catch (e) { return ""; }
  }
  function sig(rows) {
    return rows.map(function (m) {
      return [m.id, m.read_at ? 1 : 0, (m.body || "").length, m.audio_path || "", m.deleted_at || "", m.edited_at || ""].join(":");
    }).join("|");
  }

  /* Conversation privée */
  function wrapRender() {
    var f = window.renderMsgRows;
    if (typeof f !== "function" || f.__tstab) return false;
    var w = function (rows) {
      var c = document.getElementById("chat"), s = null;
      try {
        if (c && Array.isArray(rows) && typeof peer !== "undefined" && peer)
          s = peer.id + "#" + sig(rows) + "#" + pend("u", peer.id);
      } catch (e) { s = null; }
      if (s !== null && c.children.length && c.dataset.tsig === s) return;  /* rien de neuf : on ne touche à rien */
      var r = f.apply(this, arguments);
      if (s !== null) c.dataset.tsig = s;
      return r;
    };
    w.__tstab = 1; window.renderMsgRows = w; return true;
  }

  /* Groupe : on vérifie d'abord (requête légère) si quelque chose a changé */
  function wrapGroup() {
    var f = window.loadGroupMsgs;
    if (typeof f !== "function" || f.__tstab || typeof window.api !== "function") return false;
    var w = async function () {
      var box = document.getElementById("gMsgs"), s = null;
      try {
        if (box && typeof gCur !== "undefined" && gCur && box.children.length) {
          var rows = await window.api("/rest/v1/group_messages?select=id,sender,body,created_at,audio_path&group_id=eq." + gCur.id + "&order=created_at.asc");
          if (Array.isArray(rows)) {
            s = gCur.id + "#" + sig(rows) + "#" + pend("g", gCur.id);
            if (box.dataset.tsig === s) return;
          }
        }
      } catch (e) { s = null; }
      var r = await f.apply(this, arguments);
      try { if (s !== null && box) box.dataset.tsig = s; else if (box) delete box.dataset.tsig; } catch (e) { }
      return r;
    };
    w.__tstab = 1; window.loadGroupMsgs = w; return true;
  }

  var n = 0;
  (function go() { var a = wrapRender(), b = wrapGroup(); if ((!a || !b) && ++n < 20) setTimeout(go, 500); })();
})();
