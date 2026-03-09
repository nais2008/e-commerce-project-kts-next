import type { Metadata } from "next"

import Product from "./Product"
import s from "./page.module.scss"
import { Params } from "./params"

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const endParams = await params

  return {
    title: `Product ${endParams.id}`,
    description: `Details of product with ID ${endParams.id}`,
  }
}

const Page = () => {
  return (
    <main className={s.product__container}>
      <Product />
    </main>
  )
}

export default Page
