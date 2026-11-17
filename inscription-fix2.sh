#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Inscription : ajoute vraiment les champs Prénom + Nom et envoie nom/prenom/pseudo au serveur
# (corrige « Nom d'utilisateur invalide » = pseudo vide reçu par le serveur)
# Usage :  bash inscription-fix2.sh [dossier_du_projet]
set -e
PROJ="${1:-}"
if [ -z "$PROJ" ]; then
  for d in "$HOME/toole-final" "$HOME/tooole"; do [ -d "$d" ] && PROJ="$d" && break; done
fi
[ -d "$PROJ" ] || { echo "Projet introuvable. Donne le dossier : bash $0 ~/mon-projet"; exit 1; }
command -v node >/dev/null || { echo "node est requis (pkg install nodejs)"; exit 1; }
echo "Projet : $PROJ"
IDX=$(find "$PROJ" -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" -name index.html \( -path "*www/*" -o -path "*assets/public/*" \))
[ -n "$IDX" ] || { echo "index.html introuvable"; exit 1; }

node - "$IDX" <<'JS'
const fs = require("fs");
for (const f of process.argv[2].split("\n").filter(Boolean)) {
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("/*__fix2*/")) { console.log("déjà fait :", f); continue; }
  fs.writeFileSync(f + ".bak4", s);
  const log = [];
  const rep = (name, from, to) => {
    const ok = typeof from === "string" ? s.includes(from) : from.test(s);
    if (!ok) { log.push("MANQUE " + name); return; }
    s = s.replace(from, () => to); log.push("ok " + name);
  };
  // 1) Les deux champs à l'écran
  if (!s.includes('id="inom"'))
    rep("champs Prénom + Nom", /<input id="ips" placeholder="[^"]*">/,
      '<input id="ips" placeholder="Prénom" autocomplete="given-name"><input id="inom" placeholder="Nom" autocomplete="family-name">');
  else log.push("champ Nom déjà présent");
  // 2) Le pseudo est lu directement dans les champs (plus de dépendance au champ caché)
  rep("pseudo depuis les champs",
    'const pseudo=$("ps").value.trim().replace(/\\s+/g," ");',
    'const _pn=(($("ips")||{}).value||"").trim(),_nn=(($("inom")||{}).value||"").trim();const pseudo=((_pn+" "+_nn).trim()||$("ps").value).trim().replace(/\\s+/g," ");/*__fix2*/if(!pseudo)throw new Error("Écris ton prénom et ton nom.");');
  // 3) Envoi de nom, prenom et pseudo
  rep("envoi nom/prenom/pseudo",
    'JSON.stringify({id:j.user.id,pseudo})',
    'JSON.stringify(Object.assign({id:j.user.id,pseudo},_nn?{prenom:_pn,nom:_nn}:{}))');
  fs.writeFileSync(f, s);
  console.log(f); log.forEach(l => console.log("  " + l));
}
JS
echo "Terminé (sauvegardes .bak4). Puis : bash version-plus.sh, git add -A && git commit -m 'Inscription Prénom+Nom' && git push, et build GitHub Actions."
