/* TÕÕLé V5 — corrige la V4 sans rien retirer : favoris par identifiant (plus par nom), filtres réels,
   recherche locale par nom, états de chargement / erreur, barre masquée quand le clavier est ouvert.
   Aucune IA. Ne touche ni à CANIX ni à la logique métier. */
(function(){
  'use strict';
  var L=(localStorage.getItem('toole_lang')||'fr')==='en'?'en':'fr';
  var T={fr:{fav:'Favoris',disc:'Discussions',unread:'Non lus',noFav:'Aucun favori. Touchez l\u2019étoile d\u2019une discussion pour l\u2019ajouter.',retry:'Réessayer'},
         en:{fav:'Favorites',disc:'Chats',unread:'Unread',noFav:'No favorites yet. Tap the star on a chat to add it.',retry:'Retry'}}[L];
  var $=function(i){return document.getElementById(i)};
  var mode='all'; // all | unread | fav
  function safe(fn){try{return fn()}catch(e){}}
  function uid(){return safe(function(){return me()})||safe(function(){return JSON.parse(localStorage.getItem('toole_session')).user.id})}
  function favKey(){return 'v5fav:'+(uid()||'')}
  function favs(){return safe(function(){return JSON.parse(localStorage.getItem(favKey())||'[]')})||[]}
  function saveFavs(a){safe(function(){localStorage.setItem(favKey(),JSON.stringify(a))})}

  /* Migration unique : anciens favoris V4 (par nom) -> identifiants, seulement si le nom est unique */
  function migrate(list){
    var flag='v5mig:'+(uid()||'');if(localStorage.getItem(flag))return;
    var old=safe(function(){return JSON.parse(localStorage.getItem('v4fav:'+(uid()||'')) ||'[]')})||[];
    var f=favs();
    old.forEach(function(n){var m=list.filter(function(x){return x.name===n});if(m.length===1&&f.indexOf(m[0].id)<0)f.push(m[0].id)});
    saveFavs(f);safe(function(){localStorage.setItem(flag,'1')});
  }

  /* Étiquette chaque ligne avec l'identifiant réel de l'interlocuteur */
  function wrapHome(){
    var h=window.homeRender;if(typeof h!=='function'||h.__v5)return;
    var w=function(list){var r=h.apply(this,arguments);safe(function(){tag(list)});return r};
    w.__v5=1;window.homeRender=w;
  }
  function tag(list){
    var rc=$('recent');if(!rc||!Array.isArray(list))return;
    var rows=rc.querySelectorAll('.row');if(rows.length!==list.length)return;
    migrate(list);
    rows.forEach(function(r,i){var n=((r.querySelector('.rn')||{}).textContent||'');if(n!==String(list[i].name))return;r.dataset.pid=list[i].id;star(r)});
    applyFilter();
  }
  function star(r){
    if(r.querySelector('.v5star'))return;
    var id=r.dataset.pid,b=document.createElement('button');
    b.type='button';b.className='v5star'+(favs().indexOf(id)>=0?' on':'');b.textContent='\u2605';b.setAttribute('aria-label',T.fav);
    ['click','pointerdown','pointerup','touchstart','touchend'].forEach(function(ev){b.addEventListener(ev,function(e){e.stopPropagation()})});
    b.addEventListener('click',function(){
      var a=favs(),i=a.indexOf(id);if(i>=0)a.splice(i,1);else a.push(id);
      saveFavs(a);b.classList.toggle('on',i<0);if(mode==='fav')applyFilter();
    });
    r.appendChild(b);
  }

  /* Filtre réel : favoris (par identifiant) + recherche par nom */
  function applyFilter(){
    var rc=$('recent');if(!rc)return;var old=$('v5nofav');if(old)old.remove();
    var rows=rc.querySelectorAll('.row');
    rows.forEach(function(r){r.classList.remove('v5off')});
    if(mode==='fav'){
      var f=favs(),n=0;
      rows.forEach(function(r){var on=!!r.dataset.pid&&f.indexOf(r.dataset.pid)>=0;r.classList.toggle('v5off',!on);if(on)n++});
      if(!n){var d=document.createElement('div');d.id='v5nofav';d.className='sx-s';d.textContent=T.noFav;rc.appendChild(d)}
    }
    var q=((($('srch')||{}).value)||'').trim().toLowerCase();
    if(q)rows.forEach(function(r){var t=((r.querySelector('.rn')||{}).textContent||'').toLowerCase();if(t.indexOf(q)<0)r.classList.add('v5off')});
  }

  /* Filtres : remplace l'écouteur V4 (clone sans écouteurs) */
  function rewireChips(){
    var ch=$('v4chips');if(!ch||ch.__v5)return;
    var c=ch.cloneNode(true);c.__v5=1;ch.parentNode.replaceChild(c,ch);
    c.addEventListener('click',async function(e){
      var b=e.target.closest('button');if(!b)return;var k=b.dataset.c;
      if(k==='grp'){safe(function(){openGroupes()});return}
      var rc=$('recent');if(rc)rc.classList.add('v5busy');
      try{
        if(k==='unread'){mode='unread';await renderUnread()}
        else{mode=(k==='fav')?'fav':'all';await goList()}
      }catch(err){}
      if(rc)rc.classList.remove('v5busy');
      c.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x.dataset.c===k)});
      var s=$('v4sec');if(s)s.textContent=mode==='fav'?T.fav:(mode==='unread'?T.unread:T.disc);
      applyFilter();
    });
  }

  /* Appels : bouton Réessayer si l'historique est indisponible */
  function watchCalls(){
    var box=$('v4calls');if(!box||box.__v5)return;box.__v5=1;
    new MutationObserver(function(){
      var e=$('v4empty');if(!e||box.querySelector('.v5retry'))return;
      if(!/indisponible|unavailable/i.test(e.textContent))return;
      var b=document.createElement('button');b.type='button';b.className='v5retry';b.textContent=T.retry;
      b.onclick=function(){var t=document.querySelector('#v4nav .t[data-n="calls"]');if(t)t.click()};
      box.appendChild(b);
    }).observe(box,{childList:true});
  }

  /* Barre de navigation masquée quand le clavier est ouvert */
  function keyboard(){
    var vv=window.visualViewport;if(!vv)return;
    var base=window.innerHeight;
    vv.addEventListener('resize',function(){document.body.classList.toggle('v5kb',vv.height<base-150)});
  }

  function init(){
    wrapHome();rewireChips();watchCalls();
    var s=$('srch');if(s&&!s.__v5){s.__v5=1;s.addEventListener('input',applyFilter)}
    if(!document.__v5nav){document.__v5nav=1;document.addEventListener('click',function(e){
      if(e.target.closest&&e.target.closest('#v4nav .t')){mode='all';var rc=$('recent');if(rc)rc.querySelectorAll('.v5off').forEach(function(r){r.classList.remove('v5off')})}
    },true);keyboard()}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,800);setTimeout(init,2000);
})();
