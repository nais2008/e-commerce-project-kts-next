import React from "react"

import type { ICategory } from "@/shared/interface/category.interface"
import type { IProductToList } from "@/shared/interface/product.interface"

import CategoryCard from "../CategoryCard"
import ProductCard from "../ProductCard"

type Props = {
  className?: string
  items: IProductToList[] | ICategory[]
  type: "products" | "categories"
}

const ListItems: React.FC<Props> = ({ className, items, type }) => {
  return (
    <div className={className}>
      {items.map((item) => {
        if (type === "products") {
          return <ProductCard product={item as IProductToList} key={item.id} />
        } else {
          return <CategoryCard key={item.id} item={item as ICategory} />
        }
      })}
    </div>
  )
}

export default React.memo(ListItems)
