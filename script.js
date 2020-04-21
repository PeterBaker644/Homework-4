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

cardTitle.setAttribute("style", "display:block")
cardFinish.setAttribute("style", "display:none")
cardHighscore.setAttribute("style", "display:none")
cardQuestion.setAttribute("style", "display:none")












startQuiz.addEventListener("click", function () {
    cardTitle.setAttribute("style", "display:none")
    cardQuestion.setAttribute("style", "display:block")
    // startGame();
});

highScores.addEventListener("click", function () {
    cardTitle.setAttribute("style", "display:none")
    cardQuestion.setAttribute("style", "display:none")
    cardFinish.setAttribute("style", "display:none")
    cardHighscore.setAttribute("style", "display:flex")
});

back.addEventListener("click", function () {
    cardHighscore.setAttribute("style", "display:none")
    cardTitle.setAttribute("style", "display:block")

});

cardQuestion.querySelector("ol").addEventListener("click", function () {
    cardQuestion.setAttribute("style", "display:none")
    cardFinish.setAttribute("style", "display:block")
});

cardFinish.addEventListener("click", function () {
    cardFinish.setAttribute("style", "display:none")
    cardHighscore.setAttribute("style", "display:flex")
});