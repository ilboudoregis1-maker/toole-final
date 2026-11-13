/* TÕÕLé — lecteur de vocaux
   - curseur déplaçable au doigt (avancer / reculer), même avant d'avoir lancé la lecture
   - vitesse de lecture : 1× → 1,25× → 1,5× → 2× (choix gardé pour tous les vocaux)
   - durée toujours connue (lecture des métadonnées, sinon décodage du son) :
     la barre et le curseur avancent même pour les vocaux sans durée dans le fichier */
(function () {
  var REG = {};      // audio_path -> { a: Audio, blob, fresh }
  var UIS = {};      // audio_path -> bulle affichée
  var DUR = {};      // audio_path -> durée mesurée
  var DRAG = {};     // audio_path -> position (0..1) pendant le glissement
  var LOADING = {};  // audio_path -> chargement en cours
  var N = 30;
  var RATES = [1, 1.25, 1.5, 2];

  /* ---------- vitesse ---------- */
  function getRate() {
    try { var r = parseFloat(localStorage.getItem("toole_vrate")); return RATES.indexOf(r) > -1 ? r : 1; } catch (e) { return 1; }
  }
  function rateLabel(r) {
    var en = false;
    try { en = !!(window.TOOLE_I18N && window.TOOLE_I18N.lang && window.TOOLE_I18N.lang() === "en"); } catch (e) { }
    return String(r).replace(".", en ? "." : ",") + "×";
  }
  function applyRate(a) { try { a.playbackRate = getRate(); a.preservesPitch = true; a.webkitPreservesPitch = true; } catch (e) { } }
  function nextRate() {
    var r = getRate(), n = RATES[(RATES.indexOf(r) + 1) % RATES.length];
    try { localStorage.setItem("toole_vrate", String(n)); } catch (e) { }
    Object.keys(REG).forEach(function (k) { applyRate(REG[k].a); });
    Object.keys(UIS).forEach(function (k) { paint(k); });
  }

  /* ---------- outils ---------- */
  function fmt(x) {
    x = Math.max(0, Math.floor(x || 0));
    return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0");
  }
  function heights(path) {
    var h = 0, i, out = [];
    for (i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
    for (i = 0; i < N; i++) {
      h = (h * 1664525 + 1013904223) >>> 0;
      var r = ((h >>> 8) % 100) / 100;
      var env = 0.55 + 0.45 * Math.sin(Math.PI * (i + 0.5) / N);
      out.push(Math.round((25 + r * 75) * env));
    }
    return out;
  }

  /* ---------- durée ---------- */
  function mediaDur(blob) {
    return new Promise(function (res) {
      var t = new Audio(), src = window.URL.createObjectURL(blob), done = false;
      function fin(v) {
        if (done) return; done = true;
        try { window.URL.revokeObjectURL(src); } catch (e) { }
        res(v);
      }
      t.preload = "metadata";
      function chk() { if (isFinite(t.duration) && t.duration > 0) fin(t.duration); }
      t.onloadedmetadata = function () {
        chk();
        t.ontimeupdate = chk; t.ondurationchange = chk; t.onseeked = chk;
        try { t.currentTime = 1e101; } catch (e) { fin(0); }
      };
      t.onerror = function () { fin(0); };
      setTimeout(function () { fin(0); }, 6000);
      t.src = src;
    });
  }
  function decodeDur(blob) {
    return Promise.resolve().then(function () { return blob.arrayBuffer(); }).then(function (buf) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return 0;
      var c = new AC();
      return new Promise(function (res) {
        var done = false;
        function fin(v) { if (done) return; done = true; try { c.close(); } catch (e) { } res(v); }
        try {
          var p = c.decodeAudioData(buf, function (b) { fin(b && b.duration || 0); }, function () { fin(0); });
          if (p && p.catch) p.catch(function () { fin(0); });
        } catch (e) { fin(0); }
        setTimeout(function () { fin(0); }, 8000);
      });
    }).catch(function () { return 0; });
  }
  /* dernier recours : lecture muette en accéléré pour mesurer la vraie durée */
  function scanDur(blob) {
    return new Promise(function (res) {
      var t = new Audio(), src = window.URL.createObjectURL(blob), done = false, last = 0;
      function fin(v) {
        if (done) return; done = true;
        try { t.pause(); } catch (e) { }
        try { window.URL.revokeObjectURL(src); } catch (e) { }
        res(v);
      }
      t.muted = true; t.volume = 0; t.preload = "auto";
      try { t.playbackRate = 16; } catch (e) { }
      t.ontimeupdate = function () { if (t.currentTime > last) last = t.currentTime; };
      t.onended = function () { fin(isFinite(t.duration) && t.duration > 0 ? t.duration : last); };
      t.onerror = function () { fin(0); };
      setTimeout(function () { fin(0); }, 30000);
      t.src = src;
      var p = t.play(); if (p && p.catch) p.catch(function () { fin(0); });
    });
  }
  function getDur(blob) {
    return mediaDur(blob).then(function (d) { return d > 0 ? d : decodeDur(blob); })
      .then(function (d) { return d > 0 ? d : scanDur(blob); });
  }
  /* durées gardées sur le téléphone, mesurées une seule fois à la fois */
  var LDK = "toole_vdur", LD = {}, QUEUE = Promise.resolve(), PEND = {};
  try { LD = JSON.parse(localStorage.getItem(LDK) || "{}") || {}; } catch (e) { LD = {}; }
  Object.keys(LD).forEach(function (k) { if (LD[k] > 0) DUR[k] = LD[k]; });
  function getDurP(path, blob) {
    if (DUR[path]) return Promise.resolve(DUR[path]);
    if (PEND[path]) return PEND[path];
    PEND[path] = QUEUE = QUEUE.then(function () { return getDur(blob); }).then(function (d) {
      delete PEND[path];
      if (d > 0) {
        DUR[path] = d; LD[path] = d;
        var ks = Object.keys(LD); if (ks.length > 500) delete LD[ks[0]];
        try { localStorage.setItem(LDK, JSON.stringify(LD)); } catch (e) { }
      }
      return d;
    }, function () { delete PEND[path]; return 0; });
    return PEND[path];
  }
  function total(path, a) {
    if (a && isFinite(a.duration) && a.duration > 0) return a.duration;
    return DUR[path] || 0;
  }

  /* ---------- affichage ---------- */
  function paint(path) {
    var e = REG[path], u = UIS[path];
    if (!u) return;
    var a = e && e.a, d = total(path, a);
    var dragging = DRAG[path] != null;
    var cur, ratio;
    if (dragging) { ratio = DRAG[path]; cur = ratio * d; }
    else {
      cur = a ? a.currentTime : 0;
      /* durée encore inconnue : le curseur avance quand même (jamais bloqué à 0) */
      ratio = d ? Math.min(1, Math.max(0, cur / d)) : (cur > 0 ? cur / (cur + 8) : 0);
    }
    var playing = !!a && !a.paused && !a.ended;
    u.pb.innerHTML = vI(playing ? VM.pause : VM.play, true);
    var played = Math.round(ratio * N);
    u.bars.forEach(function (el, i) { el.classList.toggle("on", i < played); });
    u.knob.style.left = (ratio * 100) + "%";
    u.knob.classList.toggle("on", playing || cur > 0 || dragging);
    u.dur.textContent = fmt(playing || cur > 0 || dragging ? cur : d);
    u.rate.textContent = rateLabel(getRate());
  }
  /* applique un déplacement du curseur demandé avant que la durée soit connue */
  function applyPending(path) {
    var e = REG[path];
    if (!e || e.pend == null) return;
    var d = total(path, e.a);
    if (!d) return;
    var r = e.pend; e.pend = null;
    try { e.a.currentTime = r * d; } catch (x) { }
  }
  function loop(path) {
    var e = REG[path];
    if (!e || e.a.paused || e.a.ended || e.loop) return;
    e.loop = true;
    (function tick() {
      var x = REG[path];
      if (!x || x.a.paused || x.a.ended) { if (x) x.loop = false; paint(path); return; }
      paint(path);
      requestAnimationFrame(tick);
    })();
  }
  function wire(path, a) {
    var p = function () { paint(path); };
    a.onpause = p; a.ontimeupdate = p; a.onloadedmetadata = p; a.onseeked = p;
    a.ondurationchange = function () {
      if (!DUR[path] && isFinite(a.duration) && a.duration > 0) DUR[path] = a.duration;
      applyPending(path);
      paint(path);
    };
    a.onplaying = p; a.onseeking = p;
    a.onplay = function () {
      Object.keys(REG).forEach(function (k) {
        if (k !== path && REG[k].a && !REG[k].a.paused) REG[k].a.pause();
      });
      applyRate(a);
      paint(path);
      loop(path);
    };
    a.onended = function () {
      if (!DUR[path] && a.currentTime > 0) DUR[path] = a.currentTime;
      a.currentTime = 0; applyPending(path); paint(path);
    };
  }

  /* ---------- chargement du son (sans le lancer) ---------- */
  function ensure(path) {
    if (REG[path]) return Promise.resolve(REG[path]);
    if (LOADING[path]) return LOADING[path];
    LOADING[path] = (async function () {
      var blob = await vLoad(path), fresh = false;
      if (!blob && path) {
        var u = await vUrl(path);
        var r = await fetch(u);
        if (!r.ok) throw new Error("Vocal indisponible");
        blob = await r.blob();
        await vSave(path, blob); // copie gardée sur le téléphone
        fresh = true;
      }
      if (!blob) throw new Error("expiré");
      var a = new Audio(window.URL.createObjectURL(blob));
      applyRate(a);
      var e = { a: a, blob: blob, fresh: fresh, pend: null };
      REG[path] = e;
      wire(path, a);
      if (!DUR[path]) {
        getDurP(path, blob).then(function (d0) { if (d0) { applyPending(path); paint(path); } }).catch(function () { });
      }
      return e;
    })();
    var clear = function () { delete LOADING[path]; };
    LOADING[path].then(clear, clear);
    return LOADING[path];
  }
  function play(path, e) {
    applyRate(e.a);
    if (e.fresh) {
      e.fresh = false;
      try { api("/rest/v1/rpc/media_listened", { method: "POST", body: JSON.stringify({ p_path: path }) }).catch(function () { }); } catch (x) { }
    }
    return e.a.play().catch(function (err) { toast((err && err.message) || "Lecture impossible"); });
  }
  function fail(path, err) {
    var u = UIS[path];
    if (u) u.dur.textContent = (err && err.message === "expiré") ? "expiré" : "indispo";
    if (!err || err.message !== "expiré") { try { toast(err && err.message || "Vocal indisponible"); } catch (x) { } }
  }

  /* ---------- style (vitesse + glissement) ---------- */
  function addCss() {
    if (document.getElementById("tvpCss")) return;
    var st = document.createElement("style");
    st.id = "tvpCss";
    st.textContent =
      ".vbub .vwrap{touch-action:pan-y;-webkit-tap-highlight-color:transparent}" +
      ".vbub .vknob{pointer-events:none}" +
      ".vbub .vrate{flex:none;min-width:34px;padding:4px 6px;border-radius:11px;font-size:11px;font-weight:800;" +
      "text-align:center;line-height:1.1;user-select:none;-webkit-user-select:none;cursor:pointer;" +
      "background:rgba(127,127,127,.24);color:inherit}" +
      ".vbub .vrate:active{transform:scale(.92)}";
    document.head.appendChild(st);
  }

  window.vBubble = function (m) {
    addCss();
    var path = String(m.audio_path || "");
    var w = document.createElement("div"); w.className = "vbub";
    var pb = document.createElement("button"); pb.type = "button";
    pb.setAttribute("aria-label", "Écouter");
    var wr = document.createElement("div"); wr.className = "vwrap";
    var bars = [];
    heights(path).forEach(function (h) {
      var b = document.createElement("i");
      b.style.height = h + "%";
      wr.appendChild(b); bars.push(b);
    });
    var knob = document.createElement("span"); knob.className = "vknob"; wr.appendChild(knob);
    var dur = document.createElement("span"); dur.className = "vdur";
    var rate = document.createElement("span"); rate.className = "vrate";
    rate.setAttribute("role", "button"); rate.setAttribute("aria-label", "Vitesse");
    w.appendChild(pb); w.appendChild(wr); w.appendChild(dur); w.appendChild(rate);

    pb.innerHTML = vI(VM.play, true);
    dur.textContent = DUR[path] ? fmt(DUR[path]) : "0:00";
    UIS[path] = { pb: pb, bars: bars, knob: knob, dur: dur, rate: rate };
    paint(path);

    if (path && !DUR[path]) {
      vLoad(path).then(function (blob) {
        if (!blob) return;
        return getDurP(path, blob).then(function (d) { if (d) paint(path); });
      }).catch(function () { });
    }

    /* le glissement vers la droite ne doit pas déclencher « répondre au message » */
    [wr, rate].forEach(function (el) {
      ["touchstart", "touchmove", "touchend"].forEach(function (n) {
        el.addEventListener(n, function (ev) { ev.stopPropagation(); }, { passive: true });
      });
    });

    /* vitesse */
    rate.onclick = function (ev) { ev.stopPropagation(); nextRate(); };

    /* glissement du curseur (avancer / reculer) */
    function ratioAt(ev) {
      var r = wr.getBoundingClientRect();
      return Math.max(0, Math.min(1, (ev.clientX - r.left) / (r.width || 1)));
    }
    var pid = null;
    wr.addEventListener("pointerdown", function (ev) {
      ev.stopPropagation();
      pid = ev.pointerId;
      try { wr.setPointerCapture(pid); } catch (e) { }
      DRAG[path] = ratioAt(ev);
      paint(path);
      ensure(path).catch(function () { });
    });
    wr.addEventListener("pointermove", function (ev) {
      if (pid === null || ev.pointerId !== pid) return;
      DRAG[path] = ratioAt(ev);
      paint(path);
    });
    function endDrag(ev, commit) {
      if (pid === null || ev.pointerId !== pid) return;
      pid = null;
      var r = DRAG[path];
      delete DRAG[path];
      if (!commit || r == null) { paint(path); return; }
      ensure(path).then(function (e) {
        var d = total(path, e.a);
        if (d) { try { e.a.currentTime = r * d; } catch (x) { } }
        else { e.pend = r; }
        paint(path);
      }).catch(function (err) { paint(path); fail(path, err); });
    }
    wr.addEventListener("pointerup", function (ev) { endDrag(ev, true); });
    wr.addEventListener("pointercancel", function (ev) { endDrag(ev, false); });
    wr.addEventListener("click", function (ev) { ev.stopPropagation(); });

    /* lecture / pause */
    pb.onclick = async function (ev) {
      ev.stopPropagation();
      var e = REG[path];
      if (e) { if (e.a.paused) play(path, e); else e.a.pause(); return; }
      pb.disabled = true;
      try {
        e = await ensure(path);
        await play(path, e);
      } catch (err) {
        fail(path, err);
      } finally {
        pb.disabled = false;
        try { UIS[path].pb.disabled = false; } catch (e2) { }
      }
    };
    return w;
  };
})();
