"use client"

import React from "react"
import CountUp from "react-countup"

type Props = {
  value: number
}

const AnimatedPrice: React.FC<Props> = ({ value }) => {
  return (
    <CountUp end={value} duration={0.4} decimals={2} prefix="$" preserveValue />
  )
}

export default AnimatedPrice
