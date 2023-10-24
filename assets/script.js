var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timer");
var scoreDiv = document.getElementById("scoreContainer");
var finalScore = document.getElementById("finalScore");
var correctCount = 0; // Initialize the correct count

var questions = [
    {
        question: "What is JavaScript primarily used for?",
        choiceA: " Styling web pages",
        choiceB: "Building databases",
        choiceC: " Adding interactivity to websites",
        choiceD: "Creating animations",
        correct: "C"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choiceA: "var",
        choiceB: "variable",
        choiceC: "v",
        choiceD: " int",
        correct: "A"
    },
    {
        question: "What is the result of the following expression: `2 + '2'?",
        choiceA: "4",
        choiceB: " '22'",
        choiceC: "22",
        choiceD: "Error",
        correct: "B"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choiceA: "String",
        choiceB: "Boolean",
        choiceC: " Float",
        choiceD: " Undefined",
        correct: "C"
    }
];

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 60; // 60 seconds for the quiz
var gaugeWidth = 150;
var gaugeUnit = gaugeWidth / count;
var TIMER;

function getQuestion() {
    if (runningQuestion <= lastQuestion) {
        var q = questions[runningQuestion];

        question.innerHTML = "<p>" + q.question + "</p>";
        choiceA.innerHTML = q.choiceA;
        choiceB.innerHTML = q.choiceB;
        choiceC.innerHTML = q.choiceC;
        choiceD.innerHTML = q.choiceD;
    } else {
        question.innerHTML = "Quiz Complete!";
        choiceA.style.display = "none";
        choiceB.style.display = "none";
        choiceC.style.display = "none";
        choiceD.style.display = "none";
        var viewHighScoresButton = document.getElementById("viewHighScores");
        viewHighScoresButton.style.display = "block";
    }
}

start.addEventListener("click", startQuiz);

function startQuiz(e) {
    e.preventDefault();
    start.style.display = "none";
    getQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
    for (var i = 0; i <= lastQuestion; i++) {
        progress.innerHTML += "<div class='prog' id=" + i + "></div>";
    }
}

function renderCounter() {
    if (count >= 0) {
        counter.innerHTML = count;
        timeGauge.style.width = (count / 60) * gaugeWidth + "px";
        count--;
    } else {
        count = 0;
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            getQuestion();
        } else {
            clearInterval(TIMER);
            getScore();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        correctCount++;
        answerIsCorrect();
    } else {
        answerIsWrong();
        count -= 10; // Deduct 10 seconds for an incorrect answer
    }
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        getQuestion();
    } else {
        clearInterval(TIMER);
        getScore();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "black";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "black";
}

function getScore() {
    scoreDiv.style.display = "block";
    finalScore.innerHTML = "Your Final Score: " + correctCount + " out of " + (lastQuestion + 1);
    var viewHighScoresButton = document.getElementById("viewHighScores");
    viewHighScoresButton.style.display = "block";
    saveHighScore();
}

function saveHighScore() {
    var userName = prompt("Enter your name:"); // Prompt the user for their name
    if (userName) {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var scoreData = { name: userName, score: correctCount };
        highScores.push(scoreData);
        highScores.sort(function (a, b) {
            return b.score - a.score;
        });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayHighScores(highScores);
    }
}

// Display high scores in the modal
function showHighScoresModal() {
    var modal = document.getElementById("high-scores-modal");
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = "";
    displayHighScores(highScores);
    $(modal).modal("show");
}
getQuestion(); // Initial question load
