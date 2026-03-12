import React from "react"
import Skeleton from "react-loading-skeleton"

import s from "./CartItemSkeleton.module.scss"

const CartItemSkeleton: React.FC = () => {
  return (
    <div className={s.cartItem}>
      <Skeleton className={s.cartItem__image} />

      <div className={s.cartItem__info}>
        <Skeleton width={220} height={18} />
        <Skeleton width={90} height={20} />
      </div>

      <div className={s.cartItem__actions}>
        <Skeleton width={40} height={40} />
        <Skeleton width={30} height={20} />
        <Skeleton width={40} height={40} />
        <Skeleton width={36} height={36} />
      </div>
    </div>
  )
}

export default CartItemSkeleton
