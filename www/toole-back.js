(function(){
var ar=0,ew=0;
function $(i){return document.getElementById(i)}
function cur(){var a=["scrWelcome","scrInscr","scrLogin","scrList","scrChat","scrProfil","scrParam","scrGroupes","scrGroup","scrStatuts","scrCanix","scrSpecial","scrGame"];for(var i=0;i<a.length;i++){var e=$(a[i]);if(e&&!e.classList.contains("hide"))return a[i]}return "scrList"}
function arm(){try{history.pushState({b:1},"");ar=1}catch(e){}}
function ov(){var s=["#shBg","#stv","#vprev","#tsEd","#tlegal"];for(var i=0;i<s.length;i++){var e=document.querySelector(s[i]);if(e){window.__tmStop=1;e.remove();return 1}}return 0}
function home(){var sc=$("scrCalls");if(sc&&!sc.classList.contains("hide")&&typeof goList=="function"){goList();sc.classList.add("hide");return 1}var sl=$("scrList");if(sl&&!sl.classList.contains("hide")){var q=$("srch");if(q&&q.value){q.value="";q.dispatchEvent(new Event("input",{bubbles:true}));q.blur();return 1}var ch=sl.querySelectorAll(".chip");if(ch[0]&&!ch[0].classList.contains("on")&&typeof goList=="function"){goList();return 1}}var cd=$("scrContactDet");if(cd&&!cd.classList.contains("hide")&&window.openContactsPage){window.openContactsPage();return 1}var ct=$("scrContacts");if(ct&&!ct.classList.contains("hide")&&typeof goList=="function"){goList();return 1}var s=cur(),m={scrChat:"back",scrGroup:"gBk",scrParam:"prBack",scrGame:"gBack"};
if(m[s]&&$(m[s])){$(m[s]).click();return 1}
if(s=="scrList"||s=="scrWelcome"||s=="scrLogin")return 0;
if(typeof goList=="function"){goList();return 1}return 0}
window.addEventListener("popstate",function(){ar=0;
if(ov()||home()){arm();return}
if(!ew){ew=1;var d=document.createElement("div");d.textContent="Appuyez encore pour quitter";d.style.cssText="position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:20px;z-index:99999";document.body.appendChild(d);
setTimeout(function(){d.remove();ew=0;if(!ar)arm()},2000)}});
function init(){try{history.replaceState({b:0},"")}catch(e){}arm()}
if(document.readyState=="complete")init();else addEventListener("load",init);
})();
