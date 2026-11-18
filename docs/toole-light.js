(function(){
var st=document.createElement("style");
st.textContent=".tslight{background:#fff!important;background-image:none!important;color:#0b2a3a!important;border-top:4px solid #00a8c8!important;box-shadow:0 -8px 30px rgba(0,168,200,.25)!important}.tslight *{color:#0b2a3a!important;text-shadow:none!important}.tslight div,.tslight li,.tslight span{background-color:transparent!important}.tslight button,.tslight [role=button]{background:#f1fcff!important;background-image:none!important;border:1px solid rgba(0,168,200,.4)!important;border-radius:14px!important;box-shadow:none!important}";
document.head.appendChild(st);
var RX=/\((30 s|2 Mo) max\)/;
function paint(root){
var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;
while(n=w.nextNode()){if(!RX.test(n.nodeValue))continue;
var e=n.parentElement,c=null;
while(e&&e!==document.body){var r=e.getBoundingClientRect();if(r.height>innerHeight*0.7)break;var cs=getComputedStyle(e);
if(r.width>innerWidth*0.8&&(cs.backgroundImage!=="none"||!/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)))c=e;e=e.parentElement}
if(c)c.classList.add("tslight")}}
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(nd){if(nd.nodeType===1&&RX.test(nd.textContent||""))paint(nd)})})}).observe(document.body,{childList:true,subtree:true});
})();
