import type { Metadata } from "next"

import Cart from "./Cart"
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
