/** Hangman **/
const btnNewGame = document.getElementById("new-game");
const baseUrl = "http://hangman-api.herokuapp.com/hangman";
const btnGuess = document.getElementById("guess");
const letterInput = document.getElementById("letter");
let currentAnswer = [];
let remainingGuesses = 7;

async function startNewGame() {
  const response = await fetch(baseUrl, {
    method: "POST",
  });
  const json = await response.json();
  console.log("Answer", json);
  const hiddenToken = document.querySelector(".token");
  hiddenToken.value = json.token;
  btnNewGame.hidden = true;
  currentAnswer = json.hangman.split("");
  const remainingDisplay = document.querySelector(".remaining");
  remainingGuesses = 7;
  remainingDisplay.innerText = remainingGuesses;
  const input = document.querySelector(".console");
  input.hidden = false;
  const hangmanWord = document.querySelector(".hangman-word");
  currentAnswer = [];
  hangmanWord.textContent = currentAnswer;

  //get attemptDisplay and make equal to empty string
  const attemptsDisplay = document.querySelector(".attempts");
  attemptsDisplay.textContent = "";
}

async function makeGuess() {
  const guessLetter = document.querySelector(".letter").value;
  if (guessLetter === "") return;
  let token = document.querySelector(".token").value;
  const url = `${baseUrl}?token=${token}&letter=${guessLetter}`;
  const response = await fetch(url, {
    method: "PUT",
  });
  const json = await response.json();
  console.log(json);

  const hangmanWord = document.querySelector(".hangman-word");
  let result = json.hangman;

  const attemptsDisplay = document.querySelector(".attempts");
  const attemptsSpan = document.createElement("span");
  const attemptsContent = document.createTextNode(guessLetter);
  const remainingDisplay = document.querySelector(".remaining");

  if (json.correct === true) {
    const word = result.split("");

    for (let i = 0; i < word.length; i++) {
      if (word[i] !== "_" && currentAnswer[i] === "_") {
        currentAnswer[i] = word[i];
      }
    }
    hangmanWord.textContent = currentAnswer.join("");

    attemptsSpan.classList.add("correct");
  } else {
    attemptsSpan.classList.add("wrong");
  }
  token = json.token;

  remainingGuesses--;
  remainingDisplay.innerText = remainingGuesses;

  attemptsSpan.appendChild(attemptsContent);
  attemptsDisplay.append(attemptsSpan);
  if (remainingGuesses === 6) {
    getSolution();
  }
}

async function getSolution() {
  const solutionToken = document.querySelector(".token").value;
  const solutionUrl = `${baseUrl}?token=${solutionToken}`;

  const solutionResponse = await fetch(solutionUrl, {
    method: "GET",
  });
  const solutionJson = await solutionResponse.json();
  console.log(solutionJson);
  const hangmanWord = document.querySelector(".hangman-word");
  hangmanWord.textContent = solutionJson.solution;
  const input = document.querySelector(".console");
  input.hidden = true;
  btnNewGame.hidden = false;
}

btnNewGame.addEventListener("click", startNewGame);

btnGuess.addEventListener("click", makeGuess);
letterInput.addEventListener("keypress", (e) => {
  if (e.key === "enter") {
    makeGuess();
  }
});

// want to update the hangman word with the letters
// continue to add more than one correct or wrong class
// after 7 guesses display the solution, hide guesses and display new game
