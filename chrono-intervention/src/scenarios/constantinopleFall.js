// SCENARIO: Constantinople — The Last Wall
// Difficulty: Hard | Start: May 28, 1453, ~10 PM | ~8 hours before the final assault

export const constantinopleFall = {
  id: 'constantinople-fall',
  title: 'The Last Wall',
  subtitle: 'Constantinople, May 28, 1453 — The Final Night',
  difficulty: 'Hard',
  tagline: `The Ottomans have been praying and lighting bonfires all evening. Everyone thinks it means retreat. You know it means dawn.`,
  historicalContext:
    `On May 29, 1453, Ottoman forces under Sultan Mehmed II breached the walls of Constantinople after a 53-day siege, ending the Byzantine Empire. A key failure: the Kerkoporta postern gate — a small door in the northern Blachernae wall — was left unlocked after a sortie. Ottoman soldiers found it ajar and poured through, raising the flag above the city before the main walls had fully broken. The Genoese commander Giovanni Giustiniani Longo, who held the crucial St. Romanus Gate section, was struck by a bolt through a gap in his armor. Against the Emperor's desperate pleas, he abandoned his post to be carried to the ships. His departure broke the defenders' morale. The city fell within hours. Approximately 4,000 people were killed in the sack.`,
  startNodeId: 'intro',
  startingResources: {
    time: 70,        // ~8 hours before the dawn assault
    credibility: 40, // Genoese mercenary sergeant — respected but foreign, limited court access
    freedom: 65,     // Free to move the walls, limited inside the palace
  },
  timeLabel: '~8 hours until the final assault',

  knowledgeInventory: [
    { id: 'kerkoporta',       label: 'The Kerkoporta postern gate — left unlocked after the last sortie', credibilityValue: 'very high', revealed: false },
    { id: 'giustiniani-wound', label: 'Giustiniani takes a bolt in the armpit — will want to abandon his post', credibilityValue: 'high',      revealed: false },
    { id: 'dawn-assault',     label: 'The final assault begins at dawn after the bonfires burn out', credibilityValue: 'high',      revealed: false },
    { id: 'sea-chain',        label: 'The chain holds but the Venetian galleys are ready to leave', credibilityValue: 'medium',    revealed: false },
    { id: 'janissary-wave',   label: 'The Janissary elite infantry strike the St. Romanus Gate third — the decisive wave', credibilityValue: 'medium',    revealed: false },
    { id: 'hagia-sophia',     label: 'Constantine will spend this night in Hagia Sophia — the last liturgy', credibilityValue: 'low',       revealed: false },
  ],

  nodes: {

    // ── ACT 1: THE FINAL NIGHT ─────────────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'May 28, 1453 — 10:14 PM',
      location: 'Blachernae Wall, Constantinople',
      activeNPC: null,
      narrative: `The Ottoman bonfires have been burning for two hours. From the wall you can see them — thousands of fires stretching across the plain to the horizon. The city is interpreting this as retreat, or celebration, or prayer.\n\nYou are Sergeant Marco Contarini, aide to Giovanni Giustiniani Longo. You've served under him for three years. You know what the bonfires mean: final prayers before a final assault. Dawn, or just before it.\n\nYou know three things that could save this city. You have one night to act on them.`,
      options: [
        {
          id: 'go-giustiniani',
          label: `Find Giustiniani — make him swear to hold his post whatever happens tomorrow`,
          description: `⏱ 30m | He leads the critical section. If he breaks, the wall breaks.`,
          outcomes: [{ weight: 1, nextNodeId: 'giustiniani', resourceChanges: { time: -8 }, revealKnowledge: ['giustiniani-wound'] }],
        },
        {
          id: 'go-constantine',
          label: `Request an audience with Emperor Constantine XI`,
          description: `⏱ 1h | The emperor can order the Kerkoporta sealed and permanently guarded`,
          outcomes: [{ weight: 1, nextNodeId: 'constantine', resourceChanges: { time: -12, credibility: -5 }, revealKnowledge: ['hagia-sophia'] }],
        },
        {
          id: 'go-kerkoporta',
          label: `Walk to the Kerkoporta gate now — check if it's locked`,
          description: `⏱ 45m | If it's open, you can seal it yourself before anyone uses it`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['kerkoporta'] }],
        },
        {
          id: 'go-sea-wall',
          label: `Go to the sea walls — ensure the Venetian galleys will stay through the night`,
          description: `⏱ 1h 30m | If they leave early, the harbor is exposed`,
          outcomes: [{ weight: 1, nextNodeId: 'sea_wall', resourceChanges: { time: -18, credibility: +5 }, revealKnowledge: ['sea-chain'] }],
        },
      ],
    },

    // ── GIUSTINIANI ────────────────────────────────────────────────────────────

    giustiniani: {
      id: 'giustiniani',
      type: 'standard',
      act: 1,
      title: 'The Commander',
      location: 'St. Romanus Gate, Inner Wall',
      activeNPC: 'Giovanni Giustiniani Longo',
      npcStats: { receptiveness: 65, authority: 85 },
      narrative: `Giustiniani is sitting on an ammunition crate, cleaning a crossbow bolt he'll never use again. He's been awake for thirty hours.\n\n"Contarini." He sounds tired in a way that isn't physical. "The fires."\n\n"It's tonight," you tell him. "Dawn assault. Final wave. They send the Janissaries third." You don't say how you know. He doesn't ask.\n\nHe looks at his hands. "If I'm wounded tomorrow — properly wounded — I need to make it to the ships. The men need to know the command passes to Minotto."`,
      options: [
        {
          id: 'giustiniani-oath',
          label: `Ask him to swear, on his name and his city, to hold until the wall falls or the threat passes`,
          description: `⏱ 20m | If he leaves his post, the wall psychologically collapses`,
          outcomes: [
            { weight: 5, nextNodeId: 'giustiniani_sworn', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['giustiniani-wound'], narrativeResult: `He's quiet for a long time. Then: "If I fall, I fall at the wall. On my name."` },
            { weight: 5, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `"Sergeant. I know my duty." He waves you off. He does not swear.` },
          ],
        },
        {
          id: 'giustiniani-wound',
          label: `Tell him about the armpit — the gap in his armor, the bolt that finds it`,
          description: `⏱ 20m | If he knows the specific wound coming, he can reinforce it`,
          outcomes: [
            { weight: 6, nextNodeId: 'giustiniani_armored', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['giustiniani-wound', 'janissary-wave'], narrativeResult: `He stares at you. Then he calls for his armorer.` },
            { weight: 4, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -5, credibility: -10 }, narrativeResult: `"You're telling me where I'll be hit." His look isn't kind. "Get off my wall."` },
          ],
        },
        {
          id: 'giustiniani-kerkoporta',
          label: `Tell him about the Kerkoporta gate — ask him to send men to seal it tonight`,
          description: `⏱ 20m | It's outside his section but he has the authority to order it`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -8, credibility: +12 }, revealKnowledge: ['kerkoporta'] }],
        },
      ],
    },

    giustiniani_sworn: {
      id: 'giustiniani_sworn',
      type: 'standard',
      act: 2,
      title: 'Sworn',
      location: 'St. Romanus Gate',
      activeNPC: 'Giustiniani',
      narrative: `He said it. Whether the oath holds when pain and blood are real is another question. But he said it, and you've known him long enough to know he means it when he says it quietly.\n\n"The gate," you say. "The small one in the north wall. It needs to be locked."\n\nHe nods. "Go. I'll hold this section. You close that gate."`,
      options: [
        {
          id: 'sworn-kerkoporta',
          label: `Go directly to the Kerkoporta — seal it yourself`,
          description: `⏱ 45m | With Giustiniani's implicit authorization`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -10, credibility: +10 } }],
        },
        {
          id: 'sworn-constantine',
          label: `Go to Emperor Constantine — get an imperial order to seal and guard the gate`,
          description: `⏱ 1h | An imperial order is harder to ignore than a sergeant's`,
          outcomes: [{ weight: 1, nextNodeId: 'constantine', resourceChanges: { time: -12, credibility: +5 } }],
        },
      ],
    },

    giustiniani_armored: {
      id: 'giustiniani_armored',
      type: 'standard',
      act: 2,
      title: 'The Armorer Works',
      location: 'St. Romanus Gate',
      activeNPC: 'Giustiniani',
      narrative: `His armorer is fitting extra plate under his left arm. Giustiniani says nothing while it's done.\n\nWhen the armorer leaves, he looks at you with something that might be respect and might be fear of you.\n\n"The Janissaries third," he says. "The armpit." He doesn't ask how you know. "What else?"\n\nThis is the most receptive he will ever be. Use it.`,
      options: [
        {
          id: 'armored-kerkoporta',
          label: `Tell him about the Kerkoporta — he needs to send men to seal it before dawn`,
          description: `⏱ 15m | He'll listen to anything right now`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_sealed', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['kerkoporta'] }],
        },
        {
          id: 'armored-constantine',
          label: `Tell him to request an imperial audience for you tonight — get Constantine to reinforce the north`,
          description: `⏱ 30m | Giustiniani's recommendation opens doors yours doesn't`,
          outcomes: [{ weight: 1, nextNodeId: 'constantine', resourceChanges: { time: -8, credibility: +20 } }],
        },
      ],
    },

    // ── CONSTANTINE ────────────────────────────────────────────────────────────

    constantine: {
      id: 'constantine',
      type: 'standard',
      act: 1,
      title: 'The Emperor',
      location: 'Hagia Sophia, Constantinople',
      activeNPC: 'Emperor Constantine XI Palaiologos',
      npcStats: { receptiveness: 50, authority: 100 },
      narrative: `The last liturgy of the Byzantine Empire.\n\nConstantine is in the nave of Hagia Sophia, kneeling with the full court while the candles burn and the choir sings something that sounds like a farewell. He knows what tonight is. Everyone in this room knows.\n\nYou are a Genoese mercenary sergeant, and you are not supposed to be here. But you're here.\n\nHe sees you and nods. Soldiers interrupt prayers only when necessary. You are clearly necessary.`,
      options: [
        {
          id: 'constantine-kerkoporta',
          label: `Warn him about the Kerkoporta gate — ask for an imperial seal order and a permanent guard`,
          description: `⏱ 20m | He can make it an unambiguous command from the throne`,
          outcomes: [
            { weight: 6, nextNodeId: 'kerkoporta_sealed', resourceChanges: { time: -8, credibility: +25 }, revealKnowledge: ['kerkoporta'], narrativeResult: `He calls for his chamberlain. "Seal the Kerkoporta. Post four men. No one opens it for any reason until I personally order it."` },
            { weight: 4, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -8, credibility: +5 }, narrativeResult: `"The Kerkoporta is used for sorties. We may need it tonight." He looks at you carefully. "You have other intelligence?"` },
          ],
        },
        {
          id: 'constantine-giustiniani',
          label: `Ask him to order Giustiniani to hold his post regardless of wounds`,
          description: `⏱ 20m | An imperial command carries a weight an oath to a sergeant doesn't`,
          outcomes: [
            { weight: 1, nextNodeId: 'giustiniani', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['giustiniani-wound'], narrativeResult: `Constantine sends a written order with you. "Giustiniani holds. On the honor of the empire."` },
          ],
        },
        {
          id: 'constantine-north',
          label: `Tell him the northern wall is the weak point — request reinforcements for the Blachernae section`,
          description: `⏱ 30m | More men on the north wall closes the gap the Kerkoporta opens`,
          outcomes: [
            { weight: 5, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -10, credibility: +18 }, revealKnowledge: ['kerkoporta', 'dawn-assault'] },
            { weight: 5, nextNodeId: 'snap_dawn', resourceChanges: { time: -10, credibility: +10 }, narrativeResult: `He nods. "Send men to the Blachernae." He returns to prayer.` },
          ],
        },
      ],
    },

    // ── KERKOPORTA ────────────────────────────────────────────────────────────

    kerkoporta_check: {
      id: 'kerkoporta_check',
      type: 'standard',
      act: 2,
      title: 'The Postern Gate',
      location: 'Kerkoporta Gate, Blachernae Wall',
      activeNPC: null,
      narrative: `The Kerkoporta is a small door cut into the base of the Blachernae wall. Used for night sorties — a sergeant slips out, the door stays open until he returns.\n\nYou arrive at 11:30 PM. The last sortie was two hours ago. The men came back. Nobody locked it.\n\nIt stands six inches ajar. The Ottoman plain is thirty meters on the other side.`,
      options: [
        {
          id: 'gate-seal-self',
          label: `Lock it yourself — bolt it, bar it, and stay here until dawn`,
          description: `⏱ Stay on post | Guarantee it stays closed no matter what`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_sealed', resourceChanges: { time: -20, credibility: +15 }, revealKnowledge: ['kerkoporta'] }],
        },
        {
          id: 'gate-seal-guard',
          label: `Lock it and post a Byzantine guard with orders that match — no exceptions`,
          description: `⏱ 30m | Frees you to handle Giustiniani while the gate stays shut`,
          outcomes: [
            { weight: 7, nextNodeId: 'snap_dawn', resourceChanges: { time: -10, credibility: +12 }, revealKnowledge: ['kerkoporta'], narrativeResult: `The guard is posted. He has his orders. You've done what you can here.` },
            { weight: 3, nextNodeId: 'giustiniani', resourceChanges: { time: -10, credibility: +8 }, narrativeResult: `The guard nods. You'll have to trust him.` },
          ],
        },
        {
          id: 'gate-seal-weld',
          label: `Find an armorer — weld it shut permanently, impossible to open from either side`,
          description: `⏱ 1h | Irreversible but certain`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_sealed', resourceChanges: { time: -15, credibility: +20 }, revealKnowledge: ['kerkoporta'] }],
        },
      ],
    },

    kerkoporta_sealed: {
      id: 'kerkoporta_sealed',
      type: 'standard',
      act: 2,
      title: 'Sealed',
      location: 'Blachernae Wall',
      narrative: `The gate is shut. Barred. Whatever happens at dawn, the Ottomans won't find an open door in the dark.\n\nYou have a few hours left. The bonfires are still burning. The assault comes at first light.`,
      options: [
        {
          id: 'sealed-giustiniani',
          label: `Go to Giustiniani — ensure he holds his post when the Janissaries come`,
          description: `⏱ 45m | The gate is sealed; now you need the commander to stay`,
          outcomes: [{ weight: 1, nextNodeId: 'giustiniani', resourceChanges: { time: -10 } }],
        },
        {
          id: 'sealed-position',
          label: `Take a position on the wall yourself — be there when the assault begins`,
          description: `⏱ Stay on post | Your presence at the critical moment`,
          outcomes: [{ weight: 1, nextNodeId: 'snap_dawn', resourceChanges: { time: -5, credibility: +5 } }],
        },
      ],
    },

    // ── SEA WALL ──────────────────────────────────────────────────────────────

    sea_wall: {
      id: 'sea_wall',
      type: 'standard',
      act: 1,
      title: 'The Venetians',
      location: 'Golden Horn Sea Wall',
      activeNPC: 'Captain Alvise Diedo',
      npcStats: { receptiveness: 55, authority: 60 },
      narrative: `Captain Diedo commands the Venetian galleys in the Golden Horn. He's sitting on his stern rail, watching the Ottoman bonfires with the expression of a man calculating when to leave.\n\n"Sergeant." He sounds unsurprised. "The fires."\n\n"They assault at dawn," you tell him. "If the galleys pull out before the chain holds, the harbor is exposed. If you hold position through the assault, Constantine has a way out if the land walls fall."`,
      options: [
        {
          id: 'sea-stay',
          label: `Ask him to commit his galleys to staying through the assault — an hour past dawn at minimum`,
          description: `⏱ 30m | He wants to leave; you need him to stay a little longer`,
          outcomes: [
            { weight: 5, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -10, credibility: +15 }, revealKnowledge: ['sea-chain'], narrativeResult: `"One hour past dawn," he says. "Not more. I have men to think about."` },
            { weight: 5, nextNodeId: 'constantine', resourceChanges: { time: -10, credibility: +5 }, narrativeResult: `"I hold by imperial order, not by a sergeant's request. Get me an order."` },
          ],
        },
        {
          id: 'sea-chain',
          label: `Ensure the chain crew is fully manned — if the chain breaks, the harbor falls`,
          description: `⏱ 20m | Technical task, no persuasion required`,
          outcomes: [{ weight: 1, nextNodeId: 'kerkoporta_check', resourceChanges: { time: -8, credibility: +10 }, revealKnowledge: ['sea-chain'] }],
        },
      ],
    },

    // ── SNAP: DAWN ASSAULT ────────────────────────────────────────────────────

    snap_dawn: {
      id: 'snap_dawn',
      type: 'snap',
      act: 3,
      timer: 15,
      title: 'The Drums',
      location: 'St. Romanus Gate, Land Wall',
      narrative: `The bonfires go dark all at once. Then the drums begin.\n\nOttoman infantry hit the wall in three waves. The first two are repelled. Then the Janissaries come — elite troops, fresh, organized.\n\nGiustiniani is at the wall. You can hear him through the noise.\n\nThen you hear him stop.\n\nYou have fifteen seconds.`,
      options: [
        {
          id: 'dawn-giustiniani',
          label: `Rush to Giustiniani's side — hold him at the wall`,
          description: `Be there before he decides to leave`,
          outcomes: [
            { weight: 7, nextNodeId: 'giustiniani_wounded', resourceChanges: { time: -5, credibility: +10 }, revealKnowledge: ['giustiniani-wound'] },
            { weight: 3, nextNodeId: 'outcome_partial', resourceChanges: { time: -5 }, narrativeResult: `You can't reach him through the press of retreating men.` },
          ],
        },
        {
          id: 'dawn-kerkoporta-check',
          label: `Sprint to the Kerkoporta — confirm it's still sealed`,
          description: `If it's been opened by someone in the chaos, close it now`,
          outcomes: [
            { weight: 8, nextNodeId: 'giustiniani_wounded', resourceChanges: { time: -5, credibility: +5 }, revealKnowledge: ['kerkoporta'], narrativeResult: `It's sealed. You race back to the St. Romanus Gate.` },
            { weight: 2, nextNodeId: 'outcome_partial', resourceChanges: { time: -5 }, narrativeResult: `It's been opened. Men are pouring through.` },
          ],
        },
        {
          id: 'dawn-hold-line',
          label: `Rally the men at the outer wall — fill Giustiniani's gap yourself`,
          description: `You cannot stop him leaving, but you can stop the line collapsing`,
          outcomes: [
            { weight: 1, nextNodeId: 'outcome_partial', resourceChanges: { time: -5, credibility: +15 } },
          ],
        },
      ],
    },

    // ── GIUSTINIANI WOUNDED ───────────────────────────────────────────────────

    giustiniani_wounded: {
      id: 'giustiniani_wounded',
      type: 'standard',
      act: 3,
      title: 'The Wound',
      location: 'St. Romanus Gate',
      activeNPC: 'Giustiniani Longo',
      npcStats: { receptiveness: 25, authority: 85 },
      narrative: `He's down. A bolt through the left armpit — the gap, the one you warned him about. He's bleeding but conscious, and the first thing he says is "the ships."\n\nThe men around him can see it. Two thousand defenders watching their commander try to leave.\n\n"If you leave this wall," you say, "it falls in ten minutes. Not because they break through. Because these men will follow you to the ships."`,
      options: [
        {
          id: 'wound-hold',
          label: `"The oath. You swore. The wall or death." Make him stand.`,
          description: `⏱ 5m | If he swore, invoke it. Now.`,
          outcomes: [
            { weight: 6, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +20 }, revealKnowledge: ['giustiniani-wound'], narrativeResult: `He looks at his hands. Blood. The men watching. He stands. "The wall," he says. The line holds.` },
            { weight: 4, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: +5 }, narrativeResult: `He tries to stand. He falls again. The wound is too bad. He is carried down.` },
          ],
        },
        {
          id: 'wound-command',
          label: `Let him go, but have him publicly appoint Minotto before leaving`,
          description: `⏱ 5m | A visible transfer of command at least preserves the line's structure`,
          outcomes: [{ weight: 1, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: +10 }, revealKnowledge: ['giustiniani-wound'] }],
        },
        {
          id: 'wound-take-command',
          label: `Take command yourself — fill his position at the wall`,
          description: `⏱ Hold | You're not a commander, but you're here and you know this fight`,
          outcomes: [
            { weight: 5, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +15 } },
            { weight: 5, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: +5 }, narrativeResult: `The men look at a Genoese sergeant, not a general. Some hold. Many don't.` },
          ],
        },
      ],
    },

    // ── OUTCOMES ──────────────────────────────────────────────────────────────

    outcome_success: {
      id: 'outcome_success',
      type: 'outcome',
      title: 'The Walls Hold',
      narrative: `The Janissaries assault three times. Each time the wall gives slightly, and each time it does not break.\n\nGiustiniani holds — bleeding, pale, refusing to leave his position. The Kerkoporta stays sealed. The Ottomans find no open door in the dark.\n\nAt mid-morning, Mehmed sounds the retreat. His generals had promised the city in three waves. The third wave has failed.\n\nConstantinople does not fall in 1453. The Byzantine Empire does not end today.\n\nWhat follows — a weakened empire, a continuing Ottoman pressure, eventual negotiations — is uncertain and painful. But the city stands. The empire breathes. The libraries of Greek scholarship that would have burned survive another generation.\n\nSometimes holding one wall is the entirety of history.`,
      lives: 4000,
      isSuccess: true,
    },

    outcome_partial: {
      id: 'outcome_partial',
      type: 'outcome',
      title: 'The Gate Holds, The Wall Does Not',
      narrative: `The Kerkoporta stays sealed. The Ottomans find no unlocked door.\n\nBut the St. Romanus Gate section collapses when Giustiniani leaves. The Ottomans pour through a breach in the outer wall. The inner wall holds for another four hours.\n\nConstantine is killed in the final melee, as he always was going to be. But the collapse is slower, more organized. Some citizens evacuate to the harbor. The Venetian galleys stay long enough to carry several hundred people to safety.\n\nThe empire ends. But the libraries partially survive — manuscripts loaded onto ships in those extra hours. The sack is shorter and less complete.\n\nYou saved some things. Not the empire.`,
      lives: 2000,
      isSuccess: false,
    },

    outcome_failure: {
      id: 'outcome_failure',
      type: 'outcome',
      title: 'May 29, 1453',
      narrative: `In the darkness before dawn, Ottoman soldiers moving along the base of the Blachernae wall find the Kerkoporta standing six inches ajar.\n\nThey are inside the walls before the alarm sounds.\n\nGiustiniani is struck in the armpit and carried to the ships. The men see him go. The outer wall's defenders look at each other, then at the Ottoman flags appearing inside their own city, and the line dissolves.\n\nConstantine rides into the breach alone and is never seen again.\n\nThe sack lasts three days. The final liturgy in Hagia Sophia is the last one for nearly five hundred years.\n\nAll of it from one unlocked door.`,
      lives: 0,
      isSuccess: false,
    },

  },
};
