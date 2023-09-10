// Game logic

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let winner = null;

// DOM elements 

const cells = document.querySelectorAll('.cell');
const resultText = document.getElementById('result-text');
const resetButton = document.getElementById('reset-button');

// Event listeners

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// Functions

function handleCellClick() {

  const index = this.cellIndex;
  
  if (board[index] || winner) return;
  
  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  
  checkWinner();
  togglePlayer();
  updateResultText();

}

function checkWinner() {

  // TODO: Check board for winner

}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateResultText() {
  resultText.textContent = `${currentPlayer}'s turn`;
}

function resetGame() {
  
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  winner = null;
  
  cells.forEach(cell => {
    cell.textContent = '';
  });
  
  updateResultText();
  resetButton.disabled = true;
  
}