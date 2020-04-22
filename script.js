// Card Variables
var cardTitle = document.querySelector(".card-title");
var cardQuestion = document.querySelector(".card-question");
var cardFinish = document.querySelector(".card-finish");
var cardHighscore = document.querySelector(".card-highscore");
// Button Variables
var startQuiz = document.querySelector("#start-quiz");
var scoreButton = document.querySelector(".score-button");
var submitInit = document.querySelector("#submit-init");
var back = document.querySelector("#back");
var resetScore = document.querySelector("#reset-score");
var timerButton = document.querySelector(".timer-button")
// Text Variables
var timeRemaining = document.querySelector("#time-remaining");
var finalScore = document.querySelector("#final-score");
var questionTitle = document.querySelector("#question-title");
var questionList = document.querySelector("#question-list");
var displayName = document.querySelector("#display-name");
var displayScore = document.querySelector("#display-score");
var initials = document.querySelector("#initials");
// Internal Variables
var highscores = JSON.parse(localStorage.getItem("scores"));
var highscoresDefault = [];
var currentQuestion = 1;
var playerName = "ANON";
var secondsLeft = 240;
var inGame = false;
var questions = {
    "1": {
        "question": "Which of the following is a third-party javascript API?",
        "answers": [
            "JSON",
            "jQuery",
            "Bootstrap",
            "AJAX"
        ],
        "solution": "2" 
    },
    "2": {
        "question": "Which of the following can be used to properly enclose a string?",
        "answers": [
            "Double Quotes",
            "Single Quotes",
            "Backticks",
            "All of the Above"
        ],
        "solution": "4" 
    },
    "3": {
        "question": "Which of the following loops is not a valid javascript statement?",
        "answers": [
            "for",
            "for/in",
            "for/of",
            "until",
            "while"
        ],
        "solution": "4" 
    },
    "4": {
        "question": "It is impossible to loop through an object without arrays.",
        "answers": [
            "True",
            "False"
        ],
        "solution": "2" 
    },
    "5": {
        "question": "Which of the following is a valid method of saving an object to local storage?",
        "answers": [
            'localStorage.setItem(storedObject, JSON.stringify(object))',
            'Object.localStorage("storedObject", JSON.stringify(object))',
            'setItem.localStorage(storedObject, JSON.stringify("object"))',
            'localStorage.storedObject(setItem, JSON.stringify(object))',
            'None of the above'
        ],
        "solution": "1" 
    },
    "6": {
        "question": "Which of the following functions will evaluate properly with the given information?",
        "answers": [
            'minutes = Math.floor(secondsLeft % 60).padStart(1, "0")',
            'minutes = Math.floor(secondsLeft % 60).toString()',
            'minutes = Math.floor(secondsLeft / 60).padStart(1, "0")',
            'minutes = Math.floor(secondsLeft / 60).toString().padStart(1, "0")',
            'None of the above'
        ],
        "solution": "4" 
    }
}

// This establishes the initial display time.
displayTime();

function quizTimer() {
    timer = setInterval(function() {
        resetIncorrect();
        displayTime();
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timer);
            resetIncorrect();
            displayTime();
            hide(cardQuestion);
            currentQuestion = 1;
            finalScore.textContent = timeRemaining.textContent;
            show(cardFinish);
        }
    }, 1000);
}

function displayTime() {
    minutes = Math.floor(secondsLeft / 60).toString();
    seconds = (secondsLeft % 60).toString();
    timeRemaining.textContent = minutes.padStart(1, '0') + ":" + seconds.padStart(2, '0');
}

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
    if (highscores == null) {
        highscores = highscoresDefault;
    } else {
        highscores.sort(compareScore);
    }
    if (highscores.length > 10) {
        highscores.pop();
    }
    localStorage.setItem("scores", JSON.stringify(highscores));
    displayName.innerHTML = "";
    displayScore.innerHTML = "";
    for (var value of highscores) {
        var li = document.createElement("li");
        li.textContent = value.name;
        console.log(value.name);
        displayName.appendChild(li);
    }
    for (var value of highscores) {
        var li = document.createElement("li");
        li.textContent = value.score;
        console.log(value.score);
        displayScore.appendChild(li);
    }
}

function setQuestion() {
    questionList.innerHTML = "";
    questionTitle.textContent = questions[currentQuestion].question;
    var i = 0;
    for (var value of questions[currentQuestion].answers) {
        var li = document.createElement("li");
        i++;
        li.setAttribute("id", i);
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

function disableHighscore() {
    scoreButton.setAttribute("id", "disabled")
    inGame = true;
}

function enableHighscore() {
    scoreButton.removeAttribute("id", "disabled")
    inGame = false;
}

function resetIncorrect() {
    if (timerButton.hasAttribute("id")) {
        timerButton.removeAttribute("id", "incorrect");
    }
}

startQuiz.addEventListener("click", function () {
    hide(cardTitle);
    show(cardQuestion);
    setQuestion();
    quizTimer();
    disableHighscore();
});

scoreButton.addEventListener("click", function () {
    if (!inGame) {
        setScores();
        hide(cardTitle);
        hide(cardQuestion);
        hide(cardFinish);
        show(cardHighscore);
    }
});

resetScore.addEventListener("click", function () {
    highscores = highscoresDefault;
    setScores();
});

back.addEventListener("click", function () {
    hide(cardHighscore);
    show(cardTitle);
});

cardQuestion.querySelector("ol").addEventListener("click", function (event) {
    if (event.target.id !== questions[currentQuestion].solution){
        secondsLeft -= 10;
        timerButton.setAttribute("id", "incorrect");
        console.log(timerButton.getAttributeNames());
        displayTime();
    }
    if (currentQuestion === Object.keys(questions).length) {
        clearInterval(timer);
        resetIncorrect();
        hide(cardQuestion);
        currentQuestion = 1;
        finalScore.textContent = timeRemaining.textContent;
        show(cardFinish);
        console.log("You're finished playing");
    } else {
        currentQuestion++;
        setQuestion();
    }
});

submitInit.addEventListener("click", function () {
    if (initials.value) {
        playerName = initials.value;
        // If you want to be really strict:
        // playerName = initials.value.slice(0, 3).toUpperCase();
    }
    highscores.push({name: playerName, score: finalScore.textContent});
    setScores();
    secondsLeft = 60;
    displayTime();
    enableHighscore();
    hide(cardFinish);
    show(cardHighscore);
    initials.value = "";
});