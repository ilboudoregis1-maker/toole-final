import sys
f="toole-game.js"
s=open(f,encoding="utf-8").read()
if "tgIc" not in s:
    print("Applique d'abord les etapes 1 a 5"); sys.exit(1)
if "function musTick" in s:
    print("deja applique"); sys.exit()
def rep(a,b):
    global s
    if s.count(a)<1:
        print("INTROUVABLE:",a[:60]); sys.exit(1)
    s=s.replace(a,b)
rep('G.dec.push({s:side,x:','G.dec.push({r:Math.random(),s:side,x:')
rep('Math.floor(d.z*7)%3','Math.floor(d.r*3)')
rep('Math.floor(d.z))%3','Math.floor(d.r*9))%3')
rep('Math.floor(d.z*5)%3','Math.floor(d.r*3)')
rep('if(Math.random()<.7)addDeco(ZMAX+1,Math.random()<.5?-1:1);g.nd=rnd(1.8,3.6)}','if(Math.random()<.3)addDeco(ZMAX+1,Math.random()<.5?-1:1);g.nd=rnd(2.6,4.4)}')
rep('g.out=(g.out+1)%OUT.length','g.out=0')
rep('t:Math.random()<.5?"sac":"moto",l:lanes[i]','t:pick(["sac","moto","car"]),l:lanes[i]')
rep('var hit=o.t==="sac"?g.y<.62:(o.t==="moto"?true:g.slide<=0);','var hit=o.t==="sac"?g.y<.62:(o.t==="ban"?g.slide<=0:true);')
rep('if(o.t==="moto")o.z-=dt*7;','if(o.t==="moto")o.z-=dt*7;if(o.t==="car")o.z-=dt*10;if((o.t==="moto"||o.t==="car")&&!o.hs&&o.z<16){o.hs=1;eng(o.t)}')
i=s.index("function runner("); j=s.index("function obstacle(")
RUN=r'''function runner(x,y,s,o,ph,duck,lift,bag,t){
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
'''
s=s[:i]+RUN+s[j:]
a=s.index('}else if(o.t==="moto"){'); b=s.index('}else{\n  var l=xs(-1.7,s)')
BR=r'''}else if(o.t==="moto"){
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
 '''
s=s[:a]+BR+s[b:]
AUD=r'''var MUT=false,MG=null,NB=null,mus={on:0,next:0,step:0,tm:0};
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
'''
rep('function build(){',AUD+'function build(){')
rep('function snd(f,d,t,v){try{if(!actx)return;','function snd(f,d,t,v){try{if(!actx||MUT)return;')
rep('document.getElementById("tgX").onclick=close;','document.getElementById("tgX").onclick=close;\n var sb=document.createElement("button");sb.id="tgSnd";sb.innerHTML=MUT?SOFF:SON;sb.onclick=function(){MUT=!MUT;try{localStorage.setItem("tg_mute",MUT?"1":"0")}catch(e){}sb.innerHTML=MUT?SOFF:SON;if(MUT)musStop();else if(G.run||G.intro)musStart()};ROOT.appendChild(sb);')
rep('"#tgSkip{position','"#tgSnd{position:absolute;left:58px;top:calc(8px + env(safe-area-inset-top,0px));width:42px;height:42px;border-radius:50%;border:0;background:rgba(0,0,0,.45);display:grid;place-items:center;padding:0}",\n"#tgSkip{position')
rep('document.addEventListener("visibilitychange",function(){G.pause=document.hidden});','document.addEventListener("visibilitychange",function(){G.pause=document.hidden;if(document.hidden)musStop();else if(G.run||G.intro)musStart()});')
rep('snd(440,.12,"triangle",.07);','snd(440,.12,"triangle",.07);musStart();')
rep('snd(160,.4,"sawtooth",.09);showOver(txt);','snd(160,.4,"sawtooth",.09);musStop();showOver(txt);')
rep('cancelAnimationFrame(raf);G.run=false;G.intro=0;','cancelAnimationFrame(raf);musStop();G.run=false;G.intro=0;')
rep('G={intro:1,it:0','musStart();G={intro:1,it:0')
rep('if(g.intro)introDraw(g);else if(g.run||g.t>0)hud();','if(g.intro)introDraw(g);else{if(g.run)fx(g);if(g.run||g.t>0)hud()}')
open(f,"w",encoding="utf-8").write(s)
print("OK")
