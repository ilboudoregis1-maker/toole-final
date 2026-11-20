(function(){
if(window.__tnv)return;window.__tnv=1;
var MAP={"découvrir":"Nouveautés","explorer":"Nouveautés","vidéo":"Divertissement","vidéos":"Divertissement"};
var strip=null,busy=false,SH=[];
function ren(){
document.querySelectorAll("#v4nav,.dc-seg,#scrDecouvrir .dc-hd").forEach(function(root){
var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n;
while((n=w.nextNode())){var t=n.nodeValue,s=t.trim(),m=MAP[s.toLowerCase()];if(!m)continue;
var up=s.length>1&&s===s.toUpperCase();n.nodeValue=t.replace(s,up?m.toUpperCase():m)}});
document.querySelectorAll('[aria-label="Découvrir"],[aria-label="Explorer"]').forEach(function(e){e.setAttribute("aria-label","Nouveautés")})}
async function load(){if(busy)return;busy=true;
try{var r=await api("/rest/v1/business_accounts?select=user_id,shop_name,description&avant_jusqua=gt."+encodeURIComponent(new Date().toISOString())+"&order=avant_jusqua.desc&limit=10");
if(r&&typeof r.json==="function")r=await r.json();SH=Array.isArray(r)?r:[]}catch(e){SH=[]}busy=false}
function draw(){
var sc=document.getElementById("scrDecouvrir");
if(!sc||sc.classList.contains("hide")){if(strip){strip.remove();strip=null}return}
var seg=sc.querySelector(".dc-seg");if(!seg||!SH.length||(strip&&strip.isConnected))return;
strip=document.createElement("div");
strip.style.cssText="margin:10px 12px;padding:10px 12px;border-radius:14px;background:linear-gradient(135deg,rgba(0,194,224,.14),rgba(47,111,224,.14));border:1px solid rgba(47,111,224,.3)";
var h=document.createElement("div");h.style.cssText="font-weight:800;font-size:14px;color:#0a2a66;margin-bottom:8px";h.textContent="⭐ Boutiques à la une";strip.appendChild(h);
var row=document.createElement("div");row.style.cssText="display:flex;gap:8px;overflow-x:auto";strip.appendChild(row);
SH.forEach(function(s){var b=document.createElement("button");b.type="button";b.textContent="🏪 "+s.shop_name;
b.style.cssText="flex:none;border:0;border-radius:20px;padding:9px 14px;font-weight:800;font-size:14px;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0)";
b.onclick=function(){if(window.TooleBiz&&window.TooleBiz.shop)window.TooleBiz.shop(s)};row.appendChild(b)});
seg.insertAdjacentElement("afterend",strip)}
load();setInterval(load,60000);setInterval(function(){try{ren();draw()}catch(e){}},900);
})();
