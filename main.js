// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);
const lettersContainer = document.querySelector(".letters");

// Generate letters
lettersArray.forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Import JSON file
fetch("/main.json")
  .then((response) => response.json())
  .then((data) => {
    const words = data;
    // Get random property
    const allKeys = Object.keys(words);
    const randomPropNumber = Math.floor(Math.random() * allKeys.length);
    const randomPropName = allKeys[randomPropNumber];
    const randomPropValue = words[randomPropName];
    const randomValueNumber = Math.floor(
      Math.random() * randomPropValue.length
    );
    const randomValueValue = randomPropValue[randomValueNumber];

    // Set category info
    document.querySelector(".game-info .category span").textContent =
      randomPropName;

    // Create guess spans
    const lettersGuessContainer = document.querySelector(".letters-guess");
    const lettersAndSpace = Array.from(randomValueValue);
    lettersAndSpace.forEach((letter) => {
      const emptySpan = document.createElement("span");
      if (letter === " ") {
        emptySpan.className = "with-space";
      }
      lettersGuessContainer.appendChild(emptySpan);
    });

    // Select guess spans
    const guessSpans = document.querySelectorAll(".letters-guess span");

    // Initialize game state
    let wrongAttempts = 0;
    let countspanselected = 0;

    // Handle clicking on letters
    document.addEventListener("click", (e) => {
      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        const clickedLetter = e.target.textContent.toLowerCase();
        const chosenWord = Array.from(randomValueValue.toLowerCase());
        let correct = false;
        chosenWord.forEach((wordLetter, index) => {
          if (clickedLetter === wordLetter) {
            correct = true;
            guessSpans[index].textContent = clickedLetter;
            countspanselected++;
          }
        });
        if (correct) {
          if (countspanselected === chosenWord.length) {
            lettersContainer.classList.add("Finished");
            won();
            document.querySelector("#full-success").play();
          } else {
            document.querySelector("#success").play();
          }
        } else {
          wrongAttempts++;
          document
            .querySelector(".hangman-draw")
            .classList.add(`wrong-${wrongAttempts}`);
          document.getElementById("fail").play();
          if (wrongAttempts === 8) {
            endGame();
            lettersContainer.classList.add("finished");
            document.querySelector("#End-Game").play();
          }
        }
      }
    });

    // Won function
    function won() {
      const div = document.createElement("div");
      const divText = document.createTextNode(`Congratulation, You Won`);
      div.appendChild(divText);
      div.className = "popup";
      document.body.appendChild(div);
    }

    // End game function
    function endGame() {
      const div = document.createElement("div");
      const divText = document.createTextNode(
        `Game Over, The Word Is ${randomValueValue}`
      );
      div.appendChild(divText);
      div.className = "popup";
      document.body.appendChild(div);
    }
  });
