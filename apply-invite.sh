#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Invitation de groupe : écran du code (copier/partager/envoyer) + carte « Rejoindre »
# Usage (dans ~/toole-final) : bash apply-invite.sh
set -e
cd ~/toole-final || { echo "Dossier ~/toole-final introuvable"; exit 1; }
git checkout main
cat > www/toole-invite.js <<'EOFJS'
/* TÕÕLé — invitation de groupe : écran du code (copier / partager / envoyer) + carte « Rejoindre » dans la discussion */
(function () {
  "use strict";
  if (window.__tinv) return; window.__tinv = 1;
  var MK = "\u2063INVX:";
  function $(i) { return document.getElementById(i); }
  function say(m) { try { toast(m); } catch (e) { try { alert(m); } catch (x) { } } }
  function esc(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function gname() { try { return (gCur && gCur.name) || "Groupe"; } catch (e) { return "Groupe"; } }
  function gcode() { try { return (gCur && gCur.invite_code) || ""; } catch (e) { return ""; } }
  function copy(t, ok) {
    function fb() { var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) { } ta.remove(); say(ok); }
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { say(ok); }, fb); else fb(); } catch (e) { fb(); }
  }

  /* ---------- écran d'invitation ---------- */
  function showInvite(code, name) {
    var msg = "Rejoins le groupe « " + name + " » sur TÕÕLé : Groupes > Rejoindre avec un code, puis entre " + code;
    var sh = sheetEl('<div class="sht">Inviter dans « ' + esc(name) + ' »</div>' +
      '<div id="ivCode" style="text-align:center;font-size:26px;font-weight:700;letter-spacing:.12em;padding:14px 0;color:#0a7cff"></div>' +
      '<button class="sa" id="ivSend">Envoyer à un contact</button><button class="sa" id="ivShare">Partager</button>' +
      '<button class="sa" id="ivCopy">Copier le code</button><button class="sa cc" id="ivX">Fermer</button>');
    sh.querySelector("#ivCode").textContent = code;
    sh.querySelector("#ivSend").onclick = function () { pick(code, name); };
    sh.querySelector("#ivShare").onclick = function () {
      if (navigator.share) navigator.share({ text: msg }).catch(function () { }); else copy(msg, "Message copié, colle-le où tu veux");
    };
    sh.querySelector("#ivCopy").onclick = function () { copy(code, "Code copié"); };
    sh.querySelector("#ivX").onclick = closeSheet;
  }
  async function pick(code, name) {
    var sh = sheetEl('<div class="sht">Envoyer l\u2019invitation à…</div><div id="ivL"></div><button class="sa cc" id="ivC">Annuler</button>');
    sh.querySelector("#ivC").onclick = function () { showInvite(code, name); };
    var L = sh.querySelector("#ivL");
    try {
      var list = await contactsList();
      if (!list.length) { L.textContent = "Aucun contact : ouvre d\u2019abord une discussion avec la personne."; return; }
      list.forEach(function (c) {
        var nm = c.pseudo || "?", b = document.createElement("button"); b.className = "sa"; b.textContent = nm;
        b.onclick = function () { sendInv(c.id, nm, code, name); };
        L.appendChild(b);
      });
    } catch (e) { say(e.message); }
  }
  function sendInv(id, nm, code, name) {
    var body = "👥 Invitation au groupe « " + name + " » — code " + code + MK + code + "|" + name;
    api("/rest/v1/messages", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ sender: me(), receiver: id, body: body }) })
      .then(function () { closeSheet(); say("Invitation envoyée à " + nm); })
      .catch(function (e) { say(e.message); });
  }

  /* ---------- carte « Rejoindre » ---------- */
  function join(code, b) {
    b.disabled = true; b.textContent = "…";
    api("/rest/v1/rpc/join_group_by_code", { method: "POST", body: JSON.stringify({ p_code: code }) }).then(function (r) {
      var g = Array.isArray(r) ? r[0] : r;
      say("Tu as rejoint « " + ((g && g.name) || "") + " »"); b.textContent = "Rejoint ✓";
      if (g && g.id && typeof openGroup === "function") setTimeout(function () { try { openGroup({ id: g.id, name: g.name }); } catch (e) { } }, 500);
    }).catch(function (e) {
      b.disabled = false; b.textContent = "Rejoindre";
      var m = String((e && e.message) || "");
      say(/code_invalide/.test(m) ? "Code invalide ou expiré" : /non_connecte/.test(m) ? "Reconnecte-toi puis réessaie" : "Impossible de rejoindre : " + m);
    });
  }
  function card(code, name) {
    var c = document.createElement("div"); c.className = "tinv";
    var t = document.createElement("div"); t.className = "tinv-t"; t.textContent = "👥 Invitation à un groupe";
    var n = document.createElement("div"); n.className = "tinv-n"; n.textContent = name || "Groupe";
    var b = document.createElement("button"); b.type = "button"; b.className = "tinv-b"; b.textContent = "Rejoindre";
    b.onclick = function (e) { e.stopPropagation(); join(code, b); };
    c.appendChild(t); c.appendChild(n); c.appendChild(b); return c;
  }
  function scan() {
    var box = $("chat"); if (!box) return;
    [].forEach.call(box.querySelectorAll(".m"), function (m) {
      if (m.textContent.indexOf(MK) < 0) return;
      var w = document.createTreeWalker(m, NodeFilter.SHOW_TEXT), n, hit = null;
      while ((n = w.nextNode())) { if (n.nodeValue.indexOf(MK) > -1) { hit = n; break; } }
      if (!hit) return;
      var s = hit.nodeValue, pl = s.slice(s.indexOf(MK) + MK.length).trim(), k = pl.indexOf("|");
      if (k < 1) return;
      hit.parentNode.replaceChild(card(pl.slice(0, k), pl.slice(k + 1)), hit);
      m.classList.add("tinv-m");
    });
    var sc = $("sCode");
    if (sc && gcode() && sc.dataset.tinv !== "1") { sc.dataset.tinv = "1"; sc.textContent = "Inviter avec le code"; }
  }
  var q = 0;
  new MutationObserver(function () { if (q) return; q = 1; requestAnimationFrame(function () { q = 0; try { scan(); } catch (e) { } }); })
    .observe(document.body, { childList: true, subtree: true });
  /* bouton « code » déjà créé : ouvre l'écran d'invitation au lieu d'en recréer un */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest("#sCode");
    if (b && gcode()) { e.stopImmediatePropagation(); e.preventDefault(); showInvite(gcode(), gname()); }
  }, true);

  /* ---------- création du code : vérifie l'enregistrement puis ouvre l'écran d'invitation ---------- */
  var base = window.api;
  window.api = function (path, opt) {
    var p = String(path), o = opt || {};
    if (String(o.method || "").toUpperCase() === "PATCH" && /^\/rest\/v1\/groups\?id=eq\.[^&]+$/.test(p) && String(o.body || "").indexOf("\"invite_code\"") > -1) {
      var code = ""; try { code = JSON.parse(o.body).invite_code; } catch (e) { }
      return base.call(this, p, Object.assign({}, o, { headers: Object.assign({}, o.headers || {}, { Prefer: "return=representation" }) })).then(function (r) {
        if (Array.isArray(r) && !r.length) throw new Error("Code non enregistré (droits) : lance groupes-admin.sql dans Supabase");
        if (code) setTimeout(function () { showInvite(code, gname()); }, 250);
        return r;
      });
    }
    return base.apply(this, arguments);
  };

  var css = document.createElement("style");
  css.textContent = [
    ".tinv{min-width:190px;text-align:center}.tinv-t{font-size:12px;opacity:.85;margin-bottom:2px}.tinv-n{font-size:16px;font-weight:700;margin:2px 0 8px;word-break:break-word}",
    ".tinv-b{display:block;width:100%;padding:9px;border:0;border-radius:10px;background:#0a7cff;color:#fff;font:600 15px system-ui,sans-serif}.tinv-b:disabled{opacity:.7}",
    "#chat .m.me .tinv-b{background:#fff;color:#0a7cff}"
  ].join("\n");
  document.head.appendChild(css);
})();
EOFJS
if ! grep -q "toole-invite.js" www/index.html; then
  if grep -q 'toole-groupes-fix.js"></script>' www/index.html; then
    sed -i 's#<script src="toole-groupes-fix.js"></script>#<script src="toole-groupes-fix.js"></script><script src="toole-invite.js"></script>#' www/index.html
  else
    sed -i 's#</body>#<script src="toole-invite.js"></script>\n</body>#' www/index.html
  fi
fi
grep -q "toole-invite.js" www/index.html || { echo "ERREUR : impossible d'ajouter le script"; exit 1; }
git add -A
git commit -m "Groupes : écran d'invitation (copier, partager, envoyer) + carte Rejoindre"
git push
gh workflow run build.yml
sleep 8
ID=$(gh run list --workflow=build.yml --branch main --limit 1 --json databaseId -q '.[0].databaseId')
echo "Build : $ID"
gh run watch "$ID" --exit-status
rm -rf ~/storage/downloads/tooole-apk-new
gh run download "$ID" -D ~/storage/downloads/tooole-apk-new
