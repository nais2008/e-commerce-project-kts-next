import type { Metadata } from "next"
import Link from "next/link"

import { ROUTES } from "@/constants/routes"
import { ArrowLeft } from "lucide-react"

import Heading from "@/components/ui/Heading"

import styles from "./not-found.module.scss"

export const metadata: Metadata = {
  title: "404",
  description: "Not found",
}

const NotFound = () => {
  return (
    <main className={styles.notFound}>
      <Heading tag="h1" view="title" className={styles.notFound__title}>
        404
      </Heading>
      <Heading view="subtitle">
        This page doesn`t exist. Or maybe it moved.
      </Heading>
      <Link href={ROUTES.main.create()} className={styles.notFound__link}>
        <ArrowLeft size={20} /> Back to home
      </Link>
    </main>
  )
}

export default NotFound
