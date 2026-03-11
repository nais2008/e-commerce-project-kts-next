"use client"

import React, { useCallback } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useCartStore } from "@/hooks/globalStores"
import type { IProductInCart } from "@/shared/interface/cart.interface"

import Button from "@/components/ui/Button"
import DiscountPrice from "@/components/ui/DiscountPrice"
import Heading from "@/components/ui/Heading"
import QuantityButton from "@/components/ui/QuantityButton"

import s from "./CartItem.module.scss"

type Props = {
  item: IProductInCart
}

const CartItem: React.FC<Props> = ({ item }) => {
  const cartStore = useCartStore()

  const router = useRouter()

  const onAdd = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      cartStore.add(item.product.id, 1, item.product)
    },
    [cartStore, item.product]
  )

  const onRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      cartStore.remove(item.product.id)
    },
    [cartStore, item.product.id]
  )

  const onRemoveFull = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      cartStore.remove(item.product.id, item.quantity)
    },
    [cartStore, item.product.id, item.quantity]
  )

  return (
    <div
      className={s.cartItem}
      onClick={() =>
        router.push(ROUTES.product.create(item.product.documentId))
      }
    >
      <Image
        width={180}
        height={180}
        src={item.product.images[0].formats.small.url}
        alt={item.product.title}
        className={s.cartItem__img}
      />
      <div className={s.cartItem__content}>
        <Heading view="desc" weight="medium">
          {item.product.title}
        </Heading>
        <DiscountPrice
          showDiscount={false}
          view="desc"
          price={item.product.price}
          discountPercent={item.product.discountPercent}
          className={s.cartItem__discount}
        />
        <QuantityButton
          quantity={item.quantity}
          onAdd={onAdd}
          onRemove={onRemove}
        />
        <Button onClick={onRemoveFull} className={s.cartItem__btn_remove}>
          Remove
        </Button>
      </div>
    </div>
  )
}

export default CartItem
