// JavaScript code (Snake game)
// Constants
const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
const SPACE_SIZE = 50;
const SNAKE_COLOR = "#643FB6";
const FOOD_COLOR = "#E7D032";
const BACKGROUND_COLOR = "#000000";
const SPEED = 125;

// Variables
let canvas, ctx;
let snake, food;
let direction;
let score;

class Snake {
  constructor() {
    this.bodySize = 3;
    this.coordinates = [];
    this.squares = [];

    for (let i = 0; i < this.bodySize; i++) {
      this.coordinates.push([0, 0]);
    }

    for (let [x, y] of this.coordinates) {
      let square = this.createSquare(x, y);
      this.squares.push(square);
    }
  }

  createSquare(x, y) {
    ctx.fillStyle = SNAKE_COLOR;
    return { x: x, y: y };
  }

  updateCoordinates() {
    let [x, y] = this.coordinates[0];

    if (direction === "up") {
      y -= SPACE_SIZE;
    } else if (direction === "down") {
      y += SPACE_SIZE;
    } else if (direction === "left") {
      x -= SPACE_SIZE;
    } else if (direction === "right") {
      x += SPACE_SIZE;
    }

    this.coordinates.unshift([x, y]);
  }

  updateSquares() {
    for (let i = 0; i < this.squares.length; i++) {
      let [x, y] = this.coordinates[i];
      this.squares[i].x = x;
      this.squares[i].y = y;
    }
  }
}

class Food {
  constructor() {
    this.coordinates = this.getRandomPosition();
  }

  getRandomPosition() {
    let x = Math.floor(Math.random() * (GAME_WIDTH / SPACE_SIZE)) * SPACE_SIZE;
    let y = Math.floor(Math.random() * (GAME_HEIGHT / SPACE_SIZE)) * SPACE_SIZE;
    return [x, y];
  }
}

function nextTurn() {
  snake.updateCoordinates();

  let [x, y] = snake.coordinates[0];

  if (x === food.coordinates[0] && y === food.coordinates[1]) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = new Food();
  } else {
    snake.coordinates.pop();
    let lastSquare = snake.squares.pop();
    ctx.clearRect(lastSquare.x, lastSquare.y, SPACE_SIZE, SPACE_SIZE);
  }

  if (checkCollisions()) {
    gameOver();
  } else {
    snake.updateSquares();
    draw();
    requestAnimationFrame(nextTurn);
  }
}

function checkCollisions() {
  let [x, y] = snake.coordinates[0];

  if (x < 0 || x >= GAME_WIDTH || y < 0 || y >= GAME_HEIGHT) {
    return true;
  }

  for (let i = 1; i < snake.coordinates.length; i++) {
    if (x === snake.coordinates[i][0] && y === snake.coordinates[i][1]) {
      return true;
    }
  }

  return false;
}

function gameOver() {
  alert("Game Over! Your score is: " + score);
  snake = new Snake();
  food = new Food();
  direction = "right";
  score = 0;
  document.getElementById("score").innerText =
    "Press any arrow key to start the game";
  requestAnimationFrame(nextTurn);
}

function handleKeyPress(event) {
  const key = event.key || event.keyCode; // Compatibility for older browsers

  if (key === "ArrowUp" || key === 38) {
    direction = "up";
  } else if (key === "ArrowDown" || key === 40) {
    direction = "down";
  } else if (key === "ArrowLeft" || key === 37) {
    direction = "left";
  } else if (key === "ArrowRight" || key === 39) {
    direction = "right";
  }

  // Start the game if it hasn't started yet
  if (typeof snake === "undefined") {
    startGame();
  }
}

function draw() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  for (let square of snake.squares) {
    let { x, y } = square;
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(x, y, SPACE_SIZE, SPACE_SIZE);
  }

  let [foodX, foodY] = food.coordinates;
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(foodX, foodY, SPACE_SIZE, SPACE_SIZE);
}

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  snake = new Snake();
  food = new Food();
  direction = "right";
  score = 0;
  document.getElementById("score").innerText = "Score: " + score;

  // Add a focus event listener to the canvas to ensure it has focus
  canvas.addEventListener("focus", function () {
    canvas.addEventListener("keydown", handleKeyPress);
  });

  // Add a blur event listener to the canvas to remove focus when clicking outside
  canvas.addEventListener("blur", function () {
    canvas.removeEventListener("keydown", handleKeyPress);
  });

  // Clear the canvas before the game starts
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Display initial snake and food on the canvas
  draw();

  // Start the game loop
  requestAnimationFrame(nextTurn);
}

// Add an initial focus to the canvas so that arrow keys work right away
document.getElementById("gameCanvas").focus();

// Start the game by calling init
startGame();
