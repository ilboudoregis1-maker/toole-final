(function () {
  var LOGO = 'https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/photos/logos/file_0000000016ec81f4a1534f623cbb6aa4.png';
  var FLAG = '\uD83C\uDDE7\uD83C\uDDEB';
  var st = document.createElement('style');
  st.textContent = '[data-logo-titre]::before,[data-logo-titre]::after{content:none!important;display:none!important;background:none!important}';
  document.head.appendChild(st);
  var busy = false;
  function leaf(el, re) { return el.children.length === 0 && re.test(el.textContent.trim()); }
  function fix() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (!leaf(all[i], /^Abonnements$/)) continue;
      var box = all[i];
      for (var d = 0; box && d < 8; d++, box = box.parentElement) {
        var tw = document.createTreeWalker(box, NodeFilter.SHOW_TEXT), n, title = null;
        while ((n = tw.nextNode())) {
          if (n.nodeValue.indexOf(FLAG) > -1) n.nodeValue = n.nodeValue.split(FLAG).join('').replace(/\s+$/, '');
          if (/^\s*TÕÕLé\s*$/.test(n.nodeValue) && n.parentElement) title = n.parentElement;
        }
        if (!title) continue;
        title.setAttribute('data-logo-titre', '1');
        if (!title.querySelector('img[data-lg]')) {
          var im = document.createElement('img');
          im.src = LOGO; im.alt = ''; im.setAttribute('data-lg', '1');
          im.style.cssText = 'width:34px;height:34px;border-radius:9px;object-fit:cover;vertical-align:middle;margin-right:10px';
          title.insertBefore(im, title.firstChild);
        }
        var r = title.getBoundingClientRect();
        var zone = title.parentElement && title.parentElement.parentElement ? title.parentElement.parentElement : title.parentElement;
        var c = zone ? zone.querySelectorAll('img,svg,span,i,div,canvas') : [];
        for (var k = 0; k < c.length; k++) {
          var el = c[k];
          if (el === title || el.getAttribute('data-lg') || el.contains(title)) continue;
          var q = el.getBoundingClientRect();
          var txt = el.textContent.trim();
          if (q.width < 8 || q.width > 80 || q.height < 8 || q.height > 60) continue;
          if (txt !== '' && txt !== FLAG) continue;
          if (q.left >= r.left + r.width * 0.55 && q.top < r.bottom && q.bottom > r.top) el.style.display = 'none';
        }
        break;
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
