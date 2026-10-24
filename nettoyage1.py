import sys, re, shutil
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
seen, n = set(), 0
def dedup(m):
    global n
    b = m.group(0)
    if b in seen:
        n += 1
        return ""
    seen.add(b)
    return b
s2 = re.sub(r"<style>.*?</style>", dedup, s, flags=re.S)
open(p, "w", encoding="utf-8").write(s2)
print("Blocs style en double retirés :", n)
