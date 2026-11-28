(function(){
  "use strict";
  var OFF="131b7c48-f364-4405-af3e-2f7cdbf95179";
  function blueBadge(){
    var s=document.querySelector("#recent .row:first-child .rn svg");
    return s ? s.outerHTML : null;
  }
  function curId(){ try{ return peer && peer.id; }catch(e){ return null; } }
  function addBadge(el){
    if(!el) return;
    var ref=blueBadge(); if(!ref) return;
    var cur=el.querySelector(".tlb");
    if(cur){ if(cur.getAttribute("data-ref")!=="1"){ cur.innerHTML=ref; cur.setAttribute("data-ref","1"); } return; }
    el.insertAdjacentHTML("beforeend",'<span class="tlb" data-ref="1" style="display:inline-flex;margin-left:4px;vertical-align:middle">'+ref+'</span>');
  }
  var st=document.createElement("style");
  st.id="tl-off-css";
  st.textContent="body.tl-off #scrChat .bar,body.tl-off #scrChat form,body.tl-off #scrChat .tools,body.tl-off #scrChat .sugg,body.tl-off #scrChat .fab{display:none!important}"
    +"body.tl-off #scrChat{padding-bottom:0!important}";
  document.head.appendChild(st);
  /* bloque tout clic dans le coin haut-droit de la conversation officielle (menu à trois points) */
  document.addEventListener("click",function(e){
    if(curId()!==OFF) return;
    var sc=document.getElementById("scrChat"); if(!sc) return;
    var r=sc.getBoundingClientRect();
    if(e.clientY<r.top+120 && e.clientX>r.right-90){ e.preventDefault(); e.stopPropagation(); }
  },true);
  function hideSubtitle(){
    var sc=document.getElementById("scrChat"); if(!sc) return;
    sc.querySelectorAll("*").forEach(function(e){
      if(e.children.length===0 && e.textContent.trim()==="Discussion" && e.style.display!=="none") e.style.display="none";
    });
  }
  function tick(){
    var on=curId()===OFF;
    document.body.classList.toggle("tl-off",on);
    if(on){ addBadge(document.getElementById("peerName")); hideSubtitle(); }
    document.querySelectorAll("#recent .row").forEach(function(r){
      if(r.dataset && r.dataset.pid===OFF) addBadge(r.querySelector(".rn"));
    });
  }
  setInterval(tick,400);
})();
