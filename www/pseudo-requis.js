(function(){var busy=0,iv;
function ov(){var d=document.createElement('div');d.id='pseudoReq';
d.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:20px';
d.innerHTML='<div style="background:#fff;color:#111;border-radius:16px;padding:20px;max-width:360px;width:100%"><h3>Choisis ton pseudo</h3><p>Le nom que verront tes contacts (3 à 20 caractères).</p><input id="prIn" maxlength="20" placeholder="Ton pseudo" style="width:100%;padding:12px;border:1px solid #ccc;border-radius:10px;box-sizing:border-box"><p id="prErr" style="color:#b91c1c;min-height:18px"></p><button id="prOk" style="width:100%;padding:12px;border:0;border-radius:10px;background:#2f6fe0;color:#fff;font-weight:600">Valider</button></div>';
document.body.appendChild(d);
document.getElementById('prOk').onclick=async function(){var v=document.getElementById('prIn').value.trim(),e=document.getElementById('prErr');
if(v.length<3){e.textContent='3 caractères minimum';return}
try{await api('/rest/v1/profiles?id=eq.'+me(),{method:'PATCH',headers:{Prefer:'return=minimal'},body:JSON.stringify({pseudo:v})});d.remove();busy=0;clearInterval(iv);try{toast('Pseudo enregistré')}catch(x){}try{goList()}catch(x){}}catch(x){e.textContent=(x&&x.message)||'Erreur'}}}
async function check(){if(busy)return;var id;try{id=me()}catch(e){return}if(!id)return;
try{var r=await api('/rest/v1/profiles?select=pseudo&id=eq.'+id);if(r&&r[0]){if(!(r[0].pseudo||'').trim()){busy=1;ov()}else clearInterval(iv)}}catch(e){}}
iv=setInterval(check,4000)})();
