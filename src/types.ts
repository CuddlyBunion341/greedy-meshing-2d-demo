export type Area = {
  x: number
  y: number
  w: number
  h: number
}

export type GrowableArea = Area & {
  canGrowX: boolean
  canGrowY: boolean
}

export type DrawableArea = Area & {
  color: string
}

export type Vertex = {
  x: number
  y: number
}

export type Triangle = [Vertex, Vertex, Vertex]

export type Quad = [Triangle, Triangle]

