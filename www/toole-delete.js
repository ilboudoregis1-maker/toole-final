(function(){
if(window.__tdel)return;window.__tdel=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
function add(){
 var c=document.querySelector('#scrParam .card');
 if(!c||document.getElementById('tDelAcc'))return;
 var r=document.createElement('div');r.className='row';r.id='tDelAcc';
 r.innerHTML='<span style="color:#ef4444">Supprimer mon compte</span>';
 r.onclick=async function(){
  if(!confirm('Supprimer définitivement votre compte et vos données ?'))return;
  var s=null;try{s=JSON.parse(localStorage.getItem('toole_session'))}catch(e){}
  if(!s||!s.access_token)return alert('Reconnectez-vous puis réessayez.');
  var x=await fetch(U+'/rest/v1/rpc/delete_my_account',{method:'POST',
   headers:{apikey:K,Authorization:'Bearer '+s.access_token,'Content-Type':'application/json'},body:'{}'});
  if(x.ok){localStorage.clear();location.reload()}else alert('Échec ('+x.status+')');
 };
 c.appendChild(r);
}
new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();
