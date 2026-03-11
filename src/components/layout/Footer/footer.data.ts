import { ROUTES } from "@/constants/routes";

export const FOOTER_LINKS = [
  {
    label: "Go to products",
    href: ROUTES.products.create(),
  },
  {
    label: "Go to categories",
    href: ROUTES.categories.create(),
  },
  {
    label: "Check code",
    href: "https://github.com/nais2008/e-commerce-project-kts-next",
    target: "_blank",
  },
]
