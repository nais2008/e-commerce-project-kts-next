"use client"

import React from "react"

import classNames from "classnames"
import { ChevronDown, ChevronUp } from "lucide-react"

import Heading from "../Heading"
import s from "./DropDown.module.scss"

type DropdownOption = {
  value: string
  label: string
}

type DropDownProps = {
  options?: DropdownOption[]
  value: string
  onChange: (value: string) => void
  className?: string
  isBackSecond?: boolean
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  value,
  onChange,
  className,
  isBackSecond,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const selectRef = React.useRef<HTMLDivElement | null>(null)

  const selectedOption =
    options?.find((option: DropdownOption) => option.value === value) ||
    options?.[0]

  React.useEffect(() => {
    const handleClickOutside = (
      event: React.MouseEvent | globalThis.MouseEvent
    ) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside as (e: globalThis.MouseEvent) => void
    )
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside as (e: globalThis.MouseEvent) => void
      )
  }, [])

  const handleOptionClick = React.useCallback(
    (optionValue: string) => {
      onChange(optionValue)
      setIsOpen(false)
    },
    [onChange]
  )

  return (
    <div className={classNames(s.dropDown, className)} ref={selectRef}>
      <div
        className={classNames(
          s.dropDown__btn,
          isBackSecond && s.dropDown__btn_second
        )}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <Heading>{selectedOption?.label}</Heading>
        <Heading tag="span">{isOpen ? <ChevronUp /> : <ChevronDown />}</Heading>
      </div>

      <div
        className={classNames(s.dropDown__options, {
          [s.dropDown__options_open]: isOpen,
        })}
      >
        {options?.map((option: DropdownOption) => (
          <div
            key={option.value}
            className={classNames(s.dropDown__option, {
              [s.dropDown__option_active]: option.value === value,
            })}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropDown
