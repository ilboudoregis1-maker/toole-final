(function(){
if(window.__tcw)return;window.__tcw=1;
function clean(){
 [].forEach.call(document.querySelectorAll('#scrChat .bar button[aria-label="Photo"],#scrGroup .bar button[aria-label="Photo"]'),function(b){b.style.setProperty('display','none','important')});
}
new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});clean();
})();
