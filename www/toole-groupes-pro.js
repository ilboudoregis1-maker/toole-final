/* TÕÕLé — Groupes : liste enrichie, fiche du groupe, @mentions, recherche, sondages, annonces */
(function () {
  "use strict";
  if (window.__gx) return; window.__gx = 1;
  var MK = { PL: "⁣PLX:", AN: "⁣ANX:", PV: "⁣PVX:" };
  var GX = { meta: {}, votes: [], members: [], roles: {}, mgid: null, groups: [], data: null, lastFetch: 0, busy: 0, myName: "", sq: "" };

  function $(id) { return document.getElementById(id); }
  function myId() { try { return me(); } catch (e) { return ""; } }
  function cur() { try { return typeof gCur !== "undefined" ? gCur : null; } catch (e) { return null; } }
  function role() { try { return typeof gRole !== "undefined" ? gRole : "membre"; } catch (e) { return "membre"; } }
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
  function tx(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function ini(n) { return String(n || "?").trim().slice(0, 2).toUpperCase(); }
  function hue(s) { var h = 0; s = String(s); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360; return h; }
  function say(m) { try { (window.toast || alert)(m); } catch (e) { } }
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>"; }
  var IC = {
    search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>'),
    add: svg('<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6"/>'),
    poll: svg('<path d="M5 20V10M12 20V4M19 20v-7"/>'),
    ann: svg('<path d="M4 10v4h3l7 4V6L7 10zM18 9a4 4 0 0 1 0 6"/>'),
    gear: svg('<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    x: svg('<path d="M6 6l12 12M18 6L6 18"/>')
  };
  function split(body) {
    body = String(body || "");
    for (var k in MK) { var i = body.indexOf(MK[k]); if (i > -1) { var d = {}; try { d = JSON.parse(body.slice(i + MK[k].length)); } catch (e) { } return { k: k, pre: body.slice(0, i).replace(/\s+$/, ""), d: d }; } }
    return null;
  }
  function seenKey(id) { return "gx:seen:" + id; }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }

  /* ---------- couche api : décode sondages / annonces / votes ---------- */
  var _api = window.api;
  window.api = function (path, opt) {
    var p = String(path), get = !opt || !opt.method || opt.method === "GET";
    var pr = _api.apply(this, arguments);
    if (!get) return pr;
    var isMsg = p.indexOf("/rest/v1/group_messages") === 0;
    var isList = isMsg && p.indexOf("group_id=eq.") > -1 && p.indexOf("order=created_at.asc") > -1;
    var isGroups = p.indexOf("/rest/v1/groups?select=id,name") === 0 && p.indexOf("order=created_at.desc") > -1 && p.indexOf("id=eq.") < 0;
    if (!isMsg && !isGroups) return pr;
    return Promise.resolve(pr).then(function (rows) {
      if (!Array.isArray(rows)) return rows;
      if (isGroups) { GX.groups = rows.slice(); return rows; }
      var out = [], votes = [], latest = "";
      rows.forEach(function (r) {
        if (r && r.created_at && r.created_at > latest) latest = r.created_at;
        var s = r && typeof r.body === "string" ? split(r.body) : null;
        if (!s) { out.push(r); return; }
        if (s.k === "PV") { votes.push({ s: r.sender, p: s.d.p, o: s.d.o }); return; }
        if (r.id != null) GX.meta[String(r.id)] = { k: s.k, d: s.d };
        out.push(Object.assign({}, r, { body: s.pre }));
      });
      if (isList) {
        GX.votes = votes;
        var m = /group_id=eq\.([^&]+)/.exec(p), g = cur();
        if (m && latest && g && String(g.id) === decodeURIComponent(m[1])) lsSet(seenKey(g.id), latest);
      }
      return out;
    });
  };

  /* ---------- messages : mentions, sondages, annonces ---------- */
  function bodyDiv(m) {
    var k = m.children;
    for (var i = 0; i < k.length; i++) { var c = k[i]; if (c.tagName === "DIV" && !c.className && c.childNodes.length === 1 && c.firstChild.nodeType === 3) return c; }
    return null;
  }
  function tally(mid) {
    var last = {}; GX.votes.forEach(function (v) { if (String(v.p) === String(mid)) last[v.s] = v; });
    var c = [], tot = 0, mine = -1, me0 = myId();
    Object.keys(last).forEach(function (s) { var o = +last[s].o; c[o] = (c[o] || 0) + 1; tot++; if (s === me0) mine = o; });
    return { c: c, tot: tot, mine: mine };
  }
  function pollCard(mid, d) {
    var card = el("div", "gx-poll"), t = tally(mid), opts = d.o || [];
    card.appendChild(el("div", "gx-pq", "📊 " + (d.q || "Sondage")));
    opts.forEach(function (o, i) {
      var n = t.c[i] || 0, pct = t.tot ? Math.round(n * 100 / t.tot) : 0;
      var r = el("button", "gx-po" + (t.mine === i ? " on" : "")); r.type = "button";
      var bar = el("i", "gx-pb"); bar.style.width = pct + "%";
      r.appendChild(bar); r.appendChild(el("span", "gx-pt", (t.mine === i ? "✓ " : "") + o)); r.appendChild(el("b", "gx-pn", n + (t.tot ? " · " + pct + "%" : "")));
      r.onclick = function (e) { e.stopPropagation(); vote(mid, i, card, d); };
      card.appendChild(r);
    });
    card.appendChild(el("div", "gx-pf", t.tot + " vote" + (t.tot > 1 ? "s" : "") + (t.mine < 0 ? " · touche pour voter" : " · touche pour changer")));
    return card;
  }
  function vote(mid, i, card, d) {
    var g = cur(); if (!g) return;
    GX.votes.push({ s: myId(), p: String(mid), o: i });
    var n = pollCard(mid, d); card.replaceWith(n);
    window.api("/rest/v1/group_messages", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ group_id: g.id, sender: myId(), body: "🗳️ vote" + MK.PV + JSON.stringify({ p: String(mid), o: i }) }) })
      .catch(function (e) { say((e && e.message) || "Vote non envoyé"); });
  }
  function mentionize(b, m) {
    var t = b.textContent, re = /(^|\s)@([^\s@.,;:!?()]+)/g, last = 0, f = document.createDocumentFragment(), hit = false, mine = false, r;
    while ((r = re.exec(t))) {
      hit = true;
      f.appendChild(document.createTextNode(t.slice(last, r.index) + r[1]));
      f.appendChild(el("span", "gx-mn", "@" + r[2]));
      if (GX.myName && tx(r[2]) === tx(GX.myName)) mine = true;
      last = r.index + r[0].length;
    }
    if (!hit) return;
    f.appendChild(document.createTextNode(t.slice(last)));
    b.textContent = ""; b.appendChild(f);
    if (mine) m.classList.add("gx-me");
  }
  function proc() {
    var box = $("gMsgs"); if (!box) return;
    [].forEach.call(box.querySelectorAll(".m[data-mid]"), function (m) {
      if (m.dataset.gx === "1") return;
      var meta = GX.meta[m.dataset.mid], b = bodyDiv(m);
      if (meta && b) {
        if (meta.k === "PL") { m.dataset.gx = "1"; m.classList.add("gx-polm"); b.replaceWith(pollCard(m.dataset.mid, meta.d)); return; }
        if (meta.k === "AN") {
          m.dataset.gx = "1"; m.classList.add("gx-annm");
          var txt = b.textContent.replace(/^📢\s*/, "");
          var c = el("div", "gx-ann"); c.appendChild(el("div", "gx-al", "📢 Annonce")); c.appendChild(el("div", "gx-at", txt));
          b.replaceWith(c); return;
        }
      }
      if (b && b.textContent.indexOf("@") > -1) mentionize(b, m);
      m.dataset.gx = "1";
    });
    applySearch();
  }
  var q1 = 0;
  function soon() { if (q1) return; q1 = 1; requestAnimationFrame(function () { q1 = 0; try { proc(); } catch (e) { } }); }

  /* ---------- recherche ---------- */
  function applySearch() {
    var box = $("gMsgs"); if (!box) return;
    var q = tx(GX.sq).trim(), n = 0;
    [].forEach.call(box.querySelectorAll(".m"), function (m) {
      var ok = !q || tx(m.textContent).indexOf(q) > -1;
      m.style.display = ok ? "" : "none"; if (q && ok) n++;
    });
    var c = $("gxCount"); if (c) c.textContent = q ? n + " résultat" + (n > 1 ? "s" : "") : "";
  }
  function toggleSearch(force) {
    var sb = $("gxSb"); if (!sb) return;
    var open = force != null ? force : sb.style.display === "none";
    sb.style.display = open ? "flex" : "none";
    var i = $("gxSi");
    if (open) { if (i) i.focus(); } else { GX.sq = ""; if (i) i.value = ""; applySearch(); }
  }

  /* ---------- membres + @mentions ---------- */
  function loadMembers(cb) {
    var g = cur(); if (!g) return; var id = g.id; GX.mgid = id;
    window.api("/rest/v1/group_members?select=user_id,role&group_id=eq." + id).then(function (rows) {
      GX.roles = {}; rows.forEach(function (r) { GX.roles[r.user_id] = r.role || "membre"; });
      var ids = rows.map(function (r) { return r.user_id; });
      if (!ids.length) { GX.members = []; return; }
      return window.api("/rest/v1/profiles?select=id,pseudo&id=in.(" + ids.join(",") + ")").then(function (pr) {
        GX.members = pr.map(function (p) { return { id: p.id, pseudo: p.pseudo || "?" }; });
        if (cb) cb();
      });
    }).catch(function () { });
  }
  function popEl() {
    var p = $("gxPop"); if (p) return p;
    p = el("div", "gx-pop"); p.id = "gxPop"; p.style.display = "none"; document.body.appendChild(p); return p;
  }
  function hidePop() { var p = $("gxPop"); if (p) p.style.display = "none"; }
  function mentionCheck(inp) {
    var v = inp.value, pos = inp.selectionStart == null ? v.length : inp.selectionStart;
    var m = /(^|\s)@([^\s@]*)$/.exec(v.slice(0, pos));
    if (!m) { hidePop(); return; }
    if (!GX.members.length) { loadMembers(function () { mentionCheck(inp); }); return; }
    var q = tx(m[2]), me0 = myId();
    var list = GX.members.filter(function (u) { return u.id !== me0 && tx(u.pseudo).indexOf(q) > -1; })
      .sort(function (a, b) { return (tx(a.pseudo).indexOf(q) === 0 ? 0 : 1) - (tx(b.pseudo).indexOf(q) === 0 ? 0 : 1); }).slice(0, 5);
    if (!list.length) { hidePop(); return; }
    var p = popEl(); p.innerHTML = "";
    list.forEach(function (u) {
      var r = el("div", "gx-pi"), a = el("span", "gx-pa", ini(u.pseudo)); a.style.background = "hsl(" + hue(u.pseudo) + " 55% 46%)";
      r.appendChild(a); r.appendChild(el("span", "", u.pseudo));
      r.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        var before = v.slice(0, pos).replace(/@[^\s@]*$/, "@" + u.pseudo + " "), after = v.slice(pos);
        inp.value = before + after; var c = before.length;
        try { inp.setSelectionRange(c, c); } catch (x) { }
        inp.dispatchEvent(new Event("input", { bubbles: true })); hidePop(); inp.focus();
      });
      p.appendChild(r);
    });
    var bar = inp.closest(".bar"), rc = bar ? bar.getBoundingClientRect() : null;
    p.style.bottom = (rc ? Math.max(8, window.innerHeight - rc.top + 6) : 70) + "px";
    p.style.display = "block";
  }
  document.addEventListener("input", function (e) { if (e.target && e.target.id === "gTxt") mentionCheck(e.target); }, true);
  document.addEventListener("click", function (e) { if (!e.target.closest || !e.target.closest("#gxPop,#gTxt")) hidePop(); }, true);

  /* ---------- feuilles : fiche, composition ---------- */
  function overlay() {
    var ov = el("div", "gx-ov"), sh = el("div", "gx-sh");
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.appendChild(sh); document.body.appendChild(ov);
    sh.appendChild(el("div", "gx-grab"));
    return { ov: ov, sh: sh };
  }
  function canManage() { var r = role(); return r === "admin" || r === "moderateur"; }
  function openFiche() {
    var g = cur(); if (!g) return;
    var o = overlay(), sh = o.sh, name = g.name || "Groupe";
    var av = el("div", "gx-big", ini(name)); av.style.background = "hsl(" + hue(name) + " 55% 46%)"; sh.appendChild(av);
    sh.appendChild(el("div", "gx-name", name));
    var sub = el("div", "gx-sub", "Groupe"); sh.appendChild(sub);
    var desc = (typeof gInfo !== "undefined" && gInfo && gInfo.description) || g.description || "";
    if (desc) sh.appendChild(el("div", "gx-desc", desc));
    var acts = el("div", "gx-acts");
    function act(ic, lb, fn) { var b = el("button", "gx-act"); b.type = "button"; b.innerHTML = '<i>' + ic + "</i><span>" + lb + "</span>"; b.onclick = function () { o.ov.remove(); fn(); }; acts.appendChild(b); }
    act(IC.search, "Rechercher", function () { toggleSearch(true); });
    act(IC.add, "Ajouter", function () { if (typeof addMembers === "function") addMembers(); });
    act(IC.poll, "Sondage", function () { compose("poll"); });
    if (canManage()) act(IC.ann, "Annonce", function () { compose("ann"); });
    if (canManage()) act(IC.gear, "Réglages", function () { if (typeof openGroupSettings === "function") openGroupSettings(); });
    sh.appendChild(acts);
    var code = (typeof gInfo !== "undefined" && gInfo && gInfo.invite_code) || g.invite_code;
    if (code) {
      var cr = el("div", "gx-row"); cr.appendChild(el("span", "", "Code d'invitation")); var cb = el("button", "gx-mini", code); cb.type = "button";
      cb.onclick = function () { try { navigator.clipboard.writeText(code); say("Code copié"); } catch (e) { say(code); } };
      cr.appendChild(cb); sh.appendChild(cr);
    }
    var mh = el("div", "gx-mh", "Membres"); sh.appendChild(mh);
    var ml = el("div", "gx-ml"); ml.appendChild(el("div", "gx-sub", "Chargement…")); sh.appendChild(ml);
    function paint() {
      ml.innerHTML = ""; mh.textContent = "Membres (" + GX.members.length + ")"; sub.textContent = "Groupe · " + GX.members.length + " membre" + (GX.members.length > 1 ? "s" : "");
      var order = { admin: 0, moderateur: 1, membre: 2 }, me0 = myId();
      GX.members.slice().sort(function (a, b) {
        var ra = a.id === g.created_by ? -1 : (order[GX.roles[a.id]] != null ? order[GX.roles[a.id]] : 2), rb = b.id === g.created_by ? -1 : (order[GX.roles[b.id]] != null ? order[GX.roles[b.id]] : 2);
        return ra - rb || a.pseudo.localeCompare(b.pseudo);
      }).forEach(function (u) {
        var r = el("div", "gx-mem"), a = el("span", "gx-pa big", ini(u.pseudo)); a.style.background = "hsl(" + hue(u.pseudo) + " 55% 46%)";
        r.appendChild(a); r.appendChild(el("span", "gx-mn2", u.pseudo + (u.id === me0 ? " (toi)" : "")));
        var rl = u.id === g.created_by ? "Créateur" : GX.roles[u.id] === "admin" ? "Admin" : GX.roles[u.id] === "moderateur" ? "Modérateur" : "";
        if (rl) r.appendChild(el("em", "gx-role", rl));
        ml.appendChild(r);
      });
    }
    loadMembers(paint); if (GX.members.length) paint();
    var mine = g.created_by === myId();
    var d = el("button", "gx-danger", mine ? "Supprimer le groupe" : "Quitter le groupe"); d.type = "button";
    d.onclick = function () { o.ov.remove(); if (mine) { if (typeof deleteGroup === "function") deleteGroup(); } else if (typeof leaveGroup === "function") leaveGroup(); };
    sh.appendChild(d);
  }
  function post(body) {
    var g = cur(); if (!g) return Promise.reject(new Error("Groupe introuvable"));
    return window.api("/rest/v1/group_messages", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ group_id: g.id, sender: myId(), body: body }) });
  }
  function compose(kind) {
    var g = cur(); if (!g) return;
    if (kind === "ann" && !canManage()) { say("Seuls les admins et modérateurs peuvent faire une annonce"); return; }
    if (typeof gInfo !== "undefined" && gInfo && gInfo.only_admins_post && role() !== "admin") { say("Seuls les admins peuvent écrire ici"); return; }
    var o = overlay(), sh = o.sh;
    sh.appendChild(el("div", "gx-title", kind === "poll" ? "Nouveau sondage" : "Nouvelle annonce"));
    var send = el("button", "gx-send", kind === "poll" ? "Envoyer le sondage" : "Publier l'annonce"); send.type = "button";
    if (kind === "poll") {
      var q = el("input", "gx-in"); q.placeholder = "Ta question"; q.maxLength = 120; sh.appendChild(q);
      var wrap = el("div", ""), ins = [];
      function addOpt() { if (ins.length >= 5) return; var i = el("input", "gx-in"); i.placeholder = "Option " + (ins.length + 1); i.maxLength = 60; ins.push(i); wrap.appendChild(i); }
      addOpt(); addOpt(); sh.appendChild(wrap);
      var more = el("button", "gx-mini2", "+ Ajouter une option"); more.type = "button"; more.onclick = function () { addOpt(); if (ins.length >= 5) more.style.display = "none"; }; sh.appendChild(more);
      send.onclick = function () {
        var qq = q.value.trim(), opts = ins.map(function (i) { return i.value.trim(); }).filter(Boolean);
        if (!qq) { say("Écris une question"); return; } if (opts.length < 2) { say("Mets au moins 2 options"); return; }
        send.disabled = true;
        post("📊 " + qq + "\n" + opts.map(function (x) { return "▫ " + x; }).join("\n") + MK.PL + JSON.stringify({ q: qq, o: opts }))
          .then(function () { o.ov.remove(); if (typeof loadGroupMsgs === "function") loadGroupMsgs(); })
          .catch(function (e) { send.disabled = false; say((e && e.message) || "Envoi impossible"); });
      };
    } else {
      var t = el("textarea", "gx-in gx-ta"); t.placeholder = "Écris ton annonce (elle sera épinglée en haut)"; t.maxLength = 500; sh.appendChild(t);
      send.onclick = function () {
        var v = t.value.trim(); if (!v) { say("Écris ton annonce"); return; }
        send.disabled = true;
        post("📢 " + v + MK.AN + "{}").then(function (r) {
          var id = r && r[0] && r[0].id;
          if (id) return window.api("/rest/v1/groups?id=eq." + g.id, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ pinned_message_id: id }) }).catch(function () { });
        }).then(function () {
          o.ov.remove(); if (typeof refreshGroupInfo === "function") { try { refreshGroupInfo(); } catch (e) { } }
          if (typeof loadGroupMsgs === "function") loadGroupMsgs();
        }).catch(function (e) { send.disabled = false; say((e && e.message) || "Envoi impossible"); });
      };
    }
    sh.appendChild(send);
    var cc = el("button", "gx-cancel", "Annuler"); cc.type = "button"; cc.onclick = function () { o.ov.remove(); }; sh.appendChild(cc);
  }
  function plusMenu() {
    var o = overlay(), sh = o.sh;
    function item(ic, lb, fn) { var b = el("button", "gx-item"); b.type = "button"; b.innerHTML = "<i>" + ic + "</i><span>" + lb + "</span>"; b.onclick = function () { o.ov.remove(); fn(); }; sh.appendChild(b); }
    item(IC.poll, "Sondage", function () { compose("poll"); });
    if (canManage()) item(IC.ann, "Annonce épinglée", function () { compose("ann"); });
    item(IC.search, "Rechercher dans le groupe", function () { toggleSearch(true); });
  }

  /* ---------- interface du groupe ---------- */
  function ensureUI() {
    var scr = $("scrGroup"); if (!scr) return;
    var hdr = scr.querySelector(".hdr"), menu = $("gMenu");
    if (hdr && menu && !$("gxSbBtn")) {
      var b = el("span", "ic gx-hb"); b.id = "gxSbBtn"; b.setAttribute("aria-label", "Rechercher"); b.innerHTML = IC.search; b.onclick = function () { toggleSearch(); };
      menu.before(b);
    }
    if (hdr && !$("gxSb")) {
      var sb = el("div", "gx-sb"); sb.id = "gxSb"; sb.style.display = "none";
      var i = el("input"); i.id = "gxSi"; i.placeholder = "Rechercher dans le groupe"; i.type = "search";
      i.oninput = function () { GX.sq = i.value; applySearch(); };
      var c = el("span", "gx-cnt"); c.id = "gxCount";
      var x = el("button", "gx-x"); x.type = "button"; x.innerHTML = IC.x; x.onclick = function () { toggleSearch(false); };
      sb.appendChild(i); sb.appendChild(c); sb.appendChild(x); hdr.after(sb);
    }
    var bar = scr.querySelector(".bar");
    if (bar && !$("gxPlus")) {
      var p = el("button", "gx-plus"); p.id = "gxPlus"; p.type = "button"; p.setAttribute("aria-label", "Plus"); p.innerHTML = IC.plus; p.onclick = plusMenu;
      bar.insertBefore(p, bar.firstChild);
    }
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("#gTt,#gSub") : null;
    if (t && cur()) openFiche();
  }, true);

  /* ---------- liste des groupes ---------- */
  function listRows() { var r = $("gRows"); return r ? [].slice.call(r.children).filter(function (c) { return c.classList.contains("sx-row"); }) : []; }
  function groupFor(row, i) {
    var n = row.querySelector(".sx-n"), name = n ? (n.dataset.gname || n.textContent) : "";
    if (n && !n.dataset.gname) n.dataset.gname = name;
    var g = GX.groups[i]; if (g && (g.name === name || name.indexOf(g.name) === 0)) return g;
    for (var k = 0; k < GX.groups.length; k++) if (GX.groups[k].name === name || name.indexOf(GX.groups[k].name) === 0) return GX.groups[k];
    return null;
  }
  function fmtTime(iso) {
    var d = new Date(iso), n = new Date();
    if (d.toDateString() === n.toDateString()) return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    var y = new Date(n.getTime() - 864e5); if (d.toDateString() === y.toDateString()) return "Hier";
    return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
  }
  function preview(b) {
    b = String(b || ""); if (b.indexOf("📷") === 0) return "📷 Photo";
    if (b === "(vocal)") return "🎤 Vocal";
    return b.split("\n")[0].replace(/\s+/g, " ").trim().slice(0, 60);
  }
  function fetchList(done) {
    var now = Date.now();
    if (GX.data && now - GX.lastFetch < 12000) { done(); return; }
    if (GX.busy) return; GX.busy = 1; GX.lastFetch = now;
    Promise.all([
      window.api("/rest/v1/group_messages?select=group_id,sender,body,created_at&order=created_at.desc&limit=400"),
      window.api("/rest/v1/group_members?select=group_id")
    ]).then(function (res) {
      var msgs = res[0] || [], mem = res[1] || [], me0 = myId(), last = {}, unread = {}, count = {}, latest = {};
      mem.forEach(function (m) { count[m.group_id] = (count[m.group_id] || 0) + 1; });
      msgs.forEach(function (m) { if (!last[m.group_id]) last[m.group_id] = m; if (!latest[m.group_id] || m.created_at > latest[m.group_id]) latest[m.group_id] = m.created_at; });
      Object.keys(latest).forEach(function (gid) {
        var seen = lsGet(seenKey(gid)); if (!seen) { lsSet(seenKey(gid), latest[gid]); seen = latest[gid]; }
        var n = 0; msgs.forEach(function (m) { if (String(m.group_id) === gid && m.sender !== me0 && m.created_at > seen) n++; }); unread[gid] = n;
      });
      var ids = []; Object.keys(last).forEach(function (g) { var s = last[g].sender; if (s && s !== me0 && ids.indexOf(s) < 0) ids.push(s); });
      var pr = ids.length ? window.api("/rest/v1/profiles?select=id,pseudo&id=in.(" + ids.join(",") + ")").catch(function () { return []; }) : Promise.resolve([]);
      return pr.then(function (ps) { var names = {}; (ps || []).forEach(function (p) { names[p.id] = p.pseudo; }); GX.data = { last: last, unread: unread, count: count, names: names }; });
    }).catch(function () { }).then(function () { GX.busy = 0; done(); });
  }
  function paintList() {
    var rows = listRows(); if (!rows.length || !GX.groups.length || !GX.data) return;
    var D = GX.data, me0 = myId(), items = [];
    rows.forEach(function (row, i) {
      var g = groupFor(row, i); if (!g) { items.push({ row: row, t: "" }); return; }
      var l = D.last[g.id], s = row.querySelector(".sx-s"), txt;
      if (l) txt = (l.sender === me0 ? "Toi : " : (D.names[l.sender] ? D.names[l.sender] + " : " : "")) + preview(l.body);
      else txt = (D.count[g.id] ? D.count[g.id] + " membre" + (D.count[g.id] > 1 ? "s" : "") : "Aucun message");
      if (s && s.textContent !== txt) s.textContent = txt;
      var sig = (l ? l.created_at : "") + "|" + (D.unread[g.id] || 0), meta = row.querySelector(".gx-meta");
      if (!meta) { meta = el("div", "gx-meta"); row.appendChild(meta); }
      if (meta.dataset.sig !== sig) {
        meta.dataset.sig = sig; meta.innerHTML = "";
        if (l) meta.appendChild(el("span", "gx-time" + (D.unread[g.id] ? " on" : ""), fmtTime(l.created_at)));
        if (D.unread[g.id]) meta.appendChild(el("span", "gx-badge", D.unread[g.id] > 99 ? "99+" : String(D.unread[g.id])));
      }
      items.push({ row: row, t: l ? l.created_at : "" });
    });
    var sorted = items.slice().sort(function (a, b) { return a.t < b.t ? 1 : a.t > b.t ? -1 : 0; });
    var same = sorted.every(function (x, i) { return x.row === items[i].row; });
    if (!same) { var box = $("gRows"); sorted.forEach(function (x) { box.appendChild(x.row); }); }
  }
  var q2 = 0;
  function listSoon() { if (q2) return; q2 = 1; setTimeout(function () { q2 = 0; if (!listRows().length) return; fetchList(paintList); }, 120); }

  /* ---------- démarrage ---------- */
  function boot() {
    var m = $("gMsgs"); if (m && !m._gxo) { m._gxo = 1; new MutationObserver(soon).observe(m, { childList: true }); }
    var r = $("gRows"); if (r && !r._gxo) { r._gxo = 1; new MutationObserver(listSoon).observe(r, { childList: true }); }
  }
  setInterval(function () {
    try {
      boot(); ensureUI(); soon();
      var g = cur();
      if (g && String(g.id) !== String(GX.mgid)) { GX.members = []; loadMembers(); toggleSearch(false); }
      if (!g) GX.mgid = null;
      if (!GX.myName && myId()) { GX.myName = "?"; window.api("/rest/v1/profiles?select=pseudo&id=eq." + myId()).then(function (r) { GX.myName = (r && r[0] && r[0].pseudo) || ""; }).catch(function () { GX.myName = ""; }); }
      if (listRows().length && !GX.data) listSoon();
    } catch (e) { }
  }, 700);

  /* ---------- styles (sobre, type WhatsApp) ---------- */
  var css = document.createElement("style");
  css.textContent = [
    /* liste */
    "html body #gRows.sx-card{background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important}",
    "html body #gRows .sx-row{display:flex!important;align-items:center;gap:14px;min-height:70px;margin:0!important;padding:10px 16px!important;border:0!important;border-bottom:1px solid #eef1f5!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}",
    "html body #gRows .sx-row .sx-av{flex:0 0 52px;width:52px!important;height:52px!important;border-radius:50%!important;display:flex!important;align-items:center;justify-content:center;font-size:17px;font-weight:700;box-shadow:none!important}",
    "html body #gRows .sx-row .sx-t{flex:1 1 auto;min-width:0}",
    "html body #gRows .sx-row .sx-n{font-size:16.5px!important;font-weight:600!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    "html body #gRows .sx-row .sx-s{font-size:14px!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}",
    ".gx-meta{flex:0 0 auto;display:flex;flex-direction:column;align-items:flex-end;gap:5px;min-width:44px}",
    ".gx-time{font-size:12px;color:#8a94a6}.gx-time.on{color:#0a7cff;font-weight:600}",
    ".gx-badge{min-width:20px;height:20px;padding:0 6px;border-radius:10px;background:#0a7cff;color:#fff;font:700 12px system-ui,sans-serif;display:flex;align-items:center;justify-content:center;box-sizing:border-box}",
    /* en-tête + recherche + barre */
    "#scrGroup #gTt,#scrGroup #gSub{cursor:pointer}",
    ".gx-hb{display:flex;align-items:center;justify-content:center;width:38px;height:38px;cursor:pointer}.gx-hb svg{width:22px;height:22px}",
    ".gx-sb{display:flex;align-items:center;gap:8px;padding:8px 12px;background:#f0f2f5;border-bottom:1px solid #e3e8ef}",
    ".gx-sb input{flex:1;min-width:0;height:38px;border:0;border-radius:19px;padding:0 14px;background:#fff;font:inherit;font-size:15px;color:#0b2a3a;outline:0}",
    ".gx-cnt{font-size:12px;color:#667;white-space:nowrap}",
    ".gx-x{width:34px;height:34px;border:0;background:none;color:#445;padding:0}.gx-x svg{width:20px;height:20px}",
    ".gx-plus{flex:0 0 40px;width:40px;height:40px;border-radius:50%;border:0;background:transparent;color:#0a7cff;padding:0;display:flex;align-items:center;justify-content:center}.gx-plus svg{width:26px;height:26px}",
    /* messages */
    "#gMsgs .m{-webkit-touch-callout:none}",
    ".gx-mn{font-weight:700;color:#0a7cff}#gMsgs .m.me .gx-mn{color:#fff;text-decoration:underline}",
    "#gMsgs .m.gx-me{box-shadow:inset 3px 0 0 #f2a900}",
    ".gx-poll{min-width:230px;max-width:100%}.gx-pq{font-weight:700;font-size:15px;margin-bottom:8px;white-space:pre-wrap}",
    ".gx-po{position:relative;display:flex;align-items:center;gap:8px;width:100%;margin:5px 0;padding:9px 11px;border:1px solid rgba(10,124,255,.35);border-radius:12px;background:rgba(10,124,255,.06);color:inherit;font:inherit;font-size:14px;text-align:left;overflow:hidden}",
    ".gx-po.on{border-color:#0a7cff;font-weight:600}.gx-pb{position:absolute;left:0;top:0;bottom:0;background:rgba(10,124,255,.18);transition:width .3s}",
    "#gMsgs .m.me .gx-po{border-color:rgba(255,255,255,.55);background:rgba(255,255,255,.12)}#gMsgs .m.me .gx-pb{background:rgba(255,255,255,.28)}",
    ".gx-pt{position:relative;flex:1;min-width:0}.gx-pn{position:relative;font-size:12px;font-weight:600;opacity:.85}",
    ".gx-pf{font-size:11.5px;opacity:.7;margin-top:4px}",
    "#gMsgs .m.gx-annm{align-self:center!important;max-width:92%!important;width:92%;background:#fff8e1!important;color:#4a3b00!important;border:1px solid #f2d27a!important;box-shadow:none!important;border-radius:14px!important}",
    ".gx-al{font-size:12px;font-weight:700;color:#a87400;margin-bottom:3px}.gx-at{font-size:15px;white-space:pre-wrap}",
    "#gMsgs .m.gx-annm .gn{display:none}#gMsgs .m.gx-annm .t{color:#a87400!important}",
    /* @mention */
    ".gx-pop{position:fixed;left:10px;right:10px;z-index:100005;background:#fff;border-radius:14px;box-shadow:0 6px 28px rgba(0,0,0,.2);overflow:hidden}",
    ".gx-pi{display:flex;align-items:center;gap:10px;padding:9px 14px;font-size:15px;color:#0b2a3a}.gx-pi+.gx-pi{border-top:1px solid #eef1f5}",
    ".gx-pa{flex:0 0 30px;width:30px;height:30px;border-radius:50%;color:#fff;font:700 12px system-ui,sans-serif;display:flex;align-items:center;justify-content:center}.gx-pa.big{flex-basis:42px;width:42px;height:42px;font-size:14px}",
    /* feuilles */
    ".gx-ov{position:fixed;inset:0;z-index:100010;background:rgba(0,0,0,.45);display:flex;align-items:flex-end}",
    ".gx-sh{width:100%;max-height:90vh;overflow-y:auto;background:#fff;color:#0b2a3a;border-radius:22px 22px 0 0;padding:10px 18px calc(env(safe-area-inset-bottom,0px) + 18px);box-sizing:border-box;font-family:inherit}",
    ".gx-grab{width:40px;height:4px;border-radius:2px;background:#d5dbe3;margin:0 auto 14px}",
    ".gx-big{width:84px;height:84px;border-radius:50%;margin:4px auto 10px;color:#fff;font:700 28px system-ui,sans-serif;display:flex;align-items:center;justify-content:center}",
    ".gx-name{text-align:center;font-size:21px;font-weight:700}.gx-sub{text-align:center;font-size:14px;color:#667;margin-top:2px}",
    ".gx-desc{text-align:center;font-size:14.5px;color:#334;margin:12px 6px 0;white-space:pre-wrap}",
    ".gx-acts{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin:18px 0 6px}",
    ".gx-act{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:68px;padding:10px 6px;border:1px solid #e3e8ef;border-radius:14px;background:#fff;color:#0a7cff;font-size:12px}.gx-act i{display:block;width:24px;height:24px}.gx-act svg{width:24px;height:24px}.gx-act span{color:#0b2a3a}",
    ".gx-row{display:flex;align-items:center;justify-content:space-between;padding:12px 4px;margin-top:6px;border-top:1px solid #eef1f5;font-size:15px}",
    ".gx-mini{border:0;background:#eaf3ff;color:#0a7cff;font:700 14px system-ui,sans-serif;padding:7px 12px;border-radius:10px;letter-spacing:.04em}",
    ".gx-mh{margin:16px 4px 4px;font-size:13px;font-weight:700;color:#0a7cff}",
    ".gx-mem{display:flex;align-items:center;gap:12px;padding:8px 4px}.gx-mn2{flex:1;min-width:0;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".gx-role{font-style:normal;font-size:11.5px;color:#0a7cff;border:1px solid rgba(10,124,255,.4);border-radius:8px;padding:2px 7px}",
    ".gx-danger{display:block;width:100%;margin-top:16px;padding:13px;border:0;border-radius:12px;background:#fdecec;color:#d12c2c;font:600 15px system-ui,sans-serif}",
    ".gx-title{font-size:18px;font-weight:700;margin:2px 2px 12px}",
    ".gx-in{display:block;width:100%;box-sizing:border-box;margin:0 0 8px;padding:12px 14px;border:1px solid #dfe6f0;border-radius:12px;background:#fff;color:#0b2a3a;font:inherit;font-size:15px;outline:0}.gx-ta{min-height:110px;resize:none}",
    ".gx-mini2{border:0;background:none;color:#0a7cff;font:600 14px system-ui,sans-serif;padding:6px 2px}",
    ".gx-send{display:block;width:100%;margin-top:10px;padding:13px;border:0;border-radius:12px;background:#0a7cff;color:#fff;font:700 15px system-ui,sans-serif}.gx-send:disabled{opacity:.6}",
    ".gx-cancel{display:block;width:100%;margin-top:6px;padding:12px;border:0;background:none;color:#667;font:600 15px system-ui,sans-serif}",
    ".gx-item{display:flex;align-items:center;gap:14px;width:100%;padding:14px 6px;border:0;border-bottom:1px solid #eef1f5;background:none;color:#0b2a3a;font-size:16px;text-align:left}.gx-item i{display:block;width:24px;height:24px;color:#0a7cff}.gx-item svg{width:24px;height:24px}"
  ].join("\n");
  document.head.appendChild(css);
})();
