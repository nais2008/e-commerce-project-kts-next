"use client"

import React from "react"

import { useCartStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import Heading from "../Heading"

type Props = {
  className?: string
}

const CartCount: React.FC<Props> = observer(({ className }) => {
  const cartStore = useCartStore()

  if (cartStore.totalItems <= 0) {
    return cartStore.error ? (
      <span className={className} data-error="true" />
    ) : null
  }

  return (
    <Heading tag="span" className={className}>
      {cartStore.totalItems}
    </Heading>
  )
})

export default CartCount
