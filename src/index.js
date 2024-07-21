import './style.scss'; // Import styles

const CANVAS = document.getElementById('snakeCanvas'); // Get canvas element
const CTX = CANVAS.getContext('2d'); // Get canvas context

CANVAS.width = innerWidth; // Set canvas width to window width
CANVAS.height = innerHeight; // Set canvas height to window height

let direction = 'RIGHT'; // Snake direction
let speed = 0; // Snake speed
const GRID_SIZE = 40; // Size of each grid cell
// Snake initial position
const SNAKE = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];

let apple = { x: 5, y: 5 }; // Apple initial position
let score = 0; // Game score

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
  CTX.fillRect(apple.x * GRID_SIZE, apple.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
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

const GENERATE_APPLE = () => {
  score++; // Increase score

  apple.x = Math.floor(Math.random() * (CANVAS.width / GRID_SIZE)); // Generate random x position
  apple.y = Math.floor(Math.random() * (CANVAS.height / GRID_SIZE)); // Generate random y position

  // Check if apple is on snake
  for (let snakePart of SNAKE) {
    if (apple.x === snakePart.x && apple.y === snakePart.y) {
      return GENERATE_APPLE();
    }
  }
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
  if (head[0] === apple.x && head[1] === apple.y) {
    GENERATE_APPLE(); // Generate new apple
  } else {
    SNAKE.pop(); // Remove tail
  }
  return GAMEOVER();
};

const DRAW_SCORE = () => {
  CTX.fillStyle = 'white';
  CTX.font = '40px sans-serif';
  CTX.textBaseline = 'top';
  CTX.fillText(`Score: ${score}`, GRID_SIZE, GRID_SIZE);
};

const MOVE_SNAKE = () => {
  if (!UPDATE_SNAKE_POSITION()) {
    speed = score * 50; // Increase speed
    DRAW_MAP();
    DRAW_SNAKE();
    DRAW_APPLE();
    DRAW_SCORE();
    setTimeout(() => requestAnimationFrame(MOVE_SNAKE), 1000 - speed); // Move snake every 1 second - speed
  } else {
    alert(`Game Over ! Max points : ${score}`); // Show game over message
    window.location.reload(); // Reload game
  }
};

requestAnimationFrame(MOVE_SNAKE); // Start game loop
