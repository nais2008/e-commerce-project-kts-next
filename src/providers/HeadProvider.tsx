"use client"

import React from "react"

import ReactQueryProvider from "./ReactQueryProvider"
import { RootStoreProvider } from "./RootStoreProvider"
import { ThemeProvider } from "./ThemeProvider"

interface HeadProviderProps {
  children: React.ReactNode
}

const HeadProvider: React.FC<HeadProviderProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <RootStoreProvider>{children}</RootStoreProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}

export default HeadProvider
