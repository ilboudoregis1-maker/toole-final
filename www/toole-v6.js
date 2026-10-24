(function(){
function T(m){try{(window.toast||alert)(m)}catch(e){}}
var I={v:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="3"/><path d="M16 10l5-3v10l-5-3z"/></svg>',
p:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 9"/></svg>',
t:'<svg viewBox="0 0 24 24"><path d="M5 6V4h14v2M12 4v16M9 20h6"/></svg>',
x:'<svg viewBox="0 0 24 24"><path d="M12 6v8M12 18v.5"/></svg>',
a:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>'};
function launch(id){
if(typeof window.openComposer!=="function"){T("Éditeur indisponible");return}
window.openComposer();var b=document.getElementById(id);
if(b)b.click();else T("Éditeur indisponible")}
function picker(){
if(document.getElementById("v6ov"))return;
var ov=document.createElement("div");ov.id="v6ov";ov.className="v6-ov";
ov.onclick=function(e){if(e.target===ov)ov.remove()};
var sh=document.createElement("div");sh.className="v6-sh";
[["cV","v","Vidéo"],["cP","p","Photo"],["cT","t","Texte"]].forEach(function(o){
var b=document.createElement("button");b.type="button";b.className="v6-t";
b.innerHTML="<i>"+I[o[1]]+"</i><span>"+o[2]+"</span>";
b.onclick=function(){ov.remove();launch(o[0])};sh.appendChild(b)});
ov.appendChild(sh);document.body.appendChild(ov)}
function bub(c,h,l,f){
var b=document.createElement("button");b.type="button";b.className="v6-b";
b.innerHTML='<div class="v6-c '+c+'">'+h+'</div><span></span>';
b.lastChild.textContent=l;b.onclick=f;return b}
function fixStatus(){
var box=document.getElementById("sxBox");
if(!box||!box.firstChild||box.querySelector(".v6-row"))return;
var row=document.createElement("div");row.className="v6-row";
row.appendChild(bub("plus",I.a,"Mon statut",picker));
var s=box.querySelector(".sx-strip");
if(s&&s.children.length){
var h=s.previousElementSibling;
if(h&&h.classList.contains("sx-h"))h.remove();
[].slice.call(s.children).forEach(function(it){row.appendChild(it)});
s.remove()}
else row.appendChild(bub("ex",I.x,"Récents",function(){T("Aucun statut disponible")}));
box.insertBefore(row,box.firstChild)}
function colors(){
var g=document.getElementById("gMsgs");if(!g)return;
[].forEach.call(g.querySelectorAll(".m:not(.me)>div:first-child"),function(n){
if(n.dataset.v6||n.className)return;n.dataset.v6=1;
var h=0,s=n.textContent;
for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;
n.style.color="hsl("+h+",65%,36%)"})}
var q=0;
function run(){if(q)return;q=1;requestAnimationFrame(function(){q=0;fixStatus();colors()})}
new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
run();
})();
