//DOM Elements
const startButton = document.getElementById('start-button');
const questionCardEl = document.getElementById('question-card');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-button');
const nextButton = document.getElementById('next-button');
const timerEl = document.querySelector('.timer-count');
const scoreTextEl = document.querySelector('#score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

var timerCount;

let shuffledQuestions, currentQuestionAnswered
let score = 0

const SCORE_POINTS = 100

//Starts the quiz when clicked
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionAnswered++
    setNextQuestion()
})

//Starts the questions and timer
function startQuiz() {
    console.log('Started')
    timerCount = 20;
    score = 0
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionAnswered = 0
    questionCardEl.classList.remove('hide')

    setNextQuestion()
    startTimer()
}

//sets the next questions and resets 
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionAnswered])
}

//shows the questions and answers
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
         }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    });

}

//Starts the timer function
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >= 0) {
        }
        if (timerCount === 0) {
            clearInterval(timer);
            quizOver();  
        } 
    }, 1000);
}


//ends the quiz
function quizOver() {
    timerEl.textContent = "Quiz Over";
    startButton.innerText = "Restart"
    startButton.classList.remove('hide')
}

//resets the questions 
function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//shuffles the quesitons and makes sure the correct answer is choosen
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsEl.children).forEach(button => {
        setColorClass(button, button.dataset.correct)
    
    })
    if (shuffledQuestions.length > currentQuestionAnswered + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

//changes the color the answer if it is correct or wrong
function setColorClass(element, correct) {
    clearColorClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//clears the colors for the next questions
function clearColorClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


//questios of the quiz 
const questions = [
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
]