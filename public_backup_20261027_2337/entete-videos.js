(function () {
  var LOGO = 'https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/photos/logos/file_0000000016ec81f4a1534f623cbb6aa4.png';
  var FLAG = '\uD83C\uDDE7\uD83C\uDDEB';
  var busy = false;
  function leaf(el, re) { return el.children.length === 0 && re.test(el.textContent.trim()); }
  function fix() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (!leaf(all[i], /^Abonnements$/)) continue;
      var box = all[i];
      for (var d = 0; box && d < 6; d++, box = box.parentElement) {
        var tw = document.createTreeWalker(box, NodeFilter.SHOW_TEXT), n, title = null;
        while ((n = tw.nextNode())) {
          if (n.nodeValue.indexOf(FLAG) > -1) n.nodeValue = n.nodeValue.split(FLAG).join('').replace(/\s+$/, '');
          if (/^\s*TÕÕLé\s*$/.test(n.nodeValue) && n.parentElement) title = n.parentElement;
        }
        var imgs = box.querySelectorAll('img,svg');
        for (var k = 0; k < imgs.length; k++) {
          var s = (imgs[k].getAttribute('src') || '') + (imgs[k].getAttribute('alt') || '') + (imgs[k].getAttribute('class') || '');
          if (/flag|drapeau|burkina|\bbf\b/i.test(s)) imgs[k].style.display = 'none';
        }
        if (title && !title.getAttribute('data-logo-titre')) {
          title.setAttribute('data-logo-titre', '1');
          var im = document.createElement('img');
          im.src = LOGO; im.alt = '';
          im.style.cssText = 'width:34px;height:34px;border-radius:9px;object-fit:cover;vertical-align:middle;margin-right:10px';
          title.insertBefore(im, title.firstChild);
          break;
        }
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
