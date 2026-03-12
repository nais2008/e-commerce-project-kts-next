import React from "react"

import classNames from "classnames"

import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice"

import Heading from "../Heading"
import s from "./DiscountPrice.module.scss"

type Props = {
  price: number
  discountPercent: number
  view?: "title" | "button" | "subtitle" | "desc" | "paragraph"
  className?: string
  showDiscount?: boolean
}

const DiscountPrice: React.FC<Props> = ({
  price,
  discountPercent,
  view,
  className,
  showDiscount = true,
}) => {
  const discountedPrice = calculateDiscountedPrice(price, discountPercent)

  if (discountedPrice === price)
    return (
      <Heading
        tag={view == "subtitle" ? "h2" : "span"}
        view={view == "subtitle" ? view : "desc"}
        weight="medium"
        className={classNames(s.discountPrice__price, className)}
      >
        ${price.toFixed(2)}
      </Heading>
    )

  return (
    <div className={classNames(s.discountPrice, className)}>
      <Heading
        tag={view == "subtitle" ? "h2" : "span"}
        color="accent"
        view={view == "subtitle" ? view : "desc"}
        weight="medium"
        className={s.discountPrice__price}
      >
        ${discountedPrice}
      </Heading>
      <Heading
        tag="span"
        view="paragraph"
        color="secondary"
        className={s.discountPrice__price_old}
      >
        ${price.toFixed(2)}
      </Heading>
      {showDiscount && (
        <Heading
          tag="span"
          view="paragraph"
          className={s.discountPrice__discount}
        >
          -{discountPercent}%
        </Heading>
      )}
    </div>
  )
}

export default DiscountPrice
