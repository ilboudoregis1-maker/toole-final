/* TÕÕLé PRO — traduction complète FR <-> EN (texte, placeholders, aria-label, toasts, confirm) */
(function () {
  'use strict';
  var D = {
    "Numéro (+226 70 12 34 56)": "Number (+226 70 12 34 56)",
    "Mot de passe (6 car. min)": "Password (6 chars min)",
    "Accéder à CNS.corp": "Visit CNS.corp",
    "Nouveau message": "New message",
    "Chargement…": "Loading…",
    "Voulez-vous vraiment vous déconnecter ?": "Do you really want to log out?",
    "Voulez-vous vraiment vous déconnecter ?": "Do you really want to log out?",
    /* navigation */
    "Chats": "Chats", "Groupes": "Groups", "Statuts": "Status", "Profil": "Profile", "Paramètres": "Settings",
    "Tous": "All", "Non lus": "Unread", "Contacts": "Contacts", "Récents": "Recent",
    /* accueil / auth */
    "Messagerie simple et sécurisée": "Simple and secure messaging",
    "Se connecter": "Log in", "Créer un compte": "Create account", "Créer mon compte": "Create my account",
    "Déjà un compte ? Se connecter": "Already have an account? Log in",
    "Email": "Email", "Email (ex : nom@exemple.com)": "Email (e.g. name@example.com)",
    "Mot de passe (6 caractères min)": "Password (6 characters min)", "Mot de passe": "Password",
    "Pseudo": "Username", "Pseudo (inscription seulement)": "Username (sign-up only)",
    "J'accepte les": "I accept the", "Conditions d'utilisation": "Terms of Use",
    "Politique de confidentialité": "Privacy Policy", "et la": "and the",
    "Pseudo : 3 caractères minimum": "Username: 3 characters minimum",
    "Compte créé. Connecte-toi.": "Account created. Please log in.",
    "Accepte la politique pour créer ton compte": "Accept the policy to create your account",
    "Accepte les conditions pour continuer": "Accept the terms to continue",
    "6 caractères minimum": "6 characters minimum",
    "Nouveau mot de passe (6 caractères min)": "New password (6 characters min)",
    /* liste */
    "Rechercher un contact ou un groupe": "Search a contact or group",
    "Aucune discussion pour l'instant.": "No conversations yet.",
    "Pseudo du contact": "Contact username", "Ouvrir la discussion": "Open chat",
    "Pseudo pour démarrer une discussion": "Username to start a chat",
    "Pseudo introuvable": "Username not found", "Écris un pseudo": "Enter a username",
    "Contact enregistré": "Contact saved", "Contact retiré de ta liste": "Contact removed from your list",
    "Enregistrer le contact": "Save contact", "+ Enregistrer un contact": "+ Save a contact",
    "Aucun contact enregistré.": "No saved contacts.", "Aucun message non lu.": "No unread messages.",
    "Appui simple : infos · appui long : supprimer": "Tap: info · long-press: delete",
    "Inconnu": "Unknown", "Nouveaux messages": "New messages",
    /* chat */
    "Discussion": "Chat", "Écrire un message": "Write a message", "Message": "Message", "Envoyer": "Send",
    "Retour": "Back", "Vocal": "Voice", "Écouter": "Listen", "Arrêter": "Stop",
    "Partager": "Share", "Partager avec…": "Share with…", "Partager avec": "Share with",
    "Partager avec un contact": "Share with a contact", "Copier": "Copy", "Supprimer": "Delete",
    "Annuler": "Cancel", "Fermer": "Close", "Signaler": "Report", "Signaler ce message": "Report this message",
    "Épingler": "Pin", "Désépingler": "Unpin", "Message épinglé": "Message pinned", "Message désépinglé": "Message unpinned",
    "Message copié": "Message copied", "Message supprimé": "Message deleted", "Message introuvable": "Message not found",
    "Envoyé à": "Sent to", "Aucun contact pour l'instant": "No contacts yet", "Aucun message à épingler": "No message to pin",
    "Signalement envoyé. Merci.": "Report sent. Thank you.",
    "Spam": "Spam", "Harcèlement": "Harassment", "Contenu inapproprié": "Inappropriate content", "Arnaque": "Scam", "Autre": "Other",
    "✕ non envoyé · touche pour réessayer": "✕ not sent · tap to retry",
    "Hors connexion : tes messages seront envoyés plus tard": "Offline: your messages will be sent later",
    "Hors connexion · messages enregistrés sur ce téléphone": "Offline · messages saved on this phone",
    "Hors connexion": "Offline", "Connexion rétablie": "Connection restored", "Pas de connexion": "No connection",
    "Aucun message enregistré sur ce téléphone": "No message saved on this phone",
    "Ouvre une discussion d'abord": "Open a chat first",
    "Vocal limité à 60 secondes": "Voice message limited to 60 seconds",
    "Vocal indisponible sur cette version": "Voice messages unavailable in this version",
    "Micro indisponible": "Microphone unavailable", "Micro indisponible sur cette version": "Microphone unavailable in this version",
    "Micro non disponible sur ce téléphone": "Microphone not available on this phone",
    "Micro refusé : autorise-le dans les réglages de TÕÕLé": "Microphone refused: allow it in TÕÕLé settings",
    "Autorise le micro dans les réglages de TÕÕLé": "Allow the microphone in TÕÕLé settings",
    "Envoie ou supprime le vocal en cours": "Send or delete the current voice message",
    "Je n'ai rien entendu": "I didn't hear anything", "Je t'écoute…": "Listening…",
    "Écris quelque chose": "Write something", "Erreur": "Error", "Expiré": "Expired", "Bientôt disponible": "Coming soon", "Bientôt disponible.": "Coming soon.",
    /* groupes */
    "Créer un groupe": "Create a group", "+ Créer un groupe": "+ Create a group", "Créer": "Create",
    "Nom du groupe": "Group name", "Donne un nom au groupe": "Give the group a name",
    "Pseudos séparés par des virgules": "Usernames separated by commas",
    "Pseudos des membres, séparés par des virgules": "Member usernames, separated by commas",
    "Aucun groupe pour l'instant. Crée le premier.": "No groups yet. Create the first one.",
    "Groupe créé": "Group created", "Groupe quitté": "Group left", "Groupe supprimé": "Group deleted",
    "Quitter ce groupe ?": "Leave this group?", "Quitter le groupe": "Leave group", "Quitter": "Leave",
    "Supprimer ce groupe pour tous les membres ?": "Delete this group for all members?", "Supprimer le groupe": "Delete group",
    "Paramètres du groupe": "Group settings", "Épingler le dernier message": "Pin the last message",
    "Voir les membres": "View members", "Ajouter des membres": "Add members", "Membres et rôles": "Members and roles",
    "Membre": "Member", "Admin": "Admin", "Modérateur": "Moderator", "admin": "admin", "membre": "member",
    "Seuls les admins peuvent écrire": "Only admins can write", "Seuls les admins peuvent écrire ici": "Only admins can write here",
    "Créé par toi": "Created by you", "Enregistrer": "Save", "Écris au moins un pseudo": "Enter at least one username",
    /* statuts */
    "Ajouter un statut": "Add a status", "+ Ajouter un statut": "+ Add a status", "Mon statut": "My status", "Statut": "Status",
    "Statuts des contacts": "Contact statuses", "Statut publié": "Status published", "Statut supprimé": "Status deleted",
    "Écris ton statut (280 caractères max)": "Write your status (280 characters max)",
    "Aucun statut actif. Touche + pour publier.": "No active status. Tap + to post.",
    "Aucun statut de tes contacts pour l'instant.": "No statuses from your contacts yet.",
    "Publier": "Post", "Vues": "Views", "Personne pour l'instant": "Nobody yet",
    "Réaction envoyée": "Reaction sent", "Réaction non enregistrée": "Reaction not saved", "Réaction :": "Reaction:",
    "Supprimer mon statut": "Delete my status",
    /* profil */
    "Profil utilisateur": "User profile", "Mon compte": "My account", "Modifier mes infos": "Edit my info", "Sécurité": "Security",
    "Déconnexion": "Log out", "Oui, me déconnecter": "Yes, log me out", "Messages": "Messages", "Amis": "Friends",
    "♥ Soutenir TÕÕLé": "♥ Support TÕÕLé", "Soutenir TÕÕLé": "Support TÕÕLé", "Site CNS.corp": "CNS.corp website",
    "Pseudo mis à jour": "Username updated", "Mot de passe modifié": "Password changed",
    /* réglages */
    "Compte": "Account", "Changer le mot de passe": "Change password", "Confidentialité": "Privacy",
    "Confidentialité et sécurité": "Privacy and security", "Confirmer la lecture": "Read receipts",
    "Notifications": "Notifications", "Vibration à l'appui long": "Vibration on long-press",
    "Sons et effets au toucher": "Touch sounds and effects", "Apparence": "Appearance", "Couleur du thème": "Theme color",
    "Langue": "Language", "Français": "French", "English": "English", "Paramètres enregistrés": "Settings saved",
    "Mode": "Mode", "Automatique": "Automatic", "Clair": "Light", "Sombre": "Dark", "Taille du texte": "Text size",
    "Petite": "Small", "Normale": "Normal", "Grande": "Large", "Très grande": "Extra large",
    "Le mode Automatique suit le réglage de ton téléphone.": "Automatic mode follows your phone's setting.",
    "Données": "Data", "Vider le cache local": "Clear local cache", "Réinitialiser les réglages": "Reset settings",
    "Cache vidé": "Cache cleared", "Réglages réinitialisés": "Settings reset",
    "Réinitialiser les réglages d'affichage ?": "Reset display settings?", "À propos": "About", "Version": "Version",
    "Contacter l'équipe": "Contact the team", "Éditée par CNS.corp (Burkina Faso)": "Published by CNS.corp (Burkina Faso)",
    "Messages envoyés": "Sent messages", "Messages vocaux": "Voice messages", "Suppression des messages": "Message deletion",
    "Appels vocaux et vidéo": "Voice and video calls", "Assistant intelligent": "Smart assistant", "Discussions": "Discussions",
    "Définition automatique": "Automatic setting", "Email, mot de passe": "Email, password",
    /* CANIX UI */
    "En ligne · Assistant intelligent": "Online · Smart assistant", "Synthèse vocale": "Text-to-speech",
    "Voix féminine": "Female voice", "Voix masculine": "Male voice", "Effacer l'historique": "Clear history",
    "Écrire à CANIX AI…": "Write to CANIX AI…", "Historique effacé.": "History cleared.",
    "Effacer toute la conversation avec CANIX ?": "Delete the whole conversation with CANIX?",
    "Créer un groupe ": "Create a group", "Comment TÕÕLé a été créé": "How TÕÕLé was created", "Comment ça marche": "How does it work",
    "Les statuts": "Statuses", "Bonjour, je suis CANIX": "Hello, I'm CANIX",
    "Micro": "Microphone", "Aide TÕÕLé": "TÕÕLé help", "Conseils sécurité": "Safety tips", "Jeux burkinabè": "Burkinabè games",
    "Comment ça marche ": "How it works", "Protège ton compte": "Protect your account", "Partage un moment": "Share a moment",
    "Joue et détends-toi": "Play and relax",
    /* soutien */
    "Merci d'être là.": "Thank you for being here.",
    "TÕÕLé est née d'une conviction : une messagerie burkinabè peut être simple, sûre et pensée pour nous. Chaque test, chaque bug corrigé et chaque longue nuit ont servi cette idée.": "TÕÕLé was born from a conviction: a Burkinabè messaging app can be simple, safe and made for us. Every test, every bug fixed and every long night served that idea.",
    "Si TÕÕLé t'aide à rester en contact avec les tiens, ton soutien compte. Il finance les améliorations, la sécurité et la stabilité de l'appli, et il nous permet de la garder gratuite pour tous.": "If TÕÕLé helps you stay in touch with your loved ones, your support matters. It funds improvements, security and stability, and lets us keep the app free for everyone.",
    "Chaque geste, même petit, nous encourage à aller plus loin. Merci.": "Every gesture, however small, encourages us to go further. Thank you.",
    "Choisis un montant :": "Choose an amount:",
    "Tu fais partie de l'aventure TÕÕLé.": "You are part of the TÕÕLé adventure.",
    "Chaque message envoyé, chaque vocal partagé et chaque idée remontée nous rapprochent d'une appli burkinabè meilleure. Ton soutien, même modeste, permet de corriger les bugs, d'ajouter de nouvelles fonctions et de garder TÕÕLé gratuit pour tout le monde. Merci d'être là.": "Every message sent, every voice note shared and every idea reported brings us closer to a better Burkinabè app. Your support, however modest, helps fix bugs, add new features and keep TÕÕLé free for everyone. Thank you for being here.",
    "Le téléphone va préparer le code. Tu n'as qu'à appuyer sur appel pour valider.": "Your phone will prepare the code. Just press call to confirm.",
    "Le composeur va s'ouvrir avec le code prêt. Tu tapes ton code secret puis tu valides.": "The dialer will open with the code ready. Enter your secret code, then confirm.",
    "Ouvrir le composeur": "Open the dialer", "Envoyer ma déclaration": "Send my declaration",
    /* politique */
    "POLITIQUE DE CONFIDENTIALITÉ ET CONDITIONS D'UTILISATION DE TÕÕLé": "PRIVACY POLICY AND TERMS OF USE OF TÕÕLé",
    "Avertissement de TÕÕLé": "TÕÕLé notice", "Politique de TÕÕLé": "TÕÕLé policy", "Lire la suite": "Read more", "Réduire": "Collapse",
    "J’ai payé": "I have paid", "Choisis ton opérateur": "Choose your operator", "Confirmer ton soutien": "Confirm your support",
    "Opérateur indisponible": "Operator unavailable", "Ton numéro (facultatif)": "Your number (optional)",
    "Référence du SMS (facultatif)": "SMS reference (optional)", "Accéder à CNS.corp": "Go to CNS.corp",
    "Merci ! Ton soutien aide à améliorer TÕÕLé.": "Thank you! Your support helps improve TÕÕLé.",
    "Merci ! Ta déclaration est enregistrée.": "Thank you! Your declaration has been recorded."
  };
  /* motifs dynamiques (regex FR -> remplacement EN) */
  var P = [
    [/^Toi : (.*)$/s, "You: $1"],
    [/^Épinglé : (.*)$/s, "Pinned: $1"],
    [/^Membres \((\d+)\)$/, "Members ($1)"],
    [/^(\d+) membres?$/, "$1 member(s)"],
    [/^(\d+) membre\(s\) ajouté\(s\)$/, "$1 member(s) added"],
    [/^Messages échangés : (\d+)$/, "Messages exchanged: $1"],
    [/^Chercher le pseudo « ?(.*?) ?»$/, "Search for username “$1”"],
    [/^Montant : (.*)$/, "Amount: $1"],
    [/^Tu vas envoyer (.*?) FCFA à (.*)$/, "You are about to send $1 FCFA to $2"],
    [/^Tu vas envoyer (.*?) FCFA par (.*)$/, "You are about to send $1 FCFA via $2"],
    [/^Tu as envoyé (.*?) FCFA par (.*?) \? Merci\.$/, "Did you send $1 FCFA via $2? Thank you."],
    [/^Vu par (\d+)$/, "Seen by $1"], [/^(\d+) vues?$/, "$1 view(s)"],
    [/^Hier$/, "Yesterday"], [/^Aujourd.hui$/, "Today"],
    [/^il y a (\d+) ?min$/, "$1 min ago"], [/^il y a (\d+) ?h$/, "$1 h ago"],
    [/^(.*) · groupe$/, "$1 · group"], [/^(.*) · ✓ envoyé$/, "$1 · ✓ sent"],
    [/^Micro : (.*)$/, "Microphone: $1"], [/^ERREUR JS: (.*)$/, "JS ERROR: $1"]
  ];
  /* ================== MOTEUR DE LANGUES : FR / EN / MOORÉ ==================
     - Le texte source de l'appli est en FRANÇAIS. EN et Mooré sont des traductions
       appliquées à l'écran (texte, placeholder, aria-label, title, alt, toasts, confirm/alert).
     - Compléments EN : toole-lang-en.js     (window.TOOLE_LANG.en)
     - Mooré         : toole-mos.js          (window.TOOLE_LANG.mos) — un texte non traduit reste en français.
     - Débogage      : TOOLE_missing() liste les textes encore en français à l'écran. */
  var LANGS = { fr: 1, en: 1, mos: 1 };
  var RELOAD_ON_EN = false; /* recharge l'appli quand on passe vers/depuis l'anglais (certains écrans figent la langue au démarrage) */
  var X = window.TOOLE_LANG || {};
  var XEN = X.en || {}, XMOS = X.mos || {};
  Object.keys(XEN.dict || {}).forEach(function (k) { if (D[k] === undefined) D[k] = XEN.dict[k]; });
  (XEN.pat || []).forEach(function (p) { P.push(p); });

  function norm(s) { return String(s).replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim(); }
  var DICT = { en: {}, mos: {} }, PAT = { en: P, mos: XMOS.pat || [] }, REV = {};
  Object.keys(D).forEach(function (k) { DICT.en[norm(k)] = D[k]; if (!REV[norm(D[k])]) REV[norm(D[k])] = k; });
  Object.keys(XMOS.dict || {}).forEach(function (k) { if (XMOS.dict[k]) DICT.mos[norm(k)] = XMOS.dict[k]; });

  function lang() {
    try { var v = localStorage.getItem('toole_lang'); if (LANGS[v] === 1) return v; } catch (e) { }
    try { return /^en/i.test(navigator.language || '') ? 'en' : 'fr'; } catch (e) { return 'fr'; }
  }
  function fixUnits(s, L) {
    if (L !== 'en') return s;
    return s.replace(/(\d+)\s*jours?\b/g, function (m, a) { return a + (a === '1' ? ' day' : ' days'); })
      .replace(/(\d+)\s*heures?\b/g, function (m, a) { return a + (a === '1' ? ' hour' : ' hours'); })
      .replace(/(\d+)\s*secondes?\b/g, function (m, a) { return a + (a === '1' ? ' second' : ' seconds'); })
      .replace(/(\d+(?:[.,]\d+)?)\s*(Mo|Ko|Go)\b/g, function (m, a, u) { return a + ' ' + u.replace('o', 'B'); });
  }
  var DECOR = /^([^A-Za-z0-9\u00C0-\u00FF\u0152\u0153]*)([\s\S]*?)([\s…:.!?;]*)$/;
  /* traduit un texte « propre » (sans espaces autour) ; renvoie le même texte si inconnu */
  function tr(v, L) {
    var n = norm(v); if (!n || L === 'fr') return v;
    var d = DICT[L]; if (!d) return v;
    if (d[n] !== undefined) return d[n];
    var p = PAT[L] || [], i;
    for (i = 0; i < p.length; i++) { if (p[i][0].test(n)) return fixUnits(n.replace(p[i][0], p[i][1]), L); }
    var m = n.match(DECOR);
    if (m && m[2] && (m[1] || m[3])) {
      var core = m[2], t = d[core];
      if (t === undefined) { for (i = 0; i < p.length; i++) { if (p[i][0].test(core)) { t = fixUnits(core.replace(p[i][0], p[i][1]), L); break; } } }
      if (t !== undefined) { var suf = L === 'en' ? m[3].replace(/^\s+(?=[:?!;])/, '') : m[3]; return m[1] + t + suf; }
    }
    return v;
  }
  function trKeep(src, L) {
    if (typeof src !== 'string' || L === 'fr') return src;
    var core = src.trim(); if (!core) return src;
    var t = tr(core, L); if (t === core) return src;
    var i = src.indexOf(core); return src.slice(0, i) + t + src.slice(i + core.length);
  }
  function T(v) { return trKeep(v, lang()); }
  window.TOOLE_T = T;
  window.TOOLE_I18N = { dict: D, lang: lang, tr: function (s, l) { return trKeep(s, l || lang()); } };

  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
  var SKIPSEL = '.m,.c2-b,.cxb,#cxIn,.pol,[data-notr]';
  var rec = new WeakMap(); /* nœud texte -> { o: original FR, w: texte écrit par nous } */
  function doText(n) {
    var p = n.parentNode; if (!p || SKIP[p.nodeName]) return;
    if (p.closest && p.closest(SKIPSEL)) return;
    var v = n.nodeValue; if (!v || !v.trim()) return;
    var L = lang(), r = rec.get(n), src = v;
    if (r && v === r.w) src = r.o; else if (r) { rec.delete(n); r = null; }
    if (!r && L !== 'en') { var rv = REV[norm(v)]; if (rv && norm(rv) !== norm(v)) src = v.replace(v.trim(), rv); }
    var out = L === 'fr' ? src : trKeep(src, L);
    if (out === v) return;
    if (out === src) { rec.delete(n); } else { rec.set(n, { o: src, w: out }); }
    n.nodeValue = out;
  }
  var ATTR = ['placeholder', 'aria-label', 'title', 'alt'];
  function doEl(el) {
    if (!el.getAttribute) return;
    for (var i = 0; i < ATTR.length; i++) {
      var a = ATTR[i], v = el.getAttribute(a); if (!v) continue;
      var ko = 'data-fr-' + a, kw = 'data-tr-' + a, o = el.getAttribute(ko), w = el.getAttribute(kw), L = lang(), src = v;
      if (o !== null && v === w) src = o; else if (o !== null) { el.removeAttribute(ko); el.removeAttribute(kw); o = null; }
      if (o === null && L !== 'en') { var rv = REV[norm(v)]; if (rv && norm(rv) !== norm(v)) src = rv; }
      var out = L === 'fr' ? src : trKeep(src, L);
      if (out === v) continue;
      if (out === src) { el.removeAttribute(ko); el.removeAttribute(kw); } else { el.setAttribute(ko, src); el.setAttribute(kw, out); }
      el.setAttribute(a, out);
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    doEl(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) doText(n); else doEl(n); }
  }
  var busy = false, mo = null;
  var cfg = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] };
  function apply(root) {
    if (busy) return; busy = true;
    try { if (mo) mo.disconnect(); walk(root || document.body); } catch (e) { }
    busy = false; attach();
  }
  function attach() {
    if (!mo) {
      mo = new MutationObserver(function (list) {
        if (busy) return; busy = true; mo.disconnect();
        try {
          list.forEach(function (m) {
            if (m.type === 'characterData') doText(m.target);
            else if (m.type === 'attributes') doEl(m.target);
            else m.addedNodes.forEach(walk);
          });
        } catch (e) { }
        busy = false; mo.observe(document.body, cfg);
      });
    }
    mo.observe(document.body, cfg);
  }

  function wrap(name) {
    var f = window[name]; if (typeof f !== 'function' || f.__tr) return;
    var w = function (m) { var a = Array.prototype.slice.call(arguments); if (typeof a[0] === 'string') a[0] = T(a[0]); return f.apply(this, a); };
    w.__tr = 1; window[name] = w;
  }
  window.confirm = (function (c) { return function (m) { return c.call(window, T(String(m))); }; })(window.confirm.bind(window));
  window.alert = (function (a) { return function (m) { return a.call(window, T(String(m))); }; })(window.alert.bind(window));

  /* ---- changement de langue ---- */
  function setLang(l) {
    if (LANGS[l] !== 1) l = 'fr';
    var before = lang();
    try { localStorage.setItem('toole_lang', l); } catch (e) { }
    document.documentElement.lang = l;
    wrap('toast'); apply(document.body);
    document.querySelectorAll('.lg .it').forEach(function (e) { var d = e.querySelector('.dot'); if (d) d.classList.toggle('on', e.dataset.l === l); });
    document.querySelectorAll('.lang-sw button').forEach(function (b) { b.classList.toggle('on', b.dataset.l === l); });
    document.dispatchEvent(new CustomEvent('toole:lang', { detail: l }));
    if (RELOAD_ON_EN && before !== l && (before === 'en' || l === 'en')) setTimeout(function () { try { location.reload(); } catch (e) { } }, 180);
  }
  window.TOOLE_setLang = setLang;

  /* textes restés en français à l'écran quand la langue n'est pas FR (aide à compléter les traductions) */
  window.TOOLE_missing = function () {
    var out = {}, w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      var v = n.nodeValue.trim();
      if (v.length > 2 && /[àâçéèêëîïôûùüœ]|\b(le|la|les|des|pour|ton|tes|vous|une?)\b/i.test(v) && !n.parentNode.closest('script,style,.m,.c2-b')) out[v] = 1;
    }
    return Object.keys(out);
  };

  function boot() {
    var l = lang();
    document.documentElement.lang = l;
    wrap('toast');
    window.applyLang = function (x) { setLang(x); };
    window.tp = function () { apply(document.body); };
    document.addEventListener('click', function (ev) {
      var it = ev.target.closest && ev.target.closest('.lg .it');
      if (it && it.dataset.l) { ev.stopImmediatePropagation(); setLang(it.dataset.l); }
    }, true);
    document.querySelectorAll('.lg .it').forEach(function (e) { var d = e.querySelector('.dot'); if (d) d.classList.toggle('on', e.dataset.l === l); });
    apply(document.body);
    [300, 1200, 3000].forEach(function (t) { setTimeout(function () { apply(document.body); }, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
