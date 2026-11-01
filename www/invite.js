(function(){
  var LIEN='https://github.com/ilboudoregis1-maker/toole-final/releases/latest';
  var MSG='Salut ! Je t\'invite à tester TÕÕLé (phase de test, 50 places). Télécharge l\'appli ici : '+LIEN;
  window.inviter=function(){
    window.location.href='sms:?body='+encodeURIComponent(MSG);
  };
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-invite]');
    if(b){e.preventDefault();window.inviter();}
  });
})();

(function(){
  function ajoute(){
    if(document.getElementById('btnInvite')) return;
    var b=document.createElement('button');
    b.id='btnInvite';
    b.setAttribute('data-invite','');
    b.textContent='👋 Inviter';
    b.style.cssText='position:fixed;right:16px;bottom:16px;z-index:9999;padding:12px 16px;border:0;border-radius:24px;background:#2f6fe0;color:#fff;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.4)';
    document.body.appendChild(b);
  }
  if(document.body) ajoute(); else document.addEventListener('DOMContentLoaded',ajoute);
})();
