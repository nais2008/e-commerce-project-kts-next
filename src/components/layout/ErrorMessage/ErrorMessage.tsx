import React from "react"

import Heading from "@/components/ui/Heading"

import s from "./ErrorMessage.module.scss"

type ErrorProps = {
  errorMess: string | undefined
}

const ErrorMessage: React.FC<ErrorProps> = ({ errorMess }) => {
  if (!errorMess) return null

  return (
    <Heading tag="p" weight="bold" className={s.error}>
      {errorMess}
    </Heading>
  )
}

export default React.memo(ErrorMessage)
