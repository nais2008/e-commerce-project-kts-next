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
  const [theme, setThemeState] = useState<ThemeValue>(() => {
    if (typeof window === "undefined") {
      return "auto"
    }

    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === "light" || saved === "dark" || saved === "auto"
      ? saved
      : "auto"
  })

  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    getSystemTheme
  )

  const resolvedTheme = useMemo(
    () => (theme === "auto" ? systemTheme : theme),
    [theme, systemTheme]
  )

  const setTheme = useCallback((newTheme: ThemeValue) => {
    setThemeState(newTheme)

    if (newTheme === "auto") {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, newTheme)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      setSystemTheme(getSystemTheme())
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    root.classList.remove("light-theme", "dark-theme")
    root.classList.add(`${resolvedTheme}-theme`)
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
    }),
    [theme, setTheme, resolvedTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
