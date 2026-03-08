import React from "react"

import type { ILocalStore } from "@/shared/interface/localStore.interface"

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const [store] = React.useState(() => creator())

  React.useEffect(() => {
    return () => store.destroy()
  }, [store])

  return store
}
