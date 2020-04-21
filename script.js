var cardTitle = document.querySelector(".card-title")
var cardQuestion = document.querySelector(".card-question")
var cardFinish = document.querySelector(".card-finish")
var cardHighscore = document.querySelector(".card-highscore")

var startQuiz = document.querySelector("#start-quiz")
var highScores = document.querySelector(".highscores")
var submitInit = document.querySelector("#submit-init")
var back = document.querySelector("#back")
var resetScore = document.querySelector("#reset-score")
var inGame = false;

var questions = {
    "1": {
        "question": "This is a sample question? This is a really long sample question that is going to wrap at least once.",
        "answers": {
            "1": "This is the first answer.",
            "2": "This is the second answer to the question.",
            "3": "3",
            "4": "Last Answer.",
        },
        "correctAnswer": "4" 
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
});

highScores.addEventListener("click", function () {
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
    hide(cardQuestion);
    show(cardFinish);
});

cardFinish.addEventListener("click", function () {
    hide(cardFinish);
    show(cardHighscore);
});