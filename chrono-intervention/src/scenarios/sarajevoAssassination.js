// SCENARIO: Sarajevo — The Wrong Turn
// Difficulty: Easy | Start: June 28, 1914, 8:30 AM | ~2 hours before the motorcade

export const sarajevoAssassination = {
  id: 'sarajevo-assassination',
  title: 'The Wrong Turn',
  subtitle: 'Sarajevo, June 28, 1914 — Morning',
  difficulty: 'Easy',
  tagline: `Seven assassins. One stalled car. The century hinges on a driver who doesn't know the route.`,
  historicalContext:
    `On June 28, 1914, Archduke Franz Ferdinand of Austria-Hungary was assassinated in Sarajevo by Gavrilo Princip — a nineteen-year-old Bosnian Serb trained by the Black Hand. The first attempt, a grenade thrown from Čumurija Bridge, failed. The motorcade continued to city hall. On the return trip, the driver took a wrong turn onto Franz Josef Street and stalled directly in front of Schiller Delicatessen, where Princip was standing. He fired twice from five feet away. Franz Ferdinand and his wife Sophie died within the hour. Austria-Hungary's ultimatum to Serbia triggered a chain of alliances. Twenty million people were dead by 1918.`,
  startNodeId: 'intro',
  startingResources: {
    time: 85,        // ~2 hours before the motorcade, plus events during
    credibility: 50, // Police captain — authority exists, but your warning was dismissed
    freedom: 80,     // Free to move through the city
  },
  timeLabel: '~2 hours until the motorcade',

  knowledgeInventory: [
    { id: 'plot-group',      label: '7-man Black Hand group, trained in Užice, Serbia', credibilityValue: 'high',      revealed: false },
    { id: 'route-details',   label: 'The Appel Quay is the exposed corridor — multiple positions', credibilityValue: 'medium',    revealed: false },
    { id: 'wrong-turn',      label: `Driver takes the wrong turn onto Franz Josef Street — stalls at Schiller's`, credibilityValue: 'very high', revealed: false },
    { id: 'princip-pos',     label: `Princip waits at Schiller Delicatessen after the first attempt fails`, credibilityValue: 'high',      revealed: false },
    { id: 'bomb-attempt',    label: `First attempt: Čabrinović throws a grenade at Čumurija Bridge`, credibilityValue: 'medium',    revealed: false },
    { id: 'driver-name',     label: `The driver is Leopold Loyka — unfamiliar with the modified return route`, credibilityValue: 'medium',    revealed: false },
  ],

  nodes: {

    // ── ACT 1: ORIENTATION ─────────────────────────────────────────────────────

    intro: {
      id: 'intro',
      type: 'standard',
      act: 1,
      title: 'June 28, 1914 — 8:31 AM',
      location: 'Sarajevo City Police Station',
      activeNPC: null,
      narrative: `The telegram from Belgrade is still in your jacket pocket. You've read it twelve times.\n\nSeven men. Black Hand. Trained in Užice. Coming for the Archduke's visit today.\n\nSuperintendent Gerde dismissed it three days ago — "routine intelligence noise." Franz Ferdinand's motorcade departs in ninety minutes. Six cars. Open convertibles. The full route is published in this morning's newspaper.\n\nYou are Captain Anton Vukovic, city intelligence. You have a rank, a pistol, and knowledge no one wants. Where do you start?`,
      options: [
        {
          id: 'go-superintendent',
          label: `Go back to Superintendent Gerde — show him the telegram again`,
          description: `⏱ 30m | He dismissed it before. New specifics might change his mind.`,
          outcomes: [{ weight: 1, nextNodeId: 'superintendent', resourceChanges: { time: -10 } }],
        },
        {
          id: 'go-merizzi',
          label: `Find Colonel Merizzi — General Potiorek's security aide`,
          description: `⏱ 45m | Austrian military has jurisdiction over the Archduke's safety`,
          outcomes: [{ weight: 1, nextNodeId: 'merizzi', resourceChanges: { time: -12 } }],
        },
        {
          id: 'walk-route',
          label: `Walk the motorcade route yourself — find the men before they find their positions`,
          description: `⏱ 1h | You know what nervous men with something to hide look like`,
          outcomes: [{ weight: 1, nextNodeId: 'route_walk', resourceChanges: { time: -18, credibility: +5 }, revealKnowledge: ['route-details'] }],
        },
        {
          id: 'contact-harrach',
          label: `Go to the Konak — warn Count Harrach, the Archduke's personal aide`,
          description: `⏱ 1h | Austrian inner circle. High authority, will resent a local captain's interference.`,
          outcomes: [{ weight: 1, nextNodeId: 'harrach', resourceChanges: { time: -18, credibility: -5 } }],
        },
      ],
    },

    // ── SUPERINTENDENT ─────────────────────────────────────────────────────────

    superintendent: {
      id: 'superintendent',
      type: 'standard',
      act: 1,
      title: 'The Superintendent',
      location: 'Police Station, Gerde\'s Office',
      activeNPC: 'Superintendent Edmund Gerde',
      npcStats: { receptiveness: 20, authority: 80 },
      narrative: `Gerde is in his dress uniform. He has a civic reception after the motorcade.\n\n"Vukovic. Still on about that telegram." He doesn't look up. "Belgrade sends us three warnings a month. The Archduke's people reviewed the route. We have 120 officers deployed."\n\n"120 officers who don't know what the men look like," you say.\n\nHe looks up now. You have thirty seconds.`,
      options: [
        {
          id: 'show-telegram',
          label: `Lay the telegram on his desk — the names, the training location in Užice`,
          description: `⏱ 20m | Documented and specific. Either he acts or he's on record refusing.`,
          outcomes: [
            { weight: 3, nextNodeId: 'gerde_softens', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['plot-group'], narrativeResult: `He reads it twice. "These names," he says slowly, as if testing the weight of them.` },
            { weight: 2, nextNodeId: 'gerde_refuses', resourceChanges: { time: -5, credibility: -10 }, narrativeResult: `"Intelligence from Serbian sources." He slides it back. "Hardly reliable."` },
          ],
        },
        {
          id: 'deploy-plainclothes',
          label: `Invoke your authority — deploy plainclothes officers to the quay without his sign-off`,
          description: `⏱ 30m | You can just barely do this alone. It'll cost you.`,
          outcomes: [{ weight: 1, nextNodeId: 'route_walk', resourceChanges: { time: -10, credibility: +8, freedom: -10 }, revealKnowledge: ['route-details'] }],
        },
        {
          id: 'leave-superintendent',
          label: `He won't move. Leave and find someone who will.`,
          description: `⏱ 5m | Cut your losses now`,
          outcomes: [{ weight: 1, nextNodeId: 'merizzi', resourceChanges: { time: -3, credibility: -5 } }],
        },
      ],
    },

    gerde_softens: {
      id: 'gerde_softens',
      type: 'standard',
      act: 1,
      title: 'A Crack',
      location: 'Police Station',
      activeNPC: 'Superintendent Gerde',
      narrative: `He's reading the telegram carefully. Užice. The training facility. The names.\n\n"I can't cancel the motorcade — that's an imperial visit. But I can give you latitude to act on your own judgment this morning." He closes the folder. "Whatever you decide, you're not doing it in my name."\n\nHe's not going to stop the motorcade. But he's giving you cover.`,
      options: [
        {
          id: 'softens-merizzi',
          label: `Ask him to formally request an alternate route from Austrian security`,
          description: `⏱ 30m | His rank carries weight yours doesn't in Austrian channels`,
          outcomes: [{ weight: 1, nextNodeId: 'merizzi', resourceChanges: { time: -10, credibility: +15 } }],
        },
        {
          id: 'softens-walk',
          label: `Take your authorization and walk the route — find the men yourself`,
          description: `⏱ 1h | You have cover now. Move.`,
          outcomes: [{ weight: 1, nextNodeId: 'route_walk', resourceChanges: { time: -18, credibility: +10 }, revealKnowledge: ['route-details'] }],
        },
      ],
    },

    gerde_refuses: {
      id: 'gerde_refuses',
      type: 'standard',
      act: 1,
      title: 'No Support',
      location: 'Police Station',
      narrative: `He's sending you away. You'll have to act alone.\n\nYou have your rank, your pistol, and the telegram. No institutional backing.\n\nThe motorcade leaves in sixty minutes.`,
      options: [
        {
          id: 'refuses-walk',
          label: `Walk the route — find the men before the motorcade does`,
          description: `⏱ 1h | You know what to look for`,
          outcomes: [{ weight: 1, nextNodeId: 'route_walk', resourceChanges: { time: -18, credibility: +5 } }],
        },
        {
          id: 'refuses-merizzi',
          label: `Try Colonel Merizzi — Austrian military security command`,
          description: `⏱ 45m | His authority overrides Gerde's anyway`,
          outcomes: [{ weight: 1, nextNodeId: 'merizzi', resourceChanges: { time: -12 } }],
        },
      ],
    },

    // ── MERIZZI ────────────────────────────────────────────────────────────────

    merizzi: {
      id: 'merizzi',
      type: 'standard',
      act: 1,
      title: 'The Austrian',
      location: 'Military Headquarters, Konak',
      activeNPC: 'Colonel Eric von Merizzi',
      npcStats: { receptiveness: 55, authority: 65 },
      narrative: `Merizzi is reviewing logistics when you find him. Polished boots. A man who does not want problems today.\n\n"Twenty minutes, Captain." He actually means it. He glances at the telegram.\n\n"Your local intelligence chain dismissed this three days ago. Why should I override that assessment now?" He's not dismissing you — he's categorizing you. The question is genuine.`,
      options: [
        {
          id: 'merizzi-driver',
          label: `Point to the return route — specifically the wrong turn onto Franz Josef Street`,
          description: `⏱ 15m | One concrete ask: ensure the driver knows the route`,
          outcomes: [
            { weight: 5, nextNodeId: 'driver_briefed', resourceChanges: { time: -5, credibility: +18 }, revealKnowledge: ['wrong-turn', 'driver-name'] },
            { weight: 5, nextNodeId: 'route_walk', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `"The driver has been briefed." He turns back to his map.` },
          ],
        },
        {
          id: 'merizzi-checkpoints',
          label: `Request military checkpoints at each bridge along the quay`,
          description: `⏱ 20m | Doesn't require rerouting — just presence at choke points`,
          outcomes: [{ weight: 1, nextNodeId: 'route_walk', resourceChanges: { time: -8, credibility: +12 }, revealKnowledge: ['route-details', 'bomb-attempt'] }],
        },
        {
          id: 'merizzi-reroute',
          label: `Push for an alternate route — avoid the Appel Quay entirely`,
          description: `⏱ 30m | The quay is a long exposed corridor. A side street is defensible.`,
          outcomes: [
            { weight: 4, nextNodeId: 'driver_briefed', resourceChanges: { time: -10, credibility: +20 }, revealKnowledge: ['route-details', 'wrong-turn'] },
            { weight: 6, nextNodeId: 'route_walk', resourceChanges: { time: -10, credibility: -5 }, narrativeResult: `"Changing the route two hours prior creates more risk than the threat itself," he says.` },
          ],
        },
      ],
    },

    // ── ROUTE WALK ─────────────────────────────────────────────────────────────

    route_walk: {
      id: 'route_walk',
      type: 'standard',
      act: 1,
      title: 'The Quay',
      location: 'Appel Quay, Sarajevo',
      activeNPC: null,
      narrative: `The crowd is thick and festive. Women in best dresses. Children with small Austro-Hungarian flags.\n\nYou walk slowly. Bridge to bridge. Looking for men watching the road instead of the spectacle. Men whose coats are too heavy for June.\n\nAt Čumurija Bridge: young, dark-haired, package wrapped in newspaper under his arm. He's watching the exact spot where a car would slow to turn. His hands aren't quite right.`,
      options: [
        {
          id: 'walk-approach',
          label: `Approach him — identify yourself as police, ask him to show the package`,
          description: `⏱ 20m | He may bolt, or the package might be harmless — you won't know until you ask`,
          outcomes: [
            { weight: 5, nextNodeId: 'cabrinovic_bridge', resourceChanges: { time: -5, credibility: +15 }, revealKnowledge: ['bomb-attempt', 'plot-group'] },
            { weight: 5, nextNodeId: 'after_bomb_snap', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `He sees you coming and is suddenly somewhere else in the crowd.` },
          ],
        },
        {
          id: 'walk-follow',
          label: `Follow without revealing yourself — see if he signals anyone else`,
          description: `⏱ 30m | There are six others on the quay; finding the network is worth the time`,
          outcomes: [{ weight: 1, nextNodeId: 'cabrinovic_bridge', resourceChanges: { time: -10, credibility: +10 }, revealKnowledge: ['plot-group', 'bomb-attempt'] }],
        },
        {
          id: 'walk-driver',
          label: `Leave the bridge man — go brief the driver on the return route`,
          description: `⏱ 30m | The wrong turn is the specific kill point; the driver can be fixed`,
          outcomes: [{ weight: 1, nextNodeId: 'driver_briefed', resourceChanges: { time: -10, credibility: +8 }, revealKnowledge: ['wrong-turn', 'driver-name'] }],
        },
      ],
    },

    // ── ČABRINOVIĆ ─────────────────────────────────────────────────────────────

    cabrinovic_bridge: {
      id: 'cabrinovic_bridge',
      type: 'standard',
      act: 2,
      title: 'Čumurija Bridge',
      location: 'Čumurija Bridge, Appel Quay',
      activeNPC: `Nedeljko Čabrinović`,
      npcStats: { receptiveness: 5, authority: 0 },
      narrative: `He's twenty-two. His hands are shaking, which makes him more dangerous, not less.\n\nYou've identified yourself. He hasn't run — that means he's not certain you know about the package.\n\n"Working today?" you ask.\n\n"Watching the procession." His eyes don't settle anywhere long. He's been trained for many things but not for exactly this conversation.`,
      options: [
        {
          id: 'bridge-arrest',
          label: `"Show me what's under your coat." Make it an order.`,
          description: `⏱ 5m | If he won't comply, that's your answer`,
          outcomes: [
            { weight: 6, nextNodeId: 'driver_briefed', resourceChanges: { time: -3, credibility: +20 }, revealKnowledge: ['bomb-attempt', 'plot-group'], narrativeResult: `Under the newspaper: a Serbian military grenade, modified for throwing. He's arrested. The bridge is clear.` },
            { weight: 4, nextNodeId: 'snap_bomb', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `He drops the package and runs into the crowd. Too many people. He's lost.` },
          ],
        },
        {
          id: 'bridge-detain',
          label: `Hold him for questioning — get him off the bridge position`,
          description: `⏱ 20m | Low confrontation; removes him from the kill zone`,
          outcomes: [{ weight: 1, nextNodeId: 'driver_briefed', resourceChanges: { time: -8, credibility: +15 }, revealKnowledge: ['bomb-attempt'], narrativeResult: `He's walked to the station. The bomb is found during processing. Bridge clear.` }],
        },
        {
          id: 'bridge-watch',
          label: `Back off — station a plainclothes officer on him, find the rest of the group`,
          description: `⏱ 30m | Arresting one may warn the others; surveillance gives you more`,
          outcomes: [{ weight: 1, nextNodeId: 'snap_bomb', resourceChanges: { time: -12, credibility: +8 }, revealKnowledge: ['plot-group'] }],
        },
      ],
    },

    // ── DRIVER ────────────────────────────────────────────────────────────────

    driver_briefed: {
      id: 'driver_briefed',
      type: 'standard',
      act: 2,
      title: 'The Driver',
      location: 'Konak Courtyard',
      activeNPC: 'Leopold Loyka, chauffeur',
      npcStats: { receptiveness: 75, authority: 5 },
      narrative: `Leopold Loyka is polishing the Graf & Stift. He's proud of this assignment — biggest of his career.\n\n"The return route," you say. "After city hall. Which way do you go?"\n\nHe walks you through it confidently. He names Franz Josef Street.\n\n"That's wrong," you tell him. "Security corridor says Appel Quay direct, no deviation. Franz Josef Street is not a protected route. If you turn there, the car stalls in a kill zone."\n\nHe frowns. "My briefing said—"\n\n"Your briefing was preliminary. I'm telling you now. Appel Quay only."`,
      options: [
        {
          id: 'driver-confirm',
          label: `Make him repeat the correct route back to you twice`,
          description: `⏱ 10m | Confirm it's in his head, not just heard`,
          outcomes: [{ weight: 1, nextNodeId: 'city_hall', resourceChanges: { time: -3, credibility: +25 }, revealKnowledge: ['wrong-turn', 'driver-name', 'princip-pos'] }],
        },
        {
          id: 'driver-written',
          label: `Write the correct route on paper and put it in his breast pocket`,
          description: `⏱ 5m | Physical reminder for the moment when instinct might override memory`,
          outcomes: [{ weight: 1, nextNodeId: 'city_hall', resourceChanges: { time: -2, credibility: +20 }, revealKnowledge: ['wrong-turn'] }],
        },
      ],
    },

    // ── HARRACH ────────────────────────────────────────────────────────────────

    harrach: {
      id: 'harrach',
      type: 'standard',
      act: 1,
      title: 'Count Harrach',
      location: 'The Konak, Habsburg Residence',
      activeNPC: 'Count Franz von Harrach',
      npcStats: { receptiveness: 35, authority: 75 },
      narrative: `Count Harrach is adjusting his dress uniform and deeply uninterested in a local police captain's concerns.\n\n"The Archduke's protocol has been reviewed at the highest levels. This visit was planned for months." He glances at you. "Do you have specific actionable intelligence, or general anxiety?"\n\nHe's not dismissing you — he's categorizing you. Give him something categorical.`,
      options: [
        {
          id: 'harrach-telegram',
          label: `Hand him the Belgrade telegram — Black Hand, trained, confirmed target`,
          description: `⏱ 15m | Put it in his hands. Make him responsible.`,
          outcomes: [
            { weight: 4, nextNodeId: 'driver_briefed', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['plot-group', 'wrong-turn', 'driver-name'], narrativeResult: `He reads it twice. "The driver," he says finally, and calls for his aide.` },
            { weight: 6, nextNodeId: 'route_walk', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `"Serbian intelligence." He hands it back. "If we acted on every Serbian rumor, we'd never leave Vienna."` },
          ],
        },
        {
          id: 'harrach-driver-direct',
          label: `Skip the argument — ask only that he ensure the driver knows the return route`,
          description: `⏱ 10m | Small ask. Hard to refuse.`,
          outcomes: [{ weight: 1, nextNodeId: 'driver_briefed', resourceChanges: { time: -5, credibility: +10 }, revealKnowledge: ['wrong-turn', 'driver-name'] }],
        },
      ],
    },

    // ── CITY HALL ─────────────────────────────────────────────────────────────

    city_hall: {
      id: 'city_hall',
      type: 'standard',
      act: 2,
      title: 'City Hall',
      location: 'Sarajevo City Hall, Vijećnica',
      activeNPC: 'Archduke Franz Ferdinand',
      npcStats: { receptiveness: 30, authority: 100 },
      narrative: `The motorcade arrived safely. A bomb was thrown at Čumurija Bridge — it bounced off the car's folded hood and exploded under the following vehicle. Two officers wounded, not killed. Franz Ferdinand is furious and unhurt.\n\nHe's in the reception hall, tolerating the mayor's welcome speech with visible contempt. "Your citizens greet me with bombs," he says.\n\nThe return trip begins in twenty minutes. He wants to visit the wounded officers at the hospital — a route deviation that wasn't in Loyka's briefing. This is the wrong turn.`,
      options: [
        {
          id: 'cityhall-driver-now',
          label: `Find Loyka in the courtyard and confirm the route right now`,
          description: `⏱ 5m | He's right outside; the departure is in twenty minutes`,
          outcomes: [{ weight: 1, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +20 }, revealKnowledge: ['wrong-turn', 'driver-name'] }],
        },
        {
          id: 'cityhall-archduke',
          label: `Approach the Archduke directly — warn him the route must stay on the quay`,
          description: `⏱ 10m | He's the only one who can order it`,
          outcomes: [
            { weight: 4, nextNodeId: 'outcome_success', resourceChanges: { time: -5, credibility: +25 }, revealKnowledge: ['princip-pos', 'wrong-turn'] },
            { weight: 6, nextNodeId: 'snap_wrong_turn', resourceChanges: { time: -5, credibility: -5 }, narrativeResult: `A staff officer intercepts you before you reach him.` },
          ],
        },
        {
          id: 'cityhall-junction',
          label: `Station yourself at the Franz Josef Street junction — physically block the turn`,
          description: `⏱ 10m | Be at the kill point before the car arrives`,
          outcomes: [{ weight: 1, nextNodeId: 'snap_wrong_turn', resourceChanges: { time: -5, credibility: +10 } }],
        },
      ],
    },

    // ── SNAP: BOMB ATTEMPT ────────────────────────────────────────────────────

    after_bomb_snap: {
      id: 'after_bomb_snap',
      type: 'standard',
      act: 2,
      title: 'After the Bridge',
      location: 'Appel Quay',
      narrative: `The bomb exploded under the second car. Two wounded. Franz Ferdinand's car accelerated safely through.\n\nČabrinović jumped into the river and swallowed his cyanide — it was old, made him vomit. Police are pulling him out alive.\n\nThe motorcade is at city hall. In twenty minutes it leaves again. The driver still doesn't know not to turn onto Franz Josef Street. Princip is at Schiller Delicatessen, waiting.`,
      options: [
        {
          id: 'after-driver',
          label: `Run to the Konak — brief Loyka before he departs city hall`,
          description: `⏱ 15m | The wrong turn is still coming`,
          outcomes: [{ weight: 1, nextNodeId: 'driver_briefed', resourceChanges: { time: -8, credibility: +10 }, revealKnowledge: ['wrong-turn'] }],
        },
        {
          id: 'after-cityhall',
          label: `Run to city hall — warn the Archduke about the return route`,
          description: `⏱ 15m | He's there now; this is the window`,
          outcomes: [{ weight: 1, nextNodeId: 'city_hall', resourceChanges: { time: -8, credibility: +8 } }],
        },
      ],
    },

    snap_bomb: {
      id: 'snap_bomb',
      type: 'snap',
      act: 2,
      timer: 15,
      title: 'The Grenade',
      location: 'Čumurija Bridge, Appel Quay',
      narrative: `Čabrinović is at the railing. The motorcade is twenty meters away. He pulls the pin.\n\nThe grenade is in the air. You have fifteen seconds.`,
      options: [
        {
          id: 'bomb-shout',
          label: `Shout "BOMB! STOP THE CARS!"`,
          description: `Warn the drivers before impact`,
          outcomes: [
            { weight: 7, nextNodeId: 'after_bomb_snap', resourceChanges: { time: -5, credibility: +10 }, revealKnowledge: ['bomb-attempt'], narrativeResult: `The lead car accelerates. The grenade bounces off the hood of the second car and detonates underneath. Two wounded, not killed.` },
            { weight: 3, nextNodeId: 'after_bomb_snap', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `Your shout is swallowed by the crowd noise. The grenade lands anyway.` },
          ],
        },
        {
          id: 'bomb-tackle',
          label: `Sprint toward Čabrinović — take him down before he throws`,
          description: `Stop the throw if you can reach him in time`,
          outcomes: [
            { weight: 4, nextNodeId: 'driver_briefed', resourceChanges: { time: -5, credibility: +20 }, revealKnowledge: ['bomb-attempt', 'plot-group'], narrativeResult: `You bring him down. The grenade rolls harmlessly into the river. The motorcade continues, unaware.` },
            { weight: 6, nextNodeId: 'after_bomb_snap', resourceChanges: { time: -8, credibility: +8 }, narrativeResult: `Not fast enough. The throw happens. The bomb bounces off the car and detonates behind it.` },
          ],
        },
        {
          id: 'bomb-princip',
          label: `Leave the bomb — run for Schiller Delicatessen`,
          description: `Čabrinović fails anyway; Princip is the one who matters`,
          outcomes: [
            { weight: 1, nextNodeId: 'snap_wrong_turn', resourceChanges: { time: -10, credibility: -5 }, revealKnowledge: ['princip-pos'] },
          ],
        },
      ],
    },

    // ── SNAP: WRONG TURN ──────────────────────────────────────────────────────

    snap_wrong_turn: {
      id: 'snap_wrong_turn',
      type: 'snap',
      act: 3,
      timer: 12,
      title: 'The Turn',
      location: 'Franz Josef Street Junction',
      narrative: `The lead car turns right onto Franz Josef Street. Loyka follows. Schiller Delicatessen is thirty meters ahead. Princip is on the pavement.\n\nYou have twelve seconds.`,
      options: [
        {
          id: 'turn-shout',
          label: `Step into the road and shout "WRONG TURN — BACK TO THE QUAY!"`,
          description: `Force the driver to stop and reverse before he reaches the corner`,
          outcomes: [
            { weight: 7, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +25 }, revealKnowledge: ['wrong-turn'] },
            { weight: 3, nextNodeId: 'outcome_failure', resourceChanges: { time: -3 }, narrativeResult: `The car doesn't stop in time. Loyka tries to reverse. The engine stalls.` },
          ],
        },
        {
          id: 'turn-block',
          label: `Stand directly in front of the car — he has to stop or run you down`,
          description: `Physical block. No ambiguity.`,
          outcomes: [
            { weight: 8, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +20 } },
            { weight: 2, nextNodeId: 'outcome_partial', resourceChanges: { time: -5, credibility: +5 }, narrativeResult: `The car stops but you're thrown back by the bumper. Dislocated shoulder. The Archduke is shaken but unharmed.` },
          ],
        },
        {
          id: 'turn-shoot',
          label: `Fire your pistol into the air — force an emergency stop`,
          description: `Gunshots in Sarajevo today will stop everything`,
          outcomes: [
            { weight: 6, nextNodeId: 'outcome_success', resourceChanges: { time: -3, credibility: +15 } },
            { weight: 4, nextNodeId: 'outcome_partial', resourceChanges: { time: -3, credibility: -10 }, narrativeResult: `The motorcade stops in chaos. Pandemonium. But the car is stopped.` },
          ],
        },
      ],
    },

    // ── OUTCOMES ──────────────────────────────────────────────────────────────

    outcome_success: {
      id: 'outcome_success',
      type: 'outcome',
      title: 'The Motorcade Returns Safely',
      narrative: `Franz Ferdinand and Sophie reach their hotel. Loyka takes the right road.\n\nPrincip stands outside Schiller's Delicatessen and eats his sandwich. He waits for a car that never comes. Eventually, he goes home.\n\nIn Vienna, the telegram reads: minor grenade incident, no casualties among principals, threat neutralized. The generals will find another reason, eventually. Another incident, another ultimatum. But not this one. Not today.\n\nThe war that kills twenty million people is delayed. Whether it is prevented entirely, whether the alliance systems fray before the next trigger — no one can say.\n\nBut Franz Ferdinand and Sophie step out of the car alive. For today, that is everything.`,
      lives: 20000000,
      isSuccess: true,
    },

    outcome_partial: {
      id: 'outcome_partial',
      type: 'outcome',
      title: 'Wounded, Not Killed',
      narrative: `A shot grazes the Archduke's neck. Sophie is unharmed. The car accelerates before a second shot is possible.\n\nFranz Ferdinand survives. He's evacuated to Vienna — a wound that heals in six weeks, a crisis that is managed.\n\nAustria-Hungary demands explanations from Serbia, but without a dead archduke there is no ultimatum. The crisis degrades into bitter diplomatic tension. Damaging. Destabilizing. But not a world war.\n\nYou saved something. Not everything. That is sometimes all there is.`,
      lives: 5000000,
      isSuccess: false,
    },

    outcome_failure: {
      id: 'outcome_failure',
      type: 'outcome',
      title: 'Franz Josef Street',
      narrative: `The car stops at Schiller's. Loyka tries to reverse but the engine stalls.\n\nPrincip is five feet away. He fires twice.\n\nIn the days that follow, Austria-Hungary issues an ultimatum to Serbia. Serbia partially complies — not enough. Austria declares war. Russia mobilizes. Germany declares war on Russia. France is next. Britain is next.\n\nFour years. Twenty million dead. The map of Europe redrawn. Empires dissolved. A century defined by its first catastrophic month.\n\nAll of it from one wrong turn on a street in a city that was celebrating.`,
      lives: 0,
      isSuccess: false,
    },

  },
};
