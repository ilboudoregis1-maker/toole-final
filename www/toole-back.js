(function(){
var ar=0,ew=0;
function $(i){return document.getElementById(i)}
function cur(){var a=["scrWelcome","scrInscr","scrLogin","scrList","scrChat","scrProfil","scrParam","scrGroupes","scrGroup","scrStatuts","scrCanix","scrSpecial","scrGame"];for(var i=0;i<a.length;i++){var e=$(a[i]);if(e&&!e.classList.contains("hide"))return a[i]}return "scrList"}
function arm(){try{history.pushState({b:1},"");ar=1}catch(e){}}
var KEEP={tboot:1,offBar:1,tsMaj:1,supportBtn:1};
var IDS=["shBg","stv","vprev","tsEd","tlegal","vfOv","v6ov","v9P","touiSheet","tstk3"];
function vis(e){var c=getComputedStyle(e);return c.display!="none"&&c.visibility!="hidden"&&c.pointerEvents!="none"&&parseFloat(c.opacity||1)>0.05}
function ov(){
for(var i=0;i<IDS.length;i++){var e=document.getElementById(IDS[i]);if(e&&vis(e)){window.__tmStop=1;e.remove();return 1}}
var k=document.body.children;
for(var j=k.length-1;j>=0;j--){var n=k[j];
if(!n.tagName||/^(SCRIPT|STYLE|LINK)$/.test(n.tagName)||KEEP[n.id]||/^scr/.test(n.id))continue;
try{var c=getComputedStyle(n);if(c.position!="fixed"||!vis(n))continue;
var r=n.getBoundingClientRect();
if(r.width>=innerWidth*0.85&&r.height>=innerHeight*0.4&&!/^(back|top|app)$/i.test(n.id)){window.__tmStop=1;n.remove();return 1}}catch(e){}}
return 0}
function home(){var sc=$("scrCalls");if(sc&&!sc.classList.contains("hide")&&typeof goList=="function"){goList();sc.classList.add("hide");return 1}var sl=$("scrList");if(sl&&!sl.classList.contains("hide")){var q=$("srch");if(q&&q.value){q.value="";q.dispatchEvent(new Event("input",{bubbles:true}));q.blur();return 1}var ch=sl.querySelectorAll(".chip");if(ch[0]&&!ch[0].classList.contains("on")&&typeof goList=="function"){goList();return 1}}var cd=$("scrContactDet");if(cd&&!cd.classList.contains("hide")&&window.openContactsPage){window.openContactsPage();return 1}var ct=$("scrContacts");if(ct&&!ct.classList.contains("hide")&&typeof goList=="function"){goList();return 1}var s=cur(),m={scrChat:"back",scrGroup:"gBk",scrParam:"prBack",scrGame:"gBack"};
if(m[s]&&$(m[s])){$(m[s]).click();return 1}
if(s=="scrList"||s=="scrWelcome"||s=="scrLogin")return 0;
if(typeof goList=="function"){goList();return 1}return 0}
var last=0;
function toast(){var d=document.createElement("div");d.textContent="Appuyez encore pour quitter";d.style.cssText="position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:20px;z-index:99999";document.body.appendChild(d);setTimeout(function(){d.remove()},2000)}
function onBack(){
try{if(ov()||home())return}catch(e){}
var n=Date.now();
if(n-last<2000){var A=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;if(A&&A.exitApp)A.exitApp();return}
last=n;toast()}
function reg(){var A=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;if(A&&A.addListener){A.addListener("backButton",onBack);return 1}return 0}
if(!reg()){var t=0,iv=setInterval(function(){if(reg()||++t>20)clearInterval(iv)},250)}
})();
