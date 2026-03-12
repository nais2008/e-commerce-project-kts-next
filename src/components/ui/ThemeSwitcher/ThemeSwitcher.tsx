"use client"

import React from "react"

import { type ThemeValue, useTheme } from "@/providers/ThemeProvider"

import DropDown from "../DropDown"

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
]

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as ThemeValue)
  }

  return (
    <DropDown
      options={themeOptions}
      value={theme}
      onChange={handleThemeChange}
      isBackSecond
    />
  )
}

export default ThemeSwitcher
