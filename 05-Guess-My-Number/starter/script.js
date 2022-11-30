'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Numer!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 69;

console.log(document.querySelector('.guess').value);
*/
//game logic

const number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const guess = function () {
  const guess1 = Number(document.querySelector('.guess').value);
  if (!guess1) {
    document.querySelector('.message').textContent = 'No Number!';
  } else if (guess1 == number) {
    document.querySelector('.message').textContent = 'Correct Number!';
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
    }
    document.querySelector('.highscore').textContent = highscore;
  } else if (score > 0) {
    if (guess1 > number) {
      document.querySelector('.message').textContent = 'Too high!';
      score -= 1;
    } else if (guess1 < number) {
      document.querySelector('.message').textContent = 'Too low!';
      score -= 1;
    }
  } else if (score <= 1) {
    document.querySelector('.message').textContent = 'You lost the game!';
  }

  document.querySelector('.score').textContent = score;
};

const again = function () {
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = null;
};

document.querySelector('.check').addEventListener('click', guess);
document.querySelector('.again').addEventListener('click', again);
