import AuthStore from "@/store/AuthStore"
import CartStore from "@/store/CartStore"
import CategoriesStore from "@/store/CategoriesStore"
import QueryParamsStore from "@/store/QueryParamsStore"

class RootStore {
  readonly authStore: AuthStore
  readonly cartStore: CartStore
  readonly categoriesStore: CategoriesStore
  readonly queryParamsStore: QueryParamsStore

  constructor() {
    this.authStore = new AuthStore()
    this.cartStore = new CartStore(this)
    this.categoriesStore = new CategoriesStore()
    this.queryParamsStore = new QueryParamsStore()
  }
}

export default RootStore
