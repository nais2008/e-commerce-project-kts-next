"use client"

import React from "react"

import { useCartStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import Heading from "@/components/ui/Heading"
import CartItemSkeleton from "@/components/ui/skeletons/CartItemSkeleton"

import CartItem from "../CartItem"
import s from "./List.module.scss"

const List: React.FC = observer(() => {
  const cartStore = useCartStore()

  const loaders = [...Array(3)].map((_, i) => <CartItemSkeleton key={i} />)

  return (
    <div className={s.cartList}>
      {cartStore.isLoading ? (
        loaders
      ) : cartStore.totalItems === 0 ? (
        <Heading view="subtitle" weight="medium">
          Your cart is empty
        </Heading>
      ) : (
        cartStore.cart.map((item) => <CartItem key={item.id} item={item} />)
      )}
    </div>
  )
})

export default List
