import { queryClient } from "@/api/reactQuery"
import { getProfile, login, register } from "@/services/auth"
import type { AuthResponse } from "@/shared/interface/apiResponse.interface"
import type {
  AuthCredentials,
  RegisterData,
} from "@/shared/interface/auth.interface"
import type { ILocalStore } from "@/shared/interface/localStore.interface"
import MobxMutation from "@/store/globals/mobxMutation"
import MobxQuery from "@/store/globals/mobxQuery"
import type { AxiosError } from "axios"
import { action, computed, makeObservable, observable } from "mobx"

type PrivateFields =
  | "_loginMutation"
  | "_registerMutation"
  | "_userQuery"
  | "_jwt"
  | "_setToken"

class AuthStore implements ILocalStore {
  private _jwt: string | null = (() => {
    const token = localStorage.getItem("jwt")
    return token && token !== "null" ? token : null
  })()

  private _loginMutation = new MobxMutation(
    () => ({
      mutationKey: ["auth", "login"],
      mutationFn: login,
      onSuccess: (data: AuthResponse) => this._setToken(data.jwt),
      onError: () => {},
    }),
    queryClient
  )

  private _registerMutation = new MobxMutation(
    () => ({
      mutationKey: ["auth", "register"],
      mutationFn: register,
      onSuccess: (data: AuthResponse) => this._setToken(data.jwt),
      onError: () => {},
    }),
    queryClient
  )

  private _userQuery = new MobxQuery(
    () => ({
      queryKey: ["auth", "me", this._jwt],
      queryFn: () => {
        if (!this._jwt) {
          return null
        }
        return getProfile(this._jwt)
      },
      enabled: !!this._jwt,
    }),
    queryClient
  )

  constructor() {
    makeObservable<AuthStore, PrivateFields>(this, {
      _jwt: observable,
      _loginMutation: observable.ref,
      _registerMutation: observable.ref,
      _userQuery: observable.ref,

      isAuthenticated: computed,
      user: computed,
      isLoadingAuth: computed,
      isLoadingRegister: computed,
      isLoading: computed,
      error: computed,
      jwt: computed,

      login: action,
      register: action,
      logout: action,
      _setToken: action,
    })
  }

  private _setToken(token: string) {
    localStorage.setItem("jwt", token)
    this._jwt = token
  }

  login(credentials: AuthCredentials) {
    this._loginMutation.mutate(credentials)
  }

  register(data: RegisterData) {
    this._registerMutation.mutate(data)
  }

  logout() {
    localStorage.removeItem("jwt")
    this._jwt = null
    queryClient.removeQueries({ queryKey: ["auth", "me"] })
  }

  get isAuthenticated(): boolean {
    return !!this._jwt
  }

  get jwt() {
    return this._jwt
  }

  get user() {
    return this._userQuery.result.data
  }

  get isLoadingAuth() {
    return this._loginMutation.result.isPending
  }

  get isLoadingRegister() {
    return this._registerMutation.result.isPending
  }

  get isLoading(): boolean {
    return (
      this._loginMutation.result.isPending ||
      this._registerMutation.result.isPending ||
      this._userQuery.result.isPending
    )
  }

  get error(): AxiosError | null {
    return (this._loginMutation.result.error ||
      this._registerMutation.result.error ||
      this._userQuery.result.error) as AxiosError | null
  }

  destroy() {
    this._loginMutation.stopTracking()
    this._registerMutation.stopTracking()
    this._userQuery.stopTracking()
  }
}

export default AuthStore
