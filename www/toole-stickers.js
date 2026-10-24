(function(){
var PFX="🧷stk:";
var PACK=[["Barka","🙏","#00e5ff","#00a8c8",-6],["Bravo","👏","#ffd166","#ff9a3c",5],["MDR","😂","#ff9a8b","#ff6a88",-4],["Salut","👋","#a8edea","#5ec8d8",6],["Wesh","😎","#8ec5fc","#4a7bd0",-5],["Merci","💙","#bdeaff","#00a8c8",4],["Faso","🇧🇫","#ffe29f","#ef2b2d",-5],["Oui","✅","#b8f2c6","#3cc46a",5],["Non","❌","#ffc2c2","#e5484d",-6],["Dodo","😴","#d4c4ff","#8a6fe8",4],["Love","😍","#ffc2dd","#ff5f9e",-4],["Chaud","🔥","#ffd9a0","#ff6a00",5],["Triste","😢","#cfe8ff","#6aa6e8",-5],["OK","👌","#c9f7ff","#00bcd4",6],["Bisou","😘","#ffd1dc","#ff7aa2",-6],["À+","🚀","#d6f5ff","#1e90ff",5]];
var FV="tsstk_fav";function favGet(){try{return JSON.parse(localStorage.getItem(FV)||"[]")}catch(e){return[]}}
function favToggle(b){var L=favGet(),i=L.indexOf(b);if(i>-1)L.splice(i,1);else L.unshift(b);try{localStorage.setItem(FV,JSON.stringify(L.slice(0,200)))}catch(e){}return i<0}
window.__tfav={get:favGet,has:function(b){return favGet().indexOf(b)>-1},toggle:favToggle};
function addFavBtn(par,v){var k=v.slice(PFX.length,PFX.length+2);if(["m:","s:","u:","a:"].indexOf(k)<0||par.querySelector(".tsfav"))return;
var f=document.createElement("span");f.className="tsfav";f.textContent=window.__tfav.has(v)?"⭐":"☆";
f.onclick=function(e){e.stopPropagation();e.preventDefault();var on=favToggle(v);f.textContent=on?"⭐":"☆";if(window.toast)toast(on?"Ajouté aux favoris ⭐":"Retiré des favoris")};par.appendChild(f)}
var cache={};
function rr(x,a,b,w,h,s){x.beginPath();if(s==="c"){x.arc(a+w/2,b+h/2,w/2,0,6.2832)}else{var r=w*0.2;x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}}
function packURL(i){if(cache[i])return cache[i];var p=PACK[i];if(!p)return"";var c=document.createElement("canvas");c.width=c.height=256;var x=c.getContext("2d");
x.translate(128,128);x.rotate(p[4]*Math.PI/180);x.translate(-128,-128);
rr(x,16,16,224,224,"r");x.shadowColor="rgba(0,0,0,.25)";x.shadowBlur=8;x.fillStyle="#fff";x.fill();x.shadowBlur=0;
rr(x,24,24,208,208,"r");var g=x.createLinearGradient(0,24,0,232);g.addColorStop(0,p[2]);g.addColorStop(1,p[3]);x.fillStyle=g;x.fill();
x.textAlign="center";x.textBaseline="middle";x.font="96px sans-serif";x.fillText(p[1],128,108);
x.font="800 38px 'Exo 2',sans-serif";x.lineWidth=7;x.lineJoin="round";x.strokeStyle="#0b2a3a";x.fillStyle="#fff";x.strokeText(p[0],128,196);x.fillText(p[0],128,196);
return cache[i]=c.toDataURL("image/png")}
function imgFor(b){var s=b.slice(PFX.length);if(s.indexOf("m:")===0&&window.__tmasc)return window.__tmasc(+s.slice(2));if(s.indexOf("s:")===0&&window.__tsvg)return window.__tsvg(+s.slice(2));if(s.indexOf("p:")===0)return packURL(+s.slice(2));if(s.indexOf("u:")===0||s.indexOf("a:")===0){var u=s.slice(2);return/^https:\/\/res\.cloudinary\.com\//.test(u)?u:""}return""}
function scan(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,a=[];while(n=w.nextNode())if(n.nodeValue.indexOf(PFX)>-1)a.push(n);
a.forEach(function(n){var par=n.parentNode,v=n.nodeValue.trim();
if(par&&par.classList&&par.classList.contains("m")&&v.indexOf(PFX)===0){var u=imgFor(v);if(!u){n.nodeValue="🧷 Sticker";return}var im=document.createElement("img");im.src=u;im.className="tsimg"+(v.indexOf(PFX+"p:")===0?" tsan"+(parseInt(v.slice(PFX.length+2),10)%4):v.indexOf(PFX+"a:")===0?" tsa":"");par.classList.add("tsstk");par.replaceChild(im,n);addFavBtn(par,v)}
else if(!(par&&par.classList&&par.classList.contains("m")))n.nodeValue=n.nodeValue.replace(/🧷stk:\S*/g,"🧷 Sticker")})}
var st=document.createElement("style");
st.textContent=".tsimg{display:block;width:140px;height:140px;object-fit:contain}#scrChat .m.tsstk,#scrGroup .m.tsstk,#scrChat .m.me.tsstk,#scrGroup .m.me.tsstk{background:none!important;border:0!important;box-shadow:none!important;padding:2px!important;max-width:none!important}.m.tsstk .t{color:#5a7a85!important}.tsstkbtn{flex:0 0 auto;width:38px;height:38px;border-radius:50%;border:1px solid rgba(0,168,200,.4);background:#f1fcff;font-size:20px;padding:0}.tsstab{flex:1;padding:9px 4px;border-radius:12px;background:#e6faff;color:#007a8c;border:1px solid rgba(0,168,200,.4);font:700 12px 'Exo 2',sans-serif}.tsstab.on{background:linear-gradient(135deg,#00e5ff,#00a8c8);color:#fff;border:0}";
st.textContent+="@keyframes tsb{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes tsw{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}@keyframes tsp{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}@keyframes tss{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.tsan0{animation:tsb 1.4s ease-in-out infinite}.tsan1{animation:tsw 1.2s ease-in-out infinite}.tsan2{animation:tsp 1.1s ease-in-out infinite}.tsan3{animation:tss .6s ease-in-out infinite}.tsa{border-radius:22px;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.25)}";st.textContent+=".m.tsstk{position:relative}.tsfav{position:absolute;top:4px;right:4px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.92);box-shadow:0 1px 4px rgba(0,0,0,.25);font-size:15px;line-height:26px;text-align:center;color:#007a8c;cursor:pointer}";document.head.appendChild(st);
var LS="tsstk_mine",RC="tsstk_rec",PK=null,cfg=null;
function jget(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}}
function jset(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function pick(acc,cb){if(!PK){PK=document.createElement("input");PK.type="file";PK.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:.01;z-index:-1";document.body.appendChild(PK)}PK.value="";PK.accept=acc;PK.onchange=function(){var f=PK.files&&PK.files[0];if(f){PK.onchange=null;cb(f)}};PK.click()}
function getCfg(){if(cfg)return Promise.resolve(cfg);return fetch("cloudinary-voice.js").then(function(r){return r.text()}).then(function(t){var a=t.match(/CLOUD\s*=\s*["']([^"']+)/),b=t.match(/PRESET\s*=\s*["']([^"']+)/);if(!a||!b)throw new Error("Config Cloudinary introuvable");cfg={c:a[1],p:b[1]};return cfg})}
function upImg(blob,prog){return getCfg().then(function(c){return new Promise(function(ok,ko){var x=new XMLHttpRequest(),f=new FormData();f.append("file",blob,"sticker.webp");f.append("upload_preset",c.p);f.append("tags","sticker");x.open("POST","https://api.cloudinary.com/v1_1/"+c.c+"/image/upload");x.upload.onprogress=function(e){if(e.lengthComputable)prog(Math.round(e.loaded/e.total*100))};x.onload=function(){var j={};try{j=JSON.parse(x.responseText)}catch(e){}if(j.secure_url)ok(j.secure_url);else ko(new Error((j.error&&j.error.message)||("Erreur "+x.status)))};x.onerror=function(){ko(new Error("Pas de connexion"))};x.send(f)})})}
function target(){var g=document.getElementById("scrGroup"),c=document.getElementById("scrChat");if(g&&!g.classList.contains("hide"))return g;if(c&&!c.classList.contains("hide"))return c;return null}
function sendStk(b){var s=target();if(!s){toast("Ouvre une discussion");return}var inp=s.querySelector(".bar input:not([type=file])"),btn=s.querySelector("#send,#gSend,.bar .send");if(!inp||!btn){toast("Envoi impossible");return}
var d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value"),old=inp.value;d.set.call(inp,b);inp.dispatchEvent(new Event("input",{bubbles:true}));btn.click();
setTimeout(function(){if(d.get.call(inp)===b)d.set.call(inp,old)},400);
var r=jget(RC).filter(function(x){return x!==b});r.unshift(b);jset(RC,r.slice(0,12))}
function tray(t0){if(window.__tray3){window.__tray3(t0);return}
var CS=[["🕘 Récents","rec"],["⭐ Mes stickers","mine"],["🐾 Mascotte","mas"],
["👋 Salutations","0-2,8,9,16-20,118,128-135,265-268"],
["🙏 Merci","3,4,119,127,142-147"],
["👏 Bravo","5,7,21,31,34,108-111,123,126,148-156,277,278"],
["✅ Réponses","10-13,92-95,124,125,210-231,279,280"],
["😂 Rire & joie","6,30,104-107,120-122,241-243"],
["❤️ Amour","40-46,168-174"],
["👨‍👩‍👧 Famille & amis","157-167"],
["💪 Courage","38,39,136,137,233-236,238-240"],
["😢 Tristesse & colère","47-55,232,237"],
["😮 Surprise","56-63,112-114,244"],
["😴 Repos & santé","14,15,64-66,115,269,270"],
["☀️ Météo","67-71,271-274"],
["🎉 Fêtes","22,23,75,117,138-141,194-202,275,276"],
["🎵 Musique & danse","72-74,76,116,250-253"],
["⚽ Sport & Faso","24,25,35-37,203-209"],
["🍽 Nourriture","26-29,254-257"],
["💼 Travail & études","83-91,175-193"],
["📱 Messages & appels","77-82,258-264"],
["⏳ Action & attente","96-103,281"],
["😎 Style","32,33,86,245-249"]];
var N=window.__tsvg_n||0,used={},LB=window.__tsvg_lab||null;
function ids(s){var o=[];s.split(",").forEach(function(p){var a=p.split("-"),x=+a[0],y=a.length>1?+a[1]:x;for(var i=x;i<=y;i++)if(i<N&&!used[i]){used[i]=1;o.push(i)}});return o}
CS.forEach(function(c){if(/^\d/.test(c[1]))c[1]=ids(c[1])});
var rest=[];for(var i=0;i<N;i++)if(!used[i])rest.push(i);
if(rest.length)CS.push(["✨ Autres",rest]);
var ov=document.createElement("div");ov.style.cssText="position:fixed;inset:0;z-index:99996;background:rgba(0,40,60,.45);display:flex;align-items:flex-end";
function close(){ov.remove()}ov.onclick=function(e){if(e.target===ov)close()};
var sh=document.createElement("div");sh.style.cssText="width:100%;height:86vh;display:flex;flex-direction:column;background:#fff;border-top:4px solid #00a8c8;border-radius:22px 22px 0 0;padding:12px 12px calc(14px + env(safe-area-inset-bottom,0px));box-sizing:border-box;color:#0b2a3a;font-family:'Exo 2',sans-serif";
var hd=document.createElement("div");hd.style.cssText="display:flex;gap:8px;margin-bottom:8px;flex:0 0 auto";
var q=document.createElement("input");q.placeholder="🔍 Rechercher un sticker…";q.style.cssText="flex:1;min-width:0;box-sizing:border-box;border:1px solid rgba(0,168,200,.45);border-radius:12px;padding:9px 12px;font:inherit;color:#0b2a3a;background:#f1fcff";
if(!LB)q.style.display="none";
var xb=document.createElement("button");xb.textContent="✕";xb.style.cssText="flex:0 0 auto;width:42px;border-radius:12px;border:1px solid rgba(0,168,200,.4);background:#fff;color:#007a8c;font-size:18px";xb.onclick=close;
hd.appendChild(q);hd.appendChild(xb);
var nav=document.createElement("div");nav.style.cssText="display:flex;gap:6px;overflow-x:auto;padding-bottom:8px;flex:0 0 auto;scrollbar-width:none";
var grid=document.createElement("div");grid.style.cssText="flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-content:start;grid-auto-rows:max-content;padding-bottom:20px";
var cur=0;
CS.forEach(function(c,i){var b=document.createElement("button");b.textContent=c[0];b.className="tsstab";b.style.cssText="flex:0 0 auto;padding:8px 14px;white-space:nowrap";b.onclick=function(){show(i)};nav.appendChild(b)});
function tile(b,mi){var u=imgFor(b);if(!u)return;var d=document.createElement("button");d.style.cssText="background:#f1fcff;border:1px solid rgba(0,168,200,.25);border-radius:16px;padding:4px;display:block";
var im=document.createElement("img");im.src=u;im.loading="lazy";im.style.cssText="display:block;width:100%;height:auto;aspect-ratio:200/216;object-fit:contain";if(b.indexOf(PFX+"p:")===0)im.className="tsan"+(parseInt(b.slice(PFX.length+2),10)%4);d.appendChild(im);var tm=null,lp=false;
if(mi>=0){d.onpointerdown=function(){lp=false;tm=setTimeout(function(){lp=true;if(confirm("Supprimer ce sticker ?")){var L=jget(LS);L.splice(mi,1);jset(LS,L);show(1)}},700)};d.onpointerup=d.onpointerleave=function(){clearTimeout(tm)}}
d.onclick=function(){if(lp)return;close();sendStk(b)};grid.appendChild(d)}
function show(i){cur=i;try{localStorage.setItem("tsstk_cat",i)}catch(e){}
[].forEach.call(nav.children,function(b,k){b.className="tsstab"+(k===i?" on":"")});
var on=nav.children[i];if(on&&on.scrollIntoView)on.scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});
grid.innerHTML="";grid.scrollTop=0;q.value="";var k=CS[i][1];
if(k==="rec"){var r=jget(RC);if(!r.length)grid.textContent="Aucun sticker récent";r.forEach(function(b){tile(b,-1)})}
else if(k==="mine"){var c=document.createElement("button");c.textContent="➕ Créer";c.style.cssText="aspect-ratio:1;border:2px dashed #00a8c8;border-radius:14px;background:#fff;color:#0097a7;font:700 14px 'Exo 2',sans-serif";c.onclick=function(){close();creator()};grid.appendChild(c);var c2=document.createElement("button");c2.textContent="🎞 Animé";c2.style.cssText=c.style.cssText;c2.onclick=function(){close();creatorAnim()};grid.appendChild(c2);jget(LS).forEach(function(u,j){tile(PFX+(u.indexOf("a|")===0?"a:"+u.slice(2):"u:"+u),j)})}
else if(k==="mas"){for(var m=0;m<(window.__tmasc_n||0);m++)tile(PFX+"m:"+m,-1)}
else k.forEach(function(z){tile(PFX+"s:"+z,-1)})}
function nz(s){return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
q.oninput=function(){var v=nz(q.value.trim());if(!v){show(cur);return}grid.innerHTML="";var n=0;for(var z=0;z<N;z++)if(nz(LB[z]).indexOf(v)>-1){tile(PFX+"s:"+z,-1);n++}if(!n)grid.textContent="Aucun résultat";grid.scrollTop=0};
var sx=0,sy=0;grid.addEventListener("touchstart",function(e){var t=e.touches[0];sx=t.clientX;sy=t.clientY},{passive:true});
grid.addEventListener("touchend",function(e){if(q.value)return;var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*2){var n=cur+(dx<0?1:-1);if(n>=0&&n<CS.length)show(n)}},{passive:true});
sh.appendChild(hd);sh.appendChild(nav);sh.appendChild(grid);ov.appendChild(sh);document.body.appendChild(ov);
var sv=parseInt(localStorage.getItem("tsstk_cat"),10);
show(t0===0?0:t0===2?1:(sv>=0&&sv<CS.length?sv:3))}
function draw(c,im,z,ox,oy,shp,txt){var s=c.width,x=c.getContext("2d");x.clearRect(0,0,s,s);var m=20,w=s-2*m,i=w-24;
x.save();rr(x,m,m,w,w,shp);x.shadowColor="rgba(0,0,0,.3)";x.shadowBlur=14;x.fillStyle="#fff";x.fill();x.restore();
x.save();rr(x,m+12,m+12,i,i,shp);x.clip();
if(im){var sc=i/Math.min(im.width,im.height)*z,dw=im.width*sc,dh=im.height*sc,mx=(dw-i)/2,my=(dh-i)/2;ox=Math.max(-mx,Math.min(mx,ox));oy=Math.max(-my,Math.min(my,oy));x.drawImage(im,m+12+(i-dw)/2+ox,m+12+(i-dh)/2+oy,dw,dh)}else{x.fillStyle="#c9f7ff";x.fillRect(0,0,s,s)}
x.restore();
if(txt){x.textAlign="center";x.textBaseline="middle";x.font="800 54px 'Exo 2',sans-serif";x.lineWidth=10;x.lineJoin="round";x.strokeStyle="#0b2a3a";x.fillStyle="#fff";x.strokeText(txt,s/2,s-m-50);x.fillText(txt,s/2,s-m-50)}
return[ox,oy]}
function creator(){
var im=null,z=1,ox=0,oy=0,shp="r",ed=document.createElement("div");
ed.style.cssText="position:fixed;inset:0;z-index:99997;background:linear-gradient(180deg,#fff,#e6faff);color:#0b2a3a;font-family:'Exo 2',sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding-top:env(safe-area-inset-top,0px)";
ed.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:12px 14px"><button id="kX" style="background:none;border:0;font-size:24px;color:#0097a7">✕</button><b style="flex:1;color:#0097a7;letter-spacing:.12em;font-size:14px">CRÉER UN STICKER</b><button id="kU" class="tsstab on" style="flex:0 0 auto;padding:10px 18px">Ajouter</button></div><canvas id="kC" width="512" height="512" style="width:280px;height:280px;margin:6px auto;display:block;background:repeating-conic-gradient(#e6faff 0 25%,#fff 0 50%) 0 0/20px 20px;border-radius:16px;touch-action:none"></canvas><div style="padding:6px 16px;font-size:13px;color:#0097a7;text-align:center">Glisse la photo pour la cadrer</div><div style="display:flex;gap:8px;padding:6px 16px"><button class="tsstab" id="kP">🖼 Photo</button><button class="tsstab on" id="kR">▢ Carré</button><button class="tsstab" id="kO">⬤ Cercle</button></div><div style="padding:6px 16px">Zoom<input type="range" id="kZ" min="1" max="3" step="0.05" value="1" style="width:100%;accent-color:#00a8c8"></div><div style="padding:6px 16px"><input id="kT" maxlength="16" placeholder="Texte (facultatif)" style="width:100%;box-sizing:border-box;border:1px solid rgba(0,168,200,.45);background:#fff;color:#0b2a3a;border-radius:12px;padding:10px;font:inherit"></div><div id="kS" style="padding:8px 16px 24px;font-size:13px;color:#0097a7;text-align:center"></div>';
document.body.appendChild(ed);
var $=function(i){return ed.querySelector("#"+i)},cv=$("kC"),dr=null;
function redraw(){var r=draw(cv,im,z,ox,oy,shp,$("kT").value.trim());ox=r[0];oy=r[1]}redraw();
cv.onpointerdown=function(e){cv.setPointerCapture(e.pointerId);dr=[e.clientX,e.clientY]};
cv.onpointermove=function(e){if(!dr)return;var k=512/cv.getBoundingClientRect().width;ox+=(e.clientX-dr[0])*k;oy+=(e.clientY-dr[1])*k;dr=[e.clientX,e.clientY];redraw()};
cv.onpointerup=function(){dr=null};
$("kX").onclick=function(){ed.remove()};
$("kZ").oninput=function(){z=+this.value;redraw()};$("kT").oninput=redraw;
$("kR").onclick=function(){shp="r";$("kR").className="tsstab on";$("kO").className="tsstab";redraw()};
$("kO").onclick=function(){shp="c";$("kO").className="tsstab on";$("kR").className="tsstab";redraw()};
$("kP").onclick=function(){pick("image/*",function(f){var u=window.URL.createObjectURL(f),i=new Image();i.onload=function(){im=i;ox=oy=0;z=1;$("kZ").value=1;redraw()};i.onerror=function(){$("kS").textContent="Photo illisible"};i.src=u})};
$("kU").onclick=function(){if(!im){toast("Choisis une photo");return}var b=this;b.disabled=true;$("kS").textContent="Envoi…";
cv.toBlob(function(bl){upImg(bl,function(p){$("kS").textContent="Envoi "+p+"%"}).then(function(u){var L=jget(LS);L.unshift(u);jset(LS,L.slice(0,60));ed.remove();toast("Sticker ajouté");tray(2)}).catch(function(e){b.disabled=false;$("kS").textContent="Échec : "+e.message})},"image/webp",.9)}}
function upVid(f,prog){return getCfg().then(function(c){return new Promise(function(ok,ko){var x=new XMLHttpRequest(),fd=new FormData();fd.append("file",f);fd.append("upload_preset",c.p);fd.append("tags","sticker_anim");x.open("POST","https://api.cloudinary.com/v1_1/"+c.c+"/video/upload");x.upload.onprogress=function(e){if(e.lengthComputable)prog(Math.round(e.loaded/e.total*100))};x.onload=function(){var j={};try{j=JSON.parse(x.responseText)}catch(e){}if(j.secure_url)ok(j.secure_url);else ko(new Error((j.error&&j.error.message)||("Erreur "+x.status)))};x.onerror=function(){ko(new Error("Pas de connexion"))};x.send(fd)})})}
function creatorAnim(){
var f=null,st0=0,ed=document.createElement("div");
ed.style.cssText="position:fixed;inset:0;z-index:99997;background:linear-gradient(180deg,#fff,#e6faff);color:#0b2a3a;font-family:'Exo 2',sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding-top:env(safe-area-inset-top,0px)";
ed.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:12px 14px"><button id="aX" style="background:none;border:0;font-size:24px;color:#0097a7">✕</button><b style="flex:1;color:#0097a7;letter-spacing:.12em;font-size:14px">STICKER ANIMÉ</b><button id="aU" class="tsstab on" style="flex:0 0 auto;padding:10px 18px">Ajouter</button></div><div style="width:280px;height:280px;margin:6px auto;border-radius:22px;overflow:hidden;border:3px solid #fff;box-shadow:0 0 18px rgba(0,229,255,.4);background:#c9f7ff;position:relative"><video id="aV" playsinline muted loop autoplay style="width:100%;height:100%;object-fit:cover;display:none"></video><img id="aI" style="width:100%;height:100%;object-fit:cover;display:none"><div id="aH" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#0097a7;font-size:14px;text-align:center;padding:12px">Choisis une vidéo ou un GIF</div></div><div style="padding:6px 16px"><button class="tsstab" id="aP" style="width:100%">🎞 Vidéo ou GIF</button></div><div id="aW" style="padding:6px 16px;display:none">Début de l\'extrait (3 s)<input type="range" id="aR" min="0" max="0" step="0.1" value="0" style="width:100%;accent-color:#00a8c8"></div><div id="aS" style="padding:8px 16px 24px;font-size:13px;color:#0097a7;text-align:center">Un sticker animé dure 3 secondes maximum.</div>';
document.body.appendChild(ed);
var $=function(i){return ed.querySelector("#"+i)};
$("aX").onclick=function(){ed.remove()};
$("aP").onclick=function(){pick("video/*,image/gif",function(file){if(file.size>25*1024*1024){toast("Fichier trop lourd (25 Mo max)");return}f=file;st0=0;var isG=/gif/i.test(file.type)||/\.gif$/i.test(file.name),u=window.URL.createObjectURL(file);$("aH").style.display="none";
if(isG){var im=$("aI");im.src=u;im.style.display="block";$("aV").style.display="none";$("aW").style.display="none"}
else{var v=$("aV");v.src=u;v.style.display="block";$("aI").style.display="none";v.onloadedmetadata=function(){var mx=Math.max(0,v.duration-3);$("aR").max=mx;$("aR").value=0;$("aW").style.display=mx>0?"block":"none";v.currentTime=0;v.play()};v.ontimeupdate=function(){if(v.currentTime>=st0+3)v.currentTime=st0}}})};
$("aR").oninput=function(){st0=+this.value;var v=$("aV");v.currentTime=st0};
$("aU").onclick=function(){if(!f){toast("Choisis une vidéo ou un GIF");return}var b=this;b.disabled=true;$("aS").textContent="Envoi…";
upVid(f,function(p){$("aS").textContent="Envoi "+p+"%"}).then(function(u){var url=u.replace("/video/upload/","/video/upload/so_"+st0.toFixed(1)+",eo_"+(st0+3).toFixed(1)+"/c_fill,w_256,h_256/e_loop/fl_animated,fl_awebp/").replace(/\.\w+$/,".webp");var L=jget(LS);L.unshift("a|"+url);jset(LS,L.slice(0,60));ed.remove();toast("Sticker animé ajouté");tray(2)}).catch(function(e){b.disabled=false;$("aS").textContent="Échec : "+e.message})}}
function addBtn(){["scrChat","scrGroup"].forEach(function(id){var s=document.getElementById(id);if(!s)return;var bar=s.querySelector(".bar");if(!bar||bar.querySelector(".tsstkbtn"))return;
var b=document.createElement("button");b.type="button";b.className="tsstkbtn";b.textContent="🧷";b.setAttribute("aria-label","Envoyer un sticker");b.onclick=function(){tray(1)};
bar.insertBefore(b,bar.querySelector(".rec")||bar.querySelector("#send,#gSend")||null)})}
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n);else if(n.nodeType===3&&n.nodeValue.indexOf(PFX)>-1&&n.parentNode)scan(n.parentNode)})});addBtn()}).observe(document.body,{childList:true,subtree:true});
scan(document.body);addBtn();window.__tstk={send:sendStk,tray:tray,creator:creator,creatorAnim:creatorAnim};
})();
