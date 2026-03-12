"use client"

import React, { useCallback } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useCartStore } from "@/hooks/globalStores"
import type { IProductInCart } from "@/shared/interface/cart.interface"
import { Trash2 } from "lucide-react"

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
      <div className={s.cartItem__image}>
        <Image
          src={item.product.images[0].formats.thumbnail.url}
          alt={item.product.title}
          width={100}
          height={100}
        />
      </div>

      <div className={s.cartItem__info}>
        <Heading
          view="desc"
          weight="medium"
          className={s.cartItem__title}
          maxLines={2}
        >
          {item.product.title}
        </Heading>

        <DiscountPrice
          showDiscount={false}
          view="desc"
          price={item.product.price}
          discountPercent={item.product.discountPercent}
          className={s.cartItem__price}
        />
      </div>

      <div className={s.cartItem__btns}>
        <div className={s.cartItem__actions}>
          <QuantityButton
            quantity={item.quantity}
            onAdd={onAdd}
            onRemove={onRemove}
          />

          <button onClick={onRemoveFull} className={s.cartItem__remove}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
