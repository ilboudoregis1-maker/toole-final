/* TÕÕLé - Palettes décoratives (motifs dessinés) pour les discussions */
(function(){
var I={
heart:'<path d="M12 21C3 14 2 8 6 5.5c3-2 5 0 6 2 1-2 3-4 6-2 4 2.5 3 8.5-6 15.5z"/>',
star:'<path d="M12 2l3 7 7.5.6-5.7 5 1.8 7.4L12 18l-6.6 4 1.8-7.4-5.7-5L9 9z"/>',
smile:'<circle cx="12" cy="12" r="10"/><circle cx="8.5" cy="10" r="1.6" fill="#fff"/><circle cx="15.5" cy="10" r="1.6" fill="#fff"/><path d="M7 14q5 6 10 0" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>',
flower:'<circle cx="12" cy="5.5" r="4.5"/><circle cx="18.5" cy="10" r="4.5"/><circle cx="16" cy="18" r="4.5"/><circle cx="8" cy="18" r="4.5"/><circle cx="5.5" cy="10" r="4.5"/><circle cx="12" cy="12" r="3" fill="#fff"/>',
leaf:'<path d="M3 21C3 9 10 3 21 3c0 11-6 18-18 18z"/><path d="M3 21L14 10" stroke="#fff" stroke-width="1.6" fill="none"/>',
note:'<path d="M9 18V5l12-3v13" stroke-width="2.4" fill="none"/><ellipse cx="6.5" cy="18.5" rx="4" ry="3.2"/><ellipse cx="18.5" cy="15.5" rx="4" ry="3.2"/>',
ball:'<circle cx="12" cy="12" r="10.5"/><path d="M12 7l4.5 3.3-1.7 5.2H9.2L7.5 10.3z" fill="#fff"/><path d="M12 7V2M16.5 10.3l5-1.6M14.8 15.5l3 4.2M9.2 15.5l-3 4.2M7.5 10.3l-5-1.6" stroke="#fff" stroke-width="1.5" fill="none"/>',
balloon:'<ellipse cx="12" cy="9.5" rx="7.5" ry="8.5"/><path d="M10.5 18l1.5 2.5 1.5-2.5z"/><path d="M12 20.5q-3 2 0 3.5" stroke-width="1.6" fill="none"/>',
gift:'<rect x="3" y="9" width="18" height="12" rx="1.5"/><rect x="2" y="6" width="20" height="4.5" rx="1.5"/><path d="M12 6v15" stroke="#fff" stroke-width="2.4"/><path d="M12 6C9 1 5 3 7.5 6M12 6c3-5 7-3 4.5 0" stroke-width="2" fill="none"/>',
house:'<path d="M2 12L12 3l10 9h-3v9H5v-9z"/><rect x="10" y="14" width="4" height="7" fill="#fff"/>',
tree:'<circle cx="12" cy="9" r="7.5"/><circle cx="6.5" cy="12.5" r="5"/><circle cx="17.5" cy="12.5" r="5"/><rect x="10.5" y="14" width="3" height="9"/>',
sun:'<circle cx="12" cy="12" r="5.2"/><path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4M4.6 4.6l2.8 2.8M16.6 16.6l2.8 2.8M4.6 19.4l2.8-2.8M16.6 7.4l2.8-2.8" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
pencil:'<path d="M3 21l1.5-5.5L16 4l4 4L8.5 19.5z"/><path d="M14 6l4 4" stroke="#fff" stroke-width="1.6" fill="none"/>',
book:'<path d="M2 4q5-1.5 10 1v16q-5-2.5-10-1zM22 4q-5-1.5-10 1v16q5-2.5 10-1z"/>',
case:'<rect x="2" y="7" width="20" height="14" rx="2.5"/><path d="M8 7V4.5Q8 3 9.5 3h5Q16 3 16 4.5V7" stroke-width="2" fill="none"/><path d="M2 13h20" stroke="#fff" stroke-width="1.6"/>',
laptop:'<rect x="4" y="4" width="16" height="11" rx="1.8"/><path d="M1 18h22l-2 3H3z"/>',
cup:'<path d="M3 9h14v6q0 6-7 6t-7-6z"/><path d="M17 11h2q3 0 3 3t-3 3h-2" stroke-width="2" fill="none"/><path d="M7 2q2 2 0 4M12 2q2 2 0 4" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
clock:'<circle cx="12" cy="12" r="10.5"/><path d="M12 6v6l4 2.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>',
chart:'<rect x="3" y="12" width="4.5" height="9" rx="1"/><rect x="9.8" y="6" width="4.5" height="15" rx="1"/><rect x="16.5" y="2" width="4.5" height="19" rx="1"/>',
phones:'<path d="M3 15V12a9 9 0 0 1 18 0v3" stroke-width="2.4" fill="none"/><rect x="2" y="14" width="5" height="8" rx="2.2"/><rect x="17" y="14" width="5" height="8" rx="2.2"/>',
cake:'<rect x="3" y="13" width="18" height="8" rx="2"/><path d="M3 16.5q2.2 2 4.5 0t4.5 0t4.5 0t4.5 0" stroke="#fff" stroke-width="1.8" fill="none"/><rect x="11" y="8" width="2" height="5"/><path d="M12 3q2 2 0 4q-2-2 0-4z"/>',
plane:'<path d="M21.5 3L2 11l6.5 2.3L19 5.5 10.5 14.5V21l3.5-4 4 1.5z"/>',
cloud:'<path d="M6.5 19a5 5 0 0 1-.6-10 6.5 6.5 0 0 1 12.4 1.5A4.2 4.2 0 0 1 17.5 19z"/>',
pin:'<path d="M12 22C6 15 5 12 5 9a7 7 0 0 1 14 0c0 3-1 6-7 13z"/><circle cx="12" cy="9" r="2.8" fill="#fff"/>',
dice:'<rect x="2.5" y="2.5" width="19" height="19" rx="4.5"/><circle cx="8" cy="8" r="1.9" fill="#fff"/><circle cx="16" cy="8" r="1.9" fill="#fff"/><circle cx="12" cy="12" r="1.9" fill="#fff"/><circle cx="8" cy="16" r="1.9" fill="#fff"/><circle cx="16" cy="16" r="1.9" fill="#fff"/>',
pad:'<rect x="1.5" y="6.5" width="21" height="12" rx="6"/><path d="M7 9.5v6M4 12.5h6" stroke="#fff" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="11.5" r="1.6" fill="#fff"/><circle cx="19" cy="14.5" r="1.6" fill="#fff"/>',
bowl:'<path d="M2 11h20q0 10-10 10T2 11z"/><path d="M7 7q2-3 0-5M12 7q2-3 0-5M17 7q2-3 0-5" stroke-width="1.7" fill="none" stroke-linecap="round"/>',
moon:'<path d="M20 15A9 9 0 1 1 9.5 3a7.5 7.5 0 0 0 10.5 12z"/>',
bolt:'<path d="M13 1L4 14h7l-1 9 10-14h-7z"/>',
crown:'<path d="M2.5 19L1.5 7l6.5 5 4-9 4 9 6.5-5-1 12z"/>',
cup2:'<path d="M6 3h12v6q0 6-6 6t-6-6z"/><path d="M6 5H2.5q0 5 4 6M18 5h3.5q0 5-4 6" stroke-width="2" fill="none"/><rect x="10.5" y="15" width="3" height="4"/><rect x="7" y="19" width="10" height="3" rx="1"/>',
peace:'<circle cx="12" cy="12" r="10" fill="none" stroke-width="2.4"/><path d="M12 2v20M12 12l-7 7M12 12l7 7" stroke-width="2.4" fill="none"/>',
chat:'<path d="M3 4h18a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 21 17h-9l-5 4.5V17H3a1.5 1.5 0 0 1-1.5-1.5v-10A1.5 1.5 0 0 1 3 4z"/>',
hands:'<path d="M2 14l5-6 4 3 3-3 8 6-4 7-6-3-3 2z"/>',
baobab:'<path d="M9 22q1-6 .3-9H6q-3-1-3-4 0-4 4-5 2-3 5-3t5 3q4 1 4 5 0 3-3 4h-3.3q-.7 3 .3 9z"/>',
zig:'<path d="M1 12l5.5-8 5.5 8 5.5-8 5.5 8M1 20l5.5-8 5.5 8 5.5-8 5.5 8" stroke-width="2.6" fill="none" stroke-linejoin="round"/>',
dia:'<path d="M12 1l10 11-10 11L2 12z"/><path d="M12 7l5 5-5 5-5-5z" fill="#fff"/>',
cross:'<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
dots:'<circle cx="5" cy="5" r="2.6"/><circle cx="12" cy="5" r="2.6"/><circle cx="19" cy="5" r="2.6"/><circle cx="8.5" cy="12" r="2.6"/><circle cx="15.5" cy="12" r="2.6"/><circle cx="5" cy="19" r="2.6"/><circle cx="12" cy="19" r="2.6"/><circle cx="19" cy="19" r="2.6"/>',
whistle:'<circle cx="8" cy="14" r="7"/><rect x="11" y="6" width="11" height="6" rx="2"/><circle cx="8" cy="14" r="2.6" fill="#fff"/>',
glove:'<path d="M6 21v-6L3 9l2-1.5 3 3V3.5Q8 2 9.5 2T11 3.5V9V2.5Q11 1 12.5 1t1.5 1.5V9V3.5Q14 2 15.5 2T17 3.5V9V6Q17 4.5 18.5 4.5T20 6v8q0 7-6 7z"/>'
};
var SLOTS=[[24,26,-14,1],[80,18,10,.75],[132,32,18,1.1],[50,76,-8,.85],[108,82,12,1.05],[22,128,14,.95],[74,134,-12,1.1],[132,126,8,.85]];
function tile(icons,col,op,dark){
var g='',n=SLOTS.length;
for(var i=0;i<n;i++){var s=SLOTS[i],ic=I[icons[i%icons.length]],c=col[i%col.length];
g+='<g transform="translate('+s[0]+' '+s[1]+') rotate('+s[2]+') scale('+(s[3]*1.25)+') translate(-12 -12)" fill="'+c+'" stroke="'+c+'" stroke-linejoin="round">'+ic+'</g>'}
var svg='<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><g opacity="'+op+'">'+g+'</g></svg>';
return 'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)+'")'}
function V(G,icons,a,b,col,op){return tile(icons,col,op)+','+G(a,b)}
window.__twallX=function(CATS,G){
var T=[
['Amour','Love','💕',[
 [['heart','flower','heart','star'],'#fff4f8','#ffd6e4',['#e0457b','#ff8fb1'],.4],
 [['heart','heart','smile','heart'],'#ffe9ef','#ffb3c7',['#d6336c','#ff6b9d'],.38],
 [['heart','star','heart','flower'],'#2d1033','#14081f',['#ff6b9d','#ffb3d1'],.42],
 [['heart','gift','heart','flower'],'#fffdf5','#ffe0ea',['#ff4d6d','#f59ab7'],.4]]],
['Amitié','Friendship','🤝',[
 [['smile','star','chat','heart'],'#fff8e1','#ffe08a',['#f08c00','#ff6b6b'],.4],
 [['peace','smile','star','hands'],'#e9fbff','#b6ecf7',['#0a9bb5','#2f7de1'],.38],
 [['chat','smile','heart','star'],'#f3e9ff','#d6c2ff',['#7a4fe0','#b36bff'],.38],
 [['hands','smile','peace','star'],'#eafff1','#b4ecc9',['#1e9e5a','#0a9bb5'],.4]]],
['Famille','Family','👨‍👩‍👧',[
 [['house','heart','tree','sun'],'#fffbe9','#ffe7a8',['#d9822b','#e0457b'],.4],
 [['tree','house','flower','sun'],'#eefbe6','#c4eaa5',['#3f9b3f','#e08a1e'],.4],
 [['heart','house','smile','tree'],'#e8f4ff','#b9d9ff',['#2a7de1','#e0457b'],.38],
 [['house','star','heart','flower'],'#fff1ea','#ffcfb8',['#e0642b','#c2418a'],.4]]],
['Camarades','Classmates','🎒',[
 [['pencil','book','star','smile'],'#fff9e6','#ffe69a',['#e08a00','#2a7de1'],.4],
 [['book','pencil','chat','star'],'#eaf3ff','#bcd7ff',['#2a62d1','#e0457b'],.38],
 [['ball','smile','pencil','star'],'#effff4','#bdeccd',['#1e9e5a','#f08c00'],.4],
 [['star','book','smile','pencil'],'#f6eeff','#dcc7ff',['#7a4fe0','#f08c00'],.38]]],
['Collègues','Colleagues','💼',[
 [['case','laptop','cup','clock'],'#f2f6fb','#d3deec',['#34506f','#2a7de1'],.36],
 [['chart','case','clock','cup'],'#eef8ff','#c3e1f7',['#1d6fa5','#34506f'],.36],
 [['laptop','chat','chart','cup'],'#f7f4ef','#e5dccd',['#7a5a2e','#34506f'],.36],
 [['case','chart','laptop','clock'],'#1c2536','#0d1320',['#7fb2ff','#9fd0ff'],.34]]],
['Foot','Football','⚽',[
 [['ball','whistle','cup2','glove'],'#eaf9e4','#a9e08f',['#2d8a2d','#fff'],.42],
 [['ball','star','cup2','ball'],'#fff6dc','#ffd66b',['#2d8a2d','#d92b2b'],.4],
 [['ball','whistle','star','cup2'],'#e8f3ff','#a9cdf5',['#1d56b0','#2d8a2d'],.38],
 [['cup2','ball','star','whistle'],'#0f2a1b','#07150d',['#58d27a','#9ff0b8'],.4]]],
['Musique','Music','🎵',[
 [['note','phones','star','note'],'#f4ebff','#d4b8ff',['#6a3fd1','#e0457b'],.4],
 [['note','note','phones','heart'],'#ffeaf3','#ffc0da',['#d6336c','#7a4fe0'],.38],
 [['phones','note','star','note'],'#e8f6ff','#b3dcf7',['#1d6fa5','#7a4fe0'],.38],
 [['note','star','phones','note'],'#1d1033','#0d0720',['#b388ff','#ff7ab8'],.42]]],
['Fête','Party','🎉',[
 [['balloon','gift','star','cake'],'#fff0f7','#ffc7e3',['#e0457b','#f08c00','#2a7de1'],.45],
 [['cake','balloon','star','gift'],'#fff8de','#ffe48a',['#e0642b','#7a4fe0','#1e9e5a'],.45],
 [['gift','star','balloon','crown'],'#eaf4ff','#bcd8ff',['#2a7de1','#e0457b','#f08c00'],.42],
 [['balloon','star','cake','gift'],'#1f1238','#0e0720',['#ff7ab8','#ffd43b','#6fd0ff'],.5]]],
['Faso','Burkina','🇧🇫',[
 [['star','zig','dia','star'],'#fff2cf','#ffd37a',['#2e9c4f','#ef2b2d','#b8860b'],.42],
 [['zig','cross','dia','dots'],'#f6e7d2','#d9b98a',['#6b4a2b','#9a3b22'],.42],
 [['dia','star','zig','cross'],'#ffe5e0','#f6a39a',['#b01a1c','#2e9c4f','#8a5a00'],.42],
 [['zig','dia','star','dots'],'#e2f5e6','#9fd6ac',['#1e6b36','#ef2b2d','#b8860b'],.42]]],
['Baobab & soleil','Baobab & sun','🌳',[
 [['baobab','sun','leaf','cloud'],'#fff0d6','#ffcc85',['#8a5a2b','#e08a1e','#3f9b3f'],.4],
 [['sun','baobab','leaf','sun'],'#ffe9cc','#ffb976',['#b4531a','#8a5a2b','#3f9b3f'],.4],
 [['leaf','flower','baobab','cloud'],'#e6f8dc','#b0e08e',['#2f8a3c','#e0457b','#8a5a2b'],.4],
 [['baobab','star','moon','leaf'],'#162a2a','#0a1414',['#6fd7a0','#ffd43b'],.42]]],
['Voyage','Travel','✈️',[
 [['plane','cloud','pin','sun'],'#e6f5ff','#b2dcf7',['#2a7de1','#f08c00'],.4],
 [['pin','plane','cloud','star'],'#fff4e3','#ffd9a3',['#e0642b','#2a7de1'],.4],
 [['plane','pin','cloud','sun'],'#e6fbf6','#b3ecdf',['#0a9b85','#2a7de1'],.38],
 [['plane','star','moon','cloud'],'#14203a','#090f20',['#8ab4ff','#ffd43b'],.42]]],
['Jeux','Gaming','🎮',[
 [['pad','dice','star','bolt'],'#ece8ff','#c5bcff',['#5b3fd1','#e0457b'],.4],
 [['dice','pad','bolt','star'],'#e6fbff','#a9eaf5',['#0a9bb5','#5b3fd1'],.4],
 [['pad','bolt','dice','star'],'#fff0e4','#ffc99a',['#e0642b','#5b3fd1'],.4],
 [['pad','star','bolt','dice'],'#101d2d','#070d16',['#58e0ff','#a58bff'],.46]]],
['Cuisine & Tô','Food','🍲',[
 [['bowl','leaf','cup','star'],'#fff2da','#ffd592',['#c2641a','#3f9b3f'],.4],
 [['bowl','bowl','leaf','heart'],'#ffe9e0','#ffbfa6',['#c2412a','#3f9b3f'],.4],
 [['cup','bowl','leaf','flower'],'#f4efe6','#dccfb4',['#7a5a2e','#3f9b3f'],.38],
 [['bowl','star','cup','leaf'],'#2b1a10','#150b05',['#ffb36b','#ffd9a8'],.42]]],
['Nuit étoilée','Starry night','🌌',[
 [['star','moon','star','star'],'#1b2250','#0b0f2c',['#ffe27a','#bcd0ff'],.55],
 [['moon','star','star','heart'],'#2a1850','#120a2c',['#ffd9f0','#c9b3ff'],.55],
 [['star','star','moon','cloud'],'#0f2c44','#06141f',['#9fe1ff','#ffe27a'],.55],
 [['star','moon','star','star'],'#12122a','#06060f',['#ffffff','#9fb8ff'],.5]]]
];
var out=T.map(function(t){return [t[0],t[1],t[2],t[3].map(function(v){return V(G,v[0],v[1],v[2],v[3],v[4])})]});
for(var i=out.length-1;i>=0;i--)CATS.unshift(out[i]);
};
window.__twall_tile=160;
})();
