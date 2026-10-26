/* TÕÕLé – bouton retour Android : revient à l'écran précédent au lieu de quitter l'app */
(function(){
  var armed=false,exitWait=false,exitTimer=null;
  function $(i){return document.getElementById(i)}
  function cur(){
    var ids=["scrWelcome","scrInscr","scrLogin","scrList","scrChat","scrProfil","scrParam","scrGroupes","scrGroup","scrStatuts","scrCanix","scrSpecial","scrGame"];
    for(var i=0;i<ids.length;i++){var e=$(ids[i]);if(e&&!e.classList.contains("hide"))return ids[i]}
    return "scrList";
  }
  function toast(t){
    var d=document.createElement("div");d.textContent=t;
    d.style.cssText="position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:rgba(20,20,30,.9);color:#fff;padding:10px 16px;border-radius:20px;font-size:14px;z-index:99999";
    document.body.appendChild(d);setTimeout(function(){d.remove()},1800);
  }
  function arm(){try{history.pushState({tooleBack:1},"");armed=true}catch(e){}}
  function click(id){var e=$(id);if(e){e.click();return true}return false}
  function closeOverlay(){
    var sel=["#shBg","#stv","#vprev","#tsEd"];
    for(var i=0;i<sel.length;i++){var e=document.querySelector(sel[i]);if(e){
      if(sel[i]==="#shBg"&&typeof closeSheet==="function")closeSheet();else e.remove();
      return true}}
    var lb=document.querySelector(".lightbox,.imgview,.img-viewer,.mediaview");
    if(lb){lb.remove();return true}
    return false;
  }
  function goHome(){
    var s=cur();
    if(s==="scrChat"||s==="scrGroup"||s==="scrParam"||s==="scrGame"){
      var m={scrChat:"back",scrGroup:"gBk",scrParam:"prBack",scrGame:"gBack"};
      if(click(m[s])){
        if(s==="scrGame"&&cur()==="scrGame"&&typeof openSpecial==="function")openSpecial();
        return true;
      }
    }
    if(s==="scrList"||s==="scrWelcome"||s==="scrLogin")return false;
    if(typeof goList==="function"){goList();return true}
    if(typeof showOnly==="function"){showOnly("scrList");return true}
    return false;
  }
  window.addEventListener("popstate",function(){
    armed=false;
    if(closeOverlay()){arm();return}
    if(goHome()){arm();return}
    if(!exitWait){
      exitWait=true;toast("Appuyez encore pour quitter");
      clearTimeout(exitTimer);
      exitTimer=setTimeout(function(){exitWait=false;if(!armed)arm()},2000);
    }
    /* sinon : pas de nouvelle entrée → le prochain retour ferme l'app */
  });
  function init(){try{history.replaceState({tooleBase:1},"")}catch(e){}arm()}
  if(document.readyState==="complete")init();else window.addEventListener("load",init);
})();
