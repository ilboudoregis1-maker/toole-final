(function(){
if(window.__tbb)return;window.__tbb=1;
var M={},t0=0,busy=false;
var IC='<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-4h4v4"/></svg>';
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
var b=document.createElement("span");b.setAttribute("data-bz","1");
b.style.cssText="display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:2px 8px 2px 6px;border-radius:999px;font-family:system-ui,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;line-height:1.4;color:#f5c451;background:rgba(15,22,38,.78);border:1px solid rgba(245,196,81,.55);vertical-align:middle";
b.innerHTML=IC+"Business";
n.insertAdjacentElement("afterend",b)})}
setInterval(function(){load();try{mark()}catch(e){}},1200);
})();
