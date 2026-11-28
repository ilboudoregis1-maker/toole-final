(function(){
  "use strict";
  var OFF="131b7c48-f364-4405-af3e-2f7cdbf95179";
  function curId(){ try{ return peer && peer.id; }catch(e){ return null; } }
  function blueBadge(){
    var s=document.querySelector("#recent .row:first-child .rn svg");
    return s ? s.outerHTML : null;
  }
  /* badge à côté du nom « TÕÕLé » dans l'en-tête de la conversation */
  function headerName(){
    var sc=document.getElementById("scrChat"); if(!sc) return null;
    var all=sc.querySelectorAll("*");
    for(var i=0;i<all.length;i++){
      var e=all[i];
      if(e.children.length===0 && /^t[õo][õo]l[ée]$/i.test(e.textContent.trim())) return e;
    }
    return null;
  }
  function addBadge(el){
    if(!el) return;
    var ref=blueBadge(); if(!ref) return;
    var cur=el.parentNode.querySelector(".tlb");
    if(cur){ if(cur.getAttribute("data-ref")!=="1"){ cur.innerHTML=ref; cur.setAttribute("data-ref","1"); } return; }
    el.insertAdjacentHTML("afterend",'<span class="tlb" data-ref="1" style="display:inline-flex;margin-left:4px;vertical-align:middle">'+ref+'</span>');
  }
  var st=document.createElement("style");
  st.id="tl-off-css";
  st.textContent="body.tl-off #scrChat .bar,body.tl-off #scrChat form,body.tl-off #scrChat .tools,body.tl-off #scrChat .sugg,body.tl-off #scrChat .fab{display:none!important}";
  document.head.appendChild(st);
  /* bouton à trois points : repéré par sa position (coin haut-droit de l'en-tête), rendu inactif */
  function menuBtn(){
    var sc=document.getElementById("scrChat"); if(!sc) return null;
    var r=sc.getBoundingClientRect(), found=null;
    sc.querySelectorAll("button,[role=button],div,span").forEach(function(e){
      if(e.children.length>2) return;
      var b=e.getBoundingClientRect();
      if(b.width>0 && b.width<90 && b.top<r.top+120 && b.left>r.right-110 && b.right>r.right-20) found=e;
    });
    return found;
  }
  function killMenu(){
    var b=menuBtn(); if(!b) return;
    b.style.visibility="hidden"; b.style.pointerEvents="none";
  }
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
    if(on){ addBadge(headerName()); hideSubtitle(); killMenu(); }
    document.querySelectorAll("#recent .row").forEach(function(r){
      if(r.dataset && r.dataset.pid===OFF) addBadge(r.querySelector(".rn"));
    });
  }
  setInterval(tick,400);
})();
