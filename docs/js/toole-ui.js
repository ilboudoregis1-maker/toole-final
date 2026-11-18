(function(){
var A='<svg class="ti" viewBox="0 0 24 24" aria-hidden="true">';
var P={
chat:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/>',
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a7 7 0 0 1 4 6"/>',
settings:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
camera:'<path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
video:'<rect x="2" y="6" width="14" height="12" rx="3"/><path d="M16 10l6-3v10l-6-3"/>',
image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-5-5L5 21"/>',
clip:'<path d="M21 11l-8.6 8.6a5 5 0 0 1-7-7L14 4a3.5 3.5 0 0 1 5 5l-8.6 8.6a2 2 0 0 1-3-3L15 7"/>',
file:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>',
send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
back:'<path d="M15 5l-7 7 7 7"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/>',
phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
lock:'<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
edit:'<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/>',
more:'<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
music:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/>',
smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14a4.5 4.5 0 0 0 8 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
logout:'<path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 8l5 4-5 4M21 12H9"/>',
eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
play:'<path d="M7 4l13 8-13 8z"/>',
download:'<path d="M12 4v11M7 11l5 5 5-5M4 20h16"/>',
share:'<path d="M7 17L17 7M9 7h8v8"/>',
copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
pin:'<path d="M12 17v5M8 3h8l-1 7 3 3v2H6v-2l3-3z"/>',
info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
game:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5M15.5 11.5h.01M18 14h.01"/>',
status:'<circle cx="12" cy="12" r="8" stroke-dasharray="3.5 3"/><circle cx="12" cy="12" r="3"/>'
};
var M={'💬':'chat','🗨':'chat','🏠':'home','🏡':'home','👤':'user','🧑':'user','👥':'users','⚙':'settings','🔧':'settings','🔍':'search','📷':'camera','📸':'camera','🎥':'video','📹':'video','🖼':'image','📎':'clip','📁':'file','📂':'file','📄':'file','🎤':'mic','🎙':'mic','➤':'send','📤':'send','✈':'send','➕':'plus','+':'plus','←':'back','⬅':'back','✕':'close','✖':'close','❌':'close','×':'close','✔':'check','✅':'check','✓':'check','🔔':'bell','📞':'phone','☎':'phone','🔒':'lock','🌐':'globe','🌍':'globe','🗑':'trash','✏':'edit','⋮':'more','⋯':'more','🎵':'music','🎶':'music','🎁':'gift','🚪':'logout','👁':'eye','▶':'play','⬇':'download','↗':'share','📋':'copy','📌':'pin','ℹ':'info','🛡':'shield','🌙':'moon','☀':'sun','🎮':'game','⭕':'status'};
var SEL='button,a,[role="button"],[class*="icon"],[class*="ico"],[class*="tab"],[class*="nav"],[class*="btn"],i,summary';
var EXC='[class*="bubble"],[class*="reaction"],[class*="picker"],[data-keep]';
function run(){
 var list=document.querySelectorAll(SEL);
 for(var i=0;i<list.length;i++){
  var el=list[i];
  if(el.closest&&el.closest(EXC))continue;
  var kids=Array.prototype.slice.call(el.childNodes);
  for(var j=0;j<kids.length;j++){
   var tn=kids[j]; if(tn.nodeType!==3)continue;
   var s=tn.nodeValue.replace(/^\s+/,''); if(!s)continue;
   var cp=String.fromCodePoint(s.codePointAt(0));
   var rest=s.slice(cp.length).replace(/^\uFE0F/,'');
   var only=!rest.trim();
   var par=el.parentElement;
   if(only&&par&&par.children.length>=8)continue;
   var n=M[cp];
   if(!n&&only&&(el.tagName==='BUTTON'||el.getAttribute('role')==='button')){
    var hint=((el.className&&el.className.baseVal===undefined?el.className:'')+' '+el.id+' '+(el.getAttribute('aria-label')||'')+' '+(el.title||'')).toLowerCase();
    var pict=false;try{pict=/\p{Extended_Pictographic}/u.test(cp)}catch(e){}
    if(pict&&/emoji|sticker/.test(hint))n='smile';
   }
   if(!n)continue;
   var sp=document.createElement('span');sp.className='ti-w';sp.innerHTML=A+P[n]+'</svg>';
   el.insertBefore(sp,tn);
   if(only)el.removeChild(tn);else tn.nodeValue=rest;
  }
 }
}
var q=0;
function go(){ if(q)return; q=requestAnimationFrame(function(){q=0;try{run()}catch(e){}}); }
function init(){
 run();
 new MutationObserver(go).observe(document.body,{childList:true,subtree:true,characterData:true});
}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
