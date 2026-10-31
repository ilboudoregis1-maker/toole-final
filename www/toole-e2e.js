(function () {
  "use strict";
  if (window.__e2e) return; window.__e2e = 1;
  var S = window.crypto && window.crypto.subtle; if (!S) return;
  var TE = new TextEncoder(), TD = new TextDecoder();
  var LOCK = "🔒 Message chiffré (illisible sur cet appareil)";
  var CURVE = { name: "ECDH", namedCurve: "P-256" };
  function b64(u8) { var s = ""; for (var i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); }
  function ub(s) { var r = atob(s), u = new Uint8Array(r.length); for (var i = 0; i < r.length; i++) u[i] = r.charCodeAt(i); return u; }
  function rnd(n) { return window.crypto.getRandomValues(new Uint8Array(n)); }
  function uid() { try { var v = me(); if (v) return v; } catch (e) { } try { return JSON.parse(localStorage.getItem("toole_session")).user.id; } catch (e) { return null; } }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { } }
  function idb() { return new Promise(function (res, rej) { var r = indexedDB.open("toole_e2e", 1); r.onupgradeneeded = function () { r.result.createObjectStore("k"); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
  async function idbGet(k) { var d = await idb(); return new Promise(function (res, rej) { var q = d.transaction("k").objectStore("k").get(k); q.onsuccess = function () { res(q.result || null); }; q.onerror = function () { rej(q.error); }; }); }
  async function idbSet(k, v) { var d = await idb(); return new Promise(function (res, rej) { var t = d.transaction("k", "readwrite"); t.objectStore("k").put(v, k); t.oncomplete = function () { res(); }; t.onerror = function () { rej(t.error); }; }); }
  var kpP = {};
  function myKP() {
    var u = uid(); if (!u) return Promise.reject(new Error("Non connecté"));
    return kpP[u] || (kpP[u] = (async function () {
      var v = await idbGet("kp:" + u); if (v && v.priv && v.pub) return v;
      var kp = await S.generateKey(CURVE, false, ["deriveKey"]);
      v = { priv: kp.privateKey, pub: JSON.stringify(await S.exportKey("jwk", kp.publicKey)) };
      await idbSet("kp:" + u, v); return v;
    })().catch(function (e) { delete kpP[u]; throw e; }));
  }
  var pubDone = {};
  async function publish() {
    var u = uid(); if (!u) throw new Error("Non connecté");
    var kp = await myKP(); if (pubDone[u] === kp.pub) return;
    var rows = await api("/rest/v1/profiles?select=id,pubkey&id=eq." + u);
    if (!(rows && rows[0] && rows[0].pubkey === kp.pub))
      await api("/rest/v1/profiles?id=eq." + u, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ pubkey: kp.pub }) });
    pubDone[u] = kp.pub;
  }
  setInterval(function () { publish().catch(function () { }); }, 4000);
  var pkC = {}, shC = {};
  async function peerPub(id) {
    var c = pkC[id]; if (c && Date.now() - c.t < 600000) return c.s;
    var s = null;
    if (id === uid()) s = (await myKP()).pub;
    else {
      try { var rows = await api("/rest/v1/profiles?select=id,pubkey&id=eq." + id); s = rows && rows[0] && rows[0].pubkey || null; if (s) ls("e2e_pk:" + id, s); }
      catch (e) { s = ls("e2e_pk:" + id); }
      if (!s) s = ls("e2e_pk:" + id);
    }
    if (s) pkC[id] = { t: Date.now(), s: s };
    return s;
  }
  async function shared(id) {
    var s = await peerPub(id); if (!s) return null;
    var c = shC[id]; if (c && c.s === s) return c.k;
    var pk = await S.importKey("jwk", JSON.parse(s), CURVE, false, []);
    var k = await S.deriveKey({ name: "ECDH", public: pk }, (await myKP()).priv, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    shC[id] = { s: s, k: k }; return k;
  }
  var memC = {};
  async function members(g) {
    var c = memC[g]; if (c && Date.now() - c.t < 30000) return c.v;
    var rows = await api("/rest/v1/group_members?select=user_id&group_id=eq." + g);
    var v = rows.map(function (r) { return r.user_id; }); memC[g] = { t: Date.now(), v: v }; return v;
  }
  var MK = {}; try { MK = JSON.parse(ls("e2e_mk") || "{}"); } catch (e) { }
  function saveMK() { try { var k = Object.keys(MK); if (k.length > 600) k.slice(0, k.length - 600).forEach(function (x) { delete MK[x]; }); ls("e2e_mk", JSON.stringify(MK)); } catch (e) { } }
  var MAGIC = [84, 69, 78, 67, 50];
  async function mEnc(blob, path) {
    var raw = rnd(32), key = await S.importKey("raw", raw, "AES-GCM", false, ["encrypt"]), iv = rnd(12);
    var mime = TE.encode(blob.type || "application/octet-stream").slice(0, 255);
    var ct = await S.encrypt({ name: "AES-GCM", iv: iv }, key, await blob.arrayBuffer());
    MK[path] = b64(raw); saveMK();
    return new Blob([new Uint8Array(MAGIC), new Uint8Array([mime.length]), mime, iv, new Uint8Array(ct)], { type: "application/octet-stream" });
  }
  function isEnc(u8) { if (u8.length < 36) return false; for (var i = 0; i < 5; i++) if (u8[i] !== MAGIC[i]) return false; return true; }
  async function mDec(u8, path) {
    for (var i = 0; i < 25 && !MK[path]; i++) await new Promise(function (r) { setTimeout(r, 100); });
    if (!MK[path]) return null;
    var ml = u8[5], mime = TD.decode(u8.subarray(6, 6 + ml)), iv = u8.subarray(6 + ml, 18 + ml), ct = u8.subarray(18 + ml);
    var key = await S.importKey("raw", ub(MK[path]), "AES-GCM", false, ["decrypt"]);
    return new Blob([await S.decrypt({ name: "AES-GCM", iv: iv }, key, ct)], { type: mime });
  }
  function mediaPath(u) {
    var m = u.match(/[?&]p=([^&]+)/); if (u.indexOf("/functions/v1/tg?") > -1 && m) return decodeURIComponent(m[1]);
    m = u.match(/\/storage\/v1\/object\/(?:sign\/|public\/|authenticated\/)?[^\/]+\/([^?]+)/); return m ? decodeURIComponent(m[1]) : "";
  }
  function mkFor(row) { var j = JSON.stringify([row.body, row.audio_path]), o = {}, n = 0; for (var p in MK) if (j.indexOf(p) > -1) { o[p] = MK[p]; n++; } return n ? o : undefined; }
  async function enc1(peer, plain) {
    var k = await shared(peer); if (!k) throw new Error("NOKEY"); var me0 = uid(), iv = rnd(12);
    var ct = await S.encrypt({ name: "AES-GCM", iv: iv, additionalData: TE.encode(me0 + ">" + peer) }, k, TE.encode(plain));
    return "E1." + me0 + "." + peer + "." + b64(iv) + "." + b64(new Uint8Array(ct));
  }
  async function encG(ids, plain) {
    var me0 = uid(), cek = await S.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt"]), iv = rnd(12);
    var ct = await S.encrypt({ name: "AES-GCM", iv: iv }, cek, TE.encode(plain)), raw = await S.exportKey("raw", cek), k = {};
    if (ids.indexOf(me0) < 0) ids = ids.concat([me0]);
    for (var i = 0; i < ids.length; i++) {
      var sk = await shared(ids[i]); if (!sk) continue; var iv2 = rnd(12);
      k[ids[i]] = [b64(iv2), b64(new Uint8Array(await S.encrypt({ name: "AES-GCM", iv: iv2 }, sk, raw)))];
    }
    return "G1." + b64(TE.encode(JSON.stringify({ s: me0, i: b64(iv), c: b64(new Uint8Array(ct)), k: k })));
  }
  async function decStr(str) {
    try {
      var me0 = uid(), pt;
      if (str.slice(0, 3) === "E1.") {
        var p = str.split("."), s = p[1], r = p[2], peer = s === me0 ? r : s, k = await shared(peer); if (!k) return null;
        pt = await S.decrypt({ name: "AES-GCM", iv: ub(p[3]), additionalData: TE.encode(s + ">" + r) }, k, ub(p[4]));
      } else if (str.slice(0, 3) === "G1.") {
        var o = JSON.parse(TD.decode(ub(str.slice(3)))), w = o.k && o.k[me0]; if (!w) return null;
        var sk = await shared(o.s); if (!sk) return null;
        var raw = await S.decrypt({ name: "AES-GCM", iv: ub(w[0]) }, sk, ub(w[1]));
        var cek = await S.importKey("raw", raw, "AES-GCM", false, ["decrypt"]);
        pt = await S.decrypt({ name: "AES-GCM", iv: ub(o.i) }, cek, ub(o.c));
      } else return str;
      var t = TD.decode(pt);
      try { var j = JSON.parse(t); if (j && typeof j.b === "string") { if (j.m) { for (var x in j.m) MK[x] = j.m[x]; saveMK(); } return j.b; } } catch (e) { }
      return t;
    } catch (e) { return null; }
  }
  async function walk(x) {
    if (Array.isArray(x)) { await Promise.all(x.map(walk)); return; }
    if (!x || typeof x !== "object") return;
    for (var k in x) {
      var v = x[k];
      if (typeof v === "string" && (v.slice(0, 3) === "E1." || v.slice(0, 3) === "G1.")) { var d = await decStr(v); x[k] = d === null ? LOCK : d; }
      else if (v && typeof v === "object") await walk(v);
    }
  }
  async function encRow(row, group) {
    if (!row || typeof row.body !== "string" || /^(E1|G1)\./.test(row.body)) return;
    await publish();
    var plain = JSON.stringify({ b: row.body, m: mkFor(row) }), ids = group ? await members(row.group_id) : null;
    var rt = typeof row.reply_text === "string" && row.reply_text ? JSON.stringify({ b: row.reply_text }) : null;
    if (group) { row.body = await encG(ids, plain); if (rt) row.reply_text = await encG(ids, rt); }
    else { row.body = await enc1(row.receiver, plain); if (rt) row.reply_text = await enc1(row.receiver, rt); }
  }
  var prev = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    var u = typeof input === "string" ? input : (input && input.url) || "";
    var m = String((init && init.method) || (input && input.method) || "GET").toUpperCase();
    if (m === "POST" && /\/rest\/v1\/(messages|group_messages)(\?|$)/.test(u) && init && typeof init.body === "string") {
      var g = u.indexOf("group_messages") > -1, o = JSON.parse(init.body);
      try { if (Array.isArray(o)) { for (var i = 0; i < o.length; i++) await encRow(o[i], g); } else await encRow(o, g); }
      catch (e) { throw new Error(e && e.message === "NOKEY" ? "Ce contact doit ouvrir la dernière version de TÕÕLé pour recevoir des messages chiffrés" : "Chiffrement impossible : " + (e && e.message)); }
      init = Object.assign({}, init, { body: JSON.stringify(o) });
    } else if (m === "POST" && /\/storage\/v1\/object\/(voice|photos)\//.test(u) && init && init.body && init.body.size) {
      var e2 = await mEnc(init.body, mediaPath(u)); init = Object.assign({}, init, { body: e2 });
    }
    var r = await prev(input, init);
    if (!r.ok) return r;
    var ct = (r.headers.get("content-type") || "");
    if (u.indexOf("/rest/v1/") > -1 && ct.indexOf("json") > -1) {
      var txt = await r.clone().text();
      if (txt.indexOf('"E1.') > -1 || txt.indexOf('"G1.') > -1) {
        var data = JSON.parse(txt); await walk(data);
        var h = new Headers(r.headers); h.delete("content-length"); h.delete("content-encoding");
        return new Response(JSON.stringify(data), { status: r.status, statusText: r.statusText, headers: h });
      }
      return r;
    }
    if (m === "GET" && (u.indexOf("/functions/v1/tg?") > -1 || /\/storage\/v1\/object\/(?!public\/avatars)/.test(u))) {
      var buf = await r.arrayBuffer(), u8 = new Uint8Array(buf);
      if (isEnc(u8)) { var b = await mDec(u8, mediaPath(u)); if (b) return new Response(b, { status: 200, headers: { "Content-Type": b.type || "application/octet-stream" } }); }
      return new Response(buf, { status: r.status, statusText: r.statusText, headers: r.headers });
    }
    return r;
  };
  function wrapUp() {
    var o = window.tgUpload; if (typeof o !== "function" || o.__e) return;
    var w = async function (b, p) { return o(await mEnc(b, p), p); }; w.__e = 1; window.tgUpload = w;
  }
  wrapUp(); setInterval(wrapUp, 300);
})();
