import React, { useState } from 'react';
import StartScreen from './StartScreen';
import ExperimentScreen from './ExperimentScreen';
import '../styles/App.css';

function App() {
  const [experimentStarted, setExperimentStarted] = useState(false);

  const startExperiment = () => {
    setExperimentStarted(true);
  };

  return (
    <div className="app">
      {!experimentStarted ? (
        <StartScreen onStart={startExperiment} />
      ) : (
        <ExperimentScreen />
      )}
    </div>
  );
}

export default App;
