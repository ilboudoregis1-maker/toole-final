/* TÕÕLé SW : lecture hors ligne et connexion faible */
var V='v1',AP='toole-api-'+V,IM='toole-img-'+V,SB='jbjeqxubpqqypysfsubd.supabase.co',NET=3500;
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n.indexOf('toole-')===0&&n!==AP&&n!==IM}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
async function trim(c,n){var k=await c.keys();while(k.length>n)await c.delete(k.shift())}
async function netFirst(e,r){var c=await caches.open(AP),m=await c.match(r,{ignoreVary:true});
 var p=fetch(r.clone()).then(function(x){if(x.ok){c.put(r,x.clone()).then(function(){return trim(c,250)}).catch(function(){})}return x});
 if(!m)return p;e.waitUntil(p.catch(function(){}));
 var q=p.then(function(x){return x.ok?x:m},function(){return m});
 return Promise.race([q,new Promise(function(ok){setTimeout(function(){ok(m)},NET)})])}
async function cacheFirst(r){var c=await caches.open(IM),m=await c.match(r,{ignoreVary:true});if(m)return m;
 var x;try{x=r.url.indexOf(SB)>-1?await fetch(r.clone()):await fetch(r.url,{mode:'cors',credentials:'omit'})}catch(e){x=await fetch(r.clone())}
 if(x.ok){c.put(r,x.clone()).then(function(){return trim(c,400)}).catch(function(){})}return x}
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||r.headers.has('range'))return;var u=new URL(r.url);
 if(u.hostname===SB){var p=u.pathname;
  if(p.indexOf('/rest/v1/')===0&&u.search.indexOf('created_at=gt.')<0)e.respondWith(netFirst(e,r));
  else if(p.indexOf('/storage/v1/object/')===0)e.respondWith(cacheFirst(r))}
 else if(u.hostname==='res.cloudinary.com'&&u.pathname.indexOf('/image/upload/')>-1)e.respondWith(cacheFirst(r))});
