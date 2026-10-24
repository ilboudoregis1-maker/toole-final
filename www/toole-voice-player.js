(function () {
  var REG = {}; // audio_path -> { a: Audio }
  var UIS = {}; // audio_path -> bulle affichée
  var DUR = {}; // audio_path -> durée mesurée
  var N = 30;

  function fmt(x) {
    x = Math.max(0, Math.floor(x || 0));
    return Math.floor(x / 60) + ":" + String(x % 60).padStart(2, "0");
  }
  function heights(path) {
    var h = 0, i, out = [];
    for (i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0;
    for (i = 0; i < N; i++) {
      h = (h * 1664525 + 1013904223) >>> 0;
      var r = ((h >>> 8) % 100) / 100;
      var env = 0.55 + 0.45 * Math.sin(Math.PI * (i + 0.5) / N);
      out.push(Math.round((25 + r * 75) * env));
    }
    return out;
  }
  function getDur(blob) {
    return new Promise(function (res) {
      var t = new Audio(), src = window.URL.createObjectURL(blob), done = false;
      function fin(v) {
        if (done) return; done = true;
        try { window.URL.revokeObjectURL(src); } catch (e) { }
        res(v);
      }
      t.preload = "metadata";
      t.onloadedmetadata = function () {
        if (isFinite(t.duration) && t.duration > 0) return fin(t.duration);
        t.ontimeupdate = function () { fin(isFinite(t.duration) ? t.duration : 0); };
        t.currentTime = 1e101; // astuce pour forcer la lecture de la durée
      };
      t.onerror = function () { fin(0); };
      setTimeout(function () { fin(0); }, 3000);
      t.src = src;
    });
  }
  function total(path, a) {
    if (a && isFinite(a.duration) && a.duration > 0) return a.duration;
    return DUR[path] || 0;
  }
  function paint(path) {
    var e = REG[path], u = UIS[path];
    if (!u) return;
    var a = e && e.a, d = total(path, a);
    var cur = a ? a.currentTime : 0;
    var ratio = d ? Math.min(1, cur / d) : 0;
    var playing = !!a && !a.paused;
    u.pb.innerHTML = vI(playing ? VM.pause : VM.play, true);
    var played = Math.round(ratio * N);
    u.bars.forEach(function (el, i) { el.classList.toggle("on", i < played); });
    u.knob.style.left = (ratio * 100) + "%";
    u.knob.classList.toggle("on", playing || cur > 0);
    u.dur.textContent = fmt(playing || cur > 0 ? cur : d);
  }
  function wire(path, a) {
    var p = function () { paint(path); };
    a.onpause = p; a.ontimeupdate = p; a.onloadedmetadata = p;
    a.onplay = function () {
      Object.keys(REG).forEach(function (k) {
        if (k !== path && REG[k].a && !REG[k].a.paused) REG[k].a.pause();
      });
      paint(path);
    };
    a.onended = function () { a.currentTime = 0; paint(path); };
  }

  window.vBubble = function (m) {
    var path = String(m.audio_path || "");
    var w = document.createElement("div"); w.className = "vbub";
    var pb = document.createElement("button"); pb.type = "button";
    pb.setAttribute("aria-label", "Écouter");
    var wr = document.createElement("div"); wr.className = "vwrap";
    var bars = [];
    heights(path).forEach(function (h) {
      var b = document.createElement("i");
      b.style.height = h + "%";
      wr.appendChild(b); bars.push(b);
    });
    var knob = document.createElement("span"); knob.className = "vknob"; wr.appendChild(knob);
    var dur = document.createElement("span"); dur.className = "vdur";
    w.appendChild(pb); w.appendChild(wr); w.appendChild(dur);

    pb.innerHTML = vI(VM.play, true);
    dur.textContent = DUR[path] ? fmt(DUR[path]) : "0:00";
    UIS[path] = { pb: pb, bars: bars, knob: knob, dur: dur };
    paint(path);

    if (path && !DUR[path]) {
      vLoad(path).then(function (blob) {
        if (!blob) return;
        return getDur(blob).then(function (d) { if (d) { DUR[path] = d; paint(path); } });
      }).catch(function () { });
    }

    wr.onclick = function (ev) {
      ev.stopPropagation();
      var e = REG[path]; if (!e) return;
      var d = total(path, e.a); if (!d) return;
      var r = wr.getBoundingClientRect();
      e.a.currentTime = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * d;
    };

    pb.onclick = async function (ev) {
      ev.stopPropagation();
      var e = REG[path];
      if (e) { if (e.a.paused) e.a.play(); else e.a.pause(); return; }
      pb.disabled = true;
      try {
        var blob = await vLoad(path);
        if (!blob && path) {
          var u = await vUrl(path);
          var r = await fetch(u);
          if (!r.ok) throw new Error("Vocal indisponible");
          blob = await r.blob();
          await vSave(path, blob); // copie gardée sur le téléphone
          try { api("/rest/v1/rpc/media_listened", { method: "POST", body: JSON.stringify({ p_path: path }) }).catch(function () { }); } catch (e3) { }
        }
        if (!blob) { UIS[path].dur.textContent = "expiré"; return; }
        if (!DUR[path]) { var d0 = await getDur(blob); if (d0) DUR[path] = d0; }
        var a = new Audio(window.URL.createObjectURL(blob));
        REG[path] = { a: a };
        wire(path, a);
        a.play().catch(function (err) { toast(err.message || "Lecture impossible"); });
      } catch (err) {
        UIS[path].dur.textContent = "indispo";
        toast(err.message);
      } finally {
        pb.disabled = false;
        try { UIS[path].pb.disabled = false; } catch (e2) { }
      }
    };
    return w;
  };
})();
