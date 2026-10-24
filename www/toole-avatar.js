/* TÕÕLé — photo de profil (bulle du profil, liste des chats, en-tête et messages) */
(function () {
  "use strict";
  var LIMIT = 3;
  var P = {};        // id -> {v}  (v = version de la photo, null = pas de photo)
  var B = {};        // pseudo -> id
  var N = {};        // id -> pseudo
  var seenI = {}, seenN = {}, busy = false, T = 0;
  var LS = "toole_avmap";
  try { var c = JSON.parse(localStorage.getItem(LS) || "{}"); P = c.P || {}; B = c.B || {}; N = c.N || {}; } catch (e) { }
  function save() { try { localStorage.setItem(LS, JSON.stringify({ P: P, B: B, N: N })); } catch (e) { } }

  function L(fr, en) { return localStorage.getItem("toole_lang") === "en" ? en : fr; }
  function $(id) { return document.getElementById(id); }
  function say(t) { try { if (typeof toast === "function") toast(t); else alert(t); } catch (e) { try { alert(t); } catch (x) { } } }
  function base() { try { if (typeof URL === "string" && /^https?:/.test(URL)) return URL; } catch (e) { } return "https://jbjeqxubpqqypysfsubd.supabase.co"; }
  function key() { try { return typeof KEY === "string" ? KEY : ""; } catch (e) { return ""; } }
  function tok() { try { var s = sess(); return s && s.access_token; } catch (e) { return null; } }
  function myId() { try { return me(); } catch (e) { return null; } }
  function curPeer() { try { return peer; } catch (e) { return null; } }
  function visible(id) { var e = $(id); return !!e && !e.classList.contains("hide"); }
  function ini(n) { return (n || "?").slice(0, 2).toUpperCase(); }
  function uniq(a) { return a.filter(function (x, i) { return x && a.indexOf(x) === i; }); }
  function imgUrl(id, kind) {
    var p = id && P[id];
    if (!p || !p.v) return null;
    return base() + "/storage/v1/object/public/avatars/" + id + "/" + kind + ".jpg?v=" + p.v;
  }

  /* ---------- CSS ---------- */
  var st = document.createElement("style");
  st.textContent =
    ".has-photo{background-image:var(--avimg)!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;color:transparent!important;font-size:0!important}" +
    "#pfAv{position:relative;cursor:pointer}" +
    "#pfAv .av-cam{position:absolute;right:-2px;bottom:-2px;width:32px;height:32px;border-radius:50%;background:var(--main,#0a3d91);border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px #0004}" +
    "#pfAv .av-cam svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    "#chat .m{position:relative}" +
    "#chat .m.avl{margin-left:32px}#chat .m.avr{margin-right:32px}" +
    "#chat .m.avl::before,#chat .m.avr::before{content:attr(data-ini);position:absolute;bottom:0;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;background-color:#e3ecfb;color:#0a3d91;background-size:cover;background-position:center;box-shadow:0 1px 4px #0003}" +
    "#chat .m.avl::before{left:-32px}#chat .m.avr::before{right:-32px}" +
    "#chat .m.avp::before{background-image:var(--avimg);color:transparent}";
  document.head.appendChild(st);

  /* ---------- Affichage ---------- */
  function setPhoto(el, id, kind) {
    var u = imgUrl(id, kind);
    if (u) { el.style.setProperty("--avimg", "url('" + u + "')"); el.classList.add("has-photo"); }
    else { el.style.removeProperty("--avimg"); el.classList.remove("has-photo"); }
  }
  function ensureBadge(pf) {
    if (pf.querySelector(".av-cam")) return;
    var s = document.createElement("span");
    s.className = "av-cam";
    s.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
    pf.appendChild(s);
  }
  function applyAll() {
    var m = myId(), pr = curPeer();
    var pf = $("pfAv");
    if (pf) { ensureBadge(pf); setPhoto(pf, m, "avatar"); }
    var pa = $("peerAv");
    if (pa) setPhoto(pa, pr && pr.id, "thumb");
    document.querySelectorAll("#recent .row").forEach(function (row) {
      var av = row.querySelector(".av"), rn = row.querySelector(".rn");
      if (!av || !rn) return;
      setPhoto(av, B[rn.textContent], "thumb");
    });
    var chat = $("chat");
    if (chat && pr && pr.id && visible("scrChat")) {
      chat.querySelectorAll(".m").forEach(function (b) {
        var mine = b.classList.contains("me");
        var id = mine ? m : pr.id;
        b.classList.add(mine ? "avr" : "avl");
        b.setAttribute("data-ini", ini(mine ? (N[m] || "Moi") : pr.pseudo));
        var u = imgUrl(id, "thumb");
        if (u) { b.style.setProperty("--avimg", "url('" + u + "')"); b.classList.add("avp"); }
        else { b.style.removeProperty("--avimg"); b.classList.remove("avp"); }
      });
    }
    var gm = $("gMsgs"), R = window.__tRows || {};
    if (gm && visible("scrGroup")) {
      gm.querySelectorAll(".m").forEach(function (b) {
        var row = R["g:" + b.dataset.mid];
        var mine = row ? row.sender === m : b.classList.contains("me");
        var id = mine ? m : (row && row.sender);
        b.classList.add(mine ? "avr" : "avl");
        b.setAttribute("data-ini", ini(N[id] || (mine ? "Moi" : "?")));
        var u = imgUrl(id, "thumb");
        if (u) { b.style.setProperty("--avimg", "url('" + u + "')"); b.classList.add("avp"); }
        else { b.style.removeProperty("--avimg"); b.classList.remove("avp"); }
      });
    }
  }

  /* ---------- Données (profils) ---------- */
  function merge(rows) {
    var ch = false;
    (rows || []).forEach(function (r) {
      var v = r.avatar_v || null;
      if (!P[r.id] || P[r.id].v !== v) { P[r.id] = { v: v }; ch = true; }
      if (r.pseudo) { B[r.pseudo] = r.id; N[r.id] = r.pseudo; }
    });
    save();
    return ch;
  }
  async function loadIds(ids) {
    var now = Date.now();
    ids = uniq(ids).filter(function (i) { return !seenI[i] || now - seenI[i] > 60000; });
    if (!ids.length || typeof api !== "function") return false;
    ids.forEach(function (i) { seenI[i] = now; });
    try { return merge(await api("/rest/v1/profiles?select=id,pseudo,avatar_v&id=in.(" + ids.join(",") + ")")); }
    catch (e) { return false; }
  }
  async function loadNames(names) {
    var now = Date.now();
    names = uniq(names).filter(function (n) { return !seenN[n] || now - seenN[n] > 60000; });
    if (!names.length || typeof api !== "function") return false;
    names.forEach(function (n) { seenN[n] = now; });
    var q = names.map(function (n) { return '"' + n.replace(/["\\]/g, "") + '"'; }).join(",");
    try { return merge(await api("/rest/v1/profiles?select=id,pseudo,avatar_v&pseudo=in.(" + encodeURIComponent(q) + ")")); }
    catch (e) { return false; }
  }
  async function refresh() {
    applyAll();
    var m = myId(), pr = curPeer(), ids = [], names = [];
    if (m) ids.push(m);
    if (pr && pr.id) ids.push(pr.id);
    var R = window.__tRows || {};
    Object.keys(R).forEach(function (k) { if (k.indexOf("g:") === 0 && R[k].sender) ids.push(R[k].sender); });
    document.querySelectorAll("#recent .rn").forEach(function (e) { var t = e.textContent; if (t && t !== "Inconnu") names.push(t); });
    var a = await loadIds(ids), b = await loadNames(names);
    if (a || b) applyAll();
  }
  function schedule() { clearTimeout(T); T = setTimeout(refresh, 120); }

  /* ---------- Envoi de la photo ---------- */
  function loadImg(file) {
    return new Promise(function (res, rej) {
      var u = window.URL.createObjectURL(file), i = new Image();
      i.onload = function () { window.URL.revokeObjectURL(u); res(i); };
      i.onerror = function () { rej(new Error("img")); };
      i.src = u;
    });
  }
  async function toJpeg(file, size, q) {
    var bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: "from-image" }); }
    catch (e) { bmp = await loadImg(file); }
    var w = bmp.width, h = bmp.height, s = Math.min(w, h);
    var c = document.createElement("canvas"); c.width = c.height = size;
    var x = c.getContext("2d"); x.imageSmoothingQuality = "high";
    x.fillStyle = "#fff"; x.fillRect(0, 0, size, size);
    x.drawImage(bmp, (w - s) / 2, (h - s) / 2, s, s, 0, 0, size, size);
    if (bmp.close) bmp.close();
    return new Promise(function (res, rej) {
      c.toBlob(function (b) { b ? res(b) : rej(new Error("blob")); }, "image/jpeg", q);
    });
  }
  async function up(id, kind, blob) {
    var r = await fetch(base() + "/storage/v1/object/avatars/" + id + "/" + kind + ".jpg", {
      method: "POST",
      headers: { apikey: key(), Authorization: "Bearer " + tok(), "Content-Type": "image/jpeg", "x-upsert": "true", "cache-control": "max-age=31536000" },
      body: blob
    });
    if (!r.ok) { var j = await r.json().catch(function () { return {}; }); throw new Error(j.message || j.error || ("HTTP " + r.status)); }
  }
  async function changePhoto(file) {
    var id = myId();
    if (!id || !tok()) { say(L("Connecte-toi d'abord", "Please log in first")); return; }
    if (file.size > 25 * 1024 * 1024) { say(L("Image trop lourde", "Image too large")); return; }
    busy = true;
    try {
      var big, small;
      try { big = await toJpeg(file, 512, 0.82); small = await toJpeg(file, 128, 0.8); }
      catch (e) { say(L("Image illisible", "Unreadable image")); return; }
      var left;
      try { left = await api("/rest/v1/rpc/avatar_consume", { method: "POST", body: "{}" }); }
      catch (e) {
        if (/LIMITE_AVATAR/.test(e.message)) say(L("Limite atteinte : " + LIMIT + " changements de photo par mois (forfait gratuit).", "Limit reached: " + LIMIT + " photo changes per month (free plan)."));
        else say(e.message);
        return;
      }
      say(L("Envoi de la photo…", "Uploading photo…"));
      try {
        await up(id, "avatar", big);
        await up(id, "thumb", small);
        var v = await api("/rest/v1/rpc/avatar_commit", { method: "POST", body: "{}" });
        P[id] = { v: Number(v) || Date.now() }; save(); applyAll();
        say(L("Photo mise à jour ✓ — il te reste " + left + "/" + LIMIT + " ce mois-ci", "Photo updated ✓ — " + left + "/" + LIMIT + " left this month"));
      } catch (e) { say(L("Échec de l'envoi : ", "Upload failed: ") + e.message); }
    } finally { busy = false; }
  }

  /* ---------- Initialisation ---------- */
  var inp = document.createElement("input");
  inp.type = "file"; inp.accept = "image/*"; inp.style.display = "none";
  document.body.appendChild(inp);
  inp.addEventListener("change", function () { var f = inp.files && inp.files[0]; inp.value = ""; if (f) changePhoto(f); });
  var pfa = $("pfAv");
  if (pfa) pfa.addEventListener("click", function () { if (!busy) inp.click(); });

  var mo = new MutationObserver(schedule);
  ["recent", "chat", "pfAv", "peerAv", "peerName"].forEach(function (id) {
    var e = $(id); if (e) mo.observe(e, { childList: true, characterData: true, subtree: true });
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) schedule(); });
  schedule();
})();
