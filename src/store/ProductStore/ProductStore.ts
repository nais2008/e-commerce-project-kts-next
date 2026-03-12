import { notFound } from "next/navigation"

import { queryClient } from "@/api/reactQuery"
import { getProductById } from "@/services/products"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import MobxQuery from "@/store/globals/mobxQuery"
import { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"

type PrivateField = "_productQuery"

class ProductStore implements ILocalStore {
  id = ""

  private _productQuery = new MobxQuery(
    () => ({
      queryKey: ["product", this.id],
      queryFn: async () => {
        try {
          return await getProductById(this.id)
        } catch (err) {
          const error = err as AxiosError
          if (error.response?.status === 404) {
            notFound()
          }
          throw err
        }
      },
      enabled: Boolean(this.id),
    }),
    queryClient
  )

  constructor() {
    makeObservable<ProductStore, PrivateField>(this, {
      _productQuery: observable.ref,
      id: observable,

      isLoading: computed,
      error: computed,
      product: computed,

      setId: action,
      refetch: action,
    })
  }

  setId = (id: string) => {
    this.id = id
  }

  refetch() {
    this._productQuery.result.refetch()
  }

  get isLoading() {
    return this._productQuery.result.isPending
  }

  get error() {
    return this._productQuery.result.error
  }

  get product() {
    return this._productQuery.result.data?.data
  }

  destroy(): void {
    this._productQuery.stopTracking()
  }
}

export default ProductStore
