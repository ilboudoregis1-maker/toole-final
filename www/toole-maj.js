(function(){
if(window.__tmaj)return;window.__tmaj=1;
var D=document,INFO=null,UPD=null,T=0;
var OK=/^https:\/\/jbjeqxubpqqypysfsubd\.supabase\.co\/storage\/v1\/object\/public\/apk\//;
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function say(m){try{if(typeof toast==='function')toast(m)}catch(e){}}
function call(p,b){var f=window.api||(typeof api==='function'?api:null);
 return f?f(p,{method:'POST',body:JSON.stringify(b||{})}):Promise.reject(new Error('Erreur'))}
function info(){if(INFO)return Promise.resolve(INFO);
 var C=window.Capacitor,A=C&&C.Plugins&&C.Plugins.App;
 if(!A||!A.getInfo)return Promise.resolve({version:'?',build:0});
 return A.getInfo().then(function(i){INFO={version:i.version||'?',build:parseInt(i.build,10)||0};return INFO})
  .catch(function(){return {version:'?',build:0}})}
function check(force){
 if(!force&&UPD&&Date.now()-T<300000)return Promise.resolve(UPD);
 return Promise.all([info(),call('/rest/v1/rpc/latest_app_update',{})]).then(function(r){
  UPD={i:r[0],u:(r[1]&&r[1].version_code)?r[1]:null};T=Date.now();return UPD})}
function paint(box){
 var d=UPD,nw=d&&d.u&&d.u.version_code>d.i.build,h='';
 h+='<div style="font-weight:800;font-size:16px;margin-bottom:4px">Mise à jour</div>';
 h+='<div style="font-size:13px;opacity:.75">Version installée : '+esc(d.i.version)+' ('+esc(d.i.build)+')</div>';
 if(nw){
  var li=String(d.u.notes||'').split('\n').filter(function(x){return x.trim()}).map(function(x){return '<li>'+esc(x)+'</li>'}).join('');
  h+='<div style="margin-top:10px;font-weight:700;color:#0a7cff">Nouvelle version '+esc(d.u.version_name)+' disponible</div>';
  if(li)h+='<ul style="margin:6px 0 0;padding-left:20px;font-size:14px;line-height:1.5">'+li+'</ul>';
  h+='<button id="tmGo" style="width:100%;margin-top:12px;border:0;border-radius:14px;padding:13px;font-size:16px;font-weight:800;color:#fff;background:linear-gradient(135deg,#0a7cff,#2f9bff)">Mettre à jour</button>';
 }else{
  h+='<div style="margin-top:8px;font-weight:700;color:#16803f">TÕÕLé est à jour ✓</div>';
  h+='<button id="tmCk" style="margin-top:10px;border:0;border-radius:12px;padding:9px 14px;font-weight:700;color:#0a7cff;background:#eef4fc">Vérifier maintenant</button>';
 }
 box.innerHTML=h;
 var go=D.getElementById('tmGo'),ck=D.getElementById('tmCk');
 if(go)go.onclick=function(){var u=d.u.url;if(!OK.test(u)){say('Lien de mise à jour invalide');return}say('Téléchargement…');location.href=u};
 if(ck)ck.onclick=function(){ck.textContent='Vérification…';check(true).then(function(){paint(box)}).catch(function(){ck.textContent='Vérifier maintenant';say('Hors connexion')})};
}
function row(){var p=D.getElementById('scrProfil');
 if(!p||D.getElementById('tsMaj'))return;
 var b=D.createElement('div');b.id='tsMaj';
 b.style.cssText='margin:10px 16px;padding:14px;border-radius:14px;background:rgba(0,188,212,.08);border:1px solid rgba(0,168,200,.35)';
 b.innerHTML='<div style="font-size:14px;opacity:.7">Recherche de mise à jour…</div>';
 p.appendChild(b);
 check(false).then(function(){paint(b)}).catch(function(){b.innerHTML='<div style="font-size:14px;opacity:.7">Mise à jour indisponible (hors connexion)</div>'})}
var q=0;new MutationObserver(function(){if(q)return;q=1;
 requestAnimationFrame(function(){q=0;row()})}).observe(D.body,{childList:true,subtree:true});
})();
