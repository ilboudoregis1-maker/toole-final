(function () {
  if (typeof VIEWS === "undefined" || typeof rpc !== "function") { return; }
  var ICON = { voice: "🎤", video: "🎬", file: "📎", photo: "🖼️", status: "🟦" };
  var NAME = { voice: "Vocaux", video: "Vidéos", file: "Fichiers", photo: "Photos", status: "Statuts" };
  var CAP = 25 * 1073741824; // 25 Go, soit environ 25 crédits (indicatif)

  function sz(b) {
    b = Number(b || 0);
    if (b < 1024) return b + " o";
    if (b < 1048576) return (b / 1024).toFixed(0) + " Ko";
    if (b < 1073741824) return (b / 1048576).toFixed(1) + " Mo";
    return (b / 1073741824).toFixed(2) + " Go";
  }
  function left(t) {
    var s = (new Date(t) - Date.now()) / 1000;
    if (s <= 0) return "expiré";
    if (s < 3600) return Math.ceil(s / 60) + " min";
    if (s < 86400) return Math.floor(s / 3600) + " h";
    return Math.floor(s / 86400) + " j";
  }
  function countUp(el, to) {
    var t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / 700);
      el.textContent = num(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function card(ic, n, l) {
    return '<div class="card"><b data-n="' + Number(n || 0) + '">0</b><span>' + ic + " " + l + "</span></div>";
  }
  function chart(daily) {
    if (!daily || !daily.length) return "";
    var mx = 1, bw = 26, gap = 12, out = "";
    daily.forEach(function (d) { mx = Math.max(mx, Number(d.n)); });
    daily.forEach(function (d, i) {
      var n = Number(d.n), h = Math.round((n / mx) * 66), x = i * (bw + gap), y = 80 - h;
      var lab = new Date(d.jour + "T00:00:00Z").toLocaleDateString("fr-FR", { weekday: "short", timeZone: "UTC" });
      out += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + Math.max(h, 3) + '" rx="6" fill="url(#wg)"/>' +
        '<text x="' + (x + bw / 2) + '" y="' + (y - 5) + '" font-size="10" font-weight="700" text-anchor="middle" fill="#0a47c8">' + n + "</text>" +
        '<text x="' + (x + bw / 2) + '" y="97" font-size="10" text-anchor="middle" fill="#5b7a95">' + esc(lab) + "</text>";
    });
    var W = daily.length * bw + (daily.length - 1) * gap;
    return '<div class="sec"><h3>Envois sur 7 jours</h3><svg class="mchart" viewBox="0 0 ' + W + ' 104">' +
      '<defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12a8e6"/><stop offset="1" stop-color="#1d5bd6"/></linearGradient></defs>' +
      out + "</svg></div>";
  }
  function draw(s, list, daily, first) {
    var w = $("mwrap");
    if (!w || CUR !== "media") return;
    var types = s.par_type || [], mx = 1;
    types.forEach(function (t) { mx = Math.max(mx, Number(t.octets)); });
    var pct = Math.min(100, (Number(s.octets_actifs) / CAP) * 100);

    var h = '<div class="' + (first ? "mfirst" : "") + '">' +
      '<div class="grid">' + card("🟢", s.actifs, "Médias actifs") + card("⏳", s.a_supprimer, "À supprimer") +
      card("🗑️", s.supprimes, "Supprimés") + card("📤", s.dernieres_24h, "Envois (24 h)") + "</div>" +
      '<div class="sec" style="margin-top:10px"><h3>Stockage</h3>' +
      '<div class="row"><span>Espace utilisé</span><span>' + sz(s.octets_actifs) + " / 25 Go</span></div>" +
      '<div class="bar ' + (pct > 85 ? "k" : pct > 65 ? "w" : "") + '"><i style="width:' + pct + '%"></i></div>' +
      '<div class="row"><span>Utilisateurs actifs (24 h)</span><span>' + num(s.utilisateurs_24h) + "</span></div>" +
      '<p class="sub">Indicatif : 25 Go correspondent aux 25 crédits du forfait gratuit Cloudinary.</p></div>';

    h += '<div class="sec"><h3>Par type</h3>' + (types.length ? types.map(function (t) {
      return '<div class="mtype"><span>' + (ICON[t.kind] || "📁") + " " + esc(NAME[t.kind] || t.kind) +
        '</span><div class="mb"><i style="width:' + Math.max(4, (Number(t.octets) / mx) * 100) + '%"></i></div><span>' +
        num(t.n) + " · " + sz(t.octets) + "</span></div>";
    }).join("") : '<p class="sub">Aucun média pour l\'instant.</p>') + "</div>";

    h += chart(daily);

    h += '<div class="sec"><h3>Derniers médias</h3>' + ((list && list.length) ? list.map(function (m) {
      var chip = m.deleted_at ? '<span class="chip ko">Supprimé</span>'
        : (new Date(m.expires_at) <= Date.now() ? '<span class="chip wa">À supprimer</span>'
          : '<span class="chip ok">Actif · ' + left(m.expires_at) + "</span>");
      return '<div class="row"><span>' + (ICON[m.kind] || "📁") + " " + esc(m.pseudo || "Inconnu") +
        "<br><small>" + sz(m.size_bytes) + " · " + esc(fmt(m.created_at)) + "</small></span>" + chip + "</div>";
    }).join("") : '<p class="sub">Aucun média pour l\'instant.</p>') + "</div></div>";

    w.innerHTML = h;
    w.querySelectorAll("[data-n]").forEach(function (b) {
      var n = Number(b.getAttribute("data-n"));
      if (first) countUp(b, n); else b.textContent = num(n);
    });
  }

  VIEWS.media = async function (el) {
    el.innerHTML = '<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">Médias</h2><div id="mwrap"><p class="ok">Chargement…</p></div>';
    async function load(first) {
      try {
        var r = await Promise.all([
          rpc("admin_media_stats"),
          rpc("admin_media_list", { p_limit: 50 }),
          rpc("admin_media_daily").catch(function () { return null; })
        ]);
        draw(r[0], r[1], r[2], first);
      } catch (e) {
        var w = $("mwrap");
        if (w) w.innerHTML = '<p class="err">' + esc(e.message || e) + "</p>";
      }
    }
    await load(true);
    timers.push(setInterval(function () { if (CUR === "media") load(false); }, 15000));
  };

  var home0 = VIEWS.home;
  VIEWS.home = async function (el) {
    await home0(el);
    var t = el.querySelector(".tiles");
    if (t && !t.querySelector('[data-go="media"]')) {
      var b = document.createElement("button");
      b.className = "tile"; b.setAttribute("data-go", "media");
      b.innerHTML = "<b>🗂️</b>Médias";
      t.insertBefore(b, t.children[1] || null);
    }
  };
})();
