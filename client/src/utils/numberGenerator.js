const EFFORT_LEVELS = {
  1: '1',
  2: '2',
  3: '3',
  4: '4'
};

const generateDigit = (isOdd) => {
  return isOdd ? Math.floor(Math.random() * 5) * 2 + 1 : Math.floor(Math.random() * 5) * 2;
};

const generateNumber = (effortLevel) => {
  let number = '';
  for (let i = 0; i < 9; i++) {
    switch (effortLevel) {
      case '1':
        number += generateDigit(i % 2 === 0);
        break;
      case '2':
        number += generateDigit(i % 2 === 1);
        break;
      case '3':
        number += generateDigit(Math.random() < 0.5);
        break;
      case '4':
        const pattern = [0, 1, 1, 0, 0, 1, 0, 1, 0];
        number += generateDigit(pattern[i] === 1);
        break;
    }
  }
  return { number: number.toString(), effortLevel };
};export const generateTrialNumbers = () => {
  const trialNumbers = [];
  const effortLevels = Object.values(EFFORT_LEVELS);
  
  for (let i = 0; i < 20; i++) {
    const effortLevel = effortLevels[i % 4];
    trialNumbers.push(generateNumber(effortLevel));
  }
  
  console.log('Generated trial numbers:', trialNumbers);
  return trialNumbers;
};