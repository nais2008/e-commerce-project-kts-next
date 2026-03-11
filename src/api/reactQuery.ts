import { QueryCache, QueryClient } from "@tanstack/react-query"

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => console.error(error),
  }),
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient(queryClientConfig)
  } else {
    if (!browserQueryClient)
      browserQueryClient = new QueryClient(queryClientConfig)
    return browserQueryClient
  }
}

export const queryClient = getQueryClient()
