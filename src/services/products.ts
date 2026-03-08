import { apiClient } from "@/api/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type { ApiResponse } from "@/shared/interface/apiResponse.interface"
import type {
  IProduct,
  IProductToList,
} from "@/shared/interface/product.interface"
import qs from "qs"

const PAGE_SIZE = 9

export async function getProducts(
  page: number,
  pageSize: number = PAGE_SIZE,
  search: string = "",
  categoryId?: number
) {
  const queryParams = {
    populate: ["images", "productCategory"],
    pagination: {
      page: page,
      pageSize: pageSize,
    },
    filters: {
      ...(search ? { title: { $containsi: search } } : {}),
      ...(categoryId ? { productCategory: { id: { $eq: categoryId } } } : {}),
    },
  }
  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
    skipNulls: true,
  })

  const { data } = await apiClient.get<ApiResponse<IProductToList[]>>(
    `${ENDPOINTS.product.list()}?${queryString}`
  )

  return data
}

export async function getProductById(id: string) {
  const queryParams = {
    populate: ["images", "productCategory"],
  }

  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
  })

  const { data } = await apiClient.get<ApiResponse<IProduct>>(
    `${ENDPOINTS.product.byId(id)}?${queryString}`
  )

  return data
}

export async function getProductsByCategory(
  categoryId: number,
  pageSize: number = PAGE_SIZE
) {
  const queryParams = {
    populate: ["images", "productCategory"],
    pagination: {
      pageSize: pageSize,
    },
    filters: {
      productCategory: {
        id: {
          $eq: categoryId,
        },
      },
    },
  }
  const queryString = qs.stringify(queryParams, {
    encode: false,
    indices: false,
    arrayFormat: "repeat",
  })

  const { data } = await apiClient.get<ApiResponse<IProductToList[]>>(
    `${ENDPOINTS.product.list()}?${queryString}`
  )

  return data
}
