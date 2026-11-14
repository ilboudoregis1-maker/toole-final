/* TÕÕLé — Explorer : compression des longues vidéos avant envoi (Telegram ~19 Mo) */
(function(){"use strict";if(window.tooleZip)return;window.tooleZip=zip;
var LIM=18*1048576,TARGET=16*1048576;
function say(m){try{if(typeof toast==="function")toast(m)}catch(e){}}
function plan(dur,pass){var budget=TARGET*8*0.88*Math.pow(0.8,pass);var v=Math.max(40000,Math.round(budget/Math.max(dur,1)-48000));return{v:v,a:48000,h:v>550000?480:v>300000?360:v>150000?240:144}}
function compress(file,w,h,dur,onP,q,st){return new Promise(function(res){
var v=document.createElement("video"),u=URL.createObjectURL(file),raf=0,ac=null,rec=null,done=false,chunks=[];
function end(r){if(done)return;done=true;cancelAnimationFrame(raf);try{if(rec&&rec.state!=="inactive")rec.stop()}catch(e){}try{v.pause()}catch(e){}try{if(ac)ac.close()}catch(e){}try{URL.revokeObjectURL(u)}catch(e){}res(r)}
st.stop=function(){end(null)};
if(!window.MediaRecorder||!h)return end(null);
var H=Math.min(q.h,h),W=Math.round(w*H/h/2)*2;
var c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
var tr=c.captureStream(24).getVideoTracks();
v.playsInline=true;v.src=u;
try{var AC=window.AudioContext||window.webkitAudioContext;ac=new AC();ac.resume();var s=ac.createMediaElementSource(v),d=ac.createMediaStreamDestination();s.connect(d);tr=tr.concat(d.stream.getAudioTracks())}catch(e){}
var mime=["video/webm;codecs=vp8,opus","video/webm;codecs=vp9,opus","video/webm"].filter(function(m){return MediaRecorder.isTypeSupported(m)})[0];
if(!mime)return end(null);
try{rec=new MediaRecorder(new MediaStream(tr),{mimeType:mime,videoBitsPerSecond:q.v,audioBitsPerSecond:q.a})}catch(e){return end(null)}
rec.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
rec.onstop=function(){end({blob:new Blob(chunks,{type:"video/webm"})})};
function draw(){x.drawImage(v,0,0,W,H);onP(Math.min(1,v.currentTime/dur));if(v.currentTime>=dur){cancelAnimationFrame(raf);try{rec.stop()}catch(e){end(null)}return}raf=requestAnimationFrame(draw)}
v.onended=function(){cancelAnimationFrame(raf);try{rec.stop()}catch(e){end(null)}};
v.onerror=function(){end(null)};
rec.start(500);
var p=v.play();if(p&&p.then)p.then(draw).catch(function(){end(null)});else draw();
setTimeout(function(){end(null)},(dur+25)*1000)})}
function zip(file,w,h,dur){return new Promise(function(done){
var o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:100001;background:rgba(15,23,42,.72);display:flex;align-items:center;justify-content:center;padding:24px";
var b=document.createElement("div");b.style.cssText="width:100%;max-width:340px;padding:22px;border-radius:22px;background:#fff;color:#0f172a;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)";
var mins=Math.max(1,Math.ceil(dur/60));
b.innerHTML='<div style="font-size:18px;font-weight:800;margin-bottom:8px">Vidéo à compresser</div><div id="tzt" style="font-size:14px;line-height:1.55;color:#475569">Ta vidéo fait '+(file.size/1048576).toFixed(0)+' Mo. Elle sera compressée pour passer (environ '+mins+' min). Garde l\'application ouverte et l\'écran allumé.</div><div id="tzbar" style="display:none;height:10px;border-radius:6px;background:#e2e8f0;margin:16px 0 6px;overflow:hidden"><div id="tzf" style="height:100%;width:0;background:linear-gradient(90deg,#06b6d4,#2563eb)"></div></div><div id="tzp" style="font-size:14px;font-weight:700;color:#1d4ed8;min-height:20px"></div><div style="display:flex;gap:10px;margin-top:16px"><button id="tzc" type="button" style="flex:1;padding:12px;border:0;border-radius:12px;font-weight:700;font-size:15px;background:#f1f5f9;color:#0f172a">Annuler</button><button id="tzg" type="button" style="flex:1;padding:12px;border:0;border-radius:12px;font-weight:700;font-size:15px;color:#fff;background:linear-gradient(135deg,#06b6d4,#2563eb)">Compresser</button></div>';
o.appendChild(b);document.body.appendChild(o);
function Q(id){return o.querySelector("#"+id)}
var st={},stop=false;
function close(r){o.remove();done(r)}
Q("tzc").onclick=function(){stop=true;if(st.stop)st.stop();close(null)};
Q("tzg").onclick=async function(){
Q("tzg").style.display="none";Q("tzbar").style.display="block";Q("tzt").textContent="Compression en cours… ne ferme pas l'application.";
var best=null;
for(var pass=0;pass<3&&!stop;pass++){
var r=await compress(file,w,h,dur,function(p){Q("tzf").style.width=Math.round(p*100)+"%";Q("tzp").textContent="Compression"+(pass?" (passe "+(pass+1)+"/3)":"")+"… "+Math.round(p*100)+" %"},plan(dur,pass),st);
if(stop)return;
if(!r||!r.blob||!r.blob.size){say("Compression impossible sur cet appareil");return close(null)}
best=r.blob;if(best.size<=LIM)break}
if(!best||best.size>LIM){say("Impossible de descendre sous 18 Mo");return close(null)}
say("Vidéo prête ("+(best.size/1048576).toFixed(1)+" Mo)");close(best)}})}
})();
