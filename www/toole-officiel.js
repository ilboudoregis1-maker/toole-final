(function(){
if(window.__toff)return;window.__toff=1;
var D=document,SEEN='toole_off_seen',OFF=[],REP=[],busy=0;
function $(i){return D.getElementById(i)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function logged(){try{return !!JSON.parse(localStorage.getItem('toole_session')).access_token}catch(e){return false}}
function call(p,o){var f=window.api||(typeof api==='function'?api:null);return f?f(p,o):Promise.reject(new Error('api'))}
var BADGE='<svg viewBox="0 0 24 24" width="16" height="16" style="flex:none"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.3 3.3L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var SEND='<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>';
var BACK='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
var WELCOME='Bienvenue sur TÕÕLé ! Ici, l’équipe TÕÕLé te parle directement : annonces, nouveautés et informations importantes. Tu peux nous écrire un message toutes les 24 heures.';
var st=D.createElement('style');st.textContent=
'#offRow{display:flex;align-items:center;gap:12px;padding:11px 12px;margin:6px 0 10px;border-radius:18px;background:linear-gradient(135deg,#eaf3ff,#f6faff);border:1px solid #cfe2ff;box-shadow:0 4px 14px rgba(10,61,145,.1);cursor:pointer}'+
'#offRow img,#offScr .oh img{width:46px;height:46px;border-radius:50%;object-fit:cover;background:#fff;flex:none}'+
'#offRow .on{display:flex;align-items:center;gap:5px;font-weight:800;color:#0a2a66}#offRow .op{font-size:13px;color:#4a5f80;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60vw}#offRow .od{width:11px;height:11px;border-radius:50%;background:#1d9bf0;flex:none}'+
'#offScr{position:fixed;inset:0;z-index:9990;display:flex;flex-direction:column;background:linear-gradient(180deg,#eef4ff,#f4f7fb);font-family:"Exo 2",system-ui,sans-serif}'+
'#offScr .oh{display:flex;align-items:center;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 12px 12px;background:linear-gradient(135deg,#0a3d91,#1565d8);color:#fff;box-shadow:0 4px 18px rgba(10,61,145,.3)}'+
'#offScr .oh button{border:0;background:rgba(255,255,255,.15);width:38px;height:38px;border-radius:50%;display:grid;place-items:center;flex:none}'+
'#offScr .on2{display:flex;align-items:center;gap:6px;font-weight:800;font-size:17px}#offScr .os{font-size:12px;opacity:.85}'+
'#offMsgs{flex:1;overflow:auto;padding:14px 12px;display:flex;flex-direction:column;gap:8px}'+
'#offMsgs .b{max-width:82%;padding:10px 13px;border-radius:18px;white-space:pre-wrap;word-break:break-word;font-size:15px;line-height:1.4;box-shadow:0 2px 6px rgba(10,61,145,.08)}'+
'#offMsgs .o{align-self:flex-start;background:#fff;color:#0b1b2b;border:1px solid #dbe7fb;border-top-left-radius:6px}'+
'#offMsgs .u{align-self:flex-end;background:linear-gradient(135deg,#0a3d91,#1d5bc4);color:#fff;border-top-right-radius:6px}'+
'#offMsgs small{display:block;font-size:10.5px;opacity:.6;margin-top:4px;text-align:right}'+
'#offScr .of{padding:8px 10px calc(10px + env(safe-area-inset-bottom,0px));background:#fff;border-top:1px solid #dbe7fb}'+
'#offNote{font-size:12px;color:#4a5f80;padding:0 6px 6px;min-height:14px}'+
'#offScr .ob{display:flex;gap:8px;align-items:center}#offIn{flex:1;border:1.5px solid #cfe0fb;border-radius:22px;padding:11px 15px;font-size:15px;outline:0;background:#f6f9ff}#offIn:disabled{opacity:.55}'+
'#offGo{width:44px;height:44px;border:0;border-radius:50%;background:linear-gradient(135deg,#0a3d91,#1a73e8);display:grid;place-items:center;flex:none}#offGo:disabled{opacity:.45}';
D.head.appendChild(st);
function lastOff(){return OFF.length?OFF[OFF.length-1]:null}
function unread(){var l=lastOff();if(!l)return false;var s=0;try{s=+localStorage.getItem(SEEN)||0}catch(e){}return l.id>s}
function fmt(d){try{var x=new Date(d);return x.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})+' '+x.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}catch(e){return''}}
function wait(){var m=0;REP.forEach(function(r){var t=new Date(r.created_at).getTime();if(t>m)m=t});return m?Math.max(0,m+864e5-Date.now()):0}
function left(ms){var h=Math.floor(ms/36e5),n=Math.ceil((ms%36e5)/6e4);if(n===60){h++;n=0}return h>0?h+' h '+(n<10?'0':'')+n+' min':n+' min'}
function rowHtml(){var l=lastOff();return '<img src="logo.png" alt=""><div style="flex:1;min-width:0"><div class="on">TÕÕLé '+BADGE+'</div><div class="op">'+esc(l?l.texte:'Bienvenue sur TÕÕLé !')+'</div></div>'+(unread()||!l?'<span class="od"></span>':'')}
function inject(){var rc=$('recent'),sl=$('scrList');if(!rc||!sl)return;var ex=$('offRow');
if(!logged()||sl.classList.contains('hide')){if(ex)ex.remove();return}
var ch=sl.querySelectorAll('.chip'),q=$('srch'),show=(!ch[0]||ch[0].classList.contains('on'))&&!(q&&q.value);
if(!show){if(ex)ex.remove();return}
if(!ex){ex=D.createElement('div');ex.id='offRow';ex.onclick=open;rc.insertBefore(ex,rc.firstChild)}else if(rc.firstChild!==ex)rc.insertBefore(ex,rc.firstChild);
var h=rowHtml();if(ex.__h!==h){ex.__h=h;ex.innerHTML=h}}
function paint(){var box=$('offMsgs');if(!box)return;var it=[];
if(!OFF.length)it.push({k:'o',t:WELCOME,d:''});
OFF.forEach(function(m){it.push({k:'o',t:m.texte,d:m.created_at})});
REP.forEach(function(m){it.push({k:'u',t:m.texte,d:m.created_at})});
it.sort(function(a,b){return(a.d?new Date(a.d):0)-(b.d?new Date(b.d):0)});
var h=it.map(function(m){return '<div class="b '+m.k+'">'+esc(m.t)+(m.d?'<small>'+fmt(m.d)+'</small>':'')+'</div>'}).join('');
if(box.__h!==h){box.__h=h;box.innerHTML=h;box.scrollTop=box.scrollHeight}
var i=$('offIn'),g=$('offGo'),n=$('offNote'),w=wait(),s=w>0;
if(i){i.disabled=s;i.placeholder=s?'Disponible dans '+left(w):'Écrire à TÕÕLé…'}
if(g)g.disabled=s;if(n&&!n.__e)n.textContent=s?'Prochain message possible dans '+left(w):'1 message toutes les 24 h'}
function note(t){var n=$('offNote');if(n){n.__e=1;n.textContent=t;setTimeout(function(){n.__e=0;paint()},3500)}}
function send(){var i=$('offIn');if(!i||busy)return;var t=i.value.trim();if(!t)return;busy=1;
call('/rest/v1/rpc/send_official_reply',{method:'POST',body:JSON.stringify({p_texte:t})}).then(function(r){i.value='';REP.push(r&&r.id?r:{id:Date.now(),texte:t,created_at:new Date().toISOString()})})
.catch(function(e){var m=String(e&&e.message||'');note(/LIMIT/.test(m)?'Tu dois attendre 24 h entre deux messages.':'Envoi impossible. Vérifie ta connexion.');if(/LIMIT/.test(m))load()})
.then(function(){busy=0;paint()})}
function open(){if($('offScr'))return;var o=D.createElement('div');o.id='offScr';
o.innerHTML='<div class="oh"><button id="offBk" aria-label="Retour">'+BACK+'</button><img src="logo.png" alt=""><div><div class="on2">TÕÕLé '+BADGE+'</div><div class="os">Compte officiel</div></div></div><div id="offMsgs"></div><div class="of"><div id="offNote"></div><div class="ob"><input id="offIn" maxlength="1000" autocomplete="off"><button id="offGo" aria-label="Envoyer">'+SEND+'</button></div></div>';
D.body.appendChild(o);$('offBk').onclick=function(){o.remove()};$('offGo').onclick=send;$('offIn').onkeydown=function(e){if(e.key==='Enter')send()};
var l=lastOff();if(l)try{localStorage.setItem(SEEN,String(l.id))}catch(e){}
paint();load();inject()}
function load(){if(!logged())return Promise.resolve();
return Promise.all([call('/rest/v1/official_messages?select=id,texte,created_at&order=created_at.desc&limit=100'),call('/rest/v1/official_replies?select=id,texte,created_at&order=created_at.desc&limit=100')])
.then(function(r){OFF=(r[0]||[]).slice().reverse();REP=(r[1]||[]).slice().reverse();var l=lastOff();if($('offScr')&&l)try{localStorage.setItem(SEEN,String(l.id))}catch(e){}inject();paint()}).catch(function(){inject()})}
function boot(){inject();setTimeout(load,1200);setInterval(load,90000);setInterval(inject,2000);setInterval(function(){if($('offScr'))paint()},60000);
D.addEventListener('visibilitychange',function(){if(!D.hidden)load()});
var rc=$('recent');if(rc)try{new MutationObserver(inject).observe(rc,{childList:true})}catch(e){}}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',boot);else boot();
})();
