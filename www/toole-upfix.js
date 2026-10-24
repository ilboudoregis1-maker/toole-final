(function(){
function wait(ms){return new Promise(function(r){setTimeout(r,ms)})}
function wrap(){var o=window.tgUpload;if(typeof o!=="function"||o.__r)return;
var w=async function(b,p){var e;for(var i=0;i<3;i++){try{return await o(b,p)}catch(x){e=x;window.__tgErr=String(x&&x.message||x);
if(i<2)await wait(/tg-skip/.test(window.__tgErr)?4500:800)}}
try{toast("Serveur média : "+window.__tgErr)}catch(_){}throw e};
w.__r=1;window.tgUpload=w}
wrap();setInterval(wrap,500)})();
