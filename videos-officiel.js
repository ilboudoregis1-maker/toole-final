(function () {
  var LOGO = 'https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/photos/logos/file_0000000016ec81f4a1534f623cbb6aa4.png';
  var busy = false;

  document.addEventListener('play', function (e) {
    var vs = document.querySelectorAll('video');
    for (var i = 0; i < vs.length; i++) if (vs[i] !== e.target) { try { vs[i].pause(); } catch (x) {} }
  }, true);

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.intersectionRatio < 0.5) { try { en.target.pause(); } catch (x) {} } });
  }, { threshold: [0, 0.5, 1] }) : null;

  function leaf(el, re) { return el.children.length === 0 && re.test(el.textContent.trim()); }
  function hide(el) {
    el.style.display = 'none';
    var p = el.parentElement;
    if (p && p.textContent.trim() === el.textContent.trim() && p.querySelectorAll('video').length === 0) p.style.display = 'none';
  }
  function slideOf(card) {
    var node = card, best = null;
    for (var d = 0; node && node !== document.body && d < 14; d++, node = node.parentElement) {
      var n = node.querySelectorAll('video').length;
      if (n > 1) break;
      if (n === 1) best = node;
    }
    return best || (card.parentElement && card.parentElement.parentElement) || card;
  }
  function clean(slide) {
    var all = slide.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.style.display === 'none') continue;
      if (leaf(el, /^\+?\s*S.abonner$/i) || leaf(el, /^\d+\s*abonn/i)) { hide(el); continue; }
      var q = el.getBoundingClientRect();
      if (leaf(el, /^\+$/) && q.width > 0 && q.width <= 34) { el.style.display = 'none'; continue; }
      if (leaf(el, /^[TU]$/) && q.width > 0 && q.width <= 130 && !el.getAttribute('data-lg')) {
        el.setAttribute('data-lg', '1');
        el.innerHTML = '<img src="' + LOGO + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block">';
        continue;
      }
      var s = (el.getAttribute('class') || '') + ' ' + (el.id || '') + ' ' + (el.getAttribute('aria-label') || '') + ' ' + (el.getAttribute('data-act') || '');
      if (/comment/i.test(s) && q.width <= 120 && q.height <= 160) el.style.display = 'none';
    }
  }
  function fix() {
    var vs = document.querySelectorAll('video');
    for (var v = 0; v < vs.length; v++) if (io && !vs[v].getAttribute('data-io')) { vs[v].setAttribute('data-io', '1'); io.observe(vs[v]); }
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (!leaf(all[i], /^TÕÕLé$/)) continue;
      var card = all[i];
      for (var d = 0; card && d < 3; d++, card = card.parentElement) {
        if (/\d+\s*abonn/i.test(card.textContent)) { clean(slideOf(card)); break; }
      }
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
