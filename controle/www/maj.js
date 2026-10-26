(function(){
var BASE='https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/apk/';
async function charger(){
  var el=$('mj');if(!el)return;
  try{var u=await rpc('latest_app_update',{});
    el.innerHTML=u&&u.version_code?'<div class="item" style="display:block"><b>Dernière publiée : '+esc(u.version_name)+'</b><span class="sub">Code '+esc(u.version_code)+' · '+fmt(u.created_at)+(u.mandatory?' · obligatoire':'')+'</span></div>':'<p class="sub">Aucune mise à jour publiée pour le moment.</p>'
  }catch(e){el.innerHTML='<p class="err">'+esc(e.message||e)+'</p>'}}
VIEWS.maj=async function(el){
  el.innerHTML='<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">Mise à jour</h2>'
  +'<div id="mj"><p class="ok">Chargement…</p></div>'
  +'<div class="sec"><h3>Publier une nouvelle version</h3>'
  +'<input id="mCode" inputmode="numeric" placeholder="Numéro de version (ex : 61)">'
  +'<input id="mName" placeholder="Nom de la version (ex : 1.2)">'
  +'<textarea id="mNotes" rows="4" placeholder="Nouveautés (une idée par ligne)"></textarea>'
  +'<input id="mUrl" placeholder="Lien de l\'APK (Supabase Storage, dossier apk)">'
  +'<label class="sub" style="display:block;margin:8px 0"><input type="checkbox" id="mMand" style="width:auto;margin-right:8px">Mise à jour obligatoire</label>'
  +'<button data-act="mpub">Publier la mise à jour</button><p id="mMsg" class="err"></p></div>';
  await charger()};
ACT.mpub=async function(){
  var code=parseInt($('mCode').value,10),nom=($('mName').value||'').trim(),notes=($('mNotes').value||'').trim(),url=($('mUrl').value||'').trim(),ob=$('mMand').checked;
  if(!(code>0)){msg('mMsg','Numéro de version invalide');return}
  if(!nom){msg('mMsg','Écris le nom de la version');return}
  if(url.indexOf(BASE)!==0||!/\.apk(\?.*)?$/i.test(url)){msg('mMsg','Le lien doit venir du dossier apk de Supabase et finir par .apk');return}
  if(!(await confirmPw('Publier la version '+nom+' pour tous les utilisateurs')))return;
  try{await rpc('admin_publish_update',{p_code:code,p_name:nom,p_notes:notes,p_url:url,p_mandatory:ob});
    await audit('maj_publiee',nom,{code:code,obligatoire:ob,par:ME.email});
    msg('mMsg','Mise à jour publiée ✓ (version '+nom+')',true);$('mCode').value='';$('mName').value='';$('mNotes').value='';$('mUrl').value='';charger()
  }catch(e){msg('mMsg',e.message||'Erreur')}};
})();
