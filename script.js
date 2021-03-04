//DOM Elements
const startButton 	  = document.getElementById('start-button');
const questionCardEl  = document.getElementById('question-card');
const questionEl      = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-button');
const nextButton      = document.getElementById('next-button');
const timerEl         = document.querySelector('.timer-count');
const scoreTextEl     = document.querySelector('#score');

const SCORE_POINTS 	  = 100;
const TIME_TO_ANSWER  = 20;
const QUESTIONS       = [
    {
        question: 'What is HTML?',
        answers: [
            { text: 'Hyper Markup Language', correct: true },
            { text: 'How To Make Lunch', correct: false },
            { text: 'Hamburger with Tomato, Mayo, Lettuce', correct: false },
            { text: 'How To Make Lasagna', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<js>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<script>', correct: true },
            { text: '<scripting>', correct: false }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function/MyFunction', correct: false },
            { text: 'function = myFunction', correct: false },
            { text: 'function myFunction()', correct: true }
        ]
    },
    {
        question: 'What is one way to add a comment in a JavaScript?',
        answers: [
            { text: '"This is a comment', correct: false },
            { text: '//This is a comment', correct: true },
            { text: '<!--This is a comment-->', correct: false },
            { text: '(This is a comment)', correct: false }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            { text: '+', correct: false },
            { text: '-', correct: false },
            { text: '=', correct: true },
            { text: '&', correct: false }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World")', correct: true },
            { text: 'alertBox("Hello World")', correct: false },
            { text: 'msg("Hello World")', correct: false },
            { text: 'boxBox("Hello World")', correct: false }
        ]
    }
];


var shuffledQuestions;
var questionIndex;
var totalScore;
var questionInterval;
var timeLeft;

//Starts the questions and timer
function startQuiz() {
  console.log('Start Quiz: Recent Score:', getMostRecentScore());

  //Reset Score & Questions & Index
  totalScore = 0;
  questionIndex = -1;
  shuffledQuestions = QUESTIONS.sort(() => Math.random() - .5);
    
  //Tidy Up Display
  startButton.classList.add('hide');
  questionEl.classList.remove('hide');
  questionCardEl.classList.remove('hide');

	//Update display
	updateLatestScore();
  
	//Populate Question
  setNextQuestion();
}

function getMostRecentScore() {
  let score = localStorage.getItem('mostRecentScore');
  
  if (score === null) {
  	return 'Not Played Before';
  }
  
  score = parseInt(score, 10);
  
  if (isNaN(score)) {
  	return 'Invalid Score Saved';
  }
  
  return score;
}

function setMostRecentScore(score) {
  return localStorage.setItem('mostRecentScore', 0);
}

//sets the next questions and resets 
function setNextQuestion() {
	resetState();
  timeLeft = TIME_TO_ANSWER;
  questionIndex++;
  startCountdown();
  
  if (questionIndex > shuffledQuestions.length -1) {
    quizOver();
  } else {
	  showQuestion(shuffledQuestions[questionIndex]);
  }
}

//shows the questions and answers
function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('button');
    if (answer.correct) {
        button.dataset.correct = answer.correct;
     }
    button.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

//Starts the timer function
function startCountdown() {
  clearInterval(questionInterval);
  timerEl.textContent = timeLeft;
  questionInterval = setInterval(function() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    
    if (timeLeft === 0) {
      clearInterval(questionInterval);
      quizOver();  
    }
  }, 1000);
}

//ends the quiz
function quizOver() {
	resetState();
  timerEl.textContent = "Quiz Over";
  startButton.innerText = "Restart";
  startButton.classList.remove('hide');
  questionEl.classList.add('hide');
  setMostRecentScore(totalScore);
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

//shuffles the quesitons and makes sure the correct answer is choosen
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  
  Array.from(answerButtonsEl.children).forEach(button => {
    setColorClass(button, button.dataset.correct);
  });
  
  if (correct) {
  	timerEl.innerText = 'Correct!';
  	totalScore += SCORE_POINTS;
  } else {
  	timerEl.innerText = 'Wrong!';
  }
  
  if (shuffledQuestions.length > questionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
  
  clearInterval(questionInterval);
  updateLatestScore();
}

function updateLatestScore() {
	scoreTextEl.innerText = totalScore;
}

//changes the color the answer if it is correct or wrong
function setColorClass(element, correct) {
  clearColorClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

//clears the colors for the next questions
function clearColorClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

//Starts the quiz when clicked
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  setNextQuestion();
});