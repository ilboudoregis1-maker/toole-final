/* TÕÕLé V4 — navigation (Discussions · Contacts · + · Communautés · Appels), statuts en tête,
   filtres (Tous · Non lus · Favoris · Groupes), historique d'appels.
   Réutilise les fonctions existantes de l'app ; n'en supprime aucune. Ne touche pas à CANIX. */
(function(){
  'use strict';
  var L=(localStorage.getItem('toole_lang')||'fr')==='en'?'en':'fr';
  var T={fr:{disc:'Discussions',cont:'Contacts',comm:'Communautés',calls:'Appels',st:'Mon statut',sts:'Statuts',all:'Tous',unread:'Non lus',fav:'Favoris',grp:'Groupes',
    newChat:'Nouvelle discussion',newGrp:'Nouveau groupe',newSt:'Publier un statut',close:'Fermer',noFav:'Aucun favori. Touchez l\u2019étoile d\u2019une discussion pour l\u2019ajouter.',
    noCalls:'Aucun appel pour l\u2019instant.',callsErr:'Historique indisponible pour le moment.',out:'Sortant',inc:'Entrant',miss:'Manqué',dec:'Refusé',now:'à l\u2019instant',call:'Appeler'},
    en:{disc:'Chats',cont:'Contacts',comm:'Communities',calls:'Calls',st:'My status',sts:'Status',all:'All',unread:'Unread',fav:'Favorites',grp:'Groups',
    newChat:'New chat',newGrp:'New group',newSt:'Post a status',close:'Close',noFav:'No favorites yet. Tap the star on a chat to add it.',
    noCalls:'No calls yet.',callsErr:'History unavailable right now.',out:'Outgoing',inc:'Incoming',miss:'Missed',dec:'Declined',now:'just now',call:'Call'}}[L];
  var $=function(i){return document.getElementById(i)};
  var SCREENS=['scrList','scrGroupes','scrStatuts','scrProfil','scrCalls','scrContacts'];
  var mode='chats';            // chats | contacts | fav | unread
  function safe(fn){try{return fn()}catch(e){}}
  function uid(){return safe(function(){return me()})||safe(function(){return JSON.parse(localStorage.getItem('toole_session')).user.id})}
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var S={
    chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    user:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 5a3.5 3.5 0 0 1 0 6M19 14.5A6.5 6.5 0 0 1 21.5 20"/>',
    comm:'<circle cx="12" cy="6" r="2.6"/><circle cx="5.5" cy="17" r="2.6"/><circle cx="18.5" cy="17" r="2.6"/><path d="M10.5 8.3L6.8 14.6M13.5 8.3l3.7 6.3M8.2 17h7.6"/>',
    phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    me:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    ring:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    out:'<path d="M7 17L17 7M9 7h8v8"/>', inn:'<path d="M17 7L7 17M15 17H7V9"/>'
  };
  function svg(p){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'}

  /* ---------- Écran Appels (historique, table « calls » existante) ---------- */
  function buildCallsScreen(){
    if($('scrCalls'))return;
    var s=document.createElement('section');s.id='scrCalls';s.className='scr hide';
    s.innerHTML='<div class="hdr"><span class="ttl">'+T.calls+'</span></div><div class="body"><div id="v4calls"></div></div>';
    document.body.appendChild(s);
  }
  function ago(iso){var d=(Date.now()-new Date(iso).getTime())/1000;
    if(d<60)return T.now; if(d<3600)return Math.floor(d/60)+' min'; if(d<86400)return Math.floor(d/3600)+' h';
    return new Date(iso).toLocaleDateString(L==='en'?'en-GB':'fr-FR',{day:'numeric',month:'short'})}
  function AVB(){try{if(typeof URL==="string"&&/^https?:/.test(URL))return URL}catch(e){}return "https://jbjeqxubpqqypysfsubd.supabase.co"}
  async function loadCalls(){
    var box=$('v4calls');if(!box)return;var id=uid();if(!id){box.innerHTML='';return}
    try{
      var rows=await api('/rest/v1/calls?select=id,caller,callee,caller_name,status,created_at&or=(caller.eq.'+id+',callee.eq.'+id+')&order=created_at.desc&limit=40');
      if(!rows||!rows.length){box.innerHTML='<div id="v4empty">'+T.noCalls+'</div>';return}
      var others={};rows.forEach(function(r){var o=r.caller===id?r.callee:r.caller;if(o)others[o]=1});
      var ids=Object.keys(others),names={},avs={};
      if(ids.length){var pr=await api('/rest/v1/profiles?select=id,pseudo,avatar_v&id=in.('+ids.join(',')+')');pr.forEach(function(p){names[p.id]=p.pseudo;avs[p.id]=p.avatar_v})}
      box.innerHTML='';
      rows.forEach(function(r){
        var out=r.caller===id,o=out?r.callee:r.caller,name=names[o]||(!out&&r.caller_name)||'?';
        var missed=!out&&r.status==='missed',kind=out?T.out:(missed?T.miss:(r.status==='declined'?T.dec:T.inc));
        var row=document.createElement('div');row.className='row';
        row.innerHTML='<div class="av">'+esc(name.slice(0,2).toUpperCase())+'</div><div style="flex:1;min-width:0"><div class="rn">'+esc(name)+'</div>'
          +'<div class="sub" style="display:flex;align-items:center;gap:6px"><span class="v4call-ic'+(missed?' miss':'')+'">'+svg(out?S.out:S.inn)+'</span>'+esc(kind)+' · '+esc(ago(r.created_at))+'</div></div>'
          +'<button class="v4call-go" aria-label="'+T.call+'">'+svg(S.phone)+'</button>';
        var avv=avs[o];if(avv){var ae=row.querySelector('.av');if(ae){ae.style.setProperty('--avimg',"url('"+AVB()+"/storage/v1/object/public/avatars/"+o+"/thumb.jpg?v="+avv+"')");ae.classList.add('has-photo')}}
        row.onclick=function(){openChat(o,name)};
        box.appendChild(row);
      });
    }catch(e){box.innerHTML='<div id="v4empty">'+T.callsErr+'</div>'}
  }
  function openCalls(){buildCallsScreen();window.showOnly('scrNone');$('scrCalls').classList.remove('hide');mode='calls';sync();loadCalls()}

  /* showOnly encapsulé pour masquer l'écran Appels quand un autre s'ouvre */
  function wrapShowOnly(){
    var so=window.showOnly;if(typeof so!=='function'||so.__v4)return;
    var w=function(n){var c=$('scrCalls');if(c)c.classList.add('hide');var r=so.apply(this,arguments);setTimeout(sync,0);return r};
    w.__v4=1;window.showOnly=w;
  }

  /* ---------- Navigation ---------- */
  function buildNav(){
    if($('v4nav'))return;
    var n=document.createElement('nav');n.id='v4nav';
    n.innerHTML=
      '<button class="t" data-n="chats">'+svg(S.chat)+'<span>'+T.disc+'</span></button>'+
      '<button class="t" data-n="contacts">'+svg(S.user)+'<span>'+T.cont+'</span></button>'+
      '<button class="mid" data-n="new" aria-label="+">'+svg(S.plus)+'</button>'+
      '<button class="t" data-n="comm">'+svg(S.comm)+'<span>'+T.comm+'</span></button>'+
      '<button class="t" data-n="calls">'+svg(S.phone)+'<span>'+T.calls+'</span></button>';
    document.body.appendChild(n);
    n.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;go(b.dataset.n)});
  }
  async function go(k){window.__v4mode=k;if(k==='chats'){try{setChip(0)}catch(e){}}
    try{
      if(k==='chats'){mode='chats';await goList();setSection()}
      else if(k==='contacts'){mode='contacts';if(typeof renderContacts==='function')await renderContacts();setSection();setChip(null)}
      else if(k==='comm'){mode='comm';openGroupes()}
      else if(k==='calls'){openCalls()}
      else if(k==='new'){newSheet()}
    }catch(e){}
    sync();
  }
  function newSheet(){
    if(typeof sheetEl!=='function')return;
    var sh=sheetEl('<div class="sht">+</div><button class="sa" id="v4n1">'+T.newChat+'</button><button class="sa" id="v4n2">'+T.newGrp+'</button><button class="sa" id="v4n3">'+T.newSt+'</button><button class="sa cc" onclick="closeSheet()">'+T.close+'</button>');
    sh.querySelector('#v4n1').onclick=async function(){closeSheet();mode='chats';await goList();var b=$('newBox');if(b){b.classList.remove('hide');var t=$('to');if(t)t.focus()}sync()};
    sh.querySelector('#v4n2').onclick=function(){closeSheet();mode='comm';openGroupes();setTimeout(function(){var g=$('gNew');if(g)g.click()},200)};
    sh.querySelector('#v4n3').onclick=function(){closeSheet();openStatuts()};
  }
  function sync(){window.__v4sync=sync;
    var vis=null;SCREENS.forEach(function(id){var e=$(id);if(e&&!e.classList.contains('hide'))vis=id});
    var nav=$('v4nav');if(!nav)return;
    nav.classList.toggle('on',!!vis);
    var active=null;
    if(vis==='scrList')active=(mode==='contacts')?'contacts':'chats';
    else if(vis==='scrGroupes')active='comm';
    else if(vis==='scrCalls')active='calls';else if(vis==='scrContacts')active='contacts';
    nav.querySelectorAll('.t').forEach(function(b){b.classList.toggle('on',b.dataset.n===active)});
    if(vis==='scrGroupes'){var t=document.querySelector('#scrGroupes .ttl');if(t&&t.textContent!==T.comm)t.textContent=T.comm}
    document.body.style.setProperty('--v4-vis',vis?'1':'0');
  }

  /* ---------- Accueil : en-tête, statuts, filtres ---------- */
  function buildHome(){
    var body=document.querySelector('#scrList .body');if(!body||$('v4st'))return;
    // profil dans l'en-tête (1er bouton), recherche focalisée (2e)
    var ics=document.querySelectorAll('#scrList .hdr .ic');
    if(ics[0]){ics[0].innerHTML=svg(S.me);ics[0].setAttribute('aria-label','Profil');ics[0].onclick=function(){openProfil()}}
    if(ics[1])ics[1].onclick=function(){var s=$('srch');if(s){s.focus();s.scrollIntoView({block:'center'})}};
    // rangée de statuts
    var st=document.createElement('div');st.id='v4st';
    st.innerHTML='<div class="v4s me" id="v4stMe"><div class="rg"><i>'+svg(S.me)+'</i><span class="plus">+</span></div>'+T.st+'</div>'
                +'<div class="v4s" id="v4stAll"><div class="rg"><i>'+svg(S.ring)+'</i></div>'+T.sts+'</div>';
    body.insertBefore(st,body.firstChild);
    $('v4stMe').onclick=$('v4stAll').onclick=function(){openStatuts()};
    // filtres
    var ch=document.createElement('div');ch.id='v4chips';
    ch.innerHTML='<button data-c="all" class="on">'+T.all+'</button><button data-c="unread">'+T.unread+'</button><button data-c="fav">'+T.fav+'</button><button data-c="grp">'+T.grp+'</button>';
    var sr=$('srch');sr.parentNode.insertBefore(ch,sr.nextSibling);
    var sec=document.createElement('div');sec.id='v4sec';sec.textContent=T.disc;ch.parentNode.insertBefore(sec,ch.nextSibling);
    ch.addEventListener('click',async function(e){var b=e.target.closest('button');if(!b)return;var c=b.dataset.c;
      var orig=document.querySelectorAll('#scrList .chips .chip');
      try{
        if(c==='all'){mode='chats';if(orig[0])orig[0].click()}
        else if(c==='unread'){mode='unread';if(typeof renderUnread==='function')await renderUnread()}
        else if(c==='fav'){mode='fav';if(orig[0])orig[0].click()}
        else if(c==='grp'){mode='comm';openGroupes();return}
      }catch(err){}
      setChip(c);setSection();filterFav();sync();
    });
  }
  function setChip(c){var ch=$('v4chips');if(!ch)return;ch.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.c===c)})}
  function setSection(){var s=$('v4sec');if(!s)return;s.textContent=mode==='contacts'?T.cont:(mode==='fav'?T.fav:(mode==='unread'?T.unread:T.disc));
    if(mode==='chats')setChip('all')}

  /* ---------- Favoris (local, par pseudo) ---------- */
  function favKey(){return 'v4fav:'+(uid()||'')}
  function favs(){return safe(function(){return JSON.parse(localStorage.getItem(favKey())||'[]')})||[]}
  function saveFavs(a){safe(function(){localStorage.setItem(favKey(),JSON.stringify(a))})}
  function decorateRows(){
    var box=$('recent');if(!box)return;
    var f=favs();
    box.querySelectorAll('.row').forEach(function(r){
      var rn=r.querySelector('.rn');if(!rn||r.querySelector('.v4star'))return;
      var name=rn.textContent,b=document.createElement('button');b.type='button';b.className='v4star'+(f.indexOf(name)>=0?' on':'');b.textContent='\u2605';b.setAttribute('aria-label',T.fav);
      ['click','pointerdown','pointerup'].forEach(function(ev){b.addEventListener(ev,function(e){e.stopPropagation()})});
      b.addEventListener('click',function(){var a=favs(),i=a.indexOf(name);if(i>=0)a.splice(i,1);else a.push(name);saveFavs(a);b.classList.toggle('on',i<0);filterFav()});
      r.appendChild(b);
    });
    filterFav();
  }
  function filterFav(){
    var box=$('recent');if(!box)return;var old=$('v4empty2');if(old)old.remove();
    var rows=box.querySelectorAll('.row');
    if(mode!=='fav'){rows.forEach(function(r){r.classList.remove('v4off')});return}
    var f=favs(),shown=0;
    rows.forEach(function(r){var n=(r.querySelector('.rn')||{}).textContent,on=f.indexOf(n)>=0;r.classList.toggle('v4off',!on);if(on)shown++});
    if(rows.length&&!shown){var d=document.createElement('div');d.id='v4empty2';d.className='sx-s';d.style.cssText='padding:20px 6px';d.textContent=T.noFav;box.appendChild(d)}
  }

  /* ---------- Démarrage ---------- */
  function init(){
    wrapShowOnly();buildCallsScreen();buildNav();buildHome();
    var rec=$('recent');
    if(rec&&!rec.__v4){rec.__v4=1;new MutationObserver(function(){decorateRows()}).observe(rec,{childList:true})}
    SCREENS.forEach(function(id){var e=$(id);if(e&&!e.__v4){e.__v4=1;new MutationObserver(sync).observe(e,{attributes:true,attributeFilter:['class']})}});
    decorateRows();sync();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  setTimeout(init,600);setTimeout(init,1800);
})();
