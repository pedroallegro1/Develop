import { useState } from 'react';

const credibilityBadge = {
  'very high': { label: '★★★', cls: 'cred-very-high' },
  high:        { label: '★★', cls: 'cred-high' },
  medium:      { label: '★', cls: 'cred-medium' },
  low:         { label: '◇', cls: 'cred-low' },
};

export function KnowledgeInventory({ inventory }) {
  const [open, setOpen] = useState(false);
  const revealed = inventory.filter((k) => k.revealed).length;

  return (
    <div className="knowledge-inventory">
      <button
        className="knowledge-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>📋 KNOWLEDGE INVENTORY</span>
        <span className="knowledge-count">
          {revealed}/{inventory.length} revealed
        </span>
        <span className="knowledge-chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul className="knowledge-list">
          {inventory.map((item) => {
            const badge = credibilityBadge[item.credibilityValue] ?? credibilityBadge.low;
            return (
              <li key={item.id} className={`knowledge-item ${item.revealed ? 'revealed' : 'hidden'}`}>
                <span className="knowledge-check">{item.revealed ? '☑' : '☐'}</span>
                <span className="knowledge-label">{item.label}</span>
                {item.revealed && (
                  <span className={`knowledge-badge ${badge.cls}`} title="Credibility value">
                    {badge.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
