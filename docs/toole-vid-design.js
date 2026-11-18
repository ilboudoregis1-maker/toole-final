/* TÕÕLé : design du fil Vidéos */
(function(){"use strict";if(window.__tvd)return;window.__tvd=1;
var VER=["TÕÕLé_Officiel","CNS.corp","Canisius Régis"];
var s=document.createElement("style");s.textContent=
"#tvFeed .tvh{flex-wrap:wrap!important;row-gap:8px!important;padding-bottom:10px!important}"
+"#tvFeed .tvh .sq:not(.tvp){order:1!important}"
+"#tvFeed .tv3l{order:2;flex:1;display:flex;align-items:center;gap:8px;color:#fff}"
+"#tvFeed .tv3l b{font-size:24px;font-weight:800;letter-spacing:-.5px}"
+"#tvFeed .tvh .tvt{order:4!important;flex:1 1 100%!important;display:flex!important;gap:8px!important}"
+"#tvFeed .tvh .tvt button{flex:1!important;height:38px!important;border-radius:19px!important;background:rgba(255,255,255,.14)!important;color:#fff!important;font-size:13px!important}"
+"#tvFeed .tvh .tvt button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;box-shadow:0 0 16px rgba(47,111,224,.7)!important}"
+"#tvFeed .tvh .tvp{position:fixed!important;bottom:calc(env(safe-area-inset-bottom,0px) + 18px)!important;left:50%!important;transform:translateX(-50%)!important;width:58px!important;height:58px!important;border-radius:50%!important;font-size:32px!important;z-index:8!important;box-shadow:0 0 22px rgba(47,111,224,.8)!important}"
+"#tvFeed #tvScr .tvi video{width:100%!important;height:100%!important;background:#050c28!important}"
+"#tvFeed #tvScr .tvr{bottom:calc(env(safe-area-inset-bottom,0px) + 104px)!important;gap:16px!important}"
+"#tvFeed #tvScr .tvc{left:10px!important;right:78px!important;bottom:calc(env(safe-area-inset-bottom,0px) + 94px)!important;padding:12px!important;border-radius:22px!important;background:rgba(8,20,60,.66)!important;border:1px solid rgba(80,160,255,.3)!important}"
+"#tvFeed #tvScr .tvn b{display:none!important}"
+"#tvFeed #tvScr .tvc .tv3h{display:flex!important;align-items:center!important;gap:8px!important;margin-bottom:6px!important}"
+"#tvFeed #tvScr .tvc .tv3a{flex:none!important;width:40px!important;height:40px!important;border-radius:50%!important;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;display:grid!important;place-items:center!important;font-weight:800!important;color:#fff!important;border:2px solid rgba(255,255,255,.4)!important}"
+"#tvFeed #tvScr .tvc .tv3n{flex:0 1 auto!important;min-width:0!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;font-size:15px!important;font-weight:800!important;color:#fff!important}"
+"#tvFeed #tvScr .tvc .tv3v{flex:none!important;display:flex!important}"
+"#tvFeed #tvScr .tvc .tv3f{flex:none!important;margin-left:auto!important;width:auto!important;height:30px!important;padding:0 12px!important;border-radius:15px!important;background:#fff!important;color:#0a2a66!important;font-size:12px!important;font-weight:800!important;white-space:nowrap!important;border:0!important}";
document.head.appendChild(s);var s2=document.createElement("style");s2.textContent="#tvFeed #tvScr{overscroll-behavior:contain!important;touch-action:pan-y!important;scroll-behavior:auto!important}#tvFeed #tvScr .tvi{contain:layout paint!important}";document.head.appendChild(s2);
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function me(){var s=null;try{s=JSON.parse(localStorage.getItem("toole_session"))}catch(e){}return s&&s.user&&s.user.id||null}
var CK='<svg viewBox="0 0 24 24" width="17" height="17"><circle cx="12" cy="12" r="11" fill="#1d9bf0"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var FL='<svg width="26" height="18" viewBox="0 0 26 18"><rect width="26" height="9" fill="#ef2b2d"/><rect y="9" width="26" height="9" fill="#009e49"/><polygon points="13,3.5 14.4,7.7 18.8,7.7 15.2,10.3 16.6,14.5 13,11.9 9.4,14.5 10.8,10.3 7.2,7.7 11.6,7.7" fill="#fcd116"/></svg>';
var CERT=window.__tvCert={},MINE=false,KEY="sb_publishable_bYKnve2bIrsZu1XG_g-syw_8CnA8qPR",SB="https://jbjeqxubpqqypysfsubd.supabase.co";
function gs(){var t=document.querySelector(".tcert svg");return t?t.outerHTML:'<svg viewBox="0 0 24 24" width="17" height="17" aria-label="Compte certifié"><circle cx="12" cy="12" r="11" fill="#f5b301"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
window.__tvSeal=gs;
function hd(){var s=null;try{s=JSON.parse(localStorage.getItem("toole_session"))}catch(e){}return{apikey:KEY,Authorization:"Bearer "+((s&&s.access_token)||KEY),"Content-Type":"application/json"}}
function load(){fetch(SB+"/rest/v1/rpc/certified_pseudos",{method:"POST",headers:hd(),body:"{}"}).then(function(r){return r.json()}).then(function(a){if(!Array.isArray(a))return;Object.keys(CERT).forEach(function(k){delete CERT[k]});a.forEach(function(p){CERT[String(p).trim().toLowerCase()]=1})}).catch(function(){});
var m=me();if(m)fetch(SB+"/rest/v1/profiles?select=certified&id=eq."+m,{headers:hd()}).then(function(r){return r.json()}).then(function(r){MINE=!!(r&&r[0]&&r[0].certified)}).catch(function(){})}
window.__tvMax=function(){return MINE?50:18};window.__tvDur=function(){return MINE?60:30};
load();setInterval(load,60000);
function order(){var sc=document.getElementById("tvScr");if(!sc||sc.scrollTop>4||!Object.keys(CERT).length)return;
var on=document.querySelector("#tvFeed .tvt button.on");if(!on||!/Pour toi/i.test(on.textContent))return;
var its=[].slice.call(sc.querySelectorAll(":scope>.tvi"));if(!its.length||its.some(function(i){return !i.__n}))return;
var key=its.map(function(i){return i.__p}).join();if(sc.__oc===key)return;sc.__oc=key;
var ok=function(i){return CERT[i.__n]},a=its.filter(ok),b=its.filter(function(i){return !ok(i)});
if(a.length)a.concat(b).forEach(function(i){sc.appendChild(i)})}
function stx(){var t=document.getElementById("stTxt");if(t&&!t.__m&&window.__tvMax&&window.__tvMax()>18){t.__m=1;t.maxLength=1000;t.placeholder="Écris ton statut (1000 caractères max)";t.oninput=function(){var c=document.getElementById("stCnt");if(c)c.textContent=t.value.length+"/1000"};t.oninput()}}
function top(){var h=document.querySelector("#tvFeed .tvh");if(h&&!h.querySelector(".tv3l")){var l=E("div","tv3l");l.innerHTML="<b>TÕÕLé</b>"+FL;h.insertBefore(l,h.querySelector(".tvt"))}}
function fit(v){var w=v.videoWidth,h=v.videoHeight;if(w&&h)v.style.setProperty("object-fit",h/w>=1.5?"cover":"contain","important")}
function card(it){var c=it.querySelector(".tvc"),nb=c&&c.querySelector(".tvn b");if(!c||!nb)return;it.__c=1;
var name=nb.textContent.replace("@","").trim(),h=E("div","tv3h"),av=E("div","tv3a",(name||"?").charAt(0).toUpperCase()),nm=E("span","tv3n",name);
var op=function(){if(/Officiel/.test(it.textContent||""))return;nb.click()};av.onclick=op;nm.onclick=op;h.appendChild(av);h.appendChild(nm);
var bd=E("span","tv3v");h.appendChild(bd);it.__v=bd;it.__n=name.toLowerCase();
if((it.__p||"").split("/")[0]!==me()){var b=E("button","tv3f","+ S'abonner");b.onclick=function(e){e.stopPropagation();var pl=it.querySelector(".tkpl");if(pl)pl.click();else op()};h.appendChild(b);it.__b=b}
c.insertBefore(h,c.firstChild)}
function kill(it){it.querySelectorAll(".tvr button").forEach(function(b){if(!b.classList.contains("tv3s")&&/Partager/i.test(b.textContent))b.remove()})}
function sync(it){if(it.__v&&!it.__v.firstChild&&CERT[it.__n])it.__v.innerHTML=gs();if(!it.__b)return;var pl=it.querySelector(".tkpl");if(!pl)return;var t=getComputedStyle(pl).display==="none"?"Abonné ✓":"+ S'abonner";if(it.__b.textContent!==t)it.__b.textContent=t}
setInterval(function(){top();document.querySelectorAll("#tvScr .tvi").forEach(function(it){var v=it.querySelector("video");if(v&&!v.__f){v.__f=1;v.addEventListener("loadedmetadata",function(){fit(v)});fit(v)}if(!it.__c)card(it);sync(it);kill(it)});order();stx()},1500);
})();

;document.addEventListener("click",function(e){var t=e.target,i=t.closest&&t.closest(".tvi");if(!i||!/Officiel/.test(i.textContent||""))return;if(t.closest(".tkpl,.tvn,.tv3h,.tv3a,.tv3n,.tv3f,[class*=avatar]")){e.stopPropagation();e.preventDefault()}},true);
