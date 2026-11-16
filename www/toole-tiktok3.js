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
it.querySelectorAll(".tk-lk span,.tk-cm span").forEach(function(s){var t=s.textContent;if(/^\d+$/.test(t)&&+t>=1000)s.textContent=K(+t)})})},500);
}catch(e){}})();
