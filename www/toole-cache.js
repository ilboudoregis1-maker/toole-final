(function(){
var TTL=300000,MAX=600,CAP=300000;var BG={};
var RE=new RegExp("^/rest/v1/messages\\?select=\\*&or=\\(and\\(sender\\.eq\\.([^,]+),"+
"receiver\\.eq\\.([^)]+)\\),and\\(sender\\.eq\\.([^,]+),receiver\\.eq\\.([^)]+)\\)\\)"+
"&order=created_at\\.asc$");
var GRE=/^\/rest\/v1\/group_messages\?select=([^&]+)&group_id=eq\.([^&]+)&order=created_at\.asc$/;
function pm(p){var m=RE.exec(p);return m&&m[1]===m[4]&&m[2]===m[3]?{a:m[1],b:m[2]}:null}
function gm(p){var m=GRE.exec(p);if(!m)return null;var s=m[1];
if(s!=="*"&&(s.split(",").indexOf("id")<0||s.indexOf("created_at")<0))return null;return{g:m[2]}}
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
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
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
var m={},i;h.forEach(function(x){m[x.id]=x});
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
var o1=await arch(k,rows,true);wr(k,{r:mark(o1.map(cl),q.a),t:now});return o1}
var nw=await a(s+"&created_at=gt."+encodeURIComponent(since(c.r,q.a)));
if(!Array.isArray(nw))return nw;
var all=merge(c.r,nw);wr(k,{r:mark(all.map(cl),q.a),t:c.t});
if(stale&&!BG[k]){BG[k]=1;a(s).then(function(rw){if(Array.isArray(rw))return arch(k,rw,true).then(function(o2){wr(k,{r:mark(o2.map(cl),q.a),t:Date.now()})})}).catch(function(){}).then(function(){delete BG[k]})}
return await arch(k,all,false)
}catch(e){var r2=await arch(k,ok?c.r:[],false);if(r2.length)return r2;throw e}}
async function gload(a,s,q){var k="g:"+q.g;
try{var rows=await a(s);if(!Array.isArray(rows))return rows;return await arch(k,rows,false)}
catch(e){var h=await hget(k);if(h&&h.length)return h;throw e}}
var P="/rest/v1/messages?id=eq.",PG="/rest/v1/group_messages?id=eq.";
function del(s,p0,pre){var id=s.slice(p0.length).split("&")[0];
if(pre==="tmc:")try{Object.keys(localStorage).forEach(function(k){if(k.indexOf("tmc:")!==0)return;
var c=rd(k);if(!c||!c.r)return;
var n=c.r.filter(function(x){return String(x.id)!==id});
if(n.length!==c.r.length){c.r=n;wr(k,c)}})}catch(e){}
try{ik().then(function(ks){ks.forEach(function(k){if(String(k).indexOf(pre)!==0)return;hget(k).then(function(h){if(!h)return;
var n=h.filter(function(x){return String(x.id)!==id});if(n.length!==h.length)hset(k,JSON.stringify(n))})})}).catch(function(){})}catch(e){}}
var done=0;
function wrap(){if(done)return;var a=window.api;if(typeof a!=="function")return;done=1;
var w=function(p,o){var s=String(p),g=!o||!o.method||o.method==="GET";
if(o&&o.method==="DELETE"){if(s.indexOf(P)===0)del(s,P,"tmc:");else if(s.indexOf(PG)===0)del(s,PG,"g:")}
var q=g?pm(s):null;if(q)return load(a,s,q);
var r=g?gm(s):null;if(r)return gload(a,s,r);
return a.apply(this,arguments)};
window.api=w}
wrap();setTimeout(wrap,1500);
var lo=window.logout;if(typeof lo==="function")window.logout=function(){
try{Object.keys(localStorage).forEach(function(k){
if(k.indexOf("tmc:")===0)localStorage.removeItem(k)})}catch(e){}
return lo.apply(this,arguments)};
})();
