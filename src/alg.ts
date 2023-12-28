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
      if (!(this.currentArea = newArea)) {
        this.generateTriangles()
      }
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

    for (let xi = x; xi < xi + w; xi++) {
      for (let yi = y; yi < yi + h; yi++) {
        this.processed.setValue(xi, yi, true)
      }
    }
  }

  private getNextArea(): GrowableArea | null { return null }

  private generateTriangles() {
    this.triangles = this.areas.reduce((triangles, area) => {
      const { x, y, w, h } = area

      const areaTriangles: Triangle[] = [
        [{ x: x, y: y }, { x: x + w, y: y }, { x: x + w, y: y + h }],
        [{ x: x, y: y + h }, { x: x + w, y: y + h }, { x: x + w, y: y }],
      ]

      return [...triangles, areaTriangles]
    }, [])
  }
}
