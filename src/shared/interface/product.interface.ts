import type { ICategory } from "./category.interface"
import type { IImage } from "./image.interface"

export interface IProduct {
  id: number
  documentId: string
  title: string
  description: string
  price: number
  discountPercent: number
  rating: number
  isInStock: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  productCategory: ICategory
  images: IImage[]
}

export type IProductToList = Pick<
  IProduct,
  | "id"
  | "documentId"
  | "title"
  | "description"
  | "images"
  | "productCategory"
  | "price"
  | "discountPercent"
>
