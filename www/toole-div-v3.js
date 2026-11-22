/* TÕÕLé : Divertissement v3 - design clair refait, icônes vectorielles */
(function(){"use strict";if(window.__tdv3)return;window.__tdv3=1;
var P="html body #tvFeed #tvScr ",H="html body #tvFeed ",B="calc(env(safe-area-inset-bottom,0px) + ";
/* ---------- icônes SVG (masques) ---------- */
function svg(inner,fill){return "data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" '+(fill?'fill="#000"':'fill="none" stroke="#000" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"')+'>'+inner+'</svg>')}
var HEART="M12 20.6S3.6 15.6 3.6 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.4 2.5c0 6.2-8.4 11.2-8.4 11.2z";
var IC={
heart:svg('<path d="'+HEART+'"/>'),
heartOn:svg('<path d="'+HEART+'"/>',1),
comment:svg('<path d="M21 11.4a8.4 8.4 0 0 1-12.3 7.4L3 20.4l1.7-5.1A8.4 8.4 0 1 1 21 11.4z"/><path d="M8.5 11.4h.01M12 11.4h.01M15.5 11.4h.01"/>'),
trash:svg('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 12.4A1.6 1.6 0 0 0 8.6 21h6.8a1.6 1.6 0 0 0 1.6-1.6L18 7M9 7V4.6c0-.3.3-.6.6-.6h4.8c.3 0 .6.3.6.6V7"/>'),
back:svg('<path d="M15 5l-7 7 7 7"/>'),
plus:svg('<path d="M12 5v14M5 12h14"/>'),
star:svg('<path d="M12 2.8l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17l-5.6 3 1.1-6.2L3 9.4l6.2-.9z"/>',1),
pause:svg('<rect x="6" y="5" width="4.2" height="14" rx="1.6"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.6"/>',1),
mute:svg('<path d="M11 5L6.3 9H3v6h3.3L11 19z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>')
};
function mk(n){return 'url("'+IC[n]+'")'}
function mask(n){return "-webkit-mask:"+mk(n)+" center/contain no-repeat;mask:"+mk(n)+" center/contain no-repeat"}
/* ---------- CSS ---------- */
var C=[
/* fond */
H+"{background:radial-gradient(560px 320px at 100% -6%,rgba(0,194,224,.22),transparent),radial-gradient(520px 320px at -5% 4%,rgba(47,111,224,.16),transparent),radial-gradient(420px 300px at 50% 105%,rgba(0,158,73,.10),transparent),#f3f8ff!important;color:#0b1d3a!important}",
/* en-tête */
H+".tvh{display:flex!important;flex-wrap:wrap!important;align-items:center!important;gap:10px!important;row-gap:10px!important;padding:calc(env(safe-area-inset-top,0px) + 10px) 12px 10px!important;background:linear-gradient(#f3f8ff 70%,rgba(243,248,255,0))!important}",
H+".tvh>button,"+H+".tvh>button.sq{border:0!important;color:#0a2a66!important;background:#fff!important;box-shadow:0 4px 14px rgba(30,80,160,.14),inset 0 0 0 1px rgba(47,111,224,.12)!important;transition:transform .15s}",
H+".tvh>button:active{transform:scale(.92)}",
H+".tvh .sq:not(.tvp):not(.tvinfb){order:1!important;width:42px!important;height:42px!important;padding:0!important;border-radius:15px!important;font-size:0!important;display:grid!important;place-items:center!important}",
H+".tvh .sq svg{width:24px!important;height:24px!important}",
H+".tvh .sq svg *{stroke:currentColor!important}",
H+".tvh .tvinfb{order:3!important;width:42px!important;height:42px!important;padding:0!important;border-radius:15px!important;font-size:0!important;display:grid!important;place-items:center!important}",
H+".tvh .tvinfb::before{content:'';width:22px;height:22px;"+mask("star")+";background:linear-gradient(135deg,#ffb020,#ff6a3d)!important}",
H+".tv3l{order:2!important;flex:1!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;color:#0a2a66!important}",
H+".tv3l b{font-size:25px!important;font-weight:900!important;letter-spacing:-.8px!important;color:#0a2a66!important;background:linear-gradient(135deg,#0a2a66,#2f6fe0);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}",
H+".tv3l svg{border-radius:4px;box-shadow:0 2px 6px rgba(10,30,70,.25)}",
/* onglets */
H+".tvh .tvt{order:4!important;flex:1 1 100%!important;display:flex!important;gap:4px!important;padding:4px!important;border-radius:22px!important;background:rgba(255,255,255,.86)!important;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 6px 18px rgba(30,80,160,.12),inset 0 0 0 1px rgba(47,111,224,.12)!important}",
H+".tvh .tvt button{flex:1!important;height:36px!important;border-radius:18px!important;background:transparent!important;color:#4a6591!important;font-size:13px!important;font-weight:700!important;box-shadow:none!important;border:0!important;text-shadow:none!important;transition:background .2s,color .2s}",
H+".tvh .tvt button::after{display:none!important}",
H+".tvh .tvt button.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;box-shadow:0 6px 16px rgba(47,111,224,.38)!important}",
/* bouton publier */
H+".tvh>button.sq.tvp{position:fixed!important;order:0!important;left:50%!important;bottom:"+B+"16px)!important;transform:translateX(-50%)!important;width:60px!important;height:60px!important;padding:0!important;border-radius:50%!important;font-size:0!important;display:grid!important;place-items:center!important;z-index:9!important;color:#fff!important;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;box-shadow:0 0 0 6px rgba(255,255,255,.9),0 12px 28px rgba(47,111,224,.5)!important}",
H+".tvh>button.sq.tvp:active{transform:translateX(-50%) scale(.92)!important}",
H+".tvh .tvp svg{width:30px!important;height:30px!important}",
/* carte vidéo */
P+".tvi{background:transparent!important}",
P+".tvi::before{display:none!important}",
P+".tvi::after{left:10px!important;right:10px!important;bottom:"+B+"92px)!important;height:44%!important;border-radius:0 0 28px 28px!important;background:linear-gradient(transparent,rgba(6,20,52,.62))!important}",
P+".tvi video{position:absolute!important;left:10px!important;right:10px!important;top:calc(env(safe-area-inset-top,0px) + 118px)!important;bottom:"+B+"92px)!important;width:calc(100% - 20px)!important;height:auto!important;border-radius:28px!important;background:#dfe9f9!important;box-shadow:0 18px 40px rgba(30,80,160,.28),0 0 0 1px rgba(47,111,224,.18)!important}",
/* légende */
P+".tvc{left:22px!important;right:86px!important;bottom:"+B+"106px)!important;padding:10px 12px!important;border-radius:22px!important;background:rgba(255,255,255,.9)!important;border:1px solid rgba(255,255,255,.95)!important;-webkit-backdrop-filter:blur(16px)!important;backdrop-filter:blur(16px)!important;box-shadow:0 10px 26px rgba(10,30,70,.22)!important;color:#0b1d3a!important;text-shadow:none!important}",
P+".tvc .tv3h{gap:8px!important;margin-bottom:5px!important}",
P+".tvc .tv3a{width:38px!important;height:38px!important;border:2px solid #fff!important;box-shadow:0 3px 10px rgba(47,111,224,.4)!important;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important}",
P+".tvc .tv3n{color:#0a2a66!important;font-size:15px!important;font-weight:800!important}",
P+".tvc .tv3f{height:30px!important;padding:0 13px!important;border-radius:15px!important;background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;box-shadow:0 4px 12px rgba(47,111,224,.35)!important}",
P+".tvc .tvx{color:#22385f!important;text-shadow:none!important;font-size:14px!important;line-height:1.4!important}",
P+".tvc .tvfc{color:#5b7099!important}",
/* badge influenceur */
P+".tvc .tvinf{display:inline-flex!important;align-items:center!important;gap:4px!important;height:22px!important;padding:0 9px 0 7px!important;border-radius:11px!important;background:linear-gradient(135deg,#ffc23d,#ff7a2b)!important;color:#4a2200!important;font-size:11px!important;font-weight:800!important;letter-spacing:.2px;box-shadow:0 3px 8px rgba(255,122,43,.4)!important;white-space:nowrap}",
P+".tvc .tvinf::before{content:'';width:12px;height:12px;background:currentColor;"+mask("star")+"}",
P+".tvc .tv3n{flex:1 1 auto!important}",
P+".tvr button span{color:#fff!important}",
/* rail d'actions */
P+".tvr{right:20px!important;bottom:"+B+"112px)!important;gap:12px!important}",
P+".tvr button{width:50px!important;padding:0!important;gap:3px!important;color:#fff!important;background:transparent!important;text-shadow:0 1px 4px rgba(0,0,0,.55)!important;font-size:11.5px!important;font-weight:800!important}",
P+".tvr button i{width:46px!important;height:46px!important;border-radius:50%!important;display:grid!important;place-items:center!important;background:rgba(8,24,60,.5)!important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.28),0 6px 16px rgba(10,30,70,.3)!important;filter:none!important;font-size:0!important;position:relative;transition:transform .15s}",
P+".tvr button:active i{transform:scale(.9)}",
P+".tvr button i svg{width:26px!important;height:26px!important;filter:none!important}",
P+".tvr button i[data-ic]{background-image:none!important}",
P+".tvr button i[data-ic]::before{content:'';width:26px;height:26px;background:#fff}",
P+".tvr .tka{width:52px!important;height:62px!important}",
P+".tvr .tka .tkc{width:52px!important;height:52px!important;border:3px solid #fff!important;box-shadow:0 6px 16px rgba(10,30,70,.35)!important;font-size:21px!important;color:#fff!important;text-shadow:none!important}",
P+".tvr .tka .tkpl{width:24px!important;height:24px!important;line-height:19px!important;background:linear-gradient(135deg,#ff7a8e,#ff2d55)!important;border:2px solid #fff!important;box-shadow:0 3px 8px rgba(255,45,85,.5)}",
P+".tvr .tkdisc{width:44px!important;height:44px!important;filter:drop-shadow(0 6px 10px rgba(10,30,70,.35))}",
P+".tvc .tvn{margin:0!important;gap:6px!important}",
P+".tvc .tvn .tvf,"+P+".tvc .tvn .tvfc{display:none!important}",
P+".tvc .tkchip{display:inline-flex!important;align-items:center!important;gap:5px!important;height:24px!important;padding:0 10px!important;border-radius:12px!important;background:#eaf2ff!important;color:#2f6fe0!important;font-size:12px!important;font-weight:700!important;border:0!important}",
P+".tvc .tkms{color:#5b7099!important;font-size:12px!important;font-weight:600!important;text-shadow:none!important;margin-top:6px!important}",
P+".tvc .tkms svg{color:#2f6fe0!important}",
P+".tkb{display:none!important}",
P+".tvr button i[data-ic=hoff]::before{"+mask("heart")+"}",
P+".tvr button i[data-ic=hon]::before{"+mask("heartOn")+";background:linear-gradient(135deg,#ff7a8e,#ff2d55)}",
P+".tvr button i[data-ic=hon]{background:rgba(255,255,255,.95)!important}",
P+".tvr button i[data-ic=cm]::before{"+mask("comment")+"}",
P+".tvr button i[data-ic=del]::before{"+mask("trash")+"}",
P+".tvr button i[data-ic]:not([data-ic=hon])::before{display:block}",
/* barre de progression */
H+".tvpb{left:34px!important;right:34px!important;bottom:"+B+"98px)!important;height:4px!important;border-radius:2px!important;background:rgba(255,255,255,.5)!important}",
H+".tvpb i{border-radius:2px!important;background:linear-gradient(90deg,#00c2e0,#2f6fe0)!important;box-shadow:0 0 8px rgba(0,194,224,.7)}",
/* pause + coeur + son */
H+".tvpi{width:88px!important;height:88px!important;margin:-44px 0 0 -44px!important;font-size:0!important;background:rgba(255,255,255,.92)!important;box-shadow:0 12px 30px rgba(10,30,70,.3)!important}",
H+".tvpi::after{content:'';width:34px;height:34px;background:#2f6fe0;"+mask("pause")+"}",
H+".tvheart{width:100px!important;height:100px!important;margin:-50px 0 0 -50px!important;font-size:0!important;background:linear-gradient(135deg,#ff7a8e,#ff2d55)!important;"+mask("heartOn")+";filter:drop-shadow(0 8px 14px rgba(255,45,85,.45))}",
"html body .tvmu{display:none;align-items:center;gap:8px;background:rgba(255,255,255,.95)!important;color:#0a2a66!important;box-shadow:0 8px 22px rgba(10,30,70,.25)!important;border-radius:22px!important;padding:9px 15px 9px 12px!important}",
"html body .tvmu[style*='block']{display:flex!important}",
"html body .tvmu::before{content:'';width:18px;height:18px;background:#2f6fe0;"+mask("mute")+"}",
/* chargement / vide */
P+".tvl{width:42px!important;height:42px!important;font-size:0!important;border:4px solid rgba(47,111,224,.18)!important;border-top-color:#2f6fe0!important;border-radius:50%!important;background:transparent!important;box-shadow:none!important;animation:tkspin .8s linear infinite!important}",
P+".tvl.tkerr{width:auto!important;height:auto!important;font-size:13px!important;border:0!important;color:#4a6591!important;animation:none!important}",
H+".tve{color:#4a6591!important;font-size:15px;font-weight:600;line-height:1.5}",
/* feuille commentaires */
H+"#tvSh{border-radius:28px 28px 0 0!important;box-shadow:0 -14px 40px rgba(10,30,70,.28)}",
H+"#tvSh .shh{border-bottom:0!important;padding:18px 18px 8px!important;font-weight:800;color:#0a2a66}",
H+"#tvSh .shh::before{content:'';position:absolute;top:8px;left:50%;width:40px;height:4px;margin-left:-20px;border-radius:2px;background:#d3deef}",
H+"#tvSh .shc{padding:10px 12px!important;margin:6px 0;border-radius:16px;background:#f3f8ff}",
H+"#tvSh .shi input{background:#f3f8ff;border-color:#d3deef!important}"
].join("\n");
var st=document.createElement("style");st.id="tdv3css";st.textContent=C;document.head.appendChild(st);
/* ---------- marquage des icônes ---------- */
function tag(){try{
 [].forEach.call(document.querySelectorAll("#tvScr .tvr button"),function(b){var i=b.querySelector("i");if(!i||i.querySelector("svg"))return;
  var t=i.textContent||"",k=b.classList.contains("tk-lk")?(b.classList.contains("liked")?"hon":"hoff"):b.classList.contains("tk-cm")?"cm":/🗑/.test(t)?"del":/❤/.test(t)?"hon":/🤍/.test(t)?"hoff":/💬/.test(t)?"cm":null;
  if(k&&i.getAttribute("data-ic")!==k)i.setAttribute("data-ic",k)});
 [].forEach.call(document.querySelectorAll("#tvFeed .tvh>button"),function(b){var t=(b.textContent||"").trim();
  if(b.classList.contains("tvinfb")&&t){b.textContent=""}});
 [].forEach.call(document.querySelectorAll("#tvScr .tvi"),function(it){
  var inf=it.querySelector(".tvinf");
  if(inf&&!inf.__v3){inf.__v3=1;inf.textContent="Influenceur"}
});
 var mu=document.querySelector(".tvmu");if(mu&&!mu.__v3){mu.__v3=1;mu.textContent="Touche la vidéo pour le son"}
}catch(e){}}
setInterval(tag,400);tag();
})();
