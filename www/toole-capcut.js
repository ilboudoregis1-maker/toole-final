/* TÕÕLé — Studio Pro : montage multi-clips (v2)
   v2 : chargement vidéo robuste (plus d'écran noir), vignettes, Annuler, Dupliquer,
        export annulable avec progression, en-tête corrigé, repli propre si vidéo illisible. */
(function(){"use strict";if(window.__tcp)return;window.__tcp=2;
var D=document,ORIG=null,W=540,H=960,CV,X,BC,BX,R,PH,G=[],cur=-1,raf=0,actx=null,gain=null,dest=null,hist=[],urls=[];
var l=D.createElement("link");l.rel="stylesheet";l.href="toole-capcut.css?v=2";D.head.appendChild(l);
var F=[["Normal",""],["N&B","grayscale(1) contrast(1.1)"],["Chaud","sepia(.3) saturate(1.5) hue-rotate(-12deg) brightness(1.05)"],["Froid","hue-rotate(18deg) saturate(1.2) brightness(1.05)"],["Vintage","sepia(.55) contrast(1.1) brightness(.95) saturate(1.2)"],["Contraste","contrast(1.4) saturate(1.3)"],["Vif","saturate(1.9) contrast(1.08)"],["Néon","saturate(2.2) contrast(1.2) hue-rotate(160deg)"]];
var S={clips:[],texts:[],sel:0,t:0,playing:false,fit:"fit",ex:false,ts:-1,tool:"",lim:30,done:null,onend:null,msg:"",busy:0,cancel:0};
var V=D.createElement("video");V.playsInline=true;V.setAttribute("playsinline","");V.preload="auto";V.dataset.tcp="1";V.className="vh";
function MAXS(){try{return window.__tvDur?window.__tvDur():30}catch(e){return 30}}
function E(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function Q(s){return R&&R.querySelector(s)}
function toast(m,ms){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:130px;z-index:2147483600;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";D.body.appendChild(d);setTimeout(function(){d.remove()},ms||3500)}
function mm1(s){s=Math.max(0,s||0);return Math.floor(s/60)+":"+("0"+Math.floor(s%60)).slice(-2)+"."+Math.floor((s%1)*10)}
function pickMime(){var M=window.MediaRecorder;if(!M||!M.isTypeSupported)return "";return ["video/webm;codecs=vp8,opus","video/webm;codecs=vp9,opus","video/webm"].filter(function(m){return M.isTypeSupported(m)})[0]||""}
function cl(c){return (c.out-c.in)/c.sp}
function total(){return S.clips.reduce(function(a,c){return a+cl(c)},0)}
function startOf(i){var a=0;for(var k=0;k<i;k++)a+=cl(S.clips[k]);return a}
function locate(t){var a=0;for(var i=0;i<S.clips.length;i++){var n=cl(S.clips[i]);if(t<a+n||i===S.clips.length-1)return{i:i,off:t-a};a+=n}return null}

/* ── historique (Annuler) ── */
function snap(){if(!S.clips.length)return;hist.push(JSON.stringify({c:S.clips,t:S.texts,s:S.sel,ts:S.ts}));if(hist.length>30)hist.shift()}
function undo(){if(!hist.length){toast("Rien à annuler");return}pause();var o=JSON.parse(hist.pop());S.clips=o.c;S.texts=o.t;S.sel=Math.min(o.s,o.c.length-1);S.ts=o.ts;cur=-1;layout();rngs();goto(Math.min(S.t,Math.max(0,total()-.01)))}

/* ── lecture des métadonnées : robuste (élément dans le DOM, plusieurs événements, délai max) ── */
function meta(u,log){log=log||[];return new Promise(function(ok){
var v=D.createElement("video"),done=0,tm=0,stage=0;
v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute("playsinline","");v.preload="auto";v.dataset.tcp="1";
v.style.cssText="position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none";
D.body.appendChild(v);
function end(r){if(done)return;done=1;clearTimeout(tm);v.onloadedmetadata=v.onloadeddata=v.ondurationchange=v.onerror=v.onseeked=null;try{v.pause();v.removeAttribute("src");v.load()}catch(e){}if(v.parentNode)v.remove();ok(r)}
function info(th,err){var d=v.duration;end({d:isFinite(d)?d:0,w:v.videoWidth,h:v.videoHeight,th:th||null,err:err||0})}
function shot(){var th=null;try{if(v.videoWidth){var c=D.createElement("canvas");c.width=54;c.height=96;var x=c.getContext("2d"),s=Math.max(54/v.videoWidth,96/v.videoHeight);x.drawImage(v,(54-v.videoWidth*s)/2,(96-v.videoHeight*s)/2,v.videoWidth*s,v.videoHeight*s);th=c.toDataURL("image/jpeg",.6)}}catch(e){}info(th)}
function ready(){if(stage)return;var d=v.duration;if(!isFinite(d)||d<=0)return;stage=1;clearTimeout(tm);tm=setTimeout(shot,1800);v.onseeked=function(){v.onseeked=null;shot()};try{v.currentTime=Math.min(.3,d/2)}catch(e){shot()}}
v.onloadedmetadata=function(){var d=v.duration;log.push("metadata d="+d+" "+v.videoWidth+"x"+v.videoHeight);
if(d===Infinity||isNaN(d)){v.ondurationchange=function(){if(isFinite(v.duration)&&v.duration>0){v.ondurationchange=null;try{v.currentTime=0}catch(e){}ready()}};try{v.currentTime=1e7}catch(e){}}
else ready()};
v.onloadeddata=function(){log.push("loadeddata");ready()};
v.onerror=function(){var e=v.error;log.push("ERREUR code="+(e?e.code:"?")+" "+(e&&e.message||""));end({d:0,w:0,h:0,th:null,err:"erreur"})};
tm=setTimeout(function(){log.push("DELAI 9s readyState="+v.readyState+" networkState="+v.networkState);info(null,"délai")},9000);
v.src=u;try{v.load()}catch(e){}})}

function diag(f,log,first){
var d=S.done,o=E("div","dg");
var t=["Impossible de lire cette vidéo dans le montage.","",
"Fichier : "+(f.name||"?")+" · "+(f.size/1048576).toFixed(1)+" Mo","Type : "+(f.type||"(vide)"),
"mp4/h264 : "+(D.createElement("video").canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')||"non"),
""].concat(log).join("\n");
var pre=E("pre","",t);var b1=E("button","ok","Publier sans montage"),b2=E("button","","Fermer");
b1.onclick=function(){shut();if(d)d(f)};b2.onclick=function(){shut();if(d)d(null)};
o.appendChild(pre);o.appendChild(b1);o.appendChild(b2);R.appendChild(o)}
async function addFile(f,first){
var log=["essai 1 : fichier tel quel"],u=URL.createObjectURL(f);urls.push(u);S.msg="Chargement de la vidéo…";ui();
var m=await meta(u,log);
if(R&&!m.d){log.push("essai 2 : type forcé video/mp4");var f2=new File([f],f.name||"video.mp4",{type:"video/mp4"});u=URL.createObjectURL(f2);urls.push(u);m=await meta(u,log);if(m.d)f=f2}
S.msg="";
if(!R)return;
if(!m.d){
  if(first){diag(f,log,first);return}
  toast("Vidéo illisible : "+(log[log.length-1]||""),4500);ui();return}
if(S.clips.length)snap();
S.clips.push({u:u,d:m.d,in:0,out:m.d,sp:1,vol:1,fl:0,th:m.th});
S.sel=S.clips.length-1;layout();rngs();goto(startOf(S.sel))}

/* ── audio ── */
function aud(){if(actx)return;try{actx=new(window.AudioContext||window.webkitAudioContext)();var s=actx.createMediaElementSource(V);gain=actx.createGain();dest=actx.createMediaStreamDestination();s.connect(gain);gain.connect(dest);gain.connect(actx.destination)}catch(e){actx=null;gain=null}}
function setVol(c){if(gain)gain.gain.value=c.vol;else V.volume=Math.min(1,c.vol)}

/* ── rendu ── */
function draw(){if(!X)return;var c=S.clips[cur];X.filter="none";X.fillStyle="#000";X.fillRect(0,0,W,H);
if(c&&V.videoWidth){var vw=V.videoWidth,vh=V.videoHeight,fl=F[c.fl][1]||"none";
if(S.fit==="fit"){var s0=Math.max(BC.width/vw,BC.height/vh);BX.drawImage(V,(BC.width-vw*s0)/2,(BC.height-vh*s0)/2,vw*s0,vh*s0);
X.globalAlpha=.55;X.drawImage(BC,0,0,W,H);X.globalAlpha=1;
var s1=Math.min(W/vw,H/vh);X.filter=fl;X.drawImage(V,(W-vw*s1)/2,(H-vh*s1)/2,vw*s1,vh*s1)}
else{var s2=Math.max(W/vw,H/vh);X.filter=fl;X.drawImage(V,(W-vw*s2)/2,(H-vh*s2)/2,vw*s2,vh*s2)}
X.filter="none"}
S.texts.forEach(function(o){if(S.t<o.a||S.t>o.b)return;X.font="800 "+o.s+"px sans-serif";X.textAlign="center";X.lineJoin="round";X.lineWidth=7;X.strokeStyle="#000";X.fillStyle=o.c;var y=o.p*H;X.strokeText(o.t,W/2,y,W-40);X.fillText(o.t,W/2,y,W-40)})}
function goto(t){var T=total();S.t=Math.max(0,Math.min(t,Math.max(0,T-.001)));var q=locate(S.t);if(!q)return;
var c=S.clips[q.i],pos=c.in+q.off*c.sp;V.defaultPlaybackRate=c.sp;setVol(c);
if(cur!==q.i){cur=q.i;V.src=c.u;var f=function(){V.removeEventListener("loadedmetadata",f);V.playbackRate=c.sp;try{V.currentTime=pos}catch(e){}};V.addEventListener("loadedmetadata",f);V.load()}
else{V.playbackRate=c.sp;try{V.currentTime=pos}catch(e){}}
ui()}
function play(){if(!S.clips.length)return;if(S.t>=total()-.05)goto(0);S.playing=true;aud();if(actx&&actx.resume)actx.resume();var p=V.play();if(p&&p.catch)p.catch(function(){});tick();ui()}
function pause(){S.playing=false;try{V.pause()}catch(e){}cancelAnimationFrame(raf);ui()}
function tick(){if(!S.playing)return;var c=S.clips[cur];
if(c){var st=startOf(cur);S.t=Math.max(st,st+(V.currentTime-c.in)/c.sp);
if(V.currentTime>=c.out-.03||V.ended){if(cur<S.clips.length-1){goto(startOf(cur+1));var p=V.play();if(p&&p.catch)p.catch(function(){})}else{S.t=total();pause();draw();if(S.onend)S.onend();return}}}
if(S.ex&&S.t>=S.lim){pause();draw();if(S.onend)S.onend();return}
draw();ui();raf=requestAnimationFrame(tick)}

/* ── timeline ── */
function xOfT(t){for(var i=0;i<G.length;i++){var n=cl(S.clips[i]);if(t<G[i].s+n||i===G.length-1)return G[i].x+Math.min(1,(t-G[i].s)/n)*G[i].w}return 12}
function tOfX(x){for(var i=0;i<G.length;i++){if(x<=G[i].x+G[i].w||i===G.length-1)return G[i].s+Math.max(0,Math.min(1,(x-G[i].x)/G[i].w))*cl(S.clips[i])}return 0}
function layout(){var trk=Q(".trk");if(!trk)return;trk.innerHTML="";G=[];var x=12;
S.clips.forEach(function(c,i){var w=Math.max(44,cl(c)*60);G.push({x:x,w:w,s:startOf(i)});
var b=E("div","c"+(i===S.sel?" on":""),(i+1)+" · "+mm1(cl(c))+(c.sp!==1?" · "+c.sp+"×":""));b.style.width=w+"px";
if(c.th)b.style.backgroundImage="linear-gradient(rgba(10,42,102,.30),rgba(10,42,102,.55)),url("+c.th+")";
trk.appendChild(b);x+=w+3});
S.texts.forEach(function(o,k){var a=xOfT(o.a),b=xOfT(Math.min(o.b,total()));var d=E("div","tx"+(k===S.ts?" on":""));d.style.left=a+"px";d.style.width=Math.max(8,b-a)+"px";trk.appendChild(d)});
PH=E("div","ph");trk.appendChild(PH);ui()}
function rngs(){var c=S.clips[S.sel];if(!c)return;var a=Q(".ri"),b=Q(".ro");a.min=b.min=0;a.max=b.max=c.d;a.step=b.step=.05;a.value=c.in;b.value=c.out}
function ui(){if(!R)return;var T=total(),M=MAXS();
Q(".tt").textContent=S.msg||(mm1(S.t)+" / "+mm1(T)+(T>M?"  · max "+M+" s":""));
Q(".pp").textContent=S.playing?"❚❚":"▶";
if(PH&&G.length){var x=xOfT(S.t);PH.style.left=x+"px";if(S.playing){var tl=Q(".tl"),vx=x-tl.scrollLeft;if(vx>tl.clientWidth-40||vx<20)tl.scrollLeft=x-60}}
if(S.ex){var p=Math.min(100,Math.round(S.t/Math.max(.1,S.lim)*100));Q(".pg i").style.width=p+"%";Q(".pg span").textContent="Export du montage… "+p+" %"}}
function ask(ph,cb){var a=E("div","as"),i=E("input"),b=E("button","ok","OK");i.placeholder=ph;a.appendChild(i);a.appendChild(b);R.appendChild(a);i.focus();
var go=function(){var v=i.value.trim();a.remove();if(v)cb(v)};b.onclick=go;i.onkeydown=function(e){if(e.key==="Enter")go()}}
function sub(items,on,cb){var s=Q(".sub");s.innerHTML="";items.forEach(function(n,i){var b=E("button",i===on?"on":"",n);b.onclick=function(){cb(i)};s.appendChild(b)});s.classList.add("on")}

/* ── outils ── */
function split(){var q=locate(S.t);if(!q)return;var c=S.clips[q.i],p=c.in+q.off*c.sp;
if(p-c.in<.3||c.out-p<.3){toast("Place la tête de lecture au milieu du clip");return}
snap();var n=JSON.parse(JSON.stringify(c));n.in=p;c.out=p;S.clips.splice(q.i+1,0,n);S.sel=q.i+1;layout();rngs()}
function del(){if(S.clips.length<2){toast("Il faut garder au moins un clip");return}
snap();S.clips.splice(S.sel,1);S.sel=Math.max(0,S.sel-1);cur=-1;layout();rngs();goto(startOf(S.sel))}
function dup(){var c=S.clips[S.sel];if(!c)return;snap();S.clips.splice(S.sel+1,0,JSON.parse(JSON.stringify(c)));S.sel++;layout();rngs();goto(startOf(S.sel))}
function pickFile(){var cb=function(f){if(f)addFile(f,false)};
if(window.__tpick&&window.__tpick("video/*",cb))return;
var i=E("input");i.type="file";i.accept="video/*";i.onchange=function(){if(i.files&&i.files[0])addFile(i.files[0],false)};i.click()}
var SP=[.5,1,1.5,2,3],VO=[0,.5,1,1.5,2],TC=["#ffffff","#00e5ff","#ffd84a","#ff4d4d"],TP=[.2,.5,.82];
function again(){var t=S.tool;S.tool="";tool(t)}
function tool(k){var c=S.clips[S.sel],s=Q(".sub");
if(S.tool===k&&k!=="plus"){S.tool="";s.classList.remove("on");return}
S.tool=k;s.classList.remove("on");
if(k==="plus"){S.tool="";pickFile()}
else if(k==="cut"){S.tool="";split()}
else if(k==="del"){S.tool="";del()}
else if(k==="un"){S.tool="";undo()}
else if(k==="dup"){S.tool="";dup()}
else if(!c){return}
else if(k==="sp"){sub(["0.5×","1×","1.5×","2×","3×"],SP.indexOf(c.sp),function(i){snap();c.sp=SP[i];layout();goto(startOf(S.sel));again()})}
else if(k==="vo"){sub(["Muet","50%","100%","150%","200%"],VO.indexOf(c.vol),function(i){snap();c.vol=VO[i];setVol(c);again()})}
else if(k==="fl"){sub(F.map(function(f){return f[0]}),c.fl,function(i){snap();c.fl=i;draw();again()})}
else if(k==="ft"){sub(["Ajuster (fond flou)","Remplir l'écran"],S.fit==="fit"?0:1,function(i){S.fit=i?"fill":"fit";draw();again()})}
else if(k==="tx"){sub(["＋ Texte","Haut","Centre","Bas","Blanc","Cyan","Jaune","Rouge","A+","A−","Suivant","Suppr."],-1,function(i){var o=S.texts[S.ts];
if(i===0){ask("Ton texte…",function(v){snap();S.texts.push({t:v,a:S.t,b:S.t+3,p:.5,s:56,c:"#ffffff"});S.ts=S.texts.length-1;layout();draw()});return}
if(!o){toast("Ajoute d'abord un texte");return}
if(i!==10)snap();
if(i<=3)o.p=TP[i-1];else if(i<=7)o.c=TC[i-4];else if(i===8)o.s=Math.min(110,o.s+8);else if(i===9)o.s=Math.max(26,o.s-8);
else if(i===10)S.ts=(S.ts+1)%S.texts.length;else{S.texts.splice(S.ts,1);S.ts=S.texts.length-1}
layout();draw()})}}

/* ── interface ── */
function build(){R=E("div");R.id="tcp";
R.innerHTML='<div class="h"><button class="bx">✕</button><b>STUDIO PRO</b><button class="bs">Stickers ›</button><button class="ok bk">Publier</button></div><div class="pv"><canvas></canvas></div><div class="ctl"><button class="pp">▶</button><span class="tt"></span></div><div class="tl"><div class="trk"></div></div><div class="rg"><label>Début<input class="ri" type="range"></label><label>Fin<input class="ro" type="range"></label></div><div class="sub"></div><div class="tools"></div><div class="pg"><span>Export du montage…</span><div><i></i></div><button class="cx">Annuler</button></div>';
D.body.appendChild(R);R.appendChild(V);
CV=Q("canvas");CV.width=W;CV.height=H;X=CV.getContext("2d");BC=E("canvas");BC.width=27;BC.height=48;BX=BC.getContext("2d");
var T=[["plus","＋","Clip"],["cut","✂","Diviser"],["del","⌫","Suppr."],["dup","⧉","Dupl."],["un","↶","Annuler"],["sp","»","Vitesse"],["vo","♪","Volume"],["fl","◐","Filtre"],["tx","T","Texte"],["ft","▭","Format"]],tb=Q(".tools");
T.forEach(function(t){var b=E("button");b.innerHTML="<i>"+t[1]+"</i>"+t[2];b.onclick=function(){tool(t[0])};tb.appendChild(b)});
Q(".pp").onclick=function(){S.playing?pause():play()};
Q(".tl").onclick=function(e){var tl=Q(".tl"),x=e.clientX-tl.getBoundingClientRect().left+tl.scrollLeft;
for(var i=0;i<G.length;i++){if(x<=G[i].x+G[i].w+3||i===G.length-1){S.sel=i;break}}
pause();layout();rngs();goto(tOfX(x))};
Q(".ri").onpointerdown=Q(".ro").onpointerdown=function(){snap()};
Q(".ri").oninput=function(){var c=S.clips[S.sel];if(!c)return;c.in=Math.min(+this.value,c.out-.3);this.value=c.in;layout();goto(startOf(S.sel))};
Q(".ro").oninput=function(){var c=S.clips[S.sel];if(!c)return;c.out=Math.max(+this.value,c.in+.3);this.value=c.out;layout();goto(startOf(S.sel)+cl(c)-.05)};
Q(".bx").onclick=function(){if(S.ex)return;var d=S.done;shut();if(d)d(null)};
Q(".bk").onclick=function(){fin(false)};
Q(".bs").onclick=function(){fin(true)};
Q(".cx").onclick=function(){S.cancel=1;pause();if(S.onend)S.onend()};
if(!ORIG)Q(".bs").style.display="none"}
function shut(){pause();urls.forEach(function(u){try{URL.revokeObjectURL(u)}catch(e){}});urls=[];hist=[];try{V.removeAttribute("src");V.load()}catch(e){}cur=-1;if(R){R.remove();R=null}S.clips=[];S.texts=[];S.msg=""}

/* ── export ── */
async function exp(){if(!S.clips.length)return null;
pause();aud();var M=MAXS();if(total()>M+.3)toast("Durée limitée à "+M+" s : la fin sera coupée",4200);
S.ex=true;S.cancel=0;S.lim=Math.min(total(),M);Q(".pg").classList.add("on");
var cs=CV.captureStream(30);if(dest)dest.stream.getAudioTracks().forEach(function(t){cs.addTrack(t)});
var mt=pickMime(),rec,ch=[],res=null;
try{rec=new MediaRecorder(cs,mt?{mimeType:mt,videoBitsPerSecond:2500000}:{videoBitsPerSecond:2500000})}
catch(e){toast("Export impossible ici");S.ex=false;if(R)Q(".pg").classList.remove("on");return null}
rec.ondataavailable=function(e){if(e.data&&e.data.size)ch.push(e.data)};
var stopped=new Promise(function(ok){rec.onstop=ok});
if(gain&&actx)try{gain.disconnect(actx.destination)}catch(e){}
try{
  goto(0);await new Promise(function(r){setTimeout(r,450)});
  if(!S.cancel){var ended=new Promise(function(ok){S.onend=ok});rec.start(500);play();await ended;S.onend=null;
    if(rec.state!=="inactive")rec.stop();await stopped}
  if(!S.cancel){var b=new Blob(ch,{type:mt||"video/webm"});
    if(b.size>0)res=new File([b],"montage-"+Date.now()+".webm",{type:b.type});else toast("Export vide : réessaie")}
}catch(e){toast("Export impossible : "+((e&&e.message)||e))}
if(gain&&actx)try{gain.connect(actx.destination)}catch(e){}
S.ex=false;S.onend=null;if(R)Q(".pg").classList.remove("on");
return res}
async function fin(chain){if(S.busy)return;S.busy=1;
try{var f=await exp();if(!f)return;var d=S.done;shut();if(chain&&ORIG&&ORIG!==mine)ORIG(f,d);else if(d)d(f)}
finally{S.busy=0}}
function mine(f,done){if(D.getElementById("tcp"))return;
S.clips=[];S.texts=[];S.sel=0;S.t=0;S.playing=false;S.fit="fit";S.ex=false;S.ts=-1;S.tool="";S.msg="";S.busy=0;S.cancel=0;S.done=done||function(){};cur=-1;hist=[];urls=[];
build();V.onseeked=V.onloadeddata=V.oncanplay=function(){draw()};
V.onerror=function(){var e=V.error;toast("Lecture impossible pour ce clip (code "+(e?e.code:"?")+")",5000)};
aud();addFile(f,true)}
setInterval(function(){if(window.tooleEdit!==mine){ORIG=window.tooleEdit;window.tooleEdit=mine}},800);
})();
/* Pendant le montage, coupe le son/lecture des vidéos du fil (sauf celles du studio) */
(function(){setInterval(function(){var open=!!document.getElementById("tcp");
document.querySelectorAll("video").forEach(function(v){if(v.dataset&&v.dataset.tcp)return;
if(open){if(v.__tm===undefined)v.__tm=v.muted;v.muted=true;if(!v.paused)v.pause()}
else if(v.__tm!==undefined){v.muted=v.__tm;delete v.__tm}})},250)})();
