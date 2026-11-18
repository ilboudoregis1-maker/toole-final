(function () {
  var LOGO = 'https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/photos/logos/file_0000000016ec81f4a1534f623cbb6aa4.png';
  var BADGE = '<svg width="16" height="16" viewBox="0 0 24 24" style="flex:none"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Officiel';
  var busy = false;

  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.intersectionRatio > 0) return;
      var v = en.target;
      setTimeout(function () {
        var r = v.getBoundingClientRect();
        if ((r.bottom < 0 || r.top > window.innerHeight) && !v.paused) { try { v.pause(); } catch (x) {} }
      }, 300);
    });
  }, { threshold: [0] }) : null;

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
  function badge(name) {
    if (name.nextElementSibling && name.nextElementSibling.getAttribute('data-bo')) return;
    var b = document.createElement('span');
    b.setAttribute('data-bo', '1');
    b.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:6px;font-size:13px;font-weight:700;color:#4aa3ff;vertical-align:middle';
    b.innerHTML = BADGE;
    name.insertAdjacentElement('afterend', b);
  }
  function clean(slide, name) {
    badge(name);
    var all = slide.querySelectorAll('*'), i, el, q;
    for (i = 0; i < all.length; i++) {
      el = all[i];
      if (el.style.display === 'none') continue;
      if (leaf(el, /^\+?\s*S.abonner$/i) || leaf(el, /^\d+\s*abonn/i)) { hide(el); continue; }
      q = el.getBoundingClientRect();
      if (leaf(el, /^[TU]$/) && q.width > 0 && q.width <= 130 && !el.getAttribute('data-lg')) {
        el.setAttribute('data-lg', '1');
        el.innerHTML = '<img src="' + LOGO + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block">';
      }
    }
    var avs = slide.querySelectorAll('[data-lg]');
    for (i = 0; i < avs.length; i++) {
      var a = avs[i], ar = a.getBoundingClientRect();
      if (ar.left < window.innerWidth * 0.7) continue;
      var els = slide.querySelectorAll('*');
      for (var k = 0; k < els.length; k++) {
        var e = els[k];
        if (e === a || a.contains(e) || e.contains(a)) continue;
        q = e.getBoundingClientRect();
        if (q.width > 0 && q.width <= 34 && q.height <= 34 && q.left >= ar.left - 12 && q.right <= ar.right + 12 &&
            q.top >= ar.top + ar.height * 0.4 && q.bottom <= ar.bottom + 16) e.style.display = 'none';
      }
    }
    var nums = [], all2 = slide.querySelectorAll('*');
    for (i = 0; i < all2.length; i++) {
      var n = all2[i];
      if (n.children.length === 0 && /^\d+$/.test(n.textContent.trim()) && n.style.display !== 'none') {
        q = n.getBoundingClientRect();
        if (q.width > 0 && q.left > window.innerWidth * 0.75) nums.push({ e: n, t: q.top });
      }
    }
    nums.sort(function (x, y) { return x.t - y.t; });
    if (nums.length >= 2) {
      var c = nums[1].e, w = c.parentElement;
      if (w && w.querySelectorAll('svg,img').length === 1 && w.textContent.trim() === c.textContent.trim()) w.style.display = 'none';
      else {
        c.style.display = 'none';
        var p = c.previousElementSibling;
        if (p && (p.tagName === 'svg' || p.tagName === 'IMG' || p.querySelector('svg,img'))) p.style.display = 'none';
      }
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
        if (/\d+\s*abonn/i.test(card.textContent)) { clean(slideOf(card), all[i]); break; }
      }
    }
  }
  function run() {
    if (busy) return;
    busy = true;
    setTimeout(function () { busy = false; try { fix(); } catch (e) {} }, 1500);
  }
  new MutationObserver(run).observe(document.body, { childList: true, subtree: true });
  run();
})();
