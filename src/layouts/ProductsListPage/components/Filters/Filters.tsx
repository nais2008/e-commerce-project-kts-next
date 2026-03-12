"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCategoriesStore } from "@/hooks/globalStores"
import { useDebounce } from "@/hooks/useDebounce"
import { observer } from "mobx-react-lite"

import DropDown from "@/components/ui/DropDown"
import Input from "@/components/ui/Input"

import s from "./Filters.module.scss"

const Filters: React.FC = observer(() => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoriesStore = useCategoriesStore()

  const urlSearch = searchParams.get("search") ?? ""
  const selectedCategory = searchParams.get("category") ?? "all"

  const [inputValue, setInputValue] = useState(urlSearch)
  const debouncedInput = useDebounce(inputValue, 400)

  const lastAppliedRef = useRef(urlSearch)

  useEffect(() => {
    if (debouncedInput === lastAppliedRef.current) return

    const params = new URLSearchParams(searchParams.toString())
    if (debouncedInput) params.set("search", debouncedInput)
    else params.delete("search")

    const newQuery = params.toString()
    if (newQuery !== searchParams.toString()) {
      router.replace(`${pathname}?${newQuery}`, { scroll: false })
    }

    lastAppliedRef.current = debouncedInput
  }, [debouncedInput, pathname, router, searchParams])

  useEffect(() => {
    const current = searchParams.get("search") ?? ""
    if (current !== lastAppliedRef.current) {
      setInputValue(current)
      lastAppliedRef.current = current
    }
  }, [searchParams])

  const handleCategoryChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "all") params.delete("category")
      else params.set("category", value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  const categoryOptions = [
    { value: "all", label: "All" },
    ...categoriesStore.categories.map((cat) => ({
      value: String(cat.id),
      label: cat.title,
    })),
  ]

  return (
    <div className={s.filters}>
      <Input
        type="search"
        placeholder="Search products..."
        value={inputValue}
        onChange={setInputValue}
        className={s.filters__input}
      />
      {categoriesStore.isLoading ? (
        <Skeleton width={140} height={45} />
      ) : (
        <DropDown
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={s.filters__dropDown}
        />
      )}
    </div>
  )
})

export default React.memo(Filters)
