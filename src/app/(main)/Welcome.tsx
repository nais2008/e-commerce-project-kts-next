"use client"

import React from "react"

import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"

import Button from "@/components/ui/Button"

const Welcome: React.FC = () => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.push(ROUTES.products.create())}>
        Go to products
      </Button>
    </>
  )
}

export default Welcome
