# QUIZMania
Welcome to QUIZMania, a dynamic quiz web application built using plain HTML, CSS, and JavaScript. Users can take quizzes on various topics, view their progress, and experience an interactive quiz journey.

## Features
- User-friendly Interface: Simple, responsive design allowing users to enter their full name, select quiz topics, and easily navigate through questions.
- Multiple Quiz Categories: Users can select from available quiz topics and test their knowledge.
- Question Timer: Each question has a countdown timer that gives users a limited time to answer.
- Progress Tracking: The app tracks the current question out of the total number of questions, showing progress visually using a progress bar.
- Answer Options: Each question has multiple choices, displayed with radio buttons.
- Next and Skip Question: Users can either proceed to the next question after answering or skip a question if unsure.
- Score Display: At the end of the quiz, the user's score is displayed.

## Technology Stack
- HTML: For structuring the web pages.
- CSS: For styling the quiz interface.
- JavaScript: For implementing functionality, including:
- Managing quiz logic.
- Tracking progress.
- Handling timers.
- Checking answers and displaying results.

## Application Flow
- Home Page
- Displays a welcoming message and an introductory section with quiz rules.
- The user is prompted to input their full name.
- A quiz topic selection area allows users to choose from available topics.

Quiz Page
- Displays the current question along with answer options in the form of radio buttons.
- Includes a timer that counts down for each question (default: 10 seconds per question).
- Users must select an answer to enable the "Next" button, while the "Skip" button allows proceeding without selecting an answer.
- A progress bar at the top shows which question the user is currently answering out of the total number of questions.

## Result Page
- After completing all questions, users are shown their final score (number of correct answers out of the total).
- A message displays the result.

## Installation and Usage
- This is a web-based application, so no installation is necessary. Simply open the index.html file in a browser to get started.

## Running the App Locally
- Clone or download this repository to your local machine.
- Open the index.html file in any modern browser (Chrome, Firefox, Edge, etc.).
- The app will load, allowing you to start the quiz.

##Project Structure
```bash
├── index.html        
├── style.css          
├── quiz.js
├── questions.json
```
         
## How to Use
- Enter your Full Name.
- Select a quiz topic from the provided options.
- Click Start Quiz to begin.
- Answer the questions by selecting the correct option using radio buttons.
- The Next button becomes enabled once an option is selected, and you can move to the next question.
- If you want to skip a question, click the Skip button to move forward without answering.
- At the end of the quiz, your score will be displayed.

## Customization
- You can easily add or modify quiz categories and questions by editing the questions object in the script.js file.
- Customize the timer or quiz rules by adjusting the relevant JavaScript functions and variables.

## Contributing
- Contributions are welcome! If you have ideas to improve the app or find any issues, feel free to create a pull request or open an issue in the repository.

## License
- This project is open source and available under the MIT License.
