/* TÕÕLé — Chasse au pollueur (Ouaga Run) : jeu hors ligne, bouton visible dans Explorer */
(function(){
"use strict";
if(window.tooleGame)return;
var ZMAX=70,K=.085,TAU=Math.PI*2,FONT='"Trebuchet MS",system-ui,sans-serif';
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
function snd(f,d,t,v){try{if(!actx)return;var o=actx.createOscillator(),g=actx.createGain(),n=actx.currentTime;o.type=t||"sine";o.frequency.value=f;g.gain.setValueAtTime(v||.06,n);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g);g.connect(actx.destination);o.start(n);o.stop(n+d)}catch(e){}}
function fmt(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g," ")}

/* ---------- interface ---------- */
var CSS="#tgBtn{display:none;position:fixed;right:14px;bottom:calc(92px + env(safe-area-inset-bottom,0px));z-index:2147482000;align-items:center;gap:6px;padding:11px 16px;border:0;border-radius:999px;background:linear-gradient(135deg,#EF2B2D 0%,#EF2B2D 45%,#009E49 55%,#009E49 100%);color:#fff;font:800 15px "+FONT+";box-shadow:0 6px 18px rgba(0,0,0,.35)}"
+"body.dc-on #tgBtn{display:flex}#tgBtn span{font-size:19px}"
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

function build(){
 var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
 var b=document.createElement("button");b.id="tgBtn";b.innerHTML="<span>🎮</span>Jouer";b.onclick=open;document.body.appendChild(b);
 ROOT=document.createElement("div");ROOT.id="tgRoot";
 ROOT.innerHTML='<canvas id="tgCv"></canvas><button id="tgX" aria-label="Quitter">✕</button><div id="tgPn"></div>';
 document.body.appendChild(ROOT);
 CV=document.getElementById("tgCv");X=CV.getContext("2d");PN=document.getElementById("tgPn");
 document.getElementById("tgX").onclick=close;
 var sx=0,sy=0,ok=false;
 CV.addEventListener("touchstart",function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY;ok=true;e.preventDefault()},{passive:false});
 CV.addEventListener("touchmove",function(e){e.preventDefault();if(!ok)return;var t=e.touches[0],dx=t.clientX-sx,dy=t.clientY-sy;
  if(Math.abs(dx)>26&&Math.abs(dx)>Math.abs(dy)){dx<0?mvL():mvR();ok=false}
  else if(Math.abs(dy)>26){dy<0?jump():slide();ok=false}},{passive:false});
 CV.addEventListener("touchend",function(){ok=false});
 document.addEventListener("keydown",function(e){if(ROOT.style.display!=="block")return;
  var k=e.key;if(k==="ArrowLeft")mvL();else if(k==="ArrowRight")mvR();else if(k==="ArrowUp"||k===" ")jump();else if(k==="ArrowDown")slide();else return;e.preventDefault()});
 document.addEventListener("visibilitychange",function(){G.pause=document.hidden});
 window.addEventListener("resize",function(){if(ROOT.style.display==="block")resize()});
}
function resize(){
 W=ROOT.clientWidth||360;H=ROOT.clientHeight||640;var d=Math.min(2,window.devicePixelRatio||1);
 CV.width=Math.round(W*d);CV.height=Math.round(H*d);X.setTransform(d,0,0,d,0,0);
 HOR=H*.3;BASE=H*.82;LW=Math.min(W*.3,H*.2);UH=LW*.5;
}
function open(){
 try{document.querySelectorAll("video").forEach(function(v){v.pause()})}catch(e){}
 ROOT.style.display="block";resize();
 try{if(!actx){var A=window.AudioContext||window.webkitAudioContext;if(A)actx=new A()}if(actx&&actx.resume)actx.resume()}catch(e){}
 G={run:false,pause:false,t:0,dist:0,lane:0,laneX:0,y:0,slide:0,ph:0,level:1,gap:15,obs:[],coins:[],dec:[],cx:0,out:0,lives:3,cauris:0,score:0,caught:0,speed:13,inv:0,stumble:0,shake:0,flash:0,msg:"",msgT:0};
 for(var z=4;z<ZMAX;z+=6){addDeco(z,-1);addDeco(z+3,1)}
 showStart();cancelAnimationFrame(raf);last=performance.now();raf=requestAnimationFrame(loop);
}
function close(){ROOT.style.display="none";cancelAnimationFrame(raf);G.run=false}
function showStart(){
 PN.style.display="flex";
 PN.innerHTML='<div class="tgc"><div class="tgf"></div><h2>Chasse au pollueur</h2><p class="tgs">Ouaga Run</p>'
 +'<p>Un citoyen vient de jeter ses ordures dans la rue. Cours, rattrape-le et fais-lui payer l’amende !</p>'
 +'<ul><li>Glisse à gauche ou à droite pour changer de voie</li><li>Glisse vers le haut pour sauter les sacs</li><li>Glisse vers le bas pour passer sous la banderole</li><li>Ramasse les cauris : chaque cauri te rapproche de lui</li></ul>'
 +'<button id="tgGo">Courir</button><p class="tgb">Record : '+fmt(best)+'</p></div>';
 document.getElementById("tgGo").onclick=start;
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
 G={run:true,pause:false,t:0,dist:0,speed:13,score:0,cauris:0,lives:3,gap:15,lane:0,laneX:0,y:0,vy:0,slide:0,inv:0,stumble:0,shake:0,flash:0,ph:0,level:1,caught:0,
  obs:[],coins:[],dec:[],nextSp:12,nd:0,cx:0,cl:0,ct:1.5,cd:3,msg:"Rattrape le pollueur !",msgT:2.2,out:0};
 for(var z=4;z<ZMAX;z+=6){addDeco(z,-1);addDeco(z+3,1)}
 snd(440,.12,"triangle",.07);
}
function over(txt){
 G.run=false;G.score=Math.round(G.score+G.dist*.5);
 if(G.score>best){best=G.score;try{localStorage.setItem("tg_best",String(best))}catch(e){}}
 snd(160,.4,"sawtooth",.09);showOver(txt);
}

/* ---------- commandes ---------- */
function mvL(){if(G.run&&G.lane>-1){G.lane--;snd(300,.05,"square",.03)}}
function mvR(){if(G.run&&G.lane<1){G.lane++;snd(300,.05,"square",.03)}}
function jump(){if(G.run&&G.y<=.01){G.vy=8.4;G.slide=0;snd(520,.1,"triangle",.05)}}
function slide(){if(G.run){G.slide=.7;if(G.y>0)G.vy=-14}}

/* ---------- logique ---------- */
function addDeco(z,side){G.dec.push({s:side,x:rnd(2.2,4),z:z,t:pick(["baobab","case","neem","neem","case","kiosque"])})}
function pattern(){
 var g=G,z=ZMAX,i,lanes=[-1,0,1].sort(function(){return Math.random()-.5});
 if(Math.random()<.2){g.obs.push({t:"ban",l:0,z:z});var fl=lanes[0];for(i=0;i<6;i++)g.coins.push({l:fl,z:z-4+i*1.7})}
 else{
  var n=Math.random()<.45?2:1;
  for(i=0;i<n;i++){g.obs.push({t:Math.random()<.5?"sac":"moto",l:lanes[i],z:z})}
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
 var mv=g.speed*dt;g.dist+=mv;
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
  g.gap=15+Math.min(8,g.level);g.out=(g.out+1)%OUT.length;snd(660,.12,"triangle",.08);setTimeout(function(){snd(880,.2,"triangle",.08)},120);
 }
 if(g.gap>=34){over("Il t’a échappé !");return}
 /* génération */
 g.nextSp-=mv;if(g.nextSp<=0){pattern();g.nextSp=rnd(15,24)-Math.min(5,g.level)}
 g.nd-=mv;if(g.nd<=0){addDeco(ZMAX,Math.random()<.5?-1:1);g.nd=rnd(3,6)}
 /* obstacles */
 for(i=g.obs.length-1;i>=0;i--){
  o=g.obs[i];o.z-=mv;
  if(!o.h&&o.z<.7&&o.z>-1&&(o.t==="ban"||Math.abs(o.l-g.laneX)<.62)){
   var hit=o.t==="sac"?g.y<.62:(o.t==="moto"?true:g.slide<=0);
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
 var sky=X.createLinearGradient(0,0,0,HOR);sky.addColorStop(0,"#e8702a");sky.addColorStop(.6,"#ffb347");sky.addColorStop(1,"#ffe3a0");
 X.fillStyle=sky;X.fillRect(0,0,W,HOR+2);
 circ(W*.72,HOR-W*.05,W*.15,"rgba(252,209,22,.35)");circ(W*.72,HOR-W*.05,W*.1,"#FCD116");
 /* baobabs lointains */
 var px=-g.laneX*8;X.fillStyle="#7a3d22";
 for(k=0;k<4;k++){
  var bx=W*(.1+.27*k)+px,bh=H*.075;
  X.beginPath();X.moveTo(bx-bh*.2,HOR+2);X.quadraticCurveTo(bx-bh*.08,HOR-bh*.6,bx-bh*.12,HOR-bh);X.lineTo(bx+bh*.12,HOR-bh);X.quadraticCurveTo(bx+bh*.08,HOR-bh*.6,bx+bh*.2,HOR+2);X.fill();
  X.beginPath();X.ellipse(bx,HOR-bh*1.05,bh*.5,bh*.28,0,0,TAU);X.fill();
 }
 var gr=X.createLinearGradient(0,HOR,0,H);gr.addColorStop(0,"#c4683a");gr.addColorStop(1,"#8f3a1f");
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
 var h=1.8*UH*s,sw=Math.sin(ph),i;
 X.fillStyle="rgba(0,0,0,.28)";X.beginPath();X.ellipse(x,y,h*.22,h*.05,0,0,TAU);X.fill();
 X.save();X.translate(x,y-lift*UH*s);if(duck)X.scale(1,.55);
 X.lineCap="round";X.lineWidth=h*.085;X.strokeStyle=o.pants||"#2b1b12";
 var f1x=-h*.07+sw*h*.14,f1y=-h*.03-Math.max(0,sw)*h*.1,f2x=h*.07-sw*h*.14,f2y=-h*.03-Math.max(0,-sw)*h*.1;
 X.beginPath();X.moveTo(-h*.07,-h*.46);X.lineTo(f1x,f1y);X.moveTo(h*.07,-h*.46);X.lineTo(f2x,f2y);X.stroke();
 circ(f1x,f1y,h*.05,"#f2f2f2");circ(f2x,f2y,h*.05,"#f2f2f2");
 X.fillStyle=o.c1;X.beginPath();X.moveTo(-h*.17,-h*.92);X.lineTo(h*.17,-h*.92);X.lineTo(h*.24,-h*.42);X.lineTo(-h*.24,-h*.42);X.closePath();X.fill();
 X.fillStyle=o.c2;X.fillRect(-h*.2,-h*.64,h*.4,h*.06);X.fillRect(-h*.22,-h*.5,h*.44,h*.04);
 X.strokeStyle=SKIN;X.lineWidth=h*.065;
 var hx1=-h*.23-sw*h*.08,hy1=-h*.55+Math.max(0,-sw)*h*.06,hx2=h*.23+sw*h*.08,hy2=-h*.55+Math.max(0,sw)*h*.06;
 X.beginPath();X.moveTo(-h*.17,-h*.88);X.lineTo(hx1,hy1);X.moveTo(h*.17,-h*.88);X.lineTo(hx2,hy2);X.stroke();
 if(bag){circ(hx2,hy2+h*.08,h*.1,"#d8d2c4");circ(hx2,hy2-h*.01,h*.04,"#b9b2a2")}
 circ(0,-h*.96,h*.095,SKIN);
 X.fillStyle=o.hat;X.beginPath();X.arc(0,-h*.97,h*.1,Math.PI,0);X.fill();
 X.restore();
 if(bag){X.fillStyle="#EF2B2D";var by=Math.sin(t*6)*3*s,yy=y-h*1.28+by;X.beginPath();X.moveTo(x-h*.09,yy);X.lineTo(x+h*.09,yy);X.lineTo(x,yy+h*.12);X.closePath();X.fill()}
}
function obstacle(o){
 var s=sc(o.z);if(s>1.6)return;
 var x=xs(o.l,s),y=ys(s),U=UH*s,i;
 if(o.t==="sac"){
  X.fillStyle="rgba(0,0,0,.28)";X.beginPath();X.ellipse(x,y,.6*U,.12*U,0,0,TAU);X.fill();
  circ(x-.25*U,y-.28*U,.3*U,"#2f3a4a");circ(x+.2*U,y-.3*U,.32*U,"#e9e4d8");circ(x,y-.58*U,.28*U,"#3b5d7a");
  circ(x-.1*U,y-.4*U,.12*U,"#1c1c1c");
  for(i=0;i<3;i++)circ(x+Math.cos(G.t*7+i*2)*.55*U,y-.9*U+Math.sin(G.t*9+i*2)*.2*U,Math.max(1,.04*U),"#222");
 }else if(o.t==="moto"){
  X.fillStyle="rgba(0,0,0,.28)";X.beginPath();X.ellipse(x,y,.5*U,.1*U,0,0,TAU);X.fill();
  X.fillStyle="#111";X.beginPath();X.ellipse(x,y-.32*U,.09*U,.32*U,0,0,TAU);X.fill();
  X.fillStyle="#c42d2d";X.fillRect(x-.2*U,y-.85*U,.4*U,.45*U);
  X.fillStyle="#FCD116";X.fillRect(x-.08*U,y-.62*U,.16*U,.07*U);
  X.fillStyle="#d9b26a";X.fillRect(x-.3*U,y-1.1*U,.6*U,.3*U);
  X.fillStyle="#2a5db0";X.fillRect(x-.22*U,y-1.62*U,.44*U,.55*U);
  X.strokeStyle="#222";X.lineWidth=Math.max(1,.05*U);X.beginPath();X.moveTo(x-.42*U,y-1.2*U);X.lineTo(x+.42*U,y-1.2*U);X.stroke();
  circ(x,y-1.78*U,.14*U,SKIN);X.fillStyle="#FCD116";X.beginPath();X.arc(x,y-1.8*U,.16*U,Math.PI,0);X.fill();
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
 if(d.t==="baobab"){
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
 L.push({z:g.gap,f:function(){var s=sc(g.gap);runner(xs(g.cx,s),ys(s),s,OUT[g.out],g.t*9,false,0,true,g.t)}});
 L.sort(function(a,b){return b.z-a.z});
 for(i=0;i<L.length;i++)L[i].f();
 if(!(g.inv>0&&Math.floor(g.t*14)%2)){runner(xs(g.laneX,1),BASE,1,ME,g.ph,g.slide>0,g.y,false,g.t)}
 if(g.run||g.t>0)hud();
 if(g.flash>0){X.fillStyle="rgba(255,255,255,"+Math.min(.6,g.flash*1.6)+")";X.fillRect(0,0,W,H)}
 X.restore();
}
function loop(ts){
 raf=requestAnimationFrame(loop);
 var dt=Math.min(.05,Math.max(0,(ts-last)/1000));last=ts;
 if(G.run&&!G.pause)update(dt);else if(!G.run)G.t+=dt*.2;
 draw();
}

window.tooleGame={open:open,close:close};
if(document.body)build();else document.addEventListener("DOMContentLoaded",build);
})();
