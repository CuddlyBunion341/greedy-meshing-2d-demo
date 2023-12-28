import { DataMatrix } from "./data";
import { Area, GrowableArea } from "./types";

export class GreedyMesher {
  private blockData: DataMatrix<number>
  private processed: DataMatrix<boolean>
  private areas: Area[]
  private currentArea: GrowableArea

  constructor(blockData: DataMatrix<number>) {
    this.blockData = blockData
    this.processed = new DataMatrix(blockData.width, blockData.height, false)
  }

  step() {
    if (this.currentArea.canGrowX) {
      // attempt to grow in x direction
    } else if (this.currentArea.canGrowY) {
      // attempt to grow in y direction
    } else {
      // store current area in areas array
      // update processed matrix
      // search for new area position
      // if new position: create new area
      // else: generate triangles
    }
  }
}
