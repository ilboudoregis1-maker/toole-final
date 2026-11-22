/* TÕÕLé : design du fil Divertissement v2 */
(function(){if(window.__tdd)return;window.__tdd=1;
var s=document.createElement("style");
s.textContent="#tvScr .tvi::before{content:'';position:absolute;left:0;right:0;top:0;height:22%;background:linear-gradient(rgba(0,0,0,.45),transparent);pointer-events:none;z-index:1}"
+"#tvScr .tvi::after{content:'';position:absolute;left:0;right:0;bottom:0;height:42%;background:linear-gradient(transparent,rgba(0,0,0,.72));pointer-events:none;z-index:1}"
+"#tvScr .tvr,#tvScr .tvc{z-index:3}"
+"#tvScr .tvr button{width:54px;padding:6px 0;border-radius:27px;background:rgba(0,0,0,.28);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}"
+"#tvScr .tvr button i{transition:transform .15s}#tvScr .tvr button:active i{transform:scale(1.3)}"
+"#tvScr .tvn b{font-size:16px;font-weight:800}"
+"#tvScr .tvx{font-size:14px;max-height:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"
+"#tvScr .tvx.open{-webkit-line-clamp:unset;max-height:40vh;overflow:auto;display:block}"
+"#tvScr .tvl{padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.12);animation:tvp 1.2s ease-in-out infinite}@keyframes tvp{50%{opacity:.45}}"
+".tvpb{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.25);z-index:4}.tvpb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#00c2e0,#2f6fe0)}"
+".tvpi{position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;font-size:38px;display:flex;align-items:center;justify-content:center;z-index:5;pointer-events:none;opacity:0;transform:scale(.7);transition:opacity .2s,transform .2s}.tvpi.on{opacity:1;transform:scale(1)}"
+".tvh{position:absolute;left:50%;top:50%;font-size:90px;margin:-50px 0 0 -45px;z-index:6;pointer-events:none;animation:tvh .7s ease-out forwards}@keyframes tvh{0%{opacity:0;transform:scale(.3)}25%{opacity:1;transform:scale(1.15)}100%{opacity:0;transform:translateY(-60px) scale(1)}}"
+".tvmu{position:fixed;left:50%;transform:translateX(-50%);top:calc(env(safe-area-inset-top,0px) + 70px);z-index:2147483000;padding:8px 14px;border-radius:20px;background:rgba(0,0,0,.65);color:#fff;font-size:13px;font-weight:700;pointer-events:none;display:none}";
document.head.appendChild(s);
var mu=document.createElement("div");mu.className="tvmu";mu.textContent="🔇 Touche la vidéo pour le son";document.body.appendChild(mu);
function dec(it){if(it.__dd)return;it.__dd=1;
 var pb=document.createElement("div");pb.className="tvpb";pb.innerHTML="<i></i>";it.appendChild(pb);
 var pi=document.createElement("div");pi.className="tvpi";it.appendChild(pi);
 var v=it.querySelector("video"),bar=pb.firstChild;
 if(v){v.addEventListener("timeupdate",function(){if(v.duration)bar.style.width=(v.currentTime/v.duration*100)+"%"});
  v.addEventListener("pause",function(){if(it.__act===1&&!v.ended&&v.readyState>=2){pi.textContent="⏸";pi.classList.add("on")}});
  v.addEventListener("play",function(){pi.classList.remove("on")})}
 var tx=it.querySelector(".tvx");if(tx)tx.addEventListener("click",function(e){e.stopPropagation();tx.classList.toggle("open")});
 it.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".tvr,.tvc"))return;var t=Date.now();
  if(it.__tt&&t-it.__tt<320){it.__tt=0;var h=document.createElement("div");h.className="tvh";h.textContent="❤️";it.appendChild(h);setTimeout(function(){h.remove()},750)}else it.__tt=t})}
function tick(){try{var sc=document.getElementById("tvScr");
 if(!sc||!sc.offsetParent){mu.style.display="none";return}
 [].forEach.call(sc.querySelectorAll(".tvi"),dec);
 var a=null;[].forEach.call(sc.querySelectorAll(".tvi"),function(i){if(i.__act===1)a=i});
 var v=a&&a.querySelector("video");mu.style.display=(v&&v.muted&&!v.paused)?"block":"none"}catch(e){}}
setInterval(tick,600);
})();
