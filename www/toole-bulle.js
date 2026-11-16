/* TÕÕLé : mode bulle + interrupteur "Bulles de message" */
(function(){try{
var q=new URLSearchParams(location.search);
if(q.get("bulle")==="1"){
  window.TOOLE_PUSH_OFF=true;window.TOOLE_BUBBLE=1;
  var id=q.get("p"),g=q.get("g"),n=q.get("n")||"";
  var k=0,iv=setInterval(function(){
    try{
      var ok=typeof openChat==="function"&&typeof me==="function"&&me();
      if(ok){clearInterval(iv);
        if(g)openGroup({id:g,name:n});
        else if(id)openChat(id,n||"\u2026");
        else if(n)api("/rest/v1/profiles?select=id,pseudo&pseudo=eq."+encodeURIComponent(n)+"&limit=1").then(function(r){if(r&&r[0])openChat(r[0].id,r[0].pseudo||n)}).catch(function(){});
      }else if(++k>80)clearInterval(iv)
    }catch(e){if(++k>80)clearInterval(iv)}
  },250);
}
function addRow(){
  var v=document.getElementById("tVib");
  if(!v||document.getElementById("tBulle"))return;
  var card=v.closest(".card");if(!card)return;
  var N=window.TooleNative;
  var l=document.createElement("label");l.className="row";
  l.innerHTML='<span><b>Bulles de message</b><br><small style="opacity:.7">Une bulle flottante s\u2019affiche quand tu re\u00e7ois un message.</small></span><input type="checkbox" id="tBulle">';
  card.appendChild(l);
  var c=l.querySelector("input");
  try{c.checked=N?N.bubblesEnabled():true}catch(e){c.checked=true}
  c.onchange=function(){try{N.setBubbles(c.checked)}catch(e){try{toast("Bulles indisponibles sur cet appareil")}catch(x){}}};
  var b=document.createElement("button");b.className="row";b.id="tBulleSys";
  b.innerHTML='<span><b>Autoriser les bulles dans Android</b><br><small style="opacity:.7">\u00c9tape obligatoire : ouvre les r\u00e9glages Android et active l\u2019option Bulles pour T\u00d5\u00d5L\u00e9.</small></span><span class="chev">\u203a</span>';b.style.cssText="text-align:left;line-height:1.35;padding:14px 16px";
  b.onclick=function(){try{N.openBubbleSettings()}catch(e){try{toast("Ouvre Param\u00e8tres Android > Applications > TÕÕLé > Notifications")}catch(x){}}};
  card.appendChild(b);
}
setInterval(addRow,1000);
}catch(e){}})();
