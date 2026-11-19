/* TÕÕLé : contacts du téléphone qui sont sur TÕÕLé */
(function(){"use strict";if(window.__tcnt)return;window.__tcnt=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function norm(n){var d=String(n||"").replace(/[^0-9]/g,"");if(d.indexOf("00")===0)d=d.slice(2);if(d.length===8)d="226"+d;return d.length>=8&&d.length<=15?d:""}
function rpc(nums){var s=sess();return fetch(U+"/rest/v1/rpc/contacts_on_toole",{method:"POST",headers:{apikey:K,Authorization:"Bearer "+((s&&s.access_token)||K),"Content-Type":"application/json"},body:JSON.stringify({nums:nums})}).then(function(r){return r.json()}).then(function(j){return Array.isArray(j)?j:null}).catch(function(){return null})}
var st=document.createElement("style");st.textContent=
"#tcBtn{display:flex;align-items:center;gap:12px;width:calc(100% - 28px);margin:0 14px 14px;padding:14px;border:0;border-radius:20px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;text-align:left;box-shadow:0 8px 22px rgba(47,111,224,.35)}"
+"#tcBtn .i{flex:none;width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center}#tcBtn b{display:block;font-size:15.5px}#tcBtn small{font-size:12.5px;opacity:.9}"
+"#tcScr{position:fixed;inset:0;z-index:100020;background:#f4fbfe;color:#0a2a66;display:flex;flex-direction:column;font-family:sans-serif}"
+"#tcScr .hd{display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 14px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;box-shadow:0 4px 18px rgba(47,111,224,.28)}"
+"#tcScr .hd b{flex:1;font-size:17px}#tcScr .hd button{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.22);color:#fff;font-size:22px}"
+"#tcScr .sr{margin:12px 14px 4px;height:44px;border:1px solid #d6ebf4;border-radius:22px;background:#fff;padding:0 16px;font-size:15px;color:#0a2a66;outline:none}"
+"#tcScr .bd{flex:1;overflow-y:auto;padding:8px 0 40px}"
+"#tcScr .h{margin:14px 16px 8px;font-size:12.5px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:#6b7c9b}"
+"#tcScr .r{display:flex;align-items:center;gap:12px;margin:0 14px 8px;padding:10px 12px;background:#fff;border:1px solid #d6ebf4;border-radius:18px;box-shadow:0 4px 14px rgba(20,60,140,.06)}"
+"#tcScr .av{flex:none;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;display:grid;place-items:center;font-weight:800;font-size:17px}"
+"#tcScr .r.no .av{background:#dbe6f2;color:#5b7191}"
+"#tcScr .tx{flex:1;min-width:0}#tcScr .tx b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#tcScr .tx small{display:block;font-size:12.5px;color:#6b7c9b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#tcScr .r:not(.no) .tx small{color:#1f5fd6;font-weight:700}"
+"#tcScr .r button{flex:none;border:0;border-radius:16px;padding:9px 16px;font-weight:800;font-size:13px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff}#tcScr .r.no button{background:#e3f1ff;color:#1f5fd6}"
+"#tcScr .ms{margin:60px 24px;text-align:center;color:#4a6285;font-size:15px;line-height:1.55}#tcScr .ms button{margin-top:18px;border:0;border-radius:18px;padding:13px 24px;font-weight:800;font-size:15px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;box-shadow:0 6px 18px rgba(47,111,224,.4)}"
+"#tcScr .sp{width:38px;height:38px;margin:0 auto 16px;border:4px solid #d6ebf4;border-top-color:#2f6fe0;border-radius:50%;animation:tcs .8s linear infinite}@keyframes tcs{to{transform:rotate(360deg)}}";
document.head.appendChild(st);var tcfix=document.createElement("style");tcfix.textContent="#tcScr{max-width:100vw!important;overflow-x:hidden!important}#tcScr .sr{width:calc(100% - 28px)!important;box-sizing:border-box!important}#tcScr .r{display:flex!important;flex-direction:row!important;align-items:center!important;width:auto!important;height:auto!important;box-sizing:border-box!important}#tcScr .av{flex:none!important;width:42px!important;min-width:42px!important;height:42px!important;border-radius:50%!important;padding:0!important}#tcScr .tx{flex:1 1 0!important;min-width:0!important;width:auto!important;display:block!important}#tcScr .tx b{display:block!important;color:#0a2a66!important;font-size:15px!important}#tcScr .tx small{display:block!important;color:#6b7c9b!important}#tcScr .r button{flex:none!important;width:auto!important;min-width:0!important;max-width:110px!important;height:auto!important;padding:9px 16px!important;border-radius:16px!important}";document.head.appendChild(tcfix);
function chat(id,ps){var sec=document.getElementById("scrDecouvrir");if(sec)sec.classList.add("hide");document.body.classList.remove("dc-on");var o=document.getElementById("tcScr");if(o)o.remove();if(window.openChat)window.openChat(id,ps||"");else alert("Chat indisponible")}
function open(){var old=document.getElementById("tcScr");if(old)old.remove();
var o=E("div");o.id="tcScr";var hd=E("div","hd"),bk=E("button","","‹"),tt=E("b","","Contacts sur TÕÕLé");bk.onclick=function(){o.remove()};hd.appendChild(bk);hd.appendChild(tt);
var bd=E("div","bd");o.appendChild(hd);o.appendChild(bd);document.body.appendChild(o);
function msg(t,btn,fn,spin){bd.innerHTML="";var m=E("div","ms");if(spin)m.appendChild(E("div","sp"));m.appendChild(E("div","",t));if(btn){var b=E("button","",btn);b.onclick=fn;m.appendChild(b)}bd.appendChild(m)}
function load(){msg("Recherche de tes contacts sur TÕÕLé…",null,null,true);
var raw=[];try{raw=JSON.parse(window.TooleContacts.list())}catch(e){}
var by={},nums=[];raw.forEach(function(c){var n=norm(c.p);if(!n)return;if(!by[n]){by[n]=c.n||c.p;nums.push(n)}});
if(!nums.length)return msg("Aucun numéro trouvé dans tes contacts.");
var chunks=[];for(var i=0;i<nums.length;i+=400)chunks.push(nums.slice(i,i+400));
Promise.all(chunks.map(rpc)).then(function(rs){if(rs.some(function(r){return r===null}))return msg("Connexion impossible pour le moment. Réessaie.","Réessayer",load);
var found={},list=[];rs.forEach(function(r){r.forEach(function(x){if(!found[x.num]){found[x.num]=1;list.push({id:x.id,ps:x.pseudo,name:by[x.num]||x.pseudo,num:x.num})}})});
var rest=nums.filter(function(n){return !found[n]}).map(function(n){return{name:by[n],num:n}});
list.sort(function(a,b){return a.name.localeCompare(b.name)});rest.sort(function(a,b){return a.name.localeCompare(b.name)});
bd.innerHTML="";var sr=E("input","sr");sr.type="search";sr.placeholder="Rechercher un contact";var box=E("div");o.insertBefore(sr,bd);
function paint(){var q=sr.value.trim().toLowerCase();box.innerHTML="";
function ok(x){return !q||(x.name||"").toLowerCase().indexOf(q)>=0||(x.ps||"").toLowerCase().indexOf(q)>=0}
var L=list.filter(ok),R=rest.filter(ok);
box.appendChild(E("div","h",L.length+" contact"+(L.length>1?"s":"")+" sur TÕÕLé"));
if(!L.length)box.appendChild(E("div","ms",q?"Aucun résultat.":"Aucun de tes contacts n'est encore sur TÕÕLé. Invite-les !"));
L.forEach(function(x){var r=E("div","r"),av=E("div","av",(x.name||"?").charAt(0).toUpperCase()),tx=E("div","tx");tx.appendChild(E("b","",x.name));tx.appendChild(E("small","","@"+(x.ps||"")));var b=E("button","","Écrire");b.onclick=function(){chat(x.id,x.ps)};r.appendChild(av);r.appendChild(tx);r.appendChild(b);box.appendChild(r)});
if(R.length){box.appendChild(E("div","h","Pas encore sur TÕÕLé ("+R.length+")"));
R.slice(0,150).forEach(function(x){var r=E("div","r no"),av=E("div","av",(x.name||"?").charAt(0).toUpperCase()),tx=E("div","tx");tx.appendChild(E("b","",x.name));tx.appendChild(E("small","","+"+x.num));var b=E("button","","Inviter");b.onclick=function(){location.href="sms:+"+x.num+"?body="+encodeURIComponent("Rejoins-moi sur TÕÕLé, l'application pour discuter ! Télécharge-la ici : https://ilboudoregis1-maker.github.io/toole-officiel/ puis crée ton compte avec ton numéro.")};r.appendChild(av);r.appendChild(tx);r.appendChild(b);box.appendChild(r)});
if(R.length>150)box.appendChild(E("div","ms","Utilise la recherche pour trouver les autres contacts."))}}
sr.oninput=paint;bd.appendChild(box);paint()})}
if(!window.TooleContacts)return msg("Mets à jour l'application pour utiliser cette fonction.");
if(window.TooleContacts.has())return load();
msg("TÕÕLé a besoin d'accéder à tes contacts pour te montrer ceux qui sont déjà sur l'appli. Tes contacts ne sont pas enregistrés : ils servent seulement à la recherche.","Autoriser l'accès",function(){window.__tcPerm=function(ok){if(ok)load();else msg("Accès refusé. Tu peux l'activer dans les réglages Android : Applications, TÕÕLé, Autorisations, Contacts.")};window.TooleContacts.ask()})}
function tick(){try{var on=document.querySelector('#scrDecouvrir:not(.hide) .dc-seg button.on[data-k="people"]'),bd=document.querySelector("#scrDecouvrir:not(.hide) .dc-body");
if(on&&bd&&!bd.querySelector("#tcBtn")){var b=E("button");b.id="tcBtn";b.type="button";b.innerHTML="<span class='i'><svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/><circle cx='9' cy='7' r='4'/><path d='M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8'/></svg></span><span><b>Mes contacts sur TÕÕLé</b><small>Vois qui, dans ton répertoire, est déjà ici</small></span>";b.onclick=open;bd.insertBefore(b,bd.firstChild)}}catch(e){}}
setInterval(tick,700)})();
