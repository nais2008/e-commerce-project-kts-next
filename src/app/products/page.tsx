import type { Metadata } from "next"

import { getQueryClient } from "@/api/reactQuery"
import List from "@/layouts/ProductsListPage/components/List"
import { getProducts } from "@/services/products"
import { normalizeCollection } from "@/shared/type/collection.type"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import Heading from "@/components/ui/Heading"

import {
  DISCOUNT_RANGE_BOUNDS,
  parseRangeParams,
} from "@/utils/parseRangeParams"

import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our collection of products and find the perfect fit for your needs.",
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const parseCategoryId = (value: string | string[] | undefined) => {
  if (typeof value !== "string") return undefined

  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams

  const search = typeof params.search === "string" ? params.search : ""
  const categoryId = parseCategoryId(params.category)

  const discountRange = parseRangeParams(
    typeof params.discountMin === "string" ? params.discountMin : undefined,
    typeof params.discountMax === "string" ? params.discountMax : undefined,
    DISCOUNT_RANGE_BOUNDS
  )

  const pageSize = 9

  const queryClient = getQueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: [
      "products",
      search,
      categoryId,
      discountRange.filterMin,
      discountRange.filterMax,
      pageSize,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getProducts(
        pageParam,
        pageSize,
        search,
        categoryId,
        discountRange.filterMin,
        discountRange.filterMax
      )

      return {
        ...response,
        data: normalizeCollection(response.data, (product) => product.id),
      }
    },
    initialPageParam: 1,
  })

  return (
    <main className={s.productsList__container}>
      <article className={s.productsList__title}>
        <div className={s.title__container}>
          <Heading view="title" tag="h1">
            Products
          </Heading>
          <Heading view="desc" color="secondary">
            We display products based on the latest products we have, if you
            want to see our old products please enter the name of the item
          </Heading>
        </div>
      </article>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <List />
      </HydrationBoundary>
    </main>
  )
}

export default Page
