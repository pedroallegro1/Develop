import { useState, useEffect, useRef } from 'react';

export function SnapDecision({ node, onChoose }) {
  const [timeLeft, setTimeLeft] = useState(node.timer ?? 10);
  const intervalRef = useRef(null);
  const chosenRef = useRef(false);

  useEffect(() => {
    setTimeLeft(node.timer ?? 10);
    chosenRef.current = false;

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          if (!chosenRef.current) {
            chosenRef.current = true;
            // Default: pick last option (usually bad outcome)
            onChoose(node.options[node.options.length - 1].id, true);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [node.id]);

  function handleChoose(id) {
    if (chosenRef.current) return;
    chosenRef.current = true;
    clearInterval(intervalRef.current);
    onChoose(id, false);
  }

  const pct = ((timeLeft / (node.timer ?? 10)) * 100).toFixed(0);
  const urgent = timeLeft <= 3;

  return (
    <div className="snap-overlay">
      <div className={`snap-card ${urgent ? 'urgent' : ''}`}>
        <div className="snap-header">
          <span className="snap-label">⚡ SNAP DECISION ⚡</span>
          <span className={`snap-timer ${urgent ? 'urgent' : ''}`}>
            ⏱ 00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="snap-timer-bar">
          <div
            className={`snap-timer-fill ${urgent ? 'urgent' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="snap-narrative">{node.narrative}</p>

        <div className="snap-choices">
          {node.options.map((opt) => (
            <button
              key={opt.id}
              className="snap-choice"
              onClick={() => handleChoose(opt.id)}
            >
              <span className="snap-choice-label">{opt.label}</span>
              <span className="snap-choice-desc">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
