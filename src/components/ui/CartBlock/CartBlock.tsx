"use client"

import React from "react"

import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore, useCartStore } from "@/hooks/globalStores"
import classNames from "classnames"
import { Handbag } from "lucide-react"
import { observer } from "mobx-react-lite"

import Heading from "../Heading"
import s from "./CartBlock.module.scss"

type Props = {
  className?: string
}

const CartBlock: React.FC<Props> = observer(({ className }) => {
  const cartStore = useCartStore()
  const authStore = useAuthStore()

  const router = useRouter()

  return (
    <div
      className={classNames(className, s.cartBlock)}
      onClick={() => router.push(ROUTES.cart.create())}
    >
      <Handbag size={30} />
      {cartStore.error && <span className={s.cartBlock__countItems_empty} />}
      {authStore.isAuthenticated ? (
        <>
          {cartStore.totalItems > 0 && (
            <Heading className={s.cartBlock__countItems}>
              {cartStore.totalItems}
            </Heading>
          )}
        </>
      ) : (
        <span className={s.cartBlock__countItems_empty} />
      )}
    </div>
  )
})

export default CartBlock
