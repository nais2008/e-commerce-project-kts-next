import type { ParsedRange, RangeBounds } from "@/shared/type/rangeFilter.type"

export const PRICE_RANGE_BOUNDS: RangeBounds = {
  min: 0,
  max: 100,
}

export const DISCOUNT_RANGE_BOUNDS: RangeBounds = {
  min: 0,
  max: 100,
}

const parseNumber = (value: string | null | undefined): number | undefined => {
  if (!value) return undefined

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return undefined

  return Math.round(parsed)
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/**
 * Parses optional query params into a normalized range for UI and API filters.
 * Invalid values fallback to bounds, and reversed values are reordered.
 * Returns `filterMin`/`filterMax` as `undefined` when the range equals defaults.
 */
export const parseRangeParams = (
  rawMin: string | null | undefined,
  rawMax: string | null | undefined,
  bounds: RangeBounds
): ParsedRange => {
  const parsedMin = parseNumber(rawMin)
  const parsedMax = parseNumber(rawMax)

  const min =
    parsedMin !== undefined
      ? clamp(parsedMin, bounds.min, bounds.max)
      : bounds.min
  const max =
    parsedMax !== undefined
      ? clamp(parsedMax, bounds.min, bounds.max)
      : bounds.max

  const valueMin = Math.min(min, max)
  const valueMax = Math.max(min, max)

  const isDefault = valueMin === bounds.min && valueMax === bounds.max

  return {
    valueMin,
    valueMax,
    filterMin: isDefault ? undefined : valueMin,
    filterMax: isDefault ? undefined : valueMax,
    isDefault,
  }
}
