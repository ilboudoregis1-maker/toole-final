#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Inscription simplifiée : retire les règles trop strictes
# Usage :  bash inscription-simple.sh [dossier_du_projet]
# Par défaut : ~/toole-final, sinon ~/tooole
set -e

PROJ="${1:-}"
if [ -z "$PROJ" ]; then
  for d in "$HOME/toole-final" "$HOME/tooole"; do [ -d "$d" ] && PROJ="$d" && break; done
fi
[ -d "$PROJ" ] || { echo "Projet introuvable. Donne le dossier : bash $0 ~/mon-projet"; exit 1; }
echo "Projet : $PROJ"

command -v node >/dev/null || { echo "node est requis (pkg install nodejs)"; exit 1; }

# Fichiers à corriger (hors node_modules / build)
FILES_PSEUDO=$(find "$PROJ" -name pseudo-requis.js -not -path "*/node_modules/*" -not -path "*/build/*" 2>/dev/null)
[ -n "$FILES_PSEUDO" ] || { echo "pseudo-requis.js introuvable dans $PROJ"; exit 1; }

node - $FILES_PSEUDO <<'JS'
const fs = require("fs");
for (const f of process.argv.slice(2)) {
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("/*simple*/")) { console.log("déjà simplifié :", f); continue; }
  fs.writeFileSync(f + ".bak", s);
  // 1) Nouvelle règle de pseudo : 3 à 20 caractères, tout est permis
  const re = /window\.__pseudoOk=function\(p\)\{[\s\S]*?\};\s*window\.__pseudoMsg="[^"]*";/;
  if (!re.test(s)) { console.log("motif non trouvé (fichier modifié ?) :", f); continue; }
  s = s.replace(re,
    '/*simple*/window.__pseudoOk=function(p){p=(p||"").trim();return p.length>=3&&p.length<=20};\n' +
    'window.__pseudoMsg="Pseudo : 3 à 20 caractères";');
  // 2) Texte d'aide moins sévère
  s = s.split("Utilise ton vrai prénom ou nom, lisible par tes contacts (3 à 20 caractères).")
       .join("Choisis le pseudo que tu veux (3 à 20 caractères).");
  fs.writeFileSync(f, s);
  console.log("OK pseudo :", f);
}
JS

echo "Terminé. Une sauvegarde .bak a été créée à côté de chaque fichier modifié."
echo "Ensuite : git add -A && git commit -m 'Inscription simplifiée' && git push, puis lance le build GitHub Actions."
