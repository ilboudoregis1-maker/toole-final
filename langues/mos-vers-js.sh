#!/data/data/com.termux/files/usr/bin/bash
# Transforme langues/mos.txt en toole-mos.js et le copie dans l'appli.
set -e
cd "$(dirname "$0")/.."
T=langues/mos.txt
[ -f "$T" ] || { echo "Introuvable : $T"; exit 1; }
if grep -n -F -e '`' -e '\' -e '${' "$T"; then
  echo "✗ Retire les caractères ci-dessus (accent grave, antislash ou \${) puis relance."; exit 1
fi
OUT=langues/toole-mos.js
{
  printf '%s\n' '/* Généré par langues/mos-vers-js.sh depuis langues/mos.txt — modifie mos.txt, pas ce fichier. */'
  printf '%s\n' 'window.TOOLE_LANG=window.TOOLE_LANG||{};(function(){var TXT=`'
  cat "$T"
  printf '\n%s\n' '`;var d={};TXT.split("\n").forEach(function(l){l=l.trim();if(!l||l.charAt(0)==="#")return;var i=l.indexOf(" = ");if(i<1)return;var k=l.slice(0,i).trim(),v=l.slice(i+3).trim();if(k&&v)d[k]=v});window.TOOLE_LANG.mos={dict:d,pat:[]}})();'
} > "$OUT"
n=$(awk -F' = ' '$1!~/^#/ && NF>=2 && length($2)>0 {c++} END{print c+0}' "$T")
for IDX in $(find . -name index.html -not -path './node_modules/*' -not -path './.git/*' -not -path './langues/*' -not -path './android/app/build/*'); do
  D=$(dirname "$IDX")
  [ -f "$D/toole-i18n.js" ] && cp "$OUT" "$D/toole-mos.js" && echo "→ $D/toole-mos.js"
done
echo "✓ $n texte(s) en mooré activé(s)."
