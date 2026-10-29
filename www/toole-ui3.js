(function(){
if(window.__tui3)return;window.__tui3=1;
var R='html:root:root:root:root:root:root body ';
var P=R+'#scrProfil ';
var G=R+'#scrGroupes ';
var C=R+'#scrGroup ';
var css=[
P+'.pf{background:#fff!important;box-shadow:none!important;border:1px solid #e5e7eb!important;border-radius:16px!important;padding:24px 16px 16px!important}',
P+'.pf .big{border:3px solid #fff!important;box-shadow:0 1px 5px rgba(0,0,0,.15)!important}',
P+'.pf h2{color:#111827!important;font-weight:700!important}',
P+'.pf .em{background:#f3f4f6!important;border:0!important;color:#4b5563!important}',
P+'.stats>div,'+P+'.stats>div+div{background:#fff!important;border:1px solid #e5e7eb!important;border-radius:14px!important;box-shadow:none!important}',
P+'.stats b{color:#111827!important}',
P+'.stats span{color:#6b7280!important}',
P+'.menu{background:#fff!important;border:1px solid #e5e7eb!important;border-radius:16px!important;box-shadow:none!important}',
P+'.menu .pm{color:#111827!important;border-bottom:1px solid #f0f1f3!important}',
P+'.menu .pm::before{background:var(--ic) center/18px no-repeat,#6b7280!important;border-radius:10px!important}',
P+'.menu #pfOut,'+P+'.menu #pfOut::after{color:#b42318!important}',
P+'.menu #pfOut::before{background:var(--ic) center/18px no-repeat,#b42318!important}',
R+'.vf-pill,'+R+'.vf-pill.ok{background:#f3f4f6!important;color:#374151!important;border:1px solid #e5e7eb!important;box-shadow:none!important}',
G+'.hdr .ttl{color:#111827!important;font-weight:700!important}',
G+'.sx-add,'+G+'#gNew{background:#2563eb!important;background-image:none!important;box-shadow:none!important;border-radius:12px!important;color:#fff!important}',
G+'.gx-join,'+G+'#gxJoin{background:#fff!important;color:#2563eb!important;border:1px solid #d1d5db!important;box-shadow:none!important;border-radius:12px!important}',
G+'.sx-card{background:#fff!important;border:1px solid #e5e7eb!important;box-shadow:none!important;border-radius:16px!important}',
G+'.sx-row{border-bottom:1px solid #f0f1f3!important}',
C+'.hdr{background:#fff!important;border-bottom:1px solid #e5e7eb!important;box-shadow:none!important}',
C+'.hdr .ttl{color:#111827!important;font-weight:700!important}',
C+'.hdr .ic,'+C+'.hdr button{background:transparent!important;border:0!important;box-shadow:none!important;color:#374151!important}',
C+'.bar{background:#fff!important;border-top:1px solid #e5e7eb!important;box-shadow:none!important}'
].join('\n');
var st=document.createElement('style');st.id='tui3';st.textContent=css;document.head.appendChild(st);
})();
