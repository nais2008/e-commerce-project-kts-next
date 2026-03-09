import { queryClient } from "@/api/reactQuery"
import { getProductById } from "@/services/products"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import MobxQuery from "@/store/globals/mobxQuery"
import { action, computed, makeObservable, observable } from "mobx"

type PrivateField = "_productQuery"

class ProductStore implements ILocalStore {
  id = ""

  private _productQuery = new MobxQuery(
    () => ({
      queryKey: ["product", this.id],
      queryFn: () => getProductById(this.id ?? ""),
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
