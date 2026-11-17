/* TÕÕLé : carte du bas du fil Vidéos */
(function(){"use strict";if(window.__tv2)return;window.__tv2=1;
var VER=["TÕÕLé_Officiel","CNS.corp","Canisius Régis"];
var st=document.createElement("style");st.textContent=
"#tvScr .tvc{left:10px!important;right:76px!important;padding:12px!important;border-radius:22px!important;background:rgba(8,20,60,.62)!important;backdrop-filter:blur(8px)!important;border:1px solid rgba(80,160,255,.25)!important}"
+"#tvScr .tvn b{display:none!important}"
+".tv2h{display:flex;align-items:center;gap:8px;margin-bottom:6px}"
+".tv2a{flex:none;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#00c2e0,#2f6fe0);display:grid;place-items:center;font-weight:800;border:2px solid rgba(255,255,255,.3)}"
+".tv2n{font-weight:800;font-size:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
+".tv2v{flex:none;display:flex}"
+".tv2f{flex:none;margin-left:auto;border:0;border-radius:16px;padding:7px 14px;background:#fff;color:#0a2a66;font-weight:800;font-size:13px}";
document.head.appendChild(st);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var CK='<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function setup(it){var c=it.querySelector(".tvc"),nb=c&&c.querySelector(".tvn b");if(!c||!nb)return;it.__tv2=1;
var name=nb.textContent.replace("@","").trim();
var h=E("div","tv2h"),av=E("div","tv2a",(name||"?").charAt(0).toUpperCase()),nm=E("span","tv2n",name);
var op=function(){nb.click()};av.onclick=op;nm.onclick=op;
h.appendChild(av);h.appendChild(nm);
if(VER.indexOf(name)>=0){var bd=E("span","tv2v");bd.innerHTML=CK;h.appendChild(bd)}
var fl=it.querySelector(".tkfl"),b=E("button","tv2f","+ S'abonner");
b.onclick=function(e){e.stopPropagation();if(fl){fl.click();setTimeout(function(){b.textContent=/✓|^abonné/i.test((fl.textContent||"").trim())?"Abonné ✓":"+ S'abonner"},250)}else op()};
h.appendChild(b);c.insertBefore(h,c.firstChild)}
setInterval(function(){document.querySelectorAll("#tvScr .tvi").forEach(function(it){if(!it.__tv2)setup(it)})},500);
})();
