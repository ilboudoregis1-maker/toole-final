/* TÕÕLé – Sujets de conversation pilotés depuis « Contrôle » (table Supabase sujets_ctl).
   Le losange ✦ de la discussion ouvre ce panneau : thèmes, recherche, au hasard.
   Toucher un sujet le place dans le champ de message (rien n’est envoyé tout seul).
   Si la table est vide ou injoignable sans cache, on retombe sur les idées classiques. */
(function () {
  "use strict";
  if (window.__tsc) return; window.__tsc = 1;
  var D = document, CK = "toole_sujets_ctl_v1";
  var S = { rows: null, theme: "*", q: "", pick: null, root: null };

  function en() { try { return localStorage.getItem("toole_lang") === "en"; } catch (e) { return false; } }
  function T(fr, e) { return en() ? e : fr; }
  function A() { return window.api || (typeof api === "function" ? api : null); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function txt(r) { return (en() && r.texte_en) ? r.texte_en : r.texte; }
  function hue(s) { var h = 0, i; s = String(s); for (i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360; return h; }

  function loadCache() { try { var j = JSON.parse(localStorage.getItem(CK)); if (Array.isArray(j)) S.rows = j; } catch (e) { } }
  function fetchRows() {
    var f = A(); if (!f) return Promise.resolve(false);
    var p; try { p = f("/rest/v1/sujets_ctl?select=id,theme,theme_emoji,theme_ordre,texte,texte_en,ordre&actif=eq.true&order=theme_ordre.asc,ordre.asc,id.asc&limit=1000"); } catch (e) { return Promise.resolve(false); }
    return Promise.resolve(p).then(function (r) {
      if (!Array.isArray(r)) return false;           /* erreur serveur : on garde le cache */
      S.rows = r; try { localStorage.setItem(CK, JSON.stringify(r)); } catch (e) { }
      return true;
    }).catch(function () { return false; });
  }

  function themes() {
    var out = [], seen = {};
    (S.rows || []).forEach(function (r) {
      if (!seen[r.theme]) { seen[r.theme] = { n: r.theme, e: r.theme_emoji || "💬", c: 0 }; out.push(seen[r.theme]); }
      seen[r.theme].c++;
    });
    return out;
  }
  function filtered() {
    var q = S.q.trim().toLowerCase();
    return (S.rows || []).filter(function (r) {
      if (S.theme !== "*" && r.theme !== S.theme) return false;
      return !q || (txt(r) + " " + r.theme).toLowerCase().indexOf(q) > -1;
    });
  }

  function card(r, feat) {
    var h = hue(r.theme);
    return '<button type="button" class="tsc-card' + (feat ? " feat" : "") + '" data-a="use" data-id="' + r.id + '" style="--h:' + h + '">' +
      '<span class="tsc-th">' + esc(r.theme_emoji || "💬") + " " + esc(r.theme) + "</span>" +
      '<span class="tsc-tx">' + esc(txt(r)) + "</span></button>";
  }

  function draw() {
    if (!S.root) return;
    var ths = themes(), list = filtered(), h = "";
    h += '<div class="tsc-top"><b>' + T("SUJETS", "TOPICS") + '</b><span>' + (S.rows ? S.rows.length : 0) + " " + T("idées", "ideas") + '</span><button type="button" class="tsc-x" data-a="close" aria-label="Fermer">✕</button></div>';
    h += '<input class="tsc-q" id="tscQ" type="search" placeholder="' + T("Rechercher un sujet…", "Search a topic…") + '" value="' + esc(S.q) + '" autocomplete="off">';
    h += '<div class="tsc-chips"><button type="button" data-a="th" data-v="*" class="' + (S.theme === "*" ? "on" : "") + '">' + T("Tous", "All") + "</button>" +
      ths.map(function (t) { return '<button type="button" data-a="th" data-v="' + esc(t.n) + '" class="' + (S.theme === t.n ? "on" : "") + '">' + esc(t.e) + " " + esc(t.n) + " <i>" + t.c + "</i></button>"; }).join("") + "</div>";
    if (S.pick) {
      var pr = (S.rows || []).filter(function (r) { return r.id === S.pick; })[0];
      if (pr) h += '<div class="tsc-feat">' + card(pr, true) + '<div class="tsc-act"><button type="button" class="tsc-go" data-a="use" data-id="' + pr.id + '">' + T("Utiliser", "Use") + '</button><button type="button" class="tsc-alt" data-a="rnd">↻ ' + T("Autre idée", "Another") + "</button></div></div>";
    }
    h += '<div class="tsc-list">' + (list.length ? list.map(function (r) { return card(r); }).join("") : '<div class="tsc-empty">' + T("Aucun sujet trouvé.", "No topic found.") + "</div>") + "</div>";
    h += '<div class="tsc-foot"><button type="button" data-a="rnd">🎲 ' + T("Au hasard", "Random") + '</button><button type="button" data-a="old">' + T("Idées classiques", "Classic ideas") + "</button></div>";
    var keep = S.root.querySelector("#tscQ"), had = keep && D.activeElement === keep, pos = had ? keep.selectionStart : 0;
    S.root.innerHTML = h;
    var q = S.root.querySelector("#tscQ");
    q.oninput = function () { S.q = q.value; S.pick = null; redrawList(); };
    if (had) { q.focus(); try { q.setSelectionRange(pos, pos); } catch (e) { } }
  }
  /* pendant la frappe on ne redessine que la liste, pour garder le clavier ouvert */
  function redrawList() {
    var l = S.root.querySelector(".tsc-list"), list = filtered();
    if (!l) return draw();
    l.innerHTML = list.length ? list.map(function (r) { return card(r); }).join("") : '<div class="tsc-empty">' + T("Aucun sujet trouvé.", "No topic found.") + "</div>";
    var f = S.root.querySelector(".tsc-feat"); if (f) f.remove();
  }

  function close() { var o = D.getElementById("tscOv"); if (o) o.remove(); S.root = null; }
  function put(text) {
    var t = D.getElementById("txt");
    if (!t) return;
    var cur = t.value || "";
    t.value = cur ? (cur.replace(/\s+$/, "") + " " + text) : text;
    try { t.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) { }
    close();
    try { t.focus(); } catch (e) { }
  }
  function classic() {
    close();
    var b = D.getElementById("tsjBtn"); if (!b) return;
    window.__tscPass = 1; try { b.click(); } finally { window.__tscPass = 0; }
  }
  function rnd() {
    var l = filtered(); if (!l.length) return;
    var r = l[Math.floor(Math.random() * l.length)];
    if (l.length > 1 && r.id === S.pick) r = l[(l.indexOf(r) + 1) % l.length];
    S.pick = r.id; draw();
    try { S.root.scrollTop = 0; } catch (e) { }
  }

  function onClick(e) {
    var t = e.target;
    while (t && t !== S.root && !(t.getAttribute && t.getAttribute("data-a"))) t = t.parentNode;
    if (!t || t === S.root || !t.getAttribute) return;
    var a = t.getAttribute("data-a");
    if (a === "close") close();
    else if (a === "th") { S.theme = t.getAttribute("data-v"); S.pick = null; draw(); }
    else if (a === "rnd") rnd();
    else if (a === "old") classic();
    else if (a === "use") {
      var id = +t.getAttribute("data-id"), r = (S.rows || []).filter(function (x) { return x.id === id; })[0];
      if (r) put(txt(r));
    }
  }

  function addCss() {
    if (D.getElementById("tscCss")) return;
    var st = D.createElement("style"); st.id = "tscCss";
    st.textContent =
      "#tscOv{position:fixed;inset:0;z-index:99990;background:rgba(2,8,24,.6);display:flex;align-items:flex-end;font-family:'Exo 2',sans-serif}" +
      "#tscOv .tsc-p{width:100%;max-height:88vh;overflow-y:auto;box-sizing:border-box;padding:14px 14px calc(env(safe-area-inset-bottom,0px) + 14px);border-radius:24px 24px 0 0;color:#e8f6ff;background:radial-gradient(120% 60% at 50% 0,#0e2a5c 0,#070d1f 62%);border-top:2px solid #00e5ff;box-shadow:0 -10px 40px rgba(0,229,255,.25)}" +
      "#tscOv .tsc-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}" +
      "#tscOv .tsc-top b{font-size:15px;letter-spacing:.2em;color:#00e5ff;text-shadow:0 0 10px rgba(0,229,255,.7)}" +
      "#tscOv .tsc-top span{flex:1;font-size:12px;opacity:.6}" +
      "#tscOv .tsc-x{border:0;background:rgba(255,255,255,.1);color:#fff;width:32px;height:32px;border-radius:50%;font-size:15px}" +
      "#tscOv .tsc-q{width:100%;box-sizing:border-box;border:1px solid rgba(0,229,255,.35);background:rgba(255,255,255,.06);color:#fff;border-radius:14px;padding:10px 14px;font-size:14px;outline:0}" +
      "#tscOv .tsc-chips{display:flex;gap:8px;overflow-x:auto;padding:10px 0;scrollbar-width:none}" +
      "#tscOv .tsc-chips::-webkit-scrollbar{display:none}" +
      "#tscOv .tsc-chips button{flex:none;border:1px solid rgba(0,229,255,.3);background:rgba(255,255,255,.06);color:#cfeeff;border-radius:16px;padding:7px 12px;font-size:13px;white-space:nowrap}" +
      "#tscOv .tsc-chips button i{font-style:normal;opacity:.55;font-size:11px;margin-left:2px}" +
      "#tscOv .tsc-chips button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0);border-color:transparent;color:#fff;box-shadow:0 0 14px rgba(47,111,224,.7)}" +
      "#tscOv .tsc-list{display:grid;gap:8px}" +
      "#tscOv .tsc-card{display:block;width:100%;text-align:left;border:1px solid rgba(255,255,255,.08);border-left:4px solid hsl(var(--h),90%,60%);background:rgba(255,255,255,.05);color:#f2faff;border-radius:14px;padding:10px 12px}" +
      "#tscOv .tsc-card:active{background:rgba(0,229,255,.14)}" +
      "#tscOv .tsc-th{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:hsl(var(--h),90%,70%);margin-bottom:3px}" +
      "#tscOv .tsc-tx{display:block;font-size:14.5px;line-height:1.38}" +
      "#tscOv .tsc-feat{margin:0 0 10px;padding:10px;border-radius:16px;background:rgba(0,229,255,.1);border:1px solid rgba(0,229,255,.45);box-shadow:0 0 18px rgba(0,229,255,.2)}" +
      "#tscOv .tsc-feat .tsc-card{border-left-width:4px}" +
      "#tscOv .tsc-act{display:flex;gap:8px;margin-top:8px}" +
      "#tscOv .tsc-go,#tscOv .tsc-alt,#tscOv .tsc-foot button{border:0;border-radius:18px;padding:9px 16px;font-size:14px;font-weight:700;color:#fff}" +
      "#tscOv .tsc-go{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}" +
      "#tscOv .tsc-alt,#tscOv .tsc-foot button{background:rgba(255,255,255,.12)}" +
      "#tscOv .tsc-foot{display:flex;gap:8px;margin-top:12px;position:sticky;bottom:0}" +
      "#tscOv .tsc-foot button:first-child{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}" +
      "#tscOv .tsc-empty{padding:18px;text-align:center;opacity:.6;font-size:14px}";
    D.head.appendChild(st);
  }

  function openPanel() {
    addCss(); close();
    var ov = D.createElement("div"); ov.id = "tscOv";
    var p = D.createElement("div"); p.className = "tsc-p";
    ov.appendChild(p); D.body.appendChild(ov);
    ov.onclick = function (e) { if (e.target === ov) close(); };
    S.root = p; p.onclick = onClick;
    S.theme = "*"; S.q = ""; S.pick = null;
    loadCache();
    if (S.rows && S.rows.length) draw(); else p.innerHTML = '<div class="tsc-empty">' + T("Chargement…", "Loading…") + "</div>";
    fetchRows().then(function () {
      if (!S.root) return;
      if (!S.rows || !S.rows.length) { classic(); return; }   /* rien côté serveur : idées classiques */
      if (S.theme !== "*" && !themes().some(function (t) { return t.n === S.theme; })) S.theme = "*";
      var had = D.activeElement && D.activeElement.id === "tscQ";
      if (!had) draw();
    });
  }

  /* le losange ✦ (#tsjBtn) : on intercepte avant les anciens modules (phase de capture sur window) */
  window.addEventListener("click", function (e) {
    if (window.__tscPass) return;
    var b = e.target && e.target.closest ? e.target.closest("#tsjBtn") : null;
    if (!b) return;
    e.stopImmediatePropagation(); e.preventDefault();
    openPanel();
  }, true);
})();
