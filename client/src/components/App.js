import React, { useEffect, useState } from 'react';
import { checkBrowserCompatibility } from '../utils/browserCheck';
import ExperimentScreen from './ExperimentScreen';
import '../styles/App.css';

function App() {
  const [isCompatible, setIsCompatible] = useState(true);
  const [incompatibilities, setIncompatibilities] = useState([]);

  useEffect(() => {
    const { isCompatible, incompatibilities } = checkBrowserCompatibility();
    setIsCompatible(isCompatible);
    setIncompatibilities(incompatibilities);
  }, []);

  if (!isCompatible) {
    return (
      <div>
        <h1>Browser Incompatibility</h1>
        <p>Your browser doesn't support the following features:</p>
        <ul>
          {incompatibilities.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p>Please use a modern browser to participate in this experiment.</p>
      </div>
    );
  }

  return <ExperimentScreen />;
}

export default App;
