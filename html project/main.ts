type Player = 'X' | 'O';
type CellValue = Player | '';

let board: CellValue[] = Array(9).fill('');
let currentPlayer: Player = 'X';
let gameActive: boolean = true;

function renderBoard(): void {
    const boardDiv = document.getElementById('board') as HTMLDivElement;
    boardDiv.innerHTML = '';

    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.innerText = cell;
        cellDiv.addEventListener('click', () => makeMove(index));
        boardDiv.appendChild(cellDiv);
    });
}

function makeMove(index: number): void {
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    renderBoard();

    const status = document.getElementById('status') as HTMLElement;

    if (checkWin()) {
        status.innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        status.innerText = `It's a Draw! 🤝`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `${currentPlayer}'s Turn`;
}

function checkWin(): boolean {
    const winConditions: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winConditions.some(([a, b, c]) =>
        board[a] !== '' && board[a] === board[b] && board[a] === board[c]
    );
}

function resetGame(): void {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;

    const status = document.getElementById('status') as HTMLElement;
    status.innerText = "Tic Tac Toe";

    renderBoard();
}

document.addEventListener('DOMContentLoaded', renderBoard);
