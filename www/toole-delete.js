(function(){
if(window.__tdel)return;window.__tdel=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
var D={
 fr:{row:'Supprimer mon compte',title:'Supprimer mon compte',warn:'Cette action est définitive. Votre compte, vos messages et vos données seront supprimés.',label:'Entrez votre mot de passe de connexion pour confirmer.',ph:'Mot de passe',cancel:'Annuler',ok:'Supprimer définitivement',need:'Entrez votre mot de passe.',bad:'Mot de passe incorrect.',fail:'Échec de la suppression. Réessayez.',relog:'Reconnectez-vous puis réessayez.',busy:'Suppression…'},
 en:{row:'Delete my account',title:'Delete my account',warn:'This cannot be undone. Your account, messages and data will be deleted.',label:'Enter your login password to confirm.',ph:'Password',cancel:'Cancel',ok:'Delete permanently',need:'Enter your password.',bad:'Incorrect password.',fail:'Deletion failed. Please try again.',relog:'Please log in again and retry.',busy:'Deleting…'}
};
function t(k){return D[localStorage.getItem('toole_lang')==='en'?'en':'fr'][k]}
function sess(){try{return JSON.parse(localStorage.getItem('toole_session'))}catch(e){return null}}
function post(path,token,body){
  var h={apikey:K,'Content-Type':'application/json'};
  if(token)h.Authorization='Bearer '+token;
  return fetch(U+path,{method:'POST',headers:h,body:JSON.stringify(body||{})});
}
function dialog(){
  var s=sess();
  if(!s||!s.access_token||!s.user||!s.user.email){alert(t('relog'));return}
  if(document.getElementById('tDelDlg'))return;
  var busy=false;
  var ov=document.createElement('div');ov.id='tDelDlg';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:2147483000;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto';
  var c=document.createElement('div');
  c.style.cssText='width:100%;max-width:380px;background:#fff;color:#111827;border-radius:16px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,.3);font:15px/1.45 sans-serif';
  c.innerHTML='<div style="font-size:18px;font-weight:700;color:#b42318;margin-bottom:8px"></div>'
   +'<div style="margin-bottom:12px;color:#374151"></div>'
   +'<div style="margin-bottom:6px;font-weight:600"></div>'
   +'<input type="password" autocomplete="current-password" style="width:100%;box-sizing:border-box;padding:12px;border:1px solid #d1d5db;border-radius:10px;font-size:16px;color:#111827;background:#fff">'
   +'<div style="min-height:20px;margin:8px 0;color:#b42318;font-size:14px"></div>'
   +'<div style="display:flex;gap:10px"><button type="button" style="flex:1;padding:12px;border:0;border-radius:10px;background:#f3f4f6;color:#111827;font-size:15px;font-weight:600"></button><button type="button" style="flex:1;padding:12px;border:0;border-radius:10px;background:#b42318;color:#fff;font-size:15px;font-weight:700"></button></div>';
  var d=c.children;
  d[0].textContent=t('title');d[1].textContent=t('warn');d[2].textContent=t('label');
  var inp=d[3],err=d[4],cancel=d[5].children[0],ok=d[5].children[1];
  inp.placeholder=t('ph');cancel.textContent=t('cancel');ok.textContent=t('ok');
  function close(){ov.remove()}
  cancel.onclick=close;
  ov.onclick=function(e){if(e.target===ov&&!busy)close()};
  async function go(){
    if(busy)return;
    err.textContent='';
    var pw=inp.value;
    if(!pw){err.textContent=t('need');return}
    busy=true;ok.disabled=true;cancel.disabled=true;ok.textContent=t('busy');
    try{
      var a=await post('/auth/v1/token?grant_type=password',null,{email:s.user.email,password:pw});
      var j=await a.json().catch(function(){return{}});
      if(!a.ok||!j.access_token){err.textContent=t('bad');throw 0}
      var x=await post('/rest/v1/rpc/delete_my_account',j.access_token,{});
      if(!x.ok){err.textContent=t('fail');throw 0}
      var lang=localStorage.getItem('toole_lang');
      localStorage.clear();
      if(lang)localStorage.setItem('toole_lang',lang);
      location.reload();
    }catch(e){
      if(!err.textContent)err.textContent=t('fail');
      busy=false;ok.disabled=false;cancel.disabled=false;ok.textContent=t('ok');
    }
  }
  ok.onclick=go;
  inp.onkeydown=function(e){if(e.key==='Enter')go()};
  ov.appendChild(c);document.body.appendChild(ov);
  setTimeout(function(){inp.focus()},100);
}
function add(){
  var c=document.querySelector('#scrParam .card');
  if(!c)return;
  var r=document.getElementById('tDelAcc');
  if(!r){
    r=document.createElement('div');r.className='row';r.id='tDelAcc';
    r.innerHTML='<span style="color:#b42318"></span>';
    r.onclick=dialog;c.appendChild(r);
  }
  var sp=r.firstChild;
  if(sp.textContent!==t('row'))sp.textContent=t('row');
}
new MutationObserver(add).observe(document.body,{childList:true,subtree:true});
add();
})();
