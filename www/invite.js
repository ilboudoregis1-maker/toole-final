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
