import type { Metadata } from "next"
import Link from "next/link"

import { ROUTES } from "@/constants/routes"
import classNames from "classnames"

import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"

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
      <Link href={ROUTES.products.create()} passHref>
        <Button>Go to products</Button>
      </Link>
    </main>
  )
}

export default Page
