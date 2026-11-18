/* TÕÕLé - code de sécurité d'un contact : permet de vérifier que personne n'a remplacé la clé de chiffrement.
   Le même code s'affiche chez les deux personnes (à comparer en personne ou par appel). */
(function () {
  "use strict";
  if (window.__tsafe) return; window.__tsafe = 1;
  var S = window.crypto && window.crypto.subtle; if (!S) return;

  function me0() { try { return me(); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function canon(pub) { try { var j = JSON.parse(pub); return j && j.x && j.y ? "P-256:" + j.x + "." + j.y : null; } catch (e) { return null; } }
  function hex(u8, n) { var s = ""; for (var i = 0; i < u8.length && s.length < n; i++) s += ("0" + u8[i].toString(16)).slice(-2); return s.slice(0, n); }
  async function fp(str) { return hex(new Uint8Array(await S.digest("SHA-256", new TextEncoder().encode(str))), 32); }
  /* 12 groupes de 5 chiffres, identiques des deux côtés (les deux clés sont triées avant le calcul) */
  async function digits(keys) {
    var h = new Uint8Array(await S.digest("SHA-512", new TextEncoder().encode(keys.slice().sort().join("|")))), out = [];
    for (var i = 0; i < 12; i++) {
      var n = ((h[i * 4] << 24) | (h[i * 4 + 1] << 16) | (h[i * 4 + 2] << 8) | h[i * 4 + 3]) >>> 0;
      out.push(("00000" + (n % 100000)).slice(-5));
    }
    return out;
  }
  window.__tsafeDigits = digits;

  function rk(id) { return "tsafe:" + me0() + ":" + id; }
  function load(id) { try { return JSON.parse(localStorage.getItem(rk(id)) || "null"); } catch (e) { return null; } }
  function save(id, o) { try { localStorage.setItem(rk(id), JSON.stringify(o)); } catch (e) { } }

  /* état : none (pas de clé), ok (clé connue, non vérifiée), ver (vérifiée), chg (la clé a changé) */
  async function state(id) {
    var pub = window.__e2ePub ? await window.__e2ePub(id) : null, c = pub && canon(pub);
    if (!c) return { s: "none" };
    var f = await fp(c), r = load(id);
    if (!r) { r = { fp: f, v: false }; save(id, r); }
    if (r.fp !== f) return { s: "chg", fp: f, c: c };
    return { s: r.v ? "ver" : "ok", fp: f, c: c };
  }
  var LAB = { none: "Pas de clé", ok: "Non vérifié", ver: "Vérifié ✓", chg: "⚠ Changé" };

  async function openSafety(p) {
    var st = await state(p.id), mine = window.__e2ePub ? await window.__e2ePub(me0()) : null, mc = mine && canon(mine);
    var nm = esc(p.pseudo || "Contact"), h = '<div class="sht">Code de sécurité · ' + nm + '</div>';
    if (st.s === "none" || !mc) {
      h += '<div class="sx-s" style="padding:6px 8px">' + nm + ' n’a pas encore de clé de chiffrement (application pas à jour). Ses messages ne sont pas chiffrés de bout en bout.</div>';
      h += '<button class="sa cc" onclick="closeSheet()">Fermer</button>';
      sheetEl(h); return;
    }
    var d = await digits([mc, st.c]), g = "";
    for (var i = 0; i < 12; i++) g += '<span style="display:inline-block;width:25%;text-align:center;font:600 17px/2 monospace">' + d[i] + '</span>';
    if (st.s === "chg") h += '<div class="sx-s" style="padding:6px 8px;color:#e5484d"><b>Le code de sécurité de ' + nm + ' a changé.</b> Il a peut-être réinstallé l’application, ou quelqu’un se fait passer pour lui. Compare le nouveau code avant de continuer.</div>';
    h += '<div style="padding:6px 4px">' + g + '</div>';
    h += '<div class="sx-s" style="padding:0 8px 8px">Compare ces chiffres avec ceux affichés chez ' + nm + ', en personne ou par appel. S’ils sont identiques, vos messages sont chiffrés entre vous seuls.</div>';
    h += '<div class="sx-s" style="padding:0 8px 8px">État : <b>' + LAB[st.s] + '</b></div>';
    if (st.s === "chg") h += '<button class="sa" id="tsAcc">Accepter le nouveau code</button>';
    else h += '<button class="sa" id="tsVer">' + (st.s === "ver" ? "Retirer « vérifié »" : "Marquer comme vérifié") + '</button>';
    h += '<button class="sa cc" onclick="closeSheet()">Fermer</button>';
    var sh = sheetEl(h), a = sh.querySelector("#tsAcc"), v = sh.querySelector("#tsVer");
    if (a) a.onclick = function () { save(p.id, { fp: st.fp, v: false }); closeSheet(); try { toast("Nouveau code accepté"); } catch (e) { } refreshRow(); };
    if (v) v.onclick = function () { save(p.id, { fp: st.fp, v: st.s !== "ver" }); closeSheet(); try { toast(st.s === "ver" ? "Vérification retirée" : "Contact vérifié"); } catch (e) { } refreshRow(); };
  }

  function refreshRow() {
    var b = document.getElementById("cdSafeS"), p = window.__tcdCur; if (!b || !p) return;
    state(p.id).then(function (st) { b.textContent = LAB[st.s]; b.style.color = st.s === "chg" ? "#e5484d" : ""; }).catch(function () { b.textContent = "—"; });
  }
  function inject() {
    var body = document.getElementById("cdBody"), p = window.__tcdCur;
    if (!body || !p || !p.id || document.getElementById("cdSafe")) return;
    var card = body.querySelector(".cd-card"); if (!card) return;
    var w = document.createElement("div"); w.id = "cdSafe"; w.className = "cd-card";
    w.innerHTML = '<div class="cd-r" style="cursor:pointer"><span>🔐 Code de sécurité</span><b id="cdSafeS">…</b></div>';
    w.onclick = function () { openSafety(p).catch(function () { try { toast("Code indisponible"); } catch (e) { } }); };
    card.parentNode.insertBefore(w, card.nextSibling);
    refreshRow();
  }
  var tm = null;
  function later() { clearTimeout(tm); tm = setTimeout(inject, 150); }
  function init() { new MutationObserver(later).observe(document.body, { childList: true, subtree: true }); later(); }
  if (document.readyState === "complete") init(); else window.addEventListener("load", init);
})();
