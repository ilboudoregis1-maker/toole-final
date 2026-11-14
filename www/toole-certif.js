/* TÕÕLé – badge "Compte certifié" (doré, différent du badge bleu officiel) */
(function () {
  if (window.__tcert) return; window.__tcert = 1;
  var D = document, SET = {}, T = 0;
  // Sélecteurs où le pseudo s'affiche : ajoute les tiens ici si besoin
  var SEL = ['.cname', '.c2-name', '.cd-name', '.pf-name', '.gm-name', '.sname'];
  var SEAL = '<svg viewBox="0 0 24 24" width="15" height="15" style="flex:none;vertical-align:-2px;margin-left:4px" aria-label="Compte certifié"><path d="M12 1.8l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.2l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z" fill="#f5b301"/><path d="M7.8 12.4l3 3 5.6-6" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function call(p, b) { var f = window.api || (typeof api === 'function' ? api : null); return f ? f(p, { method: 'POST', body: JSON.stringify(b || {}) }) : Promise.reject(); }
  function load() {
    return call('/rest/v1/rpc/certified_pseudos', {}).then(function (a) {
      SET = {}; (a || []).forEach(function (p) { SET[String(p).trim().toLowerCase()] = 1; }); paint();
    }).catch(function () { });
  }
  function paint() {
    SEL.forEach(function (s) {
      D.querySelectorAll(s).forEach(function (el) {
        if (el.querySelector('.tcert')) return;
        var n = (el.firstChild && el.firstChild.nodeType === 3 ? el.firstChild.nodeValue : el.textContent || '').trim().toLowerCase();
        if (n && SET[n]) { var b = D.createElement('span'); b.className = 'tcert'; b.innerHTML = SEAL; el.appendChild(b); }
      });
    });
  }
  new MutationObserver(function () { clearTimeout(T); T = setTimeout(paint, 120); }).observe(D.documentElement, { childList: true, subtree: true });
  setInterval(load, 60000); D.addEventListener('visibilitychange', function () { if (!D.hidden) load(); });
  setTimeout(load, 1500);
})();
