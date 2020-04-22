var questionText = document.querySelector("#question");
var answerList = document.querySelector("#answers");
var verdictText = document.querySelector("#verdict");
var startBtn = document.querySelector("#start-button");
var welcomeEl = document.querySelector("#welcome");
var timerEl = document.querySelector("#timer");
var quizEl = document.querySelector("#quiz");
var finishEl = document.querySelector("#finish");
var finalScoreEl = document.querySelector("#final-score");
var highscoreInput = document.querySelector("#highscoreInput")
var highscoreForm = document.querySelector("#highscore-entry")
var highscoreEl = document.querySelector("#highscore")
var highscoreTable = document.querySelector("#highscore-table")

var currentQuestion = 0;
var score;
var timeLeft = 75;
var timerInterval;

// Quiz questions
var quiz = [
    {
        question: "Question 1",
        answers:
            ["Wrong",
                "Right",
                "Wrong",
                "Wrong"],
        correct: "Right"
    },
    {
        question: "Question 2",
        answers:
            ["Wrong",
                "Right",
                "Wrong",
                "Wrong"],
        correct: "Right"
    },
    {
        question: "Question 3",
        answers:
            ["Wrong",
                "Right",
                "Wrong",
                "Wrong"],
        correct: "Wrong"
    },
    {
        question: "Question 4",
        answers:
            ["Wrong",
                "Right",
                "Wrong",
                "Wrong"],
        correct: "Right"
    },

];

// Highscores
var highscores = [];
var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

if (storedHighscores !== null) {
    highscores = storedHighscores;
  }


function renderQuestion() {
    // Clear the list element
    answerList.innerHTML = "";

    // Set the question
    questionText.textContent = quiz[currentQuestion].question;
    // Render a list item for each answer
    for (var i = 0; i < quiz[currentQuestion].answers.length; i++) {
        var answer = quiz[currentQuestion].answers[i]

        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = answer;
        li.appendChild(button);
        answerList.appendChild(li);
    }
};

function startTimer() {
    timerEl.textContent = "Time: " + timeLeft;
    timerInterval = setInterval(updateTimer, 1000);
};

function updateTimer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
        finishQuiz();
    }
};

function finishQuiz() {
    clearInterval(timerInterval);
    timerEl.textContent = "";
    questionText.textContent = "";
    answerList.innerHTML = "";
    verdictText.textContent = "";
    finishEl.style.display = "block";
    finalScoreEl.textContent = "Your final score is " + timeLeft;
};

function renderHighscores() {
    // Clear the screen
    welcomeEl.style.display = "none";
    finishEl.style.display = "none";
    timerEl.textContent = "";
    questionText.textContent = "";
    answerList.innerHTML = "";
    
    // Generate the table
    highscoreEl.style.display = "block";
    if (highscores.length > 0) {
        document.querySelector("#no-highscores").style.display = "none";
    }
    for (var i = 0; i < highscores.length && i < 10; i++) {
        var row = highscoreTable.insertRow(-1);
        var nameCell = row.insertCell(0);
        var scoreCell = row.insertCell(1);

        nameCell.innerHTML = highscores[i].name;
        scoreCell.innerHTML = highscores[i].score;
    }

};

// When the start button is clicked, start the quiz
startBtn.addEventListener("click", function () {
    welcomeEl.style.display = "none";
    renderQuestion();
    startTimer();
});

// When the answer button is clicked
answerList.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button") === true) {
        // Check to see if correct answer
        var userAnswer = element.textContent;
        if (userAnswer === quiz[currentQuestion].correct) {
            verdictText.textContent = "Correct!";
        }
        else {
            verdictText.textContent = "Wrong!";
            timeLeft -= 12;
        }
        // Check to see if there is another question
        if (currentQuestion < (quiz.length - 1)) {
            // Move on to next question
            currentQuestion++;
            renderQuestion();
        }
        else {
            // Finish the quiz
            finishQuiz();
        }
    }
});

// When highscore submit button is clicked
highscoreForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var highscoreName = highscoreInput.value.trim();
    // If name is blank, do nothing
    if (highscoreName === "") {
        return;
    }
    // Add name and score to highscores
    highscores.push({
        name: highscoreName,
        score: timeLeft        
    })
    // Sort highscores by highest score
    highscores.sort(function(a, b){
        return b.score - a.score;
    });
    highscoreInput.value = "";
    // Save highscore to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Render the highscore table
    renderHighscores();
})
