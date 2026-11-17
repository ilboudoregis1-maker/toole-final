#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Augmente la version avant publication
# Usage :  bash version-plus.sh [dossier_du_projet] [nouvelle_version]
#   ex. :  bash version-plus.sh ~/toole-final          -> 2.7.13 devient 2.7.14 (build +1)
#          bash version-plus.sh ~/toole-final 2.8.0    -> impose 2.8.0 (build +1)
set -e
PROJ="${1:-}"
if [ -z "$PROJ" ]; then
  for d in "$HOME/toole-final" "$HOME/tooole"; do [ -d "$d" ] && PROJ="$d" && break; done
fi
[ -d "$PROJ" ] || { echo "Projet introuvable. Donne le dossier : bash $0 ~/mon-projet"; exit 1; }
command -v node >/dev/null || { echo "node est requis (pkg install nodejs)"; exit 1; }
G="$PROJ/android/app/build.gradle"
[ -f "$G" ] || { echo "build.gradle introuvable : $G"; exit 1; }

node - "$G" "$PROJ/package.json" "${2:-}" <<'JS'
const fs = require("fs");
const [g, pkg, forced] = process.argv.slice(2);
let s = fs.readFileSync(g, "utf8");
const mc = s.match(/versionCode\s*=?\s*(\d+)/), mn = s.match(/versionName\s*=?\s*["']([^"']+)["']/);
if (!mc || !mn) { console.log("versionCode/versionName introuvables dans", g); process.exit(1); }
const oldCode = +mc[1], oldName = mn[1];
let newName = forced;
if (!newName) {
  const p = oldName.split(".").map(x => parseInt(x, 10));
  if (p.some(isNaN)) { console.log("Version non numérique :", oldName, "- donne-la en 2e argument"); process.exit(1); }
  p[p.length - 1]++; newName = p.join(".");
}
const newCode = oldCode + 1;
s = s.replace(/(versionCode\s*=?\s*)\d+/, (_, a) => a + newCode)
     .replace(/(versionName\s*=?\s*["'])[^"']+(["'])/, (_, a, b) => a + newName + b);
fs.writeFileSync(g + ".bakv", fs.readFileSync(g)); fs.writeFileSync(g, s);
console.log("build.gradle : " + oldName + " (build " + oldCode + ")  ->  " + newName + " (build " + newCode + ")");
try { const j = JSON.parse(fs.readFileSync(pkg, "utf8")); if (j.version) { j.version = newName; fs.writeFileSync(pkg, JSON.stringify(j, null, 2) + "\n"); console.log("package.json  : version " + newName); } } catch (e) {}
JS

if grep -rqE "versionCode|versionName" "$PROJ/.github" 2>/dev/null; then echo "ATTENTION : le workflow GitHub mentionne la version, vérifie-le."; fi
echo "Ensuite : git add -A && git commit -m 'Version suivante' && git push, puis build GitHub Actions."
