import { apiClient } from "@/api/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type { ApiResponse } from "@/shared/interface/apiResponse.interface"
import type { ICategory } from "@/shared/interface/category.interface"
import qs from "qs"

const PAGE_SIZE = 9

export async function getCategories(
  page: number,
  pageSize: number = PAGE_SIZE,
  search: string = ""
) {
  const queryParams = {
    populate: ["image"],
    pagination: {
      page: page,
      pageSize: pageSize,
    },
    filters: {
      ...(search ? { title: { $containsi: search } } : {}),
    },
  }

  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
    skipNulls: true,
  })

  const { data } = await apiClient.get<ApiResponse<ICategory[]>>(
    `${ENDPOINTS.categorized.list()}?${queryString}`
  )

  return data
}

export async function getCategoryById(id: number) {
  const { data } = await apiClient.get<ApiResponse<ICategory>>(
    ENDPOINTS.categorized.byId(id)
  )

  return data
}
