// Constants
const X_CLASS = 'X';
const O_CLASS = 'O';

// Game state
let board;
let turn;
let winner;
let draw; 

// DOM elements
const cells = document.querySelectorAll('.cell');
const resultText = document.querySelector('.result p');
const resetButton = document.querySelector('.reset');

// Functions
startGame();

function startGame() {
  board = Array(9).fill(null);
  turn = X_CLASS;
  winner = null;
  draw = false;
  
  resetBoard();
}

function resetBoard() {
  board.fill(null);
  
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

function render() {
  board.forEach((cell, index) => {
    cells[index].textContent = cell;
  });

  checkWinner();
  checkDraw();

  if (winner) {
    resultText.textContent = `${winner} has won!`;
  } else if (draw) {
    resultText.textContent = "It's a draw!";
  } else {
    resultText.textContent = `It's ${turn}'s turn`;
  }
  
  if (winner || draw) {
    resetButton.disabled = false; 
  } else {
    resetButton.disabled = true;
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5], 
    // ...rest of combinations
  ];
  
  winningCombos.forEach(combo => {
    if (board[combo[0]] && 
        board[combo[0]] === board[combo[1]] &&
        board[combo[0]] === board[combo[2]]) {
      winner = turn;
    }
  });
}

function checkDraw() {
  if (board.every(cell => cell !== null)) {
    draw = true;
  }
}

// Event handlers
cells.forEach(cell => {
  cell.addEventListener('click', handleTurn);
});

resetButton.addEventListener('click', startGame);

function handleTurn() {
  const index = parseInt(this.id);
  
  if (board[index] || winner) return;
  
  board[index] = turn;

  turn = turn === X_CLASS ? O_CLASS : X_CLASS;

  render();
}