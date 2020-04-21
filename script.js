var cardTitle = document.querySelector(".card-title");
var cardQuestion = document.querySelector(".card-question");
var cardFinish = document.querySelector(".card-finish");
var cardHighscore = document.querySelector(".card-highscore");

var startQuiz = document.querySelector("#start-quiz");
var scoreButton = document.querySelector(".scoreButton");
var submitInit = document.querySelector("#submit-init");
var back = document.querySelector("#back");
var resetScore = document.querySelector("#reset-score");
var questionTitle = document.querySelector("#question-title");
var questionList = document.querySelector("#question-list");
var displayName = document.querySelector("#display-name");
var displayScore = document.querySelector("#display-score");
var inGame = false;
var currentQuestion = 1;
var highscores = [{name:"LOD", score:2},{name:"EMA", score:21},{name:"PJB", score:11},{name:"JAK", score:4},{name:"BRF", score:16}]

var questions = {
    "1": {
        "question": "This is a sample question? This is a really long sample question that is going to wrap at least once.",
        "answers": [
            "This is the first answer.",
            "This is the second answer to the question.",
            "3",
            "Last Answer."
        ],
        "correctAnswer": "4" 
      },
      "2": {
        "question": "This is the second question. Maybe it is harder?",
        "answers": [
            "This is the 1st answer to the question.",
            "This is the 2nd answer.",
            "3rd Answer",
            "THIS IS THE FINAL Answer."
        ],
        "correctAnswer": "2" 
      }
}

// This line will take the player scores and sort them into an ordered object array.
highscores.sort(compareScore);

function compareScore(a, b) {
    if (a.score > b.score) {
        result = -1;
    } else if (b.score > a.score) {
        result = 1;
    } else {
        result = 0;
    }
    return result;
}

function setScores() {
    displayName.innerHTML = "";
    displayScore.innerHTML = "";
    for (var value of highscores) {
        var li = document.createElement("li");
        li.textContent = value.name;
        displayName.appendChild(li);
    }
    for (var value of highscores) {
        var li = document.createElement("li");
        li.textContent = value.score;
        displayScore.appendChild(li);
    }
}

function setQuestion() {
    questionList.innerHTML = "";
    questionTitle.textContent = questions[currentQuestion].question;
    for (var value of questions[currentQuestion].answers) {
        var li = document.createElement("li");
        li.textContent = value;
        questionList.appendChild(li);
    }
}


function hide(element) {
    element.removeAttribute("id", "visible")
}

function show(element) {
    element.setAttribute("id", "visible")
}

startQuiz.addEventListener("click", function () {
    hide(cardTitle);
    show(cardQuestion);
    // startGame();
    setQuestion();
});

scoreButton.addEventListener("click", function () {
    setScores();
    hide(cardTitle);
    hide(cardQuestion);
    hide(cardFinish);
    show(cardHighscore);
});

back.addEventListener("click", function () {
    hide(cardHighscore);
    show(cardTitle);
});

cardQuestion.querySelector("ol").addEventListener("click", function () {
    if (currentQuestion === Object.keys(questions).length) {
        hide(cardQuestion);
        currentQuestion = 1;
        show(cardFinish);
        console.log("You're finished playing");
    } else {
        console.log("Next Question!");
        hide(cardQuestion);
        currentQuestion++;
        setQuestion();
        show(cardQuestion);
    }
});

cardFinish.addEventListener("click", function () {
    hide(cardFinish);

    show(cardHighscore);
});



// Create an array of objects where key = totalscore, and value = name. Sort array by value. If array.length > 10, delete the last value of the array.