(function(){
if(window.__tkb)return;window.__tkb=1;
var IDS=["txt","gTxt"],shift=false,layer="a",kb=null,lifted=null,rep=null,rt=null,busy=false,mic=false,micT=null,lastFix=null,ign={};
try{ign=JSON.parse(localStorage.getItem("tkb_ign")||"{}")}catch(e){}
var A=[["a","z","e","r","t","y","u","i","o","p"],["q","s","d","f","g","h","j","k","l","m"],["SH","w","x","c","v","b","n","BS"]];
var S=[["1","2","3","4","5","6","7","8","9","0"],["@","#","€","&","_","-","+","(",")","/"],["*","\"","'",":",";","!","?","%","BS"]];
var E=[["😀","😂","😍","🥰","😎","🤔","😢","😭"],["👍","🙏","💪","🔥","❤️","🎉","✨","💯"],["😅","😉","😘","🤝","👏","😴","😡","BS"]];
var B={a:["123","EM","MIC",",","SP",".","OK"],s:["ABC","EM","MIC",",","SP",".","OK"],e:["ABC","MIC","SP","OK"]};
var CSS="#tkb{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:none;background:#06090e;border-top:2px solid #FCD116;padding:0 3px calc(4px + env(safe-area-inset-bottom,0px));font-family:system-ui,sans-serif;-webkit-user-select:none;user-select:none;touch-action:manipulation;box-shadow:0 -6px 22px rgba(0,158,73,.35)}"
+".tkh{display:flex;justify-content:space-between;align-items:center;height:22px;padding:0 8px;font-size:11px;letter-spacing:2px;color:#FCD116;background:linear-gradient(90deg,#EF2B2D,#06090e 35%,#06090e 65%,#009E49);margin:0 -3px 2px}"
+".tkh b{color:#fff;padding:0 8px;font-size:13px}.tkr{display:flex}"
+".k{flex:1;margin:2px;height:38px;border-radius:9px;border:1px solid rgba(0,200,110,.45);background:linear-gradient(#131c27,#0a1018);color:#e9fff4;font-size:17px;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 8px rgba(0,158,73,.25)}"
+".k.p{background:#009E49;color:#fff}.k.sp{flex:1.5;color:#FCD116;border-color:rgba(252,209,22,.55)}.k.on{background:#FCD116;color:#000}.k.rec{background:#EF2B2D;color:#fff;border-color:#EF2B2D}"
+".k.spc{flex:4;font-size:13px;letter-spacing:3px;color:#9fe8c0}"
+".k.snd{flex:2;background:linear-gradient(135deg,#EF2B2D,#a30f17);border-color:#EF2B2D;color:#fff;font-size:20px}";
function esc(s){return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}
function LANG(){var l=(document.documentElement.lang||navigator.language||"fr").toLowerCase();return l.indexOf("en")===0?"en-US":"fr-FR"}
function norm(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function lev(a,b){var m=a.length,n=b.length,d=[],i,j;for(i=0;i<=m;i++)d[i]=[i];for(j=1;j<=n;j++)d[0][j]=j;
for(i=1;i<=m;i++)for(j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n]}
function key(k){var c="k",l=k;
if(k==="SH"){l="⇧";c+=" sp"+(shift?" on":"")}
else if(k==="BS"){l="⌫";c+=" sp"}
else if(k==="SP"){l="TÕÕLé";c+=" spc"}
else if(k==="OK"){l="➤";c+=" snd"}
else if(k==="EM"){l="😊";c+=" sp"}
else if(k==="MIC"){l="🎤";c+=" sp"+(mic?" rec":"")}
else if(k==="123"||k==="ABC"){c+=" sp"}
else if(layer==="a"&&shift)l=k.toUpperCase();
return '<div class="'+c+'" data-k="'+esc(k)+'">'+esc(l)+'</div>'}
function render(){var rows=layer==="a"?A:layer==="s"?S:E,h='<div class="tkh"><span>★ TÕÕLé · FASO KEY</span><b data-k="HIDE">▼</b></div>';
rows.concat([B[layer]]).forEach(function(r){h+='<div class="tkr">';r.forEach(function(k){h+=key(k)});h+='</div>'});
kb.innerHTML=h}
function hint(t){var s=kb&&kb.querySelector(".tkh span");if(!s)return;s.textContent=t;setTimeout(function(){if(kb&&kb.querySelector(".tkh span"))render()},2300)}
function cur(){var v=null;for(var j=0;j<IDS.length;j++){var e=document.getElementById(IDS[j]);if(e&&e.offsetParent!==null){if(e===document.activeElement)return e;if(!v)v=e}}return v}
function setV(i,v,p){i.value=v;try{i.setSelectionRange(p,p)}catch(e){}i.dispatchEvent(new Event("input",{bubbles:true}))}
function ins(i,ch){var v=i.value,s=i.selectionStart,e=i.selectionEnd;if(s==null){s=e=v.length}setV(i,v.slice(0,s)+ch+v.slice(e),s+ch.length)}
function del(i){var v=i.value,s=i.selectionStart,e=i.selectionEnd;if(s==null){s=e=v.length}
if(s!==e){setV(i,v.slice(0,s)+v.slice(e),s);return}
if(s===0)return;var a=Array.from(v.slice(0,s));a.pop();var h=a.join("");setV(i,h+v.slice(s),h.length)}
function auto(i){if(!i||layer!=="a")return;var c=i.selectionStart,b=i.value.slice(0,c==null?i.value.length:c),n=/(^|[.!?]\s+)$/.test(b);if(n!==shift){shift=n;render()}}
function spell(w,cb){if(!window.TooleDict||busy)return;busy=true;var n=0;
try{TooleDict.fix(w,LANG())}catch(e){busy=false;return}
var t=setInterval(function(){var r="";try{r=TooleDict.fixResult(w)}catch(e){r="="}
if(r||++n>9){clearInterval(t);busy=false;if(r&&r!=="=")cb(r)}},100)}
function afterSep(i,sep){var v=i.value,c=i.selectionStart;if(c==null)return;
var before=v.slice(0,c-1),m=before.match(/[\p{L}]+$/u);if(!m)return;
var w=m[0],st=before.length-w.length,prev=before.slice(0,st);
if(w.length<4||ign[w.toLowerCase()]||w===w.toUpperCase())return;
if(/[\d@#\/.:_-]$/.test(prev))return;
var cap=w[0]!==w[0].toLowerCase();
if(cap&&!/(^|[.!?]\s*)$/.test(prev))return;
spell(w,function(s){var x=i.value;
if(x.substr(st,w.length+1)!==w+sep)return;
var f=cap?s[0].toUpperCase()+s.slice(1):s;
if(f===w||/\s/.test(f))return;
var a=norm(f),b=norm(w);if(a[0]!==b[0]||lev(a,b)>2)return;
var cp=i.selectionStart;if(cp==null)cp=x.length;
setV(i,x.slice(0,st)+f+sep+x.slice(st+w.length+1),cp+(f.length-w.length));
lastFix={st:st,orig:w,fixed:f,sep:sep}})}
function undoFix(i){var f=lastFix;lastFix=null;var v=i.value,c=i.selectionStart,e=i.selectionEnd;
if(c!==e||c!==f.st+f.fixed.length+1)return false;
if(v.substr(f.st,f.fixed.length+1)!==f.fixed+f.sep)return false;
ign[f.orig.toLowerCase()]=1;try{localStorage.setItem("tkb_ign",JSON.stringify(ign))}catch(e){}
setV(i,v.slice(0,f.st)+f.orig+f.sep+v.slice(c),f.st+f.orig.length+1);return true}
function sendBtn(i){var e=i.parentElement,n=0;while(e&&n<4){var bs=e.querySelectorAll("button,[role=button]");
for(var k=0;k<bs.length;k++){var b=bs[k],s=b.id+" "+b.className+" "+(b.getAttribute("onclick")||"")+" "+(b.getAttribute("aria-label")||"")+" "+b.textContent;
if(/send|envo|snd|➤|▶|➔|→/i.test(s)&&!/vo[ci]|mic|rec|audio|emoji|photo|file|attach/i.test(s))return b}
e=e.parentElement;n++}return null}
function send(i){var b=sendBtn(i);if(b){b.click();return}
["keydown","keypress","keyup"].forEach(function(t){i.dispatchEvent(new KeyboardEvent(t,{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:true}))})}
function bar(i){var e=i.parentElement;while(e&&e!==document.body){var p=getComputedStyle(e).position;if(p==="fixed"||p==="absolute"||p==="sticky")return e;e=e.parentElement}return i.parentElement}
function drop(){if(!lifted)return;if(lifted.m==="p")lifted.e.style.paddingBottom=lifted.e.__pb||"";else lifted.e.style.transform="";lifted=null}
function lift(){drop();var i=cur();if(!i)return;var b=bar(i);if(!b)return;var H=kb.offsetHeight;
if(b.offsetHeight>innerHeight*0.6){b.__pb=b.style.paddingBottom;b.style.boxSizing="border-box";b.style.paddingBottom=H+"px";lifted={e:b,m:"p"}}
else{var r=i.getBoundingClientRect(),over=r.bottom-(innerHeight-H)+6;if(over>0){b.style.transition="transform .15s";b.style.transform="translateY(-"+over+"px)";lifted={e:b,m:"t"}}}}
function show(){kb.style.display="block";auto(cur());setTimeout(lift,60)}
function hide(){kb.style.display="none";drop()}
function micStop(msg){clearInterval(micT);mic=false;render();if(msg)hint(msg)}
function micToggle(){
if(!window.TooleDict){hint("DICTÉE INDISPONIBLE (REDÉMARRE L'APP)");return}
if(mic){try{TooleDict.stop()}catch(e){}return}
var i=cur();if(!i)return;
var c=i.selectionStart;if(c==null)c=i.value.length;
var pre=i.value.slice(0,c),post=i.value.slice(c),idle=0;
mic=true;render();
try{TooleDict.start(LANG())}catch(e){micStop("DICTÉE INDISPONIBLE");return}
micT=setInterval(function(){var r="end|";try{r=TooleDict.poll()}catch(e){}
var k=r.indexOf("|"),st=r.slice(0,k),tx=r.slice(k+1);
if(tx){var sp=pre&&!/\s$/.test(pre)?" ":"",head=pre+sp+tx;setV(i,head+post,head.length)}
if(st==="perm"){micStop("AUTORISE LE MICRO PUIS RÉESSAIE");return}
if(st==="na"){micStop("DICTÉE INDISPONIBLE");return}
if(st==="end"){micStop();auto(i);return}
if(st==="idle"&&++idle>24)micStop()},250)}
function press(k){
if(k==="HIDE"){hide();return}
if(k==="SH"){shift=!shift;render();return}
if(k==="123"){layer="s";render();return}
if(k==="ABC"){layer="a";render();auto(cur());return}
if(k==="EM"){layer="e";render();return}
if(k==="MIC"){micToggle();return}
var i=cur();if(!i)return;
if(k==="BS"){if(!(lastFix&&undoFix(i)))del(i);auto(i);return}
lastFix=null;
if(k==="OK"){send(i);return}
var ch=k==="SP"?" ":(layer==="a"&&shift?k.toUpperCase():k);
ins(i,ch);
if(" .,!?;:".indexOf(ch)>-1)afterSep(i,ch);
auto(i)}
function stop(){clearTimeout(rt);clearInterval(rep);if(kb){var a=kb.querySelectorAll(".p");for(var j=0;j<a.length;j++)a[j].classList.remove("p")}}
function lock(i){if(i.hasAttribute("readonly"))return;i.setAttribute("readonly","readonly");i.setAttribute("inputmode","none");i.setAttribute("autocomplete","off");if(document.activeElement===i)i.blur()}
function lockAll(){IDS.forEach(function(id){var e=document.getElementById(id);if(e)lock(e)});if(kb&&kb.style.display==="block"&&!cur())hide()}
function init(){var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
kb=document.createElement("div");kb.id="tkb";document.body.appendChild(kb);render();lockAll();setInterval(lockAll,700);document.addEventListener("focusin",function(e){var t=e.target;if(t.id&&IDS.indexOf(t.id)>-1){lock(t);show()}},true);if(location.search.indexOf("bulle=1")>-1){var tr=0,ti=setInterval(function(){if(cur()){show();clearInterval(ti)}else if(++tr>40)clearInterval(ti)},250)}
document.addEventListener("pointerdown",function(e){var t=e.target;
if(kb.contains(t)){e.preventDefault();var k=t.closest("[data-k]");if(!k)return;var v=k.getAttribute("data-k");k.classList.add("p");press(v);
if(v==="BS"){clearTimeout(rt);clearInterval(rep);rt=setTimeout(function(){rep=setInterval(function(){press("BS")},55)},380)}return}
if(t&&t.id&&IDS.indexOf(t.id)>-1){lock(t);show()}},true);
["pointerup","pointercancel","pointerleave"].forEach(function(ev){document.addEventListener(ev,stop,true)})}
if(document.body)init();else document.addEventListener("DOMContentLoaded",init);
})();
