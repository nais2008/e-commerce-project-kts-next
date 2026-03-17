"use client"

import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Skeleton from "react-loading-skeleton"

import { useSearchParams } from "next/navigation"

import { useAuthStore, useCartStore } from "@/hooks/globalStores"
import { useLocalStore } from "@/hooks/useLocalStore"
import type { IProduct } from "@/shared/interface/product.interface"
import ProductListStore from "@/store/ProductListStore"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import ProductCard from "@/components/ui/ProductCard"
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton"

import {
  DISCOUNT_RANGE_BOUNDS,
  PRICE_RANGE_BOUNDS,
  parseRangeParams,
} from "@/utils/parseRangeParams"

import Filters from "../Filters"
import s from "./List.module.scss"

const List: React.FC = observer(() => {
  const searchParams = useSearchParams()
  const store = useLocalStore(() => new ProductListStore())

  const search = searchParams.get("search") ?? ""
  const category = searchParams.get("category")
  const priceMinParam = searchParams.get("priceMin")
  const priceMaxParam = searchParams.get("priceMax")
  const discountMinParam = searchParams.get("discountMin")
  const discountMaxParam = searchParams.get("discountMax")

  const categoryId = React.useMemo(() => {
    if (!category) return undefined

    const parsed = Number(category)
    return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined
  }, [category])

  const priceRange = React.useMemo(
    () => parseRangeParams(priceMinParam, priceMaxParam, PRICE_RANGE_BOUNDS),
    [priceMaxParam, priceMinParam]
  )

  const discountRange = React.useMemo(
    () =>
      parseRangeParams(
        discountMinParam,
        discountMaxParam,
        DISCOUNT_RANGE_BOUNDS
      ),
    [discountMaxParam, discountMinParam]
  )

  const authStore = useAuthStore()
  const cartStore = useCartStore()

  React.useEffect(() => {
    store.setSearch(search)
    store.setCategoryId(categoryId ?? undefined)
    store.setPriceMin(priceRange.filterMin)
    store.setPriceMax(priceRange.filterMax)
    store.setDiscountMin(discountRange.filterMin)
    store.setDiscountMax(discountRange.filterMax)
  }, [
    categoryId,
    discountRange.filterMax,
    discountRange.filterMin,
    priceRange.filterMax,
    priceRange.filterMin,
    search,
    store,
  ])

  const loaders = [...Array(6)].map((_, i) => <CardSkeleton key={i} />)

  const errorMessage = (
    <>
      <ErrorMessage
        errorMess={"An error has occurred: " + store.error?.message}
      />
      <Button onClick={() => store.refetch()} className={s.retryButton}>
        Try Again
      </Button>
    </>
  )

  const productsMessage =
    store.totalProducts > 0 ? (
      <Heading tag="p" weight="medium" className={s.list__endMessage}>
        🎉 All products have been loaded
      </Heading>
    ) : (
      <Heading tag="p" weight="medium" className={s.list__endMessage}>
        No products :(
      </Heading>
    )

  return (
    <section className={s.list}>
      <Filters />

      <Heading view="subtitle" tag="h2" className={s.list__title}>
        Total products
        {store.isLoading ? (
          <Skeleton width={30} />
        ) : (
          <Heading
            tag="span"
            color="accent"
            view="paragraph"
            className={s.list__totalProducts}
          >
            {store.totalProducts}
          </Heading>
        )}
      </Heading>

      {store.isLoading && <div className={s.list__items}>{loaders}</div>}
      {store.error && errorMessage}

      <InfiniteScroll
        dataLength={store.loadedProductsCount}
        next={() => store.loadMore()}
        hasMore={store.hasNextPage}
        loader={loaders}
        scrollThreshold={0.9}
        className={s.list__items}
        endMessage={productsMessage}
      >
        {store.products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            isAuth={authStore.isAuthenticated}
            onAddToCart={() =>
              cartStore.add(product.id, 1, product as IProduct)
            }
            inCart={cartStore.isProductInCart(product.id)}
          />
        ))}
      </InfiniteScroll>
    </section>
  )
})

export default List
