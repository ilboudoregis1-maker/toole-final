(function () {
  "use strict";
  if (window.__trep) return; window.__trep = 1;
  var R = null, G = null, ROWS = {}, NAMES = {}, THRESH = 64;
  window.__tRows = ROWS; window.__tNames = NAMES;
  function $(id) { return document.getElementById(id); }
  function myId() { try { return me(); } catch (e) { return ""; } }
  function clip(s, n) { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n) + "\u2026" : s; }
  function prev(r) {
    if (!r) return "";
    if (r.audio) return "\uD83C\uDFA4 Vocal";
    if (String(r.body || "").indexOf("\uD83D\uDCF7img:") === 0) return "\uD83D\uDCF7 Photo";
    return clip(r.body, 90);
  }
  function learn(kind, rows) {
    if (!Array.isArray(rows)) return;
    rows.forEach(function (x) {
      if (!x || !x.id) return;
      if (x.pseudo) NAMES[x.id] = x.pseudo;
      else if (x.body !== undefined) ROWS[kind + ":" + x.id] = { sender: x.sender, body: x.body, audio: x.audio_path, rt: x.reply_to, tx: x.reply_text };
    });
  }
  function wrapApi() {
    var _api = window.api;
    if (typeof _api !== "function" || _api.__trep) return;
    var w = function (path, opt) {
      var p = String(path), get = !opt || !opt.method || opt.method === "GET", kind = "", alt = null;
      if (get && p.indexOf("/rest/v1/group_messages") === 0) kind = "g";
      else if (get && p.indexOf("/rest/v1/messages") === 0) kind = "u";
      var base = "select=id,sender,body,created_at,audio_path";
      if (kind === "g" && p.indexOf(base + "&") !== -1) { alt = p; p = p.replace(base, base + ",reply_to,reply_text"); }
      var pr = _api.call(window, p, opt);
      if (alt) pr = Promise.resolve(pr).catch(function () { return _api.call(window, alt, opt); });
      if (get) Promise.resolve(pr).then(function (r) { if (kind) learn(kind, r); else if (String(path).indexOf("/rest/v1/profiles") === 0) learn("p", r); }, function () { });
      return pr;
    };
    w.__trep = 1; window.api = w;
  }
  function bubbleOf(t) {
    var b = t && t.closest ? t.closest(".m") : null;
    if (!b || !b.parentNode) return null;
    var id = b.parentNode.id;
    if ((id !== "chat" && id !== "gMsgs") || !b.dataset.mid || b.classList.contains("pend")) return null;
    return b;
  }
  function plain(b) {
    var c = b.cloneNode(true);
    ["t", "gn", "trq"].forEach(function (k) { var x; while ((x = c.querySelector("." + k))) x.remove(); });
    return clip(c.textContent, 90);
  }
  function guard() {
    if (!R) return;
    var cur = R.kind === "g" ? (typeof gCur !== "undefined" && gCur ? gCur.id : "") : (typeof peer !== "undefined" && peer ? peer.id : "");
    if (String(cur) !== String(R.chat)) clearReply();
  }
  function clearReply() {
    R = null;
    var b = $("trepBar"); if (b && b.parentNode) b.parentNode.removeChild(b);
  }
  function startReply(b) {
    var g = b.parentNode.id === "gMsgs", kind = g ? "g" : "u", row = ROWS[kind + ":" + b.dataset.mid];
    var chat = g ? (typeof gCur !== "undefined" && gCur ? gCur.id : "") : (typeof peer !== "undefined" && peer ? peer.id : "");
    if (!chat) return;
    var mine = row ? row.sender === myId() : b.classList.contains("me");
    var who = mine ? "Toi" : (g ? ((row && NAMES[row.sender]) || "Membre") : ((typeof peer !== "undefined" && peer && peer.pseudo) || ""));
    clearReply();
    R = { kind: kind, chat: chat, id: b.dataset.mid, text: row ? prev(row) : plain(b), who: who };
    var inp = $(g ? "gTxt" : "txt"), host = inp ? inp.parentNode : null;
    if (!host || !host.parentNode) return;
    var d = document.createElement("div"); d.id = "trepBar"; d.className = "trep-bar";
    var t = document.createElement("div"); t.className = "trep-t";
    var n = document.createElement("b"); n.textContent = "R\u00E9pondre \u00E0 " + who;
    var s = document.createElement("span"); s.textContent = R.text;
    t.appendChild(n); t.appendChild(s);
    var x = document.createElement("button"); x.type = "button"; x.textContent = "\u00D7"; x.onclick = clearReply;
    d.appendChild(t); d.appendChild(x);
    host.parentNode.insertBefore(d, host);
    try { inp.focus(); } catch (e) { }
  }
  function endSwipe() {
    if (!G) return;
    var g = G; G = null;
    if (!g.h) return;
    g.b.style.transition = "transform .18s"; g.b.style.transform = "";
    setTimeout(function () { g.b.style.transition = ""; }, 220);
    if (g.dx >= THRESH) startReply(g.b);
  }
  function onStart(e) {
    var b = e.touches.length === 1 ? bubbleOf(e.target) : null;
    G = b ? { b: b, x: e.touches[0].clientX, y: e.touches[0].clientY, h: false, v: false, dx: 0, hit: false } : null;
  }
  function onMove(e) {
    if (!G || G.v) return;
    var dx = e.touches[0].clientX - G.x, dy = e.touches[0].clientY - G.y;
    if (!G.h) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { G.v = true; return; }
      if (dx > 12 && dx > Math.abs(dy) * 1.5) { G.h = true; G.b.style.transition = "none"; } else return;
    }
    G.dx = Math.max(0, Math.min(dx, 110));
    G.b.style.transform = "translateX(" + Math.round(G.dx * 0.6) + "px)";
    if (G.dx >= THRESH && !G.hit) { G.hit = true; try { if (navigator.vibrate) navigator.vibrate(10); } catch (e2) { } }
    if (G.dx < THRESH) G.hit = false;
  }
  function wrapOutbox() {
    var _oa = window.outboxAdd;
    if (typeof _oa !== "function" || _oa.__trep) return;
    var w = function (it) {
      try {
        if (R && it && it.kind === R.kind && String(it.to) === String(R.chat)) { it.reply_to = R.id; it.reply_text = R.text; clearReply(); }
      } catch (e) { }
      return _oa.apply(this, arguments);
    };
    w.__trep = 1; window.outboxAdd = w;
  }
  function decorate(box, kind) {
    var list = box.querySelectorAll(".m[data-mid]");
    for (var i = 0; i < list.length; i++) {
      var d = list[i];
      if (d.dataset.trq) continue;
      var row = ROWS[kind + ":" + d.dataset.mid];
      if (!row || !row.rt) continue;
      d.dataset.trq = "1";
      var orig = ROWS[kind + ":" + row.rt];
      var who = orig ? (orig.sender === myId() ? "Toi" : (kind === "g" ? (NAMES[orig.sender] || "Membre") : ((typeof peer !== "undefined" && peer && peer.pseudo) || ""))) : "";
      var q = document.createElement("div"); q.className = "trq"; q.dataset.to = row.rt;
      if (who) { var a = document.createElement("b"); a.textContent = who; q.appendChild(a); }
      var s = document.createElement("span"); s.textContent = row.tx || prev(orig) || "Message"; q.appendChild(s);
      q.onclick = function (ev) { ev.stopPropagation(); jump(box, this.dataset.to); };
      var gn = d.querySelector(".gn");
      if (gn) gn.parentNode.insertBefore(q, gn.nextSibling); else d.insertBefore(q, d.firstChild);
    }
  }
  function jump(box, id) {
    var l = box.querySelectorAll(".m[data-mid]");
    for (var i = 0; i < l.length; i++) {
      if (String(l[i].dataset.mid) === String(id)) {
        try { l[i].scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) { }
        l[i].classList.add("trflash"); (function (x) { setTimeout(function () { x.classList.remove("trflash"); }, 1200); })(l[i]);
        return;
      }
    }
  }
  function css() {
    var s = document.createElement("style");
    s.textContent = "#chat,#gMsgs{overflow-x:hidden}#chat .m,#gMsgs .m{touch-action:pan-y}" +
      ".trq{border-left:3px solid #00c2e0;background:rgba(0,0,0,.07);border-radius:8px;padding:4px 8px;margin:0 0 6px;font-size:12px;line-height:1.3;cursor:pointer}" +
      ".m.me .trq{background:rgba(255,255,255,.18);border-left-color:#fff}.trq b{display:block;font-size:11px}" +
      ".trq span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}" +
      ".trep-bar{display:flex;align-items:center;gap:8px;padding:6px 12px;background:#eef6fb;border-top:1px solid #cfe7f1}" +
      ".trep-t{flex:1;min-width:0;border-left:3px solid #00c2e0;padding-left:8px}.trep-t b{display:block;font-size:12px;color:#007a99}" +
      ".trep-t span{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#355}" +
      ".trep-bar button{border:0;background:none;font-size:24px;line-height:1;color:#557;padding:4px 8px}.m.trflash{outline:2px solid #00c2e0}";
    document.head.appendChild(s);
  }
  function init() {
    wrapApi(); wrapOutbox(); css();
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", endSwipe, { passive: true });
    document.addEventListener("touchcancel", endSwipe, { passive: true });
    [["chat", "u"], ["gMsgs", "g"]].forEach(function (p) {
      var e = $(p[0]); if (!e) return;
      new MutationObserver(function () { decorate(e, p[1]); }).observe(e, { childList: true });
      decorate(e, p[1]);
    });
    setInterval(guard, 700);
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
