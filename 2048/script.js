document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 4; // 4x4 grid
    let board = [];
    let score = 0;

    // Initialize the game
    function initGame() {
        board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
        score = 0;
        document.getElementById("response").textContent = "Keep Playing!";
        addRandomTile();
        addRandomTile();
        renderBoard();
    }

    // Add a random tile (2 or 4) to an empty spot
    function addRandomTile() {
        let emptyTiles = [];
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] === 0) emptyTiles.push({ row, col });
            }
        }
        if (emptyTiles.length === 0) return;

        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }

    // Render the board on the screen
    function renderBoard() {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const tile = document.getElementById(`${row}${col}`);
                tile.textContent = board[row][col] === 0 ? "" : board[row][col];
                if (board[row][col] === 0) {
                    tile.style.backgroundColor = "hsl(0, 0%, 76%)";
                } else {
                    lightness = 80 - Math.log2(board[row][col]) * 5;
                    tile.style.backgroundColor = `hsl(215, 25%, ${Math.max(lightness, 30)}%)`;
                }
                tile.className = `tile ${board[row][col] ? `tile-${board[row][col]}` : ""}`;
            }
        }
    }

    // Slide a row or column to the left
    function slide(row) {
        let arr = row.filter(val => val !== 0); // Remove zeros
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                score += arr[i];
                arr[i + 1] = 0;
            }
        }
        arr = arr.filter(val => val !== 0); // Remove zeros again
        while (arr.length < boardSize) arr.push(0); // Add zeros at the end
        document.getElementById("score").textContent = "Score: "+score;
        return arr;
    }

    // Move tiles in a given direction
    function moveLeft() {
        let moved = false;
        for (let row = 0; row < boardSize; row++) {
            const newRow = slide(board[row]);
            if (newRow.toString() !== board[row].toString()) moved = true;
            board[row] = newRow;
        }
        if (moved) {
            addRandomTile();
            renderBoard();
            checkGameOver();
        }
    }

    function moveRight() {
        let moved = false;
        for (let row = 0; row < boardSize; row++) {
            const newRow = slide(board[row].slice().reverse()).reverse();
            if (newRow.toString() !== board[row].toString()) moved = true;
            board[row] = newRow;
        }
        if (moved) {
            addRandomTile();
            renderBoard();
            checkGameOver();
        }
    }

    function moveUp() {
        let moved = false;
        for (let col = 0; col < boardSize; col++) {
            let column = board.map(row => row[col]);
            const newColumn = slide(column);
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== newColumn[row]) moved = true;
                board[row][col] = newColumn[row];
            }
        }
        if (moved) {
            addRandomTile();
            renderBoard();
            checkGameOver();
        }
    }

    function moveDown() {
        let moved = false;
        for (let col = 0; col < boardSize; col++) {
            let column = board.map(row => row[col]);
            const newColumn = slide(column.slice().reverse()).reverse();
            for (let row = 0; row < boardSize; row++) {
                if (board[row][col] !== newColumn[row]) moved = true;
                board[row][col] = newColumn[row];
            }
        }
        if (moved) {
            addRandomTile();
            renderBoard();
            checkGameOver();
        }
    }

    // Check for game over
    function checkGameOver() {
        let hasMoves = false;
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (board[row][col] === 0) hasMoves = true;
                if (col < boardSize - 1 && board[row][col] === board[row][col + 1]) hasMoves = true;
                if (row < boardSize - 1 && board[row][col] === board[row + 1][col]) hasMoves = true;
            }
        }
        if (!hasMoves) document.getElementById("response").textContent = "Game Over!";
    }

    // Reset the game
    document.getElementById("reset").addEventListener("click", initGame);

    // Listen for arrow keys
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
        }
    });

    // Start the game
    initGame();
});
