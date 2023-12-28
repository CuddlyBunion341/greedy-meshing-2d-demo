export class DataMatrix<T> {
  public readonly width: number
  public readonly height: number
  public readonly dataList: T[]

  static from(data: any[][]) {
    const height = data.length
    const width = data[0].length
    const value = data[0][0]

    const instance = new DataMatrix(width, height, value)

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (!instance.setValue(x, height - y - 1, data[y][x])) throw new Error('err setting block')
      }
    }

    return instance
  }

  constructor(width: number, height: number, initialValue: T) {
    this.width = width
    this.height = height
    this.dataList = Array(width * height).fill(initialValue)
  }

  public getIndex(x: number, y: number) {
    return x + this.width * y
  }

  public getValue(x: number, y: number) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return null
    return this.dataList[this.getIndex(x, y)]
  }

  public setValue(x: number, y: number, value: T) {
    const index = this.getIndex(x, y)
    if (index < 0) return false

    this.dataList[index] = value
    return true
  }
}
