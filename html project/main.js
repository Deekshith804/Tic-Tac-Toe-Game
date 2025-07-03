// main.js

const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Create the 9 cells
function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

// Handle player move
function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!isGameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    isGameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winner
function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      cells[a] === currentPlayer &&
      cells[b] === currentPlayer &&
      cells[c] === currentPlayer
    );
  });
}

// Reset game
function resetGame() {
  cells = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
}

// Initialize board
createBoard();
statusText.textContent = `Player ${currentPlayer}'s Turn`;
