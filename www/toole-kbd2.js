(function(){
if(window.__tkbd2)return;window.__tkbd2=1;
var st=document.createElement('style');
st.textContent='html,body{height:100%!important;min-height:0!important}';
document.head.appendChild(st);
var IDS=['v4nav','fab','cxBtn'];
var vv=window.visualViewport;
function vh(){return vv?vv.height:window.innerHeight}
var max=vh();
function isF(e){return e&&e.matches&&e.matches('input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button]):not([type=submit]):not([type=file]),textarea')}
function hide(){IDS.forEach(function(i){var n=document.getElementById(i);if(n)n.style.setProperty('display','none','important')})}
function show(){IDS.forEach(function(i){var n=document.getElementById(i);if(n)n.style.removeProperty('display')})}
document.addEventListener('focusin',function(e){if(isF(e.target))hide()},true);
document.addEventListener('focusout',function(){setTimeout(function(){if(!isF(document.activeElement))show()},200)},true);
function onResize(){
var h=vh();if(h>max)max=h;
if(h>max-100){show();var a=document.activeElement;if(isF(a))a.blur()}
}
if(vv)vv.addEventListener('resize',onResize);
window.addEventListener('resize',onResize);
})();
