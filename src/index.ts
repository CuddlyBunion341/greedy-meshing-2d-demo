import './styles/main.scss';
import { BlockData } from './blockData';
import { blockProperties } from './blockData';

const width = 8
const height = 6

const blocks = new BlockData(width, height)
const data = [
  [0, 0, 0, 0, 0, 0, 3, 3],
  [0, 0, 3, 3, 3, 3, 2, 2],
  [3, 3, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]
blocks.data = data

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const cellSize = 100

canvas.width = width * cellSize
canvas.height = height * cellSize

const triangles: number[][][] = []


function doSth(x: number, z: number) {
  c.strokeStyle = 'black'
  c.lineWidth = 2
  triangles.push(...getQuad(x, z, 1, 1))

  for (let dx = 0; dx < 2; dx++) {
    for (let dz = 0; dz < 2; dz++) {
      drawPoint(x + dx, z + dz)
    }
  }
}

function drawTriangles() {
  for (let i = 0; i < triangles.length; i++) {
    const triangle = triangles[i]
    drawTriangle(triangle)
    if (i % 2 !== 0) {
      c.fillStyle = 'rgba(0,0,0,0.5)'
      c.fill()
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

function getQuad(x: number, z: number, dx: number, dz: number) {
  return [
    [[x, z], [x + dx, z], [x + dx, z + dz]],
    [[x, z], [x, z + dz], [x + 1, z + dz]]
  ]
}

function drawPoint(x: number, z: number) {
  const prevFillStyle = c.fillStyle
  c.fillStyle = 'black'
  const pointRadius = 5
  c.fillRect(x * cellSize - pointRadius, z * cellSize - pointRadius, pointRadius * 2, pointRadius * 2)
  c.fillStyle = prevFillStyle
}

function renderBlocks() {
  for (let x = 0; x < width; x++) {
    for (let z = 0; z < height; z++) {
      const blockId = blocks.getBlock(x, z)
      if (!blockId) continue

      const color = blockProperties[blockId].color
      c.fillStyle = color
      c.fillRect(x * cellSize, (height - z - 1) * cellSize, cellSize, cellSize)
    }
  }
}

type Rectangle = {
  blockId: number
  x: number
  z: number
  dx: number
  dz: number
  color: string
  canGrowX: boolean
  canGrowZ: boolean
}

function emptyRectangle(): Rectangle {
  return {
    blockId: 1,
    x: 0,
    z: 0,
    dx: 1,
    dz: 1,
    canGrowX: true,
    canGrowZ: true,
    color: 'blue'
  }
}

let rectangle = emptyRectangle()

function drawRectangle(rectangle: Rectangle) {
  const { x, z, dx, dz } = rectangle
  c.strokeStyle = rectangle.color
  c.lineWidth = 5
  c.strokeRect(x * cellSize, (height - z - dz) * cellSize, dx * cellSize, dz * cellSize)
}

function attemptGrowRectangle(rectangle: Rectangle) {
  const { x, z, dx, dz, canGrowX, canGrowZ, blockId } = rectangle

  if (canGrowX) {
    // assume rectangle has height 1
    let canGrow = true
    if (blocks.getBlock(x + dx, z) !== blockId) canGrow = false

    if (canGrow) {
      rectangle.dx++
    } else {
      rectangle.canGrowX = false
      rectangle.color = 'turquoise'
    }
  } else if (canGrowZ) {
    let canGrow = true
    for (let xi = x; xi < x + dx; xi++) {
      if (blocks.getBlock(xi, z + dz) !== blockId) canGrow = false
    }

    if (canGrow) {
      rectangle.dz++
    } else {
      rectangle.canGrowZ = false
      rectangle.color = 'lime'
    }
  }
}

function animate() {
  // requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  renderBlocks()
  drawRectangle(rectangle)
  attemptGrowRectangle(rectangle)
  // drawTriangles()

  setTimeout(animate, 100)
}

animate();
