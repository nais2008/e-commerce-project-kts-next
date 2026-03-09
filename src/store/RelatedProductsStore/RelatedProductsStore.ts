import { queryClient } from "@/api/reactQuery"
import { getProducts } from "@/services/products"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import {
  linearizeCollection,
  normalizeCollection,
} from "@/shared/type/collection.type"
import MobxQuery from "@/store/globals/mobxQuery"
import type { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"

type PrivateFields = "_query"

const PAGE_SIZE = 3

class RelatedProductsStore implements ILocalStore {
  categoryId: number | undefined = undefined

  private _query = new MobxQuery(
    () => ({
      queryKey: ["relatedProducts", this.categoryId],
      enabled: Boolean(this.categoryId),
      queryFn: async () => {
        const response = await getProducts(1, PAGE_SIZE, "", this.categoryId)

        return {
          ...response,
          data: normalizeCollection(response.data, (product) => product.id),
        }
      },
    }),
    queryClient
  )

  constructor() {
    makeObservable<RelatedProductsStore, PrivateFields>(this, {
      categoryId: observable,
      _query: observable.ref,
      setCategoryId: action,
      products: computed,
      isLoading: computed,
      error: computed,
      refetch: action,
    })
  }

  setCategoryId(id: number) {
    this.categoryId = id
  }

  refetch() {
    this._query.result.refetch()
  }

  get products() {
    const collection = this._query.result.data?.data

    if (!collection) return []

    return linearizeCollection(collection)
  }

  get isLoading() {
    return this._query.result.isPending
  }

  get error(): AxiosError | null {
    return this._query.result.error as AxiosError | null
  }

  destroy() {
    this._query.stopTracking()
  }
}

export default RelatedProductsStore
