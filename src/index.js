import './style.scss';

const CANVAS = document.getElementById('snakeCanvas');
const CTX = CANVAS.getContext('2d');

CANVAS.width = innerWidth;
CANVAS.height = innerHeight;

const APPLE = { x: 5, y: 5 };

const GRID_SIZE = 40;
const SNAKE = [
  { x: 9, y: 9 },
  { x: 8, y: 9 },
  { x: 7, y: 9 },
];

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

DRAW_MAP();
DRAW_SNAKE();
DRAW_APPLE();

requestAnimationFrame(() => {
  DRAW_MAP();
  DRAW_SNAKE();
  DRAW_APPLE();
});
