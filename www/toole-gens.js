(function(){
if(window.__tc2)return;window.__tc2=1;
var KN={},TAB="mine",TM=0,BUSY=false,AGAIN=false,QT=null,DIRTY=false;
function $(i){return document.getElementById(i)}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function uid(){try{var s=JSON.parse(localStorage.getItem("toole_session"));if(s.user&&s.user.id)return s.user.id;return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function A(p,o){try{return Promise.resolve(api(p,o||{})).then(function(r){if(r&&typeof r.json==="function")return r.json().catch(function(){return null});return r}).catch(function(){return null})}catch(e){return Promise.resolve(null)}}
function base(){try{if(typeof URL==="string"&&/^https?:/.test(URL))return URL}catch(e){}return "https://jbjeqxubpqqypysfsubd.supabase.co"}
function tst(m){try{if(typeof toast==="function")toast(m)}catch(e){}}
function official(p){return /^t[õo][õo]l[ée]$/i.test(String(p.pseudo||"").trim())}
var st=document.createElement("style");st.textContent=
"#tc2Tabs{display:flex;gap:8px;margin:2px 0 14px}"
+"#tc2Tabs button{flex:1;min-height:44px;border:0;border-radius:14px;font-weight:800;font-size:15px;background:rgba(47,111,224,.10);color:var(--mut,#667085)}"
+"#tc2Tabs button.on{color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 4px 14px rgba(47,111,224,.35)}"
+"#tcGens .tc2-ban{display:block;width:100%;margin:0 0 12px;padding:14px;border:0;border-radius:18px;text-align:left;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 6px 18px rgba(47,111,224,.32)}"
+"#tcGens .tc2-ban b{display:block;font-size:16px}#tcGens .tc2-ban small{display:block;opacity:.9;font-size:13px;margin-top:2px}"
+"#tcGens .tc2-q{width:100%;box-sizing:border-box;margin:0 0 12px;padding:12px;border-radius:14px;border:1px solid rgba(128,128,128,.35);font-size:15px;background:transparent;color:inherit}"
+"#tcGens .tc2-h{margin:6px 2px 8px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.6}"
+"#tcGens .tc2-c{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 10px;padding:12px;border-radius:18px;background:var(--card,#fff);box-shadow:0 4px 14px rgba(20,40,90,.10)}"
+"#tcGens .tc2-av{flex:none;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:19px;background:linear-gradient(135deg,#00c2e0,#2f6fe0);background-size:cover;background-position:center}"
+"#tcGens .tc2-n{flex:1;min-width:0;font-weight:800;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+"#tcGens .tc2-b{flex:1;border:0;border-radius:12px;padding:10px 8px;font-weight:800;font-size:13px;color:#2f6fe0;background:rgba(47,111,224,.12)}"
+"#tcGens .tc2-b.p{color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)}"
+"#tcGens .tc2-b.d{opacity:.6}"
+"#tcGens .tc2-e{padding:14px;opacity:.7;font-size:14px}"
+"#scrContacts #tcList .row{margin:0 0 10px;border-radius:18px;box-shadow:0 4px 14px rgba(20,40,90,.10);overflow:hidden}";
document.head.appendChild(st);
function card(p){var c=E("div","tc2-c"),known=!!KN[p.id],nm=p.pseudo||"Sans nom";
var av=E("div","tc2-av",nm.trim().charAt(0).toUpperCase()||"?");
if(known&&p.avatar_v){var u=base()+"/storage/v1/object/public/avatars/"+p.id+"/thumb.jpg?v="+encodeURIComponent(p.avatar_v),im=new Image();im.onload=function(){av.style.backgroundImage="url('"+u+"')";av.style.color="transparent"};im.src=u}
var top=E("div");top.style.cssText="display:flex;align-items:center;gap:10px;width:100%";
top.appendChild(av);top.appendChild(E("div","tc2-n",nm));c.appendChild(top);
var a=E("div");a.style.cssText="display:flex;gap:8px;width:100%";
var w=E("button","tc2-b","Écrire");w.type="button";w.onclick=function(){if(typeof openChat==="function")openChat(p.id,nm);else tst("Discussion indisponible")};
var s=E("button","tc2-b "+(known?"d":"p"),known?"✓ Contact":"+ Enregistrer");s.type="button";
s.onclick=async function(){if(KN[p.id])return;s.disabled=true;try{await window.saveContact({id:p.id});KN[p.id]=1;DIRTY=true;s.textContent="✓ Contact";s.className="tc2-b d"}catch(e){s.disabled=false;tst(window.tooleErr?window.tooleErr(e):"Enregistrement impossible")}};
var g=E("button","tc2-b","+ Groupe");g.type="button";g.onclick=function(){if(typeof window.__dcInv==="function")window.__dcInv(p);else tst("Indisponible")};
a.appendChild(w);a.appendChild(s);a.appendChild(g);c.appendChild(a);return c}
function loadG(force){var me=uid();if(!me)return;
if(BUSY){AGAIN=true;return}
var L0=$("tcgL");if(!force&&Date.now()-TM<20000&&L0&&L0.firstChild)return;
BUSY=true;var q=($("tcgQ")&&$("tcgQ").value||"").trim();
var url="/rest/v1/profiles?select=id,pseudo,avatar_v&order=pseudo.asc&limit=60"+(q?"&pseudo=ilike."+encodeURIComponent("*"+q+"*"):"");
if(L0&&!L0.firstChild)L0.appendChild(E("div","tc2-e","Chargement…"));
Promise.all([A(url),A("/rest/v1/saved_contacts?select=contact&owner=eq."+me+"&limit=1000")]).then(function(r){
var n={};(Array.isArray(r[1])?r[1]:[]).forEach(function(x){if(x&&x.contact)n[x.contact]=1});KN=n;
var L=$("tcgL");if(!L)return;L.innerHTML="";
var P=(Array.isArray(r[0])?r[0]:[]).filter(function(p){return p&&p.id!==me&&!official(p)});
if(!P.length){L.appendChild(E("div","tc2-e",q?"Aucune personne trouvée.":"Personne pour le moment."));return}
P.forEach(function(p){L.appendChild(card(p))});TM=Date.now()}).catch(function(){}).then(function(){BUSY=false;if(AGAIN){AGAIN=false;loadG(true)}})}
function setTab(k){TAB=k;var s=$("scrContacts");if(!s)return;
[].forEach.call(s.querySelectorAll("#tc2Tabs button"),function(b){b.classList.toggle("on",b.getAttribute("data-k")===k)});
var mine=k==="mine";
["tcAdd","tcQ","tcList"].forEach(function(i){var e=$(i);if(!e)return;if(mine)e.style.removeProperty("display");else e.style.setProperty("display","none","important")});
var g=$("tcGens");if(g){if(mine)g.style.setProperty("display","none","important");else g.style.removeProperty("display")}
if(mine&&DIRTY){DIRTY=false;try{if(typeof window.__tcLoad==="function")window.__tcLoad()}catch(e){}}
if(!mine)loadG(false)}
function mount(){
var s=$("scrContacts");if(!s||$("tc2Tabs"))return;
var bd=s.querySelector(".body");if(!bd)return;
var tabs=E("div");tabs.id="tc2Tabs";
[["mine","Mes contacts"],["gens","Gens"]].forEach(function(k){var b=E("button","",k[1]);b.type="button";b.setAttribute("data-k",k[0]);b.onclick=function(){setTab(k[0])};tabs.appendChild(b)});
bd.insertBefore(tabs,bd.firstChild);
var g=E("div");g.id="tcGens";
var ban=E("button","tc2-ban");ban.type="button";ban.innerHTML="<b>Mes contacts sur TÕÕLé</b><small>Vois qui, dans ton répertoire, est déjà ici</small>";
ban.onclick=function(){if(typeof window.__tcOpen==="function")window.__tcOpen();else tst("Mets à jour l'application pour utiliser cette fonction.")};
var q=E("input","tc2-q");q.id="tcgQ";q.placeholder="Rechercher une personne";q.setAttribute("autocapitalize","none");
q.oninput=function(){clearTimeout(QT);QT=setTimeout(function(){loadG(true)},350)};
var l=E("div");l.id="tcgL";
g.appendChild(ban);g.appendChild(q);g.appendChild(E("div","tc2-h","Annuaire"));g.appendChild(l);bd.appendChild(g);
setTab(TAB)}
setInterval(mount,700);mount();
})();
