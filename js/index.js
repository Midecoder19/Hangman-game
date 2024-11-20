const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const wordList = [
  {
    word: "guitar",
    hint: "A musical instrument with strings.",
  },
  {
    word: "oxygen",
    hint: "A colorless, odurless gas essential for life.",
  },
  {
    word: "moutain",
    hint: "A large natural elevation of the Earth's surface.",
  },
  {
    word: "painting",
    hint: "An art form using colors on a surface to create images or expression.",
  },
  {
    word: "astronomy",
    hint: "The scientific study of celestial objects and phenomena.",
  },
  {
    word: "football",
    hint: "A popular sport played with a spherical ball.",
  },
  {
    word: "chocolate",
    hint: "A sweet treat made from cocoa beans.",
  },
  {
    word: "guitar",
    hint: "A musical instrument with strings.",
  },
  {
    word: "butterfly",
    hint: "An insect with colorful wings and a slender body.",
  },
  {
    word: "history",
    hint: "The study of past events and human civilization.",
  },
  {
    word: "pizza",
    hint: "A savory dish consisting of a round, flattened base with toppings.",
  },
  {
    word: "camera",
    hint: "A device used to capture and record images or videos.",
  },
  {
    word: "diamond",
    hint: "A precious gemstone knownfor its brilliant and hardness.",
  },
  {
    word: "adventure",
    hint: "An exciting or daring experience.",
  },
  {
    word: "science",
    hint: "The systematic study of the structure and behaviour of the physical.",
  },
  {
    word: "bicycle",
    hint: "A human-powered vehicle with two wheels.",
  },
  {
    word: "coffee",
    hint: "The daily disappearance beverage made from roasted coffee beans.",
  },
  {
    word: "dance",
    hint: "A rythmic movement of the body often performed to music.",
  },
];

// reset game
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};
// end


const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word:`
      : `The correct word was:`;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats🎆🎉🎊" : "Game Over!"
    }.gif`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
  keyboardDiv.appendChild(button);
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
