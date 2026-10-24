(function () {
  "use strict";
  if (window.__teph) return; window.__teph = 1;
  var OPT = [[0, "Désactivé"], [3600, "1 heure"], [86400, "24 heures"], [604800, "7 jours"]];
  var ttl = 0, key = "";
  function T(s) { try { toast(s); } catch (e) { alert(s); } }
  function label(s) { for (var i = 0; i < OPT.length; i++) if (OPT[i][0] === s) return OPT[i][1]; return "Désactivé"; }
  function pair() {
    try { var a = me(), b = peer.id; return a < b ? [a, b] : [b, a]; } catch (e) { return null; }
  }
  function badge() {
    var cs = document.querySelector("#scrChat .cs"); if (!cs) return;
    cs.textContent = ttl ? "Discussion · ⏱ " + label(ttl) : "Discussion";
  }
  async function load() {
    var p = pair(); if (!p) return;
    var k = p.join("|"); key = k; ttl = 0; badge();
    try {
      var r = await api("/rest/v1/chat_ttl?select=seconds&a=eq." + p[0] + "&b=eq." + p[1]);
      if (key !== k) return;
      ttl = (r && r[0] && r[0].seconds) || 0; badge();
    } catch (e) { }
  }
  async function save(sec) {
    var p = pair(); if (!p) return;
    try {
      await api("/rest/v1/chat_ttl", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ a: p[0], b: p[1], seconds: sec })
      });
      ttl = sec; badge();
      T(sec ? "Messages éphémères : " + label(sec) : "Messages éphémères désactivés");
    } catch (e) { T("Impossible de changer la durée"); }
  }
  function menu() {
    if (!pair()) return;
    var old = document.getElementById("tephMenu"); if (old) old.remove();
    var w = document.createElement("div");
    w.id = "tephMenu";
    w.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(10,42,102,.45);display:flex;align-items:flex-end;justify-content:center";
    var c = document.createElement("div");
    c.style.cssText = "background:#fff;width:100%;max-width:480px;border-radius:20px 20px 0 0;padding:18px 18px 26px;font-family:inherit;color:#0a2a66";
    c.innerHTML = '<div style="font-weight:700;font-size:17px;margin-bottom:4px">⏱ Messages éphémères</div>' +
      '<div style="font-size:13px;color:#4a6178;margin-bottom:12px">Les nouveaux messages de cette discussion disparaîtront après la durée choisie.</div>';
    OPT.forEach(function (o) {
      var b = document.createElement("button");
      b.textContent = (o[0] === ttl ? "✓ " : "") + o[1];
      b.style.cssText = "display:block;width:100%;text-align:left;padding:13px 14px;margin:6px 0;border:1px solid #d6ebf4;border-radius:12px;background:" + (o[0] === ttl ? "#e6f7fb" : "#fff") + ";font-size:15px;color:#0a2a66";
      b.onclick = function () { w.remove(); save(o[0]); };
      c.appendChild(b);
    });
    w.appendChild(c);
    w.onclick = function (e) { if (e.target === w) w.remove(); };
    document.body.appendChild(w);
  }
  function addBtn() {
    var h = document.querySelector("#scrChat .chead");
    if (!h || document.getElementById("tephBtn")) return;
    var b = document.createElement("button");
    b.id = "tephBtn"; b.type = "button"; b.setAttribute("aria-label", "Messages éphémères");
    b.textContent = "⏱";
    b.style.cssText = "margin-left:auto;background:none;border:0;font-size:20px;padding:6px 10px;color:inherit";
    b.onclick = menu;
    h.appendChild(b);
  }
  setInterval(function () {
    addBtn();
    var p = pair(), k = p ? p.join("|") : "";
    if (k && k !== key) load();
  }, 700);
})();
