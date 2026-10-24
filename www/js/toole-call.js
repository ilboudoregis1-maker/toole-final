(function(){
var POLL_IDLE=3000,POLL_CALL=1200,RING_MS=45000;
var ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'stun:stun1.l.google.com:19302'},{urls:'stun:stun.cloudflare.com:3478'}]};
var PHONE='<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>';
var MIC='<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>';
var MICOFF=MIC+'<path d="M4 4l16 16"/>';
var RECI='<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.6" style="fill:#fff;stroke:none"/>';
var gen=0,pc=null,stream=null,cur=null,busy=false,muted=false,myName=null,tmr=null,ringT=0,tickT=0,t0=0,tRing=0,pBusy=false,ctx=null,dc=null,rec=null,recOn=false,remoteRec=false;
function $(i){return document.getElementById(i)}
function API(p,o){return window.api(p,o)}
function uid(){try{return JSON.parse(localStorage.getItem('toole_session')).user.id}catch(e){return null}}
function curPeer(){try{return typeof peer!=='undefined'?peer:null}catch(e){return null}}
function say(t){try{if(typeof window.toast==='function'){window.toast(t);return}}catch(e){}setSt(t)}
function setSt(t){var e=$('coSt');if(e)e.textContent=t}
function btn(cls,ic,fn,label){var e=document.createElement('button');e.className='co-b '+cls;e.setAttribute('aria-label',label);e.innerHTML='<svg viewBox="0 0 24 24">'+ic+'</svg>';e.onclick=fn;var w=document.createElement('div');w.className='co-w';w.appendChild(e);var s=document.createElement('span');s.textContent=label;w.appendChild(s);return w}
function ui(mode){
 var b=$('coBtns');b.innerHTML='';
 if(mode==='in'){b.appendChild(btn('co-red',PHONE,decline,'Refuser'));b.appendChild(btn('co-green',PHONE,accept,'Répondre'))}
 else if(mode==='active'){b.appendChild(btn('co-glass'+(muted?' on':''),muted?MICOFF:MIC,toggleMute,'Muet'));b.appendChild(btn('co-rec'+(recOn?' on':''),RECI,startRec,recOn?'Arrêter':'Enregistrer'));b.appendChild(btn('co-red',PHONE,hang,'Raccrocher'))}
 else{b.appendChild(btn('co-red',PHONE,hang,'Raccrocher'))}
}
function show(name,st,mode){var o=$('callOv');o.className='on';$('coAv').textContent=(name||'?').slice(0,2).toUpperCase();$('coName').textContent=name||'';setSt(st);ui(mode)}
function patch(st,extra){if(!cur)return Promise.resolve();return API('/rest/v1/calls?id=eq.'+cur.id,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify(Object.assign({status:st},extra||{}))})}
function iceDone(p){return new Promise(function(res){if(p.iceGatheringState==='complete')return res();var d=false;function fin(){if(d)return;d=true;p.removeEventListener('icegatheringstatechange',chk);res()}function chk(){if(p.iceGatheringState==='complete')fin()}p.addEventListener('icegatheringstatechange',chk);setTimeout(fin,3500)})}
function setDC(c){dc=c;c.onmessage=function(e){if(e.data==='rec:1')remoteRec=true;else if(e.data==='rec:0')remoteRec=false;banner()};c.onclose=function(){remoteRec=false;banner()}}
function banner(){var e=$('coRec');if(!e)return;var t=recOn?'Enregistrement en cours':(remoteRec?'Cet appel est enregistré par '+((cur&&cur.peer&&cur.peer.pseudo)||'ton correspondant'):'');e.className=t?'on':'';e.textContent='';if(t){var i=document.createElement('i');e.appendChild(i);var sp=document.createElement('span');sp.textContent=t;e.appendChild(sp)}}
function newPC(){
 pc=new RTCPeerConnection(ICE);
 pc.ondatachannel=function(e){setDC(e.channel)};
 pc.ontrack=function(e){var a=$('coAudio');a.srcObject=e.streams[0];var p=a.play&&a.play();if(p&&p.catch)p.catch(function(){})};
 pc.onconnectionstatechange=function(){var s=pc&&pc.connectionState;if(s==='connected')onConnected();else if(s==='failed'){say('Connexion impossible (réseau)');hang()}else if(s==='disconnected'){setSt('Connexion instable…');var g1=gen;setTimeout(function(){if(g1===gen&&pc&&pc.connectionState==='disconnected'){say('Connexion perdue');hang()}},12000)}};
}
async function mic(){var g0=gen;await ensureMic();return navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false}).then(function(s){if(g0!==gen||!pc){s.getTracks().forEach(function(t){t.stop()});return}stream=s;s.getTracks().forEach(function(t){pc.addTrack(t,s)})})}
function micMsg(e){var n=(e&&e.name)||'',m=(e&&e.message)||'';
 if(/NotAllowed|Security/i.test(n)||/denied|Permission/i.test(m))return 'Micro refusé : autorise-le dans Réglages > Applications > TÕÕLé > Autorisations ('+n+')';
 if(/NotFound/i.test(n))return 'Aucun micro détecté';
 if(/NotReadable/i.test(n))return 'Micro déjà utilisé par une autre app';
 return m||'Appel impossible'}
async function ensureMic(){try{var P=window.Capacitor&&window.Capacitor.Plugins;if(P&&P.VoiceRecorder&&P.VoiceRecorder.requestAudioRecordingPermission)await P.VoiceRecorder.requestAudioRecordingPermission()}catch(e){}}
function onConnected(){
 if(tickT)return;stopRing();t0=Date.now();ui('active');
 function tick(){var s=Math.floor((Date.now()-t0)/1000);setSt(String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'))}
 tick();tickT=setInterval(tick,1000);
}
function toggleMute(){muted=!muted;if(stream)stream.getAudioTracks().forEach(function(t){t.enabled=!muted});ui('active')}
function clearT(){if(tmr){clearInterval(tmr);tmr=null}}
function startRing(){
 stopRing();
 try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.resume)ctx.resume()}catch(e){ctx=null}
 function beep(){if(!ctx)return;try{var o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=440;g.gain.value=.0001;o.connect(g);g.connect(ctx.destination);var t=ctx.currentTime;g.gain.exponentialRampToValueAtTime(.2,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+.5);o.start(t);o.stop(t+.55)}catch(e){}}
 function cycle(){beep();setTimeout(beep,650);try{if(navigator.vibrate)navigator.vibrate([400,250,400])}catch(e){}}
 cycle();ringT=setInterval(cycle,2600);
}
function stopRing(){if(ringT){clearInterval(ringT);ringT=0}try{if(navigator.vibrate)navigator.vibrate(0)}catch(e){}}
function cleanup(){
 gen++;if(recOn)stopRec();
 stopRing();clearT();if(tickT){clearInterval(tickT);tickT=0}
 try{if(stream)stream.getTracks().forEach(function(t){t.stop()})}catch(e){}
 try{if(pc)pc.close()}catch(e){}
 stream=null;pc=null;cur=null;dc=null;muted=false;busy=false;pBusy=false;remoteRec=false;banner();
 var a=$('coAudio');if(a)a.srcObject=null;
}
function closeUi(msg){if(msg)setSt(msg);setTimeout(function(){var o=$('callOv');if(o&&!busy)o.className=''},msg?1600:0)}
function end(msg){if(msg==='Appel terminé'&&tickT&&t0){var d=Math.floor((Date.now()-t0)/1000);msg+=' · '+String(Math.floor(d/60)).padStart(2,'0')+':'+String(d%60).padStart(2,'0')}cleanup();closeUi(msg)}
function hang(){var p=cur?patch('ended').catch(function(){}):Promise.resolve();end('Appel terminé');return p}
function decline(){var p=cur?patch('declined').catch(function(){}):Promise.resolve();end('');return p}
function poll(mode){
 clearT();
 tmr=setInterval(async function(){
  if(!cur||pBusy)return;pBusy=true;
  try{
   var r=await API('/rest/v1/calls?select=status,answer&id=eq.'+cur.id),c=r&&r[0];
   if(!c||!cur)return;
   if(mode==='out'){
    if(c.answer&&pc&&pc.signalingState==='have-local-offer'){await pc.setRemoteDescription(JSON.parse(c.answer));stopRing();setSt('Connexion…')}
    if(c.status==='declined')end('Appel refusé');
    else if(c.status==='ended'||c.status==='missed')end('Appel terminé');
    else if(c.status==='ringing'&&Date.now()-tRing>RING_MS){await patch('missed');end('Pas de réponse')}
   }else if(mode==='ring'){
    if(c.status!=='ringing')end('Appel manqué');
   }else{
    if(c.status==='ended')end('Appel terminé');
   }
  }catch(e){}
  pBusy=false;
 },POLL_CALL);
}
async function startCall(){
 var pr=curPeer();
 if(!pr||!pr.id){say('Ouvre une discussion');return}
 if(busy)return;
 if(!navigator.mediaDevices||!window.RTCPeerConnection){say('Appels non pris en charge');return}
 busy=true;show(pr.pseudo||'Contact','Appel…','out');
 var my=gen;
 try{
  if(!myName){try{var r=await API('/rest/v1/profiles?select=pseudo&id=eq.'+uid());myName=(r&&r[0]&&r[0].pseudo)||'TÕÕLé'}catch(e){myName='TÕÕLé'}}
  newPC();setDC(pc.createDataChannel('ctl'));await mic();if(my!==gen)return;setSt('Connexion…');
  var off=await pc.createOffer();if(my!==gen)return;await pc.setLocalDescription(off);if(my!==gen)return;await iceDone(pc);if(my!==gen)return;
  var row=await API('/rest/v1/calls',{method:'POST',headers:{Prefer:'return=representation'},body:JSON.stringify({callee:pr.id,caller_name:myName,offer:JSON.stringify(pc.localDescription)})});
  var id=(Array.isArray(row)?row[0]:row).id;
  if(my!==gen){try{API('/rest/v1/calls?id=eq.'+id,{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({status:'ended'})}).catch(function(){})}catch(e){}return}
  cur={id:id,peer:pr};tRing=Date.now();setSt('Sonnerie…');startRingback();poll('out');
 }catch(e){if(my!==gen)return;say(micMsg(e));end('')}
}
function incoming(c){
 busy=true;cur={id:c.id,offer:c.offer,peer:{id:c.caller,pseudo:c.caller_name}};
 show(c.caller_name||'Appel','Appel entrant','in');startRing();poll('ring');
}
async function accept(){
 stopRing();clearT();setSt('Connexion…');ui('out');
 var my=gen;
 try{
  newPC();await mic();if(my!==gen)return;
  await pc.setRemoteDescription(JSON.parse(cur.offer));if(my!==gen)return;
  var ans=await pc.createAnswer();if(my!==gen)return;await pc.setLocalDescription(ans);if(my!==gen)return;await iceDone(pc);if(my!==gen)return;
  await patch('active',{answer:JSON.stringify(pc.localDescription)});if(my!==gen)return;
  poll('in');
 }catch(e){if(my!==gen)return;say(micMsg(e));try{await patch('ended')}catch(_){}end('')}
}

function startRec(){
 if(recOn)return stopRec();
 if(!dc||dc.readyState!=='open'){say('Connexion pas encore prête');return}
 var a=$('coAudio'),rs=a&&a.srcObject;
 if(!stream||!rs||!window.MediaRecorder){say('Enregistrement impossible');return}
 try{
  var AC=window.AudioContext||window.webkitAudioContext,ac=new AC();if(ac.resume)ac.resume();
  var dest=ac.createMediaStreamDestination();
  ac.createMediaStreamSource(stream).connect(dest);ac.createMediaStreamSource(rs).connect(dest);
  var mt=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus'].filter(function(t){return MediaRecorder.isTypeSupported(t)})[0]||'';
  var mr=mt?new MediaRecorder(dest.stream,{mimeType:mt}):new MediaRecorder(dest.stream);
  var chunks=[],info={peer:(cur&&cur.peer&&cur.peer.pseudo)||'Contact',t0:Date.now()};
  mr.ondataavailable=function(e){if(e.data&&e.data.size)chunks.push(e.data)};
  mr.onstop=function(){saveRec(new Blob(chunks,{type:mr.mimeType||mt||'audio/webm'}),info);try{ac.close()}catch(e){}};
  mr.start(1000);rec={mr:mr};recOn=true;
  try{dc.send('rec:1')}catch(e){}
  ui('active');banner();
 }catch(e){say('Enregistrement impossible')}
}
function stopRec(){
 if(!recOn)return;recOn=false;
 try{rec.mr.stop()}catch(e){}
 rec=null;
 try{if(dc&&dc.readyState==='open')dc.send('rec:0')}catch(e){}
 if(busy)ui('active');banner();
}
function idb(){return new Promise(function(res,rej){var r=indexedDB.open('toole_rec',1);r.onupgradeneeded=function(){r.result.createObjectStore('recs',{keyPath:'id'})};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}})}
function saveRec(blob,info){
 if(!blob.size){say('Enregistrement vide');return}
 var r={id:Date.now(),peer:info.peer,date:info.t0,dur:Math.round((Date.now()-info.t0)/1000),type:blob.type,blob:blob};
 idb().then(function(db){var tx=db.transaction('recs','readwrite');tx.objectStore('recs').put(r);tx.oncomplete=function(){say('Enregistrement sauvegardé')};tx.onerror=function(){say('Sauvegarde impossible')}}).catch(function(){say('Sauvegarde impossible')});
}
function listRecs(){return idb().then(function(db){return new Promise(function(res){var q=db.transaction('recs').objectStore('recs').getAll();q.onsuccess=function(){res(q.result.sort(function(a,b){return b.id-a.id}))};q.onerror=function(){res([])}})}).catch(function(){return []})}
function delRec(id){return idb().then(function(db){return new Promise(function(res){var tx=db.transaction('recs','readwrite');tx.objectStore('recs').delete(id);tx.oncomplete=res;tx.onerror=res})})}
function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function exportRec(r){
 var ext=/mp4/.test(r.type)?'m4a':/ogg/.test(r.type)?'ogg':'webm';
 var name='Appel_'+r.peer.replace(/[^\w-]+/g,'_')+'_'+new Date(r.date).toISOString().slice(0,16).replace(/[:T]/g,'-')+'.'+ext;
 var f=new File([r.blob],name,{type:r.type});
 function fallback(){
  if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:name}).catch(function(){});return}
  var u=URL.createObjectURL(r.blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);
 }
 var P=window.Capacitor&&window.Capacitor.Plugins;
 if(P&&P.Filesystem&&P.Filesystem.writeFile){
  var fr=new FileReader();
  fr.onload=function(){P.Filesystem.writeFile({path:'TOOLE/'+name,data:String(fr.result).split(',')[1],directory:'DOCUMENTS',recursive:true}).then(function(){say('Enregistré dans Documents/TOOLE')}).catch(fallback)};
  fr.readAsDataURL(r.blob);return;
 }
 fallback();
}
var playing=null;
async function openList(){
 var o=$('recOv');if(!o)return;o.className='on';
 var box=$('roList');box.textContent='';
 var all=await listRecs();
 if(!all.length){var e=document.createElement('div');e.className='ro-e';e.textContent='Aucun enregistrement pour le moment.';box.appendChild(e);return}
 all.forEach(function(r){
  var it=document.createElement('div');it.className='ro-i';
  var b=document.createElement('b');b.textContent=r.peer;it.appendChild(b);
  var sm=document.createElement('small');sm.textContent=new Date(r.date).toLocaleString()+' · '+fmt(r.dur);it.appendChild(sm);
  var au=document.createElement('audio');au.controls=true;au.preload='none';au.src=URL.createObjectURL(r.blob);it.appendChild(au);
  var ac=document.createElement('div');ac.className='ro-a';
  var ex=document.createElement('button');ex.textContent='Exporter';ex.onclick=function(){exportRec(r)};
  var de=document.createElement('button');de.className='d';de.textContent='Supprimer';de.onclick=function(){delRec(r.id).then(openList)};
  ac.appendChild(ex);ac.appendChild(de);it.appendChild(ac);box.appendChild(it);
 });
}
function closeList(){var o=$('recOv');if(o)o.className='';document.querySelectorAll('#roList audio').forEach(function(a){a.pause()})}
function getCtx(){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended'&&ctx.resume)ctx.resume()}catch(e){ctx=null}return ctx}
function tone(f,d,v){if(!ctx)return;try{var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.0001;o.connect(g);g.connect(ctx.destination);var t=ctx.currentTime;g.gain.exponentialRampToValueAtTime(v,t+.04);g.gain.setValueAtTime(v,t+d-.06);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.02)}catch(e){}}
function startRing(){stopRing();getCtx();function cycle(){tone(880,.4,.25);setTimeout(function(){tone(660,.4,.25)},450);setTimeout(function(){tone(880,.4,.25)},1000);setTimeout(function(){tone(660,.4,.25)},1450);try{if(navigator.vibrate)navigator.vibrate([500,300,500])}catch(e){}}cycle();ringT=setInterval(cycle,3200)}
function startRingback(){stopRing();getCtx();function cycle(){tone(425,1,.12)}cycle();ringT=setInterval(cycle,3500)}
function stopRing(){if(ringT){clearInterval(ringT);ringT=0}try{if(navigator.vibrate)navigator.vibrate(0)}catch(e){}}
['touchstart','click'].forEach(function(ev){document.addEventListener(ev,function(){getCtx()},{passive:true})});
function watch(){
 setInterval(async function(){
  if(busy||document.hidden)return;
  var id=uid();if(!id||typeof window.api!=='function')return;
  try{
   var since=encodeURIComponent(new Date(Date.now()-RING_MS).toISOString());
   var r=await API('/rest/v1/calls?select=id,caller,caller_name,offer,created_at&callee=eq.'+id+'&status=eq.ringing&created_at=gte.'+since+'&order=created_at.desc&limit=1');
   if(r&&r[0]&&!busy)incoming(r[0]);
  }catch(e){}
 },POLL_IDLE);
}
function build(){
 if($('callOv'))return;
 var d=document.createElement('div');
 d.innerHTML='<div id="callOv"><div class="co-top"><div class="co-av" id="coAv">?</div><div class="co-name" id="coName"></div><div class="co-st" id="coSt"></div><div id="coRec"></div></div><div class="co-btns" id="coBtns"></div><audio id="coAudio" autoplay playsinline></audio></div>';
 document.body.appendChild(d.firstChild);
 var r=document.createElement('div');
 r.innerHTML='<div id="recOv"><div class="ro-h"><button id="roBack" aria-label="Retour"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><span>Enregistrements d\'appels</span></div><div class="ro-l" id="roList"></div></div>';
 document.body.appendChild(r.firstChild);
 $('roBack').onclick=closeList;
}
function addBtn(){
 var h=document.querySelector('#scrChat .chead');
 if(!h||$('callBtn'))return;
 var b=document.createElement('button');b.id='callBtn';b.className='callbtn';b.setAttribute('aria-label','Appeler');
 b.innerHTML='<svg viewBox="0 0 24 24">'+PHONE+'</svg>';b.onclick=startCall;h.appendChild(b);
}
function addRecBtn(){
 var m=document.querySelector('.menu');
 if(!m||$('recBtn'))return;
 var b=document.createElement('button');b.id='recBtn';b.className='pm';b.textContent="Enregistrements d'appels";b.onclick=openList;
 m.insertBefore(b,m.lastElementChild);
}
function init(){build();addBtn();addRecBtn();watch()}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
