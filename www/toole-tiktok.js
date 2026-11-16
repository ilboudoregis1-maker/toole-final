/* TÕÕLé : design type TikTok pour la section Vidéos */
(function(){try{
var _f=window.fetch,SB=null,KEY=null;
window.fetch=function(u,o){try{var s=typeof u==="string"?u:(u&&u.url)||"",i=s.indexOf("/rest/v1/");if(i>0&&!KEY){var h=(o&&o.headers)||(u&&u.headers)||{},k=h.apikey||(h.get&&h.get("apikey"));if(k){SB=s.slice(0,i);KEY=k}}}catch(e){}return _f.apply(this,arguments)};
var st=document.createElement("style");st.textContent=`
#tvFeed .tvh{padding:calc(env(safe-area-inset-top,0px) + 10px) 10px 8px;background:linear-gradient(#000a,transparent)}
#tvFeed .tvh button{background:none;border:0}
#tvFeed .tvt{gap:20px}
#tvFeed .tvt button{background:none!important;color:rgba(255,255,255,.62)!important;font-size:16px;font-weight:700;height:36px;padding:0 2px;border-radius:0;position:relative;text-shadow:0 1px 4px #0008}
#tvFeed .tvt button.on{color:#fff!important}
#tvFeed .tvt button.on::after{content:"";position:absolute;left:20%;right:20%;bottom:1px;height:3px;border-radius:2px;background:#fff}
#tvFeed .tvh .tvp{background:linear-gradient(135deg,#00c2e0,#2f6fe0);border-radius:12px;color:#fff}
#tvScr .tvi{background:linear-gradient(160deg,#0b1220,#16213a)}
#tvScr video{object-fit:cover}
#tvScr .tvi.fit video{object-fit:contain}
#tvScr .tvi::after{content:"";position:absolute;left:0;right:0;bottom:0;height:42%;background:linear-gradient(transparent,#000b);pointer-events:none;z-index:1}
#tvScr .tvl{font-size:0;width:38px;height:38px;padding:0;border:3px solid rgba(255,255,255,.22);border-top-color:#fff;border-radius:50%;animation:tkspin .8s linear infinite;z-index:2}
#tvScr .tvl.tkerr{font-size:13px;width:auto;height:auto;border:0;animation:none;padding:0 30px;color:#9ec5ff}
@keyframes tkspin{to{transform:rotate(360deg)}}
#tvScr .tvr{right:6px;gap:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 70px);z-index:2}
#tvScr .tvr button i{font-size:34px}
#tvScr .tvc{left:12px;right:84px;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);z-index:2}
#tvScr .tvn b{font-size:16px}
#tvScr .tvx{max-height:62px;overflow:hidden}
#tvScr .tvx.open{max-height:240px;overflow-y:auto}
.tka{position:relative;width:48px;height:56px}
.tka .tkc{width:48px;height:48px;border-radius:50%;border:2px solid #fff;background:linear-gradient(135deg,#00c2e0,#2f6fe0);display:grid;place-items:center;font-weight:800;font-size:20px;color:#fff;box-sizing:border-box}
.tka .tkpl{position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:22px;height:22px;border-radius:50%;background:#2f6fe0;border:2px solid #fff;box-sizing:border-box;color:#fff;font-size:15px;line-height:17px;text-align:center;font-weight:800;display:none}
.tkb{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.22);z-index:3}
.tkb i{display:block;height:100%;width:0;background:#fff}
.tkh{position:absolute;font-size:90px;pointer-events:none;z-index:4;animation:tkh .85s ease-out forwards}
@keyframes tkh{0%{opacity:0;transform:translate(-50%,-50%) scale(.3)}25%{opacity:1;transform:translate(-50%,-50%) scale(1.15)}100%{opacity:0;transform:translate(-50%,-130%) scale(1)}}
#tkProf{position:absolute;inset:0;z-index:7;background:#0b0f1a;overflow-y:auto;color:#fff;font-family:sans-serif}
#tkProf .tpb{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px;background:#0b0f1a}
#tkProf .tpb button{border:0;background:rgba(255,255,255,.14);color:#fff;width:36px;height:36px;border-radius:50%;font-size:22px}
#tkProf .tpb b{font-size:17px}
#tkProf .tph{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 16px 18px}
#tkProf .tpa{width:92px;height:92px;border-radius:50%;background:linear-gradient(135deg,#00c2e0,#2f6fe0);display:grid;place-items:center;font-size:38px;font-weight:800;border:3px solid #fff}
#tkProf .tpn{font-size:18px;font-weight:800}
#tkProf .tps{display:flex;gap:18px;text-align:center}
#tkProf .tpx b{display:block;font-size:17px}#tkProf .tpx span{font-size:12px;opacity:.7}
#tkProf .tpf{border:0;border-radius:10px;padding:10px 34px;background:#2f6fe0;color:#fff;font-weight:800;font-size:15px}
#tkProf .tpf.on{background:rgba(255,255,255,.16)}
#tkProf .tpg{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border-top:1px solid rgba(255,255,255,.1);padding-top:2px}
#tkProf .tpt{position:relative;aspect-ratio:9/14;border:0;color:#fff;overflow:hidden;padding:0}
#tkProf .tpp{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-size:22px;opacity:.85}
#tkProf .tpc{position:absolute;left:6px;right:6px;top:6px;font-size:11px;text-align:left;line-height:1.25;max-height:42px;overflow:hidden;text-shadow:0 1px 3px #0009}
#tkProf .tpl{position:absolute;left:6px;bottom:6px;font-size:12px;font-weight:700;text-shadow:0 1px 3px #000}
#tkProf .tpe{grid-column:1/-1;text-align:center;padding:40px 20px;color:#9ec5ff}
#tkVw{position:absolute;inset:0;z-index:8;background:#000}
#tkVw video{width:100%;height:100%;object-fit:contain;background:#000}
#tkVw .tkvx{position:absolute;top:calc(env(safe-area-inset-top,0px) + 10px);left:10px;border:0;background:rgba(255,255,255,.18);color:#fff;width:38px;height:38px;border-radius:50%;font-size:20px;z-index:2}
#tkVw .tkvc{position:absolute;left:14px;right:14px;bottom:calc(env(safe-area-inset-bottom,0px) + 22px);color:#fff;font-size:14px;line-height:1.4;text-shadow:0 1px 6px #000}
#tkVw .tkl{position:absolute;left:50%;top:50%;margin:-19px 0 0 -19px;width:38px;height:38px;border:3px solid rgba(255,255,255,.22);border-top-color:#fff;border-radius:50%;animation:tkspin .8s linear infinite}
`;document.head.appendChild(st);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function arr(r){return Array.isArray(r)?r:[]}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function me(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function fmt(n){return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"k":""+n}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100090;padding:12px;border-radius:14px;background:#0f172a;color:#fff;text-align:center;font-size:14px";document.body.appendChild(d);setTimeout(function(){d.remove()},2200)}
function tk(p,o){o=o||{};if(!SB)return Promise.resolve(null);var s=sess();o.headers=Object.assign({apikey:KEY,Authorization:"Bearer "+((s&&s.access_token)||KEY),"Content-Type":"application/json"},o.headers||{});return _f(SB+"/rest/v1/"+p,o).then(function(r){return r.text()}).then(function(t){try{return JSON.parse(t)}catch(e){return null}}).catch(function(){return null})}
function viewer(v){var feed=document.getElementById("tvFeed");if(!feed)return;var old=document.getElementById("tkVw");if(old)old.remove();
var ov=E("div");ov.id="tkVw";var vd=E("video"),sp=E("div","tkl"),x=E("button","tkvx","✕"),c=E("div","tkvc",v.caption||"");
vd.setAttribute("playsinline","");vd.loop=true;vd.autoplay=true;vd.preload="auto";
var tried=0;vd.onerror=function(){if(tried++)return;vd.src="https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+v.path};
vd.onloadeddata=function(){sp.remove();var p=vd.play();if(p&&p.catch)p.catch(function(){vd.muted=true;vd.play().catch(function(){})})};
var url=null;try{url=window.tgUrl(v.path,"video")}catch(e){}
if(url)vd.src=url;else vd.onerror();
x.onclick=function(e){e.stopPropagation();vd.pause();vd.removeAttribute("src");vd.load();ov.remove()};
ov.onclick=function(){if(vd.paused)vd.play().catch(function(){});else vd.pause()};
ov.appendChild(vd);ov.appendChild(sp);ov.appendChild(c);ov.appendChild(x);feed.appendChild(ov)}
function profile(id){var feed=document.getElementById("tvFeed");if(!feed||!id)return;var old=document.getElementById("tkProf");if(old)old.remove();
var m=me(),ov=E("div");ov.id="tkProf";
var top=E("div","tpb"),bk=E("button","","‹"),tt=E("b","","Profil");bk.onclick=function(){ov.remove()};top.appendChild(bk);top.appendChild(tt);
var hd=E("div","tph"),av=E("div","tpa","·"),nm=E("div","tpn","…"),sts=E("div","tps"),fb=E("button","tpf");
hd.appendChild(av);hd.appendChild(nm);hd.appendChild(sts);if(id!==m)hd.appendChild(fb);
var gr=E("div","tpg");gr.appendChild(E("div","tpe","Chargement…"));
ov.appendChild(top);ov.appendChild(hd);ov.appendChild(gr);feed.appendChild(ov);
Promise.all([tk("profiles?select=id,pseudo&id=eq."+id),tk("videos?select=id,caption,path,created_at&author=eq."+id+"&order=created_at.desc&limit=60"),tk("follows?select=follower&followed=eq."+id),tk("follows?select=followed&follower=eq."+id)]).then(function(b){
var pr=arr(b[0])[0],vs=arr(b[1]),fo=arr(b[2]),fg=arr(b[3]);
var name=(pr&&pr.pseudo)||"Utilisateur";nm.textContent="@"+name;tt.textContent=name;av.textContent=name.charAt(0).toUpperCase();
var isF=fo.some(function(x){return x.follower===m}),nf=fo.length,tl=0,LK={};
function stats(){sts.innerHTML="";[[nf,"Abonnés"],[fg.length,"Abonnements"],[tl,"J'aime"],[vs.length,"Vidéos"]].forEach(function(a){var d=E("div","tpx");d.appendChild(E("b","",fmt(a[0])));d.appendChild(E("span","",a[1]));sts.appendChild(d)})}
function fbu(){fb.textContent=isF?"Abonné ✓":"+ S'abonner";fb.className="tpf"+(isF?" on":"")}
fb.onclick=function(){if(!m)return toast("Connecte-toi");if(isF){isF=false;nf=Math.max(0,nf-1);tk("follows?follower=eq."+m+"&followed=eq."+id,{method:"DELETE"})}else{isF=true;nf++;tk("follows",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({follower:m,followed:id})})}fbu();stats()};
stats();fbu();gr.innerHTML="";
if(!vs.length){gr.appendChild(E("div","tpe","Aucune vidéo publiée."));return}
vs.forEach(function(v){var t=E("button","tpt"),h=0,s=String(v.id);for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;
t.style.background="linear-gradient(160deg,hsl("+h+",70%,38%),hsl("+((h+50)%360)+",70%,22%))";
t.appendChild(E("span","tpp","▶"));t.appendChild(E("span","tpc",(v.caption||"").slice(0,40)));var lc=E("span","tpl","♥ 0");t.appendChild(lc);LK[v.id]=lc;
t.onclick=function(){viewer(v)};gr.appendChild(t)});
var ids=vs.map(function(v){return v.id}),cnt={};
tk("video_likes?select=video_id&video_id=in.("+ids.join(",")+")").then(function(r){arr(r).forEach(function(x){cnt[x.video_id]=(cnt[x.video_id]||0)+1;tl++});Object.keys(LK).forEach(function(k){LK[k].textContent="♥ "+fmt(cnt[k]||0)});stats()})})}
function enh(it){it.__tk=1;var v=it.querySelector("video"),rail=it.querySelector(".tvr"),c=it.querySelector(".tvc");if(!v||!rail||!c)return;
var aid=(it.__p||"").split("/")[0],nb=c.querySelector(".tvn b"),name=nb?nb.textContent.replace("@",""):"?";
var av=E("div","tka"),ci=E("div","tkc",name.charAt(0).toUpperCase()),pl=E("div","tkpl","+");av.appendChild(ci);av.appendChild(pl);
ci.onclick=function(e){e.stopPropagation();profile(aid)};
pl.onclick=function(e){e.stopPropagation();var fb=c.querySelector(".tvf");if(fb)fb.click()};
rail.insertBefore(av,rail.firstChild);it.__pl=pl;
if(nb){nb.style.cursor="pointer";nb.onclick=function(e){e.stopPropagation();profile(aid)}}
var sh=E("button");sh.innerHTML="<i>↗</i><span>Partager</span>";
sh.onclick=function(e){e.stopPropagation();var t=((c.querySelector(".tvx")||{}).textContent||"")+" — vidéo sur TÕÕLé";if(navigator.share)navigator.share({text:t}).catch(function(){});else{try{navigator.clipboard.writeText(t);toast("Texte copié")}catch(x){toast("Partage indisponible")}}};
rail.appendChild(sh);
var x=c.querySelector(".tvx");if(x)x.onclick=function(e){e.stopPropagation();x.classList.toggle("open")};
var pb=E("div","tkb"),bi=E("i");pb.appendChild(bi);it.appendChild(pb);
v.addEventListener("timeupdate",function(){bi.style.width=(v.currentTime/(v.duration||1)*100)+"%"});
v.addEventListener("loadedmetadata",function(){it.classList.toggle("fit",v.videoWidth>v.videoHeight*1.15)});
var lt=0;it.addEventListener("click",function(e){var t=Date.now();if(t-lt<320){var r=it.getBoundingClientRect(),h=E("div","tkh","❤️");h.style.left=(e.clientX-r.left)+"px";h.style.top=(e.clientY-r.top)+"px";it.appendChild(h);setTimeout(function(){h.remove()},900);lt=0}else lt=t})}
setInterval(function(){var sc=document.getElementById("tvScr");if(!sc)return;sc.querySelectorAll(".tvi").forEach(function(it){if(!it.__tk)enh(it);var l=it.querySelector(".tvl");if(l)l.classList.toggle("tkerr",/^Vid\u00e9o indisponible/.test(l.textContent));if(it.__pl){var fb=it.querySelector(".tvf");it.__pl.style.display=(fb&&!/\bon\b/.test(fb.className))?"block":"none"}})},400);
}catch(e){}})();
