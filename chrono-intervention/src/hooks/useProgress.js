/**
 * useProgress — player progression persistence.
 *
 * Currently backed by localStorage. Designed to be swapped for a
 * server-side API when user accounts are introduced: replace
 * `loadProgress` / `saveProgress` with API calls inside the hook,
 * keeping the same public interface (recordCompletion, isBrutalUnlocked,
 * unlockProgress) so call-sites need no changes.
 */

import { useState, useCallback } from 'react';

// ── Storage primitives ───────────────────────────────────────────────────────

function storageKey(userId) {
  return userId ? `chrono-progress-v1-${userId}` : 'chrono-progress-v1';
}

function loadProgress(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : { completions: [] };
  } catch {
    return { completions: [] };
  }
}

function saveProgress(userId, data) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(data));
  } catch {
    // Storage unavailable (private browsing quota, etc.) — silently ignore
  }
}

// ── Tier mapping ─────────────────────────────────────────────────────────────

/** Maps scenario.difficulty → display tier used for unlock logic. */
export function getTier(difficulty) {
  if (difficulty === 'Hard')      return 'Demanding';
  if (difficulty === 'Very Hard') return 'Brutal';
  return 'Accessible'; // 'Easy' | 'Medium'
}

// ── Unlock rules ─────────────────────────────────────────────────────────────

/**
 * Brutal scenarios unlock when the player has completed:
 *   - 2 distinct Accessible scenarios, OR
 *   - 1 distinct Demanding scenario
 *
 * Any completion (success, partial, or failure) counts — engaging with
 * the content is the bar, not winning it.
 */
function computeUnlock(completions) {
  const accessible = new Set(
    completions
      .filter(c => getTier(c.difficulty) === 'Accessible')
      .map(c => c.scenarioId)
  );
  const demanding = new Set(
    completions
      .filter(c => getTier(c.difficulty) === 'Demanding')
      .map(c => c.scenarioId)
  );

  return {
    accessible: accessible.size,
    demanding:  demanding.size,
    unlocked:   accessible.size >= 2 || demanding.size >= 1,
  };
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useProgress(userId) {
  const [data, setData] = useState(() => loadProgress(userId));

  /**
   * Record a scenario completion.
   * If the player has beaten the same scenario+difficulty before,
   * only the best star rating is kept.
   */
  const recordCompletion = useCallback((scenarioId, difficulty, stars) => {
    setData(prev => {
      const idx = prev.completions.findIndex(
        c => c.scenarioId === scenarioId && c.difficulty === difficulty
      );
      const entry = {
        scenarioId,
        difficulty,
        stars,
        completedAt: new Date().toISOString(),
      };
      const completions =
        idx >= 0
          ? prev.completions.map((c, i) =>
              i === idx ? (stars >= c.stars ? entry : c) : c
            )
          : [...prev.completions, entry];

      const next = { ...prev, completions };
      saveProgress(userId, next);
      return next;
    });
  }, []);

  const { accessible, demanding, unlocked } = computeUnlock(data.completions);

  return {
    recordCompletion,
    /** True when Brutal scenarios are accessible. */
    isBrutalUnlocked: unlocked,
    /** Counts of distinct completed scenarios per tier — used for progress display. */
    unlockProgress: { accessible, demanding },
  };
}
