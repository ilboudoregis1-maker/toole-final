(function(){
var M="\u2063TSX1:",EM=["😀","😍","🔥","🎉","❤️","😂","👑","🇧🇫","⭐","💯","🎵","🙏","😎","🥳","💪","✨"],
BG=["linear-gradient(160deg,#00e5ff,#00a8c8)","linear-gradient(160deg,#ffffff,#8fefff)","linear-gradient(160deg,#00a8c8,#005f73)","linear-gradient(160deg,#ffe29f,#ff9a8b)","linear-gradient(160deg,#a8edea,#fed6e3)"],
TC=["#fff","#0b2a3a","#fff","#0b2a3a","#0b2a3a"],cfg=null,S={},au=null;
function getCfg(){if(cfg)return Promise.resolve(cfg);return fetch("cloudinary-voice.js").then(function(r){return r.text()}).then(function(t){var a=t.match(/CLOUD\s*=\s*["']([^"']+)/),b=t.match(/PRESET\s*=\s*["']([^"']+)/);if(!a||!b)throw new Error("Config Cloudinary introuvable");cfg={c:a[1],p:b[1]};return cfg})}
function up(file,prog,rt){return getCfg().then(function(c){return new Promise(function(ok,ko){var x=new XMLHttpRequest(),f=new FormData();f.append("file",file);f.append("upload_preset",c.p);f.append("tags","statut");x.open("POST","https://api.cloudinary.com/v1_1/"+c.c+"/"+(rt||"video")+"/upload");x.upload.onprogress=function(e){if(e.lengthComputable)prog(Math.round(e.loaded/e.total*100))};x.onload=function(){var j={};try{j=JSON.parse(x.responseText)}catch(e){}if(j.secure_url)ok(j.secure_url);else ko(new Error((j.error&&j.error.message)||("Erreur "+x.status)))};x.onerror=function(){ko(new Error("Pas de connexion"))};x.send(f)})})}
var PK=null;function pick(acc,cb){if(window.__tpick&&window.__tpick(acc,cb))return;if(!PK){PK=document.createElement("input");PK.type="file";PK.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:.01;z-index:-1";document.body.appendChild(PK)}PK.value="";PK.accept=acc;PK.onchange=PK.oninput=function(){var f=PK.files&&PK.files[0];if(!f)return;PK.onchange=PK.oninput=null;toast("Fichier reçu : "+(f.name||"?")+" ("+Math.round(f.size/1024)+" Ko)");try{cb(f)}catch(e){toast("Erreur : "+e.message)}};var D=window.__dbg=window.__dbg||function(m){
var d=document.getElementById("__dbg");
if(!d){d=document.createElement("div");d.id="__dbg";
d.style.cssText="position:fixed;top:0;left:0;right:0;z-index:2147483647;"+
"background:rgba(0,0,0,.85);color:#0f0;font:12px monospace;padding:4px;"+
"pointer-events:none;white-space:pre-wrap";
0}
d.textContent+=m+"\n"};
D("v3 ouverture selecteur");
var t0=Date.now(),iv=setInterval(function(){
var n=PK.files?PK.files.length:0;
if(n>0&&PK.onchange){clearInterval(iv);D("detecte: "+PK.files[0].name);PK.onchange()}
else if(Date.now()-t0>90000)clearInterval(iv)},400);
window.addEventListener("focus",function(){D("retour appli");
setTimeout(function(){D("fichiers: "+(PK.files?PK.files.length:-1))},2500)},{once:true});
PK.click()}
function mmss(s){s=Math.floor(s);return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
function stk(stage,o,edit,sel){o.s=o.s||1;var el=document.createElement("div");el.textContent=o.t||o.e;
el.style.cssText="position:absolute;transform:translate(-50%,-50%);touch-action:none;line-height:1.1;white-space:nowrap;padding:2px 4px;left:"+o.x+"%;top:"+o.y+"%";
if(o.t){el.style.fontWeight="800";el.style.color="#fff";el.style.textShadow="0 0 8px #00e5ff,0 2px 6px rgba(0,0,0,.8)"}
o._fs=function(){el.style.fontSize=Math.round(stage.clientWidth*(o.t?0.07:0.16)*o.s)+"px"};o._fs();o._el=el;
if(edit){el.onpointerdown=function(ev){el.setPointerCapture(ev.pointerId);el._d=1;sel(o)};
el.onpointermove=function(ev){if(!el._d)return;var r=stage.getBoundingClientRect();o.x=Math.max(0,Math.min(100,(ev.clientX-r.left)/r.width*100));o.y=Math.max(0,Math.min(100,(ev.clientY-r.top)/r.height*100));el.style.left=o.x+"%";el.style.top=o.y+"%"};
el.onpointerup=function(){el._d=0}}
stage.appendChild(el)}
var css=document.createElement("style");
css.textContent=".tsb{flex:1;padding:11px 6px;border-radius:12px;background:#e6faff;color:#007a8c;border:1px solid rgba(0,168,200,.5);font:700 14px 'Exo 2',sans-serif}.tsb.go{background:linear-gradient(135deg,#00e5ff,#00a8c8);color:#fff;border:0;box-shadow:0 0 16px rgba(0,229,255,.5)}.tsr{width:100%;accent-color:#00a8c8}.tsp{margin:8px 14px;padding:10px;border-radius:16px;background:#f1fcff;border:1px solid rgba(0,168,200,.3);font-size:13px}.tsin{width:100%;box-sizing:border-box;border:1px solid rgba(0,168,200,.4);background:#fff;color:#0b2a3a;border-radius:12px;padding:10px;font:inherit}"
+".sx-add{background:linear-gradient(135deg,#00e5ff,#00a8c8)!important;color:#fff!important;border:0!important;border-radius:16px!important;padding:14px!important;font-weight:800!important;letter-spacing:.04em;box-shadow:0 0 18px rgba(0,229,255,.45)!important}.sx-card{background:linear-gradient(160deg,rgba(0,229,255,.08),rgba(0,168,200,.06))!important;border:1px solid rgba(0,229,255,.4)!important;border-radius:18px!important;box-shadow:0 0 14px rgba(0,229,255,.14)!important}.sx-h{color:#00a9c0!important;text-transform:uppercase;letter-spacing:.14em;font-size:12px!important;font-weight:800!important}.sx-av{box-shadow:0 0 0 3px #fff,0 0 0 5px #00e5ff,0 0 14px rgba(0,229,255,.7)!important}"
+"#tsEd *{box-sizing:border-box}#tsEd{overflow-x:hidden}#tsEd .tsb{width:auto!important;flex:1 1 0!important;min-width:0}#tsEd #tsU{flex:0 0 auto!important;min-width:108px;padding:10px 16px!important}#tsEd #tsAt{flex:0 0 auto!important;padding:10px 14px!important}#tsEd .tsin{width:auto!important;min-width:0}#tsEd #tsTx{flex:1 1 0!important}#tsEd #tsT{width:100%!important}#tsEd b{white-space:nowrap;font-size:14px!important;letter-spacing:.12em!important}#tsEd .tsp{margin:8px 14px!important;max-width:calc(100% - 28px)}"
+".tsc{display:flex;align-items:center;gap:14px;width:100%;padding:14px;border-radius:16px;border:1px solid rgba(0,168,200,.45);background:#f1fcff;color:#0b2a3a;font:700 16px 'Exo 2',sans-serif;margin-top:10px;text-align:left}.tsc i{font-style:normal;font-size:26px}.tsc small{display:block;font-weight:400;font-size:12px;opacity:.7}";
document.head.appendChild(css);
window.openComposer=function(){
var ov=document.createElement("div");ov.style.cssText="position:fixed;inset:0;z-index:99996;background:rgba(0,40,60,.45);display:flex;align-items:flex-end";
ov.onclick=function(e){if(e.target===ov)ov.remove()};
var sh=document.createElement("div");sh.style.cssText="width:100%;background:#fff;border-top:4px solid #00a8c8;border-radius:22px 22px 0 0;padding:16px 16px 26px;color:#0b2a3a";
sh.innerHTML='<div style="font:800 15px \'Exo 2\',sans-serif;letter-spacing:.14em;color:#0097a7">NOUVEAU STATUT</div><button class="tsc" id="cV"><i>🎬</i><span>Vidéo<small>30 secondes max, rognage, musique, stickers</small></span></button><button class="tsc" id="cP"><i>🖼</i><span>Photo + son<small>15 secondes avec la musique de ton téléphone</small></span></button><button class="tsc" id="cT"><i>✍️</i><span>Texte<small>Un message sur fond de couleur</small></span></button>';
ov.appendChild(sh);document.body.appendChild(ov);
sh.querySelector("#cV").onclick=function(){ov.remove();studio("video")};
sh.querySelector("#cP").onclick=function(){ov.remove();studio("photo")};
sh.querySelector("#cT").onclick=function(){ov.remove();textStatus()}};
function textStatus(){
var bi=0,ed=document.createElement("div");ed.id="tsEd";
ed.style.cssText="position:fixed;inset:0;z-index:99997;background:linear-gradient(180deg,#fff,#e6faff);color:#0b2a3a;font-family:'Exo 2',sans-serif;display:flex;flex-direction:column;padding-top:env(safe-area-inset-top,0px)";
ed.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:12px 14px"><button id="tsX" style="background:none;border:0;font-size:24px;color:#0097a7">✕</button><b style="flex:1;color:#0097a7">STATUT TEXTE</b><button id="tsU" class="tsb go">Publier</button></div><div id="tsC" style="flex:1;margin:8px 14px;border-radius:18px;overflow:hidden;background:'+BG[0]+';box-shadow:0 0 22px rgba(0,229,255,.35)"><textarea id="tsW" maxlength="280" placeholder="Écris ton statut…" style="width:100%;height:100%;background:transparent;border:0;outline:0;resize:none;text-align:center;font:800 24px \'Exo 2\',sans-serif;color:#fff;padding:18vh 18px 0"></textarea></div><div id="tsD" style="display:flex;justify-content:center;gap:14px;padding:12px"></div><div id="tsP" style="text-align:center;font-size:13px;padding-bottom:18px;color:#0097a7">0/280</div>';
document.body.appendChild(ed);
var $=function(i){return ed.querySelector("#"+i)},w=$("tsW"),c=$("tsC");
function col(i){bi=i;c.style.background=BG[i];w.style.color=TC[i];[].forEach.call($("tsD").children,function(d,k){d.style.outline=k===i?"3px solid #00a8c8":"none"})}
BG.forEach(function(g,i){var d=document.createElement("div");d.style.cssText="width:36px;height:36px;border-radius:50%;border:1px solid #bfeaf2;outline-offset:2px;background:"+g;d.onclick=function(){col(i)};$("tsD").appendChild(d)});col(0);
w.oninput=function(){$("tsP").textContent=w.value.length+"/280"};
$("tsX").onclick=function(){ed.remove()};
$("tsU").onclick=async function(){var v=w.value.trim();if(!v){toast("Écris quelque chose");return}this.disabled=true;
try{await api("/rest/v1/statuts",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({author:me(),body:v+M+JSON.stringify({k:"t",bg:bi})})});ed.remove();toast("Statut publié");loadStatuts()}catch(e){this.disabled=false;toast("Erreur d'envoi")}}}
function studio(mode){
var ph=mode==="photo";S={mode:mode,L:ph?15:30,v:null,p:null,m:null,ms:0,a:0,b:30,dur:0,st:[],sel:null};au=null;
var ed=document.createElement("div");ed.id="tsEd";
ed.style.cssText="position:fixed;inset:0;z-index:99997;background:linear-gradient(180deg,#ffffff,#e6faff);color:#0b2a3a;font-family:'Exo 2',sans-serif;display:flex;flex-direction:column;overflow-y:auto;padding-top:env(safe-area-inset-top,0px)";
ed.innerHTML='<div style="display:flex;align-items:center;gap:10px;padding:12px 14px"><button id="tsX" style="background:none;border:0;font-size:24px;color:#0097a7">✕</button><b style="flex:1;color:#0097a7">'+(ph?"PHOTO + SON":"STUDIO VIDÉO")+'</b><button id="tsU" class="tsb go" style="flex:0 0 auto;padding:10px 20px">Publier</button></div>'
+'<div id="tsS" style="position:relative;height:44vh;aspect-ratio:9/16;margin:0 auto;background:linear-gradient(160deg,#00e5ff,#e6faff);border:1px solid rgba(0,229,255,.6);box-shadow:0 0 24px rgba(0,229,255,.35);border-radius:16px;overflow:hidden;touch-action:none;flex:0 0 auto"><video id="tsV" playsinline loop muted style="width:100%;height:100%;object-fit:cover;display:none"></video><img id="tsI" style="width:100%;height:100%;object-fit:contain;background:#000;display:none"><div id="tsH" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#0097a7;font-size:14px;text-align:center;padding:12px">'+(ph?"Choisis une photo (15 s avec ton son)":"Choisis une vidéo (30 s max)")+'</div></div>'
+'<div id="tsTr" class="tsp" style="display:none"><div id="tsTl" style="margin-bottom:4px;color:#0097a7"></div>Début<input type="range" id="tsRa" class="tsr" step="0.1" value="0">Fin<input type="range" id="tsRb" class="tsr" step="0.1" value="0"></div>'
+'<div style="display:flex;gap:8px;padding:8px 14px"><button class="tsb" id="tsBv">'+(ph?"🖼 Photo":"🎬 Vidéo")+'</button><button class="tsb" id="tsBm">🎵 Musique</button><button class="tsb" id="tsBs">😀 Sticker</button></div>'
+'<div id="tsM" class="tsp" style="display:none"></div>'
+'<div id="tsK" class="tsp" style="display:none"><div id="tsE" style="display:flex;gap:10px;overflow-x:auto;font-size:30px"></div><div style="display:flex;gap:8px;margin-top:8px"><input id="tsTx" class="tsin" maxlength="40" placeholder="Texte à coller" style="flex:1;min-width:0"><button class="tsb" id="tsAt" style="flex:0 0 auto">Ajouter</button></div><div style="display:flex;gap:8px;margin-top:8px"><button class="tsb" id="tsMi">➖ Petit</button><button class="tsb" id="tsPl">➕ Grand</button><button class="tsb" id="tsDl">🗑</button></div><div style="font-size:12px;opacity:.6;margin-top:6px">Touche un sticker pour le choisir, glisse-le pour le placer.</div></div>'
+'<div style="padding:4px 14px"><input id="tsT" class="tsin" maxlength="200" placeholder="Légende (facultatif)"></div><div id="tsP" style="padding:8px 14px 24px;font-size:13px;color:#0097a7"></div>';
document.body.appendChild(ed);
var $=function(i){return ed.querySelector("#"+i)},stage=$("tsS"),vid=$("tsV"),img=$("tsI"),P=$("tsP");
function close(){if(au)au.pause();ed.remove()}
$("tsX").onclick=close;
function sel(o){S.sel=o;S.st.forEach(function(z){z._el.style.outline="none"});if(o)o._el.style.outline="2px dashed #00a8c8"}
function lab(){$("tsTl").textContent="Rognage : "+mmss(S.a)+" → "+mmss(S.b)+" ("+Math.round(S.b-S.a)+" s sur 30 max)"}
var ra=$("tsRa"),rb=$("tsRb");
function sync(){ra.value=S.a;rb.value=S.b;lab()}
ra.oninput=function(){S.a=+ra.value;if(S.a>S.b-1)S.a=Math.max(0,S.b-1);if(S.b-S.a>30)S.b=Math.min(S.dur,S.a+30);sync();vid.currentTime=S.a};
rb.oninput=function(){S.b=+rb.value;if(S.b<S.a+1)S.b=Math.min(S.dur,S.a+1);if(S.b-S.a>30)S.a=S.b-30;sync();vid.currentTime=S.a};
vid.ontimeupdate=function(){if(vid.currentTime>=S.b){vid.currentTime=S.a;if(au&&S.m){au.currentTime=S.ms;au.play()}}};
$("tsBv").onclick=function(){
if(ph){pick("image/*",function(f){S.p=f;img.onerror=function(){img.onerror=null;var r=new FileReader();r.onload=function(){img.src=r.result};r.readAsDataURL(f)};img.onload=function(){toast("Photo OK "+img.naturalWidth)};img.src=window.URL.createObjectURL(f);img.style.display="block";$("tsH").style.display="none"});return}
pick("video/*",function(f){S.v=f;vid.onerror=function(){toast("Video err "+(vid.error?vid.error.code:"?"))};vid.onloadeddata=function(){toast("Video OK "+vid.videoWidth+"x"+vid.videoHeight)};vid.src=window.URL.createObjectURL(f);vid.style.display="block";$("tsH").style.display="none";
vid.onloadedmetadata=function(){S.dur=vid.duration;S.a=0;S.b=Math.min(30,S.dur);ra.max=rb.max=S.dur;sync();$("tsTr").style.display="block";vid.currentTime=0;vid.play();if(S.dur>30)toast("Vidéo trop longue : choisis tes 30 secondes avec les curseurs")};
vid.onerror=function(){P.textContent="Cette vidéo ne peut pas être lue ici"}})};
$("tsBm").onclick=function(){pick("audio/*",function(f){S.m=f;S.ms=0;if(au)au.pause();au=new Audio(window.URL.createObjectURL(f));vid.muted=true;
au.onloadedmetadata=function(){var L=S.L,mx=Math.max(0,Math.floor(au.duration-L)),b=$("tsM");b.style.display="block";b.innerHTML='<div id="tsMn" style="color:#0097a7"></div><input type="range" id="tsMr" class="tsr" min="0" max="'+mx+'" step="1" value="0"><button class="tsb" id="tsMp" style="width:100%;margin-top:6px">▶ Écouter l\'extrait</button>';
var n=b.querySelector("#tsMn"),r=b.querySelector("#tsMr");function l2(){n.textContent="🎵 "+f.name.slice(0,26)+" · extrait de "+mmss(S.ms)+" à "+mmss(Math.min(S.ms+L,au.duration))}l2();
r.oninput=function(){S.ms=+r.value;l2();au.pause()};
b.querySelector("#tsMp").onclick=function(){if(S.v){vid.currentTime=S.a;vid.play()}au.currentTime=S.ms;au.play();clearTimeout(au._t);au._t=setTimeout(function(){au.pause()},L*1000)}}})};
$("tsBs").onclick=function(){var k=$("tsK");k.style.display=k.style.display==="none"?"block":"none"};
var E=$("tsE");EM.forEach(function(e){var b=document.createElement("span");b.textContent=e;b.onclick=function(){var o={e:e,x:50,y:50,s:1};S.st.push(o);stk(stage,o,true,sel);sel(o)};E.appendChild(b)});
$("tsAt").onclick=function(){var v=$("tsTx").value.trim();if(!v)return;var o={t:v,x:50,y:50,s:1};S.st.push(o);stk(stage,o,true,sel);sel(o);$("tsTx").value=""};
function sz(d){if(!S.sel)return toast("Touche un sticker d'abord");S.sel.s=Math.max(.4,Math.min(4,S.sel.s+d));S.sel._fs()}
$("tsMi").onclick=function(){sz(-.2)};$("tsPl").onclick=function(){sz(.2)};
$("tsDl").onclick=function(){if(!S.sel)return;S.sel._el.remove();S.st=S.st.filter(function(z){return z!==S.sel});S.sel=null};
$("tsU").onclick=async function(){var u=this,cap=$("tsT").value.trim();
if(ph&&!S.p){toast("Choisis une photo");return}if(!ph&&!S.v){toast("Choisis une vidéo");return}
u.disabled=true;if(au)au.pause();vid.pause();
try{var d={v:null,p:null,m:null,l:S.L,a:Math.round(S.a*10)/10,b:Math.round(S.b*10)/10,ms:S.ms,s:S.st.map(function(s){var r={x:Math.round(s.x),y:Math.round(s.y),s:Math.round(s.s*100)/100};if(s.t)r.t=s.t;else r.e=s.e;return r})};
if(ph)d.p=(await up(S.p,function(p){P.textContent="Envoi photo "+p+"%"},"image")).replace("/upload/","/upload/w_1080,c_limit,q_auto/");
else d.v=await up(S.v,function(p){P.textContent="Envoi vidéo "+p+"%"});
if(S.m)d.m=await up(S.m,function(p){P.textContent="Envoi musique "+p+"%"});
await api("/rest/v1/statuts",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({author:me(),body:cap+M+JSON.stringify(d)})});
close();toast("Statut publié");loadStatuts()}catch(e){u.disabled=false;P.textContent="Échec : "+(e&&e.message||"envoi impossible");toast("Erreur d'envoi")}}}
var ov=window.openViewer;
window.openViewer=function(st,mine,name){var body=st.body||"",i=body.indexOf(M);if(i<0)return ov.apply(this,arguments);
var cap=body.slice(0,i),d={};try{d=JSON.parse(body.slice(i+M.length))}catch(e){}
var a=d.a||0,b=d.b||30,ms=d.ms||0,L=d.l||30,a2=null,v=null,iv=null,dur=0,isT=d.k==="t";
var w=document.createElement("div");w.id="stv";w.style.cssText="position:fixed;inset:0;z-index:99999;background:#f4fbff;display:flex;align-items:center;justify-content:center";
var stg=document.createElement("div");stg.style.cssText="position:relative;height:100%;aspect-ratio:9/16;max-width:100%;overflow:hidden;background:"+(isT?BG[d.bg||0]:"linear-gradient(160deg,#00e5ff,#e6faff)");w.appendChild(stg);
function cl(){clearInterval(iv);if(a2)a2.pause();if(v)v.pause();w.remove()}
var msg=document.createElement("div");msg.style.cssText="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#0097a7;font:600 14px 'Exo 2',sans-serif;letter-spacing:.12em";msg.textContent="CHARGEMENT…";
var pbw=document.createElement("div");pbw.style.cssText="position:absolute;top:8px;left:10px;right:10px;height:3px;border-radius:3px;background:rgba(0,40,60,.2);z-index:3";var pb=document.createElement("div");pb.style.cssText="height:100%;width:0;border-radius:3px;background:linear-gradient(90deg,#00e5ff,#00a8c8);box-shadow:0 0 8px #00e5ff";pbw.appendChild(pb);
document.body.appendChild(w);
if(d.p){var im=document.createElement("img");im.src=d.p;im.style.cssText="width:100%;height:100%;object-fit:contain;background:#000";im.onload=function(){msg.style.display="none"};stg.appendChild(im);stg.appendChild(msg);dur=L}
else if(d.v){v=document.createElement("video");v.playsInline=true;v.autoplay=true;v.muted=!!d.m;v.style.cssText="width:100%;height:100%;object-fit:contain;background:#000";var alt=false;
v.onerror=function(){if(!alt){alt=true;v.src=d.v.replace("/upload/","/upload/f_mp4,vc_h264/")}else msg.textContent="VIDÉO INDISPONIBLE"};
v.onloadedmetadata=function(){if(a>0)v.currentTime=a};
v.onplaying=function(){msg.style.display="none"};
v.ontimeupdate=function(){var t=v.currentTime;pb.style.width=Math.min(100,Math.max(0,(t-a)/Math.max(.1,b-a)*100))+"%";if(t>=b)cl()};
v.onended=cl;v.src=d.v;stg.appendChild(v);stg.appendChild(msg)}
else dur=isT?10:8;
if(dur){var t0=Date.now();iv=setInterval(function(){if(window.__tsHold){t0+=100;return}var p=(Date.now()-t0)/1000/dur;pb.style.width=Math.min(100,p*100)+"%";if(p>=1)cl()},100)}
(d.s||[]).forEach(function(o){stk(stg,o,false)});
if(cap){var c=document.createElement("div");c.textContent=cap;var big=isT||(!d.v&&!d.p);c.style.cssText="position:absolute;left:0;right:0;"+(big?"top:50%;transform:translateY(-50%);font-size:"+(isT?"26px;font-weight:800":"24px"):"bottom:70px;font-size:17px")+";padding:12px 18px;color:"+(isT?TC[d.bg||0]:"#fff")+";"+(isT?"":"text-shadow:0 0 8px #00e5ff,0 1px 4px #000;")+"white-space:pre-wrap;text-align:center";stg.appendChild(c)}
if(d.m){a2=new Audio(d.m);w._au=a2;a2.onloadedmetadata=function(){if(ms)a2.currentTime=ms};a2.ontimeupdate=function(){if(a2.currentTime>=ms+L){a2.pause();if(!d.v&&!d.p)cl()}};a2.play().catch(function(){})}
stg.appendChild(pbw);
var top=document.createElement("div");top.style.cssText="position:absolute;top:10px;left:0;right:0;display:flex;align-items:center;gap:10px;padding:10px 14px;color:"+(isT?TC[d.bg||0]:"#fff")+";background:linear-gradient(rgba(0,40,60,.35),transparent);z-index:2";var t=document.createElement("span");t.style.flex="1";t.textContent=(name||"Statut")+" · "+sxTime(st.created_at);top.appendChild(t);
if(mine){var vb=document.createElement("button");vb.textContent="👁 Vues";vb.style.cssText="background:rgba(255,255,255,.85);color:#007a8c;border:1px solid #00e5ff;border-radius:12px;padding:6px 10px";vb.onclick=function(){if(a2)a2.pause();openViewers(st.id)};top.appendChild(vb)}
var x=document.createElement("button");x.textContent="✕";x.style.cssText="background:none;color:inherit;border:0;font-size:22px";x.onclick=cl;top.appendChild(x);stg.appendChild(top);
if(!mine){api("/rest/v1/statut_vues",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({statut_id:st.id,viewer:me()})}).catch(function(){})}};
function clean(){var b=document.getElementById("sxBox");if(!b)return;var w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT),n,a=[];while(n=w.nextNode())if(n.nodeValue.indexOf(M)>-1)a.push(n);a.forEach(function(n){var s=n.nodeValue,i=s.indexOf(M),d={};try{d=JSON.parse(s.slice(i+M.length))}catch(e){}n.nodeValue=s.slice(0,i).trim()+(d.k==="t"?"":d.p?" 🖼":" 🎬")})}
new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});
})();
