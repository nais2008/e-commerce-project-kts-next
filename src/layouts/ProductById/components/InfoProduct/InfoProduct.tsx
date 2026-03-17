"use client"

import React from "react"

import { useAuthStore, useCartStore } from "@/hooks/globalStores"
import type { IProduct } from "@/shared/interface/product.interface"
import type { IPurchaseItem } from "@/shared/interface/purchase.interface"
import { observer } from "mobx-react-lite"

import Button from "@/components/ui/Button"
import DiscountPrice from "@/components/ui/DiscountPrice"
import Heading from "@/components/ui/Heading"
import PurchaseModal from "@/components/ui/PurchaseModal"
import QuantityButton from "@/components/ui/QuantityButton"

import s from "./InfoProduct.module.scss"

type Props = {
  data: IProduct
}

const InfoProduct: React.FC<Props> = observer(({ data }) => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  const [isPurchaseOpen, setIsPurchaseOpen] = React.useState(false)

  const quantity = cartStore.getProductQuantity(data.id)

  const purchaseItems = React.useMemo<IPurchaseItem[]>(
    () => [
      {
        id: data.id,
        title: data.title,
        imageUrl:
          data.images[0]?.formats.thumbnail.url ?? data.images[0]?.url ?? "",
        price: data.price,
        discountPercent: data.discountPercent,
        quantity: 1,
      },
    ],
    [data]
  )

  return (
    <section className={s.product}>
      <article className={s.product__title}>
        <Heading tag="h1" view="title">
          {data.title}
        </Heading>
        <Heading view="desc" color="secondary">
          {data.description}
        </Heading>
      </article>
      <DiscountPrice
        price={data.price}
        discountPercent={data.discountPercent}
        view="subtitle"
      />
      {authStore.isAuthenticated && (
        <>
          <div className={s.product__btns}>
            <Button onClick={() => setIsPurchaseOpen(true)}>Buy Now</Button>
            {quantity === 0 ? (
              <Button isPrimary onClick={() => cartStore.add(data.id, 1, data)}>
                Add to Cart
              </Button>
            ) : (
              <QuantityButton
                isPrimary
                quantity={quantity}
                onAdd={() => cartStore.add(data.id, 1, data)}
                onRemove={() => cartStore.remove(data.id)}
              />
            )}
          </div>

          <PurchaseModal
            isOpen={isPurchaseOpen}
            onClose={() => setIsPurchaseOpen(false)}
            items={purchaseItems}
          />
        </>
      )}
    </section>
  )
})

export default InfoProduct
