"use client"

import React from "react"

import * as SliderPrimitive from "@radix-ui/react-slider"
import cn from "classnames"

import s from "./Slider.module.scss"

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, value, defaultValue, ...props }, ref) => {
  const thumbCount = Math.max(value?.length ?? defaultValue?.length ?? 0, 1)

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn(s.slider, className)}
      {...props}
    >
      <SliderPrimitive.Track className={s.slider__track}>
        <SliderPrimitive.Range className={s.slider__range} />
      </SliderPrimitive.Track>

      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={s.slider__thumb} />
      ))}
    </SliderPrimitive.Root>
  )
})

Slider.displayName = SliderPrimitive.Root.displayName

export default Slider
