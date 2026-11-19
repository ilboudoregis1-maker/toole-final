(function(){
if(window.__tmmc)return;window.__tmmc=1;
var S=window.crypto&&window.crypto.subtle;
if(!S||!window.indexedDB||!window.fetch)return;
var CAP=500*1048576,MAXF=40*1048576,cnt=0,DB=null,KP=null;
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
function db(){return DB||(DB=new Promise(function(res,rej){var r=indexedDB.open("toole_media",1);
r.onupgradeneeded=function(){var d=r.result;d.createObjectStore("k");d.createObjectStore("f");d.createObjectStore("i")};
r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}}))}
function ig(s,k){return db().then(function(d){return new Promise(function(res,rej){
var q=d.transaction(s).objectStore(s).get(k);q.onsuccess=function(){res(q.result)};q.onerror=function(){rej(q.error)}})})}
function key(){return KP||(KP=ig("k","aes").then(function(v){if(v)return v;
return S.generateKey({name:"AES-GCM",length:256},false,["encrypt","decrypt"]).then(function(x){
return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction("k","readwrite");
t.objectStore("k").put(x,"aes");t.oncomplete=function(){res(x)};t.onerror=function(){rej(t.error)}})})})}))}
function mk(u){
if(!u||/(^|[\/_.-])once([\/_.-]|$)/i.test(u)||u.indexOf("/object/public/avatars")>-1||u.indexOf("/photos/logos/")>-1)return null;
var p=u.replace(/^https?:\/\/[^\/]+/,"");
if(p.indexOf("/storage/v1/object/")===0)return p.split("?")[0];
if(p.indexOf("/functions/v1/tg?")===0)return p;
return null}
function sig(u){if(u.length<12)return false;var a=u[0],b=u[1],c=u[2],d=u[3];
if(a===255&&b===216&&c===255)return true;
if(a===137&&b===80&&c===78&&d===71)return true;
if(a===71&&b===73&&c===70&&d===56)return true;
if(a===82&&b===73&&c===70&&d===70)return true;
if(a===26&&b===69&&c===223&&d===163)return true;
if(a===79&&b===103&&c===103&&d===83)return true;
if(u[4]===102&&u[5]===116&&u[6]===121&&u[7]===112)return true;
if(a===73&&b===68&&c===51)return true;
if(a===102&&b===76&&c===97&&d===67)return true;
if(a===35&&b===33&&c===65&&d===77)return true;
if(a===37&&b===80&&c===68&&d===70)return true;
if(a===80&&b===75&&c===3&&d===4)return true;
return false}
function put(k,r){return ig("i",k).then(function(x){if(x)return;
return r.arrayBuffer().then(function(b){var n=b.byteLength;
if(!n||n>MAXF||!sig(new Uint8Array(b,0,Math.min(16,n))))return;
var type=r.headers.get("content-type")||"application/octet-stream",iv=crypto.getRandomValues(new Uint8Array(12));
return key().then(function(K){return S.encrypt({name:"AES-GCM",iv:iv},K,b)}).then(function(ct){
return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(["f","i"],"readwrite");
t.objectStore("f").put({iv:iv,ct:ct,type:type},k);t.objectStore("i").put({t:Date.now(),n:n},k);
t.oncomplete=res;t.onerror=function(){rej(t.error)}})})}).then(function(){if(++cnt%15===0)evict()})})})}
function get(k){return ig("f",k).then(function(v){if(!v)return null;
return key().then(function(K){return S.decrypt({name:"AES-GCM",iv:v.iv},K,v.ct)}).then(function(b){
return new Response(b,{status:200,headers:{"Content-Type":v.type}})})}).catch(function(){return null})}
function list(){return db().then(function(d){return new Promise(function(res,rej){var o=[];
var q=d.transaction("i").objectStore("i").openCursor();
q.onsuccess=function(){var c=q.result;if(c){o.push({k:c.key,t:c.value.t,n:c.value.n});c.continue()}else res(o)};
q.onerror=function(){rej(q.error)}})})}
function rm(k){return db().then(function(d){return new Promise(function(res,rej){var t=d.transaction(["f","i"],"readwrite");
t.objectStore("f").delete(k);t.objectStore("i").delete(k);t.oncomplete=res;t.onerror=function(){rej(t.error)}})})}
async function evict(){try{var l=await list(),tot=0;l.forEach(function(x){tot+=x.n});if(tot<=CAP)return;
l.sort(function(a,b){return a.t-b.t});
for(var i=0;i<l.length&&tot>CAP*0.8;i++){await rm(l[i].k);tot-=l[i].n}}catch(e){}}
var prev=window.fetch.bind(window);
window.fetch=function(input,init){
var u=typeof input==="string"?input:(input&&input.url)||"";
var m=String((init&&init.method)||(input&&input.method)||"GET").toUpperCase();
var k=m==="GET"?mk(u):null;
if(!k)return prev(input,init);
return prev(input,init).then(function(r){
if(r&&r.status===200){try{put(k,r.clone()).catch(function(){})}catch(e){}return r}
return get(k).then(function(c){return c||r})
},function(e){return get(k).then(function(c){if(c)return c;throw e})})};
})();
