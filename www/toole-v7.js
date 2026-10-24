(function(){
function T(m){try{(window.toast||alert)(m)}catch(e){}}
var has=false,RING=null;
var EXC='<svg viewBox="0 0 24 24"><path d="M12 6v8M12 18v.5"/></svg>';
var DOTS='<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/></svg>';
function go(id){
if(typeof window.openComposer!=="function"){T("Éditeur indisponible");return}
window.openComposer();var b=document.getElementById(id);
if(b)b.click();else T("Éditeur indisponible")}
var IC={v:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3z"/></svg>',p:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>',t:'<svg viewBox="0 0 24 24"><path d="M5 6V4h14v2M12 4v16M9 20h6"/></svg>'};
function sheet(){
var ov=document.createElement("div");ov.className="v7-ov";
ov.onclick=function(e){if(e.target===ov)ov.remove()};
var sh=document.createElement("div");sh.className="v7-sh";
ov.appendChild(sh);document.body.appendChild(ov);return{ov:ov,sh:sh}}
function picker(){
if(document.querySelector(".v7-ov"))return;
var s=sheet();s.sh.classList.add("v7-grid");
[["cV","v","Vidéo"],["cP","p","Photo"],["cT","t","Texte"]].forEach(function(o){
var b=document.createElement("button");b.type="button";b.className="v7-t";
b.innerHTML="<i>"+IC[o[1]]+"</i><span>"+o[2]+"</span>";
b.onclick=function(){s.ov.remove();go(o[0])};s.sh.appendChild(b)})}
/*v9cache*/
var mine=null,others=[],lastR=0,lastSig="",inited=0,MEI=null,C={s:[],n:{}},SEEN={};
var MK="\u2063TSX1:",BGS=["#00e5ff,#00a8c8","#fff,#8fefff","#00a8c8,#005f73","#ffe29f,#ff9a8b","#a8edea,#fed6e3"];
function ls(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||"null");localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function ck(){try{return "v9c:"+me()}catch(e){return "v9c"}}
function init(){if(inited)return;inited=1;var c=ls(ck());if(c&&c.s)C=c;SEEN=ls("v9seen")||{};build()}
function ini(n){return (n||"?").slice(0,2).toUpperCase()}
function parse(s){var b=s.body||"",i=b.indexOf(MK),d={};if(i>=0){try{d=JSON.parse(b.slice(i+MK.length))}catch(e){}}return{cap:i>=0?b.slice(0,i):b,d:d}}
function thumb(s){var o=parse(s),d=o.d;
if(d.p)return{u:d.p.replace("/upload/","/upload/c_fill,w_140,h_140,q_auto/")};
if(d.v)return{u:d.v.replace("/upload/","/upload/so_0,c_fill,w_140,h_140,q_auto/").replace(/\.[A-Za-z0-9]+(\?.*)?$/,".jpg")};
return{bg:BGS[d.bg||0],t:(o.cap||"").slice(0,14)}}
function fill(i,s,fb){
i.style.backgroundImage="";i.style.background="";i.classList.remove("v7-th");
if(!s){i.innerHTML=fb;return}
var t=thumb(s);i.classList.add("v7-th");
if(t.u){i.innerHTML=fb;var im=new Image();
im.onload=function(){i.innerHTML="";i.style.backgroundImage="url('"+t.u+"')"};im.src=t.u}
else{i.innerHTML="<b></b>";i.firstChild.textContent=t.t;i.style.background="linear-gradient(160deg,"+t.bg+")"}}
function build(){
var id;try{id=me()}catch(e){return}
C.s.sort(function(a,b){return a.created_at<b.created_at?1:-1});
mine=null;others=[];var seen={};
C.s.forEach(function(s){
if(s.author===id){if(!mine)mine=s;return}
if(seen[s.author])return;seen[s.author]=1;
others.push({st:s,name:C.n[s.author]||"?"})})}
function viewer(s,m,n){(window.openViewer||openViewer)(s,m,n)}
var _ov=window.openViewer;
if(typeof _ov==="function")window.openViewer=function(st,mi){
try{if(!mi&&st&&st.id){SEEN[st.id]=1;ls("v9seen",SEEN);setTimeout(paint,60)}}catch(e){}
return _ov.apply(this,arguments)};
function paint(){
var m=document.getElementById("v4stMe"),a=document.getElementById("v4stAll");
var row=document.getElementById("v4st");
if(!m||!a||!row)return;
var unseen=others.some(function(o){return !SEEN[o.st.id]});
var sig=(mine?mine.id:"")+"|"+others.map(function(o){return o.st.id+(SEEN[o.st.id]?"s":"")}).join(",");
if(sig===lastSig&&(!others.length||row.querySelector(".v7-c")))return;
lastSig=sig;
var mi=m.querySelector(".rg i"),ai=a.querySelector(".rg i");
if(!mi||!ai)return;
if(MEI===null)MEI=mi.innerHTML;
if(RING===null)RING=ai.innerHTML;
m.classList.toggle("v7-live",!!mine);fill(mi,mine,MEI);
a.classList.toggle("v7-none",!others.length);
a.classList.toggle("v7-live",unseen);
a.classList.toggle("v7-seen",!!others.length&&!unseen);
fill(ai,null,others.length?RING:EXC);
[].forEach.call(row.querySelectorAll(".v7-c"),function(x){x.remove()});
others.forEach(function(o){
var d=document.createElement("div");
d.className="v4s v7-c "+(SEEN[o.st.id]?"v7-seen":"v7-live");
d.innerHTML='<div class="rg"><i></i></div><span></span>';
fill(d.querySelector("i"),o.st,ini(o.name));
d.lastChild.textContent=o.name;
d.onclick=function(){viewer(o.st,false,o.name)};
row.appendChild(d)})}
function refresh(){
try{
if(typeof api!=="function"||typeof me!=="function")return;
var id=me();if(!id)return;
init();
var since=new Date(Date.now()-864e5).toISOString();
Promise.resolve(api("/rest/v1/statuts?select=id&created_at=gt."+since+"&limit=300")).then(function(rows){
var act={},have={};
(rows||[]).forEach(function(r){act[r.id]=1});
C.s=C.s.filter(function(s){return act[s.id]});
C.s.forEach(function(s){have[s.id]=1});
Object.keys(SEEN).forEach(function(k){if(!act[k])delete SEEN[k]});
var need=Object.keys(act).filter(function(k){return !have[k]});
if(!need.length)return;
return Promise.resolve(api("/rest/v1/statuts?select=id,body,created_at,author&id=in.("+need.join(",")+")")).then(function(n){C.s=C.s.concat(n||[])})
}).then(function(){
var miss=[];
C.s.forEach(function(s){if(s.author!==id&&!C.n[s.author]&&miss.indexOf(s.author)<0)miss.push(s.author)});
if(!miss.length)return;
return Promise.resolve(api("/rest/v1/profiles?select=id,pseudo&id=in.("+miss.join(",")+")")).then(function(p){(p||[]).forEach(function(x){C.n[x.id]=x.pseudo||"?"})})
}).then(function(){ls(ck(),C);ls("v9seen",SEEN);build();paint()}).catch(function(){})
}catch(e){}}
function soon(){if(Date.now()-lastR>8000){lastR=Date.now();refresh()}}
function home(){
var m=document.getElementById("v4stMe"),a=document.getElementById("v4stAll");
if(!m||!a||m._v7)return;m._v7=1;
m.onclick=function(){if(mine)viewer(mine,true,"Mon statut");else picker()};
var pl=m.querySelector(".plus");
if(pl)pl.onclick=function(e){e.stopPropagation();picker()};
a.onclick=function(){if(others.length&&typeof openStatuts==="function")openStatuts();else T("Aucun statut disponible")};
init();paint();refresh()}
var _l=window.loadStatuts;
if(typeof _l==="function")window.loadStatuts=function(){var r=_l.apply(this,arguments);setTimeout(refresh,700);return r};
setInterval(refresh,30000);
function head(){
var h=document.querySelector("#scrChat .chead");if(!h)return;
[].forEach.call(h.children,function(c){
if(/bk|cav|cname|v7-more/.test(c.className)||c.id==="callBtn")return;
c.classList.add("v7-x");c.style.setProperty("display","none","important")});
if(h.querySelector(".v7-more"))return;
var b=document.createElement("button");b.type="button";b.className="v7-more";
b.setAttribute("aria-label","Plus");b.innerHTML=DOTS;
b.onclick=function(){
var s=sheet();
[].forEach.call(h.querySelectorAll(".v7-x"),function(x){
var r=document.createElement("button");r.type="button";r.className="v7-r";
var l=(x.getAttribute("aria-label")||x.title||x.textContent||"Option").trim();
r.innerHTML="<i>"+x.innerHTML+"</i><span></span>";
r.lastChild.textContent=l;
r.onclick=function(){s.ov.remove();x.click()};s.sh.appendChild(r)})};
h.appendChild(b)}
function ph(){
[].forEach.call(document.querySelectorAll("#gTxt,#scrGroup .bar .tsta"),function(n){
if(n.placeholder!=="Écrire un message")n.placeholder="Écrire un message"});var r=document.getElementById("srch");if(r&&r.placeholder!=="Rechercher")r.placeholder="Rechercher"}
var q=0;
function run(){if(q)return;q=1;requestAnimationFrame(function(){q=0;home();soon();head();ph()})}
new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
run();
})();
