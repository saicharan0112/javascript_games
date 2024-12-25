const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;
canvas.height = 600;

var score=0;

// Initial position and properties of the snake
const speed = 3; // Speed of movement
var segmentSize = 10; // Size of each segment
let segments = [{ x: canvas.width / 2, y: canvas.height / 2 }]; // Initial segment (starting at the center)
let angle = 0; // Direction of movement (in radians)
const dotRadius = 5; // Radius of dots
const dots = []; // Array to store dots
const collisionThreshold = segmentSize / 5; // increase the denominator to make it much stricter

// Function to generate a random dot
function createRandomDot() {
  const dotX = Math.random() * (canvas.width - 2 * dotRadius) + dotRadius;
  const dotY = Math.random() * (canvas.height - 2 * dotRadius) + dotRadius;
  dots.push({ x: dotX, y: dotY });
} 

// Draw all dots
function drawDots() {
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "Red";
    ctx.fill();
  });
}

// Event listener for arrow keys to change direction
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && angle !== Math.PI / 2) {
    angle = -Math.PI / 2; // 90 degrees up
  } else if (event.key === 'ArrowDown' && angle !== -Math.PI / 2) {
    angle = Math.PI / 2;  // 90 degrees down
  } else if (event.key === 'ArrowLeft' && angle !== 0) {
    angle = Math.PI;  // 180 degrees left
  } else if (event.key === 'ArrowRight' && angle !== Math.PI) {
    angle = 0;  // 0 radians right
  }
});

// Check collision between the head of the snake and a dot
function checkCollision(dot) {
  const head = segments[segments.length - 1]; // Get the head segment
  const distance = Math.sqrt((head.x - dot.x) ** 2 + (head.y - dot.y) ** 2);
  return distance < dotRadius + segmentSize / 2; // Check if head is close enough to the dot
}

// Function to check if the snake's head collides with any other segment
function checkSelfCollision() {
  const head = segments[segments.length - 1]; // Get the head segment
  // Check for collision with each body segment (excluding the head itself)
  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    const distance = Math.sqrt((head.x - segment.x) ** 2 + (head.y - segment.y) ** 2);
    console.log(distance);
    if (distance < collisionThreshold) { // Collision detected if distance is less than segment size
      return true; // The snake touched itself
    }
  }
  return false; // No collision
}


function gameLoop() {
  // Clear the canvas for the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the dots
  drawDots();

  // Calculate the new head position
  const head = segments[segments.length - 1]; // Get the current head position
  const newHead = {
    x: head.x + speed * Math.cos(angle),
    y: head.y + speed * Math.sin(angle),
  };

  // Check if the snake goes out of bounds and wrap it to the other side
  if (newHead.x < 0) newHead.x = canvas.width - segmentSize; // Left side
  if (newHead.x >= canvas.width) newHead.x = 0; // Right side
  if (newHead.y < 0) newHead.y = canvas.height - segmentSize; // Top side
  if (newHead.y >= canvas.height) newHead.y = 0; // Bottom side

  // Check for collisions with dots before updating the snake position
  let collidedWithDot = false;
  for (let i = 0; i < dots.length; i++) {
    if (checkCollision(dots[i])) {
      dots.splice(i, 1); // Remove the dot on collision
      createRandomDot(); // Add a new random dot
      score+=1;
      collidedWithDot = true; // Mark collision with dot
      break;
    }
  }

  // Add the new head to the segments array
  segments.push(newHead);

  // If no collision with the dot, remove the tail segment
  if (!collidedWithDot) {
    segments.shift(); // Remove the tail
  }

  // Check for self-collision after updating the snake position
  if (checkSelfCollision()) {
    alert('Game Over! Snake touched itself.'); // Alert when game over
    return; // Stop the game loop
  }

  // Draw the snake (all segments)
  segments.forEach(segment => {
    ctx.beginPath();
    ctx.rect(segment.x - segmentSize / 2, segment.y - segmentSize / 2, segmentSize, segmentSize); // Draw each segment as a square
    ctx.fillStyle = "Green"; // Color of the snake
    ctx.fill();
  });

  document.getElementById("score").innerHTML="Score: "+score;

  // Request the next frame
  requestAnimationFrame(gameLoop);
}


// Start the game loop
gameLoop();

// Generate initial dot
createRandomDot();

document.getElementById("reset").addEventListener("click", () => {location.reload(); init()})

