"use client"

import React from "react"
import { ToastContainer } from "react-toastify"

import { useTheme } from "@/providers/ThemeProvider"

const Toastify: React.FC = () => {
  const { resolvedTheme } = useTheme()

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme={resolvedTheme}
    />
  )
}

export default Toastify
