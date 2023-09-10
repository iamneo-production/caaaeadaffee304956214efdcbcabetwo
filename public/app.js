let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const resultText = document.getElementById('result-text');
const resetButton = document.getElementById('reset-button');

function handleCellClick(cell, index) {
    if (gameBoard[index] === '' && gameActive) {
        cell.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateResultText();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            cells[a].style.color = 'red';
            cells[b].style.color = 'red';
            cells[c].style.color = 'red';
            resultText.textContent = `Player ${gameBoard[a]} wins!`;
            resetButton.disabled = false;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        resultText.textContent = 'It\'s a tie!';
        resetButton.disabled = false;
    }
}

function updateResultText() {
    resultText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach((cell, index) => {
        cell.textContent = '';
        cell.style.color = '#333';
    });

    updateResultText();
    resetButton.disabled = true;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(cell, index);
    });
});

resetButton.addEventListener('click', resetGame);
