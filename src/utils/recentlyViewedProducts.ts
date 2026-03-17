import type { IProductToList } from "@/shared/interface/product.interface"

const STORAGE_KEY = "recently_viewed_products"
const MAX_RECENT_PRODUCTS_TO_SHOW = 6
const MAX_RECENT_PRODUCTS_TO_STORE = MAX_RECENT_PRODUCTS_TO_SHOW + 1

export const getRecentlyViewedProducts = (): IProductToList[] => {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed as IProductToList[]
  } catch {
    return []
  }
}

export const saveViewedProduct = (product: IProductToList): void => {
  if (typeof window === "undefined") return

  const previous = getRecentlyViewedProducts()
  const withoutCurrent = previous.filter(
    (item) => item.documentId !== product.documentId
  )

  const next = [product, ...withoutCurrent].slice(
    0,
    MAX_RECENT_PRODUCTS_TO_STORE
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export { MAX_RECENT_PRODUCTS_TO_SHOW }
