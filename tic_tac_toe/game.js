// 00,01,02 
// 10,11,12 
// 20,21,22  

const grid=[
    ["","",""],
    ["","",""],
    ["","",""]
]

function game(){

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            document.getElementById((i.toString())+(j.toString())).addEventListener("click", () => {
                grid[i][j]="X";
                value = document.getElementById((i.toString())+(j.toString())).innerHTML
                if(value == ""){
                    document.getElementById((i.toString())+(j.toString())).innerHTML = grid[i][j];
                    document.getElementById((i.toString())+(j.toString())).style.backgroundColor = "#f1f15e";
                    result = whoWon()
                    if(result != "none"){
                        document.getElementById("response").innerHTML="Yeah, "+result+" Won!";
                        const buttons = document.getElementsByTagName("button");
                        for (const button of buttons) {
                            button.disabled = true;
                        }
                        document.getElementById("reset").disabled = false;
                        return "done";
                    }
                    computerMove();
                    result = whoWon()
                    if(result != "none"){
                        document.getElementById("response").innerHTML="Yeah, "+result+" Won!";
                        const buttons = document.getElementsByTagName("button");
                        for (const button of buttons) {
                            button.disabled = true;
                        }
                        document.getElementById("reset").disabled = false;
                        return "done";
                    }
                }
            });
        }
    }

}

function computerMove(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(grid[i][j] == ""){
                grid[i][j]="O";
                document.getElementById((i.toString())+(j.toString())).innerHTML=grid[i][j];
                document.getElementById((i.toString())+(j.toString())).style.backgroundColor = "#ffc342";
                return;               
            }
        }
        // if(humanMove){
        //     result = whoWon()
        //     if(result != ""){
        //         document.getElementById("response").innerHTML="Yeah, "+result+" Won!";
        //         const buttons = document.getElementsByTagName("button");
        //         for (const button of buttons) {
        //             button.disabled = true;
        //         }
        //     }
        //     break;
        // } else {
        //     document.getElementById("response").innerHTML="I thought my move and Its a draw!";
        //     const buttons = document.getElementsByTagName("button");
        //     for (const button of buttons) {
        //         button.disabled = true;
        //     }
        //     break
        // }
    }
}

function whoWon(){

    for (let i = 0; i < 3; i++) {
       
        if ((grid[i][0] == "X" && grid[i][1] == "X" && grid[i][2] == "X") 
            || (grid[0][i] == "X" && grid[1][i] == "X" && grid[2][i] == "X")
            || (grid[0][0] == "X" && grid[1][1] == "X" && grid[2][2] == "X")
            || (grid[0][2] == "X" && grid[1][1] == "X" && grid[2][0] == "X"))
        {
            return "You";
        }

        if ((grid[i][0] == "O" && grid[i][1] == "O" && grid[i][2] == "O") 
            || (grid[0][i] == "O" && grid[1][i] == "O" && grid[2][i] == "O")
            || (grid[0][0] == "O" && grid[1][1] == "O" && grid[2][2] == "O")
            || (grid[0][2] == "O" && grid[1][1] == "O" && grid[2][0] == "O"))
        {
            return "Computer";
        }

    }
    return "none";
}

game();

document.getElementById("reset").addEventListener("click", () => location.reload())


