(function(){
  "use strict";
  if(window.toolePay) return;
  window.toolePay=function(code){
    var c=String(code||"");
    if(window.TooleCall&&window.TooleCall.call){window.TooleCall.call(c);return}
    window.location.href="tel:"+encodeURIComponent(c);
  };
  document.addEventListener("click",function(e){
    var a=e.target&&e.target.closest&&e.target.closest('a[href^="tel:"]');
    if(!a) return;
    var code;
    try{code=decodeURIComponent(a.getAttribute("href").slice(4))}catch(x){return}
    if(code.indexOf("*144")!==0) return;
    e.preventDefault(); e.stopPropagation();
    window.toolePay(code);
  },true);
})();
