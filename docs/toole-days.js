(function () {
  function lang() {
    try { return localStorage.getItem("toole_lang") || (/^en/i.test(navigator.language || "") ? "en" : "fr"); }
    catch (e) { return "fr"; }
  }
  function key(d) { return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); }
  function dayLabel(d) {
    var en = lang() === "en", now = new Date();
    var t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    var diff = Math.round((t0 - d0) / 86400000);
    if (diff === 0) return en ? "Today" : "Aujourd'hui";
    if (diff === 1) return en ? "Yesterday" : "Hier";
    var o = { weekday: "long", day: "numeric", month: "long" };
    if (d.getFullYear() !== now.getFullYear()) o.year = "numeric";
    var s = d.toLocaleDateString(en ? "en-GB" : "fr-FR", o);
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function addDays(rows) {
    try {
      var c = document.getElementById("chat");
      if (!c || !Array.isArray(rows) || !rows.length) return;
      var near = c.scrollHeight - c.scrollTop - c.clientHeight < 80;
      var old = c.querySelectorAll(".tf-day");
      for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
      var last = "";
      rows.forEach(function (m) {
        if (!m || !m.created_at) return;
        var d = new Date(m.created_at);
        if (isNaN(d.getTime())) return;
        var k = key(d);
        if (k === last) return;
        var b = c.querySelector('[data-mid="' + String(m.id).replace(/[^\w-]/g, "") + '"]');
        if (!b) return;
        last = k;
        var s = document.createElement("div");
        s.className = "tf-day";
        s.textContent = dayLabel(d);
        c.insertBefore(s, b);
      });
      if (near) c.scrollTop = c.scrollHeight;
    } catch (e) { }
  }
  function init() {
    if (window.__tdays) return; window.__tdays = 1;
    var css = document.createElement("style");
    css.textContent = ".tf-day{width:fit-content;margin:12px auto 6px;padding:3px 12px;border-radius:999px;font-size:12px;font-weight:600;text-align:center;align-self:center;background:rgba(120,130,140,.16);color:var(--pro-ink,#4b5568);opacity:.85}";
    document.head.appendChild(css);
    var _rr = window.renderMsgRows;
    if (typeof _rr === "function") window.renderMsgRows = function (rows) {
      var r = _rr.apply(this, arguments);
      addDays(rows);
      return r;
    };
  }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
