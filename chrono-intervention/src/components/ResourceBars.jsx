import { useMemo } from 'react';

function ResourceBar({ icon, label, value, colorClass, subtitle }) {
  const pct = Math.max(0, Math.min(100, value));
  const warningClass = pct < 25 ? 'low' : pct < 50 ? 'medium' : '';

  return (
    <div className={`resource-bar-item ${warningClass}`}>
      <div className="resource-label">
        <span className="resource-icon">{icon}</span>
        <span className="resource-name">{label}</span>
        <span className="resource-value">{subtitle || `${Math.round(pct)}%`}</span>
      </div>
      <div className="resource-track">
        <div
          className={`resource-fill ${colorClass} ${warningClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function formatTime(timePct) {
  // 100% = 24h, 0% = 0h
  const totalMinutes = Math.round((timePct / 100) * 24 * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m remaining`;
}

export function ResourceBars({ resources }) {
  const timeSubtitle = useMemo(() => formatTime(resources.time), [resources.time]);

  return (
    <div className="resource-bars">
      <ResourceBar
        icon="⏱"
        label="TIME"
        value={resources.time}
        colorClass="time-fill"
        subtitle={timeSubtitle}
      />
      <ResourceBar
        icon="🎯"
        label="CREDIBILITY"
        value={resources.credibility}
        colorClass="cred-fill"
      />
      <ResourceBar
        icon="🔓"
        label="FREEDOM"
        value={resources.freedom}
        colorClass="freedom-fill"
      />
    </div>
  );
}
