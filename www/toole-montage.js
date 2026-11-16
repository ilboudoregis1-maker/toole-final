/* TÕÕLé — Montage vidéo avant envoi : rogner + filtres */
(function(){"use strict";if(window.tooleEdit)return;
var F=[["Normal",""],["N&B","grayscale(1) contrast(1.1)"],["Chaud","sepia(.3) saturate(1.5) hue-rotate(-12deg) brightness(1.05)"],["Froid","hue-rotate(18deg) saturate(1.2) brightness(1.05)"],["Vintage","sepia(.55) contrast(1.1) brightness(.95) saturate(1.2)"],["Contraste","contrast(1.4) saturate(1.3)"],["Vif","saturate(1.9) contrast(1.08)"],["Doux","brightness(1.1) contrast(.9) saturate(1.1)"]];
var MAXL=180;
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:2147483600;padding:12px;border-radius:14px;background:#0f172a;color:#fff;font:600 14px sans-serif;text-align:center";document.body.appendChild(d);setTimeout(function(){d.remove()},3500)}
function mm(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+("0"+(s%60)).slice(-2)}
var st=document.createElement("style");st.textContent="#tmEd{position:fixed;inset:0;z-index:2147483000;background:#0b1220;color:#fff;font-family:sans-serif;display:flex;flex-direction:column}"
+"#tmEd .h{display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 10px) 14px 8px}#tmEd .h b{flex:1;letter-spacing:2px;font-size:15px}#tmEd .h button{border:0;background:rgba(255,255,255,.14);color:#fff;width:38px;height:38px;border-radius:50%;font-size:18px}"
+"#tmEd .vw{flex:1;min-height:0;display:grid;place-items:center;background:#000}#tmEd video{max-width:100%;max-height:100%}"
+"#tmEd .p{padding:10px 14px calc(env(safe-area-inset-bottom,0px) + 12px);background:#111a2e}#tmEd .lb{font-size:13px;color:#9ec5ff;margin:2px 0}"
+"#tmEd input[type=range]{width:100%;accent-color:#2f9bff}#tmEd .fl{display:flex;gap:8px;overflow-x:auto;padding:8px 0}"
+"#tmEd .fl button{flex:none;border:0;border-radius:16px;padding:8px 14px;background:rgba(255,255,255,.12);color:#fff;font-weight:700;font-size:13px}#tmEd .fl button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#tmEd .ac{display:flex;gap:8px;margin-top:6px}#tmEd .ac button{flex:1;border:0;border-radius:14px;padding:12px;font-weight:800;font-size:14px;color:#fff;background:rgba(255,255,255,.14)}#tmEd .ac .go{background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#tmEd .ov{position:absolute;inset:0;background:rgba(5,10,20,.92);display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:30px;text-align:center}#tmEd .ov.on{display:flex}"
+"#tmEd .br{width:80%;height:10px;border-radius:6px;background:rgba(255,255,255,.18);overflow:hidden}#tmEd .br i{display:block;height:100%;width:0;background:linear-gradient(90deg,#06b6d4,#2563eb)}";document.head.appendChild(st);
function enc(f,a,b,filt,prog,ctl){return new Promise(function(res,rej){
var MR=window.MediaRecorder;if(!MR)return rej(new Error("mr"));
var v=document.createElement("video");v.setAttribute("playsinline","");v.preload="auto";v.src=window.URL.createObjectURL(f);
var ac=null,dst=null;
try{var AC=window.AudioContext||window.webkitAudioContext;ac=new AC();dst=ac.createMediaStreamDestination();ac.createMediaElementSource(v).connect(dst);if(ac.resume)ac.resume()}catch(e){ac=null;dst=null}
function fail(e){try{v.pause()}catch(x){}rej(e||new Error("x"))}
v.onerror=function(){fail()};
v.onloadeddata=function(){
var sc=Math.min(1,720/Math.max(v.videoWidth,v.videoHeight)),w=Math.max(2,Math.round(v.videoWidth*sc/2)*2),h=Math.max(2,Math.round(v.videoHeight*sc/2)*2);
var cv=document.createElement("canvas");cv.width=w;cv.height=h;var cx=cv.getContext("2d");
if(!cv.captureStream)return fail();
var s=cv.captureStream(30);if(dst)dst.stream.getAudioTracks().forEach(function(t){s.addTrack(t)});
var mt=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"].filter(function(m){return MR.isTypeSupported&&MR.isTypeSupported(m)})[0];
if(!mt)return fail();
var len=b-a,vb=Math.max(500000,Math.min(3500000,Math.floor(16*1048576*8*.82/len-96000)));
var rec;try{rec=new MR(s,{mimeType:mt,videoBitsPerSecond:vb,audioBitsPerSecond:96000})}catch(e){return fail(e)}
var ch=[];rec.ondataavailable=function(e){if(e.data&&e.data.size)ch.push(e.data)};
rec.onstop=function(){try{window.URL.revokeObjectURL(v.src)}catch(e){}if(ac){try{ac.close()}catch(e){}}if(ctl.abort)return rej(new Error("abort"));var bl=new Blob(ch,{type:"video/webm"});if(bl.size>0)res(bl);else rej(new Error("vide"))};
v.onseeked=function(){v.onseeked=null;rec.start(500);var p=v.play();if(p&&p.catch)p.catch(function(){});
(function d(){if(ctl.abort||v.currentTime>=b||v.ended){try{v.pause()}catch(e){}if(rec.state!=="inactive")rec.stop();return}
cx.filter=filt||"none";cx.drawImage(v,0,0,w,h);prog(Math.min(1,(v.currentTime-a)/len));requestAnimationFrame(d)})()};
v.currentTime=Math.max(.01,a)}})}
window.tooleEdit=function(f,done){
var u=window.URL.createObjectURL(f),o=E("div");o.id="tmEd";
var h=E("div","h"),x=E("button","","✕"),t=E("b","","MONTAGE");h.appendChild(x);h.appendChild(t);
var vw=E("div","vw"),v=E("video");v.setAttribute("playsinline","");v.loop=false;v.muted=false;vw.appendChild(v);
var p=E("div","p"),lb=E("div","lb"),ra=E("input"),rb=E("input"),fl=E("div","fl"),ac=E("div","ac");
ra.type=rb.type="range";ra.step=rb.step="0.1";
var sk=E("button","","Passer"),go=E("button","go","Valider");ac.appendChild(sk);ac.appendChild(go);
p.appendChild(lb);p.appendChild(E("div","lb","Début"));p.appendChild(ra);p.appendChild(E("div","lb","Fin"));p.appendChild(rb);p.appendChild(fl);p.appendChild(ac);
var ov=E("div","ov"),ot=E("div","","Montage en cours…"),br=E("div","br"),bi=E("i"),oc=E("button","","Annuler");br.appendChild(bi);oc.style.cssText="border:0;border-radius:12px;padding:10px 20px;background:rgba(255,255,255,.16);color:#fff;font-weight:700";ov.appendChild(ot);ov.appendChild(br);ov.appendChild(oc);
o.appendChild(h);o.appendChild(vw);o.appendChild(p);o.appendChild(ov);document.body.appendChild(o);
var A=0,B=0,D=0,fi=0,ctl={};
function end(r){v.pause();v.removeAttribute("src");v.load();try{window.URL.revokeObjectURL(u)}catch(e){}o.remove();done(r)}
x.onclick=function(){end(null)};sk.onclick=function(){end(f)};
function lab(){lb.textContent="Rognage : "+mm(A)+" → "+mm(B)+" ("+Math.round(B-A)+" s)"}
function sync(){ra.value=A;rb.value=B;lab()}
ra.oninput=function(){A=+ra.value;if(A>B-1)A=Math.max(0,B-1);if(B-A>MAXL)B=Math.min(D,A+MAXL);sync();v.currentTime=A};
rb.oninput=function(){B=+rb.value;if(B<A+1)B=Math.min(D,A+1);if(B-A>MAXL)A=B-MAXL;sync();v.currentTime=Math.max(A,B-1)};
v.ontimeupdate=function(){if(B&&v.currentTime>=B){v.currentTime=A;v.play().catch(function(){})}};
F.forEach(function(k,i){var b=E("button",i?"":"on",k[0]);b.onclick=function(){fi=i;fl.querySelectorAll("button").forEach(function(y){y.className=""});b.className="on";v.style.filter=k[1]||"none"};fl.appendChild(b)});
v.onloadedmetadata=function(){clearTimeout(wd);D=v.duration;if(!isFinite(D)||!D){toast("Montage indisponible pour cette vidéo");return end(f)}
A=0;B=Math.min(D,MAXL);ra.min=rb.min=0;ra.max=rb.max=D;sync();if(D>MAXL)toast("Vidéo de plus de 3 min : rogne pour garder 3 min maximum");v.play().catch(function(){v.muted=true;v.play().catch(function(){})})};
v.onerror=function(){toast("Vidéo illisible ici, envoi sans montage");end(f)};
v.src=u;var wd=setTimeout(function(){if(!D&&o.parentNode){toast("Montage lent, envoi sans montage");end(f)}},8000);
go.onclick=function(){if(A<.2&&B>D-.2&&!fi)return end(f);
v.pause();ctl={abort:0};bi.style.width="0";ot.textContent="Montage en cours… garde l'écran allumé";ov.className="ov on";
enc(f,A,B,F[fi][1],function(q){bi.style.width=Math.round(q*100)+"%";ot.textContent="Montage en cours… "+Math.round(q*100)+" % · garde l'écran allumé"},ctl).then(function(bl){end(bl)}).catch(function(e){ov.className="ov";if(e&&e.message==="abort")return v.play().catch(function(){});toast("Montage impossible ici, vidéo originale conservée");end(f)})};
oc.onclick=function(){ctl.abort=1}
}})();
