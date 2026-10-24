(function(){
if(window.__tvf2)return;window.__tvf2=1;
var D=document,WARN=15,LOCK=18,ST={v:false,status:null,phone:'',channel:'sms',sent:false,days:0,loaded:false,t:0};
function $(i){return D.getElementById(i)}
function sess(){try{return JSON.parse(localStorage.getItem('toole_session'))}catch(e){return null}}
function uid(){var s=sess();return(s&&s.user&&s.user.id)||''}
function call(p,b){var f=window.api||(typeof api==='function'?api:null);return f?f(p,{method:'POST',body:JSON.stringify(b||{})}):Promise.reject(new Error('Erreur'))}
function say(m){try{if(typeof toast==='function')toast(m)}catch(e){}}
function save(){try{localStorage.setItem('toole_vf',JSON.stringify({uid:uid(),v:ST.v,phone:ST.phone}))}catch(e){}}
function load(){try{var r=JSON.parse(localStorage.getItem('toole_vf')||'{}');if(r.uid&&r.uid===uid()&&r.v){ST.v=true;ST.phone=r.phone||''}}catch(e){}}
function mask(p){return p&&p.length>7?p.slice(0,4)+' ••• '+p.slice(-3):(p||'')}
function locked(){return ST.loaded&&!ST.v&&ST.days>=LOCK}
function left(){return Math.max(1,LOCK-ST.days)}
function jours(n){return n+' jour'+(n>1?'s':'')}
var IC_SH='<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';
var IC_OK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
var IC_SMS='<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>';
var IC_WA='<svg viewBox="0 0 24 24"><path d="M5 19l1.2-3.6A8 8 0 1 1 9 18z"/><path d="M9.5 9c.3 2.4 2.3 4.4 5 5l1-1.2-1.8-.9-.8.6c-.8-.4-1.5-1.1-1.9-1.9l.6-.8-.9-1.8z"/></svg>';
var st=D.createElement('style');
st.textContent='#vfCard{display:flex;align-items:center;gap:12px;margin:10px 14px 4px;padding:12px 14px;border-radius:18px;background:linear-gradient(135deg,#0a7cff,#2f9bff);color:#fff;box-shadow:0 8px 20px rgba(10,124,255,.28)}'+
'#vfCard.warn{background:linear-gradient(135deg,#f59e0b,#f97316);box-shadow:0 8px 20px rgba(249,115,22,.3)}#vfCard.lock{background:linear-gradient(135deg,#ef4444,#dc2626);box-shadow:0 8px 20px rgba(220,38,38,.3)}'+
'#vfCard.ok{background:#e9f7ef;color:#0b3d22;box-shadow:none;border:1px solid #c7ecd5;padding:9px 14px}'+
'#vfCard .vf-ic{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center;flex:0 0 auto}#vfCard.ok .vf-ic{background:#1fa463;width:30px;height:30px}'+
'#vfCard svg,.vf-pill svg,.vf-ch svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}#vfCard.ok svg{width:18px;height:18px}'+
'#vfCard .vf-tx{flex:1;min-width:0;display:flex;flex-direction:column}#vfCard .vf-tx b{font-size:15px}#vfCard .vf-tx span{font-size:12px;opacity:.92;line-height:1.3}'+
'#vfCard .vf-go{width:auto!important;flex:0 0 auto!important;white-space:nowrap;border:0;border-radius:20px;background:#fff;color:#0a7cff;font-weight:800;padding:9px 14px;font-size:14px}#vfCard.warn .vf-go{color:#d9650b}#vfCard.lock .vf-go{color:#dc2626}'+
'#vfCard{margin:6px 14px 2px;padding:7px 10px;gap:10px;border-radius:14px;box-shadow:0 4px 12px rgba(10,124,255,.22)}#vfCard .vf-ic{width:30px;height:30px}#vfCard svg{width:17px;height:17px}#vfCard .vf-tx b{font-size:14px;line-height:1.2}#vfCard .vf-tx span{font-size:11.5px;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#vfCard .vf-go{padding:7px 13px;font-size:13px}#vfCard.ok{padding:5px 10px}/*bande-compacte*/'+
'.vf-pill{display:inline-flex;align-items:center;gap:6px;margin-top:6px;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;background:#fff3cd;color:#7a5b00;border:0}.vf-pill.ok{background:#e9f7ef;color:#16803f}.vf-pill svg{width:14px;height:14px;stroke:currentColor}'+
'.vf-lockbar{margin:0 10px 6px;padding:10px 14px;border-radius:14px;background:#fee2e2;color:#991b1b;font-size:13px;font-weight:600;text-align:center}.vf-lockbar b{text-decoration:underline}'+
'html.vf-lock #scrChat .bar,html.vf-lock #scrGroup .bar{opacity:.4;pointer-events:none}html.vf-lock #callBtn{opacity:.4;pointer-events:none}'+
'#vfOv{position:fixed;inset:0;z-index:99998;background:rgba(5,25,55,.5);display:flex;align-items:flex-end}#vfOv.mid{align-items:center;justify-content:center;padding:20px}'+
'#vfSh{width:100%;box-sizing:border-box;background:#fff;color:#0b1b2b;border-radius:26px 26px 0 0;padding:18px 18px calc(env(safe-area-inset-bottom,0px) + 20px);font-family:system-ui,-apple-system,Roboto,sans-serif}#vfOv.mid #vfSh{border-radius:24px;max-width:380px;padding-bottom:18px}'+
'#vfSh .vf-h{display:flex;align-items:center;font-size:19px;font-weight:800;margin-bottom:6px}#vfSh .vf-h b{flex:1;color:#0a7cff}'+
'#vfSh .vf-x{border:0;background:#eef4fc;border-radius:50%;width:36px;height:36px;font-size:22px;color:#0a7cff;line-height:1}'+
'#vfSh p{margin:6px 0 12px;font-size:14px;color:#6b7c93;line-height:1.4}#vfSh .vf-err{color:#d93025;min-height:18px;margin:8px 0;font-weight:600;font-size:14px}'+
'#vfSh .vf-row{display:flex;gap:8px}#vfSh select,#vfSh input{border:0;background:#f0f5fc;border-radius:14px;padding:14px;font-size:17px;color:#0b1b2b;outline:none;box-sizing:border-box}#vfSh select{width:46%;color-scheme:light}#vfSh .vf-row input{flex:1;min-width:0}'+
'#vfSh .vf-chs{display:flex;gap:8px;margin:12px 0 4px}.vf-ch{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;border:2px solid #dbe7f7;background:#fff;color:#0a7cff;border-radius:14px;padding:12px 6px;font-weight:800;font-size:15px}.vf-ch svg{stroke:#0a7cff;width:20px;height:20px}.vf-ch.on{background:#0a7cff;border-color:#0a7cff;color:#fff}.vf-ch.on svg{stroke:#fff}'+
'#vfSh .vf-num{text-align:center;font-size:22px;font-weight:800;letter-spacing:1px;color:#0b1b2b;background:#f0f5fc;border-radius:14px;padding:16px;margin:6px 0 10px}html[data-theme=dark] #vfSh .vf-num{background:#1c2a3d;color:#e8eef7}#vfSh .vf-chs{margin:16px 0 14px}#vfSh .vf-code{width:100%;text-align:center;font-size:26px;font-weight:800;letter-spacing:4px;text-transform:uppercase}'+
'#vfSh .vf-btn{width:100%;border:0;border-radius:16px;padding:15px;font-size:16px;font-weight:800;color:#fff;background:linear-gradient(135deg,#0a7cff,#2f9bff);box-shadow:0 8px 18px rgba(10,124,255,.3)}#vfSh .vf-btn:disabled{opacity:.55}#vfSh .vf-btn.sec{background:#eef4fc;color:#0a7cff;box-shadow:none;margin-top:8px}'+
'#vfSh .vf-lnk{border:0;background:none;color:#0a7cff;font-weight:700;font-size:14px;padding:10px 6px}#vfSh .vf-ln{display:flex;justify-content:space-between}'+
'html[data-theme=dark] #vfSh{background:#121c2b;color:#e8eef7}html[data-theme=dark] #vfSh select,html[data-theme=dark] #vfSh input{background:#1c2a3d;color:#e8eef7}html[data-theme=dark] #vfSh .vf-x,html[data-theme=dark] #vfSh .vf-btn.sec{background:#1c2a3d}html[data-theme=dark] .vf-ch{background:#121c2b;border-color:#26384f}html[data-theme=dark] #vfCard.ok{background:#12301f;color:#bff0d3;border-color:#1f5236}html[data-theme=dark] .vf-lockbar{background:#3b1414;color:#fecaca}';
D.head.appendChild(st);
function paint(){
var b=D.querySelector('#scrList .body'),c=$('vfCard'),show=ST.v||ST.loaded;
if(b){
 if(!show||ST.v){if(c)c.remove()}
 else{
  if(!c){c=D.createElement('div');c.id='vfCard';b.insertBefore(c,b.firstChild)}
  if(ST.v){c.className='ok';c.innerHTML='<div class="vf-ic">'+IC_OK+'</div><div class="vf-tx"><b>Compte vérifié</b><span>'+mask(ST.phone)+'</span></div>';c.onclick=null}
  else{
   var cls='',t='Vérifie ton compte',s='Reçois ton code CANI par SMS ou WhatsApp',bt='Vérifier';
   if(ST.status==='pending'||ST.status==='sent'){t='Vérification en cours';s=ST.sent?'Ton code est envoyé : entre-le pour terminer':'Ton code arrive bientôt par '+(ST.channel==='whatsapp'?'WhatsApp':'SMS');bt='Entrer le code'}
   if(ST.days>=LOCK){cls='lock';t='Compte non vérifié';s='Messages et appels bloqués. Vérifie ton compte pour continuer.'}
   else if(ST.days>=WARN){cls='warn';s='Veuillez vérifier votre compte dans '+jours(left())+' pour continuer à communiquer avec TÕÕLé.'}
   c.className=cls;c.innerHTML='<div class="vf-ic">'+IC_SH+'</div><div class="vf-tx"><b>'+t+'</b><span>'+s+'</span></div><button class="vf-go">'+bt+'</button>';c.onclick=openSheet}
 }}
var e=$('pfEm');
if(e&&e.parentNode&&(ST.v||ST.loaded)){var p=$('vfPill');
 if(!p){p=D.createElement('div');p.id='vfPill';e.parentNode.insertBefore(p,e.nextSibling)}
 p.className='vf-pill'+(ST.v?' ok':'');p.innerHTML=(ST.v?IC_OK:IC_SH)+(ST.v?'Compte vérifié'+(ST.phone?' · '+mask(ST.phone):''):'Non vérifié');p.onclick=ST.v?null:openSheet;p.style.cursor=ST.v?'default':'pointer'}
var lk=locked();D.documentElement.classList.toggle('vf-lock',lk);
['scrChat','scrGroup'].forEach(function(id){var s=$(id);if(!s)return;var bar=s.querySelector('.bar'),lb=s.querySelector('.vf-lockbar');
 if(lk){if(!lb&&bar){lb=D.createElement('div');lb.className='vf-lockbar';lb.innerHTML='Compte non vérifié : messages bloqués. <b>Vérifier</b>';lb.onclick=openSheet;bar.parentNode.insertBefore(lb,bar)}}
 else if(lb)lb.remove()});
var sl=$('scrList');
if(ST.loaded&&!ST.v&&ST.days>=WARN&&sl&&!sl.classList.contains('hide')&&!sessionStorage.getItem('vf_alert')){try{sessionStorage.setItem('vf_alert','1')}catch(x){}alertBox()}
}
function check(cb){
if(!uid())return;
call('/rest/v1/rpc/my_verification',{}).then(function(j){
 ST.v=!!j.verified;ST.status=j.status||null;ST.phone=j.phone||ST.phone;ST.channel=j.channel||ST.channel;ST.sent=!!j.sent;ST.days=+j.days||0;ST.loaded=true;ST.t=Date.now();save();paint();if(cb)cb()
}).catch(function(){})}
function close(){var o=$('vfOv');if(o)o.remove()}
function overlay(mid){close();var o=D.createElement('div');o.id='vfOv';if(mid)o.className='mid';var s=D.createElement('div');s.id='vfSh';o.appendChild(s);o.onclick=function(e){if(e.target===o)close()};D.body.appendChild(o);return s}
function alertBox(){
var s=overlay(true),lk=ST.days>=LOCK;
s.innerHTML='<div class="vf-h"><b>'+(lk?'Compte non vérifié':'Vérification requise')+'</b><button class="vf-x" id="vfX">×</button></div><p>'+(lk?'Tes messages et appels sont bloqués tant que ton compte n\'est pas vérifié.':'Veuillez vérifier votre compte dans '+jours(left())+' pour continuer à communiquer avec TÕÕLé.')+'</p><button class="vf-btn" id="vfOk">Vérifier maintenant</button><button class="vf-btn sec" id="vfLater">Plus tard</button>';
$('vfX').onclick=close;$('vfLater').onclick=close;$('vfOk').onclick=openSheet}
function openSheet(){
var s=overlay(false),AP,PH=ST.phone,CH=ST.channel||'sms',busy=false;
function head(t){return'<div class="vf-h"><b>'+t+'</b><button class="vf-x" id="vfX">×</button></div>'}
function step1(msg){
 if(AP===undefined){call('/rest/v1/rpc/my_account_phone',{}).then(function(r){AP=(typeof r==='string'&&r)?r:null;step1(msg)}).catch(function(){AP=null;step1(msg)});return}
 s.innerHTML=head('Vérifier mon compte')+'<p>'+(AP?'Ton code de vérification (format CANI-XXXX) sera envoyé à ton numéro. Choisis comment le recevoir.':'Entre ton numéro et choisis comment recevoir ton code de vérification (format CANI-XXXX).')+'</p>'+(AP?'<div class="vf-num">'+mask(AP)+'</div>':'<div class="vf-row"><select id="vfC"></select><input id="vfP" type="tel" inputmode="numeric" placeholder="70 12 34 56" autocomplete="tel-national"></div>')+'<div class="vf-chs"><button class="vf-ch'+(CH==='sms'?' on':'')+'" data-c="sms">'+IC_SMS+'SMS</button><button class="vf-ch'+(CH==='whatsapp'?' on':'')+'" data-c="whatsapp">'+IC_WA+'WhatsApp</button></div><div class="vf-err" id="vfE">'+(msg||'')+'</div><button class="vf-btn" id="vfS">Vérifier</button>';
 var _sel=$('vfC')||{value:(AP&&AP.indexOf('+226')===0)?'226':'0'},_P=(window.VF_PAYS||[]).slice().sort(function(a,b){return a.c==='BF'?-1:b.c==='BF'?1:a.n.localeCompare(b.n,'fr')});
 if(_P.length&&$('vfC'))_sel.innerHTML=_P.map(function(x){return '<option value="'+x.d+'">'+String.fromCodePoint(127397+x.c.charCodeAt(0),127397+x.c.charCodeAt(1))+' '+x.n+' +'+x.d+'</option>'}).join('');
 var _rule=function(){var bf=_sel.value==='226',sb=s.querySelector('.vf-ch[data-c="sms"]'),wb=s.querySelector('.vf-ch[data-c="whatsapp"]');if(!bf)CH='whatsapp';sb.style.display=bf?'':'none';wb.classList.toggle('on',CH==='whatsapp');sb.classList.toggle('on',CH==='sms'&&bf)};
 _sel.onchange=_rule;_rule();
 $('vfX').onclick=close;
 [].forEach.call(s.querySelectorAll('.vf-ch'),function(b){b.onclick=function(){CH=b.dataset.c;[].forEach.call(s.querySelectorAll('.vf-ch'),function(x){x.classList.toggle('on',x===b)})}});
 $('vfS').onclick=function(){
  var d=AP?'':$('vfP').value.replace(/\D/g,'').replace(/^0+/,'');if(!AP&&d.length<6){$('vfE').textContent='Numéro invalide.';return}
  if(busy)return;busy=true;PH=AP||('+'+$('vfC').value+d);var b=$('vfS');b.disabled=true;b.textContent='Envoi…';
  call('/rest/v1/rpc/request_verification',{p_phone:PH,p_channel:CH}).then(function(j){busy=false;ST.status=j.status;ST.phone=j.phone;ST.channel=j.channel;ST.sent=!!j.sent;save();paint();step2()}).catch(function(e){busy=false;step1(e.message)})}}
function step2(msg){
 var wa=CH==='whatsapp'?'WhatsApp':'SMS';
 s.innerHTML=head('Code de vérification')+'<p>'+(ST.sent?'Ton code a été envoyé par '+wa+' au '+PH+'. Entre-le ci-dessous.':'Demande reçue ✓ Tu recevras ton code CANI-XXXX par '+wa+' au '+PH+' dès qu\'il sera prêt.')+'</p><input id="vfK" class="vf-code" maxlength="9" placeholder="CANI-0000" autocapitalize="characters" autocomplete="off"><div class="vf-err" id="vfE">'+(msg||'')+'</div><button class="vf-btn" id="vfV">Valider</button><div class="vf-ln"><button class="vf-lnk" id="vfR">Actualiser</button><button class="vf-lnk" id="vfB">Changer de numéro</button></div>';
 $('vfX').onclick=close;$('vfB').onclick=function(){step1()};
 $('vfR').onclick=function(){check(function(){step2()})};
 var k=$('vfK');k.oninput=function(){k.value=k.value.toUpperCase().replace(/[^A-Z0-9-]/g,'')};
 $('vfV').onclick=function(){
  if(k.value.replace(/-/g,'').length<4){$('vfE').textContent='Entre ton code CANI-XXXX.';return}
  if(busy)return;busy=true;var b=$('vfV');b.disabled=true;b.textContent='Vérification…';
  call('/rest/v1/rpc/verify_code',{p_code:k.value}).then(function(j){busy=false;
   if(j&&j.ok){ST.v=true;ST.status='verified';ST.phone=PH||ST.phone;ST.loaded=true;save();paint();close();say('Compte vérifié ✓');check()}
   else{b.disabled=false;b.textContent='Valider';$('vfE').textContent=(j&&j.error)||'Code incorrect';k.value='';k.focus()}
  }).catch(function(e){busy=false;b.disabled=false;b.textContent='Valider';$('vfE').textContent=e.message})}}
if(ST.status==='pending'||ST.status==='sent'){PH=ST.phone;step2()}else step1()}
D.addEventListener('click',function(e){if(!locked())return;var t=e.target.closest&&e.target.closest('#send,#gSend,#vmic,#gMic,#callBtn,.callbtn,.tsstkbtn');if(t){e.stopPropagation();e.preventDefault();openSheet()}},true);
D.addEventListener('keydown',function(e){if(!locked()||e.key!=='Enter')return;if(e.target.closest&&e.target.closest('#scrChat .bar,#scrGroup .bar')){e.stopPropagation();e.preventDefault()}},true);
function boot(){load();paint();check();
['scrList','scrProfil'].forEach(function(id){var e=$(id);if(!e)return;
 new MutationObserver(function(){if(!e.classList.contains('hide')){paint();if(Date.now()-ST.t>60000)check()}}).observe(e,{attributes:true,attributeFilter:['class']})})}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',function(){setTimeout(boot,800)});else setTimeout(boot,800);
})();
