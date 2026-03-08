import { useState } from 'react';
import { DIFFICULTIES, DIFFICULTY_COLORS, applyDifficulty } from '../engine/gameEngine';

export function StartScreen({ scenario, onStart }) {
  return (
    <div className="start-screen">
      <div className="start-inner">
        <div className="start-logo">
          <h1 className="game-title">CHRONO INTERVENTION</h1>
          <p className="game-tagline">"You know what's coming. No one believes you. The clock is ticking."</p>
        </div>

        <DifficultySelector scenario={scenario} onStart={onStart} />

        <footer className="start-footer">
          <p>
            This game deals with real historical events involving mass casualties.
            It is designed to be educational and thought-provoking, not exploitative.
          </p>
        </footer>
      </div>
    </div>
  );
}

function DifficultySelector({ scenario, onStart }) {
  const difficulties = DIFFICULTIES;
  const defaultIndex = difficulties.indexOf('Medium');

  // Use a simple array index stored in a ref-like way — keep it minimal with useState
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
    <div className="scenario-card">
      <div className="scenario-card-header">
        <h2 className="scenario-title">{scenario.title}</h2>
        <p className="scenario-subtitle">{scenario.subtitle}</p>
      </div>

      <p className="scenario-tagline">{scenario.tagline}</p>

      <div className="difficulty-selector">
        <h3 className="difficulty-label">DIFFICULTY</h3>
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
        <h3>HISTORICAL CONTEXT</h3>
        <p>{scenario.historicalContext}</p>
      </div>

      <button className="btn-primary btn-large" onClick={() => onStart(difficulty)}>
        Begin Scenario
      </button>
    </div>
  );
}
