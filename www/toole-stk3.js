(function(){
var PFX="🧷stk:",LS="tsstk_mine";
function jget(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function nz(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g," ").replace(/[^a-z0-9ɛɔƴ\s]/g," ")}
function src(b){var s=b.slice(PFX.length),t=s.slice(0,2),v=s.slice(2);
if(t==="m:")return window.__tmasc?window.__tmasc(+v):"";
if(t==="s:")return window.__tsvg?window.__tsvg(+v):"";
if(t==="u:"||t==="a:")return/^https:\/\/res\.cloudinary\.com\//.test(v)?v:"";return""}
function items(){var a=[],N=window.__tsvg_n||0,M=window.__tmasc_n||0,E=window.__tstk_en||{},O=window.__tstk_mo||{},L=window.__tsvg_lab||[],ML=window.__tmasc_lab||[],n;
jget(LS).forEach(function(u,j){a.push({b:PFX+(u.indexOf("a|")===0?"a:"+u.slice(2):"u:"+u),k:"mes stickers my own",mi:j})});
for(var m=0;m<M;m++){n=ML[m]||"";a.push({b:PFX+"m:"+m,k:nz(n+" "+(E[n]||"")+" "+(O[n]||"")+" mascotte mascot"),mi:-1})}
for(var i=0;i<N;i++){n=L[i]||"";a.push({b:PFX+"s:"+i,k:nz(n+" "+(E[n]||"")+" "+(O[n]||"")),mi:-1})}
return a}
function open(t0){
var old=document.getElementById("tstk3");if(old)old.remove();
var all=items(),ov=document.createElement("div");ov.id="tstk3";
ov.style.cssText="position:fixed;inset:0;z-index:99996;background:rgba(0,40,60,.45);display:flex;align-items:flex-end";
function close(){ov.remove()}ov.onclick=function(e){if(e.target===ov)close()};
var sh=document.createElement("div");
sh.style.cssText="width:100%;height:86vh;display:flex;flex-direction:column;background:#fff;border-top:4px solid #00a8c8;border-radius:22px 22px 0 0;padding:12px 12px calc(14px + env(safe-area-inset-bottom,0px));box-sizing:border-box;color:#0b2a3a;font-family:'Exo 2',sans-serif";
var hd=document.createElement("div");hd.style.cssText="display:flex;gap:6px;margin-bottom:10px;flex:0 0 auto";
var q=document.createElement("input");q.type="search";q.placeholder="🔍 Rechercher / Search…";q.style.cssText="flex:1;min-width:0;box-sizing:border-box;border:1px solid rgba(0,168,200,.45);border-radius:12px;padding:9px 12px;font:inherit;color:#0b2a3a;background:#f1fcff";
function mb(t,f){var b=document.createElement("button");b.textContent=t;b.style.cssText="flex:0 0 auto;width:42px;border-radius:12px;border:1px solid rgba(0,168,200,.4);background:#fff;color:#007a8c;font-size:18px;padding:0";b.onclick=f;return b}
hd.appendChild(q);
hd.appendChild(mb("➕",function(){close();window.__tstk.creator&&window.__tstk.creator()}));
hd.appendChild(mb("🎞",function(){close();window.__tstk.creatorAnim&&window.__tstk.creatorAnim()}));
hd.appendChild(mb("✕",close));
var grid=document.createElement("div");
grid.style.cssText="flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;align-content:start;grid-auto-rows:max-content;padding-bottom:20px";
var tok=0,fav=false,F=window.__tfav||{get:function(){return[]},has:function(){return false},toggle:function(){return false}};
function tile(it){var u=src(it.b);if(!u)return;var d=document.createElement("button");
d.style.cssText="background:#f1fcff;border:1px solid rgba(0,168,200,.25);border-radius:14px;padding:3px;display:block";
var im=document.createElement("img");im.src=u;im.loading="lazy";im.style.cssText="display:block;width:100%;height:auto;aspect-ratio:200/216;object-fit:contain";d.appendChild(im);d.style.position="relative";
var st=document.createElement("span");st.style.cssText="position:absolute;top:2px;right:2px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.92);font-size:13px;line-height:22px;text-align:center;color:#007a8c";st.textContent=F.has(it.b)?"⭐":"☆";
st.onpointerdown=function(e){e.stopPropagation()};st.onclick=function(e){e.stopPropagation();e.preventDefault();var on=F.toggle(it.b);st.textContent=on?"⭐":"☆";if(fav&&!on)d.remove()};d.appendChild(st);
var tm=null,lp=false;
if(it.mi>=0){d.onpointerdown=function(){lp=false;tm=setTimeout(function(){lp=true;if(confirm("Supprimer ce sticker ?")){var L=jget(LS);L.splice(it.mi,1);jset(LS,L);open()}},700)};d.onpointerup=d.onpointerleave=function(){clearTimeout(tm)}}
d.onclick=function(){if(lp)return;close();window.__tstk.send(it.b)};grid.appendChild(d)}
function render(list){var my=++tok;grid.innerHTML="";grid.scrollTop=0;
if(!list.length){grid.style.display="block";grid.textContent="Aucun résultat / No result";return}
grid.style.display="grid";var i=0;(function step(){if(my!==tok)return;for(var n=0;n<48&&i<list.length;n++,i++)tile(list[i]);if(i<list.length)setTimeout(step,16)})()}
q.oninput=function(){if(fav){fav=false;tabsUpd()}var w=nz(q.value).split(/\s+/).filter(Boolean);
render(w.length?all.filter(function(it){return w.every(function(x){return it.k.indexOf(x)>-1})}):all)};
var tb=document.createElement("div");tb.style.cssText="display:flex;gap:6px;margin-bottom:8px;flex:0 0 auto";
function tbtn(t,f){var b=document.createElement("button");b.textContent=t;b.className="tsstab";b.style.cssText="flex:1 1 0;width:auto;min-width:0;padding:8px 10px;white-space:nowrap";b.onclick=f;tb.appendChild(b);return b}
var bAll=tbtn("Tous",function(){q.value="";setMode(false)}),bFav=tbtn("⭐ Favoris",function(){q.value="";setMode(true)});
function tabsUpd(){bAll.className="tsstab"+(fav?"":" on");bFav.className="tsstab"+(fav?" on":"")}
function setMode(f){fav=f;tabsUpd();if(f){var l=F.get().map(function(b){return{b:b,k:"",mi:-1}});if(!l.length){tok++;grid.innerHTML="";grid.style.display="block";grid.textContent="Aucun favori. Appuie sur ☆ sur un sticker pour l'ajouter.";return}render(l)}else render(all)}
sh.appendChild(hd);sh.appendChild(tb);sh.appendChild(grid);ov.appendChild(sh);document.body.appendChild(ov);setMode(t0===2)}
window.__tray3=open;
})();
