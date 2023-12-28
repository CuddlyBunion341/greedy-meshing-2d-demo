import { DataMatrix } from "./data";

export class GreedyMesher {
  private blockData: DataMatrix<number>
  private processed: DataMatrix<boolean>

  constructor(blockData: DataMatrix<number>) {
    this.blockData = blockData
    this.processed = new DataMatrix(blockData.width, blockData.height, false)
  }
}
