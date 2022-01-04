let setScore;
if (setScore === undefined || NaN) setScore = 100;

document.getElementById('winning-score').textContent = 100;

function displayInput() {
  let input = document.getElementById('set-score').value;
  setScore = input;
  document.getElementById('winning-score').textContent = input;
}

function inputDisplayNone() {
  document.querySelector('.set-score-btn').style.display = 'none';
  document.querySelector('.score-label').style.display = 'none';
  document.getElementById('set-score').style.display = 'none';
}

function inputDisplayOn() {
  document.querySelector('.set-score-btn').style.display = 'block';
  document.querySelector('.score-label').style.display = 'block';
  document.getElementById('set-score').style.display = 'block';
}

let gameStarter = true;

let savedScores = [0, 0];

let currentScore = 0;

let currentPlayer = 0;

let diceTwoSix;

zero();

function zero() {
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('saved-0').textContent = '0';
  document.getElementById('saved-1').textContent = '0';
}

let rollDiceBtn = document.getElementsByClassName('roll-dice')[0];

rollDiceBtn.addEventListener('click', () => {
  inputDisplayNone();
  if (gameStarter) {
    let dice = Math.floor(Math.random() * 6) + 1;

    let img = document.getElementsByTagName('img')[0];

    img.src = 'Images/dice-' + dice + '.png';

    let score = document.getElementById('score-' + currentPlayer);

    console.log(dice, diceTwoSix);

    if (dice === 6 && diceTwoSix === 6) {
      savedScores[currentPlayer] = 0;
      document.querySelector('#saved-' + currentPlayer).textContent = 0;
      switchPlayer();
    } else if (dice !== 1) {
      currentScore += dice;
      score.textContent = currentScore;
    } else {
      currentScore = 0;
      score.textContent = 0;
      currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
      document.querySelector('.player-container-0').classList.toggle('active');
      document.querySelector('.player-container-1').classList.toggle('active');
      img.src = 'Images/next-player.png';
    }

    diceTwoSix = dice;

    console.log(diceTwoSix);
  }
});

let holdScoreBtn = document.querySelector('.hold-score');

holdScoreBtn.addEventListener('click', () => {
  savedScores[currentPlayer] += currentScore;

  document.querySelector('#saved-' + currentPlayer).textContent =
    savedScores[currentPlayer];

  if (savedScores[currentPlayer] >= setScore) {
    let playerName = document.getElementById('name-' + currentPlayer);
    playerName.textContent = 'WINNER!!';
    let img = document.getElementsByTagName('img')[0];
    img.src = 'Images/winner-' + currentPlayer + '.png';
    gameStarter = false;
    savedScores[currentPlayer] = 0;
    document.querySelector('.player-container-0').style.background = 'inherit';
    document.querySelector('.player-container-1').style.background = 'inherit';
  } else {
    switchPlayer();
  }
});

function switchPlayer() {
  let score = document.getElementById('score-' + currentPlayer);
  currentScore = 0;
  score.textContent = 0;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector('.player-container-0').classList.toggle('active');
  document.querySelector('.player-container-1').classList.toggle('active');
}

let newGameBtn = document.querySelector('.new-game');

newGameBtn.addEventListener('click', () => {
  inputDisplayOn();
  gameStarter = true;

  if (gameStarter) {
    savedScores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;

    let img = document.getElementsByTagName('img')[0];
    img.src = 'Images/startup.png';
    document.querySelector('.player-container-0').classList.remove('active');
    document.querySelector('.player-container-1').classList.remove('active');
    document.querySelector('.player-container-0').classList.add('active');
    document.querySelector('.player-container-1').classList.remove('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    zero();
  }
});
