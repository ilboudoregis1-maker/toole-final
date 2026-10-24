import sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
A = '/politique|policy/i.test(a.textContent||"")'
n = s.count(A)
s = s.replace(A, "false")
open(p, "w", encoding="utf-8").write(s)
print("Interception retirée :", n)
