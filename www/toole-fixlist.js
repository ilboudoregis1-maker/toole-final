/* TÕÕLé - la liste des discussions revient toujours apres Non lus / Contacts */
(function(){
function w(){var s=window.setChip;if(typeof s!=="function"||s.__fl)return;
var f=function(i){if(i!==0){var r=Document.prototype.getElementById.call(document,"recent");if(r)r.dataset.sig=""}return s.apply(this,arguments)};
f.__fl=1;window.setChip=f}
w();setInterval(w,1000);
})();
