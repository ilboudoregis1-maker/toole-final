/* TÕÕLé — Explorer v2 : fil high-tech, tendances, suggestions, partage (remplace toole-decouvrir.js) */
(function(){"use strict";if(window.__tdec)return;window.__tdec=1;
var U="https://jbjeqxubpqqypysfsubd.supabase.co",K="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR";
var tab="posts",Q="",sec,box,MY=null,NAMES={},FILT="all",LIM=30,chipsEl=null;
function $(i){return document.getElementById(i)}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function uid(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function api(p,o){o=o||{};var s=sess();o.headers=Object.assign({apikey:K,Authorization:"Bearer "+(s&&s.access_token),"Content-Type":"application/json"},o.headers||{});return fetch(U+"/rest/v1/"+p,o).then(function(r){return r.text().then(function(t){try{return t?JSON.parse(t):[]}catch(e){return[]}})}).catch(function(){return[]})}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function ini(n){return(n||"?").trim().charAt(0).toUpperCase()}
function ago(d){var s=(Date.now()-new Date(d).getTime())/1000;if(s<60)return"à l'instant";if(s<3600)return"il y a "+Math.floor(s/60)+" min";if(s<86400)return"il y a "+Math.floor(s/3600)+" h";if(s<604800)return"il y a "+Math.floor(s/86400)+" j";return new Date(d).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}
function toast(m){var t=el("div","dc-toast",m);sec.appendChild(t);setTimeout(function(){t.remove()},1800)}

/* ---------- Palette unique : 2 couleurs de marque + neutres + 1 couleur d'alerte ---------- */
var css=el("style");css.textContent=
"#scrDecouvrir{--c1:#00c2e0;--c2:#2f6fe0;--g:linear-gradient(135deg,var(--c1),var(--c2));--ink:#0a2a66;--mut:#6b7c9b;--bg:#f4fbfe;--card:#fff;--line:#d6ebf4;--soft:#e8f6fb;--tint:#dbe8ff;--red:#e5484d;--sh:0 6px 20px rgba(20,50,110,.08);background:var(--bg);color:var(--ink);flex-direction:column}"
+"html body #scrDecouvrir{background:#f4fbfe!important;color:#0a2a66;color-scheme:light}"
+"#scrDecouvrir:not(.hide){display:flex}"
+"#scrDecouvrir *{box-sizing:border-box}"
+".dc-hd{display:flex;align-items:center;gap:8px;padding:calc(env(safe-area-inset-top,0px) + 12px) 12px 14px;background:var(--g);color:#fff;box-shadow:0 4px 18px rgba(47,111,224,.28)}"
+".dc-hd h1{flex:1;margin:0;font-family:Orbitron,Exo 2,sans-serif;font-size:20px;font-weight:800;letter-spacing:1px;color:#fff}"
+".dc-ib{width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.2);display:grid;place-items:center;padding:0}"
+".dc-ib svg{width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.dc-ib:active{transform:scale(.92)}"
+".dc-bar{padding:10px 12px 6px;background:var(--card);box-shadow:0 1px 0 var(--line)}"
+".dc-srch{width:100%;border:1px solid var(--line);background:var(--soft);border-radius:22px;padding:11px 16px;font-size:15px;color:var(--ink);outline:none}.dc-srch:focus{border-color:var(--c1);box-shadow:0 0 0 3px rgba(0,194,224,.18)}"
+".dc-seg{display:flex;gap:6px;padding:8px 0 6px}"
+".dc-seg button{flex:1;padding:9px 4px;border:0;border-radius:20px;background:var(--soft);font-weight:700;font-size:14px;color:var(--mut);transition:.2s}"
+".dc-seg button.on{background:var(--g);color:#fff;box-shadow:0 4px 12px rgba(47,111,224,.35)}"
+".dc-body{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 0 calc(env(safe-area-inset-bottom,0px) + 90px)}"
+".dc-h{display:flex;align-items:center;justify-content:space-between;margin:6px 16px 8px;font-size:13px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;color:var(--mut)}"
+".dc-h b{width:28px;height:3px;border-radius:3px;background:var(--g);display:inline-block}"
+".dc-stories{display:flex;gap:12px;overflow-x:auto;padding:4px 14px 12px;scrollbar-width:none}.dc-stories::-webkit-scrollbar{display:none}"
+".dc-st{flex:none;width:68px;text-align:center;font-size:12px;color:var(--ink);font-weight:600}"
+".dc-st .rg{width:62px;height:62px;border-radius:50%;padding:3px;background:conic-gradient(var(--c1),var(--c2),var(--c1));margin:0 auto 5px}"
+".dc-st .rg div{width:100%;height:100%;border-radius:50%;border:3px solid var(--bg);background:var(--g);color:#fff;display:grid;place-items:center;font-weight:800;font-size:20px}"
+".dc-st span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".dc-card{background:var(--card);border-radius:20px;margin:0 12px 12px;padding:14px;box-shadow:var(--sh);border:1px solid var(--line);animation:dcUp .45s both}"
+"@keyframes dcUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}"
+".dc-top{display:flex;align-items:center;gap:10px;margin-bottom:10px}"
+".dc-av{flex:none;width:44px;height:44px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center;font-weight:800;font-size:18px;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--c1)}"
+".dc-n{font-weight:800;font-size:15.5px;color:var(--ink)}.dc-d{font-size:12.5px;color:var(--mut)}"
+".dc-t{font-size:16px;line-height:1.45;color:var(--ink);white-space:pre-wrap;word-break:break-word;margin:2px 0 10px}"
+".dc-more{border:0;background:none;color:var(--c2);font-weight:700;padding:0;margin-left:4px}"
+".dc-imgw{position:relative;margin:4px 0 10px}"
+".dc-img{width:100%;max-height:440px;object-fit:cover;border-radius:16px;display:block;background:var(--soft)}"
+".dc-pop{position:absolute;inset:0;display:grid;place-items:center;font-size:84px;pointer-events:none;opacity:0}.dc-pop.go{animation:dcPop .7s}"
+"@keyframes dcPop{0%{opacity:0;transform:scale(.4)}30%{opacity:1;transform:scale(1.15)}100%{opacity:0;transform:scale(1)}}"
+".dc-x{margin-left:auto;border:0;background:rgba(229,72,77,.12);color:var(--red);border-radius:14px;padding:6px 12px;font-size:12.5px;font-weight:700}"
+".dc-sum{display:flex;justify-content:space-between;font-size:13px;color:var(--mut);padding:2px 2px 8px;min-height:18px}"
+".dc-r{display:flex;gap:6px;border-top:1px solid var(--line);padding-top:8px}"
+".dc-r button{flex:1;border:0;background:var(--soft);border-radius:14px;padding:9px 0;font-size:16px;color:var(--mut);transition:.15s}"
+".dc-r button small{font-size:12px;font-weight:700;margin-left:3px}"
+".dc-r button.me{background:var(--tint);color:var(--c2);box-shadow:inset 0 0 0 1.5px var(--c2)}"
+".dc-r button.sh{flex:none;width:46px}.dc-r button:active{transform:scale(.9)}"
+".dc-comp{display:block}.dc-ct{display:flex;gap:10px;align-items:center}"
+".dc-fake{flex:1;text-align:left;border:1px solid var(--line);background:var(--soft);border-radius:24px;padding:12px 16px;color:var(--mut);font-size:15px}"
+".dc-in{width:100%;border:1px solid var(--line);background:var(--soft);border-radius:16px;padding:12px 14px;font-size:16px;color:var(--ink);outline:none;resize:none}"
+".dc-row{display:flex;gap:10px;margin-top:10px;align-items:center}.dc-cnt{font-size:12px;color:var(--mut)}"
+".dc-ph{border:0;background:var(--soft);color:var(--c2);border-radius:20px;padding:10px 16px;font-weight:700}"
+".dc-go{margin-left:auto;border:0;background:var(--g);color:#fff;border-radius:20px;padding:10px 24px;font-weight:800;box-shadow:0 4px 12px rgba(47,111,224,.35)}.dc-go:disabled{opacity:.5}"
+".dc-sk{height:150px;background:linear-gradient(90deg,var(--card) 25%,var(--soft) 50%,var(--card) 75%);background-size:200% 100%;animation:dcSk 1.2s infinite}"
+"@keyframes dcSk{to{background-position:-200% 0}}"
+".dc-empty{text-align:center;color:var(--mut);padding:30px 20px;font-size:15px;white-space:pre-line}"
+".dc-sug{display:flex;gap:10px;overflow-x:auto;padding:0 12px 14px;scrollbar-width:none}.dc-sug::-webkit-scrollbar{display:none}"
+".dc-pc{flex:none;width:132px;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:14px 10px;text-align:center;box-shadow:var(--sh)}"
+".dc-pc .dc-av{margin:0 auto 8px;width:52px;height:52px;font-size:21px}.dc-pc .dc-n{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"
+".dc-pc button{margin-top:10px;width:100%;border:0;border-radius:14px;padding:8px 0;background:var(--g);color:#fff;font-weight:700;font-size:13px}"
+".dc-list .dc-card{display:flex;align-items:center;gap:12px;padding:12px 14px;margin-bottom:8px}.dc-list .dc-top{margin:0;flex:1}"
+".dc-go2{border:0;background:var(--tint);color:var(--c2);font-weight:800;font-size:13px;border-radius:14px;padding:8px 14px}"
+".dc-view{position:fixed;inset:0;z-index:99999;background:rgba(5,12,25,.94);display:grid;place-items:center}.dc-view img{max-width:100%;max-height:100%;object-fit:contain}"
+".dc-toast{position:absolute;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 100px);transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:20px;font-size:14px;font-weight:700;z-index:50}"
+".dc-sheet{position:absolute;inset:0;z-index:60;display:flex;flex-direction:column;justify-content:flex-end}.dc-bd{position:absolute;inset:0;background:rgba(5,12,25,.55)}"
+".dc-pn{position:relative;background:var(--card);border-radius:22px 22px 0 0;max-height:82%;min-height:46%;display:flex;flex-direction:column;box-shadow:0 -10px 30px rgba(0,0,0,.25);animation:dcUp .3s both}"
+".dc-ch{text-align:center;font-weight:800;padding:16px 14px 12px;border-bottom:1px solid var(--line);color:var(--ink)}"
+".dc-cl{flex:1;overflow-y:auto;padding:10px 14px}"
+".dc-cm{display:flex;gap:10px;margin-bottom:12px}.dc-sm{width:36px;height:36px;font-size:15px;box-shadow:none}"
+".dc-cb{flex:1;background:var(--soft);border-radius:16px;padding:8px 12px}"
+".dc-cn{font-weight:800;font-size:14px;color:var(--ink)}.dc-cn small{font-weight:600;color:var(--mut);margin-left:8px;font-size:12px}"
+".dc-ctx{font-size:15px;line-height:1.4;color:var(--ink);white-space:pre-wrap;word-break:break-word}"
+".dc-cx{border:0;background:none;color:var(--red);font-size:12px;font-weight:700;padding:4px 0 0}"
+".dc-cr{display:flex;gap:8px;padding:10px 12px calc(env(safe-area-inset-bottom,0px) + 10px);border-top:1px solid var(--line)}.dc-cr .dc-in{border-radius:22px}.dc-cr .dc-go{margin:0;padding:10px 18px}"
+".dc-cbt{border:0;background:none;color:var(--c2);font-weight:700;font-size:13px;padding:0}"
+".dc-ic{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}"
+".dc-r button{display:flex;align-items:center;justify-content:center;gap:5px}.dc-r button small{margin:0}"
+".dc-r button.me .dc-ic{fill:rgba(47,111,224,.2)}"
+".dc-cbt,.dc-ph{display:inline-flex;align-items:center;gap:6px}"
+".dc-pop svg{width:96px;height:96px;stroke:#fff;stroke-width:1.6;fill:#2f6fe0}"
+".dc-hd{position:relative;overflow:hidden}.dc-hd>*{position:relative}"
+".dc-hd::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.28) 1px,transparent 1.6px);background-size:14px 14px;pointer-events:none}"
+".dc-hd h1{font-size:18px;letter-spacing:2px;text-shadow:0 0 14px rgba(255,255,255,.45)}"
+".dc-logo{flex:none;width:38px;height:38px;border-radius:11px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.25)}"
+".dc-srch{padding-left:42px;background:var(--soft) url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%232f6fe0%27%20stroke-width=%272.2%27%20stroke-linecap=%27round%27%3E%3Ccircle%20cx=%2711%27%20cy=%2711%27%20r=%277%27/%3E%3Cpath%20d=%27M20%2020l-4-4%27/%3E%3C/svg%3E) no-repeat 15px center/18px}"
+".dc-h span:first-child{font-family:Orbitron,'Exo 2',sans-serif;font-size:11px;letter-spacing:1.8px}"
+".dc-h #dcCount{display:inline-flex;align-items:center;gap:6px;text-transform:none;letter-spacing:0;font-size:12px;font-weight:700;color:var(--c2)}"
+".dc-h #dcCount::before{content:'';width:7px;height:7px;border-radius:50%;background:var(--c1);box-shadow:0 0 8px var(--c1);animation:dcPulse 1.6s infinite}"
+"@keyframes dcPulse{50%{opacity:.3}}"
+".dc-card:not(.dc-sk){box-shadow:0 8px 24px rgba(47,111,224,.10),0 0 0 1px rgba(0,194,224,.07)}"
+".dc-card:not(.dc-sk)::before{content:'';position:absolute;left:18px;right:18px;top:0;height:2px;border-radius:0 0 2px 2px;background:var(--g);opacity:.8}"
+".dc-card{position:relative}"
+".dc-comp{border:1.5px solid transparent;background:linear-gradient(var(--card),var(--card)) padding-box,var(--g) border-box}"
+".dc-st .rg{box-shadow:0 0 14px rgba(0,194,224,.45)}"
+".dc-r button.me{box-shadow:inset 0 0 0 1.5px var(--c2),0 0 12px rgba(47,111,224,.3)}"
+".dc-seg button.on{box-shadow:0 4px 16px rgba(47,111,224,.45),0 0 0 1px rgba(255,255,255,.25) inset}"
+".dc-elogo{display:block;width:72px;height:72px;margin:0 auto 12px;border-radius:20px;box-shadow:0 8px 24px rgba(47,111,224,.25)}"
+".dc-more2{margin-left:auto;flex:none;border:0;background:var(--soft);color:var(--mut);width:36px;height:36px;border-radius:50%;display:grid;place-items:center;padding:0}.dc-more2 .dc-ic{width:18px;height:18px}"
+".dc-pn.dc-mn{min-height:0;padding:8px 0 calc(env(safe-area-inset-bottom,0px) + 10px)}"
+".dc-mi{display:flex;align-items:center;gap:14px;width:100%;border:0;background:none;padding:15px 20px;font-size:16px;font-weight:700;color:var(--ink);text-align:left}.dc-mi:active{background:var(--soft)}.dc-mi.red{color:var(--red)}"
+".dc-chips{display:flex;gap:8px;padding:2px 0 8px}"
+".dc-chips button{border:1px solid var(--line);background:var(--card);color:var(--mut);border-radius:16px;padding:6px 16px;font-size:13px;font-weight:700}"
+".dc-chips button.on{border-color:var(--c2);color:var(--c2);background:var(--tint)}"
+".dc-mp{display:block;margin:4px auto 12px;border:0;background:var(--tint);color:var(--c2);border-radius:20px;padding:11px 22px;font-weight:800;font-size:14px}"
+".dc-new{display:block;position:sticky;top:0;z-index:5;margin:0 12px 12px;width:calc(100% - 24px);border:0;border-radius:20px;padding:11px;background:var(--g);color:#fff;font-weight:800;font-size:14px;box-shadow:0 6px 18px rgba(47,111,224,.4);animation:dcUp .3s both}"
+"html body #scrList .hdr .zd-ic{position:relative!important}"
+".dc-badge{position:absolute;top:-5px;right:-5px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#e5484d;color:#fff;font:800 11px/20px 'Exo 2',sans-serif;text-align:center;box-shadow:0 0 0 2px #fff;display:none;pointer-events:none}"
+".dc-alert{position:fixed;left:12px;right:12px;top:calc(env(safe-area-inset-top,0px) + 10px);z-index:99998;display:flex;align-items:center;gap:12px;background:#fff;color:#0a2a66;border:1px solid #d6ebf4;border-left:5px solid #2f6fe0;border-radius:18px;padding:12px 14px;box-shadow:0 12px 32px rgba(10,50,110,.28);animation:dcDown .35s both}"
+"@keyframes dcDown{from{opacity:0;transform:translateY(-24px)}to{opacity:1;transform:none}}"
+".dc-alert .a{flex:none;width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#00c2e0,#2f6fe0);color:#fff;display:grid;place-items:center;font-weight:800;font-size:17px}"
+".dc-alert b{display:block;font-size:14.5px}.dc-alert span{display:block;font-size:13.5px;color:#6b7c9b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:62vw}"
+"body.dc-on #v4nav{display:none!important}";
document.head.appendChild(css);

var IS={"👍":'<path d="M7 11v9H4v-9h3z"/><path d="M7 11l4-8c1.6 0 2.6 1.1 2.3 2.6L12.6 9H19a2 2 0 0 1 2 2.3l-1.2 7a2 2 0 0 1-2 1.7H7"/>',
"❤️":'<path d="M12 20s-7-4.4-9-9.2C1.8 7.6 4 5 6.7 5c1.8 0 3.2 1 5.3 3 2.1-2 3.5-3 5.3-3 2.7 0 4.9 2.6 3.7 5.8C19 15.6 12 20 12 20z"/>',
"😂":'<circle cx="12" cy="12" r="9"/><path d="M8 13h8a4 4 0 0 1-8 0z"/><path d="M9 9.5h.01M15 9.5h.01"/>',
"😮":'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="15.5" r="1.8"/><path d="M9 9.5h.01M15 9.5h.01"/>',
"🔥":'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.5 1 2 1.8 2 0-3-.3-5 1.2-8z"/>',
share:'<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V4"/><path d="M8 8l4-4 4 4"/>',
chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z"/>',
cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
dots:'<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
mark:'<path d="M6 3h12v18l-6-4.5L6 21z"/>',
ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
eyeoff:'<path d="M3 3l18 18"/><path d="M10.6 6.2A9.8 9.8 0 0 1 12 6c5 0 8.5 4 9.5 6a14 14 0 0 1-3.2 3.8M6.5 7.6C4.4 9 3 11 2.5 12c1 2 4.5 6 9.5 6 1.4 0 2.7-.3 3.8-.8"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'};
function ico(k){return '<svg class="dc-ic" viewBox="0 0 24 24" aria-hidden="true">'+(IS[k]||"")+'</svg>'}
function lsGet(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function KX(n){return "toole_ex_"+n+"_"+(uid()||"")}
function savedList(){return lsGet(KX("saved"),[])}
function isSaved(id){return savedList().indexOf(String(id))>=0}
function toggleSaved(id){var a=savedList(),i=a.indexOf(String(id));if(i>=0)a.splice(i,1);else a.unshift(String(id));lsSet(KX("saved"),a);return i<0}
function markSeen(iso){var c=lsGet(KX("seen"),null);if(!c||iso>c)lsSet(KX("seen"),iso)}
/* ---------- Utilitaires média ---------- */
function upload(bl){var p=uid()+"/dc_"+Date.now()+".jpg";if(!window.tgUpload)return Promise.reject(1);return window.tgUpload(bl,p).then(function(){return "tg:"+p})}
function setImg(im,v){if(!v)return;if(v.indexOf("tg:")!==0){im.src=v;return}var p=v.slice(3);fetch(window.tgUrl(p,"image")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(b){im.src=window.URL.createObjectURL(b)}).catch(function(){im.alt="Photo indisponible"})}
function shrink(f){return new Promise(function(ok,ko){var rd=new FileReader();rd.onerror=ko;rd.onload=function(){var i=new Image();i.onerror=ko;i.onload=function(){var s=Math.min(1,1080/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext("2d").drawImage(i,0,0,c.width,c.height);c.toBlob(function(b){b?ok(b):ko()},"image/jpeg",.72)};i.src=rd.result};rd.readAsDataURL(f)})}
function viewer(src){var v=el("div","dc-view"),i=el("img");i.src=src;v.appendChild(i);v.onclick=function(){v.remove()};document.body.appendChild(v)}
function chat(p){if(window.openChat){close();window.openChat(p.id,p.pseudo||"")}else alert("Chat indisponible")}
function skel(L){L.innerHTML="";for(var i=0;i<3;i++)L.appendChild(el("div","dc-card dc-sk"))}
function empty(t){var d=el("div","dc-empty"),i=el("img","dc-elogo");i.src="logo.png";i.alt="";i.onerror=function(){i.style.display="none"};d.appendChild(i);d.appendChild(document.createTextNode(t));return d}
function head(t,r){var h=el("div","dc-h");h.appendChild(el("span","",t));if(r)h.appendChild(el("span","",r));else h.appendChild(el("b"));return h}

/* ---------- Personnes ---------- */
function pcard(p){var c=el("div","dc-pc");c.appendChild(el("div","dc-av",ini(p.pseudo)));c.appendChild(el("div","dc-n",p.pseudo||"Sans nom"));var b=el("button","","Écrire");b.onclick=function(){chat(p)};c.appendChild(b);return c}
function suggestions(P){var s=el("div","dc-sug");P.forEach(function(p){s.appendChild(pcard(p))});return s}
function person(p){var c=el("div","dc-card"),t=el("div","dc-top");t.appendChild(el("div","dc-av",ini(p.pseudo)));t.appendChild(el("div","dc-n",p.pseudo||"Sans nom"));c.appendChild(t);if(p.id!==uid()){var b=el("button","dc-go2","Écrire ›");b.onclick=function(){chat(p)};c.appendChild(b)}return c}
function people(){var L=el("div","dc-list");box.appendChild(head("Annuaire"));box.appendChild(L);skel(L);
api("profiles?select=id,pseudo&order=pseudo.asc&limit=60"+(Q?"&pseudo=ilike."+encodeURIComponent("*"+Q+"*"):"")).then(function(r){L.innerHTML="";if(!r.length)L.appendChild(empty("Personne trouvée."));r.forEach(function(p){L.appendChild(person(p))})})}
function stories(){var s=el("div","dc-stories");api("profiles?select=id,pseudo&order=pseudo.asc&limit=20").then(function(r){r.filter(function(p){return p.id!==uid()}).forEach(function(p){var d=el("div","dc-st"),g=el("div","rg");g.appendChild(el("div","",ini(p.pseudo)));d.appendChild(g);d.appendChild(el("span","",p.pseudo||"?"));d.onclick=function(){chat(p)};s.appendChild(d)});if(!s.children.length)s.style.display="none"});return s}

/* ---------- Publier ---------- */
function composer(L){var c=el("div","dc-card dc-comp"),top=el("div","dc-ct");top.appendChild(el("div","dc-av",ini(MY)));var fk=el("button","dc-fake","Quoi de neuf"+(MY?", "+MY:"")+" ?");top.appendChild(fk);c.appendChild(top);
var ex=el("div");ex.style.display="none";var ta=el("textarea","dc-in");ta.rows=3;ta.maxLength=2000;ta.placeholder="Partage quelque chose de chouette…";ta.style.marginTop="10px";
var fi=el("input");fi.type="file";fi.accept="image/*";fi.style.display="none";var pv=el("img","dc-img");pv.style.display="none";var ph=el("button","dc-ph"),cn=el("span","dc-cnt","0/2000"),b=el("button","dc-go","Publier"),row=el("div","dc-row"),blob=null;
ta.oninput=function(){cn.textContent=ta.value.length+"/2000"};
ph.innerHTML=ico("cam")+" Photo";var vb=el("button","dc-ph");vb.innerHTML="🎬 Vidéo";var vf=el("input");vf.type="file";vf.accept="video/*";vf.style.display="none";var pv2=el("video","dc-img");pv2.style.display="none";pv2.controls=true;pv2.muted=true;pv2.setAttribute("playsinline","");var vblob=null;
vb.onclick=function(){vf.click()};
vf.onchange=function(){var f=vf.files[0];if(!f)return;if(f.size>15*1048576){alert("Vidéo trop lourde (15 Mo maximum)");vf.value="";return}var u=URL.createObjectURL(f),t=document.createElement("video");t.preload="metadata";t.onloadedmetadata=function(){if(isFinite(t.duration)&&t.duration>60){alert("Vidéo trop longue (60 s maximum)");vf.value="";return}vblob=f;blob=null;pv.style.display="none";pv2.src=u;pv2.style.display="block"};t.onerror=function(){alert("Vidéo illisible")};t.src=u};

fk.onclick=function(){fk.style.display="none";ex.style.display="block";ta.focus()};
ph.onclick=function(){fi.click()};
fi.onchange=function(){var f=fi.files[0];if(!f)return;vblob=null;pv2.style.display="none";shrink(f).then(function(x){blob=x;var r=new FileReader();r.onload=function(){pv.src=r.result;pv.style.display="block"};r.readAsDataURL(x)}).catch(function(){alert("Photo illisible")})};
row.appendChild(ph);row.appendChild(vb);ex.appendChild(vf);row.appendChild(cn);row.appendChild(b);ex.appendChild(ta);ex.appendChild(pv);ex.appendChild(pv2);ex.appendChild(row);ex.appendChild(fi);c.appendChild(ex);
b.onclick=function(){var v=ta.value.trim();if(!v&&!blob&&!vblob)return;b.disabled=true;var up=vblob?uploadV(vblob):(blob?upload(blob):Promise.resolve(null));
up.then(function(url){return api("posts",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({author:uid(),body:v,image_url:url})})}).then(function(){ta.value="";cn.textContent="0/2000";blob=null;vblob=null;pv2.style.display="none";pv2.removeAttribute("src");vf.value="";pv.style.display="none";fi.value="";b.disabled=false;ex.style.display="none";fk.style.display="block";toast("Publié");load(L)}).catch(function(){b.disabled=false;alert("Publication impossible")})};
return c}

/* ---------- Réactions ---------- */
var EM=["👍","❤️","😂","😮","🔥"];
function bar(p,R,me,sum,cnt){var r=el("div","dc-r");
function mine(){return R.filter(function(z){return z.post_id===p.id&&z.user_id===me})[0]}
function paint(){r.innerHTML="";var tot=R.filter(function(z){return z.post_id===p.id}).length;cnt.textContent=tot?tot+(tot>1?" réactions":" réaction"):"Sois le premier à réagir";
EM.forEach(function(e){var n=R.filter(function(z){return z.post_id===p.id&&z.emoji===e}).length,m=mine();var bt=el("button",m&&m.emoji===e?"me":"");bt.innerHTML=ico(e);if(n)bt.appendChild(el("small","",String(n)));bt.onclick=function(){react(e)};r.appendChild(bt)});
var sh=el("button","sh");sh.innerHTML=ico("share");sh.setAttribute("aria-label","Partager");sh.onclick=function(){share(p)};r.appendChild(sh);var bm=el("button","sh"+(isSaved(p.id)?" me":""));bm.innerHTML=ico("mark");bm.setAttribute("aria-label","Enregistrer");bm.onclick=function(){var on=toggleSaved(p.id);toast(on?"Publication enregistrée":"Retirée des enregistrés");if(tab==="saved"&&!on)render();else paint()};r.appendChild(bm)}
function react(e){var had=mine(),q;
if(had&&had.emoji===e){R.splice(R.indexOf(had),1);q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"DELETE"})}
else if(had){had.emoji=e;q=api("post_reactions?post_id=eq."+p.id+"&user_id=eq."+me,{method:"PATCH",body:JSON.stringify({emoji:e})})}
else{R.push({post_id:p.id,user_id:me,emoji:e});q=api("post_reactions",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({post_id:p.id,user_id:me,emoji:e})})}
paint()}
r.like=function(){var m=mine();if(!m||m.emoji!=="❤️")react("❤️")};
paint();return r}
function share(p){return shareX(p)}function share0(p){var t=(p.body||"Une photo sur TÕÕLé").slice(0,140)+" — TÕÕLé";if(navigator.share){navigator.share({text:t}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){toast("Copié")})}else toast("Partage indisponible")}

/* ---------- Commentaires ---------- */
function csheet(p,C,me,done){
var ov=el("div","dc-sheet"),bd=el("div","dc-bd"),pn=el("div","dc-pn"),hd=el("div","dc-ch"),lst=el("div","dc-cl"),row=el("div","dc-cr"),ip=el("input","dc-in"),sd=el("button","dc-go","Envoyer");
ip.placeholder="Écrire un commentaire…";ip.maxLength=500;
function mine(){return C.filter(function(c){return c.post_id===p.id})}
function paint(){var A=mine();hd.textContent="Commentaires ("+A.length+")";lst.innerHTML="";
if(!A.length)lst.appendChild(empty("Aucun commentaire.\nÉcris le premier."));
A.forEach(function(c){var r=el("div","dc-cm"),nm=NAMES[c.author]||"Inconnu";r.appendChild(el("div","dc-av dc-sm",ini(nm)));
var b=el("div","dc-cb"),l1=el("div","dc-cn",nm);l1.appendChild(el("small","",ago(c.created_at)));b.appendChild(l1);b.appendChild(el("div","dc-ctx",c.body));
if(c.author===me){var x=el("button","dc-cx","Supprimer");x.onclick=function(){api("post_comments?id=eq."+c.id,{method:"DELETE"});C.splice(C.indexOf(c),1);paint()};b.appendChild(x)}
r.appendChild(b);lst.appendChild(r)});lst.scrollTop=lst.scrollHeight;done()}
function send(){var v=ip.value.trim();if(!v||sd.disabled)return;sd.disabled=true;
api("post_comments",{method:"POST",headers:{Prefer:"return=representation"},body:JSON.stringify({post_id:p.id,author:me,body:v})}).then(function(r){sd.disabled=false;
if(Array.isArray(r)&&r[0]){NAMES[me]=NAMES[me]||MY||"Moi";C.push(r[0]);ip.value="";paint()}else toast("Envoi impossible")})}
sd.onclick=send;ip.onkeydown=function(e){if(e.key==="Enter")send()};
bd.onclick=function(){ov.remove()};
row.appendChild(ip);row.appendChild(sd);pn.appendChild(hd);pn.appendChild(lst);pn.appendChild(row);ov.appendChild(bd);ov.appendChild(pn);sec.appendChild(ov);paint()}

/* ---------- Menu d'une publication ---------- */
function pmenu(p,me,L){var ov=el("div","dc-sheet"),bd=el("div","dc-bd"),pn=el("div","dc-pn dc-mn"),nm=NAMES[p.author]||"cette personne";
function it(ic,txt,red,fn){var b=el("button","dc-mi"+(red?" red":""));b.innerHTML=ico(ic);b.appendChild(document.createTextNode(txt));b.onclick=function(){ov.remove();fn()};pn.appendChild(b)}
it("share","Partager",0,function(){share(p)});it("share","Copier le texte",0,function(){copyT(p)});
if(p.author===me){it("trash","Supprimer la publication",1,function(){if(confirm("Supprimer cette publication ?"))api("posts?id=eq."+p.id,{method:"DELETE"}).then(function(){load(L)})})}
else{it("eyeoff","Masquer cette publication",0,function(){var h=lsGet(KX("hidden"),[]);h.push(String(p.id));lsSet(KX("hidden"),h);toast("Publication masquée");load(L)});
it("ban","Bloquer "+nm,1,function(){if(!confirm("Bloquer "+nm+" ? Tu ne verras plus ses publications."))return;api("blocks",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({blocker:me,blocked:p.author})}).then(function(){toast(nm+" est bloqué");load(L)})})}
bd.onclick=function(){ov.remove()};ov.appendChild(bd);ov.appendChild(pn);sec.appendChild(ov)}

/* ---------- Fil ---------- */
function score(p,R){var n=R.filter(function(z){return z.post_id===p.id}).length,h=(Date.now()-new Date(p.created_at).getTime())/36e5;return(n*2+(p.image_url?1:0)+.5)/Math.pow(h+2,.8)}
function setQ(t){Q=t;var si=sec.querySelector(".dc-srch");if(si)si.value=t;if(tab==="people")tab="posts";LIM=30;render()}
function rich(tx,s){tx.textContent="";String(s).split(/(#[\p{L}\p{N}_]{2,30})/u).forEach(function(x){if(/^#[\p{L}\p{N}_]{2,30}$/u.test(x)){var a=el("span","dc-tag",x);a.onclick=function(e){e.stopPropagation();setQ(x)};tx.appendChild(a)}else if(x)tx.appendChild(document.createTextNode(x))})}
function tagsBar(raw){var C={};(raw||[]).forEach(function(p){var m=(p.body||"").match(/#[\p{L}\p{N}_]{2,30}/gu)||[],seen={};m.forEach(function(t){var k=t.toLowerCase();if(seen[k])return;seen[k]=1;C[k]=(C[k]||0)+1})});
var a=Object.keys(C).sort(function(x,y){return C[y]-C[x]}).slice(0,8);if(!a.length&&Q.charAt(0)!=="#")return null;
var d=el("div","dc-tags");if(Q.charAt(0)==="#"){var x=el("button","on","✕ "+Q);x.onclick=function(){setQ("")};d.appendChild(x)}
a.forEach(function(k){if(k===Q.toLowerCase())return;var b=el("button","",k);b.appendChild(el("small","",String(C[k])));b.onclick=function(){setQ(k)};d.appendChild(b)});return d}
function uploadV(f){var p=uid()+"/"+Date.now()+"-"+Math.random().toString(36).slice(2)+(/webm/.test(f.type)?".webm":".mp4");if(!window.tgUpload)return Promise.reject(1);return window.tgUpload(f,p).then(function(){return "tgv:"+p})}
function vidBox(path){var w=el("div","dc-vid"),b=el("button","dc-play");b.type="button";b.setAttribute("aria-label","Lire la vidéo");b.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';w.appendChild(b);
b.onclick=function(){b.disabled=true;w.classList.add("ld");fetch(window.tgUrl(path,"video")).then(function(r){if(!r.ok)throw 1;return r.blob()}).then(function(bl){var v=el("video");v.controls=true;v.setAttribute("playsinline","");v.src=URL.createObjectURL(new Blob([bl],{type:/webm$/.test(path)?"video/webm":"video/mp4"}));w.classList.remove("ld");w.style.aspectRatio="auto";w.innerHTML="";w.appendChild(v);v.play().catch(function(){})}).catch(function(){w.classList.remove("ld");b.disabled=false;toast("Vidéo indisponible")})};return w}
function copyT(p){var t=p.body||"";if(navigator.clipboard&&t)navigator.clipboard.writeText(t).then(function(){toast("Texte copié")});else toast("Rien à copier")}
function shareX(p){var nm=p.official?"TÕÕLé":(NAMES[p.author]||"");var t=(p.body||"Une publication sur TÕÕLé").slice(0,200)+(nm?"\n— "+nm+" sur TÕÕLé":" — TÕÕLé");
var im=(p.image_url&&p.image_url.indexOf("tg:")===0&&window.tgUrl)?fetch(window.tgUrl(p.image_url.slice(3),"image")).then(function(r){return r.ok?r.blob():null}).catch(function(){return null}):Promise.resolve(null);
im.then(function(b){var d={text:t};if(b&&window.File){try{var fl=new File([b],"toole.jpg",{type:b.type||"image/jpeg"});if(navigator.canShare&&navigator.canShare({files:[fl]}))d.files=[fl]}catch(e){}}
if(navigator.share)return navigator.share(d).catch(function(){});if(navigator.clipboard)return navigator.clipboard.writeText(t).then(function(){toast("Copié")});toast("Partage indisponible")})}
function post(p,R,me,L,k,C){var c=el("div","dc-card"),t=el("div","dc-top"),nm=p.official?"TÕÕLé":(NAMES[p.author]||"Inconnu");c.style.animationDelay=Math.min(k,8)*.05+"s";if(p.official)c.classList.add("dc-off");
t.appendChild(el("div","dc-av",ini(nm)));var w=el("div");var _n=el("div","dc-n",nm);if(p.official){_n.insertAdjacentHTML("beforeend",' <svg viewBox="0 0 24 24" width="15" height="15" style="vertical-align:-2px"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.3 3.3L17 9" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg> <small style="opacity:.7">Officiel</small>')}w.appendChild(_n);w.appendChild(el("div","dc-d",ago(p.created_at)));t.appendChild(w);
var mo=el("button","dc-more2");mo.innerHTML=ico("dots");mo.setAttribute("aria-label","Plus");mo.onclick=function(){pmenu(p,me,L)};t.appendChild(mo);
c.appendChild(t);
if(p.body){var tx=el("div","dc-t"),long=p.body.length>220;rich(tx,long?p.body.slice(0,220)+"…":p.body);if(long){var mb=el("button","dc-more","Voir plus");mb.onclick=function(){rich(tx,p.body)};tx.appendChild(mb)}c.appendChild(tx)}
var sum=el("div","dc-sum"),cnt=el("span"),rb=bar(p,R,me,sum,cnt);
if(p.image_url&&p.image_url.indexOf("tgv:")===0){c.appendChild(vidBox(p.image_url.slice(4)))}else if(p.image_url){var wr=el("div","dc-imgw"),im=el("img","dc-img"),pop=el("div","dc-pop"),last=0;pop.innerHTML=ico("❤️");im.loading="lazy";setImg(im,p.image_url);
im.onclick=function(){var n=Date.now();if(n-last<320){rb.like();pop.classList.remove("go");void pop.offsetWidth;pop.classList.add("go")}else setTimeout(function(){if(Date.now()-last>=320&&im.src)viewer(im.src)},330);last=n};
wr.appendChild(im);wr.appendChild(pop);c.appendChild(wr)}
var cb=el("button","dc-cbt");function lab(){var n=C.filter(function(z){return z.post_id===p.id}).length;cb.innerHTML=ico("chat");cb.appendChild(document.createTextNode(" "+(n?n+(n>1?" commentaires":" commentaire"):"Commenter")))}lab();cb.onclick=function(){csheet(p,C,me,lab)};
sum.appendChild(cnt);sum.appendChild(cb);c.appendChild(sum);c.appendChild(rb);return c}
function load(L){var me=uid();skel(L);
var base="posts?select=id,author,body,image_url,created_at,official&order=created_at.desc",sv=tab==="saved"?savedList():null,hid=lsGet(KX("hidden"),[]);
var pq=sv?(sv.length?api(base+"&id=in.("+sv.join(",")+")"):Promise.resolve([])):api(base+"&limit="+LIM);
Promise.all([pq,api("blocks?select=blocked&blocker=eq."+me)]).then(function(a){
var raw=Array.isArray(a[0])?a[0]:[];var bl=(Array.isArray(a[1])?a[1]:[]).map(function(x){return x.blocked});var P=raw.filter(function(p){return bl.indexOf(p.author)<0&&(sv||hid.indexOf(String(p.id))<0)});
if(!sv&&raw.length){markSeen(raw[0].created_at);setBadge(0)}
if(!P.length){L.innerHTML="";var ec=$("dcCount");if(ec)ec.textContent="0";L.appendChild(empty(sv?"Aucune publication enregistrée.\nAppuie sur le signet d'une publication pour la retrouver ici.":"Aucune publication pour l'instant.\nSois le premier à publier !"));return}
var ids=P.map(function(p){return p.id}).join(","),au=P.map(function(p){return p.author}).filter(function(v,i,s){return s.indexOf(v)===i}).join(",");
Promise.all([api("profiles?select=id,pseudo&id=in.("+au+")"),api("post_reactions?select=post_id,user_id,emoji&post_id=in.("+ids+")"),api("profiles?select=id,pseudo&order=pseudo.asc&limit=12"),api("post_comments?select=id,post_id,author,body,created_at&post_id=in.("+ids+")&order=created_at.asc&limit=500")]).then(function(b){
b[0].forEach(function(p){NAMES[p.id]=p.pseudo});var R=b[1]||[],S=(b[2]||[]).filter(function(p){return p.id!==me}),C=(Array.isArray(b[3])?b[3]:[]).filter(function(c){return bl.indexOf(c.author)<0});
var miss=C.map(function(c){return c.author}).filter(function(v,i,s){return !NAMES[v]&&s.indexOf(v)===i});
(miss.length?api("profiles?select=id,pseudo&id=in.("+miss.join(",")+")"):Promise.resolve([])).then(function(m){(m||[]).forEach(function(p){NAMES[p.id]=p.pseudo});
var q=Q.toLowerCase();if(q)P=P.filter(function(p){return(p.body||"").toLowerCase().indexOf(q)>=0||(NAMES[p.author]||"").toLowerCase().indexOf(q)>=0});
if(FILT==="img")P=P.filter(function(p){return p.image_url&&p.image_url.indexOf("tgv:")!==0});else if(FILT==="vid")P=P.filter(function(p){return p.image_url&&p.image_url.indexOf("tgv:")===0});else if(FILT==="txt")P=P.filter(function(p){return !p.image_url});
if(tab==="trend")P.sort(function(x,y){return(score(y,R)+C.filter(function(c){return c.post_id===y.id}).length*.5)-(score(x,R)+C.filter(function(c){return c.post_id===x.id}).length*.5)});
if(tab==="posts")P.sort(function(x,y){return(y.official?1:0)-(x.official?1:0)});var ct=$("dcCount");if(ct)ct.textContent=P.length+(P.length>1?" publications":" publication");L.innerHTML="";var _tb=tab==="posts"?tagsBar(raw):null;if(_tb)L.appendChild(_tb);if(!P.length){L.appendChild(empty("Aucun résultat."));return}
P.forEach(function(p,k){L.appendChild(post(p,R,me,L,k,C));if(k===2&&S.length&&!q&&tab==="posts"){L.appendChild(head("Personnes à découvrir"));L.appendChild(suggestions(S.slice(0,8)))}});if(!sv&&raw.length>=LIM){var mp=el("button","dc-mp","Voir les publications plus anciennes");mp.onclick=function(){LIM+=30;load(L)};L.appendChild(mp)}})})})}
function feed(){var L=el("div");
if(tab==="posts"){box.appendChild(stories());box.appendChild(composer(L));var hh=head("Fil en direct","…");hh.lastChild.id="dcCount";box.appendChild(hh)}
else if(tab==="saved"){var h2=head("Mes enregistrements","…");h2.lastChild.id="dcCount";box.appendChild(h2)}
box.appendChild(L);load(L)}
function render(){box.innerHTML="";[].forEach.call(sec.querySelectorAll(".dc-seg button"),function(b){b.classList.toggle("on",b.dataset.k===tab)});if(chipsEl)chipsEl.style.display=tab==="people"?"none":"flex";tab==="people"?people():feed()}

/* ---------- Navigation ---------- */
function nav(){document.body.classList.add("dc-on")}
function open(){[].forEach.call(document.querySelectorAll(".scr"),function(s){s.classList.add("hide")});sec.classList.remove("hide");nav();
if(!MY){api("profiles?select=pseudo&id=eq."+uid()).then(function(r){MY=r[0]&&r[0].pseudo||"";if(!sec.classList.contains("hide")&&tab==="posts")render()})}
render()}
function close(){if(sec)sec.classList.add("hide");document.body.classList.remove("dc-on")}
function back(){close();if(typeof goList==="function"){try{goList()}catch(e){}}else{var b=document.querySelector('#v4nav .t[data-n="chats"]');if(b)b.click()}
if(typeof window.__v4sync==="function")window.__v4sync()}
window.openDecouvrir=open;window.closeDecouvrir=close;
var IC={back:'<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',ref:'<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>'};
function wireNav(){var n=$("v4nav");if(!n||n.__dc)return;n.__dc=1;n.addEventListener("click",function(){close()},true)}
function init(){var ref=$("scrList");if(!ref)return setTimeout(init,300);
(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="toole-explorer2.css";document.head.appendChild(l)})();sec=el("section","scr hide");sec.id="scrDecouvrir";
var h=el("div","dc-hd"),bk=el("button","dc-ib"),t=el("h1","","EXPLORER"),rf=el("button","dc-ib");bk.innerHTML=IC.back;bk.setAttribute("aria-label","Retour");rf.innerHTML=IC.ref;rf.setAttribute("aria-label","Actualiser");bk.onclick=back;rf.onclick=render;var lg=el("img","dc-logo");lg.src="logo.png";lg.alt="";lg.onerror=function(){lg.style.display="none"};h.appendChild(bk);h.appendChild(lg);h.appendChild(t);h.appendChild(rf);
var bar_=el("div","dc-bar"),si=el("input","dc-srch");si.type="search";si.placeholder="Rechercher une publication ou une personne";var tm;si.oninput=function(){clearTimeout(tm);tm=setTimeout(function(){Q=si.value.trim();render()},300)};
var sg=el("div","dc-seg");[["posts","Pour toi"],["saved","Enregistrés"],["people","Gens"]].forEach(function(k){var b=el("button","",k[1]);b.dataset.k=k[0];b.onclick=function(){tab=k[0];LIM=30;render()};sg.appendChild(b)});
chipsEl=el("div","dc-chips");[["all","Tout"],["img","Photos"],["vid","Vidéos"],["txt","Texte"]].forEach(function(k){var b=el("button",k[0]===FILT?"on":"",k[1]);b.dataset.k=k[0];b.onclick=function(){FILT=k[0];LIM=30;[].forEach.call(chipsEl.children,function(x){x.classList.toggle("on",x.dataset.k===FILT)});render()};chipsEl.appendChild(b)});
bar_.appendChild(si);bar_.appendChild(sg);bar_.appendChild(chipsEl);
box=el("div","dc-body");sec.appendChild(h);sec.appendChild(bar_);sec.appendChild(box);ref.parentNode.appendChild(sec);
wireNav();setInterval(wireNav,1500);
document.addEventListener("backbutton",function(){var sh=sec.querySelector(".dc-sheet");if(sh){sh.remove();return}if(!sec.classList.contains("hide"))back()},false)}
/* ---------- Nouvelles publications : pastille sur la boussole, bandeau, alerte ---------- */
var NEWN=0,ALERTED={},BLK=[],BLKT=0;
function setBadge(n){NEWN=n;var z=document.querySelector("#scrList .hdr .zd-ic");if(!z)return;var b=z.querySelector(".dc-badge");if(!b){b=el("span","dc-badge");z.appendChild(b)}b.textContent=n>9?"9+":String(n);b.style.display=n>0?"block":"none"}
function pill(n){if(!sec||!box||sec.classList.contains("hide")||tab!=="posts")return;var o=box.querySelector(".dc-new");if(!n){if(o)o.remove();return}
if(!o){o=el("button","dc-new");o.onclick=function(){render();box.scrollTop=0};box.insertBefore(o,box.firstChild)}
o.textContent=n+(n>1?" nouvelles publications":" nouvelle publication")+" · Afficher"}
function ping(p){var old=$("dcAlert");if(old)old.remove();
api("profiles?select=pseudo&id=eq."+p.author).then(function(r){var nm=r&&r[0]&&r[0].pseudo||"Quelqu'un";NAMES[p.author]=nm;
var a=el("div","dc-alert");a.id="dcAlert";a.appendChild(el("div","a",ini(nm)));var w=el("div");w.appendChild(el("b","",nm+" a publié"));w.appendChild(el("span","",p.body?p.body.slice(0,80):"Une nouvelle photo"));a.appendChild(w);
a.onclick=function(){a.remove();if(window.openDecouvrir)window.openDecouvrir()};document.body.appendChild(a);
try{if(navigator.vibrate)navigator.vibrate(120)}catch(e){}setTimeout(function(){a.remove()},6500)})}
function poll(){var me=uid();if(!me||document.hidden)return;
var sn=lsGet(KX("seen"),null);if(!sn){lsSet(KX("seen"),new Date().toISOString());return}
api("posts?select=id,author,body,image_url,created_at&order=created_at.desc&limit=30&created_at=gt."+encodeURIComponent(sn)).then(function(r){
if(!Array.isArray(r))return;
function go(){var hid=lsGet(KX("hidden"),[]);var N=r.filter(function(p){return p.author!==me&&BLK.indexOf(p.author)<0&&hid.indexOf(String(p.id))<0});
if(!N.length){setBadge(0);pill(0);return}
setBadge(N.length);
if(sec&&!sec.classList.contains("hide"))pill(N.length);
else if(!ALERTED[N[0].id]){ALERTED[N[0].id]=1;ping(N[0])}}
if(Date.now()-BLKT>300000){api("blocks?select=blocked&blocker=eq."+me).then(function(b){BLK=(Array.isArray(b)?b:[]).map(function(x){return x.blocked});BLKT=Date.now();go()})}else go()})}
setTimeout(poll,4000);setInterval(poll,45000);setInterval(function(){setBadge(NEWN)},1500);
document.addEventListener("visibilitychange",function(){if(!document.hidden)setTimeout(poll,1200)});

init()})();
