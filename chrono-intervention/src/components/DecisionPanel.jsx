export function DecisionPanel({ options, resources, onChoose }) {
  return (
    <div className="decision-panel">
      <h3 className="decision-heading">CHOOSE YOUR ACTION:</h3>
      <div className="decision-options">
        {options.map((opt, i) => {
          const keys = ['A', 'B', 'C', 'D'];
          const disabled = isOptionDisabled(opt, resources);
          return (
            <button
              key={opt.id}
              className={`decision-option ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onChoose(opt.id)}
              disabled={disabled}
              aria-label={opt.label}
            >
              <span className="option-key">[{keys[i] ?? i + 1}]</span>
              <div className="option-body">
                <span className="option-label">{opt.label}</span>
                <span className="option-description">{opt.description}</span>
                {disabled && (
                  <span className="option-locked">🔒 Insufficient credibility or freedom</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function isOptionDisabled(option, resources) {
  const req = option.requirements;
  if (!req) return false;
  if (req.minCredibility && resources.credibility < req.minCredibility) return true;
  if (req.minFreedom && resources.freedom < req.minFreedom) return true;
  return false;
}
