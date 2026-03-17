"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Skeleton from "react-loading-skeleton"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { useCategoriesStore, useQueryParamsStore } from "@/hooks/globalStores"
import { useDebounce } from "@/hooks/useDebounce"
import { observer } from "mobx-react-lite"

import DropDown from "@/components/ui/DropDown"
import Input from "@/components/ui/Input"
import RangeSlider from "@/components/ui/RangeSlider"

import {
  DISCOUNT_RANGE_BOUNDS,
  PRICE_RANGE_BOUNDS,
  parseRangeParams,
} from "@/utils/parseRangeParams"

import s from "./Filters.module.scss"

const PARAM_KEYS = {
  search: "search",
  category: "category",
  priceMin: "priceMin",
  priceMax: "priceMax",
  discountMin: "discountMin",
  discountMax: "discountMax",
} as const

const Filters: React.FC = observer(() => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoriesStore = useCategoriesStore()
  const queryParamsStore = useQueryParamsStore()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const urlSearch = searchParams.get(PARAM_KEYS.search) ?? ""
  const selectedCategory = searchParams.get(PARAM_KEYS.category) ?? "all"

  const parsedPriceRange = parseRangeParams(
    searchParams.get(PARAM_KEYS.priceMin),
    searchParams.get(PARAM_KEYS.priceMax),
    PRICE_RANGE_BOUNDS
  )

  const parsedDiscountRange = parseRangeParams(
    searchParams.get(PARAM_KEYS.discountMin),
    searchParams.get(PARAM_KEYS.discountMax),
    DISCOUNT_RANGE_BOUNDS
  )

  const [inputValue, setInputValue] = useState(urlSearch)
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    parsedPriceRange.valueMin,
    parsedPriceRange.valueMax,
  ])
  const [discountRange, setDiscountRange] = useState<[number, number]>(() => [
    parsedDiscountRange.valueMin,
    parsedDiscountRange.valueMax,
  ])
  const debouncedInput = useDebounce(inputValue, 400)

  const lastAppliedRef = useRef(urlSearch)
  const shouldRestoreFocusRef = useRef(false)
  const selectionRef = useRef<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  })

  const applyQueryUpdate = useCallback(
    (update: () => void) => {
      queryParamsStore.setSearch(searchParams.toString())
      update()

      const nextQuery = queryParamsStore.queryString
      const currentQuery = searchParams.toString()

      if (nextQuery === currentQuery) return

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      })
    },
    [pathname, queryParamsStore, router, searchParams]
  )

  useEffect(() => {
    if (debouncedInput === lastAppliedRef.current) return

    const input = inputRef.current
    shouldRestoreFocusRef.current = document.activeElement === input
    selectionRef.current = {
      start: input?.selectionStart ?? null,
      end: input?.selectionEnd ?? null,
    }

    applyQueryUpdate(() => {
      queryParamsStore.setStringParam(PARAM_KEYS.search, debouncedInput)
    })

    lastAppliedRef.current = debouncedInput
  }, [applyQueryUpdate, debouncedInput, queryParamsStore])

  useEffect(() => {
    const current = searchParams.get(PARAM_KEYS.search) ?? ""
    if (current !== lastAppliedRef.current) {
      setInputValue(current)
      lastAppliedRef.current = current
    }

    if (!shouldRestoreFocusRef.current) return

    const input = inputRef.current
    if (!input) {
      shouldRestoreFocusRef.current = false
      return
    }

    requestAnimationFrame(() => {
      input.focus()

      const { start, end } = selectionRef.current
      if (start !== null && end !== null) {
        input.setSelectionRange(start, end)
      }
    })

    shouldRestoreFocusRef.current = false
  }, [searchParams])

  useEffect(() => {
    setPriceRange((prev) => {
      const next: [number, number] = [
        parsedPriceRange.valueMin,
        parsedPriceRange.valueMax,
      ]

      return prev[0] === next[0] && prev[1] === next[1] ? prev : next
    })
  }, [parsedPriceRange.valueMax, parsedPriceRange.valueMin])

  useEffect(() => {
    setDiscountRange((prev) => {
      const next: [number, number] = [
        parsedDiscountRange.valueMin,
        parsedDiscountRange.valueMax,
      ]

      return prev[0] === next[0] && prev[1] === next[1] ? prev : next
    })
  }, [parsedDiscountRange.valueMax, parsedDiscountRange.valueMin])

  const handleCategoryChange = useCallback(
    (value: string) => {
      applyQueryUpdate(() => {
        queryParamsStore.setStringParam(
          PARAM_KEYS.category,
          value === "all" ? undefined : value
        )
      })
    },
    [applyQueryUpdate, queryParamsStore]
  )

  const handlePriceCommit = useCallback(
    (valueMin: number, valueMax: number) => {
      applyQueryUpdate(() => {
        queryParamsStore.setNumberParam(
          PARAM_KEYS.priceMin,
          valueMin === PRICE_RANGE_BOUNDS.min ? undefined : valueMin
        )
        queryParamsStore.setNumberParam(
          PARAM_KEYS.priceMax,
          valueMax === PRICE_RANGE_BOUNDS.max ? undefined : valueMax
        )
      })
    },
    [applyQueryUpdate, queryParamsStore]
  )

  const handleDiscountCommit = useCallback(
    (valueMin: number, valueMax: number) => {
      applyQueryUpdate(() => {
        queryParamsStore.setNumberParam(
          PARAM_KEYS.discountMin,
          valueMin === DISCOUNT_RANGE_BOUNDS.min ? undefined : valueMin
        )
        queryParamsStore.setNumberParam(
          PARAM_KEYS.discountMax,
          valueMax === DISCOUNT_RANGE_BOUNDS.max ? undefined : valueMax
        )
      })
    },
    [applyQueryUpdate, queryParamsStore]
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
      <div className={s.filters__topRow}>
        <Input
          ref={inputRef}
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

      <div className={s.filters__ranges}>
        <RangeSlider
          label="Price"
          minBound={PRICE_RANGE_BOUNDS.min}
          maxBound={PRICE_RANGE_BOUNDS.max}
          valueMin={priceRange[0]}
          valueMax={priceRange[1]}
          onChangeMin={(value) =>
            setPriceRange((prev) => [Math.min(value, prev[1]), prev[1]])
          }
          onChangeMax={(value) =>
            setPriceRange((prev) => [prev[0], Math.max(value, prev[0])])
          }
          onValueCommit={handlePriceCommit}
          unit="$"
          className={s.filters__range}
        />

        <RangeSlider
          label="Discount"
          minBound={DISCOUNT_RANGE_BOUNDS.min}
          maxBound={DISCOUNT_RANGE_BOUNDS.max}
          valueMin={discountRange[0]}
          valueMax={discountRange[1]}
          onChangeMin={(value) =>
            setDiscountRange((prev) => [Math.min(value, prev[1]), prev[1]])
          }
          onChangeMax={(value) =>
            setDiscountRange((prev) => [prev[0], Math.max(value, prev[0])])
          }
          onValueCommit={handleDiscountCommit}
          unit="%"
          className={s.filters__range}
        />
      </div>
    </div>
  )
})

export default React.memo(Filters)
