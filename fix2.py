import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
A = 'var l=document.getElementById("scrLogin");if(l)l.querySelectorAll("input").forEach(function(i){if(/username|pseudo/i.test(i.placeholder||""))i.closest("div,label")&&(i.closest("div,label").style.display="none")});'
n = s.count(A)
s = s.replace(A, "")
open(p, "w", encoding="utf-8").write(s)
print("Minuteries retirées :", n)
