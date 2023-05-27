'use strict';

const srcStartMusic =
  'http://cnc-redalert.ru/music/dune2/Choose+Your+House.mp3';
const srcWinMusic = 'http://cnc-redalert.ru/music/dune2/Atredies+Victory.mp3';
const srcLoseMusic = 'http://cnc-redalert.ru/music/dune2/Hope+Fades+-+Menu.mp3';

const random = () => {
  return (document.querySelector('.question').value =
    Math.trunc(Math.random() * 1000) + 1);
};

//music doesn't turn on with line-through button
const musicTurn = function (srcMusic) {
  if (
    document.querySelector('.turn-music').style.textDecoration ===
    'line-through'
  ) {
    audio.autoplay = false;
  } else {
    audio.autoplay = true;
  }
  audio.src = srcMusic;
};

const guessMessageText = function (message) {
  document.querySelector('.guess-message').textContent = message;
};
const checkButtonDisable = function (condition) {
  document.querySelector('.check').disabled = condition;
};

const audio = new Audio();
audio.loop = true;
musicTurn(srcStartMusic);

let rand = random();
console.log(rand);
let score = 20;
let highscore = 0;

const startCondition = function () {
  musicTurn(srcStartMusic);
  document.querySelector('.turn-music').style.backgroundColor = 'rgb(0,0,0)';
  document.querySelector('.turn-music').style.color = '#fff';
  document.querySelector('body').style.backgroundColor = 'rgb(0, 0, 0)';
  document.querySelector('body').style.color = '#fff';
  document.querySelector('.question').style.backgroundColor = '#fff';
  document.querySelector('.question').style.width = '25rem';
  document.querySelector('main').style.color = '#fff';
  document.querySelector('.number-input').style.border = '4px solid #fff';
  document.querySelector('.number-input').value = '';
  document.querySelector('.btn').style.backgroundColor = '#fff';
  document.querySelector('.check').style.backgroundColor = '#fff';
  document.querySelector('header').style.borderBottom = '7px solid #fff';
};

const winCondition = function () {
  musicTurn(srcWinMusic);
  document.querySelector('.turn-music').style.backgroundColor =
    'rgb(9, 250, 21)';
  document.querySelector('body').style.backgroundColor = 'rgb(9, 250, 21)';
  document.querySelector('.question').style.width = '50rem';
};

const loseCondition = function () {
  musicTurn(srcLoseMusic);
  document.querySelector('.turn-music').style.backgroundColor =
    'rgb(3, 11, 252)';
  document.querySelector('.turn-music').style.color = 'rgb(252, 252, 3)';
  document.querySelector('body').style.backgroundColor = 'rgb(3, 11, 252)';
  document.querySelector('body').style.color = 'rgb(252, 252, 3)';
  document.querySelector('.question').style.backgroundColor =
    'rgb(252, 252, 3)';
  document.querySelector('main').style.color = 'rgb(252, 252, 3)';
  document.querySelector('.number-input ').style.border =
    '4px solid rgb(252, 252, 3)';
  document.querySelector('.btn').style.backgroundColor = 'rgb(252, 252, 3)';
  document.querySelector('.check').style.backgroundColor = 'rgb(252, 252, 3)';
  document.querySelector('header').style.borderBottom =
    '7px solid rgb(252, 252, 3)';
};

//check button
document.querySelector('.check').addEventListener('click', function () {
  const val = Number(document.querySelector('.number-input').value);

  if (!val) {
    guessMessageText('Введите число');
  } else if (val !== rand) {
    if (val < rand) {
      guessMessageText('Больше');
    } else {
      guessMessageText('Меньше');
    }
    document.querySelector('.score').textContent = --score;

    if (score === 0) {
      document.querySelector('.question').textContent = 'GAME OVER';
      guessMessageText('Игра Окончена!');
      loseCondition();
      checkButtonDisable(true);
    }
  } else {
    document.querySelector('.question').textContent = val;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    guessMessageText('Поздравляю!');
    checkButtonDisable(true);
    winCondition();
  }
});

// again button
document.querySelector('.again').addEventListener('click', function () {
  audio.currentTime = 0;
  rand = random();
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.question').textContent = '???';
  guessMessageText('Начни угадывать!');
  startCondition();
  checkButtonDisable(false);
});

// music-button switch
document.querySelector('.turn-music').addEventListener('click', function () {
  if (
    document.querySelector('.turn-music').style.textDecoration ===
    'line-through'
  ) {
    document.querySelector('.turn-music').style.textDecoration = 'none';
    audio.play();
  } else {
    document.querySelector('.turn-music').style.textDecoration = 'line-through';
    audio.pause();
  }
});
