/* TÕÕLé — présence « en ligne » (point vert) + « écrit… » fiables */
(function () {
  "use strict";
  if (window.__tsp) return; window.__tsp = 1;
  var on = {}, typUntil = 0;
  function TR() { return window.__trt || null; }
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function myId() { try { var t = TR(); return t ? t.mid() : null; } catch (e) { return null; } }
  function peerId() { try { var t = TR(); return t ? t.cur() : null; } catch (e) { return null; } }
  function chat() { var s = document.getElementById("scrChat"); return s && !s.classList.contains("hide") ? s : null; }

  function track(m) {
    var t = String(m.topic || "");
    if (t.indexOf("realtime:online-") !== 0) return;
    var k = t.slice(16), p = m.payload || {};
    if (m.event === "presence_state") {
      var o = {}; Object.keys(p).forEach(function (x) { o[x] = ((p[x] || {}).metas || []).length; });
      on[k] = o;
    } else if (m.event === "presence_diff") {
      var q = on[k] || (on[k] = {});
      ["joins", "leaves"].forEach(function (w, i) {
        var x = p[w] || {};
        Object.keys(x).forEach(function (y) {
          q[y] = (q[y] || 0) + (((x[y] || {}).metas || []).length) * (i ? -1 : 1);
          if (q[y] <= 0) delete q[y];
        });
      });
    }
  }
  function isTyping(m) {
    var id = myId();
    return m.event === "broadcast" && m.payload && m.payload.event === "typing" && id && m.topic === "realtime:typing-" + id;
  }
  var oldH = window.__trh;
  window.__trh = function (m) {
    try {
      track(m);
      if (isTyping(m)) {
        var d = m.payload.payload || {};
        typUntil = (d.s === 1 && String(d.from || "") === peerId()) ? Date.now() + 4000 : 0;
        paint();
        return true;
      }
    } catch (e) { }
    return oldH ? oldH(m) : false;
  };
  var oldR = window.__tro;
  window.__tro = function () { on = {}; typUntil = 0; if (oldR) oldR.apply(this, arguments); };

  function line() {
    var n = document.querySelector("#scrChat .chead .cname"); if (!n) return null;
    var l = document.getElementById("tsLine");
    if (!l) { l = document.createElement("div"); l.id = "tsLine"; n.appendChild(l); }
    return { n: n, l: l };
  }
  function paint() {
    var o = line(), av = document.getElementById("peerAv"); if (!o) return;
    var c = chat(), p = peerId(), me0 = myId();
    var known = c && !c.classList.contains("unk");
    var online = !!(known && p && ls("toole_online") !== "0" &&
      Object.keys(on[p] || {}).filter(function (x) { return x !== me0; }).length);
    var typing = !!(known && ls("toole_typing") !== "0" && typUntil > Date.now());
    var txt = typing ? "écrit…" : online ? "● en ligne" : "";
    o.l.className = typing ? "typ" : online ? "onl" : "";
    if (o.l.textContent !== txt) o.l.textContent = txt;
    o.n.classList.toggle("ts-live", !!txt);
    if (av) av.classList.toggle("ts-on", online);
  }
  setInterval(function () { try { paint(); } catch (e) { } }, 500);

  var css = document.createElement("style");
  css.textContent = [
    "#tsLine{display:none;font-size:12.5px;line-height:1.25;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    "html body #scrChat .chead .cname.ts-live #tsLine{display:block}",
    "html body #scrChat .chead .cname.ts-live .cs{display:none!important}",
    "html body #scrChat #tsLine.onl{color:#16a34a!important;-webkit-text-fill-color:#16a34a!important;font-weight:600}",
    "html body #scrChat #tsLine.typ{color:#0a7cff!important;-webkit-text-fill-color:#0a7cff!important;font-weight:600}",
    "html body #scrChat .chead #peerAv.ts-on{position:relative!important;overflow:visible!important}",
    "html body #scrChat .chead #peerAv.ts-on::after{content:\"\";position:absolute;right:-1px;bottom:-1px;width:13px;height:13px;border-radius:50%;background:#22c55e;border:2px solid var(--tf-bar,#fff);box-sizing:border-box}",
    "html:root:root:root:root body #scrProfil #tsOnl input:checked{background:#22c55e!important}"
  ].join("\n");
  document.head.appendChild(css);
})();
