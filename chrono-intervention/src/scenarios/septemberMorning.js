// SCENARIO: September Morning (9/11, 2001)
// Difficulty: Medium | Start: September 10, 2001, morning | ~24 hours

export const septemberMorning = {
  id: 'september-morning',
  title: 'September Morning',
  subtitle: 'September 10, 2001 — New York City',
  difficulty: 'Medium',
  tagline: 'You know the names, the flights, the targets. Nobody wants to believe you.',
  historicalContext:
    'On September 11, 2001, 19 hijackers coordinated four simultaneous attacks using commercial aircraft. Nearly 3,000 people were killed — the deadliest terrorist attack on U.S. soil.',
  startNodeId: 'intro',
  startingResources: {
    time: 100,      // ~24 hours remaining, displayed as countdown
    credibility: 30, // You're a stranger with wild claims
    freedom: 95,    // Mostly free to move
  },
  timeLabel: '23h 50m remaining',
  knowledgeInventory: [
    { id: 'hijacker-names', label: 'Hijacker names (19 total)', credibilityValue: 'high', revealed: false },
    { id: 'flight-numbers', label: 'Flight numbers & airports', credibilityValue: 'high', revealed: false },
    { id: 'method', label: 'Method: box cutters', credibilityValue: 'medium', revealed: false },
    { id: 'timing', label: 'Timing: 8–9am, September 11', credibilityValue: 'medium', revealed: false },
    { id: 'targets', label: 'Targets: WTC, Pentagon, Capitol', credibilityValue: 'high', revealed: false },
    { id: 'watchlist', label: 'Two hijackers on CIA watchlist', credibilityValue: 'very high', revealed: false },
  ],

  nodes: {

    // ── ACT 1: ORIENTATION ─────────────────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'September 10, 2001 — 7:22 AM',
      location: 'Midtown Manhattan, New York City',
      activeNPC: null,
      narrative: `You wake in a mid-range hotel room. The TV plays morning news. Stocks are up. The weather is clear.\n\nYou know what tomorrow morning brings.\n\nYou have less than 24 hours. Four flights. Nineteen hijackers. Nearly three thousand lives.\n\nYour cell phone has a full charge. Your wallet has $200 cash and a credit card. You're nobody — no badge, no clearance, no connections. Just knowledge that can't be explained.\n\nWhere do you start?`,
      options: [
        {
          id: 'go-fbi',
          label: 'Go to the FBI New York Field Office',
          description: '⏱ 1h 30m | High authority, but they need convincing',
          costs: { time: -12, credibility: 0, freedom: 0 },
          outcomes: [{ weight: 1, nextNodeId: 'fbi-office', resourceChanges: { time: -12 } }],
        },
        {
          id: 'call-airlines',
          label: 'Call American Airlines security directly',
          description: '⏱ 30m | They can ground the flights — if they listen',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [{ weight: 1, nextNodeId: 'airlines-call', resourceChanges: { time: -5 } }],
        },
        {
          id: 'contact-press',
          label: 'Contact a New York Times journalist',
          description: '⏱ 45m | Low power, but high receptiveness',
          costs: { time: -7, credibility: 0, freedom: 0 },
          outcomes: [{ weight: 1, nextNodeId: 'journalist', resourceChanges: { time: -7 } }],
        },
        {
          id: 'go-airport',
          label: 'Drive to Logan Airport, Boston to intercept the hijackers',
          description: '⏱ 4h travel | Direct, but risky without credentials',
          costs: { time: -30, credibility: 0, freedom: -5 },
          outcomes: [{ weight: 1, nextNodeId: 'logan_airport', resourceChanges: { time: -30, freedom: -5 } }],
        },
      ],
    },

    // ── FBI BRANCH ──────────────────────────────────────────────────────────────

    fbi_office: {
      id: 'fbi_office',
      type: 'standard',
      act: 2,
      title: '26 Federal Plaza — FBI New York Field Office',
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Agent Sarah Caldwell',
      npcStats: { receptiveness: 55, authority: 70 },
      narrative: `After 90 minutes in a waiting room, a junior agent named Sarah Caldwell sits across from you. She's professional, skeptical, and clearly has a full caseload.\n\n"Sir, you said you have information about a terrorist threat. I'm going to need specifics. Vague claims aren't actionable."\n\nHer notepad is open. She's giving you a chance.`,
      options: [
        {
          id: 'share-names',
          label: 'Give her the hijacker names — especially Atta and al-Shehhi',
          description: '⏱ 20m | Two names already in CIA databases — this is your best opener',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 3,
              nextNodeId: 'fbi_names_hit',
              resourceChanges: { time: -3, credibility: 20 },
              revealKnowledge: ['hijacker-names', 'watchlist'],
              narrativeResult: 'She types the names. Her expression shifts slightly.',
            },
          ],
        },
        {
          id: 'share-flights',
          label: 'Reveal the flight numbers: AA11, UA175, AA77, UA93',
          description: '⏱ 15m | Specific and verifiable — she can pull manifests',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_flights_too_early',
              resourceChanges: { time: -3, credibility: -10 },
              revealKnowledge: ['flight-numbers'],
              narrativeResult: '"How do you know specific flight numbers for tomorrow? Who are you really?"',
            },
          ],
        },
        {
          id: 'demand-supervisor',
          label: 'Demand to speak with her supervisor',
          description: '⏱ 45m | Escalates, but strains the relationship',
          costs: { time: -7, credibility: -10, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_supervisor',
              resourceChanges: { time: -7, credibility: -10 },
            },
          ],
        },
        {
          id: 'mention-watchlist',
          label: '"Two of the men are already on a CIA watchlist. Check with Langley."',
          description: '⏱ 2h delay | High credibility gain if verified — but takes time',
          costs: { time: -20, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'fbi_watchlist_check',
              resourceChanges: { time: -20, credibility: 30 },
              revealKnowledge: ['watchlist', 'hijacker-names'],
              narrativeResult: 'She makes a call to Langley. Her posture straightens.',
            },
          ],
        },
      ],
    },

    fbi_names_hit: {
      id: 'fbi_names_hit',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Agent Caldwell',
      narrative: `Caldwell comes back from her desk with a different look on her face.\n\n"Mohamed Atta. We have a file on him. He's been on a watch list since 2000 — entered the country legally. Where did you get this name?"\n\nThis is your window. Your credibility just jumped. She's listening.`,
      options: [
        {
          id: 'give-flights-now',
          label: 'Give her the four flight numbers and airports — now that she trusts you',
          description: '⏱ 30m | High value — she can have FAA hold the flights',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_escalation',
              resourceChanges: { time: -5, credibility: 15 },
              revealKnowledge: ['flight-numbers', 'timing'],
            },
          ],
        },
        {
          id: 'give-targets',
          label: 'Tell her the targets: WTC, Pentagon, and Capitol',
          description: '⏱ 20m | Dramatic — may overwhelm or compel',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_targets_reveal',
              resourceChanges: { time: -3, credibility: 10 },
              revealKnowledge: ['targets'],
            },
          ],
        },
        {
          id: 'ask-cia-contact',
          label: 'Ask her to contact the CIA Counterterrorism Center directly',
          description: '⏱ 3h | FBI-CIA wall is the core problem — worth pushing',
          costs: { time: -25, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'cia_contact',
              resourceChanges: { time: -25, credibility: 20 },
              revealKnowledge: ['watchlist'],
            },
          ],
        },
      ],
    },

    fbi_watchlist_check: {
      id: 'fbi_watchlist_check',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Agent Caldwell',
      narrative: `After two agonizing hours of waiting, Caldwell returns. The skepticism is gone.\n\n"Langley confirmed two of those names. They're persons of interest on a terrorism watch list. I've been authorized to bring in my supervisor. This is now a priority matter."\n\nYou've cracked the wall. Now you need to move fast — it's 1:30 PM on September 10.`,
      options: [
        {
          id: 'full-briefing',
          label: 'Give a full briefing: flights, times, targets, method',
          description: '⏱ 1h | All cards on table — maximum impact',
          costs: { time: -10, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_full_brief',
              resourceChanges: { time: -10, credibility: 15 },
              revealKnowledge: ['flight-numbers', 'timing', 'targets', 'method'],
            },
          ],
        },
        {
          id: 'request-faa',
          label: 'Demand they contact the FAA immediately to ground the flights',
          description: '⏱ 45m | This is the critical operational step',
          costs: { time: -7, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'faa_contact',
              resourceChanges: { time: -7, credibility: 10 },
              revealKnowledge: ['flight-numbers'],
            },
          ],
        },
      ],
    },

    fbi_supervisor: {
      id: 'fbi_supervisor',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Supervisor Richard Baxter',
      npcStats: { receptiveness: 35, authority: 85 },
      narrative: `The supervisor, Baxter, is impatient. Caldwell looks embarrassed by you.\n\n"Agent Caldwell tells me you have a vague terrorism tip. We get dozens a week. Do you have anything verifiable? A name? A location?"\n\nYou're starting at zero with someone who has less patience than Caldwell did.`,
      options: [
        {
          id: 'give-atta-name',
          label: 'Give him Mohamed Atta\'s name and visa history',
          description: '⏱ 30m | Known name — verifiable in minutes',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'fbi_names_hit',
              resourceChanges: { time: -5, credibility: 15 },
              revealKnowledge: ['hijacker-names'],
              narrativeResult: 'His expression shifts. He picks up his phone.',
            },
            {
              weight: 1,
              requirements: { minCredibility: 20 },
              nextNodeId: 'fbi_names_hit',
              resourceChanges: { time: -5, credibility: 25 },
              revealKnowledge: ['hijacker-names', 'watchlist'],
            },
          ],
        },
        {
          id: 'leave-fbi',
          label: 'This is a dead end. Leave and try another approach.',
          description: '⏱ 30m | Cut losses and pivot',
          costs: { time: -5, credibility: -5, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'pivot_choice',
              resourceChanges: { time: -5, credibility: -5 },
            },
          ],
        },
      ],
    },

    fbi_flights_too_early: {
      id: 'fbi_flights_too_early',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Agent Caldwell',
      narrative: `Her suspicion has spiked. She's eyeing the door.\n\n"How could you possibly know which flights tomorrow? Are you involved in planning something? I need you to stay here."\n\nYou're about to lose your freedom to pursue other avenues.`,
      options: [
        {
          id: 'explain-names-first',
          label: 'Backtrack — "I have names first. Let me show you why I know this."',
          description: '⏱ 20m | Recover with the watchlist angle',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'fbi_names_hit',
              resourceChanges: { time: -3, credibility: 5 },
              revealKnowledge: ['hijacker-names'],
            },
            {
              weight: 1,
              nextNodeId: 'detained',
              resourceChanges: { time: -10, freedom: -40, credibility: -15 },
            },
          ],
        },
        {
          id: 'cooperate-and-stay',
          label: 'Cooperate fully — answer their questions, build trust slowly',
          description: '⏱ 3h | Loses time but avoids detention',
          costs: { time: -25, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_watchlist_check',
              resourceChanges: { time: -25, credibility: 10, freedom: 5 },
            },
          ],
        },
      ],
    },

    fbi_escalation: {
      id: 'fbi_escalation',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office — Conference Room',
      activeNPC: 'Supervisor Baxter + Agent Caldwell',
      narrative: `It's 3:15 PM. You're in a conference room. Baxter is on a phone call with the FAA. Caldwell is running the hijacker names through every database she has access to.\n\n"We've got three of these names matching visa records. Two are already flagged."\n\nBaxter hangs up. "The FAA won't ground domestic flights based on a tip alone. We need either an arrest or a threat level escalation from the Director's office."\n\nThe clock ticks. 17 hours left.`,
      options: [
        {
          id: 'push-director',
          label: 'Push Baxter to escalate to the FBI Director',
          description: '⏱ 2h | Long shot, but Director can order the FAA',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_director_push',
              resourceChanges: { time: -18, credibility: 10 },
            },
          ],
        },
        {
          id: 'contact-faa-direct',
          label: 'Ask to go with Baxter to contact FAA administrator directly',
          description: '⏱ 4h | Slow but could bypass bureaucracy',
          costs: { time: -30, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'faa_contact',
              resourceChanges: { time: -30, credibility: 15 },
              revealKnowledge: ['timing'],
            },
          ],
        },
        {
          id: 'go-public-from-fbi',
          label: 'Ask to contact the press as a backup — create public pressure',
          description: '⏱ 2h | Controversial — Baxter may refuse',
          costs: { time: -15, credibility: -10, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'media_pressure',
              resourceChanges: { time: -15, credibility: -10 },
            },
          ],
        },
      ],
    },

    fbi_targets_reveal: {
      id: 'fbi_targets_reveal',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office, Manhattan',
      activeNPC: 'Agent Caldwell',
      narrative: `"The World Trade Center. The Pentagon. The Capitol." Caldwell stares at you.\n\n"That's... that's not a small operation. That's a coordinated—" She stops herself.\n\n"I need you to stay here while I make some calls. Do NOT leave this room."`,
      options: [
        {
          id: 'stay-and-cooperate',
          label: 'Stay and cooperate — let her work',
          description: '⏱ 2h wait | Loses time but gains full FBI engagement',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_escalation',
              resourceChanges: { time: -18, credibility: 20 },
            },
          ],
        },
        {
          id: 'give-flights-too',
          label: 'Give her the flight numbers before she leaves',
          description: '⏱ 5m | The flights are the operational key',
          costs: { time: -2, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_escalation',
              resourceChanges: { time: -2, credibility: 10 },
              revealKnowledge: ['flight-numbers', 'timing'],
            },
          ],
        },
      ],
    },

    fbi_full_brief: {
      id: 'fbi_full_brief',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office — Emergency Task Force',
      activeNPC: 'Supervisor Baxter, Agent Caldwell, FAA liaison on phone',
      narrative: `It's 4:00 PM. You've laid everything out. Flight numbers. Names. Box cutters. Targets. Timing.\n\nThe room is quiet. Then Baxter makes three calls simultaneously.\n\nAn emergency task force is forming. The FAA is being notified. National threat level is being reassessed.\n\nBut it's bureaucracy. Can it move fast enough?`,
      options: [
        {
          id: 'final-push-flights',
          label: 'Insist: "Ground those four flights tonight — don\'t wait for morning"',
          description: '⏱ 1h | The decisive ask',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -8, credibility: 10 },
            },
            {
              weight: 1,
              requirements: { minCredibility: 70 },
              nextNodeId: 'outcome_full_prevention',
              resourceChanges: { time: -8, credibility: 15 },
            },
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -8 },
            },
          ],
        },
        {
          id: 'focus-on-atta',
          label: 'Focus on arresting Atta and al-Shehhi tonight — disrupt the plan',
          description: '⏱ 3h | Targeted approach — removes key coordinators',
          costs: { time: -25, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -25, credibility: 5 },
            },
          ],
        },
      ],
    },

    cia_contact: {
      id: 'cia_contact',
      type: 'standard',
      act: 2,
      location: 'FBI Field Office — Secure Line to Langley',
      activeNPC: 'CIA Counterterrorism Officer (by phone)',
      narrative: `Three hours later — it's past dinner time. Caldwell has reached a CIA counterterrorism analyst named Mills.\n\nMills is guarded. The CIA-FBI wall is real. Sharing intelligence across agencies requires authorization most agents don't have.\n\n"We are aware of several of these individuals, yes. But what you're describing — a simultaneous four-plane hijacking — that's not a profile we have. That's... novel."`,
      options: [
        {
          id: 'push-cia-fbi-share',
          label: '"The wall between CIA and FBI is about to cost 3,000 lives. Share the files."',
          description: '⏱ 2h | Confrontational but historically the correct diagnosis',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_full_brief',
              resourceChanges: { time: -18, credibility: 20 },
              revealKnowledge: ['watchlist', 'flight-numbers'],
            },
          ],
        },
        {
          id: 'give-cia-targets',
          label: 'Tell Mills the specific targets — the Pentagon will resonate with him',
          description: '⏱ 30m | Targets may trigger DoD involvement',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_full_brief',
              resourceChanges: { time: -5, credibility: 15 },
              revealKnowledge: ['targets'],
            },
          ],
        },
      ],
    },

    fbi_director_push: {
      id: 'fbi_director_push',
      type: 'standard',
      act: 3,
      location: 'FBI Field Office — it\'s now 11 PM',
      activeNPC: 'Supervisor Baxter',
      narrative: `Baxter just got off a call with the Assistant Director. It's 11 PM.\n\n"I've been told this is 'under review.' The Director's office wants more corroboration before authorizing an FAA grounding order. They're asking for a source."\n\nHe looks at you with something between exhaustion and suspicion.\n\n"Who are you? How do you know all this?"`,
      options: [
        {
          id: 'truth-partial',
          label: '"I received intelligence from a source I can\'t disclose. Verify the names — that\'s all I can give you."',
          description: '⏱ 30m | Plausible. Keeps credibility. Standard informant frame.',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'snap_morning_rush',
              resourceChanges: { time: -5, credibility: 5 },
            },
          ],
        },
        {
          id: 'demand-action-now',
          label: '"There is no time for review. The flights board at 7 AM. Ground them now."',
          description: '⏱ 10m | Desperate push — may snap Baxter into action or close him off',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              requirements: { minCredibility: 65 },
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -3, credibility: 10 },
            },
            {
              weight: 1,
              nextNodeId: 'snap_morning_rush',
              resourceChanges: { time: -3, credibility: -10 },
            },
          ],
        },
      ],
    },

    // ── AIRLINES BRANCH ─────────────────────────────────────────────────────────

    airlines_call: {
      id: 'airlines_call',
      type: 'standard',
      act: 2,
      location: 'Hotel phone, Midtown',
      activeNPC: 'American Airlines Security (phone)',
      npcStats: { receptiveness: 45, authority: 60 },
      narrative: `After several transfers, you reach an American Airlines security supervisor named Dennis Park.\n\n"This is a serious claim, sir. We take threats very seriously. But we can't ground flights based on an anonymous call. Do you have any documentation or credentials?"`,
      options: [
        {
          id: 'give-flight-aa11',
          label: 'Give him AA Flight 11 details: Boston Logan, 7:59 AM departure, five names',
          description: '⏱ 20m | Specific enough to check against manifest',
          costs: { time: -4, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_manifest_check',
              resourceChanges: { time: -4, credibility: 15 },
              revealKnowledge: ['flight-numbers', 'hijacker-names'],
            },
          ],
        },
        {
          id: 'give-all-four-flights',
          label: 'Give all four flights at once: AA11, UA175, AA77, UA93',
          description: '⏱ 30m | More convincing in scope, but may seem fantastical',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'airlines_manifest_check',
              resourceChanges: { time: -5, credibility: 10 },
              revealKnowledge: ['flight-numbers'],
            },
            {
              weight: 1,
              nextNodeId: 'airlines_skeptical',
              resourceChanges: { time: -5, credibility: -10 },
            },
          ],
        },
        {
          id: 'mention-box-cutters',
          label: '"The weapon is box cutters — carried through checkpoint security."',
          description: '⏱ 10m | Specific method detail — valuable but unusual knowledge',
          costs: { time: -2, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_manifest_check',
              resourceChanges: { time: -2, credibility: 20 },
              revealKnowledge: ['method'],
            },
          ],
        },
      ],
    },

    airlines_manifest_check: {
      id: 'airlines_manifest_check',
      type: 'standard',
      act: 2,
      location: 'Hotel phone, Midtown',
      activeNPC: 'Dennis Park — American Airlines Security',
      narrative: `Park puts you on hold. You wait nine minutes.\n\n"Sir, I'm going to be honest with you. I pulled the preliminary manifest for Flight 11 out of Logan. Three of the five names you gave me are on it. That's not something a random caller would know."\n\nHis voice has changed. This is real to him now.\n\n"I need to escalate this. Can you come in person? Or do I have a number I can reach you at?"`,
      options: [
        {
          id: 'meet-in-person',
          label: 'Agree to meet in person at AA\'s security office',
          description: '⏱ 2h | Builds maximum trust, takes time',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_escalation',
              resourceChanges: { time: -18, credibility: 20 },
            },
          ],
        },
        {
          id: 'push-for-grounding-now',
          label: '"Don\'t wait for me — suspend all four flights tonight. I\'ll give you more names."',
          description: '⏱ 30m | Urgent ask while credibility is high',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_escalation',
              resourceChanges: { time: -5, credibility: 10 },
              revealKnowledge: ['flight-numbers', 'timing'],
            },
          ],
        },
        {
          id: 'refer-to-fbi',
          label: '"Call the FBI New York office — ask for Agent Caldwell. I\'m working with her."',
          description: '⏱ 1h | Coordinates both paths if you\'ve already been to the FBI',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_escalation',
              resourceChanges: { time: -8, credibility: 25 },
            },
          ],
        },
      ],
    },

    airlines_skeptical: {
      id: 'airlines_skeptical',
      type: 'standard',
      act: 2,
      location: 'Hotel phone',
      activeNPC: 'Dennis Park — American Airlines Security',
      narrative: `"Four simultaneous flights? Sir, I'm going to have to ask you to come in and speak with us in person, or I'm going to have to refer this to law enforcement as a potential hoax call."\n\nYou're losing him.`,
      options: [
        {
          id: 'walk-back-and-focus',
          label: 'Focus on one flight only — Flight 11, specific names and method',
          description: '⏱ 15m | Rebuild with a concrete, verifiable claim',
          costs: { time: -3, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'airlines_manifest_check',
              resourceChanges: { time: -3, credibility: 10 },
              revealKnowledge: ['flight-numbers', 'method'],
            },
          ],
        },
        {
          id: 'cut-losses-airlines',
          label: 'Hang up and pivot to a different approach',
          description: '⏱ 15m | Cut losses',
          costs: { time: -3, credibility: -5, freedom: 0 },
          outcomes: [{ weight: 1, nextNodeId: 'pivot_choice', resourceChanges: { time: -3, credibility: -5 } }],
        },
      ],
    },

    airlines_escalation: {
      id: 'airlines_escalation',
      type: 'standard',
      act: 3,
      location: 'American Airlines Security — evening',
      activeNPC: 'VP of Security, John Walters',
      narrative: `It's 8 PM. You're now in a conference call with AA's VP of Security.\n\n"We've confirmed five names across two flights. I've notified United Airlines. We're briefing our legal team now."\n\nWalters is cautious. He needs authorization to pull flights.\n\n"We're also contacting the FAA and the FBI. If this holds, we can pull the gate authorizations tonight."`,
      options: [
        {
          id: 'push-all-four-grounded',
          label: '"Pull all four flights. American 11, 77 and United 93, 175. Tonight."',
          description: '⏱ 1h | The decisive moment',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -8, credibility: 10 },
            },
            {
              weight: 1,
              requirements: { minCredibility: 70 },
              nextNodeId: 'outcome_full_prevention',
              resourceChanges: { time: -8, credibility: 15 },
            },
          ],
        },
        {
          id: 'pull-aa-only',
          label: 'Focus on the two American flights — certain wins over uncertain complete victory',
          description: '⏱ 30m | Partial but very likely success',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -5, credibility: 5 },
            },
          ],
        },
      ],
    },

    // ── JOURNALIST BRANCH ───────────────────────────────────────────────────────

    journalist: {
      id: 'journalist',
      type: 'standard',
      act: 2,
      location: 'A coffee shop in Midtown',
      activeNPC: 'Maya Chen — New York Times investigative reporter',
      npcStats: { receptiveness: 80, authority: 30 },
      narrative: `Maya Chen is a counterterrorism beat reporter for the Times. You've managed to reach her through a mutual contact.\n\nShe's sharp, curious, and used to receiving tips. She's also used to tips going nowhere.\n\n"So you're saying tomorrow morning. Four commercial flights. You have names and flight numbers." She looks at you steadily. "Walk me through how you know this."`,
      options: [
        {
          id: 'give-journalist-everything',
          label: 'Give her everything — names, flights, targets, method',
          description: '⏱ 45m | She\'ll verify fast — and can create public pressure',
          costs: { time: -7, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'journalist_verification',
              resourceChanges: { time: -7, credibility: 20 },
              revealKnowledge: ['hijacker-names', 'flight-numbers', 'targets', 'method'],
            },
          ],
        },
        {
          id: 'give-journalist-names-only',
          label: 'Give her the names — ask her to pull their immigration and financial records',
          description: '⏱ 3h | Slower but she can create independent verification',
          costs: { time: -25, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'journalist_verification',
              resourceChanges: { time: -25, credibility: 15 },
              revealKnowledge: ['hijacker-names'],
            },
          ],
        },
        {
          id: 'ask-journalist-fbi',
          label: '"I need you to call the FBI Field Office and say you\'ve independently received this tip"',
          description: '⏱ 1h | Corroboration from press creates institutional pressure',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'journalist_fbi_pressure',
              resourceChanges: { time: -8, credibility: 10 },
            },
          ],
        },
      ],
    },

    journalist_verification: {
      id: 'journalist_verification',
      type: 'standard',
      act: 2,
      location: 'New York Times newsroom',
      activeNPC: 'Maya Chen',
      narrative: `It's noon. Chen has been on the phone for two hours. She comes back to the table.\n\n"Three of your names have verifiable immigration records entering the country recently. Mohamed Atta — I found a federal watchlist reference in a 2000 public court document."\n\nShe's excited but conflicted. "I can run this story. But it won't run until tomorrow morning at the earliest. I need editorial approval. And if we print this and nothing happens—"\n\nShe lets the implication hang.`,
      options: [
        {
          id: 'push-for-online-immediate',
          label: '"Post it online now — nytimes.com. It doesn\'t have to be print."',
          description: '⏱ 2h | Digital story creates immediate pressure on authorities',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'media_pressure',
              resourceChanges: { time: -18, credibility: 20 },
            },
            {
              weight: 1,
              nextNodeId: 'journalist_editorial_block',
              resourceChanges: { time: -18, credibility: -5 },
            },
          ],
        },
        {
          id: 'journalist-and-fbi',
          label: 'Ask her to contact the FBI with her verification — as a journalist with a story',
          description: '⏱ 1h | Independent corroboration to the FBI is high value',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'journalist_fbi_pressure',
              resourceChanges: { time: -8, credibility: 15 },
            },
          ],
        },
      ],
    },

    journalist_editorial_block: {
      id: 'journalist_editorial_block',
      type: 'standard',
      act: 2,
      location: 'New York Times newsroom',
      activeNPC: 'Maya Chen',
      narrative: `"My editor won't run it without FBI confirmation. It's the paper's policy on terrorism reporting."\n\nMaya looks frustrated. "But I can call the FBI and tell them we're planning to run this story. That sometimes moves them."`,
      options: [
        {
          id: 'journalist-calls-fbi',
          label: 'Yes — have her call the FBI. Press inquiry sometimes unlocks bureaucracy.',
          description: '⏱ 2h | Journalists calling creates formal record',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'media_pressure',
              resourceChanges: { time: -18, credibility: 10 },
            },
          ],
        },
        {
          id: 'journalist-pivot',
          label: 'Thank her and go to the FBI yourself with her verification as backup',
          description: '⏱ 2h | Use her research to bolster your own FBI approach',
          costs: { time: -15, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_office',
              resourceChanges: { time: -15, credibility: 15 },
              revealKnowledge: ['hijacker-names', 'watchlist'],
            },
          ],
        },
      ],
    },

    journalist_fbi_pressure: {
      id: 'journalist_fbi_pressure',
      type: 'standard',
      act: 2,
      location: 'New York Times newsroom / phone',
      activeNPC: 'Maya Chen',
      narrative: `Chen calls the FBI press office and the counterterrorism desk simultaneously, saying the Times is planning to run a story about a specific terror plot.\n\nWithin 20 minutes, Agent Caldwell calls back — someone at the FBI saw the press inquiry.\n\n"The Times called us. What's going on? Who are you working with?"`,
      options: [
        {
          id: 'journalist-plus-fbi',
          label: 'Go to the FBI office now with Maya Chen as a witness',
          description: '⏱ 2h | Combined approach — media + law enforcement',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_watchlist_check',
              resourceChanges: { time: -18, credibility: 25 },
              revealKnowledge: ['hijacker-names', 'watchlist', 'flight-numbers'],
            },
          ],
        },
      ],
    },

    media_pressure: {
      id: 'media_pressure',
      type: 'standard',
      act: 3,
      location: 'Evening news cycle, NYC',
      activeNPC: null,
      narrative: `The story runs. The Times publishes online: "Possible Imminent Terror Plot: Sources Say Multiple Commercial Flights At Risk."\n\nCNN picks it up at 6 PM. NYPD and FBI are now getting calls from the Mayor's office.\n\nThe phone lines are jammed. There's a press conference being organized for 8 PM.\n\nBut grounding four specific flights requires someone with operational authority to actually do it.`,
      options: [
        {
          id: 'media-to-fbi',
          label: 'Use the media attention to get an emergency meeting at the FBI',
          description: '⏱ 2h | Public pressure creates political cover for the FBI to act',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -18, credibility: 15 },
            },
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -18, credibility: 5 },
            },
          ],
        },
        {
          id: 'media-to-airports',
          label: 'Call airports directly — the story gives you credibility now',
          description: '⏱ 1h | Airport security will be on high alert from news',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -8, credibility: 10 },
            },
          ],
        },
      ],
    },

    // ── LOGAN AIRPORT BRANCH ────────────────────────────────────────────────────

    logan_airport: {
      id: 'logan_airport',
      type: 'standard',
      act: 2,
      location: 'Logan International Airport, Boston',
      activeNPC: 'Security Supervisor at check-in',
      npcStats: { receptiveness: 40, authority: 50 },
      narrative: `It's 1 PM. You drove four hours. You're at Logan, Terminal B — where Flight 11 will board tomorrow.\n\nThe airport is normal. Nobody knows. The security supervisor you find is dismissive — they have a job to do.\n\n"Sir, if you have a specific threat, you call TSA. We don't handle threats directly at check-in."`,
      options: [
        {
          id: 'logan-specific-names',
          label: 'Give her Mohamed Atta\'s name and say he\'ll try to board tomorrow morning',
          description: '⏱ 30m | Specific and actionable — can flag his ID',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'logan_flag_passenger',
              resourceChanges: { time: -5, credibility: 15 },
              revealKnowledge: ['hijacker-names'],
            },
            {
              weight: 1,
              nextNodeId: 'logan_security_called',
              resourceChanges: { time: -5, freedom: -20 },
            },
          ],
        },
        {
          id: 'logan-find-manager',
          label: 'Bypass her — ask to speak to airport operations management',
          description: '⏱ 1h | Higher authority, but takes time',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'logan_manager',
              resourceChanges: { time: -8, credibility: 5 },
            },
          ],
        },
        {
          id: 'logan-act-suspicious',
          label: 'Pull a fire alarm or act out — force an emergency response',
          description: '⏱ 10m | Immediate chaos, but destroys your freedom',
          costs: { time: -3, credibility: -20, freedom: -50 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'detained',
              resourceChanges: { time: -3, credibility: -20, freedom: -50 },
            },
          ],
        },
      ],
    },

    logan_flag_passenger: {
      id: 'logan_flag_passenger',
      type: 'standard',
      act: 2,
      location: 'Logan Airport — security office',
      activeNPC: 'Airport Security Supervisor',
      narrative: `The supervisor flags Atta's name in their system. Her face changes.\n\n"There's a note on this person. He came up in a 2001 FAA no-fly review request — it was never actioned."\n\nShe's filing a security incident report. But Flight 11 is 18 hours away.`,
      options: [
        {
          id: 'logan-give-all-names',
          label: 'Give her all five Flight 11 names and ask for Flight 11 to be held',
          description: '⏱ 1h | Comprehensive action on the most dangerous flight',
          costs: { time: -8, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'logan_manager',
              resourceChanges: { time: -8, credibility: 20 },
              revealKnowledge: ['hijacker-names', 'flight-numbers'],
            },
          ],
        },
        {
          id: 'logan-call-fbi-from-here',
          label: 'Use the airport\'s authority to call FBI Boston Field Office directly',
          description: '⏱ 2h | More authoritative FBI referral from airport staff',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_escalation',
              resourceChanges: { time: -18, credibility: 30 },
              revealKnowledge: ['hijacker-names', 'watchlist', 'flight-numbers'],
            },
          ],
        },
      ],
    },

    logan_manager: {
      id: 'logan_manager',
      type: 'standard',
      act: 2,
      location: 'Logan Airport — operations office',
      activeNPC: 'Airport Operations Manager',
      narrative: `The operations manager, Phil Reardon, is more senior. He's listened to your account.\n\n"We can't unilaterally hold a flight. That's an FAA decision. But I can file an emergency security report that goes up the chain tonight."\n\nHe's cooperative but limited. The system has more friction than you expected.`,
      options: [
        {
          id: 'logan-request-faa',
          label: 'Ask him to trigger the emergency FAA security protocol',
          description: '⏱ 3h | Bypasses airline — goes straight to regulator',
          costs: { time: -25, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'faa_contact',
              resourceChanges: { time: -25, credibility: 20 },
              revealKnowledge: ['flight-numbers', 'timing'],
            },
          ],
        },
        {
          id: 'logan-return-nyc',
          label: 'Leave Logan and drive back to NYC to escalate through the FBI',
          description: '⏱ 4h travel | Pivot to higher-authority approach',
          costs: { time: -30, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'fbi_office',
              resourceChanges: { time: -30, credibility: 10 },
              revealKnowledge: ['flight-numbers'],
            },
          ],
        },
      ],
    },

    logan_security_called: {
      id: 'logan_security_called',
      type: 'snap',
      act: 2,
      location: 'Logan Airport — security checkpoint',
      activeNPC: 'Airport police officer',
      narrative: `Two airport police officers approach you.\n\n"Sir, we received a report that you've been making threatening claims about a flight. We need you to come with us."`,
      timer: 10,
      options: [
        {
          id: 'cooperate-airport-police',
          label: 'Cooperate fully',
          description: '🔓 -20% | ⏱ +1hr wait',
          costs: { time: -10, freedom: -20 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'detained_briefly',
              resourceChanges: { time: -10, freedom: -20, credibility: 5 },
            },
          ],
        },
        {
          id: 'run-airport',
          label: 'Run',
          description: '🔓 -50% | Fugitive status',
          costs: { time: 0, freedom: -50 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'detained',
              resourceChanges: { freedom: -50, credibility: -20 },
            },
          ],
        },
      ],
    },

    // ── FAA CONTACT ─────────────────────────────────────────────────────────────

    faa_contact: {
      id: 'faa_contact',
      type: 'standard',
      act: 3,
      location: 'FAA Eastern Region Security (by phone)',
      activeNPC: 'FAA Security Director',
      narrative: `It's late evening. Through a chain of calls, you've reached the FAA Eastern Region Security Director.\n\nHe's measured. "We've received referrals from both an airline and a federal agency about this. That's unusual. Walk me through the specifics again."\n\nHe has the authority to issue an emergency security hold on specific flights.`,
      options: [
        {
          id: 'faa-full-details',
          label: 'Give the full operational briefing: all four flights, all names, exact timing',
          description: '⏱ 45m | Maximum information = maximum action',
          costs: { time: -7, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -7, credibility: 15 },
            },
            {
              weight: 1,
              requirements: { minCredibility: 75 },
              nextNodeId: 'outcome_full_prevention',
              resourceChanges: { time: -7, credibility: 20 },
            },
          ],
        },
        {
          id: 'faa-two-flights',
          label: 'Focus on American 11 and 77 — the planes that hit the towers',
          description: '⏱ 30m | Targeted — very likely to succeed',
          costs: { time: -5, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -5, credibility: 10 },
            },
          ],
        },
      ],
    },

    // ── PIVOT / DETAINED NODES ──────────────────────────────────────────────────

    pivot_choice: {
      id: 'pivot_choice',
      type: 'standard',
      act: 2,
      location: 'Midtown Manhattan',
      activeNPC: null,
      narrative: `You're back to square one, but it's now afternoon. Time is slipping.\n\nYou still have options. You just need to move fast.`,
      options: [
        {
          id: 'pivot-to-fbi',
          label: 'Go to the FBI Field Office',
          description: '⏱ 1.5h',
          costs: { time: -12 },
          outcomes: [{ weight: 1, nextNodeId: 'fbi_office', resourceChanges: { time: -12 } }],
        },
        {
          id: 'pivot-to-journalist',
          label: 'Contact a journalist',
          description: '⏱ 45m',
          costs: { time: -7 },
          outcomes: [{ weight: 1, nextNodeId: 'journalist', resourceChanges: { time: -7 } }],
        },
        {
          id: 'pivot-to-airports',
          label: 'Call the airports directly',
          description: '⏱ 30m',
          costs: { time: -5 },
          outcomes: [{ weight: 1, nextNodeId: 'airlines_call', resourceChanges: { time: -5 } }],
        },
      ],
    },

    detained_briefly: {
      id: 'detained_briefly',
      type: 'standard',
      act: 2,
      location: 'Airport security holding room',
      activeNPC: 'Airport Police Sergeant',
      narrative: `You're held for 90 minutes. The sergeant questions you. When you give him Atta's name, he makes a call.\n\nHe returns. "We've passed your information to the FBI. You're free to go. But sir — if this is false, we'll find you."\n\nYou've lost time, but your information is now in official channels.`,
      options: [
        {
          id: 'leave-airport',
          label: 'Leave Logan and continue your mission',
          description: '⏱ Released | Your info is in the system now',
          costs: { time: -2 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'pivot_choice',
              resourceChanges: { time: -2, credibility: 10 },
              revealKnowledge: ['hijacker-names'],
            },
          ],
        },
      ],
    },

    detained: {
      id: 'detained',
      type: 'standard',
      act: 3,
      location: 'NYPD holding cell / airport detention',
      activeNPC: null,
      narrative: `You're under arrest. Suspected of making terroristic threats or disorderly conduct. A lawyer is being called.\n\nYou have your knowledge but no way to act on it. You can try to convince whoever comes to question you — but time is running out.\n\nThrough the cell window, you watch the sun set on September 10th.`,
      options: [
        {
          id: 'detained-tell-everything',
          label: 'Tell the interrogating officer everything — all facts, all flights',
          description: '⏱ 2h | Last desperate attempt from inside a cell',
          costs: { time: -18, credibility: 0, freedom: 0 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_failed',
              resourceChanges: { time: -18, credibility: -10 },
            },
            {
              weight: 1,
              requirements: { minCredibility: 50 },
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -18, credibility: 15 },
            },
          ],
        },
        {
          id: 'detained-lawyer',
          label: 'Wait for lawyer — use the legal process',
          description: '⏱ 4h | Safe, but may run out of time',
          costs: { time: -30, freedom: 0, credibility: 0 },
          outcomes: [
            { weight: 1, nextNodeId: 'outcome_failed', resourceChanges: { time: -30 } },
          ],
        },
      ],
    },

    // ── SNAP DECISIONS ──────────────────────────────────────────────────────────

    snap_morning_rush: {
      id: 'snap_morning_rush',
      type: 'snap',
      act: 3,
      location: 'It\'s 5:45 AM — September 11th',
      activeNPC: null,
      narrative: `Your phone rings. It's Baxter. "The Director's office won't act until we have more corroboration. The flights board in two hours."\n\nYou have one last move.`,
      timer: 10,
      options: [
        {
          id: 'snap-call-airports-direct',
          label: 'Call airports directly — final warning',
          description: '⏱ 30m | Bypass the FBI',
          costs: { time: -5 },
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -5, credibility: 5 },
            },
            {
              weight: 1,
              requirements: { minCredibility: 65 },
              nextNodeId: 'outcome_all_flights_grounded',
              resourceChanges: { time: -5, credibility: 10 },
            },
          ],
        },
        {
          id: 'snap-go-to-airport-physical',
          label: 'Rush to JFK/Newark physically',
          description: '🔓 risk | Try to physically stop boarding',
          costs: { time: -8, freedom: -20 },
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome_partial_success',
              resourceChanges: { time: -8, freedom: -20 },
            },
          ],
        },
      ],
    },

    // ── OUTCOMES ────────────────────────────────────────────────────────────────

    outcome_failed: {
      id: 'outcome_failed',
      type: 'outcome',
      title: 'September 11, 2001 — 8:46 AM',
      narrative: `Flight 11 hits the North Tower at 8:46 AM. You were unable to stop it.\n\nThe attacks unfold exactly as history recorded.`,
      livesSaved: 0,
      maxLives: 2977,
      stars: 1,
      historical: 'The September 11 attacks killed 2,977 people across four hijacked flights and three target sites.',
      epilogue: 'The system failed not for lack of warning, but for lack of a mechanism to act on warnings that came from outside official channels.',
      achievements: [],
    },

    outcome_partial_success: {
      id: 'outcome_partial_success',
      type: 'outcome',
      title: 'September 11, 2001 — Partial Intervention',
      narrative: `One or two of the flights are grounded or delayed. The attacks are disrupted but not fully stopped. Hundreds of lives are saved, but the day still ends in tragedy.\n\nThe news is chaotic. Investigators will spend weeks piecing together what went wrong — and what you almost prevented.`,
      livesSaved: 800,
      maxLives: 2977,
      stars: 3,
      historical: 'Multiple post-9/11 investigations found that the intelligence existed to potentially stop the attacks. The barriers were institutional, not informational.',
      epilogue: 'Partial success becomes the seed of complete reform. The 9/11 Commission Report is far more damning. The intelligence community is restructured faster and more thoroughly.',
      achievements: [{ id: 'close-call', label: 'Close Call', description: 'Prevented at least one attack.' }],
    },

    outcome_all_flights_grounded: {
      id: 'outcome_all_flights_grounded',
      type: 'outcome',
      title: 'September 10–11, 2001 — All Flights Grounded',
      narrative: `By 11 PM on September 10th, all four flights have been flagged. By 4 AM, the FBI has issued an emergency security notice to the FAA.\n\nFlight 11 never boards. Neither does 175, 77, or 93. Nineteen men are detained or questioned at four airports.\n\nThe morning of September 11, 2001 passes quietly.`,
      livesSaved: 2977,
      maxLives: 2977,
      stars: 4,
      historical: 'The intelligence failures before 9/11 were not for lack of information, but for lack of information-sharing across agencies. The CIA knew about two hijackers. The FBI field office in Minneapolis had arrested Moussaoui weeks earlier.',
      epilogue: 'The 19 men are connected to Al-Qaeda. The investigation uncovers broader network activity. The United States enters a period of intense intelligence reform — without the defining trauma of the towers falling.',
      achievements: [
        { id: 'all-flights-stopped', label: 'All Flights Grounded', description: 'Prevented all four hijackings.' },
        { id: 'cassandra-heard', label: 'Cassandra Heard', description: 'You were believed in time.' },
      ],
    },

    outcome_full_prevention: {
      id: 'outcome_full_prevention',
      type: 'outcome',
      title: 'September 11, 2001 — The Morning That Wasn\'t',
      narrative: `All four flights are grounded. The 19 hijackers are detained. By dawn on September 11, a joint FBI-CIA task force is already connecting the network.\n\nThe morning of September 11, 2001 passes in quiet. Office workers arrive at the World Trade Center. The Pentagon opens for business. A Tuesday morning in New York City, nothing more.\n\nYou watch the towers from Central Park. They gleam in the September sun.`,
      livesSaved: 2977,
      maxLives: 2977,
      stars: 5,
      historical: 'In the alternate timeline: Without the 9/11 attacks, the War on Terror takes a dramatically different form. No invasion of Afghanistan in October 2001. No Iraq War in 2003. The geopolitical history of the 21st century pivots on this morning.',
      epilogue: 'The butterfly effect is enormous. You prevented 2,977 deaths — and set in motion a cascade of changes whose full scope may never be known. Was it enough? Was it too much? The question of what you changed haunts you longer than the tragedy you prevented.',
      achievements: [
        { id: 'full-prevention', label: 'Foreknowledge', description: 'Achieved complete prevention with intelligence alone.' },
        { id: 'all-flights-stopped', label: 'All Flights Grounded', description: 'Prevented all four hijackings.' },
        { id: 'cassandra-heard', label: 'Cassandra Heard', description: 'You were believed in time.' },
        { id: 'the-journalist', label: 'The Journalist', description: 'Used media as primary lever.' },
      ],
    },
  },
};

// Alias for mismatched node IDs (handles both snake_case and camelCase keys in tree)
septemberMorning.nodes['fbi-office'] = septemberMorning.nodes['fbi_office'];
septemberMorning.nodes['airlines-call'] = septemberMorning.nodes['airlines_call'];
septemberMorning.nodes['fbi_names_hit'] = septemberMorning.nodes['fbi_names_hit'];
