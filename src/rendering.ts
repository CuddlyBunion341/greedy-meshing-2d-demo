import { Quad, Triangle, Vertex } from "./types";

const cellSize = 100
const height = 6
const width = 8

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

export function drawQuad(quad: Quad) {
  quad.forEach(triangle => {
    drawTriangle(triangle)
  })
}

export function drawVertex(vertex: Vertex) {
  c.fillStyle = 'black'
  const r = 10
  c.fillRect(vertex.x - r, vertex.y - r, 2 * r, 2 * r)
}

export function drawTriangle(triangle: Triangle) {
  c.beginPath()
  const lineTo = (vertex: Vertex) => c.lineTo(vertex.x * cellSize, vertex.y * cellSize)
  const moveTo = (vertex: Vertex) => c.moveTo(vertex.x * cellSize, vertex.y * cellSize)

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
