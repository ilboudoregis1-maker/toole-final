(function(){
var C=[["Salut","smile","wave","sway"],["MDR","laugh","tears","shake"],["Love","smile","hearts","pulse"],["Bravo","big","stars","jump"],["Barka","smile","pray","bow"],["Dodo","sleep","zzz","breathe"],["Cool","smile","shades","bounce"],["Wow","o","bang","pop"]];
var K='*{transform-box:fill-box;transform-origin:center}'+
'@keyframes sway{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}'+
'@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-6px) rotate(-5deg)}75%{transform:translateX(6px) rotate(5deg)}}'+
'@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}'+
'@keyframes jump{0%,100%{transform:translateY(0)}35%,60%{transform:translateY(-16px)}}'+
'@keyframes bow{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(6px) rotate(9deg)}}'+
'@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05,.97)}}'+
'@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}'+
'@keyframes pop{0%,100%{transform:scale(1)}30%{transform:scale(1.13)}60%{transform:scale(.96)}}'+
'@keyframes blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}'+
'@keyframes wave{from{transform:rotate(-18deg)}to{transform:rotate(26deg)}}'+
'@keyframes fl{0%{transform:translateY(0) scale(.6);opacity:0}25%{opacity:1}100%{transform:translateY(-46px) scale(1.1);opacity:0}}'+
'@keyframes tw{0%,100%{transform:scale(.3);opacity:.2}50%{transform:scale(1.15);opacity:1}}'+
'@keyframes dr{0%{transform:translateY(0);opacity:1}100%{transform:translateY(28px);opacity:0}}'+
'.e{animation:blink 3.2s infinite}.w{transform-origin:15% 90%;animation:wave .55s ease-in-out infinite alternate}'+
'.f{animation:fl 1.9s ease-in infinite}.t{animation:tw 1.3s ease-in-out infinite}.d{animation:dr 1.1s ease-in infinite}';
var EY='<g class="e"><ellipse cx="75" cy="84" rx="9" ry="11" fill="#fff"/><ellipse cx="125" cy="84" rx="9" ry="11" fill="#fff"/><circle cx="77" cy="86" r="5" fill="#0b1b2b"/><circle cx="123" cy="86" r="5" fill="#0b1b2b"/></g>';
var SL='<path d="M66 86q9 8 18 0M116 86q9 8 18 0" stroke="#0b1b2b" stroke-width="5" fill="none" stroke-linecap="round"/>';
var MO={smile:'<path d="M84 110q16 16 32 0" stroke="#0b1b2b" stroke-width="5" fill="none" stroke-linecap="round"/>',
big:'<path d="M80 104q20 30 40 0z" fill="#0b1b2b"/><ellipse cx="100" cy="119" rx="9" ry="5" fill="#ff6b81"/>',
laugh:'<path d="M80 104q20 30 40 0z" fill="#0b1b2b"/><ellipse cx="100" cy="119" rx="9" ry="5" fill="#ff6b81"/>',
sleep:'<path d="M92 112q8 6 16 0" stroke="#0b1b2b" stroke-width="5" fill="none" stroke-linecap="round"/>',
o:'<ellipse cx="100" cy="114" rx="9" ry="11" fill="#0b1b2b"/>'};
function heart(x,y,d){return '<g transform="translate('+x+' '+y+')"><path class="f" style="animation-delay:'+d+'s" d="M0 -3C-4 -11 -15 -5 0 10C15 -5 4 -11 0 -3z" fill="#ff4d6d"/></g>'}
function star(x,y,d){return '<g transform="translate('+x+' '+y+')"><path class="t" style="animation-delay:'+d+'s" d="M0-13L3-3 13 0 3 3 0 13-3 3-13 0-3-3z" fill="#ffd43b"/></g>'}
function EX(k){
if(k==="wave")return '<g class="w"><path d="M164 100q20-4 26-30" stroke="#2f9bff" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="191" cy="64" r="11" fill="#ffd6a8"/></g>';
if(k==="hearts")return heart(152,48,0)+heart(46,52,.6)+heart(100,22,1.2);
if(k==="stars")return star(160,40,0)+star(42,46,.4)+star(100,16,.8);
if(k==="tears")return '<path class="d" d="M62 98q-6 10 0 14q6-4 0-14z" fill="#7fd4ff"/><path class="d" style="animation-delay:.5s" d="M138 98q-6 10 0 14q6-4 0-14z" fill="#7fd4ff"/>';
if(k==="pray")return '<path d="M100 172L82 144q18-16 18 0q0-16 18 0z" fill="#ffd6a8"/>';
if(k==="zzz")return '<text class="f" x="150" y="50" font-size="26" font-weight="800" fill="#5b7da8">Z</text><text class="f" style="animation-delay:.9s" x="168" y="30" font-size="18" font-weight="800" fill="#5b7da8">z</text>';
if(k==="bang")return '<text class="f" x="146" y="56" font-size="46" font-weight="800" fill="#ff4d6d">!</text>';
return ""}
var cache={};
function svg(i){var c=C[i];if(!c)return"";if(cache[i])return cache[i];
var eyes=c[1]==="sleep"?SL:EY,sh=c[2]==="shades"?'<path d="M58 74h38v22q-19 9-38 0zM104 74h38v22q-19 9-38 0z" fill="#0b1b2b"/><path d="M96 80h8v4h-8z" fill="#0b1b2b"/><path d="M64 80l12 0" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>':"";
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 216"><style>'+K+'</style><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cb8ff"/><stop offset="1" stop-color="#0a7cff"/></linearGradient></defs>'+
'<ellipse cx="100" cy="182" rx="46" ry="7" fill="#0a1f44" opacity=".15"/>'+
'<g style="animation:'+c[3]+' 1.3s ease-in-out infinite"><path d="M100 24c40 0 72 28 72 66s-32 66-72 66c-9 0-17-1-25-3l-30 20 8-32C31 129 28 111 28 90c0-38 32-66 72-66z" fill="url(#g)"/><ellipse cx="70" cy="52" rx="22" ry="10" fill="#fff" opacity=".28" transform="rotate(-25 70 52)"/>'+
eyes+'<circle cx="60" cy="108" r="8" fill="#ff9fb5" opacity=".6"/><circle cx="140" cy="108" r="8" fill="#ff9fb5" opacity=".6"/>'+MO[c[1]]+sh+'</g>'+EX(c[2])+
'<text x="100" y="208" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="800" fill="#fff" stroke="#0b2a3a" stroke-width="5" paint-order="stroke" stroke-linejoin="round">'+c[0]+'</text></svg>';
return cache[i]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}
window.__tmasc=svg;window.__tmasc_n=C.length;window.__tmasc_lab=C.map(function(r){return r[0]});
})();
