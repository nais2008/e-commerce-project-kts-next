"use client"

import { createContext, useContext } from "react"

export type ThemeValue = "light" | "dark" | "auto"

export interface ThemeContextType {
  theme: ThemeValue
  setTheme: (value: ThemeValue) => void
  resolvedTheme: "light" | "dark"
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
)

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
