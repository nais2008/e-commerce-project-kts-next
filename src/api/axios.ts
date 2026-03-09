import type { ApiErrorResponse } from "@/shared/interface/apiResponse.interface"
import axios, { AxiosError } from "axios"

const STRAPI_BASE_URL = "https://front-school-strapi.ktsdev.ru"
const STRAPI_URL = `${STRAPI_BASE_URL}/api`

const TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export const apiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    ...(TOKEN && {
      Authorization: `Bearer ${TOKEN}`,
    }),
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt")
    }

    return Promise.reject(error)
  }
)

export default apiClient
