#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Présence : correctif connexion (presence enabled) + écran « Diagnostic présence » (Profil)
# Compile TÕÕLé (main) ET la copie Test (branche nopush) à jour.
# Usage (dans ~/toole-final) : bash apply-realtime-diag.sh
set -e
cd ~/toole-final || { echo "Dossier ~/toole-final introuvable"; exit 1; }
git checkout main
# (idempotent) corrections précédentes
sed -i 's/__trt/__trin/g' www/toole-realtime.js
TOK='(function(){try{var s=sess();return s\&\&s.access_token||KEY}catch(e){return KEY}})()'
sed -i "s/access_token:KEY/access_token:$TOK/g" www/toole-typing.js www/toole-online.js
# nouveau : présence explicitement activée à la connexion
sed -i 's/presence:{key:""}/presence:{key:"",enabled:true}/; s/presence:{key:key}/presence:{key:key,enabled:true}/' www/toole-typing.js www/toole-online.js
echo "enabled: typing=$(grep -c 'enabled:true' www/toole-typing.js) online=$(grep -c 'enabled:true' www/toole-online.js)"
cat > www/toole-presence.js <<'EOFJS'
/* TÕÕLé — présence « en ligne » (point vert) + « écrit… » fiables */
(function () {
  "use strict";
  if (window.__tpres) return; window.__tpres = 1;
  var on = {}, typUntil = 0;
  function TR() { return window.__trt || null; }
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function myId() { try { var t = TR(); return t ? t.mid() : null; } catch (e) { return null; } }
  function peerId() { try { var t = TR(); return t ? t.cur() : null; } catch (e) { return null; } }
  function chat() { var s = document.getElementById("scrChat"); return s && !s.classList.contains("hide") ? s : null; }

  var LOG = [], lastWs = null;
  function lg(x) { LOG.push(new Date().toTimeString().slice(0, 8) + " " + x); if (LOG.length > 40) LOG.shift(); }
  function sum(m) {
    var p = m.payload || {}, r = p.response || {};
    return String(m.topic || "").replace("realtime:", "").slice(0, 22) + " " + m.event + (p.status ? " " + p.status : "") +
      (r.reason ? " " + String(r.reason).slice(0, 60) : "") + (m.event === "presence_state" ? " n=" + Object.keys(p).length : "");
  }
  var lastErr = 0;
  function warn(m) {
    var t = String(m.topic || "");
    var bad = (m.event === "phx_reply" && m.payload && m.payload.status === "error" && /realtime:(online|typing)-/.test(t)) ||
      (m.event === "system" && m.payload && m.payload.status === "error");
    if (!bad || Date.now() - lastErr < 120000) return;
    lastErr = Date.now();
    var r = (m.payload.response && (m.payload.response.reason || JSON.stringify(m.payload.response))) || m.payload.message || "erreur";
    try { toast("Présence indisponible : " + String(r).slice(0, 80)); } catch (e) { }
  }
  function track(m) {
    if (m.topic !== "phoenix") lg(sum(m));
    warn(m);
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
  setInterval(function () {
    try {
      paint();
      var t = TR(), w = t && t.ws();
      if (w !== lastWs) {
        lastWs = w; lg(w ? "ws créé (état " + w.readyState + ")" : "ws absent");
        if (w && !w.__d) {
          w.__d = 1;
          w.addEventListener("open", function () { lg("ws ouvert"); });
          w.addEventListener("close", function (e) { lg("ws fermé " + e.code + " " + (e.reason || "")); });
          w.addEventListener("error", function () { lg("ws erreur"); });
        }
      }
    } catch (e) { }
  }, 500);
  /* jeton à jour : rafraîchi toutes les 10 min, connexion recyclée toutes les 25 min (le serveur coupe un jeton expiré) */
  setInterval(function () {
    if (document.visibilityState === "hidden") return;
    try { if (typeof api === "function") api("/rest/v1/profiles?select=id&limit=1").catch(function () { }); } catch (e) { }
  }, 600000);
  setInterval(function () {
    try { var t = TR(), s = t && t.ws(); if (s && s.readyState === 1) s.close(); } catch (e) { }
  }, 1500000);

  function diag() {
    var t = TR(), w = t && t.ws(), tok = "jeton ?";
    try {
      var a = sess().access_token, pl = JSON.parse(atob(a.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      var left = Math.round((pl.exp * 1000 - Date.now()) / 60000); tok = left > 0 ? "jeton ok (" + left + " min)" : "JETON EXPIRÉ";
    } catch (e) { }
    var st = w ? ["connexion…", "OUVERT", "fermeture", "fermé"][w.readyState] : "pas de connexion";
    var info = ["Connexion : " + st, tok, "Moi : " + String(myId()).slice(0, 8), "Contact : " + String(peerId()).slice(0, 8),
      "Ma présence : " + (ls("toole_online") !== "0" ? "oui" : "non") + " · écrit : " + (ls("toole_typing") !== "0" ? "oui" : "non"),
      "Vu en ligne : " + JSON.stringify(on).slice(0, 140), "---"].concat(LOG.slice(-25)).join("\n");
    var sh = sheetEl('<div class="sht">Diagnostic présence</div><pre id="dgP" style="white-space:pre-wrap;font:11px/1.4 monospace;max-height:55vh;overflow:auto;user-select:text"></pre><button class="sa" id="dgR">Reconnecter</button><button class="sa cc" id="dgX">Fermer</button>');
    sh.querySelector("#dgP").textContent = info;
    sh.querySelector("#dgR").onclick = function () { try { var x = TR().ws(); if (x) x.close(); lg("reconnexion demandée"); } catch (e) { } closeSheet(); };
    sh.querySelector("#dgX").onclick = closeSheet;
  }
  var dq = 0;
  new MutationObserver(function () {
    if (dq) return; dq = 1;
    requestAnimationFrame(function () {
      dq = 0; var p = document.getElementById("scrProfil");
      if (!p || document.getElementById("tsDiag")) return;
      var b = document.createElement("button"); b.id = "tsDiag"; b.type = "button"; b.textContent = "Diagnostic présence";
      b.style.cssText = "display:block;width:calc(100% - 32px);margin:10px 16px;padding:12px;border-radius:14px;border:1px solid rgba(0,168,200,.35);background:transparent;font-size:15px;color:inherit";
      b.onclick = diag; p.appendChild(b);
    });
  }).observe(document.body, { childList: true, subtree: true });

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
EOFJS
git add -A
git commit -m "Présence : presence enabled, diagnostic" || true
git push
gh workflow run build.yml

# Copie Test (sans push), refaite à partir de main
git checkout -B nopush main
sed -i '0,/<head>/s##<head><script>window.TOOLE_PUSH_OFF=true</script>#' www/index.html
sed -i 's#<script src="toole-push.js"></script>##g' www/index.html
sed -i -E "0,/appId/ s#(appId[\"']?[[:space:]]*:[[:space:]]*[\"'])([^\"']+)([\"'])#\1\2.nopush\3#" capacitor.config.json
sed -i -E 's#("appName"[[:space:]]*:[[:space:]]*")[^"]*"#\1Test"#' capacitor.config.json
sed -i -E 's#(applicationId[[:space:]]+")([^"]+)(")#\1\2.nopush\3#' android/app/build.gradle
sed -i -E 's#(<string name="app_name">)[^<]*(</string>)#\1Test\2#; s#(<string name="title_activity_main">)[^<]*(</string>)#\1Test\2#' android/app/src/main/res/values/strings.xml
sed -i '/google-services.json/d' .github/workflows/build.yml
find . -name google-services.json -not -path "./node_modules/*" -delete
git add -A
git commit -m "Test : copie sans push, à jour avec main"
git push -u origin nopush --force
git checkout main
gh workflow run build.yml --ref nopush
sleep 12
IDM=$(gh run list --workflow=build.yml --branch main --limit 1 --json databaseId -q '.[0].databaseId')
IDT=$(gh run list --workflow=build.yml --branch nopush --limit 1 --json databaseId -q '.[0].databaseId')
echo "TÕÕLé : $IDM   Test : $IDT"
gh run watch "$IDM" --exit-status
gh run watch "$IDT" --exit-status
rm -rf ~/storage/downloads/tooole-apk-new ~/storage/downloads/tooole-test
gh run download "$IDM" -D ~/storage/downloads/tooole-apk-new
gh run download "$IDT" -D ~/storage/downloads/tooole-test
echo "TERMINÉ : TÕÕLé dans tooole-apk-new, Test dans tooole-test"
