"use client"

import React from "react"

import { useCartStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"

import s from "./Summary.module.scss"

const Summary: React.FC = observer(() => {
  const cartStore = useCartStore()

  return (
    <div className={s.summary}>
      <div className={s.summary__container}>
        <Heading view="subtitle">Summary</Heading>
        <Heading className={s.summary__item}>
          Total Items: <Heading tag="span">{cartStore.totalItems}</Heading>
        </Heading>
        <Heading className={s.summary__item}>
          Total Sum:{" "}
          <Heading tag="span">${cartStore.totalSum.toFixed(2)}</Heading>
        </Heading>
        <Button disabled={cartStore.totalItems === 0}>Checkout</Button>
      </div>
    </div>
  )
})

export default Summary
