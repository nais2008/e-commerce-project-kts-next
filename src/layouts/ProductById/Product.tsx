"use client"

import React, { useEffect } from "react"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

import { useLocalStore } from "@/hooks/useLocalStore"
import type { IProductToList } from "@/shared/interface/product.interface"
import { Params } from "@/shared/type/productId.type"
import ProductStore from "@/store/ProductStore"
import { ChevronLeft } from "lucide-react"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import ImageSlider from "@/components/ui/ImageSlider"
import ProductDetailSkeleton from "@/components/ui/skeletons/ProductDetailSkeleton"

import s from "./Product.module.scss"
import InfoProduct from "./components/InfoProduct"
import List from "./components/List"

const Product = observer(() => {
  const router = useRouter()
  const { id } = useParams<Params>()
  const store = useLocalStore(() => new ProductStore())

  useEffect(() => {
    if (id) store.setId(id)
  }, [id, store])

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.back()
  }

  const currentProduct = React.useMemo<IProductToList | null>(() => {
    if (!store.product) return null

    const {
      id,
      documentId,
      title,
      description,
      images,
      productCategory,
      price,
      discountPercent,
    } = store.product

    return {
      id,
      documentId,
      title,
      description,
      images,
      productCategory,
      price,
      discountPercent,
    }
  }, [store.product])

  return (
    <>
      <Link href="#" className={s.product__linkPrev} onClick={handleBack}>
        <ChevronLeft size={32} />
        <Heading view="desc">Back</Heading>
      </Link>

      {store.isLoading && <ProductDetailSkeleton />}

      {store.error && (
        <>
          <ErrorMessage
            errorMess={`An error has occurred: ${store.error.message}`}
          />
          <Button onClick={() => store.refetch()} className={s.retryButton}>
            Try Again
          </Button>
        </>
      )}

      {store.product && currentProduct && (
        <>
          <div className={s.product__info}>
            <ImageSlider images={store.product.images} />
            <InfoProduct data={store.product} />
          </div>
          <List
            categoryId={store.product.productCategory.id}
            currentProduct={currentProduct}
          />
        </>
      )}
    </>
  )
})

export default Product
