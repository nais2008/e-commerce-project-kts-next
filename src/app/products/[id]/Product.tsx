"use client"

import React, { useEffect } from "react"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

import { useLocalStore } from "@/hooks/useLocalStore"
import ProductStore from "@/store/ProductStore"
import { ChevronLeft } from "lucide-react"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import ImageSlider from "@/components/ui/ImageSlider"
import ProductDetailSkeleton from "@/components/ui/skeletons/ProductDetailSkeleton"

import InfoProduct from "./components/InfoProduct"
import List from "./components/List"
import s from "./page.module.scss"
import { Params } from "./params"

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

      {store.product && (
        <>
          <div className={s.product__info}>
            <ImageSlider images={store.product.images} />
            <InfoProduct data={store.product} />
          </div>
          <List categoryId={store.product.productCategory.id} />
        </>
      )}
    </>
  )
})

export default Product
