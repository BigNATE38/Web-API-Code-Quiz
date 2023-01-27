var highScoreEl = document.getElementById("high-score");
var timeEl = document.getElementById("the-time");
var startPromptEl = document.getElementById("start-prompt");
var startGameEl = document.getElementById("game-start");
var hideEl = document.querySelector("#hide");
var showEl = document.querySelector("#show");
var theQuestionEl = document.getElementById("the-question");
var endGameEl = document.querySelector("#end-game");
var highScoreContainEl = document.querySelector("#high-score-container");
var mainButtons = document.getElementById("buttons-main");
var questionContain = document.getElementById("big-question-time");
var endContain = document.getElementById("the-big-end");
var finalScore = document.getElementById("big-score");
var putName = document.getElementById("your-name");
var theFormScore = document.getElementById("score-form");
var highScoreList = document.getElementById("the-highest-score-list");
var highScoreContain = document.getElementById("big-score-container");
var clearScorebtn = document.getElementById("clear-score-btn")
var bckBtn = document.getElementById("back-button")
var score = 0;
var timerLeftover;
var gameOver;
timeEl.innerText = 0;

//buttons
var buttonGridEl = document.querySelector("#button-grid");
var buttonsAllEl = document.querySelector("#btn");
var subButtonEl = document.getElementById("sub-button");
var lastButtonEl = document.querySelector("#last-buttons");

var allScores = [];

var shuffledQuestions;
var indexQuestions = 0;

var questions = [
  {
    q: "A block of code written to perform a specific set of tasks.",
    a: "1. function",
    choices: [
      { choice: "1. function" },
      { choice: "2. object" },
      { choice: "3. method" },
      { choice: "4. array" },
    ],
  },
  {
    q: "computer.file() is an example of:",
    a: "4. object method",
    choices: [
      { choice: "1. method" },
      { choice: "2. function" },
      { choice: "3. array" },
      { choice: "4. object method" },
    ],
  },
  {
    q: "Used to store various keyed collections and more complex entities.",
    a: "3. object",
    choices: [
      { choice: "1. array" },
      { choice: "2. function" },
      { choice: "3. object" },
      { choice: "4. method" },
    ],
  },
  {
    q: "This method adds one or more element to the end of an array.",
    a: "1. Array.push()",
    choices: [
      { choice: "1. Array.push()" },
      { choice: "2. object method" },
      { choice: "3. function" },
      { choice: "4. Array.pop()" },
    ],
  },
  {
    q: "This method removes the last element from an array and returns the element.",
    a: "2. Array.pop()",
    choices: [
      { choice: "1. function" },
      { choice: "2. Array.pop()" },
      { choice: "3. object method" },
      { choice: "4. Array.push()" },
    ],
  },
];

var welcomePage = function () {
    highScoreContain.classList.remove("show")
    highScoreContain.classList.add("hide")
    startPromptEl.classList.remove("hide")
    startPromptEl.classList.add("show")
    finalScore.removeChild(finalScore.lastChild);
    indexQuestions = 0
    gameOver = ""
    timeEl.textContent = 0 
    score = 0
}


function timerSet() {
  timerLeftover = 60;

  var checkTime = setInterval(function () {
    timeEl.innerText = timerLeftover;
    timerLeftover--

    console.log('Game Status', gameOver)

    if (gameOver) {
      clearInterval(checkTime);
    }

    if (timerLeftover <= 0) {
      visibleScore()
      timeEl.innerText = 0;
      clearInterval(checkTime);
    }
  }, 1000);
}

function questionPlaced() {
  answerRestart();
  showQuestion(shuffledQuestions[indexQuestions]);
}

function answerRestart() {
  while (mainButtons.firstChild) {
    mainButtons.removeChild(mainButtons.firstChild);
  }
}

var showQuestion = function (index) {
  theQuestionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
    var buttonAnswers = document.createElement("button");
    buttonAnswers.innerText = index.choices[i].choice;
    buttonAnswers.classList.add("btn");
    buttonAnswers.addEventListener("click", checkTheAnswer);
    mainButtons.appendChild(buttonAnswers);
  }
};

var checkTheAnswer = function (event) {
  var selectedanswer = event.target;
  if (shuffledQuestions[indexQuestions].a === selectedanswer.innerText) {
    score = score + 10;
  } else {
    score = score - 1;
    timerLeftover = timerLeftover - 10;
  }

  indexQuestions++;
  if (shuffledQuestions.length > indexQuestions + 1) {
    questionPlaced();
  } else {
    visibleScore()
    gameOver = true;
  }
};

function beginGame() {
  startPromptEl.classList.add("hide");
  startPromptEl.classList.remove("show");
  questionContain.classList.remove("hide");
  questionContain.classList.add("show");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  timerSet();
  questionPlaced();
}

/////////////

function visibleScore() {
  questionContain.classList.add("hide");
  endContain.classList.remove("hide");
  endContain.classList.add("show");

  var showScore = document.createElement("p");
  showScore.innerText = ("Your total score is " + score + "!");
  finalScore.appendChild(showScore);
}
/////////
var makeHighScore = function(event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value
  if (!initials) {
    alert("Enter your name!");
    return;
  }

  theFormScore.reset();

  var HighScore = {
    initials: initials,
    score: score,
  };

  allScores.push(HighScore);
  allScores.sort((a, b) => {
    return b.score - a.score;
  });

  
  while (highScoreList.firstChild) {
    highScoreList.removeChild(highScoreList.firstChild);
  }
  
  for (var i = 0; i < allScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.innerHTML = allScores[i].initials + " - " + allScores[i].score;
    highScoreList.appendChild(highscoreEl);
  }

  highScoreSave();
  showScoresAll();
};

//////////
function highScoreSave() {
  localStorage.setItem("allScores", JSON.stringify(allScores));
}
///////////

function loadTheScore() {
  var loadedScores = localStorage.getItem("allScores");
  if (!loadedScores) {
    return false;
  }

  loadedScores = JSON.parse(loadedScores);
  loadedScores.sort((a, b) => {
    return b.score-a.score;
  });

  for (var i = 0; i < loadedScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.innerText = loadedScores[i].initials + " - " + loadedScores[i].score;
    highScoreList.appendChild(highscoreEl);

    allScores.push(loadedScores[i]);
  }
}

////////

function showScoresAll() {
  highScoreContain.classList.remove("hide");
  highScoreContain.classList.add("show");
  gameOver = true

  if ((endContain.className = "show")) {
    endContain.classList.remove("show");
    endContain.classList.add("hide");
  }
  if ((startPromptEl.className = "show")) {
    startPromptEl.classList.remove("show");
    startPromptEl.classList.add("hide");
  }

  if ((questionContain.className = "show")) {
    questionContain.classList.remove("show");
    questionContain.classList.add("hide");
  }
}

//////

function clearScore() {
  allScores = [];

  while (highScoreList.firstChild) {
    highScoreList.removeChild(highScoreList.firstChild);
  }

  localStorage.clear(allScores);
}

loadTheScore();

startGameEl.addEventListener("click", beginGame);
highScoreEl.addEventListener("click", showScoresAll);
theFormScore.addEventListener("submit", makeHighScore);
clearScorebtn.addEventListener("click", clearScore);
bckBtn.addEventListener("click", welcomePage);
