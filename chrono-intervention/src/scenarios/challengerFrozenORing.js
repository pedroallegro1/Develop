// SCENARIO: Challenger — The Frozen O-Ring
// Difficulty: Hard | Start: January 27, 1986, ~9:30 PM CST | ~14 hours to launch

export const challengerFrozenORing = {
  id: 'challenger-frozen-oring',
  title: 'The Frozen O-Ring',
  subtitle: 'January 27, 1986 — Kennedy Space Center, Florida',
  difficulty: 'Hard',
  tagline: 'You know the physics. You know the forecast. Nobody with the power to stop it wants to listen.',
  historicalContext:
    'On January 28, 1986, the Space Shuttle Challenger broke apart 73 seconds after liftoff, killing all seven crew members. The night before, Morton Thiokol engineer Roger Boisjoly argued passionately against launch in near-freezing temperatures, warning that the O-ring seals on the solid rocket boosters would fail. He was overridden by management under pressure from NASA. The Rogers Commission later confirmed his analysis was correct. Boisjoly spent the rest of his life haunted by what he could not stop.',
  startNodeId: 'intro',
  startingResources: {
    time: 88,        // ~14 hours remaining before 11:38 AM launch
    credibility: 40, // Experienced engineer, but management overrode you once already tonight
    freedom: 70,     // Employed, but job security erodes with every escalation
  },
  timeLabel: '~14 hours to launch',
  knowledgeInventory: [
    {
      id: 'oring-data',
      label: 'O-ring elasticity data (fails below 53°F)',
      credibilityValue: 'very high',
      revealed: false,
    },
    {
      id: 'temperature-forecast',
      label: 'Launch forecast: 29°F at T-0',
      credibilityValue: 'high',
      revealed: false,
    },
    {
      id: 'previous-damage',
      label: 'Prior flight O-ring erosion — even in warmer temps',
      credibilityValue: 'high',
      revealed: false,
    },
    {
      id: 'pressure-test',
      label: 'Cold O-rings cannot seal ignition pressure spike',
      credibilityValue: 'very high',
      revealed: false,
    },
    {
      id: 'chain-of-command',
      label: 'Kilminster signed approval under "management hat" pressure',
      credibilityValue: 'medium',
      revealed: false,
    },
  ],

  nodes: {

    // ── ACT 1: AFTERMATH OF THE TELECONFERENCE ──────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'January 27, 1986 — 9:34 PM',
      narrative: `The teleconference line has gone dead. The room at Morton Thiokol's Utah facility smells of stale coffee and defeat.\n\nFor hours, you and your colleague Arnie Thompson spread your data across the table — charts showing O-ring erosion, temperature correlation graphs, every scrap of engineering evidence you had assembled over months. You argued until your voice was raw.\n\nThen Joe Kilminster, your VP, asked the NASA managers and Thiokol executives to go off-line for five minutes. When they came back, he said the words that will echo in your mind for the rest of your life:\n\n"We've reconsidered. We recommend proceeding with launch."\n\nNASA's Lawrence Mulloy had told you to "take off your engineering hat and put on your management hat." And management did exactly that.\n\nYou watched Kilminster sign the launch approval form. Your hand was shaking.\n\nNow it's 9:34 PM. The launch is at 11:38 AM tomorrow. Fourteen hours. Seven people are asleep somewhere near the Cape — or trying to. Christa McAuliffe, the schoolteacher who was going to teach a lesson from orbit, probably read a letter from her students tonight.\n\nYou know what is going to happen at 73 seconds. Nobody who can stop it believes you anymore.\n\nWhat do you do?`,
      options: [
        {
          id: 'write-memo',
          label: 'Write a formal memo documenting your objections — right now, tonight',
          description: 'Time cost: ~1 hour | Low risk, creates paper trail, may reach decision-makers',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'write-memo-node',
              resourceChanges: { time: -7, credibility: 5 },
              revealKnowledge: ['oring-data', 'pressure-test'],
              narrativeResult: 'You pull out a legal pad. Your hand is still shaking.',
            },
          ],
        },
        {
          id: 'call-thiokol-ceo',
          label: 'Call Ed Garrison — the Thiokol CEO — directly, bypass Kilminster',
          description: 'Time cost: ~30 min | Bypasses chain of command, but Garrison has real authority',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'thiokol-ceo',
              resourceChanges: { time: -5, freedom: -10 },
              narrativeResult: 'You dial corporate. The phone rings in an empty office — he is not there.',
            },
          ],
        },
        {
          id: 'contact-nasa-directly',
          label: 'Try to reach Gene Kranz or another NASA flight director directly',
          description: 'Time cost: ~45 min | Extreme breach of protocol — high risk, high impact',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'nasa-direct-contact',
              resourceChanges: { time: -7, freedom: -15 },
            },
          ],
        },
        {
          id: 'find-ally-ebeling',
          label: 'Talk to Bob Ebeling — he agrees with you. Can you coordinate?',
          description: 'Time cost: ~20 min | Bob is terrified tonight. He told his daughter the shuttle will blow up.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'ebeling-ally',
              resourceChanges: { time: -3 },
              narrativeResult: 'Bob picks up on the first ring. You can hear it in his voice.',
            },
          ],
        },
      ],
    },

    // ── ACT 2: DECISION NODES ───────────────────────────────────────────────────

    'write-memo-node': {
      id: 'write-memo-node',
      type: 'standard',
      act: 2,
      title: 'Thiokol Engineering Office — 10:45 PM',
      narrative: `You write by hand first, then type it up on the office terminal. The words come easily — you have been composing this argument in your head for months.\n\nYou state the facts plainly: the O-ring material loses its elasticity below 53 degrees Fahrenheit. It has never been tested below that temperature. Tomorrow's forecast calls for 29 degrees at launch time — 24 degrees below the lowest temperature at which the seals have ever been flown. In the event of a pressure spike during ignition, the primary O-ring will not seat in time. The secondary O-ring, which is the last line of defense, will be just as cold and just as stiff.\n\nYou note the date and time. You list the data. You sign your name.\n\nNow — who gets this memo, and how fast can you get it to them?`,
      options: [
        {
          id: 'memo-kilminster',
          label: 'Formally submit the memo to Kilminster and the Thiokol chain of command',
          description: 'Time cost: ~15 min | Official channel — likely ignored, but creates a legal record',
          outcomes: [
            {
              weight: 3,
              nextNodeId: 'kilminster-final',
              resourceChanges: { time: -2, credibility: 8 },
              revealKnowledge: ['chain-of-command'],
              narrativeResult: 'You slide it under Kilminster\'s door. The hallway is empty.',
            },
            {
              weight: 1,
              nextNodeId: 'kilminster-final',
              resourceChanges: { time: -2, credibility: 3 },
              narrativeResult: 'Kilminster is still in the building. He takes the memo without reading it.',
            },
          ],
        },
        {
          id: 'memo-nasa-safety',
          label: 'Fax the memo directly to NASA\'s safety office at Marshall Space Flight Center',
          description: 'Time cost: ~30 min | Bypasses Thiokol management, but may still be buried',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'nasa-safety-office',
              resourceChanges: { time: -5, freedom: -10, credibility: 10 },
              revealKnowledge: ['oring-data', 'previous-damage'],
              narrativeResult: 'The fax machine whirs. Three pages go through. You stare at the confirmation sheet.',
            },
            {
              weight: 1,
              nextNodeId: 'nasa-safety-office',
              resourceChanges: { time: -5, freedom: -15, credibility: 5 },
              narrativeResult: 'The fax goes through. Whether anyone is watching the machine tonight is another question.',
            },
          ],
        },
        {
          id: 'memo-both-escalate',
          label: 'Submit to Thiokol AND fax to NASA safety, then escalate further',
          description: 'Time cost: ~45 min | Comprehensive paper trail, signals you will not be silent',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -8, credibility: 15, freedom: -10 },
              revealKnowledge: ['oring-data', 'pressure-test', 'previous-damage'],
              narrativeResult: 'You make five copies. You use both fax machines in the building.',
            },
          ],
        },
      ],
    },

    'thiokol-ceo': {
      id: 'thiokol-ceo',
      type: 'standard',
      act: 2,
      title: 'Conference Room Phone — 10:15 PM',
      narrative: `You dial the executive line for Ed Garrison, Thiokol's CEO. It rings and rings.\n\nA night receptionist answers. Garrison left for the evening. No, she cannot give you his home number. This is not an emergency line.\n\nYou explain that it is an emergency. She is polite, firm, and useless.\n\nYou try the vice president of engineering. Jerry Mason. His wife answers. He is asleep. She can give him a message in the morning.\n\nMorning. The word lands like a stone.\n\nYou have Arnie Thompson's notes, your own data, and Joe Kilminster's signed launch approval form in a folder on this desk. The chain of command has been exhausted in the direction of stopping this launch. You need a different direction.`,
      options: [
        {
          id: 'ceo-leave-message',
          label: 'Leave an urgent voicemail and detailed written message for Garrison — flag it CRITICAL',
          description: 'Time cost: ~20 min | Low probability, but he might check messages before launch',
          outcomes: [
            {
              weight: 3,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, credibility: 3 },
              narrativeResult: 'You dictate the message slowly and carefully. The receptionist reads it back.',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, credibility: 8 },
              narrativeResult: 'The receptionist sounds alarmed by your tone. She says she will reach out by pager.',
            },
          ],
        },
        {
          id: 'ceo-drive-home',
          label: 'Get Garrison\'s home address from HR files and drive there',
          description: 'Time cost: ~2 hours | Aggressive — could work, could end your career tonight',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -18, freedom: -20, credibility: 5 },
              narrativeResult: 'The HR directory is unlocked. You write down the address. Your hands are still shaking.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-fired',
              resourceChanges: { time: -18, freedom: -40 },
              narrativeResult: 'Security stops you at the parking lot. Someone called ahead.',
            },
          ],
        },
        {
          id: 'ceo-pivot',
          label: 'The CEO route is blocked. Try a completely different channel.',
          description: 'Time cost: ~10 min | Cut losses, redirect energy',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -2 },
            },
          ],
        },
      ],
    },

    'ebeling-ally': {
      id: 'ebeling-ally',
      type: 'standard',
      act: 2,
      title: 'Phone Call — Bob Ebeling\'s Home — 9:55 PM',
      narrative: `Bob Ebeling answers on the first ring. He wasn't sleeping.\n\n"I told my daughter tonight," he says, without you even asking. His voice is flat, wrung out. "I told her the Challenger's going to blow up tomorrow. I told her everyone's going to die."\n\nThere is a long silence on the line.\n\nYou and Bob have been saying the same things to the same people for months. He wrote his own memos. He drew the same charts. Management told him — told both of you — that you were being overly conservative.\n\nBob is not going to sleep tonight. Neither is his daughter.\n\n"What do we do, Roger?" he asks. "What's left?"`,
      options: [
        {
          id: 'coordinate-ebeling-press',
          label: '"We go to the press, Bob. A journalist. Someone who will print it before morning."',
          description: 'Time cost: ~1.5 hours | Highest visibility, highest risk to both of you',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'press-contact',
              resourceChanges: { time: -12, freedom: -15, credibility: 5 },
              narrativeResult: 'Bob is quiet for a long moment. "Okay," he finally says. "Okay."',
            },
            {
              weight: 1,
              nextNodeId: 'press-contact',
              resourceChanges: { time: -12, freedom: -20, credibility: 10 },
              narrativeResult: '"I\'ve got a number," Bob says. "A science reporter at the Times. I\'ll call him."',
            },
          ],
        },
        {
          id: 'coordinate-ebeling-senators',
          label: '"We find a Senator on the space committee. Someone with subpoena power."',
          description: 'Time cost: ~2 hours | Political channel — slow but potentially decisive',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'senator-contact',
              resourceChanges: { time: -15, credibility: 5 },
              narrativeResult: '"At this hour?" Bob says. "We can try. Jake Garn flew on the shuttle himself last year."',
            },
          ],
        },
        {
          id: 'coordinate-ebeling-memo',
          label: '"We write a joint memo, both signatures, and we fax it to every NASA address we have."',
          description: 'Time cost: ~1 hour | Creates a stronger record than either of you alone',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'joint-memo',
              resourceChanges: { time: -8, credibility: 12, freedom: -5 },
              revealKnowledge: ['previous-damage', 'oring-data'],
              narrativeResult: '"Two names are better than one," Bob agrees. "Come back in. I\'ll start the draft."',
            },
          ],
        },
        {
          id: 'coordinate-ebeling-astronauts',
          label: '"The crew deserves to know what we know. Can we reach them?"',
          description: 'Time cost: ~1.5 hours | The most morally direct option — and the most desperate',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'crew-contact',
              resourceChanges: { time: -12, freedom: -20 },
              narrativeResult: 'Bob goes very quiet. "They\'re at the Cape," he says. "I don\'t have their numbers."',
            },
          ],
        },
      ],
    },

    'nasa-direct-contact': {
      id: 'nasa-direct-contact',
      type: 'standard',
      act: 2,
      title: 'Phone — Attempting Kennedy Space Center — 10:20 PM',
      narrative: `You call KSC's main line and ask for the flight director's office. The operator puts you on hold.\n\nGene Kranz is the most famous flight director in NASA history — "Failure is not an option" — but he is not on this flight. You ask for the flight director assigned to mission 51-L. The operator connects you to a duty officer.\n\nThe duty officer is professionally cordial and completely unmoved. He explains that launch decisions go through the Mission Management Team. He has no authority to scrub a launch. You would need to go through your own management chain to NASA's Solid Rocket Booster manager.\n\nLawrence Mulloy. The man who told your managers to put on their management hats.\n\n"I was on that teleconference," you tell him. "Mulloy was the pressure. I need to go around him."\n\nThe officer is quiet for a moment. "Sir," he says carefully, "I understand you're concerned. But I can't help you the way you're asking."`,
      options: [
        {
          id: 'nasa-ask-kranz',
          label: 'Insist on being connected to Gene Kranz personally — cite crew safety',
          description: 'Time cost: ~30 min | Kranz has moral authority even if he\'s not on-console tonight',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'kranz-attempt',
              resourceChanges: { time: -5, credibility: 5, freedom: -10 },
              narrativeResult: '"I can try to reach him," the duty officer says. "No promises."',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, credibility: -5, freedom: -5 },
              narrativeResult: '"Mr. Boisjoly, I\'m going to have to end this call."',
            },
          ],
        },
        {
          id: 'nasa-astronaut-office',
          label: 'Ask to be connected to the astronaut office — Scobee\'s crew deserves to know',
          description: 'Time cost: ~45 min | Dick Scobee is the commander. He might listen.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'crew-contact',
              resourceChanges: { time: -7, freedom: -15 },
              narrativeResult: 'The duty officer hesitates. "The crew is in crew quarters. I can pass a message."',
            },
          ],
        },
        {
          id: 'nasa-safety-fax',
          label: 'Hang up and fax your data directly to NASA\'s safety and mission assurance office',
          description: 'Time cost: ~30 min | Quieter but potentially just as effective',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'nasa-safety-office',
              resourceChanges: { time: -5, credibility: 8 },
              revealKnowledge: ['oring-data', 'pressure-test'],
            },
          ],
        },
      ],
    },

    'kranz-attempt': {
      id: 'kranz-attempt',
      type: 'standard',
      act: 2,
      title: 'Phone — 11:05 PM',
      narrative: `Forty minutes later, the duty officer calls you back. Gene Kranz is not available tonight. He is not assigned to this mission. The flight director for mission 51-L is Arnie Aldrich — and Aldrich has already reviewed and accepted the launch recommendation signed by your VP, Joe Kilminster.\n\nThe duty officer sounds genuinely sorry. "The decision has been made through proper channels," he says. "Thiokol gave us a green light."\n\nKilminster's signature. Your career's worth of data, overruled in a five-minute caucus.\n\nYou look at the clock on the wall. It is 11:05 PM. Twelve and a half hours to launch.`,
      options: [
        {
          id: 'kranz-pivot-press',
          label: 'The official channels are closed. Pivot to the press — call a journalist tonight.',
          description: 'Time cost: ~1.5 hours | Last resort that could still work if a story breaks before dawn',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'press-contact',
              resourceChanges: { time: -12, freedom: -15 },
            },
          ],
        },
        {
          id: 'kranz-pivot-senator',
          label: 'Try to reach Senator Jake Garn — he flew on Discovery and understands the risk.',
          description: 'Time cost: ~2 hours | Long shot, but political pressure could delay the launch',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'senator-contact',
              resourceChanges: { time: -15, credibility: 5 },
            },
          ],
        },
        {
          id: 'kranz-document-accept',
          label: 'Accept that you cannot stop it tonight. Document everything for the aftermath.',
          description: 'Time cost: ~2 hours | The most painful option — but your record may save lives later',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -15, credibility: 15 },
              revealKnowledge: ['chain-of-command', 'pressure-test'],
            },
          ],
        },
      ],
    },

    'kilminster-final': {
      id: 'kilminster-final',
      type: 'standard',
      act: 2,
      title: 'Thiokol Hallway — Late',
      narrative: `Kilminster is still in the building when you find him. He is alone in his office, jacket off, staring at a blank notepad. He does not look like a man at peace with what he did tonight.\n\nYou lay your memo on his desk. He reads the first paragraph and sets it down.\n\n"Roger," he says quietly. "This is the same argument. We've been through it."\n\n"Then let me make it again. In writing. So it's on record."\n\nHe looks at you for a long moment. Joe Kilminster is not a villain. He is a man who got into an impossible position and made a choice you believe will kill seven people. There is no satisfaction in watching him sit with that.\n\n"The decision's been made," he says. "I signed the form."\n\n"Then you should know I intend to keep making this argument until someone listens."`,
      options: [
        {
          id: 'kilminster-appeal-direct',
          label: 'Appeal directly to him as an engineer: "You know I\'m right, Joe."',
          description: 'Time cost: ~30 min | Man-to-man — possible, but he may have already resolved his conscience',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, credibility: 5 },
              narrativeResult: 'He doesn\'t answer. He picks up the memo again and reads the whole thing.',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, credibility: -5, freedom: -10 },
              narrativeResult: '"Roger, I need you to go home. You\'re done for the night."',
            },
            {
              weight: 1,
              requirements: { minCredibility: 50 },
              nextNodeId: 'outcome-delayed',
              resourceChanges: { time: -5, credibility: 10 },
              narrativeResult: 'He stares at the temperature chart for a very long time. Then he reaches for the phone.',
            },
          ],
        },
        {
          id: 'kilminster-threaten-resign',
          label: 'Tell him you will resign publicly and speak to the press if the launch proceeds',
          description: 'Time cost: ~20 min | High stakes — could force reconsideration or end your career',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, freedom: -20, credibility: 10 },
              narrativeResult: 'His expression doesn\'t change. "That\'s your choice to make," he says.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 45 },
              nextNodeId: 'outcome-delayed',
              resourceChanges: { time: -3, freedom: -30, credibility: 15 },
              narrativeResult: 'Something shifts in his face. He picks up the phone and calls Aldrich at KSC.',
            },
          ],
        },
        {
          id: 'kilminster-leave-pursue',
          label: 'Leave the memo and go — you have other channels to pursue.',
          description: 'Time cost: ~5 min | Keep moving',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -2, credibility: 3 },
              narrativeResult: 'You leave without another word. The memo stays on his desk.',
            },
          ],
        },
      ],
    },

    'nasa-safety-office': {
      id: 'nasa-safety-office',
      type: 'standard',
      act: 2,
      title: 'Fax Confirmation — 11:30 PM',
      narrative: `The confirmation sheet curls out of the fax machine. Received. Three pages to NASA's safety and mission assurance office at Marshall Space Flight Center.\n\nYou don't know who will see it — or when. The night staff at Marshall may not check the fax queue until morning. Morning may be too late.\n\nBut the data is out there now, officially transmitted, timestamped. If something goes wrong tomorrow, this piece of paper will matter enormously. If someone checks it in the next few hours, it might matter today.\n\nThe question is whether you can force someone to look at it.`,
      options: [
        {
          id: 'safety-followup-call',
          label: 'Call Marshall\'s night duty officer and tell them to check the safety fax queue immediately',
          description: 'Time cost: ~30 min | Active follow-up — turns a passive fax into a live alert',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, credibility: 8 },
              narrativeResult: '"I\'ll flag it for the morning chief engineer," the duty officer says. Carefully. Not a promise.',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, credibility: 15 },
              revealKnowledge: ['pressure-test'],
              narrativeResult: 'The duty officer pulls the fax while you\'re on the phone. "This is... this is detailed. I\'m going to wake someone up."',
            },
          ],
        },
        {
          id: 'safety-also-fax-ksc',
          label: 'Fax the same data to Kennedy Space Center\'s launch director as well',
          description: 'Time cost: ~20 min | Parallel distribution — more chances someone sees it in time',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -4, credibility: 12, freedom: -5 },
              revealKnowledge: ['oring-data', 'temperature-forecast'],
              narrativeResult: 'You send six pages to KSC. The timestamp reads 11:47 PM.',
            },
          ],
        },
        {
          id: 'safety-pivot-politician',
          label: 'The fax is sent. Now try a political channel — reach a Senator tonight.',
          description: 'Time cost: redirect | Maximize remaining hours',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'senator-contact',
              resourceChanges: { time: -2 },
            },
          ],
        },
      ],
    },

    'joint-memo': {
      id: 'joint-memo',
      type: 'standard',
      act: 2,
      title: 'Thiokol Engineering Office — 11:15 PM',
      narrative: `You and Bob Ebeling sit across from each other at the conference table where you spent most of tonight arguing with management. The same charts are still spread out. Someone left a half-eaten sandwich.\n\nBob's draft is tighter than yours — angrier in the margins, more precise in the body. You revise together. Two signatures, two sets of credentials, a decade of combined data on SRB performance.\n\nYou address it to every name you can think of: Kilminster, Mason, NASA's William Lucas at Marshall, the Mission Management Team at KSC. You list the O-ring data point by point. You state your conclusion plainly.\n\n*The calculated risk of launching at or near freezing temperatures is unacceptable. The O-ring seals may fail, causing catastrophic loss of vehicle and crew.*\n\nBob looks at the finished document. "You know this won't stop them," he says.\n\n"I know," you say. "But it will outlive them."`,
      options: [
        {
          id: 'joint-memo-send-fax',
          label: 'Fax the joint memo to all listed recipients immediately',
          description: 'Time cost: ~20 min | Maximum distribution — creates an unmistakable record',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, credibility: 18, freedom: -10 },
              revealKnowledge: ['previous-damage', 'pressure-test', 'oring-data'],
              narrativeResult: 'Nine destinations. Nine confirmation sheets. Bob watches the machine with empty eyes.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -3, credibility: 20, freedom: -10 },
              revealKnowledge: ['previous-damage', 'pressure-test', 'oring-data', 'temperature-forecast'],
              narrativeResult: 'One of the faxes reaches a senior engineer at Marshall who is still in the building. He reads it immediately.',
            },
          ],
        },
        {
          id: 'joint-memo-deliver-hand',
          label: 'Print copies and hand-deliver them inside the building — make people take them physically',
          description: 'Time cost: ~45 min | Physical copies are harder to ignore than fax sheets',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -7, credibility: 20, freedom: -15 },
              revealKnowledge: ['previous-damage', 'oring-data'],
              narrativeResult: 'You knock on every lit office in the building. Three engineers read it on the spot.',
            },
          ],
        },
        {
          id: 'joint-memo-also-press',
          label: 'Send a copy to a journalist as well — go public with both your names on it',
          description: 'Time cost: ~30 min | Highest risk, but the most pressure on NASA',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'press-contact',
              resourceChanges: { time: -5, credibility: 20, freedom: -20 },
              revealKnowledge: ['previous-damage', 'pressure-test', 'temperature-forecast'],
              narrativeResult: 'Bob stares at the reporter\'s number you\'ve written on the pad. "You sure?" he asks. "I\'m sure," you say.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -5, credibility: 25, freedom: -25 },
              revealKnowledge: ['previous-damage', 'pressure-test', 'temperature-forecast', 'chain-of-command'],
              narrativeResult: 'The reporter answers. She is wide awake. She asks you to read the memo to her.',
            },
          ],
        },
      ],
    },

    'press-contact': {
      id: 'press-contact',
      type: 'standard',
      act: 2,
      title: 'Phone — Trying the Press — After Midnight',
      narrative: `You go through the Rolodex in your head. Science reporters. Space beat journalists. Anyone who covered the shuttle program and might pick up a phone after midnight.\n\nYou try three numbers before someone answers. A science reporter at a wire service, working late on another story.\n\nYou tell her you are an engineer at Morton Thiokol. You tell her you were on the teleconference tonight. You tell her the launch should be scrubbed and you can document exactly why.\n\nShe is quiet for a long time.\n\n"If I print this," she says slowly, "I need to understand what you're giving me. Are you saying NASA is planning to launch knowing there's a safety problem?"\n\n"That's exactly what I'm saying."\n\nAnother silence. "I need to verify this. I need to call NASA public affairs. If they deny it on record, I can print the denial alongside your claim — but it takes time to do this right."`,
      options: [
        {
          id: 'press-give-data',
          label: 'Give her everything — the data, the teleconference details, Kilminster\'s signature',
          description: 'Time cost: ~1.5 hours | Full disclosure — this is the point of no return',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'press-aftermath',
              resourceChanges: { time: -12, credibility: 15, freedom: -25 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'previous-damage', 'chain-of-command'],
              narrativeResult: 'She is typing as you speak. You hear the keys. You hear her breath change.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 55 },
              nextNodeId: 'outcome-scrubbed',
              resourceChanges: { time: -12, credibility: 15, freedom: -30 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'previous-damage', 'chain-of-command', 'pressure-test'],
              narrativeResult: 'By 3 AM her story is on the wire. A NASA administrator reads it at 5 AM and makes a call.',
            },
          ],
        },
        {
          id: 'press-give-overview',
          label: 'Give her a high-level overview — enough to ask questions, without burning yourself entirely',
          description: 'Time cost: ~45 min | Protective, but may not be enough for her to run with it',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'press-aftermath',
              resourceChanges: { time: -7, credibility: 8, freedom: -10 },
              narrativeResult: '"I need more than this to go to print," she says. "Can you send me documentation?"',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -7, credibility: 5, freedom: -5 },
              narrativeResult: '"I can\'t verify this in time," she says. "I\'m sorry."',
            },
          ],
        },
        {
          id: 'press-give-data-anonymous',
          label: 'Give everything — but ask to be kept anonymous for now',
          description: 'Time cost: ~1.5 hours | Protects your job while still getting the story out',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'press-aftermath',
              resourceChanges: { time: -12, credibility: 10, freedom: -5 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'chain-of-command'],
              narrativeResult: '"I can try," she says. "But if NASA pushes back, they\'ll ask who my source is."',
            },
            {
              weight: 1,
              nextNodeId: 'press-aftermath',
              resourceChanges: { time: -12, credibility: 12, freedom: -10 },
              narrativeResult: '"Anonymous it is, for now," she says. "But the story needs your name to really bite."',
            },
          ],
        },
      ],
    },

    'press-aftermath': {
      id: 'press-aftermath',
      type: 'standard',
      act: 2,
      title: 'Waiting — 1:30 AM',
      narrative: `You are sitting in your car in the Thiokol parking lot. The reporter said she would call back. The sky above Utah is impossibly clear and cold.\n\nYou think about Christa McAuliffe. She is a social studies teacher from Concord, New Hampshire. She beat out eleven thousand other applicants to be the first teacher in space. She has two kids. She has lesson plans already written — she was going to teach them from orbit.\n\nYou think about Dick Scobee, the commander. Mike Smith. Ron McNair. Ellison Onizuka. Judy Resnik. Greg Jarvis. They are professionals who understand risk. They signed up knowing the shuttle was experimental. But they were never told about this — about the temperature data, about tonight's teleconference, about the decision that was made.\n\nThe phone does not ring.\n\nAt 1:47 AM you call the reporter back.`,
      options: [
        {
          id: 'press-followup-push',
          label: 'Push the reporter harder — tell her every hour matters. Is the story running?',
          description: 'Time cost: ~20 min | Urgent follow-up — may accelerate or may exhaust her goodwill',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, credibility: 5 },
              narrativeResult: '"I\'m working on it," she says. "NASA public affairs is not answering. It\'s 2 AM."',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -3, credibility: -5 },
              narrativeResult: '"Mr. Boisjoly, I\'m trying. Calling me back every hour isn\'t going to make the presses move faster."',
            },
          ],
        },
        {
          id: 'press-second-journalist',
          label: 'Call a second journalist — redundancy means one of them may break through',
          description: 'Time cost: ~45 min | More exposure, more risk, more chances',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -7, credibility: 8, freedom: -10 },
              narrativeResult: 'The second reporter is at a Florida paper — closer to the launch site. He knows the shuttle program.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -7, credibility: 15, freedom: -15 },
              revealKnowledge: ['chain-of-command', 'temperature-forecast'],
              narrativeResult: 'The Florida reporter has a source at KSC. By 4 AM, two newsrooms are making calls.',
            },
          ],
        },
        {
          id: 'press-redirect-senator',
          label: 'The press is too slow. Pivot to political pressure — find Senator Garn.',
          description: 'Time cost: ~1.5 hours | Jake Garn flew on Discovery in \'85. He will understand.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'senator-contact',
              resourceChanges: { time: -12 },
            },
          ],
        },
      ],
    },

    'senator-contact': {
      id: 'senator-contact',
      type: 'standard',
      act: 2,
      title: 'Phone — Attempting Senator\'s Office — Late Night',
      narrative: `Senator Jake Garn of Utah flew on Discovery in 1985. He sits on the Senate subcommittee that oversees NASA appropriations. He has been inside a shuttle. He knows what the O-ring seals look like.\n\nYou call his Senate office in Washington. After-hours message. You call the Utah state office. Same.\n\nYou try his chief of staff through a contact in the Utah delegation. The chief of staff's wife answers. She wakes her husband. He listens for four minutes — you time it — and then says: "I understand you're concerned. I'll pass this along first thing in the morning."\n\nFirst thing in the morning. The launch is at 11:38 AM. Morning is already here.\n\nHe gives you a fax number for the Senator's personal office. "Send everything you have. I'll make sure he sees it."`,
      options: [
        {
          id: 'senator-fax-everything',
          label: 'Fax all your data and documentation to the Senator\'s office immediately',
          description: 'Time cost: ~30 min | The fax may reach Garn in time to make a call to NASA',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -5, credibility: 12 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'chain-of-command'],
              narrativeResult: 'Confirmation sheet: received 2:18 AM. You stare at it.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 50 },
              nextNodeId: 'outcome-delayed',
              resourceChanges: { time: -5, credibility: 15, freedom: -5 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'chain-of-command', 'pressure-test'],
              narrativeResult: 'By 6 AM, Senator Garn has read the fax. His first call is to NASA Administrator James Fletcher.',
            },
          ],
        },
        {
          id: 'senator-garn-direct',
          label: 'Ask the chief of staff for Senator Garn\'s direct home number — call him yourself',
          description: 'Time cost: ~45 min | More persuasive than paper — if you can reach him',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -7, credibility: 10 },
              narrativeResult: '"The Senator is unavailable at this hour," the chief of staff says. Final answer.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 45 },
              nextNodeId: 'outcome-delayed',
              resourceChanges: { time: -7, credibility: 18 },
              narrativeResult: 'The chief of staff relents. Garn picks up at 3 AM, voice thick with sleep. He listens for twenty minutes.',
            },
          ],
        },
        {
          id: 'senator-pivot-crew',
          label: 'Political channels are too slow. Try to reach the crew directly.',
          description: 'Time cost: ~30 min | Most direct moral action. Least likely to succeed.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'crew-contact',
              resourceChanges: { time: -5, freedom: -10 },
            },
          ],
        },
      ],
    },

    'crew-contact': {
      id: 'crew-contact',
      type: 'standard',
      act: 2,
      title: 'Phone — Attempting to Reach the Crew — Night Before Launch',
      narrative: `The Challenger crew is in crew quarters at Kennedy Space Center — a secure facility. They went to bed early. The launch is in the morning and they have been in Florida for days, waiting through a series of weather delays and technical holds.\n\nYou call the KSC operator. You ask for crew quarters. You are told you cannot be connected to the crew directly — there is a crew support manager who screens all communications.\n\nYou tell the crew support manager you are an engineer at Morton Thiokol with an urgent safety concern. He asks your name. He asks if you have spoken to your own chain of command. You say yes, that your concerns were overridden. He says he will pass a message.\n\nChris Christa McAuliffe is probably asleep. Dick Scobee is probably asleep. They do not know that tonight, in a conference room in Utah, seven of their colleagues argued about whether to tell them what you know.\n\nNobody told them.`,
      options: [
        {
          id: 'crew-leave-message',
          label: 'Leave a full message with the support manager — temperature data, O-ring risk, everything',
          description: 'Time cost: ~20 min | Will it reach Scobee? Unknown. But you tried.',
          outcomes: [
            {
              weight: 3,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -3, credibility: 5, freedom: -10 },
              narrativeResult: '"I\'ll pass this to the support team," the manager says. His voice doesn\'t change. "Is there anything else?"',
            },
            {
              weight: 1,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -3, credibility: 8, freedom: -15 },
              narrativeResult: 'The manager asks you three follow-up questions. He is writing things down. He says he will wake the flight surgeon.',
            },
          ],
        },
        {
          id: 'crew-demand-scrub',
          label: 'Demand the crew support manager initiate a launch hold pending an engineering review',
          description: 'Time cost: ~30 min | Aggressive — he doesn\'t have that authority, but he can escalate',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -5, freedom: -20, credibility: 5 },
              narrativeResult: '"Sir, that\'s not within my authority," he says. "I can escalate your concern. That\'s all I can do."',
            },
            {
              weight: 1,
              nextNodeId: 'escalation-choice',
              resourceChanges: { time: -5, freedom: -25, credibility: 10 },
              narrativeResult: 'He escalates to the flight surgeon, who escalates to the launch director\'s office. Someone is awake now.',
            },
          ],
        },
        {
          id: 'crew-pivot-sabotage',
          label: 'You are near the Cape. Consider whether a physical intervention is possible.',
          description: 'Time cost: unknown | The most desperate option. High risk of prison. Possible lives saved.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'sabotage-consideration',
              resourceChanges: { time: -5, freedom: -5 },
            },
          ],
        },
      ],
    },

    'sabotage-consideration': {
      id: 'sabotage-consideration',
      type: 'standard',
      act: 2,
      title: 'Parking Lot — KSC Perimeter — Pre-dawn',
      narrative: `You are sitting in a rental car outside the Kennedy Space Center perimeter fence. The floodlights illuminate the launch complex. You can see the shuttle on Pad 39B from here — a white needle against the black sky, surrounded by gantry structure. The temperature is dropping. The weather service was right.\n\nYou have been awake for almost twenty hours.\n\nThere is ice forming on the access road.\n\nYou think about what it would take. The SRBs are sealed and loaded. The external tank is cryo-fueled. You would need credentials you don't have, security you cannot pass, and knowledge of the specific systems you'd need to disable without causing a different kind of catastrophe.\n\nYou are not a saboteur. You are an engineer. You believe in data and process and the slow, documented accumulation of truth.\n\nBut the truth is sitting in a folder in a fax machine nobody is reading.\n\nA security patrol car rolls past your position. You slide down in the seat.`,
      options: [
        {
          id: 'sabotage-attempt',
          label: 'Attempt to access the pad and trigger a technical hold — any delay buys time',
          description: 'Time cost: ~2 hours | Almost certainly fails. Arrest likely. Grounds future testimony.',
          outcomes: [
            {
              weight: 4,
              nextNodeId: 'outcome-fired',
              resourceChanges: { time: -15, freedom: -60 },
              narrativeResult: 'The patrol car swings back. Its spotlight finds you. Two officers get out.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-failed',
              resourceChanges: { time: -20, freedom: -50, credibility: -20 },
              narrativeResult: 'You are arrested at 4:40 AM. The launch proceeds as scheduled.',
            },
          ],
        },
        {
          id: 'sabotage-abort',
          label: 'No. Walk away. Your value is as a witness, not a criminal.',
          description: 'Time cost: ~10 min | The right call. Preserve your ability to testify.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -2 },
              narrativeResult: 'You start the car. You drive back toward the motel. The ice crunches under your tires.',
            },
          ],
        },
      ],
    },

    'escalation-choice': {
      id: 'escalation-choice',
      type: 'standard',
      act: 2,
      title: 'Running Out of Time — Before Dawn',
      narrative: `The clock on the dashboard says 3:17 AM. The shuttle launch is in eight hours and twenty-one minutes.\n\nYou have pushed through every channel you can think of inside Thiokol. You have tried NASA. You have called politicians. The faxes are sent. The memos are filed.\n\nAround you, the machinery of launch is grinding forward. Somewhere at the Cape, technicians are running pre-launch checks. The crew will wake at 6 AM for breakfast and suit-up. Christa McAuliffe will have coffee and probably write in her journal.\n\nYou think about Arnie Thompson, who was in that room with you tonight. You think about Bob Ebeling, who told his daughter. You think about Joe Kilminster, who drove home after signing the approval.\n\nYou have a few hours left. What you do with them will define the rest of your life.`,
      options: [
        {
          id: 'escalation-all-in-press',
          label: 'Go on record with every journalist you can reach before dawn — burn it all down publicly',
          description: 'Time cost: ~2 hours | Maximum exposure, maximum career risk — last, best shot at stopping it',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -15, freedom: -30, credibility: 20 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'chain-of-command', 'pressure-test'],
              narrativeResult: 'Three reporters have the story. None can get it to press before launch.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 60 },
              nextNodeId: 'outcome-scrubbed',
              resourceChanges: { time: -15, freedom: -35, credibility: 20 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'chain-of-command', 'pressure-test', 'previous-damage'],
              narrativeResult: 'A CBS producer has the story on his desk at 5:30 AM. He calls NASA\'s press office. They call the launch director.',
            },
          ],
        },
        {
          id: 'escalation-document-comprehensive',
          label: 'Document everything in exhaustive detail — a complete record for the investigation that will follow',
          description: 'Time cost: ~3 hours | Accepts you may not stop this launch. Fights for the ones that follow.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'document-for-record',
              resourceChanges: { time: -20, credibility: 20 },
              revealKnowledge: ['oring-data', 'temperature-forecast', 'previous-damage', 'pressure-test', 'chain-of-command'],
              narrativeResult: 'Sixty pages. Every conversation. Every data point. Dated and timed.',
            },
          ],
        },
        {
          id: 'escalation-accept-outcome',
          label: 'You\'ve done what you can. Go home. Be present when the world needs a witness.',
          description: 'Time cost: ~30 min | The hardest option of all.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome-failed',
              resourceChanges: { time: -5 },
              narrativeResult: 'You drive home through the dark. The sky is beginning to lighten in the east.',
            },
          ],
        },
      ],
    },

    'document-for-record': {
      id: 'document-for-record',
      type: 'standard',
      act: 2,
      title: 'Office — Early Hours of January 28',
      narrative: `You write for three hours without stopping.\n\nYou document the teleconference — who said what, the exact moment when Kilminster told the engineers to go off-line, the five-minute caucus, the reversal. You describe the data you presented. You note, precisely, that your recommendation to delay launch was based on specific engineering data and was overridden by management under NASA pressure.\n\nYou date and time every page.\n\nAt one point Arnie Thompson comes in and sits with you for a while. He doesn't speak. He reads what you've written and nods.\n\nOutside, the temperature is still dropping. Somewhere between 28 and 29 degrees Fahrenheit at the Cape.\n\nAt 6:48 AM your phone rings. It's Bob Ebeling.\n\n"They're suiting up," he says. "It's really going to happen."`,
      options: [
        {
          id: 'document-one-more-call',
          label: 'Make one more call — reach whoever is highest you haven\'t tried yet',
          description: 'Time cost: ~45 min | Desperation move — but you haven\'t tried everything',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -7, credibility: 8 },
              narrativeResult: 'The phone rings. No one answers. The crew is already at the pad.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 65, minFreedom: 30 },
              nextNodeId: 'outcome-delayed',
              resourceChanges: { time: -7, credibility: 10 },
              narrativeResult: 'You reach a senior Marshall engineer who read your fax. He is already on the phone with the launch director.',
            },
          ],
        },
        {
          id: 'document-watch-witness',
          label: 'Stop. Watch the launch. Be a witness to what happens — and be ready to speak.',
          description: 'Time cost: 0 | The weight of this moment is history\'s to carry now.',
          outcomes: [
            {
              weight: 3,
              nextNodeId: 'outcome-failed',
              resourceChanges: {},
              narrativeResult: 'You find a television. You watch.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 70 },
              nextNodeId: 'outcome-partial',
              resourceChanges: { credibility: 5 },
              narrativeResult: 'You watch. And when the Rogers Commission convenes six weeks later, they call you first.',
            },
          ],
        },
      ],
    },

    // ── ACT 3: OUTCOMES ─────────────────────────────────────────────────────────

    'outcome-scrubbed': {
      id: 'outcome-scrubbed',
      type: 'outcome',
      title: 'Launch Scrubbed',
      narrative: `At 7:54 AM on January 28, 1986, the launch director calls a hold.\n\nThe story — your data, your name, Thiokol's override, the temperature charts — reached someone with the authority and the will to act. A senior engineer at Marshall. A journalist whose editor made a call at 5 AM. A Senator who picked up his phone.\n\nSomewhere in the chain, a decision got made the way it should have been made in that conference room last night.\n\nThe Challenger crew is told there is a technical hold. They wait in their seats. Dick Scobee makes a joke about the paperwork. Christa McAuliffe writes something in her notebook.\n\nBy 9 AM the launch is formally scrubbed pending O-ring inspection. The crew returns to crew quarters. The media covers it as a minor delay — another in a series.\n\nTwo weeks later, with temperatures in the 60s, Challenger launches without incident.\n\nYou are called into Thiokol HR the day after your story breaks. There are discussions. Your position becomes complicated. But you are alive. The crew is alive. You did what engineers are supposed to do.`,
      livesSaved: 7,
      maxLives: 7,
      epilogue:
        'In the alternate history where Roger Boisjoly succeeded, he was vindicated — and largely unrewarded. The system that overrode him remained mostly intact. It would take years and another disaster, Columbia in 2003, to truly reform NASA\'s safety culture. But the seven men and women of mission 51-L were still here. That was not nothing. That was everything.',
    },

    'outcome-delayed': {
      id: 'outcome-delayed',
      type: 'outcome',
      title: 'Launch Delayed Until Warmer Day',
      narrative: `The phone call reaches the right person at the right moment.\n\nIt is not a dramatic intervention. It does not make the news. It is simply: one engineer's documented argument finally landing in front of someone who reads it carefully and picks up a phone.\n\nThe launch is delayed. No announcement is made about O-rings. The official reason is weather — which is true, in a way. It is 29 degrees at the Cape.\n\nFive days later, with the temperature at 62 degrees, Challenger launches cleanly. The SRB seals perform exactly as designed. The shuttle reaches orbit. Christa McAuliffe, from 184 miles above the Earth, teaches two fifteen-minute lessons that are broadcast to more than nine million schoolchildren.\n\nShe comes home. They all come home.\n\nYou never tell her what almost happened. You think about it every day for the rest of your life.`,
      livesSaved: 7,
      maxLives: 7,
      epilogue:
        'The Rogers Commission was never convened in this timeline. The O-ring problem was quietly corrected in the following months — inadequately, without the full weight of a public disaster to force real change. Roger Boisjoly kept his job. He also kept his silence, mostly. Some nights he would lie awake and wonder whether getting away with it was, in some way, worse.',
    },

    'outcome-partial': {
      id: 'outcome-partial',
      type: 'outcome',
      title: 'The Memos Reach Congress',
      narrative: `At 11:38 AM on January 28, 1986, you watch the television in the break room.\n\nChallenger clears the tower. It climbs through the clear blue Florida sky. At T+59 seconds, the first anomalous plume appears from the right SRB field joint — exactly where you said it would. At T+73 seconds, the shuttle breaks apart.\n\nThe television anchor goes silent for seven seconds.\n\nYou already have your folder ready. Sixty pages. Timestamped memos, fax confirmations, the joint statement you and Bob Ebeling wrote at midnight. Your name is on every page.\n\nWhen the Rogers Commission convenes, your documentation is the first exhibit entered into evidence. Richard Feynman will demonstrate O-ring rigidity in ice water before the cameras — but the paper trail you built overnight is what forces the testimony, subpoenas the managers, and ultimately reforms how NASA handles dissenting engineering opinion.\n\nYou did not save the seven people on that shuttle. But the decisions you made last night may prevent the next seven, and the seven after that.`,
      livesSaved: 0,
      maxLives: 7,
      epilogue:
        'Roger Boisjoly testified before the Rogers Commission on February 25, 1986. He was forthright, detailed, and unsparing about the pressure Thiokol management faced from NASA. He was subsequently marginalized within Thiokol, placed on indefinite "stress leave," and effectively forced out of the company. He spent the rest of his life as a lecturer on engineering ethics. He told his students: the greatest professional obligation you have is to tell the truth about what you know, regardless of the consequences. He said it got easier over time. His students did not always believe him.',
    },

    'outcome-fired': {
      id: 'outcome-fired',
      type: 'outcome',
      title: 'Terminated — January 28, 1986',
      narrative: `At 7:15 AM, before you can make another call, your supervisor calls you into an office.\n\nWord got back. The late-night phone calls, the faxes sent without authorization, the calls to journalists, the breach of chain of command. You are told this constitutes insubordination. You are put on administrative leave, effective immediately. Your badge is deactivated.\n\nYou are in a motel room watching television when it happens.\n\nAt 11:38 AM, Challenger launches. At 11:39:13 AM, it is gone.\n\nYou call a lawyer. You call the Rogers Commission tip line. You call Bob Ebeling.\n\nBob answers. He doesn't speak. You can hear him breathing.\n\n"I know," you say.\n\n"I know," he says back.\n\nYour documentation — the memos, the faxes, everything you filed before they took your badge — is subpoenaed by the Commission six weeks later. You testify voluntarily. You tell them everything.\n\nIt is the only thing left to do.`,
      livesSaved: 0,
      maxLives: 7,
      epilogue:
        'Being fired before the disaster stripped Roger Boisjoly of any remaining institutional protection. But it also freed him. His testimony before the Rogers Commission was the most complete and damning account of the night of January 27 that the investigation received. He had nothing left to protect and told the whole truth. His memos — written and faxed in the early hours of January 28, 1986 — became the foundation of a landmark case study in engineering ethics that is still taught in universities today.',
    },

    'outcome-failed': {
      id: 'outcome-failed',
      type: 'outcome',
      title: 'January 28, 1986 — 11:38 AM',
      narrative: `The sky over Cape Canaveral is the clearest blue you have ever seen. Seventy-three seconds.\n\nYou know the exact moment before anyone else watching does. At T+58.788 seconds a strong plume of gray smoke and then fire appears from the right SRB at the field joint. At T+64 seconds the external tank fails. At T+73 seconds the orbiter breaks up at an altitude of 46,000 feet.\n\nThe television anchor says: "Obviously a major malfunction."\n\nSeven people. Dick Scobee, 46. Michael Smith, 40. Judith Resnik, 36. Ellison Onizuka, 39. Ronald McNair, 35. Gregory Jarvis, 41. Christa McAuliffe, 37 — the teacher from Concord, New Hampshire, who had lessons prepared for orbit, who had written letters to her students, who went to bed last night not knowing what you knew.\n\nThe crew cabin survived the initial breakup and fell for two minutes and forty-five seconds before it hit the ocean. Some of them may have been conscious.\n\nYou knew. You tried. You failed.\n\nBob Ebeling will say, years later, that he never forgave himself. You will understand exactly what he means.`,
      livesSaved: 0,
      maxLives: 7,
      epilogue:
        'Roger Boisjoly testified before the Presidential Commission on the Space Shuttle Challenger Accident on February 25, 1986. He was one of the few people who told the complete truth. He was subsequently isolated within Morton Thiokol, placed on indefinite stress leave, and forced out of aerospace engineering. He spent the remaining 26 years of his life lecturing on engineering ethics and whistleblower protection. He said the disaster haunted him every day. On the 30th anniversary of the accident, Bob Ebeling gave an interview in which he finally, partially, accepted that he had done everything he could. Roger Boisjoly died on January 6, 2012. He was 73 years old.',
    },

  },
};
