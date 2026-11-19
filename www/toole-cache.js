(function(){
var TTL=300000,MAX=600,CAP=300000,KEEP=7*864e5;var BG={};
var RE=new RegExp("^/rest/v1/messages\\?select=\\*&or=\\(and\\(sender\\.eq\\.([^,]+),"+
"receiver\\.eq\\.([^)]+)\\),and\\(sender\\.eq\\.([^,]+),receiver\\.eq\\.([^)]+)\\)\\)"+
"&order=created_at\\.asc$");
function pm(p){var m=RE.exec(p);return m&&m[1]===m[4]&&m[2]===m[3]?{a:m[1],b:m[2]}:null}
function rd(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
function cl(x){return Object.assign({},x)}
function wr(k,o){try{var r=o.r;while(r.length>MAX)r.shift();var s=JSON.stringify(o);
while(s.length>CAP&&r.length>30){r.splice(0,Math.ceil(r.length/5));s=JSON.stringify(o)}
localStorage.setItem(k,s)}catch(e){}}
function cmp(x,y){return x.created_at<y.created_at?-1:x.created_at>y.created_at?1:0}
function merge(a,b){var m={},o=[];a.concat(b).forEach(function(x){m[x.id]=x});
for(var i in m)o.push(m[i]);o.sort(cmp);return o}
function since(r,u){var t=null;r.forEach(function(x){
if(x.sender===u&&!x.read_at&&(t===null||x.created_at<t))t=x.created_at});
if(t===null)t=r[r.length-1].created_at;return new Date(Date.parse(t)-1).toISOString()}
function mark(r,u){if(localStorage.getItem("toole_readconf")==="0")return r;
var t=new Date().toISOString();
r.forEach(function(x){if(x.receiver===u&&!x.read_at)x.read_at=t});return r}
/* historique complet : IndexedDB, chiffre AES-GCM (cle non exportable) */
var DB=null,KP=null;
function db(){return DB||(DB=new Promise(function(res,rej){var r=indexedDB.open("toole_hist",1);
r.onupgradeneeded=function(){r.result.createObjectStore("k");r.result.createObjectStore("m")};
r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}}))}
function ig(s,k){return db().then(function(d){return new Promise(function(res,rej){
var q=d.transaction(s).objectStore(s).get(k);q.onsuccess=function(){res(q.result)};q.onerror=function(){rej(q.error)}})})}
function is(s,k,v){return db().then(function(d){return new Promise(function(res,rej){
var t=d.transaction(s,"readwrite");t.objectStore(s).put(v,k);t.oncomplete=res;t.onerror=function(){rej(t.error)}})})}
function ik(){return db().then(function(d){return new Promise(function(res,rej){
var q=d.transaction("m").objectStore("m").getAllKeys();q.onsuccess=function(){res(q.result)};q.onerror=function(){rej(q.error)}})})}
function key(){return KP||(KP=ig("k","aes").then(function(v){if(v)return v;
return crypto.subtle.generateKey({name:"AES-GCM",length:256},false,["encrypt","decrypt"]).then(function(k){return is("k","aes",k).then(function(){return k})})}))}
async function hget(k){try{var v=await ig("m",k);if(!v)return[];var K=await key();
return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:"AES-GCM",iv:v.iv},K,v.ct)))}catch(e){return null}}
async function hset(k,s){try{var K=await key(),iv=crypto.getRandomValues(new Uint8Array(12));
await is("m",k,{iv:iv,ct:await crypto.subtle.encrypt({name:"AES-GCM",iv:iv},K,new TextEncoder().encode(s))});return true}catch(e){return false}}
function bad(x){return typeof x.body==="string"&&/^(E1\.|G1\.|\uD83D\uDD12 Message chiffr)/.test(x.body)}
async function arch(k,srv,full){
var h=await hget(k);if(h===null)return srv;
var lim=Date.now()-KEEP,m={},i;
h.forEach(function(x){m[x.id]=x});
if(full&&srv.length){var ids={};srv.forEach(function(x){ids[x.id]=1});
h.forEach(function(x){if(!ids[x.id]&&Date.parse(x.created_at)>lim)delete m[x.id]})}
srv.forEach(function(x){if(bad(x)&&m[x.id])return;m[x.id]=x});
var o=[];for(i in m)o.push(m[i]);o.sort(cmp);
var s=JSON.stringify(o.filter(function(x){return !bad(x)})),good=true;
if(s!==JSON.stringify(h))good=await hset(k,s);
if(full&&good)try{localStorage.setItem("tmh:"+k,"1")}catch(e){}
return o}
async function load(a,s,q){var k="tmc:"+q.a+":"+q.b,c=rd(k),now=Date.now();
var ok=c&&Array.isArray(c.r)&&c.r.length>0,full=!ok||!localStorage.getItem("tmh:"+k),stale=ok&&now-c.t>TTL;
try{
if(full){var rows=await a(s);if(!Array.isArray(rows))return rows;
wr(k,{r:mark(rows.map(cl),q.a),t:now});return await arch(k,rows,true)}
var nw=await a(s+"&created_at=gt."+encodeURIComponent(since(c.r,q.a)));
if(!Array.isArray(nw))return nw;
var all=merge(c.r,nw);wr(k,{r:mark(all.map(cl),q.a),t:c.t});
if(stale&&!BG[k]){BG[k]=1;a(s).then(function(rw){if(Array.isArray(rw)){wr(k,{r:mark(rw.map(cl),q.a),t:Date.now()});return arch(k,rw,true)}}).catch(function(){}).then(function(){delete BG[k]})}
return await arch(k,all,false)
}catch(e){var r2=await arch(k,ok?c.r:[],false);if(r2.length)return r2;throw e}}
var P="/rest/v1/messages?id=eq.";
function del(s){var id=s.slice(P.length).split("&")[0];
try{Object.keys(localStorage).forEach(function(k){if(k.indexOf("tmc:")!==0)return;
var c=rd(k);if(!c||!c.r)return;
var n=c.r.filter(function(x){return String(x.id)!==id});
if(n.length!==c.r.length){c.r=n;wr(k,c)}})}catch(e){}
try{ik().then(function(ks){ks.forEach(function(k){hget(k).then(function(h){if(!h)return;
var n=h.filter(function(x){return String(x.id)!==id});if(n.length!==h.length)hset(k,JSON.stringify(n))})})}).catch(function(){})}catch(e){}}
var done=0;
function wrap(){if(done)return;var a=window.api;if(typeof a!=="function")return;done=1;
var w=function(p,o){var s=String(p),g=!o||!o.method||o.method==="GET";
if(o&&o.method==="DELETE"&&s.indexOf(P)===0)del(s);
var q=g?pm(s):null;return q?load(a,s,q):a.apply(this,arguments)};
window.api=w}
wrap();setTimeout(wrap,1500);
var lo=window.logout;if(typeof lo==="function")window.logout=function(){
try{Object.keys(localStorage).forEach(function(k){
if(k.indexOf("tmc:")===0)localStorage.removeItem(k)})}catch(e){}
return lo.apply(this,arguments)};
})();
