/* TÕÕLé — mise à jour obligatoire : message « Télécharger maintenant / Plus tard » + plus de déconnexion sur simple erreur */
(function(){"use strict";if(window.__tmo)return;window.__tmo=1;
var D=document,INFO=null,later=0,busy=0,chk=0,lastGo=0,manual=0;
var OK=/^https:\/\/jbjeqxubpqqypysfsubd\.supabase\.co\/storage\/v1\/object\/public\/apk\//;
function EN(){try{return localStorage.getItem("toole_lang")==="en"}catch(e){return false}}
function L(f,e){return EN()?e:f}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})}
function say(m){try{if(typeof toast==="function")toast(m)}catch(e){}}
function logged(){try{var s=JSON.parse(localStorage.getItem("toole_session"));return !!(s&&s.refresh_token)}catch(e){return false}}
function dark(){return D.documentElement.getAttribute("data-theme")==="dark"}
function info(){if(INFO)return Promise.resolve(INFO);var C=window.Capacitor,A=C&&C.Plugins&&C.Plugins.App;
if(!A||!A.getInfo)return Promise.resolve({version:"?",build:0});
return A.getInfo().then(function(i){INFO={version:i.version||"?",build:parseInt(i.build,10)||0};return INFO}).catch(function(){return{version:"?",build:0}})}
var st=D.createElement("style");st.textContent="@keyframes tmoUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}";D.head.appendChild(st);
function show(u){if(D.getElementById("tmoBox"))return;
var d=dark(),li=String(u.notes||"").split("\n").filter(function(x){return x.trim()}).slice(0,8).map(function(x){return "<li>"+esc(x)+"</li>"}).join("");
var bg=D.createElement("div");bg.id="tmoBox";
bg.style.cssText="position:fixed;left:0;right:0;top:0;bottom:0;z-index:2147483000;background:rgba(5,12,25,.6);display:flex;align-items:flex-end;justify-content:center";
var c=D.createElement("div");
c.style.cssText="width:100%;max-width:480px;box-sizing:border-box;background:"+(d?"#14213d":"#fff")+";color:"+(d?"#fff":"#0a2a66")+";border-radius:24px 24px 0 0;padding:22px 20px calc(env(safe-area-inset-bottom,0px) + 20px);box-shadow:0 -12px 40px rgba(0,0,0,.35);animation:tmoUp .35s both;font-family:system-ui,sans-serif";
c.innerHTML='<div style="width:56px;height:56px;border-radius:18px;margin:0 auto 12px;display:grid;place-items:center;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 8px 20px rgba(47,111,224,.4)"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg></div>'
+'<div style="text-align:center;font-size:19px;font-weight:800">'+L("Mise à jour disponible","Update available")+'</div>'
+'<div style="text-align:center;font-size:14px;opacity:.75;margin:4px 0 10px">TÕÕLé '+esc(u.version_name||"")+'</div>'
+(li?'<ul style="margin:0 0 12px;padding-left:20px;font-size:14px;line-height:1.5;max-height:30vh;overflow:auto">'+li+'</ul>':"")
+'<div style="font-size:13px;opacity:.75;text-align:center;margin-bottom:14px">'+L("Ta connexion est conservée : tu n’auras pas à te reconnecter.","You will stay signed in.")+'</div>'
+'<button id="tmoGo" style="display:block;width:100%;border:0;border-radius:14px;padding:14px;font-size:16px;font-weight:800;color:#fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);box-shadow:0 6px 16px rgba(47,111,224,.4)">'+L("Télécharger la mise à jour maintenant","Download the update now")+'</button>'
+'<button id="tmoLater" style="display:block;width:100%;margin-top:10px;border:0;border-radius:14px;padding:13px;font-size:15px;font-weight:700;color:'+(d?"#dbe8ff":"#2f6fe0")+';background:'+(d?"rgba(255,255,255,.1)":"#eef4fc")+'">'+L("Plus tard","Later")+'</button>';
bg.appendChild(c);D.body.appendChild(bg);
D.getElementById("tmoLater").onclick=function(){later=Date.now();bg.remove()};
D.getElementById("tmoGo").onclick=function(){var url=u.url||"";if(!OK.test(url)){say(L("Lien de mise à jour invalide","Invalid update link"));return}
later=Date.now();bg.remove();say(L("Téléchargement…","Downloading…"));location.href=url}}
function check(){if(busy||!logged()||typeof window.api!=="function"||D.getElementById("tmoBox"))return;
if(later&&Date.now()-later<2*3600*1000)return;busy=1;
Promise.all([info(),window.api("/rest/v1/rpc/latest_app_update",{method:"POST",body:"{}"})]).then(function(r){var i=r[0],u=r[1];if(Array.isArray(u))u=u[0];
if(u&&u.version_code&&i.build&&u.version_code>i.build&&u.mandatory&&OK.test(u.url||""))show(u)}).catch(function(){}).then(function(){busy=0})}
setTimeout(check,3000);setInterval(check,600000);
D.addEventListener("visibilitychange",function(){if(!D.hidden)setTimeout(check,1500)});
/* ---- pas de déconnexion automatique sur une simple erreur : on ne déconnecte que si le serveur refuse vraiment la session ---- */
D.addEventListener("click",function(e){var t=e.target&&e.target.closest&&e.target.closest("#lgYes,#pAcOut,#pfOut,#tDelAcc");if(t)manual=Date.now()},true);
function verify(){return Promise.resolve().then(function(){return _rfOnce()}).then(function(){return "ok"},function(e){var m=String((e&&e.message)||e||"");
return /invalid refresh token|refresh token not found|already used|refresh_token|session expir|session_not_found/i.test(m)?"invalid":"unknown"})}
function guard(){var real=window.logout;if(typeof real!=="function"||real.__tmo)return;
var g=function(){var a=arguments,self=this;
if(Date.now()-manual<8000||!logged()||typeof _rfOnce!=="function")return real.apply(self,a);
if(chk)return;chk=1;
verify().then(function(s){chk=0;if(s==="invalid")return real.apply(self,a);
var sl=D.getElementById("scrList");if(sl&&!sl.classList.contains("hide")&&Date.now()-lastGo>20000&&typeof window.goList==="function"){lastGo=Date.now();try{window.goList()}catch(e){}}})};
g.__tmo=1;window.logout=g}
guard();setTimeout(guard,2000);
})();
