const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const choiceBox = document.querySelector(".choice-box");
const totalScore = document.querySelector("#total-score");
const currentScore = document.querySelector("#score");
const resultBox = document.querySelector(".result-box");
const container = document.querySelector(".container");
const progressbar = document.querySelector(".progressbar");

let question_counter = 0;
let current_question;
let available_question = [];
let correctness = '';

function initScore(){
    if (('localStorage' in window) && window['localStorage'] !== null) {
        if (!localStorage.score) {
            localStorage.score= 0;
        }
    }
}

function scoreIncrement(){
    localStorage.score++;
}

function SetAvailableQuestion(){
    for (let i = 0; i < quiz.length; i++) {
        available_question.push(quiz[i]);
    }
}

function updateProgressbar(q){
    if(q === 1){
        progressbar.classList.remove("s0");
        progressbar.classList.add("s25");
    }else if(q === 2){
        progressbar.classList.remove("s25");
        progressbar.classList.add("s50");
    }else if(q === 3){
        progressbar.classList.remove("s50");
        progressbar.classList.add("s75");
    }else if(q === 4){
        progressbar.classList.remove("s75");
        progressbar.classList.add("s100");
    }
}
function GetNewQuestion(){
    
    //intiate score in local storage
    initScore();
    
    //set number of question in HTML
    questionNumber.innerHTML = "Question "+ (question_counter+1) + "/4";

    //get random question
    current_question = available_question[Math.floor(Math.random() * available_question.length)];
    
    //set question text in HTML
    questionText.innerHTML = current_question.q;

    // get position of question in available_question
    const index = available_question.indexOf(current_question);
    //remove the question from available_question
    available_question.splice(index,1);

    //set option
    for (let i = 0; i < 4; i++) {
        const option = document.getElementById(i);
        option.innerHTML = current_question.option[i];
    }

    //increment the question counter
    question_counter++;
    updateProgressbar(question_counter);
}

function choose(answer){
    const choice = document.querySelector(".choice-"+answer);
    // check if the answer is correct
    if (answer === current_question.ans){
        scoreIncrement();
        // show score on the page
        let score = localStorage.score;
        currentScore.innerHTML = score;
        // show green option
        correctness = "correct"
        choice.classList.add("correct")
        
    } else {
        // show red option
        correctness = "wrong"
        choice.classList.add("wrong")
    }

    if (question_counter === 4){
        container.classList.add("hide")
        resultBox.classList.remove("hide")
        display_total_score();
    }
    else{
        
        // set delay 0.5 s
        // then get new question
        sleep(500).then(() => { 
            //remove bg color
            if (correctness === "correct"){
                choice.classList.remove("correct")
            } else if(correctness === "wrong"){
                choice.classList.remove("wrong")
            }

            GetNewQuestion(); });
    }
}

function display_total_score(){
    let score = localStorage.score;
    totalScore.innerHTML = "Total score: " + score;
}


function start_quiz(){
    window.location.href = "./quiz.html";
}

function play_again(){
    // reset value
    localStorage.clear();
    question_counter = 0;
    resultBox.classList.add("hide")
    container.classList.remove("hide")

    progressbar.classList.remove("s100");
    progressbar.classList.add("s0")
    // start again
    start_quiz();
}

function sleep(ms) {
    //this is function to delay
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// when first load quiz page
window.onload = playing();
function playing(){
    SetAvailableQuestion();
    GetNewQuestion();
}