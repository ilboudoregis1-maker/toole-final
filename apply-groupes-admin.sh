#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Groupes : créateur admin + vrai code d'invitation (côté appli)
# (À faire AVANT : exécuter groupes-admin.sql dans Supabase > SQL Editor)
# Usage (dans ~/toole-final) : bash apply-groupes-admin.sh
set -e
cd ~/toole-final || { echo "Dossier ~/toole-final introuvable"; exit 1; }
git checkout main
cat > www/toole-groupes-fix.js <<'EOFJS'
/* TÕÕLé — groupes : une modification refusée par le serveur n'est plus affichée comme réussie */
(function () {
  "use strict";
  if (window.__gfx2) return; window.__gfx2 = 1;
  var base = window.api; if (typeof base !== "function") return;
  var RE_G = /^\/rest\/v1\/groups\?id=eq\.[^&]+$/, RE_M = /^\/rest\/v1\/group_members\?group_id=eq\.[^&]+&user_id=eq\.[^&]+$/;
  window.api = function (path, opt) {
    var p = String(path), o = opt || {}, m = String(o.method || "GET").toUpperCase();
    if (m === "PATCH" && (RE_G.test(p) || RE_M.test(p))) {
      var h = Object.assign({}, o.headers || {}, { Prefer: "return=representation" });
      return base.call(this, p, Object.assign({}, o, { headers: h })).then(function (rows) {
        if (Array.isArray(rows) && !rows.length) throw new Error("Modification refusée par le serveur (droits). Lance groupes-admin.sql dans Supabase.");
        return rows;
      });
    }
    return base.apply(this, arguments);
  };
})();
EOFJS
grep -q "toole-groupes-fix.js" www/index.html || sed -i 's#<script src="toole-groupes-pro.js"></script>#<script src="toole-groupes-pro.js"></script><script src="toole-groupes-fix.js"></script>#' www/index.html
grep -q "toole-groupes-fix.js" www/index.html || { echo "ERREUR : toole-groupes-pro.js absent de www/index.html (lance d'abord apply-groupes-code.sh)"; exit 1; }
git add -A
git commit -m "Groupes : créateur admin, erreurs de droits visibles"
git push
gh workflow run build.yml
sleep 8
ID=$(gh run list --workflow=build.yml --branch main --limit 1 --json databaseId -q '.[0].databaseId')
echo "Build : $ID"
gh run watch "$ID" --exit-status
gh run download "$ID" -D ~/storage/downloads/tooole-apk
