(function(){
var VL=[],MSG='';
function lien(r,c){var ph=String(r.phone||'');MSG='Ton code de vérification TÕÕLé : '+c;
  if(r.channel==='whatsapp')return 'https://wa.me/'+ph.replace(/\D/g,'')+'?text='+encodeURIComponent(MSG);
  return 'sms:'+ph+'?body='+encodeURIComponent(MSG)}
function carte(r,i){var st=r.status||'pending';
  return '<div class="item" style="display:block;margin:10px 0"><div class="row"><span><b>'+esc(r.phone)+'</b></span><span class="pill '+(st==='verified'?'':'wa')+'">'+esc(st)+'</span></div>'
  +'<span class="sub">'+(r.channel==='whatsapp'?'WhatsApp':'SMS')+' · '+fmt(r.created_at)+(r.code?' · code '+esc(r.code):'')+'</span>'
  +(st==='verified'?'':'<input id="vc'+i+'" placeholder="CANI-0000" value="'+esc(r.code||'')+'" autocapitalize="characters">'
  +'<button class="ghost" data-act="vsug" data-i="'+i+'">Suggérer un code</button>'
  +'<button data-act="vsend" data-i="'+i+'">Enregistrer et envoyer</button>')+'</div>'}
async function charger(){try{VL=(await rpc('admin_verif_list'))||[]}catch(e){$('vb').innerHTML='<p class="err">'+esc(e.message||e)+'</p>';return}
  $('vb').innerHTML=VL.length?VL.map(carte).join(''):'<p class="sub">Aucune demande.</p>'}
VIEWS.verif=async function(el){
  el.innerHTML='<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">Vérifications</h2><button class="ghost" data-act="vref">Actualiser</button><div id="vb"><p class="ok">Chargement…</p></div>';
  await charger()};
ACT.vref=charger;
ACT.vsug=async function(d){try{var c=await rpc('admin_suggest_code');$('vc'+d.i).value=String(c).replace(/"/g,'')}catch(e){toast(e.message||'Erreur')}};
ACT.vsend=async function(d){var r=VL[d.i],c=($('vc'+d.i).value||'').trim().toUpperCase();
  if(!/^CANI-[A-Z0-9]{4}$/.test(c)){toast('Code invalide (ex : CANI-4821)');return}
  try{await rpc('admin_set_code',{p_id:r.id,p_code:c});audit('verif_code_envoye',r.phone,{canal:r.channel});
    var u=lien(r,c),w=r.channel==='whatsapp';
    sheet('<h3>Code enregistré ✓</h3><p class="sub">'+esc(r.phone)+' · '+esc(c)+'</p>'
      +'<a href="'+u+'" target="_blank" rel="noopener" style="display:block;text-align:center;padding:14px;margin:10px 0;border-radius:12px;background:#22d3ee;color:#04121f;font-weight:700;text-decoration:none">'+(w?'Ouvrir WhatsApp':'Ouvrir SMS')+'</a>'
      +'<button class="ghost" data-act="vcopy">Copier le message</button><button class="ghost" onclick="closeSheet()">Fermer</button>');
    charger()}catch(e){toast(e.message||'Erreur')}};
ACT.vcopy=function(){try{navigator.clipboard.writeText(MSG);toast('Message copié ✓')}catch(e){toast('Copie impossible')}};
})();
