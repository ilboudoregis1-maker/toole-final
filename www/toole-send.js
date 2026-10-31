/* TÕÕLé - envoi "façon Messenger" : textes et vocaux d'abord enregistrés sur le
   téléphone, affichés tout de suite, puis envoyés tout seuls dès que le moindre
   accès Internet revient (même très lent). Complète la file "toole_outbox" de index.html. */
(function () {
  "use strict";
  if (window.__tsend) return; window.__tsend = 1;

  var busy = false, inflight = {}, tries = {}, nextAt = {}, lastErr = {}, tm = null;
  var FAIL_AFTER = 6;

  function items() { try { return outboxLoad(); } catch (e) { return []; } }
  function toast2(m) { try { toast(m); } catch (e) { } }
  function tsOf(it) { var n = parseInt(String(it.id || "").slice(1), 10); return n > 1e12 ? n : Date.now(); }
  function timeout(p, ms) {
    return new Promise(function (res, rej) {
      var t = setTimeout(function () { rej(new Error("Délai dépassé")); }, ms);
      p.then(function (v) { clearTimeout(t); res(v); }, function (e) { clearTimeout(t); rej(e); });
    });
  }
  function freshToken() {
    var s; try { s = sess(); } catch (e) { return Promise.resolve(""); }
    var soon = true;
    try {
      var p = JSON.parse(atob(s.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      soon = !p.exp || p.exp * 1000 - Date.now() < 60000;
    } catch (e) { }
    var pre = soon ? Promise.resolve().then(function () { return api("/rest/v1/profiles?select=id&limit=1"); }).catch(function () { }) : Promise.resolve();
    return pre.then(function () { try { return sess().access_token; } catch (e) { return ""; } });
  }

  /* ---------- envoi réel d'un élément (texte ou vocal) ---------- */
  function sendOne(it) {
    if (inflight[it.id]) return inflight[it.id];
    var p = (async function () {
      var extra = {}; if (it.reply_to) { extra.reply_to = it.reply_to; extra.reply_text = it.reply_text || ""; }
      if (it.audio_path) {
        var blob = await vLoad(it.audio_path);
        if (!blob) throw new Error("Vocal introuvable sur le téléphone");
        var token = await freshToken();
        var ctrl = window.AbortController ? new AbortController() : null;
        var t = setTimeout(function () { try { ctrl && ctrl.abort(); } catch (e) { } }, 45000);
        try {
          var r = await fetch(URL + "/storage/v1/object/voice/" + it.audio_path, {
            method: "POST",
            headers: { apikey: KEY, Authorization: "Bearer " + token, "Content-Type": "audio/mp4", "x-upsert": "true" },
            body: blob, signal: ctrl ? ctrl.signal : undefined
          });
          if (!r.ok) throw new Error("Envoi du vocal " + r.status);
        } finally { clearTimeout(t); }
        extra.audio_path = it.audio_path;
      }
      var body = it.kind === "u"
        ? Object.assign({ sender: me(), receiver: it.to, body: it.body }, extra)
        : Object.assign({ group_id: it.to, sender: me(), body: it.body }, extra);
      await timeout(api(it.kind === "u" ? "/rest/v1/messages" : "/rest/v1/group_messages",
        { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(body) }), 40000);
    })();
    inflight[it.id] = p;
    var done = function () { delete inflight[it.id]; };
    p.then(done, done);
    return p;
  }
  /* l'ancien code (newSend, newSendGroup) appelle pushItem : on le remplace */
  window.pushItem = sendOne;

  /* ---------- boucle d'envoi automatique ---------- */
  function refresh() {
    try { if (typeof peer !== "undefined" && peer && typeof loadMsgs === "function") loadMsgs(); } catch (e) { }
    try { if (typeof gCur !== "undefined" && gCur && typeof loadGroupMsgs === "function") loadGroupMsgs(); } catch (e) { }
  }
  async function flush(force) {
    if (busy) return; busy = true;
    var changed = false;
    try {
      var list = items().sort(function (a, b) { return (a.audio_path ? 1 : 0) - (b.audio_path ? 1 : 0); });
      for (var i = 0; i < list.length; i++) {
        var it = list[i];
        if (!force && nextAt[it.id] && nextAt[it.id] > Date.now()) continue;
        if (!force && (tries[it.id] || 0) >= FAIL_AFTER) continue;
        try {
          await sendOne(it);
          outboxRemove(it.id); delete tries[it.id]; delete nextAt[it.id]; changed = true;
        } catch (e) {
          lastErr[it.id] = String((e && e.message) || e).slice(0, 60);
          /* refus du serveur (droits, bucket, bloqué...) : inutile de réessayer en boucle */
          if (/row-level|policy|permission|violates|not found|bucket|denied|403|404/i.test(lastErr[it.id])) tries[it.id] = FAIL_AFTER;
          else tries[it.id] = (tries[it.id] || 0) + 1;
          nextAt[it.id] = Date.now() + Math.min(30000, 3000 * tries[it.id]);
          changed = true;
          continue;
        }
      }
    } finally { busy = false; }
    if (changed) refresh();
    schedule();
  }
  function schedule() {
    clearTimeout(tm);
    if (!items().length) return;
    tm = setTimeout(function () { flush(false); }, 4000);
  }
  window.toolePushNow = function () { schedule(); flush(true); };

  /* ---------- bulles en attente façon Messenger ---------- */
  window.pendBubbles = function (kind, to, box) {
    if (!box) return;
    items().filter(function (x) { return x.kind === kind && x.to === to; }).forEach(function (x) {
      var failed = (tries[x.id] || 0) >= FAIL_AFTER;
      var d = document.createElement("div");
      d.className = "m me pend" + (failed ? " failed" : ""); d.dataset.mid = x.id;
      if (x.audio_path) { try { d.appendChild(vBubble({ id: x.id, audio_path: x.audio_path })); } catch (e) { d.textContent = "\uD83C\uDFA4 Vocal"; } }
      else d.appendChild(document.createTextNode(x.body || ""));
      var t = document.createElement("div"); t.className = "t";
      var hm = new Date(tsOf(x)).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      var dd = new Date(tsOf(x)); if (dd.toDateString() !== new Date().toDateString()) hm = dd.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }) + " " + hm;
      t.textContent = hm + " \u00B7 " + (failed ? "! Non envoyé" + (lastErr[x.id] ? " (" + lastErr[x.id] + ")" : "") + " \u00B7 touche pour réessayer" : (inflight[x.id] ? "envoi\u2026" : "\u23F3 en attente"));
      d.appendChild(t);
      d.onclick = function () { tries[x.id] = 0; nextAt[x.id] = 0; delete lastErr[x.id]; flush(true); };
      box.appendChild(d);
    });
    try { box.scrollTop = box.scrollHeight; } catch (e) { }
  };
  window.resendItem = function (id) { tries[id] = 0; nextAt[id] = 0; return flush(true); };

  /* ---------- vocaux : enregistrés d'abord sur le téléphone ---------- */
  async function queueVoice(kind) {
    if (!vBlob) return;
    if (kind === "u" && (typeof peer === "undefined" || !peer)) return;
    if (kind === "g" && (typeof gCur === "undefined" || !gCur)) return;
    var path = me() + "/" + Date.now() + "-" + Math.random().toString(36).slice(2) + ".m4a";
    try { await vSave(path, vBlob); } catch (e) { toast2("Vocal non enregistré"); return; }
    outboxAdd({ id: "p" + Date.now(), kind: kind, to: kind === "u" ? peer.id : gCur.id, body: "(vocal)", audio_path: path });
    try { if (vA) vA.pause(); } catch (e) { }
    vBlob = null; vA = null; vS = "idle"; try { vRender(); } catch (e) { }
    refresh(); setTimeout(function () { flush(true); }, 50);
  }
  window.vSendPrev = function () { return queueVoice((typeof peer !== "undefined" && peer) ? "u" : "g"); };
  window.vSendGroupAudio = function () { return queueVoice("g"); };

  /* ---------- déclencheurs ---------- */
  function init() {
    var css = document.createElement("style");
    css.textContent = ".m.pend{opacity:1!important;border:0!important}.m.pend .t{color:inherit!important;opacity:.75}.m.pend.failed{outline:1.5px solid #e5484d}.m.pend.failed .t{color:#e5484d!important;opacity:1}";
    document.head.appendChild(css);
    window.addEventListener("online", function () { setTimeout(function () { flush(true); }, 500); });
    document.addEventListener("visibilitychange", function () { if (!document.hidden) flush(true); });
    window.addEventListener("focus", function () { flush(false); });
    setInterval(function () { if (items().length) flush(false); }, 8000);
    flush(true);
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
