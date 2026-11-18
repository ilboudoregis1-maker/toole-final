/* TÕÕLé - Pack de stickers animés (SVG vectoriels, générés par code) */
(function(){
if(window.__tsvg)return;
var INK='#0b1b2b',SKIN='#ffd6a8';
var K='*{transform-box:fill-box;transform-origin:center}'+
'@keyframes sway{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}'+
'@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-5px) rotate(-4deg)}75%{transform:translateX(5px) rotate(4deg)}}'+
'@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}'+
'@keyframes jump{0%,100%{transform:translateY(0)}35%,60%{transform:translateY(-14px)}}'+
'@keyframes bow{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(6px) rotate(8deg)}}'+
'@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04,.97)}}'+
'@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}'+
'@keyframes pop{0%,100%{transform:scale(1)}30%{transform:scale(1.12)}60%{transform:scale(.96)}}'+
'@keyframes wob{0%,100%{transform:rotate(0) scale(1)}20%{transform:rotate(-9deg) scale(1.04)}40%{transform:rotate(8deg)}60%{transform:rotate(-5deg)}80%{transform:rotate(3deg)}}'+
'@keyframes nod{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}'+
'@keyframes blink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}'+
'@keyframes wave{from{transform:rotate(-16deg)}to{transform:rotate(22deg)}}'+
'@keyframes fl{0%{transform:translateY(0) scale(.6);opacity:0}25%{opacity:1}100%{transform:translateY(-44px) scale(1.1);opacity:0}}'+
'@keyframes tw{0%,100%{transform:scale(.3);opacity:.2}50%{transform:scale(1.15);opacity:1}}'+
'@keyframes dr{0%{transform:translateY(0);opacity:1}100%{transform:translateY(30px);opacity:0}}'+
'@keyframes fa{0%{transform:translateY(-26px);opacity:0}15%{opacity:1}100%{transform:translateY(60px);opacity:1}}'+
'@keyframes fire{0%,100%{transform:scale(1,1)}50%{transform:scale(.9,1.15)}}'+
'@keyframes st{0%,100%{opacity:.25}50%{opacity:1}}'+
'@keyframes tap{0%,100%{transform:rotate(0)}50%{transform:rotate(-10deg)}}'+
'.sway{animation:sway 1.6s ease-in-out infinite}.shake{animation:shake .5s ease-in-out infinite}.pulse{animation:pulse 1s ease-in-out infinite}'+
'.jump{animation:jump 1.1s ease-in-out infinite}.bow{animation:bow 1.6s ease-in-out infinite}.breathe{animation:breathe 2.4s ease-in-out infinite}'+
'.bounce{animation:bounce .9s ease-in-out infinite}.pop{animation:pop 1.2s ease-in-out infinite}.wob{animation:wob 1.4s ease-in-out infinite}.nod{animation:nod 1s ease-in-out infinite}'+
'.e{animation:blink 3.4s infinite}.w{transform-origin:15% 90%;animation:wave .5s ease-in-out infinite alternate}'+
'.f{animation:fl 1.9s ease-in infinite}.t{animation:tw 1.3s ease-in-out infinite}.d{animation:dr 1.1s ease-in infinite}.fa{animation:fa 1.4s linear infinite}'+
'.fi{transform-origin:50% 100%;animation:fire .5s ease-in-out infinite}.st{animation:st 1.2s ease-in-out infinite}.tp{animation:tap .5s ease-in-out infinite}';

function T(x,y,s,d,c){return '<g transform="translate('+x+' '+y+')"><g class="'+c+'" style="animation-delay:'+d+'s">'+s+'</g></g>'}
var HEART='<path d="M0 -3C-4 -11 -15 -5 0 10C15 -5 4 -11 0 -3z" fill="#ff4d6d"/>';
var STAR='<path d="M0-12L3-3 12 0 3 3 0 12-3 3-12 0-3-3z" fill="#ffd43b"/>';
var NOTE='<path d="M-4 8V-8l12-3v16" stroke="#6c4bd6" stroke-width="3" fill="none"/><ellipse cx="-7" cy="9" rx="5" ry="4" fill="#6c4bd6"/><ellipse cx="5" cy="5" rx="5" ry="4" fill="#6c4bd6"/>';
var DROP='<path d="M0-10Q-8 2 0 8Q8 2 0-10z" fill="#7fd4ff"/>';
var COIN='<circle r="9" fill="#ffc933" stroke="#e09a00" stroke-width="2"/><text y="4.5" font-size="12" font-weight="800" text-anchor="middle" fill="#b87400">F</text>';
var CONF=['#ff4d6d','#ffd43b','#33c27f','#4dabf7','#b36bff'];
function conf(n){var s='';for(var i=0;i<n;i++){var x=22+i*(156/(n-1||1)),c=CONF[i%5];s+=T(x,18+(i%3)*8,'<rect x="-4" y="-2.5" width="8" height="5" rx="1" fill="'+c+'" transform="rotate('+(i*37%90)+')"/>',(i*.23)%1.4,'fa')}return s}

var FX={
none:function(){return''},
hearts:function(){return T(150,46,HEART,0,'f')+T(48,50,HEART,.6,'f')+T(100,24,HEART,1.2,'f')},
stars:function(){return T(160,40,STAR,0,'t')+T(42,46,STAR,.4,'t')+T(100,18,STAR,.8,'t')},
tears:function(){return '<path class="d" d="M60 100q-7 12 0 16q7-4 0-16z" fill="#7fd4ff"/><path class="d" style="animation-delay:.5s" d="M140 100q-7 12 0 16q7-4 0-16z" fill="#7fd4ff"/>'},
sweat:function(){return T(150,54,DROP,0,'d')},
anger:function(){return T(150,48,'<path d="M-9-9L-2-2M9-9L2-2M-9 9L-2 2M9 9L2 2" stroke="#ff3b3b" stroke-width="4" stroke-linecap="round"/>',0,'pop')},
notes:function(){return T(156,50,NOTE,0,'f')+T(40,56,NOTE,.8,'f')},
zzz:function(){return '<text class="f" x="146" y="52" font-size="26" font-weight="800" fill="#5b7da8">Z</text><text class="f" style="animation-delay:.9s" x="166" y="30" font-size="18" font-weight="800" fill="#5b7da8">z</text>'},
confetti:function(){return conf(9)},
fire:function(){return T(100,26,'<path d="M0-16C8-6 14 0 8 12C4 16-4 16-8 12C-12 4-4-2 0-16z" fill="#ff7a1a"/><path d="M0-4C5 2 6 7 3 10C0 12-3 11-4 8C-5 4-1 2 0-4z" fill="#ffd43b"/>',0,'fi')+T(60,40,'<path d="M0-10C5-3 8 0 5 7C2 10-3 10-5 7C-6 2-2 0 0-10z" fill="#ff7a1a"/>',.2,'fi')+T(142,40,'<path d="M0-10C5-3 8 0 5 7C2 10-3 10-5 7C-6 2-2 0 0-10z" fill="#ff7a1a"/>',.4,'fi')},
rain:function(){return '<g><ellipse cx="100" cy="24" rx="40" ry="16" fill="#9fb3c8"/><circle cx="76" cy="26" r="14" fill="#9fb3c8"/><circle cx="124" cy="26" r="14" fill="#9fb3c8"/></g>'+T(76,40,DROP,0,'d')+T(100,44,DROP,.4,'d')+T(124,40,DROP,.8,'d')},
qmark:function(){return '<text class="t" x="148" y="52" font-size="44" font-weight="800" fill="#ff9f1c">?</text><text class="t" style="animation-delay:.6s" x="36" y="46" font-size="28" font-weight="800" fill="#ff9f1c">?</text>'},
bang:function(){return '<text class="pop" x="150" y="56" font-size="46" font-weight="800" fill="#ff4d6d">!</text>'},
coins:function(){return T(48,40,COIN,0,'f')+T(152,44,COIN,.5,'f')+T(100,22,COIN,1,'f')},
sun:function(){var r='';for(var i=0;i<8;i++){r+='<rect x="-2" y="-20" width="4" height="9" rx="2" fill="#ffc933" transform="rotate('+(i*45)+')"/>'}return T(160,38,r+'<circle r="9" fill="#ffc933"/>',0,'t')},
dots:function(){return '<g fill="#5b7da8"><circle class="st" cx="150" cy="44" r="5"/><circle class="st" style="animation-delay:.3s" cx="166" cy="44" r="5"/><circle class="st" style="animation-delay:.6s" cx="182" cy="44" r="5"/></g>'},
snow:function(){return T(44,34,'<text font-size="18" text-anchor="middle" fill="#7fd4ff">*</text>',0,'fa')+T(156,30,'<text font-size="18" text-anchor="middle" fill="#7fd4ff">*</text>',.7,'fa')},
shine:function(){return T(150,60,STAR,0,'t')+T(52,80,STAR,.7,'t')},
wind:function(){return '<path class="st" d="M20 40q22-8 40 0t36 0" stroke="#9fb3c8" stroke-width="5" fill="none" stroke-linecap="round"/><path class="st" style="animation-delay:.5s" d="M110 30q20-8 36 0t34 0" stroke="#9fb3c8" stroke-width="5" fill="none" stroke-linecap="round"/>'},
rainbow:function(){return '<g fill="none" stroke-width="6" stroke-linecap="round" class="t"><path d="M30 60a70 60 0 0 1 140 0" stroke="#ff4d6d"/><path d="M38 60a62 52 0 0 1 124 0" stroke="#ffb02e"/><path d="M46 60a54 44 0 0 1 108 0" stroke="#ffd43b"/><path d="M54 60a46 36 0 0 1 92 0" stroke="#33c27f"/><path d="M62 60a38 28 0 0 1 76 0" stroke="#4dabf7"/></g>'},
fireworks:function(){var b=function(x,y,c,d){var r='';for(var i=0;i<8;i++)r+='<path d="M0-6V-16" stroke="'+c+'" stroke-width="3.5" stroke-linecap="round" transform="rotate('+(i*45)+')"/>';return T(x,y,r,d,'t')};return b(44,40,'#ff4d6d',0)+b(156,34,'#ffd43b',.5)+b(100,18,'#4dabf7',1)},
check:function(){return T(152,46,'<circle r="14" fill="#33c27f"/><path d="M-6 0l4 5 8-10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',0,'pop')}

};

/* Yeux */
var EYE={
open:'<g class="e"><ellipse cx="78" cy="88" rx="9" ry="11" fill="#fff"/><ellipse cx="122" cy="88" rx="9" ry="11" fill="#fff"/><circle cx="80" cy="90" r="5" fill="'+INK+'"/><circle cx="120" cy="90" r="5" fill="'+INK+'"/></g>',
happy:'<path d="M66 92q12-16 24 0M110 92q12-16 24 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
sleep:'<path d="M66 88q12 10 24 0M110 88q12 10 24 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
wide:'<ellipse cx="78" cy="86" rx="13" ry="15" fill="#fff"/><ellipse cx="122" cy="86" rx="13" ry="15" fill="#fff"/><circle cx="78" cy="88" r="4" fill="'+INK+'"/><circle cx="122" cy="88" r="4" fill="'+INK+'"/>',
heart:'<g transform="translate(78 88) scale(1.15)">'+HEART+'</g><g transform="translate(122 88) scale(1.15)">'+HEART+'</g>',
star:'<g transform="translate(78 88) scale(1.3)">'+STAR+'</g><g transform="translate(122 88) scale(1.3)">'+STAR+'</g>',
cry:'<path d="M66 90q12 12 24 0M110 90q12 12 24 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
x:'<path d="M68 80l20 16M88 80L68 96M112 80l20 16M132 80l-20 16" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
wink:'<g class="e"><ellipse cx="78" cy="88" rx="9" ry="11" fill="#fff"/><circle cx="80" cy="90" r="5" fill="'+INK+'"/></g><path d="M110 90q12-14 24 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
angry:'<ellipse cx="78" cy="90" rx="9" ry="10" fill="#fff"/><ellipse cx="122" cy="90" rx="9" ry="10" fill="#fff"/><circle cx="80" cy="92" r="5" fill="'+INK+'"/><circle cx="120" cy="92" r="5" fill="'+INK+'"/><path d="M62 70l30 12M138 70l-30 12" stroke="'+INK+'" stroke-width="6" stroke-linecap="round"/>',
sad:'<ellipse cx="78" cy="90" rx="9" ry="11" fill="#fff"/><ellipse cx="122" cy="90" rx="9" ry="11" fill="#fff"/><circle cx="78" cy="94" r="5" fill="'+INK+'"/><circle cx="122" cy="94" r="5" fill="'+INK+'"/><path d="M62 78l26-8M138 78l-26-8" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
up:'<ellipse cx="78" cy="88" rx="10" ry="12" fill="#fff"/><ellipse cx="122" cy="88" rx="10" ry="12" fill="#fff"/><circle cx="80" cy="81" r="5" fill="'+INK+'"/><circle cx="120" cy="81" r="5" fill="'+INK+'"/>',
side:'<g class="e"><ellipse cx="78" cy="88" rx="10" ry="12" fill="#fff"/><ellipse cx="122" cy="88" rx="10" ry="12" fill="#fff"/><circle cx="84" cy="89" r="5" fill="'+INK+'"/><circle cx="128" cy="89" r="5" fill="'+INK+'"/></g>',
sparkle:'<ellipse cx="78" cy="88" rx="13" ry="15" fill="'+INK+'"/><ellipse cx="122" cy="88" rx="13" ry="15" fill="'+INK+'"/><circle cx="73" cy="82" r="5" fill="#fff"/><circle cx="117" cy="82" r="5" fill="#fff"/><circle cx="83" cy="94" r="2.5" fill="#fff"/><circle cx="127" cy="94" r="2.5" fill="#fff"/>',
tired:'<ellipse cx="78" cy="90" rx="9" ry="10" fill="#fff"/><ellipse cx="122" cy="90" rx="9" ry="10" fill="#fff"/><circle cx="78" cy="94" r="4.5" fill="'+INK+'"/><circle cx="122" cy="94" r="4.5" fill="'+INK+'"/><path d="M66 90h24v-8q-12-8-24 0zM110 90h24v-8q-12-8-24 0z" fill="#3a97ff"/><path d="M66 90h24M110 90h24" stroke="'+INK+'" stroke-width="4" stroke-linecap="round"/>',
money:'<text x="78" y="98" font-size="30" font-weight="800" text-anchor="middle" fill="#27ae60">$</text><text x="122" y="98" font-size="30" font-weight="800" text-anchor="middle" fill="#27ae60">$</text>',
dizzy:'<path d="M78 88m-3 0a3 3 0 1 1 6 0a6 6 0 1 1 -12 0a9 9 0 1 1 18 0" stroke="'+INK+'" stroke-width="3" fill="none"/><path d="M122 88m-3 0a3 3 0 1 1 6 0a6 6 0 1 1 -12 0a9 9 0 1 1 18 0" stroke="'+INK+'" stroke-width="3" fill="none"/>'
};
/* Bouches */
var MO={
smile:'<path d="M84 114q16 16 32 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
big:'<path d="M78 108q22 34 44 0z" fill="'+INK+'"/><path d="M88 124q12-8 24 0q-12 8-24 0z" fill="#ff6b81"/>',
grin:'<path d="M76 108q24 32 48 0z" fill="#fff" stroke="'+INK+'" stroke-width="4" stroke-linejoin="round"/><path d="M80 114h40" stroke="'+INK+'" stroke-width="3"/>',
o:'<ellipse cx="100" cy="120" rx="9" ry="11" fill="'+INK+'"/>',
flat:'<path d="M86 120h28" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/>',
sad:'<path d="M84 126q16-16 32 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
tongue:'<path d="M80 112q20 16 40 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M92 120v10q8 8 16 0v-10z" fill="#ff6b81" stroke="'+INK+'" stroke-width="3" stroke-linejoin="round"/>',
kiss:'<ellipse cx="100" cy="120" rx="6" ry="5" fill="#ff4d6d"/>',
grit:'<rect x="80" y="110" width="40" height="18" rx="6" fill="#fff" stroke="'+INK+'" stroke-width="4"/><path d="M90 110v18M100 110v18M110 110v18M80 119h40" stroke="'+INK+'" stroke-width="3"/>',
wavy:'<path d="M80 120q7-8 13 0t14 0t13 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
cat:'<path d="M82 114q9 10 18 0q9 10 18 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
yawn:'<ellipse cx="100" cy="122" rx="14" ry="18" fill="'+INK+'"/><ellipse cx="100" cy="132" rx="8" ry="5" fill="#ff6b81"/>',
smirk:'<path d="M86 118q18 6 32-8" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>',
shout:'<path d="M82 106h36q4 28-18 28t-18-28z" fill="'+INK+'"/><ellipse cx="100" cy="127" rx="9" ry="5" fill="#ff6b81"/>',
meh:'<path d="M86 122q14-5 28 0" stroke="'+INK+'" stroke-width="5" fill="none" stroke-linecap="round"/>'
};

/* Accessoires */
function hand(x,y,r){return '<circle cx="'+x+'" cy="'+y+'" r="'+(r||11)+'" fill="'+SKIN+'"/>'}
function arm(x1,y1,x2,y2){return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="#2f9bff" stroke-width="14" stroke-linecap="round"/>'}
var PR={
none:'',
cap:'<path d="M42 82Q48 30 100 30T158 82z" fill="#ef2b2d"/><path d="M36 82h128v8H36z" fill="#b01a1c"/><path d="M130 82h50q-4 10-22 10h-28z" fill="#b01a1c"/><path d="M0-8L2.5-2 8 0 2.5 2 0 8-2.5 2-8 0-2.5-2z" transform="translate(100 56) scale(1.7)" fill="#ffd43b"/>',
crown:'<path d="M54 46l10-26 18 18 18-24 18 24 18-18 10 26z" fill="#ffc933" stroke="#e09a00" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="30" r="4" fill="#ef2b2d"/><circle cx="66" cy="28" r="3" fill="#33c27f"/><circle cx="134" cy="28" r="3" fill="#4dabf7"/>',
party:'<path d="M68 52L100 -4L132 52z" fill="#ff6bb5"/><path d="M76 38l48 0M84 22h32" stroke="#ffd43b" stroke-width="6"/><circle cx="100" cy="-4" r="8" fill="#ffd43b"/>',
chef:'<path d="M60 54q-22-4-16-24t30-12q10-14 26-6q16-8 26 6q24-8 30 12t-16 24z" fill="#fff" stroke="#d8e2ec" stroke-width="3"/><rect x="62" y="50" width="76" height="12" rx="3" fill="#fff" stroke="#d8e2ec" stroke-width="3"/>',
phones:'<path d="M40 100Q40 30 100 30T160 100" stroke="#243b55" stroke-width="8" fill="none"/><rect x="28" y="88" width="20" height="34" rx="9" fill="#ff4d6d"/><rect x="152" y="88" width="20" height="34" rx="9" fill="#ff4d6d"/>',
shades:'<path d="M58 78h38v22q-19 9-38 0zM104 78h38v22q-19 9-38 0z" fill="'+INK+'"/><path d="M96 84h8v4h-8z" fill="'+INK+'"/><path d="M64 84l12 0" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>',
glasses:'<circle cx="78" cy="88" r="19" fill="rgba(255,255,255,.2)" stroke="#243b55" stroke-width="4"/><circle cx="122" cy="88" r="19" fill="rgba(255,255,255,.2)" stroke="#243b55" stroke-width="4"/><path d="M97 88h6" stroke="#243b55" stroke-width="4"/>',
band:'<path d="M38 70Q100 40 162 70v14Q100 54 38 84z" fill="#ef2b2d"/><path d="M158 74l22 -8l-6 18z" fill="#ef2b2d"/>',
flag:arm(150,170,168,122)+'<path d="M168 128V56" stroke="#8a5a2b" stroke-width="5" stroke-linecap="round"/><path d="M170 58h36v13h-36z" fill="#ef2b2d"/><path d="M170 71h36v13h-36z" fill="#2e9c4f"/><path d="M0-8L2.5-2 8 0 2.5 2 0 8-2.5 2-8 0-2.5-2z" transform="translate(188 71)" fill="#ffd43b"/>'+hand(168,128),
thumb:arm(150,172,160,142)+'<rect x="150" y="124" width="24" height="26" rx="8" fill="'+SKIN+'"/><rect x="156" y="104" width="11" height="26" rx="5.5" fill="'+SKIN+'"/>',
clap:arm(70,172,92,150)+arm(130,172,108,150)+hand(92,148)+hand(108,148),
pray:arm(70,172,92,160)+arm(130,172,108,160)+'<path d="M100 176L84 148q16-16 16 0q0-16 16 0z" fill="'+SKIN+'"/>',
hearthand:arm(66,172,84,154)+arm(134,172,116,154)+'<g transform="translate(100 156) scale(2.1)">'+HEART+'</g>',
phone:arm(150,172,160,142)+'<rect x="152" y="104" width="26" height="44" rx="6" fill="#243b55"/><rect x="155" y="109" width="20" height="30" rx="3" fill="#9fe7ff"/>'+hand(160,148,9),
mic:arm(150,172,150,142)+'<rect x="143" y="108" width="14" height="30" rx="7" fill="#444"/><circle cx="150" cy="104" r="12" fill="#bbb"/>'+hand(150,142,9),
coffee:arm(150,172,152,150)+'<path d="M134 128h34v18q0 14-17 14t-17-14z" fill="#fff" stroke="#c9d6e2" stroke-width="3"/><path d="M168 134q12 0 12 10t-12 8" stroke="#c9d6e2" stroke-width="4" fill="none"/><path d="M143 122q4-8 0-14M156 122q4-8 0-14" stroke="#b4c3d0" stroke-width="3" fill="none" class="f"/>',
plate:arm(66,172,80,158)+arm(134,172,120,158)+'<path d="M62 150h76q-4 26-38 26t-38-26z" fill="#fff" stroke="#c9d6e2" stroke-width="3"/><path d="M72 150q28-28 56 0z" fill="#e7c79a"/><path d="M92 126q6-8 0-14M108 126q6-8 0-14" stroke="#b4c3d0" stroke-width="3" fill="none" class="f"/>',
ball:'<circle cx="100" cy="184" r="18" fill="#fff" stroke="'+INK+'" stroke-width="3"/><path d="M100 173l10 7-4 11h-12l-4-11z" fill="'+INK+'"/><path d="M100 166v7M110 180l9-3M106 191l7 8M94 191l-7 8M90 180l-9-3" stroke="'+INK+'" stroke-width="3"/>',
book:arm(66,172,84,160)+arm(134,172,116,160)+'<path d="M66 150q34-12 34 0v30q0-12-34 0zM134 150q-34-12-34 0v30q0-12 34 0z" fill="#fff" stroke="#6c4bd6" stroke-width="4" stroke-linejoin="round"/>',
gift:'<rect x="68" y="146" width="64" height="44" rx="6" fill="#ff6bb5"/><rect x="94" y="146" width="12" height="44" fill="#ffd43b"/><rect x="68" y="160" width="64" height="10" fill="#ffd43b"/><path d="M100 146q-22-24-22-6t22 6q22 12 22-6t-22 6z" fill="#ffd43b"/>',
cake:'<rect x="64" y="160" width="72" height="32" rx="8" fill="#f9a8c9"/><path d="M64 170q9 9 18 0t18 0t18 0t18 0" stroke="#fff" stroke-width="6" fill="none"/><rect x="97" y="140" width="6" height="20" fill="#4dabf7"/><path class="fi" d="M100 124q8 8 0 16q-8-8 0-16z" fill="#ff9f1c"/>',
bulb:'<g transform="translate(100 24)"><path d="M0-18a16 16 0 0 1 9 29v6h-18v-6a16 16 0 0 1 9-29z" fill="#ffd43b" stroke="#e09a00" stroke-width="3"/><rect x="-7" y="18" width="14" height="6" rx="2" fill="#8a96a3"/><path d="M-26 -8l-8 -4M26 -8l8 -4M0 -30v-8" stroke="#ffc933" stroke-width="4" stroke-linecap="round"/></g>',
umb:'<path d="M30 56Q100 -14 170 56z" fill="#ff6b81"/><path d="M100 56v-6" stroke="#243b55" stroke-width="4"/><path d="M30 56q14 -10 28 0M58 56q14-10 28 0M86 56q14-10 28 0M114 56q14-10 28 0M142 56q14-10 28 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>',
money:arm(66,172,84,160)+arm(134,172,116,160)+'<rect x="62" y="146" width="76" height="34" rx="5" fill="#33c27f" stroke="#1e8a56" stroke-width="3"/><circle cx="100" cy="163" r="10" fill="#c8f2d9" stroke="#1e8a56" stroke-width="3"/>',
fist:arm(150,172,160,142)+'<rect x="146" y="112" width="30" height="30" rx="10" fill="'+SKIN+'"/><path d="M156 114v14M166 114v14" stroke="#e3b27c" stroke-width="3"/>',
peace:arm(150,172,158,146)+'<rect x="150" y="128" width="26" height="24" rx="9" fill="'+SKIN+'"/><rect x="152" y="100" width="9" height="32" rx="4.5" fill="'+SKIN+'" transform="rotate(-10 156 128)"/><rect x="165" y="100" width="9" height="32" rx="4.5" fill="'+SKIN+'" transform="rotate(10 170 128)"/>',
laptop:arm(66,172,84,166)+arm(134,172,116,166)+'<rect x="66" y="148" width="68" height="36" rx="4" fill="#cfd8e3" stroke="#6b7c8d" stroke-width="3"/><rect x="72" y="153" width="56" height="26" rx="2" fill="#9fe7ff"/><circle cx="100" cy="166" r="5" fill="#fff" opacity=".7"/>',
djembe:arm(66,172,80,150)+arm(134,172,120,150)+'<path d="M64 158h72l-10 32q-26 8-52 0z" fill="#a0652d" stroke="#6b3f17" stroke-width="3" stroke-linejoin="round"/><ellipse cx="100" cy="158" rx="36" ry="9" fill="#f1d9a8" stroke="#6b3f17" stroke-width="3"/><path d="M76 168l8 20M92 170v20M108 170v20M124 168l-8 20" stroke="#e6c88f" stroke-width="3"/>'+hand(82,148)+hand(118,148),
megaphone:arm(150,172,150,146)+'<path d="M140 122l32-16v46l-32-16z" fill="#ff6b3d"/><rect x="128" y="122" width="16" height="26" rx="4" fill="#d9481e"/>'+hand(138,152,9),
mango:arm(150,172,150,158)+'<g transform="translate(150 140)"><path d="M-14 0q0-16 16-16q16 4 12 20q-8 16-22 8q-6-4-6-12z" fill="#ffb02e"/><path d="M-2-14q2-8 12-8" stroke="#2e9c4f" stroke-width="4" fill="none"/><path d="M6-18q10-6 14 4q-8 4-14-4z" fill="#2e9c4f"/></g>',
rose:arm(150,172,152,150)+'<path d="M152 150v-24" stroke="#2e9c4f" stroke-width="4"/><path d="M152 140q-10-4-12-10M152 138q10-4 12-10" stroke="#2e9c4f" stroke-width="3" fill="none"/><circle cx="152" cy="118" r="12" fill="#e0243f"/><path d="M145 118q7-9 14 0M147 123q5-5 10 0" stroke="#a0152a" stroke-width="2.5" fill="none"/>',
hballoon:arm(150,172,160,142)+'<path d="M170 70c-9-9-23-2-9 14 9 11 9 11 9 11s0 0 9-11c14-16 0-23-9-14z" fill="#ff4d6d"/><path d="M170 95v44" stroke="#8a96a3" stroke-width="2"/>'+hand(168,142,8),
letter:arm(66,172,84,160)+arm(134,172,116,160)+'<rect x="64" y="146" width="72" height="42" rx="5" fill="#fff" stroke="#2f9bff" stroke-width="3"/><path d="M64 150l36 24 36-24" stroke="#2f9bff" stroke-width="3" fill="none"/>',
pharma:'<rect x="60" y="150" width="80" height="38" rx="8" fill="#fff" stroke="#e0243f" stroke-width="3"/><path d="M100 156v26M87 169h26" stroke="#e0243f" stroke-width="7" stroke-linecap="round"/>',
wave:'<g class="w">'+arm(164,104,186,100)+'<path d="M164 100q20-4 26-30" stroke="#2f9bff" stroke-width="14" fill="none" stroke-linecap="round"/>'+hand(191,64)+'</g>',
flowers:arm(150,172,152,146)+'<path d="M152 146v-24" stroke="#2e9c4f" stroke-width="4"/><g transform="translate(152 116)"><circle r="6" fill="#ffd43b"/><g fill="#ff6bb5"><circle cx="0" cy="-10" r="6"/><circle cx="10" cy="-3" r="6"/><circle cx="6" cy="9" r="6"/><circle cx="-6" cy="9" r="6"/><circle cx="-10" cy="-3" r="6"/></g><circle r="6" fill="#ffd43b"/></g>',
camera:arm(66,172,84,158)+arm(134,172,116,158)+'<rect x="68" y="142" width="64" height="38" rx="8" fill="#334"/><circle cx="100" cy="161" r="13" fill="#9fe7ff" stroke="#fff" stroke-width="4"/><rect x="82" y="136" width="20" height="8" rx="3" fill="#334"/>',
trophy:'<path d="M78 140h44v14q0 18-22 18t-22-18z" fill="#ffc933" stroke="#e09a00" stroke-width="3"/><path d="M78 146q-16 0-14 12t16 8M122 146q16 0 14 12t-16 8" stroke="#e09a00" stroke-width="4" fill="none"/><rect x="92" y="172" width="16" height="10" fill="#e09a00"/><rect x="82" y="182" width="36" height="8" rx="3" fill="#8a5a2b"/>',
mask:'<rect x="56" y="104" width="88" height="44" rx="14" fill="#9fe7ff" stroke="#fff" stroke-width="3"/><path d="M62 118h76M62 130h76" stroke="#fff" stroke-width="2" opacity=".7"/>',
bandage:'<g transform="rotate(-20 134 62)"><rect x="112" y="52" width="44" height="18" rx="6" fill="#ffd6a8" stroke="#e3b27c" stroke-width="2"/><circle cx="126" cy="61" r="1.5" fill="#c99a68"/><circle cx="134" cy="61" r="1.5" fill="#c99a68"/><circle cx="142" cy="61" r="1.5" fill="#c99a68"/></g>',
bell:'<g transform="translate(150 140)"><path d="M0-14q-12 0-12 14v8h24v-8q0-14-12-14z" fill="#ffc933" stroke="#e09a00" stroke-width="3"/><circle cy="12" r="4" fill="#e09a00"/></g>',
point:arm(150,172,166,150)+'<rect x="150" y="136" width="26" height="22" rx="8" fill="'+SKIN+'"/><rect x="170" y="132" width="26" height="9" rx="4.5" fill="'+SKIN+'"/>',
shrug:arm(66,172,48,150)+arm(134,172,152,150)+hand(46,148)+hand(154,148),
salute:arm(150,172,152,126)+'<rect x="140" y="82" width="34" height="12" rx="6" fill="'+SKIN+'" transform="rotate(-18 150 88)"/>'+hand(152,128,9)
};

/* Palettes de fond (carte) */
var BG=[['#bdeaff','#5cb8ff'],['#ffe29f','#ff9a3c'],['#ffc2c2','#ff6b81'],['#b8f2c6','#33c27f'],['#d4c4ff','#8a6fe8'],['#a8edea','#2fbfc9'],['#ffd1e8','#ff6bb5'],['#e3e8ff','#7a8cff']];

/* Liste : libellé, yeux, bouche, accessoire, effet, animation, fond */
var L=[
['Salut','happy','big','wave','none','sway',0],['Coucou','wink','smile','wave','hearts','bounce',6],['Yako','sad','sad','none','tears','nod',7],['Barka','happy','smile','pray','hearts','bow',0],
['Merci','happy','smile','hearthand','hearts','pulse',6],['Bravo','sparkle','big','clap','stars','jump',1],['MDR','happy','big','none','tears','shake',1],['Trop fort','star','big','thumb','stars','pop',3],
['Ça va ?','open','smile','none','qmark','sway',0],['Ça va !','happy','smile','thumb','none','bounce',3],['Oui','happy','smile','thumb','none','nod',3],['Non','angry','flat','none','none','shake',2],
['Peut-être','side','meh','none','qmark','sway',7],['Je sais pas','up','wavy','shrug','qmark','wob',7],['Dodo','sleep','o','none','zzz','breathe',4],['Bonne nuit','sleep','smile','none','zzz','breathe',4],
['Bonjour','happy','big','wave','sun','sway',1],['Bonsoir','happy','smile','wave','stars','sway',4],['Au revoir','happy','smile','wave','none','sway',0],['À demain','wink','smile','wave','none','bounce',5],
['Bienvenue','happy','big','flowers','stars','pulse',3],['Félicitations','sparkle','big','trophy','confetti','jump',1],['Joyeux anniv','happy','big','cake','confetti','bounce',6],['Cadeau','sparkle','big','gift','stars','pop',6],
['Faso','happy','big','flag','stars','sway',2],['On est ensemble','wink','grin','thumb','none','bounce',3],['Tô','sparkle','tongue','plate','none','pulse',1],['Bon appétit','happy','smile','plate','hearts','pulse',1],
['J\'ai faim','sad','o','plate','none','nod',1],['Café ?','open','smile','coffee','none','breathe',1],['Cool','open','smirk','shades','none','bounce',0],['Boss','open','smirk','shades','coins','sway',3],
['Roi','happy','big','crown','stars','pulse',1],['Reine','happy','smile','crown','hearts','pulse',6],['Champion','sparkle','big','trophy','stars','jump',1],['Foot','happy','big','ball','none','bounce',3],
['But !','wide','shout','ball','confetti','jump',3],['On gagne','happy','shout','fist','fire','pop',2],['Force','angry','grit','fist','fire','shake',2],['Courage','wink','grin','fist','stars','pulse',3],
['Je t\'aime','heart','smile','hearthand','hearts','pulse',6],['Bisou','happy','kiss','none','hearts','sway',6],['Câlin','happy','smile','clap','hearts','pulse',6],['Mon cœur','heart','big','none','hearts','pop',2],
['Bisous','wink','kiss','none','hearts','bounce',6],['Je craque','heart','o','none','hearts','wob',6],['Amoureux','heart','smile','flowers','hearts','sway',6],['Pardon','sad','sad','pray','sweat','bow',7],
['Désolé','sad','wavy','none','sweat','nod',7],['Triste','sad','sad','none','tears','nod',0],['Pleure','cry','sad','none','tears','shake',0],['Ça fait mal','x','shout','bandage','none','wob',2],
['Fâché','angry','grit','none','anger','shake',2],['Énervé','angry','flat','none','anger','shake',2],['Grrr','angry','shout','none','fire','shake',2],['Calme-toi','tired','flat','none','dots','breathe',5],
['Wow','wide','o','none','bang','pop',1],['Incroyable','star','o','none','stars','pop',4],['Sérieux ?','wide','flat','none','qmark','wob',7],['Hein ?','wide','o','none','qmark','wob',7],
['Choc','wide','shout','none','bang','shake',2],['Peur','wide','wavy','none','sweat','shake',7],['Oups','side','wavy','none','sweat','wob',1],['Gêné','side','wavy','none','sweat','sway',6],
['Fatigué','tired','yawn','none','zzz','breathe',4],['Je suis crevé','tired','sad','none','sweat','nod',4],['Malade','x','sad','mask','none','nod',3],['Ça chauffe','tired','o','none','sweat','breathe',2],
['Il fait chaud','tired','yawn','none','sun','breathe',1],['Il pleut','sad','flat','umb','rain','sway',5],['Froid','sleep','wavy','none','snow','shake',5],['Orage','wide','o','none','rain','shake',7],
['Musique','happy','big','phones','notes','bounce',4],['On danse','happy','big','none','notes','jump',6],['Chante','happy','shout','mic','notes','sway',4],['Fête','happy','big','party','confetti','jump',6],
['On sort ?','wink','smirk','none','stars','sway',4],['Appelle-moi','open','smile','phone','none','tp',0],['Message','open','smile','phone','dots','nod',0],['Réponds','side','flat','phone','dots','wob',0],
['Photo','happy','big','camera','shine','pop',7],['Selfie','wink','big','peace','shine','sway',6],['Idée','sparkle','big','bulb','none','pop',1],['J\'étudie','open','flat','book','none','breathe',7],
['Au travail','open','flat','glasses','none','nod',7],['Je bosse','angry','flat','phones','none','breathe',5],['Chef','happy','smile','chef','none','pulse',1],['Argent','money','big','money','coins','pop',3],
['Paiement','money','smile','none','coins','bounce',3],['Riche','money','smirk','shades','coins','pulse',1],['Pas un franc','sad','flat','none','sweat','nod',3],['Le salaire','money','big','none','coins','jump',3],
['Ok','open','smirk','thumb','none','nod',3],['D\'accord','happy','smile','thumb','none','nod',3],['Bien reçu','open','smile','salute','none','pop',5],['Compris','sparkle','smile','point','none','pop',5],
['Attends','side','flat','point','dots','breathe',7],['Vite !','wide','shout','none','sweat','shake',2],['Doucement','sleep','smile','none','none','sway',5],['Patience','tired','smile','none','dots','breathe',5],
['Regarde','side','smile','point','none','pop',0],['Écoute','up','smile','phones','notes','sway',4],['Chut','open','o','none','none','breathe',7],['Secret','side','smirk','none','none','sway',4],
['Lol','happy','big','none','none','shake',1],['Haha','happy','big','none','tears','bounce',1],['Mdrrr','x','big','none','tears','wob',1],['Ouf','tired','yawn','none','sweat','breathe',5],
['Top','star','big','none','stars','pop',1],['Génial','sparkle','big','none','confetti','jump',6],['Parfait','happy','grin','thumb','shine','pulse',3],['Nickel','wink','smile','thumb','none','bounce',3],
['Bizarre','dizzy','wavy','none','qmark','wob',7],['Vertige','dizzy','o','none','none','wob',4],['Boum','dizzy','shout','none','bang','shake',2],['Sieste','sleep','smile','none','zzz','breathe',4],
['Soirée','wink','big','shades','notes','bounce',4],['Voyage','happy','big','umb','sun','sway',5],['Salam','happy','smile','pray','stars','bow',5],['Bénédiction','happy','smile','pray','shine','pulse',1],
['Sourire','happy','smile','none','none','breathe',0],['Joie','happy','big','none','stars','jump',1],['Content','happy','grin','none','none','bounce',3],['Super','sparkle','grin','none','shine','pop',3],
['Ça marche','wink','smirk','thumb','none','bounce',3],['À toi','wink','smile','point','none','pop',7],['Bravo à toi','sparkle','smile','clap','stars','pulse',1],['Merci beaucoup','happy','big','pray','hearts','bow',6],
['Bonne journée','happy','big','wave','sun','sway',0],
['Bon week-end','wink','smile','wave','stars','pulse',4],
['Bonne semaine','happy','smile','flowers','hearts','jump',0],
['Bon réveil','happy','big','wave','none','nod',4],
['À bientôt','happy','big','wave','sun','sway',0],
['À tout à l\'heure','wink','smile','wave','stars','pulse',4],
['Bon retour','happy','smile','flowers','hearts','jump',0],
['Bonne route','happy','big','wave','none','nod',4],
['Bonne chance','sparkle','smile','pray','shine','sway',0],
['Bon courage','happy','big','clap','stars','pulse',4],
['Bonne année','wink','grin','fist','stars','jump',0],
['Joyeuses fêtes','happy','big','gift','confetti','nod',4],
['Bon voyage','sparkle','smile','pray','shine','sway',0],
['Belle soirée','happy','big','clap','stars','pulse',4],
['Merci frère','happy','smile','hearthand','hearts','nod',2],
['Merci sœur','happy','smile','pray','hearts','sway',6],
['Merci maman','sparkle','big','flowers','hearts','pulse',2],
['Merci papa','happy','smile','hearthand','hearts','jump',6],
['Merci mon ami','happy','smile','pray','hearts','nod',2],
['Merci infiniment','sparkle','big','flowers','hearts','sway',6],
['Respect','star','big','thumb','stars','jump',4],
['Bien joué','sparkle','grin','clap','confetti','nod',0],
['Chapeau','open','smirk','shades','stars','sway',4],
['Tu gères','happy','big','trophy','confetti','pulse',0],
['Tu déchires','star','big','thumb','stars','jump',4],
['Quel talent','sparkle','grin','clap','confetti','nod',0],
['Impressionnant','open','smirk','shades','stars','sway',4],
['Magnifique','happy','big','trophy','confetti','pulse',0],
['Excellent','star','big','thumb','stars','jump',4],
['Mon frère','happy','big','hearthand','hearts','wob',7],
['Ma sœur','happy','smile','clap','stars','breathe',3],
['Mon ami','wink','big','peace','none','bounce',7],
['Maman','happy','smile','flowers','hearts','pop',3],
['Papa','happy','big','hearthand','hearts','wob',7],
['Bébé','happy','smile','clap','stars','breathe',3],
['La famille','wink','big','peace','none','bounce',7],
['Les amis','happy','smile','flowers','hearts','pop',3],
['Ma bande','happy','big','hearthand','hearts','wob',7],
['Les gars','happy','smile','clap','stars','breathe',3],
['Les filles','wink','big','peace','none','bounce',7],
['Ma chérie','heart','smile','rose','hearts','sway',0],
['Mon chéri','heart','kiss','none','hearts','pulse',4],
['Tu me manques','happy','smile','hearthand','hearts','jump',0],
['Je pense à toi','sparkle','smile','hballoon','hearts','nod',4],
['Avec amour','heart','smile','rose','hearts','sway',0],
['Trop mignon','heart','kiss','none','hearts','pulse',4],
['Adorable','happy','smile','hearthand','hearts','jump',0],
['En réunion','open','flat','laptop','none','breathe',5],
['Bureau','open','smile','coffee','dots','bounce',1],
['Pause café','open','smile','phone','none','pop',5],
['Déjeuner','happy','smile','thumb','check','wob',1],
['Projet','open','flat','laptop','none','breathe',5],
['Bon boulot','open','smile','coffee','dots','bounce',1],
['Équipe','open','smile','phone','none','pop',5],
['Urgent','happy','smile','thumb','check','wob',1],
['Confirmé','open','flat','laptop','none','breathe',5],
['Rendez-vous','open','smile','coffee','dots','bounce',1],
['Disponible','open','smile','phone','none','pop',5],
['Occupé','happy','smile','thumb','check','wob',1],
['Cours','open','flat','book','none','pop',1],
['Examen','tired','flat','book','sweat','wob',5],
['Révisions','sparkle','big','trophy','confetti','breathe',1],
['Devoirs','wide','o','book','qmark','bounce',5],
['Résultats','open','flat','book','none','pop',1],
['Réussi !','tired','flat','book','sweat','wob',5],
['Diplômé','sparkle','big','trophy','confetti','breathe',1],
['Mariage','happy','big','party','confetti','pulse',6],
['Baptême','happy','big','gift','confetti','jump',2],
['Bébé en route','sparkle','big','cake','stars','nod',6],
['Nouvelle maison','happy','big','hballoon','confetti','sway',2],
['Nouveau job','happy','big','party','confetti','pulse',6],
['Vacances','happy','big','gift','confetti','jump',2],
['Plage','sparkle','big','cake','stars','nod',6],
['Fête de famille','happy','big','hballoon','confetti','sway',2],
['Bonne fête','happy','big','party','confetti','pulse',6],
['Match ce soir','happy','big','ball','stars','pop',1],
['Les Étalons','wide','shout','flag','confetti','wob',5],
['Victoire','angry','grit','fist','fire','breathe',1],
['On a perdu','sparkle','big','trophy','confetti','bounce',5],
['Match nul','happy','big','ball','stars','pop',1],
['Beau but','wide','shout','flag','confetti','wob',5],
['Fier du Faso','angry','grit','fist','fire','breathe',1],
['On y va','wink','grin','thumb','none','pulse',6],
['C\'est parti','happy','smile','thumb','check','jump',2],
['Tout de suite','open','smirk','salute','none','nod',6],
['Pas de souci','sparkle','big','fist','stars','sway',2],
['Aucun problème','wink','grin','thumb','none','pulse',6],
['Ça roule','happy','smile','thumb','check','jump',2],
['Je gère','open','smirk','salute','none','nod',6],
['Bien sûr','sparkle','big','fist','stars','sway',2],
['Évidemment','wink','grin','thumb','none','pulse',6],
['Exactement','happy','smile','thumb','check','jump',2],
['Je confirme','open','smirk','salute','none','nod',6],
['Je suis d\'accord','sparkle','big','fist','stars','sway',2],
['Pas d\'accord','angry','flat','none','none','nod',2],
['Pas question','side','meh','none','qmark','sway',6],
['Jamais','up','wavy','shrug','qmark','pulse',2],
['Laisse tomber','tired','flat','none','dots','jump',6],
['Tant pis','angry','flat','none','none','nod',2],
['Je doute','side','meh','none','qmark','sway',6],
['Je réfléchis','up','wavy','shrug','qmark','pulse',2],
['Sans voix','tired','flat','none','dots','jump',6],
['J\'hallucine','angry','flat','none','none','nod',2],
['C\'est fou','side','meh','none','qmark','sway',6],
['Dommage','happy','smile','hearthand','hearts','sway',0],
['Courage à toi','sad','smile','fist','stars','pulse',4],
['Ça ira','happy','smile','pray','shine','jump',0],
['Tout va bien','wink','smile','clap','hearts','nod',4],
['Reste fort','happy','smile','hearthand','hearts','sway',0],
['Je suis là','sad','smile','fist','stars','pulse',4],
['Prends soin de toi','happy','smile','pray','shine','jump',0],
['Fais attention','wink','smile','clap','hearts','nod',4],
['Patience !','happy','smile','hearthand','hearts','sway',0],
['Trop drôle','happy','big','none','tears','bounce',3],
['Mort de rire','open','smirk','shades','stars','pop',7],
['Fou rire','wink','tongue','crown','stars','wob',3],
['Surprise !','x','big','none','tears','breathe',7],
['Swag','happy','big','none','tears','bounce',3],
['Stylé','open','smirk','shades','stars','pop',7],
['Classe','wink','tongue','crown','stars','wob',3],
['Beau gosse','x','big','none','tears','breathe',7],
['Belle gosse','happy','big','none','tears','bounce',3],
['Djembé','happy','big','djembe','notes','bounce',2],
['Tam-tam','happy','shout','djembe','notes','jump',7],
['On danse ce soir','wink','big','djembe','notes','bounce',4],
['Ambiance','happy','big','djembe','stars','pop',1],
['Mangue','sparkle','tongue','mango','none','pulse',6],
['Délicieux','sparkle','big','mango','hearts','pulse',3],
['Gourmand','sparkle','tongue','plate','stars','pulse',0],
['Miam','happy','tongue','plate','hearts','bounce',5],
['Message vocal','happy','big','mic','notes','sway',2],
['Appel manqué','sad','flat','phone','qmark','nod',7],
['Écris-moi','wink','smile','letter','none','pop',4],
['Rappelle-moi','open','smile','phone','none','tp',1],
['Réponds vite','wide','shout','phone','bang','shake',6],
['Je t\'attends','side','flat','none','dots','breathe',3],
['Dans 5 min','open','smile','none','dots','breathe',0],
['J\'arrive','happy','big','none','wind','bounce',5],
['Je rentre','happy','smile','none','wind','sway',2],
['Je pars','wink','smile','wave','none','sway',7],
['Je suis là','happy','smile','salute','none','pop',4],
['Chez le docteur','tired','sad','pharma','none','nod',1],
['Pharmacie','open','flat','pharma','check','pop',6],
['Harmattan','tired','wavy','none','wind','shake',3],
['Il fait beau','happy','big','shades','sun','bounce',0],
['Arc-en-ciel','sparkle','big','none','rainbow','pulse',5],
['Chaleur','tired','yawn','none','sun','breathe',2],
['Feux d\'artifice','happy','big','none','fireworks','pop',7],
['Bonne année !','happy','shout','party','fireworks','jump',4],
['Félicitations !','sparkle','big','clap','fireworks','pop',1],
['Mission accomplie','happy','grin','thumb','check','pop',6],
['C\'est fait','happy','smile','none','check','pop',3],
['Validé','open','smirk','thumb','check','nod',0],
['Top départ','happy','shout','flag','confetti','jump',5]
];

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
var cache={};
function build(i){
var d=L[i];if(!d)return'';
var bg=BG[d[6]%BG.length],id='b'+i;
var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 216"><style>'+K+'</style><defs>'+
'<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cb8ff"/><stop offset="1" stop-color="#0a7cff"/></linearGradient>'+
'<linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+bg[0]+'"/><stop offset="1" stop-color="'+bg[1]+'"/></linearGradient></defs>'+
'<rect x="6" y="6" width="188" height="204" rx="36" fill="#fff"/><rect x="12" y="12" width="176" height="192" rx="30" fill="url(#'+id+')"/>'+
'<g transform="translate(96 100) scale(.8) translate(-100 -96)">'+
'<g class="'+d[5]+'"><ellipse cx="100" cy="182" rx="54" ry="30" fill="url(#g)"/>'+
'<circle cx="100" cy="100" r="66" fill="url(#g)"/><ellipse cx="74" cy="60" rx="22" ry="11" fill="#fff" opacity=".28" transform="rotate(-28 74 60)"/>'+
'<ellipse cx="58" cy="112" rx="11" ry="7" fill="#ff8fb1" opacity=".5"/><ellipse cx="142" cy="112" rx="11" ry="7" fill="#ff8fb1" opacity=".5"/>'+
EYE[d[1]]+MO[d[2]]+PR[d[3]]+'</g>'+FX[d[4]]()+'</g>'+
'<text x="100" y="196" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="'+(d[0].length>11?17:d[0].length>8?21:25)+'" fill="#fff" stroke="'+INK+'" stroke-width="5" stroke-linejoin="round" paint-order="stroke">'+esc(d[0])+'</text></svg>';
return s}
window.__tsvg_n=L.length;window.__tsvg_lab=L.map(function(r){return r[0]});
window.__tsvg=function(i){if(cache[i]!==undefined)return cache[i];var s=build(i);return cache[i]=s?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s):''};
window.__tsvg_raw=build;
})();
/*TSBIG*/
(function(){
var c=document.createElement('style');
c.textContent=
'div[style*="58vh"]{height:86vh!important;max-height:86vh!important}'+
'div[style*="repeat(4"]{grid-template-columns:repeat(3,minmax(0,1fr))!important;grid-auto-rows:max-content!important;gap:12px!important;padding-bottom:20px}'+
'div[style*="repeat(4"]>button{aspect-ratio:auto!important;height:auto!important;min-height:0!important;padding:3px!important;display:block!important;border-radius:18px!important}'+
'div[style*="repeat(4"]>button>img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:200/216}'+
'html:root body .tsstab.on{color:#fff!important;-webkit-text-fill-color:#fff!important;text-shadow:none!important}'+
'html:root body .tsimg{width:180px!important;height:194px!important}';
document.head.appendChild(c);
})();
