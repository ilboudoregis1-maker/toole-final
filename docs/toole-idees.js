/* TÕÕLé — Idées de conversation, version approfondie
   - toute la feuille défile à tout moment (plus de petite liste bloquée)
   - 60 conversations guidées en 3 temps : ① ouvrir  ② relancer  ③ aller plus loin
   - 5 relations × 3 niveaux de proximité (ou tout mélangé), plus des jeux ; « Autre idée » ne répète pas avant d’avoir tout vu
   - rien n’est envoyé tout seul : l’idée choisie est placée dans le champ de message */
(function () {
  "use strict";
  if (window.__tidee) return; window.__tidee = 1;
  var LSK = "toole_rel:";
  var RELS = [["love", "❤️", "Amoureux(se)"], ["friend", "😄", "Ami(e)"], ["family", "👨‍👩‍👧", "Famille"], ["work", "💼", "Travail"], ["new", "🌱", "On se découvre"]];
  var LVLS = [["🌤️", "Pour commencer"], ["💞", "Plus proches"], ["💎", "Très proches"], ["🎲", "Tout mélanger"]];
  var STEPS = ["① Ouvrir", "② Relancer", "③ Aller plus loin"];
  var HINT = ["Pour lancer la conversation", "À envoyer quand l’autre a répondu, pour creuser", "Pour aller au fond du sujet"];

  /* [thème, ouverture, relance, question profonde] */
  var C = {
    love: [[
      ["☀️ Ta journée", "Qu’est-ce qui t’a fait sourire aujourd’hui ? 😊", "Si je pouvais ajouter une chose à ta journée de demain, ce serait quoi ?", "Quand est-ce que tu t’es senti(e) le plus « toi » cette semaine ?"],
      ["🍲 Saveurs", "Quel plat te rend instantanément heureux(se) ? 😋", "Qui te le préparait quand tu étais petit(e) ? Raconte-moi ce souvenir.", "Si on le cuisinait ensemble, tu me donnerais quel rôle : chef ou assistant(e) ? 😄"],
      ["🎶 Musique", "Quelle chanson tu mets quand tu veux te sentir bien ? 🎶", "Elle te rappelle quel moment de ta vie ?", "Quelle chanson raconterait le mieux notre histoire jusqu’ici ?"],
      ["✈️ Voyage", "Si on avait trois jours libres, on irait où ensemble ? ✈️", "Qu’est-ce qu’on ferait le premier matin là-bas ?", "Qu’est-ce que tu aimerais découvrir sur toi en voyageant avec moi ?"]
    ], [
      ["💞 Nous deux", "Quel moment de nous deux te fait encore sourire quand tu y repenses ?", "Qu’est-ce que tu ressentais à ce moment-là, vraiment ?", "Qu’est-ce que ce souvenir t’apprend sur ce que tu cherches dans un couple ?"],
      ["🎁 Attentions", "C’est quoi la petite attention qui te touche le plus ?", "La dernière fois qu’on te l’a faite, ça t’a fait quoi ?", "Y a-t-il une attention dont tu rêves mais que tu n’oses pas demander ?"],
      ["🔮 Projets", "Où tu te vois dans cinq ans, et avec quoi autour de toi ?", "Qu’est-ce qui te donne envie dans ce futur, et qu’est-ce qui te fait un peu peur ?", "Quelle place j’occupe dans ce que tu imagines ?"],
      ["😂 Rires", "C’est quoi le fou rire que tu n’oublieras jamais ? 😂", "C’était avec qui, et pourquoi c’était si drôle ?", "Qu’est-ce que le rire change entre deux personnes, selon toi ?"]
    ], [
      ["💎 Dire l’essentiel", "Qu’est-ce que tu aimes chez moi et que tu ne dis presque jamais ?", "Depuis quand tu le penses ? Qu’est-ce qui t’empêche de le dire plus souvent ?", "Qu’est-ce que tu voudrais que je sache sur toi pour mieux te comprendre ?"],
      ["🌧️ Quand ça va mal", "Quand tu vas mal, tu as besoin de quoi : parler, du silence, ou une simple présence ?", "Comment je peux le deviner, sans que tu aies à le dire ?", "Y a-t-il un moment où j’aurais pu mieux te soutenir ? Dis-le-moi sans crainte, je veux apprendre."],
      ["🌱 Grandir ensemble", "Qu’est-ce que notre relation t’a appris sur toi ?", "Qu’est-ce que tu as changé, ou voulu changer, grâce à ça ?", "Qu’est-ce qu’on devrait préserver à tout prix, quoi qu’il arrive ?"],
      ["🕊️ Nos peurs", "Quelle est ta plus grande peur dans une relation ?", "D’où elle te vient, à ton avis ?", "Qu’est-ce que je peux faire, concrètement, pour que tu te sentes en sécurité avec moi ?"]
    ]],
    friend: [[
      ["🎬 Films & séries", "Quel film ou quelle série tu peux revoir cent fois sans te lasser ? 🎬", "C’est quelle scène que tu connais par cœur ?", "Quel personnage te ressemble le plus, et lequel tu rêverais d’être ?"],
      ["⚽ Passions", "Quelle activité te fait oublier l’heure ?", "Comment tu l’as découverte ?", "Si tu pouvais en vivre, tu te lancerais demain ? Qu’est-ce qui te retient ?"],
      ["🍽️ Sorties", "Notre prochaine sortie, tu la veux comment : maquis tranquille, balade ou grosse ambiance ? 😄", "On invite qui d’autre pour que ce soit parfait ?", "Quel souvenir de sortie ensemble tu aimerais revivre ?"],
      ["📱 Quotidien", "Quelle appli tu ne pourrais plus quitter, et pourquoi ?", "Qu’est-ce qu’elle t’apporte vraiment ?", "Si tu passais une semaine sans téléphone, qu’est-ce qui te manquerait le plus ?"]
    ], [
      ["😂 Souvenirs", "Quel est notre meilleur souvenir ensemble ? 😂", "Si on pouvait le revivre, tu changerais quoi ?", "Qu’est-ce que ce moment dit de notre amitié ?"],
      ["🎯 Rêves", "Quel rêve tu n’as encore dit à presque personne ?", "Qu’est-ce qui te manque pour commencer ?", "Comment je peux t’aider à avancer, concrètement ?"],
      ["💼 Avenir", "Quel métier tu ferais si l’argent n’était pas un sujet ?", "Qu’est-ce qui t’attire dans ce métier ?", "Quelle petite première étape tu pourrais faire cette semaine ?"],
      ["🧠 Leçons", "Quelle erreur t’a le plus appris ?", "Qu’est-ce que tu ferais autrement aujourd’hui ?", "Quel conseil tu te donnerais à toi-même il y a cinq ans ?"]
    ], [
      ["🤝 Confiance", "Qu’est-ce qui fait que tu me fais confiance ?", "Y a-t-il une chose que tu hésites à me dire ?", "Qu’est-ce qui rendrait notre amitié encore plus solide ?"],
      ["🌧️ Soutien", "Quand tu traverses une période dure, qui tu appelles en premier, et pourquoi ?", "Qu’est-ce que cette personne fait que d’autres ne font pas ?", "Comment je peux être cette personne pour toi quand il le faut ?"],
      ["🪞 Vérité", "Quel défaut tu me vois et tu hésites à me dire ? Promis, je le prends bien.", "Comment tu penses que je pourrais m’y prendre pour changer ça ?", "Et toi, quel défaut tu voudrais que je t’aide à travailler ?"],
      ["🔥 Valeurs", "Qu’est-ce qui compte le plus pour toi : famille, réussite, liberté, foi, autre chose ?", "D’où te vient cette valeur ?", "Quand elle a été mise à l’épreuve, tu as fait quoi ?"]
    ]],
    family: [[
      ["🏡 À la maison", "Comment s’est passée ta journée ? Raconte-moi un détail que j’aurais aimé voir.", "Qu’est-ce qui t’a fatigué(e), et qu’est-ce qui t’a fait du bien ?", "Qu’est-ce que je pourrais faire pour t’alléger demain ?"],
      ["🍲 Repas", "C’est quoi le plat de famille que tu préfères ?", "Qui le prépare le mieux ?", "Et si on se retrouvait pour le manger ensemble, ce serait quand ?"],
      ["📸 Souvenirs", "Quelle est ta photo de famille préférée ? Envoie-la 📸", "C’était quelle occasion ?", "Qu’est-ce que tu ressens en la regardant ?"],
      ["🎉 Fêtes", "Quelle fête de famille tu attends le plus ?", "Quel moment de cette fête tu aimes le plus ?", "Comment on pourrait la rendre encore plus belle cette année ?"]
    ], [
      ["👵 Racines", "Quelle histoire des anciens de la famille tu aimes raconter ?", "Qu’est-ce qu’elle t’a appris ?", "Qu’est-ce qu’on devrait absolument transmettre aux plus jeunes ?"],
      ["🧒 Enfance", "Quel est ton plus beau souvenir d’enfance en famille ?", "Qu’est-ce qui rendait ce moment si spécial ?", "Qu’est-ce qu’on pourrait refaire pour retrouver cette ambiance ?"],
      ["🗣️ Se parler", "Y a-t-il quelque chose que tu voudrais que la famille se dise plus souvent ?", "Pourquoi on ne le dit pas, à ton avis ?", "Qui pourrait faire le premier pas ? Je veux bien le faire."],
      ["🌍 Avenir", "Où voudrais-tu que la famille en soit dans dix ans ?", "Qu’est-ce qui compte le plus pour y arriver ?", "Quel rôle tu veux y jouer ?"]
    ], [
      ["💛 Merci", "Qu’est-ce que tu n’as jamais osé remercier quelqu’un de la famille ?", "Pourquoi tu l’as gardé pour toi ?", "Si tu pouvais lui écrire deux phrases maintenant, elles diraient quoi ?"],
      ["🕊️ Pardon", "Y a-t-il un malentendu dans la famille que tu aimerais voir réglé ?", "Qu’est-ce qui a empêché d’en parler jusqu’ici ?", "Qu’est-ce que je pourrais faire pour aider à rapprocher les gens ?"],
      ["🧭 Valeurs", "Quelle valeur reçue de tes parents tu veux garder toute ta vie ?", "Et laquelle tu choisis de vivre autrement ?", "Qu’est-ce que tu voudrais que les plus jeunes retiennent de toi ?"],
      ["🌧️ Soutien", "Quand tu vas mal, tu en parles à la famille ? Pourquoi ou pourquoi pas ?", "Qu’est-ce qui t’aiderait à te sentir écouté(e) ?", "Qu’est-ce que je peux faire pour que tu te sentes soutenu(e) ?"]
    ]],
    work: [[
      ["💼 Ta journée", "Quelle a été ta priorité aujourd’hui ?", "Qu’est-ce qui a pris plus de temps que prévu ?", "Qu’est-ce qui t’aiderait à aller plus vite demain ?"],
      ["📚 Apprendre", "Quelle compétence tu aimerais apprendre cette année ?", "Pourquoi celle-là ?", "Qui pourrait t’aider à la maîtriser plus vite ?"],
      ["☕ Souffler", "Comment tu recharges tes batteries après une grosse journée ?", "Ça marche à chaque fois ?", "Qu’est-ce que tu changerais dans ta routine pour mieux souffler ?"],
      ["🛠️ Astuces", "Quel outil ou quelle astuce t’a fait gagner le plus de temps ?", "Comment tu l’as découvert(e) ?", "On pourrait le partager avec l’équipe ?"]
    ], [
      ["🎯 Objectifs", "Quel objectif te motive le plus en ce moment ?", "Qu’est-ce qui pourrait le bloquer ?", "Comment je peux t’aider à l’atteindre ?"],
      ["🤝 Équipe", "Qu’est-ce qui fait une bonne équipe, selon toi ?", "Quelle équipe t’a le plus marqué(e) ? Pourquoi ?", "Qu’est-ce qu’on pourrait améliorer entre nous ?"],
      ["💬 Retours", "Quel retour t’a le plus fait progresser ?", "Comment tu l’as reçu sur le moment ?", "Quel retour tu aimerais recevoir de moi ?"],
      ["⚖️ Équilibre", "Comment tu sépares vie pro et vie perso ?", "Qu’est-ce qui déborde le plus ?", "Qu’est-ce que tu veux protéger absolument ?"]
    ], [
      ["🧭 Le sens", "Pourquoi tu fais ce travail, au fond ?", "Qu’est-ce qui te ferait dire « j’ai réussi » dans cinq ans ?", "Si tu devais changer de voie, ce serait vers quoi ?"],
      ["🔥 Difficultés", "Quelle est la plus grosse difficulté dans ton travail en ce moment ?", "Qu’est-ce que tu as déjà essayé ?", "De quel soutien tu as besoin, et de qui ?"],
      ["🌟 Confiance", "Dans quel domaine tu doutes encore de toi ?", "Quelle preuve du contraire tu as déjà ?", "Qu’est-ce qui t’aiderait à te lancer malgré le doute ?"],
      ["🤲 Valeurs", "Quelle règle professionnelle tu ne trahirais jamais ?", "Quand elle a été mise à l’épreuve, tu as fait quoi ?", "Comment on la garde vivante dans notre façon de travailler ensemble ?"]
    ]],
    "new": [[
      ["👋 Se présenter", "Si tu devais te présenter en trois mots, ce serait lesquels ?", "Pourquoi ceux-là ?", "Lequel tu voudrais qu’on remarque en premier chez toi ?"],
      ["🏙️ Origines", "Tu viens d’où, et qu’est-ce que tu aimes le plus là-bas ?", "Qu’est-ce que les gens de ta ville ont de particulier ?", "Quel endroit chez toi tu me conseillerais d’aller voir ?"],
      ["🎶 Goûts", "Quel genre de musique t’accompagne en ce moment ?", "Quel artiste tu défendrais face à tout le monde ?", "Quelle chanson t’a marqué(e) cette année ?"],
      ["🍽️ Saveurs", "C’est quoi ton plat préféré, celui qui te rend heureux(se) ?", "Qui le prépare le mieux ?", "Quel plat tu voudrais me faire découvrir ?"]
    ], [
      ["🎯 Passions", "Qu’est-ce qui te passionne vraiment ?", "Comment ça a commencé ?", "Qu’est-ce que tu voudrais qu’on partage autour de ça ?"],
      ["🌱 Parcours", "Quel moment de ta vie t’a fait le plus grandir ?", "Qu’est-ce que tu as appris sur toi à ce moment-là ?", "Qui t’a aidé(e) à passer ce cap ?"],
      ["🔮 Projets", "Quel projet te fait vibrer en ce moment ?", "Où tu en es aujourd’hui ?", "Comment on pourrait s’entraider ?"],
      ["😄 Humour", "Qu’est-ce qui te fait vraiment rire ?", "Tu as une anecdote drôle à raconter ?", "C’est quoi la blague qui te fait rire malgré toi ?"]
    ], [
      ["🪞 Soi", "Qu’est-ce que les gens comprennent mal de toi ?", "Comment tu aimerais être perçu(e) ?", "Qu’est-ce que tu veux qu’on retienne de toi ?"],
      ["🔥 Valeurs", "Qu’est-ce qui compte le plus pour toi dans la vie ?", "Quel événement a forgé cette valeur ?", "Comment elle guide tes choix aujourd’hui ?"],
      ["🌧️ Épreuves", "Quelle épreuve t’a rendu(e) plus fort(e) ?", "Qu’est-ce qui t’a aidé(e) à tenir ?", "Qu’est-ce que tu dirais à quelqu’un qui traverse la même chose ?"],
      ["🤝 Confiance", "Qu’est-ce qui te donne confiance en quelqu’un ?", "Et qu’est-ce qui la brise ?", "Comment on la construit entre nous, à notre rythme ?"]
    ]]
  };

  /* jeux : [titre, message] */
  var GU = [
    ["Tu préfères…", "🎲 Tu préfères… voyager n’importe où sans limite de budget ou ne jamais avoir de soucis d’argent ? Réponds, puis pose-moi ta question !"],
    ["Deux vérités, un mensonge", "🎲 Je te dis trois choses sur moi : deux sont vraies, une est fausse. À toi de deviner laquelle, puis à ton tour !"],
    ["Ma journée en 3 emojis", "🎲 Devine ma journée avec seulement 3 emojis : ☀️🚶🍲 … Et toi, envoie-moi la tienne !"],
    ["Questions éclair", "🎲 Jeu éclair : 3 questions, tu réponds sans réfléchir. La première : ta couleur préférée ?"],
    ["Photo mystère", "🎲 Défi : envoie-moi une photo de ce que tu vois en ce moment, sans rien expliquer. Je devine où tu es !"],
    ["Vérité ou courage", "🎲 Vérité ou courage ? Choisis, je te lance le défi (ou la question) tout de suite 😄"]
  ];
  var GR = {
    love: [["Rendez-vous idéal", "🎲 Décris ton rendez-vous idéal en 3 phrases, du début à la fin. Je décris le mien juste après 💞"], ["Lettre en 3 phrases", "🎲 Écris-moi trois phrases sur ce que tu ressens pour moi en ce moment, sans réfléchir. Je te réponds pareil."]],
    friend: [["Qui ferait quoi ?", "🎲 Dans une équipe de braquage de film, tu serais le cerveau, le conducteur ou le charmeur ? Et moi ? 😂"], ["Top 3", "🎲 Ton top 3 des meilleurs moments de notre amitié. Je fais le mien, on compare !"]],
    family: [["Devine le souvenir", "🎲 Je te décris un souvenir de famille en 2 indices, tu devines lequel c’est. Prêt(e) ?"], ["Le proverbe de la famille", "🎲 C’est quoi la phrase ou le proverbe qu’on entend toujours dans la famille ? Je donne le mien juste après !"]],
    work: [["Défi de 5 minutes", "🎲 Défi : donne-moi en 5 minutes une idée pour améliorer notre façon de travailler. Je te réponds avec la mienne."], ["Ce que j’ai appris", "🎲 Chacun partage une chose apprise cette semaine, au travail ou ailleurs. Je commence si tu veux !"]],
    "new": [["Ce qu’on devine", "🎲 Je devine trois choses sur toi à partir de ton profil, tu me dis si j’ai juste. Ensuite c’est ton tour !"], ["Le classement", "🎲 Un classement : musique, cuisine, voyage… tu mets quoi à la première place pour chaque ? Je fais le mien."]]
  };

  function $(i) { return document.getElementById(i); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function who() { try { return typeof me === "function" ? String(me()) : "0"; } catch (e) { return "0"; } }
  function curPeer() { try { return (typeof peer !== "undefined" && peer && peer.id) ? peer : null; } catch (e) { return null; } }
  function pName() { var n = $("peerName"); return n && n.textContent ? n.textContent.trim() : ""; }
  function isEn() { try { return !!(window.TOOLE_I18N && window.TOOLE_I18N.lang && window.TOOLE_I18N.lang() === "en"); } catch (e) { return false; } }

  var S = { rel: "new", lvl: 0, tab: "t", pid: "", root: null, sh: null, q: [], qi: 0, step: 0 };

  function key() { return LSK + who() + ":" + S.pid; }
  function load() {
    var o = null, ok = false;
    try { o = JSON.parse(lsGet(key()) || "null"); } catch (e) { o = null; }
    S.rel = "new"; S.lvl = 0;
    if (o) { RELS.forEach(function (r) { if (r[0] === o.r) { S.rel = o.r; } }); if (o.l >= 0 && o.l < 4) S.lvl = o.l; }
  }
  function save() { lsSet(key(), JSON.stringify({ r: S.rel, l: S.lvl })); }

  function pool() {
    if (S.tab === "g") return GU.concat(GR[S.rel]);
    var c = C[S.rel];
    return S.lvl > 2 ? c[0].concat(c[1], c[2]) : c[S.lvl];
  }
  function shuffle(n, not) {
    var a = [], i, j, t;
    for (i = 0; i < n; i++) a.push(i);
    for (i = n - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; }
    if (n > 1 && a[0] === not) { t = a[0]; a[0] = a[1]; a[1] = t; }
    return a;
  }
  function reset() { S.q = shuffle(pool().length, -1); S.qi = 0; S.step = 0; }
  function nextIdea() {
    var last = S.q[S.qi];
    S.qi++; S.step = 0;
    if (S.qi >= S.q.length) { S.q = shuffle(S.q.length, last); S.qi = 0; }
  }

  function chip(on, a, v, label) {
    return "<button type=\"button\" class=\"tid-chip" + (on ? " on" : "") + "\" data-a=\"" + a + "\" data-v=\"" + v + "\">" + label + "</button>";
  }
  function draw() {
    if (!S.root) return;
    var its = pool(), it = its[S.q[S.qi]], h = "", nm = pName(), txt;
    if (S.tab === "g") {
      txt = it[1];
      h += "<div class=\"tid-feat\"><div class=\"l\">Jeu du moment</div><div class=\"x\">" + esc(it[0]) + "</div><div class=\"y\">" + esc(txt) + "</div>";
    } else {
      txt = it[1 + S.step];
      h += "<div class=\"tid-feat\"><div class=\"l\">Idée du moment · " + esc(it[0]) + "</div>";
      h += "<div class=\"tid-steps\">" + STEPS.map(function (s, i) { return chip(S.step === i, "step", i, s); }).join("") + "</div>";
      h += "<div class=\"x\">" + esc(txt) + "</div><div class=\"hint\">" + HINT[S.step] + "</div>";
    }
    h += "<div class=\"tid-act\"><button type=\"button\" class=\"tid-go\" data-a=\"use\">Utiliser</button><button type=\"button\" class=\"tid-more\" data-a=\"more\">↻ Autre idée</button></div></div>";
    h += "<div class=\"tid-sub\">" + (nm ? "Avec " + esc(nm) + " · " : "") + "votre relation</div>";
    h += "<div class=\"tid-row\">" + RELS.map(function (r) { return chip(S.rel === r[0], "rel", r[0], r[1] + " " + r[2]); }).join("") + "</div>";
    h += "<div class=\"tid-row\">" + LVLS.map(function (l, i) { return chip(S.lvl === i, "lvl", i, l[0] + " " + l[1]); }).join("") + "</div>";
    h += "<div class=\"tid-row\">" + chip(S.tab === "t", "tab", "t", "💬 Sujets") + chip(S.tab === "g", "tab", "g", "🎲 Jeux") + "</div>";
    h += "<div class=\"tid-sub\">" + its.length + (S.tab === "g" ? " jeux" : " conversations") + " · touche pour choisir</div><div class=\"tid-list\">";
    h += its.map(function (x, i) {
      return "<button type=\"button\" class=\"tid-item\" data-a=\"pick\" data-i=\"" + i + "\"><b>" + esc(S.tab === "g" ? "🎲 " + x[0] : x[0]) + "</b>" + (S.tab === "g" ? "" : esc(x[1])) + "</button>";
    }).join("") + "</div>";
    S.root.innerHTML = h;
  }

  function put(text) {
    var t = $("txt");
    if (!t) return;
    var cur = t.value || "";
    t.value = cur ? (cur.replace(/\s+$/, "") + " " + text) : text;
    try { t.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) { }
    try { if (typeof closeSheet === "function") closeSheet(); } catch (e) { }
    try { t.focus(); } catch (e) { }
  }

  function onClick(e) {
    var t = e.target;
    while (t && t !== S.root && !(t.getAttribute && t.getAttribute("data-a"))) t = t.parentNode;
    if (!t || t === S.root || !t.getAttribute) return;
    var a = t.getAttribute("data-a"), v = t.getAttribute("data-v"), i = t.getAttribute("data-i");
    if (a === "rel") { S.rel = v; save(); reset(); draw(); }
    else if (a === "lvl") { S.lvl = Math.max(0, Math.min(3, parseInt(v, 10) || 0)); save(); reset(); draw(); }
    else if (a === "tab") { S.tab = v === "g" ? "g" : "t"; reset(); draw(); }
    else if (a === "step") { S.step = Math.max(0, Math.min(2, parseInt(v, 10) || 0)); draw(); }
    else if (a === "more") { nextIdea(); draw(); }
    else if (a === "pick") {
      var k = S.q.indexOf(parseInt(i, 10));
      if (k > -1) { S.qi = k; S.step = 0; draw(); if (S.sh) S.sh.scrollTop = 0; }
    }
    else if (a === "use") {
      var it = pool()[S.q[S.qi]];
      if (it) put(S.tab === "g" ? it[1] : it[1 + S.step]);
    }
  }

  function open() {
    var p = curPeer();
    if (!p || typeof sheetEl !== "function") return;
    S.pid = String(p.id);
    load(); S.tab = "t"; reset();
    addCss();
    var sh = sheetEl("<div class=\"sht\">Idées de conversation</div><div id=\"tidRoot\"></div>");
    sh.classList.add("tid-sh");
    S.sh = sh;
    S.root = sh.querySelector("#tidRoot");
    S.root.onclick = onClick;
    draw();
  }

  function addCss() {
    if ($("tidCss")) return;
    var st = document.createElement("style");
    st.id = "tidCss";
    st.textContent =
      ".sh.tid-sh{max-height:88vh!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y}" +
      ".tid-sub{font-size:12px;opacity:.65;padding:2px 8px 8px}" +
      ".tid-row,.tid-steps{display:flex;gap:6px;flex-wrap:wrap;padding:0 8px 8px}" +
      ".tid-steps{padding:2px 0 8px}" +
      ".tid-chip{width:auto!important;margin:0!important;border:1px solid rgba(127,127,127,.35)!important;background:rgba(127,127,127,.1)!important;color:inherit!important;border-radius:16px!important;padding:6px 10px!important;font-size:13px!important;font-weight:500}" +
      ".tid-chip.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;border-color:transparent!important}" +
      ".tid-feat{margin:2px 8px 12px;padding:14px;border-radius:18px;background:rgba(0,194,224,.12);border:1px solid rgba(0,194,224,.35)}" +
      ".tid-feat .l{font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px}" +
      ".tid-feat .x{font-size:16px;line-height:1.4;font-weight:700}" +
      ".tid-feat .y{font-size:14px;line-height:1.4;margin-top:4px}" +
      ".tid-feat .hint{font-size:12px;opacity:.65;margin-top:6px}" +
      ".tid-act{display:flex;gap:8px;margin-top:12px}" +
      ".tid-go,.tid-more{width:auto!important;margin:0!important;border:0!important;border-radius:18px!important;padding:9px 16px!important;font-size:14px!important;font-weight:700}" +
      ".tid-go{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important}" +
      ".tid-more{background:rgba(127,127,127,.15)!important;color:inherit!important}" +
      ".tid-list{padding:0 8px 6px}" +
      ".tid-item{display:block;width:100%!important;text-align:left;border:0!important;background:rgba(127,127,127,.1)!important;color:inherit!important;border-radius:12px!important;padding:10px 12px!important;margin:0 0 6px!important;font-size:14px!important;line-height:1.35;font-weight:400}" +
      ".tid-item b{display:block;font-size:12px;opacity:.75;margin-bottom:2px}";
    document.head.appendChild(st);
  }

  /* le bouton ✦ existant ouvre maintenant cette version (en anglais : on garde l’ancienne) */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("#tsjBtn") : null;
    if (!b || isEn()) return;
    e.stopPropagation(); e.preventDefault();
    open();
  }, true);
})();
