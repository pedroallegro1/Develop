import { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { DebriefScreen } from './components/DebriefScreen';
import { initialGameState, GAME_PHASE } from './engine/gameEngine';
import { septemberMorning } from './scenarios/septemberMorning';
import './App.css';

const SCENARIOS = [septemberMorning];

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'game' | 'debrief'
  const [activeScenario] = useState(SCENARIOS[0]);
  const [gameState, setGameState] = useState(null);
  const [debriefData, setDebriefData] = useState(null);

  const handleStart = useCallback((difficulty = 'Medium') => {
    setGameState(initialGameState(activeScenario, difficulty));
    setScreen('game');
  }, [activeScenario]);

  const handleStateChange = useCallback((newState) => {
    setGameState(newState);
  }, []);

  const handleDebrief = useCallback((outcome, resources, choices) => {
    setDebriefData({ outcome, resources, choices });
    setScreen('debrief');
  }, []);

  const handleRestart = useCallback(() => {
    setGameState(null);
    setDebriefData(null);
    setScreen('start');
  }, []);

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen scenario={activeScenario} onStart={handleStart} />
      )}
      {screen === 'game' && gameState && (
        <GameScreen
          scenario={activeScenario}
          gameState={gameState}
          onStateChange={handleStateChange}
          onDebrief={handleDebrief}
        />
      )}
      {screen === 'debrief' && debriefData && (
        <DebriefScreen
          outcome={debriefData.outcome}
          resources={debriefData.resources}
          choices={debriefData.choices}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
