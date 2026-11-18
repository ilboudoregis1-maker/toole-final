(function(){
if(window.__tann)return;window.__tann=1;
var D=document,CUR=null,T=0;
function $(i){return D.getElementById(i)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function logged(){try{return !!JSON.parse(localStorage.getItem('toole_session')).access_token}catch(e){return false}}
function closed(){try{return localStorage.getItem('toole_ann_x')}catch(e){return ''}}
var st=D.createElement('style');
st.textContent='#annBand{display:none!important}.ann-card{display:flex;gap:12px;align-items:flex-start;margin:10px 14px 6px;padding:13px 14px;border-radius:18px;background:linear-gradient(135deg,#eaf4ff,#f4f9ff);border:1px solid #cfe5ff;color:#0b1b2b;box-shadow:0 6px 18px rgba(10,124,255,.1);font-family:system-ui,-apple-system,Roboto,sans-serif}'+
'.ann-ic{width:38px;height:38px;min-width:38px;border-radius:12px;background:linear-gradient(135deg,#0a7cff,#2f9bff);display:grid;place-items:center}.ann-ic svg{width:21px;height:21px;fill:none;stroke:#fff;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}'+
'.ann-tx{flex:1;min-width:0}.ann-tx small{display:block;font-size:11px;font-weight:800;letter-spacing:.9px;color:#0a7cff;margin-bottom:3px}.ann-tx div{font-size:14px;line-height:1.45;white-space:pre-wrap;word-break:break-word}'+
'.ann-x{border:0;background:rgba(10,124,255,.1);color:#0a7cff;width:28px;height:28px;min-width:28px;border-radius:50%;font-size:18px;line-height:1}'+
'html[data-theme=dark] .ann-card{background:#13233a;border-color:#1f3a5c;color:#e8eef7}html[data-theme=dark] .ann-tx small{color:#6db3ff}';
D.head.appendChild(st);
var IC='<svg viewBox="0 0 24 24"><path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>';
function card(id){var c=D.createElement('div');c.id=id;c.className='ann-card';return c}
function fill(c,a){c.innerHTML='<div class="ann-ic">'+IC+'</div><div class="ann-tx"><small>ANNONCE OFFICIELLE · CNS.corp</small><div>'+esc(a.texte)+'</div></div><button class="ann-x" aria-label="Fermer">×</button>';
 c.querySelector('.ann-x').onclick=function(){try{localStorage.setItem('toole_ann_x',String(a.id))}catch(e){}paint()}}
function homeSpot(){var s=$('scrList');if(!s||!s.offsetHeight)return null;
 var i=s.querySelector('input[type=search],input[type=text],input:not([type])');
 if(i){var a=i;while(a.parentNode&&a.parentNode!==s&&a.parentNode.offsetHeight<=72)a=a.parentNode;if(a.parentNode)return{p:a.parentNode,ref:a}}
 var b=s.querySelector('.body');if(b)return{p:b,ref:b.firstChild};return null}
function statSpot(){var s=$('scrStatuts');if(!s||!s.offsetHeight)return null;var h=s.querySelector('.hdr');
 if(h&&h.nextSibling)return{p:s,ref:h.nextSibling};return{p:s,ref:s.firstChild}}
function paint(){
var a=CUR,hide=!a||String(a.id)===closed();
[['annHome',homeSpot],['annStat',statSpot]].forEach(function(h){var c=$(h[0]);
 if(hide){if(c)c.remove();return}
 if(!c){var sp=h[1]();if(!sp)return;c=card(h[0]);sp.p.insertBefore(c,sp.ref)}
 fill(c,a)})}
async function load(){
if(!logged())return;
var f=window.api||(typeof api==='function'?api:null);if(!f)return;
try{var rows=await f('/rest/v1/statuts_admin?select=*&actif=eq.true&limit=50');
 var now=Date.now(),ok=(rows||[]).filter(function(r){return r&&r.texte&&(!r.expire_le||new Date(r.expire_le).getTime()>now)});
 ok.sort(function(x,y){return new Date(y.created_at||y.expire_le||0)-new Date(x.created_at||x.expire_le||0)});
 CUR=ok[0]||null;paint()}catch(e){window.__annErr=e&&e.message}}
function boot(){setTimeout(load,1500);setInterval(load,300000);setInterval(paint,2500);
D.addEventListener('visibilitychange',function(){if(!D.hidden)load()});
['scrList','scrStatuts'].forEach(function(id){var e=$(id);if(e)new MutationObserver(function(){clearTimeout(T);T=setTimeout(function(){paint();load()},400)}).observe(e,{attributes:true,attributeFilter:['class']})})}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',boot);else boot();
})();
