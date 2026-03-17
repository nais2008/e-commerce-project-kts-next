export interface RangeBounds {
  min: number
  max: number
}

export interface ParsedRange {
  valueMin: number
  valueMax: number
  filterMin: number | undefined
  filterMax: number | undefined
  isDefault: boolean
}
