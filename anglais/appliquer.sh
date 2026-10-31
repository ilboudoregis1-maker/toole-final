#!/data/data/com.termux/files/usr/bin/bash
# Installe la traduction anglaise complète (sans mooré). À lancer depuis la racine du projet : bash anglais/appliquer.sh
set -e
cd "$(dirname "$0")/.."
found=0
for IDX in $(find . -name index.html -not -path './node_modules/*' -not -path './.git/*' -not -path './anglais/*' -not -path './android/app/build/*' -not -path './android/app/src/main/assets/public/*'); do
  D=$(dirname "$IDX")
  [ -f "$D/toole-i18n.js" ] || continue
  found=1
  echo "→ $D"
  cp anglais/toole-i18n.js anglais/toole-lang-en.js "$D/"
  grep -q 'toole-lang-en.js' "$D/index.html" || sed -i 's|<script src="toole-i18n.js"></script>|<script src="toole-lang-en.js"></script><script src="toole-i18n.js"></script>|' "$D/index.html"
  if grep -q 'toole-lang-en.js' "$D/index.html"; then echo "  ✓ index.html OK"; else echo "  ✗ index.html non modifié"; fi
done
[ "$found" = 1 ] || { echo "✗ Dossier www introuvable : lance depuis ~/toole-final"; exit 1; }
echo "✓ Terminé. Vérifie avec : git status"
