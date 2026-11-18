/* TÕÕLé HI-TECH 2 : stickers animés légers, médias partagés, photo d'appel */
(function(){"use strict";
if(window.__ht2)return;window.__ht2=1;
var $=function(i){return document.getElementById(i)},PFX="🎭stx:",RC="tsx_rec";
var CATS=[["f","😂"],["l","❤️"],["a","🤝"],["h","📖"],["i","🤖"]];
var RAW=["f1|😂|MDR|#ffd166|#ff9a3c|k|😂,🤣","f2|🤪|Fou|#ff9a8b|#ff6a88|w|✨,⭐","f3|🤣|Je pleure|#a8edea|#5ec8d8|j|💧,😂","f4|😎|Trop cool|#8ec5fc|#4a7bd0|g|✨,⭐","f5|🙄|Pfff|#d4c4ff|#8a6fe8|g|💨,💨","f6|🤡|Clown|#ffd9a0|#ff6a00|b|🎈,🎉","f7|💀|Mort de rire|#cfd9e8|#7a8aa6|k|😂,💀","f8|🥳|Fête|#ffe29f|#ef6a2d|t|🎉,🎊",
"l1|😍|Love|#ffc2dd|#ff5f9e|h|❤️,💕","l2|😘|Bisou|#ffd1dc|#ff7aa2|b|💋,❤️","l3|🥰|Adorable|#ffe0ec|#ff8fb8|f|💗,✨","l4|💘|Coup de cœur|#ffb3c9|#ff4d86|h|💖,💘","l5|🌹|Pour toi|#ffc9c9|#e5484d|g|🌹,💕","l6|🤗|Câlin|#ffe8b3|#ffb347|j|💞,🤍","l7|💍|Marions-nous|#e6dcff|#9b7bff|t|💐,✨","l8|😻|Miaou love|#ffd6e7|#ff6fa5|b|💕,🐾",
"a1|🤝|Frère|#b8d4ff|#4a7bd0|p|💙,✨","a2|👯|Les amis|#c9f7ff|#00bcd4|w|🎶,✨","a3|🫶|Merci|#bdeaff|#1769ff|h|💙,🙏","a4|🥂|Santé|#ffe9a8|#f0a500|t|🍾,✨","a5|🤞|Courage|#c4f2cf|#3cc46a|b|🍀,✨","a6|🙌|Bravo|#ffd8a0|#ff8a3c|p|👏,🎉","a7|💪|Ensemble|#ffc2a8|#ff6a3c|p|🔥,💪","a8|🫂|Je suis là|#fff0b3|#f5c542|j|💛,🤍",
"h1|📖|Il était une fois|#e6d3b3|#b8864a|x|✨,📜","h2|😱|Plot twist|#d4c4ff|#6f4ae8|k|⚡,❗","h3|🍿|Je regarde|#ffe29f|#ef8a2d|b|🍿,👀","h4|🕵️|Suspense|#cfd9e8|#4a5f80|g|❓,🔍","h5|🤯|Choc|#ffc2c2|#e5484d|p|💥,✨","h6|😴|Ennuyé|#d6e4ff|#6a8fd8|f|💤,💤","h7|🎬|Action !|#c8c8d4|#3a3a52|l|🎥,⭐","h8|🏁|Fin|#c9f7d6|#2ea85a|t|🎉,🏁",
"i1|🤖|Robot|#c9e4ff|#2f7bff|b|⚡,💡","i2|🧠|Je réfléchis|#ffd1e6|#d6498f|h|💭,✨","i3|✨|Magie IA|#e2d4ff|#7b4ae8|s|✨,⭐","i4|💡|Idée|#fff3b0|#f5c542|l|💡,✨","i5|🔮|Prédiction|#e0d0ff|#8a5ce8|f|✨,🔮","i6|🚀|Futur|#c9d6ff|#3a4fd0|f|🔥,⭐","i7|👾|Game over|#cfc4ff|#5a3ad0|w|🕹️,💥","i8|🦾|Power|#d0d8e4|#5a6f8a|p|⚙️,⚡"];
var S={};RAW.forEach(function(r){var a=r.split("|");S[a[0]]={e:a[1],c:a[2],c1:a[3],c2:a[4],a:a[5],p:a[6].split(",")}});
function mk(id,sm){var s=S[id];if(!s)return null;var d=document.createElement("span");d.className="ns ns-"+s.a+(sm?" sm":"");d.style.setProperty("--c1",s.c1);d.style.setProperty("--c2",s.c2);
 d.innerHTML='<i class="p p1">'+s.p[0]+'</i><i class="p p2">'+(s.p[1]||s.p[0])+'</i><b class="e">'+s.e+'</b><u class="c">'+s.c+'</u>';return d}
function scan(root){var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n,a=[];while(n=w.nextNode())if(n.nodeValue.indexOf(PFX)>-1)a.push(n);
 a.forEach(function(n){var par=n.parentNode,v=n.nodeValue.trim();
  if(par&&par.classList&&par.classList.contains("m")&&v.indexOf(PFX)===0){var el=mk(v.slice(PFX.length));if(!el){n.nodeValue="🎭 Sticker";return}par.classList.add("tsstk");par.replaceChild(el,n)}
  else n.nodeValue=n.nodeValue.replace(/🎭stx:\S*/g,"🎭 Sticker")})}
function jget(k){try{return JSON.parse(localStorage.getItem(k)||"[]")}catch(e){return[]}}
function chatScr(){var g=$("scrGroup"),c=$("scrChat");if(g&&!g.classList.contains("hide"))return g;if(c&&!c.classList.contains("hide"))return c;return null}
function send(b){var s=chatScr();if(!s){if(window.toast)toast("Ouvre une discussion");return}
 var inp=s.querySelector(".bar input:not([type=file])"),btn=s.querySelector("#send,#gSend,.bar .send");if(!inp||!btn)return;
 var d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value"),old=inp.value;d.set.call(inp,b);inp.dispatchEvent(new Event("input",{bubbles:true}));btn.click();
 setTimeout(function(){if(d.get.call(inp)===b)d.set.call(inp,old)},400);
 var r=jget(RC).filter(function(x){return x!==b});r.unshift(b);try{localStorage.setItem(RC,JSON.stringify(r.slice(0,12)))}catch(e){}}
function tray(start){var ov=document.createElement("div");ov.className="htov";var sh=document.createElement("div");sh.className="htsh";
 var tabs=document.createElement("div");tabs.className="httabs";var grid=document.createElement("div");grid.className="htgrid";
 function close(){ov.remove()}ov.onclick=function(e){if(e.target===ov)close()};
 var T=[["🕘","r"],["🧷","p"],["⭐","m"]];
 function show(k){if(k==="p"||k==="m"){close();if(window.__tstk)window.__tstk.tray(k==="p"?1:2);return}
  [].forEach.call(tabs.children,function(x,i){x.className=T[i][1]===k?"on":""});grid.innerHTML="";
  var ids=k==="r"?jget(RC).map(function(x){return x.slice(PFX.length)}).filter(function(i){return S[i]}):Object.keys(S).filter(function(i){return i[0]===k});
  if(!ids.length){grid.textContent="Aucun sticker récent";return}
  ids.forEach(function(id){var b=document.createElement("button");b.appendChild(mk(id,true));b.onclick=function(){close();send(PFX+id)};grid.appendChild(b)})}
 T.forEach(function(t){var b=document.createElement("button");b.textContent=t[0];b.onclick=function(){show(t[1])};tabs.appendChild(b)});
 sh.appendChild(tabs);sh.appendChild(grid);ov.appendChild(sh);document.body.appendChild(ov);show(start||(jget(RC).some(function(x){return S[x.slice(PFX.length)]})?"r":"p"))}
function btns(){document.querySelectorAll(".tsstkbtn").forEach(function(b){if(!b.__n){b.__n=1;b.onclick=function(){tray()}}})}
function collect(box){var o={m:[],f:[],l:[],a:[]};box.querySelectorAll(".m").forEach(function(m){
 var t=(m.querySelector(".t")||{}).textContent||"";
 var v=m.querySelector(".tmv");if(v)o.m.push({m:m,v:1,d:(v.querySelector(".du")||{}).textContent||""});
 m.querySelectorAll("img").forEach(function(im){if(im.classList.contains("tsimg")||im.closest(".ns"))return;o.m.push({m:m,s:im.src})});
 var f=m.querySelector(".tmf");if(f)o.f.push({m:m,x:(f.textContent||"").trim().slice(0,60)||"Fichier",t:t});
 if(m.querySelector(".vbub,audio"))o.a.push({m:m,t:t});
 var tx=m.firstChild&&m.firstChild.nodeType===3?m.firstChild.nodeValue:"",ls=tx.match(/https?:\/\/[^\s]+/g);if(ls)ls.forEach(function(u){o.l.push({m:m,x:u,t:t})})});return o}
function gallery(){var s=$("scrChat");if(!s||s.classList.contains("hide"))return;var box=$("chat"),D=collect(box);
 var g=document.createElement("div");g.id="htGal";
 g.innerHTML='<div class="htg-h"><button id="htgX">←</button><b>Partage de média</b></div><div class="htg-t"></div><div class="htg-b"></div>';
 var tabs=g.querySelector(".htg-t"),body=g.querySelector(".htg-b");
 function go(m){g.remove();m.scrollIntoView({block:"center"});m.classList.add("flash");setTimeout(function(){m.classList.remove("flash")},1700)}
 function show(k){[].forEach.call(tabs.children,function(x){x.className=x.dataset.k===k?"on":""});body.innerHTML="";var L=D[k];
  if(!L.length){body.innerHTML='<div class="htg-e">Rien à afficher pour le moment.</div>';return}
  var w=document.createElement("div");w.className=k==="m"?"htg-g":"htg-l";
  L.forEach(function(it){var b=document.createElement("button");
   if(k==="m"){if(it.s)b.style.backgroundImage='url("'+it.s.replace(/"/g,"%22")+'")';else b.textContent="▶";if(it.d){var sp=document.createElement("span");sp.textContent=it.d;b.appendChild(sp)}}
   else b.textContent=(k==="f"?"📎 ":k==="a"?"🎤 Message vocal · ":"🔗 ")+(it.x||"")+(it.t&&k!=="l"?(it.x?" · ":"")+it.t:"");
   b.onclick=function(){go(it.m)};w.appendChild(b)});body.appendChild(w)}
 [["m","Médias"],["f","Fichiers"],["l","Liens"],["a","Audio"]].forEach(function(t){var b=document.createElement("button");b.dataset.k=t[0];b.textContent=t[1];b.onclick=function(){show(t[0])};tabs.appendChild(b)});
 g.querySelector("#htgX").onclick=function(){g.remove()};document.body.appendChild(g);show("m")}
function addG(){var h=document.querySelector("#scrChat .chead");if(!h||h.querySelector(".htgalb"))return;var b=document.createElement("button");b.type="button";b.className="htgalb";b.setAttribute("aria-label","Médias");
 b.innerHTML='<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>';b.onclick=gallery;h.appendChild(b)}
function cphoto(){var n=($("coName")||{}).textContent,a=$("coAv");if(!a||!n)return;var u="";
 try{var c=JSON.parse(localStorage.getItem("toole_avmap")||"{}"),id=(c.B||{})[n],p=id&&(c.P||{})[id];if(p&&p.v!=null){var b="https://jbjeqxubpqqypysfsubd.supabase.co";try{if(typeof URL==="string"&&/^https?:/.test(URL))b=URL}catch(e){}u=b+"/storage/v1/object/public/avatars/"+id+"/avatar.jpg?v="+p.v}}catch(e){}
 if(u){a.style.backgroundImage='url("'+u+'")';a.classList.add("ht-ph")}else{a.style.backgroundImage="";a.classList.remove("ht-ph")}}
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n);else if(n.nodeType===3&&n.nodeValue.indexOf(PFX)>-1&&n.parentNode)scan(n.parentNode)})});btns();addG()}).observe(document.body,{childList:true,subtree:true});
(function w(){var c=$("coName");if(!c){setTimeout(w,600);return}new MutationObserver(cphoto).observe(c,{childList:true,characterData:true,subtree:true})})();
scan(document.body);btns();addG();
})();
