/* TÕÕLé PRO — réglages avancés, mode sombre, taille du texte, navigation propre, robustesse */
(function () {
  'use strict';
  var VERSION = '2.1.0';
  function ls(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
  function lss(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function lang() { return ls('toole_lang', /^en/i.test(navigator.language || '') ? 'en' : 'fr'); }
  function L(fr, en) { return lang() === 'en' ? en : fr; }

  /* plus de bandeau rouge « ERREUR JS » devant l'utilisateur : on journalise seulement */
  window.onerror = function (m, src, l) { try { console.error('[TÕÕLé]', m, src, l); } catch (e) { } return true; };
  window.addEventListener('unhandledrejection', function (e) { try { console.warn('[TÕÕLé] promesse rejetée', e.reason); } catch (x) { } });

  /* ---------- Mode d'affichage : auto / clair / sombre ---------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function themeMode() { return ls('toole_themeMode', 'auto'); }
  function applyMode() {
    var m = themeMode(), dark = m === 'dark' || (m === 'auto' && mq && mq.matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    var meta = document.querySelector('meta[name=theme-color]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
    meta.content = dark ? '#0b141a' : '#f3f8fb';
    document.querySelectorAll('.pro-seg[data-k=mode] button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === m); });
  }
  if (mq && mq.addEventListener) mq.addEventListener('change', applyMode);
  applyMode();

  /* ---------- Taille du texte ---------- */
  var SIZES = { s: 0.92, m: 1, l: 1.12, xl: 1.25 };
  function applySize() {
    var k = ls('toole_fs', 'm'); document.documentElement.style.setProperty('--fs', SIZES[k] || 1);
    document.querySelectorAll('.pro-seg[data-k=fs] button').forEach(function (b) { b.classList.toggle('on', b.dataset.v === k); });
  }
  applySize();

  /* ---------- Écran courant -> body[data-screen] (barre d'onglets, bouton CANIX) ---------- */
  var raf = 0;
  function syncScreen() {
    raf = 0;
    var cur = null, list = document.querySelectorAll('section.scr, section.wl');
    for (var i = 0; i < list.length; i++) { if (!list[i].classList.contains('hide') && list[i].offsetParent !== null || (!list[i].classList.contains('hide') && getComputedStyle(list[i]).display !== 'none')) { cur = list[i].id; } }
    if (cur && document.body.dataset.screen !== cur) document.body.dataset.screen = cur;
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(syncScreen); }
  new MutationObserver(schedule).observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

  /* ---------- Réglages : nouveaux groupes ---------- */
  function seg(key, opts, cur) {
    var d = document.createElement('div'); d.className = 'pro-seg'; d.dataset.k = key;
    opts.forEach(function (o) { var b = document.createElement('button'); b.type = 'button'; b.dataset.v = o[0]; b.textContent = o[1]; if (o[0] === cur) b.classList.add('on'); d.appendChild(b); });
    return d;
  }
  function group(title, node, note) {
    var g = document.createElement('div'); g.className = 'grp pro-grp';
    var t = document.createElement('div'); t.className = 'gt'; t.textContent = title; g.appendChild(t);
    var c = document.createElement('div'); c.className = 'card'; c.appendChild(node); g.appendChild(c);
    if (note) { var n = document.createElement('div'); n.className = 'pro-note'; n.textContent = note; g.appendChild(n); }
    return g;
  }
  function row(label, value, onclick, danger) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'row' + (danger ? ' danger' : '');
    var s = document.createElement('span'); s.textContent = label; b.appendChild(s);
    if (value) { var v = document.createElement('b'); v.textContent = value; v.style.cssText = 'font-weight:500;opacity:.7'; b.appendChild(v); }
    if (onclick) b.addEventListener('click', onclick); return b;
  }
  function buildSettings() {
    var body = document.querySelector('#scrParam .body'); if (!body || body.querySelector('.pro-grp')) return;
    /* Apparence : mode + taille du texte (avant la couleur) */
    var app = null; body.querySelectorAll('.grp').forEach(function (g) { var t = g.querySelector('.gt'); if (t && /Apparence|Appearance/i.test(t.textContent)) app = g; });
    var wrap = document.createElement('div');
    var m = seg('mode', [['auto', L('Automatique', 'Automatic')], ['light', L('Clair', 'Light')], ['dark', L('Sombre', 'Dark')]], themeMode());
    var f = seg('fs', [['s', 'A-'], ['m', 'A'], ['l', 'A+'], ['xl', 'A++']], ls('toole_fs', 'm'));
    var lblM = document.createElement('div'); lblM.className = 'pro-note'; lblM.style.paddingBottom = '0'; lblM.textContent = L('Mode', 'Mode');
    var lblF = document.createElement('div'); lblF.className = 'pro-note'; lblF.style.paddingBottom = '0'; lblF.textContent = L('Taille du texte', 'Text size');
    wrap.appendChild(lblM); wrap.appendChild(m); wrap.appendChild(lblF); wrap.appendChild(f);
    if (app) { var card = app.querySelector('.card'); card.insertBefore(wrap, card.firstChild); }
    else body.appendChild(group(L('Apparence', 'Appearance'), wrap));
    m.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; lss('toole_themeMode', b.dataset.v); applyMode(); });
    f.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; lss('toole_fs', b.dataset.v); applySize(); });

    /* Données */
    var data = document.createElement('div');
    data.appendChild(row(L('Vider le cache local', 'Clear local cache'), '', function () {
      try { Object.keys(localStorage).filter(function (k) { return /^home:|^toole_cache|^toole_voice_|^toole_vdb/.test(k); }).forEach(function (k) { localStorage.removeItem(k); }); if (window.caches) caches.keys().then(function (ks) { ks.forEach(function (k) { caches.delete(k); }); }); } catch (e) { }
      if (window.toast) toast(L('Cache vidé', 'Cache cleared'));
    }));
    data.appendChild(row(L('Réinitialiser les réglages', 'Reset settings'), '', function () {
      if (!confirm(L("Réinitialiser les réglages d'affichage ?", 'Reset display settings?'))) return;
      ['toole_themeMode', 'toole_fs', 'toole_theme', 'toole_ui_sound', 'toole_readconf', 'toole_vib', 'toole_tts', 'toole_voice'].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) { } });
      applyMode(); applySize(); if (window.applyTheme) applyTheme('#00c2e0');
      if (window.toast) toast(L('Réglages réinitialisés', 'Settings reset'));
    }, true));
    body.appendChild(group(L('Données', 'Data'), data));

    /* À propos */
    var ab = document.createElement('div');
    ab.appendChild(row(L('Version', 'Version'), VERSION));
    ab.appendChild(row(L('Site CNS.corp', 'CNS.corp website'), '›', function () { try { window.open('https://ilboudoregis1-maker.github.io/CNS.corp/', '_system'); } catch (e) { } }));
    var v = document.createElement('div'); v.className = 'pro-ver'; v.textContent = 'TÕÕLé · CNS.corp · Burkina Faso';
    body.appendChild(group(L('À propos', 'About'), ab)); body.appendChild(v);
    if (window.TOOLE_setLang) { /* traduit les nouveaux blocs si besoin */ }
  }
  function rebuildLocalizedBits() {
    /* quand la langue change, les libellés créés en JS sont recréés */
    var body = document.querySelector('#scrParam .body'); if (!body) return;
    body.querySelectorAll('.pro-grp,.pro-ver').forEach(function (e) { e.remove(); });
    var seg1 = body.querySelector('.pro-seg[data-k=mode]'); if (seg1) { var w = seg1.parentNode; if (w && w.parentNode) w.remove(); }
    buildSettings();
    applyMode(); applySize();
  }
  document.addEventListener('toole:lang', rebuildLocalizedBits);

  /* ---------- Ajustements de confort ---------- */
  function polish() {
    /* champ pseudo inutile en connexion, clavier adapté */
    var em = document.getElementById('em'); if (em) { em.setAttribute('autocomplete', 'email'); em.setAttribute('inputmode', 'email'); em.setAttribute('autocapitalize', 'none'); }
    var pw = document.getElementById('pw'); if (pw) pw.setAttribute('autocomplete', 'current-password');
    var ps = document.getElementById('ips'); if (ps) { ps.setAttribute('autocapitalize', 'none'); ps.setAttribute('maxlength', '20'); }
    var tx = document.getElementById('txt'); if (tx) { tx.setAttribute('enterkeyhint', 'send'); tx.setAttribute('autocomplete', 'off'); }
    var rf = document.getElementById('srch'); if (rf) rf.setAttribute('enterkeyhint', 'search');
    document.documentElement.setAttribute('translate', 'no');
  }

  function init() {
    buildSettings(); applyMode(); applySize(); polish(); syncScreen();
    /* l'écran Réglages est reconstruit à chaque ouverture : on garde notre bloc à jour */
    var sp = document.getElementById('scrParam');
    if (sp) new MutationObserver(function () { if (!sp.classList.contains('hide')) { setTimeout(function () { buildSettings(); applyMode(); applySize(); }, 60); } }).observe(sp, { attributes: true, attributeFilter: ['class'] });
    window.TOOLE_VERSION = VERSION;
    setTimeout(syncScreen, 400); setTimeout(syncScreen, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

