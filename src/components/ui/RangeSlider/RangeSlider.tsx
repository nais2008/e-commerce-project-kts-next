"use client"

import React from "react"

import { ArrowLeft, ArrowRight } from "lucide-react"

import Slider from "@/components/ui/Slider"

import s from "./RangeSlider.module.scss"

interface RangeSliderProps {
  label: string
  minBound: number
  maxBound: number
  valueMin: number
  valueMax: number
  onChangeMin: (value: number) => void
  onChangeMax: (value: number) => void
  onValueCommit?: (valueMin: number, valueMax: number) => void
  step?: number
  unit?: string
  className?: string
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  minBound,
  maxBound,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  onValueCommit,
  step = 1,
  unit = "",
  className = "",
}) => {
  const handleValueChange = React.useCallback(
    (values: number[]) => {
      const [nextMin = valueMin, nextMax = valueMax] = values

      onChangeMin(nextMin)
      onChangeMax(nextMax)
    },
    [onChangeMax, onChangeMin, valueMax, valueMin]
  )

  const handleValueCommit = React.useCallback(
    (values: number[]) => {
      if (!onValueCommit) return

      const [nextMin = valueMin, nextMax = valueMax] = values
      onValueCommit(nextMin, nextMax)
    },
    [onValueCommit, valueMax, valueMin]
  )

  return (
    <div className={`${s.rangeSlider} ${className}`}>
      <div className={s.rangeSlider__header}>
        <span className={s.rangeSlider__label}>{label}</span>
      </div>

      <div className={s.rangeSlider__values}>
        <div className={s.rangeSlider__valueLabel}>
          <ArrowRight className={s.rangeSlider__icon} size={16} />
          {valueMin}
          {unit}
        </div>
        <div className={s.rangeSlider__valueLabel}>
          {valueMax}
          {unit}
          <ArrowLeft className={s.rangeSlider__icon} size={16} />
        </div>
      </div>

      <div className={s.rangeSlider__sliderWrap}>
        <Slider
          min={minBound}
          max={maxBound}
          step={step}
          value={[valueMin, valueMax]}
          minStepsBetweenThumbs={0}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          className={s.rangeSlider__slider}
        />
      </div>
    </div>
  )
}

export default RangeSlider
