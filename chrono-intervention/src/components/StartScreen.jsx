export function StartScreen({ scenario, onStart }) {
  const difficultyColor = {
    Easy: '#4ade80',
    Medium: '#facc15',
    'Medium-Hard': '#fb923c',
    Hard: '#f87171',
    Nightmare: '#c084fc',
  };

  return (
    <div className="start-screen">
      <div className="start-inner">
        <div className="start-logo">
          <h1 className="game-title">CHRONO INTERVENTION</h1>
          <p className="game-tagline">"You know what's coming. No one believes you. The clock is ticking."</p>
        </div>

        <div className="scenario-card">
          <div className="scenario-card-header">
            <span
              className="difficulty-badge"
              style={{ color: difficultyColor[scenario.difficulty] ?? '#fff' }}
            >
              {scenario.difficulty}
            </span>
            <h2 className="scenario-title">{scenario.title}</h2>
            <p className="scenario-subtitle">{scenario.subtitle}</p>
          </div>

          <p className="scenario-tagline">{scenario.tagline}</p>

          <div className="scenario-resources">
            <div className="start-resource">
              <span>⏱ Time</span>
              <span>{scenario.timeLabel}</span>
            </div>
            <div className="start-resource">
              <span>🎯 Credibility</span>
              <span>{scenario.startingResources.credibility}% — Nobody knows you</span>
            </div>
            <div className="start-resource">
              <span>🔓 Freedom</span>
              <span>{scenario.startingResources.freedom}% — Undetected</span>
            </div>
          </div>

          <div className="scenario-briefing">
            <h3>HISTORICAL CONTEXT</h3>
            <p>{scenario.historicalContext}</p>
          </div>

          <button className="btn-primary btn-large" onClick={onStart}>
            Begin Scenario
          </button>
        </div>

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
