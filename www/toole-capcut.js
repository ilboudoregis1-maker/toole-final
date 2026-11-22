/* TÕÕLé — Studio Pro : montage multi-clips façon CapCut */
(function(){"use strict";if(window.__tcp)return;window.__tcp=1;
var D=document,ORIG=null,W=540,H=960,CV,X,BC,BX,R,PH,G=[],cur=-1,raf=0,actx=null,gain=null,dest=null;
var l=D.createElement("link");l.rel="stylesheet";l.href="toole-capcut.css";D.head.appendChild(l);
var F=[["Normal",""],["N&B","grayscale(1) contrast(1.1)"],["Chaud","sepia(.3) saturate(1.5) hue-rotate(-12deg) brightness(1.05)"],["Froid","hue-rotate(18deg) saturate(1.2) brightness(1.05)"],["Vintage","sepia(.55) contrast(1.1) brightness(.95) saturate(1.2)"],["Contraste","contrast(1.4) saturate(1.3)"],["Vif","saturate(1.9) contrast(1.08)"],["Néon","saturate(2.2) contrast(1.2) hue-rotate(160deg)"]];
var S={clips:[],texts:[],sel:0,t:0,playing:false,fit:"fit",ex:false,ts:-1,tool:"",lim:30,done:null,onend:null};
var V=D.createElement("video");V.playsInline=true;V.setAttribute("playsinline","");V.preload="auto";
function MAXS(){try{return window.__tvDur?window.__tvDur():30}catch(e){return 30}}
function E(t,c,x){var e=D.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function Q(s){return R.querySelector(s)}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:120px;z-index:2147483600;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";D.body.appendChild(d);setTimeout(function(){d.remove()},3000)}
function mm1(s){s=Math.max(0,s);return Math.floor(s/60)+":"+("0"+Math.floor(s%60)).slice(-2)+"."+Math.floor((s%1)*10)}
function pickMime(){var M=window.MediaRecorder;if(!M||!M.isTypeSupported)return "";return ["video/webm;codecs=vp8,opus","video/webm;codecs=vp9,opus","video/webm"].filter(function(m){return M.isTypeSupported(m)})[0]||""}
function cl(c){return (c.out-c.in)/c.sp}
function total(){return S.clips.reduce(function(a,c){return a+cl(c)},0)}
function startOf(i){var a=0;for(var k=0;k<i;k++)a+=cl(S.clips[k]);return a}
function locate(t){var a=0;for(var i=0;i<S.clips.length;i++){var n=cl(S.clips[i]);if(t<a+n||i===S.clips.length-1)return{i:i,off:t-a};a+=n}return null}
function meta(u){return new Promise(function(ok){var v=D.createElement("video");v.preload="metadata";v.muted=true;
var fin=function(){var d=v.duration;ok({d:isFinite(d)?d:0,w:v.videoWidth,h:v.videoHeight})};
v.onloadedmetadata=function(){if(v.duration===Infinity||isNaN(v.duration)){v.ontimeupdate=function(){v.ontimeupdate=null;fin()};v.currentTime=1e7}else fin()};
v.onerror=function(){ok({d:0,w:0,h:0})};v.src=u})}
async function addFile(f){var u=URL.createObjectURL(f),m=await meta(u);
if(!m.d){toast("Vidéo illisible");return}
S.clips.push({u:u,d:m.d,in:0,out:m.d,sp:1,vol:1,fl:0});S.sel=S.clips.length-1;layout();rngs();if(S.clips.length===1)goto(0)}
function aud(){if(actx)return;try{actx=new(window.AudioContext||window.webkitAudioContext)();var s=actx.createMediaElementSource(V);gain=actx.createGain();dest=actx.createMediaStreamDestination();s.connect(gain);gain.connect(dest);gain.connect(actx.destination)}catch(e){actx=null;gain=null}}
function setVol(c){if(gain)gain.gain.value=c.vol;else V.volume=Math.min(1,c.vol)}
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
function pause(){S.playing=false;V.pause();cancelAnimationFrame(raf);ui()}
function tick(){if(!S.playing)return;var c=S.clips[cur];
if(c){var st=startOf(cur);S.t=Math.max(st,st+(V.currentTime-c.in)/c.sp);
if(V.currentTime>=c.out-.03||V.ended){if(cur<S.clips.length-1){goto(startOf(cur+1));var p=V.play();if(p&&p.catch)p.catch(function(){})}else{S.t=total();pause();draw();if(S.onend)S.onend();return}}}
if(S.ex&&S.t>=S.lim){pause();draw();if(S.onend)S.onend();return}
draw();ui();raf=requestAnimationFrame(tick)}
function xOfT(t){for(var i=0;i<G.length;i++){var n=cl(S.clips[i]);if(t<G[i].s+n||i===G.length-1)return G[i].x+Math.min(1,(t-G[i].s)/n)*G[i].w}return 12}
function tOfX(x){for(var i=0;i<G.length;i++){if(x<=G[i].x+G[i].w||i===G.length-1)return G[i].s+Math.max(0,Math.min(1,(x-G[i].x)/G[i].w))*cl(S.clips[i])}return 0}
function layout(){var trk=Q(".trk");trk.innerHTML="";G=[];var x=12;
S.clips.forEach(function(c,i){var w=Math.max(44,cl(c)*60);G.push({x:x,w:w,s:startOf(i)});
var b=E("div","c"+(i===S.sel?" on":""),(i+1)+" · "+mm1(cl(c))+(c.sp!==1?" · "+c.sp+"×":""));b.style.width=w+"px";trk.appendChild(b);x+=w+3});
S.texts.forEach(function(o){var a=xOfT(o.a),b=xOfT(Math.min(o.b,total()));var d=E("div","tx");d.style.left=a+"px";d.style.width=Math.max(8,b-a)+"px";trk.appendChild(d)});
PH=E("div","ph");trk.appendChild(PH);ui()}
function rngs(){var c=S.clips[S.sel];if(!c)return;var a=Q(".ri"),b=Q(".ro");a.min=b.min=0;a.max=b.max=c.d;a.step=b.step=.05;a.value=c.in;b.value=c.out}
function ui(){if(!R)return;var T=total(),M=MAXS();Q(".tt").textContent=mm1(S.t)+" / "+mm1(T)+(T>M?"  · max "+M+" s":"");Q(".pp").textContent=S.playing?"❚❚":"▶";
if(PH&&G.length){var x=xOfT(S.t);PH.style.left=x+"px";if(S.playing){var tl=Q(".tl"),vx=x-tl.scrollLeft;if(vx>tl.clientWidth-40||vx<20)tl.scrollLeft=x-60}}
if(S.ex)Q(".pg i").style.width=Math.min(100,S.t/S.lim*100)+"%"}
function ask(ph,cb){var a=E("div","as"),i=E("input"),b=E("button","ok","OK");i.placeholder=ph;a.appendChild(i);a.appendChild(b);R.appendChild(a);i.focus();
var go=function(){var v=i.value.trim();a.remove();if(v)cb(v)};b.onclick=go;i.onkeydown=function(e){if(e.key==="Enter")go()}}
function sub(items,on,cb){var s=Q(".sub");s.innerHTML="";items.forEach(function(n,i){var b=E("button",i===on?"on":"",n);b.onclick=function(){cb(i)};s.appendChild(b)});s.classList.add("on")}
function split(){var q=locate(S.t);if(!q)return;var c=S.clips[q.i],p=c.in+q.off*c.sp;
if(p-c.in<.3||c.out-p<.3){toast("Place la tête de lecture au milieu du clip");return}
var n=JSON.parse(JSON.stringify(c));n.in=p;c.out=p;S.clips.splice(q.i+1,0,n);S.sel=q.i+1;layout();rngs()}
function del(){if(S.clips.length<2){toast("Il faut garder au moins un clip");return}
S.clips.splice(S.sel,1);S.sel=Math.max(0,S.sel-1);cur=-1;layout();rngs();goto(startOf(S.sel))}
function pickFile(){var i=E("input");i.type="file";i.accept="video/*";i.onchange=function(){if(i.files&&i.files[0])addFile(i.files[0])};i.click()}
var SP=[.5,1,1.5,2,3],VO=[0,.5,1,1.5,2],TC=["#ffffff","#00e5ff","#ffd84a","#ff4d4d"],TP=[.2,.5,.82];
function tool(k){var c=S.clips[S.sel],s=Q(".sub");
if(S.tool===k&&k!=="plus"){S.tool="";s.classList.remove("on");return}
S.tool=k;s.classList.remove("on");
if(k==="plus"){S.tool="";pickFile()}
else if(k==="cut"){S.tool="";split()}
else if(k==="del"){S.tool="";del()}
else if(!c){return}
else if(k==="sp"){sub(["0.5×","1×","1.5×","2×","3×"],SP.indexOf(c.sp),function(i){c.sp=SP[i];layout();goto(startOf(S.sel));var t=S.tool;S.tool="";tool(t)})}
else if(k==="vo"){sub(["Muet","50%","100%","150%","200%"],VO.indexOf(c.vol),function(i){c.vol=VO[i];setVol(c);var t=S.tool;S.tool="";tool(t)})}
else if(k==="fl"){sub(F.map(function(f){return f[0]}),c.fl,function(i){c.fl=i;draw();var t=S.tool;S.tool="";tool(t)})}
else if(k==="ft"){sub(["Ajuster (fond flou)","Remplir l'écran"],S.fit==="fit"?0:1,function(i){S.fit=i?"fill":"fit";draw();var t=S.tool;S.tool="";tool(t)})}
else if(k==="tx"){sub(["＋ Texte","Haut","Centre","Bas","Blanc","Cyan","Jaune","Rouge","A+","A−","Suivant","Suppr."],-1,function(i){var o=S.texts[S.ts];
if(i===0){ask("Ton texte…",function(v){S.texts.push({t:v,a:S.t,b:S.t+3,p:.5,s:56,c:"#ffffff"});S.ts=S.texts.length-1;layout();draw()});return}
if(!o){toast("Ajoute d'abord un texte");return}
if(i<=3)o.p=TP[i-1];else if(i<=7)o.c=TC[i-4];else if(i===8)o.s=Math.min(110,o.s+8);else if(i===9)o.s=Math.max(26,o.s-8);
else if(i===10)S.ts=(S.ts+1)%S.texts.length;else{S.texts.splice(S.ts,1);S.ts=S.texts.length-1}
layout();draw()})}}
function build(){R=E("div");R.id="tcp";
R.innerHTML='<div class="h"><button class="bx">✕</button><b>STUDIO PRO</b><button class="bs">Stickers ›</button><button class="ok bk">Publier</button></div><div class="pv"><canvas></canvas></div><div class="ctl"><button class="pp">▶</button><span class="tt"></span></div><div class="tl"><div class="trk"></div></div><div class="rg"><label>Début<input class="ri" type="range"></label><label>Fin<input class="ro" type="range"></label></div><div class="sub"></div><div class="tools"></div><div class="pg"><span>Export du montage…</span><div><i></i></div></div>';
D.body.appendChild(R);CV=Q("canvas");CV.width=W;CV.height=H;X=CV.getContext("2d");BC=E("canvas");BC.width=27;BC.height=48;BX=BC.getContext("2d");
var T=[["plus","＋","Clip"],["cut","✂","Diviser"],["del","⌫","Suppr."],["sp","»","Vitesse"],["vo","♪","Volume"],["fl","◐","Filtre"],["tx","T","Texte"],["ft","▭","Format"]],tb=Q(".tools");
T.forEach(function(t){var b=E("button");b.innerHTML="<i>"+t[1]+"</i>"+t[2];b.onclick=function(){tool(t[0])};tb.appendChild(b)});
Q(".pp").onclick=function(){S.playing?pause():play()};
Q(".tl").onclick=function(e){var tl=Q(".tl"),x=e.clientX-tl.getBoundingClientRect().left+tl.scrollLeft;
for(var i=0;i<G.length;i++){if(x<=G[i].x+G[i].w+3||i===G.length-1){S.sel=i;break}}
pause();layout();rngs();goto(tOfX(x))};
Q(".ri").oninput=function(){var c=S.clips[S.sel];c.in=Math.min(+this.value,c.out-.3);this.value=c.in;layout();goto(startOf(S.sel))};
Q(".ro").oninput=function(){var c=S.clips[S.sel];c.out=Math.max(+this.value,c.in+.3);this.value=c.out;layout();goto(startOf(S.sel)+cl(c)-.05)};
Q(".bx").onclick=function(){var d=S.done;shut();if(d)d(null)};
Q(".bk").onclick=function(){fin(false)};
Q(".bs").onclick=function(){fin(true)};
if(!ORIG)Q(".bs").style.display="none"}
function shut(){pause();S.clips.forEach(function(c){try{URL.revokeObjectURL(c.u)}catch(e){}});try{V.removeAttribute("src");V.load()}catch(e){}cur=-1;if(R){R.remove();R=null}S.clips=[];S.texts=[]}
async function exp(){if(!S.clips.length)return null;pause();aud();S.ex=true;S.lim=Math.min(total(),MAXS());Q(".pg").classList.add("on");
var cs=CV.captureStream(30);if(dest)dest.stream.getAudioTracks().forEach(function(t){cs.addTrack(t)});
var mt=pickMime(),rec,ch=[];
try{rec=new MediaRecorder(cs,mt?{mimeType:mt,videoBitsPerSecond:2500000}:{videoBitsPerSecond:2500000})}catch(e){toast("Export impossible ici");S.ex=false;Q(".pg").classList.remove("on");return null}
rec.ondataavailable=function(e){if(e.data&&e.data.size)ch.push(e.data)};
var stopped=new Promise(function(ok){rec.onstop=ok});
if(gain&&actx)try{gain.disconnect(actx.destination)}catch(e){}
goto(0);await new Promise(function(r){setTimeout(r,450)});
var ended=new Promise(function(ok){S.onend=ok});
rec.start(500);play();await ended;S.onend=null;
rec.stop();await stopped;
if(gain&&actx)try{gain.connect(actx.destination)}catch(e){}
S.ex=false;if(R)Q(".pg").classList.remove("on");
var b=new Blob(ch,{type:mt||"video/webm"});
return new File([b],"montage-"+Date.now()+".webm",{type:b.type})}
async function fin(chain){var f=await exp();if(!f)return;var d=S.done;shut();
if(chain&&ORIG&&ORIG!==mine)ORIG(f,d);else if(d)d(f)}
function mine(f,done){if(D.getElementById("tcp"))return;
S.clips=[];S.texts=[];S.sel=0;S.t=0;S.playing=false;S.fit="fit";S.ex=false;S.ts=-1;S.tool="";S.done=done||function(){};cur=-1;
build();V.onseeked=V.onloadeddata=function(){draw()};aud();addFile(f)}
setInterval(function(){if(window.tooleEdit!==mine){ORIG=window.tooleEdit;window.tooleEdit=mine}},800);
})();
