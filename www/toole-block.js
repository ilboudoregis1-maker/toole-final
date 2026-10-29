(function(){
if(window.__tblk)return;window.__tblk=1;
var A=window.api;if(typeof A!=='function')return;
var BL=new Set(),loadedFor=null;
function uid(){try{return me()}catch(e){return null}}
window.api=async function(path,opt){
  var r=await A.apply(this,arguments);
  try{
    var get=!opt||!opt.method||String(opt.method).toUpperCase()==='GET';
    if(get&&BL.size&&Array.isArray(r)&&/^\/rest\/v1\/(messages|group_messages)\?/.test(path))
      r=r.filter(function(m){return !(m&&BL.has(m.sender))});
  }catch(e){}
  return r;
};
async function load(){
  var u=uid();if(!u){loadedFor=null;return}
  if(loadedFor===u)return;
  try{var r=await A('/rest/v1/blocks?select=blocked');
    BL=new Set((r||[]).map(function(x){return x.blocked}));loadedFor=u}catch(e){}
}
setInterval(load,3000);load();
window.__tblkReload=function(){loadedFor=null;load()};
async function block(id,src){
  try{
    await A('/rest/v1/blocks',{method:'POST',headers:{Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify({blocker:uid(),blocked:id})});
    BL.add(id);closeSheet();
    if(typeof toast==='function')toast('Utilisateur bloqué');
    if(src==='g'&&typeof loadGroupMsgs==='function')loadGroupMsgs();
    else if(typeof loadMsgs==='function')loadMsgs();
  }catch(e){if(typeof toast==='function')toast('Échec du blocage')}
}
var RS=window.reportSheet;
if(typeof RS==='function')window.reportSheet=function(m,src,srcId){
  RS.apply(this,arguments);
  try{
    var cs=document.querySelectorAll('.sa.cc');var c=cs[cs.length-1];
    if(c&&m&&m.sender&&!c.parentNode.querySelector('.tblk')){
      var b=document.createElement('button');
      b.className='sa dz tblk';b.textContent='Bloquer cet utilisateur';
      b.onclick=function(){block(m.sender,src)};
      c.parentNode.insertBefore(b,c);
    }
  }catch(e){}
};
})();
