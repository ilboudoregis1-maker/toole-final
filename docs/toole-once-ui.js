(function(){
if(window.__tonceui)return;window.__tonceui=1;
function $(i){return document.getElementById(i)}
function T(s){try{toast(s)}catch(e){alert(s)}}
var st=document.createElement("style");
st.textContent=".tou-c{display:flex;align-items:center;gap:14px;padding:14px 12px;margin-top:10px;border-radius:16px;color:#fff;font-weight:700;font-size:16px;background:rgba(255,255,255,.06);border:1px solid rgba(0,229,255,.35)}.tou-c i{font-style:normal;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:21px;background:linear-gradient(135deg,#00e5ff,#7c3aed);box-shadow:0 0 12px rgba(0,229,255,.6)}.tou-c small{display:block;font-weight:400;font-size:12px;opacity:.7;margin-top:2px}.tou-b{flex:1;padding:14px;border-radius:14px;border:0;font-weight:800;font-size:15px}";
document.head.appendChild(st);
function S(){return window.__tonceSend}
function sheet(){var old=$("touiSheet");if(old)old.remove();
var o=document.createElement("div");o.id="touiSheet";
o.style.cssText="position:fixed;inset:0;z-index:99997;background:rgba(5,10,26,.55);display:flex;align-items:flex-end;justify-content:center";
var b=document.createElement("div");
b.style.cssText="width:100%;max-width:520px;box-sizing:border-box;padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 18px);border-radius:22px 22px 0 0;background:linear-gradient(180deg,#10265a,#0b1b3a);border-top:1px solid rgba(0,229,255,.7);box-shadow:0 -10px 30px rgba(0,229,255,.25);color:#fff";
b.innerHTML='<div style="font-weight:800;font-size:18px">👁 Vue unique</div><div style="font-size:12.5px;opacity:.75;margin-top:3px">Le destinataire ne peut l\'ouvrir qu\'une seule fois. Captures et enregistrements d\'écran bloqués.</div>';
function card(ic,t,sub,kind){var c=document.createElement("div");c.className="tou-c";c.innerHTML="<i>"+ic+"</i><div>"+t+"<small>"+sub+"</small></div>";
c.onclick=function(){o.remove();pick(kind)};b.appendChild(c)}
card("📷","Photo à vue unique","Depuis ta galerie, avec aperçu avant envoi","img");
card("🎬","Vidéo à vue unique","30 secondes maximum, compressée si besoin","vid");
var x=document.createElement("button");x.type="button";x.textContent="Annuler";
x.style.cssText="width:100%;margin-top:14px;padding:13px;border-radius:14px;border:1px solid rgba(255,255,255,.25);background:transparent;color:#fff;font-weight:700;font-size:15px";
x.onclick=function(){o.remove()};b.appendChild(x);
o.onclick=function(e){if(e.target===o)o.remove()};o.appendChild(b);document.body.appendChild(o)}
function pick(kind){var s=S();if(!s)return T("Vue unique indisponible");
s.pick(kind,function(f){if(kind==="img")preview(f);else{T("Vidéo : vue unique activée");s.video(f)}})}
function preview(f){var u=window.URL.createObjectURL(f);
var o=document.createElement("div");
o.style.cssText="position:fixed;inset:0;z-index:99998;background:#050a1a;display:flex;flex-direction:column";
var top=document.createElement("div");top.textContent="👁 Photo à vue unique";
top.style.cssText="padding:calc(env(safe-area-inset-top,0px) + 14px) 16px 10px;color:#fff;font-weight:800;font-size:16px";
var w=document.createElement("div");w.style.cssText="flex:1;min-height:0;display:flex;align-items:center;justify-content:center;padding:8px";
var im=new Image();im.src=u;im.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:14px";w.appendChild(im);
var bar=document.createElement("div");bar.style.cssText="display:flex;gap:10px;padding:12px 16px calc(env(safe-area-inset-bottom,0px) + 16px)";
function close(){try{window.URL.revokeObjectURL(u)}catch(e){}o.remove()}
var a=document.createElement("button");a.type="button";a.className="tou-b";a.textContent="Annuler";a.style.cssText+=";background:rgba(255,255,255,.12);color:#fff";a.onclick=close;
var s=document.createElement("button");s.type="button";s.className="tou-b";s.textContent="Envoyer 👁1";s.style.cssText+=";background:linear-gradient(135deg,#00e5ff,#7c3aed);color:#fff";
s.onclick=function(){close();S().photo(f)};
bar.appendChild(a);bar.appendChild(s);o.appendChild(top);o.appendChild(w);o.appendChild(bar);document.body.appendChild(o)}
function addBtn(id){var m=$(id);if(!m||m.dataset.toui)return;m.dataset.toui="1";
var b=document.createElement("button");b.type="button";b.className=(m.className||"").replace(/\brec\b/g,"").trim();
b.setAttribute("aria-label","Vue unique");
b.innerHTML='<span style="position:relative;font-size:19px;line-height:1">👁<b style="position:absolute;right:-7px;bottom:-5px;font-size:9px;background:#7c3aed;color:#fff;border-radius:8px;padding:0 4px">1</b></span>';
b.onclick=function(e){e.preventDefault();sheet()};m.parentNode.insertBefore(b,m)}
setInterval(function(){addBtn("vmic");addBtn("gMic")},2000);
})();
