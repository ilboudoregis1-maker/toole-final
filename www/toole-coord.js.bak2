/* TÕÕLé — coordination contacts inconnus : noms/photos lisibles + répondre = accepter */
(function () {
  "use strict";
  if (window.__tcoord) return; window.__tcoord = 1;
  var A = window.api; if (typeof A !== "function") return;
  var off = 0, acc = {};
  function me0() { try { return me(); } catch (e) { return null; } }
  function idsOf(p) {
    var m = p.match(/[?&]id=in\.\(([^)]*)\)/);
    if (m) return m[1].split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    m = p.match(/[?&]id=eq\.([0-9a-fA-F-]{36})/);
    return m ? [m[1]] : [];
  }
  function sel(p) { var m = p.match(/[?&]select=([^&]*)/); return m ? decodeURIComponent(m[1]).split(",") : []; }

  window.api = async function (path, opt) {
    var isGet = !opt || !opt.method || String(opt.method).toUpperCase() === "GET";
    if (!isGet && typeof path === "string" && path.indexOf("/rest/v1/messages") === 0 && String(opt.method).toUpperCase() === "POST") {
      try {
        var b = JSON.parse(opt.body), rc = Array.isArray(b) ? b[0] && b[0].receiver : b.receiver, my = me0();
        if (rc && my && !acc[rc]) { acc[rc] = 1;
          A("/rest/v1/chat_accepts", { method: "POST", headers: { Prefer: "resolution=ignore-duplicates,return=minimal" }, body: JSON.stringify({ owner: my, peer: rc }) }).catch(function () { });
        }
      } catch (e) { }
    }
    var r = await A.apply(this, arguments);
    try {
      if (isGet && Date.now() > off && typeof path === "string" && path.indexOf("/rest/v1/profiles?") === 0 && Array.isArray(r)) {
        var want = idsOf(path), hasId = sel(path).indexOf("id") > -1 || !sel(path).length, miss;
        if (want.length) {
          if (hasId) { var have = {}; r.forEach(function (x) { if (x && x.id) have[x.id] = 1; }); miss = want.filter(function (i) { return !have[i]; }); }
          else miss = (want.length === 1 && !r.length) ? want : [];
          if (miss.length) {
            try {
              var ex = await A("/rest/v1/rpc/peer_profiles", { method: "POST", body: JSON.stringify({ ids: miss }) });
              if (Array.isArray(ex)) ex.forEach(function (x) { r.push(x); });
            } catch (e) { off = Date.now() + 60000; }
          }
        }
      }
    } catch (e) { }
    return r;
  };

  var oc = window.openChat;
  if (typeof oc === "function") window.openChat = function (id, pseudo) {
    var r = oc.apply(this, arguments);
    if (!pseudo || pseudo === "Inconnu" || pseudo === "Nouveau contact" || pseudo === "?") {
      window.api("/rest/v1/profiles?select=id,pseudo,avatar_v&id=eq." + id).then(function (p) {
        var n = p && p[0] && p[0].pseudo; if (!n) return;
        try { if (peer && peer.id === id) peer.pseudo = n; } catch (e) { }
        var h = document.getElementById("peerName"); if (h) h.textContent = n;
        var a = document.getElementById("peerAv"); if (a && !a.classList.contains("has-photo")) a.textContent = n.slice(0, 2).toUpperCase();
      }).catch(function () { });
    }
    return r;
  };
})();

/* garde-fou : l'en-tête de la discussion ne reste jamais vide */
(function () {
  "use strict";
  setInterval(function () {
    try {
      var s = document.getElementById("scrChat");
      if (!s || s.classList.contains("hide") || s.offsetParent === null) return;
      var p = null; try { p = peer; } catch (e) { }
      if (!p || !p.id) return;
      var n = document.getElementById("peerName"), a = document.getElementById("peerAv");
      var name = (p.pseudo && p.pseudo !== "Inconnu" && p.pseudo !== "?") ? p.pseudo : "Nouveau contact";
      if (n) { n.style.visibility = "visible"; if (!n.textContent.trim()) n.textContent = name; }
      if (a) {
        a.style.visibility = "visible";
        if (a.classList.contains("has-photo") && !a.style.getPropertyValue("--avimg")) a.classList.remove("has-photo");
        if (!a.classList.contains("has-photo") && !a.textContent.trim()) a.textContent = name.slice(0, 2).toUpperCase();
      }
    } catch (e) { }
  }, 700);
})();

/* inscription : case à cocher visible + messages d'erreur clairs */
(function () {
  "use strict";
  var css = "html body #scrInscr #ick{-webkit-appearance:none!important;appearance:none!important;width:26px!important;height:26px!important;min-width:26px!important;flex:none!important;margin:0!important;padding:0!important;border:2px solid #0a3d91!important;border-radius:8px!important;background:#fff!important;transform:none!important}" +
    "html body #scrInscr #ick:checked{background:#0a3d91 url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") center/80% no-repeat!important}" +
    "html body #scrInscr label.ck{min-height:44px;align-items:center!important;cursor:pointer}" +
    "html body #scrInscr #msgI,html body #scrLogin #msg{color:#d62828!important;font-weight:600;font-size:14px;text-align:center;margin:8px 0}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var R = [
    [/invalid login|invalid_credentials/i, "Numéro ou mot de passe incorrect. Vérifie et réessaie."],
    [/already registered|already been registered|user_already_exists/i, "Ce numéro a déjà un compte. Touche « Déjà un compte ? Se connecter »."],
    [/at least 6|weak_password|password should/i, "Mot de passe trop court : 6 caractères minimum."],
    [/failed to fetch|networkerror|load failed|network request failed/i, "Pas de connexion internet. Vérifie ton réseau et réessaie."],
    [/rate limit|too many|only request this after|send_rate/i, "Trop d'essais. Attends une minute, puis réessaie."],
    [/unable to validate|invalid format|invalid email/i, "Numéro invalide. Exemple : +226 70 12 34 56."],
    [/signups? (not allowed|disabled)|signup_disabled/i, "Les inscriptions sont fermées pour le moment."],
    [/not confirmed/i, "Compte non confirmé. Contacte le support."],
    [/duplicate key|unique constraint/i, "Ce pseudo est déjà pris. Choisis-en un autre."],
    [/database error|internal server|unexpected_failure/i, "Problème sur le serveur. Réessaie dans un instant."],
    [/^erreur$/i, "Une erreur est survenue. Réessaie dans un instant."]
  ];
  function clair(t) {
    var s = String(t || "").trim(); if (!s) return s;
    for (var i = 0; i < R.length; i++) if (R[i][0].test(s)) return R[i][1];
    return s;
  }
  window.__tclair = clair;
  function watch(id) {
    var el = document.getElementById(id); if (!el || el.__tc) return; el.__tc = 1;
    new MutationObserver(function () { var t = el.textContent, c = clair(t); if (c !== t) el.textContent = c; })
      .observe(el, { childList: true, characterData: true, subtree: true });
  }
  setInterval(function () { watch("msgI"); watch("msg"); }, 600);

  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("#iGo") : null; if (!b) return;
    var g = function (i) { var x = document.getElementById(i); return x ? x.value.trim() : ""; };
    var m = document.getElementById("msgI"), err = "", ck = document.getElementById("ick");
    if (g("iem").replace(/\D/g, "").length < 6) err = "Entre ton numéro de téléphone (ex. +226 70 12 34 56).";
    else if (g("ipw").length < 6) err = "Mot de passe trop court : 6 caractères minimum.";
    else if (g("ips").length < 3) err = "Choisis un pseudo d'au moins 3 caractères.";
    else if (ck && !ck.checked) err = "Coche la case « J'accepte les conditions » pour créer ton compte.";
    if (err) { e.preventDefault(); e.stopImmediatePropagation(); if (m) m.textContent = err; }
  }, true);
})();
