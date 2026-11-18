(function(){
var ws=null,rf=0,hb=null,retryAt=0,uid=null,fails=0,rdy={},pnd={},want={},tm=null,last=0;
function on(){return localStorage.getItem("toole_typing")!=="0"}
function mid(){try{var i=me();return i?String(i):null}catch(e){return null}}
function base(){return(typeof URL==="string"&&/^https?:/.test(URL))?URL:
"https://jbjeqxubpqqypysfsubd.supabase.co"}
function nr(){return String(++rf)}
function tx(o){try{if(ws&&ws.readyState===1)ws.send(JSON.stringify(o))}catch(e){}}
function cur(){try{return peer&&peer.id?String(peer.id):null}catch(e){return null}}
function join(t){var r=nr();rdy[t]=false;
tx({topic:"realtime:"+t,event:"phx_join",ref:r,join_ref:r,payload:{config:{
broadcast:{ack:false,self:false},presence:{key:"",enabled:true},postgres_changes:[]},access_token:(function(){try{var s=sess();return s&&s.access_token||KEY}catch(e){return KEY}})()}})}
function bad(){closeWs();fails++;retryAt=Date.now()+Math.min(600000,5000*Math.pow(2,fails))}
function closeWs(){clearInterval(hb);var s=ws;ws=null;rdy={};pnd={};
try{if(s)s.close()}catch(e){}}
function conn(){if(ws||typeof KEY!=="string")return;var id=mid();if(!id)return;
var s,u=base().replace(/^http/,"ws")+"/realtime/v1/websocket?apikey="+
encodeURIComponent(KEY)+"&vsn=1.0.0";
try{s=new WebSocket(u)}catch(e){return}
ws=s;uid=id;s.onopen=function(){join("typing-"+id);if(window.__tro)window.__tro();
Object.keys(want).forEach(function(k){if(rdy[k]===undefined)join(k)});
clearInterval(hb);hb=setInterval(function(){
tx({topic:"phoenix",event:"heartbeat",payload:{},ref:nr()})},25000)};
s.onmessage=onm;s.onclose=s.onerror=function(){if(ws===s)bad()}}
function flush(t){var p=pnd[t];if(p&&rdy[t]){delete pnd[t];tx(p)}}
function onm(ev){var m;try{m=JSON.parse(ev.data)}catch(e){return}if(window.__trh&&window.__trh(m))return;
if(m.event==="phx_reply"){var t=String(m.topic||"").replace("realtime:",""),p=m.payload||{};
if(p.status==="ok"){rdy[t]=true;fails=0;flush(t)}else if(p.status==="error")bad();return}
if(m.event==="broadcast"&&m.payload&&m.payload.event==="typing"&&m.topic==="realtime:typing-"+uid){
var d=m.payload.payload||{};show(String(d.from||""),d.s===1)}}
var shown=null,orig="";
function sub(){var h=document.querySelector("#scrChat .chead");if(!h)return null;
var n="";try{n=peer.pseudo||""}catch(e){}var a=null,b=null;
[].forEach.call(h.querySelectorAll("*"),function(e){if(e.children.length)return;
var x=e.dataset.tsOrig||e.textContent.trim();if(!x||e.tagName==="BUTTON")return;
if(x==="Discussion"){if(!a)a=e}else if(!b&&x!==n)b=e});return a||b}
function hide(){clearTimeout(tm);if(shown){shown.textContent=orig;
shown.style.color=shown.dataset.tsC||"";shown=null}}
function show(from,s){if(!on())return;var sc=document.getElementById("scrChat");
if(!s||!sc||sc.classList.contains("hide")||from!==cur()){hide();return}
var e=sub();if(!e)return;
if(shown!==e){hide();shown=e;orig=e.dataset.tsOrig||e.textContent;
e.dataset.tsOrig=orig;e.dataset.tsC=e.style.color||""}
e.textContent="écrit…";e.style.color="#00a8c8";
clearTimeout(tm);tm=setTimeout(hide,4000)}
function emit(to,s){if(!on()||!to)return;var t="typing-"+to;want[t]=1;conn();if(!ws)return;
var o={topic:"realtime:"+t,event:"broadcast",ref:nr(),
payload:{type:"broadcast",event:"typing",payload:{from:mid(),s:s}}};
if(ws.readyState===1&&rdy[t]===undefined)join(t);
if(rdy[t])tx(o);else pnd[t]=o}
document.addEventListener("input",function(e){var t=e.target;
if(!on()||!t||!t.closest||!t.closest("#scrChat .bar"))return;
var c=cur();if(!c)return;if(!t.value){emit(c,0);return}
if(Date.now()-last<2500)return;last=Date.now();emit(c,1)},true);
document.addEventListener("click",function(e){var b=e.target&&e.target.closest&&
e.target.closest("#scrChat .bar button");var c=b&&cur();if(c){last=0;emit(c,0)}},true);
function tick(){var id=mid();if(ws&&uid&&id!==uid){closeWs();fails=0;retryAt=0}
if(!on()&&localStorage.getItem("toole_online")==="0"){if(ws)closeWs();return}
if(!ws&&id&&Date.now()>=retryAt)conn()}
setInterval(tick,5000);setTimeout(tick,1500);window.__trt={on:on,mid:mid,cur:cur,tx:tx,nr:nr,sub:sub,ws:function(){return ws}};
function row(){var p=document.getElementById("scrProfil");
if(!p||document.getElementById("tsTyp"))return;
var r=document.createElement("label");r.id="tsTyp";
r.style.cssText="display:flex;align-items:center;justify-content:space-between;"+
"gap:12px;margin:10px 16px;padding:12px 14px;border-radius:14px;font-size:15px;"+
"background:rgba(0,188,212,.08);border:1px solid rgba(0,168,200,.35)";
var t=document.createElement("span");t.textContent="Afficher quand j\u2019écris";
var c=document.createElement("input");c.type="checkbox";c.checked=on();
c.style.cssText="width:22px;height:22px";
c.onchange=function(){localStorage.setItem("toole_typing",c.checked?"1":"0");
if(c.checked){retryAt=0;tick()}else{hide();if(localStorage.getItem("toole_online")==="0")closeWs()}};
r.appendChild(t);r.appendChild(c);p.appendChild(r)}
var q=0;new MutationObserver(function(){if(q)return;q=1;
requestAnimationFrame(function(){q=0;row()})}).observe(document.body,{childList:true,subtree:true});
})();
