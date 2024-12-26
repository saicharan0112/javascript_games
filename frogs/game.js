var game = "";
var board = ["0", "0", "", "0", "", "1", "1", "1", "1"];
const frogButtons = document.getElementsByClassName("frogs");



function init() {
    game = "";
    for (let index = 0; index < board.length; index++) {
        if(board[index] == ""){
            game += `<button class="frogs" id="${index}">&nbsp&nbsp</button>`;
        } else {
            game += `<button class="frogs" id="${index}">${board[index]}</button>`;
        }
    }
    document.getElementById("board").innerHTML = game;
    eventListener();
}


function eventListener(){
    for (let button of frogButtons) {
        button.addEventListener("click", (event) => {
            console.log("Clicked ID:", event.target.id);
            let id = parseInt(event.target.id)
            board = getButtonValues();
            console.log(board);
            if (["0"].includes(board[id])){
                if(board[id+1] == ""){
                    console.log("shifting...")
                    tmp = board[id+1];
                    board[id+1] = board[id];
                    board[id] = tmp;
                }else if(board[id+1] != board[id] && id < 7 && board[id+2] == ""){
                    console.log("shifting...")
                    tmp = board[id+2];
                    board[id+2] = board[id];
                    board[id] = tmp;
                }
            } 


            if (["1"].includes(board[id])){
                if(board[id-1] == ""){
                    console.log("shifting...")
                    tmp = board[id-1];
                    board[id-1] = board[id];
                    board[id] = tmp;
                } else if(board[id-1] != board[id] && id > 1 && board[id-2] == ""){
                    console.log("shifting...")
                    tmp = board[id-2];
                    board[id-2] = board[id];
                    board[id] = tmp;
                }
            } 
 
            console.log(board);
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

init();
document.getElementById("reset").addEventListener("click", () => location.reload())