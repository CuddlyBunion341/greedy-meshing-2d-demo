export class BlockData {
  public data: number[][]
  private width: number
  private height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.data = Array(height).fill(0).map((_) => Array(width).fill(0))
  }

  public getBlock(x: number, z: number) {
    if (x < 0 || x >= this.width || z < 0 || z >= this.height) return null
    return this.data[this.height - z - 1][x]
  }

  public setBlock(x: number, z: number, block: number) {
    if (x < 0 || x >= this.width || z < 0 || z >= this.height) return false
    this.data[this.height - z - 1][x] = block
    return true
  }
}

export const blockTypes = {
  AIR: 0,
  STONE: 1,
  DIRT: 2,
  GRASS: 3
}

export const blockProperties = [
  { color: 'white' },
  { color: 'gray' },
  { color: 'brown' },
  { color: 'green' },
]
