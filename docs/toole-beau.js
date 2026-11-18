(function(){
var P={
read:'<path d="M1.5 13l4 4L14 8.5M9.5 17l1 1L22 7"/>',
vib:'<rect x="8" y="3" width="8" height="18" rx="2"/><path d="M4 8v8M20 8v8"/>',
snd:'<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12"/>',
lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
bell:'<path d="M6 17V11a6 6 0 0112 0v6l2 2H4z"/><path d="M10 21h4"/>',
ok:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>'};
var M={tRead:'read',tVib:'vib',cxTts:'snd',uiSnd:'snd',sOnly:'lock',ick:'ok',polCk:'ok'};
function pick(i){var id=i.id||"";if(M[id])return M[id];if(/typ|ecr/i.test(id))return"eye";if(/onl|pres/i.test(id))return"bell";return"ok"}
function fix(root){
(root.querySelectorAll?root:document).querySelectorAll('label.row,.row').forEach(function(r){
if(r.__tb)return;var i=r.querySelector('input[type=checkbox]');if(!i)return;
r.__tb=1;var s=document.createElement('span');s.className='tb-ic';
s.innerHTML='<svg viewBox="0 0 24 24">'+P[pick(i)]+'</svg>';r.insertBefore(s,r.firstChild)})}
function go(){fix(document);
try{new MutationObserver(function(m){for(var k=0;k<m.length;k++)if(m[k].addedNodes.length){fix(document);break}}).observe(document.body,{childList:true,subtree:true})}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",go);else go();
})();
