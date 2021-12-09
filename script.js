'use strict';
//rules display
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.rules');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// --------------

const player1El = document.querySelector('.player--0')
const player2El = document.querySelector('.player--1')
const score1EL = document.querySelector('#score--0')
const score2EL = document.getElementById('score--1')
const current1El = document.getElementById('current--0')
const current2El = document.getElementById('current--1')
const damage = document.querySelector('.dmg')

const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function() {
    scores = [80,80];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score1EL.textContent = '♥ 80';
    score2EL.textContent = '♥ 80';
    current1El.textContent = 0;
    current2El.textContent = 0;
    
    damage.classList.add('hidden')
    diceEl.classList.add('hidden');
    player1El.classList.remove('player--winner');
    player2El.classList.remove('player--winner');
    player1El.classList.add('player--active')
    player2El.classList.remove('player--active')
}

init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle('player--active');
    player2El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1. Generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice roll
        diceEl.classList.remove('hidden')
        diceEl.src = `pokemon-${dice}.png`
        damage.classList.add('hidden')

        // 3. Check if is rolled 1: if yes, switch to new player
        if(dice !== 1) {
            //add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //switch to new player
            switchPlayer();
            currentScore = 0;
        }
    } 
})

btnHold.addEventListener('click', function() {
    if(playing) {
        // 1. Add current score to active player score
        switchPlayer();
        diceEl.src = `attack.png`;
        damage.textContent = `- ${currentScore}`;
        damage.classList.remove('hidden');
        scores[activePlayer] -= currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =  `♥ ${scores[activePlayer]}`;
        currentScore = 0;
        // 2. Check if score is already 100
        if(scores[activePlayer] <= 0){
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // Switch to the next player
            //switchPlayer();
        }
    }  
})

btnNew.addEventListener('click', init)

// Rules display

btnsOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


