import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/api/reactQuery"

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
