(function () {
  var style = document.createElement("style");
  style.textContent =
    ".sdbtn{position:fixed;right:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 92px);" +
    "width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;" +
    "z-index:40;cursor:pointer;border:2px solid transparent;" +
    "background:linear-gradient(#0b1b3a,#13296a) padding-box,linear-gradient(135deg,#00e5ff,#7c3aed) border-box;" +
    "box-shadow:0 0 16px rgba(0,229,255,.55),0 6px 16px rgba(0,0,0,.35);" +
    "opacity:0;transform:translateY(12px) scale(.8);pointer-events:none;" +
    "transition:opacity .22s,transform .22s}" +
    ".sdbtn.on{opacity:1;transform:none;pointer-events:auto}" +
    ".sdbtn:active{transform:scale(.9)}" +
    ".sdbtn::after{content:'';position:absolute;inset:-6px;border-radius:50%;" +
    "border:2px solid rgba(0,229,255,.55);animation:sdpulse 1.8s ease-out infinite;pointer-events:none}" +
    "@keyframes sdpulse{0%{transform:scale(.85);opacity:.9}100%{transform:scale(1.3);opacity:0}}" +
    ".sdbtn svg{width:24px;height:24px;fill:none;stroke:#fff;stroke-width:2.6;" +
    "stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 4px #00e5ff);" +
    "animation:sdbob 1.4s ease-in-out infinite}" +
    "@keyframes sdbob{0%,100%{transform:translateY(-2px)}50%{transform:translateY(2px)}}";
  document.head.appendChild(style);

  function setup(id) {
    var box = document.getElementById(id);
    if (!box) return;
    var b = document.createElement("div");
    b.className = "sdbtn";
    b.setAttribute("role", "button");
    b.setAttribute("aria-label", "Aller en bas");
    b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 6l5 5 5-5M7 13l5 5 5-5"/></svg>';
    document.body.appendChild(b);

    function update() {
      var shown = box.offsetParent !== null;
      var far = box.scrollHeight - box.scrollTop - box.clientHeight > 200;
      b.classList.toggle("on", shown && far);
    }
    b.onclick = function () {
      try { box.scrollTo({ top: box.scrollHeight, behavior: "smooth" }); }
      catch (e) { box.scrollTop = box.scrollHeight; }
    };
    box.addEventListener("scroll", update, { passive: true });
    setInterval(update, 400);
    update();
  }

  setup("chat");
  setup("gMsgs");
})();
