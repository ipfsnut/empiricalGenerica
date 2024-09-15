const EFFORT_LEVELS = {
  1: '1-2 switches',
  2: '3-4 switches',
  3: '5-6 switches',
  4: '7+ switches'
};

const generateDigit = () => Math.floor(Math.random() * 10);

const countSwitches = (number) => {
  let switches = 0;
  for (let i = 1; i < number.length; i++) {
    if ((number[i] % 2) !== (number[i-1] % 2)) {
      switches++;
    }
  }
  return switches;
};

const generateNumber = (effortLevel) => {
  let number;
  let switches;
  do {
    number = Array(9).fill().map(() => generateDigit()).join('');
    switches = countSwitches(number);
  } while (!isValidForLevel(switches, effortLevel));
  
  return { number, effortLevel };
};

const isValidForLevel = (switches, level) => {
  switch (level) {
    case '1': return switches >= 1 && switches <= 2;
    case '2': return switches >= 3 && switches <= 4;
    case '3': return switches >= 5 && switches <= 6;
    case '4': return switches >= 7;
    default: return false;
  }
};

export const generateTrialNumbers = () => {
  const trialNumbers = [];
  const effortLevels = Object.keys(EFFORT_LEVELS);
  
  for (let i = 0; i < 20; i++) {
    const level = effortLevels[Math.floor(i / 5) % 4];
    trialNumbers.push(generateNumber(level));
  }
  
  // Shuffle the trial numbers
  for (let i = trialNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trialNumbers[i], trialNumbers[j]] = [trialNumbers[j], trialNumbers[i]];
  }
  
  return trialNumbers;
};