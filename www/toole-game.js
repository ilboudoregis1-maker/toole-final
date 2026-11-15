/* TÕÕLé — Chasse au pollueur (Ouaga Run) : jeu hors ligne, bouton visible dans Explorer */
(function(){
"use strict";
if(window.tooleGame)return;
var ZMAX=70,K=.07,TAU=Math.PI*2,FONT='"Trebuchet MS",system-ui,sans-serif';
var ROOT,CV,X,PN,W=360,H=640,HOR=190,BASE=525,LW=108,UH=54,raf=0,last=0,best=0,actx=null,G={run:false,pause:false};
try{best=+localStorage.getItem("tg_best")||0}catch(e){}
var SKIN="#5b3522";
var ME={c1:"#009E49",c2:"#FCD116",hat:"#EF2B2D",pants:"#2b1b12"};
var OUT=[{c1:"#ff7a1a",c2:"#fff3d6",hat:"#1f1f1f"},{c1:"#8e3bd1",c2:"#ffd24a",hat:"#f2f2f2"},{c1:"#1d9bd8",c2:"#ffffff",hat:"#c0392b"},{c1:"#d7263d",c2:"#ffe08a",hat:"#222222"}];

function sc(z){return 1/(1+z*K)}
function ys(s){return HOR+(BASE-HOR)*s}
function xs(l,s){return W/2+l*LW*s}
function rnd(a,b){return a+Math.random()*(b-a)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function snd(f,d,t,v){try{if(!actx||MUT)return;var o=actx.createOscillator(),g=actx.createGain(),n=actx.currentTime;o.type=t||"sine";o.frequency.value=f;g.gain.setValueAtTime(v||.06,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(actx.destination);o.start(n);o.stop(n+d)}catch(e){}}
function fmt(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g," ")}

/* ---------- interface ---------- */
var CSS="#tgBtn{display:none;position:fixed;right:14px;bottom:calc(92px + env(safe-area-inset-bottom,0px));z-index:2147482000;align-items:center;gap:6px;padding:11px 16px;border:0;border-radius:999px;background:linear-gradient(135deg,#EF2B2D 0%,#EF2B2D 45%,#009E49 55%,#009E49 100%);color:#fff;font:800 15px "+FONT+";box-shadow:0 6px 18px rgba(0,0,0,.35)}"
+"#tgBtn span{font-size:19px}"
+"#tgRoot{display:none;position:fixed;inset:0;z-index:2147483000;background:#2b1409;touch-action:none;user-select:none;-webkit-user-select:none}"
+"#tgCv{position:absolute;inset:0;width:100%;height:100%;display:block}"
+"#tgX{position:absolute;left:10px;top:calc(8px + env(safe-area-inset-top,0px));width:42px;height:42px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font:700 20px "+FONT+"}"
+"#tgPn{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(30,12,4,.6)}"
+".tgc{width:100%;max-width:340px;background:#fff6e2;color:#2b1409;border-radius:18px;overflow:hidden;font-family:"+FONT+";box-shadow:0 14px 40px rgba(0,0,0,.5)}"
+".tgf{height:12px;background:linear-gradient(#EF2B2D 50%,#009E49 50%)}"
+".tgc h2{margin:14px 16px 0;font-size:26px;line-height:1.1;font-weight:900}"
+".tgs{margin:2px 16px 8px;color:#a8472b;font-weight:800}"
+".tgc p{margin:6px 16px;font-size:14.5px;line-height:1.4}"
+".tgc ul{margin:6px 16px 0;padding-left:18px;font-size:14px;line-height:1.5}"
+".tgc button{display:block;width:calc(100% - 32px);margin:12px 16px 0;padding:13px;border:0;border-radius:12px;background:#009E49;color:#fff;font:800 17px "+FONT+"}"
+".tgc button.q{background:#e8d9b8;color:#2b1409;margin-bottom:0}"
+".tgb{margin:10px 16px 14px!important;font-weight:800;color:#a8472b}"
+".tgn{display:flex;justify-content:space-between;margin:8px 16px 0;font-weight:800;font-size:16px}";

var PAD='<svg viewBox="0 0 24 24"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>';
var SCENE='<svg class="sc" viewBox="0 0 360 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8702a"/><stop offset=".65" stop-color="#ffb347"/><stop offset="1" stop-color="#ffe3a0"/></linearGradient><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4683a"/><stop offset="1" stop-color="#8f3a1f"/></linearGradient><linearGradient id="gf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1b3d" stop-opacity="0"/><stop offset="1" stop-color="#0d1b3d"/></linearGradient></defs><rect width="360" height="210" fill="url(#gs)"/><circle cx="268" cy="92" r="46" fill="#FCD116" opacity=".28"/><circle cx="268" cy="92" r="30" fill="#FCD116"/><path d="M0 120V96h26V74h20v18h16v-30h24v40h18V90h22v30z" fill="#7a3d4e" opacity=".6"/><path d="M262 120V84h18V70h22v24h20v-14h24v40z" fill="#7a3d4e" opacity=".6"/><g fill="#5a3320"><path d="M34 126Q42 100 40 80H58Q56 100 66 126Z"/><ellipse cx="49" cy="76" rx="27" ry="13"/><path d="M296 126Q304 100 302 82H320Q318 100 328 126Z"/><ellipse cx="311" cy="78" rx="27" ry="13"/></g><rect y="118" width="360" height="92" fill="url(#gg)"/><polygon points="150,118 210,118 332,210 28,210" fill="#34323a"/><polygon points="149,118 154,118 42,210 20,210" fill="#EF2B2D"/><polygon points="206,118 211,118 340,210 318,210" fill="#009E49"/><path d="M171 118L140 210M189 118L220 210" stroke="#f4efe0" stroke-width="3" stroke-dasharray="10 9" fill="none"/><g transform="translate(180 146) scale(.42)"><ellipse rx="22" ry="5" fill="#000" opacity=".3"/><path d="M-7 -34L-12 -4M7 -34L12 -4" stroke="#2b1b12" stroke-width="7" stroke-linecap="round"/><path d="M-16 -80H16L22 -34H-22Z" fill="#ff7a1a"/><circle cx="26" cy="-46" r="13" fill="#e9e4d8"/><circle cy="-90" r="10" fill="#5b3522"/><path d="M-10 -92A10 10 0 0 1 10 -92Z" fill="#1f1f1f"/></g><g transform="translate(138 170) scale(.62)"><ellipse rx="22" ry="5" fill="#000" opacity=".3"/><ellipse cy="-14" rx="5" ry="15" fill="#111"/><rect x="-9" y="-38" width="18" height="20" rx="3" fill="#c42d2d"/><rect x="-14" y="-50" width="28" height="12" rx="3" fill="#d9b26a"/><rect x="-10" y="-74" width="20" height="26" rx="4" fill="#2a5db0"/><circle cy="-80" r="7" fill="#5b3522"/><path d="M-7 -82A7 7 0 0 1 7 -82Z" fill="#FCD116"/></g><g transform="translate(184 208)"><ellipse rx="26" ry="5" fill="#000" opacity=".3"/><path d="M-9 -44L-15 -5M9 -44L15 -5" stroke="#2b1b12" stroke-width="9" stroke-linecap="round"/><path d="M-20 -104H20L28 -44H-28Z" fill="#009E49"/><rect x="-24" y="-76" width="48" height="8" fill="#FCD116"/><path d="M-20 -98L-30 -64M20 -98L30 -64" stroke="#5b3522" stroke-width="8" stroke-linecap="round"/><circle cy="-116" r="13" fill="#5b3522"/><path d="M-13 -119A13 13 0 0 1 13 -119Z" fill="#EF2B2D"/></g><rect y="140" width="360" height="70" fill="url(#gf)"/></svg>';
var HUBCSS=["#tgHub{display:none;position:fixed;inset:0;z-index:2147482500;flex-direction:column;background:#eef6ff;font-family:"+FONT+";animation:tgIn .25s ease-out}",
"@keyframes tgIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@keyframes tgP{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}@keyframes tgG{0%,100%{box-shadow:0 8px 22px rgba(47,111,224,.45)}50%{box-shadow:0 8px 30px rgba(0,194,224,.8)}}",
"#tgHub .hh{position:relative;overflow:hidden;display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 12px) 14px 16px;background:linear-gradient(135deg,#00c2e0 0%,#2f6fe0 60%,#4a56e2 100%);color:#fff;box-shadow:0 8px 26px rgba(47,111,224,.35)}",
"#tgHub .hh::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.28) 1px,transparent 1.6px);background-size:14px 14px;pointer-events:none}#tgHub .hh>*{position:relative}",
"#tgHub .hb{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;padding:0}#tgHub .hb:active{transform:scale(.92)}",
"#tgHub .hb svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}",
"#tgHub h3{flex:1;margin:0;font-family:Orbitron,sans-serif;font-size:18px;font-weight:800;letter-spacing:4px;color:#fff;text-shadow:0 0 14px rgba(255,255,255,.45)}",
"#tgHub .hs{flex:1;overflow:auto;padding:18px 16px calc(24px + env(safe-area-inset-bottom,0px))}#tgHub .hk{margin:0 4px 12px;color:#2f6fe0;font-weight:800;font-size:14px;letter-spacing:.5px}",
"#tgHub .hc{border-radius:26px;overflow:hidden;background:#0d1b3d;color:#fff;box-shadow:0 18px 42px rgba(20,50,120,.4),0 0 0 1px rgba(255,255,255,.08) inset}#tgHub .sc{display:block;width:100%;height:auto}",
"#tgHub .hi2{padding:0 18px 18px;margin-top:-14px;position:relative}#tgHub .ht{display:flex;gap:8px;margin-bottom:10px}",
"#tgHub .t1,#tgHub .t2{font-size:11px;font-weight:900;letter-spacing:1px;padding:4px 10px;border-radius:999px}#tgHub .t1{background:#FCD116;color:#2b1409}#tgHub .t2{background:rgba(255,255,255,.14);color:#cfe3ff}",
"#tgHub .hn{font-size:30px;font-weight:900;line-height:1.05}#tgHub .hd{margin-top:2px;color:#9fc0ff;font-weight:700;font-size:14px}",
"#tgHub .hr{display:flex;gap:10px;margin:14px 0}#tgHub .hr div{flex:1;background:rgba(255,255,255,.08);border-radius:14px;padding:9px 6px;text-align:center}#tgHub .hr b{display:block;font-size:19px;font-weight:900}#tgHub .hr small{color:#9fc0ff;font-weight:700;font-size:11px}",
"#tgHub .hp{width:100%;height:54px;border:0;border-radius:16px;background:linear-gradient(135deg,#00c2e0,#2f6fe0 60%,#4a56e2);color:#fff;font:900 18px "+FONT+";letter-spacing:2px;display:flex;align-items:center;justify-content:center;gap:10px;animation:tgG 2s infinite}#tgHub .hp:active{transform:scale(.97)}#tgHub .hp svg{width:22px;height:22px}",
"#tgHub .hf{text-align:center;margin:18px 0 0;color:#7d93b8;font-weight:700;font-size:13px}",
"#tgIc{position:relative}#tgIc::after{content:'';position:absolute;top:5px;right:5px;width:9px;height:9px;border-radius:50%;background:#FCD116;animation:tgP 1.6s infinite}#scrDecouvrir .dc-hd h1{letter-spacing:1.5px}",
"#tgSnd{position:absolute;left:58px;top:calc(8px + env(safe-area-inset-top,0px));width:42px;height:42px;border-radius:50%;border:0;background:rgba(0,0,0,.45);display:grid;place-items:center;padding:0}",
"#tgSkip{position:absolute;right:10px;top:calc(8px + env(safe-area-inset-top,0px));height:40px;padding:0 16px;border:0;border-radius:20px;background:rgba(0,0,0,.5);color:#fff;font:800 15px "+FONT+"}"].join("");
function hub(){
 var o=document.getElementById("tgHub");if(o)o.remove();
 var h=document.createElement("div");h.id="tgHub";
 h.innerHTML='<div class="hh"><button class="hb" id="tgHx" aria-label="Retour"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button><h3>JEUX</h3><span class="hb">'+PAD+'</span></div>'
 +'<div class="hs"><p class="hk">Choisis ton jeu</p><div class="hc">'+SCENE+'<div class="hi2"><div class="ht"><span class="t1">NOUVEAU</span><span class="t2">COURSE</span><span class="t2">SOLO</span></div><div class="hn">Faso Rush</div><div class="hd">Chasse au pollueur · Ouagadougou</div>'
 +'<div class="hr"><div><b>'+fmt(best)+'</b><small>RECORD</small></div><div><b>3</b><small>ZONES</small></div><div><b>∞</b><small>COURSE</small></div></div>'
 +'<button class="hp" id="tgHp"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="#fff"/></svg>JOUER</button></div></div><p class="hf">D’autres jeux arrivent bientôt</p></div>';
 document.body.appendChild(h);
 document.getElementById("tgHx").onclick=function(){h.style.display="none"};
 document.getElementById("tgHp").onclick=function(){h.style.display="none";open()};
 h.style.display="flex";
}
function inject(){var hd=document.querySelector("#scrDecouvrir .dc-hd");if(!hd||hd.querySelector("#tgIc"))return;
 var b=document.createElement("button");b.id="tgIc";b.className="dc-ib";b.setAttribute("aria-label","Jeux");b.innerHTML=PAD;b.onclick=hub;hd.insertBefore(b,hd.lastElementChild)}
var MUT=false,MG=null,NB=null,mus={on:0,next:0,step:0,tm:0};
try{MUT=localStorage.getItem("tg_mute")==="1"}catch(e){}
function mg(){if(!MG){MG=actx.createGain();MG.gain.value=.6;MG.connect(actx.destination)}return MG}
function nt(f,t,d,ty,v){var o=actx.createOscillator(),g=actx.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(mg());o.start(t);o.stop(t+d+.03)}
function kick(t){var o=actx.createOscillator(),g=actx.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(g);g.connect(mg());o.start(t);o.stop(t+.2)}
function nz(t,d,v,fr,ty){if(!NB){NB=actx.createBuffer(1,actx.sampleRate*.2,actx.sampleRate);var a=NB.getChannelData(0);for(var i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 var sr=actx.createBufferSource(),f=actx.createBiquadFilter(),g=actx.createGain();sr.buffer=NB;f.type=ty;f.frequency.value=fr;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);sr.connect(f);f.connect(g);g.connect(mg());sr.start(t);sr.stop(t+d+.02)}
var ROOTS=[55,43.65,65.41,49],CH=[[220,261.63,329.63],[174.61,220,261.63],[261.63,329.63,392],[196,246.94,293.66]];
function sched(st,t){var bar=Math.floor(st/16)%4,q=st%16,r=ROOTS[bar],c=CH[bar];
 if(q%4===0)kick(t);if(q===4||q===12)nz(t,.14,.13,1800,"bandpass");if(q%2===1)nz(t,.05,.05,7000,"highpass");
 if(q%2===0)nt(q%8===6?r*2:r,t,.16,"sawtooth",.07);
 nt(c[(q*5)%3]*(q%4<2?2:1),t,.1,"triangle",q%4===0?.06:.035)}
function musTick(){if(!actx||!mus.on)return;var bpm=124+Math.min(28,((G.level||1)-1)*3);
 while(mus.next<actx.currentTime+.15){sched(mus.step,mus.next);mus.next+=60/bpm/4;mus.step++}}
function musStart(){if(MUT||!actx||mus.on)return;mus.on=1;mus.next=actx.currentTime+.05;mus.step=0;mus.tm=setInterval(musTick,40)}
function musStop(){mus.on=0;clearInterval(mus.tm)}
function eng(t){try{if(!actx||MUT)return;var o=actx.createOscillator(),g=actx.createGain(),n=actx.currentTime,m=t==="moto";o.type="sawtooth";o.frequency.setValueAtTime(m?240:130,n);o.frequency.exponentialRampToValueAtTime(m?110:60,n+1);g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.05,n+.25);g.gain.exponentialRampToValueAtTime(.0001,n+1);o.connect(g);g.connect(mg());o.start(n);o.stop(n+1.05)}catch(e){}}
function fx(g){var i,a,p,v=Math.min(1,Math.max(0,(g.speed-14)/14));
 if(v>0){X.strokeStyle="rgba(255,255,255,"+(.22*v)+")";X.lineWidth=2;for(i=0;i<16;i++){a=Math.PI*(.1+.8*((i*.618)%1));p=(g.t*1.5+i*.37)%1;var r0=p*H*.8,r1=r0+H*.1;X.beginPath();X.moveTo(W/2+Math.cos(a)*r0*.9,HOR+Math.sin(a)*r0);X.lineTo(W/2+Math.cos(a)*r1*.9,HOR+Math.sin(a)*r1);X.stroke()}}
 var vg=X.createRadialGradient(W/2,H*.55,H*.3,W/2,H*.55,H*.85);vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,20,.38)");X.fillStyle=vg;X.fillRect(0,0,W,H)}
var SON='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',SOFF='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9l5 6M21 9l-5 6"/></svg>';
function build(){
 var st=document.createElement("style");st.textContent=CSS+HUBCSS;document.head.appendChild(st);
 var b=document.createElement("button");b.id="tgBtn";setInterval(inject,600);inject();b.innerHTML="<span>🎮</span>Jeux";b.onclick=hub;document.body.appendChild(b);
 ROOT=document.createElement("div");ROOT.id="tgRoot";
 ROOT.innerHTML='<canvas id="tgCv"></canvas><button id="tgX" aria-label="Quitter">✕</button><div id="tgPn"></div>';
 document.body.appendChild(ROOT);
 CV=document.getElementById("tgCv");X=CV.getContext("2d");PN=document.getElementById("tgPn");
 document.getElementById("tgX").onclick=close;
 var sb=document.createElement("button");sb.id="tgSnd";sb.innerHTML=MUT?SOFF:SON;sb.onclick=function(){MUT=!MUT;try{localStorage.setItem("tg_mute",MUT?"1":"0")}catch(e){}sb.innerHTML=MUT?SOFF:SON;if(MUT)musStop();else if(G.run||G.intro)musStart()};ROOT.appendChild(sb);
 var sx=0,sy=0,ok=false;
 CV.addEventListener("touchstart",function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;ok=true;e.preventDefault()},{passive:false});
 CV.addEventListener("touchmove",function(e){e.preventDefault();if(!ok)return;var t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;
  if(Math.abs(dx)>26&&Math.abs(dx)>Math.abs(dy)){dx<0?mvL():mvR();ok=false}
  else if(Math.abs(dy)>26){dy<0?jump():slide();ok=false}},{passive:false});
 CV.addEventListener("touchend",function(){ok=false});
 document.addEventListener("keydown",function(e){if(ROOT.style.display!=="block")return;
  var k=e.key;if(k==="ArrowLeft")mvL();else if(k==="ArrowRight")mvR();else if(k==="ArrowUp"||k===" ")jump();else if(k==="ArrowDown")slide();else return;e.preventDefault()});
 document.addEventListener("visibilitychange",function(){G.pause=document.hidden;if(document.hidden)musStop();else if(G.run||G.intro)musStart()});
 window.addEventListener("resize",function(){if(ROOT.style.display==="block")resize()});
}
function resize(){
 W=ROOT.clientWidth||360;H=ROOT.clientHeight||640;var d=Math.min(2,window.devicePixelRatio||1);
 CV.width=Math.round(W*d);CV.height=Math.round(H*d);X.setTransform(d,0,0,d,0,0);
 HOR=H*.34;BASE=H*.88;LW=Math.min(W*.32,H*.2);UH=LW*.85;
}
function open(){
 try{document.querySelectorAll("video").forEach(function(v){v.pause()})}catch(e){}
 ROOT.style.display="block";resize();
 try{if(!actx){var A=window.AudioContext||window.webkitAudioContext;if(A)actx=new A()}if(actx&&actx.resume)actx.resume()}catch(e){}
 G={run:false,pause:false,t:0,dist:0,lane:0,laneX:0,y:0,slide:0,ph:0,level:1,gap:10,obs:[],coins:[],dec:[],cx:0,out:0,lives:3,cauris:0,score:0,caught:0,speed:13,inv:0,stumble:0,shake:0,flash:0,msg:"",msgT:0};
 for(var z=4;z<ZMAX;z+=3){addDeco(z,-1);addDeco(z+1.5,1)}
 showStart();cancelAnimationFrame(raf);last=performance.now();raf=requestAnimationFrame(loop);
}
function close(){ROOT.style.display="none";cancelAnimationFrame(raf);musStop();G.run=false;G.intro=0;var sk=document.getElementById("tgSkip");if(sk)sk.style.display="none"}
function showStart(){
 PN.style.display="flex";
 PN.innerHTML='<div class="tgc"><div class="tgf"></div><h2>Faso Rush</h2><p class="tgs">Chasse au pollueur · Ouaga</p>'
 +'<p>Un citoyen vient de jeter ses ordures dans la rue. Cours, rattrape-le et fais-lui payer l’amende !</p>'
 +'<ul><li>Glisse à gauche ou à droite pour changer de voie</li><li>Glisse vers le haut pour sauter les sacs</li><li>Glisse vers le bas pour passer sous la banderole</li><li>Ramasse les cauris : chaque cauri te rapproche de lui</li></ul>'
 +'<button id="tgGo">Courir</button><p class="tgb">Record : '+fmt(best)+'</p></div>';
 document.getElementById("tgGo").onclick=intro;
}
function showOver(txt){
 PN.style.display="flex";
 PN.innerHTML='<div class="tgc"><div class="tgf"></div><h2>'+txt+'</h2><p class="tgs">Score : '+fmt(G.score)+'</p>'
 +'<div class="tgn"><span>Pollueurs attrapés</span><span>'+G.caught+'</span></div><div class="tgn"><span>Cauris</span><span>'+G.cauris+'</span></div>'
 +'<button id="tgGo">Rejouer</button><button class="q" id="tgQ">Quitter</button><p class="tgb">Record : '+fmt(best)+'</p></div>';
 document.getElementById("tgGo").onclick=start;document.getElementById("tgQ").onclick=close;
}
function start(){
 try{if(actx&&actx.resume)actx.resume()}catch(e){}
 PN.style.display="none";
 G={run:true,pause:false,t:0,dist:0,speed:13,score:0,cauris:0,lives:3,gap:10,lane:0,laneX:0,y:0,vy:0,slide:0,inv:0,stumble:0,shake:0,flash:0,ph:0,level:1,caught:0,
  obs:[],coins:[],dec:[],nextSp:12,nd:0,cx:0,cl:0,ct:1.5,cd:3,msg:"Rattrape le pollueur !",msgT:2.2,out:0};
 for(var z=4;z<ZMAX;z+=3){addDeco(z,-1);addDeco(z+1.5,1)}
 snd(440,.12,"triangle",.07);musStart();
}
function over(txt){
 G.run=false;G.score=Math.round(G.score+G.dist*.5);
 if(G.score>best){best=G.score;try{localStorage.setItem("tg_best",String(best))}catch(e){}}
 snd(160,.4,"sawtooth",.09);musStop();showOver(txt);
}

/* ---------- commandes ---------- */
function mvL(){if(G.run&&G.lane>-1){G.lane--;snd(300,.05,"square",.03)}}
function mvR(){if(G.run&&G.lane<1){G.lane++;snd(300,.05,"square",.03)}}
function jump(){if(G.run&&G.y<=.01){G.vy=8.4;G.slide=0;snd(520,.1,"triangle",.05)}}
function slide(){if(G.run){G.slide=.7;if(G.y>0)G.vy=-14}}

/* ---------- logique ---------- */
var BIO=[{n:"Ville",sky:["#e8702a","#ffb347","#ffe3a0"],g:["#8a8f99","#5c606b"],far:"#6b4a6e",dec:["immeuble","immeuble","lampadaire","kiosque","case","panneau","voiture","lampadaire"]},{n:"Forêt",sky:["#2f8f6a","#8fd19a","#e6f5c8"],g:["#3e8a3a","#245c27"],far:"#1f5a2e",dec:["neem","neem","baobab","buisson","buisson","tronc","case","buisson"]},{n:"Désert",sky:["#d9531e","#f6a23a","#ffe08a"],g:["#e2b36a","#b9803a"],far:"#c98a45",dec:["acacia","rocher","termi","rocher","case","acacia","cactus","cactus"]}];
var THIN=["lampadaire","tronc","cactus","buisson","rocher","panneau","termi","voiture"];
function bi(a){return Math.floor(((G.dist||0)+(a||0))/350)%3}
function addDeco(z,side){var t=pick(BIO[bi(z)].dec);G.dec.push({r:Math.random(),s:side,x:THIN.indexOf(t)>=0?rnd(1.9,2.7):rnd(2.5,3.9),z:z,t:t})}
function farLayer(P,px){var k;X.fillStyle=P.far;
 if(bi(0)===0){for(k=0;k<10;k++){var bh=H*.05+((k*37)%5)*H*.012;X.fillRect(W*k/9-W*.05+px,HOR-bh,W*.1,bh+2)}}
 else if(bi(0)===1){for(k=0;k<14;k++){circ(W*k/12+px*.6,HOR-H*.01,H*.04+((k*13)%3)*H*.01,P.far)}}
 else{for(k=0;k<4;k++){X.beginPath();X.ellipse(W*(.1+.3*k)+px*.5,HOR+H*.01,W*.28,H*.05+((k*7)%3)*H*.012,0,Math.PI,0);X.fill()}}}
function pattern(){
 var g=G,z=ZMAX,i,lanes=[-1,0,1].sort(function(){return Math.random()-.5});
 if(Math.random()<.2){g.obs.push({t:"ban",l:0,z:z});var fl=lanes[0];for(i=0;i<6;i++)g.coins.push({l:fl,z:z-4+i*1.7})}
 else{
  var n=Math.random()<.45?2:1;
  for(i=0;i<n;i++){g.obs.push({t:pick(["sac","moto","car"]),l:lanes[i],z:z})}
  var free=lanes[n];for(i=0;i<6;i++)g.coins.push({l:free,z:z-4+i*1.7});
  if(g.obs[g.obs.length-1].t==="sac"&&Math.random()<.6){var o=g.obs[g.obs.length-1];for(i=0;i<5;i++)g.coins.push({l:o.l,z:z-2.4+i*1.2,h:.5+Math.sin(i/4*Math.PI)*.9})}
 }
}
function hurt(){
 var g=G;if(g.inv>0)return;
 g.inv=1.3;g.lives--;g.stumble=.9;g.gap+=4.5;g.shake=.3;snd(110,.25,"sawtooth",.1);
 if(g.lives<=0)over("Plus de forces !");
}
function update(dt){
 var g=G,i,o,c,d;
 g.t+=dt;
 var base=Math.min(30,13+g.level*1.4+g.dist/260);
 g.speed+=(base*(g.stumble>0?.55:1)-g.speed)*Math.min(1,dt*3);
 if(g.stumble>0)g.stumble-=dt;if(g.inv>0)g.inv-=dt;if(g.shake>0)g.shake-=dt;if(g.flash>0)g.flash-=dt;if(g.msgT>0)g.msgT-=dt;
 var mv=g.speed*dt;g.dist+=mv;var nb=bi(0);if(nb!==g.bio){g.bio=nb;if(g.dist>5){g.msg="Zone : "+BIO[nb].n;g.msgT=2.2}}
 g.laneX+=(g.lane-g.laneX)*Math.min(1,dt*14);
 if(g.y>0||g.vy!==0){g.vy-=24*dt;g.y+=g.vy*dt;if(g.y<=0){g.y=0;g.vy=0}}
 if(g.slide>0)g.slide-=dt;
 g.ph+=dt*g.speed*.55;
 /* le pollueur */
 g.gap-=dt*Math.max(.22,.5-.03*g.level);
 g.ct-=dt;if(g.ct<=0){g.cl=pick([-1,0,1]);g.ct=rnd(1,2.2)}
 g.cx+=(g.cl-g.cx)*Math.min(1,dt*6);
 g.cd-=dt;
 if(g.cd<=0){
  g.cd=rnd(2.5,4);
  if(g.gap>9){var ln=Math.round(g.cx),fr=true;for(i=0;i<g.obs.length;i++){if(g.obs[i].l===ln&&Math.abs(g.obs[i].z-g.gap)<6)fr=false}
   if(fr)g.obs.push({t:"sac",l:ln,z:g.gap})}
 }
 if(g.gap<=1.6){
  g.caught++;g.level++;g.score+=500;g.msg="Pollueur attrapé ! Amende : 5 000 F";g.msgT=2.4;g.flash=.35;
  g.gap=10+Math.min(6,g.level);g.out=0;snd(660,.12,"triangle",.08);setTimeout(function(){snd(880,.2,"triangle",.08)},120);
 }
 if(g.gap>=34){over("Il t’a échappé !");return}
 /* génération */
 g.nextSp-=mv;if(g.nextSp<=0){pattern();g.nextSp=rnd(15,24)-Math.min(5,g.level)}
 g.nd-=mv;if(g.nd<=0){addDeco(ZMAX,Math.random()<.5?-1:1);if(Math.random()<.3)addDeco(ZMAX+1,Math.random()<.5?-1:1);g.nd=rnd(2.6,4.4)}
 /* obstacles */
 for(i=g.obs.length-1;i>=0;i--){
  o=g.obs[i];o.z-=mv;if(o.t==="moto")o.z-=dt*7;if(o.t==="car")o.z-=dt*10;if((o.t==="moto"||o.t==="car")&&!o.hs&&o.z<16){o.hs=1;eng(o.t)}
  if(!o.h&&o.z<.7&&o.z>-1&&(o.t==="ban"||Math.abs(o.l-g.laneX)<.62)){
   var hit=o.t==="sac"?g.y<.62:(o.t==="ban"?g.slide<=0:true);
   if(hit){o.h=1;hurt();if(!g.run)return}
  }
  if(o.z<-3)g.obs.splice(i,1);
 }
 /* cauris */
 for(i=g.coins.length-1;i>=0;i--){
  c=g.coins[i];c.z-=mv;
  if(!c.d&&c.z<.8&&c.z>-.8&&Math.abs(c.l-g.laneX)<.65&&Math.abs((c.h||0)-g.y)<.9){
   c.d=1;g.cauris++;g.score+=10;g.gap-=.9;snd(880+Math.min(g.cauris%8,7)*40,.08,"sine",.06);
  }
  if(c.d||c.z<-2)g.coins.splice(i,1);
 }
 for(i=g.dec.length-1;i>=0;i--){d=g.dec[i];d.z-=mv;if(d.z<-3)g.dec.splice(i,1)}
}

/* ---------- dessin ---------- */
function quad(z0,z1,l0,l1,col){
 var s0=sc(z0),s1=sc(z1),y0=ys(s0),y1=ys(s1);
 X.fillStyle=col;X.beginPath();X.moveTo(xs(l0,s0),y0);X.lineTo(xs(l1,s0),y0);X.lineTo(xs(l1,s1),y1);X.lineTo(xs(l0,s1),y1);X.closePath();X.fill();
}
function star(cx,cy,r,col){
 X.fillStyle=col;X.beginPath();
 for(var i=0;i<10;i++){var a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.4:r;X.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}
 X.closePath();X.fill();
}
function circ(x,y,r,col){X.fillStyle=col;X.beginPath();X.arc(x,y,r,0,TAU);X.fill()}
function scene(){
 var g=G,k,a,b,idx,o=g.dist%8;
 var sky=X.createLinearGradient(0,0,0,HOR);var PB=BIO[bi(0)];sky.addColorStop(0,PB.sky[0]);sky.addColorStop(.6,PB.sky[1]);sky.addColorStop(1,PB.sky[2]);
 X.fillStyle=sky;X.fillRect(0,0,W,HOR+2);
 circ(W*.72,HOR-W*.05,W*.15,"rgba(252,209,22,.35)");circ(W*.72,HOR-W*.05,W*.1,"#FCD116");
 /* baobabs lointains */
 var px=-g.laneX*8;farLayer(PB,px);
 var gr=X.createLinearGradient(0,HOR,0,H);gr.addColorStop(0,PB.g[0]);gr.addColorStop(1,PB.g[1]);
 X.fillStyle=gr;X.fillRect(0,HOR,W,H-HOR);
 for(k=9;k>=0;k--){
  a=k*8-o;b=a+8;if(b<-3)continue;a=Math.max(a,-3);
  idx=Math.floor(g.dist/8)+k;
  quad(a,b,-1.5,1.5,idx%2?"#3d3b44":"#34323a");
  quad(a,b,-1.64,-1.5,idx%2?"#EF2B2D":"#009E49");
  quad(a,b,1.5,1.64,idx%2?"#EF2B2D":"#009E49");
  if(idx%2===0){quad(a+1.5,Math.min(b,a+5),-.52,-.48,"#f4efe0");quad(a+1.5,Math.min(b,a+5),.48,.52,"#f4efe0")}
 }
}
function runner(x,y,s,o,ph,duck,lift,bag,t){
 var h=1.8*UH*s,sw=Math.sin(ph),bob=Math.abs(Math.cos(ph))*h*.025,P=o.pants||"#2b1b12";
 X.fillStyle="rgba(0,0,0,.3)";X.beginPath();X.ellipse(x,y,h*.24,h*.055,0,0,TAU);X.fill();
 X.save();X.translate(x,y-lift*UH*s-bob);if(duck)X.scale(1,.55);
 X.lineCap="round";X.lineJoin="round";
 var a1=sw*h*.15,a2=-sw*h*.15,l1=Math.max(0,sw)*h*.11,l2=Math.max(0,-sw)*h*.11;
 X.lineWidth=h*.1;X.strokeStyle=P;X.beginPath();X.moveTo(-h*.07,-h*.46);X.lineTo(-h*.07+a1,-h*.07-l1);X.moveTo(h*.07,-h*.46);X.lineTo(h*.07+a2,-h*.07-l2);X.stroke();
 X.fillStyle="#f4f4f4";X.beginPath();X.ellipse(-h*.07+a1,-h*.045-l1,h*.075,h*.04,0,0,TAU);X.fill();X.beginPath();X.ellipse(h*.07+a2,-h*.045-l2,h*.075,h*.04,0,0,TAU);X.fill();
 X.fillStyle=o.c2;X.fillRect(-h*.07+a1-h*.07,-h*.02-l1,h*.14,h*.015);X.fillRect(h*.07+a2-h*.07,-h*.02-l2,h*.14,h*.015);
 X.fillStyle=o.c1;X.beginPath();X.moveTo(-h*.19,-h*.92);X.lineTo(h*.19,-h*.92);X.lineTo(h*.23,-h*.42);X.quadraticCurveTo(0,-h*.38,-h*.23,-h*.42);X.closePath();X.fill();
 X.fillStyle="rgba(0,0,0,.18)";X.beginPath();X.moveTo(0,-h*.92);X.lineTo(h*.19,-h*.92);X.lineTo(h*.23,-h*.42);X.lineTo(0,-h*.4);X.closePath();X.fill();
 X.fillStyle=o.c2;X.fillRect(-h*.2,-h*.66,h*.4,h*.05);X.fillRect(-h*.215,-h*.5,h*.43,h*.035);
 X.fillStyle=SKIN;X.fillRect(-h*.035,-h*1.0,h*.07,h*.1);
 var hx1=-h*.25-sw*h*.08,hy1=-h*.55+Math.max(0,-sw)*h*.06,hx2=h*.25+sw*h*.08,hy2=-h*.55+Math.max(0,sw)*h*.06;
 X.strokeStyle=o.c1;X.lineWidth=h*.09;X.beginPath();X.moveTo(-h*.18,-h*.88);X.lineTo(-h*.26,-h*.7);X.moveTo(h*.18,-h*.88);X.lineTo(h*.26,-h*.7);X.stroke();
 X.strokeStyle=SKIN;X.lineWidth=h*.065;X.beginPath();X.moveTo(-h*.26,-h*.7);X.lineTo(hx1,hy1);X.moveTo(h*.26,-h*.7);X.lineTo(hx2,hy2);X.stroke();
 if(bag){circ(hx2,hy2+h*.09,h*.11,"#d8d2c4");circ(hx2,hy2-h*.01,h*.045,"#b9b2a2")}
 circ(-h*.1,-h*1.0,h*.025,SKIN);circ(h*.1,-h*1.0,h*.025,SKIN);
 circ(0,-h*1.02,h*.1,SKIN);
 X.fillStyle=o.hat;X.beginPath();X.arc(0,-h*1.03,h*.108,Math.PI,0);X.fill();X.fillRect(-h*.108,-h*1.03,h*.216,h*.03);
 X.restore();
 if(bag){X.fillStyle="#EF2B2D";var by=Math.sin(t*6)*3*s,yy=y-h*1.32+by;X.beginPath();X.moveTo(x-h*.09,yy);X.lineTo(x+h*.09,yy);X.lineTo(x,yy+h*.12);X.closePath();X.fill()}
}
function obstacle(o){
 var s=sc(o.z);if(s>1.6)return;
 var x=xs(o.l,s)+(o.t==="moto"?Math.sin(G.t*9+o.z)*.07*UH*s:0),y=ys(s),U=UH*s,i;
 if(o.t==="sac"){
  X.fillStyle="rgba(0,0,0,.28)";X.beginPath();X.ellipse(x,y,.6*U,.12*U,0,0,TAU);X.fill();
  circ(x-.25*U,y-.28*U,.3*U,"#2f3a4a");circ(x+.2*U,y-.3*U,.32*U,"#e9e4d8");circ(x,y-.58*U,.28*U,"#3b5d7a");
  circ(x-.1*U,y-.4*U,.12*U,"#1c1c1c");
  for(i=0;i<3;i++)circ(x+Math.cos(G.t*7+i*2)*.55*U,y-.9*U+Math.sin(G.t*9+i*2)*.2*U,Math.max(1,.04*U),"#222");
 }else if(o.t==="moto"){
  var k=o.k||(o.k=1+Math.floor(Math.random()*3)),M=[["#c42d2d","#2a5db0"],["#1f1f1f","#d9a21b"],["#e8e8e8","#c42d2d"]][k-1];
  X.fillStyle="rgba(0,0,0,.3)";X.beginPath();X.ellipse(x,y,.55*U,.1*U,0,0,TAU);X.fill();
  X.fillStyle="#151515";X.beginPath();X.ellipse(x,y-.4*U,.1*U,.4*U,0,0,TAU);X.fill();
  X.fillStyle="#555";for(i=0;i<4;i++)X.fillRect(x-.06*U,y-.72*U+((G.t*4+i/4)%1)*.64*U,.12*U,.05*U);
  X.fillStyle=M[0];X.beginPath();X.ellipse(x,y-.8*U,.13*U,.1*U,0,0,TAU);X.fill();
  X.strokeStyle="#9a9a9a";X.lineWidth=Math.max(1,.05*U);X.beginPath();X.moveTo(x-.1*U,y-.82*U);X.lineTo(x-.14*U,y-1.25*U);X.moveTo(x+.1*U,y-.82*U);X.lineTo(x+.14*U,y-1.25*U);X.stroke();
  X.fillStyle=M[0];X.beginPath();X.moveTo(x-.3*U,y-.95*U);X.lineTo(x+.3*U,y-.95*U);X.lineTo(x+.22*U,y-1.38*U);X.lineTo(x-.22*U,y-1.38*U);X.closePath();X.fill();
  X.fillStyle="rgba(255,255,255,.25)";X.fillRect(x-.2*U,y-1.3*U,.1*U,.3*U);
  circ(x,y-1.1*U,.2*U,"rgba(255,240,170,.3)");circ(x,y-1.1*U,.12*U,"#fff8cf");
  X.fillStyle="#26344f";X.beginPath();X.ellipse(x-.34*U,y-1.1*U,.12*U,.26*U,0,0,TAU);X.fill();X.beginPath();X.ellipse(x+.34*U,y-1.1*U,.12*U,.26*U,0,0,TAU);X.fill();
  X.strokeStyle="#222";X.lineWidth=Math.max(1,.06*U);X.beginPath();X.moveTo(x-.58*U,y-1.45*U);X.lineTo(x+.58*U,y-1.45*U);X.stroke();
  circ(x-.58*U,y-1.55*U,.07*U,"#999");circ(x+.58*U,y-1.55*U,.07*U,"#999");
  X.fillStyle=M[1];X.beginPath();X.moveTo(x-.3*U,y-1.45*U);X.lineTo(x+.3*U,y-1.45*U);X.lineTo(x+.26*U,y-2.0*U);X.lineTo(x-.26*U,y-2.0*U);X.closePath();X.fill();
  X.strokeStyle=M[1];X.lineWidth=.12*U;X.beginPath();X.moveTo(x-.26*U,y-1.9*U);X.lineTo(x-.55*U,y-1.47*U);X.moveTo(x+.26*U,y-1.9*U);X.lineTo(x+.55*U,y-1.47*U);X.stroke();
  circ(x,y-2.2*U,.22*U,"#f2f2f2");X.fillStyle=M[0];X.beginPath();X.arc(x,y-2.2*U,.22*U,Math.PI*1.15,Math.PI*1.85);X.lineTo(x,y-2.2*U);X.fill();
  X.fillStyle="#111";X.beginPath();X.ellipse(x,y-2.15*U,.16*U,.085*U,0,0,TAU);X.fill();
 }else if(o.t==="car"){
  var k2=o.k||(o.k=1+Math.floor(Math.random()*4)),C=["#d9a21b","#2a5db0","#e8e8e8","#7a1f1f"][k2-1];
  X.fillStyle="rgba(0,0,0,.3)";X.beginPath();X.ellipse(x,y,.8*U,.12*U,0,0,TAU);X.fill();
  X.fillStyle="#111";X.fillRect(x-.62*U,y-.34*U,.2*U,.34*U);X.fillRect(x+.42*U,y-.34*U,.2*U,.34*U);
  X.fillStyle=C;X.beginPath();X.moveTo(x-.62*U,y-.28*U);X.lineTo(x+.62*U,y-.28*U);X.lineTo(x+.62*U,y-.78*U);X.lineTo(x+.45*U,y-.95*U);X.lineTo(x-.45*U,y-.95*U);X.lineTo(x-.62*U,y-.78*U);X.closePath();X.fill();
  X.beginPath();X.moveTo(x-.46*U,y-.95*U);X.lineTo(x-.36*U,y-1.42*U);X.lineTo(x+.36*U,y-1.42*U);X.lineTo(x+.46*U,y-.95*U);X.closePath();X.fill();
  X.fillStyle="#8fb8d8";X.beginPath();X.moveTo(x-.38*U,y-.98*U);X.lineTo(x-.3*U,y-1.36*U);X.lineTo(x+.3*U,y-1.36*U);X.lineTo(x+.38*U,y-.98*U);X.closePath();X.fill();
  X.fillStyle="rgba(255,255,255,.35)";X.beginPath();X.moveTo(x-.38*U,y-.98*U);X.lineTo(x-.3*U,y-1.36*U);X.lineTo(x-.05*U,y-1.36*U);X.lineTo(x-.2*U,y-.98*U);X.closePath();X.fill();
  X.fillStyle="#222";X.fillRect(x-.25*U,y-.6*U,.5*U,.16*U);X.fillStyle="#fff";X.fillRect(x-.14*U,y-.4*U,.28*U,.09*U);
  circ(x-.42*U,y-.62*U,.22*U,"rgba(255,240,170,.3)");circ(x+.42*U,y-.62*U,.22*U,"rgba(255,240,170,.3)");circ(x-.42*U,y-.62*U,.1*U,"#fff8cf");circ(x+.42*U,y-.62*U,.1*U,"#fff8cf");
  if(k2===1){X.fillStyle="#fff";X.fillRect(x-.14*U,y-1.54*U,.28*U,.12*U)}
 }else{
  var l=xs(-1.7,s),r=xs(1.7,s),t1=y-1.72*U,t2=y-1.1*U;
  X.strokeStyle="#5a3a1e";X.lineWidth=Math.max(2,.08*U);X.beginPath();X.moveTo(l,y);X.lineTo(l,t1);X.moveTo(r,y);X.lineTo(r,t1);X.stroke();
  X.fillStyle="#EF2B2D";X.fillRect(l,t1,r-l,(t2-t1)/2);X.fillStyle="#009E49";X.fillRect(l,t1+(t2-t1)/2,r-l,(t2-t1)/2);
  star((l+r)/2,(t1+t2)/2,.2*U,"#FCD116");
 }
}
function cauri(c){
 var s=sc(c.z);if(s>1.6)return;
 var x=xs(c.l,s),U=UH*s,y=ys(s)-(.55+(c.h||0))*U+Math.sin(G.t*5+c.z)*.05*U;
 X.fillStyle="#f5ecd2";X.strokeStyle="#b8923c";X.lineWidth=Math.max(1,.03*U);
 X.beginPath();X.ellipse(x,y,.17*U,.23*U,Math.sin(G.t*3+c.z)*.3,0,TAU);X.fill();X.stroke();
 X.strokeStyle="#8a6a22";X.beginPath();X.moveTo(x,y-.16*U);X.lineTo(x,y+.16*U);X.stroke();
 circ(x-.06*U,y-.1*U,.03*U,"#fff");
}
function deco(d){
 var s=sc(d.z);if(s>1.6)return;
 var x=xs(d.s*d.x,s),y=ys(s),U=UH*s;
 if(d.t==="buisson"){circ(x-.3*U,y-.35*U,.4*U,"#2d7a32");circ(x+.3*U,y-.38*U,.42*U,"#37913c");circ(x,y-.7*U,.4*U,"#2a6e2e")}else if(d.t==="tronc"){X.fillStyle="#6b4a2a";X.fillRect(x-.5*U,y-.35*U,U,.35*U);circ(x-.5*U,y-.17*U,.18*U,"#a67c52");circ(x+.5*U,y-.17*U,.18*U,"#a67c52")}else if(d.t==="acacia"){X.fillStyle="#5a3a1e";X.fillRect(x-.08*U,y-1.4*U,.16*U,1.4*U);X.fillStyle="#6b8a2e";X.beginPath();X.ellipse(x,y-1.65*U,1.1*U,.3*U,0,0,TAU);X.fill();X.beginPath();X.ellipse(x-.4*U,y-1.45*U,.6*U,.2*U,0,0,TAU);X.fill()}else if(d.t==="rocher"){X.fillStyle="#8a6f56";X.beginPath();X.moveTo(x-.7*U,y);X.lineTo(x-.45*U,y-.6*U);X.lineTo(x+.1*U,y-.8*U);X.lineTo(x+.6*U,y-.4*U);X.lineTo(x+.75*U,y);X.closePath();X.fill();X.fillStyle="#a38468";X.beginPath();X.moveTo(x-.45*U,y-.6*U);X.lineTo(x+.1*U,y-.8*U);X.lineTo(x+.1*U,y-.3*U);X.closePath();X.fill()}else if(d.t==="termi"){X.fillStyle="#9a5a34";X.beginPath();X.moveTo(x-.5*U,y);X.quadraticCurveTo(x-.3*U,y-1.2*U,x,y-1.5*U);X.quadraticCurveTo(x+.3*U,y-1.2*U,x+.5*U,y);X.fill()}else if(d.t==="cactus"){X.fillStyle="#3f8a4a";X.fillRect(x-.1*U,y-1.5*U,.2*U,1.5*U);X.fillRect(x-.45*U,y-1.1*U,.35*U,.14*U);X.fillRect(x-.45*U,y-1.4*U,.14*U,.4*U);X.fillRect(x+.1*U,y-.8*U,.35*U,.14*U);X.fillRect(x+.31*U,y-1.2*U,.14*U,.5*U)}else if(d.t==="panneau"){X.fillStyle="#444";X.fillRect(x-.06*U,y-1.6*U,.12*U,1.6*U);X.fillStyle="#FCD116";X.fillRect(x-.7*U,y-2.3*U,1.4*U,.8*U);X.fillStyle="#EF2B2D";X.fillRect(x-.7*U,y-2.3*U,1.4*U,.14*U);X.fillStyle="#2b1409";X.font="900 "+Math.max(6,.3*U)+"px "+FONT;X.textAlign="center";X.fillText("TÕÕLé",x,y-1.7*U)}else if(d.t==="voiture"){X.fillStyle=["#c42d2d","#2a5db0","#e0e0e0"][Math.floor(d.r*3)];X.fillRect(x-.6*U,y-.65*U,1.2*U,.5*U);X.fillStyle="#9ac4e0";X.fillRect(x-.4*U,y-1*U,.8*U,.35*U);circ(x-.4*U,y-.1*U,.17*U,"#111");circ(x+.4*U,y-.1*U,.17*U,"#111")}else if(d.t==="immeuble"){var bw=1.5*U,bh=(2.8+(Math.floor(d.r*3))*.5)*U;X.fillStyle=["#e8d3a3","#d9a77a","#cfd8c4"][Math.floor(d.r*3)];X.fillRect(x-bw/2,y-bh,bw,bh);X.fillStyle="#6b4a2a";X.fillRect(x-bw/2,y-bh,bw,.12*U);for(var r=0;r<4;r++)for(var c=0;c<3;c++){X.fillStyle=(r+c+Math.floor(d.r*9))%3?"#3b5d7a":"#FCD116";X.fillRect(x-bw/2+.18*U+c*.45*U,y-bh+.3*U+r*.6*U,.28*U,.36*U)}X.fillStyle="#3b2412";X.fillRect(x-.18*U,y-.6*U,.36*U,.6*U)}else if(d.t==="lampadaire"){X.fillStyle="#333";X.fillRect(x-.04*U,y-2.2*U,.08*U,2.2*U);circ(x,y-2.3*U,.3*U,"rgba(255,230,120,.35)");circ(x,y-2.3*U,.14*U,"#FFE08A")}else if(d.t==="baobab"){
  X.fillStyle="#7d5a3a";X.beginPath();X.moveTo(x-.55*U,y);X.quadraticCurveTo(x-.3*U,y-.9*U,x-.3*U,y-1.9*U);X.lineTo(x+.3*U,y-1.9*U);X.quadraticCurveTo(x+.3*U,y-.9*U,x+.55*U,y);X.fill();
  circ(x-.4*U,y-2.25*U,.45*U,"#4b6b2a");circ(x+.4*U,y-2.3*U,.45*U,"#4b6b2a");circ(x,y-2.5*U,.5*U,"#5a7a30");
 }else if(d.t==="neem"){
  X.fillStyle="#6b4a2a";X.fillRect(x-.12*U,y-1.2*U,.24*U,1.2*U);circ(x,y-1.7*U,.85*U,"#2f8a3a");circ(x-.5*U,y-1.4*U,.5*U,"#277a31");
 }else if(d.t==="case"){
  X.fillStyle="#c98b55";X.fillRect(x-.7*U,y-.9*U,1.4*U,.9*U);X.fillStyle="#a96e3c";X.fillRect(x-.7*U,y-.35*U,1.4*U,.08*U);
  X.fillStyle="#3b2412";X.fillRect(x-.14*U,y-.55*U,.28*U,.55*U);
  X.fillStyle="#c9a253";X.beginPath();X.moveTo(x-.95*U,y-.85*U);X.lineTo(x,y-1.75*U);X.lineTo(x+.95*U,y-.85*U);X.closePath();X.fill();
 }else{
  X.fillStyle="#5a3a1e";X.fillRect(x-.6*U,y-1.1*U,.07*U,1.1*U);X.fillRect(x+.53*U,y-1.1*U,.07*U,1.1*U);
  for(var i=0;i<6;i++){X.fillStyle=i%2?"#FCD116":"#009E49";X.fillRect(x-.65*U+i*.22*U,y-1.2*U,.22*U,.3*U)}
  X.fillStyle="#8a5a2c";X.fillRect(x-.6*U,y-.4*U,1.2*U,.12*U);circ(x-.3*U,y-.5*U,.1*U,"#EF2B2D");circ(x,y-.5*U,.1*U,"#FCD116");circ(x+.3*U,y-.5*U,.1*U,"#009E49");
 }
}
function hud(){
 var g=G,i;
 X.textAlign="center";X.fillStyle="#fff";X.strokeStyle="rgba(0,0,0,.55)";X.lineWidth=4;X.font="900 28px "+FONT;
 var sc2=fmt(g.score+g.dist*.5);X.strokeText(sc2,W/2,40);X.fillText(sc2,W/2,40);
 X.textAlign="right";X.font="800 17px "+FONT;var t=g.cauris+" cauris";X.strokeText(t,W-12,32);X.fillText(t,W-12,32);
 X.textAlign="left";
 for(i=0;i<3;i++){X.fillStyle=i<g.lives?"#EF2B2D":"rgba(255,255,255,.4)";X.font="800 22px "+FONT;X.fillText("♥",W-12-(3-i)*22,58)}
 var tx=W*.2,tw=W*.6,ty=64;
 X.fillStyle="rgba(0,0,0,.4)";X.fillRect(tx,ty,tw,8);
 var p=Math.min(1,Math.max(0,g.gap/34));X.fillStyle=g.gap>26?"#EF2B2D":"#FCD116";X.fillRect(tx,ty,tw*p,8);
 circ(tx,ty+4,8,"#009E49");circ(tx+tw*p,ty+4,8,"#ff7a1a");
 if(g.msgT>0){
  X.globalAlpha=Math.min(1,g.msgT*2);X.textAlign="center";X.font="900 20px "+FONT;
  var mw=X.measureText(g.msg).width+32;X.fillStyle="rgba(0,0,0,.6)";X.fillRect(W/2-mw/2,H*.4-26,mw,40);X.fillStyle="#FCD116";X.fillText(g.msg,W/2,H*.4+2);X.globalAlpha=1;
 }
}
function draw(){
 if(!X)return;
 var g=G,L=[],i;
 X.save();
 if(g.shake>0)X.translate(rnd(-5,5),rnd(-4,4));
 scene();
 for(i=0;i<g.dec.length;i++)(function(d){L.push({z:d.z,f:function(){deco(d)}})})(g.dec[i]);
 for(i=0;i<g.obs.length;i++)(function(o){L.push({z:o.z,f:function(){obstacle(o)}})})(g.obs[i]);
 for(i=0;i<g.coins.length;i++)(function(c){L.push({z:c.z,f:function(){cauri(c)}})})(g.coins[i]);
 L.push({z:g.gap,f:function(){var s=sc(g.gap);runner(xs(g.cx,s),ys(s),s,OUT[g.out],g.intro?(g.it<1.8?g.it*7:g.it<3.2?0:g.it*11):g.t*9,false,0,!g.nb,g.t)}});
 L.sort(function(a,b){return b.z-a.z});
 for(i=0;i<L.length;i++)L[i].f();
 if(!(g.inv>0&&Math.floor(g.t*14)%2)){runner(xs(g.laneX,1),BASE,1,ME,g.ph,g.slide>0,g.y,false,g.t)}
 if(g.intro)introDraw(g);else{if(g.run)fx(g);if(g.run||g.t>0)hud()}
 if(g.flash>0){X.fillStyle="rgba(255,255,255,"+Math.min(.6,g.flash*1.6)+")";X.fillRect(0,0,W,H)}
 X.restore();
}
function intro(){
 try{if(actx&&actx.resume)actx.resume()}catch(e){}
 PN.style.display="none";
 musStart();G={intro:1,it:0,t:0,run:false,pause:false,dist:0,laneX:0,lane:0,y:0,slide:0,ph:0,gap:10,cx:-2.4,out:0,obs:[],coins:[],dec:[],lives:3,score:0,cauris:0,caught:0,speed:13,inv:0,stumble:0,shake:0,flash:0,msg:"",msgT:0,level:1,nb:0};
 for(var z=4;z<ZMAX;z+=3){addDeco(z,-1);addDeco(z+1.5,1)}
 var sk=document.getElementById("tgSkip");
 if(!sk){sk=document.createElement("button");sk.id="tgSkip";sk.textContent="Passer ›";sk.onclick=endIntro;ROOT.appendChild(sk)}
 sk.style.display="block";
}
function endIntro(){var sk=document.getElementById("tgSkip");if(sk)sk.style.display="none";G.intro=0;start()}
function introStep(dt){
 var g=G,i;g.it+=dt;g.t+=dt;if(g.shake>0)g.shake-=dt;
 if(g.it<1.8)g.cx=-2.4+g.it/1.8*2;else if(g.it<3.2)g.cx=-.4;else g.cx+=(0-g.cx)*Math.min(1,dt*3);
 if(!g.th&&g.it>=1.8){g.th=1;g.nb=1;snd(300,.15,"triangle",.06)}
 if(!g.lg&&g.it>=2.5){g.lg=1;g.obs.push({t:"sac",l:.7,z:7});g.shake=.25;snd(120,.2,"sawtooth",.07)}
 if(g.it>3.2){var mv=dt*14*Math.min(1,(g.it-3.2)*1.5);g.dist+=mv;g.ph+=dt*8;
  for(i=0;i<g.dec.length;i++)g.dec[i].z-=mv;for(i=0;i<g.obs.length;i++)g.obs[i].z-=mv}
 if(g.it>=4.8)endIntro();
}
function introDraw(g){
 var it=g.it,s0=sc(g.gap),px=xs(g.cx,s0),py=ys(s0),sl=sc(7);
 if(it>=1.8&&it<2.5){var p=(it-1.8)/.7,sx=xs(-.4,s0)+UH*s0*.3,sy=py-UH*s0*1.2,ex=xs(.7,sl),ey=ys(sl)-UH*sl*.3;
  circ(sx+(ex-sx)*p,sy+(ey-sy)*p-Math.sin(p*Math.PI)*H*.14,UH*s0*.28,"#e9e4d8")}
 X.fillStyle="#000";X.fillRect(0,0,W,H*.09);X.fillRect(0,H*.91,W,H*.09);
 var T=it<1.8?"Un citoyen jette ses ordures dans la rue...":it<3.2?"He ! Reviens ici !":"Cours, rattrape-le !";
 X.textAlign="center";X.font="900 16px "+FONT;X.lineWidth=4;X.strokeStyle="rgba(0,0,0,.7)";X.fillStyle="#FCD116";
 X.strokeText(T,W/2,H*.91-14);X.fillText(T,W/2,H*.91-14);
 if(it>=2.5&&it<3.2){X.font="900 38px "+FONT;X.fillStyle="#EF2B2D";X.fillText("!",W/2,BASE-1.8*UH-12)}
}
function loop(ts){
 raf=requestAnimationFrame(loop);
 var dt=Math.min(.05,Math.max(0,(ts-last)/1000));last=ts;
 if(G.intro)introStep(dt);else if(G.run&&!G.pause)update(dt);else if(!G.run)G.t+=dt*.2;
 draw();
}

window.tooleGame={open:open,close:close};
if(document.body)build();else document.addEventListener("DOMContentLoaded",build);
})();
