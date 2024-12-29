function generateBoard() {
    const boardLength = 9;
    const halfLength = Math.floor(boardLength / 2);

    let zeros = Array(halfLength).fill("0");
    let ones = Array(halfLength).fill("1");

    const makeSomeEmpty = (arr) => {
        const emptyCount = Math.floor(Math.random() * (arr.length / 2)) + 1; // Ensure at least 1 empty
        for (let i = 0; i < emptyCount; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            arr[randomIndex] = ""; // Replace with empty
        }
    };

    makeSomeEmpty(zeros);
    makeSomeEmpty(ones);

    zeros = zeros.sort(() => Math.random() - 0.5);
    ones = ones.sort(() => Math.random() - 0.5);

    return [...zeros, "", ...ones];
}


var board = generateBoard();

function init() {
    game = "";
    for (let index = 0; index < board.length; index++) {
        if(board[index] == ""){
            game += `<button class="frogs" id="${index}">&nbsp&nbsp</button>`;
        } else if (board[index] == "0") {
            game += `<button class="frogs" id="${index}">${board[index]}<img src="./assets/frog1.png" alt="Frog 0" class="frog-image" width=50px height=50px></button>`;
        } else if (board[index] == "1") {
            game += `<button class="frogs" id="${index}">${board[index]}<img src="./assets/frog0.png" alt="Frog 0" class="frog-image" width=50px height=50px></button>`;
        }
    }
    document.getElementById("board").innerHTML = game;
    eventListener();
}

init();

function eventListener(){
    const frogButtons = document.getElementsByClassName("frogs");
    for (let button of frogButtons) {
        button.addEventListener("click", (event) => {
            console.log("Clicked ID:", event.target.id);
            let id = parseInt(event.target.id)
            board = getButtonValues();
            console.log(board);
            if (["0"].includes(board[id])){
                if(board[id+1] == ""){
                    console.log("shifting..."+board[id])
                    tmp = board[id+1];
                    board[id+1] = board[id];
                    board[id] = tmp;
                }else if(board[id+1] != board[id] && id < 7 && board[id+2] == ""){
                    console.log("shifting..."+board[id])
                    tmp = board[id+2];
                    board[id+2] = board[id];
                    board[id] = tmp;
                }
            } 


            if (["1"].includes(board[id])){
                if(board[id-1] == ""){
                    console.log("shifting... "+board[id]);
                    tmp = board[id-1];
                    board[id-1] = board[id];
                    board[id] = tmp;
                } else if(board[id-1] != board[id] && id > 1 && board[id-2] == ""){
                    console.log("shifting... "+board[id]);
                    tmp = board[id-2];
                    board[id-2] = board[id];
                    board[id] = tmp;
                }
            } 
 
            console.log(board);
            if(checkWinCase(board)){return;}
            init();
            });
    }
}

function getButtonValues() {
    const buttons = document.querySelectorAll("#board button"); // Correctly select buttons within the board div
    const values = []; // Initialize an empty list

    buttons.forEach(button => {
        values.push(button.innerText.trim()); // Add trimmed button text to the list
    });

    return values; // Return the list of values
}

function checkWinCase(board) {
    ones = board.slice(0,4);
    zeros = board.slice(5,board.length);
    if((ones.includes("0")) || (zeros.includes("1"))) {
        return false;
    } else {
        document.getElementById("response").innerHTML="You won!";
        return true;
    } 
};


document.getElementById("reset").addEventListener("click", () => location.reload())