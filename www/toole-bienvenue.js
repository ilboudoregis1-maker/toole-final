/* TÕÕLé — vidéo de bienvenue obligatoire au premier lancement (à voir jusqu'au bout). */
(function () {
  "use strict";
  if (window.__twv) return; window.__twv = 1;

  var SRC = "bienvenue.mp4";            /* fichier placé dans www/ */
  var FLAG = "toole_welcome_video_v1";  /* passe à v2 pour la réafficher à tout le monde avec une nouvelle vidéo */
  var FAILK = "toole_wv_fail", MAXFAIL = 2;
  var ONLY_NEW = false;                 /* true = seulement les nouveaux comptes (sans session) */

  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function ss(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function hasSession() { try { return !!JSON.parse(ls("toole_session")).access_token; } catch (e) { return false; } }
  if (ls(FLAG) === "1") return;
  if (ONLY_NEW && hasSession()) { ss(FLAG, "1"); return; }

  var EN = ls("toole_lang") === "en";
  var T = EN
    ? { t: "Welcome to TÕÕLé", s: "Watch this short video to get started. Please watch it to the end.", go: "Play the video", ok: "Continue", wait: "Watch to the end to continue", err: "Video unavailable", pause: "Tap to resume" }
    : { t: "Bienvenue sur TÕÕLé", s: "Regarde cette courte vidéo pour bien démarrer. Elle est à voir jusqu’au bout.", go: "Lancer la vidéo", ok: "Continuer", wait: "Regarde jusqu’à la fin pour continuer", err: "Vidéo indisponible", pause: "Touche pour reprendre" };

  var v = document.createElement("video");
  v.preload = "auto"; v.playsInline = true; v.disablePictureInPicture = true;
  v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
  v.setAttribute("controlsList", "nodownload noplaybackrate");

  var shown = false, gaveUp = false;
  var timer = setTimeout(function () { gaveUp = true; }, 6000);   /* fichier absent ou illisible : on ne bloque personne */
  v.addEventListener("loadedmetadata", function () { clearTimeout(timer); if (!gaveUp && !shown) show(); });
  v.addEventListener("error", function () { clearTimeout(timer); if (!shown) gaveUp = true; });
  v.src = SRC + "#t=0.1";

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }

  function show() {
    shown = true;
    var css = el("style");
    css.textContent =
      "#tWV{position:fixed;inset:0;z-index:2147483646;display:flex;flex-direction:column;color:#fff;font-family:'Exo 2',system-ui,sans-serif;" +
      "background:linear-gradient(180deg,#0a2a66,#0a7cff);padding:calc(16px + env(safe-area-inset-top,0px)) 16px calc(16px + env(safe-area-inset-bottom,0px))}" +
      "#tWV .h{text-align:center;padding:6px 8px 12px}#tWV .h b{display:block;font-size:22px;font-weight:800}#tWV .h span{display:block;font-size:14px;opacity:.9;margin-top:6px;line-height:1.35}" +
      "#tWV .st{position:relative;flex:1;min-height:0;display:flex;align-items:center;justify-content:center;border-radius:20px;overflow:hidden;background:#000}" +
      "#tWV video{width:100%;height:100%;object-fit:contain;background:#000}" +
      "#tWV .pl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;background:rgba(0,20,60,.45);font-weight:700;font-size:16px;border:0;color:#fff;width:100%}" +
      "#tWV .pl i{font-style:normal;width:76px;height:76px;border-radius:50%;background:#fff;color:#0a7cff;display:grid;place-items:center;font-size:32px;padding-left:5px}" +
      "#tWV .pb{height:5px;border-radius:5px;background:rgba(255,255,255,.28);margin:14px 2px 10px;overflow:hidden}#tWV .pb i{display:block;height:100%;width:0;background:#fff;border-radius:5px;transition:width .25s linear}" +
      "#tWV .ft{display:flex;flex-direction:column;gap:10px;align-items:stretch}#tWV .ft small{text-align:center;font-size:12.5px;opacity:.9;min-height:16px}" +
      "#tWV .go{border:0;border-radius:999px;padding:14px;font-size:16px;font-weight:700;background:#fff;color:#0a7cff;font-family:inherit}#tWV .go:disabled{opacity:.45}";
    document.head.appendChild(css);

    var o = el("div"); o.id = "tWV";
    var h = el("div", "h"); h.appendChild(el("b", "", T.t)); h.appendChild(el("span", "", T.s)); o.appendChild(h);
    var st = el("div", "st"); st.appendChild(v);
    var pl = el("button", "pl"); var ic = el("i", "", "▶"); pl.appendChild(ic); pl.appendChild(el("span", "", T.go)); st.appendChild(pl);
    o.appendChild(st);
    var pb = el("div", "pb"), bar = el("i"); pb.appendChild(bar); o.appendChild(pb);
    var ft = el("div", "ft"), note = el("small", "", T.wait), go = el("button", "go", T.ok); go.disabled = true;
    ft.appendChild(note); ft.appendChild(go); o.appendChild(ft);
    /* hors de <body> : le bouton Retour de l'appli ne peut pas le fermer */
    document.documentElement.appendChild(o);

    var last = 0, done = false, started = false;
    function complete() {
      if (done) return; done = true; ss(FLAG, "1"); ss(FAILK, "0");
      go.disabled = false; note.textContent = ""; bar.style.width = "100%";
    }
    pl.addEventListener("click", function () {
      started = true; pl.style.display = "none";
      var p = v.play(); if (p && p.catch) p.catch(function () { started = false; pl.style.display = ""; });
    });
    st.addEventListener("click", function (e) {
      if (!started || e.target === pl) return;
      if (v.paused) { v.play(); note.textContent = done ? "" : T.wait; } else { v.pause(); if (!done) note.textContent = T.pause; }
    });
    v.addEventListener("timeupdate", function () {
      if (!v.seeking && v.currentTime > last) last = v.currentTime;
      if (v.duration) bar.style.width = Math.min(100, last / v.duration * 100) + "%";
      if (v.duration && last >= v.duration - 0.4) complete();
    });
    v.addEventListener("seeking", function () { if (Math.abs(v.currentTime - last) > 0.8) v.currentTime = last; });   /* pas de saut en avant */
    v.addEventListener("ended", complete);
    v.addEventListener("error", function () {
      if (done) return;
      note.textContent = T.err; go.disabled = false;
      var n = (+ls(FAILK) || 0) + 1; ss(FAILK, String(n)); if (n >= MAXFAIL) ss(FLAG, "1");
    });
    document.addEventListener("visibilitychange", function () { if (document.hidden && !v.paused) v.pause(); });
    go.addEventListener("click", function () {
      if (go.disabled) return;
      try { v.pause(); v.removeAttribute("src"); v.load(); } catch (e) { }
      o.remove();
    });
  }
})();
