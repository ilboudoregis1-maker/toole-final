#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Session stable : fin des déconnexions « surprise » et du login qui ne répond pas
# Usage :  bash session-stable.sh [dossier_du_projet]
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
  if (s.includes("/*__sess2*/")) { console.log("déjà fait :", f); continue; }
  fs.writeFileSync(f + ".bak3", s);
  const log = [];
  const rep = (name, from, to) => {
    const hits = typeof from === "string" ? s.split(from).length - 1 : (s.match(from) || []).length;
    if (!hits) { log.push("MANQUE " + name); return; }
    s = s.replace(from, typeof to === "function" ? to : () => to);
    log.push("ok " + name + (hits > 1 ? " (x" + hits + ")" : ""));
  };

  // 1) Ne pas envoyer l'ancien jeton expiré quand on se connecte / s'inscrit
  rep("sans jeton sur connexion",
    'if(s&&s.access_token)h.Authorization="Bearer "+s.access_token;',
    'if(s&&s.access_token&&!/^\\/auth\\/v1\\/(token|signup)/.test(path))h.Authorization="Bearer "+s.access_token;/*__sess2*/');

  // 2) Connexion : on efface l'ancienne session avant
  rep("login nettoie",
    'async function login(){err("msg","");try{',
    'async function login(){err("msg","");try{localStorage.removeItem("toole_session");');

  // 3) Ne renouveler le jeton que s'il expire dans moins de 5 min (moins de risque de le perdre)
  rep("renouvellement rare",
    /function _rfOnce\(\)\{\s*if\(_rfP\)return _rfP;/,
    'function _rfOnce(){ if(_rfP)return _rfP; try{const s0=sess();if(s0&&s0.access_token&&s0.refresh_token&&Date.now()-(window.__rfNeed||0)>60000){const ex=JSON.parse(atob(s0.access_token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))).exp;if(ex&&ex*1000-Date.now()>300000)return Promise.resolve(s0)}}catch(e){}');

  // 4) Si le serveur répond « expiré », on force le renouvellement
  rep("forcer si 401",
    'if(!/JWT|expired|401/i.test(e.message)||path.indexOf("/auth/v1/token")>-1)throw e;',
    'if(!/JWT|expired|401/i.test(e.message)||path.indexOf("/auth/v1/token")>-1)throw e;window.__rfNeed=Date.now();');

  // 5) Déconnexion seulement si le serveur dit vraiment que le jeton est mort
  rep("déconnexion ciblée",
    "/invalid|refresh|expired|JWT|400|401/i",
    "/invalid refresh token|refresh token not found|already used|session_not_found|invalid_grant|refresh_token_not_found/i");

  fs.writeFileSync(f, s);
  console.log(f); log.forEach(l => console.log("  " + l));
}
JS
echo "Terminé (sauvegardes .bak3). Puis : git add -A && git commit -m 'Session stable' && git push, et build GitHub Actions."
