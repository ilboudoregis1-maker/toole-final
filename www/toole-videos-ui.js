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
vd.setAttribute("playsinline","");vd.poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";vd.loop=true;vd.autoplay=true;vd.preload="auto";
var tried=0;vd.onerror=function(){if(tried++)return;var u1=null;try{u1=window.tgUrl(v.path,"video")}catch(e){}(u1?fetch(u1).then(function(r){if(!r.ok)throw 0;return r.blob()}):Promise.reject(0)).then(function(b){vd.src=window.URL.createObjectURL(new Blob([b],{type:/webm$/.test(v.path)?"video/webm":"video/mp4"}))}).catch(function(){vd.src="https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+v.path})};
vd.onloadeddata=function(){sp.remove();var p=vd.play();if(p&&p.catch)p.catch(function(){vd.muted=true;vd.play().catch(function(){})})};
var url=null;try{url=window.tgUrl(v.path,"video")}catch(e){}
if(url)vd.src=url;else vd.onerror();setTimeout(function(){if(vd.readyState<2&&ov.parentNode)vd.onerror()},8000);
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
(function(){var tv=E("video","tpv");tv.muted=true;tv.preload="metadata";tv.setAttribute("playsinline","");tv.poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";try{var u0=window.tgUrl(v.path,"video");tv.src=u0+(String(u0).indexOf("#")<0?"#t=0.3":"")}catch(e){}tv.onloadedmetadata=function(){tv.classList.add("ok");var d=Math.round(tv.duration||0);if(d)t.appendChild(E("span","tpd",Math.floor(d/60)+":"+("0"+d%60).slice(-2)))};t.appendChild(tv)})();t.appendChild(E("span","tpp","▶"));t.appendChild(E("span","tpc",(v.caption||"").slice(0,40)));var lc=E("span","tpl","♥ 0");t.appendChild(lc);LK[v.id]=lc;
t.onclick=function(){viewer(v)};gr.appendChild(t)});
var ids=vs.map(function(v){return v.id}),cnt={};
tk("video_likes?select=video_id&video_id=in.("+ids.join(",")+")").then(function(r){arr(r).forEach(function(x){cnt[x.video_id]=(cnt[x.video_id]||0)+1;tl++});Object.keys(LK).forEach(function(k){LK[k].textContent="♥ "+fmt(cnt[k]||0)});stats()})})}
function enh(it){it.__tk=1;var v=it.querySelector("video"),rail=it.querySelector(".tvr"),c=it.querySelector(".tvc");if(!v||!rail||!c)return;
var aid=(it.__p||"").split("/")[0],nb=c.querySelector(".tvn b"),name=nb?nb.textContent.replace("@",""):"?";
var OFFN=function(){return /^t[õo][õo]l[ée]$/i.test(String(name).trim())||/Officiel/.test(it.textContent||"")};
var av=E("div","tka"),ci=E("div","tkc",name.charAt(0).toUpperCase()),pl=E("div","tkpl","+");av.appendChild(ci);av.appendChild(pl);
ci.onclick=function(e){e.stopPropagation();if(OFFN())return;profile(aid)};
pl.onclick=function(e){e.stopPropagation();if(OFFN())return;var fb=c.querySelector(".tvf");if(fb)fb.click()};
rail.insertBefore(av,rail.firstChild);it.__pl=pl;
if(nb){nb.style.cursor="pointer";nb.onclick=function(e){e.stopPropagation();if(OFFN())return;profile(aid)}}
var sh=E("button");sh.innerHTML="<i>↗</i><span>Partager</span>";
sh.onclick=function(e){e.stopPropagation();var t=((c.querySelector(".tvx")||{}).textContent||"")+" — vidéo sur TÕÕLé";if(navigator.share)navigator.share({text:t}).catch(function(){});else{try{navigator.clipboard.writeText(t);toast("Texte copié")}catch(x){toast("Partage indisponible")}}};
rail.appendChild(sh);
var x=c.querySelector(".tvx");if(x)x.onclick=function(e){e.stopPropagation();x.classList.toggle("open")};
var pb=E("div","tkb"),bi=E("i");pb.appendChild(bi);it.appendChild(pb);
v.addEventListener("timeupdate",function(){bi.style.width=(v.currentTime/(v.duration||1)*100)+"%"});
v.addEventListener("loadedmetadata",function(){it.classList.toggle("fit",v.videoWidth>v.videoHeight*1.15)});
var lt=0;it.addEventListener("click",function(e){var t=Date.now();if(t-lt<320){var r=it.getBoundingClientRect(),h=E("div","tkh","❤️");h.style.left=(e.clientX-r.left)+"px";h.style.top=(e.clientY-r.top)+"px";it.appendChild(h);setTimeout(function(){h.remove()},900);lt=0}else lt=t})}
setInterval(function(){var sc=document.getElementById("tvScr");if(!sc)return;sc.querySelectorAll(".tvi").forEach(function(it){if(!it.__tk)enh(it);var l=it.querySelector(".tvl");if(l)l.classList.toggle("tkerr",/^Vid\u00e9o indisponible/.test(l.textContent));if(it.__pl){var fb=it.querySelector(".tvf");it.__pl.style.display=(fb&&!/\bon\b/.test(fb.className))?"block":"none"}})},1200);
}catch(e){}})();
/* TÕÕLé : Vidéos high-tech (icônes SVG, abonnés, amis qui ont aimé) */
(function(){try{
function U(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'}
var X="xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'";
var S={
heart:"<svg "+X+" fill='white'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
heartOn:"<svg "+X+" fill='%23ff3b5c'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
chat:"<svg "+X+" fill='white'><path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z'/></svg>",
share:"<svg "+X+" fill='white'><path d='M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z'/></svg>",
trash:"<svg "+X+" fill='white'><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'/></svg>"
};
var IC={
back:"<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='M15 5l-7 7 7 7'/></svg>",
plus:"<svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor' stroke-width='2.6' stroke-linecap='round'><path d='M12 5v14M5 12h14'/></svg>",
close:"<svg viewBox='0 0 24 24' width='20' height='20' fill='none' stroke='currentColor' stroke-width='2.4' stroke-linecap='round'><path d='M6 6l12 12M18 6L6 18'/></svg>",
users:"<svg viewBox='0 0 24 24' width='12' height='12' fill='currentColor'><path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'/></svg>",
heart:"<svg viewBox='0 0 24 24' width='13' height='13' fill='%23ff3b5c'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>"
};
IC.heart=IC.heart.replace("%23","#");
var st=document.createElement("style");st.textContent=`
#tvFeed .tvh .sq{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.1)!important;border:1px solid rgba(255,255,255,.16)!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:grid;place-items:center;color:#fff}
#tvFeed .tvh .tvp{background:linear-gradient(135deg,#00e5ff,#2f6fe0)!important;border:0!important;box-shadow:0 0 16px rgba(0,229,255,.55)}
#tvFeed .tvt{background:rgba(255,255,255,.08);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:3px;gap:2px;flex:none}
#tvFeed .tvt button{font-size:13px!important;height:34px!important;padding:0 12px!important;border-radius:18px!important;transition:all .2s}
#tvFeed .tvt button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;box-shadow:0 0 14px rgba(0,194,224,.55)}
#tvFeed .tvt button.on::after{display:none}
#tvFeed .tvh{justify-content:space-between}
#tvScr .tvr button{width:56px;gap:5px;font-size:12px;font-weight:700}
#tvScr .tvr button i{font-size:0!important;width:50px;height:50px;border-radius:50%;background-color:rgba(255,255,255,.12);background-repeat:no-repeat;background-position:center;background-size:54%;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.2);box-shadow:0 4px 18px rgba(0,0,0,.4),inset 0 0 12px rgba(0,229,255,.1);filter:none;transition:all .15s}
#tvScr .tvr button:active i{transform:scale(.9)}
#tvScr .tk-lk i{background-image:${U(S.heart)}}
#tvScr .tk-lk.liked i{background-image:${U(S.heartOn)};background-color:rgba(255,59,92,.2);border-color:rgba(255,59,92,.65);box-shadow:0 0 20px rgba(255,59,92,.6)}
#tvScr .tk-cm i{background-image:${U(S.chat)}}
#tvScr .tk-sh i{background-image:${U(S.share)}}
#tvScr .tk-dl i{background-image:${U(S.trash)}}
#tvScr .tvc{left:10px;right:80px;padding:12px 14px;border-radius:18px;background:linear-gradient(135deg,rgba(10,20,40,.6),rgba(10,20,40,.28));backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.13);box-shadow:0 6px 24px rgba(0,0,0,.35)}
#tvScr .tvn b{background:linear-gradient(90deg,#fff,#8be9ff);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}
#tvScr .tvfc{display:none}
#tvScr .tvf{border:1px solid rgba(0,229,255,.6);color:#9ff3ff;background:rgba(0,229,255,.1);border-radius:12px;padding:3px 10px}
#tvScr .tvf.on{background:rgba(255,255,255,.14);border-color:transparent;color:#fff}
.tkchip{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700;padding:3px 8px;border-radius:10px;background:rgba(0,229,255,.14);border:1px solid rgba(0,229,255,.35);color:#9ff3ff}
.tkfl{display:none;align-items:center;gap:8px;margin:6px 0 4px;font-size:12px;color:#d6e4ff}
.tkst{display:flex}
.tkst span{width:20px;height:20px;border-radius:50%;margin-left:-6px;border:2px solid #0b1220;background:linear-gradient(135deg,#00c2e0,#2f6fe0);display:grid;place-items:center;font-size:10px;font-weight:800;color:#fff;box-sizing:border-box}
.tkst span:first-child{margin-left:0}
.tkb{height:3px}.tkb i{background:linear-gradient(90deg,#00e5ff,#2f6fe0);box-shadow:0 0 8px rgba(0,229,255,.8)}
#tkProf .tpb button,#tkVw .tkvx{display:grid;place-items:center}
`;document.head.appendChild(st);
var FR=null,NM={},FCNT={};
function arr(r){return Array.isArray(r)?r:[]}
function sess(){try{return JSON.parse(localStorage.getItem("toole_session"))}catch(e){return null}}
function me(){var s=sess();if(!s)return null;if(s.user&&s.user.id)return s.user.id;try{return JSON.parse(atob(s.access_token.split(".")[1])).sub}catch(e){return null}}
function fmt(n){return n>=1e6?(n/1e6).toFixed(1)+" M":n>=1e3?(n/1e3).toFixed(1)+" k":""+n}
var _f=window.fetch,SB=null,KEY=null;
function sniff(){try{var s=JSON.stringify(Object.keys(window))}catch(e){}}
window.fetch=function(u,o){try{var s=typeof u==="string"?u:(u&&u.url)||"",i=s.indexOf("/rest/v1/");if(i>0&&!KEY){var h=(o&&o.headers)||(u&&u.headers)||{},k=h.apikey||(h.get&&h.get("apikey"));if(k){SB=s.slice(0,i);KEY=k}}}catch(e){}return _f.apply(this,arguments)};
function tk(p,o){o=o||{};if(!SB)return Promise.resolve(null);var s=sess();o.headers=Object.assign({apikey:KEY,Authorization:"Bearer "+((s&&s.access_token)||KEY),"Content-Type":"application/json"},o.headers||{});return _f(SB+"/rest/v1/"+p,o).then(function(r){return r.text()}).then(function(t){try{return JSON.parse(t)}catch(e){return null}}).catch(function(){return null})}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function uniq(v,k,a){return v&&a.indexOf(v)===k}
function friends(){var m=me();if(!m)return Promise.resolve({});if(FR)return Promise.resolve(FR);return tk("follows?select=followed&follower=eq."+m).then(function(r){FR={};arr(r).forEach(function(x){FR[x.followed]=1});return FR})}
function pseudos(ids){var need=ids.filter(uniq).filter(function(i){return !NM[i]});if(!need.length)return Promise.resolve();return tk("profiles?select=id,pseudo&id=in.("+need.join(",")+")").then(function(r){arr(r).forEach(function(p){NM[p.id]=p.pseudo})})}
function auth(it){return (it.__p||"").split("/")[0]}
function paintAuthor(a){document.querySelectorAll("#tvScr .tvi").forEach(function(it){if(auth(it)===a&&it.__fc){var n=FCNT[a]||0;it.__fc.textContent=fmt(n)+" abonné"+(n>1?"s":"")}})}
function setup(it){it.__tk2=1;
it.querySelectorAll(".tvr button").forEach(function(b){var i=b.querySelector("i");if(!i)return;var t=i.textContent;if(/❤|🤍/.test(t))b.classList.add("tk-lk");else if(/💬/.test(t))b.classList.add("tk-cm");else if(/🗑/.test(t))b.classList.add("tk-dl");else if(/↗/.test(t))b.classList.add("tk-sh")});
var n=it.querySelector(".tvn");if(n){var ch=E("span","tkchip"),em=E("em","","…");em.style.fontStyle="normal";ch.innerHTML=IC.users;ch.appendChild(em);n.appendChild(ch);it.__fc=em}
var c=it.querySelector(".tvc"),x=it.querySelector(".tvx");if(c){var fl=E("div","tkfl");c.insertBefore(fl,x||null);it.__fl=fl}}
function state(it){var lk=it.querySelector(".tk-lk");if(lk){var i=lk.querySelector("i");lk.classList.toggle("liked",!!i&&/❤/.test(i.textContent))}
var fb=it.querySelector(".tvf");if(fb){var on=/\bon\b/.test(fb.className);if(it.__fon==null)it.__fon=on;else if(it.__fon!==on){it.__fon=on;var a=auth(it);FCNT[a]=Math.max(0,(FCNT[a]||0)+(on?1:-1));paintAuthor(a)}}}
function social(its){var paths=its.map(function(it){return it.__p}).filter(Boolean),as=paths.map(function(p){return p.split("/")[0]}).filter(uniq);if(!paths.length)return;
Promise.all([friends(),tk("videos?select=id,path&path=in.("+paths.map(function(p){return '"'+encodeURIComponent(p)+'"'}).join(",")+")"),tk("follows?select=followed&followed=in.("+as.join(",")+")")]).then(function(b){
var F=b[0],vids=arr(b[1]),pid={};vids.forEach(function(v){pid[v.path]=v.id});
as.forEach(function(a){FCNT[a]=0});arr(b[2]).forEach(function(x){FCNT[x.followed]=(FCNT[x.followed]||0)+1});
as.forEach(paintAuthor);
var ids=vids.map(function(v){return v.id});if(!ids.length)return;
tk("video_likes?select=video_id,user_id&video_id=in.("+ids.join(",")+")").then(function(r){var by={},all=[],m=me();
arr(r).forEach(function(x){if(F[x.user_id]&&x.user_id!==m){(by[x.video_id]=by[x.video_id]||[]).push(x.user_id);all.push(x.user_id)}});
pseudos(all).then(function(){its.forEach(function(it){var l=by[pid[it.__p]]||[];if(!l.length||!it.__fl)return;
var nm=l.slice(0,2).map(function(u){return NM[u]||"un ami"}),rest=l.length-nm.length;
var txt="Aimé par "+(rest>0?nm.join(", ")+" et "+rest+" autre"+(rest>1?"s":""):nm.join(" et "));
var stk=E("div","tkst");l.slice(0,3).forEach(function(u){stk.appendChild(E("span","",(NM[u]||"?").charAt(0).toUpperCase()))});
var ic=E("span");ic.innerHTML=IC.heart;ic.style.display="inline-flex";
it.__fl.innerHTML="";it.__fl.appendChild(stk);it.__fl.appendChild(ic);it.__fl.appendChild(E("span","",txt));it.__fl.style.display="flex"})})})})}
setInterval(function(){var feed=document.getElementById("tvFeed");if(!feed)return;
var hb=feed.querySelector(".tvh .sq:not(.tvp)");if(hb&&!hb.__ic){hb.__ic=1;hb.innerHTML=IC.back}
var pb=feed.querySelector(".tvh .tvp");if(pb&&!pb.__ic){pb.__ic=1;pb.innerHTML=IC.plus}
var pbk=feed.querySelector("#tkProf .tpb button");if(pbk&&!pbk.__ic){pbk.__ic=1;pbk.innerHTML=IC.back}
var vx=feed.querySelector("#tkVw .tkvx");if(vx&&!vx.__ic){vx.__ic=1;vx.innerHTML=IC.close}
var fresh=[];feed.querySelectorAll("#tvScr .tvi").forEach(function(it){if(!it.__tk2){if(!it.__p||!it.querySelector(".tvr"))return;setup(it);fresh.push(it)}state(it)});
if(fresh.length)social(fresh)},1200);
}catch(e){}})();
/* TÕÕLé : fil Vidéos, style reference (icones nues, texte simple, disque musique) */
(function(){try{
var st=document.createElement("style");st.textContent=`
#tvFeed .tvh .sq{background:none!important;border:0!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
#tvFeed .tvt{background:none!important;border:0!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;padding:0!important;gap:2px!important;flex:1;justify-content:center}
#tvFeed .tvt button{background:none!important;box-shadow:none!important;color:#fff!important;font-size:15px!important;font-weight:700!important;padding:0 10px!important;height:36px!important;border-radius:20px!important;text-shadow:0 1px 5px #0009;position:relative}
#tvFeed .tvt button.on{background:#2f6fe0!important;box-shadow:0 2px 12px rgba(47,111,224,.6)!important}
#tvFeed .tvt button.on::after{display:block!important;content:"";position:absolute;left:30%;right:30%;bottom:-3px;height:3px;border-radius:2px;background:#fff}
#tvScr .tvr{gap:14px!important}
#tvScr .tvr button{font-size:14px!important;font-weight:800!important;gap:2px!important;width:60px!important}
#tvScr .tvr button i{background-color:transparent!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;width:46px!important;height:46px!important;background-size:100%!important;filter:drop-shadow(0 2px 6px rgba(0,0,0,.55))!important}
#tvScr .tvr button span{font-size:14px;font-weight:700;text-shadow:0 1px 5px #000}
#tvScr .tk-lk.liked i{filter:drop-shadow(0 0 10px rgba(255,59,92,.75))!important}
.tka .tkc{width:52px!important;height:52px!important;border:2px solid #fff!important}
.tka .tkpl{background:#ff2d55!important;width:24px!important;height:24px!important;line-height:19px!important;font-size:17px!important}
#tvScr .tvc{background:none!important;border:0!important;box-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;padding:0!important;left:14px!important;right:86px!important}
#tvScr .tvn b{background:none!important;-webkit-text-fill-color:#fff!important;color:#fff!important;font-size:19px!important;text-shadow:0 1px 6px #000}
#tvScr .tvx{font-size:16px;font-weight:600;line-height:1.35;max-height:88px;text-shadow:0 1px 6px #000}
.tkms{display:flex;align-items:center;gap:8px;margin-top:8px;font-size:15px;font-weight:600;text-shadow:0 1px 6px #000}
.tkdisc{width:48px;height:48px;border-radius:50%;margin-top:4px;background:radial-gradient(circle,#2f6fe0 0 22%,#111 23% 100%);border:2px solid transparent;background-clip:padding-box;box-shadow:0 0 0 2px #ff9f0a,0 0 0 4px #00e5ff;animation:tkspin 6s linear infinite;display:grid;place-items:center}
.tkdisc svg{width:16px;height:16px}
`;document.head.appendChild(st);
var NOTE="<svg viewBox='0 0 24 24' width='18' height='18' fill='white'><path d='M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z'/></svg>";
function K(n){return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?(n/1e3).toFixed(1)+"K":""+n}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function setup(it){it.__tk3=1;var c=it.querySelector(".tvc"),rail=it.querySelector(".tvr"),nb=c&&c.querySelector(".tvn b");if(!c||!rail)return;
var name=nb?nb.textContent.replace("@",""):"TÕÕLé";
var ms=E("div","tkms");ms.innerHTML=NOTE;ms.appendChild(E("span","","Son original - "+name));c.appendChild(ms);
var d=E("div","tkdisc");d.innerHTML=NOTE;rail.appendChild(d)}
setInterval(function(){var sc=document.getElementById("tvScr");if(!sc)return;
sc.querySelectorAll(".tvi").forEach(function(it){if(!it.__tk3&&it.querySelector(".tk-lk,.tka,.tvr button"))setup(it);
it.querySelectorAll(".tk-lk span,.tk-cm span").forEach(function(s){var t=s.textContent;if(/^\d+$/.test(t)&&+t>=1000)s.textContent=K(+t)})})},1500);
}catch(e){}})();
/* TÕÕLé : mise en page finale du fil Vidéos (prioritaire) */
(function(){try{
var st=document.createElement("style");st.textContent=`
#tvFeed .tvh{display:flex!important;align-items:center!important;gap:8px!important;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 8px!important}
#tvFeed .tvh .sq{flex:none!important;width:40px!important;height:40px!important;padding:0!important;background:rgba(0,0,0,.28)!important;border:0!important;border-radius:50%!important;box-shadow:none!important;display:grid!important;place-items:center!important}
#tvFeed .tvh .tvp{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important}
#tvFeed .tvt{flex:1!important;min-width:0!important;display:flex!important;justify-content:center!important;gap:2px!important;margin:0!important;padding:0!important;background:none!important;border:0!important}
#tvFeed .tvt button{flex:none!important;font-size:14px!important;padding:0 10px!important;height:34px!important;white-space:nowrap!important;background:none!important;box-shadow:none!important}
#tvFeed .tvt button.on{background:#2f6fe0!important;box-shadow:0 2px 10px rgba(47,111,224,.55)!important}
#tvFeed #tvScr .tvr{right:8px!important;width:64px!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:12px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 28px)!important}
#tvFeed #tvScr .tvr>*{width:64px!important;flex:none!important;margin:0!important;padding:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;gap:2px!important;text-align:center!important}
#tvFeed #tvScr .tvr .tka{order:0;height:62px!important}
#tvFeed #tvScr .tvr .tk-lk{order:1}
#tvFeed #tvScr .tvr .tk-cm{order:2}
#tvFeed #tvScr .tvr .tk-sh{order:3}
#tvFeed #tvScr .tvr .tk-dl{order:4}
#tvFeed #tvScr .tvr .tkdisc{order:5;width:46px!important;height:46px!important;margin-top:6px!important}
#tvFeed #tvScr .tvr button i{width:44px!important;height:44px!important;background-size:30px 30px!important;background-position:center!important;background-repeat:no-repeat!important;display:block!important;margin:0!important}
#tvFeed #tvScr .tvr .tk-lk i{background-size:34px 34px!important}
#tvFeed #tvScr .tvr button span{display:block!important;width:100%!important;text-align:center!important;font-size:13px!important;line-height:1.1!important;white-space:nowrap!important;min-height:14px}
#tvFeed #tvScr .tvr .tk-sh span,#tvFeed #tvScr .tvr .tk-dl span{display:none!important}
#tvFeed #tvScr .tvc{left:14px!important;right:84px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 26px)!important}
#tvFeed #tvScr .tvn{margin-bottom:4px!important}
#tvFeed #tvScr .tvn b{font-size:18px!important}
#tvFeed #tvScr .tvx{font-size:15px!important}
#tvFeed .tkms{font-size:13px!important;white-space:nowrap!important;overflow:hidden!important;max-width:100%!important}
#tvFeed .tkms span{min-width:0;overflow:hidden;text-overflow:ellipsis}
`;document.head.appendChild(st);
}catch(e){}})();
/* TÕÕLé : correctifs finaux du fil Vidéos (entete, telechargement) */
(function(){try{
function U(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'}
var DL="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z'/></svg>";
var st=document.createElement("style");st.textContent=`
#tvFeed .tvt{justify-content:flex-start!important;overflow-x:auto!important;scrollbar-width:none!important;gap:0!important}
#tvFeed .tvt::-webkit-scrollbar{display:none}
#tvFeed .tvt button{font-size:13px!important;padding:0 8px!important}
#tvFeed #tvScr .tvr .tk-dw{order:3}
#tvFeed #tvScr .tvr .tk-dw i{background-image:${U(DL)}!important}
#tvFeed #tvScr .tvr .tk-dw span{display:none!important}
`;document.head.appendChild(st);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var d=E("div","",m);d.style.cssText="position:fixed;left:16px;right:16px;bottom:90px;z-index:100090;padding:12px;border-radius:14px;background:#0f172a;color:#fff;text-align:center;font-size:14px";document.body.appendChild(d);setTimeout(function(){d.remove()},2600)}
function blobOf(path){var u=null;try{u=window.tgUrl(path,"video")}catch(e){}
var a=u?fetch(u).then(function(r){if(!r.ok)throw 0;return r.blob()}):Promise.reject(0);
return a.catch(function(){return fetch("https://res.cloudinary.com/mydh3xtz/video/upload/toole/"+path).then(function(r){if(!r.ok)throw 0;return r.blob()})})}
function b64(bl){return new Promise(function(res,rej){var r=new FileReader();r.onload=function(){res(String(r.result).split(",")[1])};r.onerror=rej;r.readAsDataURL(bl)})}
function dl(it){var path=it.__p;if(!path)return;var name="TOOLE_"+Date.now()+(/webm$/.test(path)?".webm":".mp4");toast("Téléchargement…");
blobOf(path).then(function(bl){
var N=window.TooleNative,S=window.TooleSaver,P=window.Capacitor&&window.Capacitor.Plugins;
if(S&&S.saveBase64)return b64(bl).then(function(d){S.saveBase64(d,name,bl.type||"video/mp4");toast("Vidéo enregistrée dans Téléchargements")});
if(N&&N.saveVideoBase64)return b64(bl).then(function(d){N.saveVideoBase64(d,name);toast("Vidéo enregistrée dans Téléchargements")});
if(P&&P.Filesystem)return b64(bl).then(function(d){return P.Filesystem.writeFile({path:"Download/"+name,data:d,directory:"EXTERNAL_STORAGE",recursive:true})}).then(function(){toast("Vidéo enregistrée dans Téléchargements")});
var a=document.createElement("a");a.href=window.URL.createObjectURL(bl);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},1000);toast("Téléchargement lancé : vérifie ton dossier Téléchargements")
}).catch(function(){toast("Téléchargement impossible pour cette vidéo")})}
setInterval(function(){var sc=document.getElementById("tvScr");if(!sc)return;
sc.querySelectorAll(".tvi").forEach(function(it){it.querySelectorAll(".tvr button").forEach(function(b){var i=b.querySelector("i");if(!i)return;if(/↗/.test(i.textContent)&&!b.__dw){b.__dw=1;b.classList.remove("tk-sh");b.classList.add("tk-dw");b.onclick=function(e){e.stopPropagation();dl(it)}}})})},1200);
}catch(e){}})();
