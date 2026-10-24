(function(){
var EMJ=["👍","❤️","😂","😮","😢","🔥"],ov=window.openViewer;
if(!ov)return;
function nm(p){return p&&(p.pseudo||p.username||p.name||p.display_name||p.full_name||p.nom)||"Contact"}
function hold(v){window.__tsHold=v;var w=document.getElementById("stv");if(!w)return;var x=w.querySelector("video");if(x){if(v)x.pause();else x.play().catch(function(){})}if(w._au){if(v)w._au.pause();else w._au.play().catch(function(){})}}
function send(st,txt){return api("/rest/v1/statut_reactions",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({statut_id:String(st.id),user_id:String(me()),content:txt})})}
function pop(e){var w=document.getElementById("stv");if(!w)return;var d=document.createElement("div");d.textContent=e;d.style.cssText="position:absolute;left:50%;bottom:110px;font-size:56px;transform:translateX(-50%);transition:all 1s ease-out;opacity:1;z-index:7;pointer-events:none";w.appendChild(d);requestAnimationFrame(function(){d.style.bottom="55%";d.style.opacity="0"});setTimeout(function(){d.remove()},1100)}
function bar(w,st){
var b=document.createElement("div");b.style.cssText="position:absolute;left:0;right:0;bottom:0;z-index:6;padding:30px 10px calc(10px + env(safe-area-inset-bottom,0px));background:linear-gradient(rgba(255,255,255,0),rgba(255,255,255,.96) 35%);font-family:'Exo 2',sans-serif";
var row=document.createElement("div");row.style.cssText="display:flex;justify-content:space-around;margin-bottom:8px";var busy=false;
EMJ.forEach(function(e){var x=document.createElement("button");x.textContent=e;x.style.cssText="width:42px;height:42px;border-radius:50%;border:1px solid rgba(0,168,200,.5);background:#fff;font-size:22px;padding:0;box-shadow:0 0 8px rgba(0,229,255,.3)";x.onclick=function(){if(busy)return;busy=true;send(st,e).then(function(){pop(e);toast("Réaction envoyée")}).catch(function(){toast("Réaction non envoyée")});setTimeout(function(){busy=false},1200)};row.appendChild(x)});
var line=document.createElement("div");line.style.cssText="display:flex;gap:8px";
var inp=document.createElement("input");inp.maxLength=200;inp.placeholder="Répondre au statut…";inp.style.cssText="flex:1;min-width:0;height:42px;border-radius:21px;border:1px solid rgba(0,168,200,.5);background:#fff;color:#0b2a3a;padding:0 14px;font:inherit";
var go=document.createElement("button");go.textContent="➤";go.style.cssText="width:42px;height:42px;border-radius:50%;border:0;background:linear-gradient(135deg,#00e5ff,#00a8c8);color:#fff;font-size:18px;padding:0;flex:0 0 auto";
inp.onfocus=function(){hold(true)};inp.onblur=function(){setTimeout(function(){hold(false)},200)};
go.onclick=function(){var t=inp.value.trim();if(!t||busy)return;busy=true;send(st,t).then(function(){inp.value="";inp.blur();pop("💬");toast("Réponse envoyée")}).catch(function(){toast("Réponse non envoyée")});setTimeout(function(){busy=false},1200)};
line.appendChild(inp);line.appendChild(go);b.appendChild(row);b.appendChild(line);w.appendChild(b)}
function list(st){hold(true);
var o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:100000;background:rgba(0,40,60,.45);display:flex;align-items:flex-end";
function close(){o.remove();hold(false)}o.onclick=function(e){if(e.target===o)close()};
var sh=document.createElement("div");sh.style.cssText="width:100%;max-height:62vh;overflow-y:auto;background:#fff;border-top:4px solid #00a8c8;border-radius:22px 22px 0 0;padding:14px 16px 24px;color:#0b2a3a;font-family:'Exo 2',sans-serif";
var h=document.createElement("div");h.style.cssText="display:flex;align-items:center;margin-bottom:8px";h.innerHTML='<b style="flex:1;letter-spacing:.14em;color:#0097a7">RÉACTIONS</b>';var x=document.createElement("button");x.textContent="✕";x.style.cssText="background:none;border:0;font-size:22px;color:#0097a7";x.onclick=close;h.appendChild(x);
var body=document.createElement("div");body.textContent="Chargement…";sh.appendChild(h);sh.appendChild(body);o.appendChild(sh);document.body.appendChild(o);
api("/rest/v1/statut_reactions?select=user_id,content,created_at&statut_id=eq."+encodeURIComponent(String(st.id))+"&order=created_at.desc&limit=100").then(function(rows){
if(!rows||!rows.length){body.textContent="Aucune réaction pour l'instant";return}
var ids=[];rows.forEach(function(r){if(ids.indexOf(r.user_id)<0)ids.push(r.user_id)});
return api("/rest/v1/profiles?select=*&id=in.("+ids.map(encodeURIComponent).join(",")+")").catch(function(){return[]}).then(function(ps){var pm={};(ps||[]).forEach(function(p){pm[String(p.id)]=nm(p)});body.textContent="";
rows.forEach(function(r){var d=document.createElement("div");d.style.cssText="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #e0f6fa";var n=document.createElement("b");n.style.cssText="flex:0 0 auto;max-width:38%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap";n.textContent=pm[String(r.user_id)]||"Contact";var c=document.createElement("span");c.textContent=r.content;c.style.cssText="flex:1;word-break:break-word;font-size:"+(r.content.length<=4?"26px":"14px");d.appendChild(n);d.appendChild(c);body.appendChild(d)})})}).catch(function(){body.textContent="Impossible de charger les réactions"})}
function mineBtn(w,st){var b=document.createElement("button");b.textContent="💬 Réactions";b.style.cssText="position:absolute;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:6;padding:11px 20px;border-radius:22px;border:0;background:linear-gradient(135deg,#00e5ff,#00a8c8);color:#fff;font:700 14px 'Exo 2',sans-serif;box-shadow:0 0 14px rgba(0,229,255,.55)";b.onclick=function(){list(st)};w.appendChild(b)}
window.openViewer=function(st,mine,name){var r=ov.apply(this,arguments);var w=document.getElementById("stv");if(!w)return r;window.__tsHold=false;if(mine)mineBtn(w,st);else bar(w,st);return r};
})();
