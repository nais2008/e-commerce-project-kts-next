import apiClient from "@/api/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type { ApiResponse } from "@/shared/interface/apiResponse.interface"
import type { IProductInCart } from "@/shared/interface/cart.interface"

export async function getCart(jwt: string) {
  const { data } = await apiClient.get<IProductInCart[]>(
    ENDPOINTS.cart.list(),
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )

  return data
}

export async function addToCart(jwt: string, productId: number, quantity = 1) {
  const { data } = await apiClient.post<ApiResponse<IProductInCart>>(
    ENDPOINTS.cart.add(),
    { product: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )

  return data
}

export async function removeFromCart(
  jwt: string,
  productId: number,
  quantity = 1
) {
  const { data } = await apiClient.post<ApiResponse<IProductInCart>>(
    ENDPOINTS.cart.remove(),
    { product: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  return data
}
