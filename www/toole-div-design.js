/* TÕÕLé : design du fil Divertissement */
(function(){if(window.__tdd)return;window.__tdd=1;var s=document.createElement("style");
s.textContent="#tvScr{scroll-snap-type:y mandatory}.tvi{position:relative;scroll-snap-align:start;scroll-snap-stop:always}"
+".tvi::after{content:'';position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(transparent,rgba(0,0,0,.65));pointer-events:none}"
+".tvr{position:absolute;right:10px;bottom:120px;display:flex;flex-direction:column;align-items:center;gap:16px;z-index:3}"
+".tvr button{width:52px;border:0;border-radius:26px;padding:8px 0;background:rgba(0,0,0,.35);color:#fff;font-size:12px;display:flex;flex-direction:column;align-items:center;gap:2px}.tvr button i{font-style:normal;font-size:24px}"
+".tvc{position:absolute;left:14px;right:84px;bottom:calc(env(safe-area-inset-bottom,0px) + 20px);z-index:3;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,.6)}"
+".tvinf{margin-left:6px;font-size:11px;font-weight:800;padding:2px 7px;border-radius:10px;background:linear-gradient(135deg,#ff7a18,#e5484d);color:#fff}";
document.head.appendChild(s)})();
