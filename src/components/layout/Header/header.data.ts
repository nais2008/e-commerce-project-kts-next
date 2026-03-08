import { ROUTES } from "@/constants/routes"

interface IHeaderItem {
  name: string
  link: () => string
}

export const HEADER_ITEMS: IHeaderItem[] = [
  {
    name: "Home",
    link: ROUTES.main.create,
  },
  {
    name: "Products",
    link: ROUTES.products.create,
  },
  {
    name: "Categories",
    link: ROUTES.categories.create,
  },
]
