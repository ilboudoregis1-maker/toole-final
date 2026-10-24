(function () {
  var CLOUD = "mydh3xtz";
  var PRESET = "TÕÕLé-app";
  var CUTOVER = 1792274400000; // vocaux envoyés après cette date = Cloudinary
  var MARK = "/storage/v1/object/voice/";
  var origFetch = window.fetch.bind(window);

  function isNew(path) {
    var m = /\/(\d{13})-/.exec(path);
    return !!m && Number(m[1]) >= CUTOVER;
  }

  window.fetch = async function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || "";
    var i = url.indexOf(MARK);
    if (i > -1 && init && init.method === "POST") {
      var path = url.slice(i + MARK.length);
      var form = new FormData();
      form.append("file", init.body);
      form.append("upload_preset", PRESET);
      form.append("public_id", "toole/" + path.replace(/\.[^.\/]+$/, ""));
      var r = await origFetch(
        "https://api.cloudinary.com/v1_1/" + CLOUD + "/video/upload",
        { method: "POST", body: form, signal: init.signal }
      );
      if (!r.ok) return new Response(await r.text(), { status: r.status });
      try { api("/rest/v1/media", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ owner: me(), kind: "voice", size_bytes: (init.body && init.body.size) || null, resource_type: "video", path: path, public_id: "toole/" + path.slice(0, path.lastIndexOf(".")), expires_at: new Date(Date.now() + 15 * 864e5).toISOString() }) }).catch(function () { }); } catch (e) { }
      return new Response("{}", { status: 200 });
    }
    return origFetch(input, init);
  };

  var oldVUrl = window.vUrl;
  window.vUrl = async function (path) {
    if (isNew(path))
      return "https://res.cloudinary.com/" + CLOUD + "/video/upload/toole/" + path;
    return oldVUrl(path);
  };
})();
