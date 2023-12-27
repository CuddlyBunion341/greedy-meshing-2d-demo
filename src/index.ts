import './styles/main.scss';
import { BlockData } from './blockData';
import { blockProperties } from './blockData';

const width = 8
const height = 6

const blocks = new BlockData(width, height)
const data = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 3],
  [0, 0, 3, 3, 3, 3, 2, 2],
  [3, 3, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
]
blocks.data = data

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const cellSize = 100

canvas.width = width * cellSize
canvas.height = height * cellSize

function renderBlocks() {
  for (let x = 0; x < width; x++) {
    for (let z = 0; z < height; z++) {
      const blockId = blocks.getBlock(x, z)
      if (!blockId) continue

      const color = blockProperties[blockId].color

      c.fillStyle = color
      c.fillRect(x * cellSize, z * cellSize, cellSize, cellSize)

      c.strokeStyle = 'black'
      c.lineWidth = 2
      const triangles = getQuad(x, z)
      for (let i = 0; i < triangles.length; i++) {
        const triangle = triangles[i]
        drawTriangle(triangle)
        if (i % 2 !== 0) {
          c.fillStyle = 'rgba(0,0,0,0.5)'
          c.fill()
        }
      }

      for (let dx = 0; dx < 2; dx++) {
        for (let dz = 0; dz < 2; dz++) {
          drawPoint(x + dx, z + dz)
        }
      }
    }
  }
}

function drawTriangle(points: number[][]) {
  c.beginPath()
  const lineTo = (point: number[]) => c.lineTo(point[0] * cellSize, point[1] * cellSize)
  const moveTo = (point: number[]) => c.moveTo(point[0] * cellSize, point[1] * cellSize)

  moveTo(points[0])

  for (const point of points) {
    lineTo(point)
  }

  lineTo(points[0])
  c.stroke()
}

function getQuad(x: number, z: number) {
  return [
    [[x, z], [x + 1, z], [x + 1, z + 1]],
    [[x, z], [x, z + 1], [x + 1, z + 1]]
  ]
}

function drawPoint(x: number, z: number) {
  const prevFillStyle = c.fillStyle
  c.fillStyle = 'black'

  const pointRadius = 5

  c.fillRect(x * cellSize - pointRadius, z * cellSize - pointRadius, pointRadius * 2, pointRadius * 2)

  c.fillStyle = prevFillStyle
}

function animate() {
  // requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  renderBlocks()
}

animate();
