/* TÕÕLé - Idées de conversation (section discrète dans la discussion)
   - un petit bouton ✦ très discret à côté du champ de message (discussion à deux)
   - il ouvre une feuille avec des sujets et des jeux selon la relation :
     amoureux(se), ami(e), famille, travail, on se découvre
   - trois niveaux de proximité : pour commencer / plus proches / très proches
   - toucher une idée la place dans le champ de message : rien n’est envoyé tout seul
   - la relation et le niveau choisis sont gardés par contact, sur le téléphone seulement */
(function () {
  "use strict";
  if (window.__tsuj) return;
  window.__tsuj = 1;

  var LSK = "toole_rel:";

  var RELS = [
    { k: "love", e: "❤️", n: "Amoureux(se)" },
    { k: "friend", e: "😄", n: "Ami(e)" },
    { k: "family", e: "👨‍👩‍👧", n: "Famille" },
    { k: "work", e: "💼", n: "Travail" },
    { k: "new", e: "🌱", n: "On se découvre" }
  ];
  var LVLS = [
    { e: "🌤️", n: "Pour commencer" },
    { e: "💞", n: "Plus proches" },
    { e: "💎", n: "Très proches" }
  ];

  /* D[relation][niveau] = { t: [sujets], g: [jeux {n: titre, m: message, a: réponse facultative}] } */
  var D = {
    love: [
      {
        t: [
          "Qu’est-ce qui t’a fait sourire aujourd’hui ? 😊",
          "Raconte-moi le moment de ta journée que tu as préféré.",
          "Quelle chanson te fait penser à moi en ce moment ? 🎶",
          "Si on avait une soirée libre ce week-end, tu ferais quoi avec moi ?",
          "Tu préfères une sortie en ville ou une soirée tranquille rien que nous deux ?",
          "Quel plat tu aimerais que je te prépare, ou que tu me prépares ? 😋",
          "Quelle est ta plus belle photo de nous deux ? Envoie-la-moi 📸",
          "Si tu pouvais voyager n’importe où avec moi, on irait où ? ✈️",
          "Tu te sens comment aujourd’hui : de bonne humeur, fatigué(e) ou rêveur(se) ? Dis-moi tout.",
          "Dis-moi trois choses pour lesquelles tu es reconnaissant(e) aujourd’hui 🙏",
          "Qu’est-ce que je peux faire pour rendre ta journée plus douce ?",
          "Quel est le premier détail que tu as remarqué chez moi ?"
        ],
        g: [
          { n: "Tu préfères…", m: "🎲 Tu préfères… regarder un film avec moi sous une couverture ou faire une balade sous les étoiles ? Réponds, puis pose-moi ta question !" },
          { n: "Décris-moi en 3 mots", m: "🎲 Décris-moi en 3 mots. Je fais pareil pour toi dès que tu as répondu 😄" },
          { n: "Ma journée en 3 emojis", m: "🎲 Devine ma journée avec seulement 3 emojis : ☀️🚶🍲 … À toi de m’envoyer la tienne !" },
          { n: "Questions éclair", m: "🎲 Jeu éclair : je te pose 3 questions, tu réponds sans réfléchir. La première : ta couleur préférée ?" },
          { n: "Photo mystère", m: "🎲 Défi : envoie-moi une photo de ce que tu vois en ce moment, sans rien expliquer. Je devine où tu es !" }
        ]
      },
      {
        t: [
          "Quel moment de nous deux te fait encore sourire quand tu y repenses ? 💞",
          "Qu’est-ce que tu aimes chez moi mais que tu ne dis presque jamais ?",
          "Quelle petite habitude à moi te fait craquer ?",
          "Si on racontait notre histoire dans un film, quel serait le titre ? 🎬",
          "Qu’est-ce qui te manque le plus quand on n’est pas ensemble ?",
          "Quel est le plus beau compliment qu’on t’ait fait ? Et quel est celui que tu aimerais entendre de moi ?",
          "À quoi ressemblerait notre rendez-vous parfait, de A à Z ?",
          "Qu’est-ce que tu aimerais qu’on essaie ensemble pour la première fois ?",
          "Quand t’es-tu senti(e) le plus fier(e) de nous ?",
          "Si je te faisais une surprise demain, tu voudrais quoi : un message, un cadeau ou un moment rien que pour nous ?",
          "Quel surnom tu aimerais que je te donne ? 😏",
          "Qu’est-ce qui te donne le plus envie de me voir, là, tout de suite ?"
        ],
        g: [
          { n: "Quiz de couple", m: "🎲 Quiz de couple : quel est mon plat préféré, ma chanson du moment et mon plus grand rêve ? Je note tes réponses 😏" },
          { n: "Compliments en chaîne", m: "🎲 Compliments en chaîne : je commence… Tu as un sourire qui change ma journée. À toi, et on continue chacun son tour !" },
          { n: "Je n’ai jamais…", m: "🎲 Je n’ai jamais… Je commence : « Je n’ai jamais oublié notre premier rendez-vous. » À toi de compléter avec ta phrase !" },
          { n: "Défi vocal", m: "🎲 Défi : envoie-moi un vocal de 10 secondes pour me dire ce que tu aimes chez moi. Je te réponds aussi par un vocal 🎙️" },
          { n: "2 vérités, 1 mensonge", m: "🎲 2 vérités, 1 mensonge : je t’écris 3 phrases sur moi, tu devines laquelle est fausse. Prêt(e) ?" }
        ]
      },
      {
        t: [
          "De quoi as-tu le plus peur dans l’amour, et comment puis-je t’aider à te sentir en sécurité ?",
          "Où te vois-tu dans 5 ans, et comment on y va ensemble ?",
          "Qu’est-ce que tu n’as jamais osé me dire mais que tu aimerais que je sache ?",
          "Qu’est-ce qui te fait te sentir le plus aimé(e) ?",
          "Quel est ton plus grand rêve, celui que tu gardes pour toi ?",
          "Quelle leçon l’amour t’a-t-elle apprise jusqu’ici ?",
          "Qu’est-ce que tu attends de moi que je ne fais pas encore assez ?",
          "Quand tu es triste, de quoi as-tu besoin : des mots, du silence ou ma présence ?",
          "Comment imagines-tu notre vie quand on sera vieux ? 🌅",
          "Quelles sont tes valeurs non négociables dans un couple ?",
          "Quel moment de ton passé t’a le plus changé(e) ? Je veux mieux te comprendre.",
          "Qu’est-ce que tu voudrais que je comprenne mieux de toi ?"
        ],
        g: [
          { n: "Les questions qui rapprochent", m: "🎲 Les questions qui rapprochent : chacun répond honnêtement. La première : si tu pouvais inviter n’importe qui à dîner, qui choisirais-tu et pourquoi ?" },
          { n: "Un message sans filtre", m: "🎲 Défi : écris-moi en un seul message ce que tu ressens pour moi ce soir, sans filtre. Je te réponds après." },
          { n: "À compléter", m: "🎲 Complète cette phrase : « Ce que je veux te dire depuis longtemps, c’est… ». Je fais la mienne dès que j’ai ta réponse." },
          { n: "Nos rêves croisés", m: "🎲 Chacun écrit 3 rêves pour nous deux, puis on compare. Envoie-moi les tiens, je t’envoie les miens." },
          { n: "Vérité sincère", m: "🎲 Vérité sincère : pose-moi la question la plus vraie que tu as en tête. Je réponds franchement, puis c’est à mon tour." }
        ]
      }
    ],

    friend: [
      {
        t: [
          "Quoi de neuf depuis la dernière fois ? Raconte tout ! 😄",
          "Quelle est la meilleure chose qui te soit arrivée cette semaine ?",
          "Série, film, musique : qu’est-ce que tu me conseilles en ce moment ?",
          "Tu fais quoi ce week-end ? On se voit ?",
          "Si tu gagnais un voyage demain, tu irais où ?",
          "C’est quoi ton dernier fou rire ? 😂",
          "Ton meilleur plat de tous les temps, c’est lequel ?",
          "Quelle astuce ou appli t’a changé la vie récemment ?"
        ],
        g: [
          { n: "Tu préfères…", m: "🎲 Tu préfères… voyager partout dans le monde sans argent ou rester chez toi avec tout l’argent du monde ? Ta réponse, puis ta question pour moi !" },
          { n: "Devine le film", m: "🎲 Devine le film : 🦁👑🌅. À toi de m’en proposer un en emojis !" },
          { n: "Top 3 du moment", m: "🎲 Donne-moi ton top 3 des chansons du moment, je te donne le mien." },
          { n: "Photo la plus drôle", m: "🎲 Défi : envoie-moi la photo la plus drôle de ta galerie 😂" }
        ]
      },
      {
        t: [
          "Quel est notre meilleur souvenir ensemble ? 😄",
          "Qu’aimerais-tu qu’on fasse ensemble avant la fin de l’année ?",
          "De quoi es-tu le plus fier(e) cette année ?",
          "Ta honte la plus drôle d’adolescence, c’était quoi ?",
          "Si on montait un projet ensemble, ce serait quoi ?",
          "Quel conseil donnerais-tu à toi-même d’il y a 5 ans ?",
          "Qu’est-ce qui te stresse en ce moment ? Je suis là si tu veux en parler.",
          "Quelle qualité tu admires chez moi ?"
        ],
        g: [
          { n: "2 vérités, 1 mensonge", m: "🎲 2 vérités, 1 mensonge : je t’écris 3 phrases sur moi, tu devines laquelle est fausse. Prêt(e) ?" },
          { n: "Je n’ai jamais…", m: "🎲 Je n’ai jamais mangé quelque chose de bizarre sans le savoir… Et toi, complète avec ta phrase !" },
          { n: "Devinette", m: "🎲 Devinette : qu’est-ce qui a des dents mais ne mord jamais ?", a: "Un peigne" },
          { n: "Plus on en prend…", m: "🎲 Devinette : plus on en prend, plus on en laisse derrière soi. Qu’est-ce que c’est ?", a: "Les pas" }
        ]
      },
      {
        t: [
          "Qu’est-ce qui compte le plus pour toi dans une amitié ?",
          "Y a-t-il quelque chose qui te pèse en ce moment et dont tu n’as pas parlé ?",
          "Quel est ton plus grand rêve, celui que tu n’oses pas dire à voix haute ?",
          "Quand as-tu eu le plus besoin d’un ami, et qui était là ?",
          "Qu’est-ce que je pourrais faire pour mieux te soutenir ?",
          "Qu’as-tu appris sur toi cette année ?",
          "De quoi as-tu peur pour ton avenir, et de quoi es-tu confiant(e) ?",
          "Qu’est-ce qui t’a le plus transformé(e) dans ta vie ?"
        ],
        g: [
          { n: "Vérité sincère", m: "🎲 Vérité : quelle est la chose la plus courageuse que tu aies faite ? Ensuite je te réponds." },
          { n: "Lettre à toi-même", m: "🎲 Écris en deux phrases ce que tu dirais à toi dans 10 ans. Je fais pareil et on compare." },
          { n: "Ce que tu ne vois pas", m: "🎲 Dis-moi une qualité que tu vois en moi et que je ne vois peut-être pas moi-même." },
          { n: "Défi gratitude", m: "🎲 Défi gratitude : chacun dit 3 choses qu’il apprécie chez l’autre. Je te laisse commencer !" }
        ]
      }
    ],

    family: [
      {
        t: [
          "Comment va la famille ? Quelles nouvelles ?",
          "Tu as mangé quoi aujourd’hui ? Raconte-moi ta journée !",
          "Y a-t-il une fête ou un événement de famille bientôt ?",
          "Tu te souviens de ce plat que tout le monde adorait à la maison ?",
          "Quel est ton meilleur souvenir de vacances en famille ?",
          "De quoi as-tu besoin en ce moment ? Dis-moi, je veux aider."
        ],
        g: [
          { n: "Souvenir en photo", m: "🎲 Défi : envoie-moi une vieille photo de famille, je te dis ce que je me rappelle de ce jour-là." },
          { n: "Devinette", m: "🎲 Devinette : je suis plein de trous mais je retiens l’eau. Qui suis-je ?", a: "Une éponge" },
          { n: "Qui suis-je ?", m: "🎲 Qui suis-je ? Je suis un membre de la famille, j’adore cuisiner et j’ai toujours un conseil. Devine, puis propose-moi le tien !" }
        ]
      },
      {
        t: [
          "Raconte-moi une histoire de famille que je ne connais pas.",
          "Quelle tradition de la famille aimerais-tu garder pour toujours ?",
          "Qu’as-tu appris de nos parents ou de nos grands-parents ?",
          "Si on organisait des retrouvailles, ce serait où et avec qui ?",
          "Quel conseil que tu m’as donné un jour n’ai-je jamais oublié ?",
          "Qu’est-ce qui te rend le plus fier(e) dans la famille ?"
        ],
        g: [
          { n: "Quiz de famille", m: "🎲 Quiz : quel est le plat préféré de chacun à la maison ? Je note tes réponses et tu notes les miennes." },
          { n: "Un proverbe de chez nous", m: "🎲 Dis-moi un proverbe de chez nous que tu aimes, et ce qu’il t’apprend." },
          { n: "Vocal des souvenirs", m: "🎲 Défi : envoie-moi un vocal de 15 secondes avec un souvenir d’enfance qui te fait sourire 🎙️" }
        ]
      },
      {
        t: [
          "Y a-t-il quelque chose qu’on ne s’est jamais dit et que tu aimerais me dire ?",
          "Qu’est-ce que la famille pourrait mieux faire ensemble, selon toi ?",
          "Comment puis-je te soutenir en ce moment ?",
          "Quel est ton plus grand souhait pour notre famille ?",
          "Qu’est-ce qui t’a le plus marqué(e) dans ton enfance ?",
          "De quoi es-tu le plus reconnaissant(e) dans notre relation ?"
        ],
        g: [
          { n: "Remerciements", m: "🎲 Défi : écris-moi 3 choses pour lesquelles tu me remercies, je fais pareil pour toi." },
          { n: "Message pour dans 10 ans", m: "🎲 Chacun écrit un petit message pour la famille dans 10 ans. Envoie-moi le tien, je t’envoie le mien." },
          { n: "Le plus beau jour", m: "🎲 Raconte-moi le plus beau jour que tu as vécu avec la famille. Je te raconte le mien ensuite." }
        ]
      }
    ],

    work: [
      {
        t: [
          "Comment s’est passée ta journée de travail ?",
          "Quel est le meilleur moment de ta semaine au travail ?",
          "Tu as des conseils pour mieux s’organiser ? J’ai besoin d’idées.",
          "Quelle est la dernière chose utile que tu as apprise dans ton métier ?",
          "Tu as une pause bientôt ? On échange 5 minutes ?",
          "Quel outil ou quelle astuce te fait gagner du temps ?"
        ],
        g: [
          { n: "Mon métier en une phrase", m: "🎲 Défi : explique ton métier en une phrase, comme à un enfant de 8 ans. Je fais pareil !" },
          { n: "Devinette", m: "🎲 Devinette : plus il y en a, moins on y voit. Qu’est-ce que c’est ?", a: "L’obscurité" },
          { n: "Astuce en 3 mots", m: "🎲 Quelle est ta meilleure astuce de productivité, en 3 mots seulement ?" }
        ]
      },
      {
        t: [
          "Comment es-tu arrivé(e) dans ce métier ?",
          "Quel projet te passionne le plus en ce moment ?",
          "Quelle compétence aimerais-tu développer cette année ?",
          "Quel est le meilleur conseil de carrière qu’on t’ait donné ?",
          "Comment restes-tu motivé(e) quand c’est difficile ?",
          "On pourrait collaborer sur quelque chose ? J’ai une idée."
        ],
        g: [
          { n: "Pitch de 30 secondes", m: "🎲 Défi : envoie-moi un vocal de 30 secondes pour présenter ton projet du moment 🎙️" },
          { n: "Idées éclair", m: "🎲 Brainstorm éclair : 5 idées en 5 minutes pour améliorer notre façon de travailler. Tu commences ?" },
          { n: "Mon plus grand réflexe", m: "🎲 Quel est ton premier réflexe quand un problème arrive ? Je te dis le mien ensuite." }
        ]
      },
      {
        t: [
          "Qu’est-ce qui te pèse au travail en ce moment ?",
          "Où te vois-tu professionnellement dans 5 ans ?",
          "Quelle erreur t’a le plus appris dans ta carrière ?",
          "Comment puis-je mieux t’aider dans l’équipe ?",
          "Qu’est-ce qui rendrait ton travail plus agréable ?",
          "Quel équilibre entre vie pro et vie perso cherches-tu ?"
        ],
        g: [
          { n: "Feedback bienveillant", m: "🎲 Feedback bienveillant : dis-moi une chose que je fais bien et une que je peux améliorer. Je fais pareil pour toi." },
          { n: "Ma plus grande fierté", m: "🎲 Quelle est ta plus grande fierté professionnelle ? Je te dis la mienne après." },
          { n: "Si c’était à refaire", m: "🎲 Si tu pouvais refaire un choix de carrière, ce serait lequel ? Je te réponds ensuite." }
        ]
      }
    ],

    "new": [
      {
        t: [
          "Qu’est-ce qui t’amène sur TÕÕLé ? 😊",
          "Tu viens de quelle ville ? Qu’est-ce que tu aimes là-bas ?",
          "Qu’aimes-tu faire quand tu as du temps libre ?",
          "Quel genre de musique tu écoutes en ce moment ?",
          "Ton plat préféré, c’est lequel ?",
          "Plutôt matin ou soir ? À quoi ressemble ta journée type ?"
        ],
        g: [
          { n: "Tu préfères…", m: "🎲 Tu préfères… une plage au calme ou une ville animée pour tes vacances ? Ta réponse, puis ta question pour moi !" },
          { n: "2 vérités, 1 mensonge", m: "🎲 2 vérités, 1 mensonge : je t’écris 3 phrases sur moi, tu devines laquelle est fausse. On essaie ?" },
          { n: "Un mot pour ta journée", m: "🎲 Un seul mot pour décrire ta journée, puis je fais pareil !" }
        ]
      },
      {
        t: [
          "Quel est le plus bel endroit que tu aies visité ?",
          "Si tu pouvais apprendre une nouvelle compétence en un clic, ce serait laquelle ?",
          "Qu’est-ce qui te fait rire à coup sûr ?",
          "Quel est ton rêve du moment ?",
          "Quelle personne t’a le plus inspiré(e) dans ta vie ?",
          "Un livre, un film ou une série qui t’a marqué(e) ?"
        ],
        g: [
          { n: "Devinette", m: "🎲 Devinette : qu’est-ce qui monte et descend sans bouger ?", a: "Un escalier" },
          { n: "Top 3 du moment", m: "🎲 Donne-moi ton top 3 des chansons du moment, je te donne le mien." },
          { n: "Défi photo", m: "🎲 Défi : envoie-moi une photo de ton coin préféré, sans rien expliquer. Je devine pourquoi tu l’aimes !" }
        ]
      },
      {
        t: [
          "Qu’est-ce qui compte le plus pour toi dans la vie ?",
          "Quel est le plus grand défi que tu as surmonté ?",
          "Qu’est-ce que tu cherches vraiment dans une rencontre ou une amitié ?",
          "Qu’est-ce qui te fait te sentir vraiment bien ?",
          "Si tu pouvais changer une chose dans ta vie, ce serait quoi ?",
          "De quoi es-tu le plus fier(e) ?"
        ],
        g: [
          { n: "Vérité sincère", m: "🎲 Vérité : quelle est la chose dont tu es le plus fier(e) et dont tu parles rarement ? Je te réponds après." },
          { n: "Lettre à toi-même", m: "🎲 Écris en deux phrases ce que tu dirais à toi dans 10 ans. Je fais pareil et on compare." },
          { n: "Les questions qui rapprochent", m: "🎲 Une question pour mieux se connaître : si tu pouvais inviter n’importe qui à dîner, qui choisirais-tu et pourquoi ?" }
        ]
      }
    ]
  };

  /* ---------- petits outils ---------- */
  function $(i) { return document.getElementById(i); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function who() { try { return typeof me === "function" ? String(me()) : "0"; } catch (e) { return "0"; } }
  function curPeer() {
    try { return (typeof peer !== "undefined" && peer && peer.id) ? peer : null; } catch (e) { return null; }
  }
  function pName() { var n = $("peerName"); return n && n.textContent ? n.textContent.trim() : ""; }

  /* ---------- état ---------- */
  var S = { rel: "new", lvl: 0, tab: "t", pick: -1, root: null, pid: "" };

  function key() { return LSK + who() + ":" + S.pid; }
  function load() {
    var o = null;
    try { o = JSON.parse(lsGet(key()) || "null"); } catch (e) { o = null; }
    S.rel = (o && D[o.r]) ? o.r : "new";
    S.lvl = (o && o.l >= 0 && o.l < 3) ? o.l : 0;
  }
  function save() { lsSet(key(), JSON.stringify({ r: S.rel, l: S.lvl })); }

  function items() {
    var d = D[S.rel][S.lvl];
    if (S.tab === "g") {
      return d.g.map(function (x) { return { n: x.n, m: x.m, a: x.a || "" }; });
    }
    return d.t.map(function (x) { return { n: "", m: x, a: "" }; });
  }
  function reroll() {
    var n = items().length;
    if (!n) { S.pick = -1; return; }
    var j = Math.floor(Math.random() * n);
    if (n > 1 && j === S.pick) j = (j + 1) % n;
    S.pick = j;
  }

  /* ---------- affichage ---------- */
  function chip(on, a, v, label) {
    return "<button type=\"button\" class=\"tsj-chip" + (on ? " on" : "") + "\" data-a=\"" + a + "\" data-v=\"" + v + "\">" + label + "</button>";
  }
  function draw() {
    if (!S.root) return;
    var its = items();
    if (S.pick < 0 || S.pick >= its.length) reroll();
    var nm = pName();
    var h = "";
    h += "<div class=\"tsj-sub\">" + (nm ? "Avec " + esc(nm) + " · " : "") + "choisis votre relation</div>";
    h += "<div class=\"tsj-row\">" + RELS.map(function (r) {
      return chip(S.rel === r.k, "rel", r.k, r.e + " " + r.n);
    }).join("") + "</div>";
    h += "<div class=\"tsj-row\">" + LVLS.map(function (l, i) {
      return chip(S.lvl === i, "lvl", i, l.e + " " + l.n);
    }).join("") + "</div>";
    h += "<div class=\"tsj-row\">" + chip(S.tab === "t", "tab", "t", "💬 Sujets") + chip(S.tab === "g", "tab", "g", "🎲 Jeux") + "</div>";
    var f = its[S.pick];
    if (f) {
      h += "<div class=\"tsj-feat\"><div class=\"l\">Idée du moment</div>";
      if (f.n) h += "<div class=\"x\">" + esc(f.n) + "</div><div class=\"y\">" + esc(f.m) + "</div>";
      else h += "<div class=\"x\">" + esc(f.m) + "</div>";
      if (f.a) h += "<div class=\"a\">Réponse (pour toi) : " + esc(f.a) + "</div>";
      h += "<div class=\"tsj-act\"><button type=\"button\" class=\"tsj-go\" data-a=\"use\" data-i=\"" + S.pick + "\">Utiliser</button>" +
        "<button type=\"button\" class=\"tsj-more\" data-a=\"more\">↻ Autre idée</button></div></div>";
    }
    h += "<div class=\"tsj-list\">" + its.map(function (it, i) {
      var b = "<button type=\"button\" class=\"tsj-item\" data-a=\"use\" data-i=\"" + i + "\">";
      if (it.n) b += "<b>" + esc(it.n) + "</b>";
      b += esc(it.m);
      if (it.a) b += "<i>Réponse (pour toi) : " + esc(it.a) + "</i>";
      return b + "</button>";
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
    if (a === "rel" && D[v]) { S.rel = v; S.pick = -1; save(); draw(); }
    else if (a === "lvl") { S.lvl = Math.max(0, Math.min(2, parseInt(v, 10) || 0)); S.pick = -1; save(); draw(); }
    else if (a === "tab") { S.tab = v === "g" ? "g" : "t"; S.pick = -1; draw(); }
    else if (a === "more") { reroll(); draw(); }
    else if (a === "use") { var it = items()[parseInt(i, 10)]; if (it) put(it.m); }
  }

  function open() {
    var p = curPeer();
    if (!p || typeof sheetEl !== "function") return;
    S.pid = String(p.id);
    load();
    S.tab = "t";
    S.pick = -1;
    var sh = sheetEl("<div class=\"sht\">Idées de conversation</div><div id=\"tsjRoot\"></div>");
    S.root = sh.querySelector("#tsjRoot");
    S.root.onclick = onClick;
    draw();
  }

  /* ---------- style ---------- */
  function addCss() {
    if ($("tsjCss")) return;
    var st = document.createElement("style");
    st.id = "tsjCss";
    st.textContent =
      "#scrChat .bar #tsjBtn{flex:none!important;width:30px!important;height:30px!important;min-width:0!important;padding:0!important;margin:0 -4px 0 0!important;border:0!important;background:transparent!important;box-shadow:none!important;color:inherit!important;opacity:.4;font-size:16px!important;line-height:30px!important;border-radius:50%!important}" +
      "#scrChat .bar #tsjBtn:active{opacity:.95}" +
      ".tsj-sub{font-size:12px;opacity:.65;padding:0 8px 8px}" +
      ".tsj-row{display:flex;gap:6px;flex-wrap:wrap;padding:0 8px 8px}" +
      ".tsj-chip{width:auto!important;margin:0!important;border:1px solid rgba(127,127,127,.35)!important;background:rgba(127,127,127,.1)!important;color:inherit!important;border-radius:16px!important;padding:6px 10px!important;font-size:13px!important;font-weight:500}" +
      ".tsj-chip.on{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important;border-color:transparent!important}" +
      ".tsj-feat{margin:2px 8px 10px;padding:12px;border-radius:16px;background:rgba(0,194,224,.12);border:1px solid rgba(0,194,224,.35)}" +
      ".tsj-feat .l{font-size:11px;opacity:.65;text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px}" +
      ".tsj-feat .x{font-size:15px;line-height:1.35;font-weight:700}" +
      ".tsj-feat .y{font-size:14px;line-height:1.35;margin-top:3px}" +
      ".tsj-feat .a{font-size:12px;opacity:.7;margin-top:6px}" +
      ".tsj-act{display:flex;gap:8px;margin-top:10px}" +
      ".tsj-go,.tsj-more{width:auto!important;margin:0!important;border:0!important;border-radius:18px!important;padding:8px 14px!important;font-size:14px!important;font-weight:700}" +
      ".tsj-go{background:linear-gradient(135deg,#00c2e0,#2f6fe0)!important;color:#fff!important}" +
      ".tsj-more{background:rgba(127,127,127,.15)!important;color:inherit!important}" +
      ".tsj-list{max-height:30vh;overflow-y:auto;padding:0 8px 6px}" +
      ".tsj-item{display:block;width:100%!important;text-align:left;border:0!important;background:rgba(127,127,127,.1)!important;color:inherit!important;border-radius:12px!important;padding:10px 12px!important;margin:0 0 6px!important;font-size:14px!important;line-height:1.35;font-weight:400}" +
      ".tsj-item b{display:block;font-size:13px;margin-bottom:2px}" +
      ".tsj-item i{display:block;font-size:11px;opacity:.6;font-style:normal;margin-top:3px}";
    document.head.appendChild(st);
  }

  /* ---------- bouton discret dans la barre de message ---------- */
  function mkBtn() {
    var bar = document.querySelector("#scrChat .bar");
    if (!bar || $("tsjBtn")) return !!$("tsjBtn");
    var b = document.createElement("button");
    b.id = "tsjBtn";
    b.type = "button";
    b.setAttribute("aria-label", "Idées de conversation");
    b.textContent = "✦";
    b.onclick = open;
    var t = $("txt");
    if (t && t.nextSibling) bar.insertBefore(b, t.nextSibling); else bar.appendChild(b);
    return true;
  }

  function init() {
    addCss();
    mkBtn();
    var n = 0;
    var iv = setInterval(function () {
      n++;
      if (mkBtn() && n > 3) clearInterval(iv);
      if (n > 12) clearInterval(iv);
    }, 1500);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
