(function(){
if(window.__tct2)return;window.__tct2=1;
function L(f,e){return localStorage.getItem('toole_lang')==='en'?e:f}
var css=[
'#callBtn,.v4call-go,#cdCall{display:none!important}',
'#tcAdd{display:none!important}',
'#tcAddIc{width:40px;height:40px;border-radius:50%;border:0;background:transparent;color:inherit;display:flex;align-items:center;justify-content:center;padding:0}',
'#tcAddIc svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round}',
'#scrContacts #tcQ{height:44px;border-radius:12px;border:1px solid #e5e7eb;background:#f3f4f6;padding:0 14px;font-size:15px;margin:0 0 6px;color:#111827}',
'#tcList .tc-h{padding:14px 4px 4px;font-size:12px;font-weight:700;letter-spacing:.06em;color:#6b7280;text-transform:uppercase}',
'#tcList .row .sub{font-size:13px;color:#6b7280}',
'#scrContactDet .cd-av{border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.18)}',
'#scrContactDet .cd-n{color:#111827}',
'#scrContactDet .cd-s{color:#6b7280;opacity:1}',
'#scrContactDet .cd-acts{gap:22px}',
'#scrContactDet .cd-a{color:#374151}',
'#scrContactDet .cd-a i{background:#eef1f5;color:#374151}',
'#scrContactDet .cd-card{background:#fff;border:1px solid #e5e7eb}',
'#scrContactDet .cd-r{color:#374151;border-bottom-color:#f0f1f3}',
'#scrContactDet .cd-blk{width:100%;max-width:480px;margin-top:18px;padding:14px;border-radius:14px;border:1.5px solid #d1d5db;background:transparent;color:#374151;font-weight:700;font-size:15px}',
'#scrContactDet .cd-blk+.cd-del{margin-top:10px}'
].join('\n');
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function addBtn(){
  var h=document.querySelector('#scrContacts .hdr');
  if(!h||document.getElementById('tcAddIc'))return;
  var g=document.createElement('span');g.className='grow';g.style.flex='1';
  var b=document.createElement('button');b.id='tcAddIc';b.type='button';
  b.setAttribute('aria-label',L('Enregistrer un contact','Save a contact'));
  b.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
  b.onclick=function(){var a=document.getElementById('tcAdd');if(a)a.click()};
  h.appendChild(g);h.appendChild(b);
}
function syncHeads(){
  var box=document.getElementById('tcList');if(!box)return;
  [].forEach.call(box.querySelectorAll('.tc-h'),function(h){
    var n=h.nextElementSibling,vis=false;
    while(n&&!n.classList.contains('tc-h')){if(n.style.display!=='none'){vis=true;break}n=n.nextElementSibling}
    h.style.display=vis?'':'none';
  });
}
var sig='';
function decorate(){
  var box=document.getElementById('tcList');if(!box)return;
  var rows=[].filter.call(box.children,function(n){return n.classList&&n.classList.contains('row')});
  var s=rows.map(function(r){var n=r.querySelector('.rn');return n?n.textContent:''}).join('|');
  if(s===sig&&(box.querySelector('.tc-h')||!rows.length))return;
  sig=s;
  [].forEach.call(box.querySelectorAll('.tc-h'),function(h){h.remove()});
  var last=null;
  rows.forEach(function(r){
    var n=(r.querySelector('.rn')||{}).textContent||'';
    var fav=n.indexOf('★')===0,key;
    if(fav)key=L('Favoris','Favorites');
    else{
      key=n.replace(/^★\s*/,'').charAt(0).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
      if(!/[A-Z]/.test(key))key='#';
    }
    if(key!==last){var h=document.createElement('div');h.className='tc-h';h.textContent=key;box.insertBefore(h,r);last=key}
  });
  syncHeads();
  var q=document.getElementById('tcQ');
  if(q&&!q.__h){q.__h=1;q.addEventListener('input',function(){setTimeout(syncHeads,0)})}
}
function modal(){
  var ov=document.createElement('div');
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483000;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px';
  var c=document.createElement('div');
  c.style.cssText='width:100%;max-width:380px;max-height:80vh;overflow:auto;background:#fff;color:#111827;border-radius:16px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.3);font:15px/1.45 sans-serif';
  ov.appendChild(c);
  ov.onclick=function(e){if(e.target===ov)ov.remove()};
  document.body.appendChild(ov);
  return {ov:ov,c:c};
}
function blockedDlg(){
  if(document.getElementById('tBlkDlg'))return;
  var m=modal();m.ov.id='tBlkDlg';
  var t=document.createElement('div');
  t.style.cssText='font-size:18px;font-weight:700;margin-bottom:12px';
  t.textContent=L('Utilisateurs bloqués','Blocked users');
  var list=document.createElement('div');
  var close=document.createElement('button');
  close.type='button';close.textContent=L('Fermer','Close');
  close.style.cssText='width:100%;margin-top:14px;padding:12px;border:0;border-radius:10px;background:#f3f4f6;color:#111827;font-size:15px;font-weight:600';
  close.onclick=function(){m.ov.remove()};
  m.c.appendChild(t);m.c.appendChild(list);m.c.appendChild(close);
  function msg(x){list.innerHTML='';var d=document.createElement('div');d.style.cssText='color:#6b7280;padding:8px 0';d.textContent=x;list.appendChild(d)}
  msg('…');
  api('/rest/v1/blocks?select=blocked&blocker=eq.'+me()).then(function(rows){
    rows=rows||[];
    if(!rows.length){msg(L('Aucun utilisateur bloqué.','No blocked users.'));return}
    var ids=rows.map(function(r){return r.blocked});
    return api('/rest/v1/profiles?select=id,pseudo&id=in.('+ids.join(',')+')').then(function(ps){
      var nm={};(ps||[]).forEach(function(p){nm[p.id]=p.pseudo});
      list.innerHTML='';
      ids.forEach(function(id){
        var r=document.createElement('div');
        r.style.cssText='display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f0f1f3';
        var n=document.createElement('div');n.style.cssText='flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis';
        n.textContent=nm[id]||L('Utilisateur','User');
        var b=document.createElement('button');b.type='button';b.textContent=L('Débloquer','Unblock');
        b.style.cssText='padding:8px 14px;border:1px solid #d1d5db;border-radius:10px;background:#fff;color:#111827;font-weight:600;font-size:14px';
        b.onclick=function(){
          b.disabled=true;
          api('/rest/v1/blocks?blocker=eq.'+me()+'&blocked=eq.'+id,{method:'DELETE',headers:{Prefer:'return=minimal'}}).then(function(){
            r.remove();
            if(window.__tblkReload)window.__tblkReload();
            if(!list.children.length)msg(L('Aucun utilisateur bloqué.','No blocked users.'));
          }).catch(function(e){b.disabled=false;try{toast(e.message)}catch(x){}});
        };
        r.appendChild(n);r.appendChild(b);list.appendChild(r);
      });
    });
  }).catch(function(e){msg(e&&e.message||'Erreur')});
}
function settingsRow(){
  var c=document.querySelector('#scrParam .card');if(!c)return;
  var r=document.getElementById('tBlkRow');
  if(!r){
    r=document.createElement('div');r.className='row';r.id='tBlkRow';
    r.innerHTML='<span></span>';r.onclick=blockedDlg;
    var d=document.getElementById('tDelAcc');
    if(d&&d.parentNode===c)c.insertBefore(r,d);else c.appendChild(r);
  }
  var lab=L('Utilisateurs bloqués','Blocked users');
  if(r.firstChild.textContent!==lab)r.firstChild.textContent=lab;
}
var pend=false;
function tick(){pend=false;addBtn();decorate();settingsRow()}
new MutationObserver(function(){if(!pend){pend=true;requestAnimationFrame(tick)}})
  .observe(document.body,{childList:true,subtree:true});
tick();
})();
