(function () {
  var LOGO = 'https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/photos/logos/file_0000000016ec81f4a1534f623cbb6aa4.png';
  var busy = false;
  function isLeaf(el, txt) { return el.children.length === 0 && el.textContent.trim() === txt; }
  function fix() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var b = all[i];
      if (!isLeaf(b, 'Officiel')) continue;
      var node = b.parentElement;
      for (var d = 0; node && d < 8; d++, node = node.parentElement) {
        var found = null, kids = node.querySelectorAll('*');
        for (var k = 0; k < kids.length; k++) {
          if (!kids[k].getAttribute('data-logo') && isLeaf(kids[k], 'T')) { found = kids[k]; break; }
        }
        if (found) {
          found.setAttribute('data-logo', '1');
          found.innerHTML = '<img src="' + LOGO + '" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block">';
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
