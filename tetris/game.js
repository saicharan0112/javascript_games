const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas and grid dimensions
canvas.width = 300;
canvas.height = 600;
const cols = 10; // Number of columns
const rows = 20; // Number of rows
const cellSize = canvas.width / cols;

// Tetromino shapes
const tetrominoes = [
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1], [1, 1]],       // O
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]], // Z
    [[1, 1, 1, 1]],         // I
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
];

// Colors for tetrominoes
const colors = ["red", "blue", "green", "yellow", "cyan", "orange", "purple"];

// Game state
let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let currentPiece = null;
let currentColor = null;
let pos = { x: 0, y: 0 };
let score = 0;
let gameOver = false;

// Helper function to draw a grid cell
function drawCell(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
}

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col]) {
                drawCell(col, row, grid[row][col]);
            }
        }
    }
}

// Spawn a new tetromino
function spawnPiece() {
    const index = Math.floor(Math.random() * tetrominoes.length);
    currentPiece = tetrominoes[index];
    currentColor = colors[index];
    pos = { x: Math.floor(cols / 2) - Math.floor(currentPiece[0].length / 2), y: 0 };
}

// Check if the current piece can move
function isValidMove(xOffset, yOffset, piece = currentPiece) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x]) {
                const newX = pos.x + x + xOffset;
                const newY = pos.y + y + yOffset;
                if (newX < 0 || newX >= cols || newY >= rows || (newY >= 0 && grid[newY][newX])) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Place the piece on the grid
function placePiece() {
    currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value && pos.y + y >= 0) {
                grid[pos.y + y][pos.x + x] = currentColor;
            }
        });
    });
    clearRows();
    spawnPiece();
    if (!isValidMove(0, 0)) {
        gameOver = true;
    }
}

// Clear completed rows
function clearRows() {
    grid = grid.filter(row => row.some(cell => !cell));
    const clearedRows = rows - grid.length;
    for (let i = 0; i < clearedRows; i++) {
        grid.unshift(Array(cols).fill(0));
    }
    score += clearedRows;
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Rotate the current piece
function rotatePiece() {
    const rotatedPiece = currentPiece[0].map((_, i) => currentPiece.map(row => row[i]).reverse());
    if (isValidMove(0, 0, rotatedPiece)) {
        currentPiece = rotatedPiece;
    }
}


// Flash the message "Game Over"
function endGame() {
    var count = 10;
    ctx.font = "bold 40px Roboto";
    ctx.fillStyle = "Green";
    ctx.fillText("Game Over",30,80);
    timer = setInterval(function() {
        if( count%2 == 1) {
            console.log("Collision Detected!");
            ctx.font = "bold 40px Roboto";
            ctx.fillStyle = "Green";
            ctx.fillText("Game Over",30,80);
        }
        else {
            // don't draw it (ie. clear it off)
            ctx.font = "bold 40px Roboto";
            ctx.fillStyle = "Yellow";
            ctx.fillText("Game Over",30,80);
        }
        count--;
        if(count == 0) clearInterval(timer);
    },1000);

}

// Game loop
function update() {
    if (gameOver) {
        endGame();
        return;
    }
    if (isValidMove(0, 1)) {
        pos.y++;
    } else {
        placePiece();
    }
    drawGrid();
    drawPiece();
}

// Draw the current piece
function drawPiece() {
    currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                drawCell(pos.x + x, pos.y + y, currentColor);
            }
        });
    });
}

// Reset the game
function resetGame() {
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    score = 0;
    document.getElementById("score").innerText = `Score: ${score}`;
    spawnPiece();
    gameOver = false;
}

// Handle key inputs
document.addEventListener("keydown", e => {
    if (gameOver) return;
    if (e.key === "ArrowLeft" && isValidMove(-1, 0)) pos.x--;
    if (e.key === "ArrowRight" && isValidMove(1, 0)) pos.x++;
    if (e.key === "ArrowDown" && isValidMove(0, 1)) pos.y++;
    if (e.key === "ArrowUp") rotatePiece();
    if (e.key === " ") {
        while (isValidMove(0, 1)) pos.y++;
        placePiece();
    }
    drawGrid();
    drawPiece();
});

// Start the game
resetGame();
document.getElementById("reset").addEventListener("click", () => {location.reload(); resetGame();})
setInterval(update, 1000);
