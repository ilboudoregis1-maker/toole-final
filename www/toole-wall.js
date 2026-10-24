/* TOOLE - palette / fond de conversation (redessinée) */
(function () {
  "use strict";
  var LS = "toole_wall", W = {};
  try { W = JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { }
  function save() { try { localStorage.setItem(LS, JSON.stringify(W)); } catch (e) { alert("Espace plein"); } }
  function fr() { return localStorage.getItem("toole_lang") !== "en"; }
  function $(id) { return document.getElementById(id); }
  function vis(id) { var e = $(id); return !!e && !e.classList.contains("hide"); }
  function key() {
    try { if (vis("scrGroup") && typeof gCur !== "undefined" && gCur) return "g:" + gCur.id; } catch (e) { }
    try { if (vis("scrChat") && typeof peer !== "undefined" && peer) return "u:" + peer.id; } catch (e) { }
    return null;
  }
  function G(a, b, d) { return "linear-gradient(" + (d || 160) + "deg," + a + "," + b + ")"; }
  function dots(c, a, b) { return "radial-gradient(" + c + " 1.6px,transparent 1.8px)," + G(a, b); }
  function stripes(c, a, b) { return "repeating-linear-gradient(45deg," + c + " 0 10px,transparent 10px 20px)," + G(a, b); }
  var CATS = [
    ["Blanc & bleu", "White & blue", "🤍", [G("#ffffff", "#f1f6ff"), G("#f6faff", "#dbe9ff"), G("#eef5ff", "#c9dcff"), G("#e9f1ff", "#b9d3ff")]],
    ["Ciel", "Sky", "☁️", [G("#eef9ff", "#c4e8ff"), G("#e8fbff", "#bdeef7"), G("#f2f6ff", "#d3dcff"), G("#e3f4ff", "#9fd6ff")]],
    ["Doux", "Soft", "🌸", [G("#ffffff", "#f1f3f6"), G("#fbf8ff", "#e8def9"), G("#fffaf5", "#ffe6d4"), G("#fff0f5", "#ffd6e4")]],
    ["Menthe", "Mint", "🍃", [G("#f3fffa", "#d3f5e6"), G("#f5fff2", "#dcf3cf"), G("#effcff", "#d0f1f0"), G("#eafff4", "#aee9cc")]],
    ["Coucher de soleil", "Sunset", "🌅", [G("#fff1e6", "#ffc9a8"), G("#ffe3ec", "#ffb3c7"), G("#fff4d6", "#ffd48a"), G("#ffe8d6", "#f7a8b8")]],
    ["Océan", "Ocean", "🌊", [G("#cfe8ff", "#4f9cf0"), G("#d3f6f3", "#2fb5b0"), G("#dcd6ff", "#7a6cf0"), G("#c9f0ff", "#2a7de1")]],
    ["Nature", "Nature", "🌿", [G("#e3f7d8", "#8fd18a"), G("#eaf7e1", "#b5d86a"), G("#d9f2e4", "#4fb07f"), G("#f1f8e0", "#cfe08a")]],
    ["Motifs", "Patterns", "✨", [dots("rgba(10,61,145,.16)", "#ffffff", "#e4efff"), dots("rgba(214,51,108,.18)", "#fff7fa", "#ffe0ea"), stripes("rgba(15,160,120,.10)", "#f3fffa", "#d3f5e6"), stripes("rgba(111,66,193,.10)", "#fbf8ff", "#e8def9")]],
    ["Nuit", "Night", "🌙", [G("#2b3350", "#141a30"), G("#2a2140", "#120d24"), G("#16323a", "#0a171c"), G("#33261f", "#17100c")]]
  ];
  if(window.__twallX){try{window.__twallX(CATS,G)}catch(e){}}
  function sizeOf(v) { if(/^url\("data:image\/svg/.test(v))return "160px 160px, cover"; return /^radial/.test(v) ? "22px 22px, cover" : "cover"; }
  function apply() {
    var k = key();
    [["chat", "u"], ["gMsgs", "g"]].forEach(function (p) {
      var e = $(p[0]); if (!e) return;
      var v = (k && k.charAt(0) === p[1]) ? W[k] : null;
      if (v) {
        e.style.setProperty("background-image", v, "important");
        e.style.setProperty("background-size", sizeOf(v), "important");
        e.style.setProperty("background-position", "center", "important");
      } else {
        e.style.removeProperty("background-image");
        e.style.removeProperty("background-size");
        e.style.removeProperty("background-position");
      }
    });
  }
  function setWall(v) {
    var k = key(); if (!k) return;
    if (v) W[k] = v; else delete W[k];
    save(); apply();
  }
  function pickPhoto() {
    var f = document.createElement("input"); f.type = "file"; f.accept = "image/*";
    f.onchange = function () {
      var file = f.files && f.files[0]; if (!file) return;
      var u = URL.createObjectURL(file), im = new Image();
      im.onload = function () {
        var s = Math.min(1, 900 / Math.max(im.width, im.height));
        var c = document.createElement("canvas");
        c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u);
        setWall("url(" + c.toDataURL("image/jpeg", 0.6) + ")");
      };
      im.src = u;
    };
    f.click();
  }
  function openSheet() {
    if (!key()) return;
    var old = $("wSheet"); if (old) old.remove();
    var o = document.createElement("div"); o.id = "wSheet";
    o.style.cssText = "position:fixed;left:0;top:0;right:0;bottom:0;z-index:99999;background:rgba(0,0,0,.18);display:flex;align-items:flex-end";
    var s = document.createElement("div");
    s.style.cssText = "background:#fff;width:100%;max-height:82vh;overflow:auto;border-radius:26px 26px 0 0;padding:10px 16px calc(env(safe-area-inset-bottom) + 16px);color:#0F1B24;box-shadow:0 -10px 40px rgba(0,0,0,.25)";
    var gr = document.createElement("div"); gr.style.cssText = "width:44px;height:5px;border-radius:3px;background:#d5dde3;margin:0 auto 12px"; s.appendChild(gr);
    var h = document.createElement("div");
    h.textContent = "🎨 " + (fr() ? "Palette de la discussion" : "Chat palette");
    h.style.cssText = "font-weight:800;font-size:18px";
    var sub = document.createElement("div");
    sub.textContent = fr() ? "Touche une couleur : elle s'applique tout de suite." : "Tap a colour: it applies instantly.";
    sub.style.cssText = "font-size:12.5px;color:#6B7C8D;margin:2px 0 6px";
    s.appendChild(h); s.appendChild(sub);
    var btns = [];
    function mark() {
      var cur = W[key()] || null;
      btns.forEach(function (x) {
        var on = x[1] === cur;
        x[0].style.boxShadow = on ? "0 0 0 3px #0a7cff,0 4px 12px rgba(10,124,255,.35)" : "0 2px 8px rgba(0,0,0,.16)";
        x[0].style.transform = on ? "scale(1.05)" : "none";
        x[0].firstChild.style.display = on ? "flex" : "none";
      });
    }
    CATS.forEach(function (c) {
      var t = document.createElement("div");
      t.textContent = c[2] + "  " + (fr() ? c[0] : c[1]);
      t.style.cssText = "font-weight:700;font-size:13px;color:#52667a;margin:14px 0 8px";
      s.appendChild(t);
      var row = document.createElement("div"); row.style.cssText = "display:grid;grid-template-columns:repeat(4,1fr);gap:10px";
      c[3].forEach(function (v) {
        var b = document.createElement("button"); b.type = "button";
        b.style.cssText = "position:relative;height:70px;border-radius:18px;border:2px solid #fff;padding:0;transition:transform .15s,box-shadow .15s;background-image:" + v + ";background-size:" + sizeOf(v) + ";background-position:center";
        var ck = document.createElement("span"); ck.textContent = "✓";
        ck.style.cssText = "display:none;position:absolute;right:5px;top:5px;width:20px;height:20px;border-radius:50%;background:#0a7cff;color:#fff;font-size:12px;font-weight:800;align-items:center;justify-content:center";
        b.appendChild(ck);
        b.onclick = function () { setWall(v); mark(); };
        btns.push([b, v]); row.appendChild(b);
      });
      s.appendChild(row);
    });
    var bar = document.createElement("div"); bar.style.cssText = "display:flex;gap:8px;margin-top:18px";
    function act(label, fn, main) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = label;
      b.style.cssText = "flex:1;padding:12px 6px;border-radius:14px;font-weight:700;font-size:14px;border:1.5px solid " + (main ? "#0a7cff" : "#E3ECF0") + ";background:" + (main ? "#0a7cff" : "#F4F8FA") + ";color:" + (main ? "#fff" : "#0F1B24");
      b.onclick = fn; bar.appendChild(b);
    }
    act(fr() ? "Sans fond" : "None", function () { setWall(null); mark(); });
    act(fr() ? "Terminé" : "Done", function () { o.remove(); }, true);
    s.appendChild(bar);
    o.onclick = function (e) { if (e.target === o) o.remove(); };
    o.appendChild(s); document.body.appendChild(o); mark();
  }
  function addBtn() {
    [["#scrChat .chead", "wBtnU"], ["#scrGroup .hdr", "wBtnG"]].forEach(function (p) {
      var h = document.querySelector(p[0]); if (!h || $(p[1])) return;
      var b = document.createElement("button"); b.id = p[1]; b.type = "button";
      b.setAttribute("aria-label", "Fond"); b.textContent = "🎨";
      b.style.cssText = "width:40px;height:40px;border:0;border-radius:50%;background:transparent;font-size:20px;padding:0;margin:0 2px;flex:none";
      b.onclick = openSheet; h.appendChild(b);
    });
  }
  setInterval(function () { addBtn(); apply(); }, 700);
})();
