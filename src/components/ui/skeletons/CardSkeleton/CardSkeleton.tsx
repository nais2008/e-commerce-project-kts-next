import React from "react"
import Skeleton from "react-loading-skeleton"

import { useTheme } from "@/providers/ThemeProvider"

import Card from "@/components/ui/Card"

const CardSkeleton: React.FC = () => {
  const { resolvedTheme } = useTheme()

  return (
    <Card
      title={<Skeleton />}
      subtitle={<Skeleton count={2} />}
      contentSlot={<Skeleton width={60} />}
      image="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
      imageStyle={resolvedTheme === "light" ? { filter: "invert(1)" } : {}}
      captionSlot={<Skeleton width={80} />}
    />
  )
}

export default CardSkeleton

