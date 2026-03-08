"use client"

import React from "react"

import RootStore from "@/store/globals/root"

const RootStoreContext = React.createContext<RootStore | null>(null)

export const RootStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [store] = React.useState(() => new RootStore())

  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}

export const useRootStore = () => {
  const store = React.useContext(RootStoreContext)

  if (!store) {
    throw new Error("RootStoreProvider missing")
  }

  return store
}
