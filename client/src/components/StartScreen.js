import React from 'react';
import '../styles/StartScreen.css';

function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <h1>EmpiricalGenerica</h1>
      <p>Welcome to the number-switching task experiment.</p>
      <button onClick={onStart} className="start-button">Start Experiment</button>
    </div>
  );
}

export default StartScreen;
