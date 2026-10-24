(function(){try{
var P=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.PushNotifications,st=false,pend=null;
function U(){try{return me()}catch(e){return null}}
function S(t){var u=U();if(!u)return;
api("/rest/v1/rpc/register_push_token",{method:"POST",body:JSON.stringify({p_token:t,p_platform:"android"})}).catch(function(){return api("/rest/v1/push_tokens?on_conflict=token",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({token:t,user_id:u,platform:"android"})})}).catch(function(){})}
function shown(){var s=document.getElementById("scrChat");return s&&!s.classList.contains("hide")}
function go(p){if(p.g)openGroup({id:p.g,name:p.t});else openChat(p.id,p.t)}
function sh(p){var s=document.getElementById(p.g?"scrGroup":"scrChat");return s&&!s.classList.contains("hide")}
function GO(){if(!pend||!U()||typeof openChat!=="function")return false;var p=pend;pend=null;
go(p);[1500,4000].forEach(function(ms){setTimeout(function(){if(!sh(p))go(p)},ms)});return true}
if(P){P.addListener("pushNotificationActionPerformed",function(e){try{var n=e.notification,d=n.data||{};pend={id:d.peer,g:d.group,t:d.gname||n.title||"TÕÕLé"};var k=0,i=setInterval(function(){if(GO()||++k>60)clearInterval(i)},250)}catch(x){}});
P.addListener("registration",function(t){S(t.value)})}
function R(){/*TOOLE_PUSH_SAFE*/if(!P||window.TOOLE_PUSH_OFF)return;try{P.requestPermissions().then(function(){try{return P.register()}catch(e){}}).catch(function(){})}catch(e){}}
window.TOOLE_PUSH_OFF=true;
setInterval(function(){if(U()&&!st){st=true;R()}if(!U())st=false},3000);
}catch(e){}})();
