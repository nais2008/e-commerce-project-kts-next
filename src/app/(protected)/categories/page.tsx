import type { Metadata } from "next"

import ProtectedRoute from "@/components/utils/ProtectedRoute"

import Categories from "./Categories"

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse our categories of products",
}

const Page = () => {
  return (
    <main>
      <ProtectedRoute>
        <Categories />
      </ProtectedRoute>
    </main>
  )
}

export default Page
