// Game state
let board;
let turn = 'X';
let winner;

// DOM elements
const cells = document.querySelectorAll('.cell');
const resultText = document.querySelector('.result p');
const resetButton = document.querySelector('.reset');

startGame();

// Function to initialize game
function startGame() {
  board = Array(9).fill(null);
  turn = 'X';
  winner = null;
  
  render();
}

// Render board and update UI
function render() {
  board.forEach((cell, index) => {
    cells[index].textContent = cell;
  });
  
  if (winner) {
    resultText.textContent = `${winner} wins!`;
    resetButton.disabled = false;
  } else if (board.every(cell => cell !== null)) {
    resultText.textContent = `It's a draw!`;
    resetButton.disabled = false;    
  } else {
    resultText.textContent = `${turn}'s turn`;
    resetButton.disabled = true;
  }
}

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id);
    
    if (board[index] || winner) return;
    
    board[index] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    
    checkWinner();
    render();
  }); 
});

// Check for winner
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  winningCombos.forEach(combo => {
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
      winner = board[combo[0]];
    }
  });
}

// Reset game
resetButton.addEventListener('click', startGame);