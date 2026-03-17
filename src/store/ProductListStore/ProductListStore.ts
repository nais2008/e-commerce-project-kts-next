import { queryClient } from "@/api/reactQuery"
import { getProducts } from "@/services/products"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import type { IProductToList } from "@/shared/interface/product.interface"
import {
  linearizeCollection,
  normalizeCollection,
} from "@/shared/type/collection.type"
import MobxInfiniteQuery from "@/store/globals/mobxInfiniteQuery"
import { action, computed, makeObservable, observable } from "mobx"

import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice"

const PAGE_SIZE = 9

type PrivateFields = "_productListQuery"

class ProductListStore implements ILocalStore {
  search = ""
  categoryId: number | undefined = undefined
  priceMin: number | undefined = undefined
  priceMax: number | undefined = undefined
  discountMin: number | undefined = undefined
  discountMax: number | undefined = undefined
  pageSize: number = PAGE_SIZE

  private _productListQuery = new MobxInfiniteQuery(
    () => ({
      queryKey: [
        "products",
        this.search,
        this.categoryId,
        this.discountMin,
        this.discountMax,
        this.pageSize,
      ],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getProducts(
          pageParam,
          this.pageSize,
          this.search,
          this.categoryId,
          this.discountMin,
          this.discountMax
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
    }),
    queryClient
  )

  constructor() {
    makeObservable<ProductListStore, PrivateFields>(this, {
      _productListQuery: observable.ref,

      search: observable,
      categoryId: observable,
      priceMin: observable,
      priceMax: observable,
      discountMin: observable,
      discountMax: observable,
      pageSize: observable,

      products: computed,
      loadedProducts: computed,
      loadedProductsCount: computed,
      isLoading: computed,
      isFetchingNextPage: computed,
      hasNextPage: computed,
      totalProducts: computed,
      error: computed,

      loadMore: action,
      setSearch: action,
      setCategoryId: action,
      setPriceMin: action,
      setPriceMax: action,
      setDiscountMin: action,
      setDiscountMax: action,
      refetch: action,
    })
  }

  setSearch = action((newSearch: string) => {
    if (this.search !== newSearch) this.search = newSearch
  })

  setCategoryId = action((newCategoryId: number | undefined) => {
    if (this.categoryId !== newCategoryId) this.categoryId = newCategoryId
  })

  setPriceMin = action((val: number | undefined) => {
    if (this.priceMin !== val) this.priceMin = val
  })
  setPriceMax = action((val: number | undefined) => {
    if (this.priceMax !== val) this.priceMax = val
  })
  setDiscountMin = action((val: number | undefined) => {
    if (this.discountMin !== val) this.discountMin = val
  })
  setDiscountMax = action((val: number | undefined) => {
    if (this.discountMax !== val) this.discountMax = val
  })

  setPageSize = action((newPageSize: number) => {
    if (this.pageSize !== newPageSize) this.pageSize = newPageSize
  })

  refetch() {
    this._productListQuery.result.refetch()
  }

  get totalProducts() {
    if (this.priceMin !== undefined || this.priceMax !== undefined) {
      return this.products.length
    }

    return (
      this._productListQuery.result.data?.pages?.[0]?.meta.pagination.total ?? 0
    )
  }

  private isProductInPriceRange(product: IProductToList) {
    const discountedPrice = calculateDiscountedPrice(
      product.price,
      product.discountPercent
    )

    if (this.priceMin !== undefined && discountedPrice < this.priceMin) {
      return false
    }

    if (this.priceMax !== undefined && discountedPrice > this.priceMax) {
      return false
    }

    return true
  }

  get loadedProducts() {
    const pages = this._productListQuery.result.data?.pages ?? []
    return pages.flatMap((page) => linearizeCollection(page.data))
  }

  get loadedProductsCount() {
    return this.loadedProducts.length
  }

  get products() {
    return this.loadedProducts.filter((product) =>
      this.isProductInPriceRange(product)
    )
  }

  get isLoading() {
    return this._productListQuery.result.isPending
  }

  get isFetchingNextPage() {
    return this._productListQuery.result.isFetchingNextPage
  }

  get hasNextPage() {
    return !!this._productListQuery.result.hasNextPage
  }

  get error() {
    return this._productListQuery.result.error
  }

  loadMore() {
    if (
      !this.hasNextPage ||
      this._productListQuery.result.isFetchingNextPage ||
      this._productListQuery.result.isPending
    ) {
      return
    }
    this._productListQuery.fetchNextPage()
  }

  destroy() {
    this._productListQuery.stopTracking()
  }
}

export default ProductListStore
