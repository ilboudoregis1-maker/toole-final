(function(){
var st=document.createElement("style");
st.textContent=":is(#scrChat,#scrGroup) .bar{height:auto!important;min-height:0!important;align-items:flex-end!important;display:flex!important}:is(#scrChat,#scrGroup) .bar .tsta{flex:1;min-width:0;resize:none;max-height:140px;min-height:44px;box-sizing:border-box;border-radius:22px;padding:11px 16px;font:inherit;line-height:1.35;background:var(--pro-surface2,#f1f5f9);color:var(--pro-ink,#0b2a3a);border:1px solid var(--pro-line,#dbe3ea);outline:none;overflow-y:auto}:is(#scrChat,#scrGroup) .bar .tsta:focus{border-color:var(--main,#7c3aed);box-shadow:0 0 0 3px rgba(124,58,237,.15)}";
document.head.appendChild(st);
function fix(){[].forEach.call(document.querySelectorAll("#scrChat .bar,#scrGroup .bar"),fix1)}function fix1(bar){
var inp=bar.querySelector("input[type=text],input:not([type]),input[type=search]");if(!inp||inp._ta)return;
var ta=document.createElement("textarea");ta.className="tsta";ta.rows=1;ta.placeholder=inp.placeholder||"Message";ta.setAttribute("autocomplete","off");
var d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value");
function grow(){ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight,140)+"px"}
ta.value=d.get.call(inp);
Object.defineProperty(inp,"value",{configurable:true,get:function(){return d.get.call(inp)},set:function(v){d.set.call(inp,v);ta.value=v;grow()}});
inp.focus=function(){ta.focus()};
ta.oninput=function(){d.set.call(inp,ta.value);grow();inp.dispatchEvent(new Event("input",{bubbles:true}))};
inp.style.cssText="position:absolute!important;opacity:0;pointer-events:none;width:1px;height:1px;left:-9999px";
inp._ta=ta;inp.parentNode.insertBefore(ta,inp);grow()}
new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});fix();
})();

(function(){var s=document.createElement("style");s.textContent=":is(#scrChat,#scrGroup) .bar{flex-wrap:wrap!important;justify-content:space-between!important;row-gap:8px!important}:is(#scrChat,#scrGroup) .bar .tsta{order:-1;flex:1 1 100%!important;min-width:100%!important}:is(#scrChat,#scrGroup) .bar>button{flex:0 0 auto}";document.head.appendChild(s)})();
