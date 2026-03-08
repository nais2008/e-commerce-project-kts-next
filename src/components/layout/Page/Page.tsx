import React from "react"

import Button from "@/components/ui/Button"

import ErrorMessage from "../ErrorMessage"

type Props = {
  children: React.ReactNode
  isLoading: boolean
  error: Error | null
  loadingChildren: React.ReactNode
  refetch: () => void
  className?: string
}

const Page: React.FC<Props> = ({
  children,
  isLoading,
  error,
  loadingChildren,
  refetch,
  className,
}) => {
  if (isLoading) {
    return <section className={className}>{loadingChildren}</section>
  }

  if (error) {
    return (
      <>
        <ErrorMessage errorMess={"An error has occurred: " + error.message} />
        <Button onClick={() => refetch()}>Try Again</Button>
      </>
    )
  }

  return <section className={className}>{children}</section>
}

export default Page
