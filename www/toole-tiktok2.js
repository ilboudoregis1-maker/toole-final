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
if(fresh.length)social(fresh)},400);
}catch(e){}})();
