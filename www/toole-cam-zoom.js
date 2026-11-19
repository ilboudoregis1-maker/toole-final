(function(){var md=navigator.mediaDevices;if(!md||!md.getUserMedia||window.__tcz)return;window.__tcz=1;
var o=md.getUserMedia.bind(md);
md.getUserMedia=function(c){return o(c).then(function(st){try{st.getVideoTracks().forEach(function(t){var cp=t.getCapabilities&&t.getCapabilities();if(cp&&cp.zoom&&t.applyConstraints)t.applyConstraints({advanced:[{zoom:cp.zoom.min}]}).catch(function(){})})}catch(e){}return st})}})();
