(function(){
var IDS=["txt","gTxt"];
function mine(t){return t&&t.id&&IDS.indexOf(t.id)>-1}
["touchstart","mousedown"].forEach(function(ev){document.addEventListener(ev,function(e){if(mine(e.target))e.preventDefault()},{capture:true,passive:false})});
document.addEventListener("focusin",function(e){var t=e.target;if(mine(t))setTimeout(function(){try{t.blur()}catch(x){}},0)},true);
[HTMLInputElement,HTMLTextAreaElement].forEach(function(C){var f=C.prototype.focus;C.prototype.focus=function(){if(mine(this)){try{this.dispatchEvent(new Event("focusin",{bubbles:true}))}catch(x){}return}return f.apply(this,arguments)}});
})();
