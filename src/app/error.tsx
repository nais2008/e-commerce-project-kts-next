"use client"

import type { Metadata } from "next"
import Link from "next/link"

import { ROUTES } from "@/constants/routes"
import { ArrowLeft, ShieldAlert } from "lucide-react"

import Heading from "@/components/ui/Heading"

import styles from "./error.module.scss"

export const metadata: Metadata = {
  title: "Error",
  description: "An unexpected error occurred",
}

type ErrorProps = {
  message?: string
}

const ErrorPage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <main className={styles.error}>
      <ShieldAlert size={80} className={styles.error__icon} />
      <Heading view="subtitle">
        {message ?? "Something went wrong. Please try again later."}
      </Heading>
      <Link href={ROUTES.main.create()} className={styles.error__link}>
        <ArrowLeft size={20} /> Back to home
      </Link>
    </main>
  )
}

export default ErrorPage
