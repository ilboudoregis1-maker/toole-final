(function(){
function S(p,f){return '<svg viewBox="0 0 24 24" class="nico"'+(f?' style="fill:currentColor;stroke:none"':'')+' aria-hidden="true">'+p+'</svg>'}
var PLUS=S('<path d="M12 5v14M5 12h14"/>'),
CH=S('<path d="M9 6l6 6-6 6"/>'),
BK=S('<path d="M15 6l-6 6 6 6"/>'),
HEART=S('<path d="M12 20.5s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 6.6a4.8 4.8 0 0 1 8.5 2.7c0 6-8.5 11.2-8.5 11.2z"/>',1);
function lead(el,re,icon){
 if(!el||el.querySelector('svg'))return;
 var t=el.textContent.trim();
 if(!re.test(t))return;
 var rest=t.replace(re,'').trim();
 el.textContent='';
 el.insertAdjacentHTML('afterbegin',icon);
 if(rest){var s=document.createElement('span');s.textContent=rest;el.appendChild(s)}
}
function fix(){
 var f=document.getElementById('fab');
 if(f&&!f.querySelector('svg')&&f.textContent.trim()==='+'){f.textContent='';f.insertAdjacentHTML('afterbegin',PLUS)}
 document.querySelectorAll('.sx-add,#gNew').forEach(function(e){lead(e,/^\+\s*/,PLUS)});
 document.querySelectorAll('.chev').forEach(function(e){if(!e.querySelector('svg')&&e.textContent.trim()==='\u203A'){e.textContent='';e.insertAdjacentHTML('afterbegin',CH)}});
 document.querySelectorAll('.c2-back').forEach(function(e){if(!e.querySelector('svg')){e.textContent='';e.insertAdjacentHTML('afterbegin',BK)}});
 lead(document.getElementById('supportStatic'),/^[\u2665\u2764]\uFE0F?\s*/,HEART);
}
var q=0;
function go(){if(q)return;q=requestAnimationFrame(function(){q=0;try{fix()}catch(e){}})}
function init(){fix();new MutationObserver(go).observe(document.body,{childList:true,subtree:true,characterData:true})}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
(function(){
try{localStorage.removeItem('toole_theme')}catch(e){}
document.documentElement.style.setProperty('--main','#0A8FD8');
function rm(){var t=document.getElementById('thPick');var g=t&&t.closest('.grp');if(g)g.remove()}
rm();
new MutationObserver(rm).observe(document.documentElement,{childList:true,subtree:true});
})();
