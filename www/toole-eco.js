(function(){if(window.__teco)return;window.__teco=1;var si=window.setInterval;
window.setInterval=function(f,t){var a=[].slice.call(arguments,2);if(typeof f!=='function')return si.apply(window,arguments);
return si.apply(window,[function(){if(document.hidden)return;return f.apply(this,a)},t])}})();
