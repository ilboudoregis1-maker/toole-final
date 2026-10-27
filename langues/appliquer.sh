#!/data/data/com.termux/files/usr/bin/bash
# Installe le moteur FR / EN / Mooré dans l'appli (à lancer depuis la racine du projet : bash langues/appliquer.sh).
set -e
cd "$(dirname "$0")/.."
found=0
for IDX in $(find . -name index.html -not -path './node_modules/*' -not -path './.git/*' -not -path './langues/*' -not -path './android/app/build/*'); do
  D=$(dirname "$IDX")
  [ -f "$D/toole-i18n.js" ] || continue
  found=1
  echo "→ $D"
  cp langues/toole-i18n.js langues/toole-lang-en.js "$D/"
  [ -f "$D/toole-mos.js" ] || cp langues/toole-mos.js "$D/"
  grep -q 'toole-lang-en.js' "$D/index.html" || sed -i 's|<script src="toole-i18n.js"></script>|<script src="toole-lang-en.js"></script><script src="toole-mos.js"></script><script src="toole-i18n.js"></script>|' "$D/index.html"
  grep -q 'data-l="mos"' "$D/index.html" || sed -i 's|<span>English</span></div>|<span>English</span></div><div class="it" data-l="mos"><span class="dot"></span><span>Mooré</span></div>|; s|<button data-l="en">EN</button>|<button data-l="en">EN</button><button data-l="mos">MO</button>|' "$D/index.html"
  a=$(grep -c 'toole-lang-en.js' "$D/index.html" || true); b=$(grep -o 'data-l="mos"' "$D/index.html" | wc -l)
  if [ "$a" -ge 1 ] && [ "$b" -ge 2 ]; then echo "  ✓ index.html OK (scripts + bouton Mooré)"; else echo "  ✗ index.html : modification incomplète (scripts=$a, boutons=$b)"; fi
done
[ "$found" = 1 ] || { echo "✗ Aucun dossier contenant index.html + toole-i18n.js trouvé. Lance la commande depuis la racine du projet (cd ~/toole-final)."; exit 1; }
echo "✓ Terminé. Vérifie avec : git status"
