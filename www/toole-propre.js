/* TÕÕLé — mode hors connexion propre */
(function () {
  "use strict";
  if (window.__tprop) return; window.__tprop = 1;
  var LOCK = "🔒 Message chiffré";
  function off() { return navigator.onLine === false; }
  function uid() {
    try { var v = me(); if (v) return v; } catch (e) { }
    try { return JSON.parse(localStorage.getItem("toole_session")).user.id; } catch (e) { return null; }
  }
  function ck(id, p) { return "chat:" + id + ":" + p; }
  var busy = 0, last = 0;
  async function sync() {
    if (busy || off() || typeof window.api !== "function") return;
    var id = uid(); if (!id || Date.now() - last < 60000) return;
    busy = 1;
    try {
      var rows = await window.api("/rest/v1/messages?select=*&or=(sender.eq." + id + ",receiver.eq." + id + ")&order=created_at.desc&limit=600");
      if (!Array.isArray(rows)) return;
      var by = {};
      rows.forEach(function (m) { var p = m.sender === id ? m.receiver : m.sender; (by[p] = by[p] || []).push(m); });
      Object.keys(by).forEach(function (p) {
        var old = []; try { old = JSON.parse(localStorage.getItem(ck(id, p)) || "[]") || []; } catch (e) { }
        var seen = {}, all = [];
        by[p].concat(old).forEach(function (m) {
          var k = m.id || (m.created_at + "|" + m.sender);
          if (!seen[k]) { seen[k] = 1; all.push(m); }
        });
        all.sort(function (a, b) { return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0; });
        try { localStorage.setItem(ck(id, p), JSON.stringify(all.slice(-300))); } catch (e) { }
      });
      last = Date.now();
    } catch (e) { } finally { busy = 0; }
  }
  setTimeout(sync, 4000); setInterval(sync, 90000);
  addEventListener("online", function () { last = 0; setTimeout(sync, 2000); });
  function fixChat() {
    if (!off()) return;
    var scr = document.getElementById("scrChat"), c = document.getElementById("chat");
    if (!scr || !c || scr.classList.contains("hide")) return;
    [].forEach.call(scr.querySelectorAll("div,p,span"), function (n) {
      if (!n.children.length && /^Chargement/.test((n.textContent || "").trim())) n.remove();
    });
    var has = !!c.querySelector(".m"), em = document.getElementById("tpEmpty");
    if (has) { if (em) em.remove(); return; }
    var id = uid(), pid = c.dataset.peer, cached = null;
    try { cached = JSON.parse(localStorage.getItem(ck(id, pid)) || "null"); } catch (e) { }
    if (cached && cached.length) { try { window.renderMsgRows(cached); } catch (e) { } return; }
    if (!em) {
      em = document.createElement("div"); em.id = "tpEmpty"; em.className = "sx-s";
      em.style.cssText = "text-align:center;padding:28px 18px;color:#667";
      em.textContent = "Aucun message enregistré sur ce téléphone pour cette discussion";
      c.appendChild(em);
    }
  }
  setInterval(fixChat, 700);
  addEventListener("offline", function () { setTimeout(fixChat, 200); });
  async function sweep() {
    var rc = document.getElementById("recent"); if (!rc) return;
    var w = document.createTreeWalker(rc, NodeFilter.SHOW_TEXT, null), nodes = [], n;
    while ((n = w.nextNode())) if (/(E1|G1)\.\S/.test(n.nodeValue)) nodes.push(n);
    for (var i = 0; i < nodes.length; i++) {
      var v = nodes[i].nodeValue, m = /(E1|G1)\.\S+/.exec(v); if (!m) continue;
      var out = null;
      try { if (typeof window.__e2eDec === "function") out = await window.__e2eDec(m[0]); } catch (e) { }
      nodes[i].nodeValue = v.replace(m[0], out ? String(out).slice(0, 80) : LOCK);
    }
  }
  setInterval(sweep, 1000);
})();
