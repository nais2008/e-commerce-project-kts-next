"use client"

import React from "react"

import ReactQueryProvider from "./ReactQueryProvider"
import { ThemeProvider } from "./ThemeProvider"
import { RootStoreProvider } from "./RootStoreProvider"

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
