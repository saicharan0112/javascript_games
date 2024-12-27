const canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 800;
const ctx = canvas.getContext("2d");

// Dinosaur
let x_axis = 10;
let y_axis = 350;
const dinoHeight = 50;
const dinoWidth = 50;
const dinoImage = new Image();
dinoImage.src = "./assets/dino.png";
let jumpHeight = 100;
let jumpSpeed = 5;
let isJumping = false; // Flag to check if Dino is jumping
let jumpingUp = true; // Direction of jump

// Cactus
const cactusHeight = 30;
const cactusWidth = 20;
let cactusX = canvas.width; // Initial cactus position
const cactusImage = new Image();
cactusImage.src = "./assets/cactus.png";

// Ground
const groundImage = new Image();
groundImage.src = "./assets/ground.png";
let groundX = 0; // Starting position of the ground
const groundSpeed = 5; // Speed of ground movement

let score = 0;

function drawGround() {
    ctx.drawImage(groundImage, groundX, 380, canvas.width, 10); // Draw the ground
    ctx.drawImage(groundImage, groundX + canvas.width, 380, canvas.width, 10); // Wrap-around ground
}

function drawDino(x, y) {
    ctx.drawImage(dinoImage, x, y, dinoWidth, dinoHeight); // Draw the Dino
}

function drawCactus(cactusX) {
    ctx.drawImage(cactusImage, cactusX, 370, cactusWidth, cactusHeight); // Draw the Cactus
}

function collisionDetect(cactusX) {
    // Dino bounds
    const dinoLeft = x_axis;
    const dinoRight = x_axis + dinoWidth;
    const dinoTop = y_axis;
    const dinoBottom = y_axis + dinoHeight;

    // Cactus bounds
    const cactusLeft = cactusX;
    const cactusRight = cactusX + cactusWidth;
    const cactusTop = 370; // Fixed Y position for cactus
    const cactusBottom = 370 + cactusHeight;

    // Check for overlap (AABB collision detection)
    if (
        dinoRight > cactusLeft &&
        dinoLeft < cactusRight &&
        dinoBottom > cactusTop &&
        dinoTop < cactusBottom
    ) { return true; }
    return false; // No collision
}

function getScore() {
    score+=1;
    return Math.ceil(score/100);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Move the ground and cactus to the left
    groundX -= groundSpeed;
    cactusX -= groundSpeed; // Cactus moves along with the ground

    if (groundX <= -canvas.width) {
        groundX = 0; // Reset ground position when fully out of view
    }

    if (cactusX <= -cactusWidth) {
        cactusX = canvas.width; // Reset cactus position
    }

    drawGround(); // Draw the ground
    drawCactus(cactusX); // Draw the moving cactus

    // Handle jumping logic
    if (isJumping) {
        if (jumpingUp) {
            y_axis -= jumpSpeed;
            if (y_axis <= 350 - jumpHeight) {
                jumpingUp = false;
            }
        } else {
            y_axis += jumpSpeed;
            if (y_axis >= 350) {
                y_axis = 350; // Reset to ground level
                isJumping = false; // End the jump
            }
        }
    }

    drawDino(x_axis, y_axis); // Draw the Dino

    // Check for collision
    if (collisionDetect(cactusX)) {
        endGame();
        return;
    }

    document.getElementById("score").innerHTML="Score: "+getScore();

    requestAnimationFrame(animate); // Continue the animation
}

// Flash the message "Game Over"
function endGame() {
    var count = 10;
    ctx.font = "bold 80px Roboto";
    ctx.fillStyle = "Green";
    ctx.fillText("Game Over",180,80);
    timer = setInterval(function() {
        if( count%2 == 1) {
            console.log("Collision Detected!");
            ctx.font = "bold 80px Roboto";
            ctx.fillStyle = "Green";
            ctx.fillText("Game Over",180,80);
        }
        else {
            // don't draw it (ie. clear it off)
            ctx.font = "bold 80px Roboto";
            ctx.fillStyle = "Yellow";
            ctx.fillText("Game Over",180,80);
        }
        count--;
        if(count == 0) clearInterval(timer);
    },1000);

}

dinoImage.onload = () => cactusImage.onload = () => groundImage.onload = () => animate(); // Start animation

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        x_axis -= 10;
        console.log(x_axis, y_axis);
    } else if (event.key === "ArrowRight") {
        x_axis += 10;
        console.log(x_axis, y_axis);
    } else if (event.key === "ArrowUp" && !isJumping) {
        isJumping = true; // Start the jump
        jumpingUp = true; // Begin jumping upward
        console.log(x_axis, y_axis);
    }
});


document.getElementById("reset").addEventListener("click", () => {location.reload(); init()})
