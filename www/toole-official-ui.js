(function(){
  "use strict";
  var OFF="131b7c48-f364-4405-af3e-2f7cdbf95179";
  function refBadge(){
    var list=[].slice.call(document.querySelectorAll("#recent .rn svg")).filter(function(s){return !s.closest(".tlb")});
    return list.length ? list[0].outerHTML : null;
  }
  function addBadge(el){
    if(!el) return;
    var ref=refBadge();
    if(!ref) return;
    var cur=el.querySelector(".tlb");
    if(cur){ if(cur.getAttribute("data-ref")!=="1"){cur.innerHTML=ref;cur.setAttribute("data-ref","1")} return }
    el.insertAdjacentHTML("beforeend",'<span class="tlb" data-ref="1" style="display:inline-flex;margin-left:4px;vertical-align:middle">'+ref+'</span>');
  }
  var st=document.createElement("style");
  st.id="tl-off-css";
  st.textContent="body.tl-off #scrChat .bar,body.tl-off #scrChat form,body.tl-off #scrChat .tools,body.tl-off #scrChat .sugg,body.tl-off #scrChat .fab{display:none!important}"
    +"body.tl-off #scrChat{padding-bottom:0!important}";
  document.head.appendChild(st);
  function curId(){ try{ return peer && peer.id; }catch(e){ return null; } }
  function hideHeader(){
    var w=window.innerWidth;
    document.querySelectorAll("#scrChat button,#scrChat [role=button]").forEach(function(b){
      var r=b.getBoundingClientRect();
      if(r.top<120 && r.left>w*0.7 && b.style.display!=="none") b.style.display="none";
    });
    document.querySelectorAll("#scrChat *").forEach(function(e){
      if(e.children.length===0 && e.textContent && e.textContent.trim()==="Discussion") e.style.display="none";
    });
  }
  function tick(){
    var onOff = curId()===OFF;
    document.body.classList.toggle("tl-off", onOff);
    if(onOff){
      addBadge(document.getElementById("peerName"));
      hideHeader();
    }
    document.querySelectorAll("#recent .row").forEach(function(r){
      if(r.dataset && r.dataset.pid===OFF) addBadge(r.querySelector(".rn"));
    });
  }
  setInterval(tick, 500);
})();
