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

// HTML Document has initial values
// zero all these values at start

zero();

function zero() {
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('saved-0').textContent = '0';
  document.getElementById('saved-1').textContent = '0';
}

let rollDiceBtn = document.getElementsByClassName('roll-dice')[0];

rollDiceBtn.addEventListener('click', () => {
  //hide input when game starts
  inputDisplayNone();
  if (gameStarter) {
    let dice = Math.floor(Math.random() * 6) + 1;

    let img = document.getElementsByTagName('img')[0];

    img.src = 'Images/dice-' + dice + '.png';

    let score = document.getElementById('score-' + currentPlayer);

    console.log(dice, diceTwoSix); // @beginning logs (dice, diceTwoSix logs undefined)

    // i placed diceTwoSix condition here bcz
    // i want this if condition to have diceTwoSix defined
    // before i create a new value for dice
    // which means that if i clicked 'rollDice' btn
    // and dice becomes 6 the condition is a truthy
    // if the stored value for diceTwoSix was 6

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
    // i declared the value of 'diceTwoSix' here to store,
    // the value of 'dice' before it changes again,
    // by doing that now i have a value of 'dice' that occurred at the end,
    // and a value of 'dice' that occurs at the beginning,
    // for example if value of 'dice' when 'rollDice' btn clicked is 5,
    // value of 'diceTwoSix' will be 5 and it will store that value in,
    // 'diceTwoSix' until the next 'rollDice' btn click happens,
    // so if the next value for 'dice' is 6, and since 'dice' creates random numbers
    // the value of 'diceTwoSix' will still be 5 until the next btn click occurs
    // and before that happens 'dice' value is 6 and 'diceTwoSix' value is 5.
    // check where i put the condition that relates to diceTwoSix

    console.log(diceTwoSix); // @beginning diceTwoSix logs (latest value of dice)
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
  //display input to setScore
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
