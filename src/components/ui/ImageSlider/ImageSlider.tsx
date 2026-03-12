"use client"

import React, { useRef, useState } from "react"

import Image from "next/image"

import type { IImage } from "@/shared/interface/image.interface"
import classNames from "classnames"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import s from "./ImageSlider.module.scss"

const ICON_SIZE = 30

type Props = {
  images: IImage[]
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const getImageUrl = (image: IImage) =>
    image.formats.large.url ||
    image.formats.medium.url ||
    image.formats.small.url ||
    image.url

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      loop={false}
      navigation={{
        prevEl: `.${s.slider__btn_prev}`,
        nextEl: `.${s.slider__btn_next}`,
      }}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper
      }}
      className={s.slider}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <Image
            src={getImageUrl(image)}
            alt={image.alternativeText || ""}
            className={s.slider__image}
            width={1000}
            height={1000}
            loading="eager"
          />
        </SwiperSlide>
      ))}
      <button
        className={classNames(s.slider__btn, s.slider__btn_prev)}
        disabled={isBeginning}
      >
        <ChevronLeft size={ICON_SIZE} />
      </button>

      <button
        className={classNames(s.slider__btn, s.slider__btn_next)}
        disabled={isEnd}
      >
        <ChevronRight size={ICON_SIZE} />
      </button>
    </Swiper>
  )
}

export default ImageSlider
