(function(){
  if(localStorage.getItem('toole_consent')==='oui') return;
  var d=document.createElement('div');
  d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;padding:20px';
  d.innerHTML='<div style="background:#111;color:#fff;border-radius:16px;padding:20px;max-width:380px">'
   +'<h3>Bienvenue dans TÕÕLé : phase de test</h3>'
   +'<p>Acceptes-tu de participer à cette première étape ?</p>'
   +'<ul><li>Nous collectons ton <b>numéro de téléphone</b>, uniquement pour vérifier ton compte et sécuriser l\'accès.</li>'
   +'<li>Le <b>genre est libre</b> : tu choisis, ou tu ne précises rien.</li>'
   +'<li>Participation volontaire.</li></ul>'
   +'<button id="cOk">J\'accepte</button> <button id="cNo">Je refuse</button></div>';
  document.body.appendChild(d);
  document.getElementById('cOk').onclick=function(){localStorage.setItem('toole_consent','oui');d.remove()};
  document.getElementById('cNo').onclick=function(){d.querySelector('div').innerHTML='<p>Merci, tu peux fermer l\'application. Tu pourras participer plus tard.</p>'};
})();
