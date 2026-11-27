(function(){
  "use strict";
  var OFF="131b7c48-f364-4405-af3e-2f7cdbf95179";
  var BADGE='<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:-3px;margin-left:4px;flex:none"><path d="M12 1.5l2.4 2.1 3.2-.3 1.1 3 2.8 1.6-.8 3.1 1.2 2.9-2.4 2.1.2 3.2-3.1 1-1.6 2.8-3-1.2-3 1.2-1.6-2.8-3.1-1L4.9 15l-1.2-2.9 1.2-2.9-.8-3.1 2.8-1.6 1.1-3 3.2.3z" fill="#1d9bf0"/><path d="M7.5 12.3l3 3 6-6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function curId(){ try{ return peer && peer.id; }catch(e){ return null; } }
  function addBadge(el){
    if(el && !el.querySelector(".tlb")) el.insertAdjacentHTML("beforeend",'<span class="tlb">'+BADGE+'</span>');
  }
  function tick(){
    var onOff = curId()===OFF;
    var pn = document.getElementById("peerName");
    if(pn && onOff) addBadge(pn);
    document.querySelectorAll("#recent .row").forEach(function(r){
      if(r.dataset && r.dataset.pid===OFF) addBadge(r.querySelector(".rn"));
    });
    var bar = document.querySelector("#scrChat .bar");
    if(bar){
      bar.querySelectorAll("textarea,input").forEach(function(i){
        if(onOff){
          if(i.dataset.ro===undefined) i.dataset.ro = i.placeholder || "";
          i.disabled = true;
          i.placeholder = "Compte officiel : lecture seule";
        } else if(i.dataset.ro!==undefined){
          i.disabled = false;
          i.placeholder = i.dataset.ro;
          delete i.dataset.ro;
        }
      });
    }
  }
  setInterval(tick, 700);
})();
