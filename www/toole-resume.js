(function(){
  "use strict";
  var KEY="tl_last", started=false, shown=false;
  function wrapOpen(){
    if(window.__tlWrap||typeof window.openChat!=="function") return;
    var o=window.openChat; window.__tlWrap=1;
    window.openChat=function(id,ps){
      try{ localStorage.setItem(KEY,JSON.stringify({id:id,ps:ps||""})) }catch(e){}
      return o.apply(this,arguments);
    };
  }
  function restore(){
    if(started) return; started=true;
    var s; try{ s=JSON.parse(localStorage.getItem(KEY)||"null") }catch(e){}
    if(!s||!s.id||!localStorage.getItem("toole_session")) return;
    if(window.openChat) window.openChat(s.id,s.ps);
  }
  var tries=0;
  var t=setInterval(function(){
    tries++; wrapOpen();
    var l=document.getElementById("scrList"), sc=document.getElementById("scrChat");
    if(!started && window.__tlWrap && l && !l.classList.contains("hide")) restore();
    if(sc){
      if(!sc.classList.contains("hide")) shown=true;
      else if(shown){ shown=false; try{ localStorage.removeItem(KEY) }catch(e){} }
    }
    if(tries>400) clearInterval(t);
  },300);
})();
