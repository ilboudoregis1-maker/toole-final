(function () {
  var st = document.createElement('style');
  st.textContent = 'html,body{overflow-x:hidden!important;overscroll-behavior-x:none!important;max-width:100vw}';
  document.head.appendChild(st);

  function glissable(el) {
    for (; el && el !== document.body; el = el.parentElement) {
      if (el.tagName === 'INPUT' && el.type === 'range') return true;
      var cs = getComputedStyle(el);
      if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
        if (el.clientHeight < window.innerHeight * 0.4) return true;
        el.style.overflowX = 'hidden';
        el.scrollLeft = 0;
      }
    }
    return false;
  }
  var sx = 0, sy = 0, mode = '', libre = false;
  document.addEventListener('touchstart', function (e) {
    var t = e.touches[0]; sx = t.clientX; sy = t.clientY; mode = '';
    libre = glissable(e.target);
  }, { passive: true });
  document.addEventListener('touchmove', function (e) {
    var t = e.touches[0];
    if (!mode) {
      var dx = Math.abs(t.clientX - sx), dy = Math.abs(t.clientY - sy);
      if (dx < 6 && dy < 6) return;
      mode = dx > dy ? (libre ? 'libre' : 'bloque') : 'vertical';
    }
    if (mode === 'bloque' && e.cancelable) e.preventDefault();
  }, { passive: false });

  function recentrer() {
    var s = document.scrollingElement;
    if (s && s.scrollLeft) s.scrollLeft = 0;
    if (document.body.scrollLeft) document.body.scrollLeft = 0;
  }
  window.addEventListener('scroll', recentrer, true);
})();
