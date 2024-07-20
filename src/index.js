import './style.scss'; // Import styles

const CANVAS = document.getElementById('snakeCanvas'); // Get canvas element
const CTX = CANVAS.getContext('2d'); // Get canvas context

CANVAS.width = innerWidth; // Set canvas width to window width
CANVAS.height = innerHeight; // Set canvas height to window height

let direction = 'RIGHT'; // Snake direction
const SPEED = 700; // Snake speed
const GRID_SIZE = 40; // Size of each grid cell
// Snake initial position
const SNAKE = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];

const APPLE = { x: 5, y: 5 }; // Apple initial position

const DRAW_MAP = () => {
  CTX.fillStyle = '#000';
  CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
};

const DRAW_SNAKE = () => {
  CTX.fillStyle = 'green';
  for (let snakeBody of SNAKE) {
    CTX.fillRect(
      snakeBody.x * GRID_SIZE,
      snakeBody.y * GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE
    );
  }
};

const DRAW_APPLE = () => {
  CTX.fillStyle = 'red';
  CTX.fillRect(APPLE.x * GRID_SIZE, APPLE.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
};

// Keyboard event listener
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp': {
      direction = 'UP';
      break;
    }
    case 'ArrowDown': {
      direction = 'DOWN';
      break;
    }
    case 'ArrowLeft': {
      direction = 'LEFT';
      break;
    }
    case 'ArrowRight': {
      direction = 'RIGHT';
      break;
    }
  }
  console.log(event);
});

// Check if snake has collided with wall or itself
const GAMEOVER = () => {
  if (
    SNAKE[0].x < 0 ||
    SNAKE[0].x >= CANVAS.width / GRID_SIZE ||
    SNAKE[0].y < 0 ||
    SNAKE[0].y >= CANVAS.height / GRID_SIZE
  ) {
    return true;
  } else {
    const [head, ...body] = SNAKE;
    for (let bodyPart of body) {
      if (head.x === bodyPart.x && head.y === bodyPart.y) {
        return true;
      }
    }
  }
  return false;
};

const UPDATE_SNAKE_POSITION = () => {
  // Move snake head
  let head;
  switch (direction) {
    case 'RIGHT': {
      head = [SNAKE[0].x + 1, SNAKE[0].y];
      break;
    }
    case 'LEFT': {
      head = [SNAKE[0].x - 1, SNAKE[0].y];
      break;
    }
    case 'UP': {
      head = [SNAKE[0].x, SNAKE[0].y - 1];
      break;
    }
    case 'DOWN': {
      head = [SNAKE[0].x, SNAKE[0].y + 1];
      break;
    }
  }

  SNAKE.unshift({ x: head[0], y: head[1] }); // Add new head
  SNAKE.pop(); // Remove tail

  return GAMEOVER();
};

const MOVE_SNAKE = () => {
  if (!UPDATE_SNAKE_POSITION()) {
    DRAW_MAP();
    DRAW_SNAKE();
    DRAW_APPLE();
    setTimeout(() => requestAnimationFrame(MOVE_SNAKE), 1000 - SPEED); // Move snake every 1 second - speed
  } else {
    alert('Game Over'); // Show game over message
    window.location.reload(); // Reload game
  }
};

requestAnimationFrame(MOVE_SNAKE); // Start game loop
