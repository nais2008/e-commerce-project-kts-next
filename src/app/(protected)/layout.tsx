import React from "react"

import ProtectedRoute from "@/components/utils/ProtectedRoute"

type Props = {
  children: React.ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
