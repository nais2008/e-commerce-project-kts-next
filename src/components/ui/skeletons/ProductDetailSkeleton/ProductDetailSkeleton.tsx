import React from "react"
import Skeleton from "react-loading-skeleton"

import s from "./ProductDetailSkeleton.module.scss"

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className={s.productDetail}>
      <div className={s.productDetail__image}>
        <Skeleton height="100%" width="100%" />
      </div>

      <div className={s.productDetail__content}>
        <Skeleton height={48} width="60%" />

        <div className={s.productDetail__description}>
          <Skeleton count={2} height={24} />
        </div>

        <Skeleton height={48} width={120} />

        <div className={s.productDetail__buttons}>
          <Skeleton height={52} width={135} />
          <Skeleton height={52} width={155} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton
