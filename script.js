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
  const token = document.querySelector(".token").value;
  const url = `${baseUrl}?token=${token}&letter=${guessLetter}`;
  const response = await fetch(url, {
    method: "PUT",
  });
  const json = await response.json();
  console.log(json);
}

btnNewGame.addEventListener("click", startNewGame);
btnGuess.addEventListener("click", makeGuess);
