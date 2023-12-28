import { GreedyMesher } from "./alg";
import { DataMatrix } from "./data";
import { drawTriangle, drawVertex, fillSquare, outlineRect, setColor, setLineWidth } from "./rendering";
import { DrawableArea } from "./types";

export class DrawableMesher extends GreedyMesher {
  constructor(blockData: DataMatrix<number>) {
    super(blockData)
  }

  step() {
    super.step()
    this.render()
  }

  render() {
    this.renderBlockData()
    this.renderAreas()
    this.renderTriangles()
    this.renderVertices()
  }

  private renderBlockData() {
    const width = this.blockData.width
    const height = this.blockData.height

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const blockId = this.blockData.getValue(x, y)
        const colors = ['white', 'gray', 'brown', 'green']
        setColor(colors[blockId])
        fillSquare(x, y)
      }
    }
  }

  private renderAreas() {
    this.areas.forEach(area => {
      const drawable = { ...area, color: 'black' }
      this.renderArea(drawable)
    })

    if (!this.currentArea) return

    const { canGrowX, canGrowY } = this.currentArea

    const color = (() => {
      if (canGrowX) return 'blue'
      if (canGrowY) return 'green'
      return 'yellow'
    })()

    const drawable = { ...this.currentArea, color }
    this.renderArea(drawable)
  }

  private renderArea(area: DrawableArea) {
    const { x, y, w, h, color } = area
    setColor(color)
    setLineWidth(2)
    outlineRect(x, y, w, h)
  }

  private renderTriangles() {
    if (!this.triangles.length) return
    this.triangles.forEach(triangle => {
      drawTriangle(triangle)
    })
  }

  private renderVertices() {
    if (!this.triangles.length) return

    this.triangles.forEach(triangle => {
      triangle.forEach(vertex => {
        drawVertex(vertex)
      })
    })
  }
}
