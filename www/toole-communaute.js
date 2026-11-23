(function(){
var d=document,filt="all",q="",busy=0,tm;
function $(i){return d.getElementById(i)}
function tx(s){return String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function apply(){var r=$("gRows");if(!r)return;
[].forEach.call(r.querySelectorAll(".sx-row"),function(x){
var n=tx((x.querySelector(".sx-n")||{}).textContent),s=tx((x.querySelector(".sx-s")||{}).textContent),m=s.indexOf("toi")>-1;
var ok=(!q||n.indexOf(q)>-1)&&(filt==="all"||(filt==="mine"&&m)||(filt==="joined"&&!m));
x.style.display=ok?"":"none"})}
function decorate(){var r=$("gRows");if(!r||busy||typeof window.api!=="function")return;
var L=[].filter.call(r.querySelectorAll(".sx-row"),function(x){return x.querySelector(".sx-n")});
if(!L.length){apply();return}busy=1;
Promise.all([window.api("/rest/v1/groups?select=id,name&order=created_at.desc"),window.api("/rest/v1/group_members?select=group_id")]).then(function(a){
var c={};a[1].forEach(function(m){c[m.group_id]=(c[m.group_id]||0)+1});
L.forEach(function(x,i){var g=a[0][i],n=x.querySelector(".sx-n"),s=x.querySelector(".sx-s");
if(!g||!n||!s||g.name!==n.textContent||s.dataset.cm)return;
var k=c[g.id]||1;s.dataset.cm=1;s.textContent+=" · "+k+" membre"+(k>1?"s":"")})
}).catch(function(){}).then(function(){busy=0;apply()})}
function boot(){var s=$("scrGroupes"),r=$("gRows"),b=s&&s.querySelector(".body");
if(!s||!r||!b)return setTimeout(boot,400);if($("cmHero"))return;
var h=d.createElement("div");h.id="cmHero";h.className="cm-hero";
h.innerHTML='<h2>Communautés</h2><p>Retrouve tes groupes, discute et partage ensemble.</p><button id="cmNew">＋ Créer un groupe</button>';
var t=d.createElement("div");t.className="cm-tools";
t.innerHTML='<input id="cmQ" class="cm-q" type="search" placeholder="Rechercher un groupe…" autocomplete="off"><div class="cm-chips"><button data-f="all" class="on">Tous</button><button data-f="mine">Créés par moi</button><button data-f="joined">Rejoints</button></div>';
b.insertBefore(t,b.firstChild);b.insertBefore(h,b.firstChild);
h.querySelector("#cmNew").onclick=function(){var g=$("gNew");if(g)g.click()};
t.querySelector("#cmQ").oninput=function(){q=tx(this.value);apply()};
[].forEach.call(t.querySelectorAll(".cm-chips button"),function(x){x.onclick=function(){filt=x.dataset.f;
[].forEach.call(t.querySelectorAll(".cm-chips button"),function(y){y.classList.toggle("on",y===x)});apply()}});
new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(decorate,60)}).observe(r,{childList:true});
decorate()}
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",boot);else boot();
})();
