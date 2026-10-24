(function () {
  "use strict";
  if (window.__tbrou) return; window.__tbrou = 1;
  var P = "toole_draft:", cur = { c: null, g: null };
  function ld(k) { try { return localStorage.getItem(P + k) || ""; } catch (e) { return ""; } }
  function sv(k, v) { try { if (v) localStorage.setItem(P + k, v); else localStorage.removeItem(P + k); } catch (e) { } }
  function pid() { try { return peer && peer.id ? "c:" + peer.id : null; } catch (e) { return null; } }
  function gid() { try { return gCur && gCur.id ? "g:" + gCur.id : null; } catch (e) { return null; } }
  function sync(box, key, slot) {
    if (!box || !key) return;
    if (cur[slot] !== key) {
      cur[slot] = key;
      var d = ld(key);
      if (d && !box.value) box.value = d;
    } else {
      sv(key, box.value);
    }
  }
  setInterval(function () {
    sync(document.getElementById("txt"), pid(), "c");
    sync(document.getElementById("gTxt"), gid(), "g");
  }, 600);
})();
