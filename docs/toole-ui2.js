(function(){
if(window.__tui2)return;window.__tui2=1;
var css=[
'.v7-ov{background:rgba(15,23,42,.45)!important}',
'.v7-sh{background:#fff!important;border:0!important;border-radius:20px 20px 0 0!important;padding:8px 0 calc(env(safe-area-inset-bottom,0px) + 10px)!important;box-shadow:0 -8px 30px rgba(15,23,42,.18)!important;max-height:70vh;overflow:auto}',
'.v7-sh:before{content:"";display:block;width:36px;height:4px;border-radius:2px;background:#d5d9e0;margin:4px auto 8px}',
'.v7-r{display:flex!important;align-items:center;gap:16px;width:100%;margin:0!important;padding:15px 22px!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;color:#1f2937!important;font-size:16px;font-weight:500;text-align:left}',
'.v7-r+.v7-r{border-top:1px solid #eef0f3!important}',
'.v7-r:active{background:#f3f4f6!important}',
'.v7-r i{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;flex:0 0 auto;font-style:normal;font-size:20px;color:#4b5563!important;background:none!important;box-shadow:none!important}',
'.v7-r i svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
'#tsEd{overflow:hidden!important}',
'#tsEd .tsp{max-height:24vh;overflow:auto}',
'#__dbg{display:none!important}'
].join('\n');
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function fit(){
  var ed=document.getElementById('tsEd');if(!ed)return;
  var s=ed.querySelector('#tsS');if(!s)return;
  var used=0,k=ed.children,i,cs,r;
  for(i=0;i<k.length;i++){
    if(k[i]===s)continue;
    cs=getComputedStyle(k[i]);
    if(cs.display==='none'||cs.position==='absolute'||cs.position==='fixed')continue;
    r=k[i].getBoundingClientRect();
    used+=r.height+(parseFloat(cs.marginTop)||0)+(parseFloat(cs.marginBottom)||0);
  }
  var sc=getComputedStyle(s);
  used+=(parseFloat(sc.marginTop)||0)+(parseFloat(sc.marginBottom)||0);
  var pad=parseFloat(getComputedStyle(ed).paddingTop)||0;
  var h=Math.floor(ed.clientHeight-pad-used-6);
  h=Math.max(150,Math.min(h,Math.floor(ed.clientHeight*0.62)));
  if(s.__h!==h){s.__h=h;s.style.setProperty('height',h+'px','important')}
}
function patchFab(){
  var b=document.getElementById('v4n3');
  if(!b||b.__t)return;b.__t=1;
  b.onclick=function(){
    if(typeof closeSheet==='function')closeSheet();
    var p=document.querySelector('#v4stMe .plus');
    if(p&&typeof p.onclick==='function')p.onclick({stopPropagation:function(){}});
    else if(typeof window.openComposer==='function')window.openComposer();
  };
}
function wire(id){
  var box=document.getElementById(id);if(!box||box.__w)return;box.__w=1;
  var until=0;
  function go(){if(Date.now()<until)box.scrollTop=box.scrollHeight}
  var scr=box.closest('[id^="scr"]');
  if(scr){
    var was=!scr.classList.contains('hide');
    new MutationObserver(function(){
      var now=!scr.classList.contains('hide');
      if(now&&!was){until=Date.now()+4500;setTimeout(go,50)}
      was=now;
    }).observe(scr,{attributes:true,attributeFilter:['class']});
  }
  new MutationObserver(go).observe(box,{childList:true});
  box.addEventListener('load',go,true);
  box.addEventListener('loadedmetadata',go,true);
  box.addEventListener('touchstart',function(){until=0},{passive:true});
}
var pend=false;
function tick(){pend=false;patchFab();wire('chat');wire('gMsgs');fit()}
new MutationObserver(function(){if(!pend){pend=true;requestAnimationFrame(tick)}})
  .observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
window.addEventListener('resize',function(){requestAnimationFrame(fit)});
tick();
})();
