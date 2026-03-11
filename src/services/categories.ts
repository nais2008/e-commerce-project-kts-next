import { apiClient } from "@/api/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type { ApiResponse } from "@/shared/interface/apiResponse.interface"
import type { ICategory } from "@/shared/interface/category.interface"
import qs from "qs"

const STRAPI_BASE_URL = "https://front-school-strapi.ktsdev.ru"
const STRAPI_URL = `${STRAPI_BASE_URL}/api`

export async function getCategories() {
  const { data } = await apiClient.get<ApiResponse<ICategory[]>>(
    ENDPOINTS.categorized.list()
  )

  return data
}

export async function getCategoriesByFetch(): Promise<
  ApiResponse<ICategory[]>
> {
  const queryParams = {
    populate: ["image"],
  }

  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
    skipNulls: true,
    encodeValuesOnly: true,
  })

  const res = await fetch(`${STRAPI_URL}/product-categories?${queryString}`, {
    next: {
      revalidate: 3600,
    },
  })

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Categories not found")
    }
    throw new Error(`Failed to fetch categories: ${res.status}`)
  }

  const json = (await res.json()) as ApiResponse<ICategory[]>
  return {
    data: json.data ?? [],
    meta: json.meta,
  }
}

export async function getCategoryById(id: number) {
  const { data } = await apiClient.get<ApiResponse<ICategory>>(
    ENDPOINTS.categorized.byId(id)
  )

  return data
}
