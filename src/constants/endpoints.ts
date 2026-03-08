export const ENDPOINTS = {
  product: {
    list: () => "/products",
    byId: (id: string) => `/products/${id}`,
  },
  categorized: {
    list: () => "product-categories",
    byId: (id: number) => `/product-categories/${id}`,
  },
  cart: {
    list: () => "/cart",
    add: () => "/cart/add",
    remove: () => "/cart/remove",
  },
  auth: {
    login: () => "/auth/local",
    register: () => "/auth/local/register",
    profile: () => "/users/me",
  },
}
