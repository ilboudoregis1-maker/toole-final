import sys
f="toole-game.js"
s=open(f,encoding="utf-8").read()
if "function tgExtra" in s:
    print("deja applique"); sys.exit()
def rep(a,b):
    global s
    if s.count(a)<1:
        print("INTROUVABLE:",a[:70]); sys.exit(1)
    s=s.replace(a,b,1)

# 1) pause auto quand l'appli passe en arriere-plan
rep('G.pause=document.hidden;if(document.hidden)musStop();else if(G.run||G.intro)musStart()',
    'if(document.hidden){if(G.run)tgPause();musStop()}else if(G.intro)musStart()')
# 2) boutons pause + menu pause
rep('document.getElementById("tgX").onclick=close;','document.getElementById("tgX").onclick=close;tgExtra();')
# 3) fin de partie : bouton Menu + banque de cauris
rep('id="tgQ">Quitter</button>','id="tgQ">Menu</button>')
rep('document.getElementById("tgQ").onclick=close;','document.getElementById("tgQ").onclick=function(){close();hub()};')
rep('snd(160,.4,"sawtooth",.09);musStop();showOver(txt);','bank(G.cauris);snd(160,.4,"sawtooth",.09);musStop();showOver(txt);')
# 4) cadeau du jour sur l'ecran d'accueil du jeu
rep('<button id="tgGo">Courir</button>','<button id="tgGo">Courir</button>\'+giftBtn()+\'')
rep('document.getElementById("tgGo").onclick=intro;','document.getElementById("tgGo").onclick=intro;giftInit();')
rep('snd(440,.12,"triangle",.07);musStart();','snd(440,.12,"triangle",.07);musStart();if(takeShield())G.inv=6;')

new=r'''
/* ---------- v5 : pause, menu, cadeau ---------- */
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,String(v))}catch(e){}return null}
function today(){return new Date().toISOString().slice(0,10)}
function bank(n){ls("tg_bank",(+ls("tg_bank")||0)+(n||0))}
function takeShield(){if(ls("tg_shield")==="1"){ls("tg_shield","0");return true}return false}
function giftBtn(){
 var b='<p class="tgb">Banque : '+fmt(+ls("tg_bank")||0)+' cauris</p>';
 if(ls("tg_gift")!==today())return '<button class="q" id="tgGf">🎁 Cadeau du jour</button>'+b;
 return '<p class="tgb">🎁 Prochain cadeau demain</p>'+b}
function giftInit(){var g=document.getElementById("tgGf");if(!g)return;
 g.onclick=function(){ls("tg_gift",today());ls("tg_shield","1");bank(25);snd(660,.15,"triangle",.07);
  showStart();var t=PN.querySelector(".tgb");if(t)t.textContent="🎁 +25 cauris et bouclier au prochain départ !"}}
function tgPause(){var z=document.getElementById("tgPz");if(z)z.click()}
function tgExtra(){
 var s=document.createElement("style");
 s.textContent="#tgPz{position:absolute;left:106px;top:calc(8px + env(safe-area-inset-top,0px));width:42px;height:42px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font:900 14px sans-serif;padding:0}#tgPm{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.6);z-index:5}#tgPm .tgc button{display:block;width:100%;margin-top:10px}";
 document.head.appendChild(s);
 var pz=document.createElement("button");pz.id="tgPz";pz.setAttribute("aria-label","Pause");pz.innerHTML="❚❚";ROOT.appendChild(pz);
 var pm=document.createElement("div");pm.id="tgPm";ROOT.appendChild(pm);
 pz.onclick=function(){
  if(!G.run||G.pause)return;G.pause=true;musStop();
  pm.innerHTML='<div class="tgc"><h2>Pause</h2><p class="tgs">Score : '+fmt(G.score+G.dist*.5)+'</p><button id="tgRs">Reprendre</button><button class="q" id="tgRe">Recommencer</button><button class="q" id="tgMn">Menu principal</button></div>';
  pm.style.display="flex";
  document.getElementById("tgRs").onclick=function(){pm.style.display="none";G.pause=false;last=performance.now();musStart()};
  document.getElementById("tgRe").onclick=function(){pm.style.display="none";start()};
  document.getElementById("tgMn").onclick=function(){pm.style.display="none";close();hub()};
 }}
'''
rep('window.tooleGame={open:open,close:close};',new+'\nwindow.tooleGame={open:open,close:close};')
open(f,"w",encoding="utf-8").write(s)
print("OK : pause, menu, cadeau ajoutes")
