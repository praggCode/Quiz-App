const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },
    {
        question: "What is the capital of Spain?", 
        answers: [
            { text: "Madrid", correct: true },
            { text: "Barcelona", correct: false },
            { text: "Valencia", correct: false },
            { text: "Seville", correct: false }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers: [
            { text: "Rome", correct: true },
            { text: "Milan", correct: false },
            { text: "Venice", correct: false },
            { text: "Florence", correct: false }
        ]
    },
    {
        question: "What is the capital of Germany?",
        answers: [
            { text: "Munich", correct: false },
            { text: "Hamburg", correct: false },
            { text: "Frankfurt", correct: false },
            { text: "Berlin", correct: true }
        ]
    },
    {
        question: "What is the capital of Portugal?",
        answers: [
            { text: "Porto", correct: false },
            { text: "Lisbon", correct: true },
            { text: "Faro", correct: false },
            { text: "Coimbra", correct: false }
        ]
    }
]   

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("ans-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    startQuestion();
}
function startQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer (e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handelNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handelNextButton();
    }
    else {
        startQuiz();
    }
});
startQuiz();
