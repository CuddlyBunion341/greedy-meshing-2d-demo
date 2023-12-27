import { Vector } from './core';
import { Mover } from './objects';
import './styles/main.scss';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Implementation
let ball: Mover;

function init() {
  const startPosition = new Vector(canvas.width / 2, canvas.height / 2);
  const velocity = new Vector(5, 5);
  ball = new Mover({ position: startPosition, velocity });
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillText("Let's draw some things", mouse.x, mouse.y);

  ball.update(c);
}

init();
animate();
