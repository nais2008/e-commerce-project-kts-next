import apiClient from "@/api/axios"
import { ENDPOINTS } from "@/constants/endpoints"
import type { AuthResponse } from "@/shared/interface/apiResponse.interface"
import type {
  AuthCredentials,
  RegisterData,
} from "@/shared/interface/auth.interface"
import type { IUser } from "@/shared/interface/user.interface"

export async function login(credentials: AuthCredentials) {
  const { data } = await apiClient.post<AuthResponse>(
    ENDPOINTS.auth.login(),
    credentials
  )

  return data
}

export async function register(registerData: RegisterData) {
  const { data } = await apiClient.post<AuthResponse>(
    ENDPOINTS.auth.register(),
    registerData
  )

  return data
}

export async function getProfile(jwt: string) {
  const { data } = await apiClient.get<IUser>(ENDPOINTS.auth.profile(), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  return data
}
