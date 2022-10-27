// variables
var buttonStart = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-area");
var quizLaunch = document.getElementById("start-quiz");
var questionContainer = document.getElementById("question-container");
var quizComplete = document.getElementById("quiz-complete");
var questionEl = document.getElementById("question-title");
var buttonChoices = document.getElementById("answer-buttons");
var button1 = document.getElementById("button-1");
var button2 = document.getElementById("button-2");
var button3 = document.getElementById("button-3");
var button4 = document.getElementById("button-4");
var answerDisplay = document.getElementById("answers-display");
var endQuizScreen = document.getElementById("end-quiz");
var submitScore = document.getElementById("submit-initials");
var highscoresDisplay = document.getElementById("highscores");
var leaderboardInitials = document.getElementById("initials-div");
var leaderboardScore = document.getElementById("score-div");

var returnToQuiz = document.getElementById("return-quiz");
var highscoresLink = document.getElementById("leaderboard");
var timerEl = document.getElementById("time-spent");
var startTime = 60;

var highscores = [];
var scoreNames = [];



// Code for the timer
function timerCountdown() {
    var timerInterval = setInterval(function() {
        startTime--;
        timerEl.textContent = startTime + " seconds remaining";

        if(startTime === 0 | qIndex === questions.length) {
            clearInterval(timerInterval);
            sendMessage();
            return;
        }
    }, 1000);
}

function sendMessage() {
    timerEl.textContent = "Time is up!";
}

// Code for displaying the questions
function launchQuiz() {
    quizLaunch.classList.add("hide");
    questionContainer.classList.remove("hide");
    
    showQuestion();    
} 

var qIndex = 0;

function showQuestion() {
    if (qIndex === questions.length | startTime === 0) {
        endQuizScreen.classList.remove("hide");
        questionContainer.classList.add("hide");
        var score = startTime;
        alert("Your score is " + score);
        highscores.push(score);

    } else {
        questionEl.innerText = questions[qIndex].title;
        button1.innerHTML = questions[qIndex].choices[0];
        button2.innerHTML = questions[qIndex].choices[1];
        button3.innerHTML = questions[qIndex].choices[2];
        button4.innerHTML = questions[qIndex].choices[3];
    }
}

function selectAnswer() {

    if (event.target.textContent === questions[qIndex].answer) {
        alert("That's correct!");
    }  else {
        alert("That's incorrect!");
        startTime = startTime - 10;
    } 

}


// Clicking the "Start Quiz" button 

buttonStart.addEventListener("click", function() {
    timerCountdown();
    launchQuiz();
});

// Event listener for when a user clicks on their answer
   

buttonChoices.addEventListener("click", function() {
    selectAnswer();
    qIndex++;
    showQuestion();

});



submitScore.addEventListener("click", function() {
    alert("Your initials have been submitted!");
    var scoreInitials = document.getElementById("enter-intials").value;

    var playerScore = {
        initials: [scoreInitials],
        score: [highscores]
    }

    console.log(playerScore);

    function populateStorage () {
        localStorage.setItem("player score", JSON.stringify(playerScore));
        localStorage.setItem("initials", JSON.stringify(scoreInitials));
    }

   
    populateStorage(playerScore);
    
})

// Event for when a user clicks on leaderboard

highscoresLink.addEventListener("click", function() {

    highscoresDisplay.classList.toggle("hide");
    quizLaunch.classList.add("hide");
    endQuizScreen.classList.add("hide");
    highscoresLink.classList.toggle("hide");
    returnToQuiz.classList.toggle("hide");

    var scoreList = JSON.parse(localStorage.getItem("playerScore"));
    
    leaderboardInitials.append.textContent = scoreList.initials;
    leaderboardScore.append.textContent = scoreList.highscore;

})

    returnToQuiz.addEventListener("click", function () {
    highscoresLink.classList.toggle("hide");
    returnToQuiz.classList.toggle("hide");
    quizLaunch.classList.toggle("hide");
    highscoresDisplay.classList.toggle("hide");
})