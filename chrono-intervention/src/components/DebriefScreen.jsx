import { useState } from 'react';
import { computeScore } from '../engine/gameEngine';

const STARS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];

function FeedbackRating({ onRate }) {
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(0);

  const handleClick = (star) => {
    if (submitted) return;
    setSubmitted(star);
    onRate(star);
  };

  return (
    <section className="debrief-feedback">
      <h2>RATE THIS SCENARIO</h2>
      {submitted ? (
        <p className="feedback-thanks">Thanks for the feedback! You rated it {submitted}/5.</p>
      ) : (
        <div className="feedback-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`feedback-star ${star <= (hovered || submitted) ? 'active' : ''}`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleClick(star)}
              aria-label={`Rate ${star} out of 5`}
            >
              ★
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export function DebriefScreen({ outcome, resources, choices, history, rewoundCount, maxRewinds, onRewind, onRestart, onRate }) {
  const score = computeScore(resources, outcome);
  const livesPercent = outcome.maxLives > 0
    ? Math.round((outcome.livesSaved / outcome.maxLives) * 100)
    : 0;

  const rewindsLeft = maxRewinds - rewoundCount;
  const canRewind = rewindsLeft > 0 && history.length > 0;

  return (
    <div className="debrief-screen">
      <div className="debrief-inner">
        <header className="debrief-header">
          <h1 className="debrief-title">{outcome.title}</h1>
          <div className="debrief-stars" aria-label={`${score.stars} out of 5 stars`}>
            {STARS[score.stars]}
          </div>
        </header>

        <section className="debrief-narrative">
          <p>{outcome.narrative}</p>
        </section>

        <section className="debrief-stats">
          <h2>MISSION OUTCOME</h2>
          <div className="debrief-stat-grid">
            <div className="debrief-stat">
              <div className="debrief-stat-value lives">{outcome.livesSaved.toLocaleString()}</div>
              <div className="debrief-stat-label">Lives Saved</div>
              <div className="debrief-stat-sub">out of {outcome.maxLives.toLocaleString()} ({livesPercent}%)</div>
            </div>
            <div className="debrief-stat">
              <div className="debrief-stat-value cred">{Math.round(resources.credibility)}%</div>
              <div className="debrief-stat-label">Credibility Remaining</div>
            </div>
            <div className="debrief-stat">
              <div className="debrief-stat-value freedom">{Math.round(resources.freedom)}%</div>
              <div className="debrief-stat-label">Freedom Status</div>
            </div>
            <div className="debrief-stat">
              <div className="debrief-stat-value score">{score.total}</div>
              <div className="debrief-stat-label">Total Score</div>
            </div>
          </div>
        </section>

        {outcome.achievements && outcome.achievements.length > 0 && (
          <section className="debrief-achievements">
            <h2>ACHIEVEMENTS UNLOCKED</h2>
            <ul>
              {outcome.achievements.map((a) => (
                <li key={a.id} className="achievement">
                  <span className="achievement-icon">🏆</span>
                  <div>
                    <strong>{a.label}</strong>
                    <p>{a.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="debrief-history">
          <h2>WHAT ACTUALLY HAPPENED</h2>
          <p>{outcome.historical}</p>
        </section>

        {outcome.epilogue && (
          <section className="debrief-epilogue">
            <h2>BUTTERFLY EFFECT</h2>
            <p>{outcome.epilogue}</p>
          </section>
        )}

        {choices.length > 0 && (
          <section className="debrief-path">
            <div className="debrief-path-header">
              <h2>YOUR PATH</h2>
              {canRewind && (
                <span className="rewind-remaining">
                  ↩ {rewindsLeft} rewind{rewindsLeft !== 1 ? 's' : ''} remaining
                </span>
              )}
              {!canRewind && rewoundCount > 0 && (
                <span className="rewind-exhausted">No rewinds left</span>
              )}
            </div>
            <p className="rewind-hint">
              {canRewind
                ? 'Click any decision to rewind and play from that point.'
                : null}
            </p>
            <ol className="choice-log">
              {choices.map((c, i) => (
                <li key={i} className={`choice-log-item ${canRewind ? 'rewindable' : ''}`}>
                  <span className="choice-log-label">{c.label}</span>
                  {canRewind && (
                    <button
                      className="btn-rewind"
                      onClick={() => onRewind(i)}
                      title={`Rewind to before this decision`}
                    >
                      ↩ Rewind
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        {onRate && <FeedbackRating onRate={onRate} />}

        <div className="debrief-actions">
          <button className="btn-primary" onClick={onRestart}>
            New Scenario
          </button>
        </div>
      </div>
    </div>
  );
}
