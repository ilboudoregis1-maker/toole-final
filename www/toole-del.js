(function(){
function K(){try{return "tdel_"+me()}catch(e){return "tdel_x"}}
function get(){try{return JSON.parse(localStorage.getItem(K())||"{}")}catch(e){return{}}}
function put(o){try{var k=Object.keys(o);if(k.length>5000)k.slice(0,1000).forEach(function(x){delete o[x]});localStorage.setItem(K(),JSON.stringify(o))}catch(e){}}
function hide(k,id){var o=get();o[k+id]=1;put(o)}
function keep(k,rows){if(!Array.isArray(rows))return rows;var h=get();
return rows.filter(function(x){return !(x&&x.id!=null&&h[k+x.id])})}
function kindOf(p,o){if(o&&o.method&&o.method!=="GET")return "";
return p.indexOf("/rest/v1/group_messages")===0?"g":p.indexOf("/rest/v1/messages")===0?"u":""}
var n=0;
function wrapApi(){var a=window.api;if(n>=3||typeof a!=="function"||a.__tdel)return;n++;
var w=function(p,o){var r=a.apply(this,arguments),k=kindOf(String(p),o);
return k?Promise.resolve(r).then(function(x){return keep(k,x)}):r};
w.__tdel=1;window.api=w}
wrapApi();setTimeout(wrapApi,1500);
function patch(m,kind,P){var c=document.getElementById(P+"C");if(!c||!c.parentNode)return;
var d=document.getElementById(P+"D");if(d)d.textContent="Supprimer pour tous";
var b=document.createElement("button");b.className="sa dz";b.id=P+"L";
b.textContent="Supprimer pour moi";c.parentNode.insertBefore(b,c.nextSibling);
b.onclick=function(){try{closeSheet()}catch(e){}hide(kind,m.id);toast("Message supprimé de ton côté");
if(kind==="u"&&typeof loadMsgs==="function")loadMsgs();
if(kind==="g"&&typeof loadGroupMsgs==="function")loadGroupMsgs()}}
function wrapMenu(name,kind,P){var f=window[name];if(typeof f!=="function"||f.__tdel)return;
var w=function(m,mine){var r=f.apply(this,arguments);try{patch(m,kind,P)}catch(e){}return r};
w.__tdel=1;window[name]=w}
wrapMenu("openSheet","u","sm");wrapMenu("gOpenMenu","g","gm");
var rn=0;
function wrapRender(){var f=window.renderMsgRows;if(rn>=3||typeof f!=="function"||f.__tdel)return;rn++;
var w=function(){var a=Array.prototype.slice.call(arguments);a[0]=keep("u",a[0]);return f.apply(this,a)};
w.__tdel=1;window.renderMsgRows=w}
wrapRender();setTimeout(wrapRender,1500);setTimeout(wrapRender,4000);
})();
