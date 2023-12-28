import { Quad, Triangle, Vertex } from "./types";

const cellSize = 100
const height = 6
const width = 8

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = width * cellSize
canvas.height = height * cellSize

export function drawQuad(quad: Quad) {
  quad.forEach(triangle => {
    drawTriangle(triangle)
  })
}

export function drawVertex(vertex: Vertex) {
  c.fillStyle = 'black'
  const r = 5
  c.fillRect(vertex.x * cellSize - r, (height - vertex.y) * cellSize - r, 2 * r, 2 * r)
}

export function drawTriangle(triangle: Triangle) {
  c.beginPath()
  const lineTo = (vertex: Vertex) => c.lineTo(vertex.x * cellSize, (height - vertex.y) * cellSize)
  const moveTo = (vertex: Vertex) => c.moveTo(vertex.x * cellSize, (height - vertex.y) * cellSize)

  moveTo(triangle[0])

  for (const vertex of triangle) {
    drawVertex(vertex)
    lineTo(vertex)
  }

  lineTo(triangle[0])
  c.strokeStyle = 'black'
  c.lineWidth = 1
  c.stroke()
}

export function setColor(color: string) {
  c.strokeStyle = color
  c.fillStyle = color
}

export function setLineWidth(width: number) {
  c.lineWidth = width
}

export function outlineRect(x: number, y: number, w: number, h: number) {
  c.strokeRect(x * cellSize, (height - y - h) * cellSize, w * cellSize, h * cellSize)
  c.stroke()
}

export function fillSquare(x: number, y: number) {
  c.fillRect(x * cellSize, (height - y - 1) * cellSize, cellSize, cellSize)
}

export function buildRenderLoop(callback: () => boolean) {
  const loop = () => {
    c.clearRect(0, 0, cellSize * width, cellSize * height)
    if (callback()) {
      setTimeout(loop, 50)
    }
  }

  return loop
}
