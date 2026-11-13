/* TÕÕLé — Conversation ideas, English version.
   Loaded next to toole-sujets.js, which uses it when the app language is English.
   Same structure as the French data: D[relation][level] = { t: [topics], g: [games] } */
(function () {
  "use strict";
  function G(n, m, a) { var o = { n: n, m: m }; if (a) o.a = a; return o; }

  window.TOOLE_SUJETS_EN = {
    ui: {
      sub1: "With ",
      sub2: "pick your relationship",
      topics: "💬 Topics",
      games: "🎲 Games",
      idea: "Idea of the moment",
      ans: "Answer (just for you): ",
      use: "Use",
      more: "↻ Another idea",
      title: "Conversation ideas"
    },
    rels: [
      { k: "love", e: "❤️", n: "Couple" },
      { k: "friend", e: "😄", n: "Friend" },
      { k: "family", e: "👨‍👩‍👧", n: "Family" },
      { k: "work", e: "💼", n: "Work" },
      { k: "new", e: "🌱", n: "Getting to know each other" }
    ],
    lvls: [
      { e: "🌤️", n: "Getting started" },
      { e: "💞", n: "Getting closer" },
      { e: "💎", n: "Very close" }
    ],
    D: {
      love: [
        {
          t: [
            "What made you smile today? 😊",
            "Tell me about your favorite moment of the day.",
            "Which song reminds you of me right now? 🎶",
            "If we had a free evening this weekend, what would you do with me?",
            "Would you rather go out in town or have a quiet evening just the two of us?",
            "What dish would you like me to cook for you, or you to cook for me? 😋",
            "What’s your favorite photo of the two of us? Send it to me 📸",
            "If you could travel anywhere with me, where would we go? ✈️",
            "How are you feeling today: in a good mood, tired or dreamy? Tell me everything.",
            "Tell me three things you’re grateful for today 🙏",
            "What can I do to make your day a little sweeter?",
            "What’s the first thing you noticed about me?"
          ],
          g: [
            G("Would you rather…", "🎲 Would you rather… watch a movie with me under a blanket or take a walk under the stars? Answer, then ask me yours!"),
            G("Describe me in 3 words", "🎲 Describe me in 3 words. I’ll do the same for you as soon as you answer 😄"),
            G("My day in 3 emojis", "🎲 Guess my day with just 3 emojis: ☀️🚶🍲 … Now send me yours!"),
            G("Lightning questions", "🎲 Lightning game: I ask you 3 questions, you answer without thinking. First one: your favorite color?"),
            G("Mystery photo", "🎲 Challenge: send me a photo of what you see right now, no explanation. I’ll guess where you are!")
          ]
        },
        {
          t: [
            "Which moment of the two of us still makes you smile when you think back on it? 💞",
            "What do you love about me but almost never say?",
            "Which little habit of mine makes you melt?",
            "If our story were a movie, what would the title be? 🎬",
            "What do you miss the most when we’re not together?",
            "What’s the nicest compliment you’ve ever received? And which one would you like to hear from me?",
            "What would our perfect date look like, from start to finish?",
            "What would you like us to try together for the first time?",
            "When did you feel proudest of us?",
            "If I surprised you tomorrow, what would you want: a message, a gift or a moment just for us?",
            "What nickname would you like me to give you? 😏",
            "What makes you want to see me the most, right now?"
          ],
          g: [
            G("Couple quiz", "🎲 Couple quiz: what’s my favorite dish, my song of the moment and my biggest dream? I’ll score your answers 😏"),
            G("Compliment chain", "🎲 Compliment chain: I’ll start… You have a smile that changes my day. Your turn, and we keep going one by one!"),
            G("Never have I ever…", "🎲 Never have I ever… I’ll start: “I’ve never forgotten our first date.” Now finish with your own sentence!"),
            G("Voice challenge", "🎲 Challenge: send me a 10-second voice message telling me what you love about me. I’ll answer with a voice message too 🎙️"),
            G("2 truths, 1 lie", "🎲 2 truths, 1 lie: I write you 3 sentences about me, you guess which one is false. Ready?")
          ]
        },
        {
          t: [
            "What scares you most about love, and how can I help you feel safe?",
            "Where do you see yourself in 5 years, and how do we get there together?",
            "What have you never dared to tell me but would like me to know?",
            "What makes you feel the most loved?",
            "What’s your biggest dream, the one you keep to yourself?",
            "What lesson has love taught you so far?",
            "What do you expect from me that I don’t do enough yet?",
            "When you’re sad, what do you need: words, silence or my presence?",
            "How do you imagine our life when we’re old? 🌅",
            "What are your non-negotiable values in a relationship?",
            "Which moment from your past changed you the most? I want to understand you better.",
            "What would you like me to understand better about you?"
          ],
          g: [
            G("Questions that bring us closer", "🎲 Questions that bring us closer: we each answer honestly. First one: if you could invite anyone to dinner, who would you pick and why?"),
            G("A message with no filter", "🎲 Challenge: write me, in a single message, how you feel about me tonight, no filter. I’ll answer afterwards."),
            G("Complete this", "🎲 Finish this sentence: “What I’ve wanted to tell you for a long time is…”. I’ll do mine as soon as I have your answer."),
            G("Our dreams, side by side", "🎲 We each write 3 dreams for the two of us, then compare. Send me yours, I’ll send you mine."),
            G("Honest truth", "🎲 Honest truth: ask me the truest question you have in mind. I’ll answer frankly, then it’s my turn.")
          ]
        }
      ],

      friend: [
        {
          t: [
            "What’s new since last time? Tell me everything! 😄",
            "What’s the best thing that happened to you this week?",
            "Series, movie, music: what do you recommend right now?",
            "What are you doing this weekend? Shall we meet up?",
            "If you won a trip tomorrow, where would you go?",
            "What was your last big laughing fit? 😂",
            "What’s the best dish of all time for you?",
            "What tip or app has changed your life recently?"
          ],
          g: [
            G("Would you rather…", "🎲 Would you rather… travel the world with no money or stay home with all the money in the world? Your answer, then your question for me!"),
            G("Guess the movie", "🎲 Guess the movie: 🦁👑🌅. Now send me one in emojis!"),
            G("Top 3 right now", "🎲 Give me your top 3 songs of the moment, I’ll give you mine."),
            G("Funniest photo", "🎲 Challenge: send me the funniest photo in your gallery 😂")
          ]
        },
        {
          t: [
            "What’s our best memory together? 😄",
            "What would you like us to do together before the end of the year?",
            "What are you proudest of this year?",
            "What was your funniest embarrassing moment as a teenager?",
            "If we started a project together, what would it be?",
            "What advice would you give yourself from 5 years ago?",
            "What’s stressing you out right now? I’m here if you want to talk.",
            "Which quality of mine do you admire?"
          ],
          g: [
            G("2 truths, 1 lie", "🎲 2 truths, 1 lie: I write you 3 sentences about me, you guess which one is false. Ready?"),
            G("Never have I ever…", "🎲 Never have I ever unknowingly eaten something weird… Now you, finish with your own sentence!"),
            G("Riddle", "🎲 Riddle: what has teeth but never bites?", "A comb"),
            G("The more you take…", "🎲 Riddle: the more you take, the more you leave behind. What is it?", "Footsteps")
          ]
        },
        {
          t: [
            "What matters most to you in a friendship?",
            "Is there something weighing on you right now that you haven’t talked about?",
            "What’s your biggest dream, the one you don’t dare say out loud?",
            "When did you need a friend the most, and who was there?",
            "What could I do to support you better?",
            "What have you learned about yourself this year?",
            "What are you afraid of for your future, and what are you confident about?",
            "What has transformed you the most in your life?"
          ],
          g: [
            G("Honest truth", "🎲 Truth: what’s the bravest thing you’ve ever done? Then I’ll answer too."),
            G("Letter to yourself", "🎲 Write in two sentences what you’d say to yourself in 10 years. I’ll do the same and we’ll compare."),
            G("What you can’t see", "🎲 Tell me one quality you see in me that I might not see myself."),
            G("Gratitude challenge", "🎲 Gratitude challenge: we each name 3 things we appreciate about the other. I’ll let you start!")
          ]
        }
      ],

      family: [
        {
          t: [
            "How is the family? Any news?",
            "What did you eat today? Tell me about your day!",
            "Is there a party or family event coming up?",
            "Do you remember that dish everyone loved at home?",
            "What’s your best family vacation memory?",
            "What do you need right now? Tell me, I want to help."
          ],
          g: [
            G("Photo memory", "🎲 Challenge: send me an old family photo, and I’ll tell you what I remember about that day."),
            G("Riddle", "🎲 Riddle: I’m full of holes but I hold water. What am I?", "A sponge"),
            G("Who am I?", "🎲 Who am I? I’m a family member, I love cooking and I always have advice. Guess, then give me yours!")
          ]
        },
        {
          t: [
            "Tell me a family story I don’t know.",
            "Which family tradition would you like to keep forever?",
            "What did you learn from our parents or grandparents?",
            "If we organized a reunion, where would it be and with whom?",
            "What advice did you once give me that I’ve never forgotten?",
            "What makes you proudest in the family?"
          ],
          g: [
            G("Family quiz", "🎲 Quiz: what’s everyone’s favorite dish at home? I’ll score your answers and you score mine."),
            G("A proverb from home", "🎲 Tell me a proverb from home that you like, and what it teaches you."),
            G("Voice of memories", "🎲 Challenge: send me a 15-second voice message with a childhood memory that makes you smile 🎙️")
          ]
        },
        {
          t: [
            "Is there something we’ve never said to each other that you’d like to tell me?",
            "What could the family do better together, in your opinion?",
            "How can I support you right now?",
            "What’s your greatest wish for our family?",
            "What stayed with you the most from your childhood?",
            "What are you most grateful for in our relationship?"
          ],
          g: [
            G("Thank-yous", "🎲 Challenge: write me 3 things you thank me for, I’ll do the same for you."),
            G("Message for 10 years from now", "🎲 We each write a short message to the family 10 years from now. Send me yours, I’ll send you mine."),
            G("The best day", "🎲 Tell me about the best day you’ve had with the family. I’ll tell you mine afterwards.")
          ]
        }
      ],

      work: [
        {
          t: [
            "How was your workday?",
            "What’s the best moment of your week at work?",
            "Any tips for getting better organized? I need ideas.",
            "What’s the last useful thing you learned in your job?",
            "Do you have a break soon? Shall we chat for 5 minutes?",
            "Which tool or trick saves you time?"
          ],
          g: [
            G("My job in one sentence", "🎲 Challenge: explain your job in one sentence, as if to an 8-year-old. I’ll do the same!"),
            G("Riddle", "🎲 Riddle: the more there is, the less you see. What is it?", "Darkness"),
            G("Tip in 3 words", "🎲 What’s your best productivity tip, in just 3 words?")
          ]
        },
        {
          t: [
            "How did you end up in this line of work?",
            "Which project excites you the most right now?",
            "Which skill would you like to develop this year?",
            "What’s the best career advice you’ve been given?",
            "How do you stay motivated when things get tough?",
            "Could we collaborate on something? I have an idea."
          ],
          g: [
            G("30-second pitch", "🎲 Challenge: send me a 30-second voice message presenting your current project 🎙️"),
            G("Lightning ideas", "🎲 Lightning brainstorm: 5 ideas in 5 minutes to improve the way we work. Want to start?"),
            G("My first reflex", "🎲 What’s your first reflex when a problem comes up? I’ll tell you mine afterwards.")
          ]
        },
        {
          t: [
            "What’s weighing on you at work right now?",
            "Where do you see yourself professionally in 5 years?",
            "Which mistake taught you the most in your career?",
            "How can I help you better on the team?",
            "What would make your work more enjoyable?",
            "What work-life balance are you looking for?"
          ],
          g: [
            G("Kind feedback", "🎲 Kind feedback: tell me one thing I do well and one I can improve. I’ll do the same for you."),
            G("My proudest moment", "🎲 What’s your greatest professional pride? I’ll tell you mine afterwards."),
            G("If I could do it again", "🎲 If you could redo one career choice, which would it be? I’ll answer afterwards.")
          ]
        }
      ],

      "new": [
        {
          t: [
            "What brings you to TÕÕLé? 😊",
            "Which city are you from? What do you like about it?",
            "What do you like to do in your free time?",
            "What kind of music are you listening to these days?",
            "What’s your favorite dish?",
            "Morning or evening person? What does your typical day look like?"
          ],
          g: [
            G("Would you rather…", "🎲 Would you rather… a quiet beach or a lively city for your vacation? Your answer, then your question for me!"),
            G("2 truths, 1 lie", "🎲 2 truths, 1 lie: I write you 3 sentences about me, you guess which one is false. Shall we try?"),
            G("One word for your day", "🎲 One single word to describe your day, then I’ll do the same!")
          ]
        },
        {
          t: [
            "What’s the most beautiful place you’ve ever visited?",
            "If you could learn a new skill with one click, which would it be?",
            "What’s guaranteed to make you laugh?",
            "What’s your dream right now?",
            "Who has inspired you the most in your life?",
            "A book, movie or series that stayed with you?"
          ],
          g: [
            G("Riddle", "🎲 Riddle: what goes up and down without moving?", "Stairs"),
            G("Top 3 right now", "🎲 Give me your top 3 songs of the moment, I’ll give you mine."),
            G("Photo challenge", "🎲 Challenge: send me a photo of your favorite spot, no explanation. I’ll guess why you love it!")
          ]
        },
        {
          t: [
            "What matters most to you in life?",
            "What’s the biggest challenge you’ve overcome?",
            "What are you really looking for in meeting someone or in a friendship?",
            "What makes you feel truly good?",
            "If you could change one thing in your life, what would it be?",
            "What are you proudest of?"
          ],
          g: [
            G("Honest truth", "🎲 Truth: what are you proudest of that you rarely talk about? I’ll answer afterwards."),
            G("Letter to yourself", "🎲 Write in two sentences what you’d say to yourself in 10 years. I’ll do the same and we’ll compare."),
            G("Questions that bring us closer", "🎲 A question to get to know each other better: if you could invite anyone to dinner, who would you pick and why?")
          ]
        }
      ]
    }
  };
})();
