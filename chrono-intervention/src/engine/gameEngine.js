// Core game state machine for Chrono Intervention

export const GAME_PHASE = {
  START: 'start',
  PLAYING: 'playing',
  SNAP: 'snap',
  DEBRIEF: 'debrief',
};

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Very Hard'];

// Modifiers applied on top of scenario's startingResources
const DIFFICULTY_MODIFIERS = {
  Easy:      { time: +20, credibility: +25, freedom: +5 },
  Medium:    { time:   0, credibility:   0, freedom:  0 },
  Hard:      { time: -20, credibility: -15, freedom: -10 },
  'Very Hard': { time: -40, credibility: -25, freedom: -20 },
};

export const DIFFICULTY_COLORS = {
  Easy:        '#4ade80',
  Medium:      '#facc15',
  Hard:        '#fb923c',
  'Very Hard': '#f87171',
};

export const applyDifficulty = (baseResources, difficulty) => {
  const mod = DIFFICULTY_MODIFIERS[difficulty] ?? DIFFICULTY_MODIFIERS['Medium'];
  return {
    time:        Math.max(10, Math.min(100, baseResources.time        + mod.time)),
    credibility: Math.max(5,  Math.min(100, baseResources.credibility + mod.credibility)),
    freedom:     Math.max(10, Math.min(100, baseResources.freedom     + mod.freedom)),
  };
};

export const initialGameState = (scenario, difficulty = 'Medium') => ({
  phase: GAME_PHASE.PLAYING,
  scenarioId: scenario.id,
  difficulty,
  currentNodeId: scenario.startNodeId,
  resources: applyDifficulty(scenario.startingResources, difficulty),
  knowledgeInventory: scenario.knowledgeInventory.map((k) => ({ ...k })),
  visitedNodes: [],
  choices: [], // { nodeId, optionId, label }
  snapTimer: null,
  outcome: null,
});

export function applyResourceChanges(resources, changes) {
  return {
    time: Math.max(0, Math.min(100, resources.time + (changes.time ?? 0))),
    credibility: Math.max(0, Math.min(100, resources.credibility + (changes.credibility ?? 0))),
    freedom: Math.max(0, Math.min(100, resources.freedom + (changes.freedom ?? 0))),
  };
}

export function revealKnowledge(inventory, ids) {
  return inventory.map((k) =>
    ids.includes(k.id) ? { ...k, revealed: true } : k
  );
}

export function processChoice(state, scenario, optionId) {
  const node = scenario.nodes[state.currentNodeId];
  const option = node.options.find((o) => o.id === optionId);
  if (!option) return state;

  // Pick weighted outcome
  const nextOutcome = pickWeightedOutcome(option.outcomes, state.resources);
  const newResources = applyResourceChanges(state.resources, nextOutcome.resourceChanges ?? {});
  const newInventory = nextOutcome.revealKnowledge
    ? revealKnowledge(state.knowledgeInventory, nextOutcome.revealKnowledge)
    : state.knowledgeInventory;

  const nextNodeId = nextOutcome.nextNodeId;
  const nextNode = scenario.nodes[nextNodeId];

  return {
    ...state,
    currentNodeId: nextNodeId,
    resources: newResources,
    knowledgeInventory: newInventory,
    visitedNodes: [...state.visitedNodes, state.currentNodeId],
    choices: [...state.choices, { nodeId: state.currentNodeId, optionId, label: option.label }],
    narrativeResult: nextOutcome.narrativeResult ?? null,
    phase: nextNode?.type === 'outcome' ? GAME_PHASE.DEBRIEF : GAME_PHASE.PLAYING,
    outcome: nextNode?.type === 'outcome' ? nextNode : null,
  };
}

function pickWeightedOutcome(outcomes, resources) {
  // Filter by resource requirements if any
  const eligible = outcomes.filter((o) => {
    if (!o.requirements) return true;
    const r = o.requirements;
    if (r.minCredibility && resources.credibility < r.minCredibility) return false;
    if (r.minFreedom && resources.freedom < r.minFreedom) return false;
    return true;
  });

  const pool = eligible.length > 0 ? eligible : outcomes;
  const totalWeight = pool.reduce((sum, o) => sum + (o.weight ?? 1), 0);
  let rand = Math.random() * totalWeight;
  for (const o of pool) {
    rand -= o.weight ?? 1;
    if (rand <= 0) return o;
  }
  return pool[pool.length - 1];
}

export function computeScore(resources, outcome) {
  const livesSaved = outcome?.livesSaved ?? 0;
  const maxLives = outcome?.maxLives ?? 1;
  const livesScore = Math.round((livesSaved / maxLives) * 50);
  const credScore = Math.round((resources.credibility / 100) * 25);
  const freedomScore = Math.round((resources.freedom / 100) * 25);
  const total = livesScore + credScore + freedomScore;
  let stars = 1;
  if (total >= 80) stars = 5;
  else if (total >= 60) stars = 4;
  else if (total >= 40) stars = 3;
  else if (total >= 20) stars = 2;
  return { total, stars, livesScore, credScore, freedomScore };
}
