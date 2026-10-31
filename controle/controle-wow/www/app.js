(function(){'use strict';
/* ===== Config ===== */
var URL_='https://jbjeqxubpqqypysfsubd.supabase.co',KEY='sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR';
var $=function(i){return document.getElementById(i)};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}}
function fmt(d){return d?new Date(d).toLocaleString('fr-FR'):'—'}
function fmtD(d){return d?new Date(d).toLocaleDateString('fr-FR'):'—'}
function fmtH(d){return d?new Date(d).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}):'—'}
function num(n){return Number(n||0).toLocaleString('fr-FR')}

/* ===== Session & API ===== */
var S=null,ME={email:'',role:null,mfa:false,aal:'aal1'},SQLOK=true;
function sess(){try{return JSON.parse(ls('ctl_s'))}catch(e){return null}}
function saveS(j){S=j;ls('ctl_s',JSON.stringify(j))}
function hdr(extra){var h={'Content-Type':'application/json',apikey:KEY};var s=sess();if(s&&s.access_token)h.Authorization='Bearer '+s.access_token;for(var k in (extra||{}))h[k]=extra[k];return h}
async function refresh(){var s=sess();if(!s||!s.refresh_token)throw new Error('Session expirée : reconnecte-toi');
  var r=await fetch(URL_+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},body:JSON.stringify({refresh_token:s.refresh_token})});
  var j=await r.json().catch(function(){return {}});if(!r.ok||!j.access_token){ls('ctl_s',null);throw new Error('Session expirée : reconnecte-toi')}saveS(j)}
async function api(method,path,body,extra){
  for(var t=0;t<2;t++){
    var r=await fetch(URL_+path,{method:method,headers:hdr(extra),body:body===undefined?undefined:JSON.stringify(body)});
    var txt=await r.text();var j=null;try{j=txt?JSON.parse(txt):null}catch(e){j={message:txt}}
    if(r.ok)return j;
    if(t===0&&(r.status===401||/JWT|expired/i.test(txt))){await refresh();continue}
    var e=new Error((j&&(j.message||j.msg||j.error_description||j.error))||('Erreur '+r.status));e.status=r.status;e.code=j&&j.code;throw e}
}
function rpc(n,a){return api('POST','/rest/v1/rpc/'+n,a||{})}
function missing(e){return e&&(e.code==='PGRST202'||e.status===404)}
async function fnCall(body){return api('POST','/functions/v1/smooth-function',body)}
async function audit(action,target,detail){try{await rpc('ctl_log',{p_action:action,p_target:target||null,p_detail:detail||{}})}catch(e){}}

/* ===== UI utils ===== */
var tTimer;function toast(m){var t=$('toast');t.textContent=m;t.classList.remove('hide');clearTimeout(tTimer);tTimer=setTimeout(function(){t.classList.add('hide')},3200)}
function sheet(html){$('sheetBody').innerHTML=html;$('sheet').classList.remove('hide')}
function closeSheet(){$('sheet').classList.add('hide');$('sheetBody').innerHTML=''}
$('sheet').addEventListener('click',function(e){if(e.target===$('sheet'))closeSheet()});
function bar(l,u,m,unit){var p=m?Math.min(100,u/m*100):0;return '<div class="row"><span>'+esc(l)+'</span><span>'+num(u)+' / '+num(m)+' '+esc(unit)+' ('+p.toFixed(1)+' %)</span></div><div class="bar '+(p>85?'k':p>65?'w':'')+'"><i style="width:'+p+'%"></i></div>'}
function spark(vals,color){if(!vals.length)return '';var mx=Math.max.apply(null,vals.concat([1])),w=100,h=40,st=w/Math.max(1,vals.length-1);
  var pts=vals.map(function(v,i){return (i*st).toFixed(1)+','+(h-3-(v/mx)*(h-8)).toFixed(1)}).join(' ');
  return '<svg viewBox="0 0 100 40" preserveAspectRatio="none"><polygon points="0,40 '+pts+' 100,40" fill="'+color+'" opacity=".15"/><polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>'}
function bars(labels,a,b){var mx=Math.max.apply(null,a.concat(b,[1])),n=labels.length,W=300,H=110,bw=W/n;
  var o='<svg class="chart" viewBox="0 0 '+W+' '+(H+14)+'" preserveAspectRatio="none">';
  for(var i=0;i<n;i++){var h1=a[i]/mx*(H-6),h2=b[i]/mx*(H-6);
    o+='<rect x="'+(i*bw+bw*.12)+'" y="'+(H-h1)+'" width="'+(bw*.36)+'" height="'+h1+'" rx="2" fill="#00e5ff"/><rect x="'+(i*bw+bw*.5)+'" y="'+(H-h2)+'" width="'+(bw*.36)+'" height="'+h2+'" rx="2" fill="#2f6fe0"/>';
    if(i%Math.ceil(n/7)===0)o+='<text x="'+(i*bw+bw/2)+'" y="'+(H+11)+'" font-size="8" fill="#6f93a8" text-anchor="middle">'+esc(labels[i])+'</text>'}
  return o+'</svg><p class="sub"><span style="color:#00e5ff">■</span> inscriptions &nbsp; <span style="color:#2f6fe0">■</span> sessions ouvertes</p>'}
function can(level){var r=ME.role||'lecteur';var rank={lecteur:0,support:1,super:2};return rank[r]>=rank[level]}
function csv(name,cols,rows){var l=[cols.join(';')].concat(rows.map(function(r){return r.map(function(c){var s=String(c==null?'':c);if(/^[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}).join(';')}));
  var a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent('﻿'+l.join('\n'));a.download=name+'.csv';document.body.appendChild(a);a.click();a.remove()}

/* Nouvelle confirmation (mot de passe) pour les actions critiques */
function confirmPw(titre){return new Promise(function(res){
  sheet('<h3>'+esc(titre)+'</h3><p class="sub">Action critique : confirme avec ton mot de passe.</p><input id="cpw" type="password" autocomplete="current-password" placeholder="Mot de passe"><p id="cerr" class="err"></p><div class="grid"><button class="ghost" id="cno">Annuler</button><button class="danger" id="cyes">Confirmer</button></div>');
  $('cno').onclick=function(){closeSheet();res(false)};
  $('cyes').onclick=async function(){try{var r=await fetch(URL_+'/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},body:JSON.stringify({email:ME.email,password:$('cpw').value})});
    if(!r.ok){$('cerr').textContent='Mot de passe incorrect';return}closeSheet();res(true)}catch(e){$('cerr').textContent=e.message}}})}

/* ===== Connexion + 2FA ===== */
var FACT=null;
async function userInfo(){var u=await api('GET','/auth/v1/user');ME.email=u.email||'';var f=(u.factors||[]).filter(function(x){return x.factor_type==='totp'&&x.status==='verified'});ME.mfa=f.length>0;FACT=f[0]||null;return u}
async function afterLogin(){
  try{var ok=await rpc('is_admin',{});if(ok!==true){$('msg').textContent='Accès refusé : compte non administrateur';ls('ctl_s',null);return}
    await userInfo();
    try{ME.role=await rpc('ctl_my_role',{});SQLOK=true}catch(e){SQLOK=!missing(e);ME.role='super'}
    if(!ME.role)ME.role='lecteur';
    $('login').classList.add('hide');$('app').classList.remove('hide');$('who').textContent=ME.email+' · '+ME.role;
    route();startWatch();bumpIdle()}catch(e){$('msg').textContent=e.message}}
$('go').onclick=async function(){$('msg').textContent='';var em=$('em').value.trim(),pw=$('pw').value;if(!em||!pw){$('msg').textContent="Écris l'e-mail et le mot de passe";return}
  try{var r=await fetch(URL_+'/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json',apikey:KEY},body:JSON.stringify({email:em,password:pw})});var j=await r.json();
    if(!j.access_token){$('msg').textContent=j.msg||j.error_description||'Connexion impossible';return}
    saveS(j);$('pw').value='';var ok=await rpc('is_admin',{});if(ok!==true){$('msg').textContent='Accès refusé : compte non administrateur';ls('ctl_s',null);return}
    await userInfo();if(ME.mfa){$('stepPw').classList.add('hide');$('step2fa').classList.remove('hide');$('code').focus()}else afterLogin()}
  catch(e){$('msg').textContent=e.message}};
$('go2').onclick=async function(){$('msg').textContent='';try{
  var ch=await api('POST','/auth/v1/factors/'+FACT.id+'/challenge',{});
  var j=await api('POST','/auth/v1/factors/'+FACT.id+'/verify',{challenge_id:ch.id,code:$('code').value.trim()});saveS(j);$('code').value='';afterLogin()}
  catch(e){$('msg').textContent='Code invalide'}};
function logout(){ls('ctl_s',null);location.reload()}

/* Déconnexion automatique après inactivité */
var idleT;function idleMin(){return parseInt(ls('ctl_idle'),10)||10}
function bumpIdle(){clearTimeout(idleT);if(!sess())return;idleT=setTimeout(function(){toast('Session fermée (inactivité)');setTimeout(logout,900)},idleMin()*60000)}
['click','touchstart','keydown'].forEach(function(ev){document.addEventListener(ev,function(){if(!$('app').classList.contains('hide'))bumpIdle()},{passive:true})});

/* ===== Navigation ===== */
var VIEWS={},CUR='home',timers=[];
function go(v){location.hash='#'+v}
function route(){var v=(location.hash||'#home').slice(1);if(!VIEWS[v])v='home';if($('app').classList.contains('hide'))return;CUR=v;timers.forEach(clearInterval);timers=[];
  var el=$('view');el.innerHTML='<p class="ok">Chargement…</p>';Promise.resolve(VIEWS[v](el)).catch(function(e){el.innerHTML=head(v)+'<p class="err">'+esc(e.message||e)+'</p>'})}
window.addEventListener('hashchange',route);
function head(t){var T={dash:'Tableau de bord',sec:'Sécurité',users:'Utilisateurs',alerts:"Centre d'alertes",audit:"Journal d'audit",tech:'Supervision technique',lists:'Données',misc:'Autres'};return '<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">'+esc(T[t]||t)+'</h2>'}
document.addEventListener('click',function(e){var g=e.target.closest&&e.target.closest('[data-go]');if(g){go(g.dataset.go);return}
  var a=e.target.closest&&e.target.closest('[data-act]');if(a&&ACT[a.dataset.act])ACT[a.dataset.act](a.dataset)});
var ACT={};

/* ----- Accueil ----- */
VIEWS.home=async function(el){
  var T=[['dash','📊','Tableau de bord'],['users','👥','Utilisateurs'],['sec','🛡️','Sécurité'],['alerts','🔔',"Alertes"],['audit','📜','Audit'],['tech','🖥️','Supervision'],['list:statuts','🟦','Statuts'],['list:messages','💬','Messages'],['list:reception','📥','Réception'],['verif','📲','Vérifications'],['misc','⚙️','Autres']];
  el.innerHTML='<div class="tiles">'+T.map(function(t){return '<button class="tile" data-go="'+t[0]+'"><b>'+t[1]+'</b>'+esc(t[2])+(t[0]==='alerts'?'<span class="badge hide" id="bAlert"></span>':'')+'</button>'}).join('')+'</div><button class="ghost" data-act="out" style="margin-top:14px">Déconnexion</button>';
  setBadge()};
ACT.out=logout;
VIEWS['list:statuts']=function(el){return listView(el,'statuts')};VIEWS['list:messages']=function(el){return listView(el,'messages')};VIEWS['list:reception']=function(el){return listView(el,'reception')};

/* ----- Tableau de bord temps réel ----- */
VIEWS.dash=async function(el){
  async function draw(){
    var r={},u={},ser=[],errs=[];
    try{r=(await rpc('bilan_resume',{}))[0]||{}}catch(e){errs.push(e.message)}
    try{u=(await rpc('bilan_usage',{}))[0]||{}}catch(e){}
    try{ser=await rpc('ctl_series',{jours:14})}catch(e){}
    var ins=ser.map(function(x){return +x.inscriptions}),ses=ser.map(function(x){return +x.sessions});
    el.innerHTML=head('dash')+'<p class="sub" id="upd">Mis à jour '+fmtH(new Date())+' · actualisation auto toutes les 30 s</p>'+
     '<div class="grid" style="margin-bottom:12px">'+
      '<div class="card"><b>'+num(r.comptes||u.total_comptes)+'</b><span>Comptes inscrits</span>'+spark(ins,'#00e5ff')+'</div>'+
      '<div class="card"><b>'+num(u.mau)+'</b><span>Actifs (30 jours)</span>'+spark(ses,'#2f6fe0')+'</div>'+
      '<div class="card"><b>'+num(r.messages_jour)+'</b><span>Messages aujourd\'hui</span></div>'+
      '<div class="card"><b>'+num(r.groupes_jour)+'</b><span>Groupes aujourd\'hui</span></div>'+
      '<div class="card"><b>'+num(r.vocaux_attente)+'</b><span>Vocaux en attente</span></div>'+
      '<div class="card"><b>'+(ser.length?num(ser[ser.length-1].inscriptions):'—')+'</b><span>Nouveaux comptes (jour)</span></div></div>'+
     (ser.length?'<div class="sec"><h3>14 derniers jours</h3>'+bars(ser.map(function(x){return fmtD(x.jour).slice(0,5)}),ins,ses)+'</div>':'')+
     '<div class="sec"><h3>Ressources</h3>'+(u.base_mo!=null?bar('Base de données',u.base_mo||0,u.base_max||500,'Mo')+bar('Stockage vocaux',u.stockage_mo||0,u.stock_max||1024,'Mo')+bar('Utilisateurs actifs (30 j)',u.mau||0,50000,''):'<p class="sub">—</p>')+'</div>'+
     '<div class="sec"><h3>Top expéditeurs</h3><select id="jours"><option value="1">24 h</option><option value="7" selected>7 jours</option><option value="30">30 jours</option></select><div id="tops"></div></div>'+
     (errs.length?'<p class="err">'+esc(errs[0])+'</p>':'');
    $('jours').onchange=tops;tops()}
  async function tops(){try{var rows=await rpc('bilan_top_expediteurs',{jours:parseInt($('jours').value,10)});$('tops').innerHTML=rows.length?rows.map(function(x){return '<div class="row"><span>'+esc(x.pseudo)+'</span><span>'+num(x.messages)+'</span></div>'}).join(''):'<p class="sub">Aucun envoi sur cette période.</p>'}catch(e){$('tops').innerHTML='<p class="err">'+esc(e.message)+'</p>'}}
  await draw();timers.push(setInterval(function(){if(!document.hidden&&CUR==='dash')draw()},30000))};

/* ----- Utilisateurs ----- */
var USERS=[];
VIEWS.users=async function(el){
  el.innerHTML=head('users')+'<input id="q" placeholder="Rechercher par pseudo ou e-mail…"><div id="ul"><p class="ok">Chargement…</p></div>';
  USERS=await rpc('ctl_comptes',{});
  try{var _vm=await rpc('ctl_verif_map',{}),_mp={};(_vm||[]).forEach(function(x){if(x.pseudo&&(!_mp[x.pseudo]||x.phone))_mp[x.pseudo]=x});USERS.forEach(function(u){var x=_mp[u.pseudo];if(x){u.phone=x.phone;u.verified=x.verified;u.canal=x.channel}})}catch(e){}
  function show(){var f=($('q').value||'').toLowerCase().trim();var rs=USERS.filter(function(u){return !f||((u.pseudo||'')+' '+(u.email||'')+' '+(u.phone||'')+(u.verified?' #verifie':' #nonverifie')).toLowerCase().indexOf(f)>-1});
    $('ul').innerHTML='<p class="sub">'+rs.length+' compte(s)</p>'+rs.slice(0,100).map(function(u){var i=USERS.indexOf(u);return '<button class="item" data-act="user" data-i="'+i+'">'+esc(u.pseudo||'—')+'<span class="sub">'+esc(u.email||'—')+(u.phone?' · '+esc(u.phone):'')+(u.verified?' · ✓ vérifié':' · non vérifié')+' · créé '+fmtD(u.cree_le)+' · connexion '+fmtD(u.derniere_connexion)+'</span></button>'}).join('')}
  $('q').oninput=show;show()};
ACT.user=async function(d){var u=USERS[+d.i];if(!u)return;
  sheet('<h3>'+esc(u.pseudo||u.email)+'</h3><p class="sub">'+esc(u.email||'')+(u.phone?' · '+esc(u.phone)+' ('+esc(u.canal||'')+')':'')+(u.verified?' · ✓ vérifié':' · non vérifié')+'</p><div id="ud"><p class="ok">Chargement…</p></div>');
  var uid=null;try{uid=await rpc('id_by_pseudo',{p:u.pseudo})}catch(e){}
  if(!uid){$('ud').innerHTML='<p class="err">Compte introuvable</p>';return}
  var st={};try{st=(await rpc('admin_statut',{uid:uid}))[0]||{}}catch(e){}
  var sus=st.suspendu_jusqu&&new Date(st.suspendu_jusqu)>new Date();
  var acts=can('support')?'<select id="mod"><option value="">Modèle d\'avertissement…</option><option>Merci de respecter les règles de la communauté.</option><option>Contenu inapproprié détecté : un nouvel écart entraînera une suspension.</option><option>Activité inhabituelle sur ton compte : vérifie ta sécurité.</option></select><textarea id="txt" rows="2" placeholder="Texte de l\'avertissement"></textarea><button data-act="warn">Avertir</button>'+
     '<div class="grid"><input id="jr" type="number" min="1" value="7"><button data-act="susp">Suspendre (jours)</button></div>'+
     '<button class="ghost" data-act="lev">Lever suspension / blocage</button>':'<p class="sub">Rôle « lecteur » : consultation seulement.</p>';
  if(can('super'))acts+='<button class="danger" data-act="bloc">Bloquer le compte</button><button class="ghost" data-act="rst">Réinitialiser le mot de passe</button>';
  $('ud').innerHTML='<div class="row"><span>État</span><span>'+(sus?'<span class="pill ko">suspendu → '+fmt(st.suspendu_jusqu)+'</span>':'<span class="pill">actif</span>')+'</span></div><div class="row"><span>Avertissements</span><span>'+num(st.avertissements)+'</span></div><div class="row"><span>Inscription</span><span>'+fmtD(u.cree_le)+'</span></div><div class="row"><span>Dernière connexion</span><span>'+fmt(u.derniere_connexion)+'</span></div>'+acts+'<p id="um" class="err"></p><button class="ghost" data-act="close">Fermer</button>';
  var m=$('mod');if(m)m.onchange=function(){$('txt').value=m.value};
  ACT._uid=uid;ACT._u=u};
ACT.close=closeSheet;
function um(t,ok){var e=$('um');if(e){e.className=ok?'ok':'err';e.textContent=t}}
async function doAct(name,fn,label,crit){var uid=ACT._uid,u=ACT._u;
  if(crit&&!(await confirmPw(label+' : '+(u.pseudo||u.email))))return;
  try{await fn(uid);await audit(name,u.pseudo||u.email,{par:ME.email});toast(label+' ✓')}catch(e){var el=$('um');if(el)um(e.message);else toast(e.message)}}
ACT.warn=function(){var t=($('txt').value||'').trim();if(!t){um('Choisis un modèle ou écris un texte');return}doAct('avertir',function(uid){return rpc('admin_avertir',{uid:uid,texte:t})},'Avertissement envoyé')};
ACT.susp=function(){var j=parseInt($('jr').value,10)||7;doAct('suspendre',function(uid){return rpc('admin_suspendre',{uid:uid,jours:j})},'Compte suspendu '+j+' j',true)};
ACT.bloc=function(){doAct('bloquer',function(uid){return rpc('admin_bloquer',{uid:uid})},'Compte bloqué',true)};
ACT.lev=function(){doAct('lever',function(uid){return rpc('admin_lever',{uid:uid})},'Suspension levée')};
ACT.rst=function(){var u=ACT._u;sheet('<h3>Nouveau mot de passe</h3><p class="sub">'+esc(u.pseudo||u.email)+'</p><input id="np" type="password" placeholder="12 caractères minimum" autocomplete="new-password"><p id="um" class="err"></p><div class="grid"><button class="ghost" data-act="close">Annuler</button><button class="danger" data-act="rst2">Valider</button></div>')};
ACT.rst2=async function(){var u=ACT._u,p=$('np').value;if(p.length<12){um('12 caractères minimum');return}
  if(!(await confirmPw('Réinitialiser le mot de passe')))return;
  try{await fnCall({action:'reset',pseudo:u.pseudo,password:p});await audit('reset_mdp',u.pseudo,{par:ME.email});closeSheet();toast('Mot de passe réinitialisé')}catch(e){sheet('<p class="err">'+esc(e.message)+'</p><button class="ghost" data-act="close">Fermer</button>')}};

/* ----- Alertes ----- */
var DONE=[];try{DONE=JSON.parse(ls('ctl_done')||'[]')}catch(e){}
async function loadAlerts(){var L=[];
  try{(await rpc('bilan_alertes',{seuil_comptes:20,seuil_msgs:100,seuil_groupes:5})).forEach(function(a){L.push({id:'a|'+a.alerte+'|'+a.pseudo,n:'m',t:String(a.alerte),d:'Compte : '+a.pseudo,q:a.cree_le||null,s:'Activité'})})}catch(e){}
  try{(await rpc('bilan_signalements',{})).forEach(function(r){L.push({id:'s|'+r.cree_le+'|'+r.auteur,n:'m',t:'Signalement : '+r.motif,d:'Par '+(r.auteur||'?')+(r.copie?' · '+r.copie:''),q:r.cree_le,s:'Signalement'})})}catch(e){}
  try{(await rpc('ctl_anomalies',{})).forEach(function(x){L.push({id:'n|'+x.type+'|'+x.sujet,n:x.niveau==='haut'?'h':'m',t:x.type,d:x.sujet+' — '+x.detail,q:x.quand,s:'Sécurité'})})}catch(e){}
  L.sort(function(a,b){return (a.n==='h'?0:1)-(b.n==='h'?0:1)||new Date(b.q||0)-new Date(a.q||0)});return L}
VIEWS.alerts=async function(el){var L=await loadAlerts();ALERTS=L;
  var open=L.filter(function(x){return DONE.indexOf(x.id)<0}),done=L.filter(function(x){return DONE.indexOf(x.id)>-1});
  function it(x,i){return '<button class="item '+x.n+(DONE.indexOf(x.id)>-1?' done':'')+'" data-act="alert" data-i="'+i+'">'+esc(x.t)+' <span class="pill '+(x.n==='h'?'ko':'wa')+'">'+(x.n==='h'?'critique':'à surveiller')+'</span><span class="sub">'+esc(x.d)+' · '+esc(x.s)+' · '+fmt(x.q)+'</span></button>'}
  el.innerHTML=head('alerts')+'<p class="sub">'+open.length+' alerte(s) ouverte(s). Touche une alerte pour la marquer « traitée » (consigné dans le journal d\'audit).</p>'+(open.length?open.map(function(x){return it(x,L.indexOf(x))}).join(''):'<div class="sec"><p class="ok">Aucune alerte ouverte ✓</p></div>')+(done.length?'<h2>Historique des décisions</h2>'+done.map(function(x){return it(x,L.indexOf(x))}).join(''):'')};
var ALERTS=[];
ACT.alert=async function(d){var x=ALERTS[+d.i];if(!x||DONE.indexOf(x.id)>-1)return;if(!can('support')){toast('Rôle insuffisant');return}
  DONE.push(x.id);ls('ctl_done',JSON.stringify(DONE.slice(-300)));await audit('alerte_traitee',x.t,{detail:x.d,par:ME.email});setBadge();route()};

/* ----- Audit ----- */
VIEWS.audit=async function(el){var rows=[],legacy=false;
  try{rows=await rpc('ctl_audit_list',{lim:300})}catch(e){if(!missing(e))throw e;legacy=true;rows=(await rpc('bilan_journal',{})).map(function(r){return {at:r.cree_le,actor_mail:'',action:r.action,target:r.cible,detail:{}}})}
  AUD=rows;
  el.innerHTML=head('audit')+(legacy?'<div class="sec"><p class="err">Journal inviolable non installé : lance supabase/security.sql. Affichage de l\'ancien journal.</p></div>':'<div class="grid"><button class="ghost" data-act="verify">🔗 Vérifier l\'intégrité</button><button class="ghost" data-act="auditcsv">Exporter CSV</button></div><p id="vr" class="sub"></p>')+
   '<div class="sec">'+(rows.length?rows.map(function(r){return '<div class="row"><span>'+esc(r.action)+'<br><small>'+esc(r.actor_mail||'')+' · '+esc(r.target||'')+'</small></span><span>'+fmt(r.at)+'</span></div>'}).join(''):'<p class="sub">Journal vide.</p>')+'</div>'};
var AUD=[];
ACT.verify=async function(){try{var r=(await rpc('ctl_audit_verify',{}))[0];$('vr').className=r.ok?'ok':'err';$('vr').textContent=r.ok?('Chaîne intacte ✓ ('+r.lignes+' entrées)'):('⚠ Rupture détectée à l\'entrée #'+r.premiere_rupture)}catch(e){$('vr').className='err';$('vr').textContent=e.message}};
ACT.auditcsv=function(){csv('audit',['Date','Acteur','Action','Cible'],AUD.map(function(r){return [fmt(r.at),r.actor_mail,r.action,r.target]}))};

/* ----- Sécurité ----- */
VIEWS.sec=async function(el){
  var rls=null,anom=[],sessions=[],tech=null,ver=null,e1=null;
  try{rls=await rpc('ctl_rls_report',{})}catch(e){e1=e}
  try{anom=await rpc('ctl_anomalies',{})}catch(e){}
  try{sessions=await rpc('ctl_sessions',{lim:30})}catch(e){}
  try{ver=(await rpc('ctl_audit_verify',{}))[0]}catch(e){}
  await userInfo();
  var noRls=rls?rls.filter(function(t){return !t.rls}):[];
  var checks=[
   ['Authentification à deux facteurs (admin)',ME.mfa,'Active la 2FA ci-dessous'],
   ['Session actuelle vérifiée en 2FA',ME.mfa,'—'],
   ['Rôles & contrôle côté serveur installés',!e1&&SQLOK,'Exécute supabase/security.sql'],
   ['Toutes les tables publiques protégées (RLS)',rls?noRls.length===0:false,rls?(noRls.length+' table(s) sans RLS : '+noRls.map(function(t){return t.tbl}).join(', ')):'Rapport indisponible'],
   ["Journal d'audit inviolable intact",ver?ver.ok:false,ver?'Rupture détectée':'Journal non installé'],
   ['Aucune anomalie critique ouverte',!anom.some(function(a){return a.niveau==='haut'}),anom.filter(function(a){return a.niveau==='haut'}).length+' anomalie(s) critique(s)']];
  var okN=checks.filter(function(c){return c[1]}).length,pct=Math.round(okN/checks.length*100);
  el.innerHTML=head('sec')+
   '<div class="sec score"><div class="ring" style="--p:'+pct+';--c:'+(pct>=80?'#2ee59d':pct>=50?'#ffb020':'#ff5d6c')+'"><b>'+pct+'</b></div><div><h3>Score de protection</h3><p class="sub" style="margin:0">Calculé à partir de contrôles réels, pas d\'un chiffre décoratif.</p></div></div>'+
   '<div class="sec">'+checks.map(function(c){return '<div class="chk"><i>'+(c[1]?'✅':'⚠️')+'</i><span>'+esc(c[0])+(c[1]?'':'<br><span class="sub">'+esc(c[2])+'</span>')+'</span></div>'}).join('')+'</div>'+
   '<h2>Authentification forte</h2><div class="sec">'+(ME.mfa?'<p class="ok">2FA active ✓</p><button class="ghost" data-act="mfaoff">Désactiver la 2FA</button>':'<p class="sub">Mot de passe + code à usage unique (Google Authenticator, Aegis, etc.).</p><button data-act="mfaon">Activer la 2FA</button>')+
   '<div class="row"><span>Déconnexion automatique</span><span><select id="idle" style="width:auto;margin:0"><option value="5">5 min</option><option value="10">10 min</option><option value="30">30 min</option></select></span></div></div>'+
   '<h2>Anomalies détectées</h2><div class="sec">'+(anom.length?anom.map(function(a){return '<div class="item '+(a.niveau==='haut'?'h':'m')+'">'+esc(a.type)+'<span class="sub">'+esc(a.sujet)+' — '+esc(a.detail)+'</span></div>'}).join(''):'<p class="ok">Aucune anomalie.</p>')+'</div>'+
   '<h2>Sessions récentes</h2><div class="sec">'+(sessions.length?sessions.map(function(s){return '<div class="row"><span>'+esc(s.email)+'<br><small>'+esc(s.ip||'')+' · '+esc((s.appareil||'').slice(0,40))+'</small></span><span>'+fmt(s.maj_le)+'</span></div>'}).join(''):'<p class="sub">—</p>')+'</div>'+
   '<h2>Protection de la vie privée</h2><div class="sec priv"><div class="ic">🔒</div><p style="margin:0;font-size:14px">Contrôle ne porte que sur les métadonnées techniques et les événements de sécurité. Les contenus de messages privés ne sont jamais lus ; si TÕÕLé utilise le chiffrement de bout en bout, ce panneau ne peut pas le contourner.</p></div>';
  var s=$('idle');if(s){s.value=String(idleMin());s.onchange=function(){ls('ctl_idle',s.value);bumpIdle();toast('Délai enregistré')}}};
ACT.mfaon=async function(){try{var f=await api('POST','/auth/v1/factors',{factor_type:'totp',friendly_name:'controle-'+Date.now(),issuer:'TOOLE Controle'});ACT._f=f;
  sheet('<h3>Activer la 2FA</h3><p class="sub">Scanne le QR avec ton application d\'authentification, ou saisis la clé.</p><img class="qr" alt="QR" src="'+esc(f.totp.qr_code)+'"><p class="mono">'+esc(f.totp.secret)+'</p><input id="mc" inputmode="numeric" maxlength="6" placeholder="Code à 6 chiffres"><p id="um" class="err"></p><div class="grid"><button class="ghost" data-act="close">Annuler</button><button data-act="mfaok">Activer</button></div>')}catch(e){toast(e.message)}};
ACT.mfaok=async function(){try{var f=ACT._f;var ch=await api('POST','/auth/v1/factors/'+f.id+'/challenge',{});var j=await api('POST','/auth/v1/factors/'+f.id+'/verify',{challenge_id:ch.id,code:$('mc').value.trim()});saveS(j);await audit('2fa_activee',ME.email,{});closeSheet();toast('2FA activée ✓');route()}catch(e){um('Code invalide')}};
ACT.mfaoff=async function(){if(!(await confirmPw('Désactiver la 2FA')))return;try{await api('DELETE','/auth/v1/factors/'+FACT.id);await audit('2fa_desactivee',ME.email,{});toast('2FA désactivée');route()}catch(e){toast(e.message)}};

/* ----- Supervision technique ----- */
async function probe(path,opt){var t=performance.now();try{var r=await fetch(URL_+path,{headers:hdr(),method:opt&&opt.method||'GET',body:opt&&opt.body});return {ok:r.status<500,ms:Math.round(performance.now()-t),st:r.status}}catch(e){return {ok:false,ms:Math.round(performance.now()-t),st:'réseau'}}}
VIEWS.tech=async function(el){
  async function draw(){
    var ps=await Promise.all([probe('/auth/v1/health'),probe('/rest/v1/',{}),probe('/functions/v1/smooth-function',{method:'OPTIONS'})]);
    var names=['Auth (connexion)','API base de données','Fonctions (comptes)'];
    var tech=null,u={},rls=null;try{tech=(await rpc('ctl_tech',{}))[0]}catch(e){}try{u=(await rpc('bilan_usage',{}))[0]||{}}catch(e){}
    var pill=function(p){return '<span class="pill '+(p.ok?(p.ms>1500?'wa':''):'ko')+'">'+(p.ok?'OK':'HS')+' · '+p.ms+' ms</span>'};
    el.innerHTML=head('tech')+'<p class="sub">Sondes exécutées maintenant depuis ton téléphone · '+fmtH(new Date())+'</p><div class="sec"><h3>Disponibilité</h3>'+ps.map(function(p,i){return '<div class="row"><span>'+names[i]+'</span>'+pill(p)+'</div>'}).join('')+'</div>'+
     '<div class="sec"><h3>Base de données & stockage</h3>'+(u.base_mo!=null?bar('Base de données',u.base_mo,u.base_max||500,'Mo')+bar('Stockage',u.stockage_mo||0,u.stock_max||1024,'Mo'):'<p class="sub">—</p>')+
      (tech?'<div class="row"><span>Connexions SQL</span><span>'+tech.connexions+' / '+tech.connexions_max+'</span></div><div class="row"><span>Sessions actives</span><span>'+num(tech.sessions_actives)+'</span></div><div class="row"><span>Tables sans RLS</span><span>'+(tech.tables_sans_rls?'<span class="pill ko">'+tech.tables_sans_rls+'</span>':'<span class="pill">0</span>')+'</span></div>':'<p class="sub">Installe supabase/security.sql pour les métriques serveur.</p>')+'</div>'+
     '<div class="sec"><h3>Quotas</h3>'+bar('Utilisateurs actifs mensuels',u.mau||0,50000,'')+'<p class="sub">Trafic sortant (egress), logs d\'erreurs et sauvegardes ne sont pas lisibles en SQL : Supabase → Settings → Usage / Database → Backups.</p></div>';
    $('liveT').textContent=ps.every(function(p){return p.ok})?'En ligne':'Dégradé';$('live').className='pill live'+(ps.every(function(p){return p.ok})?'':' wa')}
  await draw();timers.push(setInterval(function(){if(!document.hidden&&CUR==='tech')draw()},30000))};

/* ----- Listes (statuts, messages, réception) ----- */
var LCFG={
 statuts:{t:'Statuts (sans contenu)',cols:['Date','Heure','Pseudo','E-mail','Expire le'],load:async function(){return (await rpc('ctl_statuts',{})).map(function(x){return [fmtD(x.date_pub),fmtH(x.date_pub),x.pseudo||'—',x.email||'—',fmtD(x.expire)]})}},
 messages:{t:'Messages (sans contenu)',cols:['Date','Heure','Type','Expéditeur','E-mail exp.','Destinataire','Lu'],load:async function(){return (await rpc('ctl_messages',{})).map(function(x){return [fmtD(x.date_envoi),fmtH(x.date_envoi),x.type,x.expediteur||'—',x.email_exp||'—',x.destinataire||'—',x.lu===null?'—':(x.lu?'Lu':'Non lu')]})}},
 reception:{t:'Réception',cols:['Type','Date','Motif / montant','Pseudo','Détail'],load:async function(){var rep=await rpc('bilan_signalements',{});var dons=[];try{dons=await api('GET','/rest/v1/donations?select=created_at,montant,operateur,telephone,reference,statut&order=created_at.desc')}catch(e){}
   return rep.map(function(x){return ['Signalement',fmtD(x.cree_le),x.motif,x.auteur||'—',x.copie||'']}).concat(dons.map(function(d){return ['Don',fmtD(d.created_at),d.montant+' FCFA · '+d.operateur,d.telephone||'—',d.statut]}))}}};
var LDATA=[],LK='';
async function listView(el,k){var c=LCFG[k];LK=k;el.innerHTML='<button class="back" data-go="home">← Retour</button><h2 style="margin-top:4px">'+esc(c.t)+'</h2><input id="flt" placeholder="Rechercher…"><button class="ghost" data-act="lcsv">Exporter CSV</button><div id="lb"><p class="ok">Chargement…</p></div>';
  LDATA=await c.load();function d(){var f=($('flt').value||'').toLowerCase();var rs=LDATA.filter(function(r){return !f||r.join(' ').toLowerCase().indexOf(f)>-1});
    $('lb').innerHTML=rs.length?'<div class="sec">'+rs.slice(0,300).map(function(r){return '<div class="row" style="flex-wrap:wrap">'+r.map(function(v,i){return '<span><small>'+esc(c.cols[i])+' : </small>'+esc(v)+'</span>'}).join('')+'</div>'}).join('')+'</div><p class="sub">'+rs.length+' résultat(s)</p>':'<p class="sub">Aucune donnée.</p>'}
  $('flt').oninput=d;d()}
ACT.lcsv=function(){csv(LK,LCFG[LK].cols,LDATA);audit('export_csv',LK,{par:ME.email})};

/* ----- Autres : annonce + création de compte ----- */
VIEWS.misc=async function(el){
  el.innerHTML=head('misc')+(can('super')?
   '<div class="sec"><h3>Annonce officielle</h3><textarea id="annTxt" rows="3" maxlength="1000" placeholder="Texte de l\'annonce"></textarea><select id="annDur"><option value="6">6 h</option><option value="24" selected>24 h</option><option value="72">3 jours</option></select><div class="grid"><button data-act="annpub">Publier</button><button class="ghost" data-act="annret">Retirer</button></div><p id="annMsg" class="err"></p></div>'+
   '<div class="sec"><h3>Créer un compte</h3><input id="nEmail" type="email" placeholder="E-mail"><input id="nPseudo" placeholder="Pseudo"><input id="nPw" type="password" placeholder="Mot de passe (12 car. min)" autocomplete="new-password"><button data-act="newacc">Créer</button><p id="accMsg" class="err"></p></div>':'<div class="sec"><p class="sub">Réservé au rôle « super ».</p></div>')};
function msg(id,t,ok){var e=$(id);e.className=ok?'ok':'err';e.textContent=t}
ACT.annpub=async function(){var t=($('annTxt').value||'').trim();if(!t){msg('annMsg',"Écris le texte de l'annonce");return}
  try{await api('POST','/rest/v1/statuts_admin',{texte:t,expire_le:new Date(Date.now()+parseInt($('annDur').value,10)*3600000).toISOString(),actif:true},{Prefer:'return=minimal'});await audit('annonce_publiee','statuts_admin',{par:ME.email});$('annTxt').value='';msg('annMsg','Annonce publiée',1)}catch(e){msg('annMsg',e.message)}};
ACT.annret=async function(){try{await api('PATCH','/rest/v1/statuts_admin?actif=eq.true',{actif:false},{Prefer:'return=minimal'});await audit('annonce_retiree','statuts_admin',{par:ME.email});msg('annMsg','Annonce retirée',1)}catch(e){msg('annMsg',e.message)}};
ACT.newacc=async function(){if($('nPw').value.length<12){msg('accMsg','Mot de passe : 12 caractères minimum');return}if(!(await confirmPw('Créer un compte')))return;
  try{await fnCall({action:'create',email:$('nEmail').value,pseudo:$('nPseudo').value,password:$('nPw').value});await audit('compte_cree',$('nPseudo').value,{par:ME.email});$('nPw').value='';msg('accMsg','Compte créé.',1)}catch(e){msg('accMsg',e.message)}};

/* ===== Veille : badge + vibration sur nouvelle alerte ===== */
var LASTN=null,wTimer;
function setBadge(){var n=ALERTS.filter(function(x){return DONE.indexOf(x.id)<0}).length;var b=$('bAlert');if(b){b.textContent=n;b.classList.toggle('hide',!n)}}
async function watch(){if(!sess()||document.hidden)return;try{ALERTS=await loadAlerts();var n=ALERTS.filter(function(x){return DONE.indexOf(x.id)<0}).length;
  if(LASTN!==null&&n>LASTN){try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}toast('🔔 Nouvelle alerte')}LASTN=n;setBadge()}catch(e){}}
function startWatch(){clearInterval(wTimer);watch();wTimer=setInterval(watch,60000)}

if(sess()){afterLogin().then(function(){if(!$('app').classList.contains('hide'))return;})}
})();
