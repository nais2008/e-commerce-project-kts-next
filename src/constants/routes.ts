export const ROUTES = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "/products",
    create: () => "/products",
  },
  product: {
    mask: "/products/:id",
    create: (id: string) => `/products/${id}`,
  },
  categories: {
    mask: "/categories",
    create: () => "/categories",
  },
  notFound: {
    mask: "/not-found",
    create: () => "/not-found",
  },
  login: {
    mask: "/login",
    create: () => "/login",
  },
  register: {
    mask: "/register",
    create: () => "/register",
  },
  profile: {
    mask: "/me",
    create: () => "/me",
  },
  cart: {
    mask: "/cart",
    create: () => "/cart",
  },
}
