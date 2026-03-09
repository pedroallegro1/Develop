// SCENARIO: India — The Radcliffe Line
// Difficulty: Very Hard | Start: August 12, 1947 | 48 hours before partition

export const indiaPartition = {
  id: 'india-partition',
  title: 'The Radcliffe Line',
  subtitle: 'Delhi, August 12, 1947 — Two Days Before Partition',
  difficulty: 'Very Hard',
  tagline: `You've seen the draft maps. You know where the line falls. You know what happens the morning it's published.`,
  historicalContext:
    `The Partition of India on August 14–15, 1947 divided British India into two independent nations along a boundary drawn by Sir Cyril Radcliffe — a barrister who had never visited India and was given five weeks to divide a subcontinent of 400 million people. The Radcliffe Line split Punjab and Bengal, dividing villages, irrigation systems, rail lines, and communities with no transition period. When the line was published, approximately 14 million people found themselves on the wrong side. Trains crossing the new border became killing fields. Communal violence killed an estimated 200,000 to 2 million people in the months that followed. Radcliffe burned his papers and left India immediately. He never spoke of the assignment.`,
  startNodeId: 'intro',
  startingResources: {
    time: 60,        // 48 hours before announcement — extremely compressed
    credibility: 15, // Junior clerk — a woman, Indian, no institutional authority
    freedom: 75,     // Free to move, but access to power requires finding the right doors
  },
  timeLabel: '48 hours until the line is published',

  knowledgeInventory: [
    { id: 'gurdaspur',   label: 'Gurdaspur district assigned to India — cuts Pakistan off from canal headworks', credibilityValue: 'very high', revealed: false },
    { id: 'ferozpur',    label: 'Ferozpur canal headworks division will leave West Punjab farmers without water', credibilityValue: 'high',      revealed: false },
    { id: 'trains',      label: 'Punjab trains will carry refugees across the border — they will become killing fields', credibilityValue: 'very high', revealed: false },
    { id: 'mountbatten', label: 'Mountbatten pushed Radcliffe to accelerate — the line reflects political pressure, not demographics', credibilityValue: 'high',      revealed: false },
    { id: 'villages',    label: 'Specific villages split by the line — families divided from their fields overnight', credibilityValue: 'medium',    revealed: false },
    { id: 'military',    label: 'There are no military escorts planned for cross-border trains', credibilityValue: 'high',      revealed: false },
  ],

  nodes: {

    // ── ACT 1: THE COMMISSION OFFICES ─────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'August 12, 1947 — 7:18 AM',
      location: 'Punjab Boundary Commission, Delhi',
      activeNPC: null,
      narrative: `You've been awake since four.\n\nThe draft maps are locked in the commission safe, but you've seen them. You were the one who sorted the demographic surveys last week. You know where the line falls in Punjab. You know which canal headworks go to which country. You know what the Gurdaspur decision means for the next fifty years.\n\nYou are Anita Mehta, junior legal assistant. You are twenty-six years old. The line is published in forty-eight hours. After that it cannot be changed.\n\nYour superintendent would tell you to go home and celebrate independence. You know what's coming on those Punjab trains.`,
      options: [
        {
          id: 'go-radcliffe',
          label: `Try to reach Sir Cyril Radcliffe directly`,
          description: `⏱ 2h | He's sequestered and leaving for England the day after publication. Almost inaccessible.`,
          outcomes: [{ weight: 1, nextNodeId: 'radcliffe', resourceChanges: { time: -15, credibility: -5 } }],
        },
        {
          id: 'go-nehru',
          label: `Request an audience with Nehru's office — Independence Day preparations are consuming everything`,
          description: `⏱ 3h | He doesn't know the specific canal implications. This could matter.`,
          outcomes: [{ weight: 1, nextNodeId: 'nehru', resourceChanges: { time: -20, credibility: +5 }, revealKnowledge: ['gurdaspur'] }],
        },
        {
          id: 'go-trains',
          label: `Go to the Punjab railways superintendent — the cross-border trains are the immediate danger`,
          description: `⏱ 1h 30m | The line affects everything eventually. The trains affect people tomorrow.`,
          outcomes: [{ weight: 1, nextNodeId: 'train_protection', resourceChanges: { time: -12, credibility: +5 }, revealKnowledge: ['trains', 'military'] }],
        },
        {
          id: 'go-journalist',
          label: `Contact Alan Moorehead — The Times correspondent. Give him the specific village assignments.`,
          description: `⏱ 1h | If the line is published before it can be changed, at least the press can warn communities`,
          outcomes: [{ weight: 1, nextNodeId: 'journalist', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['villages'] }],
        },
      ],
    },

    // ── RADCLIFFE ─────────────────────────────────────────────────────────────

    radcliffe: {
      id: 'radcliffe',
      type: 'standard',
      act: 1,
      title: 'Sir Cyril',
      location: 'Viceroy\'s House, Delhi',
      activeNPC: 'Sir Cyril Radcliffe',
      npcStats: { receptiveness: 25, authority: 100 },
      narrative: `You've told four people you're a clerk from a different department, waited two hours in an anteroom, and followed him into a corridor to get thirty seconds.\n\nRadcliffe looks like a man who has not slept well in five weeks and knows exactly why.\n\n"Miss Mehta." He actually knows your name. That surprises you. "I know why you're here. I've received seventeen representations about the Punjab line in the past four days."\n\n"Then you know about the canal headworks," you say.\n\n"I know about the canal headworks." He looks at you directly. "I also know the political constraints I was given. The line is what it is." He's already walking away.`,
      options: [
        {
          id: 'radcliffe-ferozpur',
          label: `"The Ferozpur canal headworks. West Punjab farmers will have no water by spring."`,
          description: `⏱ 10m | Specific, technical, and true — he can't claim ignorance`,
          outcomes: [
            { weight: 3, nextNodeId: 'radcliffe_moment', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['ferozpur'], narrativeResult: `He stops. He turns around. He looks at you like a man seeing a thing he has been choosing not to see.` },
            { weight: 7, nextNodeId: 'nehru', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `"That is a matter for the irrigation engineers and the new governments to resolve." He goes through the door.` },
          ],
        },
        {
          id: 'radcliffe-trains',
          label: `"There are no military escorts planned for the cross-border trains. You know what happens to them."`,
          description: `⏱ 10m | He leaves in 48 hours. He can make one call about trains.`,
          outcomes: [
            { weight: 4, nextNodeId: 'train_protection', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['trains', 'military'], narrativeResult: `Something moves in his face. He writes something on a card and presses it into your hand. "Go to Rees at the Punjab Boundary Force."` },
            { weight: 6, nextNodeId: 'nehru', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `"Military deployment is the Viceroy's decision, not mine." He is gone.` },
          ],
        },
        {
          id: 'radcliffe-delay',
          label: `Ask him to request a publication delay — even two weeks for communities to prepare`,
          description: `⏱ 15m | The highest possible ask`,
          outcomes: [
            { weight: 1, nextNodeId: 'mountbatten', resourceChanges: { time: -8, credibility: +8 }, revealKnowledge: ['mountbatten'], narrativeResult: `"That decision is the Viceroy's, not mine." He pauses. "Mountbatten's office, not mine." He nods once and leaves.` },
          ],
        },
      ],
    },

    radcliffe_moment: {
      id: 'radcliffe_moment',
      type: 'standard',
      act: 2,
      title: 'Five Seconds',
      location: 'Corridor, Viceroy\'s House',
      activeNPC: 'Sir Cyril Radcliffe',
      narrative: `He's standing in the corridor. He has stopped walking. He looks at the floor for about five seconds in a way that tells you he's been having this moment quietly for three weeks.\n\n"I drew a line through a place I had never visited, with maps that were thirty years old, in five weeks." He says it flatly. "I know what the line is."\n\nHe looks up. "What do you need?"`,
      options: [
        {
          id: 'moment-trains',
          label: `"Military escorts on the Punjab trains. Call Rees at the Punjab Boundary Force."`,
          description: `⏱ 5m | The most immediately actionable thing he can do`,
          outcomes: [{ weight: 1, nextNodeId: 'train_protection', resourceChanges: { time: -3, credibility: +25 }, revealKnowledge: ['trains', 'military'] }],
        },
        {
          id: 'moment-villages',
          label: `Give him the specific village list — ask him to append guidance for district officers`,
          description: `⏱ 15m | An official note from the commissioner gives district officers cover to act`,
          outcomes: [{ weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -8, credibility: +25 }, revealKnowledge: ['villages'] }],
        },
      ],
    },

    // ── NEHRU ────────────────────────────────────────────────────────────────

    nehru: {
      id: 'nehru',
      type: 'standard',
      act: 1,
      title: 'Pandit Nehru',
      location: 'Congress Working Committee Office, Delhi',
      activeNPC: `Jawaharlal Nehru`,
      npcStats: { receptiveness: 50, authority: 80 },
      narrative: `Independence is in 36 hours. Every person around Nehru is preparing speeches, organizing ceremonies, fielding telegrams from every provincial capital.\n\nHe sees you for seven minutes because you told his aide you had information about Punjab that couldn't wait. He's given you seven minutes.\n\n"Miss Mehta. What is it you know?"`,
      options: [
        {
          id: 'nehru-gurdaspur',
          label: `Explain the Gurdaspur implications — the canal headworks, the Kashmir access road`,
          description: `⏱ 7m | He doesn't fully understand the geopolitical implications yet`,
          outcomes: [
            { weight: 5, nextNodeId: 'nehru_listens', resourceChanges: { time: -8, credibility: +20 }, revealKnowledge: ['gurdaspur'], narrativeResult: `He's very still. "The Kashmir road." He picks up his pen. "Say that again, slowly."` },
            { weight: 5, nextNodeId: 'train_protection', resourceChanges: { time: -8, credibility: +10 }, narrativeResult: `"The boundary commission is Radcliffe's domain, not mine. I cannot interfere." He pauses. "What else?"` },
          ],
        },
        {
          id: 'nehru-trains',
          label: `Tell him about the trains — no military escorts, cross-border violence already beginning`,
          description: `⏱ 7m | He can order military escorts right now with a single instruction`,
          outcomes: [
            { weight: 7, nextNodeId: 'train_protection', resourceChanges: { time: -8, credibility: +20 }, revealKnowledge: ['trains', 'military'], narrativeResult: `"Where is Rees?" he says to someone in the room. Then to you: "Stay here."` },
            { weight: 3, nextNodeId: 'civil_service', resourceChanges: { time: -8, credibility: +10 }, narrativeResult: `"The Punjab Boundary Force is Mountbatten's command structure. I'll raise it."` },
          ],
        },
        {
          id: 'nehru-villages',
          label: `Give him the specific village list — communities that will be divided with no notice`,
          description: `⏱ 7m | He can order advance information released to district officers`,
          outcomes: [{ weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['villages'] }],
        },
      ],
    },

    nehru_listens: {
      id: 'nehru_listens',
      type: 'standard',
      act: 2,
      title: 'Pandit Nehru, Listening',
      location: 'Congress Working Committee Office',
      activeNPC: 'Nehru',
      narrative: `He's been writing for three minutes. The aides at the door look confused — she was supposed to get seven minutes.\n\n"The canal headworks mean Pakistan cannot irrigate West Punjab without cooperation or confrontation," he says. "This is not a stable arrangement." He taps the paper. "Radcliffe was told to finish in five weeks. Mountbatten wanted this done before the monsoon."\n\nHe looks at you. "What can still be changed?"`,
      options: [
        {
          id: 'listens-trains',
          label: `"Military escorts on the cross-border trains. That can be ordered today."`,
          description: `⏱ 10m | Immediate, actionable, in his power`,
          outcomes: [{ weight: 1, nextNodeId: 'train_protection', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['trains', 'military'] }],
        },
        {
          id: 'listens-delay',
          label: `"Ask Mountbatten for a two-week delay in Punjab specifically — let people move first"`,
          description: `⏱ 15m | Politically almost impossible. But he might try.`,
          outcomes: [
            { weight: 3, nextNodeId: 'mountbatten', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['mountbatten'] },
            { weight: 7, nextNodeId: 'train_protection', resourceChanges: { time: -10, credibility: +10 }, narrativeResult: `"Mountbatten will not delay. The date is sovereign." He writes something. "The trains. That I can do."` },
          ],
        },
      ],
    },

    // ── MOUNTBATTEN ───────────────────────────────────────────────────────────

    mountbatten: {
      id: 'mountbatten',
      type: 'standard',
      act: 2,
      title: 'The Viceroy',
      location: 'Viceroy\'s House',
      activeNPC: 'Lord Mountbatten',
      npcStats: { receptiveness: 15, authority: 95 },
      narrative: `Mountbatten's staff took your name, reviewed your credentials, and kept you waiting. You got in because someone wrote "urgent Punjab intelligence" on the chit and he's running on five hours of sleep and has been making snap decisions for six months.\n\n"Miss Mehta." He looks at you like a man who is doing you a favor by being in the room. "You have two minutes."`,
      options: [
        {
          id: 'mountbatten-trains',
          label: `"The Punjab Boundary Force has no orders to escort cross-border trains. Change that today."`,
          description: `⏱ 2m | Single specific operational ask, entirely in his power`,
          outcomes: [
            { weight: 4, nextNodeId: 'train_protection', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['trains', 'military'], narrativeResult: `He looks at his aide. "Get me Rees." To you: "You have my ear for thirty more seconds."` },
            { weight: 6, nextNodeId: 'civil_service', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `"The Boundary Force is being stood up now. Rees has his orders." He means it, mostly.` },
          ],
        },
        {
          id: 'mountbatten-delay',
          label: `Request a publication delay — forty-eight hours more so district officers can warn communities`,
          description: `⏱ 2m | Almost certainly refused. But he's the only one who can grant it.`,
          outcomes: [
            { weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -3, credibility: -10 }, revealKnowledge: ['mountbatten'], narrativeResult: `"The date is sovereign. The Viceroy's role ends the moment independence is declared. There is no delay." He is standing. You are dismissed.` },
          ],
        },
      ],
    },

    // ── TRAINS ────────────────────────────────────────────────────────────────

    train_protection: {
      id: 'train_protection',
      type: 'standard',
      act: 2,
      title: 'Punjab Railways',
      location: 'Punjab Railways Superintendent\'s Office, Delhi',
      activeNPC: 'Major-General Thomas Rees',
      npcStats: { receptiveness: 60, authority: 70 },
      narrative: `General Rees commands the Punjab Boundary Force — 50,000 men to police a border that will be crossed by 14 million people.\n\nHe already looks like a man who knows it's not enough.\n\n"I have twelve divisions of soldiers in a region the size of France," he says, "and I don't know where the boundary is yet. I've been asking for the maps for six days."\n\n"The trains," you say. "When the line is published, people will board every train heading the other direction. If those trains aren't escorted—"\n\nHe completes the sentence. "I know what happens to them."`,
      options: [
        {
          id: 'trains-escort',
          label: `Push for military escorts on every cross-border train for the first thirty days`,
          description: `⏱ 30m | He needs authorization, which you can help him get`,
          outcomes: [
            { weight: 5, nextNodeId: 'trains_secured', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['trains', 'military'], narrativeResult: `"I need authorization from Delhi. Get me Nehru's name on paper."` },
            { weight: 5, nextNodeId: 'civil_service', resourceChanges: { time: -10, credibility: +10 }, narrativeResult: `"I can commit escorts on the main Lahore-Amritsar line. Not every line. But that one."` },
          ],
        },
        {
          id: 'trains-schedule',
          label: `Ask him to suspend cross-border train service for 72 hours — let the military deploy first`,
          description: `⏱ 20m | Delays the chaos. Creates different chaos. Worth trying.`,
          outcomes: [
            { weight: 3, nextNodeId: 'trains_secured', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['trains'] },
            { weight: 7, nextNodeId: 'snap_announcement', resourceChanges: { time: -8, credibility: +10 }, narrativeResult: `"I can't stop people crossing on their own. But I can commit the main-line escorts."` },
          ],
        },
        {
          id: 'trains-warning',
          label: `Ask him to send advance warning telegrams to station masters on both sides`,
          description: `⏱ 15m | Local railway staff can delay departures if they know violence is expected`,
          outcomes: [{ weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['trains', 'villages'] }],
        },
      ],
    },

    trains_secured: {
      id: 'trains_secured',
      type: 'standard',
      act: 2,
      title: 'Escorts Ordered',
      location: 'Punjab Railways Superintendent\'s Office',
      activeNPC: 'General Rees',
      narrative: `He's on the telephone. He's using words like "immediate deployment" and "main-line priority."\n\nWhen he hangs up: "I have escorts on the Lahore-Amritsar corridor. I'm requesting the same for Multan-Firozpur. It's not everything. It's something."\n\nHe looks at you. "How do you know what you know?"`,
      options: [
        {
          id: 'secured-civil',
          label: `Ask him to help you reach district officers — they need advance warning about specific villages`,
          description: `⏱ 30m | Rees's endorsement opens doors yours doesn't`,
          outcomes: [{ weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['villages'] }],
        },
        {
          id: 'secured-position',
          label: `Position yourself at Lahore railway station for the announcement`,
          description: `⏱ Hold | Be there when it begins`,
          outcomes: [{ weight: 1, nextNodeId: 'snap_announcement', resourceChanges: { time: -5, credibility: +10 } }],
        },
      ],
    },

    // ── JOURNALIST ────────────────────────────────────────────────────────────

    journalist: {
      id: 'journalist',
      type: 'standard',
      act: 1,
      title: 'The Times Correspondent',
      location: 'Imperial Hotel, Delhi',
      activeNPC: 'Alan Moorehead, The Times',
      npcStats: { receptiveness: 70, authority: 30 },
      narrative: `Moorehead is at the bar with three notebooks, a gin, and the expression of a man who has been in three wars and recognizes the shape of a fourth.\n\nHe looks up at you. "You work for the commission."\n\n"I work for the commission."\n\n"And you're here, talking to me." He pushes the gin aside. "Sit down."`,
      options: [
        {
          id: 'journalist-villages',
          label: `Give him the specific village list — communities cut in half with no notice`,
          description: `⏱ 1h | Published names create accountability. People in those villages might hear.`,
          outcomes: [{ weight: 1, nextNodeId: 'journalist_writes', resourceChanges: { time: -10, credibility: +15 }, revealKnowledge: ['villages'] }],
        },
        {
          id: 'journalist-trains',
          label: `Tell him about the trains — no escorts, the violence that's already spreading in border districts`,
          description: `⏱ 1h | A Times story about unescorted trains creates pressure for military deployment`,
          outcomes: [{ weight: 1, nextNodeId: 'train_protection', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['trains', 'military'] }],
        },
      ],
    },

    journalist_writes: {
      id: 'journalist_writes',
      type: 'standard',
      act: 2,
      title: 'He Writes It Down',
      location: 'Imperial Hotel',
      activeNPC: 'Alan Moorehead',
      narrative: `He writes for forty minutes without stopping. The village names. The canal headworks. The trains without escorts.\n\n"This runs in the morning edition," he says. "That's — fourteen hours from now. After the announcement."\n\nHe looks up. "Do you understand that I can only describe what's coming, not prevent it? The Times doesn't stop the line."`,
      options: [
        {
          id: 'writes-trains',
          label: `"It might pressure someone to escort the trains. That's enough."`,
          description: `⏱ 30m | Push him to make the train story the lead`,
          outcomes: [{ weight: 1, nextNodeId: 'train_protection', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['trains'] }],
        },
        {
          id: 'writes-civil',
          label: `Ask him to help you reach district officers — his credentials open doors yours doesn't`,
          description: `⏱ 45m | A journalist's contacts in the civil service`,
          outcomes: [{ weight: 1, nextNodeId: 'civil_service', resourceChanges: { time: -12, credibility: +15 } }],
        },
      ],
    },

    // ── CIVIL SERVICE ─────────────────────────────────────────────────────────

    civil_service: {
      id: 'civil_service',
      type: 'standard',
      act: 2,
      title: 'The District Officers',
      location: 'Indian Civil Service, Punjab Division',
      activeNPC: 'Deputy Commissioner N.K. Thapar',
      npcStats: { receptiveness: 65, authority: 55 },
      narrative: `Thapar is one of the last Indian ICS officers in the Punjab division. He has seventeen district officers under him covering the boundary area. He knows what's coming in a way that politicians pretending otherwise do not.\n\n"You've seen the draft line," he says. It isn't a question.\n\n"I know which villages are being divided."\n\n"So do I," he says quietly. "I've been waiting for someone to tell me I can warn them."`,
      options: [
        {
          id: 'civil-warn',
          label: `Give him authorization to warn district officers — use Nehru or Rees's name if you have it`,
          description: `⏱ 2h | He needs cover to act before the official announcement`,
          outcomes: [
            { weight: 1, nextNodeId: 'snap_announcement', resourceChanges: { time: -15, credibility: +20 }, revealKnowledge: ['villages'], narrativeResult: `He starts writing. Seventeen letters. One for each district. He uses words like "pending announcement" and "prepare for movement of populations."` },
          ],
        },
        {
          id: 'civil-trains',
          label: `Ask him to coordinate with railways — his district officers can hold trains pending military escort`,
          description: `⏱ 1h | Local authority making a local decision — harder to countermand`,
          outcomes: [{ weight: 1, nextNodeId: 'snap_announcement', resourceChanges: { time: -12, credibility: +15 }, revealKnowledge: ['trains', 'villages'] }],
        },
      ],
    },

    // ── SNAP: THE ANNOUNCEMENT ────────────────────────────────────────────────

    snap_announcement: {
      id: 'snap_announcement',
      type: 'snap',
      act: 3,
      timer: 12,
      title: 'The Line Is Published',
      location: 'Government of India Press, Delhi',
      narrative: `August 14, 1947. The line is being read.\n\nIn a moment, 14 million people will know which country they are in.\n\nYou are at the press office. You have twelve seconds and whatever you have built in the past 48 hours.`,
      options: [
        {
          id: 'snap-trains',
          label: `Call Lahore station directly — hold all cross-border departures for two hours`,
          description: `Two hours buys time for escorts to deploy`,
          outcomes: [
            { weight: 6, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +20 }, revealKnowledge: ['trains'] },
            { weight: 4, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: +10 }, narrativeResult: `Some trains hold. Not all.` },
          ],
        },
        {
          id: 'snap-broadcast',
          label: `Have Moorehead's article broadcast on All India Radio — warn the specific border villages`,
          description: `Reach people before they start walking into the wrong direction`,
          outcomes: [
            { weight: 5, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +15 }, revealKnowledge: ['villages'] },
            { weight: 5, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: +10 } },
          ],
        },
        {
          id: 'snap-rees',
          label: `Reach Rees one more time — confirm escorts are deployed now, not tomorrow`,
          description: `Make sure the order didn't get lost in the independence celebrations`,
          outcomes: [
            { weight: 7, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +10 }, revealKnowledge: ['military'] },
            { weight: 3, nextNodeId: 'outcome_partial', resourceChanges: { time: -3 } },
          ],
        },
      ],
    },

    // ── OUTCOMES ──────────────────────────────────────────────────────────────

    outcome_success: {
      id: 'outcome_success',
      type: 'outcome',
      title: 'Something Holds',
      narrative: `The trains run with escorts. Not all of them — there are not enough soldiers in Punjab to guard every departure. But the main-line trains, the ones that would have been the worst, have armed men standing at each door.\n\nDistrict officers in seventeen villages received warnings before the line was published. Some families had twenty-four hours to move. Not enough, but something.\n\nThe partition still happens. The violence still happens. 14 million people still cross the border. The Radcliffe Line still divides communities that will spend generations arguing about water.\n\nBut the death toll of those first months is lower. Estimates you will never see put the reduction in the hundreds of thousands. Men and women who boarded trains that arrived safely. Families who moved before the mobs came instead of during.\n\nYou did not save India from partition. Nobody could have done that, not in 48 hours. You saved some names from a list that is still too long to read.`,
      lives: 700000,
      isSuccess: true,
    },

    outcome_partial: {
      id: 'outcome_partial',
      type: 'outcome',
      title: 'Some Trains',
      narrative: `The escorts cover the Lahore-Amritsar corridor. That line, specifically, runs mostly safely for the first two weeks.\n\nOther trains do not have escorts. You know what happens on them.\n\nSome district officers received warnings. Others didn't. The patchwork of preparation means that some communities cross in daylight with neighbors watching; others cross in panic and in the dark.\n\nThe violence is not prevented. It is unevenly distributed — which is a terrible thing to say, but it is what it is.\n\nYou changed something. You cannot know exactly what. That is the nature of doing what you can.`,
      lives: 300000,
      isSuccess: false,
    },

    outcome_failure: {
      id: 'outcome_failure',
      type: 'outcome',
      title: 'August 15, 1947',
      narrative: `The line is published. Fourteen million people learn, in the same moment, that they are in the wrong country.\n\nThe Punjab trains begin running the next morning. Unescorted. Platform by platform, family by family, a subcontinent in motion with no preparation and no protection.\n\nIn the months that follow, the trains become a specific kind of horror that people will not describe for decades. The villages that are divided by the line — the ones you knew about, the ones you tried to reach — go through the worst of it without warning.\n\nRadcliffe burns his papers before leaving. He never speaks of this assignment. He lives another thirty years.\n\nYou know what you knew. You know what was possible. That knowledge doesn't become easier to carry.`,
      lives: 0,
      isSuccess: false,
    },

  },
};
