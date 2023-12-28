export class DataMatrix<T> {
  public readonly width: number
  public readonly height: number
  public readonly dataList: T[]

  constructor(width: number, height: number, initialValue: T) {
    this.width = width
    this.height = height
    this.dataList = Array(width * height).fill(initialValue)
  }

  public getIndex(x: number, y: number) {
    return x + this.width * y
  }

  public getValue(x: number, y: number) {
    return this.dataList[this.getIndex(x, y)]
  }

  public setValue(x: number, y: number, value: T) {
    const index = this.getIndex(x, y)
    if (index < 0) return false

    this.dataList[index] = value
    return true
  }
}

export const blockList = new DataMatrix<number>(8, 6, 0)
