import type { IProduct } from "./product.interface"

export interface IProductInCart {
  id: number
  quantity: number
  product: IProduct
}
