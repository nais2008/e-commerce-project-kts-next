import React from "react"

import Heading from "@/components/ui/Heading"

import s from "./Title.module.scss"

const Title: React.FC = () => {
  return (
    <article className={s.title}>
      <div className={s.title__container}>
        <Heading view="title" tag="h1">
          Products
        </Heading>
        <Heading view="desc" color="secondary">
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </Heading>
      </div>
    </article>
  )
}

export default Title
