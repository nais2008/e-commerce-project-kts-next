"use client"

import React, { useEffect } from "react"

import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = observer(({ children, fallback }) => {
  const authStore = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!authStore.jwt) {
      router.replace(ROUTES.login.create())
    }
  }, [authStore.jwt, router])

  if (!authStore.jwt) {
    return <main>{fallback ?? null}</main>
  }

  return <>{children}</>
})

export default ProtectedRoute
