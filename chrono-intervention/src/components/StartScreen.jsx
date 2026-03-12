import { useState } from 'react';
import { DIFFICULTIES, DIFFICULTY_COLORS, applyDifficulty } from '../engine/gameEngine';

// ── Main entry: two-phase flow ──────────────────────────────────────────────
export function StartScreen({ scenarios, onStart, isBrutalUnlocked, unlockProgress, scenarioStats, scenarioRatings, communityStats }) {
  const [selected, setSelected] = useState(null); // scenario object or null

  if (selected) {
    return (
      <ScenarioSetup
        scenario={selected}
        onStart={onStart}
        onBack={() => setSelected(null)}
        avgRating={scenarioRatings?.[selected.id]}
        communityData={communityStats?.[selected.id]}
      />
    );
  }

  return (
    <MainMenu
      scenarios={scenarios}
      onSelect={setSelected}
      isBrutalUnlocked={isBrutalUnlocked}
      unlockProgress={unlockProgress}
      scenarioStats={scenarioStats}
      scenarioRatings={scenarioRatings}
      communityStats={communityStats}
    />
  );
}

// ── Main Menu ───────────────────────────────────────────────────────────────
function MainMenu({ scenarios, onSelect, isBrutalUnlocked, unlockProgress, scenarioStats, scenarioRatings, communityStats }) {
  return (
    <div className="menu-screen">
      <div className="menu-inner">

        <header className="menu-hero">
          <div className="menu-logo-eyebrow">CHRONO INTERVENTION</div>
          <h1 className="menu-headline">
            You know what happens next.<br />
            <span className="menu-headline-dim">Nobody believes you.</span>
          </h1>
          <p className="menu-pitch">
            You arrive hours before a historical disaster with complete foreknowledge
            and almost zero credibility. Navigate bureaucracy, convince the unconvinceable,
            and spend your limited time and freedom wisely — or watch history repeat itself.
          </p>
        </header>

        <section className="menu-mechanics">
          <h2 className="menu-section-label">How It Works</h2>
          <div className="mechanic-grid">
            <div className="mechanic-card">
              <div className="mechanic-icon">⏱</div>
              <h3>Resources</h3>
              <p>
                Three meters govern every run: <span className="mc-time">Time</span> (hours until disaster),{' '}
                <span className="mc-cred">Credibility</span> (whether anyone listens),
                and <span className="mc-freedom">Freedom</span> (how long before you're stopped).
                Every choice costs something.
              </p>
            </div>
            <div className="mechanic-card">
              <div className="mechanic-icon">📋</div>
              <h3>Knowledge</h3>
              <p>
                You carry facts no one else has: names, dates, technical failures.
                Revealing the right piece of knowledge to the right person at the right moment
                can shift the odds. Reveal too much too soon and you'll be dismissed as a crank.
              </p>
            </div>
            <div className="mechanic-card">
              <div className="mechanic-icon">⚡</div>
              <h3>Snap Decisions</h3>
              <p>
                Some moments don't wait. A countdown appears and history moves
                whether or not you're ready. The correct move under pressure
                is rarely the obvious one.
              </p>
            </div>
          </div>
        </section>

        <section className="menu-scenarios">
          <h2 className="menu-section-label">Choose Your Intervention</h2>
          <div className="scenario-grid">
            {scenarios.map((s) => (
              <ScenarioCard
                key={s.id}
                scenario={s}
                onSelect={onSelect}
                isBrutalUnlocked={isBrutalUnlocked}
                unlockProgress={unlockProgress}
                stats={scenarioStats?.[s.id]}
                avgRating={scenarioRatings?.[s.id]}
                communityData={communityStats?.[s.id]}
              />
            ))}
          </div>
        </section>

        <footer className="menu-footer">
          <p>
            This game deals with real historical events involving mass casualties.
            It is designed to be educational and thought-provoking, not exploitative.
          </p>
        </footer>

      </div>
    </div>
  );
}

// ── Scenario card ───────────────────────────────────────────────────────────
const SCENARIO_META = {
  'september-morning':       { period: '2001',      lives: '~2,977',              coverImage: '/images/scenarios/september-morning.jpg' },
  'challenger-frozen-oring': { period: '1986',      lives: '7',                   coverImage: '/images/scenarios/challenger-frozen-oring.jpg' },
  'chernobyl-night-shift':   { period: '1986',      lives: '31 – 4,000+',         coverImage: '/images/scenarios/chernobyl-night-shift.jpg' },
  'trojan-horse':            { period: '~1184 BCE', lives: '~35,000',             coverImage: '/images/scenarios/trojan-horse.jpg' },
  'waterloo-hundred-days':   { period: '1815',      lives: '~40,000',             coverImage: '/images/scenarios/waterloo-hundred-days.jpg' },
  'sarajevo-assassination':  { period: '1914',      lives: '~20,000,000',         coverImage: '/images/scenarios/sarajevo-assassination.jpg' },
  'constantinople-fall':     { period: '1453',      lives: '~4,000',              coverImage: '/images/scenarios/constantinople-fall.jpg' },
  'india-partition':         { period: '1947',      lives: '200,000 – 2,000,000', coverImage: '/images/scenarios/india-partition.jpg' },
};

const COMPLEXITY_MAP = {
  Easy:        { label: 'Accessible', color: '#4ade80' },
  Medium:      { label: 'Accessible', color: '#4ade80' },
  Hard:        { label: 'Demanding',  color: '#fb923c' },
  'Very Hard': { label: 'Brutal',     color: '#f87171' },
};

function ScenarioStats({ stats, avgRating, communityData }) {
  const hasPersonal   = stats && stats.timesPlayed > 0;
  const hasCommunity  = communityData && communityData.plays > 0;
  if (!hasPersonal && !hasCommunity) return null;

  const personalSuccessRate = hasPersonal ? Math.round((stats.timesWon / stats.timesPlayed) * 100) : null;

  return (
    <div className="spc-stats-block">
      {hasPersonal && (
        <div className="spc-stats spc-stats--personal">
          <span className="spc-stat-label">You</span>
          <span className="spc-stat">{stats.timesPlayed} played</span>
          <span className="spc-stat-sep">·</span>
          <span className="spc-stat">{personalSuccessRate}% success</span>
          {avgRating != null && (
            <>
              <span className="spc-stat-sep">·</span>
              <span className="spc-stat">★ {avgRating.toFixed(1)}</span>
            </>
          )}
        </div>
      )}
      {hasCommunity && (
        <div className="spc-stats spc-stats--community">
          <span className="spc-stat-label">All players</span>
          <span className="spc-stat">{communityData.plays.toLocaleString()} played</span>
          <span className="spc-stat-sep">·</span>
          <span className="spc-stat">{communityData.successRate}% success</span>
          {communityData.avgRating != null && (
            <>
              <span className="spc-stat-sep">·</span>
              <span className="spc-stat">★ {Number(communityData.avgRating).toFixed(1)}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ScenarioCard({ scenario, onSelect, isBrutalUnlocked, unlockProgress, stats, avgRating, communityData }) {
  const meta       = SCENARIO_META[scenario.id] ?? {};
  const complexity = COMPLEXITY_MAP[scenario.difficulty] ?? COMPLEXITY_MAP['Medium'];
  const isBrutal   = scenario.difficulty === 'Very Hard';
  const locked     = isBrutal && !isBrutalUnlocked;

  if (locked) {
    return (
      <LockedBrutalCard
        scenario={scenario}
        meta={meta}
        complexity={complexity}
        unlockProgress={unlockProgress}
      />
    );
  }

  return (
    <button className="scenario-pick-card" onClick={() => onSelect(scenario)}>
      {meta.coverImage && (
        <div className="spc-cover-wrap">
          <img className="spc-cover-img" src={meta.coverImage} alt="" aria-hidden="true" />
        </div>
      )}
      <div className="spc-year">{meta.period}</div>
      <h3 className="spc-title">{scenario.title}</h3>
      <p className="spc-subtitle">{scenario.subtitle}</p>
      <p className="spc-tagline">{scenario.tagline}</p>
      <div className="spc-footer">
        <span className="spc-difficulty" style={{ color: complexity.color, borderColor: complexity.color }}>
          {complexity.label}
        </span>
        {meta.lives && (
          <span className="spc-lives">{meta.lives} lives at stake</span>
        )}
      </div>
      <ScenarioStats stats={stats} avgRating={avgRating} communityData={communityData} />
    </button>
  );
}

function LockedBrutalCard({ scenario, meta, complexity, unlockProgress }) {
  const { accessible, demanding } = unlockProgress;
  // Which path is closer to unlocking?
  const accessibleNeeded = Math.max(0, 2 - accessible);
  const demandingNeeded  = Math.max(0, 1 - demanding);

  let hint;
  if (accessible === 1 && demanding === 0) {
    hint = '1 more Accessible scenario, or 1 Demanding scenario';
  } else if (accessible === 0 && demanding === 0) {
    hint = '2 Accessible scenarios, or 1 Demanding scenario';
  } else if (accessibleNeeded > 0 && demandingNeeded === 0) {
    // shouldn't happen (would be unlocked) but just in case
    hint = 'Complete 1 Demanding scenario';
  } else {
    hint = `${accessibleNeeded} more Accessible, or ${demandingNeeded} Demanding`;
  }

  return (
    <div
      className="scenario-pick-card scenario-pick-card--locked"
      role="img"
      aria-label={`${scenario.title} — locked`}
    >
      {meta.coverImage && (
        <div className="spc-cover-wrap">
          <img className="spc-cover-img" src={meta.coverImage} alt="" aria-hidden="true" />
        </div>
      )}
      <div className="spc-year">{meta.period}</div>
      <h3 className="spc-title">{scenario.title}</h3>
      <p className="spc-subtitle">{scenario.subtitle}</p>
      <p className="spc-tagline spc-tagline--locked">{scenario.tagline}</p>

      <div className="spc-lock-banner">
        <div className="spc-lock-top">
          <svg className="spc-lock-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="10" height="8" rx="1.5" fill="currentColor" opacity="0.9"/>
            <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="spc-lock-label">Brutal — Locked</span>
        </div>
        <p className="spc-lock-req">Complete {hint} to unlock</p>
        <div className="spc-lock-progress">
          <span className={accessible >= 1 ? 'spc-pip spc-pip--done' : 'spc-pip'} />
          <span className={accessible >= 2 ? 'spc-pip spc-pip--done' : 'spc-pip'} />
          <span className="spc-pip-sep">Accessible</span>
          <span className="spc-pip-or">or</span>
          <span className={demanding >= 1 ? 'spc-pip spc-pip--done' : 'spc-pip'} />
          <span className="spc-pip-sep">Demanding</span>
        </div>
      </div>
    </div>
  );
}

// ── Difficulty setup (after scenario is chosen) ─────────────────────────────
function ScenarioSetup({ scenario, onStart, onBack, avgRating, communityData }) {
  const difficulties = DIFFICULTIES;
  const defaultIndex = difficulties.indexOf('Medium');
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const difficulty = difficulties[selectedIndex];
  const resources = applyDifficulty(scenario.startingResources, difficulty);

  const difficultyDescriptions = {
    Easy:        'More time, higher starting credibility. Good for first-timers.',
    Medium:      'Balanced. The intended experience.',
    Hard:        'Tight timeline. You start as a nobody. Think carefully.',
    'Very Hard': 'One wrong move and the window closes. Near-impossible.',
  };

  return (
    <div className="start-screen">
      <div className="start-inner">

        <div className="start-logo">
          <h1 className="game-title">CHRONO INTERVENTION</h1>
        </div>

        <div className="scenario-card">
          {SCENARIO_META[scenario.id]?.coverImage && (
            <div className="scenario-cover-wrap">
              <img className="scenario-cover-img" src={SCENARIO_META[scenario.id].coverImage} alt="" aria-hidden="true" />
            </div>
          )}
          <div className="scenario-card-header">
            <h2 className="scenario-title">{scenario.title}</h2>
            <p className="scenario-subtitle">{scenario.subtitle}</p>
            {communityData && communityData.plays > 0 && (
              <div className="scenario-community-stats">
                <span>{communityData.plays.toLocaleString()} players worldwide</span>
                <span className="spc-stat-sep">·</span>
                <span>{communityData.successRate}% success rate</span>
                {communityData.avgRating != null && (
                  <>
                    <span className="spc-stat-sep">·</span>
                    <span>★ {Number(communityData.avgRating).toFixed(1)} avg</span>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="scenario-tagline">{scenario.tagline}</p>

          <div className="difficulty-selector">
            <h3 className="difficulty-label">Starting Conditions</h3>
            <div className="difficulty-options">
              {difficulties.map((d, i) => (
                <button
                  key={d}
                  className={`difficulty-btn${i === selectedIndex ? ' selected' : ''}`}
                  style={i === selectedIndex ? { borderColor: DIFFICULTY_COLORS[d], color: DIFFICULTY_COLORS[d] } : {}}
                  onClick={() => setSelectedIndex(i)}
                >
                  {d}
                </button>
              ))}
            </div>
            <p className="difficulty-desc">{difficultyDescriptions[difficulty]}</p>
          </div>

          <div className="scenario-resources">
            <div className="start-resource">
              <span>⏱ Time</span>
              <span>{resources.time} units</span>
            </div>
            <div className="start-resource">
              <span>🎯 Credibility</span>
              <span>{resources.credibility}%</span>
            </div>
            <div className="start-resource">
              <span>🔓 Freedom</span>
              <span>{resources.freedom}%</span>
            </div>
          </div>

          <div className="scenario-briefing">
            <h3>Historical Context</h3>
            <p>{scenario.historicalContext}</p>
          </div>

          <button className="btn-primary btn-large" onClick={() => onStart(scenario, difficulty)}>
            Begin Scenario
          </button>

          <button className="btn-back" onClick={onBack}>
            ← Back to scenarios
          </button>
        </div>

      </div>
    </div>
  );
}
