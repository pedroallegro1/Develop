// SCENARIO: Waterloo — The Hundred Days
// Difficulty: Hard | Start: June 18, 1815, 5:30 AM | ~14 hours before the rout

export const waterlooHundredDays = {
  id: 'waterloo-hundred-days',
  title: 'The Hundred Days',
  subtitle: 'Waterloo, Belgium — June 18, 1815',
  difficulty: 'Hard',
  tagline: `The Emperor has never lost a battle he believed he could win. He believes he can win this one.`,
  historicalContext:
    `On June 18, 1815, Napoleon Bonaparte faced Wellington's Anglo-Dutch army near Waterloo. The battle began two hours late — Napoleon waited for the ground to dry — allowing Prussian forces under Blücher to arrive by afternoon. Marshal Ney launched unsupported cavalry charges that were repelled with catastrophic losses. When the Imperial Guard was finally committed and repulsed, the French army broke in a rout. Napoleon abdicated four days later and was exiled to Saint Helena, never to return.`,
  startNodeId: 'intro',
  startingResources: {
    time: 85,         // ~14 hours; battle ends at dusk
    credibility: 50,  // Experienced colonel, aide-de-camp to Soult
    freedom: 65,      // Military hierarchy constrains; Napoleon's court punishes doubt
  },
  timeLabel: '~14 hours until the rout',

  knowledgeInventory: [
    { id: 'late-start',      label: 'Every hour of delay lets the Prussians get closer', credibilityValue: 'very high', revealed: false },
    { id: 'neys-charge',     label: "Ney will order unsupported cavalry — the squares will hold", credibilityValue: 'high', revealed: false },
    { id: 'la-haye-sainte',  label: 'La Haye Sainte falls at ~6 PM from lack of ammunition', credibilityValue: 'high', revealed: false },
    { id: 'grouchy',         label: "Grouchy won't march to the guns — 33,000 men won't arrive", credibilityValue: 'medium', revealed: false },
    { id: 'guard-breaks',    label: "When the Imperial Guard retreats, the whole army will rout", credibilityValue: 'medium', revealed: false },
  ],

  nodes: {

    // ── ACT 1: PRE-BATTLE (DAWN TO 11 AM) ────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'June 18, 1815 — 5:30 AM',
      location: `Napoleon's Headquarters, Le Caillou farmhouse`,
      activeNPC: null,
      narrative: `The rain stopped two hours ago. The ground is mud.\n\nYou are Colonel Henri Devaux, aide-de-camp to Marshal Soult, Napoleon's Chief of Staff. You have been standing outside Le Caillou farmhouse since 4 AM listening to the Emperor's staff debate the timing of the attack.\n\nYou know how this day ends. You know the exact sequence: the late start that lets Blücher arrive, Ney's cavalry charging unsupported into Wellington's squares, La Haye Sainte falling at six o'clock for lack of ammunition, the Imperial Guard's final advance repulsed, the rout that breaks the army and ends the Empire.\n\nInside the farmhouse, Napoleon is telling his marshals they will have Wellington for breakfast. The attack is scheduled for nine o'clock. At this rate it will be noon.\n\nYou have perhaps fourteen hours. Where do you begin?`,
      options: [
        {
          id: 'push-dawn-attack',
          label: 'Argue for attacking now — before the ground dries',
          description: `⏱ 1h | Every hour of delay closes the window before the Prussians arrive`,
          outcomes: [{ weight: 1, nextNodeId: 'soult-early', resourceChanges: { time: -8, credibility: +5 }, revealKnowledge: ['late-start'] }],
        },
        {
          id: 'find-grouchy',
          label: 'Send a rider to Grouchy with explicit orders to march to the guns',
          description: `⏱ 2h | His 33,000 men won't arrive unless ordered specifically — not implied`,
          outcomes: [{ weight: 1, nextNodeId: 'grouchy-orders', resourceChanges: { time: -15, credibility: +8 }, revealKnowledge: ['grouchy'] }],
        },
        {
          id: 'inspect-la-haye',
          label: 'Inspect La Haye Sainte — count the ammunition before the battle starts',
          description: `⏱ 1h 30m | The farmhouse is the hinge of Wellington's line; if it holds, the line holds`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -12, credibility: +10 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'find-ney',
          label: 'Find Ney — understand his battle plan before he executes it',
          description: `⏱ 1h | If you know what he intends, you can shape it before it becomes catastrophe`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -8, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
      ],
    },

    // ── TIMING / SOULT ────────────────────────────────────────────────────────

    'soult-early': {
      id: 'soult-early',
      type: 'standard',
      act: 1,
      title: 'The Chief of Staff',
      location: 'Le Caillou farmhouse',
      activeNPC: 'Marshal Soult, Chief of Staff',
      npcStats: { receptiveness: 55, authority: 80 },
      narrative: `Soult is reviewing dispatch maps when you find him. He's the one man on staff who has actually fought Wellington — in Spain, for six years — and he lost every time.\n\n"The ground," he says, before you speak. "I know. The Emperor says we wait for the mud to dry."\n\n"The Prussians will be at Wavre by seven o'clock," you tell him. "If we attack at nine, Blücher can reach us by afternoon. If we attack now—"\n\n"I know," Soult says again. He doesn't look up from his maps. "Tell the Emperor."`,
      options: [
        {
          id: 'soult-napoleon',
          label: 'Ask Soult to back you when you present this to Napoleon',
          description: `⏱ 30m | His endorsement is what makes the argument land with the Emperor`,
          outcomes: [
            { weight: 6, nextNodeId: 'napoleon-timing', resourceChanges: { time: -5, credibility: +12 }, narrativeResult: `"I'll stand with you," Soult says. "I've been saying the same thing since last night."` },
            { weight: 4, nextNodeId: 'napoleon-timing', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `"You present it," he says. "I've already made this argument once today."` },
          ],
        },
        {
          id: 'soult-alone',
          label: 'Go directly to Napoleon — you know the argument, you make it',
          description: `⏱ 45m | Riskier without the Chief of Staff behind you, but faster`,
          outcomes: [{ weight: 1, nextNodeId: 'napoleon-timing', resourceChanges: { time: -8, credibility: -5 } }],
        },
        {
          id: 'soult-logistics',
          label: 'Ask Soult to also expedite La Haye Sainte\'s ammunition resupply',
          description: `⏱ 30m | Address two problems at once — timing and the ammunition gap`,
          outcomes: [{ weight: 1, nextNodeId: 'napoleon-timing', resourceChanges: { time: -5, credibility: +8 }, revealKnowledge: ['la-haye-sainte'] }],
        },
      ],
    },

    'napoleon-timing': {
      id: 'napoleon-timing',
      type: 'standard',
      act: 1,
      title: 'The Emperor',
      location: 'Le Caillou farmhouse',
      activeNPC: 'Napoleon Bonaparte, Emperor',
      npcStats: { receptiveness: 15, authority: 100 },
      narrative: `Napoleon is in good spirits. He has studied Wellington's position at Mont-Saint-Jean and he is confident. The officers around him are nodding.\n\n"Colonel," he says when you're brought in, "you have a concern about timing."\n\n"Yes, sire. The Prussians at Wavre can reach our position in five hours. If we delay until the ground dries—"\n\n"The ground must dry. My artillery cannot move in this mud. Neither can my cavalry."\n\nHe says it pleasantly, like a teacher correcting a bright student. Everyone in the room is watching how you handle this.`,
      options: [
        {
          id: 'napoleon-prussians',
          label: 'Make the Prussian clock argument specifically — times, distances, march rates',
          description: `⏱ 30m | Concrete military analysis; harder to dismiss than general concern`,
          outcomes: [
            { weight: 4, nextNodeId: 'napoleon-persuaded', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['late-start'], narrativeResult: `Napoleon studies the map. The numbers are correct and he knows it.` },
            { weight: 6, nextNodeId: 'napoleon-unmoved', resourceChanges: { time: -5, credibility: -10 }, narrativeResult: `"Grouchy will keep Blücher occupied," Napoleon says. He has already decided.` },
          ],
        },
        {
          id: 'napoleon-soult-spain',
          label: 'Invoke Soult\'s experience — "Marshal Soult has fought Wellington before, sire"',
          description: `⏱ 20m | Napoleon respects the record; Soult lost every engagement in Spain`,
          outcomes: [
            { weight: 5, nextNodeId: 'napoleon-persuaded', resourceChanges: { time: -3, credibility: +10 }, narrativeResult: `Napoleon's expression shifts. Soult's record against Wellington is the one argument he hasn't dismissed.` },
            { weight: 5, nextNodeId: 'napoleon-unmoved', resourceChanges: { time: -3, credibility: -8 }, narrativeResult: `"Soult lost in Spain because he lacked proper support. We have the Guard today." Case closed.` },
          ],
        },
        {
          id: 'napoleon-grouchy',
          label: 'Focus on Grouchy — ask Napoleon to send revised orders to march to the guns',
          description: `⏱ 20m | Narrower ask; doesn't challenge the Emperor's timing judgment directly`,
          outcomes: [
            { weight: 7, nextNodeId: 'napoleon-persuaded', resourceChanges: { time: -3, credibility: +8 }, revealKnowledge: ['grouchy'], narrativeResult: `Napoleon writes the order himself. Grouchy will have explicit instructions.` },
            { weight: 3, nextNodeId: 'napoleon-unmoved', resourceChanges: { time: -3, credibility: -5 }, narrativeResult: `"Grouchy knows what to do," Napoleon says. "Trust your marshals."` },
          ],
        },
      ],
    },

    'napoleon-persuaded': {
      id: 'napoleon-persuaded',
      type: 'standard',
      act: 2,
      title: 'A Partial Victory',
      location: 'Le Caillou — Command Post',
      narrative: `Napoleon moved the attack up. Not to dawn — that was never going to happen — but to 9 AM instead of 11:30. An hour and a half earlier than history.\n\nIt's not enough on its own. But it's something. The Prussians will arrive later. The window before they do is wider.\n\nThe battle hasn't started yet. You have other problems.`,
      options: [
        {
          id: 'persuaded-la-haye',
          label: 'Go inspect La Haye Sainte — ammunition must be verified before the battle',
          description: `⏱ 1h | The farmhouse holds Wellington's center; it must not run dry`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'persuaded-ney',
          label: 'Find Ney — his cavalry plan must not happen unsupported',
          description: `⏱ 1h 30m | Position yourself to intercept before the charge order is given`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
        {
          id: 'persuaded-grouchy',
          label: 'Send an additional explicit rider to Grouchy — march to the guns when you hear them',
          description: `⏱ 30m | Belt and suspenders; the order exists, but Grouchy follows instructions literally`,
          outcomes: [{ weight: 1, nextNodeId: 'grouchy-orders', resourceChanges: { time: -5, credibility: +5 }, revealKnowledge: ['grouchy'] }],
        },
      ],
    },

    'napoleon-unmoved': {
      id: 'napoleon-unmoved',
      type: 'standard',
      act: 2,
      title: 'The Emperor Has Decided',
      location: 'Command Post',
      narrative: `Napoleon has moved on. He's reviewing artillery dispositions with his generals. You are being politely ignored by the most powerful man on the continent.\n\nThe attack will go at 11:30 AM. The ground will be dry. The Prussians will have time to arrive.\n\nYou can't change the timing. You need to work on what you can still affect.`,
      options: [
        {
          id: 'unmoved-la-haye',
          label: 'Go to La Haye Sainte — fix the ammunition problem',
          description: `⏱ 1h 30m | This you can control; the farmhouse ammunition gap is fixable`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -12, credibility: +8 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'unmoved-ney',
          label: 'Go to Ney — his cavalry charge is the single most catastrophic decision today',
          description: `⏱ 1h | Intercept him before the afternoon battle phase begins`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
        {
          id: 'unmoved-grouchy',
          label: 'Ride to Grouchy yourself — in person, explicit orders to march to the guns',
          description: `⏱ 4h round trip | Costs time but eliminates the ambiguity of a written order`,
          outcomes: [{ weight: 1, nextNodeId: 'grouchy-orders', resourceChanges: { time: -30, credibility: +15 }, revealKnowledge: ['grouchy'] }],
        },
      ],
    },

    // ── GROUCHY ────────────────────────────────────────────────────────────────

    'grouchy-orders': {
      id: 'grouchy-orders',
      type: 'standard',
      act: 1,
      title: 'Marshal Grouchy',
      location: 'Wavre, French Right Wing',
      activeNPC: 'Marshal Grouchy, Right Wing Commander',
      npcStats: { receptiveness: 45, authority: 70 },
      narrative: `Grouchy is eating strawberries when cannon fire is heard from the direction of Waterloo. His officers are already on their feet. General Gérard is urging him to march to the guns.\n\nGrouchy is a methodical man. He has written orders to pursue the Prussians. He is pursuing the Prussians. Marching to the guns is not in his written orders, and Grouchy does not deviate from written orders.\n\n"My orders are to follow Blücher," he says, deliberately. "I follow my orders."`,
      options: [
        {
          id: 'grouchy-explicit',
          label: 'Present the written order directly — march to Waterloo, not Wavre',
          description: `⏱ 30m | If the order exists and is explicit, Grouchy has no basis to resist`,
          outcomes: [
            { weight: 7, nextNodeId: 'grouchy-moves', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['grouchy'], narrativeResult: `Grouchy reads the order. He calls for his horse.` },
            { weight: 3, nextNodeId: 'grouchy-refuses', resourceChanges: { time: -5, credibility: -8 }, narrativeResult: `He questions the order's authenticity. He wasn't expecting additional instructions.` },
          ],
        },
        {
          id: 'grouchy-argue',
          label: 'Argue the tactical case — the guns are the battle, not the pursuit',
          description: `⏱ 45m | Gérard agrees with you; use him as an ally in the argument`,
          outcomes: [
            { weight: 5, nextNodeId: 'grouchy-moves', resourceChanges: { time: -8, credibility: +10 }, narrativeResult: `Gérard and you together convince him. Grouchy calls the march.` },
            { weight: 5, nextNodeId: 'grouchy-refuses', resourceChanges: { time: -8, credibility: -5 }, narrativeResult: `"My orders are clear," Grouchy says. Gérard looks furious. Nothing changes.` },
          ],
        },
        {
          id: 'grouchy-partial',
          label: 'Ask him to detach one corps to Waterloo while he continues the pursuit',
          description: `⏱ 30m | A compromise; 15,000 men arriving is better than 33,000 not arriving`,
          outcomes: [
            { weight: 1, nextNodeId: 'grouchy-partial-result', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `Grouchy agrees to a partial detachment. It's not everything, but it's something.` },
          ],
        },
      ],
    },

    'grouchy-moves': {
      id: 'grouchy-moves',
      type: 'standard',
      act: 2,
      title: 'Grouchy Marches',
      narrative: `Grouchy has given the march order. Thirty-three thousand men are turning toward the sound of the guns at Waterloo.\n\nThey won't arrive until late afternoon. But they will arrive. Wellington won't know this; Blücher won't be able to commit his full force. The margin tightens.\n\nYou need to ride back. The battle has started.`,
      options: [
        {
          id: 'moves-la-haye',
          label: 'Ride to La Haye Sainte — fix the ammunition supply before afternoon',
          description: `⏱ 2h ride + logistics | The farmhouse must hold when the pressure comes`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -15, credibility: +10 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'moves-ney',
          label: 'Find Ney — intercept him before the cavalry charge',
          description: `⏱ 2h | You have a window to change his plan if you reach him in time`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -15, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
      ],
    },

    'grouchy-refuses': {
      id: 'grouchy-refuses',
      type: 'standard',
      act: 2,
      title: 'He Won\'t Move',
      narrative: `Grouchy is not moving. His 33,000 men are staying on the Wavre road while Napoleon fights without them.\n\nIn four to five hours, Blücher's Prussians will begin arriving on Napoleon's right flank. There is nothing more you can do from here.\n\nYou need to ride back.`,
      options: [
        {
          id: 'refuses-la-haye',
          label: 'Ride to La Haye Sainte — one problem you can still fix',
          description: `⏱ 2h ride | The ammunition gap at La Haye Sainte is addressable`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -15, credibility: +5 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'refuses-ney',
          label: 'Ride to intercept Ney — prevent the cavalry charge',
          description: `⏱ 2h | The cavalry disaster is still hours away if you reach him in time`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -15 }, revealKnowledge: ['neys-charge'] }],
        },
      ],
    },

    'grouchy-partial-result': {
      id: 'grouchy-partial-result',
      type: 'standard',
      act: 2,
      title: 'A Corps Detached',
      narrative: `Fifteen thousand men are marching toward Waterloo. Not thirty-three thousand — fifteen. Grouchy continues his pursuit with the rest.\n\nIt's not enough to change the balance decisively. But it will arrive on Napoleon's right before the Prussians commit fully. It buys time.\n\nYou need to make that time count.`,
      options: [
        {
          id: 'partial4-la-haye',
          label: 'Ride back and fix La Haye Sainte\'s ammunition',
          description: `⏱ 2h | The farmhouse is the hinge of the battle`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -15, credibility: +8 }, revealKnowledge: ['la-haye-sainte'] }],
        },
        {
          id: 'partial4-ney',
          label: 'Intercept Ney before the cavalry charge',
          description: `⏱ 2h | You can still reach him if you ride now`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -15, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
      ],
    },

    // ── LA HAYE SAINTE ────────────────────────────────────────────────────────

    'la-haye-inspect': {
      id: 'la-haye-inspect',
      type: 'standard',
      act: 1,
      title: 'La Haye Sainte',
      location: `La Haye Sainte farmhouse, Wellington's center`,
      activeNPC: 'Major Georg Baring, King\'s German Legion',
      npcStats: { receptiveness: 75, authority: 40 },
      narrative: `La Haye Sainte sits at the crossroads below Mont-Saint-Jean ridge like a clenched fist. Major Baring is a compact man with a Hanoverian accent and the careful manner of someone who has defended positions before.\n\nHe shows you the ammunition supply without being asked.\n\nThe numbers are wrong. The King's German Legion carries Baker rifles — they use different ammunition than the French or British standard. Resupply will require specific caliber coordination. There are enough cartridges for approximately four hours of sustained fire.\n\n"Four hours," you say.\n\n"If we're careful," Baring says.`,
      options: [
        {
          id: 'haye-resupply',
          label: 'Order an emergency resupply run — specific Baker rifle cartridges',
          description: `⏱ 3h logistics | Gets the ammunition there before the afternoon pressure`,
          outcomes: [
            { weight: 7, nextNodeId: 'la-haye-resupplied', resourceChanges: { time: -20, credibility: +12 }, narrativeResult: `The supply wagons reach La Haye Sainte at 4 PM. Baring acknowledges the delivery with visible relief.` },
            { weight: 3, nextNodeId: 'la-haye-partial', resourceChanges: { time: -20, credibility: +5 }, narrativeResult: `The resupply arrives, but late — half the ammunition the garrison needed.` },
          ],
        },
        {
          id: 'haye-fortify',
          label: 'Ask Wellington\'s staff for infantry reinforcement — supplement the garrison',
          description: `⏱ 2h | More men extend how long the farmhouse holds even without full ammunition`,
          outcomes: [
            { weight: 5, nextNodeId: 'la-haye-partial', resourceChanges: { time: -15, credibility: +8 }, narrativeResult: `Two companies join the garrison. Baring accepts them without question.` },
            { weight: 5, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -15, credibility: -8 }, narrativeResult: `Wellington's staff says every man is deployed. There's no one to spare.` },
          ],
        },
        {
          id: 'haye-report-soult',
          label: 'Report the ammunition gap to Soult immediately — this is an army-level problem',
          description: `⏱ 1h | Escalate; Soult has the authority to redirect supply wagons`,
          outcomes: [
            { weight: 1, nextNodeId: 'la-haye-resupplied', resourceChanges: { time: -12, credibility: +15 }, narrativeResult: `Soult takes it seriously. The supply order goes out under his signature.` },
          ],
        },
      ],
    },

    'la-haye-resupplied': {
      id: 'la-haye-resupplied',
      type: 'standard',
      act: 2,
      title: 'The Farmhouse Holds',
      narrative: `La Haye Sainte has ammunition. Baring's garrison will not run dry this afternoon. The center of Wellington's line, which in every historical account bends and nearly breaks at 6 PM, will hold today.\n\nThat changes the calculus for everything in Act 3. The gap Napoleon would have exploited doesn't open. Wellington's line stays intact through the critical hours.\n\nThe battle is still being fought. You have other problems.`,
      options: [
        {
          id: 'resupplied-ney',
          label: 'Go find Ney — the cavalry charge can still be prevented',
          description: `⏱ 1h | The farmhouse is handled; Ney's charge is the other catastrophe`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
        {
          id: 'resupplied-guard',
          label: 'Find Drouot — prepare the Imperial Guard for when Napoleon commits them',
          description: `⏱ 1h | The Guard's advance will come in Act 3; you need to shape how it happens`,
          outcomes: [{ weight: 1, nextNodeId: 'drouot', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['guard-breaks'] }],
        },
      ],
    },

    'la-haye-partial': {
      id: 'la-haye-partial',
      type: 'standard',
      act: 2,
      title: 'Better But Not Fixed',
      narrative: `La Haye Sainte has more ammunition than it had — but not enough. Baring's garrison will hold longer, past 6 PM. The crisis point moves later.\n\nIt's not the clean solution, but it's a wider margin. A wider margin is what you're dealing in today.`,
      options: [
        {
          id: 'partial5-ney',
          label: 'Go find Ney — the cavalry charge must not happen unsupported',
          description: `⏱ 1h | The next catastrophic decision is his`,
          outcomes: [{ weight: 1, nextNodeId: 'ney-morning', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['neys-charge'] }],
        },
        {
          id: 'partial5-soult',
          label: 'Report to Soult — have him monitor La Haye Sainte through the afternoon',
          description: `⏱ 30m | Soult's attention on the farmhouse means the next resupply request gets acted on`,
          outcomes: [{ weight: 1, nextNodeId: 'drouot', resourceChanges: { time: -5, credibility: +8 } }],
        },
      ],
    },

    // ── NEY ────────────────────────────────────────────────────────────────────

    'ney-morning': {
      id: 'ney-morning',
      type: 'standard',
      act: 2,
      title: 'Marshal Ney',
      location: 'French Left Wing, midday',
      activeNPC: 'Marshal Ney, Corps Commander',
      npcStats: { receptiveness: 25, authority: 75 },
      narrative: `Ney is watching Wellington's infantry form squares through a spyglass. He looks like a man who has been awake for three days, which he has. His coat has a burn mark from Quatre-Bras two days ago.\n\nHe has a theory. The British squares are retreating — he can see it through the glass. He believes Wellington is withdrawing.\n\nHe is wrong. Wellington is shuffling his lines. The squares are not retreating. But Ney sees withdrawal, and Ney's solution to a retreating enemy is cavalry.`,
      options: [
        {
          id: 'ney-squares',
          label: 'Correct him — the squares are repositioning, not withdrawing',
          description: `⏱ 30m | Show him the geometry: if Wellington were withdrawing, the artillery would move first`,
          outcomes: [
            { weight: 4, nextNodeId: 'ney-persuaded', resourceChanges: { time: -5, credibility: +12 }, narrativeResult: `Ney studies the artillery positions. His jaw tightens. He lowers the glass.` },
            { weight: 6, nextNodeId: 'ney-unpersuaded', resourceChanges: { time: -5, credibility: -8 }, narrativeResult: `"I've fought the British before," he says. "They run when they're beaten." He isn't listening.` },
          ],
        },
        {
          id: 'ney-infantry',
          label: 'Tell him the cavalry must go in with infantry — or not at all',
          description: `⏱ 20m | Infantry breaks squares; cavalry alone cannot; this is basic tactics`,
          outcomes: [
            { weight: 5, nextNodeId: 'ney-persuaded', resourceChanges: { time: -3, credibility: +10 }, revealKnowledge: ['neys-charge'], narrativeResult: `Something reaches him. "Get me two infantry brigades," he says.` },
            { weight: 5, nextNodeId: 'ney-unpersuaded', resourceChanges: { time: -3, credibility: -10 }, narrativeResult: `"Cavalry breaks morale," Ney says. "The infantry follows the route." He's already decided.` },
          ],
        },
        {
          id: 'ney-soult',
          label: 'Tell Ney that Soult has ordered coordination with infantry before any cavalry advance',
          description: `⏱ 20m | A superior's order, even invented, creates hesitation`,
          outcomes: [
            { weight: 6, nextNodeId: 'ney-persuaded', resourceChanges: { time: -3, credibility: +8 }, narrativeResult: `Ney doesn't want to fight with Soult today. He calls for infantry coordination.` },
            { weight: 4, nextNodeId: 'ney-unpersuaded', resourceChanges: { time: -3, credibility: -12, freedom: -10 }, narrativeResult: `"Show me the order in writing," Ney says. The bluff is called.` },
          ],
        },
      ],
    },

    'ney-persuaded': {
      id: 'ney-persuaded',
      type: 'standard',
      act: 2,
      title: 'Ney Coordinates',
      narrative: `Ney has agreed to wait for infantry support before committing the cavalry.\n\nThe charge will still happen — this is a battle and there will be cavalry charges. But it will not be five thousand horsemen riding alone into infantry squares at 4 PM. It will be a coordinated combined-arms assault.\n\nWellington's squares will still form. But with infantry pressure at the same time, one or two may break.\n\nThe afternoon looks different.`,
      options: [
        {
          id: 'ney-p-la-haye',
          label: 'Check on La Haye Sainte — make sure the ammunition is moving',
          description: `⏱ 1h | If you haven't fixed it yet, now is the time`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -10, credibility: +5 } }],
        },
        {
          id: 'ney-p-guard',
          label: 'Find General Drouot — the Imperial Guard decision is coming',
          description: `⏱ 1h | When Napoleon commits the Guard, how it's committed will determine everything`,
          outcomes: [{ weight: 1, nextNodeId: 'drouot', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['guard-breaks'] }],
        },
      ],
    },

    'ney-unpersuaded': {
      id: 'ney-unpersuaded',
      type: 'standard',
      act: 2,
      title: 'He Doesn\'t Listen',
      narrative: `Ney is ordering the charge. In three hours, roughly five thousand cavalrymen will ride into Wellington's squares alone and accomplish nothing except exhausting themselves.\n\nYou cannot stop it. You can only make sure other things hold when it fails.`,
      options: [
        {
          id: 'unpersuaded-la-haye',
          label: 'Go fix La Haye Sainte — if the farmhouse holds, the charge failure is survivable',
          description: `⏱ 1h 30m | The cavalry disaster is manageable if the center doesn't break`,
          outcomes: [{ weight: 1, nextNodeId: 'la-haye-inspect', resourceChanges: { time: -12, credibility: +5 } }],
        },
        {
          id: 'unpersuaded-guard',
          label: 'Bypass Ney — go to General Drouot and the Imperial Guard',
          description: `⏱ 1h | The Guard is Napoleon's final weapon; shape how it's used`,
          outcomes: [{ weight: 1, nextNodeId: 'drouot', resourceChanges: { time: -10, credibility: +5 }, revealKnowledge: ['guard-breaks'] }],
        },
      ],
    },

    // ── DROUOT / THE GUARD ────────────────────────────────────────────────────

    drouot: {
      id: 'drouot',
      type: 'standard',
      act: 2,
      title: 'The Imperial Guard',
      location: 'Imperial Guard Reserve, rear of French position',
      activeNPC: 'General Antoine Drouot, Imperial Guard',
      npcStats: { receptiveness: 60, authority: 65 },
      narrative: `The Imperial Guard stands in reserve behind the main French line — nine thousand men who have never been beaten, in their tall bearskin hats and blue coats, watching the battle unfold with the patience of men who know they are the last card.\n\nGeneral Drouot is the Guard's commander. He's methodical, protective of his men, deeply loyal to Napoleon. He will follow the Emperor's orders precisely — and that is the problem, because the Emperor's orders, when they come, will send the Guard straight up the slope toward Wellington's ridge in a frontal assault.\n\n"Colonel," he says. "You're not here to see the Guard fight today. You're here about something else."`,
      options: [
        {
          id: 'drouot-angle',
          label: 'Recommend a flanking approach for the Guard rather than frontal assault',
          description: `⏱ 1h | A flank attack against Wellington's weakened right, not the ridge center`,
          outcomes: [
            { weight: 6, nextNodeId: 'drouot-modified', resourceChanges: { time: -10, credibility: +15 }, revealKnowledge: ['guard-breaks'], narrativeResult: `Drouot studies the terrain. "The right flank," he says slowly. "Yes. That could work."` },
            { weight: 4, nextNodeId: 'drouot-unchanged', resourceChanges: { time: -10, credibility: -8 }, narrativeResult: `"The Emperor will give the order," Drouot says. "I follow the Emperor's order."` },
          ],
        },
        {
          id: 'drouot-timing',
          label: 'Ask him to request that Napoleon wait until Grouchy arrives before committing the Guard',
          description: `⏱ 30m | Thirty minutes later, with Grouchy present, the odds change entirely`,
          outcomes: [
            { weight: 5, nextNodeId: 'drouot-modified', resourceChanges: { time: -5, credibility: +10 }, narrativeResult: `Drouot agrees to advocate for delay. He carries weight with Napoleon where others don't.` },
            { weight: 5, nextNodeId: 'drouot-unchanged', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `"The Emperor will commit the Guard when he judges the moment," Drouot says. "Not before."` },
          ],
        },
        {
          id: 'drouot-never-retreats',
          label: 'Tell him plainly: if the Guard is repulsed, the army will break',
          description: `⏱ 20m | The Guard's symbolic power is its greatest vulnerability; Drouot understands this`,
          outcomes: [
            { weight: 7, nextNodeId: 'drouot-modified', resourceChanges: { time: -3, credibility: +12 }, revealKnowledge: ['guard-breaks'], narrativeResult: `A long pause. Drouot knows this. He has always known this. "Then we must not fail," he says.` },
            { weight: 3, nextNodeId: 'drouot-unchanged', resourceChanges: { time: -3, credibility: -5 }, narrativeResult: `"The Guard does not retreat," Drouot says flatly. It is both a statement of fact and an argument's end.` },
          ],
        },
      ],
    },

    'drouot-modified': {
      id: 'drouot-modified',
      type: 'standard',
      act: 3,
      title: 'The Guard Repositions',
      narrative: `Drouot has spoken to Napoleon. The Guard's advance plan has been modified — either in timing, angle, or coordination with remaining cavalry. The exact shape of the change depends on the path you took.\n\nBut something is different. The advance will not be a frontal assault on the strongest point of Wellington's line.\n\nIt's 6:30 PM. The Prussians are on the right flank and the battle is reaching its crisis. The Guard is about to move.`,
      options: [
        {
          id: 'modified-snap',
          label: 'Position yourself at the Guard\'s advance — respond to what you see',
          description: `⏱ The final act | Be at the decisive point when the decision is made`,
          outcomes: [{ weight: 1, nextNodeId: 'final-advance', resourceChanges: { time: -5, credibility: +5 } }],
        },
      ],
    },

    'drouot-unchanged': {
      id: 'drouot-unchanged',
      type: 'standard',
      act: 3,
      title: 'The Guard Advances as Ordered',
      narrative: `Drouot followed Napoleon's orders. The Guard will advance frontally up the slope toward Wellington's ridge, exactly as history records.\n\nYou know what happens next. You need to be at the right place when it does.`,
      options: [
        {
          id: 'unchanged-snap',
          label: 'Position yourself at the advance — be ready to act when the moment comes',
          description: `⏱ The final act | Your chance to change the outcome is at the point of the Guard's advance`,
          outcomes: [{ weight: 1, nextNodeId: 'final-advance', resourceChanges: { time: -5 } }],
        },
      ],
    },

    // ── ACT 3: THE CRISIS ─────────────────────────────────────────────────────

    'final-advance': {
      id: 'final-advance',
      type: 'snap',
      act: 3,
      timer: 12,
      title: '7:30 PM — The Guard Halts',
      narrative: `The Imperial Guard is thirty meters from Wellington's ridge crest. British musket volleys have torn the first two battalions. The Guard is not retreating — but it has stopped advancing.\n\nBehind the French line, soldiers are watching. The Guard never stops. If it stops, it has failed. If it fails—\n\nSomeone shouts: "La Garde recule!" The Guard retreats!\n\nIt's not true yet. But it's about to become true. You have seconds.`,
      options: [
        {
          id: 'advance-rally',
          label: 'Ride into the line — rally the Guard forward with everything you have',
          description: `Lead from the front; if the Guard sees an officer advancing, it advances`,
          outcomes: [
            { weight: 5, nextNodeId: 'outcome-victory', resourceChanges: { credibility: +20 }, narrativeResult: `The Guard surges forward. Wellington's line buckles at the crest.` },
            { weight: 5, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +5 }, narrativeResult: `The Guard holds the ridge for twenty minutes. Then the Prussians close on the flank.` },
          ],
        },
        {
          id: 'advance-flank',
          label: 'Order the reserve cavalry to swing left — hit Wellington\'s open flank now',
          description: `The Guard pins the ridge; cavalry hits the exposed flank simultaneously`,
          outcomes: [
            { weight: 4, nextNodeId: 'outcome-victory', resourceChanges: { credibility: +15 }, narrativeResult: `The flank caves. Wellington's right folds inward.` },
            { weight: 6, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +5 }, narrativeResult: `The cavalry reaches the flank, but the Prussians arrive in the same moment. A draw, not a breakthrough.` },
          ],
        },
        {
          id: 'advance-withdraw',
          label: 'Order a disciplined fighting withdrawal — preserve the army for tomorrow',
          description: `The battle is lost; a rout kills more men than an ordered retreat`,
          outcomes: [
            { weight: 7, nextNodeId: 'outcome-partial', resourceChanges: { credibility: +10 }, narrativeResult: `Some units hear the order. Some obey. The withdrawal is ragged but not a rout.` },
            { weight: 3, nextNodeId: 'outcome-failed', resourceChanges: { credibility: -5 }, narrativeResult: `"La Garde recule!" echoes down the line before your order does. Panic moves faster than orders.` },
          ],
        },
      ],
    },

    // ── OUTCOMES ───────────────────────────────────────────────────────────────

    'outcome-victory': {
      id: 'outcome-victory',
      type: 'outcome',
      title: 'Waterloo — French Victory',
      narrative: `Wellington's line broke at the ridge crest.\n\nNot in a dramatic single moment — in the way that overstressed things fail: a gap, then two gaps, then suddenly everywhere at once. The British infantry fell back from Mont-Saint-Jean. The Guard occupied the ridge. Wellington called it "the nearest run thing you ever saw in your life."\n\nHe said that in defeat. You saw it from the winning side.\n\nNapoleon rode across the ridge at 8:15 PM as the Prussians disengaged. He did not celebrate. He knew what this cost. He knew what still lay ahead — Vienna, London, the negotiations, the political maze that winning a battle does not resolve.\n\nBut the Hundred Days did not end at Waterloo.\n\nYou sat on your horse in the gathering dark, looking east. Somewhere, history had taken a turn it was not supposed to take. You had bent it three degrees off its axis. You didn't know yet what that meant.\n\nYou were about to find out.`,
      livesSaved: 40000,
      maxLives: 40000,
      historical: `At the historical Waterloo, the Imperial Guard advanced frontally at approximately 7:30 PM and was repulsed. The shout "La Garde recule!" — the Guard retreats — triggered a general rout. French casualties on the day were approximately 25,000-40,000 killed, wounded, and captured. Napoleon abdicated on June 22, 1815 and was exiled to Saint Helena. He died there in 1821. Wellington called Waterloo "the nearest run thing you ever saw in your life" even in victory. This outcome represents the history that didn't happen.`,
      epilogue: `Napoleon's survival did not produce the peace his supporters imagined. The Congress of Vienna had already drawn the map. France won one battle, not a war. The negotiations that followed were brutal, prolonged, and ultimately produced a settlement not much better than Saint Helena. But forty thousand men who would have died or been captured at Waterloo were alive to fight, farm, and grow old. History bent. It did not break.`,
    },

    'outcome-partial': {
      id: 'outcome-partial',
      type: 'outcome',
      title: 'The Army Retreats in Order',
      narrative: `The battle was lost. But it did not become a rout.\n\nSomewhere in the chain of decisions you made today — the ammunition at La Haye Sainte, the cavalry that went in coordinated, the garrison that was warned, the riders you sent — enough changed that when the Guard finally halted, the withdrawal order reached the army before panic did.\n\nThe retreat to the French border took six days. It should have taken two — history's version was pursued so savagely that men drowned crossing the Sambre rather than surrender. In this version, the army crossed in order. Roughly twenty thousand men survived who wouldn't have. Not the whole army. Not a victory. But the difference between a rout and a retreat is the difference between an army and a mob.\n\nNapoleon abdicated on June 22nd. The terms that followed were no better than history's. He went to Saint Helena. He died there.\n\nBut those twenty thousand men went home.`,
      livesSaved: 20000,
      maxLives: 40000,
      historical: `The historical French rout after Waterloo was catastrophic — men were killed crossing rivers, cut down by Prussian cavalry for miles. Napoleon abandoned his carriage and fled on horseback. He abdicated four days later. In this outcome the tactical decisions shifted enough to preserve the army's structure during withdrawal, saving a significant portion of the casualties that occurred during the historical pursuit.`,
      epilogue: `There is no alternate ending to Napoleon's exile. He was always going to Saint Helena once the Hundred Days failed — the political architecture of Europe had closed around him. What changed, in this version, was the scale of the loss. The French army that retreated across the Sambre had lost a battle. It had not lost itself. Some things that survive a defeat can be built from later. An intact army is one of them.`,
    },

    'outcome-failed': {
      id: 'outcome-failed',
      type: 'outcome',
      title: 'The Guard Retreats',
      narrative: `"La Garde recule."\n\nFour words. The Guard retreats. It had never happened before.\n\nThe French army didn't break — it dissolved. In twenty minutes, seventy thousand men became a crowd moving south, dropping weapons, abandoning artillery, abandoning each other. The Prussian cavalry rode through them for hours.\n\nYou know the exact numbers. You've always known them. Forty thousand casualties on the day. Thirty thousand more in the pursuit. Napoleon's carriage captured on the road to Genappe, his diamonds and personal papers scattered in the mud.\n\nYou did what you could today. You moved things. The margins were closer than history remembers. None of it was enough.\n\nNapoleon abdicated on June 22nd. He was exiled to Saint Helena. He died there on May 5, 1821, at fifty-one years old, still dictating to his secretaries the version of events he wished posterity to believe.\n\nYou were in Paris when the news reached the city. You did not weep. You had known since Waterloo morning how it would end.`,
      livesSaved: 0,
      maxLives: 40000,
      historical: `The Battle of Waterloo ended with a French rout that military historians still analyze as a case study in cascading failure. Every decision that went wrong — the late start, the unsupported cavalry charges, Grouchy's failure to march to the guns, La Haye Sainte's fall, the Guard's frontal assault — has been examined, debated, and second-guessed for two centuries. Napoleon himself spent his exile at Saint Helena arguing that none of it was his fault. The evidence suggests otherwise.`,
      epilogue: `Military historians have debated Waterloo for two hundred years because the margin was genuinely slim. Wellington later said any one of a dozen decisions going differently might have changed the outcome. You know which decisions. You spent fourteen hours trying to change them. History, it turns out, has enormous momentum. You bent it. You didn't break it. There is no clean verdict on what that means — whether trying and failing is better or worse than not trying. You have the rest of your life to decide.`,
    },
  },
};
