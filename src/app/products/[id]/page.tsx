import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getQueryClient } from "@/api/reactQuery"
import { getProductById, getProducts } from "@/services/products"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

import Product from "./Product"
import s from "./page.module.scss"
import { Params } from "./params"

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { id } = await params

  try {
    const response = await getProductById(id)
    const product = response.data

    return {
      title: product.title,
      description: product.description || `Buy ${product.title} in our store`,
    }
  } catch {
    return {
      title: "Product Not Found",
    }
  }
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params
  const queryClient = getQueryClient()

  try {
    const response = await getProductById(id)
    const product = response.data

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
      }),
      queryClient.prefetchQuery({
        queryKey: ["products", "related", product.productCategory.id],
        queryFn: () => getProducts(1, 4, "", product.productCategory.id),
      }),
    ])
  } catch {
    notFound()
  }

  return (
    <main className={s.product__container}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Product />
      </HydrationBoundary>
    </main>
  )
}

export default Page
