import type { IImage } from "./image.interface"

export interface ICategory {
  id: number
  documentId: string
  title: string
  image: IImage
}
