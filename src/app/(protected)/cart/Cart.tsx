"use client"

import React from "react"

import { useCartStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"

import List from "./components/List"
import Summary from "./components/Summary"
import s from "./page.module.scss"

const Cart: React.FC = observer(() => {
  const cartStore = useCartStore()

  if (cartStore.error) {
    return (
      <>
        <ErrorMessage errorMess={cartStore.error.message} />
        <Button onClick={() => cartStore.refetch()}>Try Again</Button>
      </>
    )
  }

  return (
    <div className={s.cart__content}>
      <List />
      <Summary />
    </div>
  )
})

export default Cart
