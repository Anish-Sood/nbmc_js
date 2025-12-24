let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const loworhigh = document.querySelector('.lowOrHi');
const guessSlot = document.querySelector('.guesses');
const rem = document.querySelector('.lastResult');
const resultbox = document.querySelector('.resultParas');

const p = document.createElement('p');

let playGame = true;
console.log(`randomNumber: ${randomNumber}`);
let prevGuess = [];
let numGuess = 0;

if (playGame) {
  submit.addEventListener('click', (e) => {
    // console.log(e)
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // userInput.value = null;
    console.log(`Guess: ${typeof guess}`);
    validateGuess(guess);
  });
  submit.addEventListener('mousemove', (e)=>{
    console.log(`${e.screenX}, ${e.screenY}`)
  })
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('enter valid number');
  } else if (guess < 1 || guess > 100) {
    alert('enter in a valid range');
  } else {
    prevGuess.push(guess);
    console.log(prevGuess);
    if (numGuess === 9) {
      displayMessage(`game over. the random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('You won');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Number is low');
  } else if (guess > randomNumber) {
    displayMessage('Number is high');
  }
}

function displayMessage(msg) {
  loworhigh.innerHTML = `${msg}`;
}

function displayGuess(guess) {
  userInput.value = '';
  // console.log(`in display guess fn ${guess}`);
  guessSlot.innerHTML += ` ${guess}`;
  numGuess++;
  rem.innerHTML = `${10 - numGuess}`;
}

function newGame() {
  const newgame = document.querySelector('#newgame');
  newgame.addEventListener('click', (e) => {
    guessSlot.innerHTML = '';
    rem.innerHTML = `10`;
    userInput.removeAttribute('disabled');
    resultbox.removeChild(p);
    displayMessage('');
    randomNumber = parseInt(Math.random() * 100 + 1);
    numGuess = 0;
    playGame = true;
  });
}
function endGame() {
  userInput.value = '';
  prevGuess = [];
  numGuess = 10;
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = '<h3 id="newgame">Start new Game</h3>';
  resultbox.appendChild(p);
  playGame = false;

  // guessSlot = '';
  newGame();
}

// document.addEventListener('click', function (e) {});
