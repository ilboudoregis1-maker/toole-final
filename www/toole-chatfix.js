(function(){
if(window.__tcf)return;window.__tcf=1;
var $=function(i){return document.getElementById(i)};
var IC='<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8.1-9-8.1z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.2" r="1"/><circle cx="15" cy="7.2" r="1"/></svg>';
function rgb(s){var m=/rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,\/]+([\d.]+))?/.exec(s||'');return m?[+m[1],+m[2],+m[3],m[4]===undefined?1:+m[4]]:null}
function colorOf(el){
 for(var e=el;e&&e.nodeType===1;e=e.parentElement){
  var cs=getComputedStyle(e),c=rgb(cs.backgroundColor);
  if(c&&c[3]>0.5)return c;
  if(cs.backgroundImage.indexOf('gradient')>-1){var g=rgb(cs.backgroundImage);if(g)return g}
 }
 return [255,255,255,1];
}
function lum(c){return (0.299*c[0]+0.587*c[1]+0.114*c[2])/255}
function pk(c){return (c[0]<<16)|(c[1]<<8)|c[2]}
var last='';
function bars(){
 try{
  if(!window.ToolBars)return;
  var h=document.querySelector('section.scr:not(.hide) .chead,section.scr:not(.hide) .hdr,section.scr:not(.hide) .top,section.scr:not(.hide) .c2-top');
  var t=colorOf(h||document.body),b=colorOf(document.body),k=pk(t)+'/'+pk(b);
  if(k===last)return;last=k;
  window.ToolBars.set(pk(t),pk(b),lum(t)>0.6,lum(b)>0.6);
 }catch(e){}
}
function icon(){
 [['wBtnU','peerName'],['wBtnG','gName']].forEach(function(p){
  var b=$(p[0]);if(!b)return;
  if(!b.dataset.tf){b.dataset.tf=1;b.innerHTML=IC}
  var n=$(p[1])||b.parentNode.querySelector('.cn,.ttl');
  if(n)b.style.color=getComputedStyle(n).color;
 });
}
setInterval(function(){icon();bars()},700);
function wrap(){
 var _r=window.renderMsgRows;if(typeof _r!=='function'||window.__tcfw)return;window.__tcfw=1;
 window.renderMsgRows=function(rows){
  var c=$('chat');if(!c)return _r.apply(this,arguments);
  var pid;try{pid=String(peer.id)}catch(e){}
  var fresh=c.dataset.tfp!==pid;
  var top=c.scrollTop,near=c.scrollHeight-c.scrollTop-c.clientHeight<80;
  var old={};
  if(!fresh)[].forEach.call(c.querySelectorAll('.m[data-mid]'),function(n){old[n.dataset.mid]=n});
  var r=_r.apply(this,arguments);
  c.dataset.tfp=pid;
  var sg={};(rows||[]).forEach(function(m){sg[m.id]=[m.read_at,m.body,m.audio_path].join('|')});
  [].forEach.call(c.querySelectorAll('.m[data-mid]'),function(n){
   var id=n.dataset.mid,o=old[id];
   if(o&&o._tfs===sg[id]&&o!==n){c.replaceChild(o,n)}
   else{n._tfs=sg[id];if(fresh||o)n.classList.add('tf-still')}
  });
  if(!near&&!fresh)c.scrollTop=top;
  return r;
 };
}
window.addEventListener('load',function(){setTimeout(wrap,800)});
})();
