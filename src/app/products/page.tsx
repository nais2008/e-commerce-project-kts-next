import type { Metadata } from "next"

import List from "./components/List"
import Title from "./components/Title"
import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our collection of products and find the perfect fit for your needs.",
}

const Page = () => {
  return (
    <main className={s.productsList__container}>
      <Title />
      <List />
    </main>
  )
}

export default Page
