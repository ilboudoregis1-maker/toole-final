(function(){
try{if(!localStorage.getItem('toole_g1')){localStorage.setItem('toole_g1','1');localStorage.setItem('toole_theme','#0f8a3c')}var t=localStorage.getItem('toole_theme');if(t)document.documentElement.style.setProperty('--main',t)}catch(e){}
document.addEventListener('contextmenu',function(e){e.preventDefault()});
function init(){
var up=document.getElementById('up');
if(up)up.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();showOnly('scrInscr')},true);
var m=document.getElementById('msg');
if(m)new MutationObserver(function(){var t=m.textContent,s=document.getElementById('scrInscr'),mi=document.getElementById('msgI');if(!t||!s||!mi||s.classList.contains('hide'))return;mi.textContent=t;if(/Compte cr|Account created/.test(t))setTimeout(function(){showOnly('scrLogin')},1500)}).observe(m,{childList:true,characterData:true,subtree:true});
var sb=document.getElementById('supportStatic'),pr=document.getElementById('scrProfil');
if(sb&&pr){var bd=pr.querySelector('.body'),w=sb.parentNode;if(bd&&w&&w!==bd){w.style.padding='16px 0 0';bd.appendChild(w)}
if(bd&&!document.getElementById('cnsLink')){var p=document.createElement('p');p.id='cnsLink';p.style.cssText='text-align:center;margin:22px 0 0';p.innerHTML='<a href="https://ilboudoregis1-maker.github.io/CNS.corp/" target="_system" style="font-weight:700;text-decoration:none">Site CNS.corp</a>';bd.appendChild(p)}}
}
init();
try{if(localStorage.getItem('toole_lang')==='en'&&typeof tp==='function')tp('en')}catch(e){}
})();
