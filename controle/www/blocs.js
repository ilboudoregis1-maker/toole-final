(function(){
var TAB='b',BL=[],RP=[],TI=0;
function nom(p,id){return p?String(p):String(id||'?').slice(0,8)}
function carteB(r){return '<div class="item" style="display:block;margin:10px 0"><div class="row"><span><b>'+esc(nom(r.blocker_pseudo,r.blocker))+'</b> a bloqué <b>'+esc(nom(r.blocked_pseudo,r.blocked))+'</b></span></div><span class="sub">'+fmt(r.created_at)+'</span></div>'}
function carteR(r){var c=(!r.message_id||r.source==='c'||r.source==='contact');
 return '<div class="item" style="display:block;margin:10px 0"><div class="row"><span><b>'+esc(nom(r.reporter_pseudo,r.reporter))+'</b> a signalé <b>'+esc(nom(r.reported_pseudo,r.reported))+'</b></span><span class="pill wa">'+(c?'Contact':'Message')+'</span></div><span class="sub">'+esc(r.reason||'—')+' · '+fmt(r.created_at)+'</span>'+(r.body&&!c?'<p class="sub" style="margin:6px 0 0">« '+esc(r.body)+' »</p>':'')+'</div>'}
function draw(){var el=$('bb');if(!el)return;
 $('bt1').textContent='Blocages ('+BL.length+')';$('bt2').textContent='Signalements ('+RP.length+')';
 $('bt1').className=TAB==='b'?'':'ghost';$('bt2').className=TAB==='r'?'':'ghost';
 el.innerHTML=TAB==='b'?(BL.length?BL.map(carteB).join(''):'<p class="sub">Aucun blocage.</p>'):(RP.length?RP.map(carteR).join(''):'<p class="sub">Aucun signalement.</p>')}
async function charger(){var el=$('bb');if(!el)return;
 try{BL=(await rpc('admin_blocages_list'))||[];RP=(await rpc('admin_reports_list'))||[]}catch(e){el.innerHTML='<p class="err">'+esc(e.message||e)+'</p>';return}
 draw()}
VIEWS.blocs=async function(el){
 el.innerHTML='<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">Blocages &amp; signalements</h2><div class="grid"><button id="bt1" data-act="btab" data-t="b">Blocages</button><button id="bt2" class="ghost" data-act="btab" data-t="r">Signalements</button></div><div id="bb"><p class="ok">Chargement…</p></div>';
 await charger();clearInterval(TI);TI=setInterval(function(){if(!$('bb')){clearInterval(TI);return}charger()},30000)};
ACT.btab=function(d){TAB=d.t;draw()};
})();
