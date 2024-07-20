import './style.scss'; // Import styles

const CANVAS = document.getElementById('snakeCanvas'); // Get canvas element
const CTX = CANVAS.getContext('2d'); // Get canvas context

CANVAS.width = innerWidth; // Set canvas width to window width
CANVAS.height = innerHeight; // Set canvas height to window height

const DIRECTION = 'RIGHT';
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

const UPDATE_SNAKE_POSITION = () => {
  // Move snake head
  let head;
  switch (DIRECTION) {
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
};

const MOVE_SNAKE = () => {
  DRAW_MAP();
  DRAW_SNAKE();
  DRAW_APPLE();
  UPDATE_SNAKE_POSITION();
  setTimeout(() => requestAnimationFrame(MOVE_SNAKE), 1000); // Move snake every 1 second
};

requestAnimationFrame(MOVE_SNAKE); // Start game loop