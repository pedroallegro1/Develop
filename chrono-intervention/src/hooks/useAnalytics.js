/**
 * useAnalytics — global community stats via Supabase.
 *
 * Tracks play completions and ratings across all players.
 * Degrades gracefully when VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
 * are not set: all functions become no-ops and communityStats stays empty.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * communityStats shape:
 *   {
 *     [scenarioId]: {
 *       plays:       number,   // total games started
 *       successRate: number,   // 0-100 integer percentage
 *       avgStars:    number,   // 1-5 score average
 *       avgRating:   number | null,  // 1-5 user rating average (null if no ratings yet)
 *       ratingCount: number,
 *     }
 *   }
 */

export function useAnalytics() {
  const [communityStats, setCommunityStats] = useState({});

  // Fetch aggregated stats once on mount
  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('scenario_stats')
      .select('scenario_id, plays, success_rate, avg_stars, avg_rating, rating_count')
      .then(({ data, error }) => {
        if (error || !data) return;
        const map = {};
        for (const row of data) {
          map[row.scenario_id] = {
            plays:       row.plays,
            successRate: row.success_rate,
            avgStars:    row.avg_stars,
            avgRating:   row.avg_rating,
            ratingCount: row.rating_count,
          };
        }
        setCommunityStats(map);
      });
  }, []);

  /**
   * Fire-and-forget insert into play_events.
   * Called when a scenario run ends (win or loss).
   */
  const trackPlay = useCallback((scenarioId, difficulty, won, stars) => {
    if (!supabase) return;
    supabase
      .from('play_events')
      .insert({ scenario_id: scenarioId, difficulty, won, stars })
      .then(({ error }) => {
        if (error) console.warn('[analytics] trackPlay failed:', error.message);
        else {
          // Optimistically update local community stats
          setCommunityStats(prev => {
            const s = prev[scenarioId] ?? { plays: 0, successRate: 0, avgStars: 0, avgRating: null, ratingCount: 0 };
            const newPlays = s.plays + 1;
            const prevWins = Math.round(s.plays * s.successRate / 100);
            const newWins  = prevWins + (won ? 1 : 0);
            const prevStarsTotal = s.avgStars * s.plays;
            return {
              ...prev,
              [scenarioId]: {
                ...s,
                plays:       newPlays,
                successRate: Math.round((newWins / newPlays) * 100),
                avgStars:    Math.round(((prevStarsTotal + stars) / newPlays) * 10) / 10,
              },
            };
          });
        }
      });
  }, []);

  /**
   * Fire-and-forget insert into rating_events.
   * Called when a user submits their 1-5 star rating on the debrief screen.
   */
  const trackRating = useCallback((scenarioId, rating) => {
    if (!supabase) return;
    supabase
      .from('rating_events')
      .insert({ scenario_id: scenarioId, rating })
      .then(({ error }) => {
        if (error) console.warn('[analytics] trackRating failed:', error.message);
        else {
          // Optimistically update local community stats
          setCommunityStats(prev => {
            const s = prev[scenarioId] ?? { plays: 0, successRate: 0, avgStars: 0, avgRating: null, ratingCount: 0 };
            const prevCount = s.ratingCount ?? 0;
            const prevTotal = (s.avgRating ?? 0) * prevCount;
            const newCount  = prevCount + 1;
            return {
              ...prev,
              [scenarioId]: {
                ...s,
                avgRating:   Math.round(((prevTotal + rating) / newCount) * 10) / 10,
                ratingCount: newCount,
              },
            };
          });
        }
      });
  }, []);

  return { communityStats, trackPlay, trackRating };
}
