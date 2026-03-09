import { useState } from 'react';
import { DIFFICULTIES, DIFFICULTY_COLORS, applyDifficulty } from '../engine/gameEngine';

// ── Main entry: two-phase flow ──────────────────────────────────────────────
export function StartScreen({ scenarios, onStart }) {
  const [selected, setSelected] = useState(null); // scenario object or null

  if (selected) {
    return (
      <ScenarioSetup
        scenario={selected}
        onStart={onStart}
        onBack={() => setSelected(null)}
      />
    );
  }

  return <MainMenu scenarios={scenarios} onSelect={setSelected} />;
}

// ── Main Menu ───────────────────────────────────────────────────────────────
function MainMenu({ scenarios, onSelect }) {
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
              <ScenarioCard key={s.id} scenario={s} onSelect={onSelect} />
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
  'september-morning':       { period: '2001', lives: '~2,977' },
  'challenger-frozen-oring': { period: '1986', lives: '7' },
  'chernobyl-night-shift':   { period: '1986', lives: '31 – 4,000+' },
  'trojan-horse':            { period: '~1184 BCE', lives: '~35,000' },
  'waterloo-hundred-days':   { period: '1815', lives: '~40,000' },
};

function ScenarioCard({ scenario, onSelect }) {
  const meta = SCENARIO_META[scenario.id] ?? {};
  const diffColor = DIFFICULTY_COLORS[scenario.difficulty] ?? '#facc15';

  return (
    <button className="scenario-pick-card" onClick={() => onSelect(scenario)}>
      <div className="spc-year">{meta.period}</div>
      <h3 className="spc-title">{scenario.title}</h3>
      <p className="spc-subtitle">{scenario.subtitle}</p>
      <p className="spc-tagline">{scenario.tagline}</p>
      <div className="spc-footer">
        <span className="spc-difficulty" style={{ color: diffColor, borderColor: diffColor }}>
          {scenario.difficulty}
        </span>
        {meta.lives && (
          <span className="spc-lives">{meta.lives} lives at stake</span>
        )}
      </div>
    </button>
  );
}

// ── Difficulty setup (after scenario is chosen) ─────────────────────────────
function ScenarioSetup({ scenario, onStart, onBack }) {
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
          <div className="scenario-card-header">
            <h2 className="scenario-title">{scenario.title}</h2>
            <p className="scenario-subtitle">{scenario.subtitle}</p>
          </div>

          <p className="scenario-tagline">{scenario.tagline}</p>

          <div className="difficulty-selector">
            <h3 className="difficulty-label">Difficulty</h3>
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
