/* TÕÕLé : compte Influenceur */
(function(){if(window.__tinf)return;window.__tinf=1;window.__INF=window.__INF||{};
var BOX=null,busy=false;
var BTN="display:block;width:100%;margin-top:10px;border:0;border-radius:12px;padding:12px;font-size:15px;font-weight:800;color:#fff;background:linear-gradient(135deg,#ff7a18,#e5484d)";
var INP="display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:11px;border-radius:10px;border:1px solid rgba(128,128,128,.4);font-size:15px;background:transparent;color:inherit";
function E(t,c,h){var e=document.createElement(t);if(c)e.style.cssText=c;if(h!=null)e.innerHTML=h;return e}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ME(){try{if(typeof me==="function")return me()}catch(e){}try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return null}}
async function A(p,o){var r=await api(p,o||{});if(r&&typeof r.json==="function"){try{r=await r.json()}catch(e){r=null}}return r}
async function loadInf(){try{var r=await A("/rest/v1/influencer_accounts?select=user_id&limit=500");if(Array.isArray(r))r.forEach(function(x){window.__INF[x.user_id]=1})}catch(e){}}
async function state(){var u=ME();
var a=await A("/rest/v1/influencer_accounts?select=nom&user_id=eq."+u);if(a&&a.length)return{k:"actif",n:a[0].nom};
var q=await A("/rest/v1/influencer_requests?select=statut,nom&user_id=eq."+u+"&order=created_at.desc&limit=1");if(q&&q.length)return{k:q[0].statut,n:q[0].nom};
return{k:"aucun"}}
async function stats(u){var v=await A("/rest/v1/videos?select=id&author=eq."+u+"&limit=200");v=Array.isArray(v)?v:[];
var f=await A("/rest/v1/follows?select=follower&followed=eq."+u+"&limit=5000");
var l=v.length?await A("/rest/v1/video_likes?select=video_id&video_id=in.("+v.map(function(x){return x.id}).join(",")+")&limit=5000"):[];
return{v:v.length,f:Array.isArray(f)?f.length:0,l:Array.isArray(l)?l.length:0}}
function form(){
var n=E("input",INP);n.maxLength=60;n.placeholder="Ton nom d'influenceur";
var d=E("textarea",INP+";min-height:80px");d.maxLength=500;d.placeholder="Ton contenu : humour, musique, sport…";
var go=E("button",BTN,"Envoyer la demande");go.type="button";
var er=E("div","font-size:13px;color:#e5484d;margin-top:8px");
BOX.appendChild(n);BOX.appendChild(d);BOX.appendChild(go);BOX.appendChild(er);
go.onclick=async function(){var nm=n.value.trim();if(nm.length<2){er.textContent="Nom trop court (2 lettres minimum).";return}
go.disabled=true;er.textContent="";
try{var r=await A("/rest/v1/influencer_requests",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({user_id:ME(),nom:nm,description:d.value.trim()||null})});
if(r&&!Array.isArray(r)&&(r.code||r.message))throw new Error(r.code||r.message);draw({k:"en_attente",n:nm})}
catch(e){go.disabled=false;er.textContent=/duplicate|23505/i.test(String(e&&e.message))?"Tu as déjà une demande en attente.":"Envoi impossible. Réessaie."}}}
async function draw(s){BOX.innerHTML="";
BOX.appendChild(E("div","font-weight:800;font-size:16px;margin-bottom:6px","⭐ Compte Influenceur"));
var m=E("div","font-size:14px;opacity:.85;line-height:1.4");BOX.appendChild(m);
if(s.k==="actif"){m.innerHTML="Compte influenceur actif : <b>"+esc(s.n)+"</b>";window.__INF[ME()]=1;
try{var st=await stats(ME());var g=E("div","display:flex;gap:8px;margin-top:10px");
[[st.v,"Vidéos"],[st.f,"Abonnés"],[st.l,"J'aime"]].forEach(function(a){g.appendChild(E("div","flex:1;text-align:center;padding:10px 4px;border-radius:12px;background:rgba(128,128,128,.12)","<b style='font-size:18px'>"+a[0]+"</b><br><small style='opacity:.7'>"+a[1]+"</small>"))});BOX.appendChild(g)}catch(e){}return}
if(s.k==="en_attente"){m.innerHTML="Demande envoyée pour « <b>"+esc(s.n)+"</b> ». Elle sera traitée prochainement.";return}
m.textContent=s.k==="refusee"?"Ta dernière demande a été refusée. Tu peux en faire une nouvelle.":"Publie des vidéos, gagne des abonnés et reçois le badge Influenceur.";
BOX.appendChild(E("div","margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(245,165,36,.14);border:1px solid rgba(245,165,36,.5);font-size:13px;line-height:1.45;text-align:left","<b>💳 Compte influenceur payant</b><br>La création d’un compte influenceur est payante : <b>500 FCFA</b>. Ta demande est d’abord examinée par l’équipe TÕÕLé."));BOX.appendChild(E("div","margin-top:10px;padding:12px;border-radius:14px;border:1px solid rgba(128,128,128,.28);text-align:left","<!--tg--><div style='font-weight:800;font-size:14px;margin-bottom:4px'>🎁 Avantage : recevoir des cadeaux</div><div style='font-size:13px;opacity:.85;line-height:1.4'>Les utilisateurs peuvent t’envoyer un cadeau. 3 cadeaux sont disponibles :</div><div style='display:flex;gap:8px;margin-top:10px'><div style='flex:1;text-align:center;padding:12px 4px;border-radius:14px;background:rgba(128,128,128,.12)'><div style='height:30px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1'><svg viewBox='0 0 32 24' width='36' height='27'><path d='M2 9h28a14 14 0 0 1-28 0z' fill='#b9722f'/><ellipse cx='16' cy='9' rx='14' ry='3.2' fill='#8a4f1a'/><path d='M7 15q9 5 18 0' stroke='#f5d9a8' stroke-width='1.6' fill='none'/></svg></div><div style='font-weight:800;font-size:12px;margin-top:7px'>Calebasse</div><div style='font-size:12px;font-weight:800;color:#e5484d;margin-top:2px'>500 FCFA</div></div><div style='flex:1;text-align:center;padding:12px 4px;border-radius:14px;background:rgba(128,128,128,.12)'><div style='height:30px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1'><svg viewBox='0 0 36 24' width='38' height='25' style='border-radius:4px'><rect width='36' height='12' fill='#ef2b2d'/><rect y='12' width='36' height='12' fill='#009e49'/><path d='M18 6.5l1.5 4.6h4.8l-3.9 2.8 1.5 4.6L18 15.7l-3.9 2.8 1.5-4.6-3.9-2.8h4.8z' fill='#fcd116'/></svg></div><div style='font-weight:800;font-size:12px;margin-top:7px'>Faso flag</div><div style='font-size:12px;font-weight:800;color:#e5484d;margin-top:2px'>750 FCFA</div></div><div style='flex:1;text-align:center;padding:12px 4px;border-radius:14px;background:rgba(128,128,128,.12)'><div style='height:30px;display:flex;align-items:center;justify-content:center;font-size:26px;line-height:1'>🐴</div><div style='font-weight:800;font-size:12px;margin-top:7px'>Cheval</div><div style='font-size:12px;font-weight:800;color:#e5484d;margin-top:2px'>1000 FCFA</div></div></div><!--/tg-->"));var b=E("button",BTN,"Devenir influenceur");b.type="button";BOX.appendChild(b);b.onclick=function(){b.remove();form()}}
async function render(){var body=(window.__tinfHost&&window.__tinfHost.isConnected?window.__tinfHost:null);if(!body||busy||(BOX&&BOX.isConnected))return;busy=true;
try{var s=await state();BOX=E("div","margin:14px 0;padding:14px;border-radius:16px;border:1px solid rgba(229,72,77,.35);background:rgba(229,72,77,.07)");body.insertBefore(BOX,body.firstChild);await draw(s)}catch(e){}busy=false}
loadInf();setInterval(loadInf,60000);setInterval(render,1500);
window.__tinfOpen=function(){var o=document.getElementById("tinfOv");if(o)o.remove();
o=E("div","position:fixed;inset:0;z-index:100050;background:rgba(0,0,0,.6);display:flex;align-items:flex-end");o.id="tinfOv";
var sh=E("div","width:100%;max-height:85%;overflow:auto;box-sizing:border-box;background:#fff;color:#0b1b2b;border-radius:22px 22px 0 0;padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 20px)");
var x=E("button","float:right;border:0;background:rgba(128,128,128,.15);width:34px;height:34px;border-radius:17px;font-size:18px;color:inherit","\u2715");x.type="button";x.onclick=function(){o.remove()};
var h=E("div","");sh.appendChild(x);sh.appendChild(h);o.appendChild(sh);o.onclick=function(e){if(e.target===o)o.remove()};document.body.appendChild(o);window.__tinfHost=h;BOX=null;render()};
})();
