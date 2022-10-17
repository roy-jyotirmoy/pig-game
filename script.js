'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0]; // array holding total score of player1 and player2
let currentScore = 0;
let activePlayer = 0;
let playing = true;
alert('First Player to 100 points wins!');

// Function to switch player
const switchPlayer = function () {
  // Changing current score of player1 to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switching Players
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggling the style for active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Function to reset the game parameters
const resetGame = function () {
  scores[activePlayer] = 0;
  document.getElementById(`score--${activePlayer}`).textContent = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // removing active player status from player2
  if (activePlayer !== 0) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle('player--active');
    activePlayer = 0;
  } else {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle('player--active');
    activePlayer = 1;
  }
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to player 2
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false; // We can no longer play
      diceEl.classList.add('hidden'); // Removing the dice
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      alert(
        `Player ${
          activePlayer + 1
        } wins the game. Press New Game to play again!`
      );
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Resetting the game functionality
btnNew.addEventListener('click', function () {
  // playing condition true again
  playing = true;
  // reset current score
  currentScore = 0;
  activePlayer = 0;
  resetGame(); // reset game for current active player
  resetGame(); // reset game for the next player as well

  // show the dice again, if removed
  diceEl.classList.remove('hidden');
  diceEl.src = 'dice-5.png';

  // change active player to player1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
