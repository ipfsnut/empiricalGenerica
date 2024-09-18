import React, { useState, useEffect, useCallback } from 'react';
import '../styles/ExperimentScreen.css';
import { initializeCamera, queueCapture, shutdownCamera } from '../utils/cameraManager';
import { initDB, saveTrialData, getAllTrialData } from '../utils/indexedDB';
import ResultsView from './ResultsView';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateTrialNumbers } from '../utils/numberGenerator';
function ExperimentScreen() {
  const [currentTrial, setCurrentTrial] = useState(1);
  const [number, setNumber] = useState('');
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [db, setDB] = useState(null);
  const [experimentComplete, setExperimentComplete] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [trialData, setTrialData] = useState([]);
  const [trialNumbers, setTrialNumbers] = useState([]);
  const [currentEffortLevel, setCurrentEffortLevel] = useState('');

  useEffect(() => {
    initDB().then(setDB).catch(console.error);
    initializeCamera().then(() => setCameraPermission(true)).catch(console.error);
    setTrialNumbers(generateTrialNumbers());

    return () => {
      shutdownCamera();
    };
  }, []);

  useEffect(() => {
    if (trialNumbers.length > 0) {
      setNumber(trialNumbers[currentTrial - 1].number);
      setCurrentEffortLevel(trialNumbers[currentTrial - 1].effortLevel);
      setCurrentDigitIndex(0);
      setResponses([]);
    }
  }, [currentTrial, trialNumbers]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'f' || event.key === 'j') {
      const isOdd = number[currentDigitIndex] % 2 !== 0;
      const isCorrect = (event.key === 'f' && isOdd) || (event.key === 'j' && !isOdd);
      
      const newResponse = { 
        trialNumber: currentTrial,
        digitIndex: currentDigitIndex,
        digit: number[currentDigitIndex], 
        response: event.key, 
        correct: isCorrect,
        responseTime: performance.now()
      };
      
      setResponses(prevResponses => [...prevResponses, newResponse]);
      
      if (currentDigitIndex < 8) {  
        setCurrentDigitIndex(currentDigitIndex + 1);
      } else {
        // Automatically end the trial after the last digit
        endTrial();
      }
    }
  }, [number, currentDigitIndex, currentTrial]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const endTrial = async () => {
    const allCorrect = responses.every(response => response.correct);
    let imageBlob = null;

    if (allCorrect) {
      try {
        imageBlob = await queueCapture();
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    }

    const newTrialData = {
      trialNumber: currentTrial,
      responses: responses,
      allCorrect: allCorrect,
      imageBlob: imageBlob,
      effortLevel: currentEffortLevel
    };

    setTrialData(prevData => [...prevData, newTrialData]);

    // Save trial data to IndexedDB
    await saveTrialData(db, newTrialData);

    if (currentTrial < 20) {
      // Automatically advance to the next trial after a short delay
      setTimeout(() => {
        setCurrentTrial(currentTrial + 1);
        setCurrentDigitIndex(0);
        setResponses([]);
      }, 1000);  // 1-second delay between trials
    } else {
      setExperimentComplete(true);
    }
  };

  const exportData = async () => {
    const zip = new JSZip();
    let csvContent = "Trial Number,Effort Level,All Correct,Image Name,Responses\n";

    const allTrialData = await getAllTrialData(db);

    allTrialData.forEach((trial) => {
      const imageName = trial.imageBlob ? `Image${trial.trialNumber}.${trial.effortLevel}.jpg` : 'No Image';
      csvContent += `${trial.trialNumber},${trial.effortLevel},${trial.allCorrect},${imageName},`;
      csvContent += trial.responses.map(r => `${r.digit}:${r.response}:${r.correct}`).join('|');
      csvContent += "\n";

      if (trial.imageBlob) {
        zip.file(imageName, trial.imageBlob);
      }
    });

    zip.file("experiment_data.csv", csvContent);

    const zipBlob = await zip.generateAsync({type: "blob"});
    saveAs(zipBlob, "experiment_results.zip");
  };

  useEffect(() => {
    if (trialNumbers.length > 0) {
      console.log('Current trial:', currentTrial);
      console.log('Trial number object:', trialNumbers[currentTrial - 1]);
      setNumber(trialNumbers[currentTrial - 1].number);
      setCurrentEffortLevel(trialNumbers[currentTrial - 1].effortLevel);
      setCurrentDigitIndex(0);
      setResponses([]);
    }
  }, [currentTrial, trialNumbers]);

  if (!cameraPermission) {
    return <div>Please grant camera permission to continue with the experiment.</div>;
  }

  if (experimentComplete) {
    return <ResultsView db={db} onExport={exportData} />;
  }

  console.log('Rendering with number:', number);

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
      <p>Press either 'F' or 'J' for next trial.</p>
    </div>
  );
}

export default ExperimentScreen;
