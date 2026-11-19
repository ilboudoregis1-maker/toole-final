(function(){
if(window.__tkb)return;
var Q=new URLSearchParams(location.search);
if(Q.get("bulle")!=="1")return;
window.__tkb=1;
var IDS=["txt","gTxt"],shift=false,layer="a",kb=null,lifted=null,rep=null,rt=null;
var A=[["a","z","e","r","t","y","u","i","o","p"],["q","s","d","f","g","h","j","k","l","m"],["SH","w","x","c","v","b","n","BS"]];
var S=[["1","2","3","4","5","6","7","8","9","0"],["@","#","€","&","_","-","+","(",")","/"],["*","\"","'",":",";","!","?","%","BS"]];
var E=[["😀","😂","😍","🥰","😎","🤔","😢","😭"],["👍","🙏","💪","🔥","❤️","🎉","✨","💯"],["😅","😉","😘","🤝","👏","😴","😡","BS"]];
var B={a:["123","EM","SP",".","OK"],s:["ABC","EM","SP",".","OK"],e:["ABC","SP","OK"]};
var CSS="#tkb{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:none;background:#06090e;border-top:2px solid #FCD116;padding:0 3px calc(4px + env(safe-area-inset-bottom,0px));font-family:system-ui,sans-serif;-webkit-user-select:none;user-select:none;touch-action:manipulation;box-shadow:0 -6px 22px rgba(0,158,73,.35)}"
+".tkh{display:flex;justify-content:space-between;align-items:center;height:22px;padding:0 8px;font-size:11px;letter-spacing:2px;color:#FCD116;background:linear-gradient(90deg,#EF2B2D,#06090e 35%,#06090e 65%,#009E49);margin:0 -3px 2px}"
+".tkh b{color:#fff;padding:0 8px;font-size:13px}.tkr{display:flex}"
+".k{flex:1;margin:2px;height:38px;border-radius:9px;border:1px solid rgba(0,200,110,.45);background:linear-gradient(#131c27,#0a1018);color:#e9fff4;font-size:17px;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 8px rgba(0,158,73,.25)}"
+".k.p{background:#009E49;color:#fff}.k.sp{flex:1.5;color:#FCD116;border-color:rgba(252,209,22,.55)}.k.on{background:#FCD116;color:#000}"
+".k.spc{flex:5;font-size:13px;letter-spacing:3px;color:#9fe8c0}"
+".k.snd{flex:2;background:linear-gradient(135deg,#EF2B2D,#a30f17);border-color:#EF2B2D;color:#fff;font-size:20px}";
function esc(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}
function key(k){var c="k",l=k;
if(k==="SH"){l="⇧";c+=" sp"+(shift?" on":"")}
else if(k==="BS"){l="⌫";c+=" sp"}
else if(k==="SP"){l="TÕÕLé";c+=" spc"}
else if(k==="OK"){l="➤";c+=" snd"}
else if(k==="EM"){l="😊";c+=" sp"}
else if(k==="123"||k==="ABC"){c+=" sp"}
else if(layer==="a"&&shift)l=k.toUpperCase();
return '<div class="'+c+'" data-k="'+esc(k)+'">'+esc(l)+'</div>'}
function render(){var rows=layer==="a"?A:layer==="s"?S:E,h='<div class="tkh"><span>★ TÕÕLé · FASO KEY</span><b data-k="HIDE">▼</b></div>';
rows.concat([B[layer]]).forEach(function(r){h+='<div class="tkr">';r.forEach(function(k){h+=key(k)});h+='</div>'});
kb.innerHTML=h}
function cur(){var v=null;for(var j=0;j<IDS.length;j++){var e=document.getElementById(IDS[j]);if(e&&e.offsetParent!==null){if(e===document.activeElement)return e;if(!v)v=e}}return v}
function setV(i,v){i.value=v;i.dispatchEvent(new Event("input",{bubbles:true}))}
function sendBtn(i){var e=i.parentElement,n=0;while(e&&n<4){var bs=e.querySelectorAll("button,[role=button]");
for(var k=0;k<bs.length;k++){var b=bs[k],s=b.id+" "+b.className+" "+(b.getAttribute("onclick")||"")+" "+(b.getAttribute("aria-label")||"")+" "+b.textContent;
if(/send|envo|snd|➤|▶|➔|→/i.test(s)&&!/vo[ci]|mic|rec|audio|emoji|photo|file|attach/i.test(s))return b}
e=e.parentElement;n++}return null}
function send(i){var b=sendBtn(i);if(b){b.click();return}
["keydown","keypress","keyup"].forEach(function(t){i.dispatchEvent(new KeyboardEvent(t,{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true}))})}
function bar(i){var e=i.parentElement;while(e&&e!==document.body){var p=getComputedStyle(e).position;if(p==="fixed"||p==="absolute"||p==="sticky")return e;e=e.parentElement}return i.parentElement}
function drop(){if(lifted){lifted.style.transform="";lifted=null}}
function lift(){drop();var i=cur();if(!i)return;var b=bar(i);if(!b)return;var r=i.getBoundingClientRect(),over=r.bottom-(innerHeight-kb.offsetHeight)+6;
if(over>0){b.style.transition="transform .15s";b.style.transform="translateY(-"+over+"px)";lifted=b}}
function show(){kb.style.display="block";setTimeout(lift,60)}
function hide(){kb.style.display="none";drop()}
function press(k){
if(k==="HIDE"){hide();return}
if(k==="SH"){shift=!shift;render();return}
if(k==="123"){layer="s";render();return}
if(k==="ABC"){layer="a";render();return}
if(k==="EM"){layer="e";render();return}
var i=cur();if(!i)return;
if(k==="BS"){setV(i,Array.from(i.value).slice(0,-1).join(""));return}
if(k==="OK"){send(i);return}
var ch=k==="SP"?" ":(layer==="a"&&shift?k.toUpperCase():k);
setV(i,i.value+ch);
if(shift&&layer==="a"){shift=false;render()}}
function stop(){clearTimeout(rt);clearInterval(rep);if(kb){var a=kb.querySelectorAll(".p");for(var j=0;j<a.length;j++)a[j].classList.remove("p")}}
function lock(i){if(i.hasAttribute("readonly"))return;i.setAttribute("readonly","readonly");i.setAttribute("inputmode","none");i.setAttribute("autocomplete","off");if(document.activeElement===i)i.blur()}
function lockAll(){IDS.forEach(function(id){var e=document.getElementById(id);if(e)lock(e)})}
function init(){var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
kb=document.createElement("div");kb.id="tkb";document.body.appendChild(kb);render();lockAll();setInterval(lockAll,700);
document.addEventListener("pointerdown",function(e){var t=e.target;
if(kb.contains(t)){e.preventDefault();var k=t.closest("[data-k]");if(!k)return;var v=k.getAttribute("data-k");k.classList.add("p");press(v);
if(v==="BS"){clearTimeout(rt);clearInterval(rep);rt=setTimeout(function(){rep=setInterval(function(){press("BS")},55)},380)}return}
if(t&&t.id&&IDS.indexOf(t.id)>-1){lock(t);show()}},true);
["pointerup","pointercancel","pointerleave"].forEach(function(ev){document.addEventListener(ev,stop,true)})}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();
