"use client"

import React from "react"

import { useCartStore } from "@/hooks/globalStores"
import type { IPurchaseItem } from "@/shared/interface/purchase.interface"
import { observer } from "mobx-react-lite"

import AnimatedPrice from "@/components/ui/AnimatedPrice"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import PurchaseModal from "@/components/ui/PurchaseModal"

import s from "./Summary.module.scss"

const Summary: React.FC = observer(() => {
  const cartStore = useCartStore()
  const [isPurchaseOpen, setIsPurchaseOpen] = React.useState(false)

  const purchaseItems = React.useMemo<IPurchaseItem[]>(
    () =>
      cartStore.cart.map((item) => ({
        id: item.product.id,
        title: item.product.title,
        imageUrl:
          item.product.images[0]?.formats.thumbnail.url ??
          item.product.images[0]?.url ??
          "",
        price: item.product.price,
        discountPercent: item.product.discountPercent,
        quantity: item.quantity,
      })),
    [cartStore.cart]
  )

  return (
    <div className={s.summary}>
      <div className={s.summary__container}>
        <Heading view="subtitle">Summary</Heading>
        <Heading className={s.summary__item}>
          Total Items: <Heading tag="span">{cartStore.totalItems}</Heading>
        </Heading>
        <Heading className={s.summary__item}>
          Total Sum:{" "}
          <Heading tag="span">
            <AnimatedPrice value={cartStore.totalSum} />
          </Heading>
        </Heading>

        <div className={s.summary__actions}>
          <Button
            disabled={cartStore.totalItems === 0}
            onClick={() => setIsPurchaseOpen(true)}
          >
            Checkout
          </Button>
          <Button
            isPrimary
            disabled={cartStore.totalItems === 0}
            loading={cartStore.isLoadingClear}
            onClick={() => {
              void cartStore.clearCart()
            }}
          >
            Clear cart
          </Button>
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseOpen}
        onClose={() => setIsPurchaseOpen(false)}
        items={purchaseItems}
      />
    </div>
  )
})

export default Summary
