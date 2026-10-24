import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
R = []
def rep(nom, a, b):
    global s
    n = s.count(a)
    if n: s = s.replace(a, b)
    R.append((nom, n))
rep("clignotement connexion",
 'var l=document.getElementById("scrLogin");if(l)l.querySelectorAll("input").forEach(function(i){if(/username|pseudo/i.test(i.placeholder||""))i.closest("div,label")&&(i.closest("div,label").style.display="none")});', "")
rep("liens politique", '/politique|policy/i.test(a.textContent||"")', "false")
rep("double case", 'function ensurePolicyUI(){var box=document.getElementById("scrInscr");',
 'function ensurePolicyUI(){return;var box=document.getElementById("scrInscr");')
if 'id="lgLinks"' in s:
    R.append(("liens ecran connexion", 0))
else:
    L = ('<p id="msg" class="err"></p><p id="lgLinks" style="text-align:center;font-size:13px;margin:18px 0 0;line-height:2">'
         '<a href="#" style="color:#0a3d91;font-weight:600;padding:6px">Conditions d\'utilisation</a><br>'
         '<a href="#" style="color:#0a3d91;font-weight:600;padding:6px">Politique de confidentialité</a></p>')
    rep("liens ecran connexion", '<p id="msg" class="err"></p>', L)
open(p, "w", encoding="utf-8").write(s)
for k, v in R: print(k, ":", v)
