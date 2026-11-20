(function(){
if(window.__tbb)return;window.__tbb=1;
var M={},t0=0,busy=false;
async function load(){if(busy||Date.now()-t0<60000)return;busy=true;
try{var a=await api("/rest/v1/business_accounts?select=user_id&limit=300");if(a&&typeof a.json==="function")a=await a.json();
a=Array.isArray(a)?a:[];var m={};
if(a.length){var p=await api("/rest/v1/profiles?select=id,pseudo&id=in.("+a.map(function(x){return x.user_id}).join(",")+")");if(p&&typeof p.json==="function")p=await p.json();
(Array.isArray(p)?p:[]).forEach(function(r){if(r.pseudo)m[String(r.pseudo).toLowerCase()]=1})}
M=m;t0=Date.now()}catch(e){}busy=false}
function mark(){
var root=document.getElementById("tvFeed")||document.getElementById("tvScr");if(!root)return;
root.querySelectorAll("*").forEach(function(n){
if(n.children.length||n.hasAttribute("data-bz"))return;
var s=(n.textContent||"").trim();if(!s||s.length>40)return;
var k=s.replace(/^@/,"").toLowerCase();if(!M[k])return;
var nx=n.nextElementSibling;if(nx&&nx.getAttribute("data-bz"))return;
var b=document.createElement("span");b.setAttribute("data-bz","1");b.textContent="🏪 Business";
b.style.cssText="display:inline-block;margin-left:6px;padding:2px 8px;border-radius:10px;font-size:12px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);vertical-align:middle";
n.insertAdjacentElement("afterend",b)})}
setInterval(function(){load();try{mark()}catch(e){}},1200);
})();
