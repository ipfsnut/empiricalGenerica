# Number Switching Task Utility

## Overview

This application provides a robust implementation of the Number Switching Task, a cognitive experiment designed to measure task-switching ability and cognitive control. It's built with React and offers a user-friendly interface for conducting experiments and collecting data.

## Features

- Randomized presentation of 20 trials
- Four difficulty levels, with 5 trials each
- Real-time response recording
- Webcam integration for capturing images on successful trials
- Data export functionality (CSV and images)

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm run dev` to start the development server

## Usage

The application guides users through 20 trials, presenting a 9-digit number in each. Participants respond to each digit using 'F' for odd numbers and 'J' for even numbers. The application records response times, accuracy, and captures an image for successful trials.

## Data Export

After completing all trials, users can export their data as a ZIP file containing:
- A CSV file with trial data
- Images captured during successful trials

## Customization

The codebase is designed to be easily customizable. Key areas for modification include:
- `numberGenerator.js`: Adjust difficulty levels or number generation logic
- `ExperimentScreen.js`: Modify trial flow or UI elements

## License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute as you see fit.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or support, please open an issue in the GitHub repository.
