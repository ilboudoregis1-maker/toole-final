(function(){
  "use strict";
  if(window.__bpro) return; window.__bpro=1;
  window.__bType="simple";
  var _f=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      var u=typeof input==="string"?input:(input&&input.url)||"";
      var m=String((init&&init.method)||"").toUpperCase();
      if(m==="POST" && u.indexOf("/rest/v1/business_requests")>-1 && init && typeof init.body==="string"){
        var o=JSON.parse(init.body); o.type_compte=window.__bType||"simple";
        init=Object.assign({},init,{body:JSON.stringify(o)});
      }
    }catch(e){}
    return _f(input,init);
  };
  function addSelect(){
    var inp=[].slice.call(document.querySelectorAll("input")).filter(function(i){
      return /^Numéro Orange Money/.test(i.placeholder||"");
    })[0];
    if(!inp || document.getElementById("bTypeSel")) return;
    var s=document.createElement("select");
    s.id="bTypeSel";
    s.style.cssText="display:block;width:100%;box-sizing:border-box;margin:8px 0;padding:12px;border-radius:12px;border:1px solid #cbd5e1;font-size:15px";
    s.innerHTML='<option value="simple">Compte simple (particulier)</option><option value="commercial">Compte commercial (boutique)</option>';
    s.onchange=function(){ window.__bType=s.value; };
    inp.parentNode.insertBefore(s,inp);
  }
  function openSheet(){
    if(document.getElementById("bMomoSheet")) return;
    var o=document.createElement("div");
    o.id="bMomoSheet";
    o.style.cssText="position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:99999;display:flex;align-items:flex-end;justify-content:center";
    o.innerHTML='<div style="background:#fff;color:#0b1f3f;width:100%;max-width:480px;border-radius:20px 20px 0 0;padding:20px;font-family:system-ui">'
      +'<h3 style="margin:0 0 12px">Numéro de réception Orange Money</h3>'
      +'<input id="bMomo" type="tel" inputmode="numeric" maxlength="12" placeholder="8 chiffres" style="width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid #cbd5e1;font-size:15px">'
      +'<select id="bMomoType" style="width:100%;box-sizing:border-box;margin-top:10px;padding:12px;border-radius:12px;border:1px solid #cbd5e1;font-size:15px"><option value="simple">Compte simple (particulier)</option><option value="commercial">Compte commercial (boutique)</option></select>'
      +'<p id="bMomoErr" style="color:#dc2626;font-size:13px;margin:8px 0 0"></p>'
      +'<button id="bMomoOk" style="width:100%;margin-top:14px;padding:14px;border:0;border-radius:999px;background:#2563eb;color:#fff;font-weight:700">Enregistrer</button>'
      +'<button id="bMomoX" style="width:100%;margin-top:8px;padding:12px;border:0;border-radius:999px;background:#eef2f7;color:#0b1f3f;font-weight:600">Fermer</button>'
      +'</div>';
    document.body.appendChild(o);
    document.getElementById("bMomoX").onclick=function(){o.remove()};
    document.getElementById("bMomoOk").onclick=function(){
      var n=document.getElementById("bMomo").value.replace(/\D/g,""), t=document.getElementById("bMomoType").value;
      if(n.length>8 && n.indexOf("226")===0) n=n.slice(3);
      if(n.length!==8){ document.getElementById("bMomoErr").textContent="Numéro invalide (8 chiffres)."; return; }
      window.api("/rest/v1/rpc/ma_boutique_maj",{method:"POST",body:JSON.stringify({p_momo:n,p_type:t})})
        .then(function(){ o.remove(); if(window.toast) window.toast("Numéro et type de compte enregistrés"); })
        .catch(function(e){ document.getElementById("bMomoErr").textContent=(e&&e.message)||"Enregistrement impossible"; });
    };
  }
  function addButton(){
    if(document.getElementById("bMomoBtn")) return;
    var b=document.createElement("button");
    b.id="bMomoBtn"; b.textContent="Numéro de réception";
    b.style.cssText="position:fixed;right:12px;bottom:92px;z-index:9998;padding:10px 14px;border:0;border-radius:999px;background:#2563eb;color:#fff;font-weight:700;font-size:13px;box-shadow:0 6px 16px rgba(37,99,235,.35)";
    b.onclick=openSheet;
    document.body.appendChild(b);
  }
  setInterval(function(){ addSelect(); addButton(); },700);
})();
