/** Hangman **/
const btnNewGame = document.getElementById("new-game");
const baseUrl = "http://hangman-api.herokuapp.com/hangman";
const btnGuess = document.getElementById("guess");

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
  let attemptsDisplay = document.querySelector(".attempts");
  let attemptsSpan = document.createElement("span");
  let attemptsContent = document.createTextNode(guessLetter);
  let remainingDisplay = document.querySelector(".remaining");
  let remainingGuesses = 7;

  if (json.correct === true) {
    hangmanWord.appendChild(result);
    attemptsSpan.classList.add("correct");
  } else {
    attemptsSpan.classList.add("wrong");
  }
  token = json.token;

  remainingGuesses--;
  remainingDisplay.innerText = `${remainingGuesses}`;

  attemptsSpan.appendChild(attemptsContent);
  attemptsDisplay.append(attemptsSpan);
}

btnNewGame.addEventListener("click", startNewGame);
btnGuess.addEventListener("click", makeGuess);

// want to update the hangman word with the letters
// continue to add more than one correct or wrong class
// after 7 guesses display the solution, hide guesses and display new game
