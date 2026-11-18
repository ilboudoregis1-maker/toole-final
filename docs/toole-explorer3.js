/* TÕÕLé — Explorer 3 : icônes SVG à la place des emojis */
(function(){"use strict";if(window.__tx3)return;window.__tx3=1;
var P={star:'<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/>',
mark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
play:'<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>',
heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
msg:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 20l1.1-4.9A8.4 8.4 0 1 1 21 11.5z"/>',
bin:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
plus:'<path d="M12 5v14M5 12h14"/>',back:'<path d="M15 18l-6-6 6-6"/>'};
function svg(k,s,fill){return '<svg viewBox="0 0 24 24" width="'+s+'" height="'+s+'" fill="'+(fill||"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+P[k]+'</svg>'}
function seg(){document.querySelectorAll("#scrDecouvrir .dc-seg button").forEach(function(b){
if(b.querySelector("svg"))return;
var k=b.classList.contains("tv-b")?"play":({posts:"star",saved:"mark",people:"users"})[b.dataset.k];if(!k)return;
var t=b.textContent.replace(/\uD83C\uDFAC/g,"").trim();b.textContent="";b.insertAdjacentHTML("afterbegin",svg(k,15));b.appendChild(document.createTextNode(t))})}
function rail(){document.querySelectorAll("#tvScr .tvr button i").forEach(function(i){
if(i.firstElementChild)return;var t=i.textContent,h="";
if(t==="\uD83E\uDD0D")h=svg("heart",30);
else if(t==="\u2764\uFE0F"||t==="\u2764")h='<span style="color:#ff3b5c;display:flex">'+svg("heart",30,"currentColor")+'</span>';
else if(t==="\uD83D\uDCAC")h=svg("msg",29);
else if(t==="\uD83D\uDDD1")h=svg("bin",27);
if(h)i.innerHTML=h});
document.querySelectorAll("#tvFeed .tvh .sq").forEach(function(b){if(b.firstElementChild)return;var t=b.textContent;
if(t==="\u2039")b.innerHTML=svg("back",22);else if(t==="+")b.innerHTML=svg("plus",22)})}
function tick(){seg();rail()}
tick();setInterval(tick,300);
})();
