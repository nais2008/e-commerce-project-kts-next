"use client"

import React from "react"

import { useLocalStore } from "@/hooks/useLocalStore"
import type { IProductToList } from "@/shared/interface/product.interface"
import RelatedProductsStore from "@/store/RelatedProductsStore"
import classNames from "classnames"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { observer } from "mobx-react-lite"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import ListItems from "@/components/ui/ListItems"
import ProductCard from "@/components/ui/ProductCard"
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton"

import {
  MAX_RECENT_PRODUCTS_TO_SHOW,
  getRecentlyViewedProducts,
  saveViewedProduct,
} from "@/utils/recentlyViewedProducts"

import s from "./List.module.scss"

type Props = {
  categoryId: number
  currentProduct: IProductToList
}

const List: React.FC<Props> = observer(({ categoryId, currentProduct }) => {
  const store = useLocalStore(() => new RelatedProductsStore())
  const [recentProducts, setRecentProducts] = React.useState<IProductToList[]>(
    []
  )
  const [isBeginning, setIsBeginning] = React.useState(true)
  const [isEnd, setIsEnd] = React.useState(false)
  const [canSlide, setCanSlide] = React.useState(false)
  const sliderRef = React.useRef<SwiperType | null>(null)

  const syncSliderState = React.useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    setCanSlide(!swiper.isLocked)
  }, [])

  const handlePrev = React.useCallback(() => {
    sliderRef.current?.slidePrev()
  }, [])

  const handleNext = React.useCallback(() => {
    sliderRef.current?.slideNext()
  }, [])

  React.useEffect(() => {
    store.setCategoryId(categoryId)
  }, [categoryId, store])

  React.useEffect(() => {
    saveViewedProduct(currentProduct)

    const recent = getRecentlyViewedProducts()
      .filter((item) => item.documentId !== currentProduct.documentId)
      .slice(0, MAX_RECENT_PRODUCTS_TO_SHOW)

    setRecentProducts(recent)
  }, [currentProduct])

  React.useEffect(() => {
    const swiper = sliderRef.current
    if (!swiper) return

    swiper.update()
    syncSliderState(swiper)
  }, [recentProducts, syncSliderState])

  return (
    <section className={s.list}>
      <Heading view="subtitle" tag="h2" className={s.list__title}>
        Related Items
      </Heading>

      {store.isLoading && (
        <div className={s.list__items}>
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {store.error && (
        <div className={classNames(s.list__error)}>
          <ErrorMessage
            errorMess={`An error has occurred: ${store.error.message}`}
          />
          <Button onClick={() => store.refetch()} className={s.retryButton}>
            Try Again
          </Button>
        </div>
      )}

      {!store.isLoading && !store.error && (
        <ListItems
          className={s.list__items}
          items={store.products}
          type="products"
        />
      )}

      {recentProducts.length > 0 && (
        <div className={s.list__recent}>
          <Heading view="subtitle" tag="h2" className={s.list__title}>
            Recently Viewed
          </Heading>

          <div className={s.list__recentSliderWrap}>
            <Swiper
              className={s.list__recentSlider}
              slidesPerView={1}
              spaceBetween={16}
              grabCursor
              onSwiper={(swiper) => {
                sliderRef.current = swiper
                syncSliderState(swiper)
              }}
              onSlideChange={syncSliderState}
              onResize={syncSliderState}
              onBreakpoint={syncSliderState}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {recentProducts.map((product) => (
                <SwiperSlide key={product.documentId} className={s.list__slide}>
                  <ProductCard
                    product={product}
                    className={s.list__recentCard}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {canSlide && !isBeginning && (
              <button
                className={classNames(
                  s.list__sliderBtn,
                  s.list__sliderBtn_prev
                )}
                onClick={handlePrev}
                type="button"
                aria-label="Previous viewed product"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {canSlide && !isEnd && (
              <button
                className={classNames(
                  s.list__sliderBtn,
                  s.list__sliderBtn_next
                )}
                onClick={handleNext}
                type="button"
                aria-label="Next viewed product"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
})

export default List
