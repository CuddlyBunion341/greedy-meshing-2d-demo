import { DataMatrix } from "./data";
import { Area, GrowableArea, Triangle } from "./types";

export class GreedyMesher {
  protected blockData: DataMatrix<number>
  protected processed: DataMatrix<boolean>
  protected areas: Area[]
  protected currentArea: GrowableArea | null
  protected triangles: Triangle[]

  public readonly width: number
  public readonly height: number

  constructor(blockData: DataMatrix<number>) {
    this.blockData = blockData
    this.width = blockData.width
    this.height = blockData.height
    this.processed = new DataMatrix(this.width, this.height, false)

    this.areas = []
    this.currentArea = this.getNextArea()
    this.triangles = []
  }

  call() {
    while (!this.done) {
      this.step()
    }

    return this.triangles
  }

  step() {
    if (this.done) return

    if (this.currentArea.canGrowX) {
      this.attemptGrowX()
    } else if (this.currentArea.canGrowY) {
      this.attemptGrowY()
    } else {
      this.areas.push(this.currentArea)
      this.updateProcessed()
      const newArea = this.getNextArea()
      if (!newArea) {
        this.areas.push(this.currentArea)
        this.generateTriangles()
      }
      this.currentArea = newArea
    }
  }

  public get done() {
    return this.currentArea === null
  }

  private attemptGrowX() {
    const { x, y, w } = this.currentArea

    if (this.canGrowInto(x + w, y)) {
      this.currentArea.w++
      return this.currentArea.canGrowX = true
    }

    return this.currentArea.canGrowX = false
  }

  private attemptGrowY() {
    const { x, y, w, h } = this.currentArea
    for (let xi = x; xi < x + w; xi++) {
      if (!this.canGrowInto(xi, y + h)) {
        return this.currentArea.canGrowY = false
      }
    }

    this.currentArea.h++
    return this.currentArea.canGrowY = true
  }

  private canGrowInto(x: number, y: number) {
    return this.blockData.getValue(x, y) === this.currentArea.blockId && !this.processed.getValue(x, y)
  }

  private updateProcessed() {
    const { x, y, w, h } = this.currentArea

    for (let xi = x; xi <= x + w - 1; xi++) {
      for (let yi = y; yi <= y + h - 1; yi++) {
        this.processed.setValue(xi, yi, true)
      }
    }
  }

  private getNextArea(): GrowableArea | null {
    const lastArea = this.currentArea

    let x = 0
    let y = 0

    if (lastArea) y = lastArea.y

    while (!this.blockData.getValue(x, y) || this.processed.getValue(x, y)) {
      if (x >= this.width && y >= this.height) return null

      if (x >= this.width) {
        x = 0
        y++
      } else {
        x++
      }
    }

    return {
      x, y, w: 1, h: 1,
      blockId: this.blockData.getValue(x, y),
      canGrowX: true, canGrowY: true
    }
  }

  private generateTriangles() {
    this.triangles = this.areas.reduce((triangles, area) => {
      const { x, y, w, h } = area

      const areaTriangles: Triangle[] = [
        [{ x: x, y: y }, { x: x + w, y: y }, { x: x + w, y: y + h }],
        [{ x: x, y: y }, { x: x, y: y + h }, { x: x + w, y: y + h }],
      ]

      return [...triangles, ...areaTriangles]
    }, [])
  }
}
