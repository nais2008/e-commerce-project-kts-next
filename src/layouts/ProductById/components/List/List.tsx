"use client"

import React from "react"

import { useLocalStore } from "@/hooks/useLocalStore"
import RelatedProductsStore from "@/store/RelatedProductsStore"
import classNames from "classnames"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import ListItems from "@/components/ui/ListItems"
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton"

import s from "./List.module.scss"

type Props = {
  categoryId: number
}

const List: React.FC<Props> = observer(({ categoryId }) => {
  const store = useLocalStore(() => new RelatedProductsStore())

  React.useEffect(() => {
    store.setCategoryId(categoryId)
  }, [categoryId, store])

  if (store.isLoading)
    return (
      <section className={s.list}>
        <Heading view="subtitle" tag="h2" className={s.list__title}>
          Related Items
        </Heading>
        <div className={s.list__items}>
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    )

  if (store.error)
    return (
      <div className={classNames(s.list)}>
        <ErrorMessage
          errorMess={`An error has occurred: ${store.error.message}`}
        />
        <Button onClick={() => store.refetch()} className={s.retryButton}>
          Try Again
        </Button>
      </div>
    )

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
        <>
          <ErrorMessage errorMess={`An error has occurred: ${store.error}`} />
          <Button onClick={() => store.refetch()} className={s.retryButton}>
            Try Again
          </Button>
        </>
      )}
      <ListItems
        className={s.list__items}
        items={store.products}
        type="products"
      />
    </section>
  )
})

export default List
