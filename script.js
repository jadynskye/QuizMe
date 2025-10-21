// DOM Elements 
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const currentQuestion = document.getElementById("current-question");
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const maxScore = document.getElementById("max-score");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartBtn = document.getElementById("restart-btn");
const totalQuestionsSpan = document.getElementById("total-questions");

// Quiz questions 
const quizQuestions = [
  {
    questionText: "What color are Jadyns eyes?",
    answers: [
      { text: "Green", correct: false },
      { text: "Brown", correct: false },
      { text: "Blue", correct: true },
      { text: "Hazel", correct: false }
    ],
  },
  {
    questionText: "What is Jadyns middle name?",
    answers: [
      { text: "Hazel", correct: false },
      { text: "Skye", correct: true },
      { text: "Paris", correct: false },
      { text: "Sky", correct: false }
    ],
  },
  {
    questionText: "What is Jadyns favorite food?",
    answers: [
      { text: "Mexican", correct: false },
      { text: "Chinese", correct: false },
      { text: "Greek", correct: false },
      { text: "Italian", correct: true }
    ],
  },
  {
    questionText: "How many brothers does Jadyn have?",
    answers: [
      { text: "4", correct: false },
      { text: "3", correct: false },
      { text: "6", correct: false },
      { text: "5", correct: true }
    ],
  },
  {
    questionText: "Whats Jadyns comfort movie franchise to binge",
    answers: [
      { text: "Warner bros.", correct: false },
      { text: "Disney", correct: true },
      { text: "DreamWorks", correct: false },
      { text: "Nickelodean", correct: false }
    ],
  },
];

// Quiz state vars 
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

// Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

// Show question
function showQuestion() {
  answersDisabled = false;

  const currentQ = quizQuestions[currentQuestionIndex];

  currentQuestion.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQ.questionText;

  answersContainer.innerHTML = "";

  currentQ.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

// Handle answer click
function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

// Show results
function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

// Restart quiz
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
