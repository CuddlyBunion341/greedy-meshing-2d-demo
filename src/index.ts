import './styles/main.scss';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 800
canvas.height = 600

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillText("Let's draw some things", mouse.x, mouse.y);
}

animate();
