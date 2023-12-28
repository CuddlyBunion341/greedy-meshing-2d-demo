import { DataMatrix } from "./data";
import { DrawableMesher } from "./drawable_alg";
import { buildRenderLoop } from "./rendering";

const blockMatrix: number[][] = [
  [0, 0, 0, 0, 0, 0, 3, 3],
  [0, 0, 3, 3, 3, 3, 2, 2],
  [3, 3, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
]

const blockData: DataMatrix<number> = DataMatrix.from(blockMatrix)
const mesher = new DrawableMesher(blockData)

const loop = buildRenderLoop(() => {
  mesher.step()
})

loop()
