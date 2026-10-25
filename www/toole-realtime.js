(function () {
  "use strict";
  var TOPIC = "realtime:toole-inbox";
  var ws = null, uid = null, ref = 0, joinRef = "", hb = 0, tries = 0, retryAt = 0;
  var lastMsg = 0, sentTok = "", joined = false, connecting = false, lastToast = 0, T = {};
  function base() { return (typeof URL === "string" && /^https?:/.test(URL)) ? URL : "https://jbjeqxubpqqypysfsubd.supabase.co"; }
  function nextRef() { return String(++ref); }
  function send(o) { try { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); } catch (e) { } }
  function session() { try { return typeof sess === "function" ? sess() : null; } catch (e) { return null; } }
  function myId() { try { return typeof me === "function" ? me() : null; } catch (e) { return null; } }
  function expSoon(tok) {
    try {
      var p = JSON.parse(atob(tok.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return !p.exp || p.exp * 1000 - Date.now() < 90000;
    } catch (e) { return false; }
  }
  function ensureFresh() {
    var s = session();
    if (!s || !s.access_token) return Promise.resolve(null);
    if (!expSoon(s.access_token) || typeof api !== "function") return Promise.resolve(s);
    return Promise.resolve().then(function () { return api("/rest/v1/profiles?select=id&limit=1"); })
      .catch(function () { }).then(session);
  }
  function later(k, fn, ms) { clearTimeout(T[k]); T[k] = setTimeout(fn, ms); }
  function shown(id) { var e = document.getElementById(id); return !!e && !e.classList.contains("hide"); }
  function chatOpenWith(id) {
    try {
      if (!shown("scrChat")) return false;
      var p = typeof peer !== "undefined" ? peer : null;
      if (!p) return false;
      var pid = typeof p === "object" ? p.id : p;
      return !pid || pid === id;
    } catch (e) { return false; }
  }
  function refreshChat() { try { if (typeof loadMsgs === "function") loadMsgs(); } catch (e) { } }
  function refreshList() {
    try {
      if (!shown("scrList")) return;
      var c = document.querySelectorAll("#scrList .chip");
      if (c[1] && c[1].classList.contains("on")) { if (typeof renderUnread === "function") renderUnread(); return; }
      if (c[2] && c[2].classList.contains("on")) return;
      if (typeof goList === "function") goList();
    } catch (e) { }
  }
  function notice() {
    var n = Date.now();
    if (n - lastToast < 4000) return;
    lastToast = n;
    try { if (typeof toast === "function") toast("Nouveau message"); } catch (e) { }
  }
  function catchUp() {
    later("chat", function () { if (shown("scrChat")) refreshChat(); }, 200);
    later("list", refreshList, 400);
  }
  function handle(d) {
    var r = d.record || {};
    if (d.type === "INSERT") {
      if (chatOpenWith(r.sender)) later("chat", refreshChat, 150);
      else if (!shown("scrList")) notice();
      later("list", refreshList, 300);
    } else if (d.type === "UPDATE") {
      if (chatOpenWith(r.receiver)) later("chat", refreshChat, 300);
    }
  }
  function retry() { retryAt = Date.now() + Math.min(1000 * Math.pow(2, tries++), 20000); }
  function kill(sock, noRetry) {
    clearInterval(hb);
    if (sock) {
      sock.onopen = sock.onmessage = sock.onclose = sock.onerror = null;
      try { sock.close(); } catch (e) { }
    }
    if (ws === sock) ws = null;
    joined = false;
    if (!noRetry) retry();
  }
  function beat() {
    if (!ws) return;
    if (Date.now() - lastMsg > 45000) { kill(ws); return; }
    send({ topic: "phoenix", event: "heartbeat", payload: {}, ref: nextRef() });
    var s = session();
    if (joined && s && s.access_token && s.access_token !== sentTok) {
      sentTok = s.access_token;
      send({ topic: TOPIC, event: "access_token", payload: { access_token: sentTok }, ref: nextRef() });
    }
  }
  function onMsg(ev) {
    lastMsg = Date.now();
    var m; try { m = JSON.parse(ev.data); } catch (e) { return; }
    if (m.event === "phx_reply" && m.topic === TOPIC && m.ref === joinRef) {
      if (m.payload && m.payload.status === "ok") { joined = true; tries = 0; catchUp(); }
      else kill(ws);
      return;
    }
    if (m.topic === TOPIC && (m.event === "phx_error" || m.event === "phx_close")) { kill(ws); return; }
    if (m.event === "system" && m.payload && m.payload.status === "error") {
      try { console.warn("[TÕÕLé] temps réel :", m.payload.message); } catch (e) { }
      kill(ws); return;
    }
    if (m.event === "postgres_changes" && m.payload && m.payload.data) handle(m.payload.data);
  }
  function connect() {
    if (ws || connecting) return;
    var id = myId();
    if (!id || typeof KEY !== "string") return;
    connecting = true;
    ensureFresh().then(function (s) {
      connecting = false;
      if (ws || !s || !s.access_token || myId() !== id) return;
      var sock;
      try {
        sock = new WebSocket(base().replace(/^http/, "ws") + "/realtime/v1/websocket?apikey=" + encodeURIComponent(KEY) + "&vsn=1.0.0");
      } catch (e) { retry(); return; }
      ws = sock; uid = id; joined = false;
      sock.onopen = function () {
        lastMsg = Date.now(); sentTok = s.access_token; joinRef = nextRef();
        send({
          topic: TOPIC, event: "phx_join", ref: joinRef, join_ref: joinRef,
          payload: {
            config: {
              broadcast: { ack: false, self: false }, presence: { key: "" },
              postgres_changes: [
                { event: "INSERT", schema: "public", table: "messages", filter: "receiver=eq." + id },
                { event: "UPDATE", schema: "public", table: "messages", filter: "sender=eq." + id }
              ]
            },
            access_token: s.access_token
          }
        });
        clearInterval(hb); hb = setInterval(beat, 25000);
      };
      sock.onmessage = onMsg;
      sock.onclose = function () { if (ws === sock) kill(sock); };
      sock.onerror = function () { if (ws === sock) kill(sock); };
    }, function () { connecting = false; retry(); });
  }
  function tick() {
    var id = myId();
    if (ws && uid && id !== uid) { kill(ws, true); tries = 0; retryAt = 0; }
    if (!ws && id && Date.now() >= retryAt) connect();
  }
  function wake() {
    retryAt = 0;
    if (ws && Date.now() - lastMsg > 35000) kill(ws, true);
    if (document.visibilityState !== "hidden") { tick(); catchUp(); }
  }
  function start() {
    if (window.__trin) return; window.__trin = 1;
    setInterval(tick, 1000); tick();
    window.addEventListener("online", wake);
    document.addEventListener("visibilitychange", wake);
  }
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);
})();
