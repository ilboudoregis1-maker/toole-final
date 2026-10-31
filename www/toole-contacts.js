(function(){
function $(i){return document.getElementById(i)}
function uid(){try{return JSON.parse(localStorage.getItem("toole_session")).user.id}catch(e){return "x"}}
function LS(k){try{return JSON.parse(localStorage.getItem(k+uid())||"[]")}catch(e){return[]}}
function SV(k,a){try{localStorage.setItem(k+uid(),JSON.stringify(a))}catch(e){}}
function L(f,e){return localStorage.getItem("toole_lang")==="en"?e:f}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function base(){try{if(typeof URL==="string"&&/^https?:/.test(URL))return URL}catch(e){}return "https://jbjeqxubpqqypysfsubd.supabase.co"}
var G=0,CUR=null;
var st=document.createElement("style");
st.textContent="#scrContactDet .cdb{display:flex;flex-direction:column;align-items:center;padding:22px 16px 110px}.cd-av{width:116px;height:116px;border-radius:50%;background:center/cover no-repeat linear-gradient(135deg,var(--main,#0a3d91),#1d5bc4);color:#fff;font-size:40px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,.25);border:4px solid #fff}.cd-n{font-size:22px;font-weight:800;margin-top:12px}.cd-s{font-size:13px;opacity:.65;margin-top:2px}.cd-acts{display:flex;gap:14px;margin:20px 0}.cd-a{width:68px;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;background:none;border:0;color:inherit;padding:0}.cd-a i{font-style:normal;width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;background:rgba(10,124,255,.13)}.cd-card{width:100%;max-width:480px;box-sizing:border-box;border-radius:18px;background:rgba(127,127,127,.09);padding:4px 16px}.cd-r{display:flex;justify-content:space-between;gap:10px;padding:13px 0;border-bottom:1px solid rgba(127,127,127,.18);font-size:14px}.cd-r:last-child{border:0}.cd-del{width:100%;max-width:480px;margin-top:18px;padding:14px;border-radius:14px;border:1.5px solid #e5484d;background:transparent;color:#e5484d;font-weight:700;font-size:15px}";
document.head.appendChild(st);
function buildList(){if($("scrContacts"))return;
var s=document.createElement("section");s.id="scrContacts";s.className="scr hide";
s.innerHTML='<div class="hdr"><span class="ttl">Contacts</span></div><div class="body" style="padding-bottom:110px"><button id="tcAdd" type="button" style="width:100%;margin:0 0 10px">+ Enregistrer un contact</button><input id="tcQ" placeholder="Rechercher un contact" style="width:100%;box-sizing:border-box;margin:0 0 10px"><div id="tcList"></div></div>';
document.body.appendChild(s);$("tcAdd").onclick=addSheet;$("tcQ").oninput=filt}
function buildDet(){if($("scrContactDet"))return;
var s=document.createElement("section");s.id="scrContactDet";s.className="scr hide";
s.innerHTML='<div class="hdr"><button id="cdBk" type="button" aria-label="Retour" style="background:none;border:0;color:#fff;font-size:30px;line-height:1;padding:0 12px 0 0">‹</button><span class="ttl">Contact</span></div><div class="body"><div class="cdb" id="cdBody"></div></div>';
document.body.appendChild(s);$("cdBk").onclick=function(){open()}}
function filt(){var q=($("tcQ").value||"").toLowerCase();
$("tcList").querySelectorAll(".row").forEach(function(r){var n=((r.querySelector(".rn")||{}).textContent||"").toLowerCase();r.style.display=n.indexOf(q)>-1?"":"none"})}
function addSheet(){var sh=sheetEl('<div class="sht">Enregistrer un contact</div><input id="scP" type="tel" inputmode="tel" placeholder="Numéro du contact (+226 70 12 34 56)"><button id="scOk" style="margin-top:10px">Enregistrer</button><button class="sa cc" onclick="closeSheet()">Annuler</button>');
sh.querySelector("#scOk").onclick=async function(){var v=(document.getElementById("scP").value||"").trim();if(!window.tooleNum(v)){toast("Écris un numéro valide");return}
try{var u=await window.tooleIdByPhone(v);if(!u){toast("Numéro introuvable");return}
await window.saveContact({id:u});closeSheet();load()}catch(e){toast(window.tooleErr(e))}}}
function confirmDel(p){
var sh=sheetEl('<div class="sht">Supprimer '+esc(p.pseudo||"ce contact")+' de tes contacts ?</div><div class="sx-s" style="padding:6px 8px">Les messages restent dans l\'historique.</div><button class="sa dz" id="tcY">Supprimer</button><button class="sa cc" onclick="closeSheet()">Annuler</button>');
sh.querySelector("#tcY").onclick=function(){var h=LS("tsc_");if(h.indexOf(p.id)<0)h.push(p.id);SV("tsc_",h);
SV("tsf_",LS("tsf_").filter(function(x){return x!==p.id}));
try{closeSheet()}catch(e){}toast("Contact supprimé");open()}}
function showPhoto(u,n){var o=document.createElement("div");
o.style.cssText="position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px";
var c=document.createElement("div"),s="min(78vw,78vh,420px)";
c.style.cssText="width:"+s+";height:"+s+";border-radius:50%;background:center/cover no-repeat;box-shadow:0 0 0 4px rgba(255,255,255,.9),0 18px 50px rgba(0,0,0,.6)";
c.style.backgroundImage='url("'+u+'")';
var t=document.createElement("div");t.textContent=n;t.style.cssText="color:#fff;font:600 18px system-ui";
o.appendChild(c);o.appendChild(t);o.onclick=function(){o.remove()};document.body.appendChild(o)}
function callPeer(p){try{peer={id:p.id,pseudo:p.pseudo||"Contact"}}catch(e){}
var b=$("callBtn");if(b){b.click();return}
Promise.resolve(openChat(p.id,p.pseudo||"?")).then(function(){setTimeout(function(){var c=$("callBtn");if(c)c.click();else toast("Appel indisponible")},400)})}
function moreSheet(p){var av=$("cdAv"),u=av&&av.dataset.u;
var sh=sheetEl('<div class="sht">'+esc(p.pseudo||"?")+'</div><button class="sa" id="mcCp">Copier le pseudo</button><button class="sa" id="mcSh">Partager le contact</button><button class="sa" id="mcHd">Masquer la discussion de l\'accueil</button>'+(u?'<button class="sa" id="mcPh">Voir la photo</button>':'')+'<button class="sa cc" onclick="closeSheet()">Fermer</button>');
(function(){var o={};try{o=JSON.parse(localStorage.getItem("tdc_"+uid())||"{}")}catch(e){}if(o[p.id])sh.querySelector("#mcHd").textContent="Afficher la discussion"})();sh.querySelector("#mcCp").onclick=function(){try{navigator.clipboard.writeText(p.pseudo||"")}catch(e){}closeSheet();toast("Pseudo copié")};
sh.querySelector("#mcSh").onclick=function(){closeSheet();var t="Retrouve "+(p.pseudo||"ce contact")+" sur TÕÕLé";
if(navigator.share){navigator.share({text:t}).catch(function(){})}else{try{navigator.clipboard.writeText(t)}catch(e){}toast("Texte copié")}};
sh.querySelector("#mcHd").onclick=function(){var o={};try{o=JSON.parse(localStorage.getItem("tdc_"+uid())||"{}")}catch(e){}
var was=!!o[p.id];if(was)delete o[p.id];else o[p.id]=new Date().toISOString();try{localStorage.setItem("tdc_"+uid(),JSON.stringify(o))}catch(e){}
closeSheet();toast(was?"Discussion de nouveau visible":"Discussion masquée de l\'accueil".replace("\\\\",""))};
var ph=sh.querySelector("#mcPh");if(ph)ph.onclick=function(){closeSheet();showPhoto(u,p.pseudo||"")}}
async function openDetail(p){buildDet();CUR=p;window.__tcdCur=p;
try{window.showOnly("scrNone")}catch(e){}
$("scrContacts").classList.add("hide");$("scrContactDet").classList.remove("hide");
try{window.__v4sync&&window.__v4sync()}catch(e){}
var fav=LS("tsf_").indexOf(p.id)>-1;
$("cdBody").innerHTML='<div class="cd-av" id="cdAv">'+esc((p.pseudo||"?").slice(0,2).toUpperCase())+'</div><div class="cd-n">'+esc(p.pseudo||"?")+'</div><div class="cd-s">Contact enregistré</div>'
+'<div class="cd-acts"><button class="cd-a" id="cdMsg" type="button"><i>💬</i>Message</button><button class="cd-a" id="cdFav" type="button"><i>'+(fav?"★":"☆")+'</i>Favori</button><button class="cd-a" id="cdMore" type="button"><i>⋯</i>Autres</button></div>'
+'<div class="cd-card"><div class="cd-r"><span>Messages échangés</span><b id="cdN">…</b></div><div class="cd-r"><span>Dernier message</span><b id="cdL">…</b></div></div>'
+'<button class="cd-blk" id="cdBlk" type="button">…</button><button class="cd-del" id="cdDel" type="button">Supprimer le contact</button>';
$("cdMsg").onclick=function(){openChat(p.id,p.pseudo||"?")};

$("cdFav").onclick=function(){var a=LS("tsf_"),i=a.indexOf(p.id);if(i>=0)a.splice(i,1);else a.push(p.id);SV("tsf_",a);
this.firstChild.textContent=i>=0?"☆":"★";toast(i>=0?"Retiré des favoris":"Ajouté aux favoris")};
$("cdMore").onclick=function(){moreSheet(p)};
$("cdDel").onclick=function(){confirmDel(p)};
(async function(){var b=$("cdBlk");if(!b)return;var bl=false;
try{var r0=await api("/rest/v1/blocks?select=blocked&blocker=eq."+me()+"&blocked=eq."+p.id+"&limit=1");bl=!!(r0&&r0.length)}catch(e){}
function paint(){b.textContent=bl?L("Débloquer ce contact","Unblock this contact"):L("Bloquer ce contact","Block this contact")}
paint();
b.onclick=async function(){try{if(bl){await api("/rest/v1/blocks?blocker=eq."+me()+"&blocked=eq."+p.id,{method:"DELETE",headers:{Prefer:"return=minimal"}});toast(L("Contact débloqué","Contact unblocked"))}else{await api("/rest/v1/blocks",{method:"POST",headers:{Prefer:"resolution=ignore-duplicates,return=minimal"},body:JSON.stringify({blocker:me(),blocked:p.id})});toast(L("Contact bloqué","Contact blocked"))}bl=!bl;paint();if(window.__tblkReload)window.__tblkReload()}catch(e){toast(e.message)}}})();
$("cdAv").onclick=function(){var u=this.dataset.u;if(u)showPhoto(u,p.pseudo||"")};
try{var rows=await api("/rest/v1/messages?select=created_at&or=(and(sender.eq."+me()+",receiver.eq."+p.id+"),and(sender.eq."+p.id+",receiver.eq."+me()+"))&order=created_at.desc");
if(CUR===p&&$("cdN")){$("cdN").textContent=rows.length;$("cdL").textContent=rows[0]?new Date(rows[0].created_at).toLocaleString(L("fr-FR","en-GB")):L("aucun","none")}}
catch(e){if($("cdN")){$("cdN").textContent="—";$("cdL").textContent="—"}}
try{var pr=await api("/rest/v1/profiles?select=id,pseudo,avatar_v&id=eq."+p.id);var v=pr&&pr[0]&&pr[0].avatar_v;
if(v){var u=base()+"/storage/v1/object/public/avatars/"+p.id+"/avatar.jpg?v="+v;var im=new Image();
im.onload=function(){var av=$("cdAv");if(av&&CUR===p){av.style.backgroundImage='url("'+u+'")';av.textContent="";av.dataset.u=u}};im.src=u}}catch(e){}}
async function load(){var box=$("tcList");if(!box)return;var gen=++G;box.innerHTML="";
try{var rows=await api("/rest/v1/saved_contacts?select=contact&owner=eq."+me());if(gen!==G)return;
var h=LS("tsc_"),ids=rows.map(function(r){return r.contact}).filter(function(i){return h.indexOf(i)<0});
if(!ids.length){box.innerHTML='<div class="sx-s" style="padding:14px">Aucun contact enregistré.</div>';return}
var pr=await api("/rest/v1/profiles?select=id,pseudo,avatar_v&id=in.("+ids.join(",")+")");if(gen!==G)return;
var f=LS("tsf_");pr.sort(function(a,b){var x=f.indexOf(a.id)>-1?0:1,y=f.indexOf(b.id)>-1?0:1;return x-y||String(a.pseudo).localeCompare(String(b.pseudo))});
box.innerHTML="";
pr.forEach(function(p){var star=f.indexOf(p.id)>-1;
var r=homeRow((star?"★ ":"")+(p.pseudo||"?"),"Contact enregistré",null,function(){openDetail(p)},function(){confirmDel(p)});
if(p.avatar_v){var av=r.querySelector(".av"),u=base()+"/storage/v1/object/public/avatars/"+p.id+"/thumb.jpg?v="+p.avatar_v,im=new Image();
im.onload=function(){av.style.cssText+=";background-image:url('"+u+"')!important;background-size:cover!important;background-position:center!important;color:transparent!important;font-size:0!important"};im.src=u}
box.appendChild(r)});
filt()}catch(e){toast(e.message)}}
function open(){buildList();buildDet();try{window.showOnly("scrNone")}catch(e){}
$("scrContactDet").classList.add("hide");$("scrContacts").classList.remove("hide");window.__v4mode="contacts";
try{window.__v4sync&&window.__v4sync()}catch(e){}load()}
window.openContactsPage=open;window.renderContacts=open;
var so=window.showOnly;
if(typeof so==="function"&&!so.__tc){var w=function(n){["scrContacts","scrContactDet"].forEach(function(i){var c=$(i);if(c)c.classList.add("hide")});if(n==="scrList")window.__v4mode="chats";return so.apply(this,arguments)};w.__tc=1;window.showOnly=w}
var sv=window.saveContact;
if(typeof sv==="function")window.saveContact=function(p){try{SV("tsc_",LS("tsc_").filter(function(x){return x!==p.id}))}catch(e){}return sv.apply(this,arguments)};
})();
