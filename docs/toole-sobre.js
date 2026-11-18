/* TÕÕLé — Sobre : coches de lecture façon messagerie (bleues quand le message est lu) */
(function(){
  try{var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#ffffff")}catch(e){}
  var RE=/^(\d{1,2}[:h]\d{2})\s*[·•]?\s*(✓✓|✓)$/;
  function one(t){
    if(t.querySelector(".tk"))return;
    var s=(t.textContent||"").trim(),r=RE.exec(s);
    if(!r)return;
    t.textContent="";
    t.appendChild(document.createTextNode(r[1]));
    var k=document.createElement("span");
    k.className="tk"+(r[2]==="✓✓"?" rd":"");
    k.textContent=r[2];
    t.appendChild(k);
  }
  var q=0;
  function run(){q=0;var l=document.querySelectorAll("#chat .m .t,#gMsgs .m .t");for(var i=0;i<l.length;i++)one(l[i])}
  function later(){if(q)return;q=1;requestAnimationFrame(run)}
  function init(){run();new MutationObserver(later).observe(document.body,{childList:true,subtree:true,characterData:true})}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();

/* Accueil : icônes et compteurs sur les pastilles de filtre */
(function(){
  var IC={all:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><circle cx="9" cy="12" r=".6"/><circle cx="13" cy="12" r=".6"/><circle cx="17" cy="12" r=".6"/></svg>',unread:null,fav:'<svg viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>'};
  IC.unread=IC.all;
  function rows(){return document.querySelectorAll("#recent .row")}
  function counts(){
    var all=0,unr=0;
    rows().forEach(function(r){if(r.classList.contains("v4off"))return;all++;
      var last=r.lastElementChild;
      var b=r.querySelector("span:not(.v4star)");
      if(b&&/^\d+$/.test((b.textContent||"").trim()))unr++});
    return{all:all,unread:unr,fav:0};
  }
  function paint(){
    var ch=document.getElementById("v4chips");if(!ch)return;
    var c=counts();
    ch.querySelectorAll("button").forEach(function(b){
      var k=b.dataset.c;if(!IC.hasOwnProperty(k))return;
      if(!b.querySelector("svg")){b.insertAdjacentHTML("afterbegin",IC[k])}
      var n=k==="fav"?0:c[k],e=b.querySelector(".cnt");
      if(n>0){if(!e){e=document.createElement("b");e.className="cnt";b.appendChild(e)}if(e.textContent!==String(n))e.textContent=n}
      else if(e)e.remove();
    });
  }
  var q=0;function later(){if(q)return;q=1;requestAnimationFrame(function(){q=0;paint()})}
  function init(){paint();new MutationObserver(later).observe(document.body,{childList:true,subtree:true});setInterval(paint,1500)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();


/* Profil : ordre logique -> infos, réglages, mise à jour, puis soutien + site */
(function(){
  var q=0;
  function g(i){return document.getElementById(i)}
  function arrange(){
    q=0;
    var p=g("scrProfil");if(!p)return;
    var body=p.querySelector(".body");if(!body)return;
    var sup=g("supportStatic"),sw=sup&&sup.parentElement;
    if(sw&&(sw===body||sw===p))sw=sup;
    var want=[g("tsTyp"),g("tsOnl"),g("tsMaj"),sw,g("cnsLink")].filter(Boolean);
    var wrong=false;
    for(var i=0;i<want.length;i++){
      if(want[i].parentNode!==body){wrong=true;break}
      if(i&&!(want[i-1].compareDocumentPosition(want[i])&4)){wrong=true;break}
    }
    if(!wrong)return;
    want.forEach(function(e){body.appendChild(e)});
  }
  function later(){if(q)return;q=1;requestAnimationFrame(arrange)}
  function init(){arrange();new MutationObserver(later).observe(document.body,{childList:true,subtree:true})}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();


/* Recherche par numéro (remplace la recherche par pseudo) */
window.tooleNum=function(raw){var d=String(raw||"").replace(/[^0-9]/g,"");if(d.length===8)d="226"+d;return d.length>=8?d:""};
window.tooleIdByPhone=async function(raw){var d=window.tooleNum(raw);if(!d)throw new Error("Numéro invalide");
  return await api("/rest/v1/rpc/id_by_phone",{method:"POST",body:JSON.stringify({p:d})})};
window.tooleErr=function(e){var m=String(e&&e.message||e||"");
  if(/id_by_phone|PGRST|404|schema cache|function/i.test(m))return"Recherche par numéro pas encore activée sur le serveur";
  return m||"Erreur"};
(function(){var o=window.filterHome;if(typeof o!=="function"||o.__num)return;
  var w=function(q){var r=o.apply(this,arguments);
    try{var b=document.getElementById("pseudoSearch");if(!b)return r;
      if(!window.tooleNum(q)){b.remove();return r}
      b.textContent="Chercher le numéro « "+String(q).trim()+" »";
      b.onclick=async function(){try{var uid=await window.tooleIdByPhone(q);if(!uid){toast("Numéro introuvable");return}
        var nm="Contact";try{var pr=await api("/rest/v1/profiles?select=pseudo&id=eq."+uid);if(pr&&pr[0]&&pr[0].pseudo)nm=pr[0].pseudo}catch(e){}
        openChat(uid,nm)}catch(e){toast(window.tooleErr(e))}}
    }catch(e){}
    return r};
  w.__num=1;window.filterHome=w})();

/* Clavier fermé (retour/chevron) : on retire le focus du champ pour que la barre du bas réapparaisse */
(function(){var vv=window.visualViewport;if(!vv)return;
  var full=Math.max(window.innerHeight,vv.height),was=false,T=0;
  function field(e){return e&&e.matches&&e.matches("input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]):not([type=file]),textarea")}
  vv.addEventListener("resize",function(){clearTimeout(T);T=setTimeout(function(){
    if(vv.height>full)full=vv.height;
    var open=vv.height<full-150;
    if(was&&!open){var a=document.activeElement;if(field(a))a.blur()}
    was=open},120)});
  window.addEventListener("orientationchange",function(){setTimeout(function(){full=Math.max(window.innerHeight,vv.height)},500)});
})();
