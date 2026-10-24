(function(){
if(window.__tmsg)return;window.__tmsg=1;
function lock(){var r=document.documentElement;r.style.setProperty('--main','#0a7cff');r.style.setProperty('--main2','#2f9bff')}
window.applyTheme=function(){lock()};
try{localStorage.removeItem('toole_theme')}catch(e){}
function tick(){
 lock();
 try{
  var m=localStorage.getItem('toole_themeMode');
  if(m!=='light'&&m!=='dark'){
   localStorage.setItem('toole_themeMode','light');
   document.documentElement.setAttribute('data-theme','light');
   [].forEach.call(document.querySelectorAll('.pro-seg[data-k=mode] button'),function(b){b.classList.toggle('on',b.dataset.v==='light')});
  }
 }catch(e){}
}
setInterval(tick,3000);tick();
})();
