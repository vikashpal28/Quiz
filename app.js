const questions = [
    {
        question : "Which is the largest animal in the world?",
        answers : [
            {text: "Shark", correct : false},
            {text: "Blue whale", correct : true},
            {text: "Elephant", correct : false},
            {text: "Giraffe", correct : false},
        ]
    },
    {
        question : "What is the capital of France?",
        answers : [
            {text: "Berlin", correct : false},
            {text: "Madrid", correct : false},
            {text: "Paris", correct : true},
            {text: "Rome", correct : false},
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers : [
            {text: "Earth", correct : false},
            {text: "Mars", correct : true},
            {text: "Jupiter", correct : false},
            {text: "Venus", correct : false},
        ]
    },
    {
        question : "What is the largest mammal in the world?",
        answers : [
            {text: "Elephant", correct : false},
            {text: "Blue whale", correct : true},
            {text: "Giraffe", correct : false},
            {text: "Hippopotamus", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
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
    answerElement.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener('click',selectAnswer);
    
});

}


function resetState(){
    nextBtn.style.display = "none";
    while(answerElement.firstChild)
        answerElement.removeChild(answerElement.firstChild);
}

function selectAnswer(e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score is ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "play again";
    nextBtn.style.display = "block";
}

function handlenextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
 nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handlenextBtn();
    }
    else{
        startQuiz();
    }
 })

startQuiz();
