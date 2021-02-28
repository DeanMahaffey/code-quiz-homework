const startButton = document.getElementById('start-button');
const questionCardEl = document.getElementById('question-card');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-button');
const nextButton = document.getElementById('next-button');
const timerEl = document.querySelector('.timer-count');
const win = document.querySelector('.win');
const lose = document.querySelector('.lose');

var timerCount;
var winCounter = 0;
var loseCounter = 0;

let shuffledQuestions, currentQuestionAnswered

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionAnswered++
    setNextQuestion()
})

function startQuiz() {
    console.log('Started')
    isWin = false;
    timerCount = 20;
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionAnswered = 0
    questionCardEl.classList.remove('hide')
    setNextQuestion()
    startTimer()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionAnswered])
}

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
    })

}

function init() {
    getWins();
    getLosses();
}

function setWins() {
    win.textContent = winCounter;
    localStorage.setItem('winCount', winCounter);
}

function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem('loseCount', loseCounter);
}

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount >0) {
                clearInterval(timer);
                winQuiz();
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            quizOver();
        }
    }, 1000);
}

function quizOver() {
    timerEl.textContent = "Quiz Over";
    loseCounter++
    setLosses()
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

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

function setColorClass(element, correct) {
    clearColorClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearColorClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

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
        question: '',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    },
    {
        question: 'What is HTML?',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    },
    {
        question: 'What is HTML?',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    },
    {
        question: 'What is HTML?',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    },
    {
        question: 'What is HTML?',
        answers: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }
        ]
    }
]