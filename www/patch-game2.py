import sys
f="toole-game.js"
s=open(f,encoding="utf-8").read()
if "tgHub" not in s:
    print("Applique d'abord l'etape 1"); sys.exit(1)
if "BIO=[" in s:
    print("deja applique"); sys.exit()
def rep(a,b):
    global s
    if s.count(a)<1:
        print("INTROUVABLE:",a[:60]); sys.exit(1)
    s=s.replace(a,b)
i=s.index("function addDeco("); j=s.index("function pattern(")
NEW=r'''var BIO=[{n:"Ville",sky:["#e8702a","#ffb347","#ffe3a0"],g:["#8a8f99","#5c606b"],far:"#6b4a6e",dec:["immeuble","immeuble","lampadaire","kiosque","case","panneau","voiture","lampadaire"]},{n:"Forêt",sky:["#2f8f6a","#8fd19a","#e6f5c8"],g:["#3e8a3a","#245c27"],far:"#1f5a2e",dec:["neem","neem","baobab","buisson","buisson","tronc","case","buisson"]},{n:"Désert",sky:["#d9531e","#f6a23a","#ffe08a"],g:["#e2b36a","#b9803a"],far:"#c98a45",dec:["acacia","rocher","termi","rocher","case","acacia","cactus","cactus"]}];
var THIN=["lampadaire","tronc","cactus","buisson","rocher","panneau","termi","voiture"];
function bi(a){return Math.floor(((G.dist||0)+(a||0))/350)%3}
function addDeco(z,side){var t=pick(BIO[bi(z)].dec);G.dec.push({s:side,x:THIN.indexOf(t)>=0?rnd(1.9,2.7):rnd(2.5,3.9),z:z,t:t})}
function farLayer(P,px){var k;X.fillStyle=P.far;
 if(bi(0)===0){for(k=0;k<10;k++){var bh=H*.05+((k*37)%5)*H*.012;X.fillRect(W*k/9-W*.05+px,HOR-bh,W*.1,bh+2)}}
 else if(bi(0)===1){for(k=0;k<14;k++){circ(W*k/12+px*.6,HOR-H*.01,H*.04+((k*13)%3)*H*.01,P.far)}}
 else{for(k=0;k<4;k++){X.beginPath();X.ellipse(W*(.1+.3*k)+px*.5,HOR+H*.01,W*.28,H*.05+((k*7)%3)*H*.012,0,Math.PI,0);X.fill()}}}
'''
s=s[:i]+NEW+s[j:]
rep('z+=6){addDeco(z,-1);addDeco(z+3,1)}','z+=3){addDeco(z,-1);addDeco(z+1.5,1)}')
rep('addDeco(ZMAX,Math.random()<.5?-1:1);g.nd=rnd(3,6)}','addDeco(ZMAX,Math.random()<.5?-1:1);if(Math.random()<.7)addDeco(ZMAX+1,Math.random()<.5?-1:1);g.nd=rnd(1.8,3.6)}')
rep('var mv=g.speed*dt;g.dist+=mv;','var mv=g.speed*dt;g.dist+=mv;var nb=bi(0);if(nb!==g.bio){g.bio=nb;if(g.dist>5){g.msg="Zone : "+BIO[nb].n;g.msgT=2.2}}')
rep('sky.addColorStop(0,"#e8702a");sky.addColorStop(.6,"#ffb347");sky.addColorStop(1,"#ffe3a0");','var PB=BIO[bi(0)];sky.addColorStop(0,PB.sky[0]);sky.addColorStop(.6,PB.sky[1]);sky.addColorStop(1,PB.sky[2]);')
a=s.index('var px=-g.laneX*8;X.fillStyle="#7a3d22";')
mark='X.beginPath();X.ellipse(bx,HOR-bh*1.05,bh*.5,bh*.28,0,0,TAU);X.fill();\n }'
b=s.index(mark,a)+len(mark)
s=s[:a]+'var px=-g.laneX*8;farLayer(PB,px);'+s[b:]
rep('gr.addColorStop(0,"#c4683a");gr.addColorStop(1,"#8f3a1f");','gr.addColorStop(0,PB.g[0]);gr.addColorStop(1,PB.g[1]);')
rep('if(d.t==="immeuble"){',r'''if(d.t==="buisson"){circ(x-.3*U,y-.35*U,.4*U,"#2d7a32");circ(x+.3*U,y-.38*U,.42*U,"#37913c");circ(x,y-.7*U,.4*U,"#2a6e2e")}else if(d.t==="tronc"){X.fillStyle="#6b4a2a";X.fillRect(x-.5*U,y-.35*U,U,.35*U);circ(x-.5*U,y-.17*U,.18*U,"#a67c52");circ(x+.5*U,y-.17*U,.18*U,"#a67c52")}else if(d.t==="acacia"){X.fillStyle="#5a3a1e";X.fillRect(x-.08*U,y-1.4*U,.16*U,1.4*U);X.fillStyle="#6b8a2e";X.beginPath();X.ellipse(x,y-1.65*U,1.1*U,.3*U,0,0,TAU);X.fill();X.beginPath();X.ellipse(x-.4*U,y-1.45*U,.6*U,.2*U,0,0,TAU);X.fill()}else if(d.t==="rocher"){X.fillStyle="#8a6f56";X.beginPath();X.moveTo(x-.7*U,y);X.lineTo(x-.45*U,y-.6*U);X.lineTo(x+.1*U,y-.8*U);X.lineTo(x+.6*U,y-.4*U);X.lineTo(x+.75*U,y);X.closePath();X.fill();X.fillStyle="#a38468";X.beginPath();X.moveTo(x-.45*U,y-.6*U);X.lineTo(x+.1*U,y-.8*U);X.lineTo(x+.1*U,y-.3*U);X.closePath();X.fill()}else if(d.t==="termi"){X.fillStyle="#9a5a34";X.beginPath();X.moveTo(x-.5*U,y);X.quadraticCurveTo(x-.3*U,y-1.2*U,x,y-1.5*U);X.quadraticCurveTo(x+.3*U,y-1.2*U,x+.5*U,y);X.fill()}else if(d.t==="cactus"){X.fillStyle="#3f8a4a";X.fillRect(x-.1*U,y-1.5*U,.2*U,1.5*U);X.fillRect(x-.45*U,y-1.1*U,.35*U,.14*U);X.fillRect(x-.45*U,y-1.4*U,.14*U,.4*U);X.fillRect(x+.1*U,y-.8*U,.35*U,.14*U);X.fillRect(x+.31*U,y-1.2*U,.14*U,.5*U)}else if(d.t==="panneau"){X.fillStyle="#444";X.fillRect(x-.06*U,y-1.6*U,.12*U,1.6*U);X.fillStyle="#FCD116";X.fillRect(x-.7*U,y-2.3*U,1.4*U,.8*U);X.fillStyle="#EF2B2D";X.fillRect(x-.7*U,y-2.3*U,1.4*U,.14*U);X.fillStyle="#2b1409";X.font="900 "+Math.max(6,.3*U)+"px "+FONT;X.textAlign="center";X.fillText("TÕÕLé",x,y-1.7*U)}else if(d.t==="voiture"){X.fillStyle=["#c42d2d","#2a5db0","#e0e0e0"][Math.floor(d.z*5)%3];X.fillRect(x-.6*U,y-.65*U,1.2*U,.5*U);X.fillStyle="#9ac4e0";X.fillRect(x-.4*U,y-1*U,.8*U,.35*U);circ(x-.4*U,y-.1*U,.17*U,"#111");circ(x+.4*U,y-.1*U,.17*U,"#111")}else if(d.t==="immeuble"){''')
rep('onclick=start;\n}\nfunction showOver(txt){','onclick=intro;\n}\nfunction showOver(txt){')
rep('cancelAnimationFrame(raf);G.run=false}','cancelAnimationFrame(raf);G.run=false;G.intro=0;var sk=document.getElementById("tgSkip");if(sk)sk.style.display="none"}')
rep('#tgHub .hi small{opacity:.9;font-weight:700}";','#tgHub .hi small{opacity:.9;font-weight:700}#tgSkip{position:absolute;right:10px;top:calc(8px + env(safe-area-inset-top,0px));height:40px;padding:0 16px;border:0;border-radius:20px;background:rgba(0,0,0,.5);color:#fff;font:800 15px "+FONT+"}";')
rep('OUT[g.out],g.t*9,false,0,true,g.t)','OUT[g.out],g.intro?(g.it<1.8?g.it*7:g.it<3.2?0:g.it*11):g.t*9,false,0,!g.nb,g.t)')
rep('if(g.run||g.t>0)hud();','if(g.intro)introDraw(g);else if(g.run||g.t>0)hud();')
rep('if(G.run&&!G.pause)update(dt);','if(G.intro)introStep(dt);else if(G.run&&!G.pause)update(dt);')
rep('\nfunction loop(ts){',r'''
function intro(){
 try{if(actx&&actx.resume)actx.resume()}catch(e){}
 PN.style.display="none";
 G={intro:1,it:0,t:0,run:false,pause:false,dist:0,laneX:0,lane:0,y:0,slide:0,ph:0,gap:10,cx:-2.4,out:0,obs:[],coins:[],dec:[],lives:3,score:0,cauris:0,caught:0,speed:13,inv:0,stumble:0,shake:0,flash:0,msg:"",msgT:0,level:1,nb:0};
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
function loop(ts){''')
open(f,"w",encoding="utf-8").write(s)
print("OK")
