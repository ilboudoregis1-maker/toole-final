/* TÕÕLé - fond de conversation synchronisé + message système */
(function(){
"use strict";
var MARK="[[wall]]",lastLocal=0,push=null,msg=null,myName=null,lastKey=null,n3=0,busyScan=false;
function H(){return window.__wallW}
function me_(){try{return typeof me==="function"?me():null}catch(e){return null}}
function API(p,o){return typeof api==="function"?api(p,o):Promise.reject(new Error("no api"))}
function ck(k){
  if(!k)return null;
  if(k.charAt(0)==="u"){var a=me_();if(!a)return null;return "u:"+[a,k.slice(2)].sort().join("_")}
  return k;
}
function nameOf(v){
  if(!v)return "aucun fond";
  if(/^url\(["']?data:image\/jpeg/.test(v))return "photo personnalisée";
  var C=H().cats;
  for(var i=0;i<C.length;i++){if(C[i][3]&&C[i][3].indexOf(v)>=0)return C[i][0]}
  return "personnalisé";
}
function getName(cb){
  if(myName)return cb(myName);
  var id=me_();if(!id)return cb("Quelqu'un");
  API("/rest/v1/profiles?id=eq."+id+"&select=*").then(function(r){
    var p=Array.isArray(r)?r[0]:r;
    myName=(p&&(p.pseudo||p.username||p.name||p.full_name||p.display_name||p.nickname))||null;
    cb(myName||"Quelqu'un");
  }).catch(function(){cb("Quelqu'un")});
}
function changed(k,v){
  lastLocal=Date.now();
  var c=ck(k);if(!c)return;
  var ctx={k:k,c:c,v:v||null};
  push=ctx;msg=ctx;
}
window.__wallSync={changed:changed};
function doPush(p){
  API("/rest/v1/chat_walls?on_conflict=conv_key",{method:"POST",
    headers:{Prefer:"resolution=merge-duplicates,return=minimal"},
    body:JSON.stringify({conv_key:p.c,wall:p.v,wall_name:nameOf(p.v),updated_by:me_(),updated_at:new Date().toISOString()})
  }).then(function(r){if(r&&!Array.isArray(r)&&(r.code||r.message))wtoast("Fond non synchronis\u00e9 : "+(r.message||r.code))}).catch(function(e){wtoast("Fond non synchronis\u00e9 : "+(e&&e.message||e))});
}
function doMsg(m){
  getName(function(n){
    var body=MARK+n+"|"+nameOf(m.v)+"|"+me_(),isG=m.k.charAt(0)==="g",id=m.k.slice(2);
    API(isG?"/rest/v1/group_messages":"/rest/v1/messages",{method:"POST",headers:{Prefer:"return=minimal"},
      body:JSON.stringify(isG?{group_id:id,sender:me_(),body:body}:{sender:me_(),receiver:id,body:body})
    }).then(function(){
      try{if(isG&&typeof loadGroupMsgs==="function")loadGroupMsgs();else if(typeof loadMsgs==="function")loadMsgs()}catch(e){}
    }).catch(function(){});
  });
}
function pull(){
  var h=H();if(!h)return;
  var k=h.key(),c=ck(k);
  if(!c||Date.now()-lastLocal<6000)return;
  API("/rest/v1/chat_walls?conv_key=eq."+encodeURIComponent(c)+"&select=wall").then(function(r){
    if(!Array.isArray(r)||!r.length)return;
    if(h.key()!==k||Date.now()-lastLocal<6000)return;
    var w=r[0].wall||null,cur=h.get()[k]||null;
    if(w!==cur)h.put(k,w);
  }).catch(function(){});
}
function scan1(c){
  if(busyScan)return;busyScan=true;
  try{
    var w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT,null),n,L=[];
    while((n=w.nextNode())){if(n.nodeValue.indexOf(MARK)===0)L.push(n)}
    L.forEach(function(n){
      var b=n;while(b.parentNode&&b.parentNode!==c)b=b.parentNode;
      if(!b.parentNode||b===n)return;
      var t=n.nodeValue.slice(MARK.length).split("|"),who=t[0],what=t[1]||"",wid=t[2]||"";
      var d=document.createElement("div");
      d.style.cssText="text-align:center;font-size:12px;color:#7b8a99;margin:10px 24px;line-height:1.4;align-self:center;clear:both";
      d.textContent=((wid?wid===me_():who===myName)?"Vous avez modifié":who+" a modifié")+" le fond en "+what;
      c.replaceChild(d,b);
    });
  }catch(e){}
  busyScan=false;
}
function scan(){
  ["chat","gMsgs","cxMsgs"].forEach(function(id){
    var c=document.getElementById(id);if(!c)return;
    if(!c.__ws){c.__ws=1;new MutationObserver(function(){scan1(c)}).observe(c,{childList:true,subtree:true,characterData:true})}
    scan1(c);
  });
}
var n5=0;
function wtoast(m){try{var d=document.createElement("div");d.textContent=m;d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100090;padding:12px;border-radius:14px;background:#0f172a;color:#fff;text-align:center;font-size:13px";document.body.appendChild(d);setTimeout(function(){d.remove()},5000)}catch(e){}}
function scanPrev(){try{var ex=["chat","gMsgs","cxMsgs"].map(function(i){return document.getElementById(i)});var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode())){if(n.nodeValue.indexOf(MARK)>=0)L.push(n)}L.forEach(function(n){for(var i=0;i<ex.length;i++){if(ex[i]&&ex[i].contains(n))return}n.nodeValue=n.nodeValue.replace(/\[\[wall\]\][^\n]*/,"Fond de conversation modifi\u00e9")})}catch(e){}}
setInterval(function(){
  scan();if(++n5>=15){n5=0;scanPrev()}
  if(!myName&&me_())getName(function(){});
  var h=H();if(!h)return;
  var now=Date.now();
  if(push&&now-lastLocal>500){var p=push;push=null;doPush(p)}
  if(msg&&!document.getElementById("wSheet")&&!push&&now-lastLocal>500){var m=msg;msg=null;doMsg(m)}
  var k=h.key();
  if(k!==lastKey){lastKey=k;n3=0;if(k)pull()}
  if(++n3>=10){n3=0;pull()}
},900);
})();
