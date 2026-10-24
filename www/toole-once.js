/* TÕÕLé - photos et vidéos en VUE UNIQUE.
   - envoi : bouton "œil 1" à côté du micro (discussion et groupe)
   - la personne ne peut ouvrir qu'une seule fois (enregistré dans Supabase, table once_seen)
   - pendant la vue, les captures et enregistrements d'écran sont bloqués (plugin natif SecureScreen)
   - rien n'est gardé sur le téléphone du destinataire */
(function () {
  "use strict";
  if (window.__tonce) return; window.__tonce = 1;

  var PO = "👁once:", PFX = "📷img:", PV = "🎬" + "vid:";
  var CLOUD = "mydh3xtz", LS = "toole_once", armed = 0, opening = false;

  function $(id) { return document.getElementById(id); }
  function T(s) { try { toast(s); } catch (e) { alert(s); } }
  function inGroup() { var g = $("scrGroup"); return !!(g && !g.classList.contains("hide")); }
  function mine(path) { try { return path.indexOf(me() + "/") === 0; } catch (e) { return false; } }
  function plug() { try { var p = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.SecureScreen; return p && p.enable ? p : null; } catch (e) { return null; } }
  function fmtS(x) { x = Math.max(0, Math.round(x || 0)); return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0"); }

  /* ---------- mémoire locale des médias déjà ouverts ---------- */
  function seenLoad() { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { return {}; } }
  function seenHas(p) { return !!seenLoad()[p]; }
  function seenAdd(p) { try { var o = seenLoad(); o[p] = Date.now(); localStorage.setItem(LS, JSON.stringify(o)); } catch (e) { } }

  /* ---------- style ---------- */
  var st = document.createElement("style");
  st.textContent =
    ".tonce{display:flex;align-items:center;gap:10px;min-width:190px;max-width:100%;padding:8px 10px;border-radius:14px;cursor:pointer;background:rgba(255,255,255,.2);border:1px dashed rgba(0,229,255,.8)}" +
    ".tonce .ic{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 12px rgba(0,229,255,.55);color:#fff}" +
    ".tonce .nm{font-weight:700;font-size:14px}.tonce .sb{font-size:12px;opacity:.75}" +
    ".tonce.done{opacity:.55;border-style:solid;cursor:default}.tonce.done .ic{background:#8a96a3;box-shadow:none}" +
    "#tonceV img,#tonceV video{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;pointer-events:auto}";
  document.head.appendChild(st);

  /* ---------- envoi : on marque le prochain message photo/vidéo ---------- */
  var _api = window.api;
  if (typeof _api === "function") {
    window.api = function (path, opt) {
      try {
        if (armed && Date.now() - armed < 180000 && opt && opt.method === "POST" &&
          /^\/rest\/v1\/(messages|group_messages)$/.test(String(path)) && typeof opt.body === "string") {
          var o = JSON.parse(opt.body), b = String(o.body || ""), k = "";
          if (b.indexOf(PFX) === 0) k = "img"; else if (b.indexOf(PV) === 0) k = "vid";
          if (k) {
            o.body = PO + k + ":" + b.slice(k === "img" ? PFX.length : PV.length);
            opt = Object.assign({}, opt, { body: JSON.stringify(o) });
            armed = 0;
          }
        }
      } catch (e) { }
      return _api.call(this, path, opt);
    };
  }
  /* un choix de fichier "normal" annule le marquage */
  document.addEventListener("change", function (e) {
    var t = e.target; if (t && t.type === "file" && !e.__once) armed = 0;
  }, true);

  function pickFile(kind, cb) {
    var acc = kind === "img" ? "image/*" : "video/*";
    if (window.__tpick && window.__tpick(acc, cb)) return;
    var i = document.createElement("input"); i.type = "file"; i.accept = acc; i.style.display = "none";
    i.onchange = function () { var f = i.files && i.files[0]; i.remove(); if (f) cb(f); };
    document.body.appendChild(i); i.click();
  }
  function findInput(kind) {
    var acc = kind === "img" ? "image/*" : "video/*";
    var mic = $(inGroup() ? "gMic" : "vmic"), par = mic && mic.parentNode;
    if (!par) return null;
    var l = [].slice.call(par.querySelectorAll("input[type=file]")).filter(function (x) { return x.accept === acc; });
    return l[0] || null;
  }
  function feed(kind, file) {
    var inp = findInput(kind);
    if (!inp) return T("Envoi impossible ici");
    try {
      var dt = new DataTransfer(); dt.items.add(file); inp.files = dt.files;
      armed = Date.now();
      var ev = new Event("change", { bubbles: true }); ev.__once = 1; inp.dispatchEvent(ev);
    } catch (e) { armed = 0; T("Envoi impossible"); }
  }

  /* ---------- photo vue unique : envoi direct (le bouton photo du chat a été retiré de l'app) ---------- */
  function blobOf(c, q) { return new Promise(function (r) { c.toBlob(r, "image/jpeg", q); }); }
  function loadImg(f) {
    return new Promise(function (ok, ko) {
      var im = new Image(), u = window.URL.createObjectURL(f);
      im.onload = function () { window.URL.revokeObjectURL(u); ok(im); };
      im.onerror = ko; im.src = u;
    });
  }
  async function compressImg(f, lim) {
    var im = await loadImg(f), k = Math.min(1, (lim > 102400 ? 1600 : 1080) / im.width), c = document.createElement("canvas"), b;
    for (var t = 0; t < 4; t++) {
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      for (var q = (lim > 102400 ? 0.85 : 0.7); q >= 0.4; q -= 0.1) { b = await blobOf(c, q); if (b && b.size <= lim) return b; }
      k *= 0.8;
    }
    return b;
  }
  async function sendOncePhoto(f) {
    if (!f) return;
    if (navigator.onLine === false) return T("Pas de connexion : photo non envoyée");
    try {
      T("Compression\u2026");
      var b = await compressImg(f, 3 * 1048576), path = me() + "/" + Date.now() + ".jpg", viaTg = false;
      if (window.tgUpload) { try { await window.tgUpload(b, path); viaTg = true; } catch (e) { } }
      if (!viaTg) { /* secours : stockage Supabase, limité côté serveur */
        if (b.size > 102400) b = await compressImg(f, 102400);
        var r = await fetch(URL + "/storage/v1/object/photos/" + path, {
          method: "POST", headers: { apikey: KEY, Authorization: "Bearer " + sess().access_token, "Content-Type": "image/jpeg" }, body: b
        });
        if (!r.ok) throw new Error(r.status == 403 || r.status == 400 ? "Limite de 3 photos atteinte" : "Envoi impossible (" + r.status + ")");
      }
      var g = inGroup(), body = PO + "img:" + path;
      await api(g ? "/rest/v1/group_messages" : "/rest/v1/messages", {
        method: "POST", headers: { Prefer: "return=minimal" },
        body: JSON.stringify(g ? { group_id: gCur.id, sender: me(), body: body } : { sender: me(), receiver: peer.id, body: body })
      });
      if (g && typeof loadGroupMsgs === "function") loadGroupMsgs(); else if (typeof loadMsgs === "function") loadMsgs();
      T("Photo envoyée (vue unique)");
    } catch (e) { T(e.message || "Erreur photo"); }
  }

  /* les 2 choix "vue unique" sont ajoutés dans le menu du trombone (pas de bouton en plus dans la barre) */
  function addItems(o) {
    return; if (!o || o.dataset.once) return;
    var sheet = o.firstElementChild; if (!sheet) return; o.dataset.once = "1";
    function item(ic, txt, kind) {
      var i = document.createElement("div");
      i.style.cssText = "display:flex;align-items:center;gap:14px;padding:14px 8px;color:#fff;font-weight:700;font-size:16px";
      i.innerHTML = '<span style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 12px rgba(0,229,255,.6)">' + ic + "</span>" + txt;
      i.onclick = function () { o.remove(); pickFile(kind, function (f) { if (kind === "img") sendOncePhoto(f); else feed(kind, f); }); };
      sheet.appendChild(i);
    }
    item("\uD83D\uDCF7", "Photo (vue unique)", "img");
    item("\uD83C\uDFAC", "Vidéo (vue unique)", "vid");
  }
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      [].forEach.call(m.addedNodes, function (n) {
        if (n.nodeType === 1 && n.style && n.style.zIndex === "99997" && /Fichier/.test(n.textContent || "")) addItems(n);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------- ouverture ---------- */
  async function fetchBlob(path, kind) {
    var L = [];
    if (kind === "img") {
      if (window.tgUrl) { try { L.push(window.tgUrl(path, "image")); } catch (e) { } }
      L.push(URL + "/storage/v1/object/public/photos/" + path);
    } else {
      if (window.tgUrl) { try { L.push(window.tgUrl(path, "video")); } catch (e) { } }
      L.push("https://res.cloudinary.com/" + CLOUD + "/video/upload/toole/" + path);
    }
    for (var i = 0; i < L.length; i++) {
      try { var r = await fetch(L[i]); if (r.ok) { var x = await r.blob(); if (x && x.size) return x; } } catch (e) { }
    }
    return null;
  }
  async function claim(path) {
    try {
      var s = sess();
      var r = await fetch(URL + "/rest/v1/once_seen", {
        method: "POST",
        headers: { apikey: KEY, Authorization: "Bearer " + s.access_token, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ path: path })
      });
      if (r.ok) return "ok";
      if (r.status === 409) return "seen";
      if (r.status === 404) return "ok"; /* table absente : on se limite au suivi local */
      return "err";
    } catch (e) { return "err"; }
  }
  function show(blob, kind) {
    return new Promise(function (res) {
      var u = window.URL.createObjectURL(blob), done = false;
      var o = document.createElement("div"); o.id = "tonceV"; o.dataset.noshare = "1";
      o.style.cssText = "position:fixed;inset:0;z-index:100002;background:#000;display:flex;align-items:center;justify-content:center;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none";
      var m;
      if (kind === "vid") {
        m = document.createElement("video"); m.src = u; m.controls = true; m.autoplay = true; m.playsInline = true;
        m.setAttribute("controlsList", "nodownload noremoteplayback"); m.disablePictureInPicture = true;
      } else { m = new Image(); m.src = u; m.draggable = false; }
      m.style.cssText = "max-width:100%;max-height:100%;object-fit:contain";
      m.oncontextmenu = function (e) { e.preventDefault(); };
      var bar = document.createElement("div");
      bar.style.cssText = "position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:14px;right:14px;display:flex;align-items:center;justify-content:space-between;color:#fff;font-weight:700;z-index:2";
      var lb = document.createElement("span"); lb.textContent = "👁 Vue unique";
      lb.style.cssText = "background:rgba(0,0,0,.55);padding:6px 12px;border-radius:14px;font-size:14px";
      var x = document.createElement("div"); x.textContent = "✕";
      x.style.cssText = "width:42px;height:42px;border-radius:50%;background:rgba(0,0,0,.6);border:1px solid rgba(0,229,255,.8);display:flex;align-items:center;justify-content:center;font-size:18px";
      function close() {
        if (done) return; done = true;
        document.removeEventListener("visibilitychange", vis);
        try { if (kind === "vid") m.pause(); } catch (e) { }
        try { m.removeAttribute("src"); m.load && m.load(); } catch (e) { }
        try { window.URL.revokeObjectURL(u); } catch (e) { }
        o.remove(); res();
      }
      function vis() { if (document.hidden) close(); }
      document.addEventListener("visibilitychange", vis);
      x.onclick = close;
      bar.appendChild(lb); bar.appendChild(x); o.appendChild(m); o.appendChild(bar); document.body.appendChild(o);
    });
  }
  function markDone(card, txt) {
    if (!card) return; card.classList.add("done");
    var s = card.querySelector(".sb"); if (s) s.textContent = txt || "Ouvert";
  }
  async function openOnce(path, kind, card) {
    if (opening) return; opening = true;
    var S = plug(), secure = false;
    try {
      if (seenHas(path)) { markDone(card); return T("Déjà ouvert"); }
      if (!S) return T("Mets à jour l'application pour ouvrir ce média");
      try { await S.enable(); secure = true; } catch (e) { return T("Protection d'écran indisponible"); }
      T("Chargement…");
      var blob = await fetchBlob(path, kind);
      if (!blob) return T("Média expiré ou introuvable");
      var c = await claim(path);
      if (c === "seen") { seenAdd(path); markDone(card); return T("Déjà ouvert"); }
      if (c === "err") return T("Connexion requise pour ouvrir");
      seenAdd(path); markDone(card);
      await show(blob, kind);
    } catch (e) { T("Ouverture impossible"); }
    finally {
      if (secure && S) { try { await S.disable(); } catch (e) { } }
      opening = false;
    }
  }

  /* ---------- suivi côté expéditeur ---------- */
  var chk = {};
  function senderCheck(path, card) {
    var c = chk[path];
    if (c && c.ok) { markDone(card, "Ouverte ✓"); return; }
    if (c && Date.now() - c.t < 20000) return;
    chk[path] = c = { t: Date.now(), ok: false };
    try {
      fetch(URL + "/rest/v1/once_seen?select=viewer&path=eq." + encodeURIComponent(path), { headers: { apikey: KEY, Authorization: "Bearer " + sess().access_token } })
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (j) { if (j && j.length) { c.ok = true; markDone(card, "Ouverte ✓"); } })
        .catch(function () { });
    } catch (e) { }
  }

  /* ---------- affichage des bulles ---------- */
  var RX = /👁once:\S*/;
  function parse(s) {
    var r = s.slice(PO.length), i = r.indexOf(":"), kind = r.slice(0, i), a = r.slice(i + 1).trim().split("|");
    return { kind: kind === "vid" ? "vid" : "img", path: a[0], dur: a[1] };
  }
  function scan() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n, l = [];
    while ((n = w.nextNode())) { if (n.nodeValue.indexOf(PO) > -1) l.push(n); }
    l.forEach(function (t) {
      var par = t.parentNode, s = t.nodeValue; if (!par) return;
      var inBubble = par.classList && par.classList.contains("m") && s.indexOf(PO) === 0;
      if (!inBubble) {
        t.nodeValue = s.replace(RX, function (x) { return parse(x).kind === "vid" ? "👁 Vidéo à vue unique" : "👁 Photo à vue unique"; });
        return;
      }
      var p = parse(s), isVid = p.kind === "vid", own = mine(p.path);
      var d = document.createElement("div"); d.className = "tonce";
      d.innerHTML = '<div class="ic">👁</div><div><div class="nm"></div><div class="sb"></div></div>';
      d.querySelector(".nm").textContent = (isVid ? "Vidéo" : "Photo") + " · vue unique" + (isVid && p.dur ? " · " + fmtS(p.dur) : "");
      var sb = d.querySelector(".sb");
      if (own) { sb.textContent = "Envoyée"; senderCheck(p.path, d); }
      else if (seenHas(p.path)) { d.classList.add("done"); sb.textContent = "Ouvert"; }
      else {
        sb.textContent = "Touche pour ouvrir (1 seule fois)";
        d.onclick = function (e) { e.stopPropagation(); if (!d.classList.contains("done")) openOnce(p.path, p.kind, d); };
      }
      par.replaceChild(d, t);
    });
  }
  var tm = null;
  function later() { clearTimeout(tm); tm = setTimeout(scan, 60); }

  function init() {
    new MutationObserver(later).observe(document.body, { childList: true, subtree: true });
    scan();
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
  window.__tonceSend={photo:sendOncePhoto,video:function(f){feed("vid",f)},pick:pickFile};
})();
