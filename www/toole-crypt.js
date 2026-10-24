(function () {
  "use strict";
  if (window.__tcrypt) return; window.__tcrypt = 1;
  var KEYB64 = "__CLE__";
  var MAGIC = [84, 69, 78, 67, 49]; /* "TENC1" */
  var subtle = window.crypto && window.crypto.subtle, keyP = null;
  function getKey() {
    if (!keyP) {
      var raw = Uint8Array.from(atob(KEYB64), function (c) { return c.charCodeAt(0); });
      if (raw.length !== 32) throw new Error("Clé de chiffrement invalide");
      keyP = subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
    }
    return keyP;
  }
  async function enc(blob) {
    var key = await getKey();
    var iv = window.crypto.getRandomValues(new Uint8Array(12));
    var mime = new TextEncoder().encode(blob.type || "application/octet-stream").slice(0, 255);
    var plain = await blob.arrayBuffer();
    var ct = await subtle.encrypt({ name: "AES-GCM", iv: iv }, key, plain);
    return new Blob([new Uint8Array(MAGIC), new Uint8Array([mime.length]), mime, iv, ct], { type: "application/octet-stream" });
  }
  function isEnc(u8) {
    if (u8.length < 36) return false;
    for (var i = 0; i < 5; i++) if (u8[i] !== MAGIC[i]) return false;
    return true;
  }
  async function dec(buf) {
    var u8 = new Uint8Array(buf);
    if (!isEnc(u8)) return null;
    var ml = u8[5], mime = new TextDecoder().decode(u8.subarray(6, 6 + ml));
    var iv = u8.subarray(6 + ml, 18 + ml), ct = u8.subarray(18 + ml);
    var plain = await subtle.decrypt({ name: "AES-GCM", iv: iv }, await getKey(), ct);
    return new Blob([plain], { type: mime });
  }
  /* ---- envoi : photos, vidéos (tgUpload) ---- */
  function wrapUp() {
    var o = window.tgUpload;
    if (typeof o !== "function" || o.__c) return;
    var w = async function (b, p) {
      var e = await enc(b);
      if (o.__r) return o(e, p);
      var err;
      for (var i = 0; i < 3; i++) { try { return await o(e, p); } catch (x) { err = x; await new Promise(function (r) { setTimeout(r, 800); }); } }
      throw err;
    };
    w.__c = 1; w.__r = 1; window.tgUpload = w;
  }
  wrapUp(); setInterval(wrapUp, 300);
  /* ---- vocaux (envoi) et téléchargement de tout fichier chiffré ---- */
  var prev = window.fetch.bind(window);
  window.fetch = async function (input, init) {
    var u = typeof input === "string" ? input : (input && input.url) || "";
    var m = String((init && init.method) || (input && input.method) || "GET").toUpperCase();
    if (m === "POST" && u.indexOf("/storage/v1/object/voice/") > -1 && init && init.body && init.body.size) {
      var e = await enc(init.body); /* si le chiffrement échoue, rien n'est envoyé */
      init = Object.assign({}, init, { body: e });
    }
    var r = await prev(input, init);
    if (m === "GET" && r.ok && (u.indexOf("/functions/v1/tg?") > -1 || u.indexOf("/storage/v1/object/") > -1)) {
      var buf = await r.arrayBuffer(), b = null;
      try { b = await dec(buf); } catch (x) { b = null; }
      if (b) return new Response(b, { status: 200, headers: { "Content-Type": b.type || "application/octet-stream" } });
      return new Response(buf, { status: r.status, statusText: r.statusText, headers: r.headers });
    }
    return r;
  };
})();
