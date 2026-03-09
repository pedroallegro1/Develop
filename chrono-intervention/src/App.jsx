import { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { DebriefScreen } from './components/DebriefScreen';
import { initialGameState, GAME_PHASE } from './engine/gameEngine';
import { septemberMorning } from './scenarios/septemberMorning';
import { challengerFrozenORing } from './scenarios/challengerFrozenORing';
import { chernobylNightShift } from './scenarios/chernobylNightShift';
import { trojanHorse } from './scenarios/trojanHorse';
import { waterlooHundredDays } from './scenarios/waterlooHundredDays';
import './App.css';

const SCENARIOS = [septemberMorning, challengerFrozenORing, chernobylNightShift, trojanHorse, waterlooHundredDays];

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'game' | 'debrief'
  const [activeScenario, setActiveScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [debriefData, setDebriefData] = useState(null);

  const handleStart = useCallback((scenario, difficulty = 'Medium') => {
    setActiveScenario(scenario);
    setGameState(initialGameState(scenario, difficulty));
    setScreen('game');
  }, []);

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
    setActiveScenario(null);
    setScreen('start');
  }, []);

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen scenarios={SCENARIOS} onStart={handleStart} />
      )}
      {screen === 'game' && gameState && activeScenario && (
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
