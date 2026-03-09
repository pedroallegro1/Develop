import { useState, useCallback } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { DebriefScreen } from './components/DebriefScreen';
import { initialGameState, GAME_PHASE, computeScore } from './engine/gameEngine';
import { useProgress } from './hooks/useProgress';
import { septemberMorning } from './scenarios/septemberMorning';
import { challengerFrozenORing } from './scenarios/challengerFrozenORing';
import { chernobylNightShift } from './scenarios/chernobylNightShift';
import { trojanHorse } from './scenarios/trojanHorse';
import { waterlooHundredDays } from './scenarios/waterlooHundredDays';
import { sarajevoAssassination } from './scenarios/sarajevoAssassination';
import { constantinopleFall } from './scenarios/constantinopleFall';
import { indiaPartition } from './scenarios/indiaPartition';
import './App.css';

const SCENARIOS = [
  septemberMorning,
  challengerFrozenORing,
  chernobylNightShift,
  trojanHorse,
  waterlooHundredDays,
  sarajevoAssassination,
  constantinopleFall,
  indiaPartition,
];
const MAX_REWINDS = 2;

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'game' | 'debrief'
  const [activeScenario, setActiveScenario] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [debriefData, setDebriefData] = useState(null);
  const [history, setHistory] = useState([]); // GameState snapshot before each choice
  const [rewoundCount, setRewoundCount] = useState(0);

  const { recordCompletion, isBrutalUnlocked, unlockProgress } = useProgress();

  const handleStart = useCallback((scenario, difficulty = 'Medium') => {
    setActiveScenario(scenario);
    setGameState(initialGameState(scenario, difficulty));
    setHistory([]);
    setRewoundCount(0);
    setScreen('game');
  }, []);

  const handleSnapshot = useCallback((snapshot) => {
    setHistory(prev => [...prev, snapshot]);
  }, []);

  const handleStateChange = useCallback((newState) => {
    setGameState(newState);
  }, []);

  const handleDebrief = useCallback((outcome, resources, choices, scenarioId, difficulty) => {
    const stars = computeScore(resources, outcome).stars;
    recordCompletion(scenarioId, difficulty, stars);
    setDebriefData({ outcome, resources, choices });
    setScreen('debrief');
  }, [recordCompletion]);

  // Rewind to state just before choice at historyIndex
  const handleRewind = useCallback((historyIndex) => {
    const snapshot = history[historyIndex];
    setGameState(snapshot);
    setHistory(prev => prev.slice(0, historyIndex));
    setDebriefData(null);
    setRewoundCount(prev => prev + 1);
    setScreen('game');
  }, [history]);

  const handleExit = useCallback(() => {
    setGameState(null);
    setDebriefData(null);
    setActiveScenario(null);
    setHistory([]);
    setRewoundCount(0);
    setScreen('start');
  }, []);

  const handleRestart = useCallback(() => {
    setGameState(null);
    setDebriefData(null);
    setActiveScenario(null);
    setHistory([]);
    setRewoundCount(0);
    setScreen('start');
  }, []);

  return (
    <div className="app">
      {screen === 'start' && (
        <StartScreen
          scenarios={SCENARIOS}
          onStart={handleStart}
          isBrutalUnlocked={isBrutalUnlocked}
          unlockProgress={unlockProgress}
        />
      )}
      {screen === 'game' && gameState && activeScenario && (
        <GameScreen
          scenario={activeScenario}
          gameState={gameState}
          onStateChange={handleStateChange}
          onSnapshot={handleSnapshot}
          onDebrief={handleDebrief}
          onExit={handleExit}
        />
      )}
      {screen === 'debrief' && debriefData && (
        <DebriefScreen
          outcome={debriefData.outcome}
          resources={debriefData.resources}
          choices={debriefData.choices}
          history={history}
          rewoundCount={rewoundCount}
          maxRewinds={MAX_REWINDS}
          onRewind={handleRewind}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
