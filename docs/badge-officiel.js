(function () {
  var busy = false;
  var HTML = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex:none"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Officiel';
  function fix() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var n = all[i];
      if (n.children.length || !/^TÕÕLé$/.test(n.textContent.trim())) continue;
      var card = n, ok = false;
      for (var d = 0; card && d < 3; d++, card = card.parentElement) {
        if (/\d+\s*abonn|Son original/i.test(card.textContent)) { ok = true; break; }
      }
      if (!ok) continue;
      if (n.nextElementSibling && n.nextElementSibling.getAttribute('data-bo')) continue;
      var b = document.createElement('span');
      b.setAttribute('data-bo', '1');
      b.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:6px;font-size:13px;font-weight:700;color:#4aa3ff;vertical-align:middle';
      b.innerHTML = HTML;
      n.insertAdjacentElement('afterend', b);
    }
  }
  function run() {
    if (busy) return;
    busy = true;
    requestAnimationFrame(function () { busy = false; try { fix(); } catch (e) {} });
  }
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
  run();
})();
