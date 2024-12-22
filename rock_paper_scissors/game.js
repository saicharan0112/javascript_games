const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");

rockBtn.addEventListener("click", () => whoWon("1"));
paperBtn.addEventListener("click", () => whoWon("2"));
scissorsBtn.addEventListener("click", () => whoWon("3"));

// 2(paper) > 1(rock), 3(scissors) > 2(paper) => left-player won
// 1(rock) > 3(scissors) => right-player won

function whoWon(user) {
    
    var computer = Math.floor(Math.random() * 3) + 1;
    if (user == computer) {
        document.getElementById("response").innerHTML="Draw";
    } else if ((user == 1 && computer == 3) || (user > computer))  {
        document.getElementById("response").innerHTML="User won!";
    } else {
        document.getElementById("response").innerHTML="Computer won!";
    }
}