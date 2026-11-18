/* TÕÕLé : bouton Partager du fil Vidéos */
(function(){"use strict";if(window.__tvs)return;window.__tvs=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
var st=document.createElement("style");st.textContent=
"#tv3sh{position:fixed;inset:0;z-index:100050;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;font-family:sans-serif}"
+"#tv3sh .tv3b{width:100%;max-height:75%;box-sizing:border-box;background:#fff;color:#0a2a66;border-radius:22px 22px 0 0;display:flex;flex-direction:column;padding:16px 14px calc(env(safe-area-inset-bottom,0px) + 16px)}"
+"#tv3sh .tv3t{font-size:17px;font-weight:800}"
+"#tv3sh .tv3q{height:44px;margin:10px 0;border:1px solid #d6ebf4;border-radius:22px;padding:0 16px;font-size:15px;color:#0a2a66;background:#f4fbfe;outline:none}"
+"#tv3sh .tv3li{overflow-y:auto}"
+"#tv3sh .tv3r{display:flex!important;align-items:center!important;gap:12px!important;width:100%!important;padding:10px 4px!important;background:none!important;border:0!important;text-align:left!important;font-size:15px!important;font-weight:700!important;color:#0a2a66!important}"
+"#tv3sh .tv3ra{flex:none;width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;display:grid;place-items:center;font-weight:800}"
+"#tv3sh .tv3e{padding:24px;text-align:center;color:#6b7c9b}";
document.head.appendChild(st);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function me(){var s=sess();return s&&s.user&&s.user.id||null}
function find(q){var s=sess(),t=(s&&s.access_token)||K,f="/rest/v1/profiles?select=id,pseudo&limit=25&order=pseudo.asc"+(q?"&pseudo=ilike."+encodeURIComponent("*"+q+"*"):"");
return fetch(U+f,{headers:{apikey:K,Authorization:"Bearer "+t}}).then(function(r){return r.json()}).then(function(j){return Array.isArray(j)?j:[]}).catch(function(){return[]})}
function go(p,txt){var bk=document.querySelector("#tvFeed .tvh .sq:not(.tvp)");if(bk)bk.click();
var d=document.getElementById("scrDecouvrir");if(d)d.classList.add("hide");document.body.classList.remove("dc-on");
if(typeof window.openChat!=="function")return;
Promise.resolve(window.openChat(p.id,p.pseudo||"")).then(function(){setTimeout(function(){var i=document.getElementById("txt");if(i){i.value=txt;i.dispatchEvent(new Event("input",{bubbles:true}));i.focus()}},500)})}
function sheet(it){var old=document.getElementById("tv3sh");if(old)old.remove();
var nb=it.querySelector(".tvn b"),nm=nb?nb.textContent.replace("@",""):"",cap=(it.querySelector(".tvx")||{}).textContent||"";
var txt="Regarde cette vidéo de @"+nm+" sur TÕÕLé"+(cap?" : "+cap.slice(0,80):"")+"\ntoole://video/"+(it.__p||"");
var o=E("div");o.id="tv3sh";o.onclick=function(e){if(e.target===o)o.remove()};
var b=E("div","tv3b"),q=E("input","tv3q"),l=E("div","tv3li");q.type="search";q.placeholder="Rechercher un pseudo";
b.appendChild(E("div","tv3t","Envoyer à"));b.appendChild(q);b.appendChild(l);o.appendChild(b);document.body.appendChild(o);
function paint(r){l.innerHTML="";if(!r.length)l.appendChild(E("div","tv3e","Aucun résultat"));
var C=window.__tvCert||{};r.sort(function(x,y){return (C[(y.pseudo||"").toLowerCase()]?1:0)-(C[(x.pseudo||"").toLowerCase()]?1:0)});r.forEach(function(p){if(p.id===me())return;var row=E("button","tv3r");row.appendChild(E("span","tv3ra",(p.pseudo||"?").charAt(0).toUpperCase()));row.appendChild(E("span","","@"+(p.pseudo||"")));if(C[(p.pseudo||"").toLowerCase()]){var sb=E("span");sb.innerHTML=window.__tvSeal?window.__tvSeal():"";row.appendChild(sb)}row.onclick=function(){o.remove();go(p,txt)};l.appendChild(row)})}
var tm;q.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){find(q.value.trim()).then(paint)},300)};
find("").then(paint)}
var IC='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M14 4l7 7-7 7v-4c-6 0-9.5 1.5-12 5 .8-6.500 4.500-10 12-10V4z"/></svg>';
function add(it){var rail=it.querySelector(".tvr");if(!rail||it.__sh)return;it.__sh=1;
var b=E("button","tv3s");b.setAttribute("aria-label","Partager");b.innerHTML="<i>"+IC+"</i><span>Partager</span>";
b.onclick=function(e){e.stopPropagation();sheet(it)};rail.insertBefore(b,rail.querySelector(".tkdisc"))}
setInterval(function(){document.querySelectorAll("#tvScr .tvi").forEach(add)},1200);
})();
