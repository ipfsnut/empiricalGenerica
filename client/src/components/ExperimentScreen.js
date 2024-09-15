import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ExperimentScreen.css';

function ExperimentScreen() {
  const [currentTrial, setCurrentTrial] = useState(1);
  const [number, setNumber] = useState('');
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // TODO: Generate trial number
    setNumber('123456789');
    setCurrentDigitIndex(0);
    setResponses([]);
  }, [currentTrial]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'f' || event.key === 'j') {
      const isOdd = number[currentDigitIndex] % 2 !== 0;
      const isCorrect = (event.key === 'f' && isOdd) || (event.key === 'j' && !isOdd);
      
      setResponses([...responses, { digit: number[currentDigitIndex], response: event.key, correct: isCorrect }]);
      
      if (currentDigitIndex < 8) {
        setCurrentDigitIndex(currentDigitIndex + 1);
      } else {
        // End of trial
        setCurrentTrial(currentTrial + 1);
      }
    }
  }, [number, currentDigitIndex, responses, currentTrial]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="experiment-screen">
      <h2>Trial {currentTrial} of 20</h2>
      <div className="number-display">
        {number.split('').map((digit, index) => (
          <span 
            key={index} 
            className={index === currentDigitIndex ? 'highlighted' : ''}
          >
            {digit}
          </span>
        ))}
      </div>
      <p>Press 'F' for odd numbers, 'J' for even numbers</p>
    </div>
  );
}

export default ExperimentScreen;