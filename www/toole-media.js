(function () {
  "use strict";
  if (window.__tmed) return; window.__tmed = 1;
  var CLOUD = "mydh3xtz", PRESET = "TÕÕLé-app";
  var PV = "\uD83C\uDFAC" + "vid:", PF = "\uD83D\uDCCE" + "file:";
  var MAX_VID_S = 31, MAX_VID_B = 15 * 1048576, MAX_FILE = 2 * 1048576, KEEP = 15 * 864e5, TG_FILE = 19 * 1048576;
  var CLIP = '<svg viewBox="0 0 24 24"><path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.3 3.3 0 0 1 4.7 4.7L10.2 17a1.7 1.7 0 0 1-2.4-2.4L15 7.5"/></svg>';

  function $(id) { return document.getElementById(id); }
  function T(s) { try { toast(s); } catch (e) { alert(s); } }
  function inGroup() { var g = $("scrGroup"); return !!(g && !g.classList.contains("hide")); }
  function fmtS(x) { x = Math.max(0, Math.round(x || 0)); return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0"); }
  function sz(b) { b = Number(b || 0); return b < 1048576 ? Math.max(1, Math.round(b / 1024)) + " Ko" : (b / 1048576).toFixed(1) + " Mo"; }
  function h(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function mineOf(path) { try { return path.indexOf(me() + "/") === 0; } catch (e) { return false; } }

  var st = document.createElement("style");
  st.textContent =
    ".tm-spin{width:46px;height:46px;border-radius:50%;border:4px solid rgba(124,58,237,.2);border-top-color:#7c3aed;animation:tmspin 1s linear infinite}" +
    "@keyframes tmspin{to{transform:rotate(360deg)}}" +
    ".tmv{position:relative;width:210px;max-width:100%;height:124px;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#00e5ff,#7c3aed);border:1px solid rgba(0,229,255,.6);box-shadow:0 0 14px rgba(0,229,255,.35)}" +
    ".tmv .pl{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 16px rgba(0,229,255,.7);color:#fff;font-size:20px;padding-left:3px}" +
    ".tmv .du{position:absolute;right:8px;bottom:6px;font-size:12px;font-weight:700;color:#fff;background:rgba(0,0,0,.45);padding:2px 8px;border-radius:10px}" +
    ".tmf{display:flex;align-items:center;gap:10px;min-width:200px;max-width:100%;padding:8px 10px;border-radius:14px;cursor:pointer;background:rgba(255,255,255,.2);border:1px solid rgba(0,229,255,.55)}" +
    ".tmf .ic{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 12px rgba(0,229,255,.55)}" +
    ".tmf .nm{font-weight:700;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px}" +
    ".tmf .sz{font-size:12px;opacity:.75}";
  document.head.appendChild(st);

  function busy(t) {
    var o = document.createElement("div");
    o.style.cssText = "position:fixed;inset:0;z-index:99998;background:rgba(244,251,255,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#0b2a3a;font-weight:700;gap:14px;text-align:center;padding:20px";
    var s = document.createElement("div"); s.className = "tm-spin";
    var p = document.createElement("div"); p.textContent = t;
    var n = document.createElement("div"); n.style.cssText = "font-weight:400;font-size:12px;opacity:.7"; n.textContent = "Garde l'application ouverte";
    o.appendChild(s); o.appendChild(p); o.appendChild(n); document.body.appendChild(o);
    return { set: function (x) { p.textContent = x; }, close: function () { o.remove(); } };
  }

  /* ---------- Cloudinary ---------- */
  async function cloudUpload(blob, path, rtype) {
    if (window.tgUpload) { try { await window.tgUpload(blob, path); return; } catch (e) { } }
    var sk = window.__tgSkip && window.__tgSkip[path];
    if (sk) { delete window.__tgSkip[path]; try { await reserve(sk[0], path, sk[1], sk[2], sk[3], true); } catch (e) { throw new Error(limitMsg(e, sk[0] === "video" ? "vidéos" : "fichiers")); } }
    var f = new FormData();
    f.append("file", blob);
    f.append("upload_preset", PRESET);
    f.append("public_id", "toole/" + (rtype === "raw" ? path : path.replace(/\.[^.\/]+$/, "")));
    var r = await fetch("https://api.cloudinary.com/v1_1/" + CLOUD + "/" + rtype + "/upload", { method: "POST", body: f });
    if (!r.ok) throw new Error("Envoi impossible (" + r.status + ")");
  }
  function cloudUrl(path, rtype) { if (window.tgUrl) return window.tgUrl(path, rtype); return "https://res.cloudinary.com/" + CLOUD + "/" + rtype + "/upload/toole/" + path; }

  async function reserve(kind, path, rtype, size, dur, force) {
    if (!force && window.tgReady && window.tgReady(size)) { (window.__tgSkip = window.__tgSkip || {})[path] = [kind, rtype, size, dur]; return; }
    await api("/rest/v1/media", {
      method: "POST", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ owner: me(), kind: kind, path: path, public_id: "toole/" + path, resource_type: rtype,
        size_bytes: size, duration_s: dur || null, expires_at: new Date(Date.now() + KEEP).toISOString() })
    });
  }
  function unreserve(path) { try { api("/rest/v1/media?path=eq." + encodeURIComponent(path), { method: "DELETE" }).catch(function () { }); } catch (e) { } }

  async function postMsg(body) {
    var g = inGroup();
    await api(g ? "/rest/v1/group_messages" : "/rest/v1/messages", {
      method: "POST", headers: { Prefer: "return=minimal" },
      body: JSON.stringify(g ? { group_id: gCur.id, sender: me(), body: body } : { sender: me(), receiver: peer.id, body: body })
    });
    if (g && typeof loadGroupMsgs === "function") loadGroupMsgs(); else if (typeof loadMsgs === "function") loadMsgs();
  }

  /* ---------- Vidéo : mesure + compression ---------- */
  function getMeta(file) {
    return new Promise(function (res) {
      var v = document.createElement("video"), u = window.URL.createObjectURL(file), done = false;
      function fin(x) { if (done) return; done = true; try { window.URL.revokeObjectURL(u); } catch (e) { } res(x); }
      v.preload = "metadata";
      v.onloadedmetadata = function () { fin({ dur: v.duration, w: v.videoWidth, h: v.videoHeight }); };
      v.onerror = function () { fin(null); };
      setTimeout(function () { fin(null); }, 8000);
      v.src = u;
    });
  }
  function compress(file, meta, onP, q) {
    return new Promise(function (res) {
      var v = document.createElement("video"), u = window.URL.createObjectURL(file);
      var raf = 0, ac = null, rec = null, done = false, chunks = [];
      function end(r) {
        if (done) return; done = true;
        cancelAnimationFrame(raf);
        try { if (rec && rec.state !== "inactive") rec.stop(); } catch (e) { }
        try { v.pause(); } catch (e) { }
        try { if (ac) ac.close(); } catch (e) { }
        try { window.URL.revokeObjectURL(u); } catch (e) { }
        res(r);
      }
      if (!window.MediaRecorder || !meta.h) return end(null);
      var H = Math.min((q && q.h) || 480, meta.h), W = Math.round(meta.w * H / meta.h / 2) * 2;
      var c = document.createElement("canvas"); c.width = W; c.height = H;
      var x = c.getContext("2d");
      var tracks = c.captureStream(24).getVideoTracks();
      v.playsInline = true; v.src = u;
      try {
        var AC = window.AudioContext || window.webkitAudioContext; ac = new AC(); ac.resume();
        var s = ac.createMediaElementSource(v), d = ac.createMediaStreamDestination();
        s.connect(d); tracks = tracks.concat(d.stream.getAudioTracks());
      } catch (e) { }
      var mime = ["video/webm;codecs=vp8,opus", "video/webm;codecs=vp9,opus", "video/webm"].filter(function (m) { return MediaRecorder.isTypeSupported(m); })[0];
      if (!mime) return end(null);
      try { rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime, videoBitsPerSecond: (q && q.v) || 700000, audioBitsPerSecond: (q && q.a) || 64000 }); }
      catch (e) { return end(null); }
      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function () { end({ blob: new Blob(chunks, { type: "video/webm" }) }); };
      function draw() { x.drawImage(v, 0, 0, W, H); onP(Math.min(1, v.currentTime / meta.dur)); if (v.currentTime >= meta.dur) { cancelAnimationFrame(raf); try { rec.stop(); } catch (e) { end(null); } return; } raf = requestAnimationFrame(draw); }
      v.onended = function () { cancelAnimationFrame(raf); try { rec.stop(); } catch (e) { end(null); } };
      v.onerror = function () { end(null); };
      rec.start(500);
      var p = v.play();
      if (p && p.then) p.then(draw).catch(function () { end(null); }); else draw();
      setTimeout(function () { end(null); }, (meta.dur + 25) * 1000);
    });
  }

  function limitMsg(e, what) { return /row-level|403|violat|policy/i.test(String(e && e.message)) ? "Limite atteinte : 2 " + what + " par 24 h" : "Envoi impossible : " + (e && e.message || "erreur"); }

  function plan(dur, pass) {
    var budget = MAX_VID_B * 8 * 0.88 * Math.pow(0.8, pass);
    var v = Math.max(40000, Math.round(budget / Math.max(dur, 1) - 48000));
    return { v: v, a: 48000, h: v > 550000 ? 480 : v > 300000 ? 360 : v > 150000 ? 240 : 144 };
  }

  function confirmSend(icon, name, size, dur, note) {
    return new Promise(function (res) {
      var o = document.createElement("div");
      o.style.cssText = "position:fixed;inset:0;z-index:99996;background:rgba(5,10,26,.6);display:flex;align-items:center;justify-content:center;padding:20px";
      var b = document.createElement("div");
      b.style.cssText = "width:100%;max-width:340px;padding:18px;border-radius:18px;background:linear-gradient(180deg,#10265a,#0b1b3a);border:1px solid rgba(0,229,255,.7);color:#fff;text-align:center";
      b.innerHTML = '<div style="font-size:34px">' + icon + '</div><div style="font-weight:700;margin:8px 0 2px;word-break:break-all">' + h(name) + '</div><div style="opacity:.8;font-size:13px">' + sz(size) + (dur ? " · " + fmtS(dur) : "") + '</div>' + (note ? '<div style="opacity:.8;font-size:12px;margin-top:8px">' + h(note) + '</div>' : "");
      function btn(txt, ok, bg) {
        var x = document.createElement("button"); x.type = "button"; x.textContent = txt;
        x.style.cssText = "flex:1;padding:12px;border:0;border-radius:12px;font-weight:700;font-size:15px;color:#fff;background:" + bg;
        x.onclick = function () { o.remove(); res(ok); };
        return x;
      }
      var row = document.createElement("div"); row.style.cssText = "display:flex;gap:10px;margin-top:16px";
      row.appendChild(btn("Annuler", false, "rgba(255,255,255,.18)"));
      row.appendChild(btn("Envoyer", true, "linear-gradient(135deg,#00e5ff,#7c3aed)"));
      b.appendChild(row); o.appendChild(b); document.body.appendChild(o);
    });
  }

  async function sendVideo(file) {
    if (!file) return;
    if (navigator.onLine === false) return T("Pas de connexion : vidéo non envoyée");
    var meta = await getMeta(file);
    if (!meta || !isFinite(meta.dur)) return T("Vidéo illisible");
    var tg = !!(window.tgReady && window.tgReady(1));
    if (!tg && meta.dur > MAX_VID_S) return T("Vidéo trop longue : 30 secondes maximum");
    var need = file.size > MAX_VID_B;
    var ok = await confirmSend("\uD83C\uDFAC", file.name || "Vidéo", file.size, meta.dur, need ? "Elle sera compressée à 15 Mo maximum, en gardant l'application ouverte" : "");
    if (!ok) return;
    var ui = busy(need ? "Compression… 0 %" : "Préparation…");
    try {
      var blob = file;
      if (need) {
        blob = null;
        for (var pass = 0; pass < 3; pass++) {
          var q = plan(meta.dur, pass);
          var r = await compress(file, meta, function (p) { ui.set("Compression" + (pass ? " (passe " + (pass + 1) + "/3)" : "") + "… " + Math.round(p * 100) + " %"); }, q);
          if (!r || !r.blob || !r.blob.size) { ui.close(); return T("Compression impossible sur cet appareil"); }
          blob = r.blob;
          if (blob.size <= MAX_VID_B) break;
        }
        if (blob.size > MAX_VID_B) { ui.close(); return T("Impossible de descendre sous 15 Mo (" + sz(blob.size) + ")"); }
      }
      var path = me() + "/" + Date.now() + "-" + Math.random().toString(36).slice(2) + (blob.type.indexOf("webm") > -1 ? ".webm" : ".mp4");
      ui.set("Envoi… (" + sz(blob.size) + ")");
      try { await reserve("video", path, "video", blob.size, meta.dur); } catch (e) { ui.close(); return T(limitMsg(e, "vidéos")); }
      try { await cloudUpload(blob, path, "video"); } catch (e) { unreserve(path); ui.close(); return T(e.message); }
      try { await vSave(path, blob); } catch (e) { }
      await postMsg(PV + path + "|" + Math.round(meta.dur));
      ui.close(); T("Vidéo envoyée (" + sz(blob.size) + ")");
    } catch (e) { ui.close(); T(e.message || "Erreur vidéo"); }
  }

  async function sendFile(file) {
    if (!file) return;
    if (navigator.onLine === false) return T("Pas de connexion : fichier non envoyé");
    var tgf = !!(window.tgReady && window.tgReady(file.size));
    if (!tgf && file.size > MAX_FILE) return T(file.size > TG_FILE ? "Fichier trop lourd" : "Telegram indisponible : 2 Mo maximum pour l'instant");
    var ok = await confirmSend("\uD83D\uDCCE", file.name || "Fichier", file.size, 0, "");
    if (!ok) return;
    var ui = busy("Envoi…");
    try {
      var m = /\.([A-Za-z0-9]{1,5})$/.exec(file.name || ""), ext = m ? "." + m[1].toLowerCase() : "";
      var path = me() + "/" + Date.now() + "-" + Math.random().toString(36).slice(2) + ext;
      try { await reserve("file", path, "raw", file.size, null); } catch (e) { ui.close(); return T(limitMsg(e, "fichiers")); }
      try { await cloudUpload(file, path, "raw"); } catch (e) { unreserve(path); ui.close(); return T(e.message); }
      try { await vSave(path, file); } catch (e) { }
      await postMsg(PF + path + "|" + encodeURIComponent(file.name || "fichier") + "|" + file.size);
      ui.close(); T("Fichier envoyé");
    } catch (e) { ui.close(); T(e.message || "Erreur fichier"); }
  }

  /* ---------- Lecture / ouverture ---------- */
  async function getBlob(path, rtype) {
    var b = await vLoad(path);
    if (!b) {
      var r = await fetch(cloudUrl(path, rtype));
      if (!r.ok) return null;
      b = await r.blob();
      try { await vSave(path, b); } catch (e) { }
    }
    if (!mineOf(path)) { try { api("/rest/v1/rpc/media_listened", { method: "POST", body: JSON.stringify({ p_path: path }) }).catch(function () { }); } catch (e) { } }
    return b;
  }
  function player(blob) {
    var o = document.createElement("div");
    o.style.cssText = "position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center";
    var v = document.createElement("video"), u = window.URL.createObjectURL(blob);
    v.src = u; v.controls = true; v.autoplay = true; v.playsInline = true;
    v.style.cssText = "max-width:100%;max-height:100%";
    var x = document.createElement("div");
    x.textContent = "\u2715";
    x.style.cssText = "position:absolute;top:calc(env(safe-area-inset-top,0px) + 14px);right:16px;width:42px;height:42px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(0,229,255,.8);color:#fff;font-size:18px;display:flex;align-items:center;justify-content:center;z-index:2";
    x.onclick = function () { try { v.pause(); window.URL.revokeObjectURL(u); } catch (e) { } o.remove(); };
    o.appendChild(v); o.appendChild(x); document.body.appendChild(o);
  }
  function toB64(b) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(",")[1]); }; r.onerror = rej; r.readAsDataURL(b); }); }
  async function openFile(path, name) {
    var b = await getBlob(path, "raw");
    if (!b) return T("Fichier expiré");
    var P = window.Capacitor && window.Capacitor.Plugins, FS = P && P.Filesystem, SH = P && P.Share;
    var safe = String(name || "fichier").replace(/[\\\/:*?"<>|]/g, "_");
    if (FS && SH) {
      var w = await FS.writeFile({ path: safe, data: await toB64(b), directory: "CACHE" });
      await SH.share({ title: safe, url: w.uri, dialogTitle: "Ouvrir " + safe });
    } else {
      var a = document.createElement("a"); a.href = window.URL.createObjectURL(b); a.download = safe;
      document.body.appendChild(a); a.click(); a.remove();
    }
  }

  function fix(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n, l = [];
    while ((n = w.nextNode())) { var s = n.nodeValue; if (s.indexOf(PV) === 0 || s.indexOf(PF) === 0) l.push(n); }
    l.forEach(function (t) {
      var par = t.parentNode; if (!par) return;
      var s = t.nodeValue, d = document.createElement("div");
      if (s.indexOf(PV) === 0) {
        var a = s.slice(PV.length).trim().split("|"), path = a[0];
        d.className = "tmv";
        d.innerHTML = '<div class="pl">\u25B6</div><span class="du">' + fmtS(a[1]) + "</span>";
        d.onclick = async function (e) {
          e.stopPropagation();
          try { var b = await getBlob(path, "video"); if (!b) return T("Vidéo expirée"); player(b); } catch (er) { T("Lecture impossible"); }
        };
      } else {
        var f = s.slice(PF.length).trim().split("|"), p2 = f[0], nm = decodeURIComponent(f[1] || "fichier");
        d.className = "tmf";
        d.innerHTML = '<div class="ic">\uD83D\uDCCE</div><div><div class="nm">' + h(nm) + '</div><div class="sz">' + sz(f[2]) + "</div></div>";
        d.onclick = async function (e) {
          e.stopPropagation();
          try { await openFile(p2, nm); } catch (er) { T("Ouverture impossible"); }
        };
      }
      par.replaceChild(d, t);
    });
  }

  /* ---------- Bouton + menu ---------- */
  function menu(iv, iff) {
    var o = document.createElement("div");
    o.style.cssText = "position:fixed;inset:0;z-index:99997;background:rgba(5,10,26,.55);display:flex;align-items:flex-end;justify-content:center";
    var b = document.createElement("div");
    b.style.cssText = "width:100%;max-width:520px;padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 18px);border-radius:22px 22px 0 0;background:linear-gradient(180deg,#10265a,#0b1b3a);border-top:1px solid rgba(0,229,255,.7);box-shadow:0 -10px 30px rgba(0,229,255,.25)";
    function item(ic, txt, fn) {
      var i = document.createElement("div");
      i.style.cssText = "display:flex;align-items:center;gap:14px;padding:14px 8px;color:#fff;font-weight:700;font-size:16px";
      i.innerHTML = '<span style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 12px rgba(0,229,255,.6)">' + ic + "</span>" + txt;
      i.onclick = function () { o.remove(); fn(); };
      b.appendChild(i);
    }
    item("\uD83D\uDCF7", "Photo", function () {
      var send = window.__tsendPhoto; if (!send) return T("Photo indisponible");
      if (window.__tpick && window.__tpick("image/*", send)) return;
      var i = document.createElement("input"); i.type = "file"; i.accept = "image/*";
      i.onchange = function () { if (i.files && i.files[0]) send(i.files[0]); }; i.click();
    });
    item("\uD83C\uDFAC", "Vidéo", function () { iv.click(); });
    item("\uD83D\uDCCE", "Fichier", function () { iff.click(); });
    o.onclick = function (e) { if (e.target === o) o.remove(); };
    o.appendChild(b); document.body.appendChild(o);
  }
  function addAttach(id) {
    var m = $(id); if (!m || m.dataset.tm) return; m.dataset.tm = "1";
    var b = document.createElement("button"); b.type = "button";
    b.className = (m.className || "").replace(/\brec\b/g, "").trim();
    b.setAttribute("aria-label", "Joindre"); b.innerHTML = CLIP;
    var iv = document.createElement("input"); iv.type = "file"; iv.accept = "video/*"; iv.style.display = "none";
    var iff = document.createElement("input"); iff.type = "file"; iff.style.display = "none";
    iv.onchange = function () { var f = iv.files && iv.files[0]; iv.value = ""; sendVideo(f); };
    iff.onchange = function () { var f = iff.files && iff.files[0]; iff.value = ""; sendFile(f); };
    b.onclick = function (e) { e.preventDefault(); menu(iv, iff); };
    m.parentNode.insertBefore(b, m); m.parentNode.insertBefore(iv, m); m.parentNode.insertBefore(iff, m);
  }
  function init() {
    addAttach("vmic"); addAttach("gMic");
    ["chat", "gMsgs"].forEach(function (id) {
      var e = $(id); if (!e) return;
      new MutationObserver(function () { fix(e); }).observe(e, { childList: true, subtree: true });
      fix(e);
    });
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
