import React from "react"
import Skeleton from "react-loading-skeleton"

import Card from "@/components/ui/Card"

const CardSkeleton: React.FC = () => {
  return (
    <Card
      title={<Skeleton />}
      subtitle={<Skeleton count={2} />}
      contentSlot={<Skeleton width={60} />}
      image=""
      captionSlot={<Skeleton width={80} />}
    />
  )
}

export default CardSkeleton
