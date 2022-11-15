/** Hangman **/
const btnNewGame = document.getElementById("new-game");
const baseUrl = "http://hangman-api.herokuapp.com/hangman";
const btnGuess = document.getElementById("guess");
let remainingGuesses = 7;
let attempts = 0;

async function startNewGame() {
  const response = await fetch(baseUrl, {
    method: "POST",
  });
  const json = await response.json();
  console.log(json);
  const hiddenToken = document.querySelector(".token");
  hiddenToken.value = json.token;
  btnNewGame.hidden = true;
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

  let hangmanWord = document.querySelector(".hangman-word");
  let result = document.createTextNode(json.hangman);
  if (json.correct === true) {
    hangmanWord.appendChild(result);
  }
  token = json.token;

  let remainingDisplay = document.querySelector(".remaining");
  remainingGuesses--;
  remainingDisplay.innerText = `${remainingGuesses}`;

  let attemptsDisplay = document.querySelector(".attempts");
  attempts++;

  attemptsDisplay.innerText = `Attempts: ${attempts}`;
}

btnNewGame.addEventListener("click", startNewGame);
btnGuess.addEventListener("click", makeGuess);
