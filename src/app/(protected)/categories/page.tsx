import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoriesByFetch } from "@/services/categories"

import Heading from "@/components/ui/Heading"
import ListItems from "@/components/ui/ListItems"

import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse our categories of products",
}

const CategoriesPage = async () => {
  let categories = []

  try {
    const res = await getCategoriesByFetch()
    categories = res.data
  } catch {
    notFound()
  }

  return (
    <main className={s.list}>
      <Heading className={s.list__heading} tag="h1">
        Categories
      </Heading>
      <ListItems
        className={s.list__items}
        items={categories}
        type="categories"
      />
    </main>
  )
}

export default CategoriesPage
