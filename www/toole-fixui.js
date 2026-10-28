(function(){
if(window.__fixui)return;window.__fixui=1;
var EN=function(){return document.documentElement.lang==='en'};
function ask(msg,okTxt,fn){
  var old=document.getElementById('fxAsk');if(old)old.remove();
  var bg=document.createElement('div');bg.id='fxAsk';
  bg.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box';
  var box=document.createElement('div');
  box.style.cssText='background:#fff;color:#0b1b2b;border-radius:20px;padding:22px 20px 16px;max-width:340px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.4);font:16px/1.45 Roboto,system-ui,sans-serif';
  var t=document.createElement('div');t.textContent=msg;t.style.cssText='font-weight:600;font-size:17px;margin-bottom:20px;color:#0b1b2b';
  var row=document.createElement('div');row.style.cssText='display:flex;gap:10px;justify-content:flex-end';
  function btn(txt,bgc,col){var b=document.createElement('button');b.type='button';b.textContent=txt;b.style.cssText='border:0;border-radius:14px;padding:11px 18px;font-size:15px;font-weight:700;background:'+bgc+';color:'+col;return b}
  var no=btn(EN()?'Cancel':'Annuler','#eef3fb','#0b1b2b'),ok=btn(okTxt,'#e5484d','#fff');
  no.onclick=function(){bg.remove()};
  ok.onclick=function(){bg.remove();try{fn()}catch(e){}};
  bg.addEventListener('click',function(e){if(e.target===bg)bg.remove()});
  row.appendChild(no);row.appendChild(ok);box.appendChild(t);box.appendChild(row);bg.appendChild(box);document.body.appendChild(bg);
}
window.toolAsk=ask;
window.deleteGroup=function(){
  try{closeSheet()}catch(e){}
  ask(EN()?'Delete this group for all members?':'Supprimer ce groupe pour tous les membres ?',EN()?'Delete':'Supprimer',async function(){
    try{await api('/rest/v1/groups?id=eq.'+gCur.id,{method:'DELETE',headers:{Prefer:'return=minimal'}});toast(EN()?'Group deleted':'Groupe supprimé');loadGroups()}catch(e){toast(e.message)}
  });
};
window.leaveGroup=function(){
  try{closeSheet()}catch(e){}
  ask(EN()?'Leave this group?':'Quitter ce groupe ?',EN()?'Leave':'Quitter',async function(){
    try{await api('/rest/v1/group_members?group_id=eq.'+gCur.id+'&user_id=eq.'+me(),{method:'DELETE',headers:{Prefer:'return=minimal'}});toast(EN()?'Left the group':'Groupe quitté');loadGroups()}catch(e){toast(e.message)}
  });
};
function patchCx(){
  var b=document.getElementById('cxClear');if(!b||b.__fx)return;b.__fx=1;
  b.onclick=function(){ask(EN()?'Clear the whole conversation with CANIX?':'Effacer toute la conversation avec CANIX ?',EN()?'Clear':'Effacer',function(){
    localStorage.removeItem('toole_cxhist');var m=document.getElementById('cxMsgs');if(m)m.innerHTML='';
    if(typeof c2Row==='function')c2Row(EN()?'History cleared.':'Historique effacé.',false)})};
}
setInterval(patchCx,1500);
var tk=0;
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#v4chips button');if(b)tk++},true);
window.renderUnread=async function(){
  var my=tk,box=document.getElementById('recent');
  try{setChip(1)}catch(e){}
  if(!box)return;box.innerHTML='';
  function msg(t){var d=document.createElement('div');d.className='sx-s';d.style.padding='14px';d.textContent=t;box.appendChild(d)}
  try{
    var rows=await api('/rest/v1/messages?select=sender&receiver=eq.'+me()+'&read_at=is.null');
    if(my!==tk)return;
    var cnt={};rows.forEach(function(r){cnt[r.sender]=(cnt[r.sender]||0)+1});var ids=Object.keys(cnt);
    if(!ids.length){msg(EN()?'No unread messages.':'Aucun message non lu.');return}
    var pr=await api('/rest/v1/profiles?select=id,pseudo&id=in.('+ids.join(',')+')');
    if(my!==tk)return;
    box.innerHTML='';
    pr.forEach(function(p){box.appendChild(homeRow(p.pseudo||'?',EN()?'New messages':'Nouveaux messages',String(cnt[p.id]),function(){openChat(p.id,p.pseudo||'?')}))});
  }catch(e){if(my!==tk)return;box.innerHTML='';msg(EN()?'You are offline. Reconnect to see unread messages.':'Hors ligne. Reconnecte-toi pour voir les messages non lus.')}
};
var MAP=[[/^Compte vérifié ✓$/,'Account verified ✓'],[/^Compte vérifié( · .*)$/,'Account verified$1'],[/^Compte vérifié$/,'Account verified'],[/^Non vérifié$/,'Not verified']];
function tr(root){
  if(!EN())return;
  var w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT,null),n,list=[];
  while((n=w.nextNode())){if(n.nodeValue&&n.nodeValue.indexOf('vérifié')>-1)list.push(n)}
  list.forEach(function(n){var s=n.nodeValue.trim();for(var i=0;i<MAP.length;i++){if(MAP[i][0].test(s)){n.nodeValue=s.replace(MAP[i][0],MAP[i][1]);break}}});
}
var pend=0;
new MutationObserver(function(){if(pend)return;pend=1;requestAnimationFrame(function(){pend=0;tr()})}).observe(document.body,{childList:true,subtree:true,characterData:true});
tr();
})();
