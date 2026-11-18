(function(){
var T=window.__trt,own=false,wp=null,cnt={};
if(!T)return;
function en(){return localStorage.getItem("toole_online")!=="0"}
function open_(){var s=T.ws();return !!s&&s.readyState===1}
function jn(t,key){var r=T.nr();T.tx({topic:"realtime:"+t,event:"phx_join",ref:r,join_ref:r,
payload:{config:{broadcast:{ack:false,self:false},presence:{key:key,enabled:true},postgres_changes:[]},
access_token:(function(){try{var s=sess();return s&&s.access_token||KEY}catch(e){return KEY}})()}})}
function lv(t){T.tx({topic:"realtime:"+t,event:"phx_leave",ref:T.nr(),payload:{}})}
function pres(t,ev,p){T.tx({topic:"realtime:"+t,event:"presence",ref:T.nr(),
payload:{type:"presence",event:ev,payload:p||{}}})}
function mine(){var id=T.mid();if(!id)return;
if(en()&&!own){own=true;jn("online-"+id,id)}
else if(!en()&&own){own=false;pres("online-"+id,"untrack");lv("online-"+id)}}
function watch(){var c=T.cur(),sc=document.getElementById("scrChat");
var w=en()&&c&&sc&&!sc.classList.contains("hide")?c:null;
if(w===wp)return;if(wp){lv("online-"+wp);delete cnt[wp]}
wp=w;if(wp){cnt[wp]={};jn("online-"+wp,"")}}
function paint(){var c=T.cur(),e=T.sub();if(!e||e.textContent==="écrit…")return;
var tx_=e.textContent.trim();
if(!e.dataset.tsOrig&&tx_!=="● en ligne")e.dataset.tsOrig=tx_;
var o=e.dataset.tsOrig||"Discussion";
var yes=en()&&c&&wp===c&&Object.keys(cnt[c]||{}).length>0;
if(yes){if(tx_!=="● en ligne"){e.textContent="● en ligne";e.style.color="#22c55e"}}
else if(tx_==="● en ligne"){e.textContent=o;e.style.color=""}}
window.__trh=function(m){var t=String(m.topic||""),id=T.mid();
if(m.event==="phx_reply"&&t==="realtime:online-"+id){
if(m.payload&&m.payload.status==="ok")pres("online-"+id,"track",{t:Date.now()});return false}
if(t.indexOf("realtime:online-")!==0)return false;var k=t.slice(16);
if(m.event==="presence_state"){var o={},s=m.payload||{};
Object.keys(s).forEach(function(x){o[x]=(s[x].metas||[]).length});cnt[k]=o;paint();return true}
if(m.event==="presence_diff"){var q=cnt[k]||(cnt[k]={}),p=m.payload||{};
["joins","leaves"].forEach(function(w,i){var x=p[w]||{};Object.keys(x).forEach(function(y){
q[y]=(q[y]||0)+((x[y].metas||[]).length)*(i?-1:1);if(q[y]<=0)delete q[y]})});paint();return true}
return false};
window.__tro=function(){own=false;wp=null;cnt={}};
setInterval(function(){if(!open_()){own=false;wp=null;cnt={};paint();return}
mine();watch();paint()},1000);
function row(){var p=document.getElementById("scrProfil");
if(!p||document.getElementById("tsOnl"))return;
var r=document.createElement("label");r.id="tsOnl";
r.style.cssText="display:flex;align-items:center;justify-content:space-between;"+
"gap:12px;margin:10px 16px;padding:12px 14px;border-radius:14px;font-size:15px;"+
"background:rgba(0,188,212,.08);border:1px solid rgba(0,168,200,.35)";
var t=document.createElement("span");t.textContent="Afficher ma présence en ligne";
var c=document.createElement("input");c.type="checkbox";c.checked=en();
c.style.cssText="width:22px;height:22px";
c.onchange=function(){localStorage.setItem("toole_online",c.checked?"1":"0")};
r.appendChild(t);r.appendChild(c);
var a=document.getElementById("tsTyp");
if(a&&a.parentNode)a.parentNode.insertBefore(r,a.nextSibling);else p.appendChild(r)}
var q=0;new MutationObserver(function(){if(q)return;q=1;
requestAnimationFrame(function(){q=0;row()})}).observe(document.body,{childList:true,subtree:true});
})();
