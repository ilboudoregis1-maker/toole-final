(function(){
if(window.__tset)return;window.__tset=1;
var D=document;function $(i){return D.getElementById(i)}
var P='<svg viewBox="0 0 24 24">';
var IC={
tel:[P+'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>','#0a7cff'],
user:[P+'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>','#8b5cf6'],
lock:[P+'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>','#f59e0b'],
out:[P+'<path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4"/><path d="M16 8l4 4-4 4M20 12H9"/></svg>','#ef4444'],
read:[P+'<path d="M2 12.5l4.5 4.5L14 8.5M10 16.5l1 1L21 8"/></svg>','#10b981'],
vib:[P+'<rect x="8" y="4" width="8" height="16" rx="2"/><path d="M4 8v8M20 8v8"/></svg>','#06b6d4'],
snd:[P+'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></svg>','#ec4899']};
function kind(t){t=(t||'').toLowerCase();
if(/^(email|numéro|numero|téléphone|phone)/.test(t))return'tel';
if(/^(pseudo|username)/.test(t))return'user';
if(/mot de passe|password/.test(t))return'lock';
if(/déconnexion|log ?out|sign ?out/.test(t))return'out';
if(/lecture|read/.test(t))return'read';
if(/vibration/.test(t))return'vib';
if(/sons|effets|sound/.test(t))return'snd';
return''}
function icons(){
[].forEach.call(D.querySelectorAll('#scrParam .card .row'),function(r){
 if(r.getAttribute('data-i'))return;var s=r.querySelector('span');if(!s)return;
 var k=kind(s.textContent);if(!k)return;r.setAttribute('data-i','1');
 var i=D.createElement('div');i.className='st-ic';i.style.setProperty('--c',IC[k][1]);i.innerHTML=IC[k][0];r.insertBefore(i,r.firstChild)})}
function fmtTel(){
var e=$('pAcEm');if(!e)return;var m=/^(\d{8,15})@phone\.tooole\.app$/.exec((e.textContent||'').trim());if(!m)return;
var d=m[1],t;if(d.indexOf('226')===0&&d.length===11)t='+226 '+d.slice(3).replace(/(\d{2})(?=\d)/g,'$1 ');else t='+'+d;
e.textContent=t;var l=e.parentNode&&e.parentNode.querySelector('span:not(.st-ic)');if(l)l.textContent=(localStorage.getItem('toole_lang')==='en'?'Phone':'Numéro')}
function me(){
var b=D.querySelector('#scrParam .body');if(!b)return;var c=$('stMe');
if(!c){c=D.createElement('div');c.id='stMe';b.insertBefore(c,b.firstChild)}
var ps=(($('pAcPsV')||{}).textContent||'').trim(),vf=false;
try{vf=!!JSON.parse(localStorage.getItem('toole_vf')||'{}').v}catch(x){}
var n=ps&&ps!=='-'?ps:'';
c.innerHTML='<div class="st-av"></div><div><b></b><span></span></div>';
c.querySelector('.st-av').textContent=(n||'?').slice(0,2).toUpperCase();
c.querySelector('b').textContent=n||'TÕÕLé';
c.querySelector('span').textContent=vf?'Compte vérifié ✓':(localStorage.getItem('toole_lang')==='en'?'Account not verified':'Compte non vérifié')}
function run(){icons();fmtTel();me()}
function boot(){run();
['pAcEm','pAcPsV'].forEach(function(id){var e=$(id);if(e)new MutationObserver(function(){fmtTel();me()}).observe(e,{childList:true,characterData:true,subtree:true})});
var s=$('scrParam');if(s)new MutationObserver(function(){if(!s.classList.contains('hide'))run()}).observe(s,{attributes:true,attributeFilter:['class']});
setTimeout(run,1500)}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',boot);else boot();
})();
