// SCENARIO: Troy — The Wooden Horse
// Difficulty: Very Hard | Start: Final day, ~8:00 AM | ~16 hours before Troy falls

export const trojanHorse = {
  id: 'trojan-horse',
  title: 'The Wooden Horse',
  subtitle: 'Troy, ~1184 BCE — The Final Day',
  difficulty: 'Very Hard',
  tagline: `You are the girl who sees everything. Apollo made sure no one will believe you.`,
  historicalContext:
    `After ten years of siege, the Greeks left a giant wooden horse on the beach and sailed away. The Trojans dragged it inside their walls. That night, forty soldiers climbed out, opened the gates, and Troy burned. Cassandra — daughter of King Priam, cursed by Apollo so that her true prophecies would never be believed — warned them until the end. No one listened.`,
  startNodeId: 'intro',
  startingResources: {
    time: 75,         // ~16 hours before midnight
    credibility: 10,  // Apollo's curse — almost no one believes you
    freedom: 70,      // Princess, free to move, but watched as a madwoman
  },
  timeLabel: '~16 hours until the city falls',

  knowledgeInventory: [
    { id: 'horse-hollow',    label: 'The horse is hollow — soldiers concealed inside', credibilityValue: 'very high', revealed: false },
    { id: 'sinon-spy',       label: 'Sinon is a Greek spy — his abandonment story is staged', credibilityValue: 'high', revealed: false },
    { id: 'fleet-hiding',    label: 'The fleet is hiding behind Tenedos island — not gone', credibilityValue: 'high', revealed: false },
    { id: 'midnight-attack', label: 'Soldiers emerge at midnight when guards are asleep', credibilityValue: 'medium', revealed: false },
    { id: 'laocoon-truth',   label: "Laocoon was right — the serpents were sent to silence him", credibilityValue: 'medium', revealed: false },
  ],

  nodes: {

    // ── ACT 1: THE HORSE ARRIVES ───────────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'Troy — Dawn, The Final Day',
      location: 'Palace Tower, Troy',
      activeNPC: null,
      narrative: `The Greeks are gone. That's what everyone is saying.\n\nFrom the tower you can see the beach: empty camps, cold fire-pits, and the wooden horse. It's enormous — taller than the Scaean Gate, built from fir planks, left on the sand like a prize someone forgot to collect. The city is flooding into the streets. People are laughing. After ten years, they want this to be over.\n\nYou are Cassandra, princess of Troy. You know what's inside the horse. You know what happens at midnight. You have known for days, and you have told everyone you could find, and every single one of them has walked away.\n\nYou have sixteen hours. Where do you start?`,
      options: [
        {
          id: 'find-laocoon',
          label: 'Find Laocoon before he goes to the horse',
          description: `⏱ 1h | The priest suspects it too — coordinate before the serpents silence him`,
          outcomes: [{ weight: 1, nextNodeId: 'laocoon', resourceChanges: { time: -8, credibility: +5 }, revealKnowledge: ['horse-hollow'] }],
        },
        {
          id: 'intercept-sinon',
          label: 'Intercept Sinon before he reaches Priam',
          description: `⏱ 1h 30m | The Greek prisoner is being escorted to the palace — expose him first`,
          outcomes: [{ weight: 1, nextNodeId: 'sinon', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['sinon-spy'] }],
        },
        {
          id: 'go-to-priam',
          label: 'Go directly to your father the King',
          description: `⏱ 30m | Priam has the power to order the horse burned — if he listens`,
          outcomes: [{ weight: 1, nextNodeId: 'priam', resourceChanges: { time: -5 } }],
        },
        {
          id: 'send-scout',
          label: 'Send a ship to Tenedos — prove the fleet is still there',
          description: `⏱ 6h | Physical proof is harder to dismiss than prophecy`,
          outcomes: [{ weight: 1, nextNodeId: 'scout-sent', resourceChanges: { time: -15, credibility: +12 }, revealKnowledge: ['fleet-hiding'] }],
        },
      ],
    },

    // ── LAOCOON ────────────────────────────────────────────────────────────────

    laocoon: {
      id: 'laocoon',
      type: 'standard',
      act: 1,
      title: 'The Priest',
      location: 'Temple of Apollo',
      activeNPC: 'Laocoon, priest of Poseidon',
      npcStats: { receptiveness: 85, authority: 55 },
      narrative: `Laocoon is sharpening a ritual knife when you find him. He looks up without surprise.\n\n"You know about the horse," he says. Not a question.\n\n"Forty soldiers inside it," you tell him. "Odysseus's plan. They come out at midnight."\n\nHe nods slowly. "I've written to Priam. I plan to address the council." He hesitates. "My argument will carry more weight if it doesn't arrive alongside yours. They'll assume we're conspiring. They'll call us both mad."\n\nHe's right. Your name poisons whatever it touches. You've never been able to decide if that makes you angry or just sad.`,
      options: [
        {
          id: 'laocoon-step-back',
          label: 'Agree to stay back — let Laocoon carry this alone',
          description: `⏱ 30m | Your credibility will drag him down; his has a better chance without you`,
          outcomes: [
            { weight: 1, nextNodeId: 'laocoon-argues', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `It costs you something to step back. Laocoon walks to the palace alone.` },
          ],
        },
        {
          id: 'laocoon-together',
          label: 'Present together — two witnesses carry more weight',
          description: `⏱ 45m | The risk is they dismiss you both; the upside is someone asks questions`,
          outcomes: [
            { weight: 6, nextNodeId: 'laocoon-argues', resourceChanges: { time: -8, credibility: +8 }, narrativeResult: `Some of the council lean forward. A few ask questions they wouldn't have asked otherwise.` },
            { weight: 4, nextNodeId: 'laocoon-argues', resourceChanges: { time: -8, credibility: -8 }, narrativeResult: `Someone calls out "the mad prophetess." The room shifts. Laocoon continues, but the moment has cracked.` },
          ],
        },
        {
          id: 'laocoon-spear',
          label: 'Ask him to drive his spear into the horse — listen for hollow wood',
          description: `⏱ 30m | Physical evidence, heard by a crowd, is harder to explain away`,
          outcomes: [
            { weight: 1, nextNodeId: 'horse-struck', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['laocoon-truth'] },
          ],
        },
      ],
    },

    'horse-struck': {
      id: 'horse-struck',
      type: 'snap',
      act: 1,
      timer: 12,
      title: 'The Spear Hits',
      narrative: `Laocoon drives his spear into the horse's flank. The sound that comes back is unmistakable: hollow. Not solid wood. A boom, then — from inside — something shifting, quickly suppressed.\n\nThe crowd goes quiet. This is your window. Ten seconds before someone rationalizes it.`,
      options: [
        {
          id: 'shout-now',
          label: 'Shout to the crowd: "Hear that? Soldiers inside!"',
          description: `Call it out loud before anyone fills the silence with an explanation`,
          outcomes: [
            { weight: 1, nextNodeId: 'crowd-moment', resourceChanges: { time: -5, credibility: +20 }, narrativeResult: `Some heard it. They're looking at each other. You have a window.` },
          ],
        },
        {
          id: 'run-for-priam',
          label: 'Run — get Priam here before this moment passes',
          description: `The king is nearby. Hearing it himself ends the debate`,
          outcomes: [
            { weight: 1, nextNodeId: 'priam-at-horse', resourceChanges: { time: -10, credibility: +15 }, narrativeResult: `You sprint for the gate. Priam is being carried toward the beach. You intercept his litter.` },
          ],
        },
        {
          id: 'call-for-torch',
          label: 'Demand they burn it now, while it stands outside the walls',
          description: `Destroy it before the priests turn this into a sacred moment`,
          outcomes: [
            { weight: 6, nextNodeId: 'burn-attempt', resourceChanges: { time: -10, credibility: +10 }, narrativeResult: `Men reach for torches. Then the serpents come from the sea.` },
            { weight: 4, nextNodeId: 'burn-attempt', resourceChanges: { time: -10, credibility: -5 }, narrativeResult: `The crowd hesitates — burning it might anger Athena. The moment slips.` },
          ],
        },
      ],
    },

    'burn-attempt': {
      id: 'burn-attempt',
      type: 'standard',
      act: 2,
      title: 'The Serpents',
      location: 'Beach Gate',
      narrative: `It almost worked.\n\nMen had torches. The crowd was shifting toward action. Laocoon was speaking. Then two enormous sea serpents came from the water and killed Laocoon's twin sons. Laocoon ran to save them and was killed too.\n\nThe crowd doesn't see a warning ignored. They see divine punishment for striking a sacred offering. In thirty seconds, the horse became untouchable.\n\nSomewhere, Odysseus is smiling. The gods themselves are being used as a weapon against you. You need another way in.`,
      options: [
        {
          id: 'try-hecuba',
          label: 'Find your mother Hecuba — she listens',
          description: `⏱ 1h | The queen has more access to Priam than any advisor`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +5 } }],
        },
        {
          id: 'try-antenor',
          label: 'Find Antenor — the elder who wanted peace',
          description: `⏱ 1h 30m | He has been right before about things people didn't want to hear`,
          outcomes: [{ weight: 1, nextNodeId: 'antenor', resourceChanges: { time: -10, credibility: -5 } }],
        },
        {
          id: 'try-guards',
          label: 'Warn the gate garrison — soldiers respond to tactical arguments',
          description: `⏱ 1h | They can refuse to widen the gate; the horse can't enter without it`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    'laocoon-argues': {
      id: 'laocoon-argues',
      type: 'standard',
      act: 2,
      title: 'After the Council',
      location: 'Palace Steps',
      narrative: `The council heard Laocoon. They deliberated for forty-five minutes. Then the high priest of Athena stood up and said the horse was a sacred offering and bringing it inside would bless the city.\n\nThe vote was nine to three in favor of bringing it inside.\n\nLaocoon is back on the steps, looking like a man who has said everything he can say. The crowd is already attaching ropes to the horse's legs.\n\nYou have to work around the council now.`,
      options: [
        {
          id: 'after-hecuba',
          label: 'Go to your mother Hecuba — work through the palace',
          description: `⏱ 1h | Priam listens to Hecuba in ways he doesn't listen to his advisors`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +5 } }],
        },
        {
          id: 'after-garrison',
          label: 'Go to the gate garrison — request a structural delay',
          description: `⏱ 1h | They must widen the gate to fit the horse; that takes hours they can slow down`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 } }],
        },
        {
          id: 'after-antenor',
          label: 'Find Antenor and the elders — build a coalition against bringing it in',
          description: `⏱ 2h | Slow, but Antenor has political weight you don't`,
          outcomes: [{ weight: 1, nextNodeId: 'antenor', resourceChanges: { time: -15, credibility: +8 } }],
        },
      ],
    },

    // ── SINON ──────────────────────────────────────────────────────────────────

    sinon: {
      id: 'sinon',
      type: 'standard',
      act: 1,
      title: 'The Prisoner',
      location: 'Lower Agora',
      activeNPC: 'Sinon, Greek prisoner',
      npcStats: { receptiveness: 0, authority: 0 },
      narrative: `Sinon is younger than you expected — maybe twenty-five, with a face designed for lying. Wrists bound, but the guards are relaxed. Everyone knows the war is over.\n\nHe sees you coming and recognition moves across his face. He's heard of you.\n\nHe knows you know. And he knows — because the curse is perfectly designed — that you can't prove it in any way that sticks.\n\n"Princess," he says pleasantly. "I hear you have the gift of prophecy."\n\n"I know what you are."\n\n"Everyone knows what I am. A Greek soldier left behind." The smile doesn't reach his eyes. "What does your gift say about that?"`,
      options: [
        {
          id: 'search-sinon',
          label: 'Demand the guards search him for military identification',
          description: `⏱ 30m | Physical evidence on his person is harder to dismiss than prophecy`,
          outcomes: [
            { weight: 5, nextNodeId: 'sinon-searched-hit', resourceChanges: { time: -5, credibility: +15 }, narrativeResult: `They find a bronze disc with Greek naval markings. Not conclusive, but suspicious.` },
            { weight: 5, nextNodeId: 'sinon-searched-miss', resourceChanges: { time: -5, credibility: -8 }, narrativeResult: `They find nothing. Sinon spreads his hands. His expression is patient and exactly calibrated to make you look hysterical.` },
          ],
        },
        {
          id: 'bluff-sinon',
          label: `Tell him "we're burning the horse" — watch his face`,
          description: `⏱ 15m | The horse matters too much; if threatened convincingly, something might break`,
          outcomes: [
            { weight: 4, nextNodeId: 'sinon-cracks', resourceChanges: { time: -3, credibility: +18 }, revealKnowledge: ['sinon-spy'], narrativeResult: `Something moves in his face — not panic, but recalculation. One of the guards sees it too.` },
            { weight: 6, nextNodeId: 'sinon-holds', resourceChanges: { time: -3, credibility: -5 }, narrativeResult: `He doesn't flinch. He's been trained for exactly this.` },
          ],
        },
        {
          id: 'witness-sinon',
          label: 'Bring a Greek-speaking Trojan to interrogate him properly',
          description: `⏱ 2h | Someone who knows Greek military culture can spot inconsistencies in his story`,
          outcomes: [
            { weight: 1, nextNodeId: 'sinon-questioned', resourceChanges: { time: -15, credibility: +10 }, narrativeResult: `The merchant Antenor knows Greeks. He agrees to join the interrogation.` },
          ],
        },
      ],
    },

    'sinon-searched-hit': {
      id: 'sinon-searched-hit',
      type: 'standard',
      act: 2,
      title: 'The Naval Disc',
      location: 'Lower Agora',
      activeNPC: 'Sinon',
      narrative: `The bronze disc is small — the kind officers carry to identify their ship in the dark. It has Greek fleet markings. No abandoned soldier would carry this.\n\nSinon's expression doesn't break. He has an explanation ready: a keepsake, his father's, purely sentimental.\n\nBut two of the guards are looking at each other now. And the escort commander is holding the disc like a man reconsidering something.\n\nYou have a small window. Use it.`,
      options: [
        {
          id: 'disc-to-priam',
          label: 'Take the disc directly to Priam — physical evidence, now',
          description: `⏱ 1h | The king needs to see this before Sinon's handlers spin it`,
          outcomes: [{ weight: 1, nextNodeId: 'priam', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['sinon-spy'] }],
        },
        {
          id: 'disc-to-garrison',
          label: 'Bring the commander and the disc to the gate garrison',
          description: `⏱ 1h | Military men evaluating military evidence, without the priests involved`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +18 } }],
        },
      ],
    },

    'sinon-searched-miss': {
      id: 'sinon-searched-miss',
      type: 'standard',
      act: 2,
      title: 'No Evidence',
      location: 'Lower Agora',
      narrative: `The search found nothing. Sinon is now being escorted to the palace to be brought before Priam — a sympathetic prisoner who was searched by a paranoid princess and came up clean.\n\nYour credibility is lower than it was this morning. Sinon's cover is intact.\n\nYou need a different angle.`,
      options: [
        {
          id: 'miss-hecuba',
          label: 'Go directly to your mother — bypass the court',
          description: `⏱ 1h | Hecuba has always been more open than Priam`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8 } }],
        },
        {
          id: 'miss-garrison',
          label: 'Go to the garrison — warn the soldiers even if no one else will act',
          description: `⏱ 1h | They can increase the night watch even without an official order`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    'sinon-cracks': {
      id: 'sinon-cracks',
      type: 'standard',
      act: 2,
      title: 'A Crack',
      location: 'Lower Agora',
      narrative: `Something moved in his face when you said "burning." Just for a moment — a micro-recalculation, visible to you and, crucially, to one of the guards who was watching closely.\n\nSinon recovered immediately. His composure came back like a curtain dropping. But the guard saw it too, and she's frowning now.\n\nYou won't get a confession. But you have a witness to a crack.`,
      options: [
        {
          id: 'crack-guard',
          label: 'Speak privately with the guard who saw the reaction',
          description: `⏱ 30m | A soldier's testimony carries more weight than yours`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -5, credibility: +12 } }],
        },
        {
          id: 'crack-priam',
          label: `Go to Priam now — report Sinon's reaction before the prisoner reaches court`,
          description: `⏱ 45m | Get there first; shape what Priam hears before Sinon does`,
          outcomes: [{ weight: 1, nextNodeId: 'priam', resourceChanges: { time: -8, credibility: +10 } }],
        },
      ],
    },

    'sinon-holds': {
      id: 'sinon-holds',
      type: 'standard',
      act: 2,
      title: 'Nothing',
      location: 'Lower Agora',
      narrative: `He didn't flinch. He is now being brought to Priam and his story will be told perfectly, and the court will believe it because they need to believe it.\n\nYou have nothing from Sinon. You need another route.`,
      options: [
        {
          id: 'holds-hecuba',
          label: 'Go to Hecuba',
          description: `⏱ 1h | Your mother is the most receptive person in the palace`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +5 } }],
        },
        {
          id: 'holds-garrison',
          label: 'Go to the gate garrison',
          description: `⏱ 1h | Soldiers. Practical arguments. No priests.`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 } }],
        },
      ],
    },

    'sinon-questioned': {
      id: 'sinon-questioned',
      type: 'standard',
      act: 2,
      title: 'The Merchant Listens',
      location: 'Lower Agora',
      activeNPC: 'Antenor, Elder Counselor',
      npcStats: { receptiveness: 70, authority: 50 },
      narrative: `Antenor spent forty minutes with Sinon, speaking Greek. He comes back to you slowly, his expression careful.\n\n"His accent is from Corinth, not Argos as he claims. Two details about his unit contradict each other. It could be confusion from trauma." He pauses. "Or it could be training."\n\nHe's not ready to say "spy." But he's not saying "innocent" either.`,
      options: [
        {
          id: 'questioned-push',
          label: 'Ask Antenor to formally object to Sinon reaching Priam',
          description: `⏱ 1h | His standing means a formal objection buys time`,
          outcomes: [{ weight: 1, nextNodeId: 'antenor', resourceChanges: { time: -8, credibility: +12 }, revealKnowledge: ['sinon-spy'] }],
        },
        {
          id: 'questioned-garrison',
          label: 'Take Antenor\'s findings to the garrison commander',
          description: `⏱ 1h | Military skepticism backed by an elder\'s observation`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +15 } }],
        },
      ],
    },

    // ── PRIAM ─────────────────────────────────────────────────────────────────

    priam: {
      id: 'priam',
      type: 'standard',
      act: 1,
      title: 'The King',
      location: 'Throne Room',
      activeNPC: 'Priam, King of Troy',
      npcStats: { receptiveness: 12, authority: 100 },
      narrative: `Priam is sixty-eight years old, white-bearded, and tired in the way that only forty years of rule can make a man tired. He looks at you with more love than most fathers give their daughters, and also with a specific kind of fatigue that he keeps only for you.\n\n"Cassandra." He holds out his hand. "They're gone. It's over."\n\n"The horse is hollow," you say. "Soldiers inside. Tonight they'll kill everyone in this room."\n\nHe closes his eyes briefly. He has heard some version of this for years.`,
      options: [
        {
          id: 'priam-kneel',
          label: `Ask for one thing only: send a scout to Tenedos before celebrating`,
          description: `⏱ 30m | Not "believe me" — just "check." Small, specific, verifiable`,
          outcomes: [
            { weight: 6, nextNodeId: 'priam-scout', resourceChanges: { time: -5, credibility: +12 }, revealKnowledge: ['fleet-hiding'], narrativeResult: `"One ship," he says to his admiral, "for my daughter's peace of mind."` },
            { weight: 4, nextNodeId: 'priam-closed', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `He shakes his head gently. "We've been at war ten years. Let us have one day of peace."` },
          ],
        },
        {
          id: 'priam-technical',
          label: 'Make the physical argument — the horse is large enough to hold men',
          description: `⏱ 45m | Facts and physics, not prophecy; he can verify this himself`,
          outcomes: [
            { weight: 5, nextNodeId: 'priam-scout', resourceChanges: { time: -8, credibility: +8 }, narrativeResult: `Priam turns to his chief engineer. "Have someone examine it."` },
            { weight: 5, nextNodeId: 'priam-closed', resourceChanges: { time: -8, credibility: -8 }, narrativeResult: `The engineers are celebrating too. No one wants this job today.` },
          ],
        },
        {
          id: 'priam-names',
          label: `Name who dies tonight — make it specific and personal`,
          description: `⏱ 20m | He can dismiss abstract prophecy; he can't dismiss hearing his sons' names`,
          outcomes: [
            { weight: 3, nextNodeId: 'priam-shaken', resourceChanges: { time: -5, credibility: +15 }, narrativeResult: `The room goes quiet. You list the names. Priam's face changes.` },
            { weight: 7, nextNodeId: 'priam-closed', resourceChanges: { time: -5, credibility: -15 }, narrativeResult: `"She names the dead before they die," someone mutters. "Is that not a curse she brings herself?"` },
          ],
        },
      ],
    },

    'priam-scout': {
      id: 'priam-scout',
      type: 'standard',
      act: 2,
      title: 'A Concession',
      location: 'Throne Room',
      narrative: `Priam agreed to something. A scout ship to Tenedos, or an engineer's inspection, or a formal delay. It isn't a reversal — the celebration continues — but the horse hasn't entered the city yet.\n\nYou have a few hours before that changes. Use them.`,
      options: [
        {
          id: 'scout-hecuba',
          label: 'Bring Hecuba into the doubt while it exists',
          description: `⏱ 1h | She can reinforce your father's hesitation into a real decision`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +8 } }],
        },
        {
          id: 'scout-burn',
          label: 'Use the delay to organize a burning party — destroy it while it\'s still outside',
          description: `⏱ 2h | The delay gives you cover; act before the moment closes`,
          outcomes: [{ weight: 1, nextNodeId: 'burn-organized', resourceChanges: { time: -12, credibility: +10 } }],
        },
        {
          id: 'scout-garrison',
          label: 'Warn the garrison — if it enters tonight, the guards must be ready',
          description: `⏱ 1h | Hedge: if burning fails, prepared soldiers might limit the damage`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    'priam-shaken': {
      id: 'priam-shaken',
      type: 'standard',
      act: 2,
      title: 'The King Is Quiet',
      location: 'Throne Room',
      narrative: `You said the names. His sons. His grandsons. Specific deaths, specific moments. The room went still.\n\nPriam hasn't spoken in three minutes. The advisors are watching him. A high priest is preparing an objection.\n\nThis is the most uncertain Priam has been all day. You have maybe one more move before someone fills this silence for him.`,
      options: [
        {
          id: 'shaken-burn',
          label: 'Ask him for one order only: burn the horse',
          description: `⏱ 20m | He has the power; this is the moment; don't wait`,
          outcomes: [
            { weight: 5, nextNodeId: 'burn-organized', resourceChanges: { time: -5, credibility: +10 }, narrativeResult: `"Burn it," he says quietly, before the priests can object.` },
            { weight: 5, nextNodeId: 'priam-closed', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `The high priest intercedes. The moment breaks. Priam looks grateful for the interruption.` },
          ],
        },
        {
          id: 'shaken-hecuba',
          label: 'Get Hecuba — bring her here while Priam is still shaken',
          description: `⏱ 30m | Two people speaking into his uncertainty is harder to dismiss`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +10 } }],
        },
      ],
    },

    'priam-closed': {
      id: 'priam-closed',
      type: 'standard',
      act: 2,
      title: 'The Door Closes',
      location: 'Palace Corridor',
      narrative: `Priam has moved on. He is receiving Sinon, or attending the celebration, or simply doing what men do when they have decided something — not looking at the person who disagrees.\n\nYou are not imprisoned. You are not in chains. You are simply a princess walking the palace corridors after being politely ignored by the most powerful man in the city.\n\nThe horse will be inside the walls by sunset.`,
      options: [
        {
          id: 'closed-hecuba',
          label: 'Find your mother Hecuba',
          description: `⏱ 1h | She has always taken you more seriously than your father does`,
          outcomes: [{ weight: 1, nextNodeId: 'hecuba', resourceChanges: { time: -8, credibility: +5 } }],
        },
        {
          id: 'closed-antenor',
          label: 'Find Antenor',
          description: `⏱ 1h 30m | The elder who wanted peace throughout this war`,
          outcomes: [{ weight: 1, nextNodeId: 'antenor', resourceChanges: { time: -10, credibility: +5 } }],
        },
        {
          id: 'closed-garrison',
          label: 'Go to the gate garrison — the soldiers are your last practical option',
          description: `⏱ 1h | If the horse enters tonight, prepared guards are what's left`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    'priam-at-horse': {
      id: 'priam-at-horse',
      type: 'standard',
      act: 2,
      title: 'The King Knocks',
      location: 'Outside the Scaean Gate',
      activeNPC: 'Priam',
      npcStats: { receptiveness: 35, authority: 100 },
      narrative: `You intercepted his litter on the road. He came. He is standing in front of the horse now, one hand on the wood.\n\n"Knock," you say. "Just knock."\n\nHe looks at you for a long moment. Then he knocks.\n\nThe sound that comes back is hollow. Several people nearby hear it. Priam's hand stays on the wood longer than it needs to.`,
      options: [
        {
          id: 'at-horse-burn',
          label: 'Ask him to order it burned here, now, before it goes inside',
          description: `⏱ 20m | He heard it. Strike while the doubt is in him.`,
          outcomes: [
            { weight: 6, nextNodeId: 'burn-organized', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['horse-hollow'], narrativeResult: `"Burn it," Priam says. The crowd stirs.` },
            { weight: 4, nextNodeId: 'priam-closed', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `A priest intervenes. Divine resonance, he says. Priam's hand withdraws.` },
          ],
        },
        {
          id: 'at-horse-inspect',
          label: 'Ask the engineers to search the belly for seams',
          description: `⏱ 1h | A structural inspection, not prophecy — find the door`,
          outcomes: [
            { weight: 1, nextNodeId: 'priam-scout', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['horse-hollow'], narrativeResult: `The engineers find faint tool marks along the horse's belly. Priam orders a delay.` },
          ],
        },
      ],
    },

    // ── KEY NPCs ───────────────────────────────────────────────────────────────

    hecuba: {
      id: 'hecuba',
      type: 'standard',
      act: 2,
      title: 'The Queen',
      location: 'Inner Garden',
      activeNPC: 'Hecuba, Queen of Troy',
      npcStats: { receptiveness: 65, authority: 60 },
      narrative: `Your mother is seventy years old and still carries herself like a weapon. She was watching the horse from a high window when you found her.\n\n"Something about it troubles me," she says before you speak.\n\nThis is the most receptive anyone has been to you all day.`,
      options: [
        {
          id: 'hecuba-everything',
          label: 'Tell her everything — the soldiers, midnight, Odysseus',
          description: `⏱ 45m | She's the person in Troy most likely to believe you; risk it`,
          outcomes: [
            { weight: 7, nextNodeId: 'hecuba-convinced', resourceChanges: { time: -8, credibility: +12 }, narrativeResult: `She listens without interrupting. "I will speak to Priam," she says.` },
            { weight: 3, nextNodeId: 'hecuba-partial', resourceChanges: { time: -8, credibility: -5 }, narrativeResult: `She wants to believe you. But the specifics make it sound like a vision, not a warning.` },
          ],
        },
        {
          id: 'hecuba-ritual',
          label: `Ask her to demand a three-day ritual purification delay`,
          description: `⏱ 30m | Frame it as piety; three days is all you need; no one can object`,
          outcomes: [
            { weight: 1, nextNodeId: 'hecuba-convinced', resourceChanges: { time: -5, credibility: +15 }, narrativeResult: `"A purification period. The priests cannot argue against piety." She stands.` },
          ],
        },
        {
          id: 'hecuba-evidence',
          label: 'Show her the tool marks on the belly — have her see it herself',
          description: `⏱ 1h 30m | Physical evidence seen by the queen carries different weight`,
          outcomes: [
            { weight: 1, nextNodeId: 'hecuba-convinced', resourceChanges: { time: -12, credibility: +18 }, revealKnowledge: ['horse-hollow'], narrativeResult: `Hecuba touches the seams. When she turns back, something has changed in her face.` },
          ],
        },
      ],
    },

    'hecuba-convinced': {
      id: 'hecuba-convinced',
      type: 'standard',
      act: 3,
      title: 'Hecuba Acts',
      location: 'Palace',
      narrative: `Hecuba went to Priam. You don't know exactly what she said. But when the doors opened, Priam had ordered the horse to remain outside the walls until morning.\n\nThe priests are arguing. The crowd is confused. But outside the walls is not inside the walls.\n\nOutside the walls the soldiers are still trapped. But if the gate isn't watched, they can still open it from outside at midnight.\n\nYou have a few hours.`,
      options: [
        {
          id: 'convinced-guards',
          label: 'Go to the garrison — warn the night watch about midnight specifically',
          description: `⏱ 1h | Even outside the walls, the Greeks can open the gate. The guards must know.`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +10 }, revealKnowledge: ['midnight-attack'] }],
        },
        {
          id: 'convinced-burn',
          label: 'Organize a burning party — destroy the horse while Priam\'s order gives cover',
          description: `⏱ 2h | The delay gives you room to act; use it`,
          outcomes: [{ weight: 1, nextNodeId: 'burn-organized', resourceChanges: { time: -12, credibility: +12 } }],
        },
      ],
    },

    'hecuba-partial': {
      id: 'hecuba-partial',
      type: 'standard',
      act: 3,
      title: 'Almost',
      narrative: `She didn't fully believe you. She told Priam to be cautious — vague enough that it won't stop the horse, strong enough that he might sleep a little less soundly.\n\nThe horse will enter the city. You need to focus on what happens after.`,
      options: [
        {
          id: 'partial-garrison',
          label: 'Go to the garrison — prepare the night guards',
          description: `⏱ 1h | If soldiers know what to watch for at midnight, they have a chance`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['midnight-attack'] }],
        },
        {
          id: 'partial-antenor',
          label: 'Find Antenor — your last politically viable ally',
          description: `⏱ 1h 30m | He has been right before; he listens`,
          outcomes: [{ weight: 1, nextNodeId: 'antenor', resourceChanges: { time: -12, credibility: +8 } }],
        },
      ],
    },

    antenor: {
      id: 'antenor',
      type: 'standard',
      act: 2,
      title: 'The Elder',
      location: 'West Gate',
      activeNPC: 'Antenor, Elder Counselor',
      npcStats: { receptiveness: 70, authority: 50 },
      narrative: `Antenor is eighty years old and the only man in Troy who advocated returning Helen in the first year of the war. He was overruled. He has spent a decade being right in ways that didn't matter.\n\nHe looks at you when you approach and there is no condescension. Just recognition.\n\n"Tell me," he says.`,
      options: [
        {
          id: 'antenor-full',
          label: 'Tell him everything — the horse, Sinon, midnight',
          description: `⏱ 45m | He's the most receptive audience you've found; don't be careful`,
          outcomes: [
            { weight: 8, nextNodeId: 'antenor-acts', resourceChanges: { time: -8, credibility: +15 }, narrativeResult: `"I have been thinking the same thing since dawn," he says, and stands up. "Come with me."` },
            { weight: 2, nextNodeId: 'antenor-partial', resourceChanges: { time: -8, credibility: +5 }, narrativeResult: `He believes you more than most. He's not sure he believes enough to act.` },
          ],
        },
        {
          id: 'antenor-council',
          label: 'Ask him to call an emergency council session',
          description: `⏱ 2h | A formal debate surfaces the doubts others have been suppressing`,
          outcomes: [
            { weight: 1, nextNodeId: 'antenor-acts', resourceChanges: { time: -15, credibility: +12 }, narrativeResult: `Antenor nods. "That I can do." He sends a runner.` },
          ],
        },
      ],
    },

    'antenor-acts': {
      id: 'antenor-acts',
      type: 'standard',
      act: 3,
      title: 'Antenor Moves',
      narrative: `Antenor brought you to three other elders within the hour. In his voice — the voice of a man who has been right before about things no one wanted to hear — your argument landed differently.\n\nTwo of the three listened. There is a real debate in the council chamber now. The priests are arguing against. The generals are split.\n\nThis is more than you've accomplished all day. It still might not be enough.`,
      options: [
        {
          id: 'antenor-burn',
          label: 'Push for a vote on burning — the debate is the moment',
          description: `⏱ 1h | Press the opening; councils move when they feel momentum`,
          outcomes: [
            { weight: 1, nextNodeId: 'burn-organized', resourceChanges: { time: -10, credibility: +10 }, narrativeResult: `Two generals agree. The vote goes to Priam.` },
          ],
        },
        {
          id: 'antenor-hedge',
          label: 'If burning fails, prepare the night guards as backup',
          description: `⏱ 1h | Hedge your position — if the debate loses, soldiers ready at midnight are what\'s left`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    'antenor-partial': {
      id: 'antenor-partial',
      type: 'standard',
      act: 3,
      title: 'Not Enough',
      narrative: `Antenor believes you more than anyone else today. But "more than anyone" still isn't enough for him to act decisively.\n\n"I will speak carefully with certain people," he says. "That is all I can promise."\n\nIt will create murmur. It won't stop the horse.`,
      options: [
        {
          id: 'partial2-garrison',
          label: 'Go to the garrison — soldiers respond to tactical arguments',
          description: `⏱ 1h | Last practical option`,
          outcomes: [{ weight: 1, nextNodeId: 'garrison', resourceChanges: { time: -10 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    // ── GARRISON ──────────────────────────────────────────────────────────────

    garrison: {
      id: 'garrison',
      type: 'standard',
      act: 2,
      title: 'The Garrison Commander',
      location: 'Scaean Gate',
      activeNPC: 'Commander Thymoetes, Gate Garrison',
      npcStats: { receptiveness: 55, authority: 35 },
      narrative: `Commander Thymoetes is thirty-five and precise in the way that soldiers who survived ten years of siege become precise. He received you without the court's contempt — he's a practical man, and he deals in threats he can see.\n\n"If soldiers were inside," he says slowly, "they'd need air. They'd need water. How long has the horse been there?"\n\n"Since dawn."\n\nHe does the math. His expression shifts slightly.`,
      options: [
        {
          id: 'garrison-vents',
          label: 'Walk him through it — ventilation holes disguised as decoration',
          description: `⏱ 1h | An engineer's argument to a military man; he can verify this`,
          outcomes: [
            { weight: 7, nextNodeId: 'garrison-convinced', resourceChanges: { time: -10, credibility: +15 }, revealKnowledge: ['horse-hollow'], narrativeResult: `His men examine the horse's underside. They find oddly placed air vents. His jaw tightens.` },
            { weight: 3, nextNodeId: 'garrison-partial', resourceChanges: { time: -10, credibility: -5 }, narrativeResult: `They find nothing definitive. He's still listening, but not convinced.` },
          ],
        },
        {
          id: 'garrison-midnight',
          label: 'Give him the specific time: midnight, the belly, sounds of movement',
          description: `⏱ 30m | Specific actionable intelligence impresses soldiers more than vague prophecy`,
          outcomes: [
            { weight: 1, nextNodeId: 'garrison-convinced', resourceChanges: { time: -8, credibility: +12 }, revealKnowledge: ['midnight-attack'], narrativeResult: `Thymoetes writes it down. The specificity reaches him.` },
          ],
        },
        {
          id: 'garrison-wall',
          label: 'Ask him to refuse to widen the gate — the horse can\'t enter without it',
          description: `⏱ 30m | Structural objection: they must breach the wall to admit the horse`,
          outcomes: [
            { weight: 5, nextNodeId: 'garrison-convinced', resourceChanges: { time: -5, credibility: +10 }, narrativeResult: `"I would need someone senior to back that," he says carefully. He's leaving a door open.` },
            { weight: 5, nextNodeId: 'garrison-partial', resourceChanges: { time: -5, credibility: -8 }, narrativeResult: `"The king has ordered it brought in. I can't refuse on a hunch." He's not wrong.` },
          ],
        },
      ],
    },

    'garrison-convinced': {
      id: 'garrison-convinced',
      type: 'standard',
      act: 3,
      title: 'The Garrison Prepares',
      narrative: `Thymoetes can't stop the horse from entering — Priam's order stands. But he can do something.\n\nHe's doubled the interior guard. He's told his men exactly what to listen for: movement from the belly, sound of wood shifting after midnight. Three archers positioned with line-of-sight.\n\nIt's not enough to prevent anything. It may be enough to respond in time.`,
      options: [
        {
          id: 'convinced-stay',
          label: 'Stay with the garrison through the night — be there when it happens',
          description: `⏱ until midnight | Your presence keeps the guards alert when the moment comes`,
          outcomes: [{ weight: 1, nextNodeId: 'final-night', resourceChanges: { time: -5, credibility: +5 } }],
        },
        {
          id: 'convinced-burn-now',
          label: 'Use Thymoetes\' backing to push for burning the horse before sunset',
          description: `⏱ 1h | A garrison commander's security recommendation carries weight the council can't easily dismiss`,
          outcomes: [{ weight: 1, nextNodeId: 'burn-organized', resourceChanges: { time: -8, credibility: +8 } }],
        },
      ],
    },

    'garrison-partial': {
      id: 'garrison-partial',
      type: 'standard',
      act: 3,
      title: 'Two Extra Men',
      narrative: `Thymoetes posted two extra soldiers near the horse tonight. Two men watching something that holds forty.\n\nThe math is brutal. But it's something.`,
      options: [
        {
          id: 'partial3-stay',
          label: 'Position yourself near the horse — raise the alarm the instant it opens',
          description: `⏱ until midnight | You can't stop them coming out; you can give the garrison seconds`,
          outcomes: [{ weight: 1, nextNodeId: 'final-night', resourceChanges: { time: -5, credibility: -5 }, revealKnowledge: ['midnight-attack'] }],
        },
      ],
    },

    // ── BURN PATH ──────────────────────────────────────────────────────────────

    'scout-sent': {
      id: 'scout-sent',
      type: 'standard',
      act: 1,
      title: 'Waiting for the Scout',
      location: 'Harbor',
      narrative: `Your brother Deiphobus had a ship. It took an hour to convince him to send it. It will return in six hours — or not at all, if the Greeks catch it.\n\nSix hours is a long time when the horse is already being roped.\n\nYou need to fill those hours.`,
      options: [
        {
          id: 'scout-priam',
          label: 'Use the wait to prepare Priam for what the scout will find',
          description: `⏱ 1h | Prime the audience before the evidence arrives`,
          outcomes: [{ weight: 1, nextNodeId: 'priam', resourceChanges: { time: -8, credibility: +5 } }],
        },
        {
          id: 'scout-laocoon',
          label: 'Use the wait to coordinate with Laocoon',
          description: `⏱ 1h | Laocoon also suspects the horse; his time may be short`,
          outcomes: [{ weight: 1, nextNodeId: 'laocoon', resourceChanges: { time: -8, credibility: +5 } }],
        },
      ],
    },

    'burn-organized': {
      id: 'burn-organized',
      type: 'standard',
      act: 3,
      title: 'The Fire Option',
      narrative: `You have people willing to act — soldiers, elders, or royal backing, depending on the path you took. The horse is inside the courtyard now, touched by torchlight. Fire is everywhere in this city tonight.\n\nBut Priam's guards are watching the horse. A sacred offering. It can't just burn.\n\nYou have one window. If you're wrong about any of this, you've burned a piece of wood and ruined a night. If you're right, you save everyone inside these walls.`,
      options: [
        {
          id: 'burn-act',
          label: 'Act now — direct your people to fire the horse immediately',
          description: `⏱ 10m | The window is open; use it before it closes`,
          outcomes: [
            { weight: 1, nextNodeId: 'outcome-troy-saved', resourceChanges: { time: -5 }, narrativeResult: `The wood catches. From inside the horse: screaming.` },
          ],
        },
        {
          id: 'burn-with-priam',
          label: 'Get Priam\'s word first — a king\'s order can\'t be countermanded',
          description: `⏱ 1h | Takes time you may not have, but a royal burning can\'t be stopped by priests`,
          outcomes: [
            { weight: 5, nextNodeId: 'outcome-troy-saved', resourceChanges: { time: -15, credibility: +5 }, narrativeResult: `"Burn it," Priam says quietly, before anyone else can speak.` },
            { weight: 5, nextNodeId: 'final-night', resourceChanges: { time: -15, credibility: -10 }, narrativeResult: `By the time you reach him, the feast is full and the moment has passed. You go to the garrison instead.` },
          ],
        },
      ],
    },

    // ── THE NIGHT ──────────────────────────────────────────────────────────────

    'final-night': {
      id: 'final-night',
      type: 'snap',
      act: 3,
      timer: 15,
      title: 'Midnight — It Opens',
      narrative: `The city is quiet. The horse stands in the courtyard in moonlight.\n\nAt the base of the belly, a seam separates — by the hands of men who practiced this for weeks. Silent. Precise. The panel swings inward.\n\nA soldier's boot touches the flagstone.\n\nYou have fifteen seconds.`,
      options: [
        {
          id: 'night-shout',
          label: 'SHOUT — raise the alarm now',
          description: `Loud, now, before they are fully out`,
          outcomes: [
            { weight: 8, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +10 }, narrativeResult: `The garrison responds. There is fighting in the courtyard.` },
            { weight: 2, nextNodeId: 'outcome-failed', resourceChanges: { credibility: -5 }, narrativeResult: `The guards react too slowly. There are too many.` },
          ],
        },
        {
          id: 'night-torch',
          label: 'Take the nearest torch — fire the horse while they\'re still inside',
          description: `The door is open; they haven't all emerged yet`,
          outcomes: [
            { weight: 5, nextNodeId: 'outcome-troy-saved', resourceChanges: { credibility: +20 }, narrativeResult: `The torch goes through the opening before more than three men are out.` },
            { weight: 5, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +5 }, narrativeResult: `You fire it, but too many are already out. The alarm is raised. Some of the city holds.` },
          ],
        },
        {
          id: 'night-gate',
          label: 'Run for the main gate — stop them signaling the fleet',
          description: `The fleet is behind Tenedos; if the main gate stays shut, the soldiers inside are contained`,
          outcomes: [
            { weight: 6, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +5 }, narrativeResult: `You reach the gate. Soldiers fight their way toward it. You hold for twenty minutes.` },
            { weight: 4, nextNodeId: 'outcome-failed', resourceChanges: { credibility: -10 }, narrativeResult: `You don't reach it in time. The gate opens.` },
          ],
        },
      ],
    },

    // ── OUTCOMES ───────────────────────────────────────────────────────────────

    'outcome-troy-saved': {
      id: 'outcome-troy-saved',
      type: 'outcome',
      title: 'The Horse Burns',
      narrative: `The fire takes the fir wood fast.\n\nFrom inside the horse: shouting, then screaming, then silence that is worse than both.\n\nThe courtyard lights up. The garrison is there, weapons drawn. Three soldiers got out before the fire — they are disarmed and surrounded. One of them, when he is taken, asks who raised the alarm.\n\nSomeone tells him: the prophetess.\n\nHe looks up. "Cassandra." Not a question. He knew she might. Odysseus had told them she might.\n\nThat is the part that will stay with you. They planned for you. They planned for the possibility that someone believed you. And they came anyway, because the odds were so deeply on their side.\n\nIn the harbor at Tenedos, signal torches flicker: abort. The Greek fleet, which waited ten years for this night, turns and sails home.\n\nTroy stands.\n\nNo one will quite believe it was you who saved it.`,
      livesSaved: 35000,
      maxLives: 35000,
      historical: `In the traditional account — Homer, Virgil, Quintus of Smyrna — Cassandra was not believed. Troy fell. Its men were killed; its women enslaved. Cassandra was taken by Agamemnon and murdered in Mycenae. This outcome is the alternate history she never got to live.`,
      epilogue: `Cassandra lived. She continued to see the future in fragments for the rest of her life. She continued to be mostly disbelieved. But for the first time, she had been right in a way that could be counted and measured and verified by everyone who looked at the standing walls. It was not vindication. It was something smaller and more useful: a single crack in the curse. History doesn't record what she did with it.`,
    },

    'outcome-partial': {
      id: 'outcome-partial',
      type: 'outcome',
      title: 'The Alarm Was Raised',
      narrative: `You raised the alarm. The garrison responded.\n\nThere was fighting in the streets for three hours. Some Greeks made it to the inner gate; others didn't. Priam was killed in the confusion. The palace burned.\n\nBut the main gate held long enough that the fleet's signal didn't come. Dawn came with the fleet still offshore. A Trojan naval force met them in the harbor.\n\nTwo thousand Trojans died that night. The palace is ash. But the city stands — incompletely, expensively, in shock. The women and children are alive. The walls are intact except for the one you widened to admit the horse.\n\nAmong the survivors there's a story forming: a confused account of how the alarm was raised, where it came from, why anyone was ready at all. The prophetess is not yet centered in it.\n\nShe may never be centered in it. History prefers cleaner heroes.\n\nYou sit by the east gate as dawn comes and watch the Greek fleet retreat across the Aegean. You are very tired. In a few hours, someone will ask you what you knew.\n\nYou are going to tell them the whole truth. You always do.`,
      livesSaved: 18000,
      maxLives: 35000,
      historical: `The historical record is unanimous: Troy fell. Cassandra was taken as Agamemnon's concubine and later killed at Mycenae. In this partial outcome, the alarm reached the garrison in time to limit the damage — not to prevent it entirely. Some ancient sources suggest Antenor's family was spared by the Greeks, hinting that some Trojans survived through pragmatic action rather than force.`,
      epilogue: `For the rest of her life, when Cassandra spoke in council, the room went quiet in a way it never had before. Not belief, exactly. The specific, exhausted respect that people give to someone they should have listened to earlier. It was never enough to make the gift feel like anything other than a punishment. But Troy stood. On some nights, that was sufficient.`,
    },

    'outcome-failed': {
      id: 'outcome-failed',
      type: 'outcome',
      title: 'Troy Falls',
      narrative: `The gates opened at 1:17 AM.\n\nYou knew the exact moment before it happened. You always do.\n\nYou stood in the shadow of the east colonnade and watched the belly panel open and the soldiers drop, one by one, to the flagstones. Thirty-eight men. Odysseus last.\n\nThe main gate opened twenty minutes later. The Greek fleet entered the harbor.\n\nThe curse was not that you saw the future. The curse was that seeing it was all you could do. You spent sixteen hours trying to prove otherwise. History spent ten years proving you right.\n\nSomeone finds you in the Temple of Athena at dawn. You are sitting very still, watching the fires through the high window.\n\nYou don't speak for three days.`,
      livesSaved: 0,
      maxLives: 35000,
      historical: `Troy fell. Cassandra was found by Ajax the Lesser in the temple of Athena. She was taken to Mycenae as Agamemnon's war prize and killed by Clytemnestra. Priam was murdered at the altar of Zeus. Troy's men were killed; its women enslaved. Cassandra's name has survived as a cultural archetype for the person who sees disaster coming and cannot make anyone believe them — the Cassandra complex. Every scientist whose warnings go unread, every engineer whose objections are overridden, carries some portion of what she carried.`,
      epilogue: `The myth persists because the pattern persists. Institutional inertia. The preference for comfortable conclusions over accurate ones. The way hope defeats perception. Cassandra is remembered not because her story was unique but because it is repeated, in smaller ways, every day — in boardrooms and government agencies and research labs and late-night engineering calls before shuttle launches. She is the patron saint of people who were right too early.`,
    },
  },
};
