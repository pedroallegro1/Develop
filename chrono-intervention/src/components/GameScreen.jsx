import { useState, useCallback } from 'react';
import { ResourceBars } from './ResourceBars';
import { KnowledgeInventory } from './KnowledgeInventory';
import { DecisionPanel } from './DecisionPanel';
import { SnapDecision } from './SnapDecision';
import { NarrativeResult } from './NarrativeResult';
import { processChoice, GAME_PHASE } from '../engine/gameEngine';

export function GameScreen({ scenario, gameState, onStateChange, onDebrief }) {
  const [narrativeResult, setNarrativeResult] = useState(null);

  const node = scenario.nodes[gameState.currentNodeId];

  const handleChoose = useCallback((optionId) => {
    const newState = processChoice(gameState, scenario, optionId);

    if (newState.narrativeResult) {
      setNarrativeResult(newState.narrativeResult);
      // Defer state change until narrative is dismissed
      setTimeout(() => {
        onStateChange(newState);
        if (newState.phase === GAME_PHASE.DEBRIEF) {
          onDebrief(newState.outcome, newState.resources, newState.choices);
        }
      }, 3200);
    } else {
      onStateChange(newState);
      if (newState.phase === GAME_PHASE.DEBRIEF) {
        onDebrief(newState.outcome, newState.resources, newState.choices);
      }
    }
  }, [gameState, scenario, onStateChange, onDebrief]);

  const dismissNarrative = useCallback(() => setNarrativeResult(null), []);

  if (!node) {
    return (
      <div className="game-screen error-screen">
        <p>Story node not found: <code>{gameState.currentNodeId}</code></p>
        <p>This path hasn't been written yet — try a different route!</p>
      </div>
    );
  }

  const isSnap = node.type === 'snap';

  return (
    <div className="game-screen">
      <ResourceBars resources={gameState.resources} />

      <div className="game-main">
        <div className="scene-header">
          {node.title && <h2 className="scene-title">{node.title}</h2>}
          <div className="scene-meta">
            {node.location && (
              <span className="scene-location">📍 {node.location}</span>
            )}
            {node.activeNPC && (
              <span className="scene-npc">👤 {node.activeNPC}</span>
            )}
            {node.npcStats && (
              <span className="scene-npc-stats">
                Receptiveness: {node.npcStats.receptiveness}% · Authority: {node.npcStats.authority}%
              </span>
            )}
          </div>
        </div>

        <div className="scene-narrative">
          {node.narrative.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <KnowledgeInventory inventory={gameState.knowledgeInventory} />

        {!isSnap && (
          <DecisionPanel
            options={node.options}
            resources={gameState.resources}
            onChoose={handleChoose}
          />
        )}
      </div>

      {isSnap && (
        <SnapDecision node={node} onChoose={handleChoose} />
      )}

      {narrativeResult && (
        <NarrativeResult text={narrativeResult} onDismiss={dismissNarrative} />
      )}
    </div>
  );
}
