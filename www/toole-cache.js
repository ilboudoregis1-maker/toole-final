(function(){
var TTL=300000,MAX=600,CAP=300000;
var RE=new RegExp("^/rest/v1/messages\\?select=\\*&or=\\(and\\(sender\\.eq\\.([^,]+),"+
"receiver\\.eq\\.([^)]+)\\),and\\(sender\\.eq\\.([^,]+),receiver\\.eq\\.([^)]+)\\)\\)"+
"&order=created_at\\.asc$");
function pm(p){var m=RE.exec(p);return m&&m[1]===m[4]&&m[2]===m[3]?{a:m[1],b:m[2]}:null}
function rd(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}}
function cl(x){return Object.assign({},x)}
function wr(k,o){try{var r=o.r;while(r.length>MAX)r.shift();var s=JSON.stringify(o);
while(s.length>CAP&&r.length>30){r.splice(0,Math.ceil(r.length/5));s=JSON.stringify(o)}
localStorage.setItem(k,s)}catch(e){}}
function merge(a,b){var m={},o=[];a.concat(b).forEach(function(x){m[x.id]=x});
for(var i in m)o.push(m[i]);
o.sort(function(x,y){return x.created_at<y.created_at?-1:x.created_at>y.created_at?1:0});return o}
function since(r,u){var t=null;r.forEach(function(x){
if(x.sender===u&&!x.read_at&&(t===null||x.created_at<t))t=x.created_at});
if(t===null)t=r[r.length-1].created_at;return new Date(Date.parse(t)-1).toISOString()}
function mark(r,u){if(localStorage.getItem("toole_readconf")==="0")return r;
var t=new Date().toISOString();
r.forEach(function(x){if(x.receiver===u&&!x.read_at)x.read_at=t});return r}
async function load(a,s,q){var k="tmc:"+q.a+":"+q.b,c=rd(k),now=Date.now();
var ok=c&&Array.isArray(c.r)&&c.r.length>0,full=!ok||now-c.t>TTL;
try{
if(full){var rows=await a(s);if(!Array.isArray(rows))return rows;
wr(k,{r:mark(rows.map(cl),q.a),t:now});return rows}
var nw=await a(s+"&created_at=gt."+encodeURIComponent(since(c.r,q.a)));
if(!Array.isArray(nw))return nw;
var all=merge(c.r,nw);wr(k,{r:mark(all.map(cl),q.a),t:c.t});return all
}catch(e){if(ok)return c.r;throw e}}
var P="/rest/v1/messages?id=eq.";
function del(s){try{var id=s.slice(P.length).split("&")[0];
Object.keys(localStorage).forEach(function(k){if(k.indexOf("tmc:")!==0)return;
var c=rd(k);if(!c||!c.r)return;
var n=c.r.filter(function(x){return String(x.id)!==id});
if(n.length!==c.r.length){c.r=n;wr(k,c)}})}catch(e){}}
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
