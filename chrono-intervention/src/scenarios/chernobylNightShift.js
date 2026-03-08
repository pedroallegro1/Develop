// SCENARIO: Chernobyl — The Night Shift
// Difficulty: Hard | Start: April 25, 1986, ~7:00 AM | ~18 hours before explosion

export const chernobylNightShift = {
  id: 'chernobyl-night-shift',
  title: 'The Night Shift',
  subtitle: 'April 25, 1986 — Chernobyl Nuclear Power Plant, Ukrainian SSR',
  difficulty: 'Hard',
  tagline: 'You know what happens at 1:23 AM. The reactor does not care that no one believes you.',
  historicalContext:
    'On April 26, 1986 at 1:23 AM, Reactor No. 4 at the Chernobyl Nuclear Power Plant exploded during a poorly managed safety test. The RBMK reactor\'s fatal design flaw — a positive void coefficient that increased reactivity as coolant boiled away — combined with disabled safety systems and an undertrained night crew produced the worst nuclear accident in history. 31 people died in the immediate aftermath; hundreds of thousands were exposed to dangerous radiation. The city of Pripyat, 3 km away, was not evacuated for 36 hours.',
  startNodeId: 'intro',
  startingResources: {
    time: 90,        // ~18 hours remaining
    credibility: 25, // Junior deputy staff, new to night shift
    freedom: 90,     // KGB has not noticed you yet
  },
  timeLabel: '~18 hours remaining',

  knowledgeInventory: [
    {
      id: 'reactor-design',
      label: 'RBMK positive void coefficient flaw',
      credibilityValue: 'very high',
      revealed: false,
    },
    {
      id: 'test-procedure',
      label: "Tonight's test disables safety systems at low power",
      credibilityValue: 'high',
      revealed: false,
    },
    {
      id: 'timing',
      label: 'Explosion: ~1:23 AM, April 26',
      credibilityValue: 'high',
      revealed: false,
    },
    {
      id: 'evacuation-zone',
      label: 'Pripyat (50,000 residents) within lethal fallout radius',
      credibilityValue: 'medium',
      revealed: false,
    },
    {
      id: 'operators',
      label: 'Dyatlov will override safety objections and force the test',
      credibilityValue: 'medium',
      revealed: false,
    },
  ],

  nodes: {

    // ── ACT 1: THE MORNING SHIFT BEGINS ────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'April 25, 1986 — 7:04 AM',
      narrative:
        'The control room of Reactor No. 4 hums with the mundane routine of a Soviet morning shift. Fluorescent lights wash everything in a pale institutional grey. On the console, the RBMK-1000\'s instruments tick steadily — 3,200 megawatts thermal, nominal. You are Viktor Semenov, deputy shift foreman, twenty-nine years old, three years at Chernobyl. You know something no one else in this building knows: tonight\'s safety test will destroy this reactor and kill everyone who fights the fire. You have eighteen hours. The shift supervisor, Aleksandr Akimov, reviews the day\'s schedule with practiced indifference. Tonight, they will run the turbine run-down test that has been postponed four times already. Moscow wants it done before the scheduled maintenance shutdown. The test will require disabling the emergency core cooling system. At low power. With a design flaw that your superiors have never been told about. You sit down at your station. Your hands are steady. They won\'t stay that way.',
      options: [
        {
          id: 'intro-opt-review',
          label: 'Review the test procedure documents carefully',
          description: 'Study the test protocol on file to build a factual case before you speak to anyone.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'initial-choice',
              resourceChanges: { time: -5, credibility: +8 },
              narrativeResult: 'You spend an hour with the test documents. The safety violations are explicit, in writing, signed by Dyatlov. You now have specifics.',
              revealKnowledge: ['test-procedure'],
            },
          ],
        },
        {
          id: 'intro-opt-colleague',
          label: 'Quietly confide in a trusted colleague',
          description: 'There is one engineer on shift who you know to be honest — Leonid Toptunov, a reactor control operator. Sound him out.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'initial-choice',
              resourceChanges: { time: -3, credibility: +5, freedom: -5 },
              narrativeResult: 'Toptunov listens with pale-faced seriousness. He does not dismiss you. He says: "Then we must tell someone." He is frightened. So are you.',
              revealKnowledge: ['operators'],
            },
            {
              weight: 1,
              nextNodeId: 'initial-choice',
              resourceChanges: { time: -3, credibility: -5, freedom: -10 },
              narrativeResult: 'Toptunov goes silent and then walks away. An hour later you notice him speaking to Dyatlov\'s secretary. The walls have ears here.',
            },
          ],
        },
        {
          id: 'intro-opt-wait',
          label: 'Wait and observe — let the morning unfold',
          description: 'Do nothing yet. Gather your composure and assess who is in the building today before you act.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'initial-choice',
              resourceChanges: { time: -8 },
              narrativeResult: 'You watch. The morning shift carries on with orderly Soviet normalcy. Time passes. The clock does not stop for caution.',
            },
          ],
        },
      ],
    },

    'initial-choice': {
      id: 'initial-choice',
      type: 'standard',
      act: 1,
      title: 'The Morning Window',
      narrative:
        'It is approaching 9 AM. The day shift is fully staffed and the plant is calm. Anatoly Dyatlov, deputy chief engineer and the man who will personally supervise tonight\'s test, arrives in the plant with the impatient energy of someone who has been waiting to finish a delayed task. He radiates the quiet authority of a man who does not expect to be questioned. Across the Soviet Union, the morning is ordinary. In Pripyat, children are going to school three kilometers away. You have a decision that will define everything that follows: where do you direct your first real effort?',
      options: [
        {
          id: 'ic-opt-dyatlov',
          label: 'Confront Dyatlov directly about the test risks',
          description: 'Go straight to the source. Dyatlov is arrogant, but he is also the decision-maker for tonight.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'confront-dyatlov',
              resourceChanges: { time: -5 },
            },
          ],
        },
        {
          id: 'ic-opt-director',
          label: 'Seek out Plant Director Brukhanov',
          description: 'Bypass Dyatlov and go to Viktor Brukhanov, the plant director — a bureaucrat who fears Moscow more than physics.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'brukhanov-meeting',
              resourceChanges: { time: -8 },
            },
          ],
        },
        {
          id: 'ic-opt-sabotage',
          label: 'Begin planning to sabotage the test equipment',
          description: 'If no one will stop the test through official channels, perhaps you can manufacture a technical fault that halts it on its own.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'sabotage-planning',
              resourceChanges: { time: -5 },
            },
          ],
        },
        {
          id: 'ic-opt-moscow',
          label: 'Try to contact Moscow — the nuclear regulator or the ministry',
          description: 'Escalate above the plant entirely. The IAEA does not exist here, but SNIIP, Gosatomenergonadzor, and the Ministry of Energy do.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'contact-moscow',
              resourceChanges: { time: -10 },
            },
          ],
        },
      ],
    },

    // ── ACT 2: ESCALATION AND CHOICES ──────────────────────────────────────────

    'confront-dyatlov': {
      id: 'confront-dyatlov',
      type: 'standard',
      act: 2,
      title: 'Dyatlov\'s Office',
      narrative:
        'Dyatlov\'s office smells of cigarettes and authority. He does not look up from his papers when you enter. His desk is covered with the test program — a hundred-page document he has been refining for months, shaped to satisfy a Moscow directive. You lay out your concern: the RBMK\'s positive void coefficient, the danger of running the test at low power with the emergency core cooling system disabled, the risk of a prompt criticality event. For a moment Dyatlov is absolutely still. Then he looks at you with the flat expression of a man who has survived worse inconveniences than you. "The test program was reviewed and approved by the institute," he says. "You are confusing your personal anxiety with engineering. This conversation is over."',
      options: [
        {
          id: 'cd-opt-escalate',
          label: 'Escalate further — insist and ask him to document his refusal',
          description: 'Demand that he put his dismissal of your concerns in writing, which creates a paper trail and may make him hesitate.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'brukhanov-meeting',
              resourceChanges: { time: -5, credibility: +10, freedom: -15 },
              narrativeResult: 'Dyatlov is furious. He refuses to write anything. But you have demonstrated, to yourself and to anyone watching, that you raised the alarm. He will not forget this.',
              revealKnowledge: ['reactor-design'],
            },
            {
              weight: 1,
              nextNodeId: 'brukhanov-meeting',
              resourceChanges: { time: -5, credibility: +5, freedom: -25 },
              narrativeResult: 'Dyatlov picks up his phone before you finish speaking. You hear the word "transfer" mentioned to whoever he calls. You have perhaps twelve hours before that paperwork arrives.',
              revealKnowledge: ['reactor-design'],
            },
          ],
        },
        {
          id: 'cd-opt-back-down',
          label: 'Back down and look for another angle',
          description: 'Dyatlov cannot be moved here. Retreat without burning the bridge and pursue a different path.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -5, credibility: -5, freedom: +5 },
              narrativeResult: 'You mumble something about reviewing the test protocol again and leave. Dyatlov\'s eyes follow you out. You are not yet a threat, but you are on his radar.',
            },
          ],
        },
        {
          id: 'cd-opt-physics',
          label: 'Press the technical argument — make him engage with the physics',
          description: 'Force the conversation onto the positive void coefficient specifically. If he truly understands it, he may pause.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -8, credibility: +15, freedom: -10 },
              narrativeResult: 'Dyatlov engages, briefly, with genuine contempt. "The reactor is stable at low power. The coefficient is within operating parameters." He is wrong, and you both know it, but he has decided not to know it.',
              revealKnowledge: ['reactor-design', 'test-procedure'],
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -8, credibility: +5, freedom: -20 },
              narrativeResult: 'He listens to three sentences and then dismisses you with a wave. But a second engineer in the room — you did not notice him — has heard everything.',
              revealKnowledge: ['reactor-design'],
            },
          ],
        },
      ],
    },

    'brukhanov-meeting': {
      id: 'brukhanov-meeting',
      type: 'standard',
      act: 2,
      title: 'The Director\'s Corridor',
      narrative:
        'Viktor Brukhanov runs Chernobyl the way a Soviet factory manager runs a quota system: numbers in, numbers out, problems smoothed before they reach Moscow. His office is decorated with commendations and a framed photograph of him shaking hands with a party official. His secretary tells you he is in a phone meeting. You wait forty minutes on a wooden chair. When Brukhanov finally receives you, he hears you out with the patient expression of a man counting down the seconds until you leave. "If there were a design problem with the RBMK," he says carefully, "it would have been identified by the design bureau. I trust the design bureau." The subtext is clear: this conversation could embarrass the plant, the ministry, and the party if it went anywhere. None of those things are going to happen.',
      options: [
        {
          id: 'bm-opt-formal',
          label: 'Submit a formal written safety objection',
          description: 'Ask for a written safety concern form and file it through official channels — a slow bureaucratic process, but one that creates a record.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -10, credibility: +12, freedom: -10 },
              narrativeResult: 'The form is accepted with visible discomfort. It will be filed somewhere. Whether it is read before 1 AM is a different question entirely.',
              revealKnowledge: ['test-procedure'],
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -10, credibility: +5, freedom: -20 },
              narrativeResult: 'Brukhanov\'s secretary takes your form and places it face-down in a tray. Brukhanov himself calls Dyatlov within the hour. The conversation is brief.',
            },
          ],
        },
        {
          id: 'bm-opt-evacuation',
          label: 'Warn Brukhanov that Pripyat may need to be evacuated',
          description: 'Shift the conversation from reactor physics to civil consequences — 50,000 civilians three kilometers away.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -8, credibility: -10, freedom: -20 },
              narrativeResult: 'Brukhanov\'s face goes red. "Evacuate Pripyat?" he repeats, very quietly. "Do you understand what you are suggesting? The panic alone—" He does not finish the sentence. He calls someone. You leave quickly.',
              revealKnowledge: ['evacuation-zone'],
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -8, credibility: +8, freedom: -15 },
              narrativeResult: 'Brukhanov\'s composure cracks, just slightly. He asks you to write down the specific parameters that concern you. It is more than you expected.',
              revealKnowledge: ['evacuation-zone', 'timing'],
            },
          ],
        },
        {
          id: 'bm-opt-leave',
          label: 'Leave and pursue other channels',
          description: 'Brukhanov will not act. Cut your losses and seek another route.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -5 },
              narrativeResult: 'You shake his hand and walk back into the corridor. The institutional smell of the plant — machine oil and concrete — feels heavier than it did this morning.',
            },
          ],
        },
      ],
    },

    'sabotage-planning': {
      id: 'sabotage-planning',
      type: 'standard',
      act: 2,
      title: 'The Engine Room — 11:40 AM',
      narrative:
        'The turbine hall adjacent to Reactor 4 is enormous and loud. The safety test is designed to measure whether a spinning-down turbine can generate enough electricity to power the emergency cooling pumps during the brief gap before backup diesels start. The test\'s instrumentation suite — the equipment that records the turbine\'s output — is already installed and calibrated. If it were to malfunction, the test could not proceed. You know which components are critical. You also know that the plant has KGB-adjacent security staff, that every room has eyes, and that deliberate sabotage of Soviet state property carries a sentence in the order of ten years. Your hands are damp. The engineering is simple. The consequences are not.',
      options: [
        {
          id: 'sp-opt-instrument',
          label: 'Subtly miscalibrate the test instrumentation',
          description: 'A small, undetectable adjustment to the turbine measurement equipment — it will produce readings that make the test results invalid.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'sabotage-executed',
              resourceChanges: { time: -15, credibility: +5, freedom: -20 },
              narrativeResult: 'Your hands are steady. The adjustment takes eleven minutes. No one sees it. You walk away and do not look back.',
            },
            {
              weight: 1,
              nextNodeId: 'sabotage-discovered',
              resourceChanges: { time: -15, credibility: -10, freedom: -35 },
              narrativeResult: 'A technician enters the room three minutes into your work. He does not understand what he sees, but he remembers your face.',
            },
          ],
        },
        {
          id: 'sp-opt-coolant',
          label: 'Trigger a spurious coolant system alarm',
          description: 'A false fault in the primary cooling circuit would force a mandatory inspection, delaying the test by hours.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'sabotage-executed',
              resourceChanges: { time: -10, credibility: 0, freedom: -15 },
              narrativeResult: 'The alarm light blinks on in the control room at 12:47 PM. You hear Dyatlov curse from the corridor. The mandatory check will take at least three hours.',
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -10, credibility: -8, freedom: -20 },
              narrativeResult: 'The alarm triggers, but a sharp-eyed technician diagnoses it as spurious within forty minutes and traces the circuit path — toward your station. You are questioned. You deny everything. They believe you, barely.',
            },
          ],
        },
        {
          id: 'sp-opt-abort',
          label: 'Decide against sabotage — too dangerous',
          description: 'The risk of discovery and arrest is too high. If you are imprisoned tonight, you save no one.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -5 },
              narrativeResult: 'You put the tools back in your pocket and walk away. The right decision, perhaps. But the reactor does not know the difference.',
            },
          ],
        },
      ],
    },

    'contact-moscow': {
      id: 'contact-moscow',
      type: 'standard',
      act: 2,
      title: 'The Administrative Telephone — 9:55 AM',
      narrative:
        'There are several entities in Moscow who theoretically have authority over nuclear plant operations: the Ministry of Energy and Electrification, the USSR State Committee for the Supervision of Safety in Industry and Nuclear Power (Gosatomenergonadzor), and the Kurchatov Institute, which designed the RBMK. You are a deputy shift foreman. To reach any of these offices from a plant telephone requires permission from the shift supervisor, which means Dyatlov will know within hours. You could also call from the post office in Pripyat during your lunch break, but it would cost you time and your absence would be noticed. Valery Legasov, the nuclear chemist who will later lead the accident investigation, is in Moscow today. You do not know his direct number. The operator can connect you to the Kurchatov Institute.',
      options: [
        {
          id: 'cm-opt-kurchatov',
          label: 'Call the Kurchatov Institute directly',
          description: 'Request an urgent connection to the institute that designed the RBMK and report the specific safety concern about the void coefficient.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -12, credibility: +15, freedom: -15 },
              narrativeResult: 'A junior researcher takes your call and says someone will follow up. You have no way of knowing if anyone ever does. But it is now in the record.',
              revealKnowledge: ['reactor-design', 'timing'],
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -12, credibility: +5, freedom: -25 },
              narrativeResult: 'The connection is poor and the call is cut off twice. The third time, a brusque official voice asks for your name and position. You give them. He says he will "pass it along." Dyatlov calls you into his office that afternoon.',
              revealKnowledge: ['timing'],
            },
          ],
        },
        {
          id: 'cm-opt-ministry',
          label: 'Report to the Ministry of Energy via plant channels',
          description: 'File a report through the official plant-to-ministry communication chain — slower, but formally sanctioned.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -15, credibility: +10, freedom: -10 },
              narrativeResult: 'The report is logged. A ministry duty officer reads back your concern in a flat voice and says it will be reviewed. The ministry will review it approximately one week from now.',
              revealKnowledge: ['test-procedure'],
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -15, credibility: +18, freedom: -20 },
              narrativeResult: 'Unexpectedly, the duty officer escalates your call to a senior engineer, who asks three sharp questions and seems genuinely alarmed. He says he will call the plant director. You do not know what happens next.',
              revealKnowledge: ['test-procedure', 'reactor-design'],
            },
          ],
        },
        {
          id: 'cm-opt-pribyi',
          label: 'Call from the Pripyat post office on your lunch break',
          description: 'Leave the plant, walk to Pripyat, and call from a civilian telephone — slower but harder to trace.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -20, credibility: +8, freedom: +5 },
              narrativeResult: 'The post office clerk watches you dial Moscow with mild curiosity. The call goes through. You speak for six minutes to a recorded answering service at Gosatomenergonadzor. Whether a human being ever hears it remains unknown.',
              revealKnowledge: ['timing', 'evacuation-zone'],
            },
          ],
        },
      ],
    },

    'sabotage-executed': {
      id: 'sabotage-executed',
      type: 'standard',
      act: 2,
      title: 'The Waiting Game — 2:00 PM',
      narrative:
        'The test has been delayed. Your interference — whether the miscalibrated instruments or the false alarm — has bought time. Dyatlov is visibly agitated. He conferred with the shift supervisor twice in the past hour. The Kyiv regional grid controller, who must approve a power reduction for the test, has not given clearance and Dyatlov cannot proceed without it. The test sits in suspension. Around the plant, engineers go about their afternoon routines with no knowledge of any of this. In Pripyat, children are coming home from school. The delay is real, but it is not a cancellation. Dyatlov will find a way to run the test tonight. You have bought hours, not salvation.',
      options: [
        {
          id: 'se-opt-more',
          label: 'Push further — look for another delay tactic',
          description: 'The delay buys time but not safety. Find another way to extend or deepen the obstruction.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -8, credibility: +5, freedom: -10 },
              narrativeResult: 'You identify a second point of vulnerability in the test program. The evening shift transition is at 11 PM — a handover moment when responsibility is diffuse and no one is watching everything.',
            },
          ],
        },
        {
          id: 'se-opt-warn',
          label: 'Use the delay to warn the Pripyat authorities',
          description: 'The test is stalled. Use this window to contact civil defense or city officials in Pripyat about a potential emergency.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'warn-pripyat',
              resourceChanges: { time: -10, freedom: -15 },
            },
          ],
        },
        {
          id: 'se-opt-observe',
          label: 'Observe and keep your head down for now',
          description: 'You have done something. Rest, watch, and let the delay work. You can act again this evening.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -5, freedom: +5 },
              narrativeResult: 'The afternoon passes with grim quietness. The test remains delayed. Dyatlov drinks tea and makes phone calls. The reactor hums.',
            },
          ],
        },
      ],
    },

    'sabotage-discovered': {
      id: 'sabotage-discovered',
      type: 'standard',
      act: 2,
      title: 'Questioned — 1:17 PM',
      narrative:
        'You are in Dyatlov\'s office again, but this time you did not choose to be here. Dyatlov does not accuse you directly. He asks, in the tone of a man who already knows the answer, whether you have been in the turbine hall today. You say yes — standard inspection. He holds your gaze for a long moment. The plant\'s security officer, a man named Sitnikov who wears his authority in the fit of his collar, stands near the door. They cannot prove anything. Not yet. But the atmosphere in this room has the density of a pre-arrest. You are running out of room to maneuver.',
      options: [
        {
          id: 'sd-opt-deny',
          label: 'Deny everything and act normal',
          description: 'Hold the line. They have no evidence. Behave with professional calm.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { time: -5, credibility: -10, freedom: -15 },
              narrativeResult: 'They let you go. The technician\'s testimony is uncertain. But you are watched for the rest of the day. Every move you make in this plant is now observed.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-silenced',
              resourceChanges: { freedom: -40 },
              narrativeResult: 'Sitnikov produces a handwritten statement from the technician. The timing is too precise to be coincidence. Within two hours, you are escorted off the plant premises.',
            },
          ],
        },
        {
          id: 'sd-opt-confess',
          label: 'Confess and explain why — make the safety argument your defense',
          description: 'Tell the truth about what you did and why, on the record, in front of witnesses.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome-silenced',
              resourceChanges: { credibility: +5, freedom: -50 },
              narrativeResult: 'You speak for four minutes about the positive void coefficient. Dyatlov listens with the expression of a man watching a junior colleague commit professional suicide. Sitnikov makes notes. You are relieved of duty pending investigation.',
            },
            {
              weight: 1,
              nextNodeId: 'mid-day-decision',
              resourceChanges: { credibility: +20, freedom: -30 },
              narrativeResult: 'Your confession and the technical detail you provide create an uncomfortable moment. Another senior engineer in the room says he wants the test reviewed. Dyatlov overrules him. But you remain on shift, for now.',
              revealKnowledge: ['reactor-design', 'test-procedure'],
            },
          ],
        },
      ],
    },

    'mid-day-decision': {
      id: 'mid-day-decision',
      type: 'standard',
      act: 2,
      title: 'Afternoon — 3:30 PM',
      narrative:
        'The afternoon shift settles into its rhythms. Dyatlov has scheduled the reactor power reduction for this evening — the first step toward the test. At 12:28 PM, the Kyiv regional grid controller asked the plant to keep Reactor 4 running at full power due to unexpected electricity demand, pushing the test back several hours. This is a real event, an accidental delay not of your making. But it will end. By 11 PM the control room will be running the power reduction. The test is now planned for the small hours of April 26. You have time still, but it is narrowing like a corridor. What do you do with the afternoon?',
      options: [
        {
          id: 'mdd-opt-warn-pripyat',
          label: 'Go to Pripyat and warn the civil authorities',
          description: 'Take your lunch break and find the Pripyat city executive committee or civil defense office.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'warn-pripyat',
              resourceChanges: { time: -12 },
            },
          ],
        },
        {
          id: 'mdd-opt-night-plan',
          label: 'Prepare to intervene during the test itself — that night',
          description: 'Abandon daytime escalation and plan for a direct intervention at the control console when the test begins.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10 },
            },
          ],
        },
        {
          id: 'mdd-opt-legasov',
          label: 'Try again to reach a senior nuclear scientist',
          description: 'Make one more attempt to contact someone at the Kurchatov Institute or the Academy of Sciences who understands RBMK design.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -15, credibility: +12, freedom: -10 },
              narrativeResult: 'You reach a physicist at the institute named Dollezhal who designed the RBMK. He is quiet for a long moment on the phone. He says: "I know about the coefficient. So do others. But it has been decided that the reactors are safe." That is all he says.',
              revealKnowledge: ['reactor-design'],
            },
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -15, credibility: +20, freedom: -20 },
              narrativeResult: 'You manage to reach someone at the Academy of Sciences who is alarmed enough to say they will contact the ministry tonight. You do not know if they do. But you are not alone.',
              revealKnowledge: ['reactor-design', 'test-procedure'],
            },
          ],
        },
        {
          id: 'mdd-opt-kgb',
          label: 'Contact the KGB office in Pripyat',
          description: 'A drastic and dangerous move — but the KGB monitors nuclear facilities and has its own lines to Moscow.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'kgb-contact',
              resourceChanges: { time: -10 },
            },
          ],
        },
      ],
    },

    'warn-pripyat': {
      id: 'warn-pripyat',
      type: 'standard',
      act: 2,
      title: 'Pripyat City Executive Committee — 4:15 PM',
      narrative:
        'Pripyat is a model Soviet city, built for the plant workers and their families, clean-lined and functional, with a funfair beside the river that opened just last week. The executive committee offices are on Lenin Avenue. The chairman, a party man named Voloshko, receives you in his conference room with the guarded hospitality of someone who suspects a test or a complaint. You explain: there is a safety test scheduled tonight at Reactor 4. If it goes wrong, the city must be ready to evacuate. The Soviet protocol for nuclear accidents is specific — information flows upward, not outward. Pripyat has no independent evacuation authority. Voloshko\'s expression goes from guarded to genuinely frightened to carefully neutral. "This," he says, "should go through the plant director."',
      options: [
        {
          id: 'wp-opt-convince',
          label: 'Push him harder — give him the specific details',
          description: 'Tell Voloshko the timing, the mechanism, the radiation risk. Make it impossible to dismiss.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +10, freedom: -15 },
              narrativeResult: 'Voloshko makes notes. He says he will "consult" with his superiors. He asks if you are speaking as an official representative of the plant. You say no. He files the notes in a drawer. But a seed of alarm has been planted.',
              revealKnowledge: ['evacuation-zone', 'timing'],
            },
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +5, freedom: -25 },
              narrativeResult: 'Voloshko\'s deputy calls the plant as soon as you leave. Dyatlov calls it an unauthorized communication and files a formal complaint. Your freedom to move within the plant that evening will be restricted.',
              revealKnowledge: ['evacuation-zone'],
            },
          ],
        },
        {
          id: 'wp-opt-prepare',
          label: 'Ask him to quietly pre-position evacuation buses',
          description: 'Instead of asking for formal action, ask for a discreet operational precaution — buses staged, fuel ready, drivers on standby.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +15, freedom: -10 },
              narrativeResult: 'Voloshko is quiet for a long moment. Then: "I can arrange for vehicle maintenance tonight." He does not say more. You understand. If something happens, buses will be available two hours faster.',
              revealKnowledge: ['evacuation-zone', 'timing'],
            },
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +5, freedom: -5 },
              narrativeResult: 'Voloshko says he cannot act on unofficial information. He walks you to the door personally.',
            },
          ],
        },
        {
          id: 'wp-opt-leave',
          label: 'Leave — he will not act',
          description: 'Voloshko is paralyzed by Soviet institutional inertia. Do not waste more time here.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -5 },
              narrativeResult: 'The walk back to the plant takes twenty minutes. The city looks ordinary: couples on benches, children on bicycles, a man selling newspapers near the bus stop. They do not know.',
            },
          ],
        },
      ],
    },

    'kgb-contact': {
      id: 'kgb-contact',
      type: 'standard',
      act: 2,
      title: 'The KGB Office — 5:40 PM',
      narrative:
        'The KGB\'s local office in Pripyat is unmarked. Every plant employee knows where it is. Entering voluntarily is one of those acts that people remember about you. The duty officer, a heavyset man who gives only his rank and not his name, listens to you with the practiced blankness of someone trained to receive unexpected information without revealing reaction. The KGB monitors nuclear facilities for ideological deviation, sabotage, and foreign intelligence contact. A credible warning about a safety catastrophe sits in an unusual category — it is technically their mandate, but it also implicates the party-approved test program and the ministry-approved safety record of a flagship Soviet facility. You are handing him a problem he did not ask for.',
      options: [
        {
          id: 'kgb-opt-full',
          label: 'Give a complete technical briefing',
          description: 'Lay out everything: the void coefficient, the test procedure, the timing, the risk to Pripyat.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +15, freedom: -20 },
              narrativeResult: 'The officer makes notes. He asks you to return tomorrow morning for a follow-up interview. You explain that tomorrow morning will be too late. He looks at you for a long time. "Then we will see," he says.',
              revealKnowledge: ['reactor-design', 'timing', 'test-procedure'],
            },
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -10, credibility: +8, freedom: -35 },
              narrativeResult: 'The officer thanks you with formal courtesy and escorts you out. Within two hours, Dyatlov has been informed that you visited. He meets you at the plant entrance. His expression is something beyond anger.',
              revealKnowledge: ['timing'],
            },
          ],
        },
        {
          id: 'kgb-opt-anonymous',
          label: 'Leave an anonymous written warning and slip it under the door',
          description: 'Do not identify yourself. A written, unsigned technical summary left at the office.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -8, credibility: +5, freedom: +0 },
              narrativeResult: 'You write two pages by hand in the post office toilet, technical and specific, unsigned. You push it under the office door after dark. Whether anyone reads it before 1 AM is unknowable.',
              revealKnowledge: ['reactor-design', 'timing'],
            },
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -8, freedom: -15 },
              narrativeResult: 'There is a camera above the KGB door. There was always a camera. The footage will be reviewed within six hours.',
            },
          ],
        },
        {
          id: 'kgb-opt-abort',
          label: 'Turn back — this is too dangerous',
          description: 'Involving the KGB carries enormous personal risk. Find another path.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'night-intervention',
              resourceChanges: { time: -3 },
              narrativeResult: 'You stop outside the door. The risk is real and the outcome uncertain. You walk away.',
            },
          ],
        },
      ],
    },

    'night-intervention': {
      id: 'night-intervention',
      type: 'standard',
      act: 2,
      title: 'The Night Shift Begins — 11:00 PM',
      narrative:
        'The evening shift handover is complete. Aleksandr Akimov is the shift foreman. Leonid Toptunov is at the reactor control desk. Dyatlov is in the room, not because he has to be, but because he refuses to let this test escape him again. The reactor power reduction begins. At 12:28 AM on April 25 — months ago, in the original schedule — a grid operator had requested full power and the test had been held. Tonight, there is no such reprieve. The power drops. At a certain point it overshoots, dropping to near-zero due to xenon poisoning. Dyatlov orders it raised. Toptunov hesitates. Dyatlov\'s voice fills the control room like a physical pressure. The instruments show 200 megawatts — unstable, far below safe operating range. Dyatlov says: begin the test.',
      options: [
        {
          id: 'ni-opt-object',
          label: 'Object openly — refuse to allow the test to proceed',
          description: 'Speak in the control room, on the record, in front of everyone. Demand a halt.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'final-stand',
              resourceChanges: { time: -5 },
            },
          ],
        },
        {
          id: 'ni-opt-toptunov',
          label: 'Support Toptunov — back up his hesitation',
          description: 'Toptunov is afraid. If you stand with him, he may refuse Dyatlov\'s order. Two voices are harder to dismiss than one.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'final-stand',
              resourceChanges: { time: -5, credibility: +10 },
              narrativeResult: 'Toptunov looks at you. His hands have not moved from the console. In the silence before Dyatlov speaks again, there is a moment that lasts a long time.',
            },
            {
              weight: 1,
              nextNodeId: 'final-stand',
              resourceChanges: { time: -5, credibility: +5, freedom: -10 },
              narrativeResult: 'Dyatlov turns to you. "You," he says. "Sit down or get out." Toptunov complies. The test moves forward.',
            },
          ],
        },
        {
          id: 'ni-opt-az5',
          label: 'Reach for the AZ-5 emergency shutdown button',
          description: 'The emergency SCRAM button is at the operator\'s console. If pressed before the test begins, it triggers a shutdown — but with the rods\' graphite tips, at this power level, the outcome is unpredictable.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'final-stand',
              resourceChanges: { time: -3, credibility: +5, freedom: -20 },
              narrativeResult: 'You move toward the console. Dyatlov\'s arm blocks you. "Do not touch that panel," he says. "That is not your station." Security is called.',
            },
          ],
        },
      ],
    },

    'final-stand': {
      id: 'final-stand',
      type: 'standard',
      act: 2,
      title: '1:19 AM — Four Minutes',
      narrative:
        'The test has begun. The reactor is running at 200 megawatts, far below its stable range. The emergency core cooling system has been disabled as required by the test program. The eight main circulation pumps are running — deliberately overloading the cooling circuit to simulate the conditions the test is supposed to measure. The coolant is flashing to steam. The positive void coefficient is doing exactly what you knew it would do: increasing reactivity as the steam voids grow. The instruments are climbing. Dyatlov has not noticed yet, or has noticed and has chosen not to process what he is seeing. Toptunov is watching the power climb with white-faced comprehension. It is 1:19 AM. You have four minutes.',
      options: [
        {
          id: 'fs-opt-scram',
          label: 'Shout for an emergency SCRAM — order Toptunov to press AZ-5',
          description: 'Forget authority. Forget career. Yell at the top of your voice for an emergency shutdown right now.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome-prevented',
              resourceChanges: { credibility: +20, freedom: -30 },
              requirements: { minCredibility: 50 },
              narrativeResult: 'Toptunov\'s hand moves. Akimov does not stop him. The rods begin to descend. There is a surge — sharp, sickening — and then the reactor power falls. The building shakes but does not break. Dyatlov is screaming. The reactor is subcritical.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-delayed',
              resourceChanges: { credibility: +10, freedom: -20 },
              requirements: { minCredibility: 35 },
              narrativeResult: 'Toptunov hesitates, then presses AZ-5. The graphite tips cause a momentary surge. There is a loud report from the reactor building — not an explosion, a crack. A release. The reactor is damaged but not destroyed. The disaster is not prevented, but it is different.',
            },
            {
              weight: 1,
              nextNodeId: 'outcome-failed',
              resourceChanges: {},
              narrativeResult: 'Your voice is lost in the noise of the room. Dyatlov turns to you. Toptunov does not move. At 1:23:04 AM, the power excursion is complete.',
            },
          ],
        },
        {
          id: 'fs-opt-evacuate-call',
          label: 'Abandon the control room and call Pripyat emergency services',
          description: 'You cannot stop the test. Use these final minutes to get evacuation moving before the explosion.',
          outcomes: [
            {
              weight: 2,
              nextNodeId: 'outcome-partial',
              resourceChanges: { time: -5, freedom: -15 },
              requirements: { minFreedom: 40 },
              narrativeResult: 'You run to the corridor telephone. Voloshko answers on the third ring. "There is going to be an accident at Reactor 4. Move the buses. Move the people. Do it now." He hesitates. Then: "How long?" "Minutes," you say. There is a silence, and then you hear him begin to shout.',
              revealKnowledge: ['evacuation-zone'],
            },
            {
              weight: 1,
              nextNodeId: 'outcome-failed',
              resourceChanges: { time: -5 },
              narrativeResult: 'The telephone is already in use. By the time you reach another line, it is 1:24 AM. Outside, Reactor 4\'s roof is on fire.',
            },
          ],
        },
        {
          id: 'fs-opt-document',
          label: 'Write an emergency note — document what is happening in real time',
          description: 'A desperate act: commit everything to paper in the next three minutes so that what you knew is on the record.',
          outcomes: [
            {
              weight: 1,
              nextNodeId: 'outcome-failed',
              resourceChanges: { credibility: +10 },
              narrativeResult: 'You write eight lines on a notebook page. At 1:23 AM the control room shudders. The lights go out. The instruments spike and die. The note survives the explosion in your shirt pocket.',
            },
          ],
        },
      ],
    },

    // ── ACT 3: OUTCOME NODES ────────────────────────────────────────────────────

    'outcome-prevented': {
      id: 'outcome-prevented',
      type: 'outcome',
      act: 3,
      title: 'The Reactor Holds',
      livesSaved: 31,
      maxLives: 31,
      narrative:
        'The emergency shutdown is ugly. The control rods\' graphite tips cause a brief, alarming power spike — the instruments momentarily show readings that make no sense — but the rods reach their lower stops and the chain reaction stops. At 1:23 AM, instead of an explosion, Reactor 4 produces a loud bang and a small steam release from a pressure valve. The building stands. The night shift stands inside it, shaken, in the dark. Dyatlov is screaming about the damage to the test program. You are shaking so hard you have to hold the console to stay upright. Akimov has already called the plant director. In the weeks that follow, the reactor is shut down for inspection. Engineers from the Kurchatov Institute find what you found. The positive void coefficient is documented. The problem is real, acknowledged, and, slowly, fixed across the Soviet fleet. Dyatlov is eventually censured. You will never work in nuclear power again.',
      epilogue:
        'In this timeline, the accident that would have irradiated 350,000 km² of Europe does not happen. Pripyat remains inhabited. The firemen of that night shift go home to their families. The political reckoning that Chernobyl would have forced — the acknowledgement that Soviet nuclear safety was built on institutional denial — does not come. It is possible that delaying this reckoning costs lives in other ways, in other places. History is not arithmetic. But tonight, the reactor held.',
    },

    'outcome-delayed': {
      id: 'outcome-delayed',
      type: 'outcome',
      act: 3,
      title: 'A Different Morning',
      livesSaved: 20,
      maxLives: 31,
      narrative:
        'The emergency shutdown is pressed, but not soon enough. The graphite-tipped control rods enter the reactor at 200 megawatts and the ensuing power surge is violent — two explosions rock the building, but the second is smaller than history records. The reactor core is destroyed, but the initial steam explosion does not breach the building\'s structure catastrophically. Radiation is still released. The fire still burns. But the graphite fire is smaller. The first responders who arrive still face lethal doses, but the acute radiation zone is tighter. Six firefighters die of acute radiation syndrome instead of twenty-eight. The evacuation of Pripyat, initiated within two hours of the accident because of warnings you placed, saves the residents from the worst of the fallout plume.',
      epilogue:
        'Twenty lives saved is not a small thing. It is also not the full measure of what was possible. The long-term casualty estimates — hundreds of thousands of cases of thyroid cancer across Belarus, Ukraine, and Russia — do not change. The fallout does not care about intentions. What your intervention changed was the immediate toll, the speed of the evacuation, and the survival of a handful of firefighters who, in history, died in hospital wards named for something they did not yet have a name for. Their families do not know what you did. You will probably never tell them.',
    },

    'outcome-partial': {
      id: 'outcome-partial',
      type: 'outcome',
      act: 3,
      title: 'Faster Than History',
      livesSaved: 15,
      maxLives: 31,
      narrative:
        'The explosion happens exactly as you knew it would, at 1:23 AM on April 26. The two blasts destroy the reactor building\'s upper section and scatter burning graphite across the plant grounds. The night is lit by a column of flame and the blue glow of ionized air. But the evacuation of Pripyat begins within ninety minutes of the explosion, not thirty-six hours later. The buses that Voloshko pre-positioned, the call you made from the corridor telephone, the notes you left with city officials — these things add up to a smaller number. Not zero. Fifteen people who would have died in those first days do not die. The city clears before the worst of the fallout settles.',
      epilogue:
        'The official Soviet response still minimizes, conceals, and delays. Brukhanov\'s first report to Moscow lists the radiation level at 3.6 roentgens per hour — the maximum reading on the available dosimeter — when the actual level is hundreds of times higher. Valery Legasov will still arrive to lead the cleanup. The liquidators will still be sent onto the roof. The graphite will still burn for ten days. What you changed is a margin: a handful of families who keep their fathers and sons. In a disaster of this scale, margins are what you have.',
    },

    'outcome-silenced': {
      id: 'outcome-silenced',
      type: 'outcome',
      act: 3,
      title: 'Removed From Shift',
      livesSaved: 0,
      maxLives: 31,
      narrative:
        'By early evening you are no longer at Chernobyl. The process of removal is Soviet in its efficiency and its indifference: a security escort, a brief administrative conversation with someone who does not introduce himself, the collection of your access badge. They do not explain what charges, if any, will follow. You sit in a militia holding room in Pripyat as the night passes. At 1:23 AM you feel nothing — no shockwave reaches the city, not at this distance, not for several seconds. Then the windows rattle. You already know what it is.',
      epilogue:
        'The accident proceeds as recorded in history. The night shift at Reactor 4 runs the test at low power with the emergency core cooling system disabled. The AZ-5 button is pressed at 1:23:40 AM. The graphite-tipped control rods enter the core and the power excursion is prompt and catastrophic. 31 people die in the following weeks. 600,000 liquidators are eventually mobilized. 350,000 people are permanently relocated. You are released from custody three days after the explosion, in the chaos of the emergency response, and told not to discuss your detention with anyone. You never do.',
    },

    'outcome-failed': {
      id: 'outcome-failed',
      type: 'outcome',
      act: 3,
      title: '1:23 AM',
      livesSaved: 0,
      maxLives: 31,
      narrative:
        'The test proceeds as history records. At 1:23:04 AM, Leonid Toptunov presses the AZ-5 emergency SCRAM button — not because you convinced him, but because the instruments are already showing a runaway condition and it is the last available action. The graphite tips on the control rods enter the reactor core first, adding reactivity before the rods can subtract it. There are two explosions. The first is a steam explosion that destroys the reactor core. The second, three seconds later, may be a nuclear excursion — this will be debated for decades. The 1,000-tonne reactor lid is blown off. The building\'s roof collapses. Burning graphite lands on the surrounding buildings. In the control room, the instruments read zero — not because the reactor is shut down, but because the instruments are destroyed.',
      epilogue:
        'You were right about everything. It mattered nothing, or almost nothing. Dyatlov, standing in the ruins of the control room, insists for hours that the reactor cannot have exploded, because an RBMK reactor cannot explode. The first firefighters arrive without respirators and without dosimeters that read above 3.6 roentgens per hour — because no higher-range dosimeters are available. They handle burning graphite with their bare hands. Within days, their skin is falling off. You carry what you knew for the rest of your life, which is shorter than it should be.',
    },
  },
};
