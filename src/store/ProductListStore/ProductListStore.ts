import { queryClient } from "@/api/reactQuery"
import { getProducts } from "@/services/products"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import {
  linearizeCollection,
  normalizeCollection,
} from "@/shared/type/collection.type"
import MobxInfiniteQuery from "@/store/globals/mobxInfiniteQuery"
import { action, computed, makeObservable, observable } from "mobx"

const PAGE_SIZE = 9
type PrivateFields = "_productListQuery"

class ProductListStore implements ILocalStore {
  search = ""
  categoryId: number | undefined = undefined
  pageSize: number = PAGE_SIZE

  private _productListQuery = new MobxInfiniteQuery(
    () => ({
      queryKey: ["products", this.search, this.categoryId, this.pageSize],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getProducts(
          pageParam,
          this.pageSize,
          this.search,
          this.categoryId
        )

        return {
          ...response,
          data: normalizeCollection(response.data, (product) => product.id),
        }
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, pageCount } = lastPage.meta.pagination

        return page < pageCount ? page + 1 : undefined
      },
      getPreviousPageParam: (_, allPages) => {
        const prevPage = allPages.length - 1
        return prevPage > 0 ? prevPage : undefined
      },
    }),
    queryClient
  )

  constructor() {
    makeObservable<ProductListStore, PrivateFields>(this, {
      _productListQuery: observable.ref,
      search: observable,
      pageSize: observable,
      categoryId: observable,

      products: computed,
      isLoading: computed,
      hasNextPage: computed,
      totalProducts: computed,
      error: computed,

      loadMore: action,
      setSearch: action,
      setCategoryId: action,
      refetch: action,
    })
  }

  setSearch = (newSearch: string) => {
    this.search = newSearch
  }

  setCategoryId = (newCategoryId: number | undefined) => {
    this.categoryId = newCategoryId
  }

  setPageSize = (newPageSize: number) => {
    this.pageSize = newPageSize
  }

  refetch() {
    this._productListQuery.result.refetch()
  }

  get totalProducts() {
    return (
      this._productListQuery.result.data?.pages[0]?.meta.pagination.total ?? 0
    )
  }

  get products() {
    const pages = this._productListQuery.result.data?.pages ?? []

    return pages.flatMap((page) => linearizeCollection(page.data))
  }

  get isLoading() {
    return this._productListQuery.result.isPending
  }

  get hasNextPage() {
    return this._productListQuery.hasNextPage()
  }

  get error() {
    return this._productListQuery.result.error
  }

  loadMore() {
    if (this.hasNextPage && !this._productListQuery.result.isFetchingNextPage) {
      this._productListQuery.fetchNextPage()
    }
  }

  destroy(): void {
    this._productListQuery.stopTracking()
  }
}

export default ProductListStore
