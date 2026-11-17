(function(){var busy=0,iv;
/*simple*/window.__pseudoOk=function(p){p=(p||"").trim();return p.length>=2&&p.length<=40};
window.__pseudoMsg="Prénom et nom : 2 à 40 caractères";
function ov(bad){var d=document.createElement('div');d.id='pseudoReq';
d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:20px';
d.innerHTML='<div style="background:#fff;color:#111;border-radius:16px;padding:20px;max-width:360px;width:100%"><h3>'+(bad?'Change ton nom d’utilisateur':'Choisis ton nom d’utilisateur')+'</h3><p>'+(bad?'Ton pseudo actuel n’est pas valide. ':'')+'Choisis le pseudo que tu veux (2 à 40 caractères).</p><input id="prIn" maxlength="40" placeholder="Ton pseudo" style="width:100%;padding:12px;border:1px solid #ccc;border-radius:10px;box-sizing:border-box"><p id="prErr" style="color:#b91c1c;min-height:18px"></p><button id="prOk" style="width:100%;padding:12px;border:0;border-radius:10px;background:#2f6fe0;color:#fff;font-weight:600">Valider</button></div>';
document.body.appendChild(d);
document.getElementById('prOk').onclick=async function(){var v=document.getElementById('prIn').value.trim(),e=document.getElementById('prErr');
if(!window.__pseudoOk(v)){e.textContent=window.__pseudoMsg;return}
try{var _av=await api('/rest/v1/rpc/pseudo_available',{method:'POST',body:JSON.stringify({p:v})});if(_av===false){e.textContent='Ce pseudo est déjà pris';return}}catch(x){}
try{await api('/rest/v1/profiles?id=eq.'+me(),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({pseudo:v,must_rename:false})});d.remove();busy=0;clearInterval(iv);try{toast('Pseudo enregistré')}catch(x){}try{goList()}catch(x){}}catch(x){e.textContent=(x&&x.message)||'Erreur'}}}
async function check(){if(busy)return;var id;try{id=me()}catch(e){return}if(!id)return;
try{var r=await api('/rest/v1/profiles?select=pseudo,must_rename&id=eq.'+id);if(r&&r[0]){var p=(r[0].pseudo||'').trim();if(!window.__pseudoOk(p)||r[0].must_rename){busy=1;ov(true)}else clearInterval(iv)}}catch(e){}}
iv=setInterval(check,4000)})();
