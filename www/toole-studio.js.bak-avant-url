/* TÕÕLé — Studio vidéo : caméra réelle + montage spécial (stickers, texte, musique, filtres)
   + pause de la vidéo au « + » + balayage frais.  Remplace window.tooleEdit. */
(function(){"use strict";if(window.__tzs)return;window.__tzs=1;
var D=document,PLUS="#tvFeed .tvp",bypass=0,inject=null,wasPlaying=false,hadOv=false;
function E(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","tz-toast",m);D.body.appendChild(d);setTimeout(function(){d.remove()},3200)}
function mm(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+("0"+(s%60)).slice(-2)}
function Lmax(){try{return window.__tvDur?window.__tvDur():30}catch(e){return 30}}
function pickMime(){var MR=window.MediaRecorder;if(!MR||!MR.isTypeSupported)return "";return ["video/webm;codecs=vp8,opus","video/webm;codecs=vp9,opus","video/webm"].filter(function(m){return MR.isTypeSupported(m)})[0]||""}

/* ───────── CSS ───────── */
var css=[
".tz-toast{position:fixed;left:16px;right:16px;bottom:96px;z-index:2147483600;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center}",
"#tzCam,#tzEd{position:fixed;inset:0;z-index:2147482000;background:#000;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;overflow:hidden;touch-action:manipulation}",
"#tzEd{z-index:2147483000}",
".tz-btn{border:0;color:#fff;background:rgba(255,255,255,.14);width:42px;height:42px;border-radius:50%;font-size:19px;display:grid;place-items:center;padding:0}",
"#tzCam .cv{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}",
"#tzCam .top{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:linear-gradient(#000a,transparent);z-index:2}",
"#tzCam .len{display:flex;gap:6px}#tzCam .len button{border:0;border-radius:16px;padding:7px 13px;background:rgba(255,255,255,.14);color:#fff;font-weight:800;font-size:13px}#tzCam .len button.on{background:#fff;color:#0a2a66}",
"#tzCam .bot{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-around;padding:20px 12px calc(env(safe-area-inset-bottom,0px) + 26px);background:linear-gradient(transparent,#000b);z-index:2}",
"#tzCam .bot .sd{width:64px;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;background:none;color:#fff;font-size:12px;font-weight:700}#tzCam .bot .sd i{font-style:normal;width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.16);border:2px solid #fff;display:grid;place-items:center;font-size:22px}",
"#tzCam .rec{position:relative;width:88px;height:88px;border-radius:50%;background:conic-gradient(#ff2d55 calc(var(--p,0)*1%),rgba(255,255,255,.35) 0);display:grid;place-items:center}",
"#tzCam .rec button{width:72px;height:72px;border-radius:50%;border:0;background:#fff;box-shadow:0 0 0 4px #000;transition:all .2s}",
"#tzCam.rc .rec button{width:34px;height:34px;border-radius:9px;background:#ff2d55}",
"#tzCam .tm{position:absolute;top:calc(env(safe-area-inset-top,0px) + 70px);left:50%;transform:translateX(-50%);background:rgba(255,45,85,.9);border-radius:14px;padding:4px 12px;font-weight:800;font-size:14px;display:none;z-index:2}#tzCam.rc .tm{display:block}",
"#tzCam .cd{position:absolute;inset:0;display:none;place-items:center;font-size:120px;font-weight:900;text-shadow:0 4px 24px #000;z-index:3;pointer-events:none}#tzCam .cd.on{display:grid}",
"#tzCam .ms{position:absolute;left:24px;right:24px;top:40%;text-align:center;font-size:15px;line-height:1.5;z-index:2}",
"#tzCam.rc .top,#tzCam.rc .sd{opacity:.0;pointer-events:none}",
/* éditeur */
"#tzEd .sw{flex:1;min-height:0;display:grid;place-items:center;background:#000;position:relative}",
"#tzEd .stage{position:relative;overflow:hidden;background:#000;touch-action:none}",
"#tzEd .stage video{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}",
"#tzEd .ovl{position:absolute;inset:0}",
"#tzEd .it{position:absolute;transform-origin:center;touch-action:none;user-select:none;-webkit-user-select:none;white-space:nowrap;line-height:1;cursor:grab}",
"#tzEd .it.e{font-size:calc(var(--sw)*.16)}#tzEd .it.t{font-size:calc(var(--sw)*.07);font-weight:800;padding:.22em .45em;border-radius:.3em}",
"#tzEd .it.sel{outline:2px dashed rgba(255,255,255,.85);outline-offset:4px}",
"#tzEd .pp{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;background:rgba(0,0,0,.45);display:none;place-items:center;font-size:34px;pointer-events:none}#tzEd .sw.pz .pp{display:grid}",
"#tzEd .hd{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:linear-gradient(#000a,transparent);z-index:4;pointer-events:none}#tzEd .hd>*{pointer-events:auto}",
"#tzEd .mchip{max-width:60%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:16px;padding:8px 14px;background:rgba(255,255,255,.16);font-weight:700;font-size:13px;border:0;color:#fff}",
"#tzEd .tl{position:absolute;right:8px;top:calc(env(safe-area-inset-top,0px) + 70px);display:flex;flex-direction:column;gap:14px;z-index:4}",
"#tzEd .tl button{border:0;background:none;color:#fff;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;font-weight:700;text-shadow:0 1px 5px #000;width:52px}#tzEd .tl button i{font-style:normal;width:42px;height:42px;border-radius:50%;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);display:grid;place-items:center;font-size:20px}#tzEd .tl button.on i{background:linear-gradient(135deg,#00e5ff,#2f6fe0);border-color:transparent}",
"#tzEd .pn{background:#111a2e;max-height:0;overflow:hidden;transition:max-height .25s ease;flex:none}#tzEd .pn.on{max-height:42vh;overflow-y:auto}",
"#tzEd .pi{padding:12px 14px}#tzEd .lb{font-size:13px;color:#9ec5ff;margin:4px 0}",
"#tzEd input[type=range]{width:100%;accent-color:#2f9bff}",
"#tzEd .gr{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}#tzEd .gr button{border:0;background:rgba(255,255,255,.08);border-radius:12px;font-size:26px;padding:6px 0}",
"#tzEd .tg{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}#tzEd .tg button{border:0;border-radius:14px;padding:8px 12px;color:#fff;font-weight:800;font-size:13px}",
"#tzEd .fl{display:flex;gap:8px;overflow-x:auto;padding:4px 0}#tzEd .fl button{flex:none;border:0;background:none;color:#fff;font-size:11px;font-weight:700;display:flex;flex-direction:column;align-items:center;gap:4px}#tzEd .fl canvas{width:62px;height:82px;border-radius:10px;border:2px solid transparent;background:#222}#tzEd .fl button.on canvas{border-color:#00e5ff}",
"#tzEd .ml button.tr{display:flex;align-items:center;gap:10px;width:100%;border:0;background:rgba(255,255,255,.07);color:#fff;border-radius:12px;padding:10px 12px;margin-bottom:6px;font-size:14px;font-weight:700;text-align:left}#tzEd .ml button.tr.on{background:linear-gradient(135deg,#00b8d9,#2f6fe0)}",
"#tzEd .tx input[type=text]{width:100%;box-sizing:border-box;border:0;border-radius:12px;padding:12px;font-size:16px;background:#fff;color:#0f172a}",
"#tzEd .cl{display:flex;gap:8px;margin:10px 0;align-items:center;flex-wrap:wrap}#tzEd .cl i{width:28px;height:28px;border-radius:50%;border:2px solid #fff}#tzEd .cl i.on{box-shadow:0 0 0 3px #00e5ff}",
"#tzEd .ac2{display:flex;gap:10px;padding:10px 14px calc(env(safe-area-inset-bottom,0px) + 12px);background:#111a2e;flex:none}#tzEd .ac2 button{flex:1;border:0;border-radius:16px;padding:14px;font-weight:800;font-size:15px;color:#fff;background:rgba(255,255,255,.14)}#tzEd .ac2 .go{flex:1.6;background:linear-gradient(135deg,#00e5ff,#2f6fe0)}",
"#tzEd .trash{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 110px);transform:translateX(-50%) scale(.8);width:62px;height:62px;border-radius:50%;background:rgba(0,0,0,.6);display:none;place-items:center;font-size:28px;z-index:6;transition:transform .15s}#tzEd .trash.on{display:grid}#tzEd .trash.hot{transform:translateX(-50%) scale(1.25);background:#ff2d55}",
"#tzEd .xo{position:absolute;inset:0;background:rgba(5,10,20,.93);display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;text-align:center;z-index:9}#tzEd .xo.on{display:flex}",
"#tzEd .br{width:80%;height:10px;border-radius:6px;background:rgba(255,255,255,.18);overflow:hidden}#tzEd .br i{display:block;height:100%;width:0;background:linear-gradient(90deg,#00e5ff,#2f6fe0)}",
"#tzEd .xo button{border:0;border-radius:12px;padding:10px 22px;background:rgba(255,255,255,.16);color:#fff;font-weight:700}",
/* balayage frais */
"#tvScr{overscroll-behavior:contain;-webkit-overflow-scrolling:touch;scroll-snap-type:y mandatory;contain:layout paint}",
"#tvScr .tvi{contain:layout paint style;transform:translateZ(0)}",
"#tvScr .tvi video{transform:scale(1.045);transition:transform .55s cubic-bezier(.2,.8,.2,1);will-change:transform}",
"#tvScr .tvi.tz-act video{transform:scale(1)}",
"#tvScr .tvi .tvr,#tvScr .tvi .tvc{opacity:0;transform:translateY(18px);transition:opacity .35s ease .08s,transform .45s cubic-bezier(.2,.8,.2,1) .08s}",
"#tvScr .tvi.tz-act .tvr,#tvScr .tvi.tz-act .tvc{opacity:1;transform:none}",
"#tvFeed .tvh .sq,#tvFeed .tvh button{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}",
"#tvFeed .tvh .tvp{animation:tzpulse 2.4s ease-in-out infinite}@keyframes tzpulse{0%,100%{box-shadow:0 0 12px rgba(0,229,255,.5)}50%{box-shadow:0 0 22px rgba(0,229,255,.95)}}"
].join("\n");
var st=E("style");st.textContent=css;D.head.appendChild(st);

/* ───────── pause de la vidéo + gestion « + » ───────── */
function feedVideos(){return [].slice.call(D.querySelectorAll("#tvScr video, #tvFeed video"))}
function pauseFeed(){feedVideos().forEach(function(v){try{v.pause()}catch(e){}})}
function overlaysOpen(){return !!(D.getElementById("tzCam")||D.getElementById("tzEd")||D.getElementById("tvCap"))}
setInterval(function(){var on=overlaysOpen();
  if(on){pauseFeed();hadOv=true}
  else if(hadOv){hadOv=false;var a=D.querySelector("#tvScr .tvi.tz-act video")||D.querySelector("#tvScr .tvi video");if(a&&D.getElementById("tvFeed")){var p=a.play();if(p&&p.catch)p.catch(function(){})}}
},300);
D.addEventListener("click",function(e){
  var b=e.target&&e.target.closest&&e.target.closest(PLUS);if(!b)return;
  if(bypass){bypass=0;return}
  e.preventDefault();e.stopImmediatePropagation();
  pauseFeed();openCam();
},true);
var op=window.__tpick;
window.__tpick=function(acc,cb){
  if(inject){var f=inject;inject=null;setTimeout(function(){cb(f)},0);return true}
  return op?op.apply(this,arguments):false};
function goPublish(blob){
  var b=D.querySelector(PLUS);
  if(b){if(blob)inject=blob;bypass=1;b.click()}
  else if(blob&&window.tooleEdit){window.tooleEdit(blob,function(){})}
}

/* ───────── CAMÉRA ───────── */
function openCam(){
  if(D.getElementById("tzCam"))return;
  var o=E("div");o.id="tzCam";
  var cv=E("video","cv");cv.muted=true;cv.setAttribute("playsinline","");cv.setAttribute("autoplay","");
  var top=E("div","top"),x=E("button","tz-btn","✕"),len=E("div","len"),fp=E("button","tz-btn","🔄");
  var Lm=Lmax(),opts=Lm>=60?[15,30,60]:[15,Lm];var maxS=opts[opts.length-1];
  opts.forEach(function(s){var b=E("button",s===maxS?"on":"",s+" s");b.onclick=function(){if(recording)return;maxS=s;len.querySelectorAll("button").forEach(function(y){y.className=""});b.className="on"};len.appendChild(b)});
  top.appendChild(x);top.appendChild(len);top.appendChild(fp);
  var tm=E("div","tm","0:00"),cd=E("div","cd"),ms=E("div","ms");
  var bot=E("div","bot"),gal=E("button","sd"),gi=E("i","","🖼️");gal.appendChild(gi);gal.appendChild(E("span","","Galerie"));
  var rec=E("div","rec"),rb=E("button");rec.appendChild(rb);
  var tmr=E("button","sd"),ti=E("i","","⏱");tmr.appendChild(ti);var tl=E("span","","Minuteur");tmr.appendChild(tl);
  bot.appendChild(gal);bot.appendChild(rec);bot.appendChild(tmr);
  [cv,top,tm,cd,ms,bot].forEach(function(n){o.appendChild(n)});D.body.appendChild(o);
  var face="user",stream=null,mr=null,chunks=[],t0=0,recording=false,delay=0,cancelled=false,cdT=0;
  function stopStream(){if(stream){stream.getTracks().forEach(function(t){try{t.stop()}catch(e){}})}stream=null;cv.srcObject=null}
  function start(){
    stopStream();ms.textContent="";
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ms.textContent="Caméra indisponible ici.\nUtilise la Galerie.";return}
    var vc={facingMode:face,width:{ideal:1080},height:{ideal:1920}};
    navigator.mediaDevices.getUserMedia({video:vc,audio:true}).catch(function(){return navigator.mediaDevices.getUserMedia({video:{facingMode:face}})})
    .then(function(s){if(cancelled){s.getTracks().forEach(function(t){t.stop()});return}stream=s;cv.srcObject=s;cv.style.transform=face==="user"?"scaleX(-1)":"none";var p=cv.play();if(p&&p.catch)p.catch(function(){})})
    .catch(function(){ms.textContent="Autorise la caméra et le micro pour filmer.\nTu peux aussi choisir une vidéo dans la Galerie."});
  }
  function close(){cancelled=true;clearTimeout(cdT);recording=false;try{if(mr&&mr.state!=="inactive"){mr.ondataavailable=null;mr.onstop=null;mr.stop()}}catch(e){}stopStream();o.remove()}
  x.onclick=close;
  fp.onclick=function(){if(recording)return;face=face==="user"?"environment":"user";start()};
  tmr.onclick=function(){if(recording)return;delay=delay?0:3;tl.textContent=delay?"3 s":"Minuteur";ti.textContent=delay?"3":"⏱"};
  gal.onclick=function(){if(recording)return;close();goPublish(null)};
  function startRec(){
    if(!stream){toast("Caméra pas prête");return}
    var mt=pickMime();try{mr=new MediaRecorder(stream,mt?{mimeType:mt,videoBitsPerSecond:3000000}:{videoBitsPerSecond:3000000})}catch(e){toast("Enregistrement impossible ici");return}
    chunks=[];mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
    mr.onstop=function(){var dur=(Date.now()-t0)/1000;if(cancelled)return;
      if(dur<1){toast("Trop court : maintiens plus longtemps");o.classList.remove("rc");return}
      var bl=new Blob(chunks,{type:"video/webm"});bl.__dur=dur;close();goPublish(bl)};
    mr.start(400);t0=Date.now();recording=true;o.classList.add("rc");tick()}
  function tick(){if(!recording)return;var s=(Date.now()-t0)/1000;o.querySelector(".rec").style.setProperty("--p",Math.min(100,s/maxS*100));tm.textContent=mm(s)+" / "+mm(maxS);if(s>=maxS)return stopRec();requestAnimationFrame(tick)}
  function stopRec(){if(!recording)return;recording=false;try{mr.stop()}catch(e){}}
  rb.onclick=function(){
    if(recording)return stopRec();
    if(!delay)return startRec();
    var n=delay;cd.classList.add("on");(function step(){if(cancelled)return;if(n<=0){cd.classList.remove("on");return startRec()}cd.textContent=n;n--;cdT=setTimeout(step,1000)})()};
  start();
}

/* ───────── MUSIQUE (synthé intégré) ───────── */
var TR=[
 {id:"afro",n:"Afro Vibes",e:"🥁",bpm:104,root:45,k:[0,6,10],s:[4,12],h:[0,2,4,6,8,10,12,14],t:[[3,200],[7,160],[11,200],[15,240]],b:[[0,0,3],[6,0,2],[8,5,2],[10,3,2],[14,0,2]],l:[[0,12,2],[3,15,1],[6,19,2],[10,17,2],[12,15,2]],p:[0,5,3,7],w:"sawtooth"},
 {id:"tam",n:"Tam-Tam Faso",e:"🪘",bpm:96,root:43,k:[0,8],s:[],h:[2,6,10,14],t:[[0,110],[2,180],[3,220],[4,150],[6,200],[7,260],[8,110],[10,180],[11,220],[12,150],[14,200],[15,300]],b:[[0,0,4],[8,7,4]],l:[],p:[0,0,5,5],w:"sine"},
 {id:"ama",n:"Amapiano Chill",e:"🎹",bpm:112,root:41,k:[0,8],s:[4,12],h:[2,6,10,14],t:[],b:[[0,0,2],[3,0,1],[6,7,2],[10,5,2],[13,3,2]],l:[[0,24,4],[4,22,2],[8,19,4],[12,17,2]],p:[0,3,5,2],w:"sine"},
 {id:"trap",n:"Hype Trap",e:"🔥",bpm:140,root:36,k:[0,3,10],s:[8],h:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],t:[],b:[[0,0,3],[3,0,1],[10,3,3]],l:[[0,24,2],[6,27,2],[10,24,2],[14,22,2]],p:[0,0,5,3],w:"square"},
 {id:"soft",n:"Douceur",e:"🌅",bpm:78,root:48,k:[0,10],s:[8],h:[4,12],t:[],b:[[0,0,6],[8,7,6]],l:[[0,12,4],[4,16,4],[8,19,4],[12,16,4]],p:[0,5,7,3],w:"triangle"}
];
var ac=null,dst=null,vs=null,vg=null,vpv=null,mg=null,mpv=null,nb=null,sch={on:0,step:0,next:0,iv:0,tr:null,sg:null};
function fq(m){return 440*Math.pow(2,(m-69)/12)}
function env(g,t,a,d,pk){g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(pk,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d)}
function vKick(t,o){var s=ac.createOscillator(),g=ac.createGain();s.frequency.setValueAtTime(160,t);s.frequency.exponentialRampToValueAtTime(45,t+.12);env(g,t,.002,.3,.95);s.connect(g);g.connect(o);s.start(t);s.stop(t+.35)}
function vNoise(t,o,hp,d,pk){var s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nb;f.type="highpass";f.frequency.value=hp;env(g,t,.002,d,pk);s.connect(f);f.connect(g);g.connect(o);s.start(t);s.stop(t+d+.05)}
function vTone(t,o,fr,d,pk,type,f2,lp){var s=ac.createOscillator(),g=ac.createGain();s.type=type||"sine";s.frequency.setValueAtTime(fr,t);if(f2)s.frequency.exponentialRampToValueAtTime(f2,t+Math.min(.25,d));var n=s;if(lp){var f=ac.createBiquadFilter();f.type="lowpass";f.frequency.value=lp;s.connect(f);n=f}env(g,t,.01,d,pk);n.connect(g);g.connect(o);s.start(t);s.stop(t+d+.05)}
function pump(){var tr=sch.tr;if(!tr||!ac)return;var sd=60/tr.bpm/4;
  while(sch.next<ac.currentTime+.14){var n=sch.step,s=n%16,bar=Math.floor(n/16),pr=tr.p[bar%tr.p.length],t=sch.next,g=sch.sg;
    if(tr.k.indexOf(s)>=0)vKick(t,g);
    if(tr.s.indexOf(s)>=0){vNoise(t,g,1400,.17,.45);vTone(t,g,190,.1,.3,"triangle")}
    if(tr.h.indexOf(s)>=0)vNoise(t,g,7000,.05,s%4===2?.2:.1);
    tr.t.forEach(function(x){if(x[0]===s)vTone(t,g,x[1],.28,.55,"sine",x[1]*.6)});
    tr.b.forEach(function(x){if(x[0]===s)vTone(t,g,fq(tr.root+pr+x[1]),x[2]*sd,.5,tr.w==="square"?"sine":tr.w,0,380)});
    tr.l.forEach(function(x){if(x[0]===s)vTone(t,g,fq(tr.root+pr+x[1]),Math.max(.12,x[2]*sd),.16,tr.w==="sawtooth"?"triangle":tr.w==="square"?"square":"triangle",0,3000)});
    sch.next+=sd;sch.step++}}
function synStart(tr){synStop();if(!ac||!tr)return;sch.tr=tr;sch.step=0;sch.next=ac.currentTime+.05;sch.sg=ac.createGain();sch.sg.connect(mg);sch.on=1;sch.iv=setInterval(pump,25);pump()}
function synStop(){clearInterval(sch.iv);if(sch.sg){var g=sch.sg;try{g.gain.setTargetAtTime(0,ac.currentTime,.02)}catch(e){}setTimeout(function(){try{g.disconnect()}catch(e){}},200);sch.sg=null}sch.on=0}

/* ───────── ÉDITEUR (remplace tooleEdit) ───────── */
var FIL=[["Normal",""],["Éclat","brightness(1.08) contrast(1.12) saturate(1.35)"],["N&B","grayscale(1) contrast(1.1)"],["Chaud","sepia(.3) saturate(1.5) hue-rotate(-12deg) brightness(1.05)"],["Froid","hue-rotate(18deg) saturate(1.2) brightness(1.05)"],["Vintage","sepia(.55) contrast(1.1) brightness(.95) saturate(1.2)"],["Néon","saturate(2.2) contrast(1.2) hue-rotate(-10deg)"],["Cinéma","contrast(1.25) saturate(.85) sepia(.15) brightness(.95)"],["Soleil","sepia(.25) saturate(1.7) brightness(1.1) hue-rotate(-18deg)"],["Doux","brightness(1.1) contrast(.9) saturate(1.1)"],["Nuit","brightness(.82) contrast(1.3) saturate(1.2) hue-rotate(15deg)"]];
var EMO=["🇧🇫","🔥","😂","❤️","😍","🥁","🎶","👑","💃","🕺","🌍","⭐","💯","🎉","🙌","😎","🤩","💥","✨","🌞","🌴","🐘","🦁","🥳","😭","🤣","👏","💪","🙏","😘","🤗","😜","🤔","😱","🎤","🎧","📸","🏆","💎","🌈","⚡","🍉","🌶️","🥰","😇","👀","💖","🎁","🚀","🏍️"];
var TAG=[["🇧🇫 BURKINA","#009e49"],["WAOUH !","#ef2b2d"],["TÕÕLé","#2f6fe0"],["OUAGA 🔥","#f59e0b"],["MDR 😂","#8b5cf6"],["TRENDING","#ec4899"],["BOBO ❤️","#0ea5e9"],["VIBES ✨","#14b8a6"]];
var COL=["#ffffff","#111111","#ffd400","#ff3b6b","#00e5ff","#4ade80","#a78bfa"];
function rr(cx,x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath()}
function pickAudio(cb){
  if(window.__tpick&&window.__tpick("audio/*",cb))return;
  var i=D.createElement("input");i.type="file";i.accept="audio/*";i.style.display="none";D.body.appendChild(i);
  i.onchange=function(){var f=i.files&&i.files[0];if(f)cb(f);setTimeout(function(){i.remove()},60000)};i.click()}

window.tooleEdit=function(f,done){
  var u=URL.createObjectURL(f),L=Lmax(),o=E("div");o.id="tzEd";
  var sw=E("div","sw"),stage=E("div","stage"),v=E("video"),ovl=E("div","ovl"),pp=E("div","pp","▶");
  v.setAttribute("playsinline","");v.src=u;v.loop=false;v.muted=false;v.preload="auto";
  stage.appendChild(v);stage.appendChild(ovl);sw.appendChild(stage);sw.appendChild(pp);
  var hd=E("div","hd"),xb=E("button","tz-btn","✕"),mchip=E("button","mchip","🎵 Ajouter un son");hd.appendChild(xb);hd.appendChild(mchip);hd.appendChild(E("div"));
  var tl=E("div","tl");
  var tools=[["mus","🎵","Son"],["stk","😀","Stickers"],["txt","Aa","Texte"],["fil","✨","Filtres"],["trm","✂️","Rogner"]],tb={};
  tools.forEach(function(k){var b=E("button");b.innerHTML="<i>"+k[1]+"</i><span>"+k[2]+"</span>";b.onclick=function(){panel(k[0])};tl.appendChild(b);tb[k[0]]=b});
  sw.appendChild(hd);sw.appendChild(tl);
  var pn=E("div","pn"),ac2=E("div","ac2"),sk=E("button","","Sans montage"),go=E("button","go","Suivant ›");ac2.appendChild(sk);ac2.appendChild(go);
  var trash=E("div","trash","🗑️"),xo=E("div","xo"),xt=E("div","","Montage en cours…"),br=E("div","br"),bi=E("i"),xc=E("button","","Annuler");br.appendChild(bi);xo.appendChild(xt);xo.appendChild(br);xo.appendChild(xc);
  o.appendChild(sw);o.appendChild(pn);o.appendChild(ac2);o.appendChild(trash);o.appendChild(xo);D.body.appendChild(o);

  var A=0,B=0,Dd=0,fi=0,items=[],selIt=null,cur=null,vo=1,vm=.8,mus=null,au=null,as=null,exporting=false,ctl={abort:0},inited=false,ro=null;
  function end(r){exporting=false;try{v.pause()}catch(e){}musStop();try{if(au){au.pause();au.removeAttribute("src");au.load()}}catch(e){}
    try{if(ro)ro.disconnect()}catch(e){}try{if(ac)ac.close()}catch(e){}ac=null;dst=null;vs=vg=vpv=mg=mpv=null;
    try{v.removeAttribute("src");v.load()}catch(e){}try{URL.revokeObjectURL(u)}catch(e){}o.remove();done(r)}
  xb.onclick=function(){end(null)};
  /* ajustement stage */
  function fit(){var W=sw.clientWidth,H=sw.clientHeight,ar=(v.videoWidth||9)/(v.videoHeight||16);if(!W||!H)return;var w=Math.min(W,H*ar),h=w/ar;stage.style.width=w+"px";stage.style.height=h+"px";stage.style.setProperty("--sw",w+"px")}
  if(window.ResizeObserver){ro=new ResizeObserver(fit);ro.observe(sw)}else window.addEventListener("resize",fit);
  /* lecture */
  sw.onclick=function(e){if(e.target.closest&&(e.target.closest(".it")||e.target.closest(".tl")||e.target.closest(".hd")))return;deselect();if(v.paused)v.play().catch(function(){});else v.pause()};
  v.addEventListener("pause",function(){if(!exporting)sw.classList.add("pz");musStop()});
  v.addEventListener("play",function(){sw.classList.remove("pz");musPlay()});
  v.ontimeupdate=function(){if(exporting)return;if(B&&v.currentTime>=B){v.currentTime=A;musRestart()}};
  /* durée (les vidéos de la caméra ont une durée infinie : on la corrige) */
  v.onloadedmetadata=function(){fit();
    if(isFinite(v.duration)&&v.duration>0)return init(v.duration);
    v.currentTime=1e7;var fx=function(){if(!isFinite(v.duration)||!v.duration)return;v.removeEventListener("timeupdate",fx);v.currentTime=0;init(v.duration)};v.addEventListener("timeupdate",fx);
    setTimeout(function(){if(!inited){if(f.__dur)init(f.__dur);else{toast("Montage indisponible, envoi sans montage");end(f)}}},3500)};
  v.onerror=function(){toast("Vidéo illisible ici, envoi sans montage");end(f)};
  setTimeout(function(){if(!inited&&!v.readyState&&o.parentNode){toast("Montage lent, envoi sans montage");end(f)}},9000);
  function init(d){if(inited)return;inited=true;Dd=d;A=0;B=Math.min(Dd,L);ra.min=rb.min=0;ra.max=rb.max=Dd;syncR();fit();
    if(Dd>L+.3)toast("Vidéo de plus de "+L+" s : rogne-la dans « Rogner »");
    v.play().catch(function(){v.muted=true;v.play().catch(function(){})});drawThumbs()}
  /* items */
  function deselect(){if(selIt&&selIt.el)selIt.el.classList.remove("sel");selIt=null}
  function select(it){if(selIt===it)return;deselect();selIt=it;it.el.classList.add("sel")}
  function apply(it){var s=it.el.style;s.left=it.x*100+"%";s.top=it.y*100+"%";s.transform="translate(-50%,-50%) rotate("+it.r+"rad) scale("+it.s+")"}
  function addItem(it){it.x=.5;it.y=.5;it.r=0;it.s=1;var el=E("div","it "+(it.k==="e"?"e":"t"),it.t);if(it.k==="t"){el.style.color=it.c;if(it.bg)el.style.background=it.bg;else el.style.textShadow="0 2px 8px rgba(0,0,0,.6)"}it.el=el;ovl.appendChild(el);items.push(it);apply(it);select(it);gest(it);panel(null)}
  function gest(it){var el=it.el,ps={};
    function d2(a,b){return Math.hypot(a.x-b.x,a.y-b.y)||1}function an(a,b){return Math.atan2(b.y-a.y,b.x-a.x)}
    el.addEventListener("pointerdown",function(e){e.preventDefault();e.stopPropagation();try{el.setPointerCapture(e.pointerId)}catch(x){}ps[e.pointerId]={x:e.clientX,y:e.clientY};select(it);trash.classList.add("on")});
    el.addEventListener("pointermove",function(e){var p=ps[e.pointerId];if(!p)return;var ids=Object.keys(ps),np={x:e.clientX,y:e.clientY};
      if(ids.length===1){var r=stage.getBoundingClientRect();it.x+=(np.x-p.x)/r.width;it.y+=(np.y-p.y)/r.height;it.x=Math.max(-.1,Math.min(1.1,it.x));it.y=Math.max(-.1,Math.min(1.1,it.y))}
      else{var oi=ids[0]==String(e.pointerId)?ids[1]:ids[0],q=ps[oi],oa=p,pa=q;var od=d2(oa,pa),oan=an(oa,pa);var nd=d2(np,pa),nan=an(np,pa);it.s=Math.max(.25,Math.min(6,it.s*nd/od));it.r+=nan-oan}
      ps[e.pointerId]=np;apply(it);var tr=trash.getBoundingClientRect();trash.classList.toggle("hot",np.x>tr.left-10&&np.x<tr.right+10&&np.y>tr.top-10&&np.y<tr.bottom+10)});
    function up(e){var hot=trash.classList.contains("hot");delete ps[e.pointerId];if(!Object.keys(ps).length){trash.classList.remove("on","hot");if(hot){it.el.remove();items=items.filter(function(y){return y!==it});if(selIt===it)selIt=null}}}
    el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up)}
  /* panneaux */
  function panel(n){
    Object.keys(tb).forEach(function(k){tb[k].classList.toggle("on",k===n&&cur!==n)});
    if(!n||cur===n){cur=null;pn.classList.remove("on");return}
    cur=n;pn.innerHTML="";var pi=E("div","pi");pn.appendChild(pi);
    if(n==="stk"){var tg=E("div","tg");TAG.forEach(function(t){var b=E("button","",t[0]);b.style.background=t[1];b.onclick=function(){addItem({k:"t",t:t[0],c:"#fff",bg:t[1]})};tg.appendChild(b)});pi.appendChild(tg);
      var gr=E("div","gr");EMO.forEach(function(m){var b=E("button","",m);b.onclick=function(){addItem({k:"e",t:m})};gr.appendChild(b)});pi.appendChild(gr)}
    if(n==="txt"){var w=E("div","tx"),ip=E("input");ip.type="text";ip.placeholder="Écris ton texte…";ip.maxLength=40;w.appendChild(ip);
      var tc=COL[0],tbg=0,cl=E("div","cl");COL.forEach(function(c,i){var d=E("i",i?"":"on");d.style.background=c;d.onclick=function(){tc=c;cl.querySelectorAll("i").forEach(function(y){y.className=""});d.className="on"};cl.appendChild(d)});
      var bg=E("button","","Fond");bg.style.cssText="border:0;border-radius:14px;padding:6px 12px;background:rgba(255,255,255,.16);color:#fff;font-weight:700";bg.onclick=function(){tbg=!tbg;bg.style.background=tbg?"#2f6fe0":"rgba(255,255,255,.16)"};cl.appendChild(bg);w.appendChild(cl);
      var ad=E("button","","Ajouter");ad.style.cssText="width:100%;border:0;border-radius:14px;padding:12px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00e5ff,#2f6fe0)";ad.onclick=function(){var t=ip.value.trim();if(!t)return toast("Écris un texte");var bgc=tbg?(tc==="#111111"?"#ffffff":(tc==="#ffffff"?"#111111":"#000000")):null;addItem({k:"t",t:t,c:tc,bg:bgc})};w.appendChild(ad);pi.appendChild(w);pi.className="pi tx"}
    if(n==="fil"){var fl=E("div","fl");FIL.forEach(function(k,i){var b=E("button",i===fi?"on":""),c=D.createElement("canvas");c.width=124;c.height=164;b.appendChild(c);b.appendChild(E("span","",k[0]));b.onclick=function(){fi=i;v.style.filter=k[1]||"none";fl.querySelectorAll("button").forEach(function(y){y.className=""});b.className="on"};fl.appendChild(b)});pi.appendChild(fl);thumbCv=[].slice.call(fl.querySelectorAll("canvas"));drawThumbs()}
    if(n==="trm"){pi.appendChild(lbR);pi.appendChild(E("div","lb","Début"));pi.appendChild(ra);pi.appendChild(E("div","lb","Fin"));pi.appendChild(rb);syncR()}
    if(n==="mus"){var ml=E("div","ml");
      var none=E("button","tr"+(mus?"":" on"),"🚫  Sans musique");none.onclick=function(){setMusic(null);panel("mus");panel("mus")};ml.appendChild(none);
      TR.forEach(function(t){var b=E("button","tr"+(mus&&mus.id===t.id?" on":""),t.e+"  "+t.n);b.onclick=function(){setMusic({id:t.id,n:t.n,tr:t});panel("mus");panel("mus")};ml.appendChild(b)});
      var mf=E("button","tr"+(mus&&mus.file?" on":""),"📁  Ma musique (fichier audio)");mf.onclick=function(){pickAudio(function(file){setMusic({id:"file",n:(file.name||"Ma musique").replace(/\.[^.]+$/,""),file:file});panel("mus");panel("mus")})};ml.appendChild(mf);pi.appendChild(ml);
      pi.appendChild(E("div","lb","Volume de la vidéo"));var r1=E("input");r1.type="range";r1.min=0;r1.max=1;r1.step=.05;r1.value=vo;r1.oninput=function(){setVo(+r1.value)};pi.appendChild(r1);
      pi.appendChild(E("div","lb","Volume de la musique"));var r2=E("input");r2.type="range";r2.min=0;r2.max=1;r2.step=.05;r2.value=vm;r2.oninput=function(){setVm(+r2.value)};pi.appendChild(r2)}
    pn.classList.add("on")}
  /* rognage */
  var ra=E("input"),rb=E("input"),lbR=E("div","lb");ra.type=rb.type="range";ra.step=rb.step="0.1";
  function syncR(){ra.value=A;rb.value=B;lbR.textContent="Rognage : "+mm(A)+" → "+mm(B)+" ("+Math.round(B-A)+" s, max "+L+" s)"}
  ra.oninput=function(){A=+ra.value;if(A>B-1)A=Math.max(0,B-1);if(B-A>L)B=Math.min(Dd,A+L);syncR();v.currentTime=A};
  rb.oninput=function(){B=+rb.value;if(B<A+1)B=Math.min(Dd,A+1);if(B-A>L)A=Math.max(0,B-L);syncR();v.currentTime=Math.max(A,B-1)};
  /* vignettes de filtres */
  var thumbCv=[];
  function drawThumbs(){if(!thumbCv.length||!v.videoWidth)return;thumbCv.forEach(function(c,i){var x=c.getContext("2d"),w=v.videoWidth,h=v.videoHeight,s=Math.max(c.width/w,c.height/h),dw=w*s,dh=h*s;try{x.filter=FIL[i][1]||"none";x.drawImage(v,(c.width-dw)/2,(c.height-dh)/2,dw,dh)}catch(e){}})}
  v.addEventListener("loadeddata",drawThumbs);
  /* audio */
  function graph(){if(ac)return true;try{var AC=window.AudioContext||window.webkitAudioContext;ac=new AC();if(ac.resume)ac.resume();dst=ac.createMediaStreamDestination();
      vs=ac.createMediaElementSource(v);vg=ac.createGain();vg.gain.value=vo;vpv=ac.createGain();vs.connect(vg);vg.connect(vpv);vpv.connect(ac.destination);vg.connect(dst);v.volume=1;
      mg=ac.createGain();mg.gain.value=vm;mpv=ac.createGain();mg.connect(mpv);mpv.connect(ac.destination);mg.connect(dst);
      nb=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);var dd=nb.getChannelData(0);for(var i=0;i<dd.length;i++)dd[i]=Math.random()*2-1;
      if(au)wireAu();return true}catch(e){ac=null;return false}}
  function wireAu(){if(!ac||!au||as)return;try{as=ac.createMediaElementSource(au);as.connect(mg);au.volume=1}catch(e){}}
  function setVo(x){vo=x;if(vg)vg.gain.value=x;else v.volume=x}
  function setVm(x){vm=x;if(mg)mg.gain.value=x;else if(au)au.volume=x}
  function setMusic(m){musStop();mus=m;as=null;if(au){try{au.pause();au.removeAttribute("src");au.load()}catch(e){}au=null}
    if(!m){mchip.textContent="🎵 Ajouter un son";return}
    if(!graph()){mus=null;toast("Musique indisponible sur cet appareil");return}
    mchip.textContent="🎵 "+m.n;
    if(m.file){au=new Audio();au.loop=true;au.preload="auto";au.src=URL.createObjectURL(m.file);m.url=au.src;wireAu()}
    if(!v.paused)musPlay()}
  function musPlay(){if(!mus)return;if(ac&&ac.resume)ac.resume();if(mus.file){if(au){au.currentTime=0;au.play().catch(function(){})}}else if(!sch.on)synStart(mus.tr)}
  function musStop(){if(au)try{au.pause()}catch(e){}synStop()}
  function musRestart(){if(!mus)return;if(mus.file){if(au){au.currentTime=0;au.play().catch(function(){})}}else synStart(mus.tr)}
  mchip.onclick=function(){panel("mus")};
  /* export */
  function drawItems(cx,w,h){items.forEach(function(it){cx.save();cx.translate(it.x*w,it.y*h);cx.rotate(it.r);cx.scale(it.s,it.s);
    if(it.k==="e"){cx.font=(w*.16)+"px 'Noto Color Emoji','Apple Color Emoji','Segoe UI Emoji',sans-serif";cx.textAlign="center";cx.textBaseline="middle";cx.fillText(it.t,0,0)}
    else{var fs=w*.07;cx.font="800 "+fs+"px sans-serif";var tw=cx.measureText(it.t).width,px=fs*.45,py=fs*.22;
      if(it.bg){rr(cx,-tw/2-px,-fs/2-py,tw+2*px,fs+2*py,fs*.3);cx.fillStyle=it.bg;cx.fill()}else{cx.shadowColor="rgba(0,0,0,.6)";cx.shadowBlur=fs*.25;cx.shadowOffsetY=fs*.05}
      cx.fillStyle=it.c;cx.textAlign="center";cx.textBaseline="middle";cx.fillText(it.t,0,fs*.04)}
    cx.restore()})}
  function render(prog){return new Promise(function(res,rej){
    var MR=window.MediaRecorder;if(!MR)return rej(new Error("mr"));
    if(!graph())return rej(new Error("audio"));
    var vw=v.videoWidth,vh=v.videoHeight;if(!vw||!vh)return rej(new Error("dim"));
    var sc=Math.min(1,960/Math.max(vw,vh)),w=Math.max(2,Math.round(vw*sc/2)*2),h=Math.max(2,Math.round(vh*sc/2)*2);
    var cv=D.createElement("canvas");cv.width=w;cv.height=h;var cx=cv.getContext("2d");if(!cv.captureStream)return rej(new Error("cs"));
    var s=cv.captureStream(30);dst.stream.getAudioTracks().forEach(function(t){s.addTrack(t)});
    var mt=pickMime();if(!mt)return rej(new Error("mt"));
    var len=B-A,vb=Math.max(600000,Math.min(4000000,Math.floor(16*1048576*8*.8/len-96000)));
    var rec;try{rec=new MR(s,{mimeType:mt,videoBitsPerSecond:vb,audioBitsPerSecond:128000})}catch(e){return rej(e)}
    var ch=[];rec.ondataavailable=function(e){if(e.data&&e.data.size)ch.push(e.data)};
    exporting=true;v.loop=false;vpv.gain.value=0;mpv.gain.value=0;
    function restore(){exporting=false;try{vpv.gain.value=1;mpv.gain.value=1}catch(e){}}
    rec.onstop=function(){musStop();restore();if(ctl.abort)return rej(new Error("abort"));var bl=new Blob(ch,{type:"video/webm"});if(bl.size>0){bl.__dur=len;res(bl)}else rej(new Error("vide"))};
    v.pause();
    var go2=function(){v.onseeked=null;rec.start(500);var p=v.play();if(p&&p.catch)p.catch(function(){});if(mus)musRestart();
      (function d(){if(ctl.abort||v.currentTime>=B||v.ended){try{v.pause()}catch(e){}if(rec.state!=="inactive")rec.stop();return}
        cx.filter=FIL[fi][1]||"none";cx.drawImage(v,0,0,w,h);cx.filter="none";drawItems(cx,w,h);prog(Math.min(1,(v.currentTime-A)/len));requestAnimationFrame(d)})()};
    v.onseeked=go2;v.currentTime=Math.max(.01,A)})}
  xc.onclick=function(){ctl.abort=1};
  function edited(){return A>.2||B<Dd-.2||fi||items.length||mus||vo!==1}
  sk.onclick=function(){if(Dd>L+.5){toast("Vidéo trop longue : rogne-la ("+L+" s max)");return panel("trm")}end(f)};
  go.onclick=function(){if(!inited)return;if(!edited())return end(f);deselect();panel(null);
    ctl={abort:0};bi.style.width="0";xt.textContent="Montage en cours… garde l'écran allumé";xo.classList.add("on");
    render(function(q){bi.style.width=Math.round(q*100)+"%";xt.textContent="Montage en cours… "+Math.round(q*100)+" % · garde l'écran allumé"})
    .then(function(bl){end(bl)})
    .catch(function(e){xo.classList.remove("on");exporting=false;if(e&&e.message==="abort"){v.currentTime=A;return v.play().catch(function(){})}toast("Montage impossible ici, vidéo originale conservée");end(f)})};
};

/* ───────── BALAYAGE FRAIS ───────── */
function mark(sc){var h=sc.clientHeight||1,i=Math.round(sc.scrollTop/h);var a=sc.querySelectorAll(".tvi");for(var k=0;k<a.length;k++)a[k].classList.toggle("tz-act",k===i)}
setInterval(function(){var sc=D.getElementById("tvScr");if(!sc)return;
  if(!sc.__tz){sc.__tz=1;var t=0;sc.addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(function(){mark(sc)},40)},{passive:true})}
  mark(sc)},700);
})();
