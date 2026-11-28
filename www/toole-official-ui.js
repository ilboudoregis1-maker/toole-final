(function(){
  "use strict";
  var OFF="131b7c48-f364-4405-af3e-2f7cdbf95179";
  function curId(){ try{ return peer && peer.id; }catch(e){ return null; } }
  function blueBadge(){
    var s=document.querySelector("#recent .row:first-child .rn svg");
    return s ? s.outerHTML : null;
  }
  function putBadge(anchor){
    if(!anchor) return;
    var ref=blueBadge(); if(!ref) return;
    var cur=anchor.parentNode.querySelector(".tlb");
    if(cur){ if(cur.getAttribute("data-ref")!=="1"){ cur.innerHTML=ref; cur.setAttribute("data-ref","1"); } return; }
    anchor.insertAdjacentHTML("afterend",'<span class="tlb" data-ref="1" style="display:inline-flex;margin-left:4px;vertical-align:middle">'+ref+'</span>');
  }
  var st=document.createElement("style");
  st.id="tl-off-css";
  st.textContent="body.tl-off #scrChat .bar,body.tl-off #scrChat form,body.tl-off #scrChat .tools,body.tl-off #scrChat .sugg,body.tl-off #scrChat .fab{display:none!important}";
  document.head.appendChild(st);
  function block(e){
    if(curId()!==OFF) return;
    var sc=document.getElementById("scrChat"); if(!sc) return;
    var r=sc.getBoundingClientRect(), p=e.touches?e.touches[0]:e;
    if(p.clientY<r.top+120 && p.clientX>r.right-110){ e.preventDefault(); e.stopPropagation(); }
  }
  ["pointerdown","touchstart","mousedown","click"].forEach(function(ev){
    document.addEventListener(ev,block,{capture:true,passive:false});
  });
  function hideSubtitle(){
    var sc=document.getElementById("scrChat"); if(!sc) return;
    sc.querySelectorAll("*").forEach(function(e){
      if(e.children.length===0 && e.textContent.trim()==="Discussion" && e.style.display!=="none") e.style.display="none";
    });
  }
  function tick(){
    var on=curId()===OFF;
    document.body.classList.toggle("tl-off",on);
    if(on){
      putBadge(document.getElementById("peerName"));
      hideSubtitle();
    }
    document.querySelectorAll("#recent .row").forEach(function(r){
      if(r.dataset && r.dataset.pid===OFF) putBadge(r.querySelector(".rn"));
    });
  }
  setInterval(tick,400);
})();
