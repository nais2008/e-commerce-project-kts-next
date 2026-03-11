import { queryClient } from "@/api/reactQuery"
import { getCategories } from "@/services/categories"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import MobxQuery from "@/store/globals/mobxQuery"
import type { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"

type PrivateFields = "_query"

class CategoriesStore implements ILocalStore {
  private _query = new MobxQuery(
    () => ({
      queryKey: ["categories"],
      queryFn: () => getCategories(),
    }),
    queryClient
  )

  constructor() {
    makeObservable<CategoriesStore, PrivateFields>(this, {
      _query: observable.ref,
      categories: computed,
      isLoading: computed,
      error: computed,
      refetch: action,
    })
  }

  refetch() {
    this._query.result.refetch()
  }

  get categories() {
    return this._query.result.data?.data ?? []
  }

  get isLoading(): boolean {
    return this._query.result.isPending
  }

  get error(): AxiosError | null {
    return this._query.result.error as AxiosError | null
  }

  destroy() {
    this._query.stopTracking()
  }
}

export default CategoriesStore
