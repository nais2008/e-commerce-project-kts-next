"use client"

import React from "react"

import cn from "classnames"

import s from "./Input.module.scss"

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string
  onChange: (value: string) => void
  afterSlot?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, afterSlot, ...props }, ref) => {
    const handlerChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event.target.value)
        }
      },
      [onChange]
    )

    return (
      <div className={cn(s.input__wrapper, className)}>
        <input
          ref={ref}
          {...props}
          onChange={handlerChange}
          value={value}
          className={cn(s.input__field)}
        />
        {afterSlot && <div className={s.input__afterSlot}>{afterSlot}</div>}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
