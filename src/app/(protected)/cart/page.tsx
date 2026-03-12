import type { Metadata } from "next"

import Cart from "@/layouts/CartPage"

import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart",
}

export default function Page() {
  return (
    <main className={s.cart__container}>
      <Cart />
    </main>
  )
}
