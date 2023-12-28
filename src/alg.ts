import { DataMatrix } from "./data";
import { Area, GrowableArea } from "./types";

export class GreedyMesher {
  private blockData: DataMatrix<number>
  private processed: DataMatrix<boolean>
  private areas: Area[]
  private currentArea: GrowableArea
  private done: boolean

  constructor(blockData: DataMatrix<number>) {
    this.blockData = blockData
    this.processed = new DataMatrix(blockData.width, blockData.height, false)
    this.done = false
  }

  call() {
    while (!this.done) {
      this.step()
    }
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
      if (newArea) {
        this.currentArea = newArea
      } else {
        this.generateTriangles()
        this.done = true
      }
    }
  }

  private attemptGrowX() { }
  private attemptGrowY() { }
  private updateProcessed() { }
  private getNextArea(): GrowableArea | null { return null }
  private generateTriangles() { }
}
