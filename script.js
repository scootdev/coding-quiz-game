var questionText = document.querySelector("#question");
var answerList = document.querySelector("#answers");
var verdictText = document.querySelector("#verdict");
var startBtn = document.querySelector("#start-button");
var welcomeEl = document.querySelector("#welcome");
var timerEl = document.querySelector("#timer");

var currentQuestion = 0;
var score;
var timeLeft = 75;
var timerInterval;

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
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if (timeLeft === 0) {
        finishQuiz();
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    timerEl.textContent = "";
    questionText.textContent = "Finished!";
    answerList.innerHTML = "";
    verdictText.textContent = "";
}

// When the start button is clicked, start the quiz
startBtn.addEventListener("click", function () {
    welcomeEl.innerHTML = "";
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
