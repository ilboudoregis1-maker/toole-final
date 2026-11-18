/* TÕÕLé : hors ligne fluide */
(function(){'use strict';if(window.__thors)return;window.__thors=1;
var $=function(i){return document.getElementById(i)};
try{if('serviceWorker' in navigator)navigator.serviceWorker.register('toole-sw.js').catch(function(){})}catch(e){}
var st=document.createElement('style');
st.textContent='#thOff{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 8px);transform:translate(-50%,-160%);z-index:99999;padding:6px 14px;border-radius:999px;background:#0b1f3f;color:#fff;font:600 12px system-ui;box-shadow:0 6px 18px rgba(0,0,0,.25);transition:transform .3s;pointer-events:none}#thOff.on{transform:translate(-50%,0)}'
+'#recent:empty::before{content:"";display:block;height:68px;margin:10px 12px;border-radius:18px;background:#eaf1fb;box-shadow:0 78px 0 #eaf1fb,0 156px 0 #eaf1fb,0 234px 0 #eaf1fb,0 312px 0 #eaf1fb;animation:thSh 1.1s ease-in-out infinite}@keyframes thSh{50%{opacity:.45}}';
document.head.appendChild(st);
var b=document.createElement('div');b.id='thOff';b.textContent='Hors ligne · contenu enregistré';document.body.appendChild(b);
function net(){b.classList.toggle('on',navigator.onLine===false)}
window.addEventListener('offline',net);
window.addEventListener('online',function(){net();try{if(window.toast)window.toast('De retour en ligne ✓');var l=$('scrList');if(l&&!l.classList.contains('hide')&&typeof window.goList==='function')window.goList()}catch(e){}});
net();
})();
/* aperçus chiffrés (E1.xxx) dans la liste des discussions */
(function(){if(window.__thors2)return;window.__thors2=1;
var $=function(i){return document.getElementById(i)},RE=/^(Toi : )?((?:E1|G1)\.\S+)$/;
async function fix(el){var m=RE.exec(el.textContent);if(!m||el.__th)return;el.__th=1;var d=null;
 try{if(window.__e2eDec)d=await window.__e2eDec(m[2])}catch(e){}
 el.textContent=(m[1]||'')+(d?String(d).slice(0,120):'🔒 Message chiffré');el.__th=0}
function scan(){var l=$('scrList');if(!l)return;l.querySelectorAll('*').forEach(function(e){if(!e.children.length&&RE.test(e.textContent))fix(e)})}
var tt=0;function later(){clearTimeout(tt);tt=setTimeout(scan,120)}
var l=$('scrList');if(l)new MutationObserver(later).observe(l,{childList:true,subtree:true,characterData:true});scan();
function wrap(){if(window.__thLo)return;var lo=window.logout;if(typeof lo!=='function')return;window.__thLo=1;
 window.logout=function(){try{caches.keys().then(function(k){k.forEach(function(n){if(n.indexOf('toole-')===0)caches.delete(n)})})}catch(e){}return lo.apply(this,arguments)}}
wrap();setTimeout(wrap,2000);
})();
