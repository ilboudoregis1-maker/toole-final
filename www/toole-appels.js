(function(){
var T={fr:{t:'Appels',h:'Bientôt disponible',p:'La section Appels est en cours de traitement. Nous finalisons les appels audio et vidéo pour vous offrir une qualité irréprochable. Vous pourrez l’utiliser très prochainement, après une mise à jour de TÕÕLé.',b:'En cours de traitement'},en:{t:'Calls',h:'Coming soon',p:'The Calls section is being worked on. We are finalising audio and video calls to give you the best quality. You will be able to use it soon, after a TÕÕLé update.',b:'Work in progress'}};
function lg(){var l='fr';try{l=localStorage.getItem('toole_lang')==='en'?'en':'fr'}catch(e){}return T[l]}
var PH='<svg viewBox="0 0 24 24"><path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>';
function show(){
var t=lg(),s=document.getElementById('scrCalls');
if(!s){s=document.createElement('section');s.id='scrCalls';s.className='scr hide';document.body.appendChild(s)}
s.innerHTML='<div class="hdr"><span class="ttl">'+t.t+'</span></div><div class="apw"><div class="api">'+PH+'</div><h2>'+t.h+'</h2><p>'+t.p+'</p><div class="app">'+t.b+'</div></div>';
if(window.showOnly)window.showOnly('scrNone');
s.classList.remove('hide');
if(window.__v4sync)window.__v4sync();
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#v4nav button[data-n="calls"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();show()},true);
})();
