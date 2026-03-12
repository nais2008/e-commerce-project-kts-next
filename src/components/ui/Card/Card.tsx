"use client"

import React from "react"

import Image from "next/image"

import cn from "classnames"

import Heading from "@/components/ui/Heading"

import s from "./Card.module.scss"

type CardProps = {
  className?: string
  image: string
  imageStyle?: React.CSSProperties
  captionSlot?: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  contentSlot?: React.ReactNode
  onClick?: React.MouseEventHandler
  actionSlot?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  imageStyle,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={cn(s.card, className)} onClick={onClick}>
      <Image
        src={image}
        alt={typeof title === "string" ? title : "image in card"}
        className={s.card__image}
        width={500}
        height={500}
        style={imageStyle}
        unoptimized
      />
      <div className={s.card__content}>
        <div className={s.card__info}>
          {captionSlot && (
            <Heading
              className={s.card__captionSlot}
              view="paragraph"
              color="secondary"
              weight="medium"
            >
              {captionSlot}
            </Heading>
          )}
          <Heading
            className={s.card__title}
            view="desc"
            weight="medium"
            maxLines={2}
          >
            {title}
          </Heading>
          <Heading
            className={s.card__subtitle}
            view="paragraph"
            color="secondary"
            maxLines={2}
          >
            {subtitle}
          </Heading>
        </div>
        <div className={s.card__footer}>
          {contentSlot}
          {actionSlot && <div className={s.card__actionSlot}>{actionSlot}</div>}
        </div>
      </div>
    </div>
  )
}

export default Card
