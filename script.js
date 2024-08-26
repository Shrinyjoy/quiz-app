const questions = [
    {
        question: "What country has the highest life expectancy?",
        answers: [
            { text: "Japan", correct: false},
            { text: "Hong kong", correct: true},
            { text: "Switzerland", correct: false},
            { text: "Canada", correct: false},
        ]
    },
    {
        question: "What is the largest island in the world?",
        answers: [
            { text: "Australia", correct: true},
            { text: "Greenland", correct: false},
            { text: "Iceland", correct: false},
            { text: "New Guinea", correct: false},
        ]
    },
    {
        question: "What city is known as THE ETERNAL CITY?",
        answers: [
            { text: "New York", correct: false},
            { text: "Shanghai", correct: false},
            { text: "singapore", correct: false},
            { text: "Rome", correct: true},
        ]
    },
    {
        question: "Which is the only body part that is fully grown from birth?",
        answers: [
            { text: "mouth", correct: false},
            { text: "nose", correct: false},
            { text: "ears", correct: false},
            { text: "eyes", correct: true},
        ]
    },
    {
        question: "How many hearts does an octopus have?",
        answers: [
            { text: "three", correct: true},
            { text: "two", correct: false},
            { text: "one", correct: false},
            { text: "eight", correct: false},
        ]
    },
    {
        question: "what is the longest river in the world",
        answers: [
            { text: "Amazon", correct: false},
            { text: "Yangtze", correct: false},
            { text: "Congo", correct: false},
            { text: "Nile", correct: true},
        ]
    },
    {
        question: " Which planet in our solar system has the longest day?",
        answers: [
            { text: "saturn", correct: false},
            { text: "mars", correct: false},
            { text: "jupiter", correct: true},
            { text: "earth", correct: false},
        ]
    },
    {
        question: "Where did the Olympics originate?",
        answers: [
            { text: "Paris", correct: false},
            { text: "Greece", correct: true},
            { text: "London", correct: false},
            { text: "China", correct: false},
        ]
    },
    {
        question: "In which season is daytime the longest?",
        answers: [
            { text: "winter", correct: false},
            { text: "spring", correct: false},
            { text: "autumn", correct: false},
            { text: "summer", correct: true},
        ]
    },
    {
        question: "Who was the first human to travel into space?",
        answers: [
            { text: "Neil Armstrong", correct: false},
            { text: "Alan Shepard", correct: false},
            { text: "Valentina Tereshkova", correct: false},
            { text: "Yuri Gagarin", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();