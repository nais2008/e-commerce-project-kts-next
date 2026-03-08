import React from "react"
import Skeleton from "react-loading-skeleton"

import s from "./CartItemSkeleton.module.scss"

const CartItemSkeleton: React.FC = () => {
  return (
    <div className={s.cartItem}>
      <Skeleton className={s.cartItem__image} width={185} height={185} />
      <div className={s.cartItem__details}>
        <Skeleton width={200} height={20} />
        <Skeleton width={80} height={16} />
        <div className={s.cartItem__quantity}>
          <Skeleton width={30} height={30} />
          <Skeleton width={30} height={20} />
          <Skeleton width={30} height={30} />
        </div>
        <Skeleton width={100} height={30} />
      </div>
    </div>
  )
}

export default CartItemSkeleton
