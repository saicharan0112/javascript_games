const canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 800;
const ctx = canvas.getContext("2d");

let x_axis = 10;
let y_axis = 320;
const dinoHeight = 80;
const dinoWidth = 100;
const dinoImage = new Image();
dinoImage.src = "./assets/dino.jpg";

let jumpHeight = 100;
let speed = 5; 
let jumpingUp = true;


function drawDino(x, y) {

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.drawImage(dinoImage, x, y, dinoWidth, dinoHeight); // Draw the Dino
}

dinoImage.onload = () => drawDino(x_axis, y_axis); // Initial draw

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        x_axis -= 10;
        drawDino(x_axis, y_axis);
    } else if (event.key === "ArrowRight") {
        x_axis += 10;
        drawDino(x_axis, y_axis);
    } else if (event.key === "ArrowUp") {
        jumpingUp = true;
        jump();
        console.log("returned");
    }
});


function jump() {
    if (jumpingUp) {
        y_axis -= speed;
        if (y_axis <= 320 - jumpHeight) {
            jumpingUp = false;
        }
    } else {
        y_axis += speed;
        if (y_axis >= 320) {
            y_axis = 320; // Reset to ground level
            drawDino(x_axis, y_axis); // Final draw
            return; // End the animation
        }
    }
    drawDino(x_axis, y_axis); // Update Dino's position
    requestAnimationFrame(jump); // Start the animation
}
