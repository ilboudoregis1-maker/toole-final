#!/data/data/com.termux/files/usr/bin/bash
# TÕÕLé — Inscription : champs Prénom + Nom (tous les noms permis) + correction du bug d'inscription
# Usage :  bash inscription-nom-prenom.sh [dossier_du_projet]
set -e
PROJ="${1:-}"
if [ -z "$PROJ" ]; then
  for d in "$HOME/toole-final" "$HOME/tooole"; do [ -d "$d" ] && PROJ="$d" && break; done
fi
[ -d "$PROJ" ] || { echo "Projet introuvable. Donne le dossier : bash $0 ~/mon-projet"; exit 1; }
command -v node >/dev/null || { echo "node est requis (pkg install nodejs)"; exit 1; }
echo "Projet : $PROJ"

fnd(){ find "$PROJ" -not -path "*/node_modules/*" -not -path "*/build/*" -not -path "*/.git/*" "$@"; }
IDX=$(fnd -name index.html \( -path "*www/*" -o -path "*assets/public/*" \))
COORD=$(fnd -name toole-coord.js)
PSEU=$(fnd -name pseudo-requis.js)
[ -n "$IDX" ] || { echo "index.html introuvable"; exit 1; }

node - "$IDX" "$COORD" "$PSEU" <<'JS'
const fs = require("fs");
const [idx, coord, pseu] = process.argv.slice(2).map(x => x.split("\n").filter(Boolean));

const NEW_SIGNUP = `async function signup(){err("msg","");try{const pseudo=$("ps").value.trim().replace(/\\s+/g," ");if(window.__pseudoOk&&!window.__pseudoOk(pseudo))throw new Error(window.__pseudoMsg);const _d=$("em").value.replace(/\\D/g,"").replace(/^00/,"");/*__bfOnly*/if(!(/^226\\d{8}$/.test(_d)||/^\\d{8}$/.test(_d)))throw new Error("Numéro du Burkina Faso uniquement (+226 XX XX XX XX)");const email=ph2e($("em").value),password=$("pw").value;/*__pseuDup*/try{const _a=await api("/rest/v1/rpc/pseudo_available",{method:"POST",body:JSON.stringify({p:pseudo})});if(_a===false)throw new Error("Ce pseudo est déjà pris")}catch(e){if(e.message==="Ce pseudo est déjà pris")throw e}/*__signup2*/const _login=()=>api("/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email,password})});let j,rec=false;try{j=await api("/auth/v1/signup",{method:"POST",body:JSON.stringify({email,password})})}catch(e){if(/already|registered|exists/i.test(e.message)){rec=true;try{j=await _login()}catch(x){throw new Error("Ce numéro a déjà un compte. Touche « Déjà un compte ? Se connecter ».")}}else throw e}if(!j.access_token){try{j=await _login()}catch(x){throw new Error("Compte créé. Connecte-toi.")}}localStorage.setItem("toole_session",JSON.stringify(j));try{let has=false;if(rec){const r=await api("/rest/v1/profiles?select=pseudo&id=eq."+j.user.id);has=!!(r&&r[0]&&r[0].pseudo)}if(!has)await api("/rest/v1/profiles?on_conflict=id",{method:"POST",headers:{Prefer:"resolution=merge-duplicates,return=minimal"},body:JSON.stringify({id:j.user.id,pseudo})})}catch(e){localStorage.removeItem("toole_session");throw e}goList()}catch(e){err("msg",e.message)}}`;

for (const f of idx) {
  let s = fs.readFileSync(f, "utf8");
  if (s.includes("/*__signup2*/")) { console.log("déjà fait :", f); continue; }
  fs.writeFileSync(f + ".bak2", s);
  let n = 0;
  // 1) Champs Prénom + Nom
  s = s.replace(/<input id="ips" placeholder="Pseudo">/, () => { n++; return '<input id="ips" placeholder="Prénom" autocomplete="given-name"><input id="inom" placeholder="Nom" autocomplete="family-name">'; });
  // 2) Le pseudo = Prénom + Nom
  s = s.replace('$("ps").value=$("ips").value;', () => { n++; return '$("ps").value=(($("ips").value||"").trim()+" "+(($("inom")||{}).value||"").trim()).trim();'; });
  // 3) Nouvelle fonction signup (robuste)
  s = s.replace(/^async function signup\(\)\{.*$/m, () => { n++; return NEW_SIGNUP; });
  console.log(n === 3 ? "OK index :" : "ATTENTION " + n + "/3 modifs :", f);
  fs.writeFileSync(f, s);
}

for (const f of coord) {
  let s = fs.readFileSync(f, "utf8");
  const old = `else if (g("ips").length < 3) err = "Choisis un pseudo d'au moins 3 caractères.";`;
  if (!s.includes(old)) { console.log("coord déjà fait ou différent :", f); continue; }
  fs.writeFileSync(f + ".bak2", s);
  s = s.replace(old, `else if (!g("ips")) err = "Entre ton prénom."; else if (g("inom") === "" && document.getElementById("inom")) err = "Entre ton nom.";`);
  fs.writeFileSync(f, s); console.log("OK coord :", f);
}

for (const f of pseu) {
  let s = fs.readFileSync(f, "utf8");
  if (!s.includes("p.length>=3&&p.length<=20")) { console.log("pseudo-requis déjà fait ou différent :", f); continue; }
  fs.writeFileSync(f + ".bak2", s);
  s = s.replace("p.length>=3&&p.length<=20", "p.length>=2&&p.length<=40")
       .replace("Pseudo : 3 à 20 caractères", "Prénom et nom : 2 à 40 caractères")
       .replace("(3 à 20 caractères)", "(2 à 40 caractères)")
       .replace('maxlength="20"', 'maxlength="40"');
  fs.writeFileSync(f, s); console.log("OK pseudo-requis :", f);
}
JS

echo "Terminé (sauvegardes .bak2). Puis : git add -A && git commit -m 'Inscription Prénom+Nom' && git push, et build GitHub Actions."
