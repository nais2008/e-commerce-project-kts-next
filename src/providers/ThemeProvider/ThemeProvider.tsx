"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"

import { ThemeContext, type ThemeValue } from "./theme"

const STORAGE_KEY = "app-theme"

const getSystemTheme = (): "light" | "dark" => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark"
  }
  return "light"
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<ThemeValue>("auto")
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme
  )

  const resolvedTheme = useMemo(
    () => (theme === "auto" ? systemTheme : theme),
    [theme, systemTheme]
  )

  const setTheme = useCallback((newTheme: ThemeValue) => {
    setThemeState(newTheme)

    if (typeof window === "undefined") return

    if (newTheme === "auto") localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, newTheme)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  useEffect(() => {
    if (!mounted) return

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark" || saved === "auto") {
      requestAnimationFrame(() => setThemeState(saved))
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => setSystemTheme(getSystemTheme())
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove("light-theme", "dark-theme")
    root.classList.add(`${resolvedTheme}-theme`)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme, mounted])

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme]
  )

  if (!mounted) return null

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
