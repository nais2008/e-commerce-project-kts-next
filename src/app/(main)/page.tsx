import type { Metadata } from "next"

import classNames from "classnames"

import Heading from "@/components/ui/Heading"

import Welcome from "./Welcome"
import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage of Lalasia project kts",
}

const Page = () => {
  return (
    <main className={classNames(s.index, s.index__container)}>
      <Heading view="title" tag="h1" className={s.index__title}>
        Welcome to <span>Lalasia</span>
      </Heading>
      <Welcome />
    </main>
  )
}

export default Page
