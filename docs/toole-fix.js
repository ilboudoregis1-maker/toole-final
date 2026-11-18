(function () {
  var gen = 0;
  function ld() {
    var d = document.createElement("div");
    d.className = "sx-s tf-ld"; d.style.padding = "14px"; d.textContent = "Chargement…";
    return d;
  }
  function init() {
    if (window.__tfix2) return; window.__tfix2 = 1;
    if (typeof window.setChip === "function") {
      var _sc = window.setChip;
      window.setChip = function (i) { gen++; return _sc(i); };
    }
    if (typeof window.homeRender === "function") {
      var _hr = window.homeRender;
      window.homeRender = function (list) {
        var c = document.querySelectorAll("#scrList .chip");
        if ((c[1] && c[1].classList.contains("on")) || (c[2] && c[2].classList.contains("on"))) return;
        return _hr(list);
      };
    }
    function guard(name) {
      var orig = window[name];
      if (typeof orig !== "function") return;
      window[name] = function () {
        var real = document.getElementById("recent");
        if (!real) return orig.apply(this, arguments);
        var tmp = document.createElement("div"), p, ph = ld();
        document.getElementById = function (id) {
          return id === "recent" ? tmp : Document.prototype.getElementById.call(document, id);
        };
        try { p = orig.apply(this, arguments); }
        finally { delete document.getElementById; }
        var my = gen;
        real.innerHTML = "";
        while (tmp.firstChild) real.appendChild(tmp.firstChild);
        real.appendChild(ph);
        function done() { if (ph.parentNode) ph.parentNode.removeChild(ph); }
        return Promise.resolve(p).then(function () {
          done();
          if (my === gen) { while (tmp.firstChild) real.appendChild(tmp.firstChild); }
        }, done);
      };
    }
    guard("renderUnread");
    guard("renderContacts");
    var _gl = window.goList;
    if (typeof _gl === "function") {
      window.goList = function () {
        try {
          var sl = document.getElementById("scrList");
          if (sl && sl.classList.contains("hide")) {
            window.setChip(0);
            var r = document.getElementById("recent"), c = [];
            try { c = JSON.parse(localStorage.getItem("home:" + me()) || "[]"); } catch (e) { }
            if (r) r.innerHTML = "";
            if (c.length) window.homeRender(c);
          }
        } catch (e) { }
        return _gl.apply(this, arguments);
      };
    }
    var _oc = window.openChat;
    if (typeof _oc === "function") {
      window.openChat = function () {
        var r = _oc.apply(this, arguments);
        try {
          var c = document.getElementById("chat");
          if (c && !c.children.length && navigator.onLine !== false) {
            var ph = ld(); ph.style.textAlign = "center"; c.appendChild(ph);
            setTimeout(function () { if (ph.parentNode) ph.parentNode.removeChild(ph); }, 8000);
          }
        } catch (e) { }
        return r;
      };
    }
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
(function () {
  function upd() {
    try {
      var el = document.getElementById("stFr");
      if (!el || typeof api !== "function" || typeof me !== "function") return;
      api("/rest/v1/saved_contacts?select=contact&owner=eq." + me()).then(function (rows) {
        if (Array.isArray(rows)) el.textContent = String(rows.length);
      }).catch(function () { });
    } catch (e) { }
  }
  window.addEventListener("load", function () {
    var sp = document.getElementById("scrProfil");
    if (!sp) return;
    new MutationObserver(function () {
      if (!sp.classList.contains("hide")) { upd(); setTimeout(upd, 1500); }
    }).observe(sp, { attributes: true, attributeFilter: ["class"] });
  });
})();
