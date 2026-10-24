(function(){
if(window.__tfin)return;window.__tfin=1;
var D=document;
try{var m=localStorage.getItem('toole_themeMode');if(m!=='light'&&m!=='dark'){localStorage.setItem('toole_themeMode','light');document.documentElement.setAttribute('data-theme','light')}}catch(e){}
var SM='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 14c1 1.6 2.2 2.4 3.5 2.4s2.5-.8 3.5-2.4"/><path d="M9 9.5h.01M15 9.5h.01"/></svg>';
function tidy(){
[].forEach.call(D.querySelectorAll('.tsstkbtn:not([data-f])'),function(b){b.setAttribute('data-f','1');b.innerHTML=SM});
var c=D.getElementById('cxBtn');if(c)c.style.display='none'}
var t=0;new MutationObserver(function(){clearTimeout(t);t=setTimeout(tidy,120)}).observe(D.body,{childList:true,subtree:true});tidy();
})();
