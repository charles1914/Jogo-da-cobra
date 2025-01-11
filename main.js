const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Definir as variáveis do jogo
let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 15 };
let score = 0;

// Função para desenhar a cobrinha
function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'darkgreen';
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }
}

// Função para desenhar a comida
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Função para mover a cobrinha
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === 'UP') head.y -= 1;
  if (direction === 'DOWN') head.y += 1;
  if (direction === 'LEFT') head.x -= 1;
  if (direction === 'RIGHT') head.x += 1;

  snake.unshift(head);

  // Verificar se a cobrinha comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
  } else {
    snake.pop();
  }

  // Verificar se a cobrinha bateu nas bordas
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
    resetGame();
  }

  // Verificar se a cobrinha se bateu
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// Função para reiniciar o jogo
function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = 'RIGHT';
  score = 0;
  food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
}

// Função para atualizar o jogo
function updateGame() {
  moveSnake();
  drawSnake();
  drawFood();
}

// Função para mover a cobrinha com as teclas
document.getElementById('up').addEventListener('click', () => direction = 'UP');
document.getElementById('down').addEventListener('click', () => direction = 'DOWN');
document.getElementById('left').addEventListener('click', () => direction = 'LEFT');
document.getElementById('right').addEventListener('click', () => direction = 'RIGHT');

// Atualizar o jogo a cada 100ms
setInterval(updateGame, 100);