let questions = {};
let currentCategory = "";
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let notAnswers = 0;
let timerInterval;
let timeLeft = 10;

// Fetch questions from JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.categories.reduce((acc, category) => {
      acc[category.id] = category.questions;
      return acc;
    }, {});
  });

// To exit the quiz and redirect to home page.
function exitQuiz() {
  window.location.reload();
}

// to enable/disable start button
function checkInputs() {
  const fullName = document.getElementById("fullName").value.trim();
  const quizTopic = document.querySelector('input[name="quizTopic"]:checked');

  const startButton = document.getElementsByClassName("start")[0];

  // Check if both inputs are valid
  if (fullName !== "" && quizTopic) {
    startButton.disabled = false; // Enable the button
    startButton.classList.add("enabled"); // Add the enabled class
  } else {
    startButton.disabled = true; // Disable the button
    startButton.classList.remove("enabled"); // Remove the enabled class
  }
}

// To open the rules modal
function openModal() {
  document.getElementById("rulesModal").style.display = "block";
}

// To close the rules modal
function closeModal() {
  document.getElementById("rulesModal").style.display = "none";
}

// Close the modal if the user clicks anywhere outside of the modal content
window.onclick = function (event) {
  const modal = document.getElementById("rulesModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function startQuiz(category) {
  currentCategory = category;
  currentQuestionIndex = 0;
  correctAnswers = 0;
  document.getElementById("categorySelection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementsByClassName("exit-button")[0].style.display = "block";
  toggleWidth("auto");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval); // Clear the previous timer

  console.log("currentQuestionIndex", currentQuestionIndex);
  if (currentQuestionIndex > 8)
    document.getElementById("nextButton").textContent = "Finish";

  const questionObj = questions[currentCategory][currentQuestionIndex];
  document.getElementById("question").textContent = questionObj.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  // Create radio buttons for options
  questionObj.options.forEach((option, index) => {
    const radioGroup = document.createElement("div");
    radioGroup.classList.add("radio-group");

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = `option${index}`;
    radioInput.name = "quizOption";
    radioInput.value = option;
    radioInput.onchange = checkSelection;

    const label = document.createElement("label");
    label.htmlFor = `option${index}`;
    label.textContent = option;

    radioGroup.appendChild(radioInput);
    radioGroup.appendChild(label);
    optionsDiv.appendChild(radioGroup);
  });

  // Reset and display the timer
  timeLeft = 10;
  document.getElementById("timeLeft").textContent = `0:${timeLeft}`;
  timerInterval = setInterval(updateTimer, 1000);

  // Update progress bar and question number
  const totalQuestions = questions[currentCategory].length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;
  document.querySelector(
    ".progress-fill"
  ).style.width = `${progressPercentage}%`;

  // Update the progress text (e.g., "6/10")
  document.getElementById("question-info").textContent = `${
    currentQuestionIndex + 1
  }/${totalQuestions}`;

  document.getElementById("question-number").textContent = `${
    currentQuestionIndex + 1
  }. `;

  // Disable Next button initially
  document.getElementById("nextButton").disabled = true;
}

// to enable/disable next button
function checkSelection() {
  const nextButton = document.getElementById("nextButton");
  nextButton.disabled = false; // Enable Next button when an option is selected
}

function updateTimer() {
  timeLeft--;
  const seconds = timeLeft % 60;
  document.getElementById("timeLeft").textContent = `0:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    nextQuestion(); // Move to the next question if time runs out
  }
}

function checkAnswer(selectedOption) {
  clearInterval(timerInterval); // Clear the timer when the user selects an answer
  const correctOption =
    questions[currentCategory][currentQuestionIndex].correctAnswer;

  console.log("selectedOption", selectedOption);
  console.log("correctOption", correctOption);

  if (!selectedOption) {
    notAnswers++;
  } else if (selectedOption === correctOption) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }
}

function nextQuestion() {
  const selectedOption = document.querySelector(
    'input[name="quizOption"]:checked'
  );
  const selectedValue = selectedOption?.value?.slice(0, 1);
  checkAnswer(selectedValue);

  currentQuestionIndex++;

  if (currentQuestionIndex < questions[currentCategory].length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  calculateScore();
}

function calculateScore() {
  toggleWidth("fit-content");
  const correct = document.getElementsByClassName("correct")[0];
  const wrong = document.getElementsByClassName("incorrect")[0];
  const noAnswer = document.getElementsByClassName("notAnswered")[0];
  const resultHead = document.getElementById("result-head");
  const scorePercent = document.getElementById("score-percent");
  const remark = document.getElementById("remark");
  document.getElementsByClassName("exit-button")[0].style.display = "none";

  const scorePercentage = (correctAnswers * 100) / 10;
  const resultString =
    scorePercentage < 60
      ? "Keep practicing!"
      : scorePercentage < 80
      ? "Well done!"
      : "Great job!";

  correct.textContent = correctAnswers;
  wrong.textContent = wrongAnswers;
  noAnswer.textContent = notAnswers;
  resultHead.textContent = resultString;
  scorePercent.textContent = `${scorePercentage}%`;
  if (scorePercentage < 60) {
    scorePercent.style.color = "#AF9B06";
  } else {
    remark.textContent = "Great job!";
  }
}

function toggleWidth(view) {
  const main = document.getElementsByTagName("main")[0];
  main.style.width = view;
}
